<template>
  <div id="articles" class="p-3">
    <div v-if="articulos.length != '0'">
      <router-view
        v-for="articulo in articulos"
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
import { ref, watchEffect } from "vue";

const store = useStore();

const articulos = ref([]);

watchEffect(
  () => (articulos.value = store.getters["articles/bucarArticuloPorTitle"])
);

const atras = () => {
  store.commit('articles/actualizarSearch');
};
</script>

<style scoped>
#articles {
  width: 100%;
}
</style>