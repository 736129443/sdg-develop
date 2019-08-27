<template>
    <div class="main">
        <p>当前位置：项目管理>运输单管理</p>
        <div class="content">
            <ul class="ul_left">
                <li style="border-top: 0;">运输单编号 : </li>
                <li>出车单编号 : </li>
                <li>仓库名称 : </li>
                <li>配送日期 : </li>
                <li>项目名称 : </li>
                <li>司机姓名(手机号) : </li>
                <li>运营专员 : </li>
                <li><i>*</i> 出车状态变更为 : </li>
                <li>异常反馈来源 : </li>
                <li class="finally"> <i>*</i> 变更说明 : </li>
            </ul>
            <ul class="ul_right" >
                <li style="border-top: 0;">{{esception.esception.transportId}}</li>
                <li>{{ esception.esception.trackId }}</li>
                <li>{{esception.esception.depotName}}</li>
                <li>{{esception.esception.deliveryTime | dateFrm}} </li>
                <li> {{ esception.esception.customerName }}</li>
                <li>{{name}}</li>
                <li> {{esception.esception.projectName}}</li>
                <li>
                    <el-radio v-model="radio" label="finished" >正常</el-radio>
                    <el-radio v-model="radio" label="running" >异常</el-radio>
                </li>
                <li >
                    <el-checkbox-group style="height: 40px"  v-model="checkList" >
                        <el-checkbox label="driver" value="driver">司机</el-checkbox>
                        <el-checkbox label="customer" value="customer">客户</el-checkbox>
                        <el-checkbox label="project" value="project">项目</el-checkbox>
                        <el-checkbox label="developer" value="developer">运营</el-checkbox>
                    </el-checkbox-group>
                </li>
                <li class="finally" >
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                        <el-form-item  prop="desc">
                            <el-input type="textarea" :rows="5" v-model="ruleForm.desc" resize="none" ></el-input>
                        </el-form-item>
                    </el-form>
                </li>
            </ul>
        </div>
        <div style='margin-left: 15%'>
            <el-button type="primary" @click="btn('ruleForm')" v-if="btnshow == 0? false: true">保存</el-button>
            <el-button type="primary"  :loading="true" v-if="btnshow == 0? true: false">保存中</el-button>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
export default {
  data() {
    return {
      radio: 'finished',
      checkList: [],
      list:{},
        btnshow:'1',
        ruleForm:{
            desc:'',
        },
        rules: {
            desc: [
                { required: true, message: '变更说明不能为空', trigger: 'blur' },
                { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,message: '输入内容不规范' },
                { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' },
            ]
        },
        trackId : '',
        transportids:{},
        esception:{},
        name:'',
    }
  },
    created(){
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        this.esception = JSON.parse(sessionStorage.getItem('esception'));
        this.name = this.esception.esception.driverName +  '(' + this.esception.esception.phone + ')';
        console.log(this.esception.esception);
    },
    methods:{
      data(){
      },
        btn(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.btnshow = 0;
                    let page = JSON.stringify({
                        token : this.token,
                        trackId : this.esception.esception.trackId,
                        state:this.radio,
                        reason:this.ruleForm.desc,
                        from:this.checkList,
                    });
                    console.log(page);
                    this.$http.post(this.global.lightningUrl + '/companyv1/roadT/state/change' , page , {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then( (res)=>{
                        console.log(res);
                        if (res.body.errcode == 0){
                            this.$alert('提交成功' , {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.btnshow = 1;
                                    setTimeout((res)=>{
                                        this.$router.push({path:'/turnout_manage'})
                                    },1000)
                                },
                            });

                        }else {
                            this.$alert('提交失败，请重试。' , {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.btnshow = 1;
                                }
                            });
                        }
                    })
                } else {
                    console.log('正则未通过');
                    return false;
                }
            });
            // let a = this.checkList;
            // let add=[];
            // for ( let i = 0 ;i < this.checkList.length; i++){
            //     add.push(this.checkList[i])
            // }
          },

    },
    filters: {
        dateFrm: function (el) {
            return moment(el).format("YYYY-MM-DD");
        }
    }
}
</script>
<style lang="less" scoped>
    .main{
        .el-checkbox-group{
            margin-top: 0;
        }
        .content{
            overflow: hidden;
            padding-top: 20px;
            .ul_left{
                float: left;
                width: 180px;
                text-align: right;
                li{
                    border: 1px solid #dddddd;
                    border-left: 0;
                    border-right: 0;
                    height: 40px;
                    padding: 0 10px;
                    line-height: 40px;
                    margin-top: -1px;
                    i{
                        color: red;
                    }
                }
                .finally{
                    border-bottom: 0;
                }
            }
            .ul_right{
                float: left;
                text-align: left;
                li{
                    border: 1px solid #dddddd;
                    border-left: 0;
                    border-right: 0;
                    height: 40px;
                    padding: 0 10px;
                    line-height: 40px;
                    margin-top: -1px;
                }
                .finally{
                    border-bottom: 0;
                    padding-top: 15px;
                    height: 180px;
                    max-height: 200px;
                    /*-height: 200px;*/
                }
            }
        }
        button{
            width: 100px;
            height: 50px;

        }
        .fl{
            float: left;
        }
        .oh{
            overflow: hidden;
        }
        .el-textarea{
            width: 350px;
        }
        .el-textarea{
            min-height: 100px;
        }

    }


</style>
