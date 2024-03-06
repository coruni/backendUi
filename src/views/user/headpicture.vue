<template>
    <div class="app-container">
        <el-row type="flex" style="flex-wrap: wrap" justify="space-between" :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-table :data="list.data">
                    <el-table-column label="ID" prop="id"></el-table-column>
                    <el-table-column label="名称" prop="name"></el-table-column>
                    <el-table-column label="头像框" prop="link">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.link" fit="fit" style="width: 50px;height: 50px;"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建者" prop="creator"></el-table-column>
                    <el-table-column label="类型" prop="type">
                        <template slot-scope="scope">
                            <div>{{ scope.row.type == 0 ? "私人" : "公开" }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="类型" prop="permission">
                        <template slot-scope="scope">
                            <div>{{ scope.row.permission == 0 ? "公开" : "需要" }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini">编辑</el-button>
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
                        <el-upload :action="'/upload/full'" :beforeAvatarUpload="beforeAvatarUpload"
                            :on-success="handleAvatarSuccess" :headers="{ Authorization: getToken() }"
                            :show-file-list="false">
                            <el-image :src="form.link" v-if="form.link" style="width: 80px;height: 80px;"></el-image>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="名称" label-width="50px">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" label-width="50px">
                        <el-select v-model="form.type" placeholder="公开或者私人">
                            <el-option :value="0" label="私人"></el-option>
                            <el-option :value="1" label="公开"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="权限" label-width="50px">
                        <el-select v-model="form.permission" placeholder="需要或不需要">
                            <el-option :value="0" label="不需要"></el-option>
                            <el-option :value="1" label="需要"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态" label-width="50px">
                        <el-select v-model="form.type" placeholder="关闭或开启">
                            <el-option :value="0" label="停用"></el-option>
                            <el-option :value="1" label="启用"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="save()">添加</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { headList, deleteHead, save } from '@/api/headpicture';
import { getToken } from "@/utils/auth";
export default {
    data() {
        return {
            url: null,
            list: [],
            page: 1,
            limit: 10,
            form: {
                name: '',
                link: '',
                type: 1,
                permission: 0,

            }
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
            headList(params).then(res => {
                this.list = res.data
            })
        },
        deleteHead(id) {
            return new Promise((resolve, reject) => {
                deleteHead({ id }).then(res => {
                    resolve()
                })
            })
        },
       
        save() {
            if (this.form.link == null || !this.form.link) return;
            save(this.form).then(res => {
                this.$message({
                    message: "添加成功",
                    type: "success",
                });
                this.resetForm()
            })
        },
        resetForm() {
            this.form = {
                name: '',
                link: '',
                type: 1,
                permission: 0,
            }
        },
        async messageNotice(id) {
            this.$confirm(`是否删除该头像框`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await this.deleteHead(id);
                this.getData();
                this.$message({
                    type: "success",
                    message: "删除成功",
                });
            });
        },
        handleAvatarSuccess(res, file) {
            this.form.link = res.data.url;
        },
        beforeAvatarUpload(file) {  
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isLt2M;
        },


    }
}
</script>
