<template>
    <div class="app-container">
        <label>微信支付</label>
        <el-form label-position="top" label-width="80px">
            <el-form-item label="微信APPID">
                <el-input v-model="config.wxpayAppId" placeholder="微信APPID"></el-input>
            </el-form-item>
            <el-form-item label="微信商户ID">
                <el-input v-model="config.wxpayMchId" placeholder="微信商户ID"></el-input>
            </el-form-item>
        </el-form>
        <label>支付宝支付</label>
        <el-form label-position="top" label-width="80px">
            <el-form-item label="支付宝APPID">
                <el-input v-model="config.alipayAppId" placeholder="支付宝APPID"></el-input>
            </el-form-item>
            <el-form-item label="支付宝私钥">
                <el-input v-model="config.alipayPrivateKey" placeholder="支付宝私钥"></el-input>
            </el-form-item>
            <el-form-item label="支付宝公钥">
                <el-input v-model="config.alipayPublicKey" placeholder="支付宝公钥"></el-input>
            </el-form-item>
        </el-form>

        <label>易支付</label>
        <el-form label-position="top" label-width="80px">
            <el-form-item label="商户ID">
                <el-input v-model="config.epayPid" placeholder="商户ID"></el-input>
            </el-form-item>
            <el-form-item label="商户key">
                <el-input v-model="config.epayKey" placeholder="商户key"></el-input>
            </el-form-item>
            <el-form-item label="api地址">
                <el-input v-model="config.epayUrl" placeholder="api地址"></el-input>
            </el-form-item>
        </el-form>
        <label>通知地址</label>
        <el-input v-model="config.notifyUrl" placeholder="结尾不需要/ 如https://api.xxxxx.com"></el-input>
        <el-button type="primary" @click="save()">保存</el-button>
    </div>
</template>
<script>
import { getConfig, save } from '@/api/system'
export default {
    data() {
        return {
            config: {}
        }
    },
    created() {
        this.getConfig()
    },
    methods: {
        getConfig() {
            getConfig().then(res => {
                this.config = res.data
            })
        },
        save() {
            let params = this.config
            save(params).then(res => {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                })
            })
        }
    }
}
</script>