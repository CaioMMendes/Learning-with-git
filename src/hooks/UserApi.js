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
    }

    // register:



})