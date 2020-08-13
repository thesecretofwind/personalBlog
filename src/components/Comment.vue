<!--  -->
<template>
  <div class="comment">
    {{id}}
    <div class="outerComment">
      <div class="showComment">
        <p class="writeComment" @click="showReply">撰写评论</p>
        <ul>
          <li v-for="(item,index) in comments" :key="index">
            <div>
              {{item.id}}
              <span class="nickname">{{item.nickname}}</span>
              <span class="time">{{time|transformDate}}</span>
              <p class="content">{{item.content}}</p>
              <div class="button">
                <ul>
                  <li>
                    <button
                      href="#"
                      @click="showChildren()"
                      v-show="item.hasChildren"
                      class="more"
                    >更多</button>
                  </li>
                  <li>
                    <button class="reply" @click="showReply">回复</button>
                  </li>
                </ul>
              </div>
              <hr />
              <childComment
                :child="item.children"
                :parentNickname="item.nickname"
                v-show="isShow"
                @showComment="showReply"
              ></childComment>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="innerComment" v-show="showInnercomment">
      <ul>
        <li>
          <div class="container">
            <input type="text" placeholder="昵称 *" v-model="s.nickname" />
            <span class="left"></span>
            <span class="right"></span>
            <span class="top"></span>
            <span class="bottom"></span>
          </div>
        </li>
        <li>
          <div class="container">
            <input type="text" placeholder="邮箱" v-model="s.email" />
            <span class="left"></span>
            <span class="right"></span>
            <span class="top"></span>
            <span class="bottom"></span>
          </div>
        </li>
      </ul>
      <div class="textarea">
        <div class="container">
          <textarea placeholder="撰写评论...(1000字以内)" minlength="1000" v-model="s.content"></textarea>
          <span class="left"></span>
          <span class="right"></span>
          <span class="top"></span>
          <span class="bottom"></span>
        </div>
      </div>
      <div class="button">
        <button @click="preview">预览</button>
        <button @click="publishComment">评论</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import childComment from "./childrenComment";
import bus from "../bus";
const AV = require("leancloud-storage");
const Todo = AV.Object.extend("Todo");
const todo = new Todo();
const Query = new AV.Query("Todo");
export default {
  data() {
    return {
      //  存储输入框输入的值
      s: {
        nickname: "",
        email: "",
        content: "",
        children: []
      },
      //  控制回复按钮显示
      isShow: false,
      //  编写回复评论的时间
      date: new Date(),
      //  存储请求的嵌套数组，方便后面递归和插入
      comments: [],
      // 请求数据中的时间
      time: "",
      // 控制是否显示评论回复输入框
      showInnercomment: false,
      //  记录层级关系
      id: 0,
      // 辅助控制评论只添加一次
      flag: true
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    //  请求（行）数据
    Query.get(this.$route.params.id).then(data => {
      this.comments = data.attributes.comment;
      this.time = data.createdAt;
    });
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    //  接收子组件即childComment组件传递来的层级即id
    bus.$on("showcomment", id => {
      this.showInnercomment = !this.showInnercomment;
      this.id = id;
    });
  },
  methods: {
    //  预览，将回复的评论递归找到相应的层级后添加都s对象中，但刷新就没有
    preview() {
      this.comments = this.getData(this.comments);
      this.flag = true;
      console.log(this.comments);
    },
    //  评论，将评论储存到数据库中
    publishComment() {
      let t = AV.Object.createWithoutData("Todo", this.$route.params.id);
      t.set("comment", this.comments);
      t.save();
    },
    //  递归寻找相应的层级，然后进行相应的属性的插入
    getData(data) {
      data.forEach((item, index) => {
        //  判断层级，flag用来控制次数（因为是嵌套数组，不控制的话会添加多次）
        if (item.id == this.id && this.flag == true) {
          let tempS = this.s;
          //  添加层级id
          tempS.id = item.id;
          //  默认children属性为空（如是回复则是这里添加）
          tempS.children = [];
          //  添加时间
          tempS.time = `${this.date.getFullYear()}-${this.addZore(
            this.date.getMonth()
          )}-${this.addZore(
            this.date.getDate()
          )} ${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`;
         // 推入数组中
         data.push(tempS);
         // 只添加一次
          this.flag = false;
        } else {
          //  层级不一样，递归寻找children这个数组
          this.getData(item.children);
        }
      });
      //  最终返回添加好的嵌套数组数组
      return data;
    },
    //  children数组不为空就显示更多按钮
    showChildren() {
      this.isShow = !this.isShow;
    },
    // 点击回复，显示评论回复
    showReply() {
      this.showInnercomment = !this.showInnercomment;
    },
    // 为月份和日期加0
    addZore(time) {
      if (time < 10) {
        return "0" + time;
      }
      return time;
    }
  },
  computed: {
  },
  filters: {
     // 为月份和日期加0
    mydate(time) {
      if (time < 10) {
        return "0" + time;
      }
      return time;
    },
    //  对事件进行格式转换
    transformDate(value) {
      let d = new Date(value);
      let year = d.getFullYear(),
        month = d.getMonth() + 1,
        day = d.getDate(),
        hour = d.getHours(),
        minutes = d.getMinutes();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      return `${year}-${month}-${day}  ${hour}:${minutes}`;
    }
  },
  components: {
    //  添加ChildComment组件
    childComment
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.comment {
  width: 100%;

  margin-top: 20px;
  background: linear-gradient(#243949, #517fa4);
  padding: 71px 0px;
  margin-left: -8px;
  position: relative;
}
.innerComment {
  width: 870px;
  margin: 0 auto;
  background-color: #282c34;
  border-radius: 10px;
  margin-top: 10px;
  transition: opacity 1s ease-in-out;
}
.container {
  height: 30px;
  width: 250px;
  position: relative;
}
ul {
  list-style-type: none;
}
li {
  padding: 5px;
}
input,
textarea {
  width: 100%;
  height: 100%;
  position: relative;
  outline: none;
  border: none;
  box-sizing: border-box;
  padding-left: 5px;
  background-color: #282c34;
  color: #61dafb;
  caret-color: #61dafb;
}
input::placeholder,
textarea::placeholder {
  color: rgba(97, 218, 251, 0.5);
}

.container span {
  position: absolute;
  content: "";
  display: block;
  background-color: #61dafb;
  transition: transform 0.1s ease-in-out;
}

.top,
.bottom {
  left: 0px;
  right: 0px;
  height: 2px;
}

.left,
.right {
  top: 0px;
  bottom: 0px;
  width: 2px;
  transform: scaleY(0);
}

.top {
  top: 0px;
  transform: scaleX(0);
  transform-origin: left center;
  transition-delay: 0.2s;
}
.left {
  left: 0px;
  transform-origin: bottom center;
  transition-delay: 0.3s;
}
.bottom {
  bottom: 0px;
}
.right {
  right: 0px;
  transform-origin: top center;
  transition-delay: 0.1s;
}

input:focus ~ .right,
textarea:focus ~ .right {
  transform: scaleY(1);
  transform-origin: bottom center;
}
input:focus ~ .left,
textarea:focus ~ .left {
  transform: scaleY(1);
  transform-origin: top center;
}
input:focus ~ .top,
textarea:focus ~ .top {
  transform: scaleX(1);
  transform-origin: right center;
}
.textarea .container {
  width: 800px;
  height: 200px;
  position: relative;
  margin: auto;
}
.textarea {
  padding: 20px;
}
.outerComment {
  width: 870px;
  background-color: #282c34;
  margin: 0 auto;
  z-index: 2;
}
.showComment {
  border: 2px dashed #ededed;
  padding: 20px;
  background-color: rgb(238, 238, 238);
  border-radius: 8px;
  outline: none;
}
.showComment:hover {
  border: 2px dashed #3b83ee;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
}
.showComment p {
  color: #282c34;
}
button {
  white-space: nowrap;
  line-height: 1.5;
  margin: 0;
  font-size: inherit;
  font-family: inherit;
  color: #fff;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: rgb(151, 223, 253);
  transition: all 0.4s ease-in-out;
  margin-right: 16px;
  margin-top: 10px;
  margin-bottom: 15px;
}
.btn button:hover {
  background-color: rgb(73, 177, 245);
}
.button {
  margin-left: 547px;
}
.showComment span {
  margin: 0 10px;
}
a {
  text-decoration: none;
  transition: all 0.3s;
}
a:hover {
  text-decoration: #61dafb underline;
}
.nickname {
  font-size: 20px;
  font-weight: 700px;
}
.time {
  font-size: 13px;
  color: #667c99;
}
.content {
  padding-left: 30px;
  overflow: auto;
  line-height: 2;
  font-size: 14px;
  color: #111;
}
.reply {
  display: inline-block;
  margin-left: 10px;
  padding: 5px;
}
.more {
  color: #667c99 !important;
  font-size: 17px;
  margin-left: 10px;
  margin-right: 0px;
}
.more,
.reply {
  margin-bottom: 0;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  white-space: nowrap;
  padding: 6px 12px !important;
  color: #667c99;
  border: none;
  background: transparent;
  user-select: none;
  padding: 5px;
}
.button li {
  display: inline;
}
.writeComment {
  margin-left: 761px;
  margin-top: -10px;
}
.innerComment li {
  display: inline-block;
  padding: 10px;
  margin-top: 10px;
}
.innerComment ul {
  text-align: center;
}
.button button:hover {
  background-color: rgb(73, 177, 245);
}
.writeComment:hover {
  color: rgb(73, 177, 245);
  cursor: pointer;
}
</style>