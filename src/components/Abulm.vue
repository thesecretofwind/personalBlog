<!--  -->
<template>
<div class="ablum">
      <div class="prev" @click="preIndex">&#10094;</div>
      <div class="next" @click="nextIndex">&#10095;</div>
    <div class="slide">
      <div class="slideshow">
          <ul>
              <li v-for="(img,index) in imgUrl" :key="index" v-show=" index === currentIndex">
                  <img :src="img">
              </li>
          </ul>
      </div>

      <div class="bar">
          <span v-for="(item,index) in imgUrl" :key="index" :class="{'active':index === currentIndex}" @click="currentIndex = index">

          </span>
      </div>
  </div>
</div>
  

</template>

<script>
export default {
  data() {
    return {
        currentIndex:0,
        imgUrl:[
            require('../../static/images/1.jpg'),
            require('../../static/images/2.jpg'),
            require('../../static/images/3.jpg'),
            require('../../static/images/4.jpg'),
            require('../../static/images/5.jpg'),
            require('../../static/images/6.jpg'),
            require('../../static/images/7.jpg'),
            require('../../static/images/8.jpg'),
            require('../../static/images/9.jpg'),
            require('../../static/images/10.jpg'),
            require('../../static/images/11.jpg'),
            require('../../static/images/12.jpg'),
            require('../../static/images/13.jpg'),
            require('../../static/images/14.jpg'),
            require('../../static/images/15.jpg'),
            require('../../static/images/16.jpg'),
            require('../../static/images/17.jpg'),
            require('../../static/images/18.jpg'),
            require('../../static/images/19.jpg'),
            require('../../static/images/20.jpg'),
        ]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
      this.autoplay();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods:{
      autoplay(){
          this.currentIndex++;
          if(this.currentIndex === this.imgUrl.length){
              this.currentIndex = 0;
          }
      },
      play(){
          setInterval(this.autoplay,2000);
      },
      preIndex(){
          this.currentIndex--;
          if(this.currentIndex < 0){
              this.currentIndex = this.imgUrl.length-1;
          }
      },
      nextIndex(){
          this.currentIndex++;
          if(this.currentIndex === this.imgUrl.length){
              this.currentIndex = 0;
          }
      }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
*{
    margin: 0px;
    padding: 0px;
    list-style-type: none;
}
.ablum{
    margin-top: -160px;
    margin-left: -8px;
    /* margin-bottom: 50px; */
    padding-bottom: 50px;
    background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
}
.slide{
    /* width: 1024px;
    height:320px; */
    width: 90%;
    height: 700px;
    /* margin: 0 auto; */
    margin-left: 10px;
    /* margin-top: -254px; */
    margin-bottom: 100px;
    overflow: hidden;
    position: relative;
}
.slideshow{
    /* width: 1024px;
    height: 320px; */
    width: 100%;
}
li{
    position: absolute;
    left: 6px;
    transition: all .3s;
    width: 100%;
}
img{
    /* width: 880px;
    height: 300px; */
    max-width: 100%;
    margin-left: 112px;
}
.bar{
    position: absolute;
    width: 100%;
    bottom: 10px;
    margin-left: 122px;
    z-index: 10;
    text-align: center;
}
.bar span{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid;
    background: white;
    border-color: gray;
    display: inline-block;
    margin-right: 1px;
}
.active{
    background: rgb(255,202,207) !important;
}
.prev{
    position: absolute;
    top: 1219px;
    left: 12px;
    width: 80px; 
    height: 110px;
    font-size: 70px;
    color: rgb(255,202,207);
    z-index: 100;
}
.next {
    position: relative;
    top: 463px;
    left: 1479px;
    /* right: 0px; */
    /* width: 153px; */
    /* height: 100px; */
    font-size: 70px;
    color: rgb(255,202,207);
}
.prev, .next{
    cursor: pointer;
}
</style>