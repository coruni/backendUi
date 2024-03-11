<template>
    <div class="app-container">
        <el-row type="flex" :gutter="20" style="flex-wrap: wrap;">
            <el-col :xs="24" :sm="24" :md="24" :lg="14">
                <el-table :data="data" style="width: 100%;height: 500px;" max-height="600">
                    <el-table-column label="id" prop="ID" width="80"></el-table-column>
                    <el-table-column label="名称" prop="name" width="120"></el-table-column>
                    <el-table-column label="介绍" prop="description" width="120"></el-table-column>
                    <el-table-column label="类型" prop="type" width="120"></el-table-column>
                    <el-table-column label="数值" prop="value" width="120"></el-table-column>
                    <el-table-column label="数量" prop="quantity" width="120"></el-table-column>
                    <el-table-column label="概率" prop="chance" width="120"></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-row>
                                <el-button type="danger" size="mini" @click="messageNotice(scope.row.id)">删除</el-button>
                                <el-button type="primary" size="mini" @click="edit = scope.row">编辑</el-button>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="10">
                <el-form :model="edit">
                    <el-form-item label="图片">
                        <el-upload :action="'/upload/full'" :beforeAvatarUpload="beforeAvatarUpload"
                            :on-success="handleAvatarSuccess" :headers="{ Authorization: getToken() }"
                            :show-file-list="false">
                            <el-image :src="edit.image" v-if="edit.image" style="width: 80px;height: 80px;"></el-image>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="名字" prop="name">
                        <el-input v-model="edit.name" placeholder="奖品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="中奖几率（最多保留一位小数点）" prop="chance">
                        <el-input v-model="edit.chance" placeholder="中奖几率"></el-input>
                    </el-form-item>
                    <el-form-item label="奖励数值" prop="value">
                        <el-input v-model="edit.value" placeholder="奖励数值"></el-input>
                    </el-form-item>
                    <el-form-item label="奖品数量" prop="quantity">
                        <el-input v-model="edit.quantity" placeholder="奖品数量"></el-input>
                    </el-form-item>
                    <el-form-item label="奖品类型" prop="type">
                        <el-select v-model="edit.type" placeholder="奖品类型">
                            <el-option value="point" label="积分"></el-option>
                            <el-option value="vip" label="会员"></el-option>
                            <el-option value="product" label="实物"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="edit && edit.id ? update() : save()">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row style="margin-top: 20px;" :gutter="20">
            <el-col :span="6">
                <div style="font-weight: 600;margin-bottom: 20px;">每天抽奖次数</div>
                <el-input v-model="config.raffleNum" placeholder="每天最多抽几次"></el-input>
            </el-col>
            <el-col :span="6">
                <div style="font-weight: 600;margin-bottom: 20px;">抽奖消耗积分</div>
                <el-input v-model="config.raffleCoin" placeholder="抽奖消耗积分"></el-input>
            </el-col>
        </el-row>
        <div style="margin-top: 20px;">
            <el-button type="primary" @click="updateConfig()">保存</el-button>

        </div>
    </div>
</template>

<script>
import { getData, deleteRaffle, updateRaffle, addRaffle } from '@/api/lottery'
import { getConfig, save as updateConfig } from '@/api/system';
import { getToken } from "@/utils/auth";
export default {
    data() {
        return {
            data: [],
            limit: 16,
            page: 1,
            edit: {
                image: null,
                name: null,
                id: null,
                type: 'point',
                chance: 1.0,
                quantity: 100,
                value: 1
            },
            config: {
                raffleCoin: null,
                raffleNum: null,
            }
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getToken,
        getData() {
            let params = {
                limit: this.limit,
                page: this.page
            }
            getData(params).then(res => {
                if (res.code == 200) {
                    this.data = res.data.data
                }
            })
            getConfig().then(res => {
                console.log(res)
                this.config.raffleCoin = res.data.raffleCoin
                this.config.raffleNum = res.data.raffleNum
            })
        },
        handleAvatarSuccess(res, file) {
            this.edit.image = res.data.url;
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isLt2M;
        },
        async messageNotice(id) {
            this.$confirm(`是否删除该奖品`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await this.deleteRaffle(id);
                this.getData();
                this.$message({
                    type: "success",
                    message: "删除成功",
                });
            });
        },
        deleteRaffle(id) {
            return new Promise((resolve, reject) => {
                deleteRaffle({ id }).then((res) => {
                    resolve();
                });
            });
        },
        update() {
            let params = this.edit
            updateRaffle(params).then(res => {
                this.$message({
                    message: "修改成功",
                    type: "success",
                });
                this.getData()
                this.resetData()
            })
        },
        save() {
            let params = this.edit
            addRaffle(params).then(res => {
                this.$message({
                    message: "添加成功",
                    type: "success",
                });
                this.getData()
                this.resetData()
            })
        },
        updateConfig(){
            let params = this.config;
            updateConfig(params).then(res=>{
                this.$message({
                    message: "配置保存成功",
                    type: "success",
                });
            })
        },
        resetData(){
            this.edit = {
                image: null,
                name: null,
                id: null,
                type: 'point',
                chance: 1.0,
                quantity: 100,
                value: 1
            }
        }
    }
}
</script>