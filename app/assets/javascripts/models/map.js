var ModelBase = require('./model_base');

var Map = ModelBase.extend({

  promises: 0,

  user_id: DS.attr('number'),
  title: DS.attr('string'),
  payload: DS.attr('string'),
  objective_bank_id: DS.attr('string'),

  parsed_payload: function(){
    return $.parseJSON(this.get('payload') || '');
  }.property('payload'),

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

            // recurse down into the children
            _self.load_children(objective_bank_id, objectives, tree, node);
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

  load_children: function(objective_bank_id, objectives, tree, parent){
    var _self = this;

    // retrieve the node's children
    _self.inc_promises(_self);
    App.Objective.findQuery({objective_bank_id: objective_bank_id, objective: parent['id'], children: true}).then(function(children){
      var childrenids = children['ids'];
      if(childrenids.length == 0) {
        _self.dec_promises(_self, tree);
        return;
      }

      // add the children
      for (var i=0; i<childrenids.length; i++) {
        var node = objectives[childrenids[i]];
        if (!parent.children) parent.children = [];
        parent.children.push(node);
        _self.load_children(objective_bank_id, objectives, tree, node);
      }
      _self.dec_promises(_self, tree);
    }, function(){
        _self.dec_promises(_self, tree);
      });
  },

  inc_promises: function(self) {
    self.promises++;
  },

  dec_promises: function(self, tree){
    self.promises--;
    if (self.promises == 0) {
      UI.cmat_app.addNodesTree(tree);
      self.set('objective_bank_id', self.obj_bank_id);
      UI.hideLoading();
    }
  },

});

module.exports = Map;