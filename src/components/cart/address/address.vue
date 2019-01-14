<template>
  <!-- 收货地址页面 -->
  <div>
    <!-- 顶部 -->
    <div class="header">
      <i class="iconfont icon-back" style="color:#909295;font-size:25px;margin:0 10px;" @click="back"></i>
      <span class="headerText">收货地址</span>
      <i class="iconfont icon-more" style="color:#909295;font-size:25px;margin:0 10px;"></i>
    </div>

    <!-- 地址 -->
    <div class="address" v-for="item in address">
      <div class="chooseBox" @click="choose(item)">
        <div v-if="chooseBox" :class="{ checkBoxR: item.isChoose, checkBox: !item.isChoose }"></div>
      </div>
      <div class="addressInfo" @click="choose(item)">
        <div class="addressInfoTitle">{{item.name}}  {{(item.telNum).slice(0,3) + '*****' + (item.telNum).slice(8)}}</div>
        <div>
          <span class="red" v-if="item.isDefault">默认</span>
          <span class="addressInfoText">{{item.city}}{{item.addressDetail}}</span>
        </div>
      </div>
      <i class="iconfont icon-write" style="color:#767676;font-size:23px;margin-right:20px;" @click="updateAddress(item)"></i>
      <i class="iconfont icon-delete" style="color:#767676;font-size:20px;margin-right:20px;" @click="deleteAddress(item)"></i>
    </div>

    <div class="box"></div>
    <!-- 底部按钮 -->
    <button class="addAddressBtn" @click="addAddress">新增收货地址</button>

  </div>
</template>

<script>
import axios from "axios";
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      address: [],
      chooseBox: false
    };
  },
  created() {
    // 如果是从下单界面进入该页要有选择框可选择地址
    if (this.$route.query.order === "order") {
      this.chooseBox = true;
    } else {
      this.chooseBox = false;
    }
    axios
      .get("http://localhost:7001/getInfo", {
        params: {
          userName: localStorage.userName
        }
      })
      .then(res => {
        this.address = res.data[0].address;
      });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    addAddress() {
      this.$router.push({ path: "/writeAddress" });
    },
    // 下单时被选择的地址更改状态
    choose(item) {
      for (var i = 0; i < this.address.length; i++) {
        this.address[i].isChoose = false;
      }
      
      item.isChoose = true;
      axios
        .get("http://localhost:7001/updateOrderAddress", {
          params: {
            userName: localStorage.userName,
            _id: item._id
          }
        })
        .then(result => {
          this.$router.push({ 'path': '/order' });
        });
    },
    // 修改地址
    updateAddress(item) {
      var id = item._id;
      this.$router.push({ path: "/writeAddress", query: { id: id } });
    },
    // 删除地址
    deleteAddress(item) {
      MessageBox.confirm("确定删除该地址?")
        .then(action => {
          axios
            .post("http://localhost:7001/deleteAddress", {
              userName: localStorage.userName,
              _id: item._id
            })
            .then(res => {
              console.log(res.data);
              if (res.data === "no") {
                Toast("默认地址不可删除！");
              } else {
                this.address = res.data[0].address;
              }
            });
        })
        .catch(err => {
          if (err == "cancel") {
            console.log("cancel");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./address.scss";
</style>
