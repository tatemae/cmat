var Objective = Ember.Object.extend({

});

Objective.reopenClass({
  findQuery: function(query){
    return new Ember.RSVP.Promise(function(resolve, reject){

      var params = query['params'];
      var objective_bank_id = query['objective_bank_id'];

      var url = 'https://oki-dev.mit.edu/handcar/services/learning/objectivebanks/'+objective_bank_id+'/objectives'

      if(query['children'])
      {
        url = url + '/' + query['objective'] + '/childrenids'
      }
      else if(query['roots'])
      {
        url = url + '/rootids'
      }

      console.log(url);
      resolve($.getJSON(url).always(function(response, status, error){
        if(status == 'error')
        {
          return {ids: []};
        }
        if(query['children'] || query['roots'])
        {
          return response;
        }
        else
        {
          var objectives = Em.A();
          response.forEach(function (objective) {
            objectives.pushObject(App.Objective.create(objective));
          });
          return objectives;
        }
      }));
    });
  },
  saveNew: function(objective, parent) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      var url = 'https://oki-dev.mit.edu/handcar/services/learning/objectivebanks/'+objective['objectiveBankId']+'/objectives';
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
    var relationship_url = 'https://oki-dev.mit.edu/handcar/services/learning/objectivebanks/'+objectiveBankId+'/objectives/'+childId+'/parentids';
    console.log({type: "PUT", url: relationship_url, data: JSON.stringify(relationship), contentType: "application/json", dataType: 'json'});
    // There seems to be a bug in the api
    $.ajax({type: "PUT", url: relationship_url, data: JSON.stringify(relationship), contentType: "application/json", dataType: 'json'})
  },
  saveChanges: function(objective) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      var url = 'https://oki-dev.mit.edu/handcar/services/learning/objectivebanks/'+objective['objectiveBankId']+'/objectives';

      resolve($.ajax({type: "PUT", url: url, data: JSON.stringify(objective), contentType: "application/json", dataType: 'json'}).then(function(response){
        return response;
      }));
    });
  },
  deleteNode: function(query){
    return new Ember.RSVP.Promise(function(resolve, reject){
      var url = 'https://oki-dev.mit.edu/handcar/services/learning/objectivebanks/'+query['objectiveBankId']+'/objectives/'+query['objectiveId'];

      resolve($.ajax({type: "DELETE", url: url, contentType: "application/json", dataType: 'json'}).then(function(response){
        return response;
      }));
    });
  }
});

module.exports = Objective;
