<template>
  <div class="app-container">
    <el-button @click="showNew = true">新增</el-button>
    <el-button>导出</el-button>
    <el-table :data="codeList">
      <el-table-column prop="code" label="邀请码"></el-table-column>
      <el-table-column prop="uid" label="创建人id"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="created" label="创建时间"></el-table-column>
    </el-table>
    <el-dialog :visible="showNew" title="新增邀请码">
      <label>数量</label>
      <el-input
        v-model="num"
        placeholder="输入数量（整数）"
        style="margin-top: 10px; margin-bottom: 10px"
      ></el-input>
      <el-button type="primary" @click="addNewCode()">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { inviteCode, newCode } from "@/api/user";
export default {
  data() {
    return {
      page: 1,
      limit: 50,
      codeList: [],
      showNew: false,
      num: 0,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getCode();
    },
    getCode() {
      let params = {
        page: this.page,
        limit: this.limit,
        searchParams: JSON.stringify({}),
      };
      inviteCode({ params }).then((res) => {
        this.codeList = res.data;
        console.log(res);
      });
    },
    addNewCode() {
      if (this.num) {
        newCode({ num: this.num }).then((res) => {
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.num = 0;
          this.getCode();
          this.showNew = false;
        });
      }
    },
  },
};
</script>