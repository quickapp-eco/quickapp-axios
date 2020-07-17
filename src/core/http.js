import fetch from '@system.fetch';
import settle from './settle';
import createError from './createError';

/**
 * Execute a fetch request
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
function http(config) {
  return new Promise((resolve, reject) => {
    fetch.fetch(config)
      .then(res => {
        const responseData = res.data;

        const response = {
          code: responseData.code,
          data: responseData.data,
          headers: responseData.headers,
          config,
        };

        settle(resolve, reject, response);
      })
      .catch(error => {
        reject(createError(
          error.data,
          config,
          error.code,
        ));
      })
  });
}

export default http;
