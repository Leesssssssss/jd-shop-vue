import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/index/index'

import Classify from '@/components/classify/classify'
import GoodDetail from '@/components/classify/goodDetail/goodDetail'

import Discover from '@/components/discover/discover'

import Cart from '@/components/cart/cart'
import WriteAddress from '@/components/cart/writeAddress/writeAddress'
import Address from '@/components/cart/address/address'
import Order from '@/components/cart/order/order'
import Pay from '@/components/cart/pay/pay'
import Success from '@/components/cart/success/success'

import My from '@/components/my/my'
import Login from '@/components/my/login/login'
import SignUp from '@/components/my/signUp/signUp'
import AccountManagement from '@/components/my/accountManagement/accountManagement'
import ChangePassword from '@/components/my/changePassword/changePassword'
import ChangeTelNum from '@/components/my/changeTelNum/changeTelNum'
import OrderDetail from '@/components/my/orderDetail/orderDetail'
import OrderList from '@/components/my/orderList/orderList'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify
    },
    {
      path: '/discover',
      name: 'Discover',
      component: Discover
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/goodDetail',
      name: 'GoodDetail',
      component: GoodDetail
    },
    {
      path: '/writeAddress',
      name: 'WriteAddress',
      component: WriteAddress
    },
    {
      path: '/accountManagement',
      name: 'AccountManagement',
      component: AccountManagement
    },
    {
      path: '/changePassword',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/changeTelNum',
      name: 'ChangeTelNum',
      component: ChangeTelNum
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/success',
      name: 'Success',
      component: Success
    },
    {
      path: '/orderDetail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/orderList',
      name: 'OrderList',
      component: OrderList
    }
  ]
})
