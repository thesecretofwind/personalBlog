<!--  -->
<template>
  <div id="add-blog">
    <h2>添加博客</h2>
    <form action v-if="!blog.submmited">
      <label>博客标题：</label>
      <input type="text" v-model="blog.title" required />
      <label>博客内容：</label>
      <mavon-editor v-model="blog.content" :toolbars="toolbars"  class="edit"/>
      <!-- <textarea v-model="blog.content"></textarea> -->
      <label>总结：</label>
      <mavon-editor v-model="blog.summary" :toolbars="toolbars" class="edit" />
      <!-- <textarea v-model="blog.summary"></textarea> -->
      <div id="checkboxes">
        <label>快速标签：</label>
        <label>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.categories" />
        <label>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="blog.categories" />
        <label>React.js</label>
        <input type="checkbox" value="React.js" v-model="blog.categories" />
        <label>Angular4</label>
        <input type="checkbox" value="Angular4" v-model="blog.categories" />
      </div>
      <label >其他标签：</label>
      <input type="text">
      <label>作者：</label>
      <select v-model="blog.author">
        <option v-for="(item,index) in blog.authors" :key="index">{{item}}</option>
      </select>
      
      <button @click.prevent="post">添加博客</button>
    </form>
    <div v-if="blog.submmited">
      <h3>您的博客发布成功</h3>
    </div>
    <hr />
    <div id="preview">
      <p>博客标题:{{blog.title}}</p>
      <p>博客内容:{{blog.content}}</p>
      <ul>
        <li v-for="(item,index) in blog.categories" :key="index">{{item}}</li>
      </ul>
      <p>作者：{{blog.author}}</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const AV = require("leancloud-storage");
const Todo = AV.Object.extend("Todo");
const todo = new Todo();
const Query = new AV.Query("Todo");

export default {
  data() {
    return {
      blog: {
        //  博客标题
        title: "",
        //  博客内容
        content: "",
        // 博客作者
        author: "",
        //  添加博客成功后显示
        submmited: false,
        //  博客所属标签
        categories: [],
        //  作者
        authors: ["jack", "stranger", "Lichengguang"],
        //  总结
        summary: "",
        otherCategery:''
      },
       toolbars: {
              bold: true, // 粗体
              italic: true, // 斜体
              header: true, // 标题
              underline: true, // 下划线
              mark: true, // 标记
              superscript: true, // 上角标
              quote: true, // 引用
              ol: true, // 有序列表
              link: true, // 链接
              imagelink: true, // 图片链接
              help: true, // 帮助
              code: true, // code
              subfield: true, // 是否需要分栏
              fullscreen: true, // 全屏编辑
              readmodel: true, // 沉浸式阅读
              /* 1.3.5 */
              undo: true, // 上一步
              trash: true, // 清空
              save: true, // 保存（触发events中的save事件）
              /* 1.4.2 */
              navigation: true // 导航目录
            }
    };
  },
  methods: {
    //  https://jsonplaceholder.typicode.com/这是一个网址
    //  https://jsonplaceholder.typicode.com/posts

    //  获取数据，并选择需要的内容给blog对象
    getData() {  
      Query.find().then(data => {
        // console.log(data);
        for (let key of data) {
          this.blog.author = key.attributes.author;
          this.blog.title = key.attributes.title;
          this.blog.content = key.attributes.content;
          this.blog.categories = key.attributes.categories;
          this.blog.id.push(key.attributes.url);
        }
      });
    },
    //  设置属性
    post: function() {
      //  构建对象
      // const Todo = AV.Object.extend('Todo');
      // const todo = new Todo();
      //  设置对象内容
      if(this.otherCategery !== ''){
        this.categories.push(this.otherCategery);
      }
      todo.set("title", this.blog.title);
      todo.set("content", this.blog.content);
      todo.set("author", this.blog.author);
      todo.set("categories", this.blog.categories);
      // 保存对象，并检测相应的回调
      todo.save().then(
        todo => {
          console.log(`保存成功objectId:${todo.id}`);
        },
        error => {
          console.log(`保存失败了`);
        }
      );
      todo.fetch();
      //  设置对象
      // const _File = AV.Object.extend('_File');
      // const _file = new _File();
      // for(let key in this.blog){
      //   _file.set(key,this.blog[key]);
      // }
      // _file.save().then( (item) =>{
      //   console.log(`文件保存成功objectId：${item.id}`)
      // })

      // _file.add('second',this.blog);
      // _file.save().then( (item) =>{
      //   console.log(`文件保存成功objectId：${item.id}`)
      // })
      // for(let key in this.blog){
      //   _file.set(key,this.blog[key]);
      // }
      // _file.save().then( (item) =>{
      //   console.log(`文件保存成功objectId：${item.id}`)
      // })
      this.blog.submmited = true;
      //   this.$http.post('http://lc-qczamOv6.cn-n1.lcfile.com/905c3db4324345adbc85/posts.json',
      //   this.blog).then(function(data){
      //     console.log(data);
      //     this.blog.submmited = true;
      //   })
      // }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {},
    beforeRouteEnter: (to, from, next) => {}
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */

* {
  box-sizing: border-box;
  margin-top: 18px;
}

#add-blog {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}

label {
  display: block;
  margin: 20px 0 10px;

  color: rgb(85, 144, 240);
}

input[type="text"],
textarea,
select {
  display: block;
  width: 100%;
  padding: 8px;
}

#checkboxes label {
  display: inline-block;
  margin-top: 0px;
}

#checkboxes input {
  display: inline-block;
  margin-right: 10px;
  width: 20px;
}

button {
  display: block;
  margin: 20px 0;
  background: linear-gradient(#e0c3fc, #8ec5fc);
  color: #fff;
  border: 0;
  padding: 10px;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  margin-left: 448px;
}
button:hover {
  background: linear-gradient(#84fab0, #8fd3f4) !important;
}

#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}

h2{
  text-align: center;
  font-size: 30px;
}
h3 {
  margin-top: 10px;
}

textarea {
  height: 200px;
}

input[type="text"],
select,
textarea {
    border-radius: 10px;
    border: 1px solid;
    /* background: linear-gradient(#243949, #517fa4); */
    outline: none;
    opacity: 0.7;
}
option:hover {
  background-color: #eee;
}
.edit{
  overflow: auto;
  resize: both;
}
input[type="text"]:focus,
select:focus{
  border-color: #9ecaed;
  box-shadow: 0 0 10px #9ecaed;
}
</style>
<style>
*{
  margin: 0;
  padding: 0;
}
/* body {
  background: url("../assets/bg.jpg") no-repeat;
  position: relative;
  height: 650px;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
} */
</style>