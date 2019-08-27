<template>
    <div class="main">
        <div class="header">当前位置： 财务管理 > 司机账单 > 账单详情</div>
           <div class="center" >
                <div class="show_top">
                      账单周期:&nbsp;&nbsp;
                   <span>{{ messages.particulartime0 |dateFrm}}</span> &nbsp;&nbsp;至&nbsp;&nbsp;
                   <span>{{ messages.particulartime1 |dateFrm }}</span>
                </div>
               <ul class="bill_ul">
                   <li>
                       <span class="title_l">司机编号：</span>
                       <span >{{ messages.particularid}}</span>
                   </li>
                   <li>
                       <span class="title_l">司机姓名：</span>
                       <span >{{ messages.particularname}}</span>
                   </li>
                   <li>
                       <span class="title_l">司机手机号：</span>
                       <span >{{ messages.particularphone}}</span>
                   </li>
                   <li>
                       <span class="title_l">账单金额：</span>
                       <span >{{ messages.particularmoney}}</span>
                   </li>
                   <li>
                       <span class="title_l">出账日期：</span>
                       <span >{{ messages.particulartime3|dateFrm }}</span>
                   </li>
               </ul>
        </div>
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"> 出车明细</span>
                <div class="footer">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="出车时间">
                            <el-date-picker
                                    v-model="value6"
                                    type="daterange"
                                    range-separator="至"
                                    value-format="timestamp"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onsubmit">查询</el-button>
                            <el-button type="primary" @click="driverDerive">导出流水</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="transportId"
                                label="运输单编号"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="trackId"
                                label="出车编号"
                                align="center"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="startTime"
                                align="center"
                                :formatter="dateFormat"
                                label="出车日期">
                        </el-table-column>
                        <el-table-column
                                prop="arrivalPointCount"
                                align="center"
                                label="配送点数">
                        </el-table-column>
                        <el-table-column
                                prop="depotName"
                                align="center"
                                label="仓库名称">
                        </el-table-column>
                        <el-table-column
                                prop="customerName"
                                align="center"
                                label="项目名称">
                        </el-table-column>

                        <!--<el-table-column-->
                                <!--prop="name"-->
                                <!--align="center"-->
                                <!--label="司机姓名">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="vehicleType"-->
                                <!--align="center"-->
                                <!--label="车型">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="vehicleNum"-->
                                <!--align="center"-->
                                <!--label="车牌号">-->
                        <!--</el-table-column>-->

                        <el-table-column
                                prop="transportPrice"
                                align="center"
                                label="司机基础运费（元）">
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
                                prop="handleRemark"
                                align="center"
                                label="调账原因">
                        </el-table-column>
                    </el-table>
                </div>
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage1"
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
                        @current-change="handleCurrentChange0"
                        :current-page.sync="currentPage2"
                        :page-size="pagesize2"
                        layout="total, prev, pager, next"
                        :total="total2">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
    </div>  
</template>
<script>
    import moment from 'moment'
export default {
    data() {
         return {
             token:'',
             messages:[],
             arr:[],
             value6:'',
             currentPage1: 1,
             pagesize:10,
             total:0,

             currentPage2: 1,
             pagesize2:10,
             total2:0,
             tableData2:[],

             tableData: [],
             time0:'',
             time1:'',
             time2:'',
             time3:'',
             startTime0:'',
             endTime0:'',
         }
     },
    created(){
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        this.messages = JSON.parse(sessionStorage.getItem('particularsmeassage'));
        this.time();
        this.data();
    },
     methods: {
        data(){
            let page = JSON.stringify({
                token : this.token,
                driverId : this.messages.particularid,
                pageNum :this.currentPage1 ,
                pageSize : this.pagesize,
                billStartTime: this.startTime0,
                billEndTime: this.endTime0,
            });
            console.log(page);
            this.$http.post( this.global.lightningUrl + '/company/finance/accoutdetail',page ,{
            //     this.$http.post(  'http://192.168.50.88/company/account/accoutdetail',page ,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            } ).then((res)=>{
                    console.log(res);
                    this.total = res.body.result.total;
                this.tableData = res.body.result.rows;
                for (let i = 0 ; i < this.tableData.length; i++) {
                    if (this.tableData[i].vehicleType != ''&&this.tableData[i].vehicleType != null &&this.tableData[i].vehicleType != undefined ){
                        this.tableData[i].vehicleType = JSON.parse(this.tableData[i].vehicleType).name + ' '
                            + JSON.parse(this.tableData[i].vehicleType).isElectric + ' '
                            + JSON.parse(this.tableData[i].vehicleType).isTailBoard + ' '
                            + JSON.parse(this.tableData[i].vehicleType).length + ' '
                            + JSON.parse(this.tableData[i].vehicleType).isCertificate + ' '
                            + JSON.parse(this.tableData[i].vehicleType).isCold
                    } else {
                        this.tableData[i].vehicleType = ''
                    }
                    if (this.tableData[i].driverType =='team') {
                        this.tableData[i].driverType = '车队司机'
                    }else if (this.tableData[i].driverType =='company') {
                        this.tableData[i].driverType = '运输公司'
                    }else if (this.tableData[i].driverType =='personal') {
                        this.tableData[i].driverType = '个体司机'
                    }
                }


            })
            console.log(789);
            let page1 = JSON.stringify({
                token: this.token,
                pageNum : this.currentPage2,
                pageSize : this.pagesize2,
                driverId:this.messages.particularid,
                createTimeBegin:this.messages.particulartime0,
                createTimeEnd:  this.messages.particulartime1,
            })
            console.log(page1);
            this.ajax(page1)
        },
         time(){
             function formatDateTime(inputTime) {
                 let date = new Date(inputTime);
                 var y = date.getFullYear();
                 var m = date.getMonth() + 1;
                 m = m < 10 ? ('0' + m) : m;
                 var d = date.getDate();
                 d = d < 10 ? ('0' + d) : d;
                 var h = date.getHours();
                 h=h < 10 ? ('0' + h) : h;
                 var minute = date.getMinutes();
                 minute = minute < 10 ? ('0' + minute) : minute;
                 var second=date.getSeconds();
                 second=second < 10 ? ('0' + second) : second;
                 return y  + m  + d;
             };
             this.startTime0=this.messages.particulartime0;
             this.endTime0=this.messages.particulartime1;
             this.time0 = formatDateTime(this.messages.particulartime0);
             this.time1 = formatDateTime(this.messages.particulartime1);
             this.value6 = [this.messages.particulartime0,this.messages.particulartime1 - 86400000+1]
             console.log(this.value);
             // this.value6 = [ this.time0 ,this.time1 ];
             console.log(this.value6);
         },
         account_detail() {
             this.$router.push('/account_detail');
         },
         handleCurrentChange(val) {
            this.pageNum = val;
             let page = JSON.stringify({
                 // token : this.token,
                 // driverId : this.messages.particularid,
                 // pageNum :this.currentPage1 ,
                 // pageSize : this.pagesize,
                 // billStartTime: this.startTime0,
                 // billEndTime: this.endTime0,

                 token : this.token,
                 driverId : this.messages.particularid,
                 pageNum :this.currentPage1 ,
                 pageSize : this.pagesize,
                 billStartTime: this.value6[0] ,
                 billEndTime: this.value6[1]+86400000-1,
             });
             console.log(page);
             this.$http.post( this.global.lightningUrl + '/company/finance/accoutdetail',page ,{
                 //     this.$http.post(  'http://192.168.50.88/company/account/accoutdetail',page ,{
                 headers: {
                     'Content-Type': 'application/json;charset=UTF-8'
                 }
             } ).then((res)=>{
                 console.log(res);
                 this.total = res.body.result.total;
                 this.tableData = res.body.result.rows;
                 for (let i = 0 ; i < this.tableData.length; i++) {
                     if (this.tableData[i].vehicleType != ''||this.tableData[i].vehicleType != null ||this.tableData[i].vehicleType != undefined ){
                         this.tableData[i].vehicleType = JSON.parse(this.tableData[i].vehicleType).name + ' '
                             + JSON.parse(this.tableData[i].vehicleType).isElectric + ' '
                             + JSON.parse(this.tableData[i].vehicleType).isTailBoard + ' '
                             + JSON.parse(this.tableData[i].vehicleType).length + ' '
                             + JSON.parse(this.tableData[i].vehicleType).isCertificate + ' '
                             + JSON.parse(this.tableData[i].vehicleType).isCold
                     } else {
                         this.tableData[i].vehicleType = ''
                     }
                     if (this.tableData[i].driverType =='team') {
                         this.tableData[i].driverType = '车队司机'
                     }else if (this.tableData[i].driverType =='company') {
                         this.tableData[i].driverType = '运输公司'
                     }else if (this.tableData[i].driverType =='personal') {
                         this.tableData[i].driverType = '个体司机'
                     }
                 }
             })
         },
         dateFormat:function(row, column) {
             var date = row[column.property];
             if (date == undefined) {
                 return "";
             }
             return moment(date).format("YYYY-MM-DD");
         },
         onsubmit(){
             if ( this.value6[1] > this.messages.particulartime1 || this.value6[0] < this.messages.particulartime0){
                 this.$message({
                     message: '超出查找范围',
                     type: 'warning'
                 });
             }else {
                 console.log(this.value6);
                 let page = JSON.stringify({
                     token : this.token,
                     driverId : this.messages.particularid,
                     pageNum :this.currentPage1 ,
                     pageSize : this.pagesize,
                     billStartTime: this.value6[0] ,
                     billEndTime: this.value6[1]+86400000-1,
                 });
                 console.log(page);
                 this.$http.post(this.global.lightningUrl + '/company/finance/accoutdetail',page ,{
                     headers: {
                         'Content-Type': 'application/json;charset=UTF-8'
                     }
                 } ).then((res)=>{
                     console.log(res);
                     this.total = res.body.result.total;
                     this.tableData = res.body.result.rows;
                     for (let i = 0 ; i < this.tableData.length; i++) {
                         if (this.tableData[i].vehicleType != ''||this.tableData[i].vehicleType != null ||this.tableData[i].vehicleType != undefined ){
                             this.tableData[i].vehicleType = JSON.parse(this.tableData[i].vehicleType).name + ' '
                                 + JSON.parse(this.tableData[i].vehicleType).isElectric + ' '
                                 + JSON.parse(this.tableData[i].vehicleType).isTailBoard + ' '
                                 + JSON.parse(this.tableData[i].vehicleType).length + ' '
                                 + JSON.parse(this.tableData[i].vehicleType).isCertificate + ' '
                                 + JSON.parse(this.tableData[i].vehicleType).isCold
                         } else {
                             this.tableData[i].vehicleType = ''
                         }
                         if (this.tableData[i].driverType =='team') {
                             this.tableData[i].driverType = '车队司机'
                         }else if (this.tableData[i].driverType =='company') {
                             this.tableData[i].driverType = '运输公司'
                         }else if (this.tableData[i].driverType =='personal') {
                             this.tableData[i].driverType = '个体司机'
                         }
                     }
                 })
             }
         },
         driverDerive(){
             // if (this.value6[0] == undefined){
             //     this.value6[0] = ''
             //     // console.log(this.value6[0]);
             // }
             // if (this.value6[1] == undefined){
             //     this.value6[1] = ''
             // }
             console.log(this.value6);
             if (this.value6 == null){
                 this.$message({
                     message: '请选择时间！',
                     type: 'warning'
                 });
             }else {
                  let page = JSON.stringify({
                      token: this.token,
                     driverId : this.messages.particularid,
                     startTime : this.value6[0],
                      endTime : this.value6[1],
                 });
                  console.log(page);
                 this.$http.get( this.global.lightningUrl + '/company/finance/driverbillexport',page, {
                     headers: {
                         'Content-Type': 'application/json;charset=UTF-8'
                     }
                 }).then((res)=>{
                     console.log(res);
                     if (res.status == 200){
                         this.$message({
                             message: '导出成功',
                             type: 'success'
                         });
                         setTimeout(()=>{
                             let url =  res.url + '?'+'token='+ this.token + '&driverId='+ this.messages.particularid +'&startTime='+this.value6[0]+'&endTime='+this.value6[1];
                             window.location.href = url;
                         },500)
                     }else{
                         this.$message({
                             message: '导出失败',
                             type: 'warning'
                         });
                     }
                 })
             }


         },
         ajax(page){
             this.$http.post(this.global.lightningUrl + '/companyv1/finance/redpacket/queryDriverRedPackets',page,{
                 headers: {
                     'Content-Type': 'application/json;charset=UTF-8'
                 }
             }).then((res)=>{
                 console.log(res);
                 this.total2 = res.body.result.total
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
         handleCurrentChange0(val){
             this.currentPage2 = val
             let page1 = JSON.stringify({
                 token: this.token,
                 pageNum : this.currentPage2,
                 pageSize : this.pagesize2,
                 driverId:this.messages.particularid,
                 createTimeBegin:this.messages.particulartime0,
                 createTimeEnd:  this.messages.particulartime1,
             })
             this.ajax(page1)

         },

     },
    filters: {
        dateFrm: function (el) {
            return moment(el).format("YYYY-MM-DD")
        }
    }
}
</script>
<style lang="scss" scoped>
.main{
    padding: 30px;

    .center {
        margin-top: 20px;
        padding: 20px;
        width:70%;
        min-width: 999px;
        border:1px solid #000;
        border-radius: 15px;
        margin-bottom: 20px;
    }
    .show_top {
        font-size:20px;
        border-bottom:1px solid #000;
        padding-bottom: 20px;
    }
    .from_show {
        width: 50%;
    }
    .el-form--inline .el-form-item {
        margin-right: 10px;
    }
    .center_title {
        width:100%;
        margin: 20px 0;
        padding-left: 10px;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        background-color: #F2F2F2;
    }
    th{
        background-color: #F2f2f2;
        font-size:14px;
    }
    .bill_ul{
        overflow: hidden;
        padding-top: 20px;
        li{
            /*width: 20%;*/
            line-height: 35px;
            float: left;
            padding-right: 30px;
            .title_l{
                display: inline-block;

            }
        }
    }
    .el-pagination{
    text-align: center;
}
}
</style>