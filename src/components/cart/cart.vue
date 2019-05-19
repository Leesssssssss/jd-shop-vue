<template>
<!-- 购物车页面 -->
  <div>
    <!-- 顶部 -->
    <div class="header">
      <i class="iconfont icon-back" style="color:#909295;font-size:25px;margin:0 10px;" @click="back"></i>
      <span class="headerText">购物车</span>
      <i class="iconfont icon-more" style="color:#909295;font-size:25px;margin:0 10px;"></i>
    </div>

    <!-- 购物车为空 -->
    <div class="unLogin" v-show="emptyCart">
      <img src="../../assets/cart.png" alt="">
      <div class="unLoginText">{{text}}</div>
      <button v-show="loginBtn" class="unLoginBtn" @click="toLogin">登录</button>
    </div>

    <!-- 购物车不为空展示商品信息 -->
    <div class="cart" v-show="cart">
      <div class="shopName">
        <div v-bind:class="{ checkBoxR: allChoose, checkBox: !allChoose }" @click="choose"></div>
        <i class="iconfont icon-jd-copy" style="color:#999999;font-size:18px;margin:5px;"></i>
        <span class="shopNameTitle">京东自营</span>
      </div>
      <div class="goodList" v-for="(good,index) in goods">
        <div @click="checkHandle(good)" v-bind:class='{ checkBoxR: good.checkStatus, checkBox:!good.checkStatus }'></div>
        <img :src="good.pic" alt="">
        <div class="goodInfo">
          <div class="goodInfoTitle">
            <img src="https://img11.360buyimg.com/jdphoto/s102x28_jfs/t14512/288/2659278877/2368/8468a10d/5aadf9daNd4909ddc.png!q70.webp" alt="">
            <span class="goodInfoText">{{good.goodName}}</span>
          </div>
          <div class="goodInfoKouwei">0.72kg/件,  {{good.kouwei}}</div>
          <div class="goodInfoPriceAndCount">
            <div class="goodInfoPrice">￥{{good.price}}</div>
            <div class="chooseCountBox">
              <i class="iconfont icon-jianhao" v-bind:class="[good.count === 1 ? 'buKeJian':'keJian']" @click="toMinus(good)"></i>
              <div class="chooseCountBoxInput"><input type="number" v-model.number="good.count" @blur="change(good)" onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))"></div>
              <i class="iconfont icon-jiahao1 keJian" @click="toAdd(good)"></i>
            </div>
          </div>
          <div class="goodInfoDelete" @click="deleteGood(good)">删除</div>
        </div>
      </div>
    </div>

    <div class="box"></div>
    <!-- 底部 -->
    <div class="tab" v-show="cart">
      <div class="tabLeft">
        <div :class="{ checkBoxR: allChoose, checkBox: !allChoose }" @click="choose"></div>
        <div class="tabLeftText">全选</div>
      </div>
      <div class="tabRight">
        <div class="price">
          <div class="priceTop">
            <span class="priceTopB">总计：</span><span class="priceTopR">￥{{price}}</span>
          </div>
          <div class="priceBottom">总额￥{{price}}  立减￥0.00</div>
        </div>
        <button :class="{ toBuyR: haveGood, toBuy: !haveGood }" @click="toOrder">去结算({{num}}件)</button>
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
      emptyCart: true,
      cart: false,
      text: "登录后可同步购物车中商品",
      loginBtn: true,
      goods: [],
      allChoose: false,
      checked: false,
      haveGood: false
    };
  },
  computed: {
    // 计算总价
    price() {
      var price = 0;
      for (var i = 0; i < this.goods.length; i++) {
        if (this.goods[i].checkStatus !== true) {
          continue;
        } else {
          price += this.goods[i].count * parseFloat(this.goods[i].price);
        }
      }
      let totalPrice = price.toFixed(2);
      return totalPrice;
    },
    // 计算商品件数
    num() {
      var num = 0;
      for (var i = 0; i < this.goods.length; i++) {
        if (this.goods[i].checkStatus !== true) {
          continue;
        } else {
          num += this.goods[i].count;
        }
      }
      if (num !== 0) {
        this.haveGood = true;
      } else {
        this.haveGood = false;
      }
      return num;
    }
  },
  // 监听商品是否全选
  watch: {
    goods: {
      handler: function(val, oldval) {
        for (var i = 0; i < val.length; i++) {
          if (val[i].checkStatus !== true) {
            this.allChoose = false;
            break;
          } else {
            this.allChoose = true;
          }
        }
      },
      deep: true
    }
  },
  created() {
    if (localStorage.login === "login") {
      this.loginBtn = false;
      this.text = "购物车空空如也，去逛逛吧~";

      // 获取购物车商品
      axios
        .get("http://jd.hhp.im/getInfo", {
          params: {
            userName: localStorage.userName
          }
        })
        .then(result => {
          var cart = result.data[0].cart;
          this.goods = cart;
          // console.log(cart);
          if (cart.length !== 0) {
            this.emptyCart = false;
            this.cart = true;
          } else {
            this.emptyCart = true;
            this.cart = false;
          }
        });
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    // 减少商品数量
    toMinus(good) {
      if (good.count != 1) {
        good.count -= 1;
        if (good.checkStatus === false) {
          good.checkStatus = true;
        }
        axios
          .post("http://jd.hhp.im/updateCart", {
            count: good.count,
            checkStatus: good.checkStatus,
            userName: localStorage.userName,
            _id: good._id
          })
          .then(res => {
            // console.log(res);
          });
      }
    },
    // 增加商品数量
    toAdd(good) {
      good.count += 1;
      if (good.checkStatus === false) {
        good.checkStatus = true;
      }
      axios
        .post("http://jd.hhp.im/updateCart", {
          count: good.count,
          checkStatus: good.checkStatus,
          userName: localStorage.userName,
          _id: good._id
        })
        .then(res => {
          // console.log(res);
        });
    },
    // 输入商品数量
    change(good) {
      if (good.count !== 0 && good.count !== "") {
        if (good.checkStatus === false) {
          good.checkStatus = true;
        }
        good.count = parseInt(good.count);
        axios
          .post("http://jd.hhp.im/updateCart", {
            count: good.count,
            checkStatus: good.checkStatus,
            userName: localStorage.userName,
            _id: good._id
          })
          .then(res => {
            // console.log(res);
          });
      } else {
        MessageBox.confirm("确定删除该商品?")
          .then(action => {
            console.log(action);
            axios
              .post("http://jd.hhp.im/deleteGood", {
                userName: localStorage.userName,
                _id: good._id
              })
              .then(res => {
                var cart = res.data[0].cart;
                this.goods = cart;
                if (cart.length !== 0) {
                  this.emptyCart = false;
                  this.cart = true;
                } else {
                  this.emptyCart = true;
                  this.cart = false;
                }
              });
          })
          .catch(err => {
            if (err == "cancel") {
              console.log("cancel");
            }
          });
      }
    },
    // 全选
    choose() {
      this.allChoose = !this.allChoose;
      if (this.allChoose === true) {
        for (var i = 0; i < this.goods.length; i++) {
          this.goods[i].checkStatus = true;
        }
      } else {
        for (var i = 0; i < this.goods.length; i++) {
          this.goods[i].checkStatus = false;
        }
      }
      axios
        .post("http://jd.hhp.im/updateCartAllChoose", {
          checkStatus: this.allChoose,
          userName: localStorage.userName
        })
        .then(res => {
          console.log(res.data);
        });
    },
    // 修改商品是否被选中
    checkHandle(good) {
      // console.log(good);
      good.checkStatus = !good.checkStatus;
      axios
        .post("http://jd.hhp.im/updateCart", {
          count: good.count,
          checkStatus: good.checkStatus,
          userName: localStorage.userName,
          _id: good._id
        })
        .then(res => {
          // console.log(res);
        });
    },
    // 删除商品
    deleteGood(good) {
      MessageBox.confirm("确定删除该商品?")
        .then(action => {
          axios
            .post("http://jd.hhp.im/deleteGood", {
              userName: localStorage.userName,
              _id: good._id
            })
            .then(res => {
              var cart = res.data[0].cart;
              this.goods = cart;
              if (cart.length !== 0) {
                this.emptyCart = false;
                this.cart = true;
              } else {
                this.emptyCart = true;
                this.cart = false;
              }
            });
        })
        .catch(err => {
          if (err == "cancel") {
            console.log("cancel");
          }
        });
    },
    // 去支付
    toOrder() {
      if (this.haveGood === true) {
        this.$router.push({ path: "/order" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./cart.scss";
</style>
