Cmat.Activity = Ember.Object.extend({

});

Cmat.Activity.reopenClass({
  findQuery: function(query){
      var objective_bank_id = query['objective_bank_id'];

      var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+objective_bank_id+'/activities'

      return $.getJSON(url);
  },
  saveNew: function(activity, parent) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+activity['objectiveBankId']+'/activities';
      // An activity requires the following fields:
      // description.text
      // displayName.text
      // genusTypeID - must be a valid type
      // objectiveBankId
      resolve($.ajax({type: "POST", url: url, data: JSON.stringify(activity), contentType: "application/json", dataType: 'json'}).then(function(response){
        return response;
      }));
    });
  }
});
