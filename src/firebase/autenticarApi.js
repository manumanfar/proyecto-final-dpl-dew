import axios from "axios";

const autenticarApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyDAWdC1eFBcPaLT8Ppgr9ox1nOu_-BoqHM',
    }
});

export default autenticarApi;