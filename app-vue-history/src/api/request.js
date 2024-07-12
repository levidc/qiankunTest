// 可以通过axios的transformResponse方法，这个方法的作用是在传递给then/catch前，允许修改响应数据
import Vue from 'vue'
import axios from 'axios'
import store from '../store/index'
export const temp = new Vue()
axios.withCredentials = false
// 接口统一code后待后续添加响应处理
// axios.defaults.retryCount = 4
// axios.defaults.retryDelay = 2000
// 'Content-Type: application/json '
// axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded"
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api/dos' : '/dos'
const request = axios.create({
  // transformResponse: function (data) {
  //   // 这里的data是字符串，在这个字符串的是没有丢失精度的，所以需要在这里先把精度调好
  //   try {
  //     return JSONbig.parse(data)
  //   } catch {
  //     return data
  //   }
  // },
  timeout: 200000
})
request.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token')
  if (config.url.indexOf('login') == -1 && (!token || token === 'undefined' || token === 'null')) {
    setTimeout(() => {
      temp.$msg({
        type: 'error',
        text: 'token已失效，请重新登录'
      })
      store.dispatch('logout')
    }, 200)
  }
  config['headers']['Authentication'] = token
  return config
}, error => {
  return Promise.reject(error)
})
request.interceptors.response.use(res => {
  const statusCode = res.status
  const msg = res.data.msg
  const dataStruct = Object.keys(res.data)
  if (dataStruct && dataStruct.length == 1 && dataStruct[0] === 'msg' && msg !== 'success') {
    temp.$msg({
      type: 'error',
      text: temp.$trans(msg)
    })
    return Promise.reject(msg)
  }
  const code = res.data && res.data.code || '200'
  //  用户、策略等 res.data.code 之前多数接口为res.data.error.code
  // 成功code'200',部分返回200
  // console.log('msg', msg)
  if (statusCode == 200) {
    switch (code) {
      case '200':
        return res.data
      case 200:
        return res.data
      case 'buz-error':
        if (msg.indexOf('username:') > -1 && msg.indexOf('already exits') > -1) {
          temp.$msg({
            type: 'error',
            text: '用户名:' + msg.match(/\s+(\w+)/)[0].trim() + '已存在'
          })
          return Promise.reject(msg)
        } else if (msg.indexOf('group Already exists ：') > -1) {
          temp.$msg({
            type: 'error',
            text: '群组名:' + msg.split('group Already exists ：')[1] + '已存在'
          })
          return Promise.reject(msg)
        }
        if (msg === 'token timeout' || msg === 'token已过期，请重新登录' || msg === 'token is timeout') {
          setTimeout(() => {
            store.dispatch('logout')
          }, 200)
          return Promise.reject(msg)
        }
        if (msg === 'auth-error') {
          temp.$msg({
            type: 'error',
            text: '没有相关权限，请稍后重试'
          })
          // this.$router.push({ name: '' })
          return Promise.reject(msg)
        }
        if (msg.indexOf('permission list is conflict with permission group') > -1) {
          temp.$msg({
            type: 'error',
            text: `当前权限列表与组合包${msg.match(/【.*】/)[0]}中权限列表冲突`
          })
          return Promise.reject(msg)
        }
        temp.$msg({
          type: 'error',
          text: temp.$trans(msg)
        })
        return Promise.reject(msg)
      case 'auth-error':
        temp.$msg({
          type: 'error',
          text: '没有相关权限，请稍后重试'
        })
        return Promise.reject(msg)
      case 'sys-error':
        // temp.$msg({
        //   type: 'error',
        //   text: '系统繁忙，请重试'
        // })
        temp.$msg({
          type: 'error',
          text: temp.$trans(msg)
        })
        return Promise.reject(msg)
      default:
        temp.$msg({
          type: 'error',
          text: temp.$trans(msg)
        })
        return Promise.reject(msg)
    }
  }
}, error => {
  if (error.request.readyState == 4 && error.request.status == 0) {
    temp.$msg({
      type: 'error',
      text: temp.$trans('timeoutexception')
    })
    return
  }
  // 设置重新请求的次数及延时
  if (!error.config.retryCount) {
    if (temp.$trans(error.message) === error.message) {
      return Promise.reject(error)
    } else {
      temp.$msg({
        type: 'error',
        text: temp.$trans(error.message)
      })
      return Promise.reject(error)
    }
  } else {
    error.config.selfRetryCount = error.config.selfRetryCount || 1
    if (error.config.selfRetryCount <= error.config.retryCount) {
      error.config.selfRetryCount++
    } else {
      return Promise.reject(error)
    }
    var backoff = new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, error.config.retryDelay || 5000)
    })
    // config.url调用会叠加baseUrl
    // error.config.url = error.config.url.substr(error.config.url.lastIndexOf('/api/dos'))
    // console.log(error.config.url);
    backoff.then(() => {
      request(error.config)
    })
  }
})

Vue.prototype.listAlarm = function () {
  // 告警权限控制
  const api = store.state.api || JSON.parse(localStorage.getItem('api') || null)
  if (!api['admin:ListAlertController']) return
  let red = 0
  let yellow = 0
  let orange = 0
  listAlerts({
    ipAddress: '',
    alertRuleName: '',
    alertObject: '',
    alertLevel: '',
    alertClass: '',
    acknowledge: 'UNCONFIRM',
    startTime: '0',
    endTime: new Date().getTime() + 86400000
  }).then(res => {
    if (res.error.code === 0) {
      res.data.forEach(item => {
        switch (item.alertLevel) {
          case 'CRITICAL':
            red += 1
            break
          case 'MAJOR':
            orange += 1
            break
          case 'MINOR':
            yellow += 1
            break
        }
      })
      store.state.redCount = red || 0
      store.state.orangeCount = orange || 0
      store.state.yellowCount = yellow || 0
    }
  }).catch(error => {
    console.error(error)
  })
}
export default request
export const CancelToken = axios.CancelToken
