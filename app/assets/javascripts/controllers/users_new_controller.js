Cmat.UsersNewController = Ember.ObjectController.extend(Cmat.TransitionBack, {

  needs: ['current_user', 'map'], // Map is required by Cmat.TransitionBack

  actions: {
    save: function() {
      this.get('content').save().then(function(){
        this.get('controllers.current_user').loadUser(this.get('content'));
        this.transitionBack();
      }.bind(this));
    },

    cancel: function() {
      this.get('content').deleteRecord();
      this.transitionBack();
    }
  }

});
