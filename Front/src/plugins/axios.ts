import Axios, { type AxiosInstance } from 'axios'

const axios: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT
})

export default axios
