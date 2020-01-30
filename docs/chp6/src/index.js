import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router: router,
    components: { App },
    template: '<App/>'
});