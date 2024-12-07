<template>
  <div class="border border-1 rounded mb-4 shadow-sm p-3" id="mostrar-articles">
    <div id="fila" class="row">
      <div class="col-12 col-sm-12 col-md-5">
        <img :src="art.url" alt="" class="w-100 image" />
      </div>
      <div class="col-12 col-sm-12 col-md-7 border-start">
        <div class="d-flex flex-column text-capitalize">
          <div class="d-flex justify-content-between">
            <h4>{{ art.title }}</h4>
            <div class="ampliar p-1 border rounded shadow-sm">
              <a @click="openView"
                ><img src="../../../assets/icons/blog/search.png" width="40"
              /></a>
            </div>
          </div>
          <hr />
          <p class="w-100" id="description">
            {{ art.text1 }}
          </p>
        </div>
      </div>
    </div>
    <div class="article-footer p-2 mt-2 rounded" id="final">
      <span
        >{{ art.userName }} <small class="mx-2">{{ art.date }}</small></span
      >
      <hr />
      <div class="d-flex justify-content-end gap-2">
        <a class="border rounded-2 p-2 bg-white shadow-lg" href="#"
          ><img src="../../../assets/icons/blog/like(2).png" width="25"
        /></a>
        <a class="border rounded-2 p-2 bg-white shadow-lg" href="#"
          ><img src="../../../assets/icons/blog/like(1).png" width="25"
        /></a>
        <a
          class="
            border
            rounded-pill
            p-2
            shadow-lg
            bg-white
            d-flex
            align-items-center
            text-decoration-none
          "
          href="#"
          ><div class="px-2 text-secondary">{{numeroComentarios}}</div>
          <img
            src="../../../assets/icons/blog/burbuja-de-dialogo.png"
            width="25"
        /></a>
      </div>
    </div>
    <AmpliacionArticle v-if="viewIsOpen" @on:close="closeView" :view="art" />
  </div>
</template>

<script setup>
import AmpliacionArticle from "@/components/AmpliacionArticle.vue";
import { watchEffect, ref } from "vue";
import useUtilsComents from "../../coments/composables/useUtilsComents.js";
const { numberComentsDeArticulo } = useUtilsComents();

const props = defineProps({
  art: {
    type: Object,
    required: true,
  },
});

const numeroComentarios = ref();
watchEffect(
  () => (numeroComentarios.value = numberComentsDeArticulo(props.art.id))
);

const viewIsOpen = ref(false);
const openView = () => {
  viewIsOpen.value = true;
};
const closeView = () => {
  viewIsOpen.value = false;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;700&display=swap");
* {
  font-family: "Rubik", sans-serif;
}
h4 {
  font-weight: 700;
  color: #686868;
}
small {
  font-weight: 700;
  color: #52bcd6;
}
.image {
  height: 200px;
  border-radius: 4px 0 0 0;
}
#mostrar-articles {
  width: 100%;
  min-height: 300px;
}
#description {
  overflow: hidden !important;
  max-height: 100px;
  font-weight: 300;
}
#final {
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
  color: #009400;
}
.ampliar:hover {
  transform: scale(1.1, 1.1);
}
.ampliar {
  cursor: pointer;
  height: 50px;
  margin-left: 5px;
}
.article-footer div a:hover {
  transform: scale(1.1, 1.1);
}
@media (max-width: 768px) {
  #fila {
    flex-direction: column-reverse;
  }
  #fila div {
    border: none !important;
  }
}
</style>