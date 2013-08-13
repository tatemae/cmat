var ModelBase = require('./model_base');

var Map = ModelBase.extend({

  cmat_types: {
    "mc3-objective%3Amc3.learning.topic%40MIT-OEIT": "topic",
    "mc3-objective%3Amc3.learning.outcome%40MIT-OEIT": "outcome",
    "mc3-activity%3Amc3.learning.activity.asset.based%40MIT-OEIT": "activity"
  },

  promises: 0,

  user_id: DS.attr('number'),
  title: DS.attr('string'),
  payload: DS.attr('string'),
  // mc3Source: DS.attr('string'),
  objective_bank_id: DS.attr('string'),
  // isMc3: DS.attr('boolean'),
  parsed_payload: function(){
    return $.parseJSON(this.get('payload') || '');
  }.property('payload'),

  _load_children: function(objective_bank_id, objectives, tree, parent){
    var _self = this;

    // retrieve the node's children
    _self.inc_promises();
    App.Objective.findQuery({objective_bank_id: objective_bank_id, objective: parent['id'], children: true}).then(function(children){
      
      if(children.length == 0) return;

      // add the children
      for (var i=0; i<children.length; i++) {
        var node = children[i];
        if (!parent.children) parent.children = [];
        parent.children.push(node);
        _self._load_children(objective_bank_id, objectives, tree, node);
      }
    });
  },

  _extract_params: function(params) {
    return params, params['objective_bank_id'], params['objectives'], params['tree'], params['parent'];
  },

  load_from_mc3: function(objectiveBank){
    var _self = this;
    var tree = [];
    var objective_bank_id = objectiveBank.get('id')
    var objectives = [];

    return new Ember.RSVP.Promise(function(resolve, reject){

      // get all of the objectives
      App.Objective.findQuery({objective_bank_id: objective_bank_id, roots: false}).then(function(all){

        // build a list of all objectives, indexed by their id
        for (var i=0; i<all.length; i++) {
          var node = all[i];
          objectives[node['id']] = node;
        }

        // get the root node ids
        App.Objective.findQuery({objective_bank_id: objective_bank_id, roots: true, only_ids: true}).then(function(roots){

          // build the first layer of the tree
          for (var i=0; i<roots.length; i++) {
            var node = roots[i];
            tree.push(node);
            _self._load_children(objective_bank_id, objectives, tree, node);
          }
        });
      });
      resolve(_self);
    });
  },

  inc_promises: function() {
    this.promises++;
    console.log("inc promises: " + this.promises);
  },

  dec_promises: function(tree){
    this.promises--;
    console.log("dec promises: " + this.promises);
    if (promises == 0) {
      this._render_tree(tree, 0);
    }
  },

  _indent: function(spaces){
    var indent = "";
    for(var j=0; j<spaces; j++){
      indent = indent + " ";
    }
    return indent;
  },

  _render_tree: function(tree, depth) {
    for(var i=0; i<tree.length; i++){
      var node = tree[i];
      console.log(this.indent(depth) + node['title']);
      this._render_tree(tree, depth+1);
    }
  },

  load_from_mc3_old: function(objectiveBank){
    _self = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      App.Objective.findQuery({objectivebank: objectiveBank.get('id'), roots: true}).then(function(data){
        var objectives = data[0];
        var nodes = [];
        var markerRadius = 2;
        var children = [];
        var child;
        var new_node;

        var deltaX = 200;
        var deltaY = 100;

        var workspaceWidth = UI.cmat_app.canvasWidth();
        var workspaceHeight = UI.cmat_app.canvasHeight();

        var x = workspaceWidth / 2;
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
          nodes[objectives[objective_index]['id']] = parent;
          App.Objective.findQuery({objectivebank: objectiveBank.get('id'), objective: objectives[objective_index]['id'], children: true, parent: parent}).then(function(data){
            var children = data[0],
                childs_parent = data[1],
                child;
            if(children.length == 0)
            {
              return;
            }

            var child_y = childs_parent.attrs['y']+deltaY;
            var children_width = (children.length-1)*deltaX;
            var child_x = childs_parent.attrs['x']-children_width/2;
            var cmat_child;
            for( var child_index = 0; child_index < children.length; child_index++ ) {
              cmat_child = _self.mc3_to_cmat(children[child_index], child_x, child_y);
              child = nodes[cmat_child['id']];
              if( child )
              {
                UI.cmat_app.addConnection({}, markerRadius, childs_parent, nodes[cmat_child['id']]);
              }
              else
              {
                child = UI.cmat_app.addNode(cmat_child, childs_parent, false);
                nodes[child['id']] = child;
              }

              child_x += deltaX;

              App.Activity.findQuery({objectivebank: objectiveBank.get('id'), objective: cmat_child['id'], parent: child}).then(function(data){
                var activities = data[0];
                var activity;
                var activity_parent = data[1];
                var activity_attrs;

                var activity_y = activity_parent.attrs['y']+deltaY;
                var activity_width = (activities.length-1)*deltaX;
                var activity_x = activity_parent.attrs['x']-activity_width/2;

                for( var activity_index = 0; activity_index < activities.length; activity_index++ ) {
                  activity_attrs = _self.mc3_to_cmat(activities[activity_index], activity_x, activity_y)
                  activity = UI.cmat_app.addNode(activity_attrs, activity_parent, false);
                }

                UI.getStage().draw();
              });
            }

            UI.getStage().draw();
          });
          // x += deltaX;
          // if (x > workspaceWidth) {
            // even_row = !even_row;
            // var remainingNodes = number_of_nodes - objective_index;
            // if (remainingNodes < nodes_per_row) {
            //   x = (workspaceWidth - (remainingNodes-2)*deltaX) / 2;
            // } else {
            //   x = deltaX / 2;
            // }
            // if (even_row) {
            //   x += deltaX / 2;
            // }
            y += deltaY*3;
          // }
        }

        console.log("number of nodes: " + number_of_nodes);

        UI.getStage().draw();

        resolve(_self);
      });
    });
  },

  mc3_to_cmat: function(objective, x, y) {
    return {
      id: objective['id'],
      title: objective['displayName']['text'],
      info: objective['description']['text'],
      type: this.cmat_types[objective['genusTypeId']],
      x: x,
      y: y
    };
  }
});

module.exports = Map;
