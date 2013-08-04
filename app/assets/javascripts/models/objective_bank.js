var ModelBase = require('./model_base');

var ObjectiveBank = Ember.Object.extend({

});

ObjectiveBank.reopenClass({
  findAll: function(){
    var banks = Em.A();
    $.getJSON('https://oki-dev.mit.edu/handcar/services/learning/objectivebanks').then(function(response){
      response.forEach(function (bank) {
        banks.pushObject(App.ObjectiveBank.create(bank));
      });
    });
    return banks;
  }
});

module.exports = ObjectiveBank;
