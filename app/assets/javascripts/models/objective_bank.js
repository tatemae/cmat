var ObjectiveBank = Ember.Object.extend({

});

ObjectiveBank.reopenClass({
  findAll: function(){
    var banks = Em.A();
    $.getJSON(Config.settings.cmat_base_url + '/services/learning/objectivebanks').then(function(response){
      response.forEach(function (bank) {
        banks.pushObject(App.ObjectiveBank.create(bank));
      });
    });
    return banks;
  }
});

module.exports = ObjectiveBank;
