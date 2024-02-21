<template>
    <div class="app-container">
        <el-row type="flex" style="flex-wrap: wrap" justify="space-between" :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-table :data="list.data">
                    <el-table-column label="ID" prop="id"></el-table-column>
                    <el-table-column label="名称" prop="name"></el-table-column>
                    <el-table-column label="头像" prop="link">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.pic" fit="fit" style="width: 50px;height: 50px;"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column label="介绍" prop="intro"></el-table-column>

                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="form = scope.row">编辑</el-button>
                            <el-button type="danger" size="mini" @click="messageNotice(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background :page-count="list.count" layout="prev, pager, next" :total="list.total"
                    @prev-click="page += 1; getData()" @next-click="page -= 1; getData()"
                    @current-change="page = $event; getData()">
                </el-pagination>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-form v-model="form" class="app-container" ref="form">
                    <el-form-item label="头像" label-width="50px">
                        <el-upload :action="url + '/upload/full'" :beforeAvatarUpload="beforeAvatarUpload"
                            :on-success="handleAvatarSuccess" :headers="{ Authorization: getToken() }"
                            :show-file-list="false">
                            <el-image :src="form.pic" v-if="form.pic" style="width: 80px;height: 80px;"></el-image>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="名称" label-width="50px">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="介绍" label-width="50px">
                        <el-input v-model="form.intro"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="form.id ? update() : save()">{{ form.id ? "更新" : "添加"
                        }}</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { category, save, update, deleteCategory } from '@/api/shop';
import { getToken } from "@/utils/auth";
export default {
    data() {
        return {
            list: {},
            page: 1,
            limit: 10,
            form: {
                id: 0,
                name: '',
                pic: '',
                intro: '',
                parent: 0,
            },
            url: null,
        }
    },
    created() {
        this.getData()
        this.url = process.env.VUE_APP_BASE_API;
    },
    methods: {
        getToken,
        getData() {
            let params = {
                page: this.page,
                limit: this.limit,

            }
            category(params).then(res => {
                this.list = res.data
            })
        },
        save() {
            let params = this.form
            save(params).then(res => {
                this.$message({
                    message: "添加成功",
                    type: "success",
                });
                this.getData()
                this.resetForm()
            })
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isLt2M;
        },
        deleteCategory(id) {
            return new Promise((resolve, reject) => {
                deleteCategory({ id }).then(res => {
                    resolve()
                })
            })
        },
        async messageNotice(id) {
            this.$confirm(`是否删除该头像框`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await this.deleteCategory(id);
                this.getData();
                this.$message({
                    type: "success",
                    message: "删除成功",
                });
            });
        },
        update() {
            let params = this.form
            update(params).then(res => {
                this.$message({
                    type: "success",
                    message: "更新成功",
                });
                this.resetForm;
                this.getData()
            })
        },
        resetForm() {
            this.form = {
                id: 0,
                name: '',
                pic: '',
                intro: '',
                parent: 0,
            }
        }
    }
}
</script>