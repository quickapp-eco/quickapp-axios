import defaults from "../defaults";
import InterceptorManager from './interceptorManager';
import dispatchRequest from './dispatchRequest';

/**
 * Create a new instance of Fetch
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Fetch(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request
 */
Fetch.prototype.request = function request(config) {
  config = Object.assign({}, defaults, { method: 'get' }, this.defaults, config);
  config.method = config.method.toLowerCase();

  const chain = [dispatchRequest, undefined];
  let promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
['delete', 'get', 'head', 'options'].forEach(method => {
  Fetch.prototype[method] = function (url, config) {
    return this.request({
      ...(config || {}), method, url
    });
  }
});

['post', 'put', 'patch'].forEach(method => {
  Fetch.prototype[method] = function (url, data, config) {
    return this.request({
      ...(config || {}), method, url, data
    });
  }
});

export default Fetch;
