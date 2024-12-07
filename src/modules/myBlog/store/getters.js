
// export const myGetter = ( state ) => {
//  return state
// }

export const obtenerArticles = (state) => {

    if (state.articles.length === 0) return console.log('No hay articulos')

    return state.articles;
}

export const obtenerIsLoading = (state) => {
    return state.isLoading;
}

