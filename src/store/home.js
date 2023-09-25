import { defineStore } from 'pinia';
import router from "../router/index.js";
import { parse, stringify,  } from 'zipson';
import {listMenu} from "@/requests/menu";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application


export const useHomeStore = defineStore('homeStore', {
    state: () => {
        return {
            user: {},
            menu: [],
            menuLoading: false
         }
    },

    getters: {
        isLoggedIn() {
            return (this.user.token && this.user.email);
        }
    },

    actions: {

      //Set User data
     setUser (payload){
        this.user = payload;
    },

    //logout
    logout(){
         this.user = {};
        router.push({name: "home"})
     },

        //Load Menu
        async loadMenu(){
         this.menuLoading = true;
            const data = await listMenu();
            if (data.error) {
                this.menuLoading = false;
                return toast.add({severity: 'warn', detail: `${data.error}`, life: 4000})
            }
            this.menu = data.menu;
            this.menuLoading = false;
        }

    },

    persist: {
       key: '_session',
            storage: sessionStorage,
            paths: ['user'],
            serializer: {
                deserialize: parse,
                serialize: stringify
            }
        },

})