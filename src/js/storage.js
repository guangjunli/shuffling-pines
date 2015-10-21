//how to modularize?

var LOCAL_STORAGE_KEY = 'shuffling_pines_guests';

var Storage = function() {
  this.map = {};

  this.persistentStorage = window && window.localStorage;

  this.load();

  this.nextKey = 0;

  for (var k in this.map) {
    if (this.map.hasOwnProperty(k)) {
      if (this.nextKey < parseInt(k)) {
        this.nextKey = parseInt(k);
      }
    }
  }
};

Storage.prototype.add = function(item) {
  if (item.id) {
    this.map[item.id] = item;
    this.persist();

  } else {
    this.nextKey += 1;
    item.id = this.nextKey;

    this.add(item);
  }
};

Storage.prototype.update = function(item) {
  if (item.id) {
    //overwrite any existing entry
    //add the item if not existing before
    this.map[item.id] = item;
    this.persist();

  } else {
    throw new Error('item must have id property');
  }
};

Storage.prototype.getAll = function() {
  //convert the map to an array of items
  //console.log("in storage, returning all " + JSON.stringify(this.map));

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

Storage.prototype.persist = function() {
  console.log("persisting all guests");

  if (this.persistentStorage) {
    this.persistentStorage[LOCAL_STORAGE_KEY] = JSON.stringify(this.map);

    //console.log("all guests " + this.persistentStorage[LOCAL_STORAGE_KEY]);
  }
};

Storage.prototype.clear = function() {
  this.map = {};

  if (this.persistentStorage) {
    this.persistentStorage.removeItem(LOCAL_STORAGE_KEY);
  }
};

Storage.prototype.load = function() {
  console.log("loading from persistent storage...");
  if (this.persistentStorage) {
    var persistedData = this.persistentStorage[LOCAL_STORAGE_KEY];
    console.log("loaded " + persistedData);

    if (persistedData) {
      this.map = JSON.parse(persistedData);
    }
  }
};
