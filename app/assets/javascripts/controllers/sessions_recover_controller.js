Cmat.SessionsRecoverController = Ember.ObjectController.extend(Cmat.TransitionBack, {

  email: null,
  errors: null,

  actions: {
    recover: function(){
      $.ajax({
        url: "/api/passwords",
        type: "post",
        dataType: "json",
        data: {
          user:{
            email:this.get('email')
          }
        }
      }).done(function(response){
        Cmat.Flash.push('success', 'A password email link has been sent.');
        this.transitionBack();
      }.bind(this)).fail(function(response){
        Cmat.Flash.push('error', 'Unable to reset your email.');
      }.bind(this));

    },

    cancel: function() {
      this.transitionBack();
    }
  }

});



