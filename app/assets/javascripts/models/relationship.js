var ModelBase = require('./model_base');

var Relationship = DS.Model.extend({
  state: DS.attr('string')
});

module.exports = Relationship;
