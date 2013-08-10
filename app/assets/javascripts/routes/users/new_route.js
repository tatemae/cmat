var User = require('../../models/user');
var TransitionSignedIn = require('../../mixins/transition_signed_in');

var UsersNewRoute = Ember.Route.extend(TransitionSignedIn, {

  model: function(){
    return User.createRecord();
  }

});


module.exports = UsersNewRoute;