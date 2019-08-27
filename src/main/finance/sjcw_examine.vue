<template>
    <div class="main">
        <div class="header" style="margin-bottom: 10px">
            当前位置: <span>财务管理 > 司机财务 > 出车明细</span>
        </div>
        <div class="financeCard">
            <div class="PersonalInformation">
                <div class="PI_l">
                    <span >{{userId.name}}</span>
                    <span class="phone">{{userId.phone}}</span>
                </div>
                <span class="vertical"> </span>
                <div class="PI_r">
                    <div class="son">
                       <span>{{userId.driverType}} <span v-if="userId.teamName">(</span> {{userId.teamName}} <span v-if="userId.teamName">)</span></span>
                        <br>
                        <span class="phone">运营专员 {{userId.currentDeveAdminName}}</span>
                    </div>
                </div>
            </div>
            <hr>
            <div class="money">
                <el-row>
                    <el-col :span="6"><img src="../../images/ic_expressive.png" alt="">可提现金额：{{card.balance}}元</el-col>
                    <el-col :span="6"><img src="../../images/ic_grossed.png" alt="">平台总收入：{{card.incomeCount}}元</el-col>
                    <el-col :span="6"><img src="../../images/ic_grants.png" alt="">车贴补助：{{card.tagMoney}}元</el-col>
                    <el-col :span="6"><img src="../../images/ic_pay.png" alt="">缴纳押金：{{card.depositMoney}}元</el-col>
                </el-row>
                <br>
                <el-row>
                    <el-col :span="6"><img src="../../images/ic_account.png" alt="">预出账金额：{{card.preBalance}}元</el-col>
                    <el-col :span="6"><img src="../../images/ic_expressived.png" alt="">已提现金额：{{card.cashMoney}}元(含审批中)</el-col>
                    <el-col :span="6"><img src="../../images/ic_invitation.png" alt="">邀请奖励：{{card.inviteMoney}}元</el-col>
                    <el-col :span="6" class="examineSelect">
                        <img src="../../images/ic_income.png" alt="" style="vertical-align:middle">
                        月度收入：
                        <el-select v-model="istime" placeholder="" @change="onexamineTime(istime)">
                            <el-option v-for=" i in examineTimeSelect" :label="i.yearMonth" :value="i.yearMonth" ></el-option>
                        </el-select>
                        &nbsp;&nbsp;
                        <span>{{moneyTime}} 元</span>

                    </el-col>
                </el-row>
            </div>
        </div>
        <div style=" background-color:white;padding: 20px 20px;box-shadow: 2px 2px 2px #C2C5C9;">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="B端流水" name="BTiP">

                <el-form :inline="true" :model="forminline" class="demo-form-inline">
                    <el-form-item label="出车日期">
                        <el-date-picker
                                v-model="forminline.value6"
                                type="daterange"
                                :formatter="dateFormat"
                                range-separator="至"
                                value-format="timestamp"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="出账状态">
                        <el-select v-model="forminline.accountStatus" placeholder="请选择账户状态" >
                            <el-option label="全部" value=""></el-option>
                            <el-option label="已出账" value="yes" ></el-option>
                            <el-option label="未出账" value="no"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button  type="primary" @click="demand" style="margin-left:20px">查询</el-button>
                    <!--<el-button  @click="onSubmit0" type="primary" >调账记录</el-button>-->
                    <el-button type="primary" @click="Export()" v-if="driverAccountDetailExport">导出</el-button>
                    <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                </el-form>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="transportId"
                            label="运输单号"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="trackId"
                            label="出车单号"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="startTime"
                            label="出车日期"
                            :formatter="dateFormat"
                            align="center"
                            width="120"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            align="center"
                            label="出车状态">
                    </el-table-column>
                    <el-table-column
                            prop="arrivalPointCount"
                            align="center"
                            label="配送点数">
                    </el-table-column>
                    <el-table-column
                            prop="depotName"
                            align="center"
                            label="仓库名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="customerName"
                            align="center"
                            label="项目名称"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="transportPrice"
                            align="center"
                            label="基础运费（元）">
                    </el-table-column>
                    <el-table-column
                            prop="redPacketMoney"
                            align="center"
                            label="红包金额（元）">
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--prop="insuranceCost"-->
                    <!--align="center"-->
                    <!--label="畅心保（元）">-->
                    <!--</el-table-column> driverAdjustmentBeforePrice-->

                    <el-table-column
                            prop="driverAdjustmentBeforePrice"
                            align="center"
                            label="调账前到账总金额（元）">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            align="center"
                            label="调账金额（元）">
                        <template slot-scope="scope">
                            <a style="text-decoration:line-through;" v-if="tableData[scope.$index].driverStatus == 'no'" type="text" size="small">-</a>
                            <a v-if="tableData[scope.$index].driverStatus == 'yes'" type="text" size="small">{{tableData[scope.$index].optMoney}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="driverAdjustmentAfterPrice"
                            align="center"
                            label="调账后总金额（元）">
                        <template slot-scope="scope">
                            <a style="text-decoration:line-through;" v-if="tableData[scope.$index].driverStatus == 'no'" type="text" size="small">-</a>
                            <a v-if="tableData[scope.$index].driverStatus == 'yes'" type="text" size="small">{{tableData[scope.$index].driverAdjustmentAfterPrice}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="adjustmentReason"
                            align="center"
                            label="调账原因">
                    </el-table-column>
                    <el-table-column
                            prop="isAccount"
                            align="center"
                            label="出账状态">
                    </el-table-column>

                    <el-table-column
                        :formatter="dateFormat"
                        prop="outAccountTime"
                        align="center"
                        label="出账时间">
                    </el-table-column>

                    <!--<el-table-column-->
                    <!--prop="lineName"-->
                    <!--align="center"-->
                    <!--label="线路名称">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                    <!--prop="schedulePrice"-->
                    <!--align="center"-->
                    <!--label="合同价格（元）">-->
                    <!--</el-table-column>-->

                    <!--<el-table-column-->
                    <!--prop="status"-->
                    <!--align="center"-->
                    <!--label="出车状态">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                    <!--prop=""-->
                    <!--align="center"-->
                    <!--label="出车单处理状态">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                    <!--prop="handleStatus"-->
                    <!--align="center"-->
                    <!--label="出车单处理状态">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                    <!--prop="remark"-->
                    <!--align="center"-->
                    <!--label="变更原因">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                    <!--prop="adjustmentStatus"-->
                    <!--align="center"-->
                    <!--label="调账进度">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                    <!--prop="address"-->
                    <!--align="center"-->
                    <!--label="操作"-->
                    <!--v-if="type == 'query'?false:true"-->
                    <!--&gt;-->
                    <!--<template slot-scope="scope">-->
                    <!--&lt;!&ndash;<el-button @click="handleClick(scope.$index)" type="text" :disabled="arr[scope.$index]" size="small" >申请调账</el-button>&ndash;&gt;-->
                    <!--<el-button @click="handleClick(scope.$index)" type="text" size="small" >申请调账</el-button>-->
                    <!--</template>-->
                    <!--</el-table-column>-->
                </el-table>
                <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page.sync="currentPage1"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="pagesize"
                        layout="total,prev, pager, next,sizes"
                        :total="total">
                </el-pagination>
                <!--弹出框-->
                <el-dialog
                        title="对账差异"
                        :visible.sync="dialogFormVisible"
                        width="550px"
                        :before-close="handleClose"
                >
                    <!--:before-close="handleClose"-->
                    <span>
            <el-form :model="ruleForm" :rules="rules2" ref="ruleForm"  label-width="100px" class="demo-ruleForm , elform">
                <el-form-item label="账单金额" >
                    <el-input v-model="ruleForm.lastTransportPrice" disabled></el-input>
                </el-form-item>
                <el-form-item label="差异金额" prop="cymoney">
                    <el-input v-model="ruleForm.cymoney" @input="cymoneys"></el-input><br>
                    <span style="color: red;">说明:调账金额可为“+”和“-”，不填符号默认是正数“+”</span>
                </el-form-item>
                <el-form-item label="调账后总金额">
                    <el-input v-model="ruleForm.zhmoney" disabled></el-input>
                </el-form-item>
                <el-form-item label="差异原因" prop="textarea">
                    <el-input v-model="ruleForm.textarea" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="附加说明" prop="textarea0">
                    <el-input v-model="ruleForm.textarea0" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                    <el-select v-model="ruleForm.options" placeholder="请选择">
                        <el-option
                                v-for="item in link"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            </span>
                    <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false,ruleForm.cymoney='',ruleForm.zhmoney='',ruleForm.textarea='',ruleForm.textarea0=''">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" v-if="queryStatus_a == true? true:false" >确 定</el-button>
            <el-button type="primary" :loading="true" v-if="queryStatus_a == true? false:true" >提交中</el-button>

            </span>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="C端流水" name="CTiP">
                <el-form :inline="true" :model="forminline" class="demo-form-inline">
                    <el-form-item label="出车日期">
                        <el-date-picker
                                v-model="forminline.value6"
                                type="daterange"
                                :formatter="dateFormat"
                                range-separator="至"
                                value-format="timestamp"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="出账状态">
                        <el-select v-model="forminline.accountStatus" placeholder="请选择账户状态" >
                            <el-option label="全部" value=""></el-option>
                            <el-option label="已出账" value="yes" ></el-option>
                            <el-option label="未出账" value="no"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button  type="primary" @click="CcurrentPage1 =1,ajax1()" style="margin-left:20px">查询</el-button>
                    <!--<el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="driverAccountDetailExport">导出</el-button>-->
                    <!--<el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>-->
                </el-form>
                <el-table :data="CtableData" style="width: 100%">
                    <el-table-column prop="trackId" label="出车单号" align="center"></el-table-column>
                    <el-table-column prop="publishStatus" label="类型" align="center"></el-table-column>
                    <el-table-column prop="startTime" label="出车时间" :formatter="dateFormat" align="center"></el-table-column>
                    <el-table-column prop="customerPhone" label="用户" align="center"></el-table-column>
                    <el-table-column prop="transportPrice" label="运费（元）" align="center"></el-table-column>
                    <el-table-column prop="isAccount" label="出账状态" align="center"></el-table-column>
                </el-table>
                <el-pagination
                        @current-change="handleCurrentChange1"
                        @size-change="handleSizeChange1"
                        :current-page.sync="CcurrentPage1"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="Cpagesize"
                        layout="total,prev, pager, next,sizes"
                        :total="Ctotal">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="车贴补助" name="car">
                <el-form :inline="true" :model="carforminline" class="demo-form-inline">
                    <el-form-item label="补贴月份">
                        <el-date-picker
                                width="110"
                                v-model="carforminline.subsidy"
                                type="daterange"
                                value-format="yyyy-MM"
                                format="yyyy 年 MM 月"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-button  type="primary" @click="carcurrentPage1 = 1 ,ajax2()" style="margin-left:20px">查询</el-button>
                    <!--<el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="driverAccountDetailExport">导出</el-button>-->
                    <!--<el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>-->
                </el-form>
                <el-table :data="cartableData" style="width: 100%">
                    <!--:formatter="dateFormat"-->
                    <el-table-column prop="lastUploadTime" label="上传时间" :formatter="dateFormat" align="center"></el-table-column>
                    <el-table-column prop="tagsMonth" label="补贴月份" align="center"></el-table-column>
                    <el-table-column prop="auditTime" label="审核时间" :formatter="dateFormat" align="center"></el-table-column>
                    <el-table-column prop="driverName" label="司机姓名" align="center"></el-table-column>
                    <el-table-column prop="driverPhone" label="司机电话" align="center"></el-table-column>
                </el-table>
                <el-pagination
                        @current-change="handleCurrentChange2"
                        @size-change="handleSizeChange2"
                        :current-page.sync="carcurrentPage1"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="carpagesize"
                        layout="total,prev, pager, next,sizes"
                        :total="cartotal">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="邀请奖励" name="Invitation">
                <!--Invitation-->
                <el-form :inline="true" :model="Invitationforminline" class="demo-form-inline">
                    <el-form-item label="被邀请人认证时间">
                        <el-date-picker
                                v-model="Invitationforminline.time"
                                type="daterange"
                                :formatter="dateFormat"
                                range-separator="至"
                                value-format="timestamp"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-button  type="primary" @click="InvitationcurrentPage1= 1 , ajax3()" style="margin-left:20px">查询</el-button>
                    <!--<el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="driverAccountDetailExport">导出</el-button>-->
                    <!--<el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>-->
                </el-form>
                <el-table :data="cartableData" style="width: 100%">
                    <!--:formatter="dateFormat" driver_name-->
                    <el-table-column prop="driver_id" label="邀请编号"  align="center"></el-table-column>
                    <el-table-column prop="invitee_certify_time" label="被邀请人认证时间" :formatter="dateFormat" align="center"></el-table-column>
                    <el-table-column prop="invite_name" label="邀请人" align="center"></el-table-column>
                    <el-table-column prop="driver_name" label="被邀请人" align="center"></el-table-column>
                    <el-table-column prop="driver_phone" label="被邀请人电话" align="center"></el-table-column>
                    <el-table-column prop="vehicle_type" label="被邀请人车型" align="center"></el-table-column>
                </el-table>
                <el-pagination
                        @current-change="handleCurrentChange3"
                        @size-change="handleSizeChange3"
                        :current-page.sync="InvitationcurrentPage1"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="Invitationpagesize"
                        layout="total,prev, pager, next,sizes"
                        :total="Invitationtotal">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="预出账调账明细" name="Adjustment">
                <!--Adjustment-->
                <el-form :inline="true" :model="Adjustmentforminline" class="demo-form-inline">
                    <el-form-item label="调账时间">
                        <el-date-picker
                                v-model="Adjustmentforminline.time"
                                type="daterange"
                                :formatter="dateFormat"
                                range-separator="至"
                                value-format="timestamp"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-button  type="primary" @click="ajax4()" style="margin-left:20px">查询</el-button>
                    <!--<el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="driverAccountDetailExport">导出</el-button>-->
                    <!--<el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>-->
                </el-form>
                <el-table :data="AdjustmenttableData" style="width: 100%">
                    <!--:formatter="dateFormat" driver_name-->
                    <el-table-column prop="id" label="编号"  align="center"></el-table-column>
                    <el-table-column prop="createTime" label="调账时间" :formatter="dateFormat" align="center"></el-table-column>
                    <el-table-column prop="optMoney" label="调账金额（元）" align="center"></el-table-column>
                    <el-table-column prop="optAdminName" label="申请人" align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" align="center"></el-table-column>
                    <el-table-column prop="approvalName" label="最后审批人" align="center"></el-table-column>
                    <!--<el-table-column prop="vehicle_type" label="审批时间" align="center"></el-table-column>-->
                    <el-table-column prop="adjustmentReason" label="调账原因" align="center"></el-table-column>
                </el-table>
                <el-pagination
                        @current-change="handleCurrentChange4"
                        @size-change="handleSizeChange4"
                        :current-page.sync="AdjustmentcurrentPage1"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="Adjustmentpagesize"
                        layout="total,prev, pager, next,sizes"
                        :total="Adjustmenttotal">
                </el-pagination>
            </el-tab-pane>

        </el-tabs>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    import {openPostWindow} from '../../js/report.js'
    export default {
        data(){
            return {
                moneyTime:'',
                examineTimeSelect:[],
                istime:'',
                activeName2: 'BTiP',
                driverAccountDetailExport:false,
                token:'',
                value6:'',
                id:'',
                userId:[],
                currentPage1:1,
                pagesize:10,
                CcurrentPage1:1,
                Cpagesize:10,
                Ctotal:0,
                carcurrentPage1:1,
                carpagesize:10,
                cartotal:0,
                InvitationcurrentPage1:1,
                Invitationpagesize:10,
                Invitationtotal:0,
                AdjustmentcurrentPage1:1,
                Adjustmentpagesize:10,
                Adjustmenttotal:0,

                tableData:[],
                forminline:{
                    value6:'',
                },
                dialogFormVisible: false,
                formLabelWidth: '120px',
                ruleForm: {
                    lastTransportPrice: '',
                    cymoney:'',
                    resource: '',
                    desc: '',
                    zhmoney:'',
                    textarea:'',
                    textarea0:'',
                    trackId:'',
                    options:'',
                    id:'',
                    startTime:'',
                },
                rules2: {
                    cymoney:[
                        { required: true, message: '请输入金额', trigger: 'blur' },
                        { pattern: /(^(-|\+)?[0-9]+(.[0-9]{1,2})?$)/, message: '只能输入数字,小数点后两位'}
                    ] ,
                    textarea:[
                        { required: true, message: '原因不能为空', trigger: 'blur' },
                        { pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,500}$/,message: '输入内容不规范' },
                        { min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur' },
                    ]
                },
                total:0,
                link:[],
                options : '',
                linkname:'',
                grey:true,
                arr:[],
                type:'',
                queryStatus_a:true,
                //导出
                queryStatus:true,
                // fullscreenLoading: false,
                trackManageListExport:false,
//进度条
                ProgressBar:0,
                card:{},
                CtableData:[],
                carforminline:{
                    subsidy:[]
                },
                cartableData:[],
                Invitationforminline:{
                    time:[]
                },
                Adjustmentforminline:{
                    time:[]
                },
                AdjustmenttableData:[]
            }
        },
        created(){
            let token =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = token.result.token;
            let user =sessionStorage.getItem('examineid');
            this.id = user;
            this.userId = JSON.parse(sessionStorage.getItem('examinenameid')).examinenamedriverType;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.driverAccountDetailExport =  jurisdictions[7].menus[3].choose;
            this.type = this.userId.examineid;
            if ( this.type == '1' ){
                this.type = 'query'
            }else {
                this.type = 'adjust' 
            }
            this.data();
            for (var  i in this.tableData) {
                if (this.tableData[i].driverType == 'team'){
                    this.tableData[i].driverType = '车队司机'
                }else if (this.tableData[i].driverType == 'company'){
                    this.tableData[i].driverType = '运输公司'
                }else if (this.tableData[i].driverType == 'personal'){
                    this.tableData[i].driverType = '个体司机'
                }
                if (this.tableData[i].status == 'finished') {
                    this.tableData[i].status = '正常'
                } else {
                    this.tableData[i].status = '异常'
                }
            }
            let driverType
            if (this.userId.driverType == '车队司机') {
                driverType = 'team'
            }else if (this.userId.driverType == '运输公司') {
                driverType = 'company'
            }else{
                driverType = 'personal'
            }
            let page1 = JSON.stringify({
                token:this.token,
                driverId:this.userId.teamId == ''||this.userId.teamId == undefined?this.userId.driverId:undefined ,
                teamId:this.userId.teamId
                // driverType:driverType,
            })
            this.$http.post(this.global.lightningUrl +'/companyv1/finance/query/admin_management/driver_finance',page1,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                this.card = res.body.result
            })
            this.$http.post(this.global.lightningUrl +'/companyv1/finance/query/admin_management/get_months',JSON.stringify({
                token:this.token,
            }),{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                this.examineTimeSelect = res.body.result;
                this.istime = res.body.result[0].yearMonth ;
                this.onexamineTime(this.istime)
                console.log(this.userId.type);

            })
            // console.log(this.examineTimeSelect);
            //
        },
        methods:{
            onexamineTime(istime){
                console.log(istime);
                let page = JSON.stringify({
                    token:this.token,
                    yearMonth:istime,
                    teamId:this.userId.type=='leader'?this.userId.teamId:undefined,
                    driverId:this.userId.type=='normal'?this.userId.driverId:undefined,
                })
                console.log(page);
                this.$http.post(this.global.lightningUrl +'/companyv1/finance/query/admin_management/month_income',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    this.moneyTime = res.body.result
                })
            },
            Export() {
                if (this.forminline.value6 == undefined || this.forminline.value6 == null){
                    this.forminline.value6 = []
                }
                if(this.forminline.accountStatus == ''){
                    this.forminline.accountStatus = 'all'
                }
                let page = JSON.stringify({
                    token : this.token,
                    driverId : this.userId.teamId == ''||this.userId.teamId == undefined?this.userId.driverId:undefined,
                    startTime : this.forminline.value6[0]== null ? '':this.forminline.value6[0],
                    endTime : this.forminline.value6[1] == null ? '':this.forminline.value6[1]+86400000-1,
                    pageNum : this.currentPage1,
                    pageSize : this.pagesize,
                    type :  this.type,
                    isAccount:this.forminline.accountStatus,
                    teamId:this.userId.teamId
                    // "exportName":"driverTransportDetail",                //-- 导出模块名称
                    // "driverId":this.userId.driverId,                    //-- 司机ID（必填）
                    // "startTime":this.forminline.value6 == null ? '' : this.forminline.value6[0],   //-- 开始日期
                    // "endTime":this.forminline.value6 == null ? '' : this.forminline.value6[1]+86400000-1,              //-- 结束日期
                    // "isAccount":this.forminline.accountStatus,       //-- 是否出账 all:所有 yes:出账 no:未出账
                });
                var exportLink = this.global.lightningUrl + '/companyv1/finance/report/export/driver_track';
                openPostWindow(exportLink , page);
            },
            // Export(){
            //
            //     if (this.forminline.value6 == undefined || this.forminline.value6 == null){
            //         this.forminline.value6 = []
            //     }
            //     if(this.forminline.accountStatus == ''){
            //         this.forminline.accountStatus = 'all'
            //     }
            //     this.$message({
            //         showClose: true,
            //         message: '正在导出请耐心等待！',
            //         type: 'warning'
            //     });
            //     this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
            //         "token":this.token,
            //         "exportName":"driverTransportDetail",                //-- 导出模块名称
            //         "driverId":this.userId.driverId,                    //-- 司机ID（必填）
	         //        "startTime":this.forminline.value6[0],             //-- 开始日期
            //         "endTime":this.forminline.value6[1]+86400000-1,              //-- 结束日期
            //         "isAccount":this.forminline.accountStatus,       //-- 是否出账 all:所有 yes:出账 no:未出账
            //     })).then(run=>{
            //         console.log(run);
            //         if(run.body.errcode == 0){
            //             this.fullscreenLoading = true;
            //             this.queryStatus = false;
            //             this.ProgressBar = 0;
            //             this.code = run.body.result;
            //             this.interval = setInterval(() => {
            //                 this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportProcess',JSON.stringify({
            //                     "token":this.token,
            //                     "id":this.code,
            //                 })).then(run=>{
            //                     console.log(run);
            //                     if(run.body.errcode == 0){
            //                         this.ProgressBar  =   parseInt(run.body.result.exportProcess) ;
            //                         if (this.ProgressBar == 100){
            //                             clearInterval(this.interval);
            //                             setTimeout(()=> {
            //                                 window.location.href = run.body.result.externalRoad;
            //                                 this.$message({
            //                                     message: '导出成功',
            //                                     type: 'success'
            //                                 });
            //                                 this.fullscreenLoading = false;
            //                                 this.queryStatus = true;
            //                             },1200)
            //                         }
            //                     }
            //                 })
            //             },1000);
            //         }else {
            //             this.$message({
            //                 showClose: true,
            //                 message: run.body.message,
            //                 type: 'error'
            //             });
            //         }
            //     })
            // },

            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            dateFormatHm:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("HH:mm");
            },
            ajax(page){
                this.$http.post( this.global.lightningUrl + '/companyv1/finance/query/admin_management/driver_track',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                } ).then((res)=>{
                    console.log(res);
                    this.total = res.body.result.total;
                    this.tableData =res.body.result.rows;
                    for (let i = 0 ; i < this.tableData.length; i++ ){
                        this.arr.push(false);
                        if (this.tableData[i].vehicleType != ''&&this.tableData[i].vehicleType != null &&this.tableData[i].vehicleType != undefined ){
                            this.tableData[i].vehicleType = JSON.parse(this.tableData[i].vehicleType).name + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isElectric + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isTailBoard + ' '
                                + JSON.parse(this.tableData[i].vehicleType).length + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isCertificate + ' '
                                + JSON.parse(this.tableData[i].vehicleType).isCold ;
                        }else {
                            this.tableData[i].vehicleType = ''
                        }

                        if ( this.tableData[i].adjustmentStatus == 'audit' || this.tableData[i].adjustmentStatus == 'pass' ) {
                            this.arr[i] = true;

                        }else{
                            if ((this.tableData[i].status == 'finished' && (this.tableData[i].handleStatus == ''||this.tableData[i].handleStatus == 'undefined'||this.tableData[i].handleStatus == null)) || this.tableData[i].handleStatus == 'handled' ) {
                                this.arr[i] = true;
                            }else{
                                this.arr[i] = false;
                            }
                        }

                        if (this.tableData[i].isAccount == 'yes') {
                            this.tableData[i].isAccount = '已出账'
                        }else if (this.tableData[i].isAccount == 'no') {
                            this.tableData[i].isAccount = '未出账'

                        }
                        if (this.tableData[i].adjustmentStatus == 'audit'){
                            // this.arr[i] = true;
                            this.tableData[i].adjustmentStatus = '审批中';
                        }else if(this.tableData[i].adjustmentStatus == 'pass'){
                            // this.arr[i] = true;
                            this.tableData[i].adjustmentStatus = '已审批';
                        }else if(this.tableData[i].adjustmentStatus ==  'notpass'){
                            // this.arr[i] = false;
                            this.tableData[i].adjustmentStatus = '未通过';
                        }else{
                            this.tableData[i].adjustmentStatus = '未调账';
                        }

                        if ( this.tableData[i].status == 'finished' ) {
                            this.tableData[i].status = '正常'
                        }else {
                            this.tableData[i].status = '异常'
                        };
                        if ( this.tableData[i].handleStatus == 'handled' ){
                            this.tableData[i].handleStatus = '已处理'
                        }else if ( this.tableData[i].handleStatus == 'handling' ) {
                            this.tableData[i].handleStatus = '正在处理'
                        }else {
                            this.tableData[i].handleStatus = ''
                        }
                    };
                })
            },
            //C段流水
            ajax1(){
                if (this.forminline.value6 == undefined || this.forminline.value6 == null){
                    this.forminline.value6 = []
                }
                let page = JSON.stringify({
                    token : this.token,
                    driverId : this.userId.teamId == ''||this.userId.teamId == undefined?this.userId.driverId:undefined ,
                    startTime : this.forminline.value6[0],
                    endTime : this.forminline.value6[1]+1000*60*60*24-1,
                    pageNum : this.CcurrentPage1,
                    pageSize : this.Cpagesize,
                    type :  this.type,
                    isAccount:this.forminline.accountStatus,
                    teamId:this.userId.teamId
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/finance/query/admin_management/driver_client_track',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    this.Ctotal = res.body.result.total;
                    this.CtableData = res.body.result.rows;
                    for (let i = 0; i < this.CtableData.length; i++) {
                        if (this.CtableData[i].publishStatus == 'reservation'){
                            this.CtableData[i].publishStatus = '预约'
                        }else if (this.CtableData[i].publishStatus == 'immediate'){
                            this.CtableData[i].publishStatus = '实时'

                        }
                        if (this.CtableData[i].isAccount == 'no') {
                            this.CtableData[i].isAccount = "未出账"
                        }else{
                            this.CtableData[i].isAccount = "已出账"
                        }
                    }
                    console.log(res);
                })
            },
            //车贴补助
            ajax2(){
                // alert(1)
                //补贴月份
                if (this.carforminline.subsidy == undefined || this.carforminline.subsidy == null || this.carforminline.subsidy == ''){
                    this.carforminline.subsidy = [];
                }
                let page = JSON.stringify({
                    token : this.token,
                    driverId : this.userId.teamId == ''||this.userId.teamId == undefined?this.userId.driverId:undefined,
                    'tagsStartMonth':this.carforminline.subsidy[0],
                    'tagsEndMonth':this.carforminline.subsidy[1],
                    pageNum : this.carcurrentPage1,
                    pageSize : this.carpagesize,
                    teamId:this.userId.teamId,
                    resource:"finance",
                    // type :  this.type,
                    // isAccount:this.forminline.accountStatus,
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/driverManage/vehicle_tags/audit_tags_List',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    if (res.body.errcode == 0){
                        this.cartableData = res.body.result.rows;
                        for(var i in this.arr) {
                            if (this.arr[i].driverType == "personal") {
                                this.arr[i].driverType = "个体司机"
                            } else if (this.arr[i].driverType == "company") {
                                this.arr[i].driverType = "运输公司"
                            } else if (this.arr[i].driverType == "team") {
                                this.arr[i].driverType = "车队司机"
                            }
                        }
                        this.cartotal = res.body.result.total;
                    }
                })
            },
            //邀请
            ajax3(){
                // alert(1)
                //补贴月份
                if (this.Invitationforminline.time == undefined || this.Invitationforminline.time == null || this.Invitationforminline.time == ''){
                    this.Invitationforminline.time = [];
                }
                console.log(this.userId);
                let page = JSON.stringify({
                    token : this.token,
                    userId : this.userId.teamId == ''||this.userId.teamId == undefined?this.userId.driverId:undefined ,
                    certifyStartTime: this.Invitationforminline.time[0],
                    certifyEndTime: this.Invitationforminline.time[1]+1000*60*60*24-1,
                    pageNo : this.InvitationcurrentPage1,
                    pageSize : this.Invitationpagesize,
                    teamId:this.userId.teamId,
                    resource:"finance",
                    // type :  this.type,
                    // isAccount:this.forminline.accountStatus,
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/driverPromotion/recordsForBackWeb2',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    if (res.body.errcode == 0){
                        console.log(res);
                        this.cartableData = res.body.result.list;
                        this.Invitationtotal = res.body.result.pager.totalCount;
                        // InvitationcurrentPage1:1,
                        //     Invitationpagesize:10,
                        //     Invitationtotal:0,
                    }
                })
            },
            //财务调账明细
            ajax4(){
                // alert(1)
                //补贴月份
                if (this.Adjustmentforminline.time == undefined || this.Adjustmentforminline.time == null || this.Adjustmentforminline.time == ''){
                    this.Adjustmentforminline.time = [];
                }
                console.log(this.userId);
                let page = JSON.stringify({
                    token : this.token,
                    driverId : this.userId.teamId == ''||this.userId.teamId == undefined?this.userId.driverId:undefined,
                    startTime: this.Adjustmentforminline.time[0],
                    endTime: this.Adjustmentforminline.time[1]+1000*60*60*24-1,
                    pageNum : this.AdjustmentcurrentPage1,
                    pageSize : this.Adjustmentpagesize,
                    teamId:this.userId.teamId,

                    // isAccount:this.forminline.accountStatus,
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/finance/query/admin_management/driver_totaladjust_record',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    if (res.body.errcode == 0){
                        console.log(res);
                        this.AdjustmenttableData = res.body.result.rows;
                        for (let i = 0; i < this.AdjustmenttableData.length; i++) {
                            if (this.AdjustmenttableData[i].status == 'approving') {
                                this.AdjustmenttableData[i].status = '审批中'
                            }else if (this.AdjustmenttableData[i].status == 'accepted') {
                                this.AdjustmenttableData[i].status = '已通过'
                            }else{
                                this.AdjustmenttableData[i].status = '未通过'
                            }
                        }
                        this.Adjustmenttotal = res.body.result.total;

                    }
                })
            },

            data(){
                let page = JSON.stringify({
                    token : this.token,
                    driverId : this.userId.teamId == ''||this.userId.teamId == undefined?this.userId.driverId:undefined,
                    startTime : this.forminline.value6[0] == null ? '':this.forminline.value6[0],
                    endTime : this.forminline.value6[1]== null ? '':this.forminline.value6[1]+86400000-1,
                    pageNum : this.currentPage1,
                    pageSize : this.pagesize,
                    type :  this.type,
                    isAccount:this.forminline.accountStatus,
                    teamId:this.userId.teamId
                });
                console.log(page);
                this.ajax(page)
            },
            demand(){
                if (this.forminline.value6 == undefined || this.forminline.value6 == null){
                    this.forminline.value6 = []
                }
                let page = JSON.stringify({
                    token : this.token,
                    driverId : this.userId.driverId ,
                    type :  this.type,
                    startTime : this.forminline.value6[0],
                    endTime : this.forminline.value6[1]+86400000-1,
                    pageNum : this.currentPage1=1,
                    pageSize : this.pagesize,
                    isAccount:this.forminline.accountStatus,
                    teamId:this.userId.teamId
                });
                this.ajax(page)
            },
            handleCurrentChange(val) {
                if (this.forminline.value6 == undefined || this.forminline.value6 == null){
                    this.forminline.value6 = []
                };
                this.currentPage = val;
                let page = JSON.stringify({
                    token : this.token,
                    driverId : this.userId.driverId ,
                    type :  this.type,
                    startTime : this.forminline.value6[0],
                    endTime : this.forminline.value6[1]+86400000-1,
                    pageNum : this.currentPage,
                    pageSize : this.pagesize,
                    teamId:this.userId.teamId,
                    isAccount:this.forminline.accountStatus,
                });
                this.ajax(page)
            },
            handleSizeChange(val) {
                if (this.forminline.value6 == undefined || this.forminline.value6 == null){
                    this.forminline.value6 = []
                };
                this.pagesize = val;
                let page = JSON.stringify({
                    token : this.token,
                    driverId : this.userId.driverId ,
                    type :  this.type,
                    startTime : this.forminline.value6[0],
                    endTime : this.forminline.value6[1]+86400000-1,
                    pageNum : this.currentPage,
                    pageSize : this.pagesize,
                    teamId:this.userId.teamId,
                    isAccount:this.forminline.accountStatus,
                });
                this.ajax(page)
            },
            // handleClick(_index){
            //     this.dialogFormVisible = true;
            //     this.ruleForm.lastTransportPrice = this.tableData[_index].optAfterPrice;
            //     let page = JSON.stringify({
            //         token :this.token
            //     })
            //     this.$http.post(this.global.lightningUrl + '/company/finance/companyacctquery',page,{
            //         headers: {
            //             'Content-Type': 'application/json;charset=UTF-8'
            //         }
            //     } ).then((res)=>{
            //         this.link = res.body.result;
            //         // this.ruleForm.options = this.link[0].name;
            //         this.ruleForm.options= this.link[0].id;
            //         this.ruleForm.trackId = this.tableData[_index].trackId;
            //         this.ruleForm.id = this.tableData[_index].changeId;
            //         this.ruleForm.startTime = this.tableData[_index].arrivalTime;
            //     })
            //
            // },
            cymoneys(){
                let a = Number(this.ruleForm.lastTransportPrice);
                let b = Number(this.ruleForm.cymoney);
                let bMath = Math.abs(Number(this.ruleForm.cymoney));

                // console.log(bMath);
                if ( b < 0 && bMath >= a){
                    setTimeout(()=>{
                        this.ruleForm.cymoney = (- this.ruleForm.lastTransportPrice);
                        this.ruleForm.zhmoney = '0.00'
                    },20)
                }else {

                    if( b === '' ){
                        this.ruleForm.zhmoney = '';
                        this.ruleForm.cymoney = ''
                    }else if (b === 0){
                        this.ruleForm.zhmoney = this.ruleForm.lastTransportPrice
                    }else if (b > 0){
                        let c  = a + b;
                        this.ruleForm.zhmoney = Number(c)*100/100;
                        this.ruleForm.zhmoney = this.ruleForm.zhmoney.toFixed(2)
                    }else if (b < 0){
                        let c  = a + b;
                        this.ruleForm.zhmoney = Number(c)*100/100;
                        this.ruleForm.zhmoney = this.ruleForm.zhmoney.toFixed(2)
                    }else if ( b != isNaN(b) ) {
                        this.ruleForm.zhmoney = '';
                        this.ruleForm.cymoney = ''
                    }
                }
            },
            submitForm(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        this.queryStatus_a = false
                        for (let i = 0 ; i < this.link.length; i++){
                            if (this.ruleForm.options == this.link[i].id){
                                this.linkname = this.link[i].name
                            }
                        }
                        let page = JSON.stringify({
                            token : this.token,
                            trackId : this.ruleForm.trackId,
                            optMoney : this.ruleForm.cymoney,
                            adjustmentReason : this.ruleForm.textarea,
                            remark : this.ruleForm.textarea0,
                            examineOperaterId : this.ruleForm.options,
                            examineOperaterName : this.linkname,
                        });
                        console.log(page);
                        this.$http.post(this.global.lightningUrl + '/company/finance/submitaccout',page ,{
                        // this.$http.post('http://192.168.50.145:7031/company/finance/submitaccout',page ,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res)=>{
                            console.log(res);
                            if(res.body.errcode == 0){
                                this.queryStatus_a = true
                                this.$message({
                                    message: res.body.message,
                                    type: 'success'
                                });
                                this.dialogFormVisible = false;
                                this.ruleForm= ''
                                this.data();

                            }else {
                                this.queryStatus_a = true
                                this.$message({
                                    message: res.body.message,
                                });
                                this.dialogFormVisible = false;
                                this.data();
                            }
                        })
                    } else {
                        return false;
                    }
                });

            },
            onSubmit0(){
                this.$router.push({path:'/sjcw_record'})
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        // this.ruleForm= ''
                        this.ruleForm.cymoney = '',
                        this.ruleForm.zhmoney = '',
                        this.ruleForm.textarea = '',
                        this.ruleForm.textarea0 = ''
                    })
                    .catch(_ => {});
            },
            handleClick(tab, event) {
                console.log(tab, event);
                console.log(this.activeName2);
                if (this.activeName2 == 'BTiP') {
                    this.data();
                }else if (this.activeName2 == 'CTiP'){
                    this.ajax1()
                }else if (this.activeName2 == 'car'){
                    this.ajax2()
                }else if(this.activeName2 == 'Invitation'){
                    this.ajax3()
                }else if(this.activeName2 == 'Adjustment'){
                    this.ajax4()
                }
            },
            handleCurrentChange1(val) {
                // if (this.forminline.value6 == undefined || this.forminline.value6 == null){
                //     this.forminline.value6 = []
                // };
                this.CcurrentPage1 = val;
                this.ajax1()
            },
            handleSizeChange1(val) {
                // if (this.forminline.value6 == undefined || this.forminline.value6 == null){
                //     this.forminline.value6 = []
                // };
                this.Cpagesize = val;
                this.ajax1()
            },
            handleCurrentChange2(val) {
                if (this.carforminline.subsidy== undefined || this.carforminline.subsidy == null){
                    this.carforminline.subsidy = []
                };
                this.carcurrentPage1 = val;
                this.ajax2()
            },
            handleSizeChange2(val) {
                if (this.carforminline.subsidy == undefined || this.carforminline.subsidy == null){
                    this.carforminline.subsidy = []
                };
                this.carpagesize = val;
                this.ajax2()
            },
            handleCurrentChange3(val) {
                this.InvitationcurrentPage1 = val;
                this.ajax3()
            },
            handleSizeChange3(val) {

                this.Invitationpagesize = val;
                this.ajax3()
            },
            handleCurrentChange4(val) {
                this.AdjustmentcurrentPage1 = val
                this.ajax4()
            },
            handleSizeChange4(val) {
                this.Adjustmentpagesize =val
                this.ajax4()


            },
        },
    }
</script>
<style lang="scss" scoped>
.main{
    .examineSelect{
        .el-select{
            width: 32%;
        }
    }
    .financeCard{
        padding: 30px 50px ;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 2px 2px 2px #C2C5C9;
        margin-bottom: 20px;
        min-width: 1284.800px;
        .PersonalInformation{
            box-sizing: border-box;
            overflow: auto;
            .PI_l{
                width: 49%;
                text-align: right;
                padding-right: 3px;
                color:#4D8BF8 ;
                font-size: 20px;
                font-weight: bold;
                display: inline-block;
                float: left;
                .phone{
                    color: black;
                }
                span{
                    display: block;
                    width: 100%;
                }
            }
            .PI_r{
                width: 49%;
                float: left;
                line-height: 30px;
                font-size: 16px;
                /*color: #A3A3A3;*/
                .son{

                }
            }
            .vertical{
                float: left;
            }
            .vertical::after{
                display: inline-block;
                transform: translateX(100%) translateY(30%);
                text-align: center;
                content: '';
                margin:0 10px 12px 7px;
                width: 2px;
                height: 35px;
                vertical-align: -6px;
                background-color: #CBCBCB;

            }
        }
        .money{
            padding: 10px 100px;
            font-size: 16px;
            .el-col{
                line-height: 40px;
            }
            img{
                padding-right: 7px;
                vertical-align:middle
            }
        }
    }
    >p{
        display: block;
        padding-bottom:20px;
    }
    h1{
        padding-bottom: 20px;
    }
    ul{
        li{
            padding-bottom: 20px;
            overflow: hidden;

            div{
                float: left;
                padding-right: 30px;
            }
        }
    }
    .el-pagination{
        text-align: center;
        padding-top: 20px;
    }
    .el-dialog{
        min-width: 550px;
    }
}
</style>