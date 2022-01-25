import axios from "axios"

export const client = axios.create({
  baseURL: process.env.REACT_APP_RAILS_API_URL
})