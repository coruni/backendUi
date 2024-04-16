<template>
    <div class="app-container ">
        <el-form inline size="small">
            <el-form-item>
                <el-button @click="onSave" type="primary" size="mini">添加</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="swiperList.data" max-height="720" size="mini" border style="width: 100%;border-radius: 5px"
            :header-cell-style="{ background: '#409EFF', color: '#ffffff' }">
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="介绍" prop="description"></el-table-column>
            <el-table-column label="类型" prop="type">
                <template slot-scope="type">
                    {{ type.row.type ? '帖子' : '链接' }}
                </template>
            </el-table-column>
            <el-table-column label="横幅" prop="image">
                <template slot-scope="image">
                    <el-image style="width: 100%; height: 50px" :src="image.row.image" fit="contain"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="action">
                    <el-button size="mini" type="primary"
                        @click="diglogVisible = true; swiper = action.row;">编辑</el-button>
                    <el-button size="mini" type="danger" @click="messageNotice(action.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="diglogVisible" width="40%" title="添加">
            <el-form v-model="swiper" class="app-container" ref="form">
                <el-form-item label="标题">
                    <el-input v-model="swiper.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="swiper.description" placeholder="简介"></el-input>
                </el-form-item>
                <el-form-item label="图片" label-width="50px">
                    <el-upload :action="'/upload/full'" :beforeAvatarUpload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess" :headers="{ Authorization: getToken() }"
                        :show-file-list="false">
                        <el-image :src="swiper.image" v-if="swiper.image" style="width: 80px;height: 80px;"
                            fit="contain"></el-image>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="swiper.type" placeholder="类型">
                        <el-option label="链接" :value="0"></el-option>
                        <el-option label="帖子" :value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="链接" v-if="!swiper.type">
                    <el-input v-model="swiper.url" placeholder="链接http(s)://"></el-input>
                </el-form-item>
                <el-form-item label="帖子ID" v-if="swiper.type">
                    <el-input v-model="swiper.article_id" placeholder="id"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button size="mini" type="primary"
                        @click="swiper.id ? update() : save()">{{ swiper.id ? '更新' : '添加' }}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { getToken } from "@/utils/auth";
import { getList, deleteSwiper, updateSwiper, addSwiper } from '@/api/swiper'
export default {
    data() {
        return {
            page: 1,
            limit: 10,
            swiperList: {},
            diglogVisible: false,
            swiper: {
                title: '',
                description: '',
                type: 0,
                url: '',
                article_id: '',
                image: '',
            }
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getToken,
        getData() {
            getList({ page: this.page, limit: this.limit }).then(res => {
                this.swiperList = res.data
            })
        },
        onSave() {
            this.diglogVisible = true
        },
        save() {

        },
        handleAvatarSuccess(res, file) {
            this.swiper.image = res.data.url;
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传图片大小不能超过 2MB!");
            }
            return isLt2M;
        },
        async messageNotice(id) {
            this.$confirm(`是否删除该轮播`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await deleteSwiper({ id });
                this.getData();
                this.$message({
                    type: "success",
                    message: "删除成功",
                });
            });
        },
        update() {
            let params = this.swiper
            updateSwiper(params).then(res => {
                this.$message({
                    message: "更新成功",
                    type: "success",
                });
                this.getData()
                this.resetForm()

            })
        },
        save() {
            let params = this.swiper
            addSwiper(params).then(res => {
                this.$message({
                    message: "添加成功",
                    type: "success",
                });
                this.getData()
                this.resetForm()
            })
        },
        resetForm() {
            this.swiper = {
                title: '',
                description: '',
                type: 0,
                url: '',
                article_id: '',
                image: '',
            }
        }
    }
}
</script>