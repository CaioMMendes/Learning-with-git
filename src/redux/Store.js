import {
    configureStore
} from "@reduxjs/toolkit";
import livrosReducer from './LivrosSlice'
import isDarkReducer from './IsDarkSlice'
import isLoggedReducer from './isLoggedSlice'
import googleLoginReducer from './GoogleLoginSlice'
import avatarImageReducer from './avatarImage'
import recoverPasswordReducer from './RecoverPasswordSlice'
import emailSentReducer from './EmailSentSlice'


export default configureStore({
    reducer: {
        livrosRedux: livrosReducer,
        isDarkRedux: isDarkReducer,
        isLoggedRedux: isLoggedReducer,
        googleLoginRedux: googleLoginReducer,
        avatarImageRedux: avatarImageReducer,
        recoverPasswordRedux: recoverPasswordReducer,
        emailSentRedux: emailSentReducer,
    }
})