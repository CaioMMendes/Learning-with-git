import {
    configureStore
} from "@reduxjs/toolkit";
import livrosReducer from './LivrosSlice'
import isDarkReducer from './IsDarkSlice'
import isLoggedReducer from './isLoggedSlice'


export default configureStore({
    reducer: {
        livrosRedux: livrosReducer,
        isDarkRedux: isDarkReducer,
        isLoggedRedux: isLoggedReducer,
    }
})