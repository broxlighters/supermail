import Tosat from "./Toast";
const obj = {};

obj.install = function(Vue) {
  // 1.创建组件构造器
  const tosatConstructor = Vue.extend(Tosat);
  // 2.new的方式，组件构造器。可以创建出来一个组件对象
  const toast = new tosatConstructor();
  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement("div"));
  // 4.toast.$el对应的就是div，然后添加到document.body上
  document.body.appendChild(toast.$el);
  // 在Vue的prototype（原型）上添加$toast
  Vue.prototype.$toast = toast;
};

export default obj;
