
// export const myAction = ( state ) => {

// }
export const asignarComents = (state, coments) => {

    const ordenar = [...coments];
    ordenar.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime());
    state.coments = [...ordenar];
    state.isLoading = false;
}

export const asignarLikes = (state, likes) => {

    
    state.likes = [...likes];
    
}