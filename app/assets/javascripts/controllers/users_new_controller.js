var TransitionBack = require('../mixins/transition_back');

var UsersNewController = Ember.ObjectController.extend(TransitionBack, {
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

module.exports = UsersNewController;