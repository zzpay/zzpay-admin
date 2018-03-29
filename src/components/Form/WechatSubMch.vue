<template>
  <el-form
    ref="form"
    :model="dialogData"
    :label-width="labelWidth">

    <el-form-item label="子商户id" >
      <el-input
        name="sub_mch_id"
        v-validate="'required|max:30'"
        v-model="dialogData.sub_mch_id"></el-input>
      <el-alert
        v-show="errors.has('sub_mch_id')"
        :title="errors.first('sub_mch_id') || ''"
        type="error"
        :closable="false"
        class="g-form-validate"
        show-icon></el-alert>
    </el-form-item>
  </el-form>

</template>

<script>
  export default {
    data() {
      return {
        dialogData: this.value
      }
    },
    watch: {
      'dialogData.sub_mch_id': function(val) {
        this.dialogData.sub_mch_id = val
        this.$emit('input', this.dialogData)
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