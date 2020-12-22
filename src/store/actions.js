import { ADD_OLD_CART, ADD_NEW_CART } from "./mutations-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
        // item为cartlist数组的元素
        // find函数返回满足判断条件的元素
      );
      //判断oldProduct
      if (oldProduct) {
        context.commit(ADD_OLD_CART, oldProduct);
        // 如果cartlist中已经有这个商品，则提交addOldCart
        resolve(`
        已添加到购物车当中~
        当前商品数量+1
        `);
      } else {
        payload.count = 1; //若没有count属性，则新添加一个
        context.commit(ADD_NEW_CART, payload);
        // 如果cartlist中没有这个商品，则提交addOldCart
        resolve("已添加到购物车当中~");
      }
    });
  }
};
