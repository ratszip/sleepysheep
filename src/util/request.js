import axios from 'axios'
// import { Toast } from 'vant';
const request = axios.create({
    // baseURL: 'http://175.178.114.30:8081/',
    baseURL: "http://localhost:8081/",
    timeout: 15000
})


// let loading       
// function startLoading() {  
//     loading = Toast.loading({
//         message: '加载中...',
//         forbidClick: true,
//     })
// }
 
// function endLoading() {   
//     loading.clear()
// }
// 添加请求拦截器
// request.interceptors.request.use(config => {
//     startLoading();
//     return config
// }, error => {
//     return Promise.reject(error)
// });
 
// 响应拦截器
request.interceptors.response.use(
    // 在2xx范围内的任何状态代码都会触发此函数，这里主要用于处理响应数据
    response => {
      return response
    },
    // 任何超出2xx范围的状态码都会触发此函数，这里主要用于处理响应错误
    // error => {
    //   const { status } = error.response
    //   if (status === 401) { // 未授权
    //   } else if (status === 403) { // 没有权限
    //   } else if (status === 404) { // 资源不存在
    //     Toast.fail({
    //       message: '请求资源不存在',
    //       forbidClick: true
    //     })
    //   } else if (status >= 500) { // 服务端异常
    //     Toast.fail({
    //       message: '服务端异常，请稍后重试',
    //       forbidClick: true
    //     })
    //   }
  
    //   // 将未处理的异常往外抛
    //   return Promise.reject(error)
    // }
    )

export default request