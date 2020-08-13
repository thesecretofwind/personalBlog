<!--  -->
<template>
  <div id="showTags">
    <div class="myTags">
      <div class="category">
        <div class="category-all">标签列表</div>
        <div class="category-list">
          <ul>
            <li v-for="(key,value) in countTimes(tags.flat())" :key="key">
              <router-link :to="'/singleTag/'+value">{{value}}({{key}})</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <span>nihao</span>
  </div>
</template>

<script>
/* eslint-disable */
//  引入模块
const AV = require("leancloud-storage");
//  创建子类
const Todo = AV.Object.extend("Todo");
//  创建实例
const todo = new Todo();
//  创建查询对象
const Query = new AV.Query("Todo");
export default {
  data() {
    return {
      tags: [],
      allTags: {},
      //  存放标签
      the: []
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    //  temp数组用来存放所有分类标签，temp1则对所有标签进行不重复计算，以便后续对标签数量的统计
    let temp = [],
      temp1 = [];
    Query.find().then(data => {
      data.forEach(item => {
        // console.log(item);
        temp1.push(item.attributes.categories);
        item.attributes.categories.forEach(d => {
          if (!temp.includes(d)) {
            temp.push(d);
          }
        });
      });
    });
    // this.the = temp1;
    this.tags = temp1;
  },
  methods: {
    //  对所有标签进行计数，有则 数量+1，没有则为数量1
    countTimes(data) {
      var obj = {};
      return data.reduce(function(time, name) {
        if (name in time) {
          time[name]++;
        } else {
          time[name] = 1;
        }
        return time;
      }, {});
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
ul {
  list-style: none;
}
li {
  list-style-type: none;
  display: inline;
  padding: 10px;
}
li:hover {
  color: rgb(255, 77, 0);
  cursor: pointer;
}
.myTags {
  width: 800px;
  background-color: #fff;
  padding: 20px;
  margin: 0 auto;
  border-radius: 20px;
}
.category-all {
  font-size: 22px;
  font-weight: 700;
  margin-left: 100px;
  line-height: 2;
  color: #555;
}
.category-list {
  margin-top: 20px;
  margin-left: 88px;
  font-size: 14px;
  color: #bbb;
}
a {
  text-decoration: none;
  color: #303133;
}
a:hover {
  color: rgb(73, 177, 245);
}
a:visited {
  color: #909399;
}
</style>