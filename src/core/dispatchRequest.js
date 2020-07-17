import http from './http';
import transformData from './transformData';
import combineURL from '../helpers/combineURL';
import isAbsoluteURL from '../helpers/isAbsoluteURL';

/**
 * Dispatch a request to the server using the configured adapter
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURL(config.baseURL, config.url);
  }

  // Ensure header exist
  config.header = config.header || {};

  // Flatten headers
  config.header = Object.assign(
    {},
    config.header.common || {},
    config.header[config.method] || {},
    config.header || {}
  );

  ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'].forEach(key => {
    delete config.header[key];
  });

  return http(config).then(response => {
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  })
}

export default dispatchRequest;
