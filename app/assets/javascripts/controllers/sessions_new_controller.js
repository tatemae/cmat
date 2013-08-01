var SessionsNewController = Ember.ObjectController.extend({
  needs: ['currentUser'],

  save: function() {
    var _self = this;

    this.content.save().then(function() {
      var userJSON = _self.content.toJSON();
      userJSON.id = 'current';
      var object = _self.store.load(App.User, userJSON);
      var user = App.User.find('current');

      _self.get('controllers.currentUser').set('content', user);
      _self.transitionToRoute('index');
    });
  },

  cancel: function() {
    this.content.deleteRecord();
    this.transitionToRoute('index');
  }
});

module.exports = SessionsNewController;