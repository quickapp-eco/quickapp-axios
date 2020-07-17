import http from './http'

/**
 * Load Data
 *
 * @param {Object} data The parameters of the request
 * @returns {Promise} The Promise to be fulfilled
 */
export function loadData(data = {}) {
  return http.get('/app/banner', data)
}
