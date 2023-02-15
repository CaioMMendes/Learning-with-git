import {
    createSlice
} from "@reduxjs/toolkit";



export const isLoggedSlice = createSlice({
    name: 'isLogged',
    initialState: {
        isLogged: false
    },
    reducers: {
        changeIsLogged(state, {
            payload
        }) {
            return {
                ...state,
                isLogged: payload
            }
        }
    }
})

export const {
    changeIsLogged,
} = isLoggedSlice.actions
export const selectIsLogged = state => state.isLogged

export default isLoggedSlice.reducer