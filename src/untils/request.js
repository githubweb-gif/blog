import axios from 'axios'

let baseURL = ''
if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://106.53.102.65:3000/blog/'
} else {
  baseURL = 'http://localhost:3000/blog/'
}
console.log(baseURL)
const service = axios.create({
  baseURL,
  timeout: '5000'
})

service.interceptors.request.use(config => {
  // console.log(config)
  if (window.sessionStorage.getItem('views')) {
    config.headers['X-Views'] = window.sessionStorage.getItem('views')
  }
  // 在最后必须 return config
  return config
})

service.interceptors.response.use((response) => {
  const res = response.data
  return res
}
)

export default service
