<template>
  <div class="app-container">
    <el-button @click="showNew = true">新增</el-button>
    <el-button @click="export_code()">导出</el-button>
    <el-table :data="codeList.data">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="code" label="邀请码"></el-table-column>
      <el-table-column prop="uid" label="创建人id"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status == 0 ? "未使用" : "已使用" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="created" label="创建时间" :formatter="dateFormat"></el-table-column>
      <el-table-column label="操作">

        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="messageNotice(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background :page-count="codeList.count" layout="prev, pager, next" :total="codeList.total"
      @prev-click="page += 1; getCode()" @next-click="page -= 1; getCode()" @current-change="change">
    </el-pagination>
    <el-dialog :visible="showNew" title="新增邀请码" @close="showNew = false">
      <label>数量</label>
      <el-input v-model="num" placeholder="输入数量（整数）" style="margin-top: 10px; margin-bottom: 10px"></el-input>
      <el-button type="primary" @click="addNewCode()">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { inviteCode, newCode, exportCode, deleteCode } from "@/api/user";
export default {
  data() {
    return {
      page: 1,
      limit: 50,
      codeList: {},
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
      let { page, limit } = this;
      let params = {
        page,
        searchParams: JSON.stringify({}),
      }
      inviteCode({ params }).then((res) => {
        this.codeList = res.data;
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
    deleteCode(id) {
      return new Promise((resolve, reject) => {
        deleteCode({ id }).then(() => {
          resolve();
        });
      });
    },
    async messageNotice(id) {
      this.$confirm(`是否删除该邀请码`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.deleteCode(id);
        this.getCode();
        this.$message({
          type: "success",
          message: "删除成功",
        });
      });
    },
    export_code() {
      exportCode({ limit: 100000 }).then((res) => {
        console.log(res)
        const arrayBufferView = new Uint8Array(res); // 使用 TypedArray 处理 ArrayBuffer
        const blob = new Blob([arrayBufferView], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '邀请码.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        this.$message({
          type: "success",
          message: "导出成功",
        });
      }).catch((err) => {
        err
      })
    },
    change(e) {
      this.page = e;
      this.getCode()
    },
    //时间格式化
    dateFormat: function (row, column) {
      var t = new Date(row.created * 1000);//row 表示一行数据, updateTime 表示要格式化的字段名称
      return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    },

  },
};
</script>