var Session = require('../../models/session');

var SessionsDestroyRoute = Ember.Route.extend({
  enter: function() {
    var controller = this.controllerFor('currentUser');
    controller.set('content', undefined);

    Session.find('current').then(function(session) {
      session.deleteRecord();
      controller.store.commit();
    });

    this.transitionTo('index');
  }
});

module.exports = SessionsDestroyRoute;