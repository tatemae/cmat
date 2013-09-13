Cmat.SessionsDestroyRoute = Ember.Route.extend({
  enter: function() {
    var controller = this.controllerFor('current_user');
    controller.set('content', undefined);

    // Odd HACK but we preload a session with the id 'current' so that when we call find
    // the record will be available so we can destroy it.
    controller.store.load(Cmat.Session, {
      id: 'current',
    });

    Cmat.Session.find('current').then(function(session) {
      session.deleteRecord();
      controller.store.commit();
    });

    this.transitionTo('index');
  }
});
