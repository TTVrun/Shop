import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CounterState = {
    isSignin: boolean
    token: string | null
}

const initialState = {
    isSignin: false,
    token: null
} as CounterState

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signin: (state, action: PayloadAction<string>) => {
            state.isSignin = true
            state.token = action.payload
        },
        logout: (state) => {
            state.isSignin = false
            state.token = null
        }
        // decrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value -= action.payload
        // }
    }
})

export const { signin, logout } = user.actions
export default user.reducer
