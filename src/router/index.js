import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Contact from "@/views/ContactView.vue";
import ColofonView from "@/views/ColofonView.vue";
import CartView from "@/views/CartView.vue";
import menuRouter from "@/router/menu";
import paymentRouter from "@/router/payment";
import {useComponentStore} from "@/store/componentStore";
import {useHomeStore} from "@/store/home";
import CheckoutView from "@/views/CheckoutView.vue";


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact
    },
    {
        path: '/colofon',
        name: 'colofon',
        component: ColofonView
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartView,
    },
   
    //Load imported routes
   ...menuRouter,
    ...paymentRouter,

//    redirect to home page if route not found
    {
        path: '/:catchAll(.*)*',
        redirect: {name: 'home'}
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 }
        }
    }

})



router.beforeEach((to, from) => {
    const componentStore = useComponentStore();
    const store = useHomeStore();
    if (to.meta.requiresAuth && !store.isLoggedIn) {
        componentStore.authDialog = true;
        return {
            name: from.name,
            // save the location we were at to come back later
            // query: { redirect: to.fullPath },
        }

    }
})




export default router;
