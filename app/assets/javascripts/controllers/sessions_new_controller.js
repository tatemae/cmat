Cmat.SessionsNewController = Ember.ObjectController.extend(Cmat.TransitionBack, {

  needs: ['map', 'current_user'], // Map is required by Cmat.TransitionBack
  errorMessage: null,
  email: null,
  password: null,
  errors: null,

  save: function(){
    this.set('errorMessage', null);
    $.ajax({
      url: "/api/sessions",
      type: "post",
      dataType: "json",
      data: {
        session:{
          email:this.get('email'),
          password:this.get('password')
        }
      }
    }).done(function(response){
      this.get('controllers.current_user').loadUser(response);
      this.transitionBack();
    }.bind(this)).fail(function(response){
      this.set('errors', $.parseJSON(response.responseText).errors);
    }.bind(this));

  },

  cancel: function() {
    this.get('content').deleteRecord();
    this.transitionBack();
  }

});



