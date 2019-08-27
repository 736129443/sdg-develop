<template>
    <div class="main">
        <div class="header">
            <p> 当前位置：财务管理 > 司机提现管理</p>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="所属分公司">
                <el-select v-model="formInline.filialeId" placeholder="请选择所属分公司">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in link" :label='i.filialeName' :value="i.filialeId"
                               :key="i.filialeId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="司机编号">
                <el-input v-model.trim="formInline.driverId"
                          placeholder="请输入司机编号"></el-input>
            </el-form-item>
            <el-form-item label="司机姓名">
                <el-input v-model.trim="formInline.driverName"
                          placeholder="请输入司机姓名"></el-input>
            </el-form-item>
            <el-form-item label="司机电话">
                <el-input v-model.trim="formInline.driverPhone"
                          placeholder="请输入司机电话"></el-input>
            </el-form-item>
            <!--<el-form-item label="车队长">-->
            <!--<el-input v-model.trim="formInline.leaderName" ="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入车队长"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="所属车队">
                <el-input v-model.trim="formInline.teamName"
                          placeholder="请输入所属车队"></el-input>
            </el-form-item>
            <!--<el-form-item label="车队长">-->
            <!--<el-input v-model="formInline.captain" placeholder="请输入车队长"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="所属车队">-->
            <!--<el-input v-model="formInline.fleet" placeholder="请输入司机电话"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="提现状态">
                <el-select v-model="formInline.cashStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="失败" value="fail"></el-option>
                    <el-option label="成功" value="success"></el-option>
                    <el-option label="后台处理中" value="auditing"></el-option>
                    <el-option label="等待第三方处理" value="audited"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="申请时间">
                <el-date-picker
                    v-model="formInline.time"
                    type="daterange"
                    range-separator="至"
                    value-format="timestamp"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="审批时间">
                <el-date-picker
                    v-model="formInline.time0"
                    type="daterange"
                    range-separator="至"
                    value-format="timestamp"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <!--<el-form-item label="审批时间">-->
            <!--<el-date-picker-->
            <!--v-model="formInline.time1"-->
            <!--type="daterange"-->
            <!--range-separator="至"-->
            <!--start-placeholder="开始日期"-->
            <!--end-placeholder="结束日期">-->
            <!--</el-date-picker>-->
            <!--</el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <!--<el-button type="primary" @click="onSubmit_Dc">导出</el-button>-->
                <!--<el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading"-->
                           <!--element-loading-spinner="none" v-if="driverWithdrawalsManagementExport">导出-->
                <!--</el-button>-->
                <el-button type="primary" @click="Export()" v-if="driverWithdrawalsManagementExport">导出
                </el-button>

                <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7"
                             v-if="queryStatus == true? false:true"
                             style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
            </el-form-item>
        </el-form>
        <div class="conter_size">
            提现总金额 : <span style="color:blue;">{{this.accountInfo.forwardTotal}}</span>&nbsp;&nbsp;
            审批通过金额 : <span style="color:blue;">{{ this.accountInfo.auditPassTotal}}</span>&nbsp;&nbsp;
            审批未通过金额 : <span style="color:blue;">{{ this.accountInfo.auditFailTotal}}</span>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="cashId"
                label="提现编号"
                fixed="left"
                width="120"
                align="center">
                <template slot-scope="scope">
                    <el-button :disabled="(tableData[scope.$index].cashFlag == null || JSON.parse(tableData[scope.$index].cashFlag)[0].customerId == -1 || JSON.parse(tableData[scope.$index].cashFlag)[0].customerId == -2)" type="text" @click="CashWithdrawal(scope.row)">{{ tableData[scope.$index].cashId }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="driverId"
                label="司机编号"
                width="128"
                align="center">
            </el-table-column>
            <el-table-column
                prop="cashFlag"
                :formatter = analysis
                label="提现类别"
                align="center"
            >
            </el-table-column>
            <el-table-column
                width="110"
                prop="filialeName"
                label="所属分公司"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="driverName"
                label="司机姓名"
                align="center">
            </el-table-column>
            <el-table-column
                prop="driverPhone"
                width="120"
                label="司机电话"
                align="center">
            </el-table-column>
            <el-table-column
                prop="cashBankName"
                width="110"
                label="开户行"
                align="center">
            </el-table-column>
            <el-table-column
                prop="cashBankCardNo"
                label="银行卡号"
                align="center">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="leader"-->
            <!--label="车队长"-->
            <!--align="center">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="regionName"-->
            <!--label="管理区"-->
            <!--align="center"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="driverPlateNum"-->
            <!--label="车牌号"-->
            <!--align="center">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="driverVehicleType"-->
            <!--label="车型"-->
            <!--align="center">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="driverUsualRunArea"-->
            <!--label="常跑城市"-->
            <!--align="center">-->
            <!--</el-table-column>-->
            <el-table-column
                prop="teamName"
                label="所属车队"
                align="center">
            </el-table-column>
            <el-table-column
                prop="deveAdminName"
                label="运营专员"
                align="center">
            </el-table-column>
            <!--<el-table-column-->
                <!--prop="lastDeliver"-->
                <!--label="最后出车时间"-->
                <!--:formatter="dateFormat"-->
                <!--width="150"-->
                <!--align="center">-->
            <!--</el-table-column>-->
            <el-table-column
                prop="cashMoney"
                width="120"
                label="申请提现金额(元)"
                align="center">
            </el-table-column>
            <el-table-column
                prop="cashCharge"
                label="手续费(元)"
                align="center">
            </el-table-column>
            <el-table-column
                width="110"
                prop="availaccount"
                label="可提现余额(元)"
                align="center">
            </el-table-column>
            <el-table-column
                prop="cashTime"
                label="申请时间"
                width="150"
                :formatter="dateFormatHm"
                align="center">
            </el-table-column>
            <el-table-column
                prop="approveAdminName"
                label="审批人"
                align="center">
            </el-table-column>
            <el-table-column
                prop="auditFinishTime"
                label="审批时间"
                width="150"
                :formatter="dateFormatHm"
                align="center">
            </el-table-column>
            <el-table-column
                prop="cashStatus"
                label="提现状态"
                align="center">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="审批状态"
                v-if="DriverApproval==true?true:false"
                align="center">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.$index)" type="text" size="small"
                               v-if="tableData[scope.$index].approverStatus == 'approving'?true:false">去审批
                    </el-button>
                    <!--未通过    已通过-->
                    <el-popover
                        v-if="tableData[scope.$index].approverStatus == 'rejected'?true:false"
                        placement="right"
                        width="360"
                        trigger="hover">
                        <el-form label-width="80px">
                            <el-form-item label="退回原因">
                                <el-input
                                    type="textarea"
                                    :rows="3"
                                    disabled
                                    v-model="tableData[scope.$index].opinion">
                                </el-input>
                            </el-form-item>

                            <el-form-item label="退回时间">
                                <el-date-picker
                                    v-model="tableData[scope.$index].auditFinishTime"
                                    disabled
                                    type="datetime"
                                    value-format="timestamp"
                                    :formatter="dateFormatHm"
                                    default-time="12:00:00">
                                </el-date-picker>
                            </el-form-item>
                        </el-form>
                        <el-button type="text" size="small" slot="reference">未通过</el-button>
                    </el-popover>

                    <el-button type="text" size="small" disabled
                               v-if="(tableData[scope.$index].approverStatus == 'accepted')?true:false">已通过
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            :page-sizes="[10, 20, 30, 50]"
            layout="total,prev, pager, next,sizes,jumper"
            :total="total">
        </el-pagination>
        <!--去审批  弹出-->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            center
            :before-close="handleClose">
            <el-form ref="approval" class="demo-ruleForm" :model="approval" label-width="80px" :rules="rules">
                <!--<el-form-item label="审批人" prop="status">-->
                <!--<el-radio v-model="approval.status" label="accepted">同意</el-radio>-->
                <!--<el-radio v-model="approval.status" label="rejected">退回</el-radio>-->
                <!--</el-form-item>-->
                <el-form-item label="审批人" prop="status">
                    <el-radio-group v-model="approval.status">
                        <el-radio label="accepted">同意</el-radio>
                        <el-radio label="rejected">退回</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="退回原因" prop="unAllowOption"
                              :rules="approval.status == 'rejected' ? rules.sequenceCode:[{ required: false, message: '请选择审批人', trigger: 'change' }] ">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="approval.unAllowOption">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('approval')" :loading="onloading">提 交</el-button>
            </span>
        </el-dialog>
        <!---->
        <el-dialog
            title=""
            :visible.sync="dialogVisibles"
            width="70%"
            :before-close="handleCloses">
            <div>
                <div style="padding:40px 0;">
                    <el-form :inline="true" :model="formInlines" class="demo-form-inline">
                        <el-form-item label="出车单编号">
                            <el-input v-model.trim="formInlines.id3" placeholder="出车单编号"></el-input>
                        </el-form-item>
                        <el-form-item label="配送日期">
                            <el-date-picker
                                width="110"
                                v-model="formInlines.time"
                                type="daterange"
                                value-format="timestamp"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="query">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div>
                <template style="text-align: center">
                    <el-table
                        align="center"
                        :data="tableDatas"
                        style="width: 100%">
                        <el-table-column
                            prop="filialeName"
                            label="分公司"
                            width="150"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="customerName"
                            label="项目名称"
                            width="150"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="项目类型"
                            width="150"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="trackId"
                            label="出车单编号"
                            width="160"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="driverName"
                            label="司机名称"
                            width="150"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="teamName"
                            label="所属车队"
                            width="150"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="transportsPrice"
                            label="运单价格"
                            width="150"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="startTime"
                            :formatter="dateFormatHm"
                            label="配送日期"
                            width="180"
                            align="center">
                        </el-table-column>
                    </el-table>
                </template>
                <el-pagination
                    @current-change="handleCurrentChanges"
                    :current-page.sync="currentPages"
                    :page-size="pageSizes"
                    @size-change="handleSizeChanges"
                    :page-sizes="[10, 20, 30, 50]"
                    layout="total,prev, pager, next,sizes,jumper"
                    :total="totals">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import moment from 'moment'
    import {openPostWindow} from '../../js/report.js'
    export default {
        data() {
            return {
                tableDatas:[],
                formInlines:{
                    id3:'',
                    time:[],
                },
                link: [],
                formInline: {
                    driverId: '',
                    driverName: '',
                    driverPhone: '',
                    captain: '',
                    fleet: '',
                    cashStatus: '',
                    approvalstatus: '',
                    time: [],
                    time0: [],
                },
                accountInfo: [],
                tableData: [],
                token: '',
                total: 0,
                currentPage: 1,
                pageSize: 10,
                totals: 0,
                currentPages: 1,
                pageSizes: 10,
                dialogVisible: false,
                dialogVisibles: false,
                row:{},
                approval: {
                    status: 'accepted',
                    unAllowOption: '',
                },
                rules: {
                    status: [
                        {required: true, message: '请选择审批人', trigger: 'change'}
                    ],
                    unAllowOption: [
                        {required: true, message: '请输入内容', trigger: 'change'},
                        {
                            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]*$/,
                            message: '输入内容不规范'
                        },
                    ]
                },
                hoverformInline: {
                    option: '',
                    auditFinishTime: '',
                },
                driverCashId: '',
                onloading: false,
                DriverApproval: false,
                driverWithdrawalsManagementExport: false,
                //导出
                queryStatus: true,
                fullscreenLoading: false,
                trackManageListExport: false,
//进度条
                ProgressBar: 0,

            }
        },
        created() {
            let token = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = token.result.token;
            this.data();
            let page1 = JSON.stringify({
                token: this.token
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/area', page1, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res) => {
                this.link = res.body.result;
            })
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.driverWithdrawalsManagementExport = jurisdictions[7].menus[6].choose;
            this.DriverApproval = jurisdictions[7].menus[25].choose;
        },
        methods: {
            analysis(row) {
                if (JSON.parse(row.cashFlag) == null){
                    return '-'
                }else if (JSON.parse(row.cashFlag)[0].customerId == -1 ) {
                    return '补贴'
                }else if (JSON.parse(row.cashFlag)[0].customerId == -2) {
                    return '其他'
                }else {
                    return '运费'
                }
            },
            query() {
                this.currentPages = 1;
                this.CashWithdrawal(this.row);
            },
            CashWithdrawal(row) {
                // if (row.cashFlag == null || JSON.parse(row.cashFlag)[0].customerId == -1 || JSON.parse(row.cashFlag)[0].customerId == -2) {
                //     this.$message({
                //         showClose: true,
                //         message: '暂无数据！',
                //         type: 'warning'
                //     });
                //       return
                // };
                this.row = row;
                this.dialogVisibles = true;
                // console.log(row);
                let page = JSON.stringify({
                    token:this.token,
                    conditionStr3 : 'detail',
                    id1:this.row.cashId,
                    id3:this.formInlines.id3,//出车单编号
                    id4:this.formInlines.time == null ? '' : this.formInlines.time[0],
                    id5:this.formInlines.time == null ? '' : this.formInlines.time[1]+86400000-1,//成对出现,标示当前发车时间
                    pageNum: this.currentPages,
                    pageSize: this.pageSizes,
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/cash_record_detail',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res.body.result);
                    if (res.body.errcode == 0) {
                        this.tableDatas = res.body.result.rows;
                        this.totals = res.body.result.total;
                    }
                });
            },
            //导出
            Export() {
                let page = JSON.stringify({
                    token: this.token,
                    pageNum: this.currentPage = 1,
                    pageSize: this.pageSize,
                    id: this.formInline.driverId,
                    name: this.formInline.driverName,
                    phone: this.formInline.driverPhone,
                    status: this.formInline.cashStatus,
                    teamName: this.formInline.teamName,
                    cashBeginTime: this.formInline.time[0],
                    cashEndTime: this.formInline.time[1] + 86400000 - 1,
                    auditStartTime: this.formInline.time0[0],
                    auditEndTime: this.formInline.time0[1] + 86400000 - 1,
                    filialeId: this.formInline.filialeId,
                });
                var exportLink = this.global.lightningUrl + '/companyv1/paymentCenter/report/export/driver_cash_record';
                openPostWindow(exportLink,page);
            },
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            dateFormatHm: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            data() {
                console.log(this.token);
                let page = JSON.stringify({
                    token: this.token,
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                });
                console.log(page);
                this.ajax(page)
            },
            ajax(page) {
                // this.$http.post('http://192.168.50.52:7009/payment/getForwardList',page,{
                this.$http.post(this.global.lightningUrl + '/companyv1/paymentCenter/payment/getForwardList', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res.body.result);

                    if (res.body.result == null) {
                        this.tableData = [];
                        this.accountInfo.auditFailTotal = 0;
                        this.accountInfo.auditPassTotal = 0;
                        this.accountInfo.forwardTotal = 0;
                        this.total = 0

                        // auditFailTotal:审核未通过
                        // auditPassTotal:审核通过
                        // forwardTotal:总金额
                    } else {
                        this.accountInfo.forwardTotal = res.body.result.forwardTotal;
                        this.accountInfo.auditPassTotal = res.body.result.auditPassTotal;
                        this.accountInfo.auditFailTotal = res.body.result.auditFailTotal;
                        this.total = res.body.result.total;
                        this.tableData = res.body.result.rows;
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].driverVehicleType != '' && this.tableData[i].driverVehicleType != null && this.tableData[i].driverVehicleType != undefined) {
                                this.tableData[i].driverVehicleType = JSON.parse(this.tableData[i].driverVehicleType).name + ' '
                                    + JSON.parse(this.tableData[i].driverVehicleType).isElectric + ' '
                                    + JSON.parse(this.tableData[i].driverVehicleType).isTailBoard + ' '
                                    + JSON.parse(this.tableData[i].driverVehicleType).length + ' '
                                    + JSON.parse(this.tableData[i].driverVehicleType).isCertificate + ' '
                                    + JSON.parse(this.tableData[i].driverVehicleType).isCold;
                            } else {
                                this.tableData[i].driverVehicleType = '';
                            }
                            if (this.tableData[i].auditFinishTime == null) {
                                this.tableData[i].auditFinishTime = undefined
                            } else {
                                this.tableData[i].auditFinishTime = Number(this.tableData[i].auditFinishTime)

                            }
                            // this.tableData[i].auditFinishTime = Number(this.tableData[i].auditFinishTime)
                            if (this.tableData[i].cashStatus == 'auditing') {
                                this.tableData[i].cashStatus = '后台处理中'
                            } else if (this.tableData[i].cashStatus == 'fail') {
                                this.tableData[i].cashStatus = '失败'
                            } else if (this.tableData[i].cashStatus == 'success') {
                                this.tableData[i].cashStatus = '成功'
                            } else if (this.tableData[i].cashStatus == 'processing') {
                                this.tableData[i].cashStatus = '银行处理中'
                            } else {
                                this.tableData[i].cashStatus = '等待第三方处理'
                            }
                        }
                    }

                })
            },
            onSubmit() {
                // if ()
                console.log(this.formInline.time);

                if (this.formInline.time == undefined || this.formInline.time == null) {
                    this.formInline.time = []
                }
                if (this.formInline.time0 == undefined || this.formInline.time0 == null) {
                    this.formInline.time0 = []
                }
                console.log(this.formInline);
                let page = JSON.stringify({
                    token: this.token,
                    pageNum: this.currentPage = 1,
                    pageSize: this.pageSize,
                    id: this.formInline.driverId,
                    name: this.formInline.driverName,
                    phone: this.formInline.driverPhone,
                    status: this.formInline.cashStatus,
                    teamName: this.formInline.teamName,
                    cashBeginTime: this.formInline.time[0],
                    cashEndTime: this.formInline.time[1] + 86400000 - 1,
                    auditStartTime: this.formInline.time0[0],
                    auditEndTime: this.formInline.time0[1] + 86400000 - 1,
                    filialeId: this.formInline.filialeId,
                });
                this.ajax(page)
            },
            handleCurrentChanges(val){
                console.log(val);
                this.currentPages = val;
                this.CashWithdrawal(this.row)
            },
            handleSizeChanges(val){
                this.pageSizes = val;
                this.CashWithdrawal(this.row)
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                if (this.formInline.time == undefined || this.formInline.time == null) {
                    this.formInline.time = []
                }
                if (this.formInline.time0 == undefined || this.formInline.time0 == null) {
                    this.formInline.time0 = []
                }
                let page = JSON.stringify({
                    token: this.token,
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    id: this.formInline.driverId,
                    name: this.formInline.driverName,
                    phone: this.formInline.driverPhone,
                    status: this.formInline.cashStatus,
                    teamName: this.formInline.teamName,
                    cashBeginTime: this.formInline.time[0],
                    cashEndTime: this.formInline.time[1] + 86400000 - 1,
                    auditStartTime: this.formInline.time0[0],
                    auditEndTime: this.formInline.time0[1] + 86400000 - 1,
                    filialeId: this.formInline.filialeId,
                })
                this.ajax(page)
            },

            handleSizeChange(val) {
                this.pageSize = val;
                if (this.formInline.time == undefined || this.formInline.time == null) {
                    this.formInline.time = []
                }
                if (this.formInline.time0 == undefined || this.formInline.time0 == null) {
                    this.formInline.time0 = []
                }
                let page = JSON.stringify({
                    token: this.token,
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    id: this.formInline.driverId,
                    name: this.formInline.driverName,
                    phone: this.formInline.driverPhone,
                    status: this.formInline.cashStatus,
                    teamName: this.formInline.teamName,
                    cashBeginTime: this.formInline.time[0],
                    cashEndTime: this.formInline.time[1] + 86400000 - 1,
                    auditStartTime: this.formInline.time0[0],
                    auditEndTime: this.formInline.time0[1] + 86400000 - 1,
                    filialeId: this.formInline.filialeId,
                })
                this.ajax(page)
            },
            handleClick(_index) {
                this.dialogVisible = true;
                this.driverCashId = this.tableData[_index].cashId
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        // this.approval.status = 'yes' ;
                        this.approval.unAllowOption = '';
                    })
                    .catch(_ => {
                    });
            },
            handleCloses(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            clickitem() {

            },
            submitForm(approval) {
                this.$refs[approval].validate((valid) => {
                    if (valid) {
                        this.onloading = true;
                        let page = JSON.stringify({
                            token: this.token,
                            state: this.approval.status,
                            opinion: this.approval.unAllowOption,
                            driverCashId: this.driverCashId

                        })
                        console.log(page);
                        this.$http.post(this.global.lightningUrl + '/companyv1/paymentCenter/payment/forward', page, {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            console.log(res);
                            let _res = res.body;
                            if (res.body.errcode == 0) {
                                this.onloading = false
                                this.dialogVisible = false;
                                this.approval.unAllowOption = '';
                                this.onSubmit();

                                setTimeout((res) => {
                                    this.$message({
                                        message: _res.message,
                                        type: 'success'
                                    });
                                }, 30)
                            } else {
                                this.onloading = false;
                                this.dialogVisible = false;
                                this.approval.unAllowOption = '';
                                this.onSubmit();
                                this.$message({
                                    message: res.body.message,
                                    type: 'warning'
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                });
            }

        }
    }
</script>
<style lang="scss" scoped>
    .header {
        margin-bottom: 20px;
    }

    .conter_size {
        margin-bottom: 10px;
        color: #606266;
    }
</style>