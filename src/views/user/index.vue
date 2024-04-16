<template>
  <div class="app-container">
    <el-form ref="form" inline size="small">
      <el-form-item label="搜索用户">
        <el-input placeholder="搜索用户" v-model="search" @change="
          page = 1;
        getUser();
        " @input="search == null || search == '' ? getUser() : ''"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList.data" max-height="720" size="mini" border style="width: 100%;border-radius: 5px"
      :header-cell-style="{ background: '#409EFF', color: '#ffffff' }">
      <el-table-column label="ID" prop="uid"></el-table-column>
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="昵称" prop="screenName"></el-table-column>
      <el-table-column label="等级" prop="level"></el-table-column>
      <el-table-column label="封禁" prop="isBan">
        <template slot-scope="ban">
          {{ ban.row.isBan ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column label="积分" prop="assets"></el-table-column>
      <el-table-column label="用户组" prop="group"></el-table-column>
      <el-table-column label="VIP" prop="vip">
      </el-table-column>
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
    <div style="margin-top: 5px">
      <el-pagination :page-size="limit" background layout="prev, pager, next" :total="userList.total"
        @next-click="page += 1; getUser();" @prev-click="page > 1 ? ((page -= 1), getUser()) : ''"
        @current-change="page = $event; getUser();">
      </el-pagination>
    </div>
    <el-dialog :visible="showEditUser" title="修改用户" @close="showEditUser = false">
      <el-form ref="user" v-model="user" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="user.screenName"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="user.group">
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
          <el-date-picker v-model="user.vip" type="date" placeholder="选择日期" value-format="timestamp" @change="cone">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="user.uid ? updateUser() : ''">保存</el-button>
          <el-button type="primary" size="small" @click="showCharge = true">充值</el-button>
          <el-button type="danger" size="small" @click="deleteArticle(user.uid)">清空文章</el-button>
          <el-button type="danger" size="small" @click="deleteComment(user.uid)">清空评论</el-button>
        </el-form-item>
        <el-form-item label="封禁">
          <el-input type="number" v-model="ban.days" placeholder="封禁天数"></el-input>
        </el-form-item>
        <el-form-item label="封禁理由">
          <el-select v-model="ban.text" placeholder="选择理由">
            <el-option label="灌水" value="灌水"></el-option>
            <el-option label="广告" value="广告"></el-option>
            <el-option label="辱骂" value="辱骂"></el-option>
            <el-option label="骚扰" value="骚扰"></el-option>
            <el-option label="诈骗" value="诈骗"></el-option>
            <el-option label="机器人" value="机器人"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="small" @click="banUser()">封禁</el-button>
          <el-button type="success" size="small" @click="unbanUser()">解封</el-button>
        </el-form-item>
      </el-form>
      <el-dialog :visible="showCharge" title="充值" @close="showCharge = false" append-to-body>
        <label>充值数量 负数扣款 正数充值</label>
        <el-input v-model="num" placeholder="请输入充值数量 只能是整数 输入负数是扣除" style="margin-top: 10px"></el-input>
        <el-button @click="charge()" style="margin-top: 10px;" type="primary">确定</el-button>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import { userList, deleteUser, updateUser, userRecharge, deleteArticle, deleteComment, ban, unban } from "@/api/user";
export default {
  data() {
    return {
      search: "",
      limit: 10,
      page: 1,
      order: "uid desc",
      userList: [],
      showEditUser: false,
      showCharge: false,
      user: {
        uid: "",
        screenName: "",
        group: "",
        email: "",
        sex: "",
        vip: new Date(),
      },
      ban: {
        days: '',
        text: '',
      },
      num: 0,
      time: new Date()
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
        order: 'uid desc',
        random: 0,
      };
      userList(params).then((res) => {
        if (res.code == 200) {
          console.log(res)
          this.userList = res.data;
        }
      });
    },
    deleteUser(id) {
      return new Promise((resolve, reject) => {
        deleteUser({ id }).then(() => {
          resolve();
        });
      });
    },
    con(e) {
      console.log(e);
    },
    updateUser() {
      let params = {
        id: this.user.uid,
        nickname: this.user.screenName,
        sex: this.user.sex,
        introduce: this.user.introduce,
        mail: this.user.mail,
        group: this.user.group,
        vip: parseInt(this.user.vip.toString().substring(0, 10), 10),
        opt: JSON.stringify(this.user.opt)
      }
      updateUser(params).then((res) => {
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
        group: "",
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
      let type = 1;
      if (this.num < 0) {
        type = 0;
        this.num = this.num * -1
      }
      let params = {
        id: this.user.uid,
        num: this.num,
        type,
      };
      userRecharge(params).then((res) => {
        this.showCharge = false,
          this.$message({
            type: "success",
            message: "充值成功",
          });
        this.num = 0
      });

    },
    cone(e) {
      console.log(e)
    },
    deleteArticle(id) {
      deleteArticle(id).then(res => {
        this.$message({
          type: "success",
          message: "删除成功",
        });
      })
    },
    deleteComment(id) {
      deleteComment(id).then(res => {
        this.$message({
          type: "success",
          message: "删除成功",
        });
      })
    },
    banUser() {
      let params = {
        id: this.user.uid,
        ...this.ban
      }
      ban(params).then(res => {
        this.$message({
          type: "success",
          message: res.msg,
        });
        this.showEditUser = false
        this.resetUser()
      })

    },
    unbanUser() {
      unban(this.user.uid).then(res => {
        this.$message({
          type: "success",
          message: res.msg,
        });
      })
    }
  },

};
</script>