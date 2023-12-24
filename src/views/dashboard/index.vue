<template>
  <div class="dashboard-container">
    <el-button @click="updateBases">更新数据库</el-button>
    <div class="dashboard-text">name: {{ name }}</div>
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
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
