<template>
 <div  class="containers tai">
   <div class="container_border">
     <el-row :gutter="10" style="line-height: 41px;">
       <el-col :span="1.5" >
         <span >仓库名称</span>
       </el-col>
       <el-col :span="3">
         <el-select v-model="depotName" filterable clearable placeholder="请选择" >
           <el-option
             v-for="item in options"
             :key="item.id"
             :label="item.depotName"
             :value="item.id">
           </el-option>
         </el-select>
       </el-col>
       <el-col :span="1.5" >
         <span class="marLeft">配送日期</span>
       </el-col>
       <el-col :span="4" >
         <el-date-picker
           style="width: 100%"
           v-model="time"
           placeholder="选择日期"
           value-format="yyyy-MM-dd"
           type="daterange"
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期">
         </el-date-picker>
       </el-col>
       <el-col :span="1.5" >
         <span class="marLeft">收货人电话</span>
       </el-col>
       <el-col :span="3" >
         <el-input class="aaa" v-model="contactNames" placeholder="请输入收货人电话..."></el-input>
       </el-col>
       <el-col :span="3">
         <el-button type="primary" class=" " @click="warehouseTableSearch"> <i class="iconfont icon-search" ></i> 开始查询  </el-button>
       </el-col>
     </el-row>
     <el-row style="margin:15px 0 0 0 ">
         <el-button type="primary" class=" "    @click="updateMap"> 批量修正地图位置  </el-button>
         <el-button type="primary" class=" " @click="allUpdate" > 批量修改配送日期  </el-button>
         <el-button type="primary" class="  " @click="allDelete"> 批量取消运输订单  </el-button>
     </el-row>
     <el-table border :data="tableData" tooltip-effect="dark"  style="width: 100% ; margin:20px 0; " @selection-change="handleSelectionChange" @expand-change="expandChange">
       <el-table-column  type="selection"  align="center" :selectable='checkboxT' width="55" > </el-table-column>
       <el-table-column  prop="id" label="订单编号">
         <template slot-scope="scope" >
           <span >{{tableData[scope.$index].id}} </span>
           <el-tooltip placement="right" effect="light"  v-show="tableData[scope.$index].longitude===0&&tableData[scope.$index].latitude===0" >
             <div slot="content" style="line-height:22px;letter-spacing:2px;">
               <p style="  font-weight: bold; font-size:13px">温馨提示：</p>
               <p>此订单暂无经纬度坐标,建议修正订单地址!</p>
             </div>
             <i class="el-icon-info iconInfo" ></i>
           </el-tooltip>
         </template>
       </el-table-column>
       <el-table-column  prop="deliveryDate" label="配送日期" ></el-table-column>
       <el-table-column  prop="depotName" label="仓库名称" ></el-table-column>
       <el-table-column  prop="consignee" label="收货人" ></el-table-column>
       <el-table-column  prop="phone" label="联系电话" ></el-table-column>
       <el-table-column  prop="status" label="订单状态" ></el-table-column>
       <el-table-column  label="操作"  fixed="right"  width="90" >
         <template slot-scope="scope" >
           <el-button
             size="medium"
             type="danger"
             v-show="tableData[scope.$index].status === '已取消'?false:true"
             @click="handleDelete(scope.$index,scope.row.id)">取消</el-button>
         </template>
       </el-table-column>
       <el-table-column  type="expand"  fixed="right" width="70" label="详情" >
         <template slot-scope="props">
           <el-form label-position="left" inline class="demo-table-expand">
             <el-form-item label="第三方订单编号：">
               <span>{{ props.row.thirdId}}</span>
             </el-form-item>
             <el-form-item label="最早送达时间：">
               <span>{{ props.row.earliestArrTime==="1970-01-01 08:00"?"":props.row.earliestArrTime }}</span>
             </el-form-item>
             <el-form-item label="最晚送达时间：">
               <span>{{ props.row.latestArrTime==="1970-01-01 08:00"?"":props.row.latestArrTime }}</span>
             </el-form-item>
             <el-form-item label="收货方名称：">
               <span>{{ props.row.consigCompName}}</span>
             </el-form-item>

             <el-form-item label="收货地址：">
               <span>{{ props.row.deliveryAddr}}</span>
             </el-form-item>
             <el-form-item label="订单总件数：">
               <span>{{ props.row.goodsTotalNum===0?"":props.row.goodsTotalNum }}</span>
             </el-form-item>
             <el-form-item label="货物重量：">
               <span>{{ props.row.totalWeight===0?"":props.row.totalWeight+"kg"}} </span>
             </el-form-item>
             <el-form-item label="货物体积：">
               <span>{{ props.row.totalVolume===0?"":props.row.totalVolume+"m³"}}</span>
             </el-form-item>
             <el-form-item label="是否异型货：">
               <span>{{ props.row.isAbnormal}}</span>
             </el-form-item>
             <el-form-item label="货物金额：">
               <span>{{ props.row.goodsAmount===0?"":props.row.goodsAmount+"元"}}</span>
             </el-form-item>
             <el-form-item label="是否代收款：">
               <span>{{ props.row.isCod}}</span>
             </el-form-item>
             <el-form-item label="代收金额：">
               <span>{{ props.row.cargoPrice===0?"":props.row.cargoPrice+"元"}}</span>
             </el-form-item>
             <el-form-item label="备注：">
               <span>{{ props.row.remark }}</span>
             </el-form-item>
           </el-form>
         </template>
       </el-table-column>
     </el-table>
     <el-pagination
       background
       class="text_right"
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="currentPage"
       :page-sizes="[8, 10, 15, 20]"
       :page-size="pagesize"
       layout="total, sizes, prev, pager, next, jumper"
       :total="total">
     </el-pagination>
     <el-dialog
       title="修改配送日期"
       :visible.sync="dialogVisible"
       width="30%"
       :before-close="close"
       center
     >
       <div style="text-align: center">
         <span class="demonstration">配送日期: </span>
         <el-date-picker
           v-model="endTime"
           type="date"
           placeholder="选择日期"
           value-format="yyyy-MM-dd"
         >
         </el-date-picker>
       </div>
       <span slot="footer" class="dialog-footer">
          <el-button @click="close()">取 消</el-button>
          <el-button type="primary" @click="handleClose()">确 定</el-button>
       </span>
     </el-dialog>
   </div>
 </div>
</template>

<script>
  // import top from './header'
  import {regPhones} from '../../../../js/newWarehouse'
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        newSelection:[],
        time: '',
        options:[],
        depotName: '',
        total:0,
        pagesize:8,
        currentPage:1,
        contactNames:'',
        dialogVisible: false,
        endTime:'',
        data:'',
        isDetail:[],
        successContactsPhone:false,
        isSearch:false
      };
    },
    components:{
      top
    },
    methods:{
      checkboxT(row,index){
        if(row.status==='已调度'||row.status==='已取消'){
          return false;
        }else {
          return true;
        }
        },
      changeDate(row){
        return this.formatDateTimes(row.deliveryDate);
      },

      // 查看详情
      expandChange(row){
        // if(!this.isDetail[row.index]){
        //   // let details = JSON.stringify({
        //   //   id:row.id,
        //   //   token: this.users.result.token
        //   // });
        //   // console.log( details);
        //   // this.$http.post('https://'+customerId+"/companyv1/orderCenter/order/get_order_list_by_depot_id",details , {
        //   //   headers: {
        //   //     'Content-Type': 'application/json;charset=UTF-8'
        //   //   }
        //   // }).then((res) => {
        //   //   console.log(res.data);
        //   //   // _this.messArray = res.data.result;
        //   //   // _this.total = res.data.pager.totalCount;
        //   // });
        //   this.$set(this.isDetail,row.index, true)
        // }else{
        //   this.$set(this.isDetail,row.index, false)
        // }
      },
      // 批量选中地图
      updateMap(){
        if (this.multipleSelection==''){
          this.$message('请勾选数据!');
          return;
        }
        this.$router.push({
          path: '/ReleaseCar/transport/revised_position',
          query: {
            selectedArray: encodeURIComponent(JSON.stringify(this.multipleSelection))
          }
        })
      },
      // 批量选择配送日期
      allUpdate(){
        if (this.multipleSelection==''){
          this.$message('请勾选数据!');
          return;
        }
        this.dialogVisible=true;
        this.newSelection=this.multipleSelection;
      },
      // 批量修改配送日期
      handleClose(){
        let _this = this;

        let postOrderTime="";
        _this.$confirm('确认修改？')
          .then(()=> {
            for (let i =0; i<_this.tableData.length;i++){
              for (let j=0;j<_this.newSelection.length;j++) {
                if (_this.tableData[i].id ==_this.newSelection[j].id){
                  postOrderTime += _this.tableData[i].id + ',';
                }
              }
            }
            postOrderTime = postOrderTime.substr(0,postOrderTime.length-1);
            // postOrderTime.substring(0,postOrderTime.length);
            console.log(this.endTime);
            let batchModificationDate = JSON.stringify({
              token:this.users.result.token,
              deliveryDate:_this.endTime,
              ids:postOrderTime
            });
            console.log(batchModificationDate);
              _this.dialogVisible = false;
              _this.$http.post(_this.global.lightningUrl +"/companyv1/orderCenter/order/update_delivery_date",batchModificationDate,{
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                }
              })
              .then((response) => {
                console.log(response);
                if(response.data.message === "success"){
                  this.$message({
                    message: '批量修改订单日期成功',
                    type: 'success'
                  });
                  this.init();
                  _this.endTime = '';
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch(()=> {});
    },
      close(){
        this.$confirm('确认关闭？')
          .then(() => {
            this.dialogVisible= false;
          })
          .catch(()=> {});
      },
      // 批量取消运输单
      allDelete(){
        let  _this=this;
        let postOrderHide="";
        let postOrderHides = [];
        if (_this.multipleSelection==''){
          _this.$message('请勾选数据!');
          return;
        }
        for (let i =0; i<_this.tableData.length;i++){
          for (let j=0;j<_this.multipleSelection.length;j++) {
            if (_this.tableData[i].id === _this.multipleSelection[j].id){
              postOrderHide += _this.tableData[i].id + ',';
              postOrderHides.push(_this.tableData[i].index);
            }
          }
        }
        postOrderHide = postOrderHide.substr(0,postOrderHide.length-1);
        // console.log(postOrderHide);
        console.log(postOrderHides);
        this.$confirm('确认取消吗？')
          .then(() => {
            let batchCancellation = JSON.stringify({
              token:this.users.result.token,
              ids:postOrderHide
            });
            // console.log(batchCancellation)
            _this.$http.post(_this.global.lightningUrl +"/companyv1/orderCenter/order/cancel_order",batchCancellation,{
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then((response) => {
              console.log(response);
              if(response.data.message === "success"){
                this.$message({
                  message: '批量取消订单成功',
                  type: 'success'
                });
              }
              for(let i=0;i<postOrderHides.length;i++){
                this.tableData[postOrderHides[i]].status = "已取消";
              }
            })
            .catch((error) => {
              console.log(error);
            });
          })
          .catch(()=> {});
      },
      // 单个取消
      handleDelete(index,rows){
        console.log(rows)
        let _this=this;
        let orderHide= JSON.stringify({
          token:this.users.result.token,
          ids:rows
        });
        console.log(orderHide);
        this.$confirm('确认取消？')
          .then(() => {
            _this.$http.post(_this.global.lightningUrl +"/companyv1/orderCenter/order/cancel_order",orderHide,{
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            })
              .then((response) => {
                console.log(response);
                if(response.data.message === "success"){
                  this.$message({
                    message: '本次订单取消成功',
                    type: 'success'
                  });
                  this.tableData[index].status = "已取消";
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch(()=> {});
      },
      // 转换时间戳 例如：2018-07-09
      formatDateTimes(inputTime) {
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h=h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let second=date.getSeconds();
        second=second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d;
      },
      // 转换时间戳带小时 例如：2018-07-09
      formatDateTime(inputTime) {
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h=h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return y + '-' + m + '-' + d+' '+h+':'+minute;
      },
      // 批量选择
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 分页数量变换
      handleSizeChange(pagesize) {
        this.pagesize = pagesize;
        this.init();
      },
      // 页数变换
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.init();
      },
        warehouseTableSearch(){
            this.isSearch=true;
            if(this.time==''&&this.contactNames==''&&this.depotName==''){
                this.$message.warning('请输入查询条件!');
                return;
            }
            if(!regPhones(this,this.contactNames)&&this.contactNames!==''){
                this.$message.error('电话不合法!');
                return;
            }
            this.seach();
        },
      // 请求仓库名
      revisedTable(){
        let _this=this;
        let name = JSON.stringify({
          token: this.users.result.token,
            userId:Number(sessionStorage.getItem('webCustomerId')),
        });

        this.$http.post(this.global.lightningUrl +"/companyv1/depotManage/depot/all_depot_name",name , {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res => {
          _this.options = res.data.result;
        });
      },
      seach(){
        this.currentPage=1;
        this.init()
      },
      // 请求表格数据
      init(){
        let orderList = JSON.stringify({
          token: this.users.result.token,
          depotId:this.depotName,
          start:this.time === ""||this.time === null?"":this.time[0],
          end:this.time === ""||this.time === null?"":this.time[1],
          phone:this.contactNames,
          pageNum:this.currentPage,
          pageSize: this.pagesize,
          customerId : Number(sessionStorage.getItem('webCustomerId')),
        });
        console.log(orderList);

        this.$http.post(this.global.lightningUrl+"/cmsv1/orderCenter/order/order_list",orderList , {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then((res) => {
          console.log(res);
          this.total = res.data.result.total;
          this.tableData = res.data.result.list;
          if(res.data.errcode===0){
            for(let i=0;i<res.data.result.list.length;i++){
              this.isDetail.push(false);
              this.tableData[i].index = i;
              this.tableData[i].deliveryDate = this.formatDateTimes(this.tableData[i].deliveryDate);
              this.tableData[i].earliestArrTime = this.formatDateTime(this.tableData[i].earliestArrTime);
              this.tableData[i].latestArrTime = this.formatDateTime(this.tableData[i].latestArrTime);
            }
          }
          console.log(this.tableData)
        });
      }
    },
    mounted(){
        this.users = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
      this.revisedTable();
      this.init();
    }
  };
</script>

<style lang="scss">
  .tai{
    .iconInfo{
      cursor: pointer;
      width:50px;
      font-size:18px;
      position: relative;top:1px;
      color: #E44141;
    }
    .aaa input{
      border-radius:60px;
    }
    /*.el-row .el-col span{*/
      /*line-height: 44px;*/
    /*}*/
    .el-row .el-col .el-range-separator{
      line-height:34px;
    }
    .paMar{
      padding: 0 15px; margin-left:5px;
    }
    .el-row .el-col .marLeft{
      margin-left: 45px;
    }
    .container_border .text_right{
      text-align: right;
    }
    .container_border .demo-table-expand {
      font-size: 0;
    }
    .container_border .demo-table-expand label {
      width: 124px;
      color: #99a9bf;
    }
    .container_border .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 33.33%;
    }
  }

</style>
