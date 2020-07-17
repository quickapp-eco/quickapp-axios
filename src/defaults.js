const DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

const defaults = {
  transformResponse: [],
  validateCode: function validateCode(code) {
    return code >= 200 && code < 300;
  }
};

defaults.header = {
  common: {}
};

['delete', 'get', 'head'].forEach(method => {
  defaults.header[method] = {};
});

['post', 'put', 'patch'].forEach(method => {
  defaults.header[method] = Object.assign({}, DEFAULT_CONTENT_TYPE);
});

export default defaults;
