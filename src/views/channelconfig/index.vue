<template>
  <div class="app-container">

    <el-form :inline="true" :model="listQuery" class="demo-form-inline">
      <el-form-item label="支付配置名称">
        <el-input v-model.trim="listQuery.name"></el-input>
      </el-form-item>
      <el-form-item label="支付渠道">
        <g-selector-channel
          name="channel_sign"
          v-model="listQuery.channel_sign"
        ></g-selector-channel>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <router-link to="channelconfig/new">
          <el-button type="primary">添加支付配置</el-button>
        </router-link>
      </el-form-item>
      <el-form-item>
        <g-exporter table="data-table" button-value="导出" excel-name="支付配置"></g-exporter>
      </el-form-item>
    </el-form>

    <el-pagination
      :background="true"
      layout="prev, pager, next"
      @current-change="fetchData"
      :current-page.sync="listQuery.page"
      :page-size="listQuery.size"
      :total="total">
    </el-pagination>
    <el-table
      id="data-table"
      :data="list"
      v-loading.body="listLoading"
      element-loading-text="Loading"
      header-row-class-name="mytable"
      fit highlight-current-row>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="{name: 'channelconfig-edit', params: {id: scope.row.id}}">
            <el-button size="mini" plain type="primary">编辑</el-button>
          </router-link>
          <el-popover
            placement="right"
            v-model="scope.row.del_visible"
            width="160">
            <span >
              <p>确定删除 {{scope.row.name}} 吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.del_visible = false">取消</el-button>
                <el-button type="danger" size="mini" @click="deleteItem(scope.row)">确定</el-button>
              </div>
            </span>
            <el-button slot="reference" size="mini" type="danger" plain>删除</el-button>
          </el-popover>

        </template>
      </el-table-column>
      <el-table-column align="center" label='' width="10">
        <template slot-scope="scope">
        </template>
      </el-table-column>
      <el-table-column label="支付配置名称">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="支付渠道">
        <template slot-scope="scope">
          {{scope.row.channel.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.created_at}}</span>

          {{scope.row.deleted_at}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getAllMerchantChannelList } from '@/api/table'
  import { deleteChannelConfig } from '@/api/new'

  export default {
    data() {
      return {
        listQuery: {
          page: 1,
          size: 20,
          name: '',
          channel_sign: ''
        },
        total: 20,
        list: null,
        listLoading: true
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      reset() {
        this.listQuery = {
          name: '',
          channel_sign: ''
        }
      },
      onSubmit() {
        this.listQuery.page = 1
        this.fetchData()
      },
      fetchData() {
        this.listLoading = true
        getAllMerchantChannelList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listQuery.size = response.data.per_page
          this.listQuery.page = response.data.current_page
          this.listLoading = false
        })
      },
      deleteItem(item) {
        this.listLoading = true
        deleteChannelConfig(item.id).then(response => {
          item.del_visible = false
          this.fetchData()
        }, err => {
          if (err) {
            console.log(err.stack)
          }
        })
      }
    }
  }
</script>
