import request from './request'
// login
export function login (data) {
  return request({
    method: 'post',
    url: 'login',
    data
  })
}
