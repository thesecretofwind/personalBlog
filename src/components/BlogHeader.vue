<!--  -->
<template>
  <nav>
      <ul>
          <li>
              <!-- exact点击一个，另一个点击参数就会消失 -->
              <router-link to='/' exact >首页</router-link>
          </li>
          <li>
              <router-link to='/add' exact :class="{'isDisabled':isDisabled}">添加</router-link>
          </li>
          <li>
              <router-link :to=" '/tags/' +'5f22575f1e5e9f0008efc0b8'" >标签</router-link>
          </li>
          <li>
              <router-link to="/ablum">相册</router-link>
          </li>
          <li>
              
          </li>
      </ul>
        <div class="explore">
            <input type="text" class="input" placeholder="请输入查询标题" @input="search" v-model="inputVal">
            <img src="../../static/images/explore1.png" alt="">
        </div>  
  </nav>
</template>

<script>
import bus from '../bus'
export default {
    name:'blog-header',
  data() {
    return {
        inputVal:'',
        isDisabled:true,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
      bus.$on('isDisabled', data => {
            this.isDisabled = data;
      })
  },
  methods:{
      search(){
          bus.$emit('inputVal',this.inputVal)
      }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */

ul{
    list-style-type: none;
    /* text-align: center; */
    margin: 0;
    padding-left: 50px;
}
li{
    display: inline-block;
    margin: 0 10px;
}
a{
    color: #fff;
    text-decoration: none;
    padding: 12px;
    border-radius:5px;
    vertical-align: middle
}
nav{
    background-color: transparent;
    padding: 30px 0;
    padding-top: 0px;
    margin-bottom: 30px;
    margin-top: 8px;
}
.router-link-active{
    background-color: rgba(255,255,255,0.8);
    color: #444;
}
a:hover{
     background-color: rgba(255,255,255,0.8);
     color: #444;
}
svg{
    width: 10px;
}
.explore img{
    width: 25px;
    vertical-align: middle;
}
.explore{
    position: absolute;
    top: -6px;
    right: 13px;
}
.explore input{
    border: none;
    border-radius: 4px;
    color: #555;
    font-size: 13px;
    outline: 0;
    width: 0;
    padding: 3px 0;
    margin-top: 10px;
    margin-right: 10px;
    transition: all .5s ease-in-out;
    height: 24px;
}
.explore:hover .input{
    width: 140px !important;
}
input:hover{
     width: 140px !important;
}
.isDisabled{
  cursor: not-allowed;
}
.isDisabled:active{
  pointer-events: none;
}
</style>