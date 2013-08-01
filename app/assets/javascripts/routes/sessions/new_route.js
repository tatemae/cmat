var Session = require('../../models/session');

var SessionsNewRoute = Ember.Route.extend({

  beforeModel: function(){
    if(this.controllerFor('currentUser').isSignedIn){
      this.transitionTo('index');
    }
  },

  model: function(){
    return Session.createRecord();
  }
});


module.exports = SessionsNewRoute;