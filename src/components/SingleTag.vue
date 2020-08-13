<!--  -->
<template>
  <div id="showMatchTag">
    <div class="macthTitle">
      <h1>
        {{tag}}
        <small>标签</small>
      </h1>
      <ul>
        <li v-for="(item,index) in macthBlogs" :key="index">
          <!-- <router-link :to="''"></router-link> -->
          <span class="time">{{item.createdAt|transformDate}}</span>
          <router-link :to=" '/blog/'+item.id">
            <span class="title">{{item.title|cutDown}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// import {Query} from '../myLeancloud'
export default {
  data() {
    return {
      //  存放路由传递的id
      tag: this.$route.params.id,
      tagArray: [],
      macthBlogs: []
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    const AV = require("leancloud-storage");
    const Todo = AV.Object.extend("Todo");
    const todo = new Todo();
    const Query = new AV.Query("Todo");
    //  将id存放在tagArray数组中
    this.tagArray.push(this.tag);
    //  查找leancloud中的的categories属性中属性该数组的
    Query.containedIn("categories", this.tagArray);
    //  将匹配的博客数据存放在matchBlogs中
    Query.find().then(data => {
      data.forEach(item => {
        item.attributes.id = item.id;
        item.attributes.createdAt = item.createdAt;
        item.attributes.updatedAt = item.updatedAt;
        this.macthBlogs.push(item.attributes);
      });
    });
  },
  filters: {
    //  对时间进行转换
    transformDate(value) {
      let d = new Date(value);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    },
    //  如果内容查过54个字的话，就使用...替代
    cutDown(value) {
      if (value.length <= 54) {
        return value;
      }
      return value.slice(0, 54) + "...";
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
#showMatchTag {
  width: 650px;
  background-color: #fff;
  border-radius: 15px;
  margin: 0 auto;
}
.macthTitle {
  padding: 30px;
}
h1 {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.5;
  color: #555;
  margin-left: 24px;
  margin-bottom: 20px;
}
h1 small {
  font-size: 80%;
  color: #bbb;
  margin-left: 5px;
}
.time {
  font-size: 12px;
  color: #00a7e0;
  padding: 5px;
}
ul {
  position: relative;
  list-style-type: none;
}
li:before {
  content: "";
  width: 5px;
  height: 5px;
  display: inline-block;
  border-radius: 50%;
  background: #00a7e0;
  vertical-align: middle;
  margin-right: 3px;
  margin-bottom: 1px;
}
.title {
  margin-left: 20px;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  color: #666;
}
a {
  text-decoration: none;
}
a:hover {
  color: rgb(255, 77, 0);
}
a span:hover {
  color: rgb(255, 77, 0);
}
</style>