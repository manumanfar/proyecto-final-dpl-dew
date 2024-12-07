import { useStore } from 'vuex';

const useUtilsComents = () => {

    const store = useStore();

    const comentsDeArticulo = (pilaComents, articuloId) => {

        return pilaComents.filter(coment => coment.idArticle == articuloId)
    }
    const numberComentsDeArticulo = (articuloId) => {

        let numeroComents = 0;
        const pilaComents = store.getters['coments/obtenerComents']
        if (pilaComents !== undefined) {
            const numeroComentsInArticle = pilaComents.filter(coment => coment.idArticle == articuloId);

            for (let item of numeroComentsInArticle) {
                numeroComents++;
            }
        }

        return numeroComents;
    }
    const addComent = async (opinion, idArticle) => {
        
        const idUser = store.state.auth.localId;
        const userName = store.state.auth.usuario.name;
        const stateComents = store.getters['coments/obtenerComents']
        const date = new Date();
        const coment = {
            opinion: opinion,
            idArticle: idArticle,
            idUser: idUser,
            userName: userName,
            handUp: '',
            date: date,
        }

        const checkComents = stateComents.filter(coment => coment.idUser == idUser && coment.idArticle == idArticle);

        if (checkComents.length == '0') {
            try {
                await store.dispatch('coments/addComents', coment)

                return { ok: true }
            } catch (error) {
                return { ok: false, message: error.response.data.error.message }
            }

        }

        return console.log('No puedes comentar mas de una vez');
    }

    const borrarComent = async (coment) => {

        try {
            await store.dispatch('coments/deleteComent', coment)

            return { ok: true }
        } catch (error) {
            return { ok: false, message: error.response.data.error.message }
        }
    }
    const numberLikesDeArticulo = (articuloId) => {

        let numeroComents = 0;
        const pilaLikes = store.getters['coments/obtenerLikes']
        if (pilaLikes !== undefined) {
            const numeroComentsInArticle = pilaLikes.filter(coment => coment.idArticle == articuloId);

            for (let item of numeroComentsInArticle) {
                if(item.handUp){
                    numeroComents++;
                }
            }
        }

        return numeroComents;
    }
    const handUpUpdateOrCreate = async (articleId) => {

        try {

            const checkLikes = store.getters['coments/obtenerLikes']
            
            if (checkLikes != undefined) {
                const localId = store.state.auth.localId;
                const single = checkLikes.filter(likes => likes.idUser == localId && likes.idArticle == articleId);
                
                if (single[0] != undefined) {
                    await store.dispatch('coments/handUpUpdate', single[0])
                } else {
                    
                    const nameUser = store.state.auth.usuario.name;
                    const like = {}
                    like.idUser = localId;
                    like.idArticle = articleId;
                    like.userName = nameUser;
                    like.handUp = true;
                  
                    await store.dispatch('coments/handUpCreate', like)
                }
            } else {
                const localId = store.state.auth.localId;
                const nameUser = store.state.auth.usuario.name;
                const like = {}
                like.idUser = localId;
                like.idArticle = articleId;
                like.userName = nameUser;
                like.handUp = true;
              
                await store.dispatch('coments/handUpCreate', like)
            }



            return { ok: true }
        } catch (error) {
            return { ok: false, message: error.response.data.error.message }
        }
    }
    return {
        comentsDeArticulo,
        addComent,
        borrarComent,
        numberComentsDeArticulo,
        handUpUpdateOrCreate,
        numberLikesDeArticulo,
    }
}

export default useUtilsComents;