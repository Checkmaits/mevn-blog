import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductsView from "@/views/ProductsView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/products",
      name: "ProductsView",
      component: ProductsView,
    },
  ],
});

export default router;
