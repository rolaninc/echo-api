import axios from 'axios'

const client = axios.create()

client.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...config.headers,
    }
    return config
  },
  (e) => {
    return Promise.reject(e)
  }
)

export { client }
