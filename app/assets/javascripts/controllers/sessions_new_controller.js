Cmat.SessionsNewController = Ember.ObjectController.extend(Cmat.TransitionBack, {

  needs: ['map', 'current_user'], // Map is required by Cmat.TransitionBack

  save: function(){
    this.set('errorMessage', null);
    this.get('content').save().then(function(){
      //this.set('errorMessage', response.message);
      this.get('controllers.current_user').loadUser(this.get('content'));
      this.transitionBack();
    }.bind(this));
  },

  cancel: function() {
    this.get('content').deleteRecord();
    this.transitionBack();
  }

});
