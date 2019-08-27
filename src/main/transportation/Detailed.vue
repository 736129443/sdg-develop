<template>
    <div class="main Detailed">
        <div class="header">
            当前位置：<span>无车承运数据>资金流水</span>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="单证号">
                <el-input v-model.trim="formInline.documentNumber" placeholder="请输入单证号"></el-input>
            </el-form-item>
            <el-form-item label="托运单号">
                <el-input v-model.trim="formInline.shippingNoteNumber" placeholder="请输入托运单号"></el-input>
            </el-form-item>
            <el-form-item label="承运人">
                <el-input v-model.trim="formInline.carrier" placeholder="请输入承运人"></el-input>
            </el-form-item>
            <el-form-item label="上报状态">
                <el-select v-model="formInline.reportedStatus" placeholder="请选择上报状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="上报成功" value="success"></el-option>
                    <el-option label="上报失败" value="fail"></el-option>
                    <el-option label="待上报" value="wait"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="车牌号">
                <el-input v-model.trim="formInline.vehicleNumber" placeholder="请输入车牌号"></el-input>
            </el-form-item>
            <el-form-item label="流水号">
                <el-input v-model.trim="formInline.sequenceCode" placeholder="请输入流水号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="query">查询</el-button>
                <el-button type="primary" @click="Export" v-if="capitalFlowSheetExport">导出</el-button>
                <el-button type="primary" @click="Report" v-if="capitalFlowSheetReporting">上报</el-button>
            </el-form-item>
        </el-form>
        <template>
            <el-table
                v-loading="loading"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    :selectable = "selectable"
                    width="55">
                </el-table-column>
                <el-table-column
                    width="140"
                    prop="documentNumber"
                    label="单证号">
                </el-table-column>
                <el-table-column
                    prop="carrier"
                    width="220"
                    label="承运人">
                </el-table-column>
                <el-table-column
                    prop="vehicleNumber"
                    label="车辆牌照号"
                >
                </el-table-column>
                <el-table-column
                    prop="licensePlateTypeCode"
                    label="牌照类型">
                </el-table-column>
                <el-table-column
                    prop="shippingNoteNumber"
                    width="180"
                    label="托运单号">
                    <template slot-scope="scope">
                        <el-button type="text" @click="Consignment(scope.row)">{{ tableData[scope.$index].shippingNoteNumber }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="paymentMeansCode"
                    label="付款方式">
                </el-table-column>
                <el-table-column
                    prop="bankCode"
                    label="转账银行">
                </el-table-column>
                <el-table-column
                    prop="sequenceCode"
                    width="200"
                    label="流水号/序列号">
                </el-table-column>
                <el-table-column
                    prop="monetaryAmount"
                    label="货币金额">
                </el-table-column>
                <el-table-column
                    prop="dateTime"
                    :formatter="dateFormat"
                    label="日期时间"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="reportedStatus"
                    :formatter="types"
                    label="上报状态">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    prop=""
                    label="操作" align="center" width="110">
                    <template slot-scope="scope">
                        <el-button :disabled="tableData[scope.$index].reportedStatus == 'success'" @click="del(scope.row)" type="text" size="small" v-if="capitalFlowSheetDelete">删除</el-button>
                        <el-button :disabled="tableData[scope.$index].reportedStatus == 'success'" @click="edit(scope.row)" type="text" size="small" v-if="capitalFlowSheetEdit">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!-- 分页插件 -->
        <el-pagination background
                       layout="total,prev, pager, next,sizes,jumper"
                       :total="total"
                       :page-size="pagesize"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-sizes="[10,20,30,50]"
                       :current-page="currentPage"
                       class="text_right">
        </el-pagination>
        <el-dialog
            title=""
            :visible.sync="dialogVisible"
            width="80%"
            :before-close="handleClose">
           <div class="lod">
                <div class="con">
                    <span class="tit">流水编辑</span>
                    <ul>
                        <li v-for="i  in arrAy ">
                            <span>{{i.name}}</span>
                            <span>{{i.content}}</span>
                        </li>
                    </ul>
                </div>
               <div class="con_bottom">
                   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                       <el-row>
                           <el-col :span="6">
                               <el-form-item label="付款方式" prop="paymentMeansCode">
                                   <el-select v-model="ruleForm.paymentMeansCode" placeholder="付款方式" @input="show">
                                       <el-option v-for="i in payment"  :label="i.name" :value="i.id" :key="i.id"></el-option>
                                   </el-select>
                               </el-form-item>
                           </el-col>
                           <el-col :span="6">
                               <el-form-item label="转账银行" prop="bankCode" :rules="ruleForm.paymentMeansCode == 33 || ruleForm.paymentMeansCode == 39 ? rules.bankCode:[{ required: false, message: '请选择转账银行', trigger: 'change' }]">
                                   <el-select v-model="ruleForm.bankCode" placeholder=""  :disabled="disabled">
                                       <el-option v-for="i in Bank"  :label="i.name" :value="i.id" :key="i.id"></el-option>
                                   </el-select>
                               </el-form-item>
                           </el-col>
                           <el-col :span="5">
                               <el-form-item label="转账金额" prop="monetaryAmount">
                                   <el-input v-model="ruleForm.monetaryAmount"></el-input>
                               </el-form-item>
                           </el-col>
                           <el-col :span="7">
                               <el-form-item :label="Bookkeeping" prop="sequenceCode">
                                   <el-input v-model="ruleForm.sequenceCode"></el-input>
                               </el-form-item>
                           </el-col>
                       </el-row>
                       <el-row>
                           <el-form-item style="width:100%;display: block;text-align: center">
                               <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                               <el-button @click="resetForm('ruleForm')">重置</el-button>
                           </el-form-item>
                       </el-row>
                   </el-form>
               </div>
           </div>
        </el-dialog>
    </div>
</template>

<script>
    import "../../../mock/bank.js";
    import moment from 'moment'
    import {openPostWindow} from '../../js/report.js'
    import {F_jurisdiction} from "../../js/Fjurisdiction";
    export default {
        //资金流水
        name: "Detailed",
        data() {
            return{
                Bookkeeping:'交易流水号',
                loading: false,
                sequenceCode:'',
                bankCode:'',
                disabled:true,
                Bank:[],
                ruleForm: {
                    paymentMeansCode: '',//付款方式
                    bankCode:'',//转账银行
                    monetaryAmount:'',//转账金额
                    sequenceCode:''//流水号
                },
                rules: {//付款方式
                    paymentMeansCode: [
                        { required: true, message: '请选择付款方式', trigger: 'change' },
                    ],
                    bankCode:[
                        { required: true, message: '请选择转账银行', trigger: 'change' },
                    ],
                    monetaryAmount:[//转账金额
                        { required: true, message: '请输入转账金额', trigger: 'blur' },
                        {pattern: /^((([1-9]{1}\d{0,9}))|([0]{1}))((\.(\d){3}))?$/,  message: '请规范输入格式且保留3位小数', trigger: 'blur' }
                    ],
                    sequenceCode:[//流水号
                        { required: true, message: '请输入流水号', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!\-@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ]
                },
                payment:[
                    {name:'银行汇票',id:'33'},
                    {name:'银行转账',id:'39'},
                    {name:'现金支付',id:'42'},
                    {name:'第三方平台支付',id:'7'},
                    {name:'支付宝支付',id:'71'},
                    {name:'微信支付',id:'72'},
                    {name:'其他方式支付',id:'9'},
                    {name:'油卡支付',id:'91'},
                    {name:'道路桥闸通行费支付',id:'92'}
                ],
                arrAy:[],
                row:{},
                dialogVisible: false,
                pages:{},
                documentNumber:[],
                multipleSelection:[],
                tableData:[],
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
                formInline:{
                    documentNumber:"",//单证号
                    shippingNoteNumber:'',//托运单号
                    carrier:"",//承运人
                    vehicleNumber:'',//车牌号
                    licensePlateTypeCode:'',//车牌类型
                    reportedStatus:'',//上报状态
                    sequenceCode:'',//资金流水
                },
                capitalFlowSheetExport:false,//资金流水单导出
                capitalFlowSheetReporting:false,//资金流水单上报
                capitalFlowSheetEdit:false,//资金流水单编辑
                capitalFlowSheetDelete:false,//资金流水单删除
            }
        },
        created() {
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.capitalFlowSheetExport = F_jurisdiction('capitalFlowSheetExport',jurisdictions);
            this.capitalFlowSheetReporting = F_jurisdiction('capitalFlowSheetReporting',jurisdictions);
            this.capitalFlowSheetEdit = F_jurisdiction('capitalFlowSheetEdit',jurisdictions);
            this.capitalFlowSheetDelete = F_jurisdiction('capitalFlowSheetDelete',jurisdictions);
            this.token = user.result.token;
        },
        methods:{
            show() {
                console.log(this.ruleForm.paymentMeansCode);
                if (this.ruleForm.paymentMeansCode == 42 || this.ruleForm.paymentMeansCode == 9) {
                    this.Bookkeeping = '财务记账号';
                }else {
                    this.Bookkeeping = '交易流水号';
                }
                if (this.ruleForm.paymentMeansCode == 33 || this.ruleForm.paymentMeansCode == 39)  {
                    this.disabled = false;
                    this.ruleForm.bankCode = this.bankCode;
                    this.ruleForm.sequenceCode = this.sequenceCode;
                }else {
                    this.disabled = true;
                    this.ruleForm.bankCode = '';
                    this.ruleForm.sequenceCode = '';
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let page = JSON.stringify({
                            token: this.token,
                            paymentMeansCode: this.ruleForm.paymentMeansCode,//付款方式
                            bankCode: this.ruleForm.bankCode,//转账银行
                            monetaryAmount: this.ruleForm.monetaryAmount,//转账金额
                            sequenceCode: this.ruleForm.sequenceCode,//流水号
                            id: this.row.id,
                        });
                        this.$http.post(this.global.lightningUrl + '/companyv1/truckBroker/money/update',page,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res)=>{
                            console.log(res.body.result);

                            if (res.body.errcode == 0) {
                                this.$message({
                                    showClose: true,
                                    message: '编辑修改成功！',
                                    type: 'success'
                                });
                                this.dialogVisible = false;
                                this.data();
                            }else {
                                this.$message({
                                    showClose: true,
                                    message: '编辑修改失败！',
                                    type: 'warning'
                                });
                                this.data();
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
             types(row) {
                // console.log(row.reportedStatus);
                if (row.reportedStatus == "success"){
                    return '上报成功'
                }else if (row.reportedStatus == 'fail'){
                    return '上报失败'
                }else if (row.reportedStatus == 'wait'){
                    return '待上报'
                }
            },
            //资金编辑
            edit(row) {
                this.row = row;
                console.log(this.row.paymentMeansCode);
                if (this.row.paymentMeansCode == '银行转账' || this.row.paymentMeansCode == '银行汇票')  {
                    this.disabled = false;
                }else {
                    this.disabled = true;
                }
                this.bankCode = row.bankCode;
                this.sequenceCode = row.sequenceCode;
                console.log(row);
                this.arrAy = [];
                this.arrAy.push({name:"单证号：",content:row.documentNumber});
                this.arrAy.push({name:"承运人：",content:row.carrier});
                this.arrAy.push({name:"车辆牌照号：",content:row.vehicleNumber});
                this.arrAy.push({name:"牌照类型：",content:row.licensePlateTypeCode});
                this.arrAy.push({name:"托运单号：",content:row.shippingNoteNumber});
                this.dialogVisible = true;
                this.ruleForm = this.row;
                for (var i in this.payment){
                    if (this.row.paymentMeansCode == this.payment[i].name){
                        this.ruleForm.paymentMeansCode = this.payment[i].id
                    }
                }
                for (var i in this.Bank) {
                    if (this.Bank[i].name == this.ruleForm.bankCode) {
                        this.ruleForm.bankCode = this.Bank[i].id
                    }
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        this.data();
                    })
                    .catch(_ => {
                        this.data();
                    });
            },
            //刪除
            del(row) {
                this.$confirm('此操作将删除表中信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let page = JSON.stringify({
                        token:this.token,
                        id:row.id,
                    });
                    this.$http.post(this.global.lightningUrl + '/companyv1/truckBroker/money/delete',page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res.body.result);
                        if (res.body.errcode == 0) {
                            this.$message({
                                showClose: true,
                                message: '删除成功！',
                                type: 'success'
                            });
                            setTimeout(()=>{
                                this.data();
                            },500)
                        }else {
                            this.$message({
                                showClose: true,
                                message: '删除失败！',
                                type: 'warning'
                            });
                            setTimeout(()=>{
                                this.data();
                            },500)
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                setTimeout(()=>{
                    this.data();
                },500)
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            data(){
                let page = JSON.stringify({
                    token:this.token,
                    pageNum: this.currentPage,
                    pageSize:this.pagesize,
                    documentNumber:this.formInline.documentNumber,
                    shippingNoteNumber:this.formInline.shippingNoteNumber,
                    carrier:this.formInline.carrier,
                    vehicleNumber:this.formInline.vehicleNumber,
                    licensePlateTypeCode:this.formInline.licensePlateTypeCode,
                    reportedStatus:this.formInline.reportedStatus,
                    sequenceCode:this.formInline.sequenceCode,//资金流水
                });
                this.pages = page;
                this.$http.post(this.global.lightningUrl + '/companyv1/truckBroker/money/list',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res.body.result);
                    if (res.body.errcode == 0) {
                        this.tableData = res.body.result.list;
                        this.total = res.body.result.total;
                        for (var i in this.Bank) {
                            for (var j in this.tableData){
                                if (this.Bank[i].id == this.tableData[j].bankCode){
                                    this.tableData[j].bankCode = this.Bank[i].name
                                }
                            }
                        }
                    }
                })
            },
            //跳转到出车单详情
            Consignment(row) {
                console.log(row.shippingNoteNumber);
                // return
                let transportNumberInfos = JSON.stringify({
                    token: this.token,
                    trackId: row.shippingNoteNumber
                });
                console.log(transportNumberInfos);
                this.$http.post(this.global.lightningUrl + '/companyv1/trunkCenter/transport/track/detail/get', transportNumberInfos, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res.body.errcode);
                    if (res.body.errcode == 0){
                        this.$router.push({ path:'/orderDetails',
                            query:{
                                trackId: row.shippingNoteNumber
                            }
                        })
                    }else {
                        this.$message({
                            showClose: true,
                            message: '该单号无效！',
                            type: 'error'
                        });
                    }
                })


            },
            //导出
            Export() {
                var exportLink = this.global.lightningUrl + '/companyv1/truckBroker/report/export/money_list';
                openPostWindow(exportLink,this.pages);
            },
            //上报
            Report() {
                console.log(this.documentNumber);
                if (this.documentNumber.length == 0) {
                    this.$message({
                        showClose: true,
                        message: '请先勾选需要上报的数据！',
                        type: 'error'
                    });
                    return
                }
                this.$confirm('此操作将上报表中信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let page = JSON.stringify({
                        token: this.token,
                        documentNumberList: this.documentNumber
                    });
                    this.$http.post(this.global.lightningUrl + '/companyv1/truckBroker/report/money', page, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res) => {
                        console.log(res.body.result);
                        if (res.body.errcode == 0) {
                            this.$message({
                                showClose: true,
                                message: '上报成功',
                                type: 'success'
                            });
                            this.loading=true;
                            setTimeout(()=>{
                                this.data();
                                this.loading=false;
                            },2000)
                        }else {
                            this.$message({
                                showClose: true,
                                message: res.body.message,
                                type: 'error'
                            });
                            this.data();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消上报'
                    });
                });
            },
            //查询
            query(){
                this.currentPage = 1;
                this.data();
            },
            //表格多选按钮
            handleSelectionChange(val) {
                this.multipleSelection = [];
                this.documentNumber = [];
                this.multipleSelection = val;
                for (var i in this.multipleSelection) {
                    this.documentNumber.push( this.multipleSelection[i].documentNumber)
                }
            },
            //表格复选框选择性禁用
            selectable(row,index) {
                if (row.reportedStatus == 'success') {
                    return false
                }else {
                    return true
                }
            },
            //分页
            handleSizeChange(pagesize){
                this.pagesize = pagesize;
                this.data();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.data();
            },
        },
        mounted() {
            this.$http.get("/bank").then(res=>{
                this.Bank = res.body.data
            });
            this.data();
        }
    }
</script>

<style scoped lang =scss>
    .Detailed{
        .demo-form-inline{
            padding:20px 0;
        }
        .lod{
            .con{
                width:100%;
                .tit{
                    font-weight: bold;
                    font-size:20px ;
                    display: block;
                    text-align: center;
                }
                ul{
                    overflow: hidden;
                    li{
                        float: left;
                        overflow: hidden;
                        padding:20px;
                        width: 30%;
                        span{
                            float: left;
                        }
                        :nth-child(2){
                            font-weight: bolder;
                        }
                    }
                }
            }
        }
    }
</style>