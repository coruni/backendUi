<template>
  <div class="app-container">
    <el-form inline size="small">
      <el-button type="success" size="small" icon="el-icon-plus" style="margin-right:3em;" @click="dialogVisible = true">添加标签
      </el-button>
    </el-form>
    <el-table :data="category" size="mini" border style="width: 100%;border-radius: 5px;margin-top: 20px;"
      :header-cell-style="{ background: '#409EFF', color: '#ffffff' }">
      <el-table-column prop="mid" label="ID" width="60"></el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <el-image :src="scope.row.imgurl" style="width: 40px;height: 40px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="分类名"></el-table-column>
      <el-table-column prop="description" label="介绍"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editTap(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="messageNotice(scope.row.mid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加" :visible.sync="dialogVisible" width="50%">
      <el-form v-model="form" class="app-container" ref="form">
        <el-form-item label="头像">
          <el-upload :action="'/upload/full'" :beforeAvatarUpload="beforeAvatarUpload" :on-success="handleAvatarSuccess"
            :headers="{ Authorization: getToken() }" :show-file-list="false">
            <el-image :src="form.imgurl" v-if="form.imgurl" style="width: 80px;height: 80px;"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <label>颜色设置</label>
        <el-form-item label="主题色">
          <el-input v-model="form.opt.primary"></el-input>
        </el-form-item>
        <el-form-item label="下划线">
          <el-input v-model="form.opt.underline"></el-input>
        </el-form-item>
        <el-form-item label="文字颜色">
          <el-input v-model="form.opt.color"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newCategory()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="updateTagDialog" width="50%">
      <el-form v-model="form" class="app-container" ref="form">
        <el-form-item label="头像">
          <el-upload :action="'/upload/full'" :beforeAvatarUpload="beforeAvatarUpload" :on-success="handleAvatarSuccess"
            :headers="{ Authorization: getToken() }" :show-file-list="false">
            <el-image :src="form.imgurl" v-if="form.imgurl" style="width: 80px;height: 80px;"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <label>颜色设置</label>
        <el-form-item label="主题色">
          <el-input v-model="form.opt.primary"></el-input>
        </el-form-item>
        <el-form-item label="下划线">
          <el-input v-model="form.opt.underline"></el-input>
        </el-form-item>
        <el-form-item label="文字颜色">
          <el-input v-model="form.opt.color"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  categoryList,
  update,
  deleteCategory,
  newCategory,
  action
} from "@/api/category";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      form: {
        mid: 0,
        name: "",
        description: "",
        imgurl: "",
        iswaterfall: 0,
        isrecommend: 0,
        opt: {
          background: "",
          color: "",
          primary: "",
          underline: "",
        },
      },
      category: [],
      page: 1,
      limit: 20,
      url: null,
      dialogVisible: false,
      updateTagDialog: false,
    };
  },
  created() {
    this.initData();
    this.url = process.env.VUE_APP_BASE_API;
  },
  methods: {
    getToken,
    initData() {
      this.getCategory();
    },
    getCategory() {
      let params = {
        page: this.page,
        limit: this.limit,
        params: JSON.stringify({
          type: "tag",
        }),
      };
      categoryList(params).then((res) => {
        this.category = res.data.data;
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.imgurl = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    update() {
      // 处理opt
      let params = {
        id: this.form.mid,
        name: this.form.name,
        description: this.form.description,
        avatar: this.form.imgurl,
        opt: JSON.stringify(this.form.opt)
      }
      update(params).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.updateTagDialog = false
        this.resetForm()
      });
    },
    resetForm() {
      this.form = {
        name: "",
        description: "",
        imgurl: "",
        opt: {
          background: "",
          color: "",
          primary: "",
          underline: "",
        },
      };
    },
    deleteCategory(id) {
      return new Promise((resolve, reject) => {
        deleteCategory({ id }).then((res) => {
          resolve();
        });
      });
    },
    async messageNotice(id) {
      this.$confirm(`是否删除该标签？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.deleteCategory(id);
        this.getCategory();
        this.$message({
          type: "success",
          message: "删除成功",
        });
      });
    },
    editTap(data) {
      var data = data
      if (!data.hasOwnProperty("opt")) {
        data.opt = {
          background: "",
          color: "",
          primary: "",
          underline: "",
        }
      }
      this.form = data
      this.updateTagDialog = true
    },
    newCategory() {
      if (this.form.name) {
        let params = {
          name: this.form.name,
          type: 'tag',
          description: this.form.description,
          opt: JSON.stringify(this.form.opt),
          avatar: this.form.imgurl
        }
        newCategory(params).then((res) => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "添加成功",
            });
            this.getCategory();
            this.resetForm();
          }
        });
      }
      this.dialogVisible = false
    },
    categoryAction(type, id) {
      let params = {
        type,
        id
      }
      action(params).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "设置成功",
          });
          this.getCategory();
        }
      })
    }
  },
};
</script>