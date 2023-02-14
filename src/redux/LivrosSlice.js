import {
    createSlice
} from "@reduxjs/toolkit";



export const livrosSlice = createSlice({
    name: 'livrosList',
    initialState: {
        livros: []
    },
    reducers: {
        changeLivros(state, {
            payload
        }) {
            return {
                ...state,
                livros: payload
            }
        }
    }
})

export const {
    changeLivros,
} = livrosSlice.actions
export const selectLivros = state => state.livrosList

export default livrosSlice.reducer