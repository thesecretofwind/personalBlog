<!--  -->
<template>
  <!-- 注意：这里自定义组件的值一定要加上单引号成一个字符串，否则无法传递 -->
  <!-- 去掉了设置成窄的形式  v-theme:column="'narrow'" -->
  <div id="show-blogs" @mouseleave="leave" @mouseenter="enter">
    <canvas id="evanyou" width="1920" height="902"></canvas>
    <a href="#app">
      <div class="fallCat" :class="{fall:isShowCat}" ref="fall"></div>
    </a>
    <h1 ref="d">博客总览</h1>
    {{search}}
    <div class="input">
      <!-- {{search}} -->
      <input type="text" placeholder="搜索" v-model="search" />
    </div>
    <!-- {{filteredBlogs}} -->
    <!-- <ul style="list-style:none">
      <li
        v-for="(item,i) in blogs"
        :key="item.id"
        style="background:#fff;padding:30px;margin:10px;"
      >
        <h3>{{i+1}} . {{item.title}}</h3>
        <p v-html="item.content"></p>
      </li>
    </ul> -->
    <!-- {{say}}
    {{sayhello}}
    {{anthor}}-->
    <div class="single-blog" v-for="(item,index) in  filteredBlogs" :key="index">
      <!-- 注意：在router-link中to的地址要拼接，要使用v-bind绑定to属性 -->
      <router-link :to="'/blog/' +item.id">
        <h2 v-rainbow>{{item.title|to-upper-case|otherSinpper}}</h2>
      </router-link>
      <div class="myheader">
        <span class="post-time" style="#00a7e0">
          <span class="createdAt">
            <img src="../assets/date.png" alt="日期图像" />
            发表于：{{item.createdAt|transformDate}}
          </span>
          <span class="updatedAt">
            <img src="../assets/time.png" alt="更新时间" />
            更新于：{{item.updatedAt|transformDate}}
          </span>
        </span>
      </div>
      <div class="post-badge">
        <router-link :to=" '/tags/' +item.id">
          <span>总结</span>
        </router-link>
      </div>
      <article>
        <div class="post-date">
          <div class="post-month">{{date.getMonth()+1|mydate}}</div>
          <div class="post-day">{{date.getDate()|mydate}}</div>
        </div>
        <pre style="white-space: pre-line;">{{item.content|snippet}}</pre>
        <!-- <mavon-editor
      class="md"
     :value="item.content"
     :subfield = "prop.subfield"
     :defaultOpen = "prop.defaultOpen"
     :toolbarsFlag = "prop.toolbarsFlag"
     :editable="prop.editable"
     :scrollStyle="prop.scrollStyle"
  ></mavon-editor> -->
        <footer>
          <p>总结：</p>
          <span>{{item.summary}}</span>
        </footer>
      </article>
    </div>
  </div>
</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge';
import bus from "../bus";
/* eslint-disable */
const AV = require("leancloud-storage");
AV.init({
  appId: "qczamOv6BiTPIkvCXjT75CLi-gzGzoHsz",
  appKey: "VTGps47ckIj7153MdLIt9OCR",
  serverURL: "https://qczamov6.lc-cn-n1-shared.com"
});
const Todo = AV.Object.extend("Todo");
const todo = new Todo();
const Query = new AV.Query("Todo");

export default {
  //注意：像在组件中exports default一个name属性，即使在总组件中调用，import可以是随便名字
  //然后挂载在components属性中也是这个名字，但是写入调用组件就得用这里的exports default的name对应的值，
  //如果没有，也是那个随便的名字
  data() {
    return {
      search: "",
      blogs: [],
      date: new Date(),
      scroll: "",
      createdDate: "",
      isShowCat: false,
      // prop:{}
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    //    网络请求
    //   this.$http.get('https://jsonplaceholder.typicode.com/posts')
    //  注意：请求本地json文件，是相对index.html这个文件的位置
    //  本地请求
    // this.$http.get('./posts.json')
    //   .then( (data) => {
    //       this.blogs = data.body.slice(0,10);
    //     //   console.log(this.blogs);
    //   })
    bus.$on("inputVal", value => {
      this.search = value;
    });
    console.log(this.blogs, "网络申请数据赋值");
    Query.find().then(data => {
      console.log(data);
      data.forEach(item => {
        item.attributes.id = item.id;
        item.attributes.createdAt = item.createdAt;
        item.attributes.updatedAt = item.updatedAt;
        this.blogs.push(item.attributes);
      });
    });
  },
  computed: {
    filteredBlogs() {
      console.log("===================================");
      // this.$forceUpdate();
      return this.blogs.filter(item => {
        return item.title && item.title.match(this.search);
      });
    },
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
    // say(){
    //   return this.a.filter( (item) =>{
    //     console.log(this.search)
    //     return item % 2 == 0
    //   });
    // },
    // sayhello(){
    //   return this.h.match("l");
    // },
    // anthor(){
    //   return this.blogs.filter( (item) =>{
    //     return item.title.match(this.search)
    //   })
    // }
  },
  methods: {
    // go(title, content, id) {
    //   this.$router.push({
    //     path: "/blog",
    //     params: {
    //       id: id,
    //       title: title,
    //       content: content
    //     }
    //     //  query:{
    //     //      title:title,
    //     //      content:content
    //     //  }
    //   });
    // },
    enter() {
      this.$refs.fall.getAttribute("class").replace("catLeave", "");
    },
    leave() {
      this.$refs.fall.style.top = "-100px";
      this.$refs.fall.setAttribute("class", "fallCat catLeave");
    },
    // filteredBlogs:function(){
    //     //    console.log(this.blogs)
    //       return this.blogs.filter( (item) => {
    //           console.log(item.title.match(this.search))
    //           return item.title.match(this.search)
    //       })
    //   }
    filterBlogs(value) {
      return value.filter(item => {
        return item.title.match(this.search);
      });
    },
    showCavas(top) {
      evanyou.style.top = top + "px";
    },
    listenScrollToBottom(ele) {
      console.log('listen')
      if (ele === null || ele === undefined) {
        // 节点不存在：抛出错误
        throw new Error("Undefined COM");
        return;
      }
      ele.addEventListener("scroll", ()=>{
        window.requestAnimationFrame((timestamp) =>{
          // console.log("hello1");
          // console.log(ele === window)
          if (723- document.documentElement.scrollTop >= 0) {
            console.log('hi');
            evanyou.style.top = 723 - document.documentElement.scrollTop + "px";
            // 检测是否滚动到元素底部
            // callback(706 - ele.scrollTop);
          }else{
            console.log(ele.scrollTop)
          }
        });
      }, false); // 监听 scroll 事件
    }
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // console.log(this.blogs);
    // window.addEventListener(
    //   "scroll",
    //   () => {
    //     console.log(this);
    //     console.log(document.documentElement.scrollTop);
    //     let h = 700 - document.documentElement.scrollTop;
    //     if (h > 0) {
    //       evanyou.style.top = 706 - document.documentElement.scrollTop + "px";
    //     }
    //   },
    //   false
    // );
    // this.listenScrollToBottom(window);
    console.log(this.blogs, "mounted里面");
    console.log(this.filterBlogs(this.blogs), "在mounted中查看过滤结果");
    document.addEventListener("touchmove", function(a) {
      a.preventDefault();
    });
    if (document.getElementById("evanyou")) {
      var c = document.getElementById("evanyou"),
        x = c.getContext("2d"),
        pr = window.devicePixelRatio || 1,
        w = window.innerWidth,
        h = window.innerHeight,
        f = 90,
        q,
        m = Math,
        r = 0,
        u = m.PI * 2,
        v = m.cos,
        z = m.random;
      c.width = w * pr;
      c.height = h * pr;
      x.scale(pr, pr);
      x.globalAlpha = 0.6;

      function evanyou() {
        x.clearRect(0, 0, w, h);
        q = [
          {
            x: 0,
            y: h * 0.7 + f
          },
          {
            x: 0,
            y: h * 0.7 - f
          }
        ];
        while (q[1].x < w + f) {
          d(q[0], q[1]);
        }
      }

      function d(e, b) {
        x.beginPath();
        x.moveTo(e.x, e.y);
        x.lineTo(b.x, b.y);
        var a = b.x + (z() * 2 - 0.25) * f,
          g = y(b.y);
        x.lineTo(a, g);
        x.closePath();
        r -= u / -50;
        x.fillStyle =
          "#" +
          (
            ((v(r) * 127 + 128) << 16) |
            ((v(r + u / 3) * 127 + 128) << 8) |
            (v(r + (u / 3) * 2) * 127 + 128)
          ).toString(16);
        x.fill();
        q[0] = q[1];
        q[1] = {
          x: a,
          y: g
        };
      }

      function y(b) {
        var a = b + (z() * 2 - 1.1) * f;
        return a > h || a < 0 ? y(b) : a;
      }
      document.onclick = evanyou;
      document.ontouchstart = evanyou;
      evanyou();
    }
  },
  filters: {
    mydate(time) {
      if (time < 10) {
        return "0" + time;
      }
      return time;
    },
    transformDate(value) {
      let d = new Date(value);
      let year = d.getFullYear(),
        month = d.getMonth() + 1,
        day = d.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }

      return `${year}-${month}-${day}`;
    },
    tranformContent(content){
      if(content.indexOf("\\n") >= 0){
        console.log('含有换行')
      }
      return content.replace(/\n/g,'<br/>');
    }
  }
  //   components:{
  //       Comment
  //   }
};
</script>
<style scoped>
/* @import url(); 引入css类 */

#show-blogs {
  margin-top: 0px;
}
#show-blogs:hover .fallCat {
  animation: fall 1s ease-in-out forwards;
}
.single-blog {
  max-width: 1000px;
  padding: 20px;
  margin: 50px auto;
  box-sizing: border-box;
  background-color: #eee;
  border: 1px dotted #aaa;
  position: relative;
  border-radius: 15px;
}
.single-blog:hover {
  background-color: #00a7e0;
}
.single-blog:hover + .fallCat {
  animation: fall 2s ease-in-out forwards;
}
.post-date:hover {
  background-color: rgb(73, 177, 245);
}
#show-blogs a {
  color: #444;
  text-decoration: none;
}
input[type="text"] {
  padding: 8px;
  width: 60%;
  margin-left: 284px;
  box-sizing: border-box;
  border-radius: 20px;
  outline: none;
  height: 45px;
}
h1 {
  text-align: center;
  padding-bottom: 30px;
}
h2 {
  text-align: center;
  font-size: 2em;
}
article {
  position: relative;
  margin-top: 50px;
}
.post-date {
  background-color: #97dffd;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  position: absolute;
  top: -172px;
  left: -40px;
  height: 50px;
  width: 60px;
  padding-top: 10px;
  border-radius: 100px;
  color: #fff;
  text-align: center;
  line-height: 1.1;
}
.post-day {
  font-size: 27px;
  font-weight: 700;
}
.post-month {
  font-size: 14px;
}
.fallCat {
  width: 70px;
  height: 900px;
  position: fixed;
  right: 50px;
  top: -900px;
  z-index: 2;
  background-image: url("../assets/scroll .png");
  overflow: hidden;
  background-size: 100% 100%;
  transition-property: top;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
}

.myheader {
  text-align: center;
  vertical-align: middle;
}
.post-time {
  color: #00a7e0;
  font-size: 12px;
}
.fa {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fa-calendar-o::before {
  content: "\f133";
}
img {
  width: 12px;
  margin-bottom: -2px !important;
}
.post-badge {
  position: absolute;
  left: -16px;
  top: 105px;
  border-color: #47456d;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background-color: #97dffd;
  margin: 5px 0 15px 2px;
  font-size: 14px;
  border-radius: 0 4px 4px 0;
  display: inline-block;
  padding: 7px 11px 7px 32px;
  line-height: 1;
}
.post-badge:after {
  position: absolute;
  content: "";
  top: 100%;
  left: 0;
  border-top: 0 solid transparent;
  border-right-width: 1em;
  border-right-color: inherit;
  border-right-style: solid;
  border-bottom: 1em solid transparent;
  border-left: 0 solid transparent;
  width: 0;
  height: 0;
}
.post-badge span {
  color: #fff;
}
.post-badge:hover {
  background-color: #00a7e0;
}
footer p {
  padding: 4px;
  margin-bottom: 1px;
  font-size: 22px;
}
footer span {
  margin-left: 20px;
}
.updatedAt {
  margin-left: 10px;
  color: rgb(33, 250, 47);
}
article {
  font-size: 18px;
}
.input {
  margin: 0 auto;
}
.leavingCat-leave-active {
  animation: leave 2s ease-in-out forwards;
}
.catLeave {
  animation: leave 2s ease-in-out forwards;
}
#evanyou {
  position: fixed;
  width: 100%;
  height: 100%;
  /*-61px */
  /* top: 708px; */
  top: 0px;
  left: 0;
  z-index: -1;
  /* margin-top: 61px; */
  background: #efefef;
  transition: top 0.2s;
}

@keyframes fall {
  100% {
    top: -307px;
  }
}
@keyframes leave {
  100% {
    top: -900px;
  }
}
</style>