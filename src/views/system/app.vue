<template>
    <div class="app-container">
        <el-row type="flex" style="flex-wrap: wrap;" :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <label>应用设置</label>
                <el-form v-model="config" label-position="top" label-width="auto">
                    <el-form-item label="应用名称">
                        <el-input placeholder="应用名称" v-model="config.name"></el-input>
                    </el-form-item>
                    <el-form-item label="应用介绍">
                        <el-input placeholder="应用介绍" v-model="config.description"></el-input>
                    </el-form-item>
                    <el-form-item label="公告">
                        <el-input placeholder="公告" v-model="config.announcement"></el-input>
                    </el-form-item>
                    <el-form-item label="网站地址">
                        <el-input placeholder="网站地址" v-model="config.website"></el-input>
                    </el-form-item>
                    <el-form-item label="广告联盟">
                        <el-input placeholder="广告联盟ID" v-model="config.adpid"></el-input>
                    </el-form-item>
                    <el-form-item label="积分名称">
                        <el-input placeholder="积分名称" v-model="config.currencyName"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <label>应用更新</label>
                <el-form v-model="config" label-width="auto" label-position="top">
                    <el-form-item label="版本名称">
                        <el-input placeholder="版本名称" v-model="config.version"></el-input>
                    </el-form-item>
                    <el-form-item label="版本号">
                        <el-input placeholder="用于对比本地App版本 只能填写数字整数" v-model="config.versionCode"></el-input>
                    </el-form-item>
                    <el-form-item label="更新介绍">
                        <el-input placeholder="支持html" v-model="config.versionIntro"></el-input>
                    </el-form-item>
                    <el-form-item label="Android下载地址">
                        <el-input placeholder="https://" v-model="config.androidUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="IOS下载地址">
                        <el-input placeholder="https://" v-model="config.iosUrl"></el-input>
                    </el-form-item>
                    <el-form-item>

                        <el-row type="flex" :gutter="20">
                            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                                <div>
                                    <label>静默更新</label>
                                    <el-select v-model="config.silence">
                                        <el-option label="关" :value="0"></el-option>
                                        <el-option label="开" :value="1"></el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                                <div>
                                    <label>强制更新</label>
                                    <el-select v-model="config.forceUpdate">
                                        <el-option label="关" :value="0"></el-option>
                                        <el-option label="开" :value="1"></el-option>
                                    </el-select>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row type="flex" :gutter="20">
                            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                                <label>是否发行</label>
                                <el-select v-model="config.issue">
                                    <el-option label="否" :value="0"></el-option>
                                    <el-option label="是" :value="1"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                                <label>更新方式</label>
                                <el-select v-model="config.updateType">
                                    <el-option label="全量更新" :value="0"></el-option>
                                    <el-option label="热更新" :value="1"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>

                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-button type="primary" @click="save()">保存</el-button>
    </div>
</template>
<script>
import { getApp, updateApp } from '@/api/system';
export default {
    data() {
        return {
            config: {
                name: '',
                website: '',
                currencyName: '',
                announcement: '',
                version: '',
                versionCode: 1,
                versionIntro: '',
                androidUrl: '',
                iosUrl: '',
                adpid: '',
                silence: 0,
                forceUpdate: 0,
                issue: 1,
                updateType: 0,
            }
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            getApp().then(res => {
                this.config = res.data.app
            })
        },
        save() {
            let params = JSON.stringify(this.config)
            updateApp(params).then((res) => {
                this.$message({
                    type:'success',
                    message:'修改完成'
                })
            })
        }

    }
}
</script>