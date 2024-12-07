import autenticarApi from "../../../firebase/autenticarApi.js";

export const crearUsuario = async ({ commit }, usuario) => {
    const { name, email, password } = usuario;

    try {

        const { data } = await autenticarApi.post(':signUp', { email, password, returnSecureToken: true });
        const { idToken, refreshToken, localId } = data;

        await autenticarApi.post(':update', { displayName: name, idToken });

        delete usuario.password;
        commit('loguearUsuario', { usuario, idToken, refreshToken, localId })

        return { ok: true };

    } catch (error) {

        return { ok: false, message: error.response.data.error.message };
    }
}

export const loguearUsuario = async ({ commit }, usuario) => {
    
    const { email, password } = usuario;

    try {

        const { data } = await autenticarApi.post(':signInWithPassword', { email, password, returnSecureToken: true });
        const { displayName, idToken, refreshToken, localId } = data;
        
        usuario.name = displayName;

        commit('loguearUsuario', { usuario, idToken, refreshToken, localId })

        return { ok: true };

    } catch (error) {

        return { ok: false, message: error.response.data.error.message };
    }
}

export const chequearAutenticacionEstado = async ({ commit }) => {
    const idToken = localStorage.getItem('idToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (!idToken) {
        commit('logout')
        return { ok: false, message: 'No hay token' }
    }

    try {

        const { data } = await autenticarApi.post(':lookup', { idToken })
       
        const { displayName, email, localId } = data.users[0];

        const usuario = {
            name: displayName,
            email,
        }

        commit('loguearUsuario', { usuario, idToken, refreshToken, localId })

        return { ok: true }

    } catch (error) {
        commit('logout')
        return { ok: false, message: error.response.data.error.message }
    }
}