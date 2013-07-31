var ModelBase = require('./model_base');

var Node = DS.Model.extend({
  state: DS.attr('string'), // edit, save, cancel, delete
  name: DS.attr('string'),
  info: DS.attr('string'),
  type: DS.attr('string')
});

module.exports = Node;
