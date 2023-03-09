import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import MainLayout from "@/layouts/main-layout.vue";
import Homepage from "@/views/homepage/homepage.vue";
import Ship from "@/views/ship/ship.vue";
import Tag from "@/views/tag/tag.vue";
import Favorite from "@/views/favorite/favorite.vue";
import Notfound from "@/views/notfound/notfound.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: "/",
        name: 'home',
        component: Homepage
      },
      {
        path: "/ships/:id",
        name: 'ship',
        component: Ship
      },
      {
        path: "/tags/:id",
        name: 'tag',
        component: Tag
      },
      {
        path: "/favorite",
        name: 'favorite',
        component: Favorite
      },
      {
        path: "/:pathMatch(.*)*",
        name: 'notfound',
        component: Notfound
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
