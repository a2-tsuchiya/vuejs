import Vue from 'vue'
// import App from './App'
import Test from './Test'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { Test },
  template: '<Test/>'
})

// new Vue({
//   render: fn => fn(Test),
// }).$mount('#app')

/**短縮系（h=>h(App） */
// new Vue({
//   el:'#app',
//   render: function(createElement) {
//     return createElement(App);
//   }
// });

/**vue.config.jsを設定すれば使える */
// new Vue({
//   el:'#app',
//   template:'<App/>',
//   components:{ App }
// });