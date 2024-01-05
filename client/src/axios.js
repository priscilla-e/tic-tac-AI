import axios from 'axios'

export const SERVER = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
})