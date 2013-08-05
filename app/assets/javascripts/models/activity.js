var ModelBase = require('./model_base');

var Activity = Ember.Object.extend({

});

Activity.reopenClass({
  findQuery: function(query){
    return new Ember.RSVP.Promise(function(resolve, reject){

      var url = 'https://oki-dev.mit.edu/handcar/services/learning/objectivebanks/'+query['objectivebank']

      if( query['objective'] )
      {
        url = url + '/objectives/' + query['objective']
      }

      url = url + '/activities'

      resolve($.getJSON(url).then(function(response){
        var activities = Em.A();
        response.forEach(function (activity) {
          activities.pushObject(App.Activity.create(activity));
        });
        return [activities, query['parent']];
      }));

    });
  }
});

module.exports = Activity;
