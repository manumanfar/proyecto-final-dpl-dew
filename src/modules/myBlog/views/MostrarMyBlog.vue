<template>
  <div class="border border-1 rounded mb-4 shadow-sm p-3" id="my-blog">
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
        >{{ art.userName }}
        <small class="text-info mx-2">{{ art.date }}</small></span
      >
      <hr />
      <div class="d-flex justify-content-end w-100 mt-2">
        <a
          id="icons"
          @click="openModal"
          class="border border-1 rounded shadow-sm p-1 mx-2"
        >
          <img
            src="../../../assets/icons/blog/trash.png"
            alt=""
            width="25"
            height="25"
          />
        </a>
        <router-link
          id="icons"
          class="border border-1 rounded shadow-sm p-1"
          :to="{ name: 'actualizar-post', params: { id: art.id } }"
        >
          <img
            src="../../../assets/icons/blog/edit.png"
            alt=""
            width="25"
            height="25"
          />
        </router-link>
      </div>
    </div>
    <Modal v-if="isOpen" @on:close="closeModal">
      <template v-slot:body>
        <div class="d-flex justify-content-center">
          <img
            class="border border-3 rounded-circle"
            src="../../../assets/icons/modal/delete.png"
            alt=""
            width="100"
          />
        </div>
      </template>
      <template v-slot:footer>
        <div class="d-flex justify-content-center gap-5 mt-4">
          <a class="border border-3 rounded-circle" @click="closeModal">
            <img
              src="../../../assets/icons/modal/x-button.png"
              alt=""
              width="40"
            />
          </a>
          <a class="border border-3 rounded-circle" @click="borrar">
            <img
              src="../../../assets/icons/modal/aceptar.png"
              alt=""
              width="40"
            />
          </a>
        </div>
      </template>
      <template v-slot:header>
        <div class="text-center text-danger">
          <h2 class="fw-bolder">Borrar Articulo</h2>
          <hr />
        </div>
      </template>
    </Modal>
    <AmpliacionArticle v-if="viewIsOpen" @on:close="closeView" :view="art" />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import AmpliacionArticle from "@/components/AmpliacionArticle.vue";

const store = useStore();

const props = defineProps({
  art: {
    type: Object,
    required: true,
  },
});

const isOpen = ref(false);
const viewIsOpen = ref(false);

const borrar = () => {
  store.dispatch("articles/borrarArticlePorId", props.art);
  closeModal();
};

const openModal = () => {
  isOpen.value = true;
};
const closeModal = () => {
  isOpen.value = false;
};
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
  color: #52bcd6 !important;
}
.image {
  height: 200px;
  border-radius: 4px 0 0 0;
}
#my-blog {
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

#icons:hover {
  -webkit-box-shadow: 10px 10px 5px 0px rgba(139, 143, 139, 1);
  -moz-box-shadow: 10px 10px 5px 0px rgba(139, 143, 139, 1);
  box-shadow: 10px 10px 5px 0px rgba(139, 143, 139, 1);
  cursor: pointer;
  transform: scale(1.1, 1.1);
  transition: all 0.5s;
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
@media (max-width: 768px) {
  #fila {
    flex-direction: column-reverse;
  }
  #fila div {
    border: none !important;
  }
}
</style>