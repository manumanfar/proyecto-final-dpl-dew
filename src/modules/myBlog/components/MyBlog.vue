<template>
  <div id="articles" class="p-3">
    <div v-if="articulos2.length != '0'">
      <router-view
        v-for="articulo in articulos2"
        :key="articulo.id"
        :art="articulo"
      />
    </div>
    <div v-else>
      <div class="d-flex align-items-center flex-column">
        <h1>No hay articulos</h1>
        <button @click="atras" class="boton border border-2 rounded-2 p-2">
          Volver Atras
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, onUnmounted, ref, watchEffect, watchPostEffect } from "vue";
import usarUtilsMyBlog from "../composables/usarUtilsMyBlog.js";

const store = useStore();

const { obtenerPorId } = usarUtilsMyBlog();

const articulos2 = ref([]);

const localId = ref();

onMounted(() => {
  store.commit("blog/cambiarStateActive");
});

onUnmounted(() => {
  store.commit("blog/cambiarStateActive");
});

watchEffect(() => (articulos2.value = obtenerPorId()));

const atras = () => {
  store.commit('articles/actualizarSearch');
};
</script>

<style scoped>
#articles {
  width: 100%;
}
</style>