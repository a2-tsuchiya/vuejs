import Vue from 'vue';
import Test from './components/Test';

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    components: { Test },
    template: '<Test/>'
});