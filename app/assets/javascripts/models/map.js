var ModelBase = require('./model_base');

var Map = ModelBase.extend({

  cmat_types: {
    "mc3-objective%3Amc3.learning.topic%40MIT-OEIT": "topic",
    "mc3-objective%3Amc3.learning.outcome%40MIT-OEIT": "outcome"
  },

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

        var deltaX = 200;
        var deltaY = 100;

        var workspaceWidth = UI.cmat_app.canvasWidth();
        var workspaceHeight = UI.cmat_app.canvasHeight();

        var x = deltaX / 2;
        var y = deltaY;
        var number_of_nodes = objectives.length;
        var nodes_per_row = (workspaceWidth / deltaX) - 1;
        var rows = number_of_nodes / nodes_per_row;
        var map_height = rows * deltaY;
        var even_row = false;

        if (number_of_nodes < nodes_per_row) {
          x = (workspaceWidth - ((number_of_nodes - 1) * deltaX)) / 2;
        }

        for( var objective_index = 0; objective_index < objectives.length; objective_index++ ) {
          parent = UI.cmat_app.addNode(_self.mc3_to_cmat(objectives[objective_index], x, y), null, false);
          // nodes[objectives[objective_index]['id']] = parent;
          // App.Objective.findQuery({objectivebank: objectiveBank.get('id'), objective: objectives[objective_index]['id'], children: true}).then(function(children){
          //   for( var child_index = 0; child_index < children.length; child_index++ ) {
          //     if( nodes[children[child_index]['id']] )
          //     {
          //       child = nodes[children[child_index]['id']];
          //     }
          //     else
          //     {
          //       nodes[children[child_index]['id']] = UI.cmat_app.addNode(_self.mc3_to_cmat(children[child_index], x, y+100), null, true);
          //       child = nodes[children[child_index]['id']];
          //     }

          //     UI.cmat_app.addConnection({}, markerRadius, parent, child);
          //   }
          // });
          x += deltaX;
          if (x > workspaceWidth) {
            even_row = !even_row;
            var remainingNodes = number_of_nodes - objective_index;
            if (remainingNodes < nodes_per_row) {
              x = (workspaceWidth - (remainingNodes-2)*deltaX) / 2;
            } else {
              x = deltaX / 2;
            }
            if (even_row) {
              x += deltaX / 2;
            }
            y += deltaY;
          }
        }

        console.log(number_of_nodes);

        UI.getStage().draw();

        resolve(_self);
      });
    });
  },

  mc3_to_cmat: function(objective, x, y) {
    return {
      id: objective['id'],
      title: objective['displayName']['text'],
      type: this.cmat_types[objective['genusTypeId']],
      x: x,
      y: y
    };
  }
});

module.exports = Map;
