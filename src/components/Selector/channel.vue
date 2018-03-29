<template>
  <el-select :name="name" filterable clearable v-model="chanData" placeholder="请选择支付渠道">
    <el-option v-for="chan in channelList"  :key="chan.id" :label="chan.name" :value="chan.sign"></el-option>
  </el-select>
</template>

<script>
  import { getChannelList } from '@/api/table'
  export default {
    data() {
      return {
        channelList: [],
        chanData: this.value
      }
    },
    watch: {
      value(val) {
        this.chanData = val // 监听变更并同步
      },
      chanData(val) {
        this.$emit('input', val) // 组件内对myResult变更后向外部发送事件通知
      }
    },
    props: ['value', 'name'],
    created() {
      this.getBiz()
    },
    methods: {
      updateValue(value) {
        this.$emit('input', value)
      },
      getBiz() {
        getChannelList(this.listQuery).then(response => {
          this.channelList = response.data.data
        })
      }
    }
  }
</script>