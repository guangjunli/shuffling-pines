
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
    beforeEach(angular.mock.module('shuffling'));
    beforeEach(angular.mock.inject(function($controller) {
      formController = $controller('FormController');
      tabController = $controller('TabController');
    }));

  });
});
