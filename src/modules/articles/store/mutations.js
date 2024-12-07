
// export const myAction = ( state ) => {

// }

export const asignarArticles = (state, articles) => {
    
    const ordenar = [...articles];
    ordenar.sort((a, b) => new Date(a.numberDate).getTime() < new Date(b.numberDate).getTime());
    state.articles = [...ordenar]
    state.isLoading = false;
}

export const actualizarArticle = (state, actualizarArticle) => {

    const idx = state.articles.map(e => e.id).indexOf(actualizarArticle.id)
    state.articles[idx] = actualizarArticle;
}

export const insertarArticle = (state, guardarPost) => {
    state.articles.push(guardarPost);
}

export const borrarArticle = (state, article) => {    
    state.articles = state.articles.filter( a => a.id !== article.id);
}

export const actualizarSearch = (state, search) => {
    if(search != ''){
        state.search = search;
    }else{
        state.search = null;
    }
    
}
