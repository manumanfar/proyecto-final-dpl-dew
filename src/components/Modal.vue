<template>
  <div class="modal-background fade-in" @click.self="$emit('on:close')">
    <div class="modal-container p-3 border border-4">
      <!-- <slot /> -->

      <slot name="header" />
      <slot name="body" />
      <slot name="footer" />

      <!-- <slot>
          <div class="center">
              Esto aparecerá si no tenemos contenido
          </div>
      </slot> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  emits: ["on:close"],
  setup(props, context) {
    return {
      
    };
  },
};
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.modal-container {
  width: 350px;
  height: 275px;
  background-color: rgb(211, 216, 197);
  color: black;
  border-radius: 2px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0);
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  color: red;
}

.fade-in {
  animation: fadeIn ease-out 0.5s;
  -webkit-animation: fadeIn ease-out 0.5s;
  -moz-animation: fadeIn ease-out 0.5s;
  -o-animation: fadeIn ease-out 0.5s;
  -ms-animation: fadeIn ease-out 0.5s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>