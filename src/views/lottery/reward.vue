<template>
    <div class="app-container">
        <el-form inline size="small">
            <el-form-item>
                <el-button @click="onSave" type="primary" size="mini">添加</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSetting" type="primary" size="mini">抽奖设置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="data" max-height="720" size="mini" border style="width: 100%;border-radius: 5px"
            :header-cell-style="{ background: '#409EFF', color: '#ffffff' }">
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="介绍" prop="description"></el-table-column>
            <el-table-column label="类型" prop="type"></el-table-column>
            <el-table-column label="数值" prop="value"></el-table-column>
            <el-table-column label="数量" prop="quantity"></el-table-column>
            <el-table-column label="概率" prop="chance"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-row>
                        <el-button type="danger" size="mini" @click="messageNotice(scope.row.id)">删除</el-button>
                        <el-button type="primary" size="mini" @click="onEdit(scope.row)">编辑</el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加" :visible.sync="dialogVisible" width="40%">
            <el-form :model="edit" ref="articleForm" label-width="80px" size="mini">
                <el-form-item label="图片">
                    <el-upload :action="'/upload/full'" :beforeAvatarUpload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess" :headers="{ Authorization: getToken() }" :show-file-list="false">
                        <el-image :src="edit.image" v-if="edit.image" style="width: 80px;height: 80px;"></el-image>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="名字" prop="name">
                    <el-input v-model="edit.name" placeholder="奖品名称"></el-input>
                </el-form-item>
                <el-form-item label="中奖几率" prop="chance">
                    <el-input v-model="edit.chance" placeholder="中奖几率"></el-input>
                    <span>（最多保留一位小数点）</span>
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
        </el-dialog>
        <el-dialog title="抽奖设置" :visible.sync="dialogSetting" width="40%">
            <div style="font-weight: 600;margin-bottom: 20px;">每天抽奖次数</div>
            <el-input v-model="config.raffleNum" placeholder="每天最多抽几次"></el-input>
            <div style="font-weight: 600;margin-bottom: 20px;">抽奖消耗积分</div>
            <el-input v-model="config.raffleCoin" placeholder="抽奖消耗积分"></el-input>
            <div style="margin-top: 20px;">
                <el-button type="primary" @click="updateConfig()">保存</el-button>
            </div>
        </el-dialog>
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
            },
            dialogVisible: false,
            dialogSetting: false
        }
    },
    created() {
        this.getData()
    },
    methods: {
        onEdit(data){
            this.dialogVisible = true
            this.edit = {...data}
        },
        onSave() {
            this.dialogVisible = true
        },
        onSetting() {
            this.dialogSetting = true
        },
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
            this.dialogVisible = false;
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

            this.dialogVisible = false;
        },
        updateConfig() {
            let params = this.config;
            updateConfig(params).then(res => {
                this.$message({
                    message: "配置保存成功",
                    type: "success",
                });
            })
        },
        resetData() {
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