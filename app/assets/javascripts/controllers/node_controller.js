Cmat.NodeController = Ember.ObjectController.extend({

  types: null,

  changeState: function(){
    if(this.get('state') == 'edit'){
      if (this.get('type') === 'activity'){
        this.set('types', ['activity']);
        this.set('isDisabled', true);
      }else{
        this.set('types', ['topic', 'outcome']);
        this.set('isDisabled', false);
      }
      this.transitionToRoute('node.edit');
    }
    if(this.get('state') == 'new'){
      this.set('isDisabled', false);
      this.set('type', 'topic');
      if (this.get('parent')){
        this.set('types', ['topic', 'outcome', 'activity']);
      }else{
        this.set('types', ['topic', 'outcome']);
      }
      this.transitionToRoute('node.new');
    }
  }.observes('state'),

  didInsertElement: function(){
    this.showUrlField(this);
  },

  showUrlField: function(controller) {
    var urlControls = $('#asset_controls');
    if (urlControls) {
      if (this.get('type') == 'activity')
        urlControls.removeClass('hide');
      else
        urlControls.addClass('hide');
    }
  }.observes('type')

});
