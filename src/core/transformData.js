/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
function transformData(data, headers, fns) {
  fns.forEach(fn => {
    if (typeof fn === 'function') {
      data = fn(data, headers);
    }
  });

  return data;
}

export default transformData
