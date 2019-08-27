<template>
    <div class="main">
        <div class="header">财务管理 > 客户已出账单 > 账单详情</div>
        <div class="box" >
            <div style="width: 100%;display: flex">
                <div class="zTime" ><span class="wire"></span>账单周期 ( {{ this.objs.billStartTime| dateFrm  }} 至 {{ this.objs.billEndTime| dateFrm }} )</div>

                <div class="dashed"></div>
                <div style="color: #3771D2;display: inline-block;font-size: 20px;font-weight: bold;float: right;min-width: 110px;
">
                    状态 ：{{objs.isOverdue | isOverdueTP}}
                </div>
            </div>
            <div class="center" id="center">
                <ul class="center_ul">
                    <li class="center_li_m0">
                        <span class="center_span0">分公司 :  </span>
                        <span class="center_span1"> {{this.objs.filialeName}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">账单总金额（元） : </span>
                        <span class="center_span1"> {{this.objs.billMoney}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">是否逾期 : </span>
                        <span class="center_span1"> {{this.objs.isOverdue}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">客户编号 : </span>
                        <span class="center_span1"> {{this.objs.customerId}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">回款状态 : </span>
                        <span class="center_span1"> {{this.objs.billStatus}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">逾期天数 : </span>
                        <span class="center_span1"> {{this.objs.overdueDays}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">项目名称 : </span>
                        <span class="center_span1"> {{this.objs.customerName}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">回款方式 : </span>
                        <span class="center_span1"> {{this.objs.repayWay}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">剩余逾期金额（元） : </span>
                        <span class="center_span1"> {{this.objs.overdueAmount}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">销售专员 : </span>
                        <span class="center_span1"> {{this.objs.saleName}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">已回款金额（元） : </span>
                        <span class="center_span1"> {{this.objs.returnedMoney}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">账期 : </span>
                        <span class="center_span1">N+ {{this.objs.billCycle}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">运营专员 : </span>
                        <span class="center_span1"> {{this.objs.projectName}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">是否开票 : </span>
                        <span class="center_span1"> {{this.objs.isInvoice}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">最迟还款日 : </span>
                        <span class="center_span1"> {{this.objs.deadline| dateFrm}} <span style="color: #606266">（含承诺期）</span></span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">出车数量 : </span>
                        <span class="center_span1"> {{this.objs.trackCount}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">申请出账时间 : </span>
                        <span class="center_span1"> {{this.objs.approvalOutbillTime| dateFrm}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">税率 : </span>
                        <span class="center_span1"> {{this.objs.taxRate}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">违约金总金额（元） : </span>
                        <span class="center_span1"> {{this.objs.penaltyMoney}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">最迟还款日 : </span>
                        <span class="center_span1"> {{this.objs.deadline| dateFrm}}</span>
                    </li>
                    <li class="center_li_m0">
                        <span class="center_span0">账单还款日 : </span>
                        <span class="center_span1"> {{this.objs.billCycleRepayTime| dateFrm}}</span>
                    </li>

                </ul>

            </div>
            <div class="accessory" v-if=" objs.billAttachmentList !== []">
                <div class="accessory_t">附件 ：</div>
                <div class="accessory_box">
                    <!--<div style="float: left ; width: 110px;text-align: right;color:#606266 ">附件 : </div>-->
                    <!--<div style="float: left;color:#606266" >-->

                        <!--<span style="display: block;margin-bottom: 8px" v-for="i in objs.billAttachmentList"> &nbsp;{{i.fileName}}&nbsp;&nbsp; <span style="color: #409EFF;  cursor:pointer" @click="ondownloads(i)">下载</span> </span><br>-->
                    <!--</div>-->
                    <span class="accessory_c" v-for="i in objs.billAttachmentList">
                        {{i.fileName}} &nbsp;&nbsp;<span  @click="ondownloads(i)">下载</span>

                    </span>
                </div>

            </div>
            <div class="footer" style="margin-top: 20px">
                <el-tabs type="border-card">
                    <el-tab-pane label="出车明细">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="出车时间">
                                <!--<el-col :span="11">-->
                                <!--<el-date-picker type="date" placeholder="开始时间" v-model="formInline.date1" :picker-options="pickerOptions0" value-format="yyyyMMdd" style="width: 100%;"></el-date-picker>-->
                                <!--</el-col>-->
                                <!--<el-col :span="11">-->
                                <!--<el-date-picker type="date" placeholder="结束时间" v-model="formInline.date" :picker-options="pickerOptions1"  value-format="yyyyMMdd" style="width: 100%;"></el-date-picker>-->
                                <!--</el-col>-->

                                <el-date-picker
                                        v-model="formInline.time"
                                        type="daterange"
                                        value-format="timestamp"
                                        range-separator="至"
                                        :formatter="dateFormat"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="derive">查询</el-button>

                                <el-button type="primary" @click="Export()"  v-if="CRMAccountDetailExport">导出</el-button>
                                <!--<el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="CRMAccountDetailExport">导出</el-button>-->
                                <!--<el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position:absolute;top:0%;left:40%;z-index: 999999;"></el-progress>-->
                                <!--<el-button type="primary" @click="ontime" :disabled="dis">导出流水</el-button>-->
                            </el-form-item>
                        </el-form>
                        <div class="center_title">
                            交易流水
                        </div>
                        <el-table
                                :data="tableData"
                                style="width: 100%">
                            <el-table-column
                                    prop="trackId"
                                    label="出车单编号"
                                    align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="startTime"
                                    label="出车时间"
                                    align="center"
                                    :formatter="dateFormat"
                            >
                            </el-table-column>

                            <el-table-column
                                    prop="status"
                                    align="center"
                                    label="出车状态">
                            </el-table-column>
                            <el-table-column
                                    :formatter="dateFormatHm"
                                    prop="arrivalTime"
                                    label="到仓签到时间"
                                    align="center">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="司机姓名"
                                    align="center">
                            </el-table-column>
                            <!--<el-table-column-->
                            <!--prop="vehicleNum"-->
                            <!--label="车牌号"-->
                            <!--align="center">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                            <!--prop="vehicleType"-->
                            <!--label="车型"-->
                            <!--align="center">-->
                            <!--</el-table-column>-->
                            <el-table-column
                                    prop="depotName"
                                    label="仓名称"
                                    align="center">
                            </el-table-column>
                            <el-table-column
                                    prop="lineName"
                                    label="线路名称"
                                    align="center">
                            </el-table-column>
                            <el-table-column
                                    prop="arrivalPointCount"
                                    label="配送点数"
                                    align="center">
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


                            <el-table-column
                                    prop="schedulePrice"
                                    label="合同价格（元）"
                                    align="center">
                            </el-table-column>
                            <el-table-column
                                    prop="transportPrice"
                                    label="司机基础运费（元）"
                                    align="center">
                            </el-table-column>
                            <el-table-column
                                    prop="customerAdjustmentBeforePrice"
                                    label="调账前总金额（元）"
                                    align="center">
                            </el-table-column>
                            <el-table-column
                                    prop="optMoney"
                                    label="调账金额（元）"
                                    align="center">
                                <template slot-scope="scope">
                                    <a v-if="tableData[scope.$index].customerStatus == 'no'">-</a>
                                    <a v-if="tableData[scope.$index].customerStatus == 'yes'" type="text" size="small">{{tableData[scope.$index].customerOptPrice}}</a>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="optAfterPrice"
                                    label="调账后总金额（元）"
                                    align="center">
                                <template slot-scope="scope">
                                    <a v-if="tableData[scope.$index].customerStatus == 'no'">-</a>
                                    <a v-if="tableData[scope.$index].customerStatus == 'yes'" type="text" size="small">{{tableData[scope.$index].customerAdjustmentAfterPrice}}</a>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    prop="adjustmentReason"
                                    label="调账原因"
                                    align="center">
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage"
                                :page-size="pagesize"
                                layout="total, prev, pager, next"
                                :total="total">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="红包明细">
                        <div class="footer">
                            <el-table
                                    :data="tableData2"
                                    style="width: 100%">
                                <el-table-column
                                        prop="createTime"
                                        label="发放日期"
                                        :formatter="dateFormat"
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
                                        prop="trackStartTime"
                                        :formatter="dateFormat"
                                        align="center"
                                        label="出车日期">
                                </el-table-column>
                                <el-table-column
                                        prop="driverName"
                                        align="center"
                                        label="司机姓名">
                                </el-table-column>
                                <el-table-column
                                        prop="phone"
                                        align="center"
                                        label="司机电话">
                                </el-table-column>
                                <el-table-column
                                        prop="vehicleType"
                                        align="center"
                                        label="车型">
                                </el-table-column>
                                <el-table-column
                                        prop="vehicleNum"
                                        align="center"
                                        label="车牌号">
                                </el-table-column>
                                <el-table-column
                                        prop="amount"
                                        align="center"
                                        label="发放金额">
                                </el-table-column>
                                <el-table-column
                                        prop="reason"
                                        align="center"
                                        label="发放原因">
                                </el-table-column>
                                <!--<el-table-column-->
                                <!--prop="customerName"-->
                                <!--align="center"-->
                                <!--:formatter="dateFormat"-->
                                <!--label="结算日期">-->
                                <!--</el-table-column>-->
                            </el-table>
                        </div>
                        <el-pagination
                                @current-change="handleCurrentChange2"
                                :current-page.sync="currentPage2"
                                :page-size="pagesize2"
                                layout="total, prev, pager, next"
                                :total="total2">
                        </el-pagination>
                    </el-tab-pane>
                </el-tabs>


            </div>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    import { openPostWindow } from '../../js/report.js'
export default {
    data() {
         return {

             total:0,
             currentPage: 1,
             pagesize:10,//每页的数据条数
             formInline:{
                time:'',
             },
             tableData: [ ],


             total2:0,
             currentPage2: 1,
             pagesize2:10,//每页的数据条数
             tableData2:[],

             objs:'',
             token:'',
             time2:'',
             time3:'',
             time4:'',
             time5:'',
             dis:false,
             date: new Date(),
             queryStatus:true,
             fullscreenLoading: false,
//进度条
             ProgressBar:0,
             CRMAccountDetailExport:false,
             num:0,

         }
     },
    created(){
        this.objs=JSON.parse(sessionStorage.getItem("particulars")).obj;
        console.log(this.objs);
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        if ( this.objs.isInvoice == 'yes' ){
            this.objs.isInvoice = '是';
        }else if( this.objs.isInvoice == 'no'){
            this.objs.isInvoice = '否';
        };
        this.formInline.time=[this.objs.billStartTime ,this.objs.billEndTime-86400000+1];
        let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.CRMAccountDetailExport =  jurisdictions[7].menus[18].choose;
        this.data();
    },
    methods: {
        ondownloads(i){
                // console.log(i.filePath);
                // window.location.href = i.filePath;
                window.open(i.filePath,'_blank ')

        },
         Export(){
             let page = JSON.stringify({
                 token : this.token,
                 pageNum : this.currentPage,
                 pageSize : this.pagesize,
                 customerId:this.objs.customerId,
                 startTime:this.formInline.time!=null?this.formInline.time[0]:undefined,
                 endTime: this.formInline.time!=null?this.formInline.time[1]+86400000-1:undefined,
             });
             console.log(page);
             var exportLink = this.global.lightningUrl + '/companyv1/finance/report/export/customer_track';
             openPostWindow(exportLink,page);
             // let approvertime;
             //     if (this.formInline.time == undefined || this.formInline.time == '' || this.formInline.time == null){
             //         approvertime = ''
             //     }else {
             //         // cashtime = 'between '+ startTime +' and '+ endTime;
             //         let a = this.formInline.time[0] ;
             //         let b = this.formInline.time[1] +86400000-1;
             //
             //         approvertime = 'between ' + a + ' and ' + b ;
             //     }
             //
             // this.$message({
             //     showClose: true,
             //     message: '正在导出请耐心等待！',
             //     type: 'warning'
             // });
             // this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
             //    "token":this.token,
             //    "exportName":"customerBillDetail",   //-- 导出模块名称
             //    "t.customer_id":this.objs.customerId,       //-- 商户ID
             //    "t.start_time":approvertime //-- 对应账单起始日期
             // })).then(run=>{
             //     console.log(run);
             //     if(run.body.errcode == 0){
             //         this.fullscreenLoading = true;
             //         this.queryStatus = false;
             //         this.ProgressBar = 0;
             //         this.code = run.body.result;
             //         this.interval = setInterval(() => {
             //             this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportProcess',JSON.stringify({
             //                 "token":this.token,
             //                 "id":this.code,
             //             })).then(run=>{
             //                 console.log(run);
             //                 if(run.body.errcode == 0){
             //                     this.ProgressBar  =   parseInt(run.body.result.exportProcess) ;
             //                     if (this.ProgressBar == 100){
             //                         clearInterval(this.interval);
             //                         setTimeout(()=> {
             //                             window.location.href = run.body.result.externalRoad;
             //                             this.$message({
             //                                 message: '导出成功',
             //                                 type: 'success'
             //                             });
             //                             this.fullscreenLoading = false;
             //                             this.queryStatus = true;
             //                         },1200)
             //                     }
             //                 }
             //             })
             //         },1000);
             //     }else {
             //         this.$message({
             //             showClose: true,
             //             message: run.body.message,
             //             type: 'error'
             //         });
             //     }
             // })
         },
         data(){
             let page = JSON.stringify({
                token : this.token,
                pageNum : this.currentPage,
                pageSize : this.pagesize,
                customerId:this.objs.customerId,
                 startTime: this.formInline.time[0] ,
                 endTime: this.formInline.time[1]+86400000-1,
            });
             console.log(page);
             this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_track',page,{
             //     this.$http.post( 'http://192.168.50.202:7035/finance/customer/queryTransactionRecord',page,{
                 //
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                this.total =  res.body.result.total;
                this.tableData = res.body.result.rows;
                for (let i = 0 ; i < this.tableData.length; i++) {
                    if (this.tableData[i].status == 'finished') {
                        this.tableData[i].status = '正常'
                    } else {
                        this.tableData[i].status = '异常'
                    }
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

                }
            })
             let page1 = JSON.stringify({
                 token : this.token,
                 pageNum : this.currentPage2,
                 pageSize : this.pagesize2,
                 customerId:this.objs.customerId,
                 createTimeBegin:this.objs.billStartTime,
                 createTimeEnd:   this.objs.billEndTime,
             })
             this.ajax(page1)
        },
         handleCurrentChange(val) {
             this.currentPage = val;
             if (this.formInline.time == undefined){
                 this.formInline.time=[this.objs.billStartTime ,this.objs.billEndTime];
             }else{
                 if ( this.formInline.time[1] > this.objs.billEndTime || this.formInline.time[0] < this.objs.billStartTime ){
                     this.$message({
                         message: '超出查找范围',
                         type: 'warning'
                     });
                     this.formInline.time=[this.objs.billStartTime ,this.objs.billEndTime];
                 }else {
                     this.data()
                 }
             }
         },
         derive(){
             if (this.formInline.time == undefined){
                 this.formInline.time=[this.objs.billStartTime ,this.objs.billEndTime];
             }else{
                 if ( this.formInline.time[1] > this.objs.billEndTime || this.formInline.time[0] < this.objs.billStartTime ){
                     this.$message({
                         message: '超出查找范围',
                         type: 'warning'
                     });
                     this.formInline.time=[this.objs.billStartTime ,this.objs.billEndTime];
                 }else {
                     this.currentPage = 1;
                     this.num = 1;
                     this.data()
                 }
             }

         },
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
             return moment(date).format("YYYY-MM-DD HH:mm");
         },

         ajax(page){
             this.$http.post(this.global.lightningUrl + '/companyv1/finance/redpacket/queryCustomerRedPackets',page,{
                 headers: {
                     'Content-Type': 'application/json;charset=UTF-8'
                 }
             }).then((res)=>{
                 console.log(res);
                 this.total2 = res.body.result.total;
                 this.tableData2 = res.body.result.rows;
                 for ( let i= 0;i<this.tableData2.length;i++ ) {
                     if (this.tableData2[i].vehicleType != ''&&this.tableData2[i].vehicleType != null &&this.tableData2[i].vehicleType != undefined ){
                         this.tableData2[i].vehicleType = JSON.parse(this.tableData2[i].vehicleType).name + ' '
                             + JSON.parse(this.tableData2[i].vehicleType).isElectric + ' '
                             + JSON.parse(this.tableData2[i].vehicleType).isTailBoard + ' '
                             + JSON.parse(this.tableData2[i].vehicleType).length + ' '
                             + JSON.parse(this.tableData2[i].vehicleType).isCertificate + ' '
                             + JSON.parse(this.tableData2[i].vehicleType).isCold ;
                     }else {
                         this.tableData[i].vehicleType = ''
                     }

                     // if (this.tableData[i].projectType == 'ProjectCustomer') {
                     //     this.tableData[i].projectType = '项目客户'
                     // }else if (this.tableData[i].projectType == 'IndependentCustomer') {
                     //     this.tableData[i].projectType = '自助客户'
                     // }
                     // if (this.tableData[i].terminal == 'project') {
                     //     this.tableData[i].terminal = '项目'
                     // }else if (this.tableData[i].terminal == 'customer') {
                     //     this.tableData[i].terminal = '客户'
                     // }
                     // if (this.tableData[i].checkStatus == 'audit'){
                     //     this.tableData[i].checkStatus = '审批中';
                     // }else if(this.tableData[i].checkStatus == 'pass'){
                     //     this.tableData[i].checkStatus = '审批通过';
                     // }else if(this.tableData[i].checkStatus ==  'notpass'){
                     //     this.tableData[i].checkStatus = '审批未通过';
                     // }else{
                     //     this.tableData[i].checkStatus = '未调账';
                     // }

                 }
             })
         },
         handleCurrentChange2(val){
             this.currentPage2 = val
             let page1 = JSON.stringify({
                 token: this.token,
                 pageNum : this.currentPage2,
                 pageSize : this.pagesize2,
                 customerId:this.objs.customerId,
                 createTimeBegin:this.objs.billStartTime,
                 createTimeEnd:   this.objs.billEndTime,
             })
             this.ajax(page1)
         }

     },
    filters: {
        dateFrm: function (el) {
            return moment(el).format("YYYY-MM-DD");
        },
        isOverdueTP: function (val) {
            console.log(val+123);
            if (val == '否'){
                return '正常'
            }else{
                return '逾期'
            }
        }
    }
}

</script>
<style lang="scss" scoped>
.main{
    .box{
        padding: 30px;
        background-color: #fff;
        min-width: 1200px;
        .zTime{
            /*flex: 2;*/
            padding-bottom: 20px;
            font-size: 22px;
            font-weight: 500;
            line-height: 25px;
            display: inline-block;
            padding-right: 10px;
            min-width: 430px;
            .wire::before {
                display: inline-block;
                margin-right: 8px;
                content: '';
                width: 3px;
                height: 25px;
                vertical-align: -6px;
                background-color: #277bf5;
            }
        }
        .dashed{
            width: 63%;
            display: inline-block;
            border-bottom: 1px dashed #D9D9D9;
            margin-bottom: 32px;
            margin-right: 10px;
        }
        #center {
            padding: 30px 55px;
            min-width: 900px;
            font-size: 18px;
            background-color: #F3F7FA;
            .center_ul{
                .center_li_m0{
                    display: inline-block;
                    overflow: hidden;
                    width: 33%;
                    padding-bottom: 5px;
                    .center_span0{
                        color: #606266;

                    }
                }
            }
        }
        .accessory{
            margin-top: 10px;
            padding: 10px 55px 5px;
            background-color: #F3F7FA;
            font-size: 18px;
            box-sizing: border-box;
            width: 100%;
            .accessory_t{
                color: #606266;
                /*height:100% ;*/
                width: 6%;
                max-width: 90px;
                display: inline-block;
            }
            .accessory_box{
                display: inline-block;
                vertical-align:text-top;
                width: 93%;
                .accessory_c{
                    width: 33%;
                    display: inline-block;
                    color: #4874D0;
                    font-weight: bold;
                }
            }
        }
    }
    .header{
        margin-bottom: 20px;

    }

    .show_top {
        font-size:18px;
        border-bottom:1px solid #000;
        padding-bottom: 20px;
        min-width:400px ;
        color:#606266;
    }
    .ul_left{
        float: left;
        padding-top: 20px;
        font-size: 16px;
        width: 100%;
        ul{
            float: left;
        }
        .ul_one{
            width: 100%;
            min-width: 900px;
            padding-bottom: 12px;
            color:#606266;
            font-size: 16px;
            .one_name{
                display: inline-block;
                width: 110px;
                text-align: right;
            }
        }
        .ul_t{
            width: 50%;
            li{
                padding-right: 20px;
                height: 40px;
            }
        }
    }
    .from_show {
        width: 50%;
    }
    .el-form--inline .el-form-item {
        margin-right: 10px;
    }
    .center_title {
        width:100%;
        line-height: 50px;
        font-size: 18px;
        background-color: #F2F2F2;
    }
    .el-form{
        padding-top: 20px;
        min-width: 650px;
    }
    .el-pagination{
        text-align: center;
    }
}
</style>