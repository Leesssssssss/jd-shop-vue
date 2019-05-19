<template>
  <!-- 账号管理页面 -->
  <div>
    <!-- 顶部 -->
    <div class="header">
      <i
        class="iconfont icon-back"
        style="color:#909295;font-size:25px;margin:0 10px;"
        @click="back"
      ></i>
      <span class="headerText">账号管理</span>
      <i class="iconfont icon-more" style="color:#909295;font-size:25px;margin:0 10px;"></i>
    </div>

    <!-- 表单 -->
    <div class="one">当前登录账号</div>
    <div class="two">
      <div>
        <svg class="icon" aria-hidden="true" style="font-size:50px;">
          <use xlink:href="#icon-touxiang"></use>
        </svg>
      </div>
      <div class="twoItem">
        <span class="name">{{name}}</span>
        <span class="email">邮箱：未设置</span>
      </div>
    </div>
    <div class="three" @click="changePassword">
      <div>修改登录密码</div>
      <i class="iconfont icon-right" style="color:#7b7b7b;font-size:18px;margin-right:20px;"></i>
    </div>
    <div class="three" @click="changeTelNum">
      <div>修改绑定手机号码</div>
      <div class="threeItem">
        <div class="telNum">{{telNum}}</div>
        <i class="iconfont icon-right" style="color:#7b7b7b;font-size:18px;margin-right:20px;"></i>
      </div>
    </div>
    <div class="three">
      <div>支付密码管理</div>
      <i class="iconfont icon-right" style="color:#7b7b7b;font-size:18px;margin-right:20px;"></i>
    </div>
    <div class="three" @click="address">
      <div>收货地址管理</div>
      <i class="iconfont icon-right" style="color:#7b7b7b;font-size:18px;margin-right:20px;"></i>
    </div>
    <div class="three">
      <div>切换站点</div>
      <i class="iconfont icon-right" style="color:#7b7b7b;font-size:18px;margin-right:20px;"></i>
    </div>
    <div class="three">
      <div>实名认证</div>
      <i class="iconfont icon-right" style="color:#7b7b7b;font-size:18px;margin-right:20px;"></i>
    </div>
    <div class="three">
      <div>关联账号</div>
      <i class="iconfont icon-right" style="color:#7b7b7b;font-size:18px;margin-right:20px;"></i>
    </div>

    <!-- 底部 -->
    <div class="tab">
      <div class="tabItem">
        <i class="iconfont icon-fankui" style="color:#999999;margin-right:5px;"></i>
        <span class="tabItemText">意见反馈</span>
      </div>
      <div class="tabItem">
        <i class="iconfont icon-jingdong" style="color:#999999;margin-right:5px;"></i>
        <span class="tabItemText">京东客户端</span>
      </div>
      <div class="tabItem" @click="unLogin">
        <i class="iconfont icon-my_fill_light" style="color:#999999;margin-right:5px;"></i>
        <span class="tabItemText">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      telNum: ""
    };
  },
  created() {
    // 获取用户名以及手机号码
    this.name = localStorage.userName;
    axios
      .get("http://jd.hhp.im/getInfo", {
        params: { userName: localStorage.userName }
      })
      .then(res => {
        var result = res.data[0];
        this.telNum =
          result.telNum.slice(0, 3) + "*****" + result.telNum.slice(8);
      });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 修改密码
    changePassword() {
      this.$router.push({ path: "/changePassword" });
    },
    // 修改手机号码
    changeTelNum() {
      this.$router.push({ path: "/changeTelNum" });
    },
    // 收货地址管理
    address() {
      this.$router.push({ path: "/address" });
    },
    // 退出登录
    unLogin() {
      localStorage.clear();
      location.reload();
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./accountManagement.scss";
</style>
