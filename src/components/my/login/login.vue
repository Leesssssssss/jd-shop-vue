<template>
  <!-- 登录页面 -->
  <div>
    <!-- 顶部 -->
    <div class="header">
      <i
        class="iconfont icon-back"
        style="color:#909295;font-size:25px;margin:0 10px;"
        @click="back"
      ></i>
      <span class="headerText">京东登录</span>
      <div class="block"></div>
    </div>

    <!-- 选项框 -->
    <div class="choose">
      <ul class="chooseAccount">
        <span>账号密码登录</span>
      </ul>
      <ul class="chooseSms">
        <span>短信验证码登录</span>
      </ul>
    </div>

    <!-- 登录信息 -->
    <div class="login">
      <div class="loginAccount">
        <div class="loginAccountItem">
          <div class="loginAccountItemText">账号</div>
          <input v-model="items.account" ref="account" type="text" placeholder="用户名/邮箱/已验证手机">
        </div>
        <div class="loginAccountItem">
          <div class="loginAccountItemText">密码</div>
          <input v-model="items.password" ref="password" type="password" placeholder="请输入密码">
          <i
            class="iconfont icon-attentionforbidfill"
            style="color:#c7c7c7;font-size:22px;margin-right:5px;"
          ></i>
        </div>
        <div class="loginAccountItem">
          <div class="loginAccountItemText">验证码</div>
          <input v-model="items.authCode" ref="authCode" type="text" placeholder="请输入图片验证码">
          <img class="loginAccountItemYan" src="../../../assets/yanzhengma.jpg" alt>
        </div>
      </div>

      <div class="loginBtn">
        <button :class="{ loginBtn1: is1, loginBtn1Active: is1Active }" @click="login">登录</button>
        <br>
        <button class="loginBtn2">一键登录</button>
      </div>

      <div class="little">
        <div class="littleItem">
          <i class="iconfont icon-lock" style="color:#c7c7c7;margin-right:5px;"></i>
          <span>忘记密码</span>
        </div>
        <div class="littleItem">
          <i class="iconfont icon-shouji" style="color:#c7c7c7;margin-right:5px;"></i>
          <span @click="toSignUp">手机快速注册</span>
        </div>
      </div>

      <div class="otherLogin">
        <h4 class="otherLoginTitle">其他登录方式</h4>
        <div class="otherLoginPic">
          <i class="iconfont icon-QQ" style="color:#5eaeff;font-size:28px;margin:30px;"></i>
          <i class="iconfont icon-wechat" style="color:#87d26f;font-size:28px;margin:30px;"></i>
        </div>
        <div class="otherLoginText">登录即代表同意您已同意京东隐私政策</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      items: {
        account: "",
        password: "",
        authCode: ""
      },
      is1: true,
      is1Active: false
    };
  },
  watch: {
    items: {
      handler: function(val, oldval) {
        if (
          this.$refs.account.value !== "" &&
          this.$refs.password.value !== "" &&
          this.$refs.authCode.value !== ""
        ) {
          this.is1 = false;
          this.is1Active = true;
        } else {
          this.is1 = true;
          this.is1Active = false;
        }
      },
      deep: true
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 去注册
    toSignUp() {
      this.$router.push({ path: "/signUp" });
    },
    // 登录
    login() {
      if (this.is1Active === false) {
        MessageBox("提示", "请输入完整信息！");
      } else {
        if (this.items.authCode != "323g") {
          MessageBox("提示", "验证码错误！");
        } else {
          axios
            .post("http://localhost:7001/login", {
              account: this.items.account,
              password: this.items.password
            })
            .then(result => {
              var res = result.data;
              console.log(res);
              if (res === "账号或密码错误！") {
                MessageBox("提示", res);
              } else {
                MessageBox("提示", res.message);
                localStorage.login = "login";
                localStorage.userName = res.data.userName;
                this.$router.push({ path: "/" });
              }
            });
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "./login.scss";
</style>