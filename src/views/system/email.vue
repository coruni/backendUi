<template>
    <div class="app-container">
        <label style="margin-bottom: 10px;">是否开启邮箱验证</label>
        <div>
            <el-select v-model="isEmail" @change="mailToggle()" placeholder="是否开启邮箱验证">
                <el-option label="关闭" :value="0"></el-option>
                <el-option label="开启" :value="1"></el-option>
            </el-select>
        </div>

    </div>
</template>

<script>
import { getConfig, save, setupEmail } from '@/api/system'
export default {
    data() {
        return {
            isEmail: 0,
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
            getConfig().then(res => {
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
        mailToggle() {
            let params = JSON.stringify({
                isEmail: this.isEmail
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