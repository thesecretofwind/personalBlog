<!--  -->
<template>
  <div id="edit-blog">
    <div id="myEdit-blog">
      <h2>编辑博客</h2>
      <form action v-if="!blog.submmited">
        <label>博客标题</label>
        <input type="text" v-model="blog.title" required />
        <label>博客内容</label>
       <mavon-editor v-model="blog.content" :toolbars="toolbars"  class="edit"/>
        <textarea v-model="blog.content"></textarea>
        <div id="checkboxes">
          <label>Vue.js</label>
          <input type="checkbox" value="Vue.js" v-model="blog.categories" />
          <label>Node.js</label>
          <input type="checkbox" value="Node.js" v-model="blog.categories" />
          <label>React.js</label>
          <input type="checkbox" value="React.js" v-model="blog.categories" />
          <label>Angular4</label>
          <input type="checkbox" value="Angular4" v-model="blog.categories" />
          <label>作者：</label>
          <select v-model="blog.author">
            <option v-for="(item,index) in blog.authors" :key="index">{{item}}</option>
          </select>
          <button @click.prevent="edit">编辑博客</button>
        </div>
      </form>
      <div v-if="blog.submmited">
        <h3>您的博客修改成功</h3>
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
      //  用来存储请求的内容的
      blog: {
        //  博客标题
        title: "",
        //  博客内容
        content: "",
        //  博客作者
        author: "",
        //  提交显示
        submmited: false,
        //  博客分类
        categories: [],
        // 作者
        authors: ["jack", "stranger", "Lichengguang"],
        //  这里是指数据返回的id（在leancloud就是objectid）
        id: []
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
    //  将编辑的内容重新上传到leancloud中
    edit: function() {
      const todo1 = AV.Object.createWithoutData('Todo', this.$route.params.id);
      todo1.set("title", this.blog.title);
      todo1.set("content", this.blog.content);
      todo1.set("author", this.blog.author);
      todo1.set("categories", this.blog.categories);
      // 保存对象，并检测相应的回调
      todo1.save().then(
        todo => {
          console.log(`保存成功objectId:${todo.id}`);
        },
        error => {
          console.log(`保存失败了`);
        }
      );
      this.blog.submmited = true;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    //  获取要修改的行所对应的数据
    Query.get(this.$route.params.id).then(data => {
      // console.log(data);
      this.blog.title = data.attributes.title;
      this.blog.content = data.attributes.content;
      this.blog.author = data.attributes.author;
      this.blog.categories = data.attributes.categories;
    });
    // leancloud更新后的同步
    todo.fetch();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  computed:{
    prop(){
          let data = {
            subfield: false,// 单双栏模式
            defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
            editable: false,
            toolbarsFlag: false,
            scrollStyle: true
          }
          return data
        }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */

* {
  box-sizing: border-box;
}

#myEdit-blog {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}

label {
  display: block;
  margin: 20px 0 10px;
}

input[type="text"],
textarea,
select {
  display: block;
  width: 70%;
  padding: 8px;
}

#checkboxes label {
  display: inline-block;
  margin-top: 0px;
}

#checkboxes input {
  display: inline-block;
  margin-right: 10px;
}

button {
  display: block;
  margin: 20px 0;
  background-color: tomato;
  color: #fff;
  border: 0;
  padding: 14px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}

#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}

h3 {
  margin-top: 10px;
}

textarea {
  height: 200px;
}
</style>