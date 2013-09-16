Cmat.UsersNewController = Ember.ObjectController.extend(Cmat.TransitionBack, {

  needs: ['current_user', 'map'], // Map is required by Cmat.TransitionBack

  actions: {
    save: function() {
      var user = this.get('content');
      if(user.currentState.stateName == "root.loaded.created.invalid"){
        Cmat.Flash.push('error', 'Please review the errors below:');
        return;
      }
      user.save().then(function(){
        this.get('controllers.current_user').loadUserFromModel(user);
        Cmat.Flash.push('success', 'Successfully Signed Up!');
        this.transitionBack();
      }.bind(this));
    },

    cancel: function() {
      this.get('content').deleteRecord();
      this.transitionBack();
    }
  }

});
