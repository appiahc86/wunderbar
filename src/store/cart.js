import { defineStore } from 'pinia'
import { parse, stringify,  } from 'zipson';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application


export const useCartStore = defineStore('cartStore', {
    state: () => {
        return {
            cart: [],
            deliveryFee: 0,
            selectedPostCode: null,
            deliveryData: {
                note: "",
                deliveryAddress: { street: '', houseNumber: '', postCode: '', town: '', floor: '', phone: '' }
            } // ./delivery data
        }

    }, // ./state

    getters: {
        getLength() { return this.cart.length },

        //subtotal
        subTotal(){
            let subTotal = 0;
            for (const cartElement of this.cart) {
                subTotal += (parseInt(cartElement.qty) * parseFloat(cartElement.price));
            }
            return subTotal;
        },

        //Total
        total(){
            return this.subTotal + this.deliveryFee
        }
    },

    actions: {


        //Add Item to cart
        addToCart(payload){

            const { id, name, menu, menuId, qty } = payload;
            const selectedChoice = payload.selectedChoice ? payload.selectedChoice.name : '';
            const price = payload.selectedChoice ? parseFloat(payload.selectedChoice.price) : parseFloat(payload.price);

            let inCart = false;

            for (const cartElement of this.cart) {
                if (parseInt(cartElement.id) === parseInt(id)){
                    if (cartElement.selectedChoice === selectedChoice && cartElement.price === price){
                       inCart = true;
                       cartElement.qty += parseInt(qty);
                        break;
                    }
                }
            }

            if (!inCart){
                this.cart.push({
                    id, name, menu, menuId, qty, selectedChoice, price
                })
            }

        }, // ./Add to cart

        //Increment
        increment(payload){
            for (const cartElement of this.cart) {
                if (
                    parseInt(cartElement.id) === parseInt(payload.id) &&
                    cartElement.selectedChoice === payload.selectedChoice &&
                    cartElement.price === payload.price
                ){
                    cartElement.qty++;
                    break;
                }
            }
        }, // ./increment

        //decrement
        decremet(payload){
            for (const cartElement of this.cart) {
                if (
                    parseInt(cartElement.id) === parseInt(payload.id) &&
                    cartElement.selectedChoice === payload.selectedChoice &&
                    cartElement.price === payload.price)
                {
                    cartElement.qty--;
                    break;
                }
            }

            this.cart = this.cart.filter(item => parseInt(item.qty) > 0)

        }, // ./decrement

        clearCart(){
            this.cart = [];
            this.deliveryFee = 0;
        }
    },

    persist: {
        key: '_crt',
        storage: sessionStorage,
        paths: ['cart', 'deliveryFee', 'deliveryData'],
        serializer: {
            deserialize: parse,
            serialize: stringify
        }
    },

})