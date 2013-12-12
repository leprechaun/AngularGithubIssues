'use strict';

function ResourceCachingProxy(resource, methods_to_cache){
  this._cache = {};
  this._resource = resource;

  var methods = "get,query".split(",");
  for( var i in methods ){
    this[methods[i]] = this._makeProxy(this, methods[i]);
  }
}

ResourceCachingProxy.prototype._makeProxy = function(self, method){
  var meth = method;
  this._cache[method] = {};
  var self = self;
  return function(args, callback){
    var args_stringified = JSON.stringify(args);
    if(!(args_stringified in self._cache[meth])){
      var result = self._resource[meth].apply(self._resource, arguments);
      self._cache[meth][args_stringified] = result;
    }
    else {
      var result = self._cache[meth][args_stringified];
      if(arguments.length == 0){
        true;
      }
      else if(typeof(arguments[0]) == 'function'){
        arguments[0](result);
      }
      else{
        arguments[1](result);
      }
    }

    return result;
  };
}



/* Services */
var myModule = angular.module('galleryServices', ['ngResource']);
myModule.factory('Gallery', function($resource){
  var Github = {
    issues: $resource('https://api.github.com/issues/', {}, {
      search: {
        method: "GET",
        url: "https://api.github.com/search/issues/",
        params: {q: "", sort: "created", order: "asc", access_token: oauth_access_token}
      }
    })
  };
  return Github;
});
