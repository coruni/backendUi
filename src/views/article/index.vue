<template>
  <div class="app-container">
    <el-form v-model="searchForm" ref="form" inline size="small">
      <el-form-item label="分类">
        <el-select v-model="searchForm.selectCategory" placeholder="请选择分类" no-data-text="暂无数据"
          style="margin-right: 10px" @change="
      page = 1;
    getArticle();
    ">
          <el-option v-for="item in searchForm.category" :key="item.mid" :label="item.name"
            :value="item.mid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input placeholder="请输入文章标题" v-model="search" @input="!search.length ? getArticle() : ''"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left: 10px" @click="getArticle" type="primary" icon="el-icon-search"
          size="mini">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="article.data" max-height="720" size="mini" border style="width: 100%;border-radius: 5px"
      :header-cell-style="{ background: '#409EFF', color: '#ffffff' }">
      <el-table-column prop="cid" label="ID" width="100"></el-table-column>
      <el-table-column prop="category.name" label="分类"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="authorInfo.name" label="作者"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="status">
          {{ status.row.status == 'publish' ? '通过' : '待审' }}
        </template>
      </el-table-column>
      <el-table-column prop="created" label="创建时间">
        <template slot-scope="created">
          {{ $formatTimestamp(created.row.created, "yyyy-MM-dd HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row type="flex">
            <el-button type="text" size="mini" @click="showArticleEdit = true; articleData = scope.row">编辑</el-button>
            <el-button class="red" type="text" size="mini" @click="messageNotice(scope.row.cid)">删除</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 5px">
      <el-pagination :page-size="limit" background layout="prev, pager, next" :total="article.total"
        @next-click="page += 1; getArticle();" @prev-click="page > 1 ? ((page -= 1), getArticle()) : ''"
        @current-change="page = $event; getArticle();">
      </el-pagination>
    </div>
    <!-- 弹窗组件 -->
    <el-dialog title="文章设置" :visible.sync="showArticleEdit" @close="showArticleEdit = false" width="40%">
      <el-form :model="articleData" ref="articleForm" label-width="80px" size="mini">
        <el-form-item label="轮播">
          <el-select v-model="articleData.isswiper" @change="articleAction('swiper', articleData.cid)">
            <el-option label="关闭" :value="0">
            </el-option>
            <el-option label="开启" :value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首页推荐">
          <el-select v-model="articleData.isrecommend" @change="articleAction('recommend', articleData.cid)">
            <el-option label="关闭" :value="0">
            </el-option>
            <el-option label="开启" :value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首页置顶">
          <el-select v-model="articleData.istop" @change="articleAction('top', articleData.cid)">
            <el-option label="关闭" :value="0">
            </el-option>
            <el-option label="开启" :value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="圈子置顶">
          <el-select v-model="articleData.isCircleTop" @change="articleAction('circleTop', articleData.cid)">
            <el-option label="关闭" :value="0">
            </el-option>
            <el-option label="开启" :value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="帖子审核">
          <el-select v-model="articleData.status" @change="articleAction('publish', articleData.cid)">
            <el-option label="待审" value="waiting">
            </el-option>
            <el-option label="通过" value="publish">
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
      limit: 10,
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
        this.article = res.data;
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
    articleAction(type, id) {
      articleAction({ type: type, id: id }).then(res => {
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