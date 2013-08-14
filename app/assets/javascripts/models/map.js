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
  objective_bank_id: DS.attr('string'),

  parsed_payload: function(){
    return $.parseJSON(this.get('payload') || '');
  }.property('payload'),

  _load_children: function(objective_bank_id, objectives, tree, parent){
    var _self = this;

    // retrieve the node's children
    _self.inc_promises(_self);
    App.Objective.findQuery({objective_bank_id: objective_bank_id, objective: parent['id'], children: true}).then(function(children){
      var childrenids = children['ids'];
      if(childrenids.length == 0)
      {
        _self.dec_promises(_self, tree);
        return;
      }

      // add the childrenids
      for (var i=0; i<childrenids.length; i++) {
        var node = objectives[childrenids[i]];
        if (!parent.children) parent.children = [];
        parent.children.push(node);
        _self._load_children(objective_bank_id, objectives, tree, node);
      }
      _self.dec_promises(_self, tree);
    }, function(){
        _self.dec_promises(_self, tree);
      });
  },

  _extract_params: function(params) {
    return params, params['objective_bank_id'], params['objectives'], params['tree'], params['parent'];
  },

  load_from_mc3: function(objectiveBank){
    var _self = this;
    var tree = [];
    var objective_bank_id = objectiveBank.get('id');
    _self.obj_bank_id = objective_bank_id;
    var objectives = [];
    _self.promises = 0;

    return new Ember.RSVP.Promise(function(resolve, reject){

      // get all of the objectives
      _self.inc_promises(_self);
      App.Objective.findQuery({objective_bank_id: objective_bank_id}).then(function(all){
        // var all = Em.A();
        // response.forEach(function (objective) {
        //   all.pushObject(App.Objective.create(objective));
        // });

        // build a list of all objectives, indexed by their id
        for (var i=0; i<all.length; i++) {
          var node = all[i];
          objectives[node['id']] = node;
        }

        // get the root node ids
        _self.inc_promises(_self);

        App.Objective.findQuery({objective_bank_id: objective_bank_id, roots: true}).then(function(data){
          var rootids = data['ids'];
          // build the first layer of the tree
          for (var i=0; i<rootids.length; i++) {
            var node = objectives[rootids[i]];
            tree.push(node);
            _self._load_children(objective_bank_id, objectives, tree, node);
          }
          _self.dec_promises(_self, tree);
        }, function(){
          _self.dec_promises(_self, tree);
        });

        _self.dec_promises(_self, tree);
      });
      resolve(_self);
    });
  },

  inc_promises: function(self) {
    self.promises++;
  },

  dec_promises: function(self, tree){
    self.promises--;
    if (self.promises == 0) {
      var nodes = [];
      self._render_tree(self, tree, 0, nodes);
      UI.cmat_app.addNodes(nodes);
      self.set('objective_bank_id', self.obj_bank_id);
    }
  },

  _indent: function(spaces){
    var indent = "";
    for(var j=0; j<spaces; j++){
      indent = indent + " ";
    }
    return indent;
  },

  _render_tree: function(self, tree, depth, nodes) {
    for(var i=0; i<tree.length; i++){
      var node = tree[i];

      nodes.push(self._indent(depth) + node['displayName']['text'] + '|' + this.cmat_types[node['genusTypeId']] + '|' + node['description']['text'] + '|' + node['id']);
      if(node.children)
      {
        self._render_tree(self, node.children, depth+1, nodes);
      }
    }

  },
});

module.exports = Map;
