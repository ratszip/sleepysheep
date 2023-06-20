// postcss.config.js
module.exports = {
    plugins: {
      
      // postcss-pxtorem 插件的版本需要 >= 5.0.0
      'postcss-pxtorem': {
        rootValue({ file }) {
          return file.indexOf('vant') !== -1 ? 37.5 : 75;
        },
        propList: ['*'],
      }
      // 'autoprefixer':{
      //   browsers:['Android>=4.0','iOS >= 8']
      // }
    }
  };
// module.exports = ({ file }) => {
//   return {
//     plugins: {
//       "postcss-px-to-viewport": {
//         viewportWidth:
//           file && file.dirname && file.dirname.includes("vant") ? 375 : 750,
//         unitPrecision: 5,
//         viewportUnit: "vw",
//         fontViewportUnit: "vw",
//         selectorBlackList: [],
//         minPixelValue: 1,
//         mediaQuery: false
//       }
//     }
//   };
// };
