<template>
  <div class="registrar">
    <div class="container-login100">
      <div class="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
        <form
          @submit.prevent="entregarForm"
          class="login100-form validate-form"
        >
          <span class="login100-form-title p-b-37"> Registrarse </span>

          <div
            class="wrap-input100 validate-input m-b-20"
            data-validate="Nombre"
          >
            <input
              v-model="v$.user.name.$model"
              class="input100"
              type="text"
              name="name"
              placeholder="Nombre"
            />
            <span class="focus-input100"></span>
          </div>
          <div class="mb-2" v-if="v$.user.name.$error">
            <p class="text-danger mx-3">
              {{ v$.user.name.$errors[0].$message }}
            </p>
          </div>
          <div
            class="wrap-input100 validate-input m-b-20"
            data-validate="Enter email"
          >
            <input
              v-model="v$.user.email.$model"
              class="input100"
              type="email"
              name="email"
              placeholder="email"
            />
            <span class="focus-input100"></span>
          </div>
          <div class="mb-2" v-if="v$.user.email.$error">
            <p class="text-danger mx-3">
              {{ v$.user.email.$errors[0].$message }}
            </p>
          </div>
          <div
            class="wrap-input100 validate-input m-b-25"
            data-validate="Enter password"
          >
            <input
              v-model="v$.user.password.$model"
              class="input100"
              type="password"
              name="pass"
              placeholder="Contraseña"
            />
            <span class="focus-input100"></span>
          </div>
          <div class="mb-2" v-if="v$.user.password.$error">
            <p class="text-danger mx-3">
              {{ v$.user.password.$errors[0].$message }}
            </p>
          </div>
          <div class="container-login100-form-btn mb-5">
            <button class="login100-form-btn">Registrarse</button>
          </div>

          <div class="text-center mt-4">
            <router-link :to="{ name: 'loguearse' }">Sing In</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRef, reactive } from "vue";
import { useRouter } from "vue-router";
import usarAutenticacion from "../composables/usarAutenticacion.js";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";

const router = useRouter();
const { crearUsuario } = usarAutenticacion();

const camposForm = ref({
  name: "",
  email: "",
  password: "",
});

const state = reactive({
  user: {
    name: "",
    email: "",
    password: "",
  },
});
const rules = {
  user: {
    name: {
      required: helpers.withMessage("Este campo es obligatorio", required),
      minLength: helpers.withMessage("Mínimo 6 dígitos", minLength(6)),
    },
    email: {
      required: helpers.withMessage("Este campo es obligatorio", required),
    },
    password: {
      required: helpers.withMessage("Este campo es obligatorio", required),
      minLength: helpers.withMessage("Mínimo 6 dígitos", minLength(6)),
    },
  },
};
const v$ = useVuelidate(rules, {
  user: {
    name: toRef(state, "name"),
    email: toRef(state, "email"),
    password: toRef(state, "password"),
  },
});

const entregarForm = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) return;
  camposForm.value.email = v$.value.user.email.$model;
  camposForm.value.password = v$.value.user.password.$model;
  camposForm.value.name = v$.value.user.name.$model;

  const { ok, message } = await crearUsuario(camposForm.value);

  if (!ok) {
    
    if(message === 'EMAIL_EXISTS'){

      router.push({ name: "loguearse",params: { message: 'The email already exists, log in' } });
    }
  } else router.push({ name: "mostrar-todo" });
};
</script>

<style scoped>
@import "../css/main.css";
@import "../css/util.css";
.registrar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://www.educadictos.com/wp-content/uploads/2018/04/blog-fotograf%C3%ADa.jpg");
  background-size: 100% 100%;
}
</style>