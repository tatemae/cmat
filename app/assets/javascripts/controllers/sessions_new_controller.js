Cmat.SessionsNewController = Ember.ObjectController.extend(Cmat.TransitionBack, {
  needs: ['map', 'currentUser'],

  save: function(){
    var _self = this;
    this.set('errorMessage', null);
    this.content.save().then(function(){
      //_self.set('errorMessage', response.message);
      _self.get('controllers.currentUser').loadUser(_self.content);
      _self.transitionBack();
    });
  },

  cancel: function() {
    this.content.deleteRecord();
    this.transitionBack();
  }

});
