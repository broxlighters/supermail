import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import FastClick from "fastclick";
import VueLazyload from "vue-lazyload";

import toast from "components/common/toast";

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();
//使用prototype创建VUE示例原型，用来接收 事件总线

Vue.use(toast);
//安装toast插件

FastClick.attach(document.body);
//解决移动端300ms延迟问题

Vue.use(VueLazyload, {
  loading: require("./assets/img/common/placeholder.png")
});
//使用懒加载插件

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
