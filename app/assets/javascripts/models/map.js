var ModelBase = require('./model_base');

var Map = ModelBase.extend({
  title: DS.attr('string'),
  payload: DS.attr('string'),
  parsed_payload: function(){
    return $.parseJSON(this.get('payload') || '');
  }.property('payload')
});

module.exports = Map;
