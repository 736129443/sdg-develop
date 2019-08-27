
<template>
    <div class="main">
        <div class="header">
            <!--当前位置: 财务管理 > 司机账单 > 调账审批-->
            当前位置: 待办事项 > 出车单调账审批列表
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="出车单号">
                <el-input v-model.trim="formInline.driverId" onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          placeholder="请输入出车单号"></el-input>
            </el-form-item>
            <el-form-item label="申请人">
                <el-input v-model.trim="formInline.optAdminName" onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          placeholder="请输入申请人"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
                <el-input v-model.trim="formInline.driverName" onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="审批状态">
                <el-select v-model="formInline.status" placeholder="请选择审批状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="审批中" value="approving"></el-option>
                    <el-option label="已通过" value="accepted"></el-option>
                    <el-option label="未通过" value="rejected"></el-option>
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
                    prop="filialeName"
                    align="center"
                    label="所属分公司">
            </el-table-column>
            <el-table-column
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
                    prop="optDriverBeforePrice"
                    align="center"
                    label="调账前司机总金额（元）">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="optMoney"-->
            <!--align="center"-->
            <!--label="调账金额（元）">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="optDriverAfterPrice"
                    align="center"
                    label="调账后司机总金额（元）">
            </el-table-column>
            <el-table-column
                    prop="optCustomerBeforePrice"
                    align="center"
                    label="调账前客户GMV总金额（元）">
            </el-table-column>
            <el-table-column
                    prop="optCustomerAfterPrice"
                    align="center"
                    label="调账后客户GMV总金额（元）">
            </el-table-column>
            <el-table-column
                    prop="reason"
                    align="center"
                    label="差异原因">
            </el-table-column>
            <el-table-column
                    prop="remark"
                    align="center"
                    label="是否出车">
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
                    prop="approvalAccTime"
                    align="center"
                    :formatter="dateFormat"
                    label="最后审批时间">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="approvalName"-->
            <!--align="center"-->
            <!--label="调账类型">-->
            <!--</el-table-column>-->
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
                    <el-button type="text" size="small" @click="handleClick(scope.$index)"
                               v-if="(tableData[scope.$index].status == 'approving'&&tableData[scope.$index].isCurrentApproval == true)">审核
                    </el-button>
                    <el-button type="text" size="small"
                               v-if="(tableData[scope.$index].status == 'approving'&&tableData[scope.$index].isCurrentApproval == false)">审核中
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="查看审批意见"
                    align="center"
            >
                <template slot-scope="scope">
                    <el-button type="text" @click="onapprovalDetails(scope.$index)">查看</el-button>
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
                    <!--<el-col :span="8">是否出车：{{link.remark}}</el-col>-->

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
        <!--更改审批-->
        <div class="adjustment">
            <el-dialog
                    title="调账申请记录"
                    :visible.sync="dialogFormVisible"
                    center
                    width="850px"
                    :before-close="handleClose">
                <div class="ct">
                    <div class="basic">
                        <p class="wire">基本信息</p>
                    </div>
                    <div class="wire_m">
                        <ul>
                            <li>
                                <span class="wire_m_n">分公司名称 ：</span><span>{{link.filialeName}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">出车单号 ：</span><span>{{link.trackId}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">项目名称 ：</span><span>{{link.customerName}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">司机红包 ：</span><span>{{link.reaPacketPrice}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">司机姓名 ：</span><span>{{link.driverName}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">畅心保金额 ：</span><span>{{link.driverInsurancePrice}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">配送日期 ：</span><span>{{link.startTime | dateFrmHm}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">申请人 ：</span><span>{{link.optAdminName}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">申请时间 ：</span><span>{{link.createTime  | dateFrmHm}}</span>
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
                                {{link.remark}}
                            </span>

                        </div>
                        <div>
                            <span class="m_title">
                                调账前司机运费 ：
                            </span>
                            <span class="m_con1">
                                {{link.optDriverBeforePrice}} 元
                            </span>
                            <span class="m_con1">
                                调账差额 ： {{link.driverOptMoney}}
                            </span>
                            <span class="m_con1">
                                调账后司机运费 ： {{link.optDriverAfterPrice}}
                            </span>
                            <br>
                        </div>
                        <div>
                            <span class="m_title">
                                调账前客户GMV ：
                            </span>
                            <span class="m_con1">
                                {{link.optCustomerBeforePrice}} 元
                            </span>
                            <span class="m_con1">
                                调账差额 ： {{link.customerOptMoney}}
                            </span>
                            <span class="m_con1">
                                调账后客户GMV ： {{link.optCustomerAfterPrice}}
                            </span>
                        </div>
                        <div>

                            <span class=" m_title">
                                调账原因 ：
                            </span>
                            <span class="m_con1" style="width: 450px">
                                {{link.reason}}
                            </span>
                        </div>
                        <span v-if="!isexamine">
                            <br><br>
                        <div>

                            <span class=" m_title">
                                审批意见 ：
                            </span>
                            <span class="m_con">
                                <el-radio-group v-model="radio">
                                    <el-radio label="accepted">同意</el-radio>
                                    <el-radio label="rejected">退回</el-radio>
                                </el-radio-group>
                            </span>
                            <br>
                            <span class="m_con">
                                <el-input
                                        style="width: 500px;margin-left: 125px;margin-top: 12px"
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        resize="none"
                                        v-model="textarea">
                                </el-input>
                            </span>
                        </div>
                        </span>

                    </div>

                    <div class="basic" v-if="isexamine">
                        <p class="wire">审批信息</p>
                    </div>
                    <div class=" approval" v-if="isexamine">
                        <!--审批人 ：审批意见  审批时间-->
                        <ul v-for="i in CheckApprove">
                            <li>
                                <span class="approval_t">审批人 ： </span>{{i.adminName}}
                            </li>
                            <li>
                                <span class="approval_t">审批意见 ： </span>{{i.opinion}}
                            </li>
                            <li>
                                <span class="approval_t">审批时间 ： </span><span v-if="i.createTime">{{i.createTime | dateFrmHm}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary"  @click="onSubmit0" v-if="!isexamine">提 交</el-button>
                </span>
            </el-dialog>
        </div>
        <!--审批查看详情-->
        <!--<el-dialog-->
                <!--title="查看审批详情"-->
                <!--:visible.sync="approvalDetails"-->
                <!--width="30%"-->
                <!--min-width = '650px'-->
        <!--&gt;-->
            <!--<div style="width: 100%;padding: 0 20px">-->
                <!--司机姓名：{{approval_Customer.driverName}} <br>-->
                <!--申请人：&nbsp;&nbsp;&nbsp;{{approval_Customer.optAdminName}}<br>-->
                <!--申请时间：{{approval_Customer.createTime | dateFrmHm}}<br><br><br>-->
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
    export default {
        data() {
            return {
                isexamine:'',
                backmoney:'',
                money2:'',
                money:'',
                drivermoney:'',
                isremark:'0',
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
                CheckApprove:[],
            };
        },
        created() {
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.data()
        },

        methods: {
            // 司机
            ajax() {
                if (this.formInline.time == undefined || this.formInline.time == null){
                    this.formInline.time = []
                }
                let page = JSON.stringify({
                    token: this.token,
                    pageNum: this.currentPage1 ,
                    pageSize: this.pagesize,
                    id1: this.formInline.driverId,
                    conditionStr2: this.formInline.driverName,
                    conditionStr3: this.formInline.status,
                    id2: this.formInline.time[0],
                    id3: this.formInline.time[1]+86400000-1,
                    conditionStr1 : this.formInline.optAdminName,
                    "backlogType":this.$route.query.status == 'backlog'?'backlog': "history"
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/adjustapprovallist', page, {
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
                this.isexamine = false;
            },
            onSubmit() {
                this.currentPage1 = 1;
                this.ajax()
            },
            onSubmit0() {
                if(this.radio != 'accepted' && this.textarea == ''){
                    this.$message({
                        showClose: true,
                        message: '请输入审批意见！',
                        type: 'error'
                    });
                    return false
                }
                let page = JSON.stringify({
                    token: this.token,
                    itemId :this.link.id,
                    state : this.radio,
                    opinion: this.textarea,
                    itemName :this.link.adjustType
                });
                console.log(page);
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/adjustapproval', page, {
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
                        this.backlog()
                    }
                })
            },
            backlog(){
                let backlog = JSON.stringify({
                    token : this.token,
                    "type":"backlogCount"
                })
                let backlogCount
                this.$http.post(this.global.lightningUrl +'/companyv1/userManage/backlog',backlog,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    backlogCount = res.body.result.backlogCount
                    this.$store.commit('onbacklog', backlogCount)
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
            onapprovalDetails: function (_index) {
                console.log(this.tableData[_index].trackId);
                this.link = this.tableData[_index];
                this.dialogFormVisible = true;
                this.isexamine = true;

                let page = {
                    "token": this.token,
                    "itemId": this.tableData[_index].id, //id
                    "itemName": this.tableData[_index].adjustType == 'driver' ? 'driverbill' : "customerbill"
                };
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/approval/approvaldetail', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode === 0) {
                        this.CheckApprove = res.body.result;
                        for (let i = 0; i < this.CheckApprove.length; i++) {
                            if (this.CheckApprove[i].opinion == 'accepted') {
                                this.CheckApprove[i].opinion = '冻结'
                            } else if (this.CheckApprove[i].opinion == 'rejected') {
                                this.CheckApprove[i].opinion = '正常'

                            }

                        }
                    }
                });


                // this.approval_Customer = this.tableData[_index] ;
                // let page = JSON.stringify({
                //     token:this.token,
                //     id:this.tableData[_index].id,
                // })
                // this.$http.post(this.global.lightningUrl +'/companyv1/finance/driverbillapprovaldetail',page,{
                //     headers: {
                //         'Content-Type': 'application/json;charset=UTF-8'
                //     }
                // }).then((res)=>{
                //     console.log(res);
                //     this.approver = res.body.result
                //     for (let i = 0; i <this.approver.length; i++) {
                //         if (this.approver[i].state == undefined){
                //             this.approver[i].state = '';
                //
                //         } else if (this.approver[i].state == 'accepted') {
                //             this.approver[i].state = '同意'
                //         }else{
                //             this.approver[i].state = '退回'
                //
                //         }
                //     }
                // })
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
                    width: 105px;
                }
            }
            .tz_m{
                div{
                    padding-bottom: 10px;
                    .m_title{
                        display: inline-block;
                        width: 125px;
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
                        width: 170px;
                    }
                    .m_con1:nth-child(3){
                        width: 170px;
                    }
                    .m_con1:nth-child(4){
                        width: 220px;
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
