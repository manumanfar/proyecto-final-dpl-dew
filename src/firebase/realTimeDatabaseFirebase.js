
import axios from 'axios';


const articlesFirebase = axios.create({
    baseURL: 'https://dpl-dew-5da22-default-rtdb.europe-west1.firebasedatabase.app'
})

articlesFirebase.interceptors.request.use( (config)=> {
    config.params = {
        auth: localStorage.getItem('idToken'),
    }

    return config;
});

export default articlesFirebase;
