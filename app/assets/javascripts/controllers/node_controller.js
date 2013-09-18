Cmat.NodeController = Ember.ObjectController.extend({

  types: ['topic', 'outcome', 'activity', 'asset - url', 'asset - unknown'],

  changeState: function(){
    if(this.get('state') == 'edit'){
      this.transitionToRoute('node.edit');
    }
    if(this.get('state') == 'new'){
      this.transitionToRoute('node.new');
    }
  }.observes('state'),

  didInsertElement: function(){
    this.showUrlField(this);
  },

  showUrlField: function(controller) {
    var urlControls = $('#url_controls');
    if (urlControls) {
      if (this.get('type') == 'asset - url')
        urlControls.removeClass('hide');
      else
        urlControls.addClass('hide');
    }
  }.observes('type')

});
