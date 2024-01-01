<template>
    <div class="app-container">
        <el-row type="flex" style="flex-wrap: wrap;" :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-form label-position="top" label-width="80px">
                    <el-form-item label="上传方式">
                        <el-select v-model="config.uploadType">
                            <el-option label="本地" value="local"></el-option>
                            <el-option label="腾讯COS" value="cos"></el-option>
                            <el-option label="阿里云oss" value="oss"></el-option>
                            <el-option label="七牛云" value="qiniu"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="类型限制">
                        <el-select v-model="config.uploadLevel">
                            <el-option label="允许图片" :value="0"></el-option>
                            <el-option label="关闭上传" :value="1"></el-option>
                            <el-option label="允许图片和媒体" :value="2"></el-option>
                            <el-option label="允许所有文件" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="SecretId" v-if="config.uploadType != 'local'">
                        <el-input v-if="config.uploadType == 'cos'" v-model="config.cosSecretKey"></el-input>
                        <el-input v-else-if="config.uploadType == 'oss'" v-model="config.aliyunAccessKeyId"></el-input>
                        <el-input v-else-if="config.uploadType == 'qiniu'" v-model="config.qiniuSecretKey"></el-input>
                    </el-form-item>
                    <el-form-item label="SecretKey" v-if="config.uploadType != 'local'">
                        <el-input v-if="config.uploadType == 'cos'" v-model="config.cosAccessKey"></el-input>
                        <el-input v-else-if="config.uploadType == 'oss'" v-model="config.aliyunAccessKeySecret"></el-input>
                        <el-input v-else-if="config.uploadType == 'qiniu'" v-model="config.qiniuAccessKey"></el-input>
                    </el-form-item>
                    <el-form-item label="存储桶名称" v-if="config.uploadType != 'local'">
                        <el-input v-if="config.uploadType == 'cos'" placeholder="somename"
                            v-model="config.cosBucketName"></el-input>
                        <el-input v-else-if="config.uploadType == 'oss'" placeholder="somename"
                            v-model="config.aliyunAucketName"></el-input>
                        <el-input v-else-if="config.uploadType == 'qiniu'" placeholder="somename"
                            v-model="config.qiniuBucketName"></el-input>
                    </el-form-item>
                    <el-form-item label="CDN地址（用于资源访问）">
                        <el-input v-if="config.uploadType == 'local'" placeholder="https://resource.example.com/"
                            v-model="config.webinfoUploadUrl"></el-input>
                        <el-input v-if="config.uploadType == 'cos'" placeholder="https://resource.example.com/"
                            v-model="config.cosPrefix"></el-input>
                        <el-input v-else-if="config.uploadType == 'oss'" placeholder="https://resource.example.com/"
                            v-model="config.aliyunFilePrefix"></el-input>
                        <el-input v-else-if="config.uploadType == 'qiniu'" placeholder="https://resource.example.com/"
                            v-model="config.qiniuDomain"></el-input>
                    </el-form-item>
                    <el-form-item label="存储桶存放位置（放于存储桶中哪个文件夹中）"
                        v-if="config.uploadType == 'cos' || config.uploadType == 'oss'">
                        <el-input v-if="config.uploadType == 'cos'" placeholder="TypeApi"
                            v-model="config.cosPath"></el-input>
                        <el-input v-else-if="config.uploadType == 'oss'" placeholder="TypeApi"
                            v-model="config.aliyunAucketName"></el-input>
                    </el-form-item>
                    <el-form-item label="存储桶区域" v-if="config.uploadType == 'cos' || config.uploadType == 'oss'">
                        <el-input v-if="config.uploadType == 'cos'" placeholder="ap-guangzhou"
                            v-model="config.cosBucket"></el-input>
                        <el-input v-else-if="config.uploadType == 'oss'" placeholder="ap-guangzhou"
                            v-model="config.aliyunEndPoint"></el-input>
                    </el-form-item>

                </el-form>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12">
                <el-form label-position="top" label-width="80px">
                    <el-form-item label="文件限制">
                        <el-input v-model="config.uploadFilesMax" placeholder="上传文件限制大小（单位M）"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体限制">
                        <el-input v-model="config.uploadMediaMax" placeholder="上传媒体限制大小（单位M）"></el-input>
                    </el-form-item>
                    <el-form-item label="图片限制">
                        <el-input v-model="config.uploadPicMax" placeholder="上传图片限制大小（单位M）"></el-input>
                    </el-form-item>
                </el-form>

            </el-col>

        </el-row>
        <el-button type="primary" @click="save()">保存</el-button>


    </div>
</template>
<script>
import { getConfig, save } from '@/api/system'
export default {
    data() {
        return {
            method: 'local',
            config: {}
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