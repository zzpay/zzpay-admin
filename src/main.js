import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/green_pay_theme/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import Zh from 'vee-validate/dist/locale/zh_CN'

import './components/index'

import '@/icons' // icon
// import '@/permission' // permission control

Vue.use(ElementUI, { locale })

const attributesZh = {
  'name': '名称',
  'desc': '描述',
  'sign': '代码',
  'channel_sign': '支付渠道',
  'nick_name': '名称',
  'app_id': '产品线',
  'pay_app_id': 'APP ID',
  'recip_group_id': '收款方类型',
  'biz_group_id': '业务方',
  'merchant_id': '商户',
  'sub_mch_id': '子商户ID',
  'channel_id': '渠道'
}
const config = {
  'errorBagName': 'errors',
  'locale': 'zh_CN',
  'validity': true,
  'classNames':
  {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is not valid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  dictionary: {
    zh_CN: { messages: Zh.messages, attributes: attributesZh }
  },
  'fieldsBagName': 'vee-fields' // 默认为 fields
}
Vue.use(VeeValidate, config)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
