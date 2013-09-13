Cmat.UsersNewRoute = Ember.Route.extend(Cmat.TransitionSignedIn, {

  model: function(){
    return Cmat.User.createRecord();
  }

});
