/*!
 * quick-app-fetch.js v0.1.0
 * (c) 2020-2020 HeartCloud <ht1005cyh@163.com>
 * Released under the MIT License.
 */
  
import fetch$1 from '@system.fetch';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};
var defaults = {
  transformResponse: [function transformResponse(data) {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {}
    }

    return data;
  }],
  validateCode: function validateCode(code) {
    return code >= 200 && code < 300;
  }
};
defaults.header = {
  common: {}
};
['delete', 'get', 'head'].forEach(function (method) {
  defaults.header[method] = {};
});
['post', 'put', 'patch'].forEach(function (method) {
  defaults.header[method] = Object.assign({}, DEFAULT_CONTENT_TYPE);
});

function InterceptorManager() {
  this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 * @return {Number} An ID used to remove interceptor later
 */


InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @returns {Error} The error.
 */
function enhanceError(error, config, code) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  return error;
}
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @returns {Error} The created error.
 */


function createError(message, config, code) {
  var error = new Error(message);
  return enhanceError(error, config, code);
}

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */

function settle(resolve, reject, response) {
  var validateCode = response.config.validateCode;

  if (!response.status || !validateCode || validateCode(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.code, response.config, null));
  }
}

/**
 * Execute a fetch request
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */

function http(config) {
  return new Promise(function (resolve, reject) {
    fetch$1.fetch(config).then(function (res) {
      var responseData = res.data;
      var response = {
        code: responseData.code,
        data: responseData.data,
        headers: responseData.headers,
        config: config
      };
      settle(resolve, reject, response);
    })["catch"](function (error) {
      reject(createError(error.data, config, error.code));
    });
  });
}

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
function transformData(data, headers, fns) {
  fns.forEach(function (fn) {
    data = fn(data, headers);
  });
  return data;
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
function combineURL(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
}

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

/**
 * Dispatch a request to the server using the configured adapter
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */

function dispatchRequest(config) {
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURL(config.baseURL, config.url);
  } // Ensure header exist


  config.header = config.header || {}; // Flatten headers

  config.header = Object.assign({}, config.header.common || {}, config.header[config.method] || {}, config.header || {});
  ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'].forEach(function (key) {
    delete config.header[key];
  });
  return http(config).then(function (response) {
    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  })["catch"](function (reason) {
    if (reason && reason.response) {
      reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
    }

    return Promise.reject(reason);
  });
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
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
  config = Object.assign({}, defaults, {
    method: 'get'
  }, this.defaults, config);
  config.method = config.method.toLowerCase();
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
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
}; // Provide aliases for supported request methods


['delete', 'get', 'head', 'options'].forEach(function (method) {
  Fetch.prototype[method] = function (url, config) {
    return this.request(_objectSpread({}, config || {}, {
      method: method,
      url: url
    }));
  };
});
['post', 'put', 'patch'].forEach(function (method) {
  Fetch.prototype[method] = function (url, data, config) {
    return this.request(_objectSpread({}, config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
/**
 * Create an instance of Fetch
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Fetch} A new instance of Fetch
 */

function createInstance(defaultConfig) {
  var context = new Fetch(defaultConfig);
  var instance = Fetch.prototype.request.bind(context); // Copy Fetch.prototype and context to instance

  Object.assign(instance, Fetch.prototype, context);
  return instance;
} // Create the default instance to be exported


var fetch = createInstance(defaults); // Expose Fetch class to allow class inheritance

fetch.Fetch = Fetch; // Factory for creating new instances

fetch.create = function create(instanceConfig) {
  return createInstance(_objectSpread$1({}, defaults, {}, instanceConfig));
};

export default fetch;
