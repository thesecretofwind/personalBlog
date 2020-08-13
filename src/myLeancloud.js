/* eslint-disable */
const AV = require('leancloud-storage');
AV.init({
  appId: "qczamOv6BiTPIkvCXjT75CLi-gzGzoHsz",
  appKey: "VTGps47ckIj7153MdLIt9OCR",
  serverURL: "https://qczamov6.lc-cn-n1-shared.com"
});
const Todo = AV.Object.extend('Todo');
const todo = new Todo();
const Query = new AV.Query('Todo');

export default () => {
  return {
    AV,
    todo,
    Query
  }
}