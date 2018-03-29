<template>
  <div class="app-container">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ form.id ? '编辑支付配置' :'添加支付配置' }}</span>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :offset="4" :span="12">

            <el-form ref="form" :model="form" :label-width="labelWidth">
              <el-form-item label="支付配置名称"
                            :class="{'is-error':errors.has('name') }"
              >
                <el-input name="name"
                          :maxlength=30
                          v-validate="'required|max:30'"
                          v-model="form.name"></el-input>

                <el-alert
                  v-show="errors.has('name')"
                  :title="errors.first('name') || ''"
                  type="error"
                  :closable="false"
                  class="g-form-validate"
                  show-icon></el-alert>
              </el-form-item>
              <el-form-item label="收款方类型"
                            :class="{'is-error':errors.has('recip_group_id') }"
              >
                <g-selector-recipgroup
                  name="recip_group_id"
                  v-validate="'required'"
                  v-model="form.recip_group_id"
                  placeholder=""></g-selector-recipgroup>

                <el-alert
                  v-show="errors.has('recip_group_id')"
                  :title="errors.first('recip_group_id') || ''"
                  type="error"
                  :closable="false"
                  class="g-form-validate"
                  show-icon></el-alert>
              </el-form-item>
              <el-form-item label="支付渠道"
                            :class="{'is-error':errors.has('channel_sign') }"
              >
                <g-selector-channel
                  name="channel_sign"
                  v-validate="'required'"
                  v-model="form.channel_sign"
                  placeholder=""></g-selector-channel>
                <el-alert
                  v-show="errors.has('channel_sign')"
                  :title="errors.first('channel_sign') || ''"
                  type="error"
                  :closable="false"
                  class="g-form-validate"
                  show-icon></el-alert>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <div class="hr-divider"></div>

        <el-row :gutter="10">

          <el-col v-if="form.recip_group_id==3" :offset="4" :span="12" >

            <g-form-wechatpay-submch
              v-model="dialogData"
              v-bind:info="form"
              :label-width="labelWidth"
            ></g-form-wechatpay-submch>

          </el-col>

          <el-col v-else :offset="4" :span="12" >

            <g-form-alipay
              title="支付宝"
              v-if="form.channel_sign=='Alipay_AopApp'
            || form.channel_sign=='Alipay_AopWap'"
              v-model="dialogData"
              :info="form"
              :label-width="labelWidth"
            ></g-form-alipay>

            <g-form-alipay-old
              title="老支付宝"
              v-if="form.channel_sign=='Alipay_LegacyApp11'
            || form.channel_sign=='Alipay_LegacyApp'"
              v-model="dialogData"
              :info="form"
              :label-width="labelWidth"
            ></g-form-alipay-old>

            <g-form-union
              title="银联"
              v-if="form.channel_sign=='Union_LegacyMobile'"
              v-model="dialogData"
              :info="form"
              :label-width="labelWidth"
            ></g-form-union>

            <g-form-wechatpay-online
              title="微信"
              v-if="form.channel_sign=='WechatPay_Js'
            ||form.channel_sign=='WechatPay_App'
            ||form.channel_sign=='WechatPay_Mweb'
            ||form.channel_sign=='WechatPay_Native'
            ||form.channel_sign=='WechatPay_Pos'"
              v-model="dialogData"
              v-bind:info="form"
              :label-width="labelWidth"
            ></g-form-wechatpay-online>

          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :offset="4" :span="12" >
            <el-form
              ref="form"
              :label-width="labelWidth">

              <el-form-item>
                <el-button :disabled="saveButtonDisabled" :loading="listLoading" type="primary" @click="saveData()">保存
                </el-button>
                <el-button plain type="primary" v-if="form.id" @click="checkConfig(false,false)">检测</el-button>
                <el-button plain @click="backToList()">取消</el-button>

              </el-form-item>

            </el-form>
            </el-col>
          </el-row>
      </div>
    </el-card>
  </div>

</template>

<script>
  import { getChannelConfigDetail, checkPaymentConfig } from '@/api/table'
  import { createChannelConfig, updateChannelConfig, deleteChannelConfig } from '@/api/new'

  export default {
    data() {
      return {
        labelWidth: '180px',
        saveButtonDisabled: false,
        fileList: [],
        showType: '',
        form: {
          id: this.$route.params.id,
          name: '',
          recip_group_id: 2,
          channel_sign: 'Alipay_AopApp'
        },
        dialogData: {
        },
        list: null,
        merchant: {
        },
        dialogVisible: false,
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
      if (this.form.id) {
        this.getDetail()
      } else {
        this.listLoading = false
      }
    },
    methods: {
      backToList() {
        this.$router.push({ 'name': 'channelconfig' })
      },
      saveData() {
        const params = {
          'name': this.form.name,
          'recip_group_id': this.form.recip_group_id,
          'channel_sign': this.form.channel_sign,
          // @TODO filter过滤空数据
          'channel_config': this.dialogData
        }
        this.$validator.validateAll(this.form).then((result) => {
          if (result) {
            if (this.form.id) {
              updateChannelConfig(this.form.id, params).then(response => {
                console.log(response.data)
                this.checkConfig()
              })
            } else {
              createChannelConfig(params).then(response => {
                this.form.id = response.data.id
                console.log(response.data)
                this.checkConfig(true)
              })
            }
          } else {
            this.$message.warning('部分数据非法，请检查表单')
          }
        })
      },
      checkConfig(isNew = false, backToList = true) {
        checkPaymentConfig(this.form.id).then(response => {
          this.$message.success(response.message)
          if (backToList) {
            this.backToList()
          }
        }, () => {
          if (isNew) {
            deleteChannelConfig(this.form.id)
            this.form.id = null
          }
        })
      },
      onSubmit() {
        this.listQuery = this.formInlineSearch
        this.fetchData()
      },
      getDetail() {
        getChannelConfigDetail(this.form.id).then(response => {
          this.form.name = response.data.name
          this.form.channel_sign = response.data.channel_sign
          this.form.recip_group_id = response.data.recip_group_id
          this.dialogData = response.data.channel_config || {}
          this.listLoading = false
        })
      },
      fetchData() {

      }
    }
  }
</script>
<style>
  .hr-divider {
    height: 1px;
    /*width: 90%;*/
    /*margin: 0 5%;*/
    border: 1px #aaaaaa;
    border-style: dashed hidden hidden hidden;
    margin-bottom: 15px;
  }
</style>