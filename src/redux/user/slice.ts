import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginService } from '../../services/user'
import { message } from 'antd'

interface UserState {
  submitLoading: boolean
  token: string | null
}

const initialState: UserState = {
  submitLoading: false,
  token: null
}

export const signIn = createAsyncThunk(
  'userSlice/signIn',
  async (parameters: { username: string; password: string }) =>
    await loginService(parameters.username, parameters.password)
)

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    onLogout: (state: UserState) => {
      state.token = null
      window.location.reload()
    }
  },
  extraReducers: {
    [signIn.pending.type]: (state: UserState) => {
      state.submitLoading = true
    },
    [signIn.fulfilled.type]: (state: UserState, action: PayloadAction<UserState>) => {
      state.token = action.payload.token
      state.submitLoading = false
      message.success('登录成功')
      window.location.reload()
    },
    [signIn.rejected.type]: (state: UserState) => {
      state.submitLoading = false
      message.success('登录失败')
    }
  }
})

export const { onLogout } = userSlice.actions
