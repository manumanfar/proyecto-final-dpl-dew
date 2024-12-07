
export const obtenerArticles = (state) => {

    if (state.articles.length === 0) return console.log('No hay articulos')

    return state.articles;
}

export const obtenerIsLoading = (state) => {
    return state.isLoading;
}

export const bucarArticuloPorTitle = ( state ) => {

    if (state.search != null) return state.articles.filter( articles => articles.title.toLowerCase().includes( state.search.toLocaleLowerCase()))

    return state.articles
}

export const obtenerUltimosArticles = (state) => {

    if (state.articles.length === 0) return console.log('No hay articulos')

    let i = 0;
    let lastArticles = [];
    for ( let ultimos of state.articles){
        if(i < 7){
            lastArticles.push({...ultimos})
        }
        i++;
    }

    return lastArticles;
}