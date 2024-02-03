import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application


export const useComponentStore = defineStore('componentStore', {
    state: () => {
        return {
            authDialog: false,
            navigationDialog: false,
            addToCartDialog: false,
            descriptionDialog: false,
            passwordResetDialog: false,
            userProfileDialog: false,
            ordersDialog: false,
            emailVerificationDialog: false,
            smsDialog: false,
        }
    },

    getters: {

    },

    actions: {
        //Set Defaults
        setDefaults(){
            this.authDialog = false;
            this.navigationDialog = false;
            this.addToCartDialog = false;
            this.descriptionDialog = false;
            this.passwordResetDialog = false;
            this.userProfileDialog = false;
            this.ordersDialog = false;
            this.emailVerificationDialog = false;
            this.smsDialog = false;
            }
    }
})