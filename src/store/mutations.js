import { ADD_OLD_CART, ADD_NEW_CART } from "./mutations-types";

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能比较单一
  [ADD_OLD_CART](state, payload) {
    // 如果cartlist中已经有这个商品，则让其商品的count属性增加一
    payload.count++;
  },
  [ADD_NEW_CART](state, payload) {
    // 如果cartlist中没有这个商品，则向cartlist中push一个
    payload.checked = false;
    // 修改购物车的商品是否被选中，要在模型中进行修改
    state.cartList.push(payload);
  }
};
