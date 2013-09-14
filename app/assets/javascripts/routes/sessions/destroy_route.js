Cmat.SessionsDestroyRoute = Ember.Route.extend({
  enter: function() {

    $.ajax({
      url: "/api/sessions/current",
      type: "post",
      dataType: "json",
      data: {
        "_method":"delete"
      }
    });
    $('meta[name="authentication-token"]').attr('content', '');
    $('meta[name="current-user"]').attr('content', '');
    this.controllerFor('current_user').set('content', undefined);
    this.transitionTo('index');
  }
});
