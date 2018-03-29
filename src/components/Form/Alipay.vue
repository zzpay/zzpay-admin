<template>
  <el-form
    ref="form" :model="dialogData" :label-width="labelWidth">

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

    <el-form-item label="签名协议">
    <el-input v-model="dialogData.sign_type"></el-input>
    应该是RSA、RSA2、MD5中的一种，不填按RSA处理
    </el-form-item>

    <el-form-item label="数据加密key">
    <el-input v-model="dialogData.encrypt_key"></el-input>
    </el-form-item>

    <el-form-item label="应用签名私钥">
      <g-cert-uploader
        name="private_key"
        example="rsa_private_key.pem"
        v-model="dialogData.private_key"
      ></g-cert-uploader>
    </el-form-item>
    <el-form-item label="支付宝公钥">
      <g-cert-uploader
        name="alipay_public_key"
        example="alipay_public_key.pem"
        v-model="dialogData.alipay_public_key"
      ></g-cert-uploader>
    </el-form-item>

    <!--<el-form-item label="是否使用沙箱">-->
    <!--<el-radio v-model="dialogData.use_sandbox" label="0">否</el-radio>-->
    <!--<el-radio v-model="dialogData.use_sandbox" label="1">是</el-radio>-->
    <!--</el-form-item>-->

  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        dialogData: {
          app_id: this.value.app_id,
          sign_type: this.value.sign_type,
          encrypt_key: this.value.encrypt_key,
          private_key: this.value.private_key,
          alipay_public_key: this.value.alipay_public_key
        }
      }
    },
    watch: {
      'value': function(val) {
        this.dialogData = val
      },
      'dialogData.app_id': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.private_key': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.sign_type': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.encrypt_key': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.alipay_public_key': function(val) {
        this.$emit('input', this.dialogData)
      }
    },
    props: ['value', 'labelWidth'],
    created() {
    },
    methods: {
      updateValue(value) {
        this.$emit('input', value)
      }
    }
  }
</script>