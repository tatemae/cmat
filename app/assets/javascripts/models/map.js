var ModelBase = require('./model_base');

var Map = ModelBase.extend({
  title: DS.attr('string'),
  cargo: DS.attr('string'),
  parsed_cargo: function(){
    return $.parseJSON(this.get('cargo'));
  }.property('cargo')
});

module.exports = Map;
