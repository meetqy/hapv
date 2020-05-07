import Vue from "vue";
import VueRouter from "vue-router";
import Done from "../views/done";
import Download from "../views/download";
import Home from "../views/home";
import Play from "../views/play";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/play",
    name: "Play",
    component: Play
  },
  {
    path: "/done",
    name: "Done",
    component: Done
  },
  {
    path: "/download",
    name: "Download",
    component: Download
  }
];

const router = new VueRouter({
  routes
});

export default router;
