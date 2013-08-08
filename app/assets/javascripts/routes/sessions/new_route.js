var Session = require('../../models/session');
var AuthenticatedUser = require('../../mixins/authenticated_user');

var SessionsNewRoute = Ember.Route.extend(AuthenticatedUser, {

  model: function(){
    return Session.createRecord();
  }

});


module.exports = SessionsNewRoute;