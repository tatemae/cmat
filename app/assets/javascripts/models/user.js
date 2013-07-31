var ModelBase = require('./model_base');

var User = ModelBase.extend({
  email: DS.attr('string'),
  name: DS.attr('string'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string')
});

module.exports = User;