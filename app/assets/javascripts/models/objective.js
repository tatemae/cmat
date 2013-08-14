var Objective = Ember.Object.extend({

});

Objective.reopenClass({
  findQuery: function(query){
      var params = query['params'];
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

      return $.getJSON(url);
  },
  saveNew: function(objective, parent) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+objective['objectiveBankId']+'/objectives';
      // An objective requires the following fields:
      // description.text
      // displayName.text
      // genusTypeID - must be a valid type
      // objectiveBankId
      resolve($.ajax({type: "POST", url: url, data: JSON.stringify(objective), contentType: "application/json", dataType: 'json'}).then(function(response){
        if(!Em.isNone(parent)){
          saveParentRelationship(objective['objectiveBankId'], objective['id'], [parent.attrs.id]);
        }
        return response;
      }));
    });
  },
  saveParentRelationship: function(objectiveBankId, childId, parentIds) {
    var relationship = {ids: parentIds};
    var relationship_url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+objectiveBankId+'/objectives/'+childId+'/parentids';
    $.ajax({type: "PUT", url: relationship_url, data: JSON.stringify(relationship), contentType: "application/json", dataType: 'json'})
  },
  saveChanges: function(objective) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+objective['objectiveBankId']+'/objectives';

      resolve($.ajax({type: "PUT", url: url, data: JSON.stringify(objective), contentType: "application/json", dataType: 'json'}).then(function(response){
        return response;
      }));
    });
  },
  deleteNode: function(query){
    return new Ember.RSVP.Promise(function(resolve, reject){
      var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+query['objectiveBankId']+'/objectives/'+query['objectiveId'];

      resolve($.ajax({type: "DELETE", url: url, contentType: "application/json", dataType: 'json'}).then(function(response){
        return response;
      }));
    });
  }
});

module.exports = Objective;
