Ember.Application.initializer({
  name: 'currentUser',

  initialize: function(container) {
    var store = container.lookup('store:main');
    var attributes = $('meta[name="current-user"]').attr('content');
    if(attributes){
      var object = store.load(Cmat.User, JSON.parse(attributes));
      var user = Cmat.User.find(object.id);
      container.lookup('controller:currentUser').set('content', user);
      container.typeInjection('controller', 'currentUser', 'controller:currentUser'); // Add currentUser to all controllers
    }
  }
});