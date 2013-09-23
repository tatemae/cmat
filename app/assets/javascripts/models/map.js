Cmat.Map = Cmat.ModelBase.extend({

  user_id: DS.attr('number'),
  title: DS.attr('string'),
  payload: DS.attr('string'),
  objective_bank_id: DS.attr('string'),

  parsed_payload: function(){
    return $.parseJSON(this.get('payload') || '');
  }.property('payload'),

  build_tree: function(tree, activities, assets){
    for (var i=0; i<tree.length; i++) {
      if( tree[i]['childNodes'] ) {
        tree[i]['children'] = tree[i]['childNodes'];
        delete tree[i]['childNodes'];
        if(activities[tree[i]['id']]){
          tree[i]['children'].push(activities[tree[i]['id']]);
        }
        this.build_tree(tree[i]['children'], activities, assets);
      }
    }
  },

  load_from_mc3: function(objectiveBank){
    var _self = this;
    var objective_bank_id = objectiveBank.get('id');

    return new Ember.RSVP.Promise(function(resolve, reject){
      Cmat.Objective.findQuery({objective_bank_id: objective_bank_id, roots: true}).then(function(data){
        var rootids = data['ids'];
        var promises = [];

        for (var i=0; i<rootids.length; i++) {
          promises.push(Cmat.Objective.findQuery({objective_bank_id: objective_bank_id, objective: rootids[i], bulk: true}));
        }

        promises.push(Cmat.Asset.findQuery({objective_bank_id: objective_bank_id}));

        promises.push(Cmat.Activity.findQuery({objective_bank_id: objective_bank_id}));

        Ember.RSVP.all(promises).then(function(mc3_objects) {
          var tree = [];

          var asset_list = mc3_objects[rootids.length];
          var assets = {};

          for (var i=0; i<asset_list.length; i++) {
            var asset_node = asset_list[i];
            assets[asset_node['id']] = asset_node;
          }

          var activities_list = mc3_objects[rootids.length+1];
          var activities = {};

          for (var j=0; j<activities_list.length; j++) {
            var act_node = activities_list[j];
            if(act_node['assetIds'].length > 0){
              var asset_ids = act_node['assetIds'];
              act_node['children'] = []
              for (var q=0; q<asset_ids.length; q++) {
                act_node['children'].push(assets[asset_ids[q]]);
              }
            }
            activities[act_node['objectiveId']] = act_node;
          }

          for (var k=0; k<rootids.length; k++) {
            tree.push(mc3_objects[k]);
          }

          _self.build_tree(tree, activities, assets);

          UI.cmat_app.addNodesTree(tree);
          _self.set('objective_bank_id', objective_bank_id);
          UI.hideLoading();
          resolve(_self);
        });
      }, function(err_msg){
      });
    });
  },
});
