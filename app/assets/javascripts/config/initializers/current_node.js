var Node = require('../../models/node');

Ember.Application.initializer({
  name: 'currentNode',

  initialize: function(container) {
    var store = container.lookup('store:main');
    Node.find('current').then(function(node){
      if(!node){
        node = Node.createRecord();
      }
      container.lookup('controller:currentNode').set('content', node);
      container.typeInjection('controller', 'currentNode', 'controller:currentNode');
    });
  }
});
