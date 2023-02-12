import axios, { AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
  }
}

const http = new Http().instance

export default http
