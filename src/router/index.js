import { createWebHistory, createRouter } from "vue-router";
import Map from "../components/Map.vue";
import Details from "../components/UnitDetails.vue";

const routes = [
  {
    path: "/",
    name: "Map",
    component: Map,
  },
  {
    path: "/details",
    name: "Details",
    component: Details,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;