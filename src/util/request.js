import axios from 'axios'

const request = axios.create({
    baseURL: 'http://114.55.88.242:8080'
})

// 请求拦截器

// 响应拦截器


export default request