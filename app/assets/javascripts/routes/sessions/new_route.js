Cmat.SessionsNewRoute = Ember.Route.extend(Cmat.TransitionSignedIn, {

  model: function(){
    return Cmat.Session.createRecord();
  }

});
