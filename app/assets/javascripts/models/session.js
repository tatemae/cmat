var ModelBase = require('./model_base');

var Session = ModelBase.extend({
  email: DS.attr('string'),
  password: DS.attr('string')
});

module.exports = Session;