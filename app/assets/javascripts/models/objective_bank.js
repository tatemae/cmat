Cmat.ObjectiveBank = Ember.Object.extend({

});

Cmat.ObjectiveBank.reopenClass({
  findAll: function(){
    var banks = Em.A();
    $.getJSON(Config.settings.cmat_base_url + '/services/learning/objectivebanks').then(function(response){
      response.forEach(function (bank) {
        banks.pushObject(Cmat.ObjectiveBank.create(bank));
      });
    });
    return banks;
  }
});
