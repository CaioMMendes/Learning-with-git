import axios from "axios";
// import useApiPrivate from "./useApiPrivate";
const api = axios.create({
    withCredentials: true,
    credentials: 'include',

    //Sempre tem que usar o vite_ para ele puxar o valor
    baseURL: import.meta.env.VITE_APIURL
})
export const apiPrivate = axios.create({
    withCredentials: true,
    headers: {
        'content-Type': 'application/json'
    },
    credentials: 'include',
    //Sempre tem que usar o vite_ para ele puxar o valor
    baseURL: import.meta.env.VITE_APIURL
})

// const apiPrivateToken = useApiPrivate()

export const UserApi = () => ({


    login: async (email, password, isChecked, linkAccount, googleId, picture) => {
        const response = await api.post('/login', {

            email,
            password,
            isChecked,
            linkAccount,
            googleId,
            picture
        })
        return response
    },

    register: async (email, password, name, logado, googleId, picture, ) => {
        const response = await api.post('/register', {
            email,
            password,
            name,
            googleId,
            picture,
            logado

        })
        return response
    },

    userInfo: async (token) => {
        const response = await api.post('/userinfo')
        return response
    },
    refresh: async () => {
        const response = await api.get('/refresh', {
            withCredentials: true,
            credentials: 'include',

        })
        return response
    },
    logout: async () => {

        const response = await api.post('/logout', {

        })
        return response
    },
    // avatar: async (image, userId) => {
    avatar: async (image, userId) => {

        const form = new FormData()
        // form.append('urserId',userId)
        form.append('file', image)
        form.append('userId', userId)
        const response = await api.post('/upload', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

        )
        return response
    },



    //   await axios
    //       .post(
    //           "http://localhost:3003/userinfo", {
    //               token
    //           }, {
    //               headers: {
    //                   Authorization: `Bearer ${token}`,
    //               },
    //           }
    //       )


    googleLogin: async (email, googleId, isChecked) => {
        const response = await api.post('/googleLogin', {




            email,
            googleId,
            isChecked
        })
        return response
    },

    recoverPassword: async (email) => {
        const response = await api.post('/recover-password', {




            email
        })
        return response
    },


    // apiPrivate: async () => {
    //     const response = await apiPrivateToken.post('/userinfo')
    //     return response
    // }
    // testeUpdateUser: async (name, email) => {
    //     const response = await apiPrivate.post('/update-user-info', {




    //         name,
    //         email
    //     })
    //     return response
    // }

})