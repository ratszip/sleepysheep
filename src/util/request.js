import axios from 'axios'

const request = axios.create({
    // baseURL: 'http://116.204.65.79:8080/',
    baseURL: "http://localhost:8080/",
})

// 请求拦截器

// 响应拦截器


export default request