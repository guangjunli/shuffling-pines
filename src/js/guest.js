
var Guest = function(name, transitionDate) {
  this.name = name;

  //use today's date by default
  if (transitionDate) {
    this.transitionDate = transitionDate;
  } else {
    this.transitionDate = new Date();
  }

  this.transportation = this.PICK_UP;
  this.pickupLocation = '';
  this.status = this.STATUS_PICK_UP;
  this.deleted = false;
};

Guest.prototype.PICK_UP = 'PICK_UP';
Guest.prototype.DROP_OFF = 'DROP_OFF';

Guest.prototype.STATUS_PICK_UP = 'pick up';
Guest.prototype.STATUS_DROP_OFF = 'drop off';
Guest.prototype.STATUS_ARRIVED = 'arrived';

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

Guest.prototype.canChangePickUpLocation = function() {
  return this.transportation === this.PICK_UP && this.status === this.STATUS_PICK_UP;
};

Guest.prototype.changeStatus = function() {
  if (this.status === this.STATUS_PICK_UP || this.status === this.STATUS_DROP_OFF) {
    this.status = this.STATUS_ARRIVED;
    return this.status;

  } else if (this.status === this.STATUS_ARRIVED) {
    this.status = this.STATUS_PICK_UP;
    return this.status;
  }

  throw new Error("unknown status " + this.status);
};

Guest.prototype.getNextStatusCandidates = function() {
  if (this.status === this.STATUS_PICK_UP || this.status === this.STATUS_DROP_OFF) {
    return [this.status, this.STATUS_ARRIVED];

  } else if (this.status === this.STATUS_ARRIVED) {
    return [this.status, this.STATUS_PICK_UP];
  }

  throw new Error("unknown status " + this.status);
};

//toString is not particularly useful here, because when parse is called
//on what was stringify'ed, the Guest type is lost, unless the Guest
//type is explicitly restored when parsing
Guest.prototype.toString = function() {
  return ['guest: name=', this.name, ', transitionDate=', this.transitionDate,
    ', transportation=', this.transportation, ', pickup location=', this.pickupLocation,
    ', status=', this.status].join('');
};
