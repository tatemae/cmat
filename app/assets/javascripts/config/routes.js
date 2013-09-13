Cmat.Router.map(function() {

  this.resource('maps', function(){
    this.route('new');
    this.resource('map', { path: '/:map_id' }, function(){
      this.route('add');
      this.route('duplicate');
      this.route('destroy');
      this.resource('node', function(){
        this.route('edit');
        this.route('new');
      });
    });
  });

  this.resource('users', function() {
    this.route('new');
  });

  this.resource('sessions', function() {
    this.route('new');
    this.route('destroy');
  });

});
