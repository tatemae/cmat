var User = require('../../models/user');

Ember.Application.initializer({
  name: 'currentUser',

  initialize: function(container) {
    var store = container.lookup('store:main');
    var attributes = $('meta[name="current-user"]').attr('content');
    var user;
    if(attributes){
      var object = store.load(User, JSON.parse(attributes));
      user = User.find(object.id);
    } else {
      user = User.find('current');
    }

    container.lookup('controller:currentUser').set('content', user);
    container.typeInjection('controller', 'currentUser', 'controller:currentUser');
  }
});