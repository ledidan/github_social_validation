import { GitUser, GithubUser } from '../types/profile'
import http from '../utils/http'

export const searchGithubUsers = (
  q: string | number,
  page: string | number,
  perPage: string | number,
  signal?: AbortSignal
) =>
  http.get<GithubUser>('searchGithubUsers', {
    params: {
      q: q,
      page: page,
      per_page: perPage
    },
    signal
  })

export const findGithubUserProfile = (github_user_id: number | string) =>
  http.get<GitUser>(`findGithubUserProfile`, {
    params: {
      github_user_id
    }
  })

export const likeGithubUser = (github_user_id: string | number) =>
  http.post('likeGithubUser', {
    phoneNumber: localStorage.getItem('phoneNumber') || null,
    github_user_id
  })

export const getUserProfile = (github_user_id: any) => http.get<GitUser>('getUserProfile', github_user_id)
