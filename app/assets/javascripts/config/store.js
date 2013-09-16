var Adapter = DS.RESTAdapter.extend({
  namespace: 'api',
  ajax: function(url, type, hash){
    if(hash){
      var csrfToken = $('meta[name="csrf-token"]').attr('content');
      if(!hash.data){
        hash.data = {};
      }
      hash.data.auth_token = $('meta[name="authentication-token"]').attr('content');
      hash.beforeSend = function(xhr){
        xhr.setRequestHeader('X-CSRF-Token', csrfToken);
      };
    }
    return this._super(url, type, hash);
  }
});

Cmat.Store = DS.Store.extend({ adapter: Adapter.create() });
