Cmat.Activity = Ember.Object.extend({

});

Cmat.Activity.reopenClass({
  findQuery: function(query){
      var objective_bank_id = query['objective_bank_id'];

      var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+objective_bank_id+'/activities'

      return $.getJSON(url);
  }
});
