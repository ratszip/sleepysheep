import axios from 'axios'
// import { Toast } from 'vant';
const request = axios.create({
    baseURL: 'http://113.125.22.29:8081/',
    // baseURL: "http://localhost:8081/",
    timeout: 150000
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
 
//响应拦截器
// request.interceptors.response.use(response => {
//     endLoading();
//     return response.data
// })

export default request