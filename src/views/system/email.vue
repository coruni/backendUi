<template>
    <div class="app-container">
        <el-select v-model="isEmail" @change="mailToggle()">
            <el-option  label="关闭" :value="0"></el-option>
            <el-option  label="开启" :value="1"></el-option>
        </el-select>
        <el-form label-position="top" label-width="80px">
            <el-form-item label="邮箱主机">
                <el-input placeholder="smtp.qq.com" v-model="config.mailHost"></el-input>
            </el-form-item>
            <el-form-item label="邮箱账号">
                <el-input placeholder="exmaple@xx.com" v-model="config.mailUsername"></el-input>
            </el-form-item>
            <el-form-item label="邮箱密码">
                <el-input placeholder="QQ邮箱密码是独立的" v-model="config.mailPassword"></el-input>
            </el-form-item>
            <el-button type="primary" @click="setupEmail()">保存</el-button>
        </el-form>
    </div>
</template>
<script>
import { getConfig, save, getSystem, setupEmail } from '@/api/system'
export default {
    data() {
        return {
            config: {
                mailHost: '',
                mailUsername: '',
                mailPassword: '',
            },
            isEmail:0,
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
                let config = this.processConfigString(res.data);
                this.config.mailHost = config['spring.mail.host']
                this.config.mailUsername = config['spring.mail.username']
                this.config.mailPassword = config['spring.mail.password']
                console.log(this.config)
            })
            getConfig().then(res => {
                console.log(res)
                this.isEmail = res.data.isEmail
            })
        },
        setupEmail() {
            let params = JSON.stringify(this.config)
            setupEmail(params).then(() => {
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            })
        },
        mailToggle(){
            let params = JSON.stringify({
                isEmail:this.isEmail
            })
            save(params).then(res => {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                })
            }).catch(err => {
                console.log(err)
            })
        },
        processConfigString(configString) {
            const configArray = configString.split('\n');
            const configObject = {};

            for (let line of configArray) {
                // 忽略以 # 开头的注释行
                if (line.trim().startsWith('#')) {
                    continue;
                }
                const keyValue = line.split('=');
                const key = keyValue[0].trim();
                const value = keyValue[1] ? keyValue[1].trim() : '';

                configObject[key] = value;
            }
            return configObject;
        }

    }

}
</script>