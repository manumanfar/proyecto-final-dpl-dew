

export default {
    name: 'autenticar',
    component: () => import(/* webpackChunkName: "Autn Layout" */ '../components/LayoutAutenticar.vue'),
    children:[
        {
            path: '/loguearse/:message?',
            name: 'loguearse',
            component: () => import(/* webpackChunkName: "Login" */ '../views/LoguearUsusario.vue'),
        },
        {
            path: '/registrarse',
            name: 'registrarse',
            component: () => import(/* webpackChunkName: "Register" */ '@/modules/auth/views/RegistrarUsuario.vue'),
        }
    ]
}