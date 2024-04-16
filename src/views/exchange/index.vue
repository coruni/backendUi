<template>
    <div class="app-container">
        <el-form>
            <el-form-item>
                <el-button type="primary" size="small" @click="dialogVisible = true">添加</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="exchangeData.data" size="mini" border style="width: 100%;border-radius: 5px"
            :header-cell-style="{ background: '#409EFF', color: '#ffffff' }">
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="类型" prop="type">
                <template slot-scope="type">
                    {{ type.row.type === 'rank' ? '头衔' : '头像框' }}
                </template>
            </el-table-column>
            <el-table-column label="兑换ID" prop="exchange_id"></el-table-column>
            <el-table-column label="兑换积分" prop="price"></el-table-column>
            <el-table-column label="兑换名称" prop="detail.name"></el-table-column>
            <el-table-column label="兑换详情" prop="detail.link">
                <template slot-scope="link">
                    <el-image :src="link.row.detail && link.row.type  == 'headpicture' ? link.row.detail.link : link.row.detail.image"
                        style="width: 50px; height: 50px"
                        v-if="link.row.type == 'headpicture' || (link.row.type == 'rank' && link.row.detail.type)"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="onEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="messageNotice(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>


        </el-table>
        <el-dialog title="兑换添加" :visible="dialogVisible" @close="dialogVisible = false">
            <el-form :model="exchange">
                <el-form-item label="名称">
                    <el-input v-model="exchange.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="exchange.type" placeholder="类型" @change="getExchange()">
                        <el-option label="头像框" value="headpicture"></el-option>
                        <el-option label="头衔" value="rank"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物品">
                    <el-select v-model="exchange.exchange_id" placeholder="选择物品">
                        <el-option v-for="(item, index) in selectData" :key="index" :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="兑换积分">
                    <el-input v-model="exchange.price" placeholder="兑换积分"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="save()"> {{ exchange.id ? '更新' : '添加' }}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { getList, save, deleteExchange } from '@/api/exchange';
import { headList } from '@/api/headpicture';
import { list as rankList } from '@/api/rank';
export default {
    data() {
        return {
            exchangeData: {},
            page: 1,
            limit: 10,
            dialogVisible: false,
            exchange: {
                name: '',
                type: 'headpicture',
                price: 10,
                id: '',
                exchange_id: ''
            },
            selectData: []

        }
    },
    created() {
        this.getData()
        this.getExchange()
    },
    methods: {
        getData() {
            let params = {
                page: this.page,
                limit: this.limit
            }
            getList(params).then(res => {
                this.exchangeData = res.data
            })

        },
        getExchange() {
            if (this.exchange.type == 'headpicture') {
                headList({ limit: 300 }).then(res => {
                    console.log(res)
                    this.selectData = res.data.data
                })
            }
            if (this.exchange.type == 'rank') {
                rankList({ limit: 300 }).then(res => {
                    console.log(res)
                    this.selectData = res.data.data
                })
            }
        },
        save() {
            let params = this.exchange
            save(params).then(res => {
                this.$message({
                    type: "success",
                    message: res.msg,
                });
                this.dialogVisible = false;
                this.resetForm();
                this.getData();
            })
        },
        resetForm() {
            this.exchange = {
                name: '',
                type: 'headpicture',
                price: 10,
                id: '',
                exchange_id: ''
            }
        },
        onEdit(data) {
            this.exchange = data
            this.dialogVisible = true
        },
        update() {

        },
        async messageNotice(id) {
            this.$confirm(`是否删除该兑换`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async () => {
                await deleteExchange(id);
                this.getData();
                this.$message({
                    type: "success",
                    message: "删除成功",
                });
                this.resetForm();
            });
        },
    }
}
</script>