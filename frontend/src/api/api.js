import axios from "axios";
const local = process.env.REACT_APP_API_URL || 'http://localhost:5001'
const api = axios.create({
    baseURL : `${local}/api`
})

export default api
