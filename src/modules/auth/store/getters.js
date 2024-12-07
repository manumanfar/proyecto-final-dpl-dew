
// export const myGetter = ( state ) => {
//  return state
// }

export const estadoActual = (state) => {
    return state.status;
}

export const nombreUsuario = (state) => {
    return state.usuario?.name || '';
}

export const obtenerLocalId = (state) => {
    return state.localId;
}

