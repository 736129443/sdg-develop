<template>
    <div class="main driverApprovalList">
        <div class="header">
            <!--当前位置: 财务管理 > 司机账单 > 调账审批-->
            当前位置: 财务管理 > 司机财务 > 司机调账审批列表
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="管理区">
                <el-select v-model="formInline.regionId" placeholder="请选择所管理区域">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in regionarr" :label='i.name' :value="i.id" :key="i.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="所属分公司">
                <el-select v-model="formInline.filialeId" placeholder="请选择所管理区域">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in link" :label='i.filialeName' :value="i.filialeName" :key="i.filialeId"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="司机编号">
                <el-input v-model.trim="formInline.driverId" onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          placeholder="请输入出车单号"></el-input>
            </el-form-item>
            <el-form-item label="司机姓名">
                <el-input v-model.trim="formInline.driverName" onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          placeholder="请输入司机姓名"></el-input>
            </el-form-item>
            <el-form-item label="审批状态">
                <el-select v-model="formInline.status" placeholder="请选择审批状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="审批中" value="approving"></el-option>
                    <el-option label="已通过" value="accepted"></el-option>
                    <el-option label="未通过" value="rejected"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="reconciliationRecordExport">导出</el-button>
                <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%">
            <!---->
            <el-table-column prop="regionName"  align="center" label="管理区"></el-table-column>
            <el-table-column prop="filialeName" align="center" label="所属分公司"></el-table-column>
            <el-table-column prop="driverId"  align="center" label="司机编号"></el-table-column>
            <el-table-column prop="driverName" align="center" label="司机姓名（手机号）"> </el-table-column>
            <el-table-column prop="currentDeveAdminName" align="center" label="运营专员"> </el-table-column>
            <el-table-column prop="optMoney" align="center" label="调账金额（元）"> </el-table-column>
            <el-table-column prop="reason"  align="center" label="差异原因"> </el-table-column>
            <!--<el-table-column-->
            <!--prop="remark"-->
            <!--align="center"-->
            <!--label="附加说明">-->
            <!--</el-table-column>-->
            <el-table-column prop="optAdminName" align="center" label="申请人"> </el-table-column>
            <el-table-column prop="createTime" align="center" :formatter="dateFormat" label="申请时间"> </el-table-column>
            <el-table-column prop="approvalName" align="center" label="审核人"> </el-table-column>
            <!--<el-table-column-->
            <!--prop="examineOperaterName"-->
            <!--align="center"-->
            <!--label="调账类型">-->
            <!--</el-table-column>-->
            <el-table-column
                    label="审批状态"
                    align="center"
            >
                <template slot-scope="scope">
                    <!--<el-button @click="handleClick(scope.$index)" type="text" size="small"-->
                    <!--:disabled='arr[scope.$index]'>审核-->
                    <!--</el-button>-->
                    <el-button type="text" size="small"
                               v-if="tableData[scope.$index].status == 'accepted'"><span>已通过</span>
                    </el-button>
                    <el-button type="text" size="small"
                               v-if="tableData[scope.$index].status == 'rejected'">未通过
                    </el-button>
                    <el-button type="text" size="small"
                               v-if="(tableData[scope.$index].status == 'approving'&&tableData[scope.$index].currentApproval == true)">审核
                    </el-button>
                    <el-button type="text" size="small"
                               v-if="(tableData[scope.$index].status == 'approving'&&tableData[scope.$index].currentApproval == false)">审核中
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="查看审批意见"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-button type="text" @click="approvalDetails =true,onapprovalDetails(scope.$index)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--<td style="color:blue;cursor:pointer;"  @click="dialogFormVisible = true">-->
        <!--去审批-->
        <!--</td>-->
        <!--<el-dialog title='司机调账审批' center  :visible.sync="dialogFormVisible" class="dialog" :before-close="handleClose">-->
            <!--<div class="dialog_top">-->
                <!--<el-row>-->
                    <!--<el-col :span="8">分公司名称：{{link.filialeName}}</el-col>-->
                    <!--<el-col :span="8">项目名称：{{link.customerName}}</el-col>-->
                    <!--<el-col :span="8">出车单号：{{link.trackId}}</el-col>-->
                <!--</el-row>-->
                <!--<el-row>-->
                    <!--<el-col :span="8">配送日期：{{link.startTime| dateFrm}}</el-col>-->
                    <!--<el-col :span="8">司机姓名：{{link.driverName}}</el-col>-->
                <!--</el-row>-->
            <!--</div>-->
            <!--<div class="dialog_top">-->
                <!--<el-row>-->
                    <!--<el-col :span="8">基础运费：{{link.baseTransportPrice}}</el-col>-->
                    <!--<el-col :span="8">红包：{{link.reaPacketPrice}}</el-col>-->
                    <!--&lt;!&ndash;<el-col :span="8">畅心保金额：{{link.insurance}}</el-col>&ndash;&gt;-->
                <!--</el-row>-->
                <!--<el-row>-->
                    <!--<el-col :span="8">账前总金额：{{link.optBeforePrice}}</el-col>-->
                    <!--<el-col :span="8">调账金额：{{link.optMoney}}</el-col>-->
                    <!--<el-col :span="8">调账后总金额：{{link.optAfterPrice}}</el-col>-->
                <!--</el-row>-->
            <!--</div>-->
            <!--<div class="dialog_top">-->
                <!--<el-row>-->
                    <!--<el-col :span="24">调账原因：{{link.reason}}</el-col>-->
                <!--</el-row>-->
            <!--</div>-->
            <!--<div class="dialog_top">-->
                <!--<el-row>-->
                    <!--<el-col :span="24">-->
                        <!--审批意见：-->
                        <!--<el-radio v-model="radio" label="accepted">同意</el-radio>-->
                        <!--<el-radio v-model="radio" label="rejected">退回</el-radio>-->
                        <!--<br>-->
                        <!--<el-input-->
                                <!--type="textarea"-->
                                <!--:rows="2"-->
                                <!--placeholder="请输入内容"-->
                                <!--resize="none"-->
                                <!--v-model="textarea">-->
                        <!--</el-input>-->
                    <!--</el-col>-->
                <!--</el-row>-->
            <!--</div>-->
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button type="primary" @click="onSubmit0" >提交</el-button>-->
                <!--<el-button   @click="dialogFormVisible = false;radio='accepted';textarea=''" >取消</el-button>-->
            <!--</span>-->
        <!--</el-dialog>-->

        <!--审批查看详情-->
        <el-dialog
                title="查看审批详情"
                :visible.sync="approvalDetails"
                width="30%"
                min-width = '650px'
        >
            <div style="width: 100%;padding: 0 20px">
                司机姓名：{{approval_Customer.driverName}} <br>
                申请人：&nbsp;&nbsp;&nbsp;{{approval_Customer.optAdminName}}<br>
                申请时间：{{approval_Customer.createTime | dateFrmHm}}<br><br>
                <div v-for="i in approver" style="width: 100%;padding: 20px 0 0 0 " >
                    审批人：&nbsp;&nbsp;&nbsp;{{i.adminName}} <br>
                    审批意见：<span v-if="i.opinion">{{i.opinion}}</span><br>
                    申请时间：<span v-if="i.createTime">{{i.createTime|dateFrmHm}}</span>
                </div>

            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="approvalDetails = false">取 消</el-button>
                <el-button type="primary" @click="approvalDetails = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 50]"
                :current-page.sync="currentPage1"
                :page-size="pagesize"
                layout="total,prev, pager, next,sizes"
                :total="total">
        </el-pagination>
    </div>
</template>
<script>
    import moment from 'moment'
    import {Export} from "../../js/export";
    export default {
        data() {
            return {
                //遮罩层
                fullscreenLoading: false,
                code:'',
                //导出
                queryStatus:true,
                //进度条
                ProgressBar:0,
                aa: true,
                token: '',
                total: 0,
                currentPage1: 1,
                pagesize: 10,
                formInline: {
                    driverId: '',
                    driverName: '',
                    status: '',
                    optAdminName: '',
                    time: '',
                    driverType: '',
                    teamName: '',
                },
                dialogFormVisible: false,
                form: {
                    radion: 'true',
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                tableData: [],
                // status:false,
                arr: [],
                link: [],
                approvalDetails: false,
                approval_Customer:[],
                approver:[],
                radio:'accepted',
                textarea:'',
                regionarr:[],
                reconciliationRecordExport:false,
                region_name:''
            };
        },
        created() {
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            console.log(jurisdictions[7].menus[29]);
            // if (jurisdictions[7].menus.length == 30 ) {
                this.reconciliationRecordExport = jurisdictions[7].menus[29].choose
            // }
            let page1 = JSON.stringify({
                token: this.token
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/area',page1 , {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            } ).then((res)=>{
                this.link = res.body.result;
            })

            this.$http.post( this.global.lightningUrl + '/companyv1/userManage/region/all_region',JSON.stringify({
                'token':this.token,
            })).then(run=>{
                this.regionarr = run.body.result
            })

            this.data()
        },

        methods: {
            //导出
            Export() {
                for (var i in this.regionarr) {
                    if (this.formInline.regionId == this.regionarr[i].id) {
                        this.region_name = this.regionarr[i].name;
                    }
                }
                let page = JSON.stringify({
                    token: this.token,
                    "exportName":"driverTotalAdjust",
                    "tt.region_name":this.region_name, //管理区
                    "tt.filiale_name":this.formInline.filialeId, //分公司
                    "tt.driver_id":this.formInline.driverId, //司机id
                    "tt.driver_name":this.formInline.driverName, //司机姓名
                    "tt.status":this.formInline.status  //审批状态
                });
                Export(this,this.queryStatus,this.ProgressBar,this.fullscreenLoading,this.code,page)
            },
            // 司机
            ajax() {
                if (this.formInline.time == undefined || this.formInline.time == null){
                    this.formInline.time = []
                }
                let page = JSON.stringify({
                    token: this.token,
                    pageNum: this.currentPage1 ,
                    pageSize: this.pagesize,
                    driverId: this.formInline.driverId,
                    driverName: this.formInline.driverName,
                    status: this.formInline.status,
                    commitName : this.formInline.optAdminName,
                    regionId:this.formInline.regionId,
                    filialeName:this.formInline.filialeId
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/driverbillwithouttrackapprovallist', page, {
                    // this.$http.post('http://192.168.50.145:7031/company/account/accoutlist',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    if (res.body.result.rows !== undefined) {
                        this.total = res.body.result.total;
                        this.tableData = res.body.result.rows;
                        for (let i = 0; i < this.tableData.length; i++) {
                            this.arr.push(false);
                            this.tableData[i].driverName = `${this.tableData[i].driverName}(${this.tableData[i].phone})`
                            if (this.tableData[i].status == 'audit') {
                                this.arr[i] = false;
                                this.tableData[i].status = '审批中';
                                // this.status = true;
                            } else if (this.tableData[i].status == 'pass') {
                                this.arr[i] = true;
                                this.tableData[i].status = '审批通过';
                            } else if (this.tableData[i].status == 'notpass') {
                                this.arr[i] = true;
                                this.tableData[i].status = '审批未通过';
                            }
                            ;
                            this.tableData[i].outTime = Number(this.tableData[i].outTime);
                            if (this.tableData[i].driverType == 'team') {
                                this.tableData[i].driverType = '车队司机'
                            } else if (this.tableData[i].driverType == 'company') {
                                this.tableData[i].driverType = '运输公司'
                            } else if (this.tableData[i].driverType == 'personal') {
                                this.tableData[i].driverType = '个体司机'
                            }
                            // 司机类型 driverType ：车队司机 team，运输公司 company，个体司机 personal'

                        }
                        ;
                    } else {
                    }
                })
            },
            data() {
                this.ajax()
            },
            handleClick(_index) {
                this.dialogFormVisible = true;
                this.link = this.tableData[_index];
            },
            onSubmit() {
                this.currentPage1 = 1;
                this.ajax()
            },
            onSubmit0() {

                let page = JSON.stringify({
                    token: this.token,
                    itemId :this.link.trackId,
                    state : this.radio,
                    opinion: this.textarea,
                });
                console.log(page);
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/driverbillapproval', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.$message({
                            message: res.body.message,
                            type: 'success'
                        });
                        this.data();
                        this.dialogFormVisible = false;
                        this.radio = 'accepted';
                        this.textarea='' ;
                    }
                })
            },
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            handleCurrentChange(val) {
                this.currentPage1 = val;
                this.ajax()
            },
            handleSizeChange(val) {
                this.pagesize = val ;
                this.ajax();
            },
            onapprovalDetails(_index){
                console.log(this.tableData[_index].trackId);
                this.approval_Customer = this.tableData[_index] ;
                let page = JSON.stringify({
                    token:this.token,
                    id:this.tableData[_index].trackId,
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/finance/driverbillwithouttrackapprovaldetail',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    this.approver = res.body.result
                    for (let i = 0; i <this.approver.length; i++) {
                        if (this.approver[i].state == undefined){
                            this.approver[i].state = '';

                        } else if (this.approver[i].state == 'accepted') {
                            this.approver[i].state = '同意'
                        }else{
                            this.approver[i].state = '退回'

                        }
                    }
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.radio = 'accepted';
                        this.textarea='' ;
                        done();
                    })
                    .catch(_ => {});
            }
        },
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD")
            },
            dateFrmHm: function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm")
            }
        }
    }
</script>
<style lang="scss" scoped>
    .main {
        padding: 30px;
        .el-form {
            margin-top: 20px;
        }
        .from2 > .el-form-item > .el-form-item__label {
            font-weight: 700;
            font-size: 16px;
        }
        .dialog {
            min-width: 800px;
        }
        .dialog .el-form-item {
            margin-right: 30px;
        }
        .mit {
            text-align: center;
            margin-left: 40%;
        }
        .dialog_top{
            width: 100%;
            line-height: 40px;
            background-color: #f4f5fa;
            margin-bottom:20px;
            padding: 20px 35px;
            box-sizing: border-box;
            .el-textarea{
                width: 80%;
                margin-left: 70px;
            }
        }
    }
</style>


