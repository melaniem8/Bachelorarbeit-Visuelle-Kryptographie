import Vue from 'vue'
import vuetify from './plugins/vuetify';
import App from '../src/App.vue'
import router from "./router/router"

Vue.config.productionTip = false

import store from "./store/store";

new Vue({
    el: '#app',
    store,
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')
