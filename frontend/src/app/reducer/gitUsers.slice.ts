import { createSlice } from '@reduxjs/toolkit'

interface GitUser {
  id: number
}
interface GithubUsers {
  favorite_github_users: GitUser[]
}
const initialState: GithubUsers = {
  favorite_github_users: []
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      const item = action.payload
      const existLikeUser = state.favorite_github_users.find((match: any) => match.id === item.id)
      if (existLikeUser) {
        return {
          ...state,
          favorite_github_users: state.favorite_github_users.map((x: any) => (x.id === existLikeUser.id ? item : x))
        }
      } else {
        return {
          ...state,
          favorite_github_users: [...state.favorite_github_users, item]
        }
      }
    },
    removeFavorite: (state, action) => {
      state.favorite_github_users = state.favorite_github_users.filter((id) => id !== action.payload)
    }
  }
})
export const { addToFavorite, removeFavorite } = userSlice.actions
export default userSlice.reducer
