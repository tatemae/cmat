Ember.Application.initializer({
  name: 'currentUser',

  initialize: function(container) {
    var attributes = $('meta[name="current-user"]').attr('content');
    if(attributes){
      container.lookup('controller:current_user').loadUser(JSON.parse(attributes));
    }
  }

});