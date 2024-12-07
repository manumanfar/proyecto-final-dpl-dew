<template>
  <div id="ampliacion-article" class="fade-in rounded-3">
    <div class="article-view p-3">
      <div class="article-header d-flex justify-content-between p-3">
        <h4>{{ view.title }}</h4>
        <a class="equis" @click="$emit('on:close')"
          ><i class="fa-solid fa-square-xmark fa-2x text-danger"></i
        ></a>
      </div>
      <hr />
      <div class="article-body p-2">
        <p>{{ view.text1 }}</p>
        <hr />
        <img class="image" :src="view.url" />
        <div class="d-flex justify-content-end mt-1">
          <h6 class="autor-fotografia text-capitalize">Autor Fotografía</h6>
        </div>
        <hr />
        <p>{{ view.text2 }}</p>
      </div>
      <hr />
      <div class="article-footer p-2">
        <span
          >{{ view.userName }} <small class="mx-2">{{ view.date }}</small></span
        >
        <hr />

        <ComentArticle
          :pilaDatos="{ coments: pillComents, articuloId: view.id }"
        />
        <AddComent
          v-if="isOpenAddComent"
          @on:closeComent="closeAddComent"
          :comentArticuloId="view.id"
        />
        <hr />
        <div class="d-flex justify-content-between gap-2 mt-2">
          <div class="d-flex align-items-end">
            <a class="equis" @click="$emit('on:close')"
              ><i class="fa-solid fa-square-xmark fa-2x text-danger"></i
            ></a>
          </div>
          <div class="d-flex gap-2">
            <div
              class="
                likes
                d-flex
                justify-content-center
                align-items-center
                border
                rounded
              "
            >
              {{ numeroLikes }}
            </div>
            <a
              @click="deditoArriba"
              class="border rounded-2 px-2 p-1 shadow-lg bg-white"
              href="#"
            >
              <img src="../assets/icons/blog/like(1).png" width="20"
            /></a>
            <a
              @click="openAddComent"
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
              ><div class="px-2 text-secondary">{{ numeroComentarios }}</div>
              <i class="fa-solid fa-comment text-fluor fs-4"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import ComentArticle from "../modules/coments/components/ComentArticle.vue";
import AddComent from "../modules/coments/components/AddComent.vue";
import useUtilsComents from "../modules/coments/composables/useUtilsComents.js";

const store = useStore();
const { numberComentsDeArticulo, handUpUpdateOrCreate, numberLikesDeArticulo } = useUtilsComents();
const props = defineProps({
  view: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["on:close"]);

const pillComents = ref();
const isOpenAddComent = ref(false);
const numeroComentarios = ref();
const numeroLikes = ref();
//onMounted(()=>numeroLikes.value = numberLikesDeArticulo(props.view.id))
onUpdated(async () => await store.dispatch("coments/cargarComents"));
onUpdated(async () => await store.dispatch("coments/cargarHandUps"));
onUpdated(()=>numeroComentarios.value = numberComentsDeArticulo(props.view.id));
//onUpdated(()=>numeroLikes.value = numberLikesDeArticulo(props.view.id));
watchEffect(() => (pillComents.value = store.state.coments.coments));
watchEffect(() =>numeroLikes.value = numberLikesDeArticulo(props.view.id));
watchEffect(() =>numeroComentarios.value = numberComentsDeArticulo(props.view.id));

const openAddComent = () => {
  isOpenAddComent.value = true;
};

const closeAddComent = () => {
  isOpenAddComent.value = false;
};

const deditoArriba = () => {
  handUpUpdateOrCreate(props.view.id);
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@1,300&family=Lobster&display=swap");

#ampliacion-article {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  background-color: rgba(0, 0, 0, 0.05);
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.article-view {
  width: 75%;
  max-height: 90%;
  background-color: rgb(255, 255, 255);
  color: black;
  border-radius: 2px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0);
  overflow: auto;
  overscroll-behavior: auto;
}

.fade-in {
  animation: fadeIn ease-out 0.5s;
  -webkit-animation: fadeIn ease-out 0.5s;
  -moz-animation: fadeIn ease-out 0.5s;
  -o-animation: fadeIn ease-out 0.5s;
  -ms-animation: fadeIn ease-out 0.5s;
}

.article-header {
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
.article-header h4 {
  font-family: "Lobster", cursive;
}
.article-header .equis:hover {
  transform: scale(1.1, 1.1);
  cursor: pointer;
}
.article-body p {
  font-family: "Exo 2", sans-serif;
}
.article-body .image {
  width: 100%;
}
.article-body .autor-fotografia {
  font-family: "Lobster", cursive;
}
.article-footer {
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
.article-footer span {
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  color: #7a7979;
}
.article-footer small {
  font-family: "Exo 2", sans-serif;
  font-weight: 600;
  color: #52bcd6 !important;
}
.article-footer div a:hover {
  transform: scale(1.1, 1.1);
}

.likes {
  min-width: 40px;
  background-color: white !important;
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