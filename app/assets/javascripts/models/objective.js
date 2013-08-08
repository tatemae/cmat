var Objective = Ember.Object.extend({

});

Objective.reopenClass({
  findQuery: function(query){
    return new Ember.RSVP.Promise(function(resolve, reject){

      var url = 'https://oki-dev.mit.edu/handcar/services/learning/objectivebanks/'+query['objectivebank']+'/objectives'

      if(query['children'])
      {
        url = url + '/' + query['objective'] + '/children'
      }

      if(query['roots'])
      {
        url = url + '/roots'
      }

      resolve($.getJSON(url).then(function(response){
        var objectives = Em.A();
        response.forEach(function (objective) {
          objectives.pushObject(App.Objective.create(objective));
        });
        return [objectives, query['parent']];
      }));

    });
  },
  saveNew: function(objective) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      var url = 'https://oki-dev.mit.edu/handcar/services/learning/objectivebanks/'+objective['objectiveBankId']+'/objectives';
      // An objective requires the following fields:
      // description.text
      // displayName.text
      // genusTypeID - must be a valid type
      // objectiveBankId
      resolve($.ajax({type: "POST", url: url, data: JSON.stringify(objective), contentType: "application/json", dataType: 'json'}).then(function(response){
        console.log(response);
        return response;
      }));
    });
  },
  saveChanges: function(objective) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      var url = 'https://oki-dev.mit.edu/handcar/services/learning/objectivebanks/'+objective['objectiveBankId']+'/objectives';

      resolve($.ajax({type: "POST", url: url, data: JSON.stringify(objective), contentType: "application/json", dataType: 'json'}).then(function(response){
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
