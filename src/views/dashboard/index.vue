<template>
  <div class="dashboard-container">
    <a href="https://pro.aixiaoyao.cn/aff/YZHYAZNN" target="_blank">
      <img src="http://static.aixiaoyao.cn/banner.png" style="width: 100%;height: 256px;object-fit:cover ;" />
    </a>
    <el-card class="box-card">
      <div slot="header">
        <span>项目信息</span>
      </div>
      <div style="display: flex;flex-direction: column;">
        <span>感谢您选择FANbbs，如果你是购买的。请不要找作者寻求帮助，找卖你源码的那个人</span>
        <span>如果你觉得项目不错就请作者喝杯咖啡吧！</span>
      </div>
      <div style="display: flex;">
        <img src="../../static/alipay.jpg" style="height: 200px;width: 200px;object-fit: scale-down;">
        <img src="../../static/wxpay.png" style="height: 200px;width: 200px;object-fit: scale-down;">
      </div>
      <div style="display: flex;flex-direction: column;">
        <span>
          反馈QQ群：869350741
        </span>
        <span>
          <a href="https://github.com/coruni/fanbbsapi" style="color: #fb7299;" target="_blank">后端更新地址</a>
          <a href="https://github.com/coruni/fanbbs" style="color: #fb7299;margin-left: 30px;" target="_blank">前端更新地址</a>
        </span>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <div slot="header">
        <span>更新数据</span>
      </div>
      <el-button type="primary" @click="updateBases">更新数据库</el-button>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { newInstall } from '@/api/system'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    async updateBases() {
      newInstall().then(res => {
        this.$message({
          message: '更新完成',
          type: 'success'

        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  line-height: 1.5;
}
span{
  line-height: 2;
}

.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.box-card {
  width: 100%;
}
</style>
