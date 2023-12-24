<template>
  <div class="app-container">
    <el-row type="flex">
      <el-input placeholder="搜索用户" v-model="search" @change="
        page = 1;
      getUser();
      " @input="search == null || search == '' ? getUser() : ''"></el-input>
      <el-button style="margin-left: 10px">搜索</el-button>
    </el-row>
    <el-table :data="userList">
      <el-table-column label="ID" prop="uid"></el-table-column>
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="昵称" prop="screenName"></el-table-column>

      <el-table-column label="等级" prop="lv"></el-table-column>
      <el-table-column label="用户组" prop="groupKey"></el-table-column>
      <el-table-column label="VIP" prop="isvip"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="
            showEditUser = true;
          user = scope.row;
          ">编辑</el-button>
          <el-button size="mini" type="danger" @click="messageNotice(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible="showEditUser" title="修改用户" @close="showEditUser = false" width="80%">
      <el-form ref="user" v-model="user" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="user.screenName"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="user.groupKey">
            <el-option value="administrator" label="管理员"></el-option>
            <el-option value="contributor" label="用户"></el-option>
            <el-option value="editor" label="编辑"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="user.sex">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员">
          <el-date-picker v-model="user.vip * 1000" align="right" type="date" placeholder="选择日期" value-format="timestamp"
            :default-value="new Date()" @change="con">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="user.uid ? updateUser() : ''">保存</el-button>
          <el-button type="primary" @click="showCharge = true">充值</el-button>
        </el-form-item>
      </el-form>
      <el-dialog :visible="showCharge" title="充值" @close="showCharge = false" append-to-body>
        <label>充值数量</label>
        <el-input v-model="num" placeholder="请输入充值数量 只能是整数" style="margin-top: 10px"></el-input>
        <el-button @click="charge()" style="margin-top: 10px;" type="primary">确定</el-button>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import { userList, deleteUser, updateUser, userRecharge } from "@/api/user";
export default {
  data() {
    return {
      search: "",
      limit: 20,
      page: 1,
      order: "created desc",
      userList: [],
      showEditUser: false,
      showCharge: false,
      user: {
        uid: "",
        screenName: "",
        groupKey: "",
        email: "",
        sex: "",
        vip: "",
      },
      num: 0,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getUser();
    },
    getUser() {
      let params = {
        page: this.page,
        limit: this.limit,
        searchKey: this.search,
      };
      userList(params).then((res) => {
        if (res.code) {
          this.userList = res.data;
        }
      });
    },
    deleteUser(id) {
      return new Promise((resolve, reject) => {
        deleteUser({ key: id }).then(() => {
          resolve();
        });
      });
    },
    con(e) {
      console.log(e);
    },
    updateUser() {
      console.log("1");
      let params = this.user;
      params.group = this.user.groupKey;
      params.vip = params.vip / 1000;
      updateUser({ params: params }).then((res) => {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        // 重置user 关闭窗口
        this.showEditUser = false;
        this.resetUser();
      });
    },
    resetUser() {
      this.user = {
        uid: "",
        screenName: "",
        groupKey: "",
        email: "",
        sex: "",
        vip: "",
      };
    },
    async messageNotice(id) {
      this.$confirm(`是否删除该用户？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.deleteUser(id);
        this.getUser();
        this.$message({
          type: "success",
          message: "删除成功",
        });
      });
    },
    charge(id) {
      let type = 0;
      if (this.num < 0) {
        type = 1;
        this.num = this.num * -1
      }
      else type = 0;
      let params = {
        key: this.user.uid,
        num: this.num,
        type,
      };
      userRecharge(params).then((res) => {
        console.log(res);
        this.showCharge = false,
          this.$message({
            type: "success",
            message: "充值成功",
          });
        this.num = 0
      });
    },
  },
};
</script>