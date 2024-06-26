<template>
    <div class="app-container">
        <el-form ref="form" inline size="small">
            <el-form-item>
                <el-button type="primary" size="mini" @click="showNew = true">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="exportCard">导出</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" size="mini" @click="clear">清除无用卡密</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="data.data" max-height="720" size="mini" border style="width: 100%;border-radius: 5px"
            :header-cell-style="{ background: '#409EFF', color: '#ffffff' }">
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="卡密" prop="value"></el-table-column>
            <el-table-column label="数值" prop="price"></el-table-column>
            <el-table-column label="类型" prop="type">
                <template slot-scope="scope">
                    <div>{{ scope.row.type == 'point' ? '积分' : '会员' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="status">
                <template slot-scope="scope">
                    {{ scope.row.status ? '已使用' : '未使用' }}
                </template>
            </el-table-column>
            <el-table-column label="使用者" prop="uid"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="messageNotice(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background :page-size="20" layout="prev, pager, next" :total="data.total"
            @prev-click="page += 1; getData()" @next-click="page -= 1; getData()" @current-change="change">
        </el-pagination>

        <el-dialog title="新增卡密" :visible.sync="showNew" width="40%">
            <el-form label-width="80px">
                <el-form-item label="数量">
                    <el-input v-model="num" placeholder="数量（最多100）"></el-input>
                </el-form-item>
                <el-form-item label="数值（积分数量 或者会员天数）">
                    <el-input v-model="price" placeholder="数值"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="type" placeholder="类型vip 或 point">
                        <el-option value="vip" label="会员"></el-option>
                        <el-option value="point" label="积分"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="newPaycard()">新增</el-button>
        </el-dialog>
    </div>
</template>

<script>
import { newPaycard, paycard, deleteCard, exportPaycard, clearCard } from '@/api/user';
export default {
    data() {
        return {
            data: [],
            page: 1,
            showNew: false,
            num: 0,
            price: 0,
            type: 'point',
            status: 1,
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            let params = {
                page: this.page,
                limit: 20
            }
            paycard(params).then(res => {
                this.data = res.data
            })
        },

        newPaycard() {
            let params = {
                num: this.num,
                price: this.price,
                type: this.type
            }
            newPaycard(params).then(res => {

                this.showNew = false
                this.getData()
            })
        },
        async messageNotice(id) {
            this.$confirm(`是否删除该邀请码`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await this.deleteCard(id);
                this.$message({
                    type: "success",
                    message: "删除成功",
                });
                this.getData()
            });
        },
        deleteCard(id) {
            return new Promise((resolve, reject) => {
                deleteCard({ id }).then(() => {
                    resolve();
                });
            });
        },
        exportCard() {
            exportPaycard().then(res => {
                const arrayBufferView = new Uint8Array(res); // 使用 TypedArray 处理 ArrayBuffer
                const blob = new Blob([arrayBufferView], { type: 'application/octet-stream' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', '卡密.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                this.$message({
                    type: "success",
                    message: "导出成功",
                });
            })
        },
        change(e) {
            this.page = e;
            this.getData()
        },
        clear() {
            let params = {
                status: this.status
            }
            clearCard(params).then(res => {
                this.$message({
                    type: "success",
                    message: "已清除无用卡密",
                });
                this.getData()
            })
        }
    }
}
</script>