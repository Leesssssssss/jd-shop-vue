# 仿写京东商城

一直想写一个稍微复杂一点的项目练手，思来想去还是商城系统比较复杂，但由于之前并未写过复杂的项目，所以势必会有诸多逻辑或是方法上的问题，望大家见谅。本项目仿写京东商城，采用前后端分离的模式，提供基于`egg.js`的后端和基于`element-ui`的后台管理系统（之前没有管理系统，没有存储商品，管理系统还在不断更新），二者在下方都有传送门，项目实现了部分商城功能，但支付并不能真的支付，想买东西还请移步[京东商城](https://www.jd.com/)

_注：本项目纯属自己练手，与京东商城毫无关联_

# 技术栈

vue-cli2.0 + sass + iconfont + egg.js + MongoDB + element-ui

# 项目运行

``` bash
git clone https://github.com/Leesssssssss/jd-shop-vue.git

cd jd-shop-vue

npm install

npm run dev
```

# 京东商城后端传送门

[京东商城egg后端](https://github.com/Leesssssssss/jd-shop-egg)

# 京东商城后台管理系统传送门

[京东商城后台管理系统](https://github.com/Leesssssssss/jd-shop-admin)

# 目前实现的功能
- [x] 商城首页展示
- [x] 用户注册
- [x] 用户登录
- [x] 商品分类
- [x] 购物车
- [x] 发现页
- [x] 个人中心
- [x] 商品详情
- [x] 收货地址
- [x] 修改个人信息
- [x] 支付下单（不是真的支付）
- [x] 全部订单
- [x] 订单详情

# 项目截图

### 用户注册与登录

<img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/4.png" width="300"/>  <img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/3.png" width="300"/>

### 首页和分类

<img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/1.png" width="300"/>  <img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/2.png" width="300"/>

### 个人信息和账号管理

<img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/5.png" width="300"/>  <img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/10.png" width="300"/>

### 商品详情和购物车

<img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/6.png" width="300"/>  <img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/7.png" width="300"/>
<img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/8.png" width="300"/>  <img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/9.png" width="300"/>

### 修改个人信息

<img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/11.png" width="300"/>  <img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/12.png" width="300"/>

### 收货地址

<img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/13.png" width="300"/>  <img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/14.png" width="300"/>

### 确认订单

<img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/16.png" width="300"/>  <img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/17.png" width="300"/>

### 支付

<img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/20.png" width="300"/>  <img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/21.png" width="300"/>

### 订单列表

<img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/22.png" width="300"/>  <img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/23.png" width="300"/>

### 订单详情

<img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/24.png" width="300"/>  <img src="https://github.com/Leesssssssss/jd-shop-vue/blob/master/Screenshots/25.png" width="300"/>

# 项目布局

```
.
├── Screenshots                                 // 项目截图
├── build                                       // webpack配置文件
├── config                                      // 项目初始化的配置
├── src                                         // 源码目录
│   ├── assets                                  // 静态文件目录
│   │   └── iconfont                            // iconfont图标
│   ├── components                              // 组件
│   │   ├── cart                                
│   │   │   ├── address                    
│   │   │   |   ├── address.scss                // 收货地址样式
│   │   │   |   └── address.vue                 // 收货地址页
│   │   │   ├── order                           
│   │   │   |   ├── login.scss                  // 确认订单样式
│   │   │   |   └── login.vue                   // 确认订单页
│   │   │   ├── pay                     
│   │   │   |   ├── orderDetail.scss            // 支付样式
│   │   │   |   └── orderDetail.vue             // 支付页
│   │   │   ├── success                       
│   │   │   |   ├── orderList.scss              // 支付成功样式
│   │   │   |   └── orderList.vue               // 支付成功页
│   │   │   ├── writeAddress                          
│   │   │   |   ├── signUp.scss                 // 新增收货地址样式
│   │   │   |   └── signUp.vue                  // 新增收货地址页
│   │   │   ├── cart.scss                       // 购物车样式
│   │   │   └── cart.vue                        // 购物车页
│   │   ├── classify                                
│   │   |   ├── goodDetail                          
│   │   |   |   ├── goodDetail.scss             // 商品详情样式
│   │   |   |   └── goodDetail.vue              // 商品详情页
│   │   |   ├── classify.scss                   // 分类样式
│   │   |   └── classify.vue                    // 分类页
│   │   ├── discover                             
│   │   │   ├── discover.scss                   // 发现页样式
│   │   │   └── discover.vue                    // 发现页
│   │   ├── index                                       
│   │   │   ├── index.scss                      // 首页样式
│   │   │   └── index.vue                       // 首页
│   │   └── my                                  
│   │       ├── accountManagement               
│   │       |   ├── accountManagement.scss      // 账号管理样式
│   │       |   └── accountManagement.vue       // 账号管理页
│   │       ├── changePassword                  
│   │       |   ├── changePassword.scss         // 修改密码样式
│   │       |   └── changePassword.vue          // 修改密码页
│   │       ├── changeTelNum                    
│   │       |   ├── changeTelNum.scss           // 修改用户联系方式样式
│   │       |   └── changeTelNum.vue            // 修改用户联系方式页
│   │       ├── login                           
│   │       |   ├── login.scss                  // 登录样式
│   │       |   └── login.vue                   // 登录页
│   │       ├── orderDetail                     
│   │       |   ├── orderDetail.scss            // 订单详情样式
│   │       |   └── orderDetail.vue             // 订单详情页
│   │       ├── orderList                       
│   │       |   ├── orderList.scss              // 订单列表样式
│   │       |   └── orderList.vue               // 订单列表页
│   │       ├── signUp                          
│   │       |   ├── signUp.scss                 // 注册样式
│   │       |   └── signUp.vue                  // 注册页
│   │       ├── my.scss                         // 个人中心样式
│   │       └── my.vue                          // 个人中心页
│   ├── router                                  // 路由文件          
│   │   └── index.js                            // 路由配置
│   ├── App.vue                                 // 页面入口文件
│   └── main.js                                 // 程序入口文件，加载各种公共组件
├── static                                      // 静态资源目录
│   └── css                                     // 样式文件
│       └── reset.css                           // 初始化样式
├── .babelrc                                    // Babel的配置文件
├── .editorconfig                               // 代码规范配置文件
├── .eslintignore                               // 配置忽略校验的文件或目录
├── .eslintrc.js                                // eslint配置文件
├── .gitignore                                  // git忽略配置文件
├── .postcssrc.js                               // postcss插件配置文件
├── README.md                                   // 项目说明书
├── index.html                                  // 页面入口文件
├── package-lock.json                           // 项目包管控文件
└── package.json                                // 项目配置
.

```

# 说明

>  如果对您有帮助，可以点右上角 "Star" 支持一下 谢谢！

>  或者可以 "follow" 一下，我会不断开源更多的有趣的项目
