var CurrentUserController = Ember.ObjectController.extend({
  isSignedIn: function() {
    return this.get('content') && this.get('content').get('isLoaded');
  }.property('content.isLoaded')
});

module.exports = CurrentUserController;