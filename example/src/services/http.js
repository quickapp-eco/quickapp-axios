import fetch from '../../../src/main'

const DEFAULT_CONFIG = {
  BASE_URL: 'http://mock.be.mi.com/mock/1030'
}
const http = {}
const methods = ['get', 'post', 'put', 'delete']

const isSuccess = (res) => res.code === 0 || res.errorCode === 0
const resFormat = (res) => res.response || res.data

methods.forEach((v) => {
  http[v] = async (url, data, baseUrl = '') => {
    const fetchConfig = {
      method: v,
      url,
      data,
      baseURL: baseUrl || DEFAULT_CONFIG.BASE_URL
    }

    // Create fetch instance
    const instance = fetch.create()

    // Add a request interceptor
    instance.interceptors.request.use(
      cfg => cfg,
      error => Promise.reject(error)
    )

    // Add a response interceptor
    instance.interceptors.response.use(
      response => {
        // Set back data
        const rdata = response.data
        if (!isSuccess(rdata)) {
          const err = {
            message: rdata.message || rdata.reason,
            code: rdata.code || response.code
          }
          return Promise.reject(err)
        }
        return resFormat(rdata)
      },
      error => Promise.reject(error)
    )

    return instance
      .request(fetchConfig)
      .then(res => res)
      .catch(err => {
        const code = err.code
        const message = err.message || err.stack || '系统异常'
        return Promise.reject({ code, message })
      })
  }
})

export default http
