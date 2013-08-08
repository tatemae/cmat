var Session = require('../../models/session');

var SessionsDestroyRoute = Ember.Route.extend({
  enter: function() {
    var controller = this.controllerFor('currentUser');
    controller.set('content', undefined);

    // Odd HACK but we preload a session with the id 'current' so that when we call find
    // the record will be available so we can destroy it.
    controller.store.load(Session, {
      id: 'current',
    });

    Session.find('current').then(function(session) {
      session.deleteRecord();
      controller.store.commit();
    });

    this.transitionTo('index');
  }
});

module.exports = SessionsDestroyRoute;