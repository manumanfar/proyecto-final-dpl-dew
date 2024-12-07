import comentsToRealTimeDatabaseFirebase from '../../../firebase/realTimeDatabaseFirebase.js';

export const cargarComents = async ({ commit }) => {

    try {
        const { data } = await comentsToRealTimeDatabaseFirebase.get('/coment.json');

        const coments = [];
        for (let id in data) {

            coments.push({
                id,
                ...data[id]
            })
        }
        commit('asignarComents', coments);

        return { ok: true };
    } catch (error) {
        return { ok: false, message: error.response.data.error.message };
    }
}

export const addComents = async ({ commit }, coment) => {

    try {
        // const {
        //     opinion,
        //     idArticle,
        //     idUser,
        //     userName,
        //     handUp,
        //     date
        // } = coment;
        const { data } = await comentsToRealTimeDatabaseFirebase.post('/coment.json', coment);

        const coments = [];
        for (let id in data) {

            coments.push({
                id,
                ...data[id]
            })
        }
        commit('asignarComents', coments);

        return { ok: true };
    } catch (error) {
        return { ok: false, message: error.response.data.error.message };
    }
}

export const deleteComent = async ({ commit }, coment) => {
    try {
        // const {
        //     opinion,
        //     idArticle,
        //     idUser,
        //     userName,
        //     handUp,
        //     date
        // } = coment;
        await comentsToRealTimeDatabaseFirebase.delete(`/coment/${coment}.json`);


        const { data } = await comentsToRealTimeDatabaseFirebase.get('/coment.json');

        const coments = [];
        for (let id in data) {

            coments.push({
                id,
                ...data[id]
            })
        }
        commit('asignarComents', coments);


        return { ok: true };
    } catch (error) {
        return { ok: false, message: error.response.data.error.message };
    }

}

export const cargarHandUps = async ({ commit }) => {

    try {
        const { data } = await comentsToRealTimeDatabaseFirebase.get('/likes.json');

        const likes = [];
        for (let id in data) {

            likes.push({
                id,
                ...data[id]
            })
        }
        commit('asignarLikes', likes);

        return { ok: true };
    } catch (error) {
        return { ok: false, message: error.response.data.error.message };
    }
}


export const handUpUpdate = async ({ commit }, like) => {
    
    try {

        if (like.handUp == true) {
            like.handUp = false;
            await comentsToRealTimeDatabaseFirebase.put(`/likes/${like.id}.json`, like);
        } else {
            like.handUp = true;
            await comentsToRealTimeDatabaseFirebase.put(`/likes/${like.id}.json`, like);
        }
        const { data } = await comentsToRealTimeDatabaseFirebase.get('/likes.json');

        const likes = [];
        for (let id in data) {

            likes.push({
                id,
                ...data[id]
            })
        }
        commit('asignarLikes', likes);



        return { ok: true };
    } catch (error) {
        return { ok: false, message: error.response.data.error.message };
    }

}

export const handUpCreate = async ({ commit }, like) => {
    try {
        await comentsToRealTimeDatabaseFirebase.post('/likes.json', like);

        const { data } = await comentsToRealTimeDatabaseFirebase.get('/likes.json');

        const likes = [];
        for (let id in data) {

            likes.push({
                id,
                ...data[id]
            })
        }
        commit('asignarLikes', likes);
        return { ok: true };
    } catch (error) {
        return { ok: false, message: error.response.data.error.message };
    }
}