<template>
  <div id="home">
    <Navbar />
    <div class="alto container-fluid">
      <div id="content" class="row">
        <div
          v-if="loading"
          class="container d-flex align-items-center justify-content-center"
        >
          <div>
            <div class="text-warning">
              <h4>CARGANDO...</h4>
            </div>
            <div class="text-center">
              <i class="fa-solid fa-spin fa-circle-notch fa-3x text-light"></i>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 p-3" v-else>
          <router-view />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
          <Aside />
        </div>
      </div>
    </div>
      <Footer />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Aside from "../components/Aside.vue";
import { ref, onMounted, watchEffect } from "vue";
import usarAutenticacion from "@/modules/auth/composables/usarAutenticacion.js";

const { chequearAutenticacionEstado } = usarAutenticacion();

chequearAutenticacionEstado();

const store = useStore();

const loading = ref();

onMounted(() => store.dispatch("articles/cargarArticle"));

onMounted(()=>{
  store.dispatch('coments/cargarComents');
});
onMounted(()=>{
  store.dispatch('coments/cargarHandUps');
});
watchEffect(() => (loading.value = store.getters["articles/obtenerIsLoading"]));

</script>

<style>
#home {
  width: 100%;
}
.alto {
  min-height: calc(100vh - 15rem) !important;
  background-color: whitesmoke;
}
@media (max-width: 1140px) {
  #content{
    flex-direction: column-reverse;
  }
}
</style>