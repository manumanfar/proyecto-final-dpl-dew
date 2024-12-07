<template>
  <div id="aside">
    <aside class="aside-principal p-3">
      <div class="search p-3 text-center shadow-lg rounded border">
        <div class="d-flex justify-content-start">
          <i class="fa-solid fa-magnifying-glass fa-2x text-fluor"></i>
          <h3 class="mx-3">Buscador</h3>
        </div>
        <hr />
        <div class="d-flex flex-column align-items-center pb-2">
          <div class="form-floating mb-3 w-75">
            <input
              v-model="search"
              type="search"
              class="form-control"
              id="search-input"
              placeholder="Buscar Articulo"
            />
            <label for="search-input">Buscar Articulo</label>
          </div>

          <button @click="buscar" class="btn btn-fluor text-white">Buscar</button>
        </div>
      </div>
      <div v-if="!estadoBlog" class="ultimos p-3 mt-5 shadow-lg rounded">
        <div class="d-flex justify-content-start">
          <i class="fa-solid fa-newspaper fa-2x text-fluor"></i>
          <h3 class="text-center mx-3">Ultimos Articulos</h3>
        </div>
        <hr />
        <div
          v-for="ultimo in ultimosArticulos"
          :key="ultimo.idUser"
          class="w-100 d-flex justify-content-start mb-3 p-2"
        >
          <img :src="ultimo.url" width="55" height="40" />
          <div
            class="mx-2 d-flex flex-column w-100 pb-3 border-1 border-bottom"
          >
            <span @click="openView">{{ ultimo.title }} </span>
            <small>{{ ultimo.date }}</small>
            <AmpliacionArticle v-if="viewIsOpen" @on:close="closeView" :view="ultimo" />
          </div>
        </div>
      </div>
      <div
        v-if="estadoBlog"
        class="
          create
          p-3
          d-flex
          justify-content-start
          align-items-center
          mt-5
          shadow-lg
          rounded
        "
      >
        <div>
          <a @click="crearPost" class="add"
            ><i class="fa-solid fa-circle-plus fa-3x text-fluorx"></i
          ></a>
        </div>
        <h3 class="mx-3">Crear Articulo</h3>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import AmpliacionArticle from '@/components/AmpliacionArticle.vue';

const router = useRouter();
const store = useStore();
const ultimosArticulos = ref([]);
const estadoBlog = ref();
const search = ref();
const viewIsOpen = ref(false);

const buscar = () => {
  store.commit('articles/actualizarSearch', search.value);
  search.value = '';
}


watchEffect(
  () => (ultimosArticulos.value = store.getters["articles/obtenerUltimosArticles"])
);

watchEffect(() => (estadoBlog.value = store.state.blog.active));

const crearPost = () => {
  router.push({ name: "crear-post" });
};
const openView = () => {
  viewIsOpen.value = true;
};
const closeView = () => {
  viewIsOpen.value = false;
};
</script>

<style scoped>
.aside-principal {
  width: 100%;
  height: 100%;
}
h3 {
  font-family: "Exo 2", sans-serif;
  font-weight: 600;
  color: #686868;
}

button {
  font-family: "Exo 2", sans-serif;
  font-weight: 600;
}
.add:hover i{
  transform: scale(1.1, 1.1);
  cursor: pointer;
}
.create div{
  width: 50px;
  height: 50px;
}
.search,
.create,
.ultimos {
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
span {
  color: #686868;
  cursor: pointer;
}
small {
  color: #52bcd6;
}

input[type="search"] {
  outline: #52bcd6 !important;
  color: #686868 !important;
  font-weight: 600;
}
</style>