export const localStorageToken = () => {


    //todo SERVE PARA GERAR OUTRO TOKEN CASO ALGUEM EDITE O TOKEN COM UM JSON INVALIDO



    function isJSONValid(jsonString) {
        try {
            JSON.parse(jsonString);
            return true;
        } catch (e) {
            return false;
        }
    }
    const valid = isJSONValid(localStorage.getItem('token'))

    if (valid) {
        return JSON.parse(localStorage.getItem("token"))
    } else {
        localStorage.setItem("token", "a")
    }

}