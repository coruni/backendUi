<template>
    <div class="app-container">
        <el-row>

            <el-col :span="6">
                <label>筛选</label>
                <el-select v-model="status" placeholder="状态" @change="page = 1; getData()">
                    <el-option label="已发货" value="issued"></el-option>
                    <el-option label="未发货" value="pending"></el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-table :data="data.data" height="720px">
            <el-table-column label="ID" prop="id" width="80"></el-table-column>
            <el-table-column label="奖品" prop="name" width="180"></el-table-column>
            <el-table-column label="用户ID" prop="uid" width="80"></el-table-column>
            <el-table-column label="用户名称" prop="userInfo.screenName" width="120"></el-table-column>
            <el-table-column label="收件人" prop="userInfo.address.contacts" width="120"></el-table-column>
            <el-table-column label="手机号码" prop="userInfo.address.phone" width="120"></el-table-column>
            <el-table-column label="收货地址" prop="userInfo.address.address" width="500"></el-table-column>
            <el-table-column label="状态" prop="status"
                :filters="[{ text: '待发货', value: 'pending' }, { text: '已发货', value: 'issued' }]"
                :filter-method="filterStatus">
                <template slot-scope="scope">
                    <div>{{ scope.row.status == 'issued' ? '已发货' : '待发货' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini"
                        @click="trackInfo = scope.row; showTrack = true">发货</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background :total="data.total" :current-page="page" :page-size="limit"
            @current-change="page = $event; getData()" layout="prev, pager, next" @next-click="page = $event; getData()"
            @prev-click="page = $event; getData()"></el-pagination>

        <el-dialog title="发货" :visible.sync="showTrack">
            <div>
                <label>用户ID：{{ trackInfo.uid }}</label>
            </div>
            <div>
                <label>收货人：{{ trackInfo && trackInfo.userInfo && trackInfo.userInfo.address &&
                trackInfo.userInfo.address.contacts }}</label>
            </div>
            <div>

                <label>收货号码：{{ trackInfo && trackInfo.userInfo && trackInfo.userInfo.address &&
                trackInfo.userInfo.address.phone }}</label>
            </div>
            <div>
                <label>收货地址：{{ trackInfo && trackInfo.userInfo && trackInfo.userInfo.address.address }}</label>
            </div>
            <div style="margin-top: 20px;">
                <label>填写物流单号</label>
                <el-input v-model="tracking_number" placeholder="物流单号"></el-input>
            </div>
            <div style="margin-top: 20px;">
                <el-button type="primary" @click="tracking()">发货</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getData, log, track } from '@/api/lottery'
export default {
    data() {
        return {
            tracking_number: '',
            trackInfo: {},
            page: 1,
            limit: 10,
            user_id: null,
            status: 'pending',
            id: null,
            data: [],
            showTrack: false,
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            let params = {
                page: this.page,
                limit: this.limit,
                id: this.user_id,
                type: 'product',
                status: this.status,
                all: 1,
            }
            log(params).then(res => {
                console.log(res)
                if (res.code == 200) {
                    this.data = res.data
                }
            })
        },
        tracking() {
            let params = {
                tracking_number: this.tracking_number,
                id: this.trackInfo.id
            }
            track(params).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: "success",
                        message: "发货成功",
                    });
                    this.showTrack = false
                }
            }).finally(() => {
                this.trackInfo = {}
                this.tracking_number = ''
            })
        },
        filterStatus(value, row) {
            return row.status === value;
        }
    }
}
</script>