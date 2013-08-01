var Session = require('../../models/session');

var SessionsNewRoute = Ember.Route.extend({
  beforeModel: function(){
    var t = 0;
  },

  model: function(){
    if(this.controllerFor('currentUser').isSignedIn){
      this.transitionTo('index');
    } else {
      return Session.createRecord();
    }
  }
});


module.exports = SessionsNewRoute;