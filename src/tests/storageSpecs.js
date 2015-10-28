//TODO how did data in localStorage ended up with phantomJS (karma) tests?
//phantomJS data did not clear up when Chrome was cleared so they are not 'linked'


describe('Storage', function(){

  describe('starting with no items', function() {

    it('should increment id of stored items properly', function() {
      if (window && window.localStorage) {
        window.localStorage.clear();
      }

      var storage = new Storage();

      storage.clear();
      var key = storage.nextKey;
      expect(storage.nextKey).toEqual(0);
      expect(storage.map).toEqual({});

      var guest_1 = new Guest('guest 1', new Date());
      expect(guest_1.id).toBeUndefined();
      storage.add(guest_1);

      expect(guest_1.id).toEqual(storage.nextKey - 1);
    });
  });

  describe('starting with existing items', function() {

    it('should increment id of stored items properly', function() {
      var storage = new Storage();

      var guest_1 = new Guest('guest 1', new Date());
      expect(guest_1.id).toBeUndefined();
      storage.add(guest_1);

      expect(guest_1.id).toEqual(storage.nextKey - 1);
    });
  });

  describe('operations', function() {
    var storage;
    beforeEach(function() {
      storage = new Storage();
    });

    it('should add guest', function() {
      var guest = new Guest('guest');
      storage.add(guest);

      var guestId = guest.id;
      expect(storage.map.hasOwnProperty(guestId)).toBeTruthy();
    });

    it('should update guest', function() {
      var guest = new Guest('guest');
      storage.add(guest);

      var guestId = guest.id;

      guest.name = 'guest nn';
      storage.update(guest);
      expect(storage.map[guestId].name).toEqual('guest nn');
    });

    it('should delete guest', function() {
      var guest = new Guest('guest');
      storage.add(guest);

      var guestId = guest.id;

      expect(storage.map[guestId].deleted).toBeFalsy();
      storage.delete(guest);
      expect(storage.map[guestId].deleted).toBeTruthy();
    });
  });

});
