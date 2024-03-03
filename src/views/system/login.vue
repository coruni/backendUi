<template>
    <div class="app-container">
        <el-row type="flex" style="flex-wrap: wrap;" :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-form :model="config" label-width="80px">
                    <label>QQ配置</label>
                  <el-form-item label="APPID" prop="qqAppletsAppid">
                    <el-input v-model="config.qqAppletsAppid" placeholder="APPID"></el-input>
                  </el-form-item>
                  <el-form-item label="APP KEY" prop="qqAppletsSecret">
                    <el-input v-model="config.qqAppletsSecret" placeholder="APPKEY"></el-input>
                  </el-form-item>
                </el-form>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-form :model="config" label-width="80px">
                    <label>微信配置</label>
                  <el-form-item label="APPID" prop="wxAppId">
                    <el-input v-model="config.wxAppId" placeholder="APPID"></el-input>
                  </el-form-item>
                  <el-form-item label="APP KEY" prop="wxAppSecret">
                    <el-input v-model="config.wxAppSecret" placeholder="APPKEY"></el-input>
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
import { getConfig, save } from '@/api/system';
export default {
    data() {
        return {
            config: {
                qqAppletsAppid: '',
                qqAppletsSecret: '',
                wxAppId: '',
                wxAppSecret: ''
            }
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            getConfig().then(res => {

                let { qqAppletsAppid, qqAppletsSecret, wxAppId, wxAppSecret } = res.data

                this.config.qqAppletsAppid = qqAppletsAppid;
                this.config.qqAppletsSecret = qqAppletsSecret;
                this.config.wxAppId = wxAppId;
                this.config.wxAppSecret = wxAppSecret;
                console.log(this.config)
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
