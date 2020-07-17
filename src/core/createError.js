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
  const error = new Error(message);
  return enhanceError(error, config, code);
}

export default createError;
