import { Auth } from '../types/auth'
import http from '../utils/http'

export const createNewAccessCode = (phoneNumber: string) =>
  http.post<Auth>('createNewAccessCode', JSON.stringify({ phoneNumber }))

export const validateAccessCode = (accessCode: string, phoneNumber: string) =>
  http.post<Auth>('validateAccessCode', JSON.stringify({ accessCode, phoneNumber }))
