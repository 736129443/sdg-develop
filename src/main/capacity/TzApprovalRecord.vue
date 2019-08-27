<template>
    <div class="main">
        <div class="header">
            当前位置: <span>项目管理 > 调账记录</span>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="出车单号">
                <el-input v-model="formInline.trackId" placeholder="请输入出车单号"></el-input>
            </el-form-item>
            <el-form-item label="司机姓名">
                <el-input v-model="formInline.driverName" placeholder="请输入司机姓名"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
                <el-input v-model="formInline.customerName" placeholder="请输入司机姓名"></el-input>
            </el-form-item>

            <el-form-item label="申请人">
                <el-input v-model="formInline.optAdminName" placeholder="请输入申请人"></el-input>
            </el-form-item>

            <el-form-item label="出车日期">
                <el-date-picker
                        v-model="formInline.time"
                        type="daterange"
                        :picker-options="pickerOptions0"
                        value-format="timestamp"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="审批状态">
                <el-select v-model="formInline.status" placeholder="请选择审批状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="审批中" value="approving"></el-option>
                    <el-option label="已退回" value="rejected"></el-option>
                    <el-option label="已审批" value="accepted"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit()">查询</el-button>
                <el-button type="primary" @click="financtReport" v-if="projectFinancialListExport">导出</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    align="center"
                    label="编号">
                    <template slot-scope="scope">
                        <el-button type="text" @click="onapprovalDetails(scope.$index)">{{tableData[scope.$index].id}}</el-button>
                    </template>
            </el-table-column>
            <el-table-column
                width="180"
                    prop="trackId"
                    align="center"
                    label="出车编号">
            </el-table-column>
            <el-table-column
                    width="100"
                    prop="filialeName"
                    align="center"
                    label="所属分公司">
            </el-table-column>
            <el-table-column
                    width="150"
                    prop="startTime"
                    align="center"
                    :formatter="dateFormat"
                    label="出车日期">
            </el-table-column>
            <el-table-column
                    prop="customerName"
                    align="center"
                    label="项目名称">
            </el-table-column>
            <el-table-column
                    prop="driverName"
                    align="center"
                    label="司机姓名">
            </el-table-column>
            <el-table-column
                    prop="driverOptBeforePrice"
                    align="center"
                    label="调账前司机运费（元）">
            </el-table-column>
            <el-table-column
                    prop="driverAdjustMoney"
                    align="center"
                    label="司机运费差异金额（元）">
            </el-table-column>
            <el-table-column
                    prop="driverOptAfterPrice"
                    align="center"
                    label="调账后司机运费（元）">
            </el-table-column>
            <el-table-column
                    prop="customerOptBeforePrice"
                    align="center"
                    label="调账前客户GMV（元）">
            </el-table-column>
            <el-table-column
                    prop="customerAdjustMoney"
                    align="center"
                    label="GMV调账差异金额（元）">
            </el-table-column>
            <el-table-column
                    prop="customerOptAfterPrice"
                    align="center"
                    label="调账后客户GMV（元）">
            </el-table-column>
            <el-table-column
                    prop="remark"
                    align="center"
                    label="是否出车">
            </el-table-column>
            <el-table-column
                    prop="adjustType"
                    :formatter="adjustType_jx"
                    align="center"
                    label="调账类型">
            </el-table-column>

            <!--<el-table-column-->
                    <!--prop="adjustmentReason"-->
                    <!--align="center"-->
                    <!--label="差异原因">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="optAdminName"
                    align="center"
                    label="申请人">
            </el-table-column>
            <el-table-column
                    width="150"
                    prop="createTime"
                    align="center"
                    :formatter="dateFormat"
                    label="申请时间">
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="approvalName"-->
                    <!--align="center"-->
                    <!--label="审核人">-->
            <!--</el-table-column>-->
            <el-table-column
                width="150"
                prop="approvalAccTime"
                align="center"
                :formatter="dateFormat"
                label="最后审批时间">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    prop="status"
                    align="center"
                    label="审批状态">
                <template  slot-scope="scope">
                    <el-button type="text" disabled v-if="tableData[scope.$index].status =='审批中'">审批中</el-button>
                    <el-button type="text" disabled v-if="tableData[scope.$index].status =='已审批'">已审批</el-button>
                    <!--<el-button type="text" disabled v-if="tableData[scope.$index].status =='已退回'">已退回</el-button>-->
                    <el-popover
                            v-if="tableData[scope.$index].status =='已退回'"
                            placement="right"
                            width="300"
                            trigger="hover"
                            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                        <el-form >
                            <el-form-item label="退回原因">
                                <el-input
                                        type="textarea"
                                        :rows="3"
                                        disabled
                                        resize="none"
                                        v-model="tableData[scope.$index].approvalComments">
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <el-button slot="reference"  type="text" size="small" >已退回</el-button>
                    </el-popover>


                </template>
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="status"-->
                    <!--align="center"-->
                    <!--label="查看审批意见">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-button type="text" @click="onapprovalDetails(scope.$index)">查看</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
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
        <!--审批查看详情-->
        <div class="adjustment">
            <el-dialog
                    title="申请调账"
                    :visible.sync="approvalDetails"
                    center
                    width="850px"
            >
                <div style="font-size: 16px;float:right">{{approval_Customer.status}} </div>
                <div class="ct">

                    <div class="basic">
                        <p class="wire">基本信息</p>
                    </div>
                    <div class="wire_m">
                        <ul>
                            <li>
                                <span class="wire_m_n">分公司名称 ：</span><span>{{approval_Customer.filialeName}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">出车单号 ：</span><span>{{approval_Customer.trackId}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">项目名称 ：</span><span>{{approval_Customer.customerName}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">司机红包 ：</span><span>{{approval_Customer.redPacketMoney}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">司机姓名 ：</span><span>{{approval_Customer.driverName}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">畅心保金额 ：</span><span>{{approval_Customer.driverInsuranceMoney}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">配送日期 ：</span><span>{{approval_Customer.startTime | dateFrmHm}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">申请人 ：</span><span>{{approval_Customer.optAdminName}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">申请时间 ：</span><span>{{approval_Customer.createTime  | dateFrmHm}}</span>
                            </li>

                            <li>
                                <span class="wire_m_n">司机运费发布价格 ：</span><span>{{approval_Customer.transportPrice}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">GMV合同价格 ：</span><span>{{approval_Customer.schedulePrice}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="basic">
                        <p class="wire">调账信息</p>
                    </div>
                    <div class="wire_m tz_m">
                        <div>
                            <span class="m_title">
                                是否有出车 ：
                            </span>
                            <span class="m_con">
                                {{approval_Customer.remark}}
                            </span>

                        </div>
                        <div>
                            <span class="m_title">
                                调账前司机运费 ：
                            </span>
                            <span class="m_con1">
                                {{approval_Customer.driverOptBeforePrice}} 元
                            </span>
                            <span class="m_con1">
                                调账差额 ： {{approval_Customer.driverAdjustMoney}}
                            </span>
                            <span class="m_con1">
                                调账后司机运费 ： {{approval_Customer.driverOptAfterPrice}}
                            </span>
                            <br>
                        </div>
                        <div>
                            <span class="m_title">
                                调账前客户GMV ：
                            </span>
                            <span class="m_con1">
                                {{approval_Customer.customerOptBeforePrice}} 元
                            </span>
                            <span class="m_con1">
                                调账差额 ： {{approval_Customer.customerAdjustMoney}}
                            </span>
                            <span class="m_con1">
                                调账后客户GMV ： {{approval_Customer.customerOptAfterPrice}}
                            </span>
                        </div>
                        <div>

                            <span class=" m_title">
                                调账原因 ：
                            </span>
                            <span class="m_con1" style="width: 450px;vertical-align: text-top;">
                                {{approval_Customer.adjustmentReason}}
                            </span>
                        </div>

                    </div>

                    <div class="basic">
                        <p class="wire">审批信息</p>
                    </div>
                    <div class=" approval">
                        <!--审批人 ：审批意见  审批时间-->
                        <ul v-for="i in approver">
                            <li>
                                <span class="approval_t">审批人 ： </span>{{i.adminName}}
                            </li>
                            <li>
                                <span class="approval_t">审批意见 ： </span>{{i.opinion}}
                            </li>
                            <li>
                                <span class="approval_t">审批时间 ： </span> <span v-if="i.createTime">{{i.createTime | dateFrmHm}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-dialog>

        </div>
        <!--<el-dialog-->
                <!--title="查看审批详情"-->
                <!--:visible.sync="approvalDetails"-->
                <!--width="30%"-->
                <!--min-width = '650px'-->
        <!--&gt;-->
            <!--<div style="width: 100%;padding: 0 20px">-->
                <!--司机姓名：{{approval_Customer.driverName}} <br>-->
                <!--申请人：&nbsp;&nbsp;&nbsp;{{approval_Customer.optAdminName}}<br>-->
                <!--申请时间：{{approval_Customer.createTime | dateFrmHm}}<br><br>-->
                <!--<div v-for="i in approver" style="width: 100%;padding: 20px 0 0 0 " >-->
                    <!--审批人：&nbsp;&nbsp;&nbsp;{{i.adminName}} <br>-->
                    <!--审批意见：<span v-if="i.opinion">{{i.opinion}}</span><br>-->
                    <!--申请时间：<span v-if="i.createTime">{{i.createTime|dateFrmHm}}</span>-->
                <!--</div>-->

            <!--</div>-->

            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button @click="approvalDetails = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="approvalDetails = false">确 定</el-button>-->
            <!--</span>-->
        <!--</el-dialog>-->
    </div>
</template>

<script>
    import {F_jurisdiction,AIfirstClass0,secondLevel} from '../../js/Fjurisdiction.js'
    import {openPostWindow} from "../../js/report.js";
    import moment from 'moment'
    export default {
        name: "TzApprovalRecord",
        created(){
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.data()
            this.projectFinancialListExport =F_jurisdiction('projectFinancialListExport',jurisdictions)

        },
        data(){
            return {
                projectFinancialListExport:'',
                formInline:{
                    time:'',
                },
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6
                    }
                },
                token:'',
                tableData: [],
                currentPage: 1,
                pageSize:10,
                total:0,
                approvalDetails:false,
                approval_Customer:{},
                approver:[]
            }
        },
        methods:{
            financtReport(){
                // /company/finance/report/export/project_list
                let page = JSON.stringify({
                    token:this.token,
                    pageSize:this.pageSize,
                    pageNum:this.currentPage,
                    optAdminName:this.formInline.optAdminName,
                    trackId :this.formInline.trackId,
                    driverName: this.formInline.driverName,
                    startTime :this.formInline.time!=null?this.formInline.time[0]:undefined,
                    endTime:  this.formInline.time!=null?this.formInline.time[1]+1000*60*60*24-1:undefined,
                    status: this.formInline.status,
                    customerName: this.formInline.customerName,
                })
                console.log(page);
                var exportLink = this.global.lightningUrl + '/companyv1/finance/report/export/project_adjust_record';
                openPostWindow(exportLink,page);
            },
            onapprovalDetails(_ind){
                // console.log(_ind);
                // console.log(this.tableData[_ind].type);
                this.approval_Customer = this.tableData[_ind]
                let page = JSON.stringify({
                    token:this.token,
                    "itemId":this.tableData[_ind].id,
                    "itemName":this.tableData[_ind].adjustType=='driver'?'driverbill':'customerbill'
                })
                console.log(page);
                this.$http.post(this.global.lightningUrl +'/companyv1/companyCenter/approval/approvaldetail',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.body.result == null){
                        this.approvalDetails = false
                        this.$message({
                            message: '该单当前无审批记录！',
                            type: 'warning'
                        });
                    } else{
                        this.approvalDetails = true ;
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
            adjustType_jx(row) {
                if (row.adjustType == 'all') {
                    return '全部'
                }else if (row.adjustType == 'driver') {
                    return '司机运费'
                }else{
                    return 'GMV'
                }
            },
            ajax(){
                if (this.formInline.time == undefined || this.formInline.time == null){
                    this.formInline.time = []
                }
                let page = JSON.stringify({
                    token:this.token,
                    pageSize:this.pageSize,
                    pageNum:this.currentPage,
                    optAdminName:this.formInline.optAdminName,
                    trackId :this.formInline.trackId,
                    driverName: this.formInline.driverName,
                    startTime :this.formInline.time!=null?this.formInline.time[0]:undefined,
                    endTime:  this.formInline.time!=null?this.formInline.time[1]+1000*60*60*24-1:undefined,
                    status: this.formInline.status,
                    customerName: this.formInline.customerName,
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/finance/query/admin_management/project_adjust_record',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    this.total =  res.body.result.total
                    this.tableData = res.body.result.rows;
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].status == 'approving'){
                            this.tableData[i].status = '审批中';
                        }else if(this.tableData[i].status == 'accepted'){
                            this.tableData[i].status = '已审批';
                        }else if(this.tableData[i].status == 'expire'){
                            this.tableData[i].status = '已退回';
                        }else {
                            this.tableData[i].status = '已退回';

                        }

                    }
                })
            },
            data(){

                this.ajax()
            },
            onSubmit(){
                this.currentPage = 1
                this.ajax()
            },
            handleSizeChange(val) {
                this.pageSize = val ;
                this.ajax();
            },
            handleCurrentChange(val) {
                this.currentPage = val ;
                this.ajax();
            },

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

<style lang="scss" scoped >
    .main{
        .adjustment{
            .approval{
                margin: 10px;
                padding: 15px 20px;
                background-color: #F3F7FA;
                li{
                    display: inline-block;
                    width: 30%;
                    padding-bottom: 8px;
                    .approval_t{
                        display: inline-block;
                        width: 80px;
                    }
                }
            }
            .wire::before {
                display: inline-block;
                margin-right: 8px;
                content: '';
                width: 3px;
                height: 20px;
                vertical-align: -4px;
                background-color: #277bf5;
            }
            .basic{
                p{
                    font-size: 16px;
                }
            }
            .wire_m{
                margin: 10px;
                padding: 15px 20px;
                background-color: #F3F7FA;
                li{
                    display: inline-block;
                    width: 48%;
                    padding-bottom: 8px;
                }
                .wire_m_n{
                    display: inline-block;
                    white-space: nowrap;
                    width: 130px;
                }
            }
            .tz_m{
                div{
                    padding-bottom: 10px;
                    .m_title{
                        display: inline-block;
                        /*width: 125px;*/
                        width: 15%;
                        min-width: 125px;
                        white-space: nowrap;
                        text-align: right;
                    }

                    .m_con1{
                        display: inline-block;

                        .el-input{
                            width: 150px;
                        }
                        .el-textarea{
                            width: 350px;
                            vertical-align:text-top
                        }
                    }

                    .m_con1:nth-child(2){
                        width: 20%;
                    }
                    .m_con1:nth-child(3){
                        width: 25%;
                    }
                    .m_con1:nth-child(4){
                        width: 220px;
                        white-space: normal;
                    }
                    .m_con{
                        div{

                            padding-bottom: 0;
                        }
                    }
                }
                /*.is-required{*/
                /*width: ;*/
                /*}*/
                .is-required:before {
                    content: "*";
                    color: #f56c6c;
                    margin-right: 4px;
                }
            }
        }
    }
    .header{


        margin-bottom: 20px;

    }
</style>