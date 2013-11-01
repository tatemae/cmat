Cmat.Objective = Ember.Object.extend({

});

Cmat.Objective.reopenClass({
  findQuery: function(query){
    var objective_bank_id = query['objective_bank_id'];

    var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+objective_bank_id+'/objectives'

    if(query['children'])
    {
      url = url + '/' + query['objective'] + '/childids'
    }
    else if(query['roots'])
    {
      url = url + '/rootids'
    }
    else if(query['bulk'])
    {
      url = url + '/' + query['objective'] + '/children/bulk'
    }

    if( Config.settings.user_auth_token() )
    {
      url = url + '?proxyname=' + Config.settings.user_auth_token();
    }

    return $.getJSON(url);
  },
  saveNew: function(objective, parent) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+objective['objectiveBankId']+'/objectives';

      if( Config.settings.user_auth_token() )
      {
        url = url + '?proxyname=' + Config.settings.user_auth_token();
      }

      // An objective requires the following fields:
      // description.text
      // displayName.text
      // genusTypeID - must be a valid type
      // objectiveBankId
      resolve($.ajax({type: "POST", url: url, data: JSON.stringify(objective), contentType: "application/json", dataType: 'json'}).then(function(response){
        return response;
      }));
    });
  },
  saveParentRelationship: function(objectiveBankId, childId, parentIds) {
    var relationship = {ids: parentIds};
    var relationship_url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+objectiveBankId+'/objectives/'+childId+'/parentids';
    if( Config.settings.user_auth_token() )
    {
      relationship_url = relationship_url + '?proxyname=' + Config.settings.user_auth_token();
    }
    $.ajax({type: "PUT", url: relationship_url, data: JSON.stringify(relationship), contentType: "application/json", dataType: 'json'})
  },
  saveChanges: function(objective) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+objective['objectiveBankId']+'/objectives';
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
      var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+query['objectiveBankId']+'/objectives/'+query['objectiveId'];
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

