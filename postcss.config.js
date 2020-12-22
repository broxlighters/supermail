module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗宽度，对应的是设计稿的宽度(retina:750)
      viewportHeight: 667, // 视窗高度，对应的是设计稿的高度
      unitPrecision: 5, // 指定`px`装换为视窗单位值的最小位数（很多时候无法整除）
      viewportUnit: "vw", // 指定需要转换成的视窗单位，建议用vw
      selectorBlackList: ["ignore", "tab-bar", "tab-bar-item"], // 指定不需要转换的类（不想装换的可以在根上添加ignore）
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位
      mediaQuery: false, // 允许在媒体查询中转换`px`
      exclude: [/^TabBar/] //不转化，忽略一些文件（要使用正则表达式）
    }
  }
};
