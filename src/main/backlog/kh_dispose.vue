<template>
    <div class="main">
        <div class="header">
            <!--当前位置: 财务管理 > 客户账单 > 调账审批-->
            当前位置: 待办事项 > 客户账单审批
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="客户编号">
                <el-input v-model.trim="formInline.customerId" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入客户编号" ></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
                <el-input v-model.trim="formInline.customerName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="申请人">
                <el-input v-model.trim="formInline.commitName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入申请人"></el-input>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-select v-model="formInline.status" placeholder="请选择审批状态">
                    <el-option label="全部" value="" ></el-option>
                    <el-option label="审批中" value="approving"></el-option>
                    <el-option label="已通过" value="accepted"></el-option>
                    <el-option label="未通过" value="rejected"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="账单周期">
                <!--<el-date-picker-->
                <!--v-model="formInline.value6"-->
                <!--type="daterange"-->
                <!--range-separator="至"-->
                <!--value-format="timestamp"-->
                <!--start-placeholder="开始日期"-->
                <!--end-placeholder="结束日期">-->
                <!--</el-date-picker>-->
                <!--format="yyyy 年 MM 月"-->
                <el-date-picker
                        v-model="formInline.value6"
                        type="month"
                        value-format="timestamp"
                        format="yyyy 年 MM 月"
                        placeholder="选择开始时间">
                </el-date-picker>
                &nbsp;至&nbsp;
                <el-date-picker
                        v-model="formInline.value7"
                        type="month"
                        value-format="timestamp"
                        format="yyyy 年 MM 月"
                        placeholder="选择结束时间">
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
                    prop="customerId"
                    align="center"
                    label="客户编号">
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
                    align="center"
                    label="项目名称">
            </el-table-column>
            <el-table-column
                    prop="billStartTime"
                    align="center"
                    :formatter="dateFormatYM"
                    label="账单周期">
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
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="endTime"-->
            <!--align="center"-->
            <!--:formatter="dateFormat"-->
            <!--label="出车结束时间">-->
            <!--</el-table-column>-->

            <!--<el-table-column-->
                    <!--prop="billMoney"-->
                    <!--align="center"-->
                    <!--label="合同价格（元）">-->
            <!--</el-table-column>-->

            <el-table-column
                    prop="scheduleMoney"
                    align="center"
                    label="基础运费（元）">
            </el-table-column>
            <el-table-column
                    prop="adjustBeforeMoney"
                    align="center"
                    label="调账前总金额（元）">
            </el-table-column>
            <el-table-column
                    prop="adjustmentMountMoney"
                    align="center"
                    label="调账金额（元）">
            </el-table-column>
            <el-table-column
                    prop="adjustAfterMoney"
                    align="center"
                    label="调账后总金额（元）">
            </el-table-column>
            <el-table-column
                    prop="invoiceRate"
                    align="center"
                    label="税率">
            </el-table-column>
            <el-table-column
                    prop="invoiceCharge"
                    align="center"
                    label="税费（元）">
            </el-table-column>

            <el-table-column
                prop="actualBillMoney"
                align="center"
                label="账单总金额（元）">
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="remark"-->
                    <!--align="center"-->
                    <!--label="调账原因">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="optAdminName"
                    align="center"
                    label="申请人">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    align="center"
                    :formatter="dateFormathm"
                    label="申请时间">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="examineOperaterName"-->
            <!--align="center"-->
            <!--label="审核人">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="examineStatus"-->
                    <!--align="center"-->
                    <!--label="账单状态">-->
            <!--</el-table-column>-->

            <el-table-column
                    label="审批状态"
                    align="center"
            >
                <!--<template slot-scope="scope">-->
                    <!--<el-button @click="handleClick(scope.$index)" type="text" size="small" :disabled='arr[scope.$index]' >审核</el-button>-->
                <!--</template>-->

                <template slot-scope="scope">
                    <!--<el-button @click="handleClick(scope.$index)" type="text" size="small"-->
                    <!--:disabled='arr[scope.$index]'>审核-->
                    <!--</el-button>-->
                    <el-button type="text" size="small"
                               v-if="tableData[scope.$index].examineStatus == '已通过'">已通过
                    </el-button>

                    <el-popover
                            v-if="tableData[scope.$index].examineStatus == '未通过'"
                            placement="right"
                            trigger="hover"
                    >
                        <el-form  label-width="80px">
                            <el-form-item label="审批意见">
                                <el-input
                                        disabled
                                        type="textarea"
                                        placeholder="请输入内容"
                                        resize="none"
                                        v-model="tableData[scope.$index].approvalComments">
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <el-button slot="reference" type="text">未通过</el-button>
                    </el-popover>



                    <el-button type="text" size="small" @click="handleClick(scope.$index)"
                               v-if="(tableData[scope.$index].examineStatus == '审批中'&&tableData[scope.$index].isApproval == true)">审核
                    </el-button>
                    <el-button type="text" size="small"
                               v-if="(tableData[scope.$index].examineStatus == '审批中'&&tableData[scope.$index].isApproval == false)">审核中
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
            <el-dialog title="审批意见" :visible.sync="dialogFormVisible" class="dialog eldialog" center width="900px">
                <div class="titleMessage">
                    <div style="float: left;width: 45%">
                        <span class="f_size">账单信息</span>
                    </div>
                    <div class="float:right;width: 50%">
                        <span class="f_size z_time" >
                    <div style="display: inline-block" v-if="link.billStartTime" >
                        账单周期:
                        <span >{{link.billStartTime | dateFrm }}</span>
                        至
                        <span >{{link.billEndTime| dateFrm}}</span>
                    </div>

                        </span>
                    </div>
                </div>
                <div class="message_b">
                    <div class="message_l">
                        <el-row >
                            <!--<img src="../../images/png/ic_number.png" alt="">-->
                            <el-col :span="11" style="border-bottom:1px solid #CECCCC;">
                                <i class="img1" ></i><span style="display: inline-block;width: 35%" >客户编号 : </span>{{link.customerId}}</el-col>

                            <el-col :span="2"></el-col>
                            <el-col :span="11"  style="border-bottom:1px solid #CECCCC;">
                                <i class="img2" ></i><span style="display: inline-block;width: 35%" >账户状态 : </span>{{link.freezeAccount}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11" style="border-bottom:1px solid #CECCCC;">
                                <i class="img3" ></i><span style="display: inline-block;width: 35%">项目名称 : </span>{{link.customerName}}</el-col>
                            <el-col :span="2"></el-col>
                            <el-col :span="11" style="border-bottom:1px solid #CECCCC;">
                                <i class="img4" ></i><span style="display: inline-block;width: 35%">销售专员 : </span>{{link.saleName}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="11" style="border-bottom:1px solid #CECCCC;">
                                <i class="img5" ></i><span style="display: inline-block;width: 35%">所属分公司 : </span>{{link.filialeName}}</el-col>
                            <el-col :span="2"></el-col>
                            <el-col :span="11" style="border-bottom:1px solid #CECCCC;"><i class="img6" ></i><span style="display: inline-block;width: 35%">运营专员 : </span>{{link.projectName}}</el-col>
                        </el-row>
                    </div>
                    <br>
                    <div class="message_r">
                        <span style="font-size: 16px;display: inherit">账单总金额(元): </span>
                        <span style="font-size: 16px;display: inherit ;color: #277bf5;text-align: left;font-weight: 600;margin-top: 9px">
                            {{link.billMoney}}
                    </span>
                    </div>

                    <div class="message_r">
                        <span style="font-size: 16px;display: inherit">毛利额 : </span>
                        <span style="font-size: 16px;display: inherit ;color: #277bf5;text-align: left;font-weight: 600;margin-top: 9px">
                            {{link.grossProfit}}
                    </span>
                    </div>
                    <div class="message_r">
                        <span style="font-size: 16px;display: inherit">毛利率 : </span>
                        <span style="font-size: 16px;display: inherit ;color: #277bf5;text-align: left;font-weight: 600;margin-top: 9px">
                            {{link.grossProfitMargin}}
                    </span>
                    </div>
                </div>
                <div class="billing">
                    <div style="float: left;width: 50%">
                        <span class="f_size">开票信息</span>
                    </div>
                </div>
                <div class="message_billing">

                    <!--<el-row>-->
                        <!--<el-col :span="24"><span style="display: inline-block;width: 12%">是否开票 : </span>{{link.isInvoice}}-->
                            <!--&lt;!&ndash;<el-radio v-model="radio" label="yes">是</el-radio>&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-radio v-model="radio" label="no">否</el-radio>&ndash;&gt;-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                    <!--<el-row v-if="link.isInvoice=='是'">-->
                        <!--<el-col :span="24"><span style="display: inline-block;width: 12%">税率 : </span>{{link.invoiceRate}}</el-col>-->
                    <!--</el-row>-->

                    <!--<el-row v-if="link.isInvoice=='是'">-->
                        <!--<el-col :span="8"><span style="display: inline-block;width: 36%">开票金额 : </span>{{link.adjustAfterMoney}}</el-col>-->
                        <!--<el-col :span="8"><span style="display: inline-block;width: 29%">毛利额 : </span>{{link.grossProfit}}</el-col>-->
                        <!--<el-col :span="8"><span style="display: inline-block;width: 29%">毛利率 : </span>{{link.grossProfitMargin}}</el-col>-->
                    <!--</el-row>-->


                    <el-row>
                        <el-col :span="12"><span style="display: inline-block;width: 30%">是否开票 : </span>
                            <!--<el-radio v-model="radio" label="yes">是</el-radio>-->
                            <!--<el-radio v-model="radio" label="no">否</el-radio>-->
                            {{link.isInvoice}}
                        </el-col>
                        <el-col :span="12" v-if="link.judgeInvoice=='是'"><span style="display: inline-block;width: 30%">税率 : </span>{{link.invoiceRate}}</el-col>
                    </el-row>
                </div>

                <div class="billing" v-if="!billAttachmentList==[]">
                    <div style="float: left;width: 50%">
                        <span class="f_size">附件</span>
                    </div>
                </div>
                <div class="message_billing" v-if="!billAttachmentList==[]">

                    <el-row>
                        <el-col :span="24">
                            <span style="display: block;" v-for="i in billAttachmentList">{{i.fileName}}&nbsp;&nbsp; <span style="color: #409EFF;  cursor:pointer" @click="ondownloads(i)">下载</span> </span><br>
                        </el-col>
                    </el-row>
                </div>

                <div class="billing">
                    <div style="float: left;width: 50%">
                        <span class="f_size">补充信息</span>
                    </div>
                </div>
                <div class="supplement">
                    <el-row>
                        <el-col :span="24">账单详情 : &nbsp;
                            <el-button type="text" @click="rth()">点击查看账单详情>></el-button>
                            <!--/kh_detail-->
                            <!--<router-link to="/kh_detail" style="color:#409EFF ">-->
                            <!--点击查看账单详情>>-->
                            <!--</router-link>-->
                        </el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="24">审批意见 : &nbsp;
                            <el-radio v-model="radio" label="accepted">同意</el-radio>
                            <el-radio v-model="radio" label="rejected">退回</el-radio>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:15px;margin-left: 70px">
                        <el-col :span="24" >
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    resize="none"
                                    placeholder="请输入内容"
                                    v-model="textarea">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
                <div style="text-align: center">
                    <el-button type="primary" @click="onSubmit0" >提交</el-button>
                </div>

            </el-dialog>

        <!--查看审批意见-->
        <div class="min_w">
            <el-dialog
                    title="查看审批详情"
                    :visible.sync="approvalDetails"
                    width="30%"
                    min-width = '650px'
            >
                <div style="width: 100%;padding: 0 20px">
                    项目名称：{{approval_Customer.customerName}} <br>
                    申请人：&nbsp;&nbsp;&nbsp;{{approval_Customer.optAdminName}}<br>
                    申请时间：{{approval_Customer.createTime | dateFrm}}<br><br><br>
                    <div v-for="i in approver" style="width: 100%;padding: 20px 0 0 0 " >
                        审批人：&nbsp;&nbsp;&nbsp;{{i.adminName}} <br>
                        审批意见：<span v-if="i.opinion"></span>{{i.opinion}}<br>
                        申请时间：<span v-if="i.createTime">{{i.createTime|dateFrm}}</span>
                    </div>

                </div>

                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="approvalDetails = false">确 定</el-button>
            </span>
            </el-dialog>

        </div>
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
                aa:true,
                token:'',
                total:0,
                currentPage1:1,
                pagesize:10,
                formInline: {
                    customerId:'',
                    customerName:'',
                    commitName:'',
                    status:'',
                    value6:'',
                    value7:'',
                },
                dialogFormVisible: false,
                form: {
                    radion:'pass',
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                tableData:[],
                arr:[],
                link:[],
                radio:'accepted',
                textarea:'',
                approvalDetails: false,
                approval_Customer:[],
                approver:[],
                billAttachmentList:[]
            };
        },
        created(){
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.data()
        },
        methods: {
            ajax(){
                let page = JSON.stringify({
                    token: this.token,
                    pageNum:this.currentPage1,
                    pageSize:this.pagesize,
                    customerId : this.formInline.customerId,
                    customerName : this.formInline.customerName ,
                    beginTime : this.formInline.value6 ,
                    endTime : this.formInline.value7,
                    status : this.formInline.status,
                    commitName : this.formInline.commitName,
                    "backlogType":this.$route.query.status == 'backlog'?'backlog': "history"
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/customeroutbillapprovallist',page,{
                    //     this.$http.post( 'http://192.168.50.145:7031/company/account/applist',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    // console.log(res.body.result);
                    // if( JSON.stringify(res.body.result)){
                    //     alert(1)
                    // }
                    // if (Object.keys(res.body.result) == ''){
                    //     this.total = 0;
                    // }
                    console.log(Object.keys(res.body.result));
                    if ( res.body.result.rows !== undefined){
                        this.total = res.body.result.total;
                        this.tableData = res.body.result.rows;
                        for (let i = 0 ; i < this.tableData.length; i++){
                            this.arr.push(false);
                            // if (this.tableData[i].examineStatus == 'audit'){
                            //     this.arr[i] = false;
                            //     this.tableData[i].examineStatus = '审批中';
                            //     // this.status = true;
                            // }else if(this.tableData[i].examineStatus == 'pass'){
                            //     this.arr[i] = true;
                            //     this.tableData[i].examineStatus = '已通过';
                            // }else if(this.tableData[i].examineStatus =='notpass'){
                            //     this.arr[i] = true;
                            //     this.tableData[i].examineStatus = '未通过';
                            // };

                                if (this.tableData[i].examineStatus == 'approving') {
                                    this.tableData[i].examineStatus = '审批中'
                                }else if (this.tableData[i].examineStatus == 'accepted') {
                                    this.tableData[i].examineStatus = '已通过'
                                }else{
                                    this.tableData[i].examineStatus = '未通过'
                                }

                        };
                    } else {}

                })
            },
            data(){
                this.ajax()

            },
            handleClick(_index){
                this.dialogFormVisible = true;
                this.link = this.tableData[_index];
                if (this.link.isInvoice == 'yes'){
                    this.link.isInvoice = '是'
                } else{
                    this.link.isInvoice = '否'

                }
                if (this.link.freezeAccount == 'normal'){
                    this.link.freezeAccount = '正常'
                }else{
                    this.link.freezeAccount = '冻结'
                }
                console.log(this.link);
                this.billAttachmentList = this.link.billAttachmentList
                // this.link.driCusName = this.tableData[_index].customerName ;
                // this.link.commitName = this.tableData[_index].optAdminName;
                // this.link.commitTime = this.tableData[_index].createTime;
                // this.link.account = this.tableData[_index].billMoney;
                // this.link.adjustAccount = this.tableData[_index].adjustmentMountMoney;
                // // adjustAfterMoney
                // this.link.actualBillMoney = this.tableData[_index].adjustAfterMoney;
                // this.link.afterAdjustAccount = this.tableData[_index].actualBillMoney;
                // this.link.adjustReason = this.tableData[_index].adjustReason;
                // this.link.remark = this.tableData[_index].remark;
                // this.link.id = this.tableData[_index].id;
                // this.link.startTime = this.tableData[_index].billStartTime;
                // this.link.endTime = this.tableData[_index].billEndTime;
            },
            ondownloads(i){
                console.log(i.filePath);
                // window.location.href = i.filePath;
                window.open(i.filePath,'_blank ')
            },
            onSubmit() {
                // if (this.formInline.value7<this.formInline.value6){
                //     this.$message({
                //         message: '开始时间不能大于结束时间！',
                //         type: 'warning'
                //     });
                // }else if(this.formInline.value7=this.formInline.value6){
                //     this.$message({
                //         message: '开始时间不能等于结束时间！',
                //         type: 'warning'
                //     });
                // } else {
                //     this.currentPage1=1
                //     this.ajax();
                // }
                if (this.formInline.value6!=''&&this.formInline.value6!=null &&this.formInline.value7!=''&&this.formInline.value7!=null){
                    // if(this.formInline.value6 == this.formInline.value7){
                    //     this.$message({
                    //         message: '账单开始时间不能等于账单结束时间！',
                    //         type: 'warning'
                    //     });
                    // }else
                    if (this.formInline.value6 > this.formInline.value7) {
                        this.$message({
                            message: '账单开始时间不能大于账单结束时间！',
                            type: 'warning'
                        });
                    }else{
                            this.currentPage1=1
                            this.ajax();
                    }
                }else if (this.formInline.value6!=''&&this.formInline.value6!=null&&(this.formInline.value7==null||this.formInline.value7=='')) {
                    this.$message({
                        message: '请选择账单结束时间',
                        type: 'warning'
                    });
                }else if(this.formInline.value7!=''&&this.formInline.value7!=null&&(this.formInline.value6==null||this.formInline.value6=='')){
                    this.$message({
                        message: '请选择账单开始时间',
                        type: 'warning'
                    });
                }else{
                        this.currentPage1=1
                        this.ajax();
                }

            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            dateFormathm:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            dateFormatYM:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM");
            },
            handleCurrentChange(val){
                this.currentPage1 = val;
                this.ajax();
            },
            handleSizeChange(val) {
                this.pagesize = val ;
                this.ajax();
            },
            onSubmit0(){
                if(this.textarea == ''){
                    this.$message({
                        showClose: true,
                        message: '请输入审批意见！',
                        type: 'error'
                    });
                    return false
                }
                let page = JSON.stringify({
                    token: this.token,
                    itemId:this.link.id,
                    state:this.radio,
                    opinion:this.textarea,
                });
                console.log(page);
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/customeroutbillapproval',page,{
                    // this.$http.post( 'http://192.168.50.145:7031/company/account/custappliction',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.body.errcode == 0 ){
                        this.dialogFormVisible = false;
                        this.$message({
                            message: '提交成功！',
                            type: 'success'
                        });
                        this.textarea = '';
                        this.data ()
                        this.backlog()
                    } else {
                        this.$message.error('提交失败，请联系管理员！');
                        this.dialogFormVisible = false;
                        this.data()
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
            onapprovalDetails(_index){
                console.log(this.tableData[_index].trackId);
                this.approval_Customer = this.tableData[_index] ;
                let page = JSON.stringify({
                    token:this.token,
                    id:this.tableData[_index].id,
            })
                this.$http.post(this.global.lightningUrl +'/companyv1/finance/customeroutbillapprovaldetail',page,{
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
            rth(){
                // this.$route.p
                this.$router.push({path:'/kh_detail'});
                sessionStorage.setItem('list',JSON.stringify( this.link));
            },
        },
        filters:{
            dateFrm:function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm")
            }
        }
    }
</script>
<style lang="scss" scoped>
    .main{
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
        .eldialog{
            width: 100%;
            .f_size{
                font-size: 20px;
                font-weight: 500;
            }
            .titleMessage{
                width: 100%;
                overflow: hidden;
                border-bottom: 1px solid rgb(232,232,232);
                .z_time{
                    color: #277bf5;
                    float: right;
                }
            }
            .message_b{
                .message_l{
                    width: 85%;
                    float: left;
                    margin-top: 25px;
                    margin-left: 35px;
                    .el-col{
                        margin-bottom: 10px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                    .img1{
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        margin-right: 10px;
                        vertical-align:middle;
                        background: url('../../images/png/ic_number.png') no-repeat center;
                    }
                    .img2{
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                        display: inline-block;
                        vertical-align:middle;
                        background: url('../../images/png/ic_state.png') no-repeat center;
                    }
                    .img3{
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        vertical-align:middle;
                        margin-right: 10px;
                        background: url('../../images/png/ic_normal.png') no-repeat center;
                    }
                    .img4{
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                        display: inline-block;
                        vertical-align:middle;
                        background: url('../../images/png/ic_adviser.png') no-repeat center;
                    }
                    .img5{
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        margin-right: 10px;
                        vertical-align:middle;
                        background: url('../../images/png/ic_company.png') no-repeat center;
                    }
                    .img6{
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                        display: inline-block;
                        vertical-align:middle;
                        background: url('../../images/png/ic_case.png') no-repeat center;
                    }

                }
                .message_r{
                    width: 30%;
                    float: left;
                    text-align: left;
                    padding-top:20px;
                    padding-left: 22px;
                }
                margin-top: 15px;
                overflow: hidden;
                background-color: #f9fafc;

            }
            .billing{
                margin-top: 20px;
                overflow: hidden;
                border-bottom: 1px solid rgb(232,232,232);
            }
            .message_billing{
                margin-top: 20px;
                padding:  25px 35px;
                background-color: #f9fafc;
                .el-col{
                    margin-bottom: 10px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
            .supplement{
                margin-top: 20px;
                padding:  25px 35px;
                background-color: #f9fafc;

                .el-col{
                    margin-bottom: 10px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .el-textarea{
                    .el-textarea__inner{
                        max-height: 150px!important;
                    }
                }

            }
            img{
                position: static;
                vertical-align:middle
            }
        }
    }
</style>
