<template>
  <div class="app-container">
    <el-table
      :data="list"
      v-loading.body="listLoading"
      element-loading-text="Loading"
      header-row-class-name="mytable"
      fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="渠道名">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="开发编码">
        <template slot-scope="scope">
          <svg-icon :icon-class="'pay'+(scope.row.sign).split('_')[0].toLowerCase()"/>
          <b>{{scope.row.sign}}</b>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          {{scope.row.desc}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.created_at}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getChannelList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getChannelList(this.listQuery).then(response => {
        this.list = response.data.data
        this.listLoading = false
      })
    }
  }
}
</script>
