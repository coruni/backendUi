<template>
    <div class="app-container">
        <el-form inline size="small">
            <el-form-item>
                <el-button @click="onSave" type="primary" size="mini">添加</el-button>
                <el-button @click="onGive" type="primary" size="mini">赋予</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="rankList.data" max-height="720" size="mini" border style="width: 100%;border-radius: 5px"
            :header-cell-style="{ background: '#409EFF', color: '#ffffff' }">
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="头衔" prop="name"></el-table-column>
            <el-table-column label="类型 （仅一个生效）" prop="type">
                <template slot-scope="type">
                    {{ type.row.type == '0' ? '文字' : '图片' }}
                </template>
            </el-table-column>
            <el-table-column label="文字颜色" prop="color">
                <template slot-scope="color">
                    <span :style="{ color: color.row.color }">{{ color.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="背景颜色" prop="background">
                <template slot-scope="background">
                    <span :style="{ background: background.row.background }">{{ background.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="图片" prop="image">
                <template slot-scope="image">
                    <el-image :src="image.row.image" fit="contain" style="width: 50px;height: 50px;"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="updateDialog = true; rank = scope.row;">编辑</el-button>
                    <el-button size="mini" type="danger" @click="messageNotice(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="diglogVisible" width="40%" title="添加">
            <el-form v-model="rank" class="app-container" ref="form">
                <el-form-item label="名称">
                    <el-input v-model="rank.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="rank.type" placeholder="选择类型">
                        <el-option label="文字" :value="0"></el-option>
                        <el-option label="图片" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片" label-width="50px" v-if="rank.type == 1">
                    <el-upload :action="'/upload/full'" :beforeAvatarUpload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess" :headers="{ Authorization: getToken() }"
                        :show-file-list="false">
                        <el-image :src="rank.image" v-if="rank.image" style="width: 80px;height: 80px;"
                            fit="contain"></el-image>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文字颜色" v-if="rank.type == 0">
                    <el-color-picker v-model="rank.color"></el-color-picker>
                </el-form-item>
                <el-form-item label="文字背景" v-if="rank.type == 0">
                    <el-color-picker v-model="rank.background"></el-color-picker>
                </el-form-item>

                <el-form-item>
                    <el-button size="mini" type="primary" @click="save()">添加</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="updateDialog" width="40%" title="更新">
            <el-form v-model="rank" class="app-container" ref="form">
                <el-form-item label="名称">
                    <el-input v-model="rank.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="rank.type" placeholder="选择类型">
                        <el-option label="文字" :value="0"></el-option>
                        <el-option label="图片" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片" label-width="50px" v-if="rank.type == 1">
                    <el-upload :action="'/upload/full'" :beforeAvatarUpload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess" :headers="{ Authorization: getToken() }"
                        :show-file-list="false">
                        <el-image :src="rank.image" v-if="rank.image" style="width: 80px;height: 80px;"
                            fit="contain"></el-image>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文字颜色" v-if="rank.type == 0">
                    <el-color-picker v-model="rank.color"></el-color-picker>
                </el-form-item>
                <el-form-item label="文字背景" v-if="rank.type == 0">
                    <el-color-picker v-model="rank.background"></el-color-picker>
                </el-form-item>

                <el-form-item>
                    <el-button size="mini" type="primary" @click="update()">更新</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 赋予弹窗 -->
        <el-dialog title="赋予" :visible.sync="giveDialog" width="60%">
            <el-row>
                <el-col :span="18">
                    <el-input v-model="user_id" placeholder="输入用户id搜索用户" size="small"
                        prefix-icon="el-icon-search"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button type="sucess" size="small" @click="getUser()">搜索</el-button>
                </el-col>
            </el-row>
            <div style="margin-top: 20px;display: flex;flex-direction: column;" class="text-line">
                <span>用户ID：{{ user.uid }}</span>
                <span>用户名：{{ user.name }}</span>
                <span>昵称：{{ user.screenName }}</span>
            </div>
            <div style="margin: 20px 0 ;">
                <span>选择赋予头衔</span>

            </div>
            <el-select v-model="select_rank_id" placeholder="请选择">
                <el-option v-for="(item, index) in rankList.data" :label="item.name" :value="item.id"
                    :key="index"></el-option>
            </el-select>
            <div style="margin-top: 20px;">
                <el-button type="primary" @click="give"> 赋予</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { list, update, add, deleteRank, give } from '@/api/rank';
import { getToken } from "@/utils/auth";
import { getInfo } from '@/api/user';
export default {
    data() {
        return {
            rank: {
                name: '',
                type: 0,
                color: '#000',
                background: '#000',
                image: '',
            },
            select_rank_id: 1,
            user_id: '',
            user: {
                name: '',
                uid: '',
            },
            showRank: false,
            rankList: {},
            diglogVisible: false,
            updateDialog: false,
            giveDialog: false
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getToken,
        getData() {
            list().then(res => {
                console.log(res)
                this.rankList = res.data
                console.log(this.rankList)
            })
        },
        onSave() {
            this.diglogVisible = true
        },
        onGive() {
            this.giveDialog = true
        },
        save() {
            let params = this.rank
            add(params).then(res => {
                this.$message({
                    message: "添加成功",
                    type: "success",
                });
                this.getData()
                this.resetRank()
            })
        },
        update() {
            let params = this.rank
            update(params).then(res => {
                this.$message({
                    message: "添加成功",
                    type: "success",
                });
                this.getData()
                this.resetRank()
            })
        },
        async messageNotice(id) {
            this.$confirm(`是否删除该头像框`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await deleteRank({ id });
                this.getData();
                this.$message({
                    type: "success",
                    message: "删除成功",
                });
            });
        },
        handleAvatarSuccess(res, file) {
            this.rank.image = res.data.url;
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isLt2M;
        },
        resetRank() {
            this.rank = {
                name: '',
                type: 0,
                color: '#000',
                background: '#000',
                image: '',
            }
        },
        getUser() {
            if (!this.user_id) return;
            getInfo(this.user_id).then(res => {
                if (res.code == 200) {
                    this.user = res.data
                }
            })
        },
        give() {
            give(this.user_id, this.select_rank_id).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: "success",
                        message: "赋予成功",
                    });
                }
            })
        }
    }
}
</script>
<style>
.text-line {
    line-height: 2;
}
</style>