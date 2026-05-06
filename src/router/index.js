import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/movies", component: () => import("../views/MoviesView.vue") },
    { path: "/tvshows", component: () => import("../views/TvShowsView.vue") },
    {
      path: "/watchlist",
      component: () => import("../views/WatchlistView.vue"),
    },
    {
      path: "/movie/:id",
      component: () => import("../views/MovieDetailView.vue"),
    },
    { path: "/tv/:id", component: () => import("../views/TVDetailView.vue") },
  ],
});

export default router;
