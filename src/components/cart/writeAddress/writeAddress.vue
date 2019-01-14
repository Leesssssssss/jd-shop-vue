<template>
<!-- 填写收货地址页面 -->
  <div>
    <!-- 表单 -->
    <div class="info">
      <div class="infoTitle">收货人</div>
      <input class="infoInput" v-model="name" type="text" placeholder="姓名">
    </div>
    <div class="info">
      <div class="infoTitle">联系方式</div>
      <input class="infoInput" v-model="telNum" type="text" placeholder="手机号码">
    </div>
    <div class="info">
      <div class="infoTitle">所在地区</div>
      <div class="infoInput" @click="toAddress">{{city}}</div>
      <i class="iconfont icon-right" style="color:#7b7b7b;font-size:18px;margin-right:20px;"></i>
    </div>
    <div class="info">
      <div class="infoTitle">详细地址</div>
      <input class="infoInput" v-model="addressDetail" type="text" placeholder="详细地址需填写楼栋楼层或房间号信息">
    </div>
    <div class="moRen">
      <div :class="{ checkBoxR: isChoose, checkBox: !isChoose }" @click="choose"></div>
      <div class="moRenText">设为默认地址</div>
    </div>

    <div class="btn">
      <button class="ok" @click="confirm">确认</button>
    </div>

    <!-- 选择地区 -->
    <div class="divwrap" v-if="addInp">
      <v-distpicker type="mobile" @selected='selected'></v-distpicker>
    </div>
    <div class="mask" v-show="mask"></div>
  </div>  
</template>

<script>
import VDistpicker from "v-distpicker";
import { Toast } from "mint-ui";
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      telNum: "",
      city: "请选择",
      addressDetail: "",
      isChoose: false,
      addInp: false,
      mask: false,
      change: false,
      _id: ''
    };
  },
  components: {
    VDistpicker
  },
  created() {
    // 若是点击修改地址按钮进入该页面则首先获取要修改的地址信息并显示在页面上
    this._id = this.$route.query.id;
    if (this._id !== undefined) {
      this.change = true;
      axios
        .post("http://localhost:7001/getAddress", {
          userName: localStorage.userName,
          _id: this._id
        })
        .then(res => {
          var info = res.data[0].address[0];
          console.log(info);
          this.name = info.name;
          this.telNum = info.telNum;
          this.city = info.city;
          this.addressDetail = info.addressDetail;
          this.isChoose = info.isDefault;
        });
    }
  },
  methods: {
    // 显示选择地区的组件
    toAddress() {
      this.mask = true;
      this.addInp = true;
    },
    // 选择地区组件显示省市的方法
    selected(data) {
      this.mask = false;
      this.addInp = false;
      this.city =
        data.province.value + " " + data.city.value + " " + data.area.value;
    },
    choose() {
      this.isChoose = !this.isChoose;
    },
    confirm() {
      // 若是点击新增收货地址进入该页面则创建新地址
      if (this.change === false) {
        // 判断信息是否填写完整
        if (this.name === "") {
          Toast("请填写姓名");
        } else {
          if (this.telNum === "") {
            Toast("请填写手机号码");
          } else {
            if (this.city === "请选择") {
              Toast("请选择所在地区");
            } else {
              if (this.addressDetail === "") {
                Toast("请填写详细地址");
              } else {
                if (this.telNum.length !== 11) {
                  Toast("请填写正确的手机号码");
                } else {
                  axios
                    .post("http://localhost:7001/addAddress", {
                      userName: localStorage.userName,
                      name: this.name,
                      telNum: this.telNum,
                      city: this.city,
                      addressDetail: this.addressDetail,
                      isDefault: this.isChoose
                    })
                    .then(res => {
                      console.log(res.data);
                      this.$router.push({ path: "/address" });
                    });
                }
              }
            }
          }
        }
        // 点击修改地址按钮进入该页面则修改地址
      } else {
        axios
          .post("http://localhost:7001/updateAddress", {
            userName: localStorage.userName,
            _id: this._id,
            name: this.name,
            telNum: this.telNum,
            city: this.city,
            addressDetail: this.addressDetail,
            isDefault: this.isChoose
          })
          .then(res => {
            console.log(res.data);
            this.$router.push({ path: "/address" });
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./writeAddress.scss";
</style>
