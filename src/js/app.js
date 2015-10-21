var app = angular.module('shuffling', []);

app.value('GUESTS_DATA_CHANGE_EVENT', 'GUESTS_DATA_CHANGE');

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

      clear: function() {
        storage.clear();
      }
    };
});

app.controller('FormController', ['storageService', '$rootScope', 'GUESTS_DATA_CHANGE_EVENT',
  function(storageService, $rootScope, GUESTS_DATA_CHANGE_EVENT) {
//app.controller('FormController', ['storageService', '$rootScope',
//  function(storageService, $rootScope) {

  var vm = this;

  vm.newGuest = function(name, transitionDate) {
    vm.currentGuest = new Guest(name, transitionDate);
  };

  vm.addGuest = function(guest) {
    console.log(guest.toString());
    storageService.add(guest);

    $rootScope.$broadcast(GUESTS_DATA_CHANGE_EVENT);
  };



  vm.newGuest();
}]);

app.controller('TabController', ['storageService', '$scope', 'GUESTS_DATA_CHANGE_EVENT',
  function(storageService, $scope, GUESTS_DATA_CHANGE_EVENT) {
//app.controller('TabController', ['storageService', '$scope',
//  function(storageService, $scope) {

  var vm = this;
  vm.guests = storageService.getAll();

  $scope.$on(GUESTS_DATA_CHANGE_EVENT, function() {
    vm.guests = storageService.getAll();
  });

}]);
