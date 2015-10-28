var app = angular.module('shuffling', ["xeditable"]);

app.value('GUESTS_DATA_CHANGE_EVENT', 'GUESTS_DATA_CHANGE');

//TODO sort table
//TODO resotre guest from deleted list

//TODO
//storageService is a pure wrapper for Storage - delegating
//all calls. Is there way to inject Storage without creating
//this service?
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

app.controller('FormController', ['storageService', '$rootScope', '$log', 'GUESTS_DATA_CHANGE_EVENT',
  function(storageService, $rootScope, $log, GUESTS_DATA_CHANGE_EVENT) {

  var vm = this;

  vm.newGuest = function(name, transitionDate) {
    vm.currentGuest = new Guest(name, transitionDate);
    $log.debug("created new guest: " + vm.currentGuest.toString());
  };

  vm.addGuest = function(guest) {
    $log.debug("adding guest: " + guest.toString());
    storageService.add(guest);
    $log.debug("added guest: " + guest.toString());

    $rootScope.$broadcast(GUESTS_DATA_CHANGE_EVENT);
  };

  //TODO see if there is better way to handle switching tab
  //without calling into controller code
  vm.switch = function() {
    $('a[href="#guests"]').tab('show');
  };

  vm.newGuest();
}]);

app.controller('TabController', ['storageService', '$scope', '$log', 'GUESTS_DATA_CHANGE_EVENT',
  function(storageService, $scope, $log, GUESTS_DATA_CHANGE_EVENT) {

  var vm = this;
  vm.guests = storageService.getAll();

  vm.updateGuest = function(updates, guest) {
    $log.debug('updating guest: ' + JSON.stringify(updates));
    angular.extend(guest, updates);
    storageService.update(guest);
    $log.debug('updated guest: ' + JSON.stringify(guest));
  };

  vm.deleteGuest = function(guest) {
    var confirmed = window.confirm("Do you really want to delete guest " + guest.name);
    if (confirmed) {
      $log.debug('deleting guest: ' + JSON.stringify(guest));
      storageService.delete(guest);
      $log.debug('deleted guest: ' + JSON.stringify(guest));
    }
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
    $log.debug("next status for guest: " + JSON.stringify(guest) + " is: " + JSON.stringify(guest.getNextStatusCandidates()));

    return guest.getNextStatusCandidates();
  };
}]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme.
});
