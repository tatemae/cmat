Cmat.UsersNewController = Ember.ObjectController.extend(Cmat.TransitionBack, {
  save: function() {
    var self = this;
    this.content.save().then(function(){
      this.transitionBack();
    });
  },

  cancel: function() {
    this.content.deleteRecord();
    this.transitionBack();
  }

});
