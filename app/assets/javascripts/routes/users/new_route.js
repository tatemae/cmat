var User = require('../../models/user');
var AuthenticatedUser = require('../../mixins/authenticated_user');

var UsersNewRoute = Ember.Route.extend(AuthenticatedUser, {

  model: function(){
    return User.createRecord();
  }

});


module.exports = UsersNewRoute;