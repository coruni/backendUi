<template>
    <div class="app-container">
        <el-form label-position="top" label-width="80px">
            <el-form-item label="邮箱主机">
                <el-input placeholder="smtp.qq.com" v-model="config.host"></el-input>
            </el-form-item>
            <el-form-item label="邮箱账号">
                <el-input placeholder="exmaple@xx.com" v-model="config.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱密码">
                <el-input placeholder="QQ邮箱密码是独立的" v-model="config.password"></el-input>
            </el-form-item>
            <el-button type="primary">保存</el-button>
        </el-form>
    </div>
</template>
<script>
import { getConfig, save, getSystem } from '@/api/system'
export default {
    data() {
        return {
            config: {
                host: '',
                username: '',
                password: '',
                ssl: ''
            }
        }
    },
    created() {
        this.initData()
    },
    methods: {
        initData() {
            this.getConfig()
        },
        getConfig() {
            getSystem().then(res => {
                console.log(res)
                this.config = res.data
            })
        },
        save() {
            let params = JSON.stringify(this.config)
            save(params).then(() => {
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            })
        }
    }

}
</script>