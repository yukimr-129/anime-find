import axios from "axios"

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_RAILS_API_URL
export const client = axios.create({
  baseURL: apiUrl
})