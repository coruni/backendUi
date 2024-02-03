<template>
  <div class="app-container">
    <el-form v-model="searchForm" ref="form">
      <el-form-item>
        <el-row type="flex" justify="space-between">
          <el-select v-model="searchForm.selectCategory" placeholder="请选择" no-data-text="暂无数据" style="margin-right: 10px"
            @change="
              page = 1;
            getArticle();
            ">
            <el-option v-for="item in searchForm.category" :key="item.mid" :label="item.name"
              :value="item.mid"></el-option>
          </el-select>
          <el-input placeholder="搜索文章" v-model="search" @input="!search.length ? getArticle() : ''"></el-input>
          <el-button style="margin-left: 10px" @click="getArticle">搜索</el-button>
        </el-row>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="article" style="width: 100%" height="710">
      <el-table-column prop="cid" label="ID" width="100"></el-table-column>
      <el-table-column prop="category.name" label="分类"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="authorInfo.name" label="作者"></el-table-column>
      <el-table-column prop="created" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row type="flex">
            <el-button type="primary" size="mini" @click="showArticleEdit = true;articleData = scope.row">编辑</el-button>
            <el-button type="danger" size="mini" @click="messageNotice(scope.row.cid)">删除</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 5px">
      <el-pagination :page-size="limit" hide-on-single-page background layout="prev, pager, next" :total="articleTotal"
        @next-click="
          page += 1;
        getArticle();
        " @prev-click="page > 1 ? ((page -= 1), getArticle()) : ''" @current-change="
  page = $event;
getArticle();
">
      </el-pagination>
    </div>
    <!-- 弹窗组件 -->
    <el-dialog title="文章设置" :visible.sync="showArticleEdit" @close="showArticleEdit = false" width="80%">
      <el-form :model="articleData" ref="articleForm">
        <el-form-item label="轮播" label-width="80px">
          <el-select v-model="articleData.isswiper" @change="articleAction('swiper',articleData.cid)">
            <el-option label="关闭" :value="0">
            </el-option>
            <el-option label="开启" :value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐" label-width="80px">
          <el-select v-model="articleData.isrecommend" @change="articleAction('recommend',articleData.cid)">
            <el-option label="关闭" :value="0">
            </el-option>
            <el-option label="开启" :value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="置顶" label-width="80px">
          <el-select v-model="articleData.istop" @change="articleAction('top',articleData.cid)">
            <el-option label="关闭" :value="0">
            </el-option>
            <el-option label="开启" :value="1">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { categoryList } from "@/api/category";
import { articleList, articleDelete, articleAction } from "@/api/article";
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
      articleData: {},
      search: "",
      page: 1,
      limit: 20,
      articleTotal: 0,
      // 分隔
      showArticleEdit: false,
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
        params: JSON.stringify({ type: "category" }),
      }).then((res) => {
        this.searchForm.category = this.searchForm.category.concat(res.data.data);
      });
    },
    con(e) {
      console.log(e);
    },
    getArticle() {
      let params = {
        page: this.page,
        limit: this.limit,
        params: JSON.stringify({
          mid: this.searchForm.selectCategory,
        }),
        searchKey: this.search,
        order: "created desc",
      };
      articleList(params).then((res) => {
        this.article = res.data.data;
        this.articleTotal = res.total;
      });
    },
    deleteArticle(id) {
      return new Promise((resolve, reject) => {
        articleDelete({ id })
          .then((res) => {
            if (res.code == 200) {
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
    articleAction(type,id) {
      articleAction({ type:type,id:id }).then(res => {
        console.log(res)
      })
    }
  },
};
</script>
<style scoped>
.el-input .el-select {
  width: 100px;
}
</style>