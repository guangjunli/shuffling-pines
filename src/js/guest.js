
var Guest = function(name, transitionDate) {
  this.name = name;
  this.transitionDate = transitionDate;
  this.transportation = this.PICK_UP;
  this.pickupLocation = '';
  this.status = this.STATUS_PICK_UP;
};

Guest.prototype.PICK_UP = 'PICK_UP';
Guest.prototype.DROP_OFF = 'DROP_OFF';

Guest.prototype.STATUS_PICK_UP = Guest.prototype.PICK_UP;
Guest.prototype.STATUS_DROP_OFF = Guest.prototype.DROP_OFF;
Guest.prototype.STATUS_ARRIVED = 'ARRIVED';

Guest.prototype.setPickUp = function() {
  this.transportation = this.PICK_UP;
  this.pickupLocation = '';
  this.status = this.STATUS_PICK_UP;
};

Guest.prototype.setDropOff = function() {
  this.transportation = this.DROP_OFF;
  this.pickupLocation = '';
  this.status = this.STATUS_DROP_OFF;
};

Guest.prototype.isPickUp = function() {
  return this.transportation === this.PICK_UP;
};

Guest.prototype.changeStatus = function() {
  if (this.status === this.STATUS_PICK_UP ||
      this.status === this.STATUS_DROP_OFF) {
        return this.status = this.STATUS_ARRIVED;
  } else if (this.status === this.STATUS_ARRIVED) {
    return this.status = this.STATUS_PICK_UP;
  }

  throw new Error("unknown status " + this.status);
};

Guest.prototype.toString = function() {
  return ['guest: name=', this.name, ', transitionDate=', this.transitionDate,
    ', transportation=', this.transportation, ', pickup location=', this.pickupLocation,
    ', status=', this.status].join('');
};
