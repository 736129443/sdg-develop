<template>
   <div class="containers ers main">
     <!--<warehouses></warehouses>-->
     <div class="container_border">
       <el-row :gutter="10" >
         <el-col :span="1.5" >
           <span >仓库名称</span>
         </el-col>
         <el-col :span="5">
           <el-select v-model="value" filterable  clearable placeholder="请选择" >
             <el-option
               v-for="item in option"
               :key="item.id"
               :label="item.depotName"
               :value="item.depotName">
             </el-option>
           </el-select>
         </el-col>
         <el-col :span="1.5" >
           <span class="marLeft">仓库编号</span>
         </el-col>
         <el-col :span="3" >
           <el-input class="bbb" v-model="number" @change="regNums"></el-input>
         </el-col>
          <el-button type="primary" style="margin:0  20px " @click="warehouseSearch" > <i class="iconfont icon-search" ></i> 查询仓库 </el-button>
       </el-row>
   <el-table :data="tableData"   v-loading="loading" border style="margin:21px 0" >
     <el-table-column prop="id" :formatter ="changeString" label="仓库编号" > </el-table-column>
     <el-table-column prop="depotName" label="仓库名称"  > </el-table-column>
     <el-table-column prop="city" label="所在市区">  </el-table-column>
     <el-table-column prop="area" label="所在城区" >  </el-table-column>
     <el-table-column prop="address" label="详细地址" width="350" >  </el-table-column>
     <el-table-column prop="firstContact" label="联系人" >  </el-table-column>
     <el-table-column prop="firstTel" label="联系电话" >  </el-table-column>
     <el-table-column prop="createTime" :formatter ="times" label="创建时间" >  </el-table-column>
     <el-table-column label="操作"  fixed="right"  width="150" >
       <template slot-scope="scope">
         <el-button
           size="small"
           @click="handleEdit(scope.$index,scope.row,dialogVisible=true)">编辑</el-button>
         <el-button
           size="small"
           type="danger"
           @click="handleDelete(scope.$index, scope.row)">删除</el-button>
       </template>
     </el-table-column>
   </el-table>
   <el-dialog
     title="修改联系资料"
     :visible.sync="dialogVisible"
     width="30%"
     :before-close="close"
     center
   >
       <el-input
         center
         placeholder="修改仓库名称"
         v-model="warehouseName"
         clearable
         style="margin: 0 0 15px 0; "
         maxlength="100"
       ></el-input>
       <el-input
         center
         placeholder="修改联系人"
         v-model="reviseContacts"
         clearable
         style="margin: 0 0 15px 0; "
         maxlength="100"
       >
       </el-input>
       <el-input
         autosize
         placeholder="修改联系人电话"
         v-model="reviseContactsPhone"
         clearable
         style="margin: 0 0 15px 0; width:100%"
       >
       </el-input>
       <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary " @click="handleClose()">确 定</el-button>
     </span>
   </el-dialog>
       <el-pagination
         layout="prev, pager, next,sizes"
         :total="total"
         :page-size="pagesize"
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :page-sizes="[8,9,10]"
         :current-page="currentPage"
         class="text_right">
       </el-pagination>
   </div>


</div>
</template>
<script>
  // import top from './header'
  import {provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText,TextToCode} from 'element-china-area-data';
  import {contactsNames,regPhone,regNum,newWareName} from '../../../../js/newWarehouse';
  import {getDate} from '../../../../js/listWarehouse';
  // import warehouses from './warehouse';
  export default {
    data() {
      return {
        tableData: [],
        total:0,
        pagesize:8,
        currentPage:1,
        options:regionData,
        selectedOptions: [],
        option: [],
        value: '',
        number:'',
        province:'',
        city:'',
        area:'',
        reviseContacts:'',
        reviseContactsPhone:'',
        dialogVisible: false,
        oIndex:-1,
        wareId:'',
        successContactsNames:false,
        successContactsPhone:false,
        users:{},
        warehouseList:'',
        warehouseName:'',
        loading:false,
        successWarehouseNum:false,
        startId:''
      }
    },
      created(){

      },
    mounted() {
      this.users = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        // this.users=JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.init();
      this.initWare();
    },
    components:{
      top,
      // warehouses
    },
    methods: {
      regNums(){
        regNum(this,this.number)
      },
      changeString(row){
       return String(row.id).substring(parseInt(String(row.id).length)-3,String(row.id).length)
      },
      times(row, col) {
        return getDate(row.createTime)
      },
      warehouseSearch(){
        let _this = this;
        if (_this.value === '' && _this.number === '') {
          _this.$message.warning('请输入查询条件!');
          return;
        }
        if(!_this.successWarehouseNum&&_this.number!== ''){
          _this.$message.error('仓库编号格式不正确!');
          return;
        }
        if (_this.value === '' && _this.number !== '') {
          this.warehouseList = JSON.stringify({
            token: this.users.result.token,
            pageNum: 1,
            pageSize: this.pagesize,
            shortId:this.number,
              userId:Number(sessionStorage.getItem('webCustomerId')),
          });
        }

        if (_this.value !== '' && _this.number === '') {
          this.warehouseList = JSON.stringify({
            token: this.users.result.token,
            pageNum: 1,
            pageSize: this.pagesize,
            depotName: this.value,
              userId:Number(sessionStorage.getItem('webCustomerId')),
          });
        }

        if (_this.value !== '' && _this.number !== '') {
          this.warehouseList = JSON.stringify({
            token: this.users.result.token,
            pageNum: 1,
            pageSize: this.pagesize,
            depotName: this.value,
            shortId: this.number,
          userId:Number(sessionStorage.getItem('webCustomerId')),
          });
        }
        console.log(this.pagesize, this.currentPage, this.value,this.warehouseList);
        this.$http.post(this.global.lightningUrl+"/companyv1/depotManage/depot/list_for_customer", this.warehouseList, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(function (res) {
          console.log(res);
          if (res.data.errcode !== 0) {
            _this.$message.error(res.data.message);
            _this.tableData=[];
            return
          }
          _this.tableData = res.data.result.rows;
          _this.total = res.data.result.total;
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      // handleChange (value) {
      //   this.province=CodeToText[value[0]];
      //   this.city=CodeToText[value[1]];
      //   this.area=CodeToText[value[2]];
      //   console.log(this.province,this.city,this.area)
      // },
      handleEdit(index,row) {
        this.oIndex = index;
        this.warehouseName=this.tableData[this.oIndex].depotName;
        this.reviseContacts=this.tableData[this.oIndex]. firstContact;
        this.reviseContactsPhone=this.tableData[this.oIndex].firstTel;
        console.log(index);
      },
      handleClose() {
        let _this = this;
        if (_this.warehouseName=== ''||_this.reviseContactsPhone === '' || _this.reviseContacts === ''){
          _this.$message.error('编辑资料不能为空');
          return;
        }
        // regPhone(_this, _this.reviseContactsPhone);
        contactsNames(_this, _this.reviseContacts);

        if(!newWareName(_this,_this.warehouseName)){
          _this.$message.error('仓库名不含特殊字符，或要求长度2-10位');
          return;
        }
        if (!_this.successContactsNames) {
          _this.$message.error('联系人不含特殊字符，或要求长度2-10位');
          return;
        }
          if (!regPhone(_this, _this.reviseContactsPhone)) {
              _this.$message.error('手机格式不正确');
              return;
          }
        this.$confirm('确认修改？')
          .then(() => {
            console.log(_this.tableData[_this.oIndex]);
            _this.dialogVisible = false;
            this.contacts = JSON.stringify({
              token: _this.users.result.token,
              depotName:_this.warehouseName,
              firstContact:_this.reviseContacts,
              firstTel:_this.reviseContactsPhone,
              shortId:String(_this.tableData[_this.oIndex].id).substring(parseInt(String(_this.tableData[_this.oIndex].id).length)-3,String(_this.tableData[_this.oIndex].id).length),
                userId:Number(sessionStorage.getItem('webCustomerId')),
            });

            console.log(this.contacts);
            _this.$http.post(this.global.lightningUrl+"/companyv1/depotManage/depot/edit",this.contacts,{
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
              }).then(function (response){
                console.log(response);
              if (response.data.errcode !== 0){
                _this.$message.error(response.data.message);
                return
              }
              _this.$message.success(response.data.message);
              _this.tableData[_this.oIndex].depotName = _this.warehouseName;
              _this.tableData[_this.oIndex].firstContact = _this.reviseContacts;
              _this.tableData[_this.oIndex].firstTel = _this.reviseContactsPhone;
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(() => {
          });
      },
      close() {
         this.dialogVisible = false
      },
      handleDelete(index, row){
        let _this = this;
        this.deleteContact = JSON.stringify({
          token: this.users.result.token,
          shortId:String(row.id).substring(parseInt(String(row.id).length)-3,String(row.id).length),
            userId:Number(sessionStorage.getItem('webCustomerId')),
        });
        console.log(this.deleteContact);
        this.$confirm('确认删除吗？')
          .then(() => {
            _this.$http.post(this.global.lightningUrl +"/companyv1/depotManage/depot/delete",this.deleteContact,{
              headers: { 'Content-Type': 'application/json;charset=UTF-8'}
            }).then(function (response) {
                console.log(response);
              if(response.data.errcode===0){
                _this.tableData.splice(index, 1);
                _this.$message({
                  type: 'success',
                  message:"删除成功"
                });
              }else{
                _this.$message(response.data.message);
              }
              }).catch(function (error) {
                console.log(error);
              });
          })
          .catch(() => {
          });
      },
      handleSizeChange(pagesize) {
        this.pagesize = pagesize;
        this.init()
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.init()
      },
      init() {
        let _this = this;
        this.warehouseList = JSON.stringify({
          token: this.users.result.token,
          pageNum: this.currentPage,
          pageSize: this.pagesize,
            userId:Number(sessionStorage.getItem('webCustomerId')),
        });
        console.log(this.warehouseList);
        this.$http.post(this.global.lightningUrl +"/companyv1/depotManage/depot/list_for_customer", this.warehouseList, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res => {
          console.log(res);
          _this.tableData = res.data.result.rows;
          // String(row.id).substring(parseInt(String(row.id).length)-3,String(row.id).length)
          _this.startId=String(res.data.result.rows[0].id).substring(0,10);
          console.log(_this.startId);
          _this.total = res.data.result.total;
        });
      },initWare(){
        let _this = this;
        let params = JSON.stringify({
          token: this.users.result.token,
            userId:Number(sessionStorage.getItem('webCustomerId')),
        });
        this.$http.post(this.global.lightningUrl +"/companyv1/depotManage/depot/all_depot_name", params, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res => {
          console.log(res);
          _this.option = res.data.result;
          _this.option.unshift({depotName: '全部', id: null});

        })
      }
    }
  };
</script>

<style lang="scss">
  .ers{
    .el-row .el-col span{
      line-height: 44px;
    }
    .paMar{
      padding: 0 15px; margin-left:3px
    }
    .el-row .el-col .marLeft{
      margin-left: 45px;
    }
    .bbb{
      .el-input__inner{
        border-radius: 60px;
      }
    }
    .text_right {
      text-align: right;
    }
  }


</style>
