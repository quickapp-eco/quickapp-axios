import createError from './createError'

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
function settle(resolve, reject, response) {
  const { validateCode } = response.config;
  if (!response.code || !validateCode || validateCode(response.code)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.code,
      response.config,
      null,
    ));
  }
};

export default settle;
