import Vue from "vue";
import VueRouter from "vue-router";
import Done from "../views/done";
import Download from "../views/download";
import Home from "../views/home";
import Play from "../views/play";

Vue.use(VueRouter);

// const routerPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject)
//     return routerPush.call(this, location, onResolve, onReject);
//   return routerPush.call(this, location).catch(error => error);
// };

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/play",
    name: "play",
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
