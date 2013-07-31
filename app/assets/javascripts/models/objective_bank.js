var ModelBase = require('./model_base');

var ObjectiveBank = ModelBase.extend({
  current: DS.attr('boolean'),
  genusTypeId: DS.attr('string')
});

App.Store.registerAdapter('App.ObjectiveBank', DS.Adapter.extend({
  find: function(store, type, id) {
    $.getJSON('https://oki-dev.mit.edu/handcar/services/learning/objectivebanks/'+id).then( function(json) {
      store.load(type, json);
    });
  }
}));

module.exports = ObjectiveBank;
