import { GithubUser, GithubUsersData } from '../types/profile'
import http from '../utils/http'

export const searchGithubUsers = (q: string | number, page: string | number, perPage: string | number) =>
  http.get<GithubUser>('searchGithubUsers', {
    params: {
      q: q,
      page: page,
      per_page: perPage
    }
  })
