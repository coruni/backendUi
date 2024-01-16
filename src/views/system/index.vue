<template>
    <div class="app-container">
        <el-row type="flex" style="flex-wrap: wrap;" :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-form ref="gen" :v-model="config" label-width="80px" label-position="top">
                    <el-form-item label="邀请码注册">
                        <el-select v-model="config.isInvite">
                            <el-option label="关闭" :value="0"></el-option>
                            <el-option label="开启" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="登录查看">
                        <el-select v-model="config.isLogin">
                            <el-option label="关闭" :value="0"></el-option>
                            <el-option label="开启" :value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <label>经验设置</label>
                    <el-form-item label="帖子经验">
                        <el-input placeholder="帖子发布获得的经验" v-model="config.postExp"></el-input>
                    </el-form-item>
                    <el-form-item label="评论经验">
                        <el-input placeholder="评论时获得的经验" v-model="config.reviewExp"></el-input>
                    </el-form-item>
                    <el-form-item label="签到经验">
                        <el-input placeholder="签到时获得的经验" v-model="config.clockExp"></el-input>
                    </el-form-item>
                    <el-form-item label="聊天最低经验">
                        <el-input placeholder="聊天最低经验" v-model="config.chatMinExp"></el-input>
                    </el-form-item>
                    <el-form-item label="删除帖子扣除经验">
                        <el-input placeholder="删除帖子扣除经验" v-model="config.deleteExp"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-form label-width="80px" label-position="top" v-model="config">
                    <el-form-item label="发布限制">
                        <el-input v-model="config.postMax" placeholder="每日发布限制-1为不限制"></el-input>
                    </el-form-item>
                    <el-form-item label="内容审核">
                        <el-select v-model="config.contentAuditlevel">
                            <el-option label="关闭" :value="0"></el-option>
                            <el-option label="管理员不需要审核" :value="1"></el-option>

                            <el-option label="全部审核" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <label>货币设置</label>
                    <el-form-item label="VIP价格">
                        <el-input placeholder="VIP一天的价格" v-model="config.vipPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="VIP永久天数">
                        <el-input placeholder="VIP一天的价格" v-model="config.vipDay"></el-input>
                    </el-form-item>
                    <el-form-item label="VIP折扣">
                        <el-input placeholder="VIP一天的价格" v-model="config.vipDiscount"></el-input>
                    </el-form-item>
                    <el-form-item label="站点名称">
                        <el-input placeholder="网站显示的名称" v-model="config.webinfoTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="头像CDN">
                        <el-input placeholder="CDN" v-model="config.webinfoAvatar"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>


        </el-row>
        <div>
            <el-button type="primary" @click="save()">保存</el-button>

        </div>
    </div>
</template>
<script>
import { getConfig, save } from '@/api/system'
export default {
    data() {
        return {
            config: {},

        }
    },
    created() {
        this.initData()
    },
    methods: {
        initData() {
            this.getData()
        },
        getData() {
            getConfig().then(res => {
                console.log(res)
                this.config = res.data
            })
        },
        save() {
            let params = JSON.stringify(this.config)
            save(params).then(res => {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                })
            }).catch(err => {
                console.log(err)
            })
        }

    }
}
</script>