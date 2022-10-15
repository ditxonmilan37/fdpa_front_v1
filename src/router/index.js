import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import mainView from "../views/eventsFolder/mainView";
import testView from "../views/eventsFolder/testView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
  },

  {
    path: "/events/main",
    name: "eventsMain",
    component: mainView,
  },

  {
    path: "/test/main",
    name: "testMain",
    component: testView,
  },

  {
    path: "/test/main/:idEvent",
    name: "testMainE",
    component: testView,
  },

  {
    path: "/test/mains/:idEvent/:active",
    name: "testMainEA",
    component: testView,
  },

  {
    path: "/test/main/:idEvent/:idTest",
    name: "testMainET",
    component: testView,
  },

  {
    path: "/test/main/:idEvent/:idTest/:idTypeTest",
    name: "testMainETType",
    component: testView,
  },

  {
    path: "/test/main/:idEvent/:idTest/:idTypeTest/:typeCategory",
    name: "testMainETTypeCategory",
    component: testView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
