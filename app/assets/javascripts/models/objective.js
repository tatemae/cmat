var ModelBase = require('./model_base');

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
  }
});

module.exports = Objective;
