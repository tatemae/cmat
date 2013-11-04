Cmat.Asset = Ember.Object.extend({

});

Cmat.Asset.reopenClass({
  findQuery: function(query){
    var objective_bank_id = query['objective_bank_id'];

    var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+objective_bank_id+'/assets'
    if( Config.settings.user_auth_token() )
    {
      url = url + '?proxyname=' + Config.settings.user_auth_token();
    }
    return $.getJSON(url);
  },
  saveNew: function(activity, parent) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+activity['objectiveBankId']+'/assets';

      if( Config.settings.user_auth_token() )
      {
        url = url + '?proxyname=' + Config.settings.user_auth_token();
      }

      // An activity requires the following fields:
      // description.text
      // displayName.text
      // genusTypeID - must be a valid type
      // objectiveBankId
      resolve($.ajax({type: "POST", url: url, data: JSON.stringify(activity), contentType: "application/json", dataType: 'json'}).then(function(response){
        return response;
      }));
    });
  },
  saveChanges: function(objective) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+objective['objectiveBankId']+'/assets';
      if( Config.settings.user_auth_token() )
      {
        url = url + '?proxyname=' + Config.settings.user_auth_token();
      }
      resolve($.ajax({type: "PUT", url: url, data: JSON.stringify(objective), contentType: "application/json", dataType: 'json'}).then(function(response){
        return response;
      }));
    });
  },
  deleteNode: function(query){
    return new Ember.RSVP.Promise(function(resolve, reject){
      var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+query['objectiveBankId']+'/assets/'+query['id'];
      if( Config.settings.user_auth_token() )
      {
        url = url + '?proxyname=' + Config.settings.user_auth_token();
      }
      resolve($.ajax({type: "DELETE", url: url, contentType: "application/json", dataType: 'json'}).then(function(response){
        return response;
      }));
    });
  }
});
