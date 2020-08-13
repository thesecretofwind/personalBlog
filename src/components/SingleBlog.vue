<!--  -->
<template>
  <div id="single-blog">
    <div id="mysingle-blog">
      <h2 v-rainbow>{{title}}</h2>
      <mavon-editor
        class="md"
        :value="content"
        :subfield="prop.subfield"
        :defaultOpen="prop.defaultOpen"
        :toolbarsFlag="prop.toolbarsFlag"
        :editable="prop.editable"
        :scrollStyle="prop.scrollStyle"
        @change="changeData"
      ></mavon-editor>
      <article style="white-space: pre-line;" v-html="content" @change="changeData"></article>
      <ul>
        <img src="../assets/tag.png" alt="标签" />
        <div class="tag">
          <li v-for="(item,index) in categories" :key="index">{{item}}</li>
        </div>
      </ul>
      <div class="btn">
        <button @click="deleteBlog">删除博客</button>
        <router-link :to=" '/edit/' + id">修改博客</router-link>
      </div>
    </div>
    <Comment></Comment>
  </div>
</template>

<script>
//  引入评论模块
import Comment from "./Comment";
/* eslint-disable */
//  引入模块
const AV = require("leancloud-storage");
//  为AV.object创建字类
const Todo = AV.Object.extend("Todo");
//  为该类创建一个新实例
const todo = new Todo();
//  创建一个查询实例
const Query = new AV.Query("Todo");
export default {
  data() {
    return {
      //  存放路由id
      id: this.$route.params.id,
      //  博客标题
      title: "",
      //  博客内容
      content: "",
      //  作者
      author: "",
      // 博客分类
      categories: []
      // prop:{}
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    //    注意地址的拼接
    // this.$http.get('https://jsonplaceholder.typicode.com/posts/'+this.id)
    //           .then( (data) => {
    //               this.blog = data.body;
    //               // console.log(data);
    //           })
    /* eslint-disable */
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    //获取数据
    Query.get(this.$route.params.id).then(data => {
      this.title = data.attributes.title;
      this.content = data.attributes.content;
      this.author = data.attributes.author;
      this.categories = data.attributes.categories;
    });
  },
  methods: {
    //  删除对应id（objectId的）的博客，并进行同步
    deleteBlog() {
      alert("您是否确实要删除该博客？");
      // console.log(this.$route.params.id);
      const deleteObject = AV.Object.createWithoutData(
        "Todo",
        this.$route.params.id
      );
      deleteObject.destroy();
      // 若是带有params或者query参数的路由跳转，相应路由有name属性，且该跳转为{name:"",params:{}}
      deleteObject.fetch().then(data => {
        this.$router.push("/");
      });
    },
    changeData(value, render) {
      console.log(render);
    }
  },
  components: {
    Comment
  },
  computed: {
    prop() {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      };
      return data;
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */

#mysingle-blog {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background-color: #eee;
  border: 1px dotted #aaa;
  text-align: center;
  position: relative;
  margin-bottom: -28px;
  border-radius: 10px;
}
h1 {
  max-width: 960px;
  text-align: center;
}
h2 {
  margin-bottom: 40px;
}
article {
  max-width: 960px;
  text-indent: 2em;
  text-align: left;
}
.myauthor {
  margin-top: 20px;
  position: absolute;
  right: 25px;
}
ul {
  list-style-type: none;
  position: relative;
  margin-top: 60px;
  margin-bottom: 20px;
}
li {
  display: absolute;
  text-align: left;
  font-size: 13px;
  padding: 15px;
  color: rgb(73, 177, 245);
  display: inline-block;
}
.tag {
  margin-left: -764px;
}
img {
  width: 11px;
  margin-right: 10px;
  position: absolute;
  top: 18px;
  left: 39px;
}
a {
  padding: 10px;
  margin-left: 20px;
  text-decoration: none;
  width: 130px;
  background-color: rgb(151, 223, 253);
  border-radius: 5px;
  border: 1px solid rgb(151, 233, 253);
  color: #fff;
  font-size: 15px;
}
a:hover {
  background-color: rgb(73, 177, 245);
  border-color: rgb(73, 177, 245);
}
button {
  padding: 13px;
  border-radius: 5px;
  background-color: rgb(151, 223, 253);
  outline: none;
  border-color: rgb(151, 223, 253);
  color: #fff;
  border: none;
}
button:hover {
  background-color: rgb(73, 177, 245);
  border-color: rgb(151, 233, 253);
}
.btn {
  float: right;
  margin-top: -30px;
}
</style>