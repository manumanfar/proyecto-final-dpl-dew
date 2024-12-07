export default {

    path: '/Actualizar-post/:id',
    name: 'actualizar-post',
    component: () => import(/*webpackChunkName: "Crear-Post"*/ '../components/ActualizarPost.vue'),
    
}