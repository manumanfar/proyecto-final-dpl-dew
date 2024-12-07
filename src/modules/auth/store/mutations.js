
// export const myAction = ( state ) => {

// }

export const loguearUsuario = ( state, { usuario, idToken, refreshToken, localId}) => {

    if( idToken ){
        localStorage.setItem('idToken', idToken);
        state.idToken = idToken;
    }

    if( refreshToken ){
        localStorage.setItem('refreshToken', refreshToken);
        state.refreshToken = refreshToken;
    }

    state.usuario = usuario;
    state.status = 'authenticated';
    state.localId = localId;
}

export const logout = ( state ) => {

    state.usuario = null;
    state.localId = null;
    state.idToken = null;
    state.refreshToken = null;
    state.status = 'not-authenticated';

    localStorage.removeItem('idToken')
    localStorage.removeItem('refreshToken')
}