import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from "../views/Dashboard.vue";
import supabase from "../supabase";


const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/dashboard",
    component : Dashboard,
    beforeEnter: async (to, from, next)=>{
      const {data} = await supabase.auth.getSession();
      if(!data.session){
        next("/login");
      }else{
        next();
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
