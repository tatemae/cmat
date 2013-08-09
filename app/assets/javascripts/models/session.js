var ModelBase = require('./model_base');

var Session = ModelBase.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string')
});

module.exports = Session;