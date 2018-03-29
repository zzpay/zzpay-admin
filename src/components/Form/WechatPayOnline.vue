<template>
  <el-form
    ref="form"
    :model="dialogData"
    :label-width="labelWidth">

    <el-form-item label="APP_ID">
      <el-input
        name="pay_app_id"
        v-validate="'required|max:30'"
        v-model="dialogData.app_id"></el-input>
      <el-alert
        v-show="errors.has('pay_app_id')"
        :title="errors.first('pay_app_id') || ''"
        type="error"
        :closable="false"
        class="g-form-validate"
        show-icon></el-alert>
    </el-form-item>
    <el-form-item v-if="dialogData.trade_type === 'JSAPI'" label="token">
      <el-input v-model="dialogData.token"></el-input>
    </el-form-item>
    <el-form-item v-if="dialogData.trade_type === 'JSAPI'" label="aes_key">
      <el-input v-model="dialogData.aes_key"></el-input>
    </el-form-item>
    <el-form-item label="APP SECRET">
      <el-input v-model="dialogData.secret"></el-input>
      <el-input type="hidden" v-model="dialogData.trade_type"></el-input>
    </el-form-item>
    <el-form-item label="商户 ID">

      <el-input v-model="dialogData.mch_id"></el-input>
    </el-form-item>
    <el-form-item label="API秘钥">
      <el-input v-model="dialogData.api_key"></el-input>
    </el-form-item>
    <el-form-item label="证书文件">
      <g-cert-uploader
        name="cert_path"
        example="apiclient_cert.pem"
        v-model="dialogData.cert_path"
      ></g-cert-uploader>
    </el-form-item>
    <el-form-item label="密钥文件">
      <g-cert-uploader
        name="key_path"
        example="apiclient_key.pem"
        v-model="dialogData.key_path"
      ></g-cert-uploader>
    </el-form-item>
  </el-form>

</template>

<script>
  // JSAPI--公众号支付、NATIVE--原生扫码支付、APP--app支付，统一下单接口trade_type的传参可参考这里
  // MICROPAY--刷卡支付，刷卡支付有单独的支付接口，不调用统一下单接口
  // 小程序取值如下：JSAPI
  // H5支付的交易类型为MWEB
  var tradeTypes = {
    'WechatPay_App': 'APP',
    'WechatPay_Js': 'JSAPI',
    'WechatPay_Mweb': 'MWEB',
    'WechatPay_Native': 'NATIVE',
    'WechatPay_Pos': 'MICROPAY'
  }

  export default {
    data() {
      var dialogData = {
        app_id: this.value.app_id,
        mch_id: this.value.mch_id,
        trade_type: tradeTypes[this.info.channel_sign],
        secret: this.value.secret,
        api_key: this.value.api_key,
        cert_path: this.value.cert_path,
        key_path: this.value.key_path
      }
      if (this.info.channel_sign === 'WechatPay_Js') {
        dialogData.token = this.value.token
        dialogData.aes_key = this.value.aes_key
      }

      return {
        dialogData
      }
    },
    watch: {
      dialogData(val) {
        this.$emit('input', val) // 组件内对myResult变更后向外部发送事件通知
      },
      'dialogData.app_id': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.mch_id': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.trade_type': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.secret': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.api_key': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.cert_path': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.key_path': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.token': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.aes_key': function(val) {
        this.$emit('input', this.dialogData)
      },
      'info.channel_sign': function(val) {
        this.dialogData.trade_type = tradeTypes[val]
      }
    },
    props: ['value', 'info', 'labelWidth'],
    created() {
    },
    methods: {
      updateValue(value) {
        this.$emit('input', value)
      }
    }
  }
</script>