var ModelBase = require('./model_base');

var Node = DS.Model.extend({
  state: DS.attr('string', { defaultValue: '' }), // edit, save, cancel, destroy
  title: DS.attr('string', { defaultValue: '' }),
  info: DS.attr('string', { defaultValue: '' }),
  type: DS.attr('string', { defaultValue: 'concept' })
});

App.Store.registerAdapter('App.Node', DS.LSAdapter.create());

module.exports = Node;
