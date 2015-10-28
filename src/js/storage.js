//TODO need to to modularize
//TODO need to inject a log service
//TODO encapsulated localStorage interaction here, is it good approach?

var LOCAL_STORAGE_KEY = 'shuffling_pines_guests';

var Storage = function() {
  this.map = {};

  this.persistentStorage = window && window.localStorage;

  this.load();

  //initialize the id for the next item in storage
  var lastKey = 0;
  for (var k in this.map) {
    if (this.map.hasOwnProperty(k)) {
      if (lastKey < parseInt(k)) {
        lastKey = parseInt(k);
      }
    }
  }
  this.nextKey = lastKey;
};

Storage.prototype.add = function(item) {
  if (item.id) {
    this.map[item.id] = item;
    this.persist();

  } else {
    item.id = this.nextKey;
    this.nextKey += 1;

    this.add(item);
  }
};

Storage.prototype.update = function(item) {
  if (item.id) {
    //overwrite any existing entry
    //add the item if not existing before
    this.map[item.id] = item; //is it necessary to put into the map again?
    this.persist();

  } else {
    throw new Error('item must have id property');
  }
};

Storage.prototype.delete = function(item) {
  if (item.id) {
    var itemFound = this.map[item.id];
    if (itemFound) {
      itemFound.deleted = true;
      this.persist();
    }
  } else {
    throw new Error('item must have id property');
  }
};

Storage.prototype.getAll = function() {
  //convert the map to an array of items
  //ES6
  //var dataArray = Object.keys(this.map).map(key => this.map[key]);
  var dataArray = [];
  for (var k in this.map) {
    if (this.map.hasOwnProperty(k)) {
      dataArray.push(this.map[k]);
    }
  }

  return dataArray;
};

Storage.prototype.clear = function() {
  this.map = {};
  this.nextKey = 0;

  if (this.persistentStorage) {
    this.persistentStorage.removeItem(LOCAL_STORAGE_KEY);
  }
};

Storage.prototype.load = function() {
  //console.log("loading from persistent storage...");
  if (this.persistentStorage) {
    var persistedData = this.persistentStorage[LOCAL_STORAGE_KEY];
    console.log("loaded from persistent storage: " + persistedData);

    if (persistedData) {
      //converting load object to Guest explicitly below
      //this.map = JSON.parse(persistedData);
      this.map = {};
      var dataMapLoaded = JSON.parse(persistedData);
      for (var k in dataMapLoaded) {
        if (dataMapLoaded.hasOwnProperty(k)) {
          var guest = new Guest();
          angular.extend(guest, dataMapLoaded[k]);

          //set transitionDate to be Date type
          //this change is necessary for using angular-xeditable
          //to edit Date inline
          if (dataMapLoaded[k].transitionDate) {
            guest.transitionDate = new Date(dataMapLoaded[k].transitionDate);
          }

          this.map[k] = guest;
        }
      }
    }
  }
};

//TODO make this a 'private' method
Storage.prototype.persist = function() {
  if (this.persistentStorage) {
    this.persistentStorage[LOCAL_STORAGE_KEY] = JSON.stringify(this.map);

    //console.log("persisted all guests " + this.persistentStorage[LOCAL_STORAGE_KEY]);
  }
};
