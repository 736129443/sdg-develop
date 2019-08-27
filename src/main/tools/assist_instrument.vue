<template>
    <div class="main" style="padding: 30px">
        <div class="header">
            <p> 当前位置：辅助工具 > 消息推送</p>
        </div>
        <div class="rows">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm"  label-width="100px">
                <el-form-item label="消息标题" prop="name">
                    <el-input v-model="ruleForm.name" autofocus style="width: 30%;"></el-input>
                </el-form-item>
                <el-form-item label="消息内容" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc" height="400px" resize="none" ></el-input>
                </el-form-item>
                <!--<el-form-item label="推送对象" prop="desc2">-->
                    <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" value="ALL" @change="handleCheckAllChange">全选</el-checkbox>-->
                    <!--<div style="margin: 15px 0;"></div>-->
                    <!--<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
                        <!--<el-checkbox v-for="city in cities" :label="city" :key="city.id" :value="city.value"> {{city.name}} </el-checkbox>-->
                    <!--</el-checkbox-group>-->
                <!--</el-form-item>-->

            </el-form>
        </div>
        <div class="rows_input">
            <el-button  type="primary" @click="submit('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading" >提交</el-button>
        </div>

    </div>
</template>
<script>
    const cityOptions = [{ name:'客户',value:'ALL_CUSTOMER',id:'1' },{ id:'2',name:'司机',value:'ALL_DRIVER'}];
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('超出输入范围'));
                } else {
                    callback();
                }
            };
            return {
                input: '',
                textarea3: '',
                checkAll: false,
                checkedCities:[] ,
                cities: cityOptions,
                isIndeterminate: true,
                all:'',
                box:'',
                ruleForm:{
                    name:'',
                    desc:'',
                    one:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入消息标题', trigger: 'blur' },
                        { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]*$/,message: '输入内容不规范' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请填写消息内容', trigger: 'blur' },
                        { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!.\-@#~$&*()=+|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,300}$/,message: '输入内容不规范或长度超过 300 个字符'},
                    ],
                    one:[
                        { required: true, message: ' ', trigger: 'blur' },
                    ]
                },
                fullscreenLoading: false,
            }
        },
        created(){
            let token =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = token.result.token;
        },
        methods: {
            //全选
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
                this.box = val;
            },
            //单选
            handleCheckedCitiesChange(value) {
                this.checkAll=true;
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
                this.box =this.checkAll;
            },
            submit(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        // this.ruleForm.desc.log
                        this.fullscreenLoading = true;
                        setTimeout(() => {
                            let page = JSON.stringify({
                                token:this.token,
                                pushTitle:this.ruleForm.name,
                                pushContent:{ content:this.ruleForm.desc },
                                messageType:"backSystemMessage",
                                conditionType:"add"
                            });
                            this.$http.post(this.global.lightningUrl + '/companyv1/messagerCenter/message/saveBackMessage',page,{
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            }).then((res)=>{
                                if (res.body.errcode == 0){
                                    this.fullscreenLoading = false;
                                    this.$alert('提交成功',  {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            location.reload()
                                        }
                                    });
                                }
                            })
                        }, 1500);

                    } else {
                        return false;
                    }
                });

            },

        }
    }
</script>
<style>
.main {
    width:100%;
    font-size: 16px;
    padding: 30px;
}
.main .title-input{
    width:100%;
    height:100px;
}
.main .title-inputs{
    padding:30px;
    padding-left : 10px;
    width:50%;
    float: left;
}
.main .title-input .title-text{
    color:#606266;
    float: left;
    line-height: 100px;
}
.main .rows{
    width:100%;
    min-height:176px;
    margin-top: 20px;
}
.main .rows .rows-input{
    padding:30px;
    padding-left : 10px;

    width:50%;
    float: left;
}
.rows .rows-text{
    color:#606266;
    float: left;
    line-height: 100px;
}
.selection{
    min-height:100px;
    color:red;
}
.selection-title{
    color:#606266;
    float: left;
    line-height: 40px;
}
.selection-button{
    padding-left:100px;
}
.selection-button{
    padding-top: 10px;
}
.el-checkbox{
    margin-right: 20px;
    margin-left:10px;
}
.el-checkbox-group{

}

.el-checkbox+.el-checkbox{
    margin-left: 0;
}
.rows_input{
    width: 50%;
    text-align: center;
}
/*.el-checkbox-group{*/
    /*margin-top: -15px;*/
/*}*/
    /*.el-input {*/
        /*width: 30%;*/
    /*}*/
    .el-textarea{
        width: 30%;
        height: 200px;
    }
.el-textarea__inner{
    height: 200px;
}
</style>