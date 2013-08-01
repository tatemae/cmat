var Toolbar = require('../models/toolbar');
var Node = require('../models/node');
var ApplicationRoute = Ember.Route.extend({

  renderTemplate: function() {
    this.render();
    this.render("toolbar", { outlet: "toolbar", into: "application" });
    // Twitter bootstrap will close dropdowns when any element is clicked. Add a class to prevent closing. See:
    // https://github.com/twitter/bootstrap/pull/8008
    $(document).on('click.bs.dropdown.data-api', '.stop-click-close > *', function (e) { e.stopPropagation(); });
  },

  setupController: function(controller, model){
    this.controllerFor('node').set('content', Node.find('current'));
    this.controllerFor('toolbar').set('content', Toolbar.find('current'));
  }

});

module.exports = ApplicationRoute;

