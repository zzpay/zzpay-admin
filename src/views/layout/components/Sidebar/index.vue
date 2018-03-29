<template>
  <scroll-bar>
    <el-menu mode="vertical" :default-openeds="['mer', 'bill']" :default-active="$route.path || $route.name" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <el-menu-item index=99999 class="is-disabled green_pay_header">
        <b style="font-size: 18px;color:white;">
          <i class="el-icon-news" style="font-size: 18px;color:white;"></i>支付中心
        </b>
      </el-menu-item>
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style>
  .green_pay_header {
    height:50px !important;
    line-height:50px !important;
    background-color: #22bccd !important;
  }
</style>