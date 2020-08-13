import Vue from 'vue'
import App from './App.vue'
import vueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use

Vue.use(mavonEditor)

Vue.use(VueRouter)
Vue.use(vueResource)

Vue.config.productionTip = false

//  自定义指令
/* eslint-disable  */
Vue.directive('rainbow', {
  //el 指令所绑定的元素，可以用来直接操作 DOM
  //binding 
  //vnode代表vue生成的虚拟节点
  bind(el, binding, vnode) {
    el.style.color = '#' + Math.random().toString(16).slice(2, 8);
  }
})

Vue.directive('theme', {
  bind(el, binding, vnode) {
    if (binding.value == 'wide') {
      el.style.maxWidth = '1260px';
    } else if (binding.value = 'narrow') {
      el.style.maxWidth ='560px'
    }

    if (binding.arg === 'column') {
      el.style.backgroundColor = '#6677cc';
      el.style.padding = '20px';
    }
  }
})

//  自定义过滤器
Vue.filter('to-upper-case', function (value) {
  return value.toUpperCase();
})

Vue.filter('snippet', function (value) {
  return value.slice(0, 100) + '...';
})

Vue.filter('otherSinpper', function (value) {
  return value.slice(0, 20) + '...';
})

const router = new VueRouter({
  routes: Routes,
  mode:'history'
})



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App },
//   router:router
// })
