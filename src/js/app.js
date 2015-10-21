var app = angular.module('shuffling', ["xeditable"]);

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

      delete: function(item) {
        storage.delete(item);
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

  vm.switch = function() {
    $('a[href="#guests"]').tab('show');
  };

  vm.newGuest();
}]);

app.controller('TabController', ['storageService', '$scope', 'GUESTS_DATA_CHANGE_EVENT',
  function(storageService, $scope, GUESTS_DATA_CHANGE_EVENT) {
//app.controller('TabController', ['storageService', '$scope',
//  function(storageService, $scope) {

  var vm = this;
  vm.guests = storageService.getAll();

  vm.updateGuest = function(updates, guest) {
    console.log('updating ' + JSON.stringify(guest));
    angular.extend(updates, guest);
    storageService.update(updates);
  };

  vm.deleteGuest = function(guest) {
    console.log('deleting ' + JSON.stringify(guest));
    storageService.delete(guest);
  };

  $scope.$on(GUESTS_DATA_CHANGE_EVENT, function() {
    vm.guests = storageService.getAll();
  });

  vm.filterOutDeleted = function(guest) {
    return angular.isUndefined(guest.deleted) || guest.deleted === false;
  };

  vm.getNextStatus = function(guest) {
    console.log('next status for guest ' + JSON.stringify(guest));
    //again, the Guest type info is lost at this point, so the line below
    //reports TypeError: guest.getNextStatusCandidates is not a function
    //console.log("next status " + JSON.stringify(guest.getNextStatusCandidates()));

    //refactored the load method in Storage to convert what's loaded as
    //proper Guest object, so that the code above/below works :)
    console.log("next status " + JSON.stringify(guest.getNextStatusCandidates()));

    return guest.getNextStatusCandidates();
  };
}]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme.
});
