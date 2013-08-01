var UsersNewController = Ember.ObjectController.extend({
  save: function() {
    var self = this;

    this.content.save().then(function() {
      self.transitionToRoute('index');
    });
  },

  cancel: function() {
    this.content.deleteRecord();
    this.transitionToRoute('index');
  }
});

module.exports = UsersNewController;