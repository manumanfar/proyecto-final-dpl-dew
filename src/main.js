import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


import './styles/styles.scss';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../node_modules/bootstrap/dist/js/bootstrap.min'

const app = createApp(App);

app.use(store);

app.use(router);

app.mount("#app");
