export interface GithubUser {
  login: string
  id: number | string
  avatar_url: string
  html_url: string
  public_repos: string
  followers: number
  items: any
  total_count: number
  action: () => void
}
export interface GithubUsersData {
  total_count: number
  items: GitUser[]
}
export type GitUser = Pick<GithubUser, 'login' | 'id' | 'avatar_url' | 'html_url' | 'public_repos' | 'followers'>[]
