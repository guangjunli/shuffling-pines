
describe('Controllers', function() {

  describe('FormController', function() {
    var formController;
    beforeEach(angular.mock.module('shuffling'));
    beforeEach(angular.mock.inject(function($controller) {
      formController = $controller('FormController');
    }));

    it('should start with empty currentGuest', function(){
      expect(formController.currentGuest).toBeDefined();
      expect(formController.currentGuest.name).toBeUndefined();
    });

    it('should create new guest with pick up as default transportation', function(){
      formController.addGuest(new Guest('Test Guest', new Date()));

      expect(formController.currentGuest).toBeDefined();
      expect(formController.currentGuest.transportation).toEqual(Guest.prototype.PICK_UP);
      expect(formController.currentGuest.status).toEqual(Guest.prototype.STATUS_PICK_UP);
      expect(formController.currentGuest.deleted).toBeFalsy();
    });

  });

  describe('TabController', function() {
    var tabController;
    var formController;
    var tabScope;

    //Note I had to pull this into its own beforeEach and place it before loading
    //the module to make the test "should have two known guests to start with" pass
    beforeEach(function() {
      if (window && window.localStorage) {
        window.localStorage.clear();
        console.log("cleared local storage");
      }
    });

    beforeEach(angular.mock.module('shuffling'));

    beforeEach(angular.mock.inject(function($controller, $rootScope, storageService) {
      tabScope = $rootScope.$new();
      formController = $controller('FormController');
      tabController = $controller('TabController', {$scope : tabScope});

    }));

    it('did not put data into $scope', function() {
      expect(tabScope.guests).toBeUndefined();
    });

    it('should have two known guests to start with', function() {
      console.log("checking first two guests");
      var allGuests = tabController.guests;
      //expect(allGuests.length).not.toBeLessThan(2);

      expect(allGuests.length).toEqual(2);
      var guest1 = allGuests[0];
      expect(guest1.name).toEqual('First Guest');

      var guest2 = allGuests[1];
      expect(guest2.name).toEqual('Second Guest');
    });

    it('should have added guest through FormController', function() {
      var newGuestName = "Third Guest";
      var newGuestTransitionDate = new Date(2015,01,01);
      formController.newGuest(newGuestName, newGuestTransitionDate);
      formController.addGuest(formController.currentGuest);

      var allGuests = tabController.guests;
      expect(allGuests.length).toEqual(3);
      var thirdGuest = allGuests[2];
      expect(thirdGuest.name).toEqual(newGuestName);
      expect(thirdGuest.transitionDate).toEqual(newGuestTransitionDate);
      expect(thirdGuest.transportation).toEqual(thirdGuest.PICK_UP);
    });

    it('should have updated guest properly', function() {
      //added new guest
      var newGuestName = "Third Guest";
      var newGuestTransitionDate = new Date(2015,01,01);
      formController.newGuest(newGuestName, newGuestTransitionDate);
      formController.addGuest(formController.currentGuest);

      var allGuests = tabController.guests;
      expect(allGuests.length).toEqual(3);
      var thirdGuest = allGuests[2];
      expect(thirdGuest.name).toEqual(newGuestName);
      expect(thirdGuest.transitionDate).toEqual(newGuestTransitionDate);
      expect(thirdGuest.transportation).toEqual(thirdGuest.PICK_UP);
      expect(thirdGuest.status).toEqual(thirdGuest.STATUS_PICK_UP);

      //update the guest
      var location = "South Station";
      tabController.updateGuest(
        {pickupLocation: location, status: thirdGuest.STATUS_ARRIVED},
        thirdGuest);

      //get the guest again
      var thirdGuestUpdated = allGuests[2];
      expect(thirdGuestUpdated.name).toEqual(thirdGuest.name);
      expect(thirdGuestUpdated.transitionDate).toEqual(thirdGuestUpdated.transitionDate);
      expect(thirdGuestUpdated.transportation).toEqual(thirdGuest.PICK_UP);
      expect(thirdGuestUpdated.pickupLocation).toEqual(location);
      expect(thirdGuestUpdated.status).toEqual(thirdGuest.STATUS_ARRIVED);
    });

    it('should have kept guest but changed its deleted flag upon deletion', function() {
      //added new guest
      var newGuestName = "Third Guest";
      var newGuestTransitionDate = new Date(2015,01,01);
      formController.newGuest(newGuestName, newGuestTransitionDate);
      formController.addGuest(formController.currentGuest);

      var allGuests = tabController.guests;
      expect(allGuests.length).toEqual(3);
      var thirdGuest = allGuests[2];
      expect(thirdGuest.name).toEqual(newGuestName);
      expect(thirdGuest.transitionDate).toEqual(newGuestTransitionDate);
      expect(thirdGuest.transportation).toEqual(thirdGuest.PICK_UP);
      expect(thirdGuest.status).toEqual(thirdGuest.STATUS_PICK_UP);

      //TODO not sure if the delete confirmation should be in TabController
      //anyway mocking the action here

      //cancel the delete
      spyOn(window, "confirm").and.returnValue(false);

      //delete the guest
      tabController.deleteGuest(thirdGuest);

      //get the guest again
      var thirdGuestDeleted = allGuests[2];
      expect(thirdGuestDeleted.name).toEqual(thirdGuest.name);
      expect(thirdGuestDeleted.transitionDate).toEqual(thirdGuestDeleted.transitionDate);
      expect(thirdGuestDeleted.transportation).toEqual(thirdGuest.PICK_UP);
      expect(thirdGuestDeleted.deleted).toEqual(false);

      //went ahead with the delete
      //resetting the spy to return true
      //likely alternative is to have a separate test for confirming yes to deletion
      window.confirm.and.returnValue(true);

      //delete the guest
      tabController.deleteGuest(thirdGuest);

      //get the guest again
      thirdGuestDeleted = allGuests[2];
      expect(thirdGuestDeleted.name).toEqual(thirdGuest.name);
      expect(thirdGuestDeleted.transitionDate).toEqual(thirdGuestDeleted.transitionDate);
      expect(thirdGuestDeleted.transportation).toEqual(thirdGuest.PICK_UP);
      expect(thirdGuestDeleted.deleted).toEqual(true);

    });

  });
});
