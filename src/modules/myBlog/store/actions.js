import articlesFirebase from '../../../firebase/realTimeDatabaseFirebase.js';
export const cargarArticle = async ({ commit }) => {

    try {
        const { data } = await articlesFirebase.get('/article.json');

        const articles = [];
        for (let id in data) {

            articles.push({
                id,
                ...data[id]
            })
        }
        commit('asignarArticles', articles);

        return { ok: true };
    } catch (error) {
        return { ok: false, message: error.response.data.error.message };
    }
}

