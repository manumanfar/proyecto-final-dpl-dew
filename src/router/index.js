import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import articlesRouter from '../modules/articles/router';
import autenticarRouter from '@/modules/auth/router';
import blogRouter from '../modules/myBlog/router';
import crearPostRouter from '../modules/cargarForms/router';
import actualizarPostRouter from '../modules/cargarForms/router/routerActualizarPost.js';
import siGuardaAutenticacion from '@/modules/auth/composables/guardaDeAutenticacion.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/articles",
          beforeEnter: [siGuardaAutenticacion],
          ...articlesRouter,
        },
        {
          path: "/My-Blog",
          beforeEnter: [siGuardaAutenticacion],
          ...blogRouter,
        },
        {
          path: '/Crear-Post',
          beforeEnter: [siGuardaAutenticacion],
          ...crearPostRouter,
        },
        {
          path: '/Actualizar-Post',
          beforeEnter: [siGuardaAutenticacion],
          ...actualizarPostRouter,
        },
        {
          path: '',
          redirect: { name: 'mostrar-todo' }
        }
      ]
    },
    {
      path: '/autenticar',
      ...autenticarRouter,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/*webpackChunkName: "Articles"*/ "../views/About.vue"),
    },
  ],
});

export default router;
