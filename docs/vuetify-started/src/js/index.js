import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import "material-design-icons/iconfont/material-icons.css";
import Index from "../components/index.vue";
// import Stepper from '../components/stepper.vue';

Vue.use(Vuetify);
new Vue({
    vuetify: new Vuetify(),
    el:'#app',
    template: '<Index />',
    components: { Index }
});