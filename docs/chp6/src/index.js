import Vue from 'vue';
import HelloVue from './hello.vue';

new Vue({
	el: '#app',
	components: { HelloVue },
	template: '<hello-vue/>' /*カスタムタグはケバブケースで命名する*/
});