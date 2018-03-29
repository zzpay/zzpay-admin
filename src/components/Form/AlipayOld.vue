<template>
  <el-form ref="form" :model="dialogData" :label-width="labelWidth" >

    <el-form-item label="partner">
      <el-input v-model="dialogData.partner"></el-input>
    </el-form-item>

    <el-form-item label="seller_id">
      <el-input v-model="dialogData.seller_id"></el-input>
    </el-form-item>

    <el-form-item label="安全码">
      <el-input v-model="dialogData.security_code"></el-input>
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
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        dialogData: {
          partner: this.value.partner,
          seller_id: this.value.seller_id,
          security_code: this.value.security_code,
          //          sign_type: this.model.sign_type,
          private_key: this.value.private_key,
          alipay_public_key: this.value.alipay_public_key
        }
      }
    },
    watch: {
      'value': function(val) {
        this.dialogData = val
      },
      'dialogData.partner': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.seller_id': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.security_code': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.private_key': function(val) {
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