import articlesFirebase from '../../../firebase/realTimeDatabaseFirebase.js';
import { uploadBytes, ref, getDownloadURL, deleteObject, getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";
import firebaseApp from '@/firebase/storage.js';
import useHelpers from '@/helpers/randomNameUrl.js';

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

export const actualizarArticle = async ({ commit }, post) => {

    const useStorage = getStorage(firebaseApp);


    let { title, text1, text2, idUser, userName, file, id, url } = post;
    try {


        if (file !== undefined) {
            const urlName = useHelpers() + 'imageFirebase' + useHelpers();
            const storageRef = ref(useStorage, urlName);
            await uploadBytes(storageRef, file);

            if (url !== undefined) {
                let nameImage = url.split('/');
                nameImage = nameImage[7].split('?');

                const desertRef = ref(useStorage, nameImage[0]);
                await deleteObject(desertRef);
            }


            url = await getDownloadURL(ref(useStorage, urlName));
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
        const fecha = new Date();
        const date = fecha.toLocaleDateString('es-ES', options);
        const numberDate = new Date();
        const guardarDatos = { title, text1, text2, idUser, userName, url, date, numberDate };
        const { data } = await articlesFirebase.put(`/article/${id}.json`, guardarDatos);

        data.id = id;

        commit('actualizarArticle', { ...data });

    } catch (error) {
        console.log(error, 'No se ha podido actualizar')
    }
}


export const crearArticle = async ({ commit }, post) => {

    const useStorage = getStorage(firebaseApp);

    const { title, text1, text2, idUser, userName, file } = post;
    const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'numeric' };
    const fecha = new Date();
    const date = fecha.toLocaleDateString('es-ES', options);
    const numberDate = new Date();

    const urlName = useHelpers() + 'imageFirebase' + useHelpers();
    const storageRef = ref(useStorage, urlName);
    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(ref(useStorage, urlName));

    const datosGuardar = { userName, title, text1, text2, idUser, url, date, numberDate };

    const { data } = await articlesFirebase.post('/article.json', datosGuardar);

    datosGuardar.id = data.name;

    commit('insertarArticle', datosGuardar)

}

export const borrarArticlePorId = async ({ commit }, article) => {

    const useStorage = getStorage(firebaseApp);

    if (article.url !== undefined) {
        let nameImage = article.url.split('/');
        nameImage = nameImage[7].split('?');

        const desertRef = ref(useStorage, nameImage[0]);
        await deleteObject(desertRef);
    }
    if (article) {
        const { data } = await articlesFirebase.get(`/coment.json`);
        if (data != undefined) {
            for (let id in data) {
                if (data[id].idArticle == article.id) {
                    await articlesFirebase.delete(`/coment/${id}.json`);
                }
            }
        }
    }

    if (article) {
        const { data } = await articlesFirebase.get(`/likes.json`);

        if (data != undefined) {
            for (let id in data) {
                if (data[id].idArticle == article.id) {
                    await articlesFirebase.delete(`/likes/${id}.json`);
                }
            }
        }
    }

    await articlesFirebase.delete(`/article/${article.id}.json`);

    commit('borrarArticle', { ...article })

}