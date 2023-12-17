import axios from 'axios'

export const SERVER = axios.create({
    baseURL: 'http://localhost:8000'
})