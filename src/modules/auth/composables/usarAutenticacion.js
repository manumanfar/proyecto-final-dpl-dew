import { computed } from 'vue';
import { useStore } from 'vuex';

const usarAutenticacion = () => {

    const store = useStore();

    const crearUsuario = async (usuario) => {

        const resp = await store.dispatch('auth/crearUsuario', usuario);
        return resp;

    }

    const loguearUsuario = async (usuario) => {
        
        const resp = await store.dispatch('auth/loguearUsuario', usuario);
        return resp;
    }

    const chequearAutenticacionEstado = async () => {
        const resp = await store.dispatch('auth/chequearAutenticacionEstado');
        return resp;
    }

    const logout = () => {
        store.commit('auth/logout');
        //store.commit('journal/clearEntries');
    }

    return {
        crearUsuario,
        loguearUsuario,
        chequearAutenticacionEstado,
        logout,

        estadoAutenticacion: computed(() => store.getters['auth/estadoActual']),
        nombreUsuario: computed(() => store.getters['auth/nombreUsuario']),
    }
}

export default usarAutenticacion;