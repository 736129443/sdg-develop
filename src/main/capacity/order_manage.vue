<template>
  <div class="main">
      <div class="header">
        当前位置 :  <span> 项目管理 > 订单管理</span>
      </div>
      <div class="dv">
            <el-form :inline="true" :model="formInline" >
                <el-form-item label="订单编号">
                    <el-input v-model.trim="formInline.OrderId" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入订单编号" style="widt:50%"></el-input>
                </el-form-item>
                <el-form-item label="第三方订单编号">
                    <el-input v-model.trim="formInline.OrderId1" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入订单编号" style="widt:50%"></el-input>
                </el-form-item>
                <el-form-item label="配送日期" >

                    <el-date-picker
                            v-model="formInline.time"
                            type="daterange"
                            range-separator="至"
                            value-format="timestamp"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="仓库名称">
                    <el-input v-model.trim="formInline.WarehouseName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入仓库名称"></el-input>
                </el-form-item>
                <el-form-item label="收货人">
                    <el-input v-model.trim="formInline.Consignee" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入收货人"></el-input>
                </el-form-item>
                <el-form-item label="收货人电话">
                    <el-input v-model.trim="formInline.ReceivingPhone" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入收货电话"></el-input>
                </el-form-item>


                <el-form-item label="项目名称">
                    <el-input v-model.trim="formInline.customerName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入项目名称"></el-input>
                </el-form-item>

                <el-form-item label="所属分公司">
                    <el-select v-model="formInline.filialeId" placeholder="请选择所属分公司">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in link" :label='i.filialeName' :value="i.filialeId" :key="i.filialeId"></el-option>
                    </el-select>
                </el-form-item>

                <!--<el-form-item label="管理区">-->
                    <!--&lt;!&ndash;<el-input v-model.trim="input" placeholder="区域名称"></el-input>&ndash;&gt;-->

                    <!--<el-select v-model="formInline.regionId" placeholder="请选择所管理区域">-->
                        <!--<el-option label="全部" value=""></el-option>-->
                        <!--<el-option v-for="i in list" :label='i.name' :value="i.id" :key="i.id"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->

                <el-form-item>
                    <el-button  type="primary" @click="demand">查询</el-button>
                    <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="orderManageListExport==true?true:false">导出</el-button>
                    <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                </el-form-item>
            </el-form>
          <el-table
                  :data="tableData"
                  style="width: 100%;font-size: 14px">
              <el-table-column
                      label="订单编号"
                      align="center"
                      >
                  <template slot-scope="scope">
                      <div  @click="submit(scope.$index)">
                          <router-link to="" style="color:#409EFF;">{{ tableData[scope.$index].id }} </router-link>
                      </div>
                  </template>
              </el-table-column>

              <el-table-column
                      prop="regionName"
                      label="管理区"
                      align="center"
              >
              </el-table-column>
              <el-table-column
                      prop="filialeName"
                      label="所属分公司"
                      align="center"
              >
              </el-table-column>
              <el-table-column
                      prop="thirdId"
                      label="第三方订单编号"
                      align="center"
              >
              </el-table-column>


              <el-table-column
                      prop="customerName"
                      label="项目名称"
                      align="center"
              >
              </el-table-column>
              <!--<el-table-column-->
                      <!--prop="regionName"-->
                      <!--label="管理区"-->
                      <!--align="center"-->
              <!--&gt;-->
              <!--</el-table-column>-->


              <el-table-column
                      prop="deliveryDate"
                      :formatter="dateFormat"
                      align="center"
                      label="配送日期">
              </el-table-column>
              <el-table-column
                      prop="depotName"
                      align="center"
                      label="仓库名称">
              </el-table-column>
              <el-table-column
                      prop="consignee"
                      align="center"
                      label="收货人">
              </el-table-column>
              <el-table-column
                      prop="phone"
                      align="center"
                      label="收货人电话">
              </el-table-column>
              <el-table-column
                      prop="deliveryAddr"
                      align="center"
                      label="收货地址">
              </el-table-column>
              <el-table-column
                      prop="status"
                      align="center"
                      label="订单状态">
              </el-table-column>
              <!--<el-table-column-->
                      <!--fixed="right"-->
                      <!--label="操作"-->
                      <!--align="center"-->
                      <!--&gt;-->
                  <!--<template slot-scope="scope">-->
                      <!--<el-button-->
                              <!--@click="submit(scope.$index)"-->
                              <!--type="text"-->
                              <!--size="small">-->
                          <!--查看详情-->
                      <!--</el-button>-->
                  <!--</template>-->
              <!--</el-table-column>-->
          </el-table>
     </div>
      <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pagesize"
              @size-change="handleSizeChange"
              :page-sizes="[10, 20, 30, 50]"
              layout="total,prev, pager, next,sizes"
              :total="total">
      </el-pagination>
  </div>
</template>
<script>
    import moment from 'moment'
export default {
    data () {
        return{
            time:'',
            //遮罩层
            fullscreenLoading: false,
            code:'',
            //导出
            queryStatus:true,
            //进度条
            ProgressBar:0,


            token:'',
            tableData:[],
            currentPage:1,
            pagesize:10,
            total:0,
            formInline:{
                OrderId: '',
                OrderId1:'',
                time:'',
                WarehouseName:'',
                Consignee:'',
                ReceivingPhone:'',
                filialeId:'',
                customerName:'',
                regionId:'',
            },
            successPhone:false,
            arr:[],
            link:[],
            list:[],
            partition:'',
            orderManageListExport:'',
        }
    },
    created() {
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
        this.token = user.result.token;

            // if (jurisdictions[6].menus.length == 37){
                this.orderManageListExport = jurisdictions[6].menus[4].choose
            // }else {
            //     this.orderManageListExport = false
            // }
        //分区
        this.partition = jurisdictions[13].menus[0].choose;
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

            this.list = run.body.result
        })
        if(sessionStorage.getItem('order_managecurrentPage')!=null){
            let currentPages = Number(sessionStorage.getItem('order_managecurrentPage'));
            let totals = Number(sessionStorage.getItem('order_managetotal'));
            let condition = sessionStorage.getItem('order_managecondition');

            this.formInline = JSON.parse(condition)
            this.currentPage = currentPages;
            this.total = totals;
            //查询接口
            this.requestTurnout()
        }else {
            this.data();
        }
    },
    methods:{
        //导出
        Export(){
            this.$message({
                showClose: true,
                message: '正在导出请耐心等待！',
                type: 'warning'
            });
            if (this.formInline.time == ''||this.formInline.time == null ||this.formInline.time == undefined){
                this.time = ''
            } else {
                this.startTime =  this.formInline.time[0];
                this.endTime = this.formInline.time[1]+86400000-1;
                this.time = 'between '+ this.startTime +' and '+ this.endTime;
            };
            this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
                "token":this.token,
                "exportName":"order",                 /* -- 导出模块*/
                "c.customer_name":this.formInline.customerName,
                "c.filiale_id":this.formInline.filialeId,
                "c.region_id":this.formInline.regionId,
                "t.depot_name":this.formInline.WarehouseName,
                "t.consignee":this.formInline.Consignee,
                "t.phone":this.formInline.ReceivingPhone,
                "t.delivery_date":this.time,
                "t.id": this.formInline.OrderId,
                "t.third_id":this.formInline.OrderId1
        })).then(run=>{
                console.log(run);
                if(run.body.errcode == 0){
                    this.fullscreenLoading = true;
                    this.queryStatus = false;
                    this.ProgressBar = 0;
                    this.code = run.body.result;
                    this.interval = setInterval(() => {
                        this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportProcess',JSON.stringify({
                            "token":this.token,
                            "id":this.code,
                        })).then(run=>{
                            console.log(run);
                            if(run.body.errcode == 0){
                                this.ProgressBar  =   parseInt(run.body.result.exportProcess) ;
                                if (this.ProgressBar == 100){
                                    clearInterval(this.interval);
                                    setTimeout(()=> {
                                        window.location.href = run.body.result.externalRoad;
                                        this.$message({
                                            message: '导出成功',
                                            type: 'success'
                                        });
                                        this.fullscreenLoading = false;
                                        this.queryStatus = true;
                                    },1200)
                                }
                            }
                        })
                    },1000);
                }else {
                    this.$message({
                        showClose: true,
                        message: run.body.message,
                        type: 'error'
                    });
                }
            })
        },

        ajax(page){
            this.$http.post(this.global.lightningUrl + '/companyv1/orderCenter/order/back_list', page ,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                if (res.body.errcode == 0){
                    if (res.body.result == null){
                        this.tableData = [];
                        this.total = 0;

                    }else{
                        this.total = res.body.result.total;
                        this.tableData = res.body.result.list;

                    }
                }
            });
            //更新本地存储
            if(sessionStorage.getItem('order_managecurrentPage')!=null&&sessionStorage.getItem('order_managecurrentPage')!=null){
                //删除本地
                sessionStorage.removeItem('order_managecurrentPage');
                sessionStorage.removeItem('order_managecondition');
                sessionStorage.removeItem('order_managetotal');
                //存储本地
                sessionStorage.setItem('order_managecurrentPage', JSON.stringify(this.currentPage));
                sessionStorage.setItem('order_managetotal', JSON.stringify(this.total));
                sessionStorage.setItem('order_managecondition', JSON.stringify(this.formInline));
            }else {
                //存储本地
                sessionStorage.setItem('order_managecurrentPage', JSON.stringify(this.currentPage));
                sessionStorage.setItem('order_managetotal', JSON.stringify(this.total));
                sessionStorage.setItem('order_managecondition', JSON.stringify(this.formInline));
            }
        },
        data() {
            let page = JSON.stringify({
                token :this.token,
                pageNum : this.currentPage,
                pageSize : this.pagesize,
                branchArea:this.partition,
            });
            this.ajax(page)
        },
        requestTurnout(){
            let page = JSON.stringify({
                token :this.token,
                id : this.formInline.OrderId,
                depotName : this.formInline.WarehouseName,
                start:this.formInline.time[0],
                end:this.formInline.time[1],
                consignee:this.formInline.Consignee,
                phone:this.formInline.ReceivingPhone,
                thirdId : this.formInline.OrderId1,
                pageNum : this.currentPage,
                pageSize : this.pagesize,
                customerName:this.formInline.customerName,
                filialeId:this.formInline.filialeId,
                regionId:this.formInline.regionId,
                branchArea:this.partition,
            });
            this.ajax(page)
        },
        //查看详情
        submit( _index){
            var orderId = this.tableData[_index].id;
            sessionStorage.setItem('orderId',JSON.stringify(orderId));
            this.$router.push({ path:'/order_manage/ddetails'})
        },
        // 查询
        demand(){
            console.log(this.formInline.time);
            if (this.formInline.time == null){
                this.formInline.time = []
            }
            let page = JSON.stringify({
                token :this.token,
                id : this.formInline.OrderId,
                depotName : this.formInline.WarehouseName,
                start:this.formInline.time[0],
                end:this.formInline.time[1],
                consignee:this.formInline.Consignee,
                phone:this.formInline.ReceivingPhone,
                thirdId : this.formInline.OrderId1,
                pageNum : this.currentPage=1,
                pageSize : this.pagesize,
                customerName:this.formInline.customerName,
                filialeId:this.formInline.filialeId,
                regionId:this.formInline.regionId,
                branchArea:this.partition,
            });
            this.ajax(page)
        },
        dateFormat:function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            let page = JSON.stringify({
                token :this.token,
                id : this.formInline.OrderId,
                depotName : this.formInline.WarehouseName,
                start:this.formInline.time[0],
                end:this.formInline.time[1],
                consignee:this.formInline.Consignee,
                phone:this.formInline.ReceivingPhone,
                thirdId : this.formInline.OrderId1,
                pageNum : this.currentPage,
                pageSize : this.pagesize,
                customerName:this.formInline.customerName,
                filialeId:this.formInline.filialeId,
                regionId:this.formInline.regionId,
                branchArea:this.partition,
            });
            this.ajax(page)
        },
        handleSizeChange(val){
            this.pagesize = val;
            let page = JSON.stringify({
                token :this.token,
                id : this.formInline.OrderId,
                depotName : this.formInline.WarehouseName,
                start:this.formInline.time[0],
                end:this.formInline.time[1],
                consignee:this.formInline.Consignee,
                phone:this.formInline.ReceivingPhone,
                thirdId : this.formInline.OrderId1,
                pageNum : this.currentPage,
                pageSize : this.pagesize,
                customerName:this.formInline.customerName,
                filialeId:this.formInline.filialeId,
                regionId:this.formInline.regionId,
                branchArea:this.partition,
            });
            this.ajax(page)
        },
    },


}
</script>
<style scoped lang="scss">
.main {
    font-size: 16px;
    padding-top: 30px;
    padding-left: 30px;
    ul{
        li {
            margin: 10px 0;
            display: inline-block;
            padding-right: 40px;
        }
    }
    .top {
        margin-top: 20px;
    }
    .el-form--inline{

    }
    .inp {
        width:150px;
        height:30px;
        margin-right: 30px;
        border: 1px solid #dcdfe6;
        padding-left: 10px;
    }
    .el-form-item__content{
        width: 80%;
    }
    /*.el-input{*/
        /*width: 100%;*/
    /*}*/
    /*.el-input__inner {*/
        /*height: 33px;*/
        /*line-height: 33px;*/
    /*}*/
    .el-form-item__label {
        padding: 0 5px 0 0;
    }
    /*.el-input__inner:focus {*/
        /*border-color: #ccc;*/
    /*}*/
    /*.el-input__icon {*/
        /*line-height: 35px;*/
        /*width: 21px;*/
    /*}*/
    /*.el-date-editor.el-input {*/
        /*width:167px;*/
        /*outline: none;*/
    /*}*/
    .dv {
        margin-top: 20px;
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
    th{
        font-size: 14px!important;
    }
    td {
        border: 1px solid #ccc;
    }
    .el-pagination {
        padding: 10px 405px;
    }

}
</style>
