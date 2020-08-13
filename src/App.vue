/*eslint disabled */
<template>
  <div id="app">
    <div class="hearder">
      <blog-header></blog-header>
      <div class="blog-title">
        <span class="m">M</span>
        <span class="r">r</span>
        <span class="dot">.</span>
        <span class="c">c</span>
        <span class="u">u</span>
        <span class="r2">r</span>
        <span class="i">i</span>
        <span class="o">o</span>
        <span class="s">s</span>
        <span class="i2">i</span>
        <span class="t">t</span>
        <span class="y">y</span>
        <span class="super">'</span>
        <span class="s2">s</span>
        <span class="b">B</span>
        <span class="l">l</span>
        <span class="o2">o</span>
        <span class="g">g</span>
      </div>
      <ProfilePicture></ProfilePicture>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
//  引入BlogHeader组件
import BlogHeader from "./components/BlogHeader";
//  引入ProfilePicture组件（注意得用驼峰命名法）
import ProfilePicture from "./components/Profile-Picture";
export default {
  name: "App",
  components: {
    // AddBlog,
    //  ShowBlogs,
    BlogHeader,
    ProfilePicture
  }
};
</script>

<style>
body {
  font-family: "PingFang SC", "Microsoft YaHei", Lato, sans-serif;
}
</style>
<style scoped>
h1 {
  margin: 0 auto;
  font-size: 49px;
  color: transparent;
  background: linear-gradient(#f6d365, #ff9800);
  background-clip: text;
  font-size: 55px;
  display: inline;
  vertical-align: top;
}
img {
  display: inline;
}
#show-blogs {
  animation: loading 1.2s ease-in-out infinite alternate;
}
.blog-title {
  margin: 0 auto;
  width: 1052px;
  margin-top: 150px;
  position: relative;
  text-shadow: 0 0 2px rgba(204, 208, 212, 0.9), 0 15px 25px rgba(0, 0, 0, 0.3),
    0 -2px 3px rgba(0, 0, 0, 0.1), 0 -5px 10px rgba(255, 255, 255, 0.5),
    0 5px 10px rgba(0, 0, 0, 0.3), 0 3px 4px rgba(255, 255, 255, 0.2),
    0 0 20px rgba(255, 255, 255, 0.45);
  animation: loading 1.2s 4s ease-in-out 5 forwards;
}

span {
  color: transparent;
  font-family: Georgia, serif;
  font-style: italic;
  background-clip: text;
  position: absolute;
}
.m {
  left: 20px;
  top: -450px;
  font-size: 200px;
  color: transparent;
  letter-spacing: 0.04em;
  font-family: Georgia, serif;
  font-style: italic;
  background: linear-gradient(#f6d365, #ff9800);
  background-clip: text;
  animation: mfall 4s ease-in-out forwards;
}

.r {
  left: 216px;
  /* top: 136px; */
  top: -280px;
  font-size: 50px;
  font-family: Georgia, serif;
  font-style: italic;
  margin-left: -25px;
  color: transparent;
  background: linear-gradient(#ffecd2, #fcb69f);
  background-clip: text;
  animation: rfall 4s 0.2s ease-in-out forwards;
}
.dot {
  left: 208px;
  /* top: 154px; */
  top: -271px;
  font-size: 30px;
  background-image: linear-gradient(-225deg, #cbbacc 0%, #2580b3 100%);
  animation: dotfall 4s 0.3s ease-in-out forwards;
}
.c {
  left: 229px;
  /* top: -20px; */
  top: -447px;
  font-size: 220px;
  background-image: linear-gradient(
    to right,
    #ff8177 0%,
    #ff867a 0%,
    #ff8c7f 21%,
    #f99185 52%,
    #cf556c 78%,
    #b12a5b 100%
  );
  background-clip: text;
  animation: cfall 4s 0.4s ease-in-out forwards;
}
.u {
  left: 332px;
  /* top: 62px; */
  top: -333px;
  font-size: 100px;
  color: transparent;
  background: linear-gradient(#fbc2eb, #a6c1ee);
  background-clip: text;
  animation: ufall 4s 0.5s ease-in-out forwards;
}
.r2 {
  left: 385px;
  /* top: -22px; */
  top: -430px;
  font-size: 200px;
  background: linear-gradient(#a1c4fd, #c2e9fb);
  background-clip: text;
  animation: r2fall 4s 0.6s ease-in-out forwards;
}
.i {
  left: 493px;
  /* top: 101px; */
  top: -293px;
  font-size: 50px;
  background: linear-gradient(#d4fc79, #96e6a1);
  background-clip: text;
  margin-left: -20px;
  vertical-align: text-bottom;
  animation: ifall 4s 0.7s ease-in-out forwards;
}
.o {
  left: 500px;
  /* top: 20px; */
  top: -346px;
  font-size: 110px;
  background: linear-gradient(#4facfe, #00f2fe);
  background-clip: text;
  margin-left: 5px;
  animation: ofall 4s 0.8s ease-in-out forwards;
}
.s {
  left: 570px;
  /* top: 53px; */
  top: -315px;
  font-size: 80px;
  background: linear-gradient(#e0c3fc, #8ec5fc);
  background-clip: text;
  animation: sfall 4s 0.9s ease-in-out forwards;
}
.i2 {
  left: 611px;
  /* top: 61px; */
  top: -333px;
  font-size: 100px;
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  animation: i2fall 4s 1s ease-in-out forwards;
}
.t {
  left: 645px;
  /* top: 63px; */
  top: -360px;
  font-size: 120px;
  background-image: linear-gradient(
    to right,
    #eea2a2 0%,
    #bbc1bf 19%,
    #57c6e1 42%,
    #b49fda 79%,
    #7ac5d8 100%
  );
  animation: tfall 4s 1.1s ease-in-out forwards;
}
.y {
  left: 685px;
  /* top: 126px; */
  top: -303px;
  font-size: 50px;
  background-image: linear-gradient(
    to top,
    #d5d4d0 0%,
    #d5d4d0 1%,
    #eeeeec 31%,
    #efeeec 75%,
    #e9e9e7 100%
  );
  animation: yfall 4s 1.2s ease-in-out forwards;
}
.super {
  left: 719px;
  /* top: 64px; */
  top: -267px;
  font-size: 50px;
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  animation: superfall 4s 1.3s ease-in-out forwards;
}
.s2 {
  left: 734px;
  /* top: 60px; */
  top: -283px;
  font-size: 35px;
  background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
  animation: s2fall 4s 1.4s ease-in-out forwards;
}
.b {
  left: 746px;
  top: -431px;
  font-size: 200px;
  font-size: 200px;
  background-image: linear-gradient(
    to top,
    #fcc5e4 0%,
    #fda34b 15%,
    #ff7882 35%,
    #c8699e 52%,
    #7046aa 71%,
    #0c1db8 87%,
    #020f75 100%
  );
  animation: bfall 4s 1.5s ease-in-out forwards;
}
.l {
  left: 871px;
  /* top:61px; */
  top: -363px;
  font-size: 130px;
  background-image: linear-gradient(to right, #f83600 0%, #f9d423 100%);
  animation: lfall 4s 1.6s ease-in-out forwards;
}
.o2 {
  left: 906px;
  /* top: 73px; */
  top: -373px;
  font-size: 100px;
  background-image: linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%);
  animation: o2fall 4s 1.7s ease-in-out forwards;
}
.g {
  left: 962px;
  top: -358px;
  /* top: 77px; */
  font-size: 100px;
  background-image: linear-gradient(-225deg, #7de2fc 0%, #b9b6e5 100%);
  animation: gfall 4s 1.8s ease-in-out forwards;
}
@keyframes loading {
  100% {
    text-shadow: 0 0 2px rgba(204, 208, 212, 0.2), 0 0 3px rgba(0, 0, 0, 0.02),
      0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(255, 255, 255, 0),
      0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(255, 255, 255, 0),
      0 0 0 rgba(255, 255, 255, 0);
  }
}

@keyframes mfall {
  50% {
    top: -80px;
  }
  60% {
    top: 0px;
  }
  70% {
    top: -20px;
  }
  80% {
    top: -5px;
  }
  90% {
    top: -15px;
  }
  100% {
    top: 0px;
  }
}
@keyframes rfall {
  50% {
    top: 100px;
  }
  60% {
    top: 136px;
  }
  70% {
    top: 125px;
  }
  80% {
    top: 136px;
  }
  90% {
    top: 125px;
  }
  100% {
    top: 136px;
  }
}
@keyframes dotfall {
  50% {
    top: 54px;
  }
  60% {
    top: 154px;
  }
  70% {
    top: 145px;
  }
  80% {
    top: 154px;
  }
  90% {
    top: 145px;
  }
  100% {
    top: 154px;
  }
}
@keyframes cfall {
  50% {
    top: -120px;
  }
  60% {
    top: -20px;
  }
  70% {
    top: -50px;
  }
  80% {
    top: -20px;
  }
  90% {
    top: -50px;
  }
  100% {
    top: -20px;
  }
}
@keyframes ufall {
  50% {
    top: -38px;
  }
  60% {
    top: 62px;
  }
  70% {
    top: 40px;
  }
  80% {
    top: 62px;
  }
  90% {
    top: 40px;
  }
  100% {
    top: 62px;
  }
}
@keyframes r2fall {
  50% {
    top: -120px;
  }
  60% {
    top: -20px;
  }
  70% {
    top: -40px;
  }
  80% {
    top: -20px;
  }
  90% {
    top: 0px;
  }
  100% {
    top: -22px;
  }
}
@keyframes ifall {
  50% {
    top: 0px;
  }
  60% {
    top: 101px;
  }
  70% {
    top: 80px;
  }
  80% {
    top: 95px;
  }
  90% {
    top: 85px;
  }
  100% {
    top: 101px;
  }
}
@keyframes ofall {
  50% {
    top: -80px;
  }
  60% {
    top: 20px;
  }
  70% {
    top: 0px;
  }
  80% {
    top: 15px;
  }
  90% {
    top: 5px;
  }
  100% {
    top: 20px;
  }
}
@keyframes sfall {
  50% {
    top: -50px;
  }
  60% {
    top: 53px;
  }
  70% {
    top: 33px;
  }
  80% {
    top: 47px;
  }
  90% {
    top: 36px;
  }
  100% {
    top: 53px;
  }
}
@keyframes i2fall {
  50% {
    top: -40px;
  }
  60% {
    top: 61px;
  }
  70% {
    top: 41px;
  }
  80% {
    top: 55px;
  }
  90% {
    top: 45px;
  }
  100% {
    top: 61px;
  }
}
@keyframes tfall {
  50% {
    top: -40px;
  }
  60% {
    top: 63px;
  }
  70% {
    top: 43px;
  }
  80% {
    top: 58px;
  }
  90% {
    top: 43px;
  }
  100% {
    top: 63px;
  }
}
@keyframes yfall {
  50% {
    top: -26px;
  }
  60% {
    top: 126px;
  }
  70% {
    top: 106px;
  }
  80% {
    top: 120px;
  }
  90% {
    top: 100px;
  }
  100% {
    top: 126px;
  }
}
@keyframes superfall {
  50% {
    top: -40px;
  }
  60% {
    top: 64px;
  }
  70% {
    top: 44px;
  }
  80% {
    top: 60px;
  }
  90% {
    top: 49px;
  }
  100% {
    top: 64px;
  }
}
@keyframes s2fall {
  50% {
    top: -40px;
  }
  60% {
    top: 60px;
  }
  70% {
    top: 40px;
  }
  80% {
    top: 55px;
  }
  90% {
    top: 45px;
  }
  100% {
    top: 60px;
  }
}
@keyframes bfall {
  50% {
    top: -80px;
  }
  60% {
    top: 20px;
  }
  70% {
    top: 0px;
  }
  80% {
    top: 15px;
  }
  90% {
    top: 0px;
  }
  100% {
    top: 20px;
  }
}
@keyframes lfall {
  50% {
    top: -40px;
  }
  60% {
    top: 61px;
  }
  70% {
    top: 41px;
  }
  80% {
    top: 55px;
  }
  90% {
    top: 45px;
  }
  100% {
    top: 61px;
  }
}
@keyframes o2fall {
  50% {
    top: -30px;
  }
  60% {
    top: 73px;
  }
  70% {
    top: 53px;
  }
  80% {
    top: 67px;
  }
  90% {
    top: 57px;
  }
  100% {
    top: 73px;
  }
}
@keyframes gfall {
  50% {
    top: -23px;
  }
  60% {
    top: 77px;
  }
  70% {
    top: 57px;
  }
  80% {
    top: 70px;
  }
  90% {
    top: 60px;
  }
  100% {
    top: 77px;
  }
}
.header {
  background: url("./assets/bg.jpg") no-repeat;
  position: relative;
  height: 650px;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
#app{
   background: url("../static/images/bg.jpg") no-repeat;
  position: relative;
  height: 650px;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: -8px;
}
</style>
