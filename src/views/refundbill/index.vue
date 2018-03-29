<template>
  <div class="app-container">
    <el-form
      size="mini" :inline="true" :model="formInlineSearch" class="demo-form-inline">
      <el-form-item label="退款订单号">
        <el-input v-model="formInlineSearch.refund_order_num" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="支付订单号">
        <el-input v-model="formInlineSearch.order_num" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="退款状态">
        <el-select name="refund_status" filterable clearable v-model="formInlineSearch.refund_status" placeholder="订单状态">
          <el-option label="退款失败" value="10"></el-option>
          <el-option label="退款成功" value="20"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付配置">
        <g-selector-channelconfig v-model="formInlineSearch.channel_id"></g-selector-channelconfig>
      </el-form-item>
      <el-form-item label="支付渠道">
        <g-selector-channel v-model="formInlineSearch.channel_sign"></g-selector-channel>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>
      <g-exporter table="data-table"
                  button-value="导出"
                  excel-name="退款订单"
      ></g-exporter>
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
      size="mini"
      :data="list"
      v-loading.body="listLoading"
      element-loading-text="Loading"
      header-row-class-name="mytable"
      fit highlight-current-row>
      <el-table-column align="center" label='' width="10">
        <template slot-scope="scope">
        </template>
      </el-table-column>
      <el-table-column label="退款订单号" width="200">
        <template slot-scope="scope">
          {{scope.row.refund_order_num}}
        </template>
      </el-table-column>
      <el-table-column label="付款订单号" width="200">
        <template slot-scope="scope">
          {{scope.row.order_num}}
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          {{scope.row.refund_status == 20 ? '退款成功' : '退款失败' }}
        </template>
      </el-table-column>
      <el-table-column label="支付配置"  width="100">
        <template slot-scope="scope">
          {{scope.row.channel_config_name}}
        </template>
      </el-table-column>
      <el-table-column label="交易金额">
        <template slot-scope="scope">
          ￥ {{scope.row.amount / 100}}
        </template>
      </el-table-column>
      <el-table-column label="第三方支付平台订单号"  width="240">
        <template slot-scope="scope">
          {{scope.row.t3d_order_num}}
        </template>
      </el-table-column>
      <el-table-column label="支付渠道"  width="100">
        <template slot-scope="scope">
          {{scope.row.channel_name}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="付款时间" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.bill.created_at}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updated_at" label="退款时间" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.updated_at}}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getRefundBillList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      formInlineSearch: {
        order_num: '',
        channel_id: '',
        channel_config_id: '',
        channel_sign: ''
      },
      total: 20,
      listQuery: {
        page: 1,
        size: 30
      },
      dialogVisible: false,
      dialogData: null,
      showType: null,
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
    onSubmit() {

    },
    fetchData() {
      this.listLoading = true
      getRefundBillList(this.formInlineSearch).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listQuery.size = response.data.per_page
        this.listQuery.page = response.data.current_page
        this.listLoading = false
      })
    }
  }
}
</script>
