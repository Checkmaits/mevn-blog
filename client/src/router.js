import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "./views/LoginView.vue";

async function authenticate(to, from, next) {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  if (!userId || !token) {
    return next({ name: "LoginView" });
  }

  const request = await fetch(`http://localhost:4000/api/v1/users/${userId}`, {
    method: "GET",
    headers: {
      "x-auth-token": token,
    },
  });

  if (!request.ok) {
    localStorage.clear();
    return next({ name: "LoginView" });
  }

  const response = await request.json();
  to.params.user = response.data;
  next();
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
      beforeEnter: authenticate,
    },
    {
      path: "/login",
      name: "LoginView",
      component: LoginView,
    },
  ],
});

export default router;
