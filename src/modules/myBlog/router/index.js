
export default {
    path: '/My-Blog',
    name: 'my-blog',
    component: () => import(/*webpackChunkName: "My-Blog"*/ '../components/MyBlog.vue'),
    children: [
        {
            path: '/Mostrar-My-Blog',
            name: 'mostrar-my-blog',
            component: () => import(/*webpackChunkName: "Mostrar-My-Blog"*/ '../views/MostrarMyBlog.vue'),
        },
        {
            path: '',
            redirect: {name: 'mostrar-my-blog'},
        },
    ]
}