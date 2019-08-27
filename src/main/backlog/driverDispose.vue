<template>
    <div class="main">
        <div class="header">
            <!--当前位置: 财务管理 > 司机账单 > 调账审批-->
            当前位置: 待办事项 > 司机调账审批列表
        </div>
        <h2 style="margin-top:20px;font-weight:400 ">审批列表</h2>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="出车单号">
                <el-input v-model.trim="formInline.driverId" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入司机编号"></el-input>
            </el-form-item>
            <el-form-item label="申请人">
                <el-input v-model.trim="formInline.optAdminName" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入申请人"></el-input>
            </el-form-item>
            <el-form-item label="司机姓名">
                <el-input v-model.trim="formInline.driverName" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入司机名称"></el-input>
            </el-form-item>
            <el-form-item label="审批状态">
                <el-select v-model="formInline.status"  placeholder="请选择审批状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="审批中" value="audit"></el-option>
                    <el-option label="已通过" value="pass"></el-option>
                    <el-option label="未通过" value="notpass"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出车日期">
                <el-date-picker
                        v-model="formInline.time"
                        type="daterange"
                        value-format="timestamp"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="trackId"
                    align="center"
                    label="出车单号">
            </el-table-column>
            <el-table-column
                    prop="startTime"
                    align="center"
                    :formatter="dateFormat"
                    label="出车日期">
            </el-table-column>
            <el-table-column
                    prop="driverName"
                    align="center"
                    label="司机姓名">
            </el-table-column>
            <el-table-column
                    prop="optBeforePrice"
                    align="center"
                    label="调账前总金额（元）">
            </el-table-column>
            <el-table-column
                    prop="optMoney"
                    align="center"
                    label="调账金额（元）">
            </el-table-column>
            <el-table-column
                    prop="optAfterPrice"
                    align="center"
                    label="调账后总金额（元）">
            </el-table-column>
            <el-table-column
                    prop="reason"
                    align="center"
                    label="差异原因">
            </el-table-column>
            <el-table-column
                    prop="optAdminName"
                    align="center"
                    label="申请人">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    align="center"
                    :formatter="dateFormat"
                    label="申请时间">
            </el-table-column>
            <el-table-column
                    prop="approvalName"
                    align="center"
                    label="审核人">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="examineOperaterName"-->
            <!--align="center"-->
            <!--label="调账类型">-->
            <!--</el-table-column>-->
            <el-table-column
                    fixed="right"
                    label="审批状态"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.$index)" type="text" size="small" :disabled='arr[scope.$index]' >审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--<td style="color:blue;cursor:pointer;"  @click="dialogFormVisible = true">-->
        <!--去审批-->
        <!--</td>-->
        <el-dialog title="审批意见" :visible.sync="dialogFormVisible" class="dialog">
            <span style="font-weight:700;font-size:16px; margin-top:10px;">审批信息  </span>

            <el-form :inline="true" style="margin-top:-23px;margin-left: 90px;">
                <el-form-item label="司机编号：">
                    {{link.driCusId}}
                </el-form-item>
                <el-form-item label="司机姓名（手机号）：">
                    {{link.driCusName}}
                </el-form-item>
                <el-form-item label="申请人：">
                    {{link.optAdminName}}
                </el-form-item>
                <el-form-item label="申请时间：">
                    {{link.createTime | dateFrm}}
                </el-form-item>
                <el-form-item label="出车费用：">
                    {{link.optBeforePrice}}

                </el-form-item>
                <el-form-item label="调整金额：">
                    {{link.optMoney}}
                </el-form-item>
                <el-form-item label="调整后金额：">
                    {{link.optAfterPrice}}

                </el-form-item>
                <el-form-item label="差异原因：">
                    {{link.reason}}
                </el-form-item>
                <!--<el-form-item label="附加说明：">-->
                <!--{{link.commitReason   }}-->
                <!--</el-form-item>-->
                <el-form-item v-if="aa=false" label="隐藏">
                    {{link.id }}
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="80px" class="from2">
                <el-form-item label="审批意见" prop="radion">
                    <el-radio-group v-model=" form.radion">
                        <el-radio   label="true" value="true">同意</el-radio>
                        <el-radio   label="false" value="false">退回</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="审批意见" prop="textarea3">
                    <el-input
                            type="textarea"
                            resize="none"
                            placeholder="请输入内容"
                            v-model="form.textarea3">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit0('form')" class="mit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="pagesize"
                layout="total,prev, pager, next,sizes"
                :total="total">
        </el-pagination>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                aa:true,
                token:'',
                total:0,
                currentPage1:1,
                pagesize:10,
                formInline: {
                    driverId:'',
                    driverName:'',
                    status:'',
                    optAdminName:'',
                    time:'',
                    driverType:'',
                    teamName:'',
                },
                dialogFormVisible: true,
                form: {
                    radion:'true',
                    resource: '',
                    desc: ''
                },
                form: {
                    radion: [
                        { required: true, message: '请选择是否同意审批', trigger: 'change' }
                    ],
                    textarea3: [
                        { required: true, message: '请填写申请原因', trigger: 'blur' }
                    ]
                },
                formLabelWidth: '120px',
                tableData:[],
                // status:false,
                arr:[],
                link:[],
            };
        },
        created(){
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.data()
        },
        methods: {
            // 司机
            ajax(page){
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/driverbillapprovallist',page,{
                    // this.$http.post('http://192.168.50.145:7031/company/account/accoutlist',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    if ( res.body.result.rows !== undefined){
                        this.total = res.body.result.total;
                        this.tableData = res.body.result.rows;
                        for (let i = 0 ; i < this.tableData.length; i++){
                            this.arr.push(false);
                            if (this.tableData[i].status =='audit'){
                                this.arr[i] = false;
                                this.tableData[i].status = '审批中';
                                // this.status = true;
                            }else if(this.tableData[i].status == 'pass'){
                                this.arr[i] = true;
                                this.tableData[i].status = '审批通过';
                            }else if(this.tableData[i].status =='notpass'){
                                this.arr[i] = true;
                                this.tableData[i].status = '审批未通过';
                            };
                            this.tableData[i].outTime = Number(this.tableData[i].outTime);
                            if (this.tableData[i].driverType =='team') {
                                this.tableData[i].driverType = '车队司机'
                            }else if (this.tableData[i].driverType =='company') {
                                this.tableData[i].driverType = '运输公司'
                            }else if (this.tableData[i].driverType =='personal') {
                                this.tableData[i].driverType = '个体司机'
                            }
                            // 司机类型 driverType ：车队司机 team，运输公司 company，个体司机 personal'

                        };
                    }else {}
                })
            },
            data(){
                let page = JSON.stringify({
                    token: this.token,
                    pageNum:this.currentPage1,
                    pageSize:this.pagesize,
                    "backlogType":this.$route.query.status == 'backlog'?'backlog': "history"
                });
                this.ajax(page)
            },
            handleClick(_index){
                this.dialogFormVisible = true;
                this.link = this.tableData[_index];

            },
            onSubmit() {
                if (this.formInline.time == undefined || this.formInline.time == null){
                    this.formInline.time = []
                }
                let page = JSON.stringify({
                    token: this.token,
                    pageNum:this.currentPage1=1,
                    pageSize:this.pagesize,
                    driverId : this.formInline.driverId,
                    driverName : this.formInline.driverName,
                    status : this.formInline.status,
                    optAdminName : this.formInline.optAdminName,
                    startTime : this.formInline.time[0],
                    endTime : this.formInline.time[1]+86400000-1,
                    driverType:this.formInline.driverType,
                    teamName:this.formInline.teamName,
                    "backlogType":this.$route.query.status == 'backlog'?'backlog': "history"
                });
                console.log(page);
                this.ajax(page)
            },
            onSubmit0(){

            },
            //编辑窗口的审核按钮
            adopt(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let isPass = Boolean(this.form.radion);
                        // console.log(isPass);
                        let page = JSON.stringify({
                            token: this.token,
                            id: this.link.id,
                            trackId : this.link.trackId,
                            // isPass : JSON.parse(this.form.radion),
                            isPass :this.form.radion,
                            approvalComments : this.form.textarea3 ,
                        });
                        console.log(page);
                        this.$http.post( this.global.lightningUrl + '/company/finance/adjust',page,{
                            //     this.$http.post( 'http://192.168.50.145:7035/finance/driver/adjustmentExamine',page,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res)=>{
                            console.log(res);
                            if (res.body.errcode==0){
                                this.$message({
                                    message: res.body.message,
                                    type: 'success'
                                });
                                this.data();
                                this.dialogFormVisible= false;
                            }
                        })

                    }
                });
            },

            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            handleCurrentChange(val){
                this.pageNum = val;
                let page = JSON.stringify({
                    token: this.token,
                    pageNum:this.currentPage1,
                    pageSize:this.pagesize,
                    driverId : this.formInline.driverId,
                    driverName : this.formInline.driverName,
                    status : this.formInline.status,
                    optAdminName : this.formInline.optAdminName,
                    startTime : this.formInline.time[0],
                    endTime : this.formInline.time[1],
                    "backlogType":this.$route.query.status == 'backlog'?'backlog': "history"
                });
                this.ajax(page)

            },
            handleSizeChange(val) {
                this.pagesize = val ;
                let page = JSON.stringify({
                    token: this.token,
                    pageNum:this.currentPage1,
                    pageSize:this.pagesize,
                    driverId : this.formInline.driverId,
                    driverName : this.formInline.driverName,
                    status : this.formInline.status,
                    optAdminName : this.formInline.optAdminName,
                    startTime : this.formInline.time[0],
                    endTime : this.formInline.time[1],
                    "backlogType":this.$route.query.status == 'backlog'?'backlog': "history"
                });
                this.ajax(page)
            },

        },
        filters:{
            dateFrm:function (el) {
                return moment(el).format("YYYY-MM-DD")
            }
        }
    }
</script>
<style lang="scss" scoped>
    .main{
        padding: 30px;
        .el-form {
            margin-top: 20px;
        }
        .from2 > .el-form-item> .el-form-item__label {
            font-weight:700;
            font-size:16px;
        }
        .dialog{
            min-width: 800px;
        }
        .dialog .el-form-item{
            margin-right :30px;
        }
        .mit{
            text-align: center;
            margin-left: 45%;
        }
    }
</style>
