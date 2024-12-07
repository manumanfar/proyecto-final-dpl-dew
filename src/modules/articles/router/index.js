

export default {
    path: '/articles',
    name: 'articles',
    component: () => import(/*webpackChunkName: "Articles"*/ '../components/Articles.vue'),
    children: [
        {
            path: '/Mostrar-Todo',
            name: 'mostrar-todo',
            component: () => import(/*webpackChunkName: "Mostrar-Todo"*/ '../views/MostrarArticles.vue'),
        },
        {
            path: '',
            redirect: {name: 'mostrar-todo'},
        },
    ]
}