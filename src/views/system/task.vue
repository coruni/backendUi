<template>
    <div class="app-container">
        <el-row type="flex" style="flex-wrap: wrap;" :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <label>任务配置</label>
                <el-card class="card">
                    <div slot="header">
                        <span>每日签到</span>
                    </div>
                    <el-form :model="config">
                        <el-form-item label="每日积分">
                            <el-input placeholder="每日积分" v-model="config.day_point"></el-input>
                        </el-form-item>
                        <el-form-item label="每日经验">
                            <el-input placeholder="每日经验" v-model="config.day_exp"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-card class="card">
                    <div slot="header">
                        <span>每日评论</span>
                    </div>
                    <el-form :model="config">
                        <el-form-item label="评论积分">
                            <el-input placeholder="评论积分" v-model="config.comment_point"></el-input>
                        </el-form-item>
                        <el-form-item label="评论经验">
                            <el-input placeholder="评论经验" v-model="config.comment_exp"></el-input>
                        </el-form-item>
                        <el-form-item label="评论次数">
                            <el-input placeholder="评论次数" v-model="config.comment_times"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-card class="card">
                    <div slot="header">
                        <span>每日发布文章</span>
                    </div>
                    <el-form :model="config">
                        <el-form-item label="发布积分">
                            <el-input placeholder="发布积分" v-model="config.publish_point"></el-input>
                        </el-form-item>
                        <el-form-item label="发布经验">
                            <el-input placeholder="发布经验" v-model="config.publish_exp"></el-input>
                        </el-form-item>
                        <el-form-item label="发布次数">
                            <el-input placeholder="发布次数" v-model="config.publish_times"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-card class="card">
                    <div slot="header">
                        <span>每日收藏</span>
                    </div>
                    <el-form :model="config">
                        <el-form-item label="收藏积分">
                            <el-input placeholder="收藏积分" v-model="config.mark_point"></el-input>
                        </el-form-item>
                        <el-form-item label="收藏经验">
                            <el-input placeholder="收藏经验" v-model="config.mark_exp"></el-input>
                        </el-form-item>
                        <el-form-item label="收藏次数">
                            <el-input placeholder="收藏次数" v-model="config.mark_times"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-form v-model="config" label-position="top" label-width="auto">
                    <el-form-item label="惩罚倍数">
                        <el-input placeholder="惩罚倍数" v-model="config.punish"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <label>任务配置</label>

                <el-card class="card">
                    <div slot="header">
                        <span>每日分享</span>
                    </div>
                    <el-form :model="config">
                        <el-form-item label="分享积分">
                            <el-input placeholder="分享积分" v-model="config.share_point"></el-input>
                        </el-form-item>
                        <el-form-item label="分享经验">
                            <el-input placeholder="分享经验" v-model="config.share_exp"></el-input>
                        </el-form-item>
                        <el-form-item label="分享次数">
                            <el-input placeholder="分享次数" v-model="config.share_times"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-card class="card">
                    <div slot="header">
                        <span>每日点赞</span>
                    </div>
                    <el-form :model="config">
                        <el-form-item label="点赞积分">
                            <el-input placeholder="点赞积分" v-model="config.like_point"></el-input>
                        </el-form-item>
                        <el-form-item label="点赞经验">
                            <el-input placeholder="点赞经验" v-model="config.like_exp"></el-input>
                        </el-form-item>
                        <el-form-item label="点赞次数">
                            <el-input placeholder="点赞次数" v-model="config.like_times"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-card class="card">
                    <div slot="header">
                        <span>每日浏览</span>
                    </div>
                    <el-form :model="config">
                        <el-form-item label="浏览积分">
                            <el-input placeholder="浏览积分" v-model="config.view_point"></el-input>
                        </el-form-item>
                        <el-form-item label="浏览经验">
                            <el-input placeholder="浏览经验" v-model="config.view_exp"></el-input>
                        </el-form-item>
                        <el-form-item label="浏览次数">
                            <el-input placeholder="浏览次数" v-model="config.view_times"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>

                <el-card class="card">
                    <div slot="header">
                        <span>累计签到 未实现</span>
                    </div>
                    <el-form :model="config">
                        <el-form-item label="累计签到积分">
                            <el-input placeholder="累计签到积分" v-model="config.acc_point"></el-input>
                        </el-form-item>
                        <el-form-item label="累计签到经验">
                            <el-input placeholder="累计签到经验" v-model="config.acc_exp"></el-input>
                        </el-form-item>
                        <el-form-item label="累计签到天数">
                            <el-input placeholder="累计签到天数" v-model="config.acc_sign"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
        <el-button type="primary" @click="onSave()" size="mini" class="card">保存</el-button>
    </div>
</template>

<script>
import { taskConfig, taskSave } from '@/api/system'
export default {
    data() {
        return {
            config: {}
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            taskConfig().then(res => {
                this.config = res.data
            })
        },
        onSave() {
            let params = this.config
            taskSave(params).then(res => {
                this.$message({
                    type: 'success',
                    message: '修改完成'
                })
                this.getData()
            })
        }
    }
}
</script>
<style>
.card {
    margin-top: 20px;
}
</style>
