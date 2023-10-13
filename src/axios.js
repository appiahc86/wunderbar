import router from "./router/index.js";
import axios from "axios";
import {useHomeStore} from "./store/home.js";
import {useComponentStore} from "@/store/componentStore";


// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "https://res.nantylotto.com";
// axios.defaults.baseURL = "http://192.168.43.122:3000";
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.patch['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.delete['Content-Type'] = 'application/json; charset=utf-8';


// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (e) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const store = useHomeStore();
    const componentStore = useComponentStore();
    if (e.response && e.response.status === 401){
        store.logout();
        router.push({name: "home"});
        componentStore.authDialog = true;
    }

    return Promise.reject(e);
});

export default axios;