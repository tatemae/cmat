var ModelBase = require('./model_base');
DS.rejectionHandler = function(reason) {
  Ember.Logger.assert([reason, reason.message, reason.stack]);

  throw reason;
};

var ObjectiveBank = ModelBase.extend({
  current: DS.attr('boolean'),
  genusTypeId: DS.attr('string'),
  description: DS.attr('description'),
  displayName: DS.attr('displayName'),
  name: function() {
    var name = Em.isNone(displayName) ? 'Empty' : displayName['text'];
    return name;
  }.property('displayName')
});

var adapter = DS.RESTAdapter.extend({
  find: function(store, type, id) {
    $.getJSON('https://oki-dev.mit.edu/handcar/services/learning/objectivebanks/'+id).then( function(json) {
      store.load(type, json);
    });
  },
  findQuery: function(store, type, query, recordArray) {
    var adapter = this;

    var json   = {},
        root   = this.rootForType(type),
        plural = this.pluralize(root);

    $.getJSON('https://oki-dev.mit.edu/handcar/services/learning/objectivebanks').then(function(pre_json){
      json[plural] = pre_json;
      adapter.didFindQuery(store, type, json, recordArray);
    }).then(null, DS.rejectionHandler);
  }
});

adapter.registerTransform('description', {
  serialize: function(value) {
    return Em.isNone(value) ? {} : value;
  },

  deserialize: function(value) {
    return Em.isNone(value) ? {} : value;
  }
});

adapter.registerTransform('displayName', {
  serialize: function(value) {
    return Em.isNone(value) ? {} : value;
  },

  deserialize: function(value) {
    return Em.isNone(value) ? {} : value;
  }
});

App.Store.registerAdapter('App.ObjectiveBank', adapter);

module.exports = ObjectiveBank;
