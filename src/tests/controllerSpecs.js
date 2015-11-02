
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
      expect(allGuests.length).not.toBeLessThan(2);
      var guest1 = allGuests[0];
      expect(guest1.name).toEqual('First Guest');

    });


  });
});
