<template>
  <div class="app-container">
    <el-form v-model="searchForm" ref="form">
      <el-form-item>
        <el-row type="flex" justify="space-between">
          <el-select
            v-model="searchForm.selectCategory"
            placeholder="请选择"
            no-data-text="暂无数据"
            style="margin-right: 10px"
            @change="
              page = 1;
              getArticle();
            "
          >
            <el-option
              v-for="item in searchForm.category"
              :key="item.mid"
              :label="item.name"
              :value="item.mid"
            ></el-option>
          </el-select>
          <el-input placeholder="搜索文章"></el-input>
          <el-button style="margin-left: 10px" @click="onSubmit"
            >搜索</el-button
          >
        </el-row>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="article" style="width: 100%">
      <el-table-column prop="cid" label="ID"></el-table-column>
      <el-table-column prop="category[0].name" label="分类"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="authorInfo.name" label="作者"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row type="flex">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="messageNotice(scope.row.cid)"
              >删除</el-button
            >
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { categoryList } from "@/api/category";
import { articleList, articleDelete } from "@/api/article";
export default {
  data() {
    return {
      article: [],
      searchForm: {
        category: [
          {
            name: "全部",
            id: null,
          },
        ],
        selectCategory: null,
      },
      search: "",
      page: 1,
      limit: 20,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      console.log("执行了");
      this.getCategory();
      this.getArticle();
    },
    getCategory() {
      categoryList({
        page: 1,
        limit: 100,
        searchParams: JSON.stringify({ type: "category" }),
      }).then((res) => {
        this.searchForm.category = this.searchForm.category.concat(res.data);
      });
    },
    getArticle() {
      let params = {
        page: this.page,
        limit: this.limit,
        searchParams: JSON.stringify({
          mid: this.searchForm.selectCategory,
        }),
        searchKey: this.search,
        order: "created desc",
      };
      articleList(params).then((res) => {
        this.article = res.data;
      });
    },
    deleteArticle(id) {
      return new Promise((resolve, reject) => {
        articleDelete({ key: id })
          .then((res) => {
            if (res.code) {
              resolve();
            }
          })
          .catch(() => {
            reject();
          });
      });
    },
    async messageNotice(id) {
      this.$confirm(`是否删除该文章？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.deleteArticle(id);
        this.getArticle();
        this.$message({
          type: "success",
          message: "删除成功",
        });
      });
    },
    onSubmit() {
      console.log();
    },
  },
};
</script>
<style scoped>
.el-input .el-select {
  width: 100px;
}
</style>