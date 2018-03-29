<template>
  <el-select :name="name"  remote :remote-method="getBiz" filterable clearable v-model="chanData" placeholder="请选择支付配置">
    <el-option v-for="chan in channelList"  :key="chan.id" :label="chan.name" :value="chan.id"></el-option>
  </el-select>
</template>

<script>
  import { getChannelConfigList } from '@/api/table'
  export default {
    data() {
      return {
        listQuery: {},
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
      getBiz(queryName) {
        if (queryName !== '') {
          this.listQuery.name = queryName
        }
        getChannelConfigList(this.listQuery).then(response => {
          this.channelList = response.data.data
        })
      }
    }
  }
</script>