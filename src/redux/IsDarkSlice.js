import {
    createSlice
} from "@reduxjs/toolkit";



export const isDarkSlice = createSlice({
    name: 'isDark',
    initialState: {
        isDark: false
    },
    reducers: {
        changeIsDark(state, {
            payload
        }) {
            return {
                ...state,
                isDark: payload
            }
        }
    }
})

export const {
    changeIsDark,
} = isDarkSlice.actions
export const selectIsDark = state => state.isDark

export default isDarkSlice.reducer