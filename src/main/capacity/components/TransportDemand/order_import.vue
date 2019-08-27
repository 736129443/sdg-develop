<template>
  <div  class="containers">
    <div class="container_border">
      <el-row :gutter="10" >
        <el-col :span="1.5" >
          <span >仓库名称</span>
        </el-col>
        <el-col :span="3">
          <el-select  filterable id="warehouse_name" v-model="value"   clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.depotName"
              :value="item.depotName">
            </el-option>
          </el-select>
        </el-col>
          <el-button class="contentBtn" type="primary"  style="float: left" ref="down" @click="orderDown"> 下载模版 </el-button >
        <el-col :span="1.5">
          <span class="marLeft">导入状态</span>
        </el-col>
        <el-col :span="3">
          <el-select v-model="state" placeholder="请选择">
            <el-option
              v-for="(item,index) in stateArray"
              :key="index"
              :label="item.sta"
              :value="item.sta">
            </el-option>
          </el-select>
        </el-col>
          <el-button class="contentBtn" type="primary" @click="orderSearch"> <i class="iconfont icon-search" ></i> 开始查询 </el-button>
      </el-row>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="javascript:;"
        :on-change="handleChange"
        :auto-upload="false"
        :multiple="false"
        :on-success="uploadSuccess"
        :on-error="uploadErrorr"
        :before-upload="beforeUpload"
        :headers="{ 'Content-Type':'multipart/form-data'}"
      >
        <el-button slot="trigger"  class="eye" style="margin: 15px 0 0 0; background:#409EFF; color: white;" round >浏览订单<i class="el-icon-view el-icon--right"></i></el-button>
        <el-button type="success"  class="up" style="margin: 15px 0 0 10px; background:#67C23A; color: white;"  round @click="submitUpload">上传订单<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-upload>

      <el-table border :data="tableData"  style="width: 100% ;margin:20px 0; ">
        <el-table-column prop="importDate" label="导入日期" :formatter ="times"> </el-table-column>
        <el-table-column prop="fileName" label="文档名称" > </el-table-column>
        <el-table-column prop="importStatus" label="导入状态">
          <template slot-scope="scope">
            <span >{{tableData[scope.$index].importStatus}}</span>
            <el-button size="small"  type="danger"  style="margin-left:10px" @click="downErrExcel(scope.$index, scope.row)"  v-show="tableData[scope.$index].importStatus === '失败'?true:false">下载失败文档</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="orderNum" label="导入数量" ></el-table-column>
        <el-table-column prop="importStatus"  width="90"  label="操作">
        <template slot-scope="scope">
          <el-button
            v-show="tableData[scope.$index].importStatus === '失败'?true:false"
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     layout="prev, pager, next,sizes"
                     :total="total"
                     :page-size="pagesize"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :page-sizes="[5,6 , 7, 8]"
                     :current-page="currentPage"
                     class="text_right">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  let timess;
  // import top from './header'
  import {orderDownload,errDownload} from '../../../../js/orderImport';
  import {getDates} from '../../../../js/listWarehouse';
  export default {
    inject:['reload'],
    data() {
      return {
        file:'',
        src:'',
        tableData: [],
        multipleSelection: [],
        total:0,
        pagesize:5,
        currentPage:1,
        options: [],
        value: '',
        state:'',
        users:'',
        doc:'',
        stateArray:[{sta:'全部'},{sta:'成功'},{sta:'失败'},{sta:'解析中'}],
        i:0,
        arr:[],
        istrue:false,
        isImport:false
      }
    },
    components:{
      top
    },
    methods:{
      handleDelete(index, row){
        let _this=this;
        this.deleteContact = JSON.stringify({
          token: this.users.result.token,
          id:this.tableData[index].id
        });
        console.log(this.deleteContact);
        this.$confirm('确认删除吗？')
          .then(() => {
            _this.$http.post(_this.global.lightningUrl +"/companyv1/orderCenter/order/delete_doc",_this.deleteContact,{
              headers: { 'Content-Type': 'application/json;charset=UTF-8'}
            }).then(function (response) {
              console.log(response);
              if(response.data.errcode===0){
                _this.tableData.splice(index, 1);
                _this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else{
                _this.$message(response.data.message);
              }
            }).catch(function (error) {
              console.log(error);
            });
          }).catch(() => {
          });
      },
      downErrExcel(index,row){
        console.log(index,row, this.$refs.downs);
        window.location.href= this.global.lightningUrl +'/companyv1/orderCenter/order/download_error_doc?fileName='+row.fileName
      },
      times(row, col) {
        return getDates(row.importDate)
      },
      orderSearch(){
        let _this=this;
        if(!_this.state){
          _this.$message.warning('请输入查询条件!');
          return;
        }
        if(_this.state==='全部'){
          _this.state=''
        }
        this.doc = JSON.stringify({
          token: this.users.result.token,
          pageNum: 1,
          pageSize: this.pagesize,
          importStatus:_this.state,
          customerId:Number(sessionStorage.getItem('webCustomerId'))
        });
        console.log(this.doc );
        this.$http.post(this.global.lightningUrl+"/companyv1/orderCenter/order/doc_list", this.doc,{
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res => {
          console.log(res);
          _this.tableData = res.data.result.list;
          _this.total = res.data.result.total;
          _this.currentPage=1
        }).catch(error =>{
        });
      },
      handleSizeChange(pagesize) {
        this.pagesize = pagesize;
        this.contents()
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.contents()
      },
      submitUpload() {
       let files= document.getElementsByClassName('el-upload__input')[0].files;
       if(!files.length){
         this.$message.warning('请先选择上传的文件!');
       }
      if(this.isImport){
        this.$message.warning('文件解析中,请稍等...');
        return;
      }
        this.$refs.upload.submit();
      },
      handleChange(file, fileList) {
        if(fileList.length>1){
          fileList.splice(0, 1);
        }
      },
      // 上传成功
      uploadSuccess(response, file, fileList){
        console.log('上传文件', response)
      },
      // 上传错误
      uploadErrorr(response, file, fileList){
        console.log('上传失败，请重试！',response)
      },
      beforeUpload(file){
        let _this=this;
        const extension = file.name.split('.')[1] === 'xls';
        const extension2 = file.name.split('.')[1] === 'xlsx';
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!extension && !extension2 ){
          console.log('上传模板只能是 xls、xlsx 格式!');
          _this.$message.error('上传模板只能是 xls、xlsx 格式');
          return extension || extension2
        }
        if (!isLt2M) {
          console.log('上传模板大小不能超过 10MB!');
          _this.$message.error('上传模板大小不能超过 10MB!');
          return  isLt2M
        }
        let formdata= new window.FormData();
        formdata.append('token',this.users.result.token);
        formdata.append('file',file);
        formdata.append('customerId',Number(sessionStorage.getItem('webCustomerId')));
        //此处必须设置为  multipart/form-data
        let config = {
          headers: {
            'Content-Type':'multipart/form-data;charset=UTF-8'  //之前说的以表单传数据的格式来传递fromdata
          }
        };
        this.$http.post(this.global.lightningUrl+'/companyv1/orderCenter/order/upload', formdata, config).then(res=> {
          //做处理
          if(res.data.errcode===0){
            _this.$message.success('文件解析中,请稍等...');
            _this.contents();
            timess=setInterval(function () {
              _this.contents();
            },8000);
            _this.istrue=true
          }else {
            _this.$message.error(res.data.message);
          }
          console.log(res)
        }).catch(error =>{
        });
        _this.istrue=false;
        return false;
      },
      contents(){
        let _this = this;
        if(_this.state==='全部'){
          _this.state=''
        }
        this.doc = JSON.stringify({
          token: this.users.result.token,
          pageNum: this.currentPage,
          pageSize: this.pagesize,
          importStatus:_this.state,
            customerId:Number(sessionStorage.getItem('webCustomerId'))
        });
        console.log(this.doc);
          this.$http.post(this.global.lightningUrl+"/companyv1/orderCenter/order/doc_list", this.doc, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res => {
          console.log(res);
          _this.tableData = res.data.result.list;
          _this.total = res.data.result.total;
          if(res.data.result.list[0].importStatus=='解析中'){
            _this.isImport=true;
          }
          if( res.data.result.list[0].importStatus=='失败'|| res.data.result.list[0].importStatus=='成功'){
            _this.tableData = res.data.result.list;
            _this.total = res.data.result.total;
            _this.isImport=false;
            clearInterval(timess);
          }
        }).catch(error =>{
        });
      },
      init(){
        let _this = this;
        let name = JSON.stringify({
          token: this.users.result.token,
          userId:Number(sessionStorage.getItem('webCustomerId')),
        });
        this.$http.post(this.global.lightningUrl +"/companyv1/depotManage/depot/all_depot_name",name , {
          headers:{
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res => {
          console.log(res);
          _this.options = res.data.result;
        }).catch(error =>{
        });
      },
      orderDown(){
        orderDownload(this,this.$refs.down,this.global.lightningUrl +"/companyv1/orderCenter/order/download_template?depotName=",null)
      }
    },
    // 上传前对文件的大小的判断
    mounted(){
      this.users = JSON.parse(Base64.decode(sessionStorage.getItem('key')));

        this.init();
      this.contents();
    },

  };
</script>

<style scoped >
  .container_border{
    padding:30px;
  }
  .up:hover{
    background:#5db134!important;
    border: 1px solid #5db134!important;
  }
  .eye:hover{
    background:#3783d4!important;
    border: 1px solid #3783d4!important;
  }
  .el-row .el-col span{
    line-height: 44px;
  }

  .el-row{
    height: 50px;
  }
  .paMar{
    padding: 0 15px; margin-left:5px
  }
  .el-row .el-col .marLeft{
    margin-left: 45px;
  }

  .text_right{
    text-align: right;
  }

</style>
