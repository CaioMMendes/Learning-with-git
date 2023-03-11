import axios from "axios";

const api = axios.create({
    //Sempre tem que usar o vite_ para ele puxar o valor
    baseURL: import.meta.env.VITE_APIURL
})

export const UserApi = () => ({

    login: async (email, password) => {
        const response = await api.post('/login', {
            email,
            password
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