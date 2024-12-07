import { useStore } from "vuex"


const usarAutenticacion = () => {

    const store = useStore();

    const obtenerPorId = () => {

        const coincidencias = [];
        const localId = store.getters["auth/obtenerLocalId"];
        const articulos = store.state.articles.articles;
        for (let articulo of articulos) {

            if (articulo.idUser === localId) {

                coincidencias.push({ ...articulo });
            }
        }
        if (store.state.articles.search != null) {
            return coincidencias.filter(articles => articles.title.toLowerCase().includes(store.state.articles.search.toLocaleLowerCase()))
        }

        return coincidencias.sort((a, b) => new Date(a.numberDate).getTime() < new Date(b.numberDate).getTime());
    }

    const actualizarPorId = (id) => {
        const articulos = store.getters['articles/obtenerArticles'];
        for (let articulo of articulos) {
            if (articulo.id === id) {
                return articulo;
            }
        }
        return null;
    }

    return {
        obtenerPorId,
        actualizarPorId,
    }
}

export default usarAutenticacion;