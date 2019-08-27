<template>
    <div class="main reconciliationeq">
        <div class="header">
            当前位置：<span>财务管理 > 客户账单</span>
        </div>
        <div class="top">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="账单编号">
                    <el-input v-model.trim="formInline.id"  placeholder="请输入账单编号"></el-input>
                </el-form-item>
                <el-form-item label="客户编号">
                    <el-input v-model.trim="formInline.customerId"  placeholder="请输入客户编号"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model.trim="formInline.customerName"  placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="所在分公司">
                    <el-select  v-model="formInline.areaId" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in link" :label='i.filialeName' :value="i.filialeId" :key="i.filialeId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="回款状态">
                    <el-select v-model="formInline.billStatus" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已结清" value="settled"></el-option>
                        <el-option label="未结清" value="not_settle"></el-option>
                        <el-option label="部分结清" value="part_settle"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="到期还款日期">
                    <!--<el-col :span="11">-->
                        <!--<el-date-picker type="date" placeholder="开始时间" value-format="yyyyMMdd" v-model="formInline.billStartTime" style="width: 100%;"></el-date-picker>-->
                    <!--</el-col>-->
                    <!--<el-col :span="11">-->
                        <!--<el-date-picker type="date" placeholder="结束时间" value-format="yyyyMMdd" v-model="formInline.billEndTime" style="width: 100%;"></el-date-picker>-->
                    <!--</el-col>-->
                    <el-date-picker
                            v-model="formInline.time"
                            type="daterange"
                            value-format="timestamp"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否逾期">
                    <el-select v-model="formInline.isOverdue" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="是" value="yes"></el-option>
                        <el-option label="否" value="no"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户类型">
                    <el-select v-model="formInline.type" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="临时项目" value="InterimCustomer"></el-option>
                        <el-option label="标准项目" value="ProjectCustomer"></el-option>
                        <el-option label="背靠背项目" value="BackToBackCustomer"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账单周期">
                    <el-date-picker
                            v-model="formInline.time2"
                            type="daterange"
                            value-format="timestamp"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="CRMAccountExport">导出</el-button>
                    <!--<el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>-->
                </el-form-item>
            </el-form>
        </div>
        <el-table
                :data="tableData"
                :row-class-name="tableRowClassName"
                >
            <!--<el-table-column-->
                    <!--label="账单编号"-->
                    <!--align="center"-->
                    <!--prop="id"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="customerId"-->
                    <!--label="客户编号"-->
                    <!--align="center"-->
                    <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="filialeName"
                    align="center"
                    width="140"
                    label="所在分公司">
            </el-table-column>
            <el-table-column
                    prop="customerName"
                    label="项目名称"
                    align="center"
                    width="110"
                   >
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="type"-->
                    <!--align="center"-->
                    <!--label="客户类型">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="saleName"-->
                    <!--align="center"-->
                    <!--label="销售专员">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="projectName"-->
                    <!--align="center"-->
                    <!--label="运营专员">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="billStartTime"
                    align="center"
                    width="110"
                    :formatter="dateFormat"
                    label="账单开始日期">
            </el-table-column>
            <el-table-column
                    prop="billEndTime"
                    align="center"
                    width="110"
                    :formatter="dateFormat"
                    label="账单结束日期">
            </el-table-column>
<!--<<<<<<< HEAD-->
            <!--<el-table-column-->
                    <!--prop="deadline"-->
                    <!--header-align="center"-->
                    <!--:formatter="dateFormat"-->
                    <!--label="到期还款日期">-->
            <!--</el-table-column>-->
<!--=======-->
            <!--<el-table-column-->
                    <!--prop="deadline"-->
                    <!--align="center"-->
                    <!--:formatter="dateFormat"-->
                    <!--label="到期还款日期">-->
            <!--</el-table-column>-->
<!--&gt;>>>>>> 6aea61b3be5dc46ef4809ea94f4220ebf89cd0a4-->
            <el-table-column
                    prop="actualBillMoney"
                    align="center"
                    width="140"
                    label="账单总金额（元）">
            </el-table-column>

            <!--<el-table-column-->
                    <!--prop="redPacketMoney"-->
                    <!--align="center"-->
                    <!--label="红包总金额（元）">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="insuranceCost"-->
                    <!--align="center"-->
                    <!--label="畅心保（元）">-->
            <!--</el-table-column>-->

            <!--<el-table-column-->
                    <!--prop="adjustmentMountMoney"-->
                    <!--align="center"-->
                    <!--label="调账差异金额(元)">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="invoiceCharge"-->
                    <!--align="center"-->
                    <!--label="税费(元)">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="actualBillMoney"
                    align="center"
                    width="120"
                    label="应付金额（元）">
            </el-table-column>
            <el-table-column
                    prop="billStatus"
                    align="center"
                    label="回款状态">
            </el-table-column>
            <el-table-column
                    prop="returnedMoney"
                    align="center"
                    width="140"
                    label="已回款金额（元）">
            </el-table-column>
            <el-table-column
                    prop="repayWay"
                    align="center"
                    label="回款方式">
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="repayTime"-->
                    <!--align="center"-->
                    <!--:formatter="dateFormat"-->
                    <!--label="回款时间">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="isOutBill"-->
                <!--align="center"-->
                <!--label="是否出账">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="isOverdue"
                    align="center"
                    label="是否逾期">
            </el-table-column>
            <el-table-column
                    prop="overdueAmount"
                    align="center"
                    width="150"
                    label="剩余逾期金额（元）">
            </el-table-column>
            <el-table-column
                    prop="approvalOutbillTime"
                    align="center"
                    width="110"
                    :formatter="dateFormat"
                    label="申请出账日期">
            </el-table-column>

            <!--<el-table-column-->
                    <!--prop="isInvoice"-->
                    <!--align="center"-->
                    <!--label="是否开票">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="makeInvoiceStatus"
                    align="center"
                    label="开票状态">
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="approvalAccTime"-->
                    <!--align="center"-->
                    <!--:formatter="dateFormat"-->
                    <!--label="开票时间">-->
            <!--</el-table-column>-->

            <el-table-column
                    prop="taxRate"
                    align="center"
                    label="税率">
            </el-table-column>
            <el-table-column
                    prop="financeRepayTime"
                    align="center"
                    width="110"
                    :formatter="dateFormat"
                    label="回款日期">
            </el-table-column>
            <el-table-column
                    align="center"
                    fixed="right"
                    label="操作"
                    width="120"
                    v-if="CRMAccountDetail"
            >
                <!--v-if="particulars==true?true:false"-->
                <template slot-scope="scope">
                    <!--<router-link to="khzdParticulars">-->
                    <el-button type="text" size="small" @click="examine(scope.$index)">查看</el-button>
                    <el-button  type="text" size="small"  style="padding: 0" @click="kp(scope.$index)" v-if="invoiceApply?tableData[scope.$index].isInvoice=='是':false">申请开票</el-button>
                    <!--<el-button type="text" size="small" v-if="limit==1 || limit==2?true:false" @click="ticket(scope.$index)" :disabled='arr[scope.$index]'>开票</el-button>-->
                    <!--<el-button type="text" size="small"  @click="ticket(scope.$index)" :disabled='arr[scope.$index]'>开票</el-button>-->
                    <!--</router-link>-->
                </template>
            </el-table-column>
        </el-table>
            <!-- 分页插件 -->
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 50]"
                layout="total,prev, pager, next,sizes"
                :total="total">
        </el-pagination>
        <!--弹出框-->
        </div>
</template>
<script>
    import moment from 'moment'
    import {F_jurisdiction,AIfirstClass0,secondLevel} from '../../js/Fjurisdiction.js'
    import {openPostWindow} from '../../js/report.js'
 export default {
     data() {
         return {
             arr:[],
             currentPage: 1,
             pagesize:10,
             total:0,
             formInline:{
                 billId:'',
                 customerId:'',
                 customerName:'',
                 time:'',
                 areaId:'',
                 repayStatus:'',
                 isDelay:'',
                 customerType:'',
             },
             tableData: [],
             link:[],
             linkname:'',
             see:'',
             limit:'',
             areaId:'',
             jurisdiction:'',
             manageArea:'',
             particulars:'',
             //导出
             queryStatus:true,
             fullscreenLoading: false,
             trackManageListExport:false,
             //进度条
             ProgressBar:0,
             CRMAccountExport:false,
             CRMAccountDetail:false,
             invoiceApply:'',
         }
     },
     created() {
         let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
         this.areaId = user.result.currentUser.areaId;
         console.log(this.areaId);
         this.token = user.result.token;
         let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
             this.CRMAccountExport =jurisdictions[7].menus[16].choose
             this.CRMAccountDetail=jurisdictions[7].menus[17].choose
         // this.jurisdiction = jurisdictions[13].menus[0].choose;
         // this.particulars= jurisdictions[7].menus[9].choose;
         this.id=JSON.parse(sessionStorage.getItem("obj"));
         this.invoiceApply = F_jurisdiction('invoiceApply',jurisdictions)
         let page = JSON.stringify({
             token: this.token
         });
         this.$http.post( this.global.lightningUrl + '/companyv1/finance/query/admin_management/area',page , {

             headers: {
                 'Content-Type': 'application/json;charset=UTF-8'
             }
         } ).then((res)=>{
             console.log(res);
             this.link = res.body.result;
         });
         if(sessionStorage.getItem('clientReconciliationeqcurrentPage')!=null){
             let currentPages = Number(sessionStorage.getItem('clientReconciliationeqcurrentPage'));
             let totals = Number(sessionStorage.getItem('clientReconciliationeqtotal'));
             let condition = sessionStorage.getItem('clientReconciliationeqcondition');

             this.formInline = JSON.parse(condition)
             this.currentPage = currentPages;
             this.total = totals;
             //查询接口
             this.requestTurnout()
         }else {
             this.driver_reconciliation();

         }

     },
     methods: {
         kp(_index){
             // console.log(this.tableData[_index].customerId);
             let clientelid = this.tableData[_index];
             sessionStorage.setItem('clientelid',JSON.stringify({clientelid}));
             this.$router.push({name:'applyforinvoice',query:{id2:Base64.encode(this.tableData[_index].id),id1:Base64.encode(this.tableData[_index].customerId)}})
         },
         dateFormat:function(row, column) {
             var date = row[column.property];
             if (date == undefined) {
                 return "";
             }
             return moment(date).format("YYYY-MM-DD");
         },
         Export(){
             let page = JSON.stringify({                     /*-- 到处模块*/
                 token : this.token,
                 pageNum : this.currentPage ,
                 pageSize : this.pagesize,
                 id :this.formInline.id,
                 customerId :this.formInline.customerId,
                 customerName :this.formInline.customerName,
                 billStatus :this.formInline.billStatus,
                 filialeId:this.formInline.areaId,
                 start :this.formInline.time[0],
                 end :this.formInline.time[1] +86400000-1,
                 isOverdue :this.formInline.isOverdue,
                 type : this.formInline.type,
                 areaId : this.areaId,
                 startTime : this.formInline.time2!= null?this.formInline.time2[0]:undefined,
                 endTime : this.formInline.time2!= null?this.formInline.time2[1] +86400000-1:undefined,
             });
             var exportLink = this.global.lightningUrl + '/companyv1/finance/report/export/customer_bill_record';
             openPostWindow(exportLink,page)

             // let filialeName;
             // for (let i = 0; i < this.link.length; i++) {
             //     if (this.formInline.areaId == this.link[i].filialeId) {
             //         filialeName = this.link[i].filialeName
             //     }
             // }
             // let deadline
             // console.log(this.formInline.time);
             // if (this.formInline.time == undefined || this.formInline.time == null|| this.formInline.time == []|| this.formInline.time.length == 0 ){
             //     this.formInline.time = []
             //     deadline = ''
             // }else{
             //     deadline = `between ${this.formInline.time[0]} and ${this.formInline.time[1] +86400000-1}`
             // }
             // let isOverdue ;
             // if (this.formInline.isOverdue == 'yes'){
             //     isOverdue = '是'
             // } else if (this.formInline.isOverdue == 'no'){
             //     isOverdue = '否'
             // }else{
             //     isOverdue = ''
             // }
             // let billStatus ;
             // if (this.formInline.billStatus == ''){
             //     billStatus = ''
             // }else if (this.formInline.billStatus == 'settled'){
             //     billStatus = '已结清'
             // }else if (this.formInline.billStatus == 'not_settle'){
             //     billStatus = '未结清'
             // }else if (this.formInline.billStatus == 'part_settle'){
             //     billStatus = '部分结清'
             // }
             // let type ;
             // if (this.formInline.type == ''){
             //     type = ''
             // } else if (this.formInline.type == 'IndependentCustomer') {
             //     type = '自助客户'
             // }else if (this.formInline.type == 'ProjectCustomer'){
             //     type = '项目客户'
             // }
             // this.$message({
             //     showClose: true,
             //     message: '正在导出请耐心等待！',
             //     type: 'warning'
             // });
             // this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
             //     "token":this.token,
             //     "exportName":"customerBill",     //-- 导出模块名称
             //     "id":this.formInline.id,                //-- 账单编号
             //     "customer_id":this.formInline.customerId,     //-- 客户编号
             //     "customer_name":this.formInline.customerName,       //-- 项目名称
             //     "filiale_id":this.formInline.areaId,     //-- 所在分公司
             //     "bill_status":billStatus,          //-- 账单状态   'not_settle':'未结清'  'settled':'已结清'  'part_settle':'部分结清'
             //     "deadline":deadline,  //-- 到期还款日期
             //     "is_overdue":isOverdue,     //-- 是否逾期 'yes':'是'  'no':'否'
             //     "type":type,     //-- 客户类型 'IndependentCustomer':'自主客户' 'ProjectCustomer':'项目客户'
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
         ajax(page){
             this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_bill_record',page,{
                 headers: {
                     'Content-Type': 'application/json;charset=UTF-8'
                 }
             }).then((res)=>{
                 console.log(res);
                 if (res.body.result.rows !== undefined){
                     this.total = res.body.result.total;
                     this.tableData = res.body.result.rows;
                     for (let i = 0 ; i < this.tableData.length; i++){
                         if (this.tableData[i].isPaid == 0){
                             this.tableData[i].isPaid = '未回款';
                         }else if(this.tableData[i].isPaid == 1){
                             this.tableData[i].isPaid = '已回款';
                         };
                         this.arr.push(false);
                         if (this.tableData[i].alreadyInvoiceMoney >0 ){
                             this.arr[i] = true
                         }
                         if ( this.tableData[i].isOverdue == 'yes' ){
                             this.tableData[i].isOverdue = '是';
                         }else if( this.tableData[i].isOverdue == 'no'){
                             this.tableData[i].isOverdue = '否';
                         };

                         if (this.tableData[i].isInvoice=='yes'){
                             this.tableData[i].isInvoice=='是'
                         } else if (this.tableData[i].isInvoice=='no') {
                             this.tableData[i].isInvoice=='否'

                         };
                         if ( this.tableData[i].billStatus == 'settled') {
                             this.tableData[i].billStatus = '已结清'
                         }else if( this.tableData[i].billStatus == 'not_settle'){
                             this.tableData[i].billStatus = '未结清'
                         }else if (this.tableData[i].billStatus == 'part_settle'){
                             this.tableData[i].billStatus = '部分结清'
                         }
                         if (this.tableData[i].type == 'ProjectCustomer') {
                             this.tableData[i].type = '标准项目'
                         }else if (this.tableData[i].type == 'InterimCustomer') {
                             this.tableData[i].type = '临时项目'
                         }else if (this.tableData[i].type == 'BackToBackCustomer') {
                             this.tableData[i].type = '背靠背项目'
                         }
                         if (this.tableData[i].repayWay == "automatic") {
                             this.tableData[i].repayWay = '自动还款'

                         }else{
                             this.tableData[i].repayWay = '指定还款'
                         }
                         if (this.tableData[i].isInvoice == "yes") {
                             this.tableData[i].isInvoice = '是'

                         }else{
                             this.tableData[i].isInvoice = '否'
                         }
                            if (this.tableData[i].makeInvoiceStatus == 'not_make'){
                                this.tableData[i].makeInvoiceStatus = '未开票'
                            }else if (this.tableData[i].makeInvoiceStatus == 'part_make'){
                                this.tableData[i].makeInvoiceStatus = '部分开票'
                            }else if (this.tableData[i].makeInvoiceStatus == 'all_make'){
                                this.tableData[i].makeInvoiceStatus = '已开票'
                            }
                            if (this.tableData[i].isOutBill == 'yes'){
                                this.tableData[i].isOutBill = '已出账'
                            } else if (this.tableData[i].isOutBill == 'no'){
                                this.tableData[i].isOutBill = '未出账'
                            }
                     };
                 } else {}

             })

             //更新本地存储
             if(sessionStorage.getItem('clientReconciliationeqcurrentPage')!=null&&sessionStorage.getItem('clientReconciliationeqcurrentPage')!=null){
                 //删除本地
                 sessionStorage.removeItem('clientReconciliationeqcurrentPage');
                 sessionStorage.removeItem('clientReconciliationeqcondition');
                 sessionStorage.removeItem('clientReconciliationeqtotal');
                 //存储本地
                 sessionStorage.setItem('clientReconciliationeqcurrentPage', JSON.stringify(this.currentPage));
                 sessionStorage.setItem('clientReconciliationeqtotal', JSON.stringify(this.total));
                 sessionStorage.setItem('clientReconciliationeqcondition', JSON.stringify(this.formInline));
             }else {
                 //存储本地
                 sessionStorage.setItem('clientReconciliationeqcurrentPage', JSON.stringify(this.currentPage));
                 sessionStorage.setItem('clientReconciliationeqtotal', JSON.stringify(this.total));
                 sessionStorage.setItem('clientReconciliationeqcondition', JSON.stringify(this.formInline));
             }
         },
         driver_reconciliation() {

             for( let i=0;i<this.link.length ;i++ ){
                 if (this.ruleForm1.areaId ==this.link[i].id ){
                     this.linkname =this.link[i].name
                 }
             };
             let page1 = JSON.stringify({

                 token : this.token,
                 pageNum : this.currentPage,
                 pageSize : this.pagesize,
                 id :this.formInline.id,
                 customerId :this.formInline.customerId,
                 customerName :this.formInline.customerName,
                 billStatus :this.formInline.billStatus,
                 filialeId:this.formInline.areaId,
                 start :this.formInline.time[0],
                 end :this.formInline.time[1] +86400000-1,
                 isOverdue :this.formInline.isOverdue,
                 type : this.formInline.type,
                 areaId : this.areaId,
                 startTime : this.formInline.time2!= null?this.formInline.time2[0]:undefined,
                 endTime : this.formInline.time2!= null?this.formInline.time2[1] +86400000-1:undefined,

             });
             console.log(page1);
             this.ajax(page1)

         },
         handleCurrentChange(val) {
             // for( let i=0;i<this.link.length ;i++ ){
             //     if (this.ruleForm1.areaId ==this.link[i].id ){
             //         this.linkname =this.link[i].name
             //     }
             // }
             if (this.formInline.time == undefined || this.formInline.time == null){
                 this.formInline.time = []
             }
             this.currentPage =val
             let page1 = JSON.stringify({
                 token : this.token,
                 pageNum : this.currentPage,
                 pageSize : this.pagesize,
                 id :this.formInline.id,
                 customerId :this.formInline.customerId,
                 customerName :this.formInline.customerName,
                 billStatus :this.formInline.billStatus,
                 filialeId:this.formInline.areaId,
                 start :this.formInline.time[0],
                 end :this.formInline.time[1] +86400000-1,
                 isOverdue :this.formInline.isOverdue,
                 type : this.formInline.type,
                 areaId : this.areaId,
                 startTime : this.formInline.time2!= null?this.formInline.time2[0]:undefined,
                 endTime : this.formInline.time2!= null?this.formInline.time2[1] +86400000-1:undefined,
             });
             this.ajax(page1)
         },
         handleSizeChange(val){
             if (this.formInline.time == undefined || this.formInline.time == null){
                 this.formInline.time = []
             }
             this.pagesize =val
             let page1 = JSON.stringify({
                 token : this.token,
                 pageNum : this.currentPage,
                 pageSize : this.pagesize,
                 id :this.formInline.id,
                 customerId :this.formInline.customerId,
                 customerName :this.formInline.customerName,
                 billStatus :this.formInline.billStatus,
                 filialeId:this.formInline.areaId,
                 start :this.formInline.time[0],
                 end :this.formInline.time[1] +86400000-1,
                 isOverdue :this.formInline.isOverdue,
                 type : this.formInline.type,
                 areaId : this.areaId,
                 startTime : this.formInline.time2!= null?this.formInline.time2[0]:undefined,
                 endTime : this.formInline.time2!= null?this.formInline.time2[1] +86400000-1:undefined,
             });
             this.ajax(page1)
         },
         onSubmit(){
             // for( let i=0;i<this.link.length ;i++ ){
             //     if (this.formInline.areaId ==this.link[i].id ){
             //         this.linkname =this.link[i].name
             //     }
             // }
             if (this.formInline.time == undefined || this.formInline.time == null){
                 this.formInline.time = []
             }
             let page1 = JSON.stringify({
                 token : this.token,
                 pageNum : this.currentPage = 1,
                 pageSize : this.pagesize,
                 id :this.formInline.id,
                 customerId :this.formInline.customerId,
                 customerName :this.formInline.customerName,
                 billStatus :this.formInline.billStatus,
                 filialeId:this.formInline.areaId,
                 start :this.formInline.time[0],
                 end :this.formInline.time[1] +86400000-1,
                 isOverdue :this.formInline.isOverdue,
                 type : this.formInline.type,
                 areaId : this.areaId,
                 startTime : this.formInline.time2!= null?this.formInline.time2[0]:undefined,
                 endTime : this.formInline.time2!= null?this.formInline.time2[1] +86400000-1:undefined,
             });
             console.log(page1);
             this.ajax(page1)
         },
         requestTurnout(){
             let page1 = JSON.stringify({
                 token : this.token,
                 pageNum : this.currentPage,
                 pageSize : this.pagesize,
                 id :this.formInline.id,
                 customerId :this.formInline.customerId,
                 customerName :this.formInline.customerName,
                 billStatus :this.formInline.billStatus,
                 filialeId:this.formInline.areaId,
                 start :this.formInline.time[0],
                 end :this.formInline.time[1] +86400000-1,
                 isOverdue :this.formInline.isOverdue,
                 type : this.formInline.type,
                 areaId : this.areaId,
                 startTime : this.formInline.time2!= null?this.formInline.time2[0]:undefined,
                 endTime : this.formInline.time2!= null?this.formInline.time2[1] +86400000-1:undefined,
             });
             console.log(page1);
             this.ajax(page1)
         },
         examine(_index){
             this.$router.push({path:'/khzd_particulars'});
             let obj=this.tableData[_index];
             sessionStorage.setItem("particulars",JSON.stringify({obj}))
         },
         ticket(_index){
             this.$prompt('请输入实际开票金额', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 inputPattern: /^[0-9]+(.[0-9]{2})?$/,
                 inputErrorMessage: '金额格式不正确'
             }).then(({ value }) => {
                 let page = JSON.stringify({
                     token :this.token,
                     id : this.tableData[_index].id,
                     alreadyInvoiceMoney:value
                 });
                 this.$http.post(this.global.lightningUrl + '/company/finance/companychageinvoice',page, {
                     headers: {
                         'Content-Type': 'application/json;charset=UTF-8'
                     }
                 }).then((res)=>{
                     location.reload()
                 })
             }).catch(() => {
                 this.$message({
                     type: 'info',
                     message: '取消输入'
                 });
             });
         },
         tableRowClassName({row, rowIndex}){
             // console.log(row);
             // console.log(rowIndex);
             // console.log(row.isWarnning);
             console.log(row.billStatus);
             console.log(1);
             if (row.isOverdue == '是'){
                 if (row.billStatus != '已结清') {
                    return 'warning-row';

                 }
             }else if(row.isWarnning == 'yes'){
                 return 'success-row';
             }
             return '';
         }
     }
 }
</script>
<style lang="scss" >
.reconciliationeq {
    font-size: 16px;
    padding-top: 30px;
    padding-left: 30px;

    .el-table .warning-row {
        background: #F56C6C;
        color: white;
    }

    /*.el-table .success-row {*/
        /*background: #E6A23C;*/
        /*color: white;*/
    /*}*/
    /*.el-table .el-button:focus, .el-table .el-button:hover {*/
        /*color: #ffa10e;*/
        /*border-color: white;*/
        /*background-color:white;*/
    /*}*/
    .el-table__body tr.hover-row>td{
        background:#DCDFE6;
        color: black;
        border-color: white;
    }
    .el-table td, .el-table th.is-leaf {
        border-bottom: 0px solid #ebeef5;
    }
    >ul>li {
        margin: 10px 0;
        display: inline-block;
        padding-right: 40px;
    }
    .top {
    margin-top: 20px;
    }


    .search {
        margin:0 30px;
    }
    .el-table{
        padding-left: 0;
    }
    .el-pagination {
        text-align: center;
        margin-top: 20px;
    }



}

</style>
