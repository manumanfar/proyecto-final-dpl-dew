
// export const myGetter = ( state ) => {
//  return state
// }

export const obtenerComents = (state) => {

    if (state.coments.length === 0) return console.log('No hay Comentarios')

    return state.coments;
}

export const obtenerLikes = (state) => {

    if (state.likes.length === 0) return console.log('No hay Likes')

    return state.likes;
}

export const obtenerIsLoading = (state) => {
    return state.isLoading;
}

