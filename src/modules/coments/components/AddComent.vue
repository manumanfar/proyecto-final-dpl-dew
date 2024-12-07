<template>
  <div id="add-coment">
    <div class="caja-texto d-flex justify-content-end">
      <form @submit.prevent="onSubmit">
        <textarea
          v-model="opinionComent"
          placeholder="Añade aqui tu comentario"
        ></textarea>
        <div class="d-flex justify-content-end">
          <button
            type="submit"
            class="
              boton
              mt-2
              px-2
              pb-1
              border border-2
              rounded-2
              bg-fluorx
              text-white
            "
            :disabled="stateSubmitComent"
          >
            comentar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onUpdated, ref } from "vue";
import useUtilsComents from "../composables/useUtilsComents.js";

const props = defineProps({
  comentArticuloId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["on:closeComent"]);

const { addComent } = useUtilsComents();

const stateSubmitComent = ref(false);
const opinionComent = ref();

onUpdated(()=> stateSubmitComent.value = false)

const onSubmit = () => {
  stateSubmitComent.value = true;
  addComent(opinionComent.value, props.comentArticuloId);
  emit('on:closeComent')
};
</script>

<style scoped>
.caja-texto {
  height: 130px;
  width: 100%;
}
form {
  height: 130px;
  width: 80%;
}
form textarea {
  font-size: 15px;
  border: none;
  max-height: 100px;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  color: #7a7979;
}

textarea:focus {
  outline: none;
}
.boton {
  text-decoration: none;
  cursor: pointer;
  border-color: #35d1f8 !important;
}

.boton:hover {
  background-color: #35d1f8 !important;
  border-color: #04be04 !important;
  box-shadow: 2px 2px 7px 2px rgb(138, 138, 138);
}
</style>