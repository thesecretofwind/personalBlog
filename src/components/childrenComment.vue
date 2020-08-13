<!--  -->
<template>
  <div class="mychildren">
    <ul>
      <li v-for="(item,index) in child" :key="index">
        {{item.id}}
        <span class="nickname">{{item.nickname}}</span>
        <span class="parentnickname">回复 @{{parentNickname}}</span>
        <span class="time">{{item.time}}</span>
        <p class="content">{{item.content}}</p>
        <div class="button">
          <ul>
            <li>
              <button href="#" v-show="isShow" class="more" style>更多</button>
            </li>
            <li>
              <button href="#" class="reply" @click="showReply1(item.id)">回复</button>
            </li>
          </ul>
        </div>
        <hr v-show="isShow" />
        <div v-show="Boolean(item.children)">
          <childComment :child="item.children" :parentNickname="item.nickname"></childComment>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import bus from "../bus";
export default {
  name: "childComment",
  //  父组件传递过来的值
  props: ["child", "parentNickname"],
  data() {
    return {
      // 控制如果children为空则显示 更多 按钮效果，
      isShow: false
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    //  判断child数组是否为空
    if (this.child.length && this.child.length > 0) {
      this.isShow = true;
    }
  },
  methods: {
    //  点击回复按钮，将层级发送给父组件（使用了中央事件总线）
    showReply1(id) {
      bus.$emit("showcomment", id);
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
ul {
  list-style-type: none;
}
li {
  padding: 5px;
}
.nickname {
  font-size: 20px;
  font-weight: 700px;
}
.time {
  font-size: 13px;
  color: #667c99;
  margin-left: 10px;
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
}
.more {
  color: #667c99 !important;
}
.more,
.reply {
  margin-bottom: 0;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  white-space: nowrap;
  padding: 6px 12px;
  color: #667c99;
  border: none;
  background: transparent;
  user-select: none;
  outline: none;
  border-radius: 5px;
}
.button li {
  display: inline;
}
.mychildren {
  margin-left: -39px;
}
.mychildren .nickname {
  margin-left: -2px;
}
.button ul {
  margin-left: 549px;
}
button {
  font-size: 17px;
}
.button button:hover {
  background-color: rgb(73, 177, 245);
}
.parentnickname {
  text-indent: 2px;
  margin-left: 10px;
  color: rgb(82, 195, 241);
}
.parentnickname:hover {
  color: rgb(242, 93, 142);
}
</style>