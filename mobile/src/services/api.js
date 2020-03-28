import axios from 'axios'

const api = axios.create({
    baseURL:'http://10.20.36.101:3333'
})

export default api;