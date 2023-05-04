import Qs from 'qs'
export default {
  baseURL:
    'http://192.168.43.45:8080/',
  // 'http://localhost:8888',
  // 'http://magic-7gmqd9iafbefa003-1316423047.ap-shanghai.app.tcloudbase.com/uploadFiles',
  method: 'POST',

  transformRequest: [
    function (data) {
      return Qs.stringify(data)
    }
  ],

  transformResponse: [
    function (data) {
      if (typeof data === 'string') {
        return JSON.parse(data)
      }
      return data
    }
  ],

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },

  data: {},

  timeout: 30000,

  withCredentials: true,

  responseType: 'json',

  mapAk: '46ZX44iqGzFHXzOlQycxmxVw8LiKfSod'
}
