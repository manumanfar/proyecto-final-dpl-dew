<template>
  <div id="navbar">
    <nav class="navbar-personal stroke px-2">
      <div class="container-fluid">
        <div class="todo-navbar d-flex justify-content-between">
          <a class="navbar-brand text-warning bloggers" href="#">
            <img
              src="../assets/icons/navbar/blogging.png"
              alt="Logo Vue.JS"
              width="50"
            />
            Bloggers
          </a>
          <div class="buttons-navigatios d-flex w-100 justify-content-between">
            <ul class="lista d-flex p-0 m-0 gap-3">
              <li>
                <router-link aria-current="page" :to="{ name: 'mostrar-todo' }"
                  >Home</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'about' }"
                  >About</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'mostrar-my-blog' }"
                  >My Blog</router-link
                >
              </li>
            </ul>
            <div class="buttons-navigations-user d-flex gap-2">
              <a
                v-if="estadoAutenticacion === 'authenticated'"
                class="botones w-auto"
              >
                <span class="text-secondary">{{nombreUsuario}}</span>
              </a>
              <a
                @click="irAlLoguear"
                v-if="
                  estadoAutenticacion === 'not-authenticated' ||
                  estadoAutenticacion === 'authenticating'
                "
                class="botones logout"
              >
                <img
                  class="salir"
                  src="../assets/icons/navbar/enter.png"
                  width="30"
                />
                <span class="set">Login</span>
              </a>
              <a
                @click="irAlLogout"
                v-if="estadoAutenticacion === 'authenticated'"
                class="botones logout"
              >
                <img
                  class="salir"
                  src="../assets/icons/navbar/exit.png"
                  width="30"
                />
                <span class="set">Logout</span>
              </a>
              <a
                @click="irAlRegistrar"
                v-if="
                  estadoAutenticacion === 'not-authenticated' ||
                  estadoAutenticacion === 'authenticating'
                "
                class="botones logout"
              >
                <img
                  class="salir"
                  src="../assets/icons/navbar/personal.png"
                  width="30"
                />
                <span class="set">Register</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import usarAutenticacion from "../modules/auth/composables/usarAutenticacion.js";

const router = useRouter();
const { logout, nombreUsuario, estadoAutenticacion } = usarAutenticacion();

const irAlLoguear = () => {
  router.push({ name: "loguearse" });
};
const irAlLogout = () => {
  logout();
  router.push({ name: "loguearse" });
};

const irAlRegistrar = () => {
  router.push({ name: "registrarse" });
};
</script>

<style scoped>
.navbar-personal {
  border-bottom: 2px solid #3aff3a;
  background: rgb(244, 242, 242);
  background: -moz-linear-gradient(
    90deg,
    rgba(244, 242, 242, 1) 0%,
    rgba(247, 247, 247, 1) 0%,
    rgba(238, 238, 238, 1) 0%
  );
  background: -webkit-linear-gradient(
    90deg,
    rgba(244, 242, 242, 1) 0%,
    rgba(247, 247, 247, 1) 0%,
    rgba(238, 238, 238, 1) 0%
  );
  background: linear-gradient(
    90deg,
    rgba(244, 242, 242, 1) 0%,
    rgba(247, 247, 247, 1) 0%,
    rgba(238, 238, 238, 1) 0%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#f4f2f2",endColorstr="#eeeeee",GradientType=1);
}
.todo-navbar .bloggers {
  color: #35d1f8 !important;
}
.lista {
  list-style: none;
}
.lista li {
  padding: 0;
}
.lista li a {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 10px;
}

nav ul li a,
nav ul li a:after,
nav ul li a:before {
  transition: all 0.5s;
  color: #686868;
}
nav ul li a:hover {
  color: #009400 !important;
}

nav.stroke ul li a {
  position: relative;
}

nav.stroke ul li a:after {
  height: 100%;
  color: #04be04 !important;
  position: absolute !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  margin: auto !important;
  width: 0% !important;
  content: "." !important;
  color: transparent !important;
  background: #04be04 !important;
  height: 2px !important;
}
nav.stroke ul li a:hover:after {
  width: 100% !important;
}
.botones {
  padding: 5px;
  font-family: "Exo 2", sans-serif;
  font-weight: 600;
  text-decoration: none;
  width: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.salir {
  display: none;
}
.set {
  display: block;
  color: #35d1f8;
}

.logout:hover .salir {
  display: block;
}

.logout:hover .set {
  display: none;
}

.router-link-exact-active{
  color: #009400 !important;
}

@media (max-width: 650px){
  .todo-navbar{
    flex-direction: column;
  }
  .buttons-navigatios{
    flex-direction: column;
  }
  .buttons-navigations-user{
    justify-content: end;
  }
}
</style>