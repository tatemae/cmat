var Toolbar = DS.Model.extend({
  isEditing: DS.attr('boolean'),
  showRelationships: DS.attr('boolean'),
  showRelationshipLabels: DS.attr('boolean'),
  showNodeLabels: DS.attr('boolean'),
  showNodeDescriptions: DS.attr('boolean')
});

module.exports = Toolbar;