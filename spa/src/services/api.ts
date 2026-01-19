import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.response.use(
  response => response,
  error => {
    const message
      = error.response?.data?.message
        || error.response?.data?.error
        || 'Unexpected error'

    return Promise.reject(new Error(message))
  },
)
