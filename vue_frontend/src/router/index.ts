import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import AdminDashboard from "../views/AdminDashboard.vue";
import supabase from "../supabase";


const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/dashboard",
    component : AdminDashboard,
    beforeEnter: async (to, from, next)=>{
      const {data} = await supabase.auth.getSession();
      if(!data.session){
        console.log("No Session");
        return next("/login");
      }

      const {data: userData} = await supabase.auth.getUser();
      if (!userData?.user || userData.user.user_metadata?.role !== "admin") {
        console.log("Access denied: User is not an admin.");
        return next("/login");
      }
      next();
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
