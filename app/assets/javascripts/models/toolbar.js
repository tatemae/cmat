var Toolbar = DS.Model.extend({
  isEditing: DS.attr('boolean'),
  showRelationships: DS.attr('boolean'),
  showRelationshipLabels: DS.attr('boolean'),
  showNodeLabels: DS.attr('boolean'),
  showNodeDescriptions: DS.attr('boolean')
});

Toolbar.reopenClass({
  adapter: DS.LSAdapter.create()
});

module.exports = Toolbar;