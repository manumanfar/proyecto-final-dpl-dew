<template>
  <div id="crear-post" class="container-fluid">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-12 col-sm-10 col-md-8">
        <div class="border border-1 rounded-3 shadow-lg p-4">
          <h4 class="text-warning text-center fw-bolder">
            Añade un nuevo Artículo a tu Blog
          </h4>
          <hr />
          <form @submit.prevent="onSubmit" enctype="multipart/form-data">
            <div class="form-floating mb-3">
              <input
                v-model="v$.user.title.$model"
                type="text"
                class="form-control"
                id="floating-title"
                placeholder="Título Del Articulo"
              />
              <label for="floatingInput">Titulo del Artículo</label>
            </div>
            <div class="mb-2" v-if="v$.user.title.$error">
              <p class="text-danger mx-3">
                {{ v$.user.title.$errors[0].$message }}
              </p>
            </div>
            <div class="form-floating mb-3">
              <textarea
                v-model="v$.user.text1.$model"
                class="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                style="height: 100px"
              ></textarea>
              <label for="floatingTextarea2">Commentar párrafo 1</label>
            </div>
            <div class="mb-2" v-if="v$.user.text1.$error">
              <p class="text-danger mx-3">
                {{ v$.user.text1.$errors[0].$message }}
              </p>
            </div>
            <div class="form-floating mb-3">
              <textarea
                v-model="v$.user.text2.$model"
                class="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea3"
                style="height: 100px"
              ></textarea>
              <label for="floatingTextarea3">Commentar párrafo 2</label>
            </div>
            <div class="mb-2" v-if="v$.user.text2.$error">
              <p class="text-danger mx-3">
                {{ v$.user.text2.$errors[0].$message }}
              </p>
            </div>
            <div class="form-floating mb-3">
              <input
                @change="onSelectedImage"
                type="file"
                class="form-control"
                id="floatingFile"
                placeholder="Fecha"
                required
              />
            </div>
            <div class="mb-3">
              <button
                @click="redirectToBlog"
                class="btn btn-light"
                :disabled="estateSubmit"
              >
                Subir
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, ref, toRef, reactive } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
const router = useRouter();

const store = useStore();
const estateSubmit = ref(false);
const post = ref({
  title: "",
  text1: "",
  text2: "",
  idUser: "",
  userName: "",
  file: "",
});

const state = reactive({
  user: {
    title: "",
    text1: "",
    text2: "",
  },
});
const rules = {
  user: {
    title: {
      required: helpers.withMessage("Este campo es obligatorio", required),
    },
    text1: {
      required: helpers.withMessage("Este campo es obligatorio", required),
      minLength: helpers.withMessage("Mínimo 50 dígitos", minLength(50)),
    },
    text2: {
      required: helpers.withMessage("Este campo es obligatorio", required),
      minLength: helpers.withMessage("Mínimo 50 dígitos", minLength(50)),
    },
  },
};
const v$ = useVuelidate(rules, {
  user: {
    title: toRef(state, "title"),
    text1: toRef(state, "text1"),
    text2: toRef(state, "text2"),
  },
});

onMounted(() => {
  post.value.idUser = store.state.auth.localId;
  post.value.userName = store.state.auth.usuario.name;
});

const onSubmit = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) return;
  post.value.title = v$.value.user.title.$model;
  post.value.text1 = v$.value.user.text1.$model;
  post.value.text2 = v$.value.user.text2.$model;
  estateSubmit.value = true;
  await store.dispatch("articles/crearArticle", post.value);
  router.push({ name: "mostrar-my-blog" });
};

const redirectToBlog = () => {
  
};

const onSelectedImage = (event) => {
  post.value.file = event.target.files[0];
};
</script>

<style scoped>
</style>