Ember.Application.initializer({
  name: 'twitterBootstrap',

  initialize: function(container) {
    // Twitter bootstrap will close dropdowns when any element is clicked. Add a class to prevent closing. See:
    // https://github.com/twitter/bootstrap/pull/8008
    $(document).on('click.bs.dropdown.data-api', '.stop-click-close > *', function (e) { e.stopPropagation(); });
  }

});