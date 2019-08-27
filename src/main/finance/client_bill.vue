<template>
    <div class="main">
        <div class="header">
            当前位置：<span>财务管理 > 客户回款管理</span>
        </div>
        <el-form :inline="true" :model="formInline" style="margin-top: 20px;">
                <el-form-item label="客户编号：">
                    <el-input v-model.trim="formInline.customerId" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="客户编号"></el-input>
                </el-form-item>
                 <el-form-item label="项目名称：">
                    <el-input v-model.trim="formInline.customerName" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="项目名称"></el-input>
                </el-form-item>
            <el-form-item label="所在分公司：">
                <!--<el-input v-model="formInline.manageArea" placeholder="所属管理区"></el-input>-->
                <el-select v-model="formInline.manageArea" placeholder="请选择">
                    <!--<el-option-->
                            <!--v-for="item in ids"-->
                            <!--:key="item.allId"-->
                            <!--:label="item.areaName"-->
                            <!--:value="item.allId">-->
                    <!--</el-option>-->
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in ids" :label='i.filialeName' :value="i.filialeId" :key="i.filialeId"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item label="管理区：">
                <el-select v-model="formInline.regionId" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in lists" :label='i.name' :value="i.id" :key="i.id"></el-option>
                </el-select>
            </el-form-item>


            <el-form-item label="项目类型：">
                <el-select v-model="formInline.type" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="临时项目" value="InterimCustomer"></el-option>
                    <el-option label="标准项目" value="ProjectCustomer"></el-option>
                    <el-option label="背靠背项目" value="BackToBackCustomer"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售专员：">
                <el-input v-model.trim="formInline.saleName" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="销售专员"></el-input>
            </el-form-item>
            <el-form-item label="运营专员：">
                <el-input v-model.trim="formInline.projectName" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="运营专员"></el-input>
            </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="kh_bill">查询</el-button>
                </el-form-item>
        </el-form>
        <template>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="customerId"
                        label="客户编号"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="regionName"
                        label="管理区"
                        align="center">
                </el-table-column>

                <el-table-column
                        prop="filialeName"
                        label="所在分公司"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="customerName"
                        label="项目名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="项目类型"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="saleName"
                        label="销售专员"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="projectName"
                        label="运营专员"
                        align="center">
                </el-table-column>
                <el-table-column
                        v-if="(CRMReturnConfirm && CRMReturnRecord)"
                        fixed="right"
                        label="操作"
                        width="170"
                        align="center">
                    <template slot-scope="scope">
                        <el-button  type="text"  @click="dialogFormVisible = true,handleClick(scope.$index)" v-if="CRMReturnConfirm">回款确认</el-button>
                        <el-button type="text" @click="returned(scope.$index)" v-if="CRMReturnRecord">回款记录</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <el-pagination background
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       @size-change="handleSizeChange"
                       :page-sizes="[10, 20, 30, 50]"
                       layout="total,prev, pager, next,sizes"
                       :total = 'total'>
        </el-pagination>
        <el-dialog title="回款确认" :visible.sync="dialogFormVisible" width="660px">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="回款方式" :label-width="formLabelWidth" >
                    <el-input auto-complete="off" style="width:50%;" v-model="form.radio"  placeholder="线下" disabled></el-input>
                </el-form-item>

                <el-form-item label="支付方式" :label-width="formLabelWidth" prop="experience">
                    <el-select v-model="form.experience" placeholder="请选择支付方式">
                        <el-option  label="现金" value="underline_cash"></el-option>
                        <el-option  label="转帐" value="underline_transfer"></el-option>
                        <el-option  label="微信" value="underline_wechat"></el-option>
                        <el-option  label="支付宝" value="underline_alipay"></el-option>
                        <el-option  label="POS机刷卡" value="underline_pos"></el-option>
                        <el-option  label="其他" value="other"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="银行卡号" :label-width="formLabelWidth" prop="name"  v-if="form.experience=='underline_transfer'?true:false">
                    <el-input v-model="form.name"  @blur="blur()" auto-complete="off" style="width:50%;"  placeholder="银行账户"></el-input>
                </el-form-item>
                <el-form-item label="回款金额" :label-width="formLabelWidth" prop="money">
                    <el-input v-model="form.money" auto-complete="off" style="width:50%;"  placeholder="回款金额（元)"></el-input>
                </el-form-item>
                <!--<el-form-item label="账户名称" :label-width="formLabelWidth" prop="account">-->
                    <!--<el-input v-model="form.account" auto-complete="off" style="width:50%;"  placeholder="账户名称"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="回款日期" :label-width="formLabelWidth" prop="value1">
                    <el-date-picker
                            v-model="form.value1"
                            type="date"
                            value-format="timestamp"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <!--<el-form-item label="开票状态" :label-width="formLabelWidth" prop="value1">-->
                    <!--<el-switch-->
                            <!--v-model="form.value2"-->
                            <!--active-color="#13ce66"-->
                            <!--inactive-color="#ff4949"-->
                            <!--@change="switch1()">-->
                    <!--</el-switch>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="开票金额" :label-width="formLabelWidth" prop="AmountMoney">-->
                        <!--<el-input v-model="form.AmountMoney" auto-complete="off" :disabled="state" style="width:50%;"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <p style="padding-left:70px; color: #F56C6C;">请核对信息，是否确认已回款，确认后将通知相关部门，并推送信息给客户</p>
            <div slot="footer" class="dialog-footer">
                <el-button  type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                <el-button @click="dialogFormVisible=false">取消</el-button>
            </div>
        </el-dialog>   
    </div>
</template>
<script>
    // import {bank} from '../../js/lostPassword.js'
export default {
    data() {
       return {
           //是否要发票
           ticket:'',
           //点击汇款确定的
           customerId:'',
           //禁用input
           state:true,
           //分页
           total:0,
           currentPage:1,
           pagesize:10,//每页的数据条数
           //列表数据
           tableData: [],
           formInline: {
               customerId:'',
               customerName:'',
               areaName:'',
               saleName:'',
               projectName:'',
               type:'',
               manageArea:'',
           },
           ids:[],
           form: {
               name: '',
               bank:'',
               account:'',
               money :'',
               value1:'',
               radio:'线下',
               //开关
               value2:false,
               //开票金额
               AmountMoney:'',
               experience:'',

           },
           rules: {
               money: [
                   {required: true,trigger: 'money',message: '请输入金额'},
                   { pattern: /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/, message: '请输入正确金额，小数点后保留两位' }
               ],
               AmountMoney: [
                   {required: false,trigger: 'money',message: '请输入金额'},
                   { pattern: /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/, message: '请输入正确金额，小数点后保留两位' }
               ],
               experience:[
                   {required: true,trigger: 'change',message: '请选择支付方式'},
               ],
               name:[
                   {required: false,trigger: 'blur',message: '请输入银行卡号'},
                   {pattern: /^[\d-]{10,30}$/, message: '请输入正确银行卡号'}
               ],
               account:[
                   {required: true,trigger: 'blur',message: '请输入账户名称'},
                   {pattern: /([\u4e00-\u9fa5])/, message:'请输入正确账户名称'}
               ],
               value1:[
                   {required: true,trigger: 'blur',message: '请选择日期'}
               ],
            },
           dialogTableVisible: false,
           dialogFormVisible: false,
           formLabelWidth: '120px',
           num:'',
           lists:'',
           CRMReturnConfirm:false,
           CRMReturnRecord:false,

           }
    },
    created(){
        //拿到token
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;

        let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.CRMReturnConfirm = jurisdictions[7].menus[20].choose;
            this.CRMReturnRecord = jurisdictions[7].menus[21].choose;
        this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/area',JSON.stringify({
            'token':this.token,
        })).then(run=>{
            this.ids = run.body.result;
            console.log(this.ids);
        })
        this.$http.post( this.global.lightningUrl + '/companyv1/userManage/region/all_region',JSON.stringify({
            'token':this.token,
        })).then(run=>{

            this.lists = run.body.result
        })

        if(sessionStorage.getItem('returnedrecordcurrentPage')!=null){
            let currentPages = Number(sessionStorage.getItem('returnedrecordcurrentPage'));
            let totals = Number(sessionStorage.getItem('returnedrecordtotal'));
            let condition = sessionStorage.getItem('returnedrecordcondition');

            this.formInline = JSON.parse(condition)
            this.currentPage = currentPages;
            this.total = totals;
            //查询接口
            this.requestTurnout()
        }else {
            this.list();
        }


    },
    methods: {
        switch1(){
            if (this.form.value2 == false){
                this.form.value2 = false;
                this.ticket = 0
                // console.log(this.ticket)
            }else {
                this.form.value2 = true;
                this.ticket = 1
                // console.log(this.ticket)
            }

            if(this.form.value2 == true){
                this.state = false
            }else {
                this.state = true
            }
        },
        //汇款确定
        handleClick(index) {
        //拿到customerId
            this.num = this.tableData[index].customerId
        },
        //首刷的数据
        requestTurnout(){
            this.list()
        },
        list(){
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_repay_info',JSON.stringify({
                'token':this.token,
                'pageNum':this.currentPage,
                'pageSize':this.pagesize,
                'customerId':this.formInline.customerId,
                'customerName':this.formInline.customerName,
                'filialeId':this.formInline.manageArea,
                'saleName':this.formInline.saleName,
                'type':this.formInline.type,
                'projectName':this.formInline.projectName,
                'regionId':this.formInline.regionId,
            })).then(run=>{
                console.log(run);
                this.tableData = run.body.result.rows;
                this.total = run.body.result.total;
                for (let i = 0 ;i < this.tableData.length ; i++){
                    if (this.tableData[i].type == 'ProjectCustomer') {
                        this.tableData[i].type = '标准项目'
                    }else if (this.tableData[i].type == 'InterimCustomer') {
                        this.tableData[i].type = '临时项目'
                    }else if (this.tableData[i].type == 'BackToBackCustomer') {
                        this.tableData[i].type = '背靠背项目'
                    }
                } 
            })

            //更新本地存储
            if(sessionStorage.getItem('returnedrecordcurrentPage')!=null&&sessionStorage.getItem('returnedrecordcurrentPage')!=null){
                //删除本地
                sessionStorage.removeItem('returnedrecordcurrentPage');
                sessionStorage.removeItem('returnedrecordcondition');
                sessionStorage.removeItem('returnedrecordtotal');
                //存储本地
                sessionStorage.setItem('returnedrecordcurrentPage', JSON.stringify(this.currentPage));
                sessionStorage.setItem('returnedrecordtotal', JSON.stringify(this.total));
                sessionStorage.setItem('returnedrecordcondition', JSON.stringify(this.formInline));
            }else {
                //存储本地
                sessionStorage.setItem('returnedrecordcurrentPage', JSON.stringify(this.currentPage));
                sessionStorage.setItem('returnedrecordtotal', JSON.stringify(this.total));
                sessionStorage.setItem('returnedrecordcondition', JSON.stringify(this.formInline));
            }
        },
        //客户查询
        kh_bill(){
            this.currentPage=1;
            this.list()
        },
        blur() {
            // bank(this,this.form.name);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let page = JSON.stringify({
                        'token':this.token,
                        'customerId':this.num,
                        'repayMoney':this.form.money,
                        'channel' : this.form.experience,
                        'repayTime' : this.form.value1,
                        'repayBankNo' : this.form.name == ''?undefined:this.form.name,
                    })
                    console.log(page);
                    this.$http.post(this.global.lightningUrl + '/companyv1/finance/business/customer_repay/confirm',JSON.stringify({
                        'token':this.token,
                        'customerId':this.num,
                        'repayMoney':this.form.money,
                        'channel' : this.form.experience,
                        'repayTime' : this.form.value1,
                        'repayBankNo' : this.form.name == ''?undefined:this.form.name,

                    })).then(run=>{
                        if(run.body.errcode == 0){
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.dialogFormVisible=false
                        }else {
                            this.$message.error('提交失败！');
                            setTimeout((res)=>{
                                this.dialogFormVisible=false
                            },20)
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        returned(index){
            this.customerId = this.tableData[index].customerId;
            // console.log(this.customerId);
            sessionStorage.setItem('customerId',this.customerId)
            this.$router.push({
                path:'/returnedrecord'
            })
        },
        Preservation(){
        },
        //分页
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.list()
        },
        handleSizeChange(val){

            this.pagesize = val;
            this.list()
        }
    }
}
</script>
<style lang="scss" scoped>
.main {
    font-size: 16px;
    padding: 30px;
}
</style>