import store from "@/store";

const siGuardaAutenticacion = async( to, from, next ) => {

    const { ok } = await store.dispatch('auth/chequearAutenticacionEstado')

    if( ok ) next()
    else next({ name: 'loguearse' })
}

export default siGuardaAutenticacion;