var Session = require('../../models/session');
var TransitionSignedIn = require('../../mixins/transition_signed_in');

var SessionsNewRoute = Ember.Route.extend(TransitionSignedIn, {

  model: function(){
    return Session.createRecord();
  }

});


module.exports = SessionsNewRoute;