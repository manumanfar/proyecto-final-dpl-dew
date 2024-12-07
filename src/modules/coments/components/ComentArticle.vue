<template>
  <div id="coment-article">
    <div v-for="coment in coments" :key="coment.id">
      <div class="coment d-flex justify-content-start">
        <div class="tabulacion w-25"></div>
        <div
          class="
            container-coment
            d-flex
            justify-content-start
            align-items-end
            w-75
          "
        >
          <div class="p-2 w-100">
            <span class="text-capitalize text-secondary">{{
              coment.userName
            }}</span>
            <small class="text-capitalize mx-2">{{ coment.opinion }}</small>
          </div>
          <div
            v-if="coment.idUser == localId"
            class="borrar d-flex flex-fill justify-content-end p-2"
          >
            <a @click="deleteComent(coment.id)"
              ><i class="fa-solid fa-delete-left text-danger"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import useUtilsComents from "../composables/useUtilsComents.js";
import { useStore } from "vuex";

const store = useStore();

const { comentsDeArticulo, borrarComent } = useUtilsComents();

const localId = ref();

localId.value = store.state.auth.localId;

const props = defineProps({
  pilaDatos: {
    type: Object,
    required: true,
  },
});
//console.log(props.pilaDatos);

const coments = ref([]);

watchEffect(
  () =>
    (coments.value = comentsDeArticulo(
      props.pilaDatos.coments,
      props.pilaDatos.articuloId
    ))
);

const deleteComent = (comentId) =>{
    borrarComent(comentId);
}

</script>

<style scoped>
.container-coment {
  height: 35px;
}
.borrar {
    cursor: pointer;
}
.borrar:hover {
    transform: scale(1.1,1.1);
}
</style>