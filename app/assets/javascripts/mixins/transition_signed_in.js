Cmat.TransitionSignedIn = Ember.Mixin.create({

  beforeModel: function(){
    if(this.controllerFor('currentUser').get('isSignedIn')){
      this.transitionTo('index');
    }
  }

});
