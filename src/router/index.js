import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import Main from "../views/Main.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: Home,
  },
  // {
  //   path: "/",
  //   name: "Main",
  //   component: Main,
  // },
  {
    path: "/discover",
    name: "Discover",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Discover.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
