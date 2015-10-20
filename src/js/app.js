var app = angular.module('shuffling', []);

app.factory('storageService', function() {
    var storage = new Storage();

    return {
      add: function(item) {
        storage.add(item);
      },

      update: function(item) {
        storage.update(item);
      },

      getAll: function() {
        //forgot the return, which caused the calling client (controller)
        //getting undefined
        return storage.getAll();
      },
    };
});

app.controller('FormController', ['storageService', function(storageService){
  var vm = this;

  vm.newGuest = function(name, transitionDate) {
    vm.currentGuest = new Guest(name, transitionDate);
  };

  vm.addGuest = function(guest) {
    console.log(guest.toString());
    storageService.add(guest);
  };

  vm.newGuest();
}]);

app.controller('TabController', ['storageService', function(storageService) {
  var vm = this;
  vm.guests = storageService.getAll();
}]);
