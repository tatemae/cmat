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

  load_from_mc3: function(objectiveBank){
    this.set('isMc3', true);
    _self = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      App.Objective.findQuery({objectivebank: objectiveBank.get('id')}).then(function(objectives){
        var nodes = [];
        var markerRadius = 2;
        var children = [];
        var child;
        var new_node;

        for( var objective_index = 0; objective_index < objectives.length; objective_index++ ) {
          parent = UI.cmat_app.addNode({id: objectives[objective_index]['id'], title: objectives[objective_index]['displayName']['text'], x: 0, y: 0}, null, true);
          nodes[objectives[objective_index]['id']] = parent;
          App.Objective.findQuery({objectivebank: objectiveBank.get('id'), objective: objectives[objective_index]['id'], children: true}).then(function(children){
            for( var child_index = 0; child_index < children.length; child_index++ ) {
              if( nodes[children[child_index]['id']] )
              {
                child = nodes[children[child_index]['id']];
              }
              else
              {
                nodes[children[child_index]['id']] = UI.cmat_app.addNode({id: children[child_index]['id'], title: children[child_index]['displayName']['text'], x: 0, y: 0}, null, true);
                child = nodes[children[child_index]['id']];
              }

              UI.cmat_app.addConnection({}, markerRadius, parent, child);
            }
          });
        }

        resolve(_self);
      });
    });
  }
});

module.exports = Map;
