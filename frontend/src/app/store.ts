import { userSlice } from './reducer/gitUsers.slice'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/gitUsers.slice'
export const store = configureStore({
  reducer: {
    favoriteUser: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
