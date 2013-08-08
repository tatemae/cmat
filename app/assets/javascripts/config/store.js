var Adapter = DS.RESTAdapter.extend({
  namespace: 'api',
  ajax: function(url, type, hash){
    if(hash){
      var token = $('meta[name="csrf-token"]').attr('content');
      hash.beforeSend = function(xhr){
        xhr.setRequestHeader('X-CSRF-Token', token); // TODO debug this code. The header is set but never sent.
      };
    }
    return this._super(url, type, hash);
  }
});

module.exports = DS.Store.extend({ adapter: Adapter.create() });
