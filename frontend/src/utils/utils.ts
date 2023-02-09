import axios, { AxiosError } from 'axios'

export function axiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
