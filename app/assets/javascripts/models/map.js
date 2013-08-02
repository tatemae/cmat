var ModelBase = require('./model_base');

var Map = ModelBase.extend({

  user_id: DS.attr('number'),
  title: DS.attr('string'),
  payload: DS.attr('string'),
  mc3Source: DS.attr('string'),
  isMc3: DS.attr('boolean'),
  parsed_payload: function(){
    return $.parseJSON(this.get('payload') || '');
  }.property('payload'),

  load_from_mc3: function(){
    this.set('isMc3', true);

    return new Ember.RSVP.Promise(function(resolve, reject){
      // Go get data from mc3

      // // succeed
      // resolve(value);
      // // or reject
      // reject(error);
    });
  }

});

module.exports = Map;
