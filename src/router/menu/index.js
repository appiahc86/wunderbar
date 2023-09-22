import MenuView from "@/views/menu/MenuView.vue";

const menuRouter = [
    {
        path: '/menu/:slug',
        name: 'menu',
        component: MenuView,
    },

]

export default menuRouter;