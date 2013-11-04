Cmat.ObjectiveBank = Ember.Object.extend({

});

Cmat.ObjectiveBank.reopenClass({
  findAll: function(){
    var banks = Em.A();
    var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks';
    if( Config.settings.user_auth_token() )
    {
      url = url + '?proxyname=' + Config.settings.user_auth_token();
    }
    $.getJSON(url).then(function(response){
      response.forEach(function (bank) {
        banks.pushObject(Cmat.ObjectiveBank.create(bank));
      });
    });
    return banks;
  }
});
