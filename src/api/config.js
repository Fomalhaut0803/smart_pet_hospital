import Qs from 'qs'
export default {

  baseURL: 'http://192.168.1.102:8080/',
  // baseURL:'http://192.168.31.130:8880/',
  method: 'POST',

  transformRequest: [function (data) {
    return Qs.stringify(data)
  }],

  transformResponse: [function (data) {
    if (typeof data === 'string') {
      return JSON.parse(data)
    }
    return data
  }],

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },

  data: {

  },

  timeout: 30000,

  withCredentials: true,

  responseType: 'json',

  mapAk: '46ZX44iqGzFHXzOlQycxmxVw8LiKfSod'

}