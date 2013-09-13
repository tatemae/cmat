Cmat.TransitionSignedIn = Ember.Mixin.create({

  beforeModel: function(){
    if(this.controllerFor('current_user').get('isSignedIn')){
      this.transitionTo('index');
    }
  }

});
