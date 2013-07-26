var Toolbar = DS.Model.extend({
  showRelationships: DS.attr('boolean'),
  showRelationshipLabels: DS.attr('boolean'),
  showNodeLabels: DS.attr('boolean'),
  showNodeDescriptions: DS.attr('boolean')
}).reopenClass({
  adapter: DS.LSAdapter.create()
});

module.exports = Toolbar;