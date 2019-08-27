<template>
    <div class="main otherCostlist">
        <div class="header">
            <!--当前位置: 财务管理 > 司机账单 > 调账审批-->
            当前位置: 项目管理 > 项目财务 > 项目报表 > 其它成本
        </div>
        <el-tabs type="border-card" v-model="activeName2"  @tab-click="handleClick">
            <el-tab-pane v-if="costInput" label="其它成本录入" name="Typein">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                    <el-form-item label="成本名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="成本类型" prop="type">
                        <el-radio v-model="ruleForm.type" label="temp">临时</el-radio>
                        <el-radio v-model="ruleForm.type" label="long">长期</el-radio>
                    </el-form-item>
                    <el-form-item label="总金额" prop="sum" v-if="ruleForm.type == 'temp'">
                        <el-input v-model="ruleForm.sum"></el-input>
                        <span class="f_font">元</span>

                    </el-form-item>
                    <el-form-item label="成本产生日期" prop="time" v-if="ruleForm.type == 'temp'">
                        <el-date-picker
                            v-model="ruleForm.time"
                            type="date"
                            placeholder="选择日期时间"
                            value-format="timestamp">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="单日金额" prop="Single_sum" v-if="ruleForm.type == 'long'">
                        <el-input v-model="ruleForm.Single_sum"></el-input>
                        <span class="f_font">元</span>
                    </el-form-item>
                    <el-form-item label="成本产生周期" prop="time2" v-if="ruleForm.type == 'long'">
                        <el-date-picker
                            width="110"
                            v-model="ruleForm.time2"
                            type="daterange"
                            value-format="timestamp"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注" prop="textarea">
                        <el-input
                                type="textarea"
                                placeholder="请输入内容"
                                :autosize="{ minRows: 4, maxRows: 10}"
                                resize="none"
                                v-model="ruleForm.textarea">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('ruleForm')">提 交</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane v-if="costRecord" label="成本记录" name="list">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="成本名称">
                        <el-input v-model.trim="formInline.name" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入项目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="成本产生岂止日期">
                        <el-date-picker
                                v-model="formInline.time_produce"
                                type="daterange"
                                value-format="timestamp"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="成本录入时间">
                        <el-date-picker
                                v-model="formInline.time_onSubmit1"
                                type="daterange"
                                range-separator="至"
                                value-format="timestamp"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit1">查询</el-button>
                        <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="costRecordExport">导出</el-button>
                        <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                    </el-form-item>
                </el-form>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="成本名称" align="center"> </el-table-column>
                    <el-table-column prop="type" label="类型" align="center" > </el-table-column>
                    <el-table-column prop="amount" label="金额" align="center"> </el-table-column>
                    <el-table-column prop="time" label="成本产生起止日期" align="center"> </el-table-column>
                    <el-table-column prop="optName" label="录入人" align="center"> </el-table-column>
                    <el-table-column prop="optTime" label="录入时间" align="center" :formatter="dateFormat"> </el-table-column>
                    <el-table-column prop="remark" label="备注说明" align="center"> </el-table-column>
                    <el-table-column prop="date" label="操作" align="center" >
                        <template  slot-scope="scope">
                            <el-button type="text" @click="onChanges(scope.$index)">变更</el-button>
                            <el-button type="text" @click="changelist(scope.$index)">变更记录</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="pageSize"
                        layout="total,prev, pager, next,sizes"
                        :total="total">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>

        <!--变更弹出-->
        <el-dialog
                title="变更"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <el-form :model="changeruleForm" :rules="changeruleForma" ref="changeruleForma" label-width="110px" class="demo-ruleForm">
                <el-form-item label="成本名称" >
                    <el-input v-model="changeruleForm.name" readonly ></el-input>
                </el-form-item>
                <el-form-item label="成本类型" >
                    <el-input v-model="changeruleForm.type" readonly ></el-input>
                </el-form-item>
                <el-form-item label="总金额" prop="amount" v-if="changeruleForm.type == '临时'">
                    <el-input v-model="changeruleForm.amount"></el-input>
                    <span class="f_font">元</span>

                </el-form-item>
                <el-form-item label="成本产生日期" prop="startTime" v-if="changeruleForm.type == '临时'">
                    <el-date-picker
                            v-model="changeruleForm.startTime"
                            type="date"
                            value-format="timestamp"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="单日金额" prop="amount" v-if="changeruleForm.type == '长期'">
                    <el-input v-model="changeruleForm.amount"></el-input>
                    <span class="f_font">元</span>
                </el-form-item>
                <el-form-item label="成本产生周期" prop="time2" v-if="changeruleForm.type == '长期'">

                    <el-date-picker
                            v-model="changeruleForm.time2"
                            value-format="timestamp"
                            type="daterange"
                            @input="$forceUpdate()"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="textarea">
                    <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            :autosize="{ minRows: 4, maxRows: 10}"
                            resize="none"
                            v-model="changeruleForm.remark">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false,ajax()">取 消</el-button>
                <el-button type="primary" @click="onchangeok">确 定</el-button>
            </span>
        </el-dialog>
        <!--变更记录-->
        <el-dialog
                title="变更记录"
                :visible.sync="changlist"
                center>
            <el-table :data="changlisttableData" style="width: 100%">
                <el-table-column prop="name" label="成本名称" align="center"> </el-table-column>
                <el-table-column prop="type" label="类型" align="center"> </el-table-column>
                <!--<el-table-column prop="customerName" label="变更前金额" align="center"> </el-table-column>-->
                <el-table-column prop="amount" label="变更后金额" align="center"> </el-table-column>
                <el-table-column prop="time" label="成本产生起止日期" align="center"> </el-table-column>
                <el-table-column prop="optName" label="变更人" align="center"> </el-table-column>
                <el-table-column prop="optTime" label="变更时间" align="center" :formatter="dateFormat"> </el-table-column>
                <el-table-column prop="remark" label="备注说明" align="center"> </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page.sync="currentPage1"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="pageSize1"
                    layout="total,prev, pager, next,sizes"
                    :total="total1">
            </el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changlist = false">取 消</el-button>
                <el-button type="primary" @click="changlist = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment'
    import {getDate_s1 as times} from "../../js/listWarehouse.js";

    export default {
        name: "otherCostlist",
        data(){
            return {
                sum:'',
                time:[],
                activeName2:'Typein',
                ruleForm:{
                    name:'',//名称
                    type:'temp',//类型
                    sum:'',//总金额
                    Single_sum:'',//单日金额
                    textarea:'',//备注
                    time:'',//成本产生日期
                    time2:'',//
                    status:'1'
                },
                rules:{
                    name: [
                        { required: true, message: '请输入成本名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    type:[
                        { required: true, message: '请选择成本类型', trigger: 'change' }
                    ],
                    sum:[
                        { required: true, message: '请输入金额', trigger: 'blur' },
                        { pattern: /(^[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,message: '只能输入正数,或小数点后两位' }

                    ],
                    time:[
                        { required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    Single_sum:[
                        { required: true, message: '请输入金额', trigger: 'blur' },
                        { pattern: /(^[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,message: '只能输入正数,或小数点后两位' }
                    ],
                    time2:[
                        { required: true, message: '请选择日期', trigger: 'change' }

                    ]

                },
                changeruleForma:{
                    amount:[
                        { required: true, message: '请输入金额', trigger: 'blur' },
                        { pattern: /(^[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,message: '只能输入正数,或小数点后两位' }
                    ],
                    startTime:[
                        { required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    time2:[
                        { required: true, message: '请选择日期', trigger: 'change' }
                    ],
                },
                formInline:{//查询的查询条件
                    time_onSubmit1:[],//成本录入时间
                    time_produce:[],//成本产生起日期
                    customerName:'',//成本名称
                },
                tableData:[],
                currentPage: 1,
                pageSize:10,
                total:0,
                currentPage1: 1,
                pageSize1:10,
                total1:0,
                centerDialogVisible:false,
                changeruleForm:{},
                changlist:false,
                changlisttableData:[],
                fullscreenLoading: false,
                trackManageListExport:false,
                ProgressBar:0,
                queryStatus:true,
                costInput:false,
                costRecord:false,
                costRecordExport:false,
            }

        },
        created() {
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            // costInput':'成本录入','costRecord':'成本记录','costRecordExport':'成本记录导出','
            // if (jurisdictions[6].menus.length == 37){
                this.costInput = jurisdictions[6].menus[34].choose;
                this.costRecord = jurisdictions[6].menus[35].choose;
                this.costRecordExport = jurisdictions[6].menus[36].choose;
            // }
            //页面首刷
            this.ajax();
        },
        methods:{
            Export(){
                let opt_time;
                if (this.formInline.time_onSubmit1!= null&&this.formInline.time_onSubmit1.length!=0){
                    opt_time = `between ${this.formInline.time_onSubmit1[0]} and ${this.formInline.time_onSubmit1[1]+1000*60*60*24-1}`
                }else{
                    opt_time = ''

                }
                this.$message({
                    showClose: true,
                    message: '正在导出请耐心等待！',
                    type: 'warning'
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
                    "token":this.token,
                    "exportName":"OtherCost",        //-- 导出模块名称
                    "name":this.formInline.name,          // -- 司机编号
                    'project_id':this.$route.query.info,
                    'opt_time':opt_time,
                    'start_time':this.formInline.time_produce!=null&&this.formInline.time_produce.length!=0||this.formInline.time_produce.length!=0?`>=${this.formInline.time_produce[0]}`:'',
                    'end_time':this.formInline.time_produce!=null&&this.formInline.time_produce.length!=0?`<=${this.formInline.time_produce[1]+1000*60*60*24-1}`:''

            })).then(run=>{
                    console.log(run);
                    if(run.body.errcode == 0){
                        this.fullscreenLoading = true;
                        this.queryStatus = false;
                        this.ProgressBar = 0;
                        this.code = run.body.result;
                        this.interval = setInterval(() => {
                            this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportProcess',JSON.stringify({
                                "token":this.token,
                                "id":this.code,
                            })).then(run=>{
                                console.log(run);
                                if(run.body.errcode == 0){
                                    this.ProgressBar  =   parseInt(run.body.result.exportProcess) ;
                                    if (this.ProgressBar == 100){
                                        clearInterval(this.interval);
                                        setTimeout(()=> {
                                            window.location.href = run.body.result.externalRoad;
                                            this.$message({
                                                message: '导出成功',
                                                type: 'success'
                                            });
                                            this.fullscreenLoading = false;
                                            this.queryStatus = true;
                                        },1200)
                                    }
                                }
                            })
                        },1000);
                    }else {
                        this.$message({
                            showClose: true,
                            message: run.body.message,
                            type: 'error'
                        });
                    }
                })
            },
            ajax() {
                let page = JSON.stringify({
                    "token":this.token,
                    'pageNum':this.currentPage,
                    'pageSize':this.pagesize,
                    "projectId":this.$route.query.info,//项目id
                    optStartTime:this.formInline.time_onSubmit1!=null?this.formInline.time_onSubmit1[0]:undefined,
                    optEndTime:this.formInline.time_onSubmit1!=null?this.formInline.time_onSubmit1[1]+1000*60*60*24-1:undefined,
                    startTime:this.formInline.time_produce!=null?this.formInline.time_produce[0]:undefined,
                    endTime:this.formInline.time_produce!=null?this.formInline.time_produce[1]+1000*60*60*24-1:undefined,
                    name:this.formInline.name
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/costs_record', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.tableData = res.body.result.rows;
                        this.total = res.body.result.total;
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].type == 'long') {
                                this.tableData[i].type = '长期'

                            }else{
                                this.tableData[i].type = '临时'
                            }
                            this.tableData[i].time =`${times(this.tableData[i].startTime)} - ${times(this.tableData[i].endTime)}`
                            // this.tableData[i].optTime = times(this.tableData[i].optTime)

                        }
                    }
                })
            },
            onSubmit1() {//查询按钮
                this.currentPage = 1
                this.ajax()
            },
            handleClick(tab){
                console.log(tab);
                if (tab = 'list') {
                    this.ajax();
                }
            },
            onSubmit(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.type == "temp") {
                            this.sum = this.ruleForm.sum;
                            this.startTime = this.ruleForm.time;
                            this.endTime = this.ruleForm.time + 86400000 -1;
                        }else{
                            this.sum = this.ruleForm.Single_sum;

                            this.startTime = this.ruleForm.time2 != null && this.ruleForm.time2 != ''? this.ruleForm.time2[0] : '' ;
                            this.endTime = this.ruleForm.time2 != null && this.ruleForm.time2 != ''? this.ruleForm.time2[1]+86400000-1 : '' ;
                        }
                        let page = JSON.stringify({
                            "token":this.token,
                            "projectId":this.$route.query.info,//项目id
                            "name":this.ruleForm.name,//成本名称
                            "type":this.ruleForm.type,//成本类型 长期—long,临时--temp
                            "amount":this.sum,//单日金额//总金额
                            "startTime":this.startTime,//起始 临时—当日00:00:00
                            "endTime":this.endTime,//结束  临时—当日 23:59:59
                            "remark":this.ruleForm.textarea//备注说明
                        });
                        this.$http.post(this.global.lightningUrl + '/companyv1/finance/other_costs/add_costs', page, {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            console.log(res);
                            if (res.body.errcode == 0) {
                                this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'success'
                                });
                                this.$refs[ruleForm].resetFields();
                            }else {
                                this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'error'
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            onChanges(_in){
                this.centerDialogVisible = true;
                this.changeruleForm = this.tableData[_in];
                this.changeruleForm.time2 = [];
                this.changeruleForm.time2.push(this.tableData[_in].startTime);
                this.changeruleForm.time2.push(this.tableData[_in].endTime);
            },
            changelist(_in){
                this.changlist = true;
                 let page = JSON.stringify({
                     token:this.token,
                     pageSize:this.pageSize1,
                     pageNum:this.currentPage1,
                     costId:this.tableData[_in].id
                 })
                 this.$http.post(this.global.lightningUrl +'/companyv1/finance/query/admin_management/change_record',page,{
                     headers: {
                         'Content-Type': 'application/json;charset=UTF-8'
                     }
                 }).then((res)=>{
                     console.log(res);

                     this.changlisttableData = res.body.result.rows ;
                     this.total1 = res.body.result.total ;
                     for (let i = 0; i < this.changlisttableData.length; i++) {
                         if (this.changlisttableData[i].type == 'long') {
                             this.changlisttableData[i].type = '长期'

                         }else{
                             this.changlisttableData[i].type = '临时'
                         }
                         this.changlisttableData[i].time =`${times(this.changlisttableData[i].startTime)} - ${times(this.changlisttableData[i].endTime)}`
                         // this.changlisttableData[i].optTime = times(this.changlisttableData[i].optTime)
                     }
                     console.log(this.changlisttableData);
                 })
            },
            handleSizeChange(val) {
                this.pageSize = val ;
                this.ajax();
            },
            handleCurrentChange(val) {
                this.currentPage = val ;
                this.ajax();
            },
            handleSizeChange1(val) {
                this.pageSize = val ;
                // this.ajax();
            },
            handleCurrentChange1(val) {
                this.currentPage = val ;
                // this.ajax();
            },
            onchangeok(){
                let page = JSON.stringify({
                    token:this.token,
                    costId : this.changeruleForm.id ,
                    changeAfterAmount : this.changeruleForm.amount,
                    changeStartTime : this.changeruleForm.type=='临时'?this.changeruleForm.startTime: (this.changeruleForm.time2!=null?this.changeruleForm.time2[0]:undefined),
                    changeEndTime :  this.changeruleForm.type=='临时'?this.changeruleForm.startTime+1000*60*60*24-1:(this.changeruleForm.time2!=null?this.changeruleForm.time2[1]+1000*60*60*24-1:undefined),
                    changeRemark : this.changeruleForm.remark ,
                })
                console.log(page);
                this.$http.post(this.global.lightningUrl +'/companyv1/finance/other_costs/change_costs',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.$message({
                            message: res.body.message,
                            type: 'success'
                        });
                        this.centerDialogVisible = false;
                        this.ajax()
                    }else{
                        this.$message.error(res.body.message);

                    }
                })
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },

        },

    }
</script>

<style scoped lang="scss">
    .otherCostlist{
        .el-tabs--border-card{
            height: 90%;
        }
        .header{
            padding-bottom: 20px;
        }
        .el-input{
            width: 228px;
        }
        .el-input__inner{
            position: relative;
        }
        .f_font{
            position: absolute;
            left: 315px;
            color: #606266
        }
        .el-textarea{
            width: 358px;
        }
        .el-textarea__inner{
            min-height:100px;
        }
    }
</style>