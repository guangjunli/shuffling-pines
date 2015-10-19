var app = angular.module('shuffling', []);

app.controller('FormController', [function(){
  var vm = this;

  vm.newGuest = function(name, transitionDate) {
    vm.currentGuest = new Guest(name, transitionDate);
  };

  vm.addGuest = function(guest) {
    console.log(guest.toString());
  };

  vm.newGuest();
}]);

app.controller('TabController', [function(){
}]);
