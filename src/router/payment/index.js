import StripeReturnUrl from "@/views/menu/StripeReturnUrl.vue";
import CheckoutView from "@/views/CheckoutView.vue";

const paymentRouter = [
    {
        path: '/payments/:payment_intent',
        name: 'stripe-return-url',
        component: StripeReturnUrl,
    },
    {
        path: '/payments/checkout',
        name: 'checkout',
        component: CheckoutView,
    },

]

export default paymentRouter;