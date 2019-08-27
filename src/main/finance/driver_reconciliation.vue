<template>
    <div class="main">
        <div class="header">
            当前位置：<span>财务管理 > 司机已出账单</span>
        </div>
        <div class="top">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="账单编号">
                    <el-input v-model.trim="formInline.billId" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入账单编号"></el-input>
                </el-form-item>
                <el-form-item label="司机编号">
                    <el-input v-model.trim="formInline.driverId" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入司机编号"></el-input>
                </el-form-item>
                <el-form-item label="司机姓名">
                    <el-input v-model.trim="formInline.driverName" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入司机姓名"></el-input>
                </el-form-item>
                <el-form-item label="司机手机号">
                    <el-input v-model.trim="formInline.phone" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入司机手机号"></el-input>
                </el-form-item>
                <el-form-item label="账单日期">
                    <el-date-picker
                            v-model="formInline.value6"
                            type="daterange"
                            range-separator="至"
                            value-format="timestamp"
                            start-placeholder="账单开始日期"
                            end-placeholder="账单结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="所属车队">
                    <el-input v-model.trim="formInline.teamName" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入所属车队" class="list_driver"></el-input>
                </el-form-item>
                <el-form-item label="司机类型">
                    <el-select v-model.trim="formInline.driverType" placeholder="请选择账户状态" >
                        <el-option label="全部" value=""></el-option>
                        <el-option label="运输公司" value="company" ></el-option>
                        <el-option label="车队司机" value="team"></el-option>
                        <el-option label="个体司机" value="personal"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <template>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="账单编号"
                        align="center"
                        >
                </el-table-column>
                <!--<el-table-column-->
                        <!--prop="billStartTime"-->
                        <!--label="账单开始时间"-->
                        <!--align="center"-->
                        <!--:formatter="dateFormat">-->
                <!--</el-table-column>-->

                <!--<el-table-column-->
                        <!--prop="billEndTime"-->
                        <!--label="账单结束时间"-->
                        <!--align="center"-->
                        <!--:formatter="dateFormat">-->
                <!--</el-table-column>-->



                <el-table-column
                        align="center"
                        label="账单周期">
                    <template slot-scope="scope">
                        {{tableData[scope.$index].billStartTime|dateFrm}}至{{tableData[scope.$index].billEndTime|dateFrm}}
                    </template>
                </el-table-column>

                <el-table-column
                        prop="driverId"
                        align="center"
                        label="司机编号">
                </el-table-column>

                <el-table-column
                        prop="name"
                        align="center"
                        label="司机姓名">
                </el-table-column>

                <el-table-column
                        prop="phone"
                        align="center"
                        label="司机手机">
                </el-table-column>

                <el-table-column
                        prop="filialeName"
                        align="center"
                        label="所属分公司">
                </el-table-column>

                <el-table-column
                        prop="driverType"
                        label="司机类型"
                        align="center"
                >
                </el-table-column>

                <el-table-column
                        prop="teamName"
                        label="所属车队"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="currentDeveAdminName"
                        align="center"
                        label="运营专员">
                </el-table-column>
                <el-table-column

                        prop="actualBillMoney"
                        align="center"
                        label="账单金额(元)">
                </el-table-column>
                <!--<el-table-column-->
                        <!--prop="adjustmentMountMoney"-->
                        <!--align="center"-->
                        <!--label="调账差异金额(元)">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="actualBillMoney"-->
                        <!--align="center"-->
                        <!--label="调整后金额(元)">-->
                <!--</el-table-column>-->
                <el-table-column
                        fixed="right"
                        label="操作"
                        align="center"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.$index)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
            <!-- 分页插件 -->
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pagesize"
                    layout="total, prev, pager, next"
                    :total="total">
            </el-pagination>

        </div>
</template>
<script>
    import moment from 'moment'
 export default {
     data() {
         return {
             total:0,
             currentPage: 1,
             pagesize:10,//每页的数据条数
             formInline:{
                 billId:'',
                 driverId:'',
                 driverName:'',
                 phone:'',
                 value6:'',
                 driverType:'',
                 teamName:'',
             },
             token : '',
             tableData:[],
             tableDatatime:[],
             // billStartTime : '',
             // billEndTime : '',
             start:1,
             starttime:'',
             endtime:'',
             time:'',
             particulars:{
                 particulartime0:''
             }
         }
     },
     created() {
         let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
         this.token = user.result.token;
         if(sessionStorage.getItem('driver_reconciliationcurrentPage')!=null){
             let currentPages = Number(sessionStorage.getItem('driver_reconciliationcurrentPage'));
             let totals = Number(sessionStorage.getItem('driver_reconciliationtotal'));
             let condition = sessionStorage.getItem('driver_reconciliationcondition');

             this.formInline = JSON.parse(condition)
             this.currentPage = currentPages;
             this.total = totals;
             //查询接口
             this.requestTurnout()
         }else {
             this.data();
         }
     },
     methods: {
         dateFormat:function(row, column) {
             var date = row[column.property];
             if (date == undefined) {
                 return "";
             }
             return moment(date).format("YYYY-MM-DD");
         },
         data() {
             let page = JSON.stringify({
                 pageNum :this.currentPage ,
                 pageSize : this.pagesize,
                 token : this.token
             });
             console.log(page);
            this.ajax(page)
         },
         ajax(page){
             this.$http.post(this.global.lightningUrl + '/company/finance/putaccout',page,{
                 headers: {
                     'Content-Type': 'application/json;charset=UTF-8'
                 }
             }).then((res)=>{
                 console.log(res);
                 if (res.body.result == ''){
                     this.tableData = []
                 }else {
                     if (res.body.result.rows !== undefined){
                         this.total  = res.body.result.total;
                         this.tableData = res.body.result.rows;
                         for ( let i = 0 ; i<this.tableData.length; i++){
                             this.starttime = this.tableData[0].billStartTime;
                             this.endtime = this.tableData[0].billEndTime;
                             if (this.tableData[i].driverType == 'team'){
                                 this.tableData[i].driverType = '车队司机'
                             }else if (this.tableData[i].driverType == 'company'){
                                 this.tableData[i].driverType = '运输公司'
                             }else if (this.tableData[i].driverType == 'personal'){
                                 this.tableData[i].driverType = '个体司机'
                             }
                         }
                         this.tableDatatime = res.body.result.rows;
                     }

                 }

             })
             //更新本地存储
             if(sessionStorage.getItem('driver_reconciliationcurrentPage')!=null&&sessionStorage.getItem('driver_reconciliationcurrentPage')!=null){
                 //删除本地
                 sessionStorage.removeItem('driver_reconciliationcurrentPage');
                 sessionStorage.removeItem('driver_reconciliationcondition');
                 sessionStorage.removeItem('driver_reconciliationtotal');
                 //存储本地
                 sessionStorage.setItem('driver_reconciliationcurrentPage', JSON.stringify(this.currentPage));
                 sessionStorage.setItem('driver_reconciliationtotal', JSON.stringify(this.total));
                 sessionStorage.setItem('driver_reconciliationcondition', JSON.stringify(this.formInline));
             }else {
                 //存储本地
                 sessionStorage.setItem('driver_reconciliationcurrentPage', JSON.stringify(this.currentPage));
                 sessionStorage.setItem('driver_reconciliationtotal', JSON.stringify(this.total));
                 sessionStorage.setItem('driver_reconciliationcondition', JSON.stringify(this.formInline));
             }
         },
         handleCurrentChange(val) {
             this.currentPage = val;
             let page = JSON.stringify({
                 token : this.token,
                 pageNum :this.currentPage ,
                 pageSize : this.pagesize,
                 id: this.formInline.billId,
                 driverId:this.formInline.driverId,
                 name:this.formInline.driverName,
                 phone:this.formInline.phone,
                 billStartTime:this.formInline.value6[0],
                 billEndTime:this.formInline.value6[1]+86400000-1,
                 teamName : this.formInline.teamName,
                 driverType : this.formInline.driverType,
             });
             console.log(page);
             this.ajax(page)

         },
         onSubmit(){
             let page = JSON.stringify({
                 token :this.token,
                 pageNum :1 ,
                 pageSize : this.pagesize,
                 id: this.formInline.billId,
                 driverId:this.formInline.driverId,
                 name:this.formInline.driverName,
                 phone:this.formInline.phone,
                 billStartTime:this.formInline.value6[0],
                 billEndTime:this.formInline.value6[1]+86400000-1,
                 teamName : this.formInline.teamName,
                 driverType : this.formInline.driverType,
             });

             this.ajax(page)

         },
         requestTurnout(){
             let page = JSON.stringify({
                 token : this.token,
                 pageNum :this.currentPage ,
                 pageSize : this.pagesize,
                 id: this.formInline.billId,
                 driverId:this.formInline.driverId,
                 name:this.formInline.driverName,
                 phone:this.formInline.phone,
                 billStartTime:this.formInline.value6[0],
                 billEndTime:this.formInline.value6[1]+86400000-1,
                 teamName : this.formInline.teamName,
                 driverType : this.formInline.driverType,
             });

             this.ajax(page)
         },
         handleClick(_index){
             this.$router.push({ path : '/bill_particulars'});
             let particulartime0 = this.tableData[_index].billStartTime;
             let particulartime1 = this.tableData[_index].billEndTime;
             let particularid = this.tableData[_index].driverId;
             let particularname = this.tableData[_index].name;
             let particularphone = this.tableData[_index].phone;
             let particularmoney = this.tableData[_index].actualBillMoney;
             let particulartime3 = this.tableData[_index].createTime;
             // actualBillMoney
             sessionStorage.setItem('particularsmeassage',JSON.stringify({particulartime0,particulartime1,particularid,particularname,particularphone,particularmoney,particulartime3 }));
         }
     },
     filters:{
         dateFrm:function (el) {
             return moment(el).format("YYYY-MM-DD")
         }
     }


 }
</script>
<style lang="scss" scoped>
.main {
    font-size: 16px;
    padding-top: 30px;
    padding-left: 30px;
    ul {
        li {
            margin: 10px 0;
            display: inline-block;
            padding-right: 40px;
        }
    }
    .top {
        margin-top: 20px;
    }
    .inp {
        width:150px;
        height:30px;
        margin-right: 30px;
        border: 1px solid #ccc;
    }
    .dv {
        margin-top: 40px;
    }
    .dc {
        position: absolute;
        top:45px;
        right: 180px;
    }
    .dr {
        position: absolute;
        top: 45px;
        right: 10px;
    }
    .search {
        margin:0 30px;
    }
    td {
        border: 1px solid #ccc;
    }
    .el-pagination {
        padding: 10px 405px;
    }
    /*.el-form--inline .el-form-item{*/
        /*margin: 0;*/
    /*}*/
}
</style>
