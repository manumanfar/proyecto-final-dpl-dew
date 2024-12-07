
// export const myAction = ( state ) => {

// }
export const asignarArticles = (state, articles) => {

    const ordenar = [...articles];
    ordenar.sort((a, b) => new Date(a.date).getTime() < new Date(b.date).getTime());
    state.articles = [...ordenar];
    state.isLoading = false;
}

export const cambiarStateActive = ( state ) => {
    if(state.active){
        state.active = false;
    }else{
        state.active = true;
    }
}