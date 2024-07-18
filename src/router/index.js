import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoriaView from "../views/CategoriaView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/categorias",
      name: "categorias",
      component: CategoriaView,
    },
    {
      path: "/modelos",
      name: "modelos",
      component: () => import("../views/ModeloView.vue"),
    },
    {
      path: "/marcas",
      name: "marcas",
      component: () => import("../views/MarcaView.vue"),
    },
    {
      path: "/acessorios",
      name: "acessorios",
      component: () => import("../views/AcessorioView.vue"),
    },
    {
      path: "/cores",
      name: "cores",
      component: () => import("../views/CorView.vue"),
    },
    {
      path: "/veiculos",
      name: "veiculos",
      component: () => import("../views/VeiculoView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutView,
    }
  ],
});

export default router;
