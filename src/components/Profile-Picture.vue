<!-- /* eslint-disable */ -->
<template>
  <div class=".profile-picture">
    <div class="picture">
      <img src="../assets/profile-picture.jpg" alt="Mr.cutiosity的头像" title="登陆" @click="showLogin"/>
      <p class="words">看见奥特曼就落荒而逃的怪兽</p>
    </div>
    <div class="loggin" v-show="isShowLogin">
      <span class="close" @click="close">x</span>
      <div class="form-wrapper">
        <div class="header">login</div>
        <div class="input-wrapper">
          <div class="border-wrapper">
            <input type="text" name="username" placeholder="username" class="border-item" v-model="username" />
          </div>
          <div class="border-wrapper">
            <input type="password" name="password" placeholder="password" class="border-item" v-model="password" />
          </div>
        </div>
        <div class="action">
          <div class="btn" @click="submmit">login</div>
        </div>
        <div class="icon-wrapper">
          <i class="iconfont icon-weixin"></i>
          <i class="iconfont icon-qq"></i>
          <i class="iconfont icon-github"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import bus from '../bus';
const AV = require("leancloud-storage");
// const Todo = AV.Object.extend("Todo");
// const todo = new Todo();
// const Query = new AV.Query("Todo");
const user = new AV.User();
export default {
  data() {
    return {
      isShowLogin:false,
      username:'',
      password:'',
      isDisabled:true,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods:{
    close(){
      this.isShowLogin = false;
    },
    showLogin(){
      this.isShowLogin  = true;
    },
    submmit(){
      if(this.username === ''){
        alert('用户名不能为空');
      }else if(this.password === ''){
        alert('密码不能为空')
      }else{
      //   user.setUsername(this.username);
      //   user.setPassword(this.password);
      //   user.signUp().then((user) => {
      //     // 注册成功
      //     console.log(`注册成功。objectId：${user.id}`);
      //   }, (error) => {
      //     // 注册失败（通常是因为用户名已被使用）
      //     console.log('注册失败');
          
      // });
      if(this.is_email(this.username)){
       AV.User.loginWithEmail(this.username,this.password)
        .then( (user) => {
              alert('登陆成功');
              this.sendDisabled();
              this.closeLogin();
            }, (error) => {
                console.log('密码或者账号输入有误','email')
            })
      }else if(this.is_phonenumber(this.username)){
        AV.User.logInWithMobilePhone(this.username,this.password)
        .then( (user) => {
              alert('登陆成功');
               this.sendDisabled();
              this.closeLogin();
            }, (error) => {
                console.log('密码或者账号输入有误','phone')
            })
      }else{
        AV.User.logIn(this.username,this.password)
            .then( (user) => {
              alert('登陆成功');
               this.sendDisabled();
              this.closeLogin();
            }, (error) => {
                console.log('密码或者账号输入有误','zhanghao')
            })
      }

      }
    },
     is_email(text) {
    var pattern = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]*\.)+[A-Za-z]{2,14}$/;
    return pattern.test(text);
  },
   is_phonenumber(text) {
    var pattern = /^((13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/;
    return pattern.test(text);
},
  closeLogin(){
    setTimeout( () => {
      this.isShowLogin = false;
    },1000)
    
  },
  sendDisabled(){
      this.isDisabled = false;
      bus.$emit('isDisabled',this.isDisabled);
  }

  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */

@import url(http://at.alicdn.com/t/font_8d5l8fzk5b87iudi.css);
.picture {
  position: relative;
  width: 75%;
  margin: auto;
  margin-top: 600px;
  top: -170px;
  padding: 40px 0;
  padding-bottom: 40px;
  font-size: 16px;
  opacity: 0.98;
  background: rgba(230, 244, 249, 0.8);
  z-index: 1;
  border-radius: 5px;
  text-align: center;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  border: 2px dashed #fff;
  padding: 5px;
  animation: imgTranslate 20s linear infinite;
}
img:hover {
  animation: imgHover infinite 1s ease-in-out;
}
.words {
  font-size: 18px;
  font-weight: 700;
  margin: 20px auto;
  color: #97dffd;
  text-align: center;
  text-shadow: 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff,
    0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff,
    0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff,
    0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff,
    0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff,
    0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff,
    0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff,
    0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff,
    0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff,
    0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff;
}
@keyframes imgTranslate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes imgHover {
  0% {
    transform: scale(1.5);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1.5);
  }
}
.loggin {
  position: absolute;
  width: 102%;
  height: 114%;
  background: red;
  z-index: 4;
  top: 0px;
  font-family: 'JetBrains Mono Medium';
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #0e92b3;
}
.form-wrapper{
	width: 300px;
	background-color: rgb(41,45,62);
	color: #fff;
	border-radius: 2px;
	padding: 50px;
}

.form-wrapper .header{
	text-align: center;
	font-size: 35px;
	text-transform: uppercase;
	line-height: 100px
}

.form-wrapper .input-wrapper input{
	background-color: rgb(41,45,62);
	border:0;
	width: 100%;
	text-align: center;
	font-size: 15px;
	color: #fff;
	outline: none;
}

.form-wrapper .input-wrapper input::placeholder{
	text-transform: uppercase;
}
.form-wrapper .input-wrapper .border-wrapper{
	background-image: linear-gradient(to right, #e8198b,#0eb4dd);
	width: 100%;
	height: 50px;
	margin-bottom: 20px;
	border-radius: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.form-wrapper .input-wrapper .border-wrapper .border-item{
	height: calc(100% - 4px);
	width: calc(100% - 4px);
	border-radius: 30px;
}

.form-wrapper .action{
	display: flex;
	justify-content: center;
}

.form-wrapper .action .btn{
	width: 60%;
	text-transform: uppercase;
	border:2px solid #0e92b3;
	text-align: center;
	line-height: 50px;
	border-radius: 30px;
	cursor: pointer;
	transition: all .2s;
}

.form-wrapper .action .btn:hover{
	background-color: #0e92b3;
}

.form-wrapper .icon-wrapper{
	text-align: center;
	width: 60%;
	margin:0 auto;
	margin-top: 20px;
	border-top: 1px dashed rgb(146,146,146);
	padding: 20px; 
}

.form-wrapper .icon-wrapper i {
	display:inline-block;
	font-size: 20px;
	color: rgb(187,187,187);
	cursor: pointer;
	border: 1px solid #fff;
	padding: 5px;
	border-radius: 20px;
}

input:focus{
    outline: none;
    border-color: #9ecaed;
    box-shadow: 0 0 10px #9ecaed;
}

i:hover{
	
	animation: transBigger .6s ease-in-out forwards;
	/*transform: scale(2);*/
}
.close{
    position: absolute;
    top: 1px;
    right: 18px;
    font-size: 19px;
    color: rgb(204,204,204);
    cursor: pointer;
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
    vertical-align: middle;
}
.close:hover{
  color: #fff;
  background-color: rgb(51,51,51);
}

@keyframes transBigger{
	0%{
		transform: scale(0.9)
	}
	100%{
		
		transform: scale(1.33);
	}

}
</style>