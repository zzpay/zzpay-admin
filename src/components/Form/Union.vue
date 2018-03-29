<template>
  <el-form
    ref="form" :model="dialogData" label-width="180px">

    <el-form-item label="合作者id">
      <el-input v-model="dialogData.unionpay_merid"></el-input>
    </el-form-item>
    <el-form-item label="安全码">
      <el-input v-model="dialogData.unionpay_security_code"></el-input>
    </el-form-item>
  </el-form>

</template>

<script>
  export default {
    data() {
      return {
        dialogData: {
          unionpay_merid: this.value.unionpay_merid,
          //          sign_type: this.model.sign_type,
          unionpay_security_code: this.value.unionpay_security_code
        }
      }
    },
    watch: {
      'value': function(val) {
        this.dialogData = val
      },
      'dialogData.unionpay_merid': function(val) {
        this.$emit('input', this.dialogData)
      },
      'dialogData.unionpay_security_code': function(val) {
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