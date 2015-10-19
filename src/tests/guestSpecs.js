describe('Guest', function(){
  it('should be instantiated by default as pick up', function() {
    var name = 'John Smith';
    var transitionDate = new Date();
    var guest = new Guest(name, transitionDate);
    expect(guest.name).toEqual(name);
    expect(guest.transitionDate).toEqual(transitionDate);
    expect(guest.transportation).toBe(Guest.prototype.PICK_UP);
    expect(guest.transportation).toBe(guest.PICK_UP);
  });

  it('should change status properly', function() {
    var name = 'John Smith';
    var transitionDate = new Date();
    var guest = new Guest(name, transitionDate);

    expect(guest.isPickUp()).toBe(true);

    guest.setDropOff();
    expect(guest.isPickUp()).toBe(false);

    var newStatus = guest.changeStatus();
    expect(newStatus).toEqual(guest.STATUS_ARRIVED);

    newStatus = guest.changeStatus();
    expect(newStatus).toEqual(guest.STATUS_PICK_UP);
  });

});
