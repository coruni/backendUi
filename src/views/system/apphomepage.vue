<template>
    <div class="app-container">
        <el-row type="flex" style="flex-wrap: wrap;" :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-table :data="data">
                    <el-table-column prop="id" label="id"></el-table-column>
                    <el-table-column label="图标">
                        <template slot-scope="scope">
                            <el-image :src="scope.row.image" style="width: 40px;height: 40px;"></el-image>

                        </template>
                    </el-table-column>
                    <el-table-column label="类型">
                        <template slot-scope="scope">
                            {{ scope.row.type ? '链接' : '路径' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="enable" label="状态"></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="editorData = scope.row">编辑</el-button>
                            <el-button size="mini" type="danger" @click="messageNotice(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-form :model="editorData" ref="form" style="padding: 20px;">
                    <el-form-item label="图标" label-width="80px">
                        <el-upload :action="url + '/upload/full'" :beforeAvatarUpload="beforeAvatarUpload"
                            :on-success="handleAvatarSuccess" :headers="{ Authorization: token }" :show-file-list="false">
                            <el-image :src="editorData.imgurl" v-if="editorData.imgurl"
                                style="width: 80px;height: 80px;"></el-image>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="路径" label-width="80px">
                        <el-input v-model="editorData.page" placeholder="根据类型填入信息 如/pages/user/sign" />
                    </el-form-item>
                    <el-form-item label="类型" label-width="80px">
                        <el-select v-model="editorData.type">
                            <el-option label="路径" :value="0"></el-option>
                            <el-option label="链接" :value="1"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态" label-width="80px">
                        <el-select v-model="editorData.enable">
                            <el-option label="关闭" :value="0"></el-option>
                            <el-option label="启用" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="80px">
                        <el-button type="primary" @click="save()">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { appHomepage, appHomepageAdd, appHomepageDelete } from '@/api/system';
import { getToken } from "@/utils/auth";
export default {
    data() {
        return {
            data: [],
            page: 1,
            editorData: {
                id: null,
                page: '',
                image: 'https://',
                type: 0,
                enable: 1,

            },
            url: null,
            token: getToken()
        }
    },
    created() {
        this.getData()
        this.url = process.env.VUE_APP_BASE_API;

    },
    methods: {
        getData() {
            appHomepage({ page: this.page }).then(res => {
                this.data = res.data.data
            })
        },
        handleAvatarSuccess(res, file) {
            this.editorData.imgurl = res.data.url;
        },
        beforeAvatarUpload(file) {

            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isLt2M;
        },
        save() {
            if (this.editorData.id != null) {
                this.update()
            } else {
                appHomepageAdd(this.editorData).then(res => {
                    this.$message({
                        type: 'success',
                        message: '添加完成'
                    })
                    this.resetData()
                })
            }
        },
        update() {

        },
        async messageNotice(id) {
            this.$confirm(`是否删除该页面？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await this.deletePage(id);
                this.getData();
                this.$message({
                    type: "success",
                    message: "删除成功",
                });
            });
        },
        deletePage(id) {
            return new Promise((resolve, reject) => {
                appHomepageDelete({id}).then(res => {

                    resolve()
                })
            })
        },
        resetData() {
            this.editorData = {
                id: null,
                page: '',
                image: 'https://',
                type: 0,
                enable: 1,

            }
        }
    }
}
</script>
