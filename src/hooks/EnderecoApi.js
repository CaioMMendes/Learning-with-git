import axios from "axios";

const api = axios.create({
    //Sempre tem que usar o vite_ para ele puxar o valor
    baseURL: import.meta.env.VITE_APIURL
})

export const EnderecoApi = () => ({

    cadastrar: async (nome,
        telefone,
        email,
        sexo,
        localidade,
        cep,
        logradouro,
        uf,
        numero,
        complemento,
        bairro,
        pais) => {
        const response = await api.post('/cadastrar', {
            nome,
            telefone,
            email,
            sexo,
            localidade,
            cep,
            logradouro,
            uf,
            numero,
            complemento,
            bairro,
            pais,
        })
        return response
    },






})