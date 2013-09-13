Cmat.Activity = Ember.Object.extend({

});

Cmat.Activity.reopenClass({
  findQuery: function(query){
    return new Ember.RSVP.Promise(function(resolve, reject){

      var url = Config.settings.cmat_base_url + '/services/learning/objectivebanks/'+query['objectivebank']

      if( query['objective'] )
      {
        url = url + '/objectives/' + query['objective']
      }

      url = url + '/activities'

      resolve($.getJSON(url).then(function(response){
        var activities = Em.A();
        response.forEach(function (activity) {
          activities.pushObject(Cmat.Activity.create(activity));
        });
        return [activities, query['parent']];
      }));

    });
  }
});
