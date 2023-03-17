import axios from "axios";

const api = axios.create({
    withCredentials: true,
    credentials: 'include',
    //Sempre tem que usar o vite_ para ele puxar o valor
    baseURL: import.meta.env.VITE_APIURL
})
export const apiPrivate = axios.create({
    withCredentials: true,
    headers: {
        'content-Type': 'aplication/json'
    },
    credentials: 'include',
    //Sempre tem que usar o vite_ para ele puxar o valor
    baseURL: import.meta.env.VITE_APIURL
})

export const UserApi = () => ({

    login: async (email, password, isChecked) => {
        const response = await api.post('/login', {




            email,
            password,
            isChecked
        })
        return response
    },

    register: async (email, password, name) => {
        const response = await api.post('/register', {
            email,
            password,
            name
        })
        return response
    },

    token: async (token) => {
        const response = await api.post('/userinfo', {
            token
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
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
    }



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




})