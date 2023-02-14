import {
    configureStore
} from "@reduxjs/toolkit";
import livrosReducer from './LivrosSlice'


export default configureStore({
    reducer: {
        livrosList: livrosReducer,
    }
})