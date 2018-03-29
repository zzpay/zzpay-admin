<template>
  <el-row>
    <el-upload
      class="upload-demo"
      :limit="1"
      accept="text/plain,.pem,.cert,.cer,.crt"
      :multiple="false"
      with-cerdentials
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :file-list="fileList"
      action="/admin/api/certs">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传pem文件 {{exampleStr}}</div>
    </el-upload>
    <input type="hidden" :name="name" v-model="inputValue" />
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        exampleStr: this.example ? '例如：' + this.example : '',
        inputValue: this.value,
        fileList: this.value ? [{ name: this.name + '.pem', url: '' }] : []
      }
    },
    watch: {
      value(val) {
        this.inputValue = val
        this.fileList = val ? [{ name: this.name + '.pem', url: '' }] : []
      },
      inputValue(val) {
        this.$emit('input', val) // 组件内对myResult变更后向外部发送事件通知
      }
    },
    props: ['value', 'example', 'name'],
    created() {
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
        this.inputValue = ''
      },
      handleExceed(files, fileList) {
        this.$message.warning(`限制选择1个文件`)
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      updateValue(value) {
        this.$emit('input', value)
      },
      handleSuccess(response, file, fileList) {
        console.log(file, fileList)
        this.inputValue = response.data.hash
        this.$emit('input', this.inputValue)
      }
    }
  }
</script>