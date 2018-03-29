import Vue from 'vue'
import Exporter from '@/components/Exporter'
import Channels from '@/components/Selector/channel'
import SelectorChannelConfigs from '@/components/Selector/channelconfig'

import FormAlipay from '@/components/Form/Alipay'
import FormAlipayOld from '@/components/Form/AlipayOld'
import FormUnion from '@/components/Form/Union'
import FormWechatPayOnline from '@/components/Form/WechatPayOnline'
import FormWechatSubMch from '@/components/Form/WechatSubMch'

import CertUpload from '@/components/Form/CertUpload'

// register globally
Vue.component('g-exporter', Exporter)
Vue.component('g-selector-channel', Channels)
Vue.component('g-selector-channelconfig', SelectorChannelConfigs)

Vue.component('g-form-alipay', FormAlipay)
Vue.component('g-form-alipay-old', FormAlipayOld)
Vue.component('g-form-union', FormUnion)
Vue.component('g-form-wechatpay-online', FormWechatPayOnline)
Vue.component('g-form-wechatpay-submch', FormWechatSubMch)

Vue.component('g-cert-uploader', CertUpload)
