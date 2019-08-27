<template>
  <div class="main">
      <div class="header">
         当前位置: <span>项目管理 > 出车单管理</span>
      </div>
      <div class="dv">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="出车单编号">
                        <el-input v-model.trim="formInline.trackId" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入出车单编号"></el-input>
                    </el-form-item>
                    <el-form-item label="司机姓名">
                        <el-input v-model.trim="formInline.driverName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入司机姓名"></el-input>
                    </el-form-item>
                <el-form-item label="司机手机号">
                    <el-input v-model.trim="formInline.driverPhone" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入司机手机号"></el-input>
                </el-form-item>

              <el-form-item label="配送日期" >
                  <el-date-picker
                          v-model="formInline.DeliveryTime"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                  </el-date-picker>
              </el-form-item>
                <el-form-item label="仓库名称">
                    <el-input v-model.trim="formInline.depotName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入仓库名称"></el-input>
                </el-form-item>
                <el-form-item label="出车状态">
                    <el-select v-model="formInline.status" placeholder="请选择出车状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="正常" value="normal"></el-option>
                        <el-option label="异常" value="abnormal"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目名称">
                      <el-input v-model.trim="formInline.Customer" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                  <el-form-item label="车牌号">
                      <el-input v-model.trim="formInline.plateNum" placeholder="请输入车牌号"></el-input>
                  </el-form-item>
                <el-form-item label="所属分公司">
                      <el-select v-model="formInline.region" placeholder="请选择所属分公司" >
                          <!--@input="BranchMonitoring"-->
                          <el-option label="全部" value=""></el-option>
                          <el-option
                                  v-for="item in ids"
                                  :key="item.id"
                                  :label="item.deptName"
                                  :value="item.id">
                          </el-option>
                      </el-select>
                </el-form-item>
              <!--<el-form-item label="管理区">-->
                  <!--<el-select v-model="formInline.input" placeholder="请选择所管理区域" @input="Management">-->
                      <!--<el-option label="全部" value=""></el-option>-->
                      <!--<el-option v-for="i in region" :label='i.name' :value="i.id" :key="i.id"></el-option>-->
                  <!--</el-select>-->
              <!--</el-form-item>-->
              <el-form-item label="项目类型">
                  <el-select v-model="formInline.ProjectType" placeholder="请选择项目类型">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="临时项目" value="InterimCustomer"></el-option>
                      <el-option label="标准项目" value="ProjectCustomer"></el-option>
                      <el-option label="背靠背项目" value="BackToBackCustomer"></el-option>
                  </el-select>
              </el-form-item>
              <!--<el-form-item label="销售专员">-->
                  <!--<el-input v-model.trim="formInline.SalesConsultant" placeholder="请输入销售专员名称"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item label="运营专员">
                  <el-input v-model.trim="formInline.ProjectConsultant" placeholder="请输入运营专员名称"></el-input>
              </el-form-item>
              <el-form-item label="配送进度">
                  <el-select v-model="formInline.Progress" placeholder="请选择项目类型">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="待配送" value="waiting"></el-option>
                      <el-option label="配送中" value="running"></el-option>
                      <el-option label="配送完成" value="finished"></el-option>
                      <el-option label="司机未配送" value="nonDelivered"></el-option>
                      <el-option label="已取消" value="canceled"></el-option>
                      <el-option label="司机未签到" value="expired"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="生成方式">
                  <el-select v-model="formInline.createType" placeholder="请选择生成方式">
                      <el-option label="全部" value=""></el-option>
                      <el-option label="自动生成" value="auto"></el-option>
                      <el-option label="线下导入" value="offline"></el-option>
                  </el-select>
              </el-form-item>

                <el-form-item>
                    <el-button  type="primary" @click="onSubmit_cx">查询</el-button>
                    <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="trackManageListExport">导出</el-button>
                    <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                </el-form-item>
            </el-form>
          <!--<div style="padding:10px 0 10px 0 ;color:#606266;">-->
              <!--<span>出车单数{{300}}单,</span>-->
              <!--<span>GMV</span>-->
              <!--<span>{{100}}</span>-->
              <!--<el-button type="primary">查询</el-button>-->
          <!--</div>-->
          <el-table
              :data="tableData"
              style="width: 100%"
              ref="multipleTable"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange"
          >
              <el-table-column
                      type="selection">
              </el-table-column>
              <el-table-column
                      fixed
                      width="190"
                      label="出车单编号"
                      align="center"
              >
                  <template slot-scope="scope">
                      <div  @click="handleClick(scope.row.trackId,scope.row.status)">
                          <router-link to="" style="color:#409EFF;">{{ tableData[scope.$index].trackId }} </router-link>
                      </div>
                      <i class="step01" slot="icon" v-if="tableData[scope.$index].isHighInsuranceCustomer !=''&&tableData[scope.$index].isHighInsuranceCustomer !=undefined"></i>
                      <i class="step02" slot="icon" v-if="tableData[scope.$index].isHighInsuranceDriver !=''&&tableData[scope.$index].isHighInsuranceDriver !=undefined"></i>
                  </template>
              </el-table-column>
              <!--<el-table-column-->

                      <!--prop="regionName"-->
                      <!--label="管理区"-->
                      <!--align="center"-->
              <!--&gt;-->
              <!--</el-table-column>-->
              <el-table-column
                    width="100"
                      prop="filialeName"
                      label="所属分公司"
                      align="center"
              >
              </el-table-column>
              <el-table-column
                  width="200"
                      prop="traceName"
                      label="线路名称"
                      align="center"
                     >
              </el-table-column>
              <el-table-column
                      prop="startTime"
                      label="到仓时间"
                      :formatter="dateFormatHM"
                      align="center"
              >
              </el-table-column>
              <el-table-column
                    width="100"
                      prop="startTime"
                      label="配送日期"
                      :formatter="dateFormat"
                      align="center"
                      >
              </el-table-column>
              <el-table-column

                      prop="depotName"
                      label="仓库名称"
                      align="center"
                      >
              </el-table-column>
              <el-table-column

                      prop="driverName"
                      label="司机姓名"
                      align="center"
                      >
              </el-table-column>
              <el-table-column
                    width="120"
                      prop="phone"
                      label="司机手机号"
                      align="center"
                      >
              </el-table-column>
              <el-table-column
                    width="120"
                      prop="plateNum"
                      label="车牌号"
                      align="center"
                      >
              </el-table-column>
              <el-table-column
                      prop="vehicleTypeReq"
                      label="车型"
                      align="center"

                       >
              </el-table-column>
              <el-table-column

                      prop="customerName"
                      label="项目名称"
                      align="center"
                       >
              </el-table-column>
              <el-table-column

                      prop="projectType"
                      label="项目类型"
                      align="center"
              >
              </el-table-column>
              <!--<el-table-column-->

                      <!--prop="saleName"-->
                      <!--label="销售专员"-->
                      <!--align="center"-->
              <!--&gt;-->
              <!--</el-table-column>-->
              <el-table-column

                      prop="projectName"
                      label="运营专员"
                      align="center"
              >
              </el-table-column>
              <el-table-column
                  width="100"
                  prop="createType"
                  label="生成方式"
                  :formatter="analysis"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                        width="100"
                      prop="status"
                      label="配送进度"
                      :formatter="distributioning"
                      align="center"
                       >
              </el-table-column>
              <el-table-column

                      prop="trackStatus"
                      label="出车状态"
                      align="center"
                       >
              </el-table-column>
              <el-table-column label="操作" fixed="right" align="center" width="100" v-if="trackOrderOperator == true?true:false ">
                  <template slot-scope="scope" >
                      <el-popover
                              placement="top-start"
                              width="225"
                              trigger="hover">
                          <div>
                              <el-button @click="addRun(scope.row)" round size="small" v-if="scope.row.status == 'finished' && typeof(scope.row.addRunStatus) == 'undefined'?true:false" :disabled="typeof(scope.row.addRun) != 'undefined'">加任务</el-button>
                              <!--<el-button @click="addRun(scope.row)" round size="small" v-if="scope.row.status == 'finished' && typeof(scope.row.addRunStatus) == 'undefined'?true:false">加任务</el-button>-->
                              <!--<el-button style="float: left" @click="addRun(scope.row)" round size="small" v-if="scope.row.status == 'finished' && typeof(scope.row.addRunStatus) == 'undefined'?true:false">加任务</el-button>-->
                              <el-button style="float: left" round size="small" v-if="scope.row.trackStatus == '正常' && (scope.row.status ==  'waiting' || scope.row.status ==  'expired') ? true : false"  @click="NonDistribution(scope.row)">不配送</el-button>
                              <el-button style="float: left" round size="small" v-if="checkIn && scope.row.trackStatus == '正常' && scope.row.status == 'expired'? true:false" @click="Supplement(scope.row),dialogVisible = true">补签到</el-button>

                              <!--<el-button round size="small" @click="giveRedPacket(scope.row.driverId,scope.row.trackId)" >发红包</el-button>-->
                              <!--<el-button round size="small" @click="giveRedPacket(scope.row.driverId,scope.row.trackId)" v-if="scope.row.status == 'finished' && typeof(scope.row.isBilling) != 'undefined'">发红包</el-button>-->
                          </div>
                          <el-button round slot="reference" size="small" :disabled= "tableData[scope.$index].createType!='auto'">操作</el-button>
                      </el-popover>
                  </template>
              </el-table-column>
          </el-table>
      </div>
      <!-- 分页插件 -->
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pagesize"
              layout="total,prev, pager, next,sizes,jumper"
              :total="total">
      </el-pagination>
      <!--补签到遮罩层-->
      <el-dialog
              title="提示补签到"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
          <span>司机未签到，确认由后台补签到？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="SignInAndSave()">补签</el-button>
          </span>
      </el-dialog>
      <!--发红包遮罩层-->
      <el-dialog
              title="发红包"
              :visible.sync="centerDialogVisible"
              width="60%"
              center>
          <div class="block float">
              <span class="b-span"><span class="required">*</span>发放原因：</span>
              <el-radio-group v-model="reasonRadio">
                  <el-radio label="超点" value="超点">超点</el-radio>
                  <el-radio label="上楼" value="上楼">上楼</el-radio>
                  <el-radio label="加急" value="加急">加急</el-radio>
                  <el-radio label="超公里" value="超公里">超公里</el-radio>
                  <el-radio label="超时配送" value="超时配送">超时配送</el-radio>
                  <el-radio label="服务" value="服务">服务</el-radio>
                  <el-radio label="其他" value="其他">其他</el-radio>
              </el-radio-group>
          </div>
          <div class="block">
              <span class="b-span" style="vertical-align:top;"><span style="vertical-align:top;" class="required" v-if="reasonRadio =='其他'">*</span>备注：</span>
              <el-input
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 10}"
                  placeholder="发放原因选择“其他”选项,备注是必填项..."
                  v-model="textarea">
              </el-input>
          </div>
          <!--<div class="to-storehouse block">-->
              <!--<span class="b-span" ><span class="required">*</span>司机单价：</span>-->
              <!--<div class="el-input totalTimes">-->
                  <!--<input type="text" v-model="driverPrice" @keydown="driverPricedown(price)" @input="checkdriverPrice(price)" placeholder="请输入价格" class="el-input__inner">-->
              <!--</div>-->
              <!--<span>元</span>-->
          <!--</div>-->
          <div class="to-storehouse block">
              <span class="b-span" ><span class="required">*</span>发放总金额：</span>
              <div class="el-input totalTimes">
                      <input type="text" v-model="price" @keydown="checkKeydown(price)" @input="checkPrice(price)" placeholder="请输入价格" class="el-input__inner">
              </div>
              <span>元</span>
          </div>

          <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false , reasonRadio= '',driverPrice='',price=''">取 消</el-button>
        <el-button type="primary" :loading="this.load" @click="confirmPrice">确 定</el-button>
      </span>
      </el-dialog>

 </div>

</template>
<script>
    import moment from 'moment'
export default {
    data() {
        return {
            multipleSelection: [],
            load:false,
            reasonRadio:'',
            price:'',
            price1:'',
            driverPrice:'',
            userId:'',
            trackId:'',
            centerDialogVisible: false,//发红包遮罩层
            SignIn:'',//补签到的数据
            dialogVisible: false,//补签到遮罩层
            //遮罩层
            fullscreenLoading: false,
            code:'',
            //导出
            queryStatus:true,
            //进度条
            ProgressBar:0,

            region:[],//管理区
            token:'',
            currentPage:1,
            pagesize:10,//每页的数据条数
            ids:[],//所属分公司
            formInline:{
                createType:"",//生成方式
                plateNum:'',//车牌号
                input:'',//管理区
                Progress:'',//配送进度
                ProjectType:'',//项目类型
                SalesConsultant:'',//销售专员
                ProjectConsultant:'',//运营专员
                Customer:'', //项目名称
                region:'',//所属分司
                WarehouseName:'',
                TurnoutData:'',
                LineStatus:'',
                DeliveryTime:'',
                status:'',
            },
            //监听的所属分公司的id
            LargeID:'',
            tableData: [],
            total:0,
            multipleSelection: [],
            lineException:false,
            transportQuery:false,
            operation:'',
            exception:[],
            num:' ',
            deliveryTime:'',
            currentPages:'',
            totals:'',
            submits:'',
            trackManageListExport:false,
            startTime:'',
            endTime:'',
            trackOrderDetailView:false,
            handOutRedEnvelopes:false,
            checkIn:false,
            addTask:false,
            trackOrderOperator:false,
            textarea:''
        }
    },
    created() {
        let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.trackManageListExport = jurisdictions[6].menus[17].choose //导出
            this.trackOrderDetailView = jurisdictions[6].menus[16].choose //详情
            this.handOutRedEnvelopes = jurisdictions[6].menus[18].choose //发红包
            this.checkIn = jurisdictions[6].menus[19].choose //补签到
            this.addTask = jurisdictions[6].menus[20].choose  //加任务
            this.trackOrderOperator = jurisdictions[6].menus[21].choose //操作
        

        //判断是否有本地，获取本地
        if(sessionStorage.getItem('currentPage')!=null){
            this.currentPages = Number(sessionStorage.getItem('currentPage'));
            this.totals = Number(sessionStorage.getItem('total'));
            this.condition = sessionStorage.getItem('condition');
            this.formInline = JSON.parse(this.condition);
            this.currentPage = this.currentPages;
            this.total = this.totals;
            this.ajax()
        }else {
            this.ajax();
        }
        //管理区
        this.LargeArea();
        //分公司
        this.BranchOffice();
    },
    methods:{
        // toggleSelection(rows) {
        //     if (rows) {
        //         rows.forEach(row => {
        //             this.$refs.multipleTable.toggleRowSelection(row);
        //         });
        //     } else {
        //         this.$refs.multipleTable.clearSelection();
        //     }
        // },
        regReason(text){
            return Boolean(/^[\u4e00-\u9fa5_a-zA-Z0-9_!$()=|':;',?！…（）%——‘；：”“'。，、,.？]{3,225}$/.test(text));
        },
        giveRedPacket(id,trackId){
            console.log(id);
            console.log(this.driverId);
            this.userId ='';
            this.trackId = '';
            this.reasonRadio = '';
            this.price = '';
            this.centerDialogVisible = true;
            this.userId = id;
            this.trackId = trackId;
        },
        checkPrice(price){
            this.price = /^\d+\.?\d{0,2}$/.test(price)||price == '' ? price : price=this.checkValue;
        },
        checkKeydown(value){
            console.log(value);
            this.checkValue = value;
        },
        checkdriverPrice(price){
            this.price1 = /^\d+\.?\d{0,2}$/.test(price)||price == '' ? price : price=this.driverPrice;
        },
        driverPricedown(value){
            this.driverPrice = value
        },
        //发红包
        confirmPrice(){
            console.log(this.userId);

            if(this.reasonRadio == '其他'){
                if(this.reasonRadio === '' || this.price === '' || this.textarea===''){
                    this.$message({
                        message: '带*是必填(选)项',
                        type: 'warning'
                    });
                    return;
                }
            }else{
                if(this.reasonRadio === '' || this.price === ''){
                    this.$message({
                        message: '带*是必填(选)项',
                        type: 'warning'
                    });
                    return;
                }
            }

            if(this.textarea != ''){
                if(!this.regReason(this.textarea)){
                    this.$message({
                        message: '备注仅支持3-255个字符,您输入有误',
                        type: 'warning'
                    });
                    return;
                }
            }
            if(this.price <= 0){
                this.$message.error('价格不能小于等于零');
                return;
            }
            let redPacketInfos = JSON.stringify({
                token:this.token,
                remark:this.textarea,
                driverId:this.userId, //出车单关联的司机Id
                trackId:this.trackId,//出车单编号
                amount:this.price,//红包金额
                reason:this.reasonRadio,//发放原因
                terminal:"project" // 发放端 项目发红包传 project  商户发红包传 customer
            });
            console.log(redPacketInfos);


            this.load=true;
            this.$http.post(this.global.lightningUrl+'/companyv1/finance/redpacket/create',redPacketInfos,{

                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=> {
                console.log(res);
                if(res.data.errcode === 0){
                    this.$message({
                        message: '发送红包成功',
                        type: 'success'
                    });
                    this.reasonRadio = '' ;//发放原因
                    this.price = '' ;//红包金额
                    this.driverPrice = '' ;//司机单价
                    this.centerDialogVisible = false;
                    this.ajax();
                }else{
                    this.$message({
                        message: res.body.message,
                        type: 'warning'
                    });
                    this.reasonRadio = '' ;//发放原因
                    this.price = '' ;//红包金额
                    this.driverPrice = '' ;//司机单价
                }
            }).catch((error)=> {
                console.log(error);
            });
        },
        //加任务
        addRun(row){
            let addRunInfos = encodeURIComponent(JSON.stringify({
                relationTrackId:row.trackId,
                driverName: row.driverName,
                driverPhone: row.phone,
                driverId:row.driverId,
                transportNum:row.transportId,
                customerId:row.customerId
            }));
            console.log(addRunInfos);
            this.$router.push(
                {
                    path: '/add-run',
                    query: {
                        addRunInfos:addRunInfos
                    }
                });
        },
        //查看出车单详情
        handleClick(row,status) {
            console.log(row);
            console.log(status);
            let trackId = row;
            if (this.trackOrderDetailView){
                this.$router.push({
                    path: './orderDetails',
                    query: {
                        trackId: trackId,
                        status: status
                    }
                });
            }

        },
        //设置不配送
        NonDistribution(row) {
            console.log(row);
            this.$confirm('本次出车任务是否设置为不配送?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(this.global.lightningUrl + '/companyv1/trunkCenter/transport/track/cancel',JSON.stringify({
                    'token':this.token,
                    'trackId':row.trackId,
                })).then(run=>{
                    if (run.body.errcode == 0){
                        console.log(run);
                        this.$message({
                            type: 'success',
                            message: '设置不配送成功!'
                        });
                        this.ajax();
                    }else {
                        this.$message({
                            showClose: true,
                            message: run.body.message,
                            type: 'error'
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消配送'
                });
            });
        },
        //补签到遮罩层的确认按钮
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        //补签到
        Supplement(row){
            console.log(row);
            this.SignIn = row;
            console.log(this.SignIn);
        },
        // 確定补签到
        SignInAndSave(){
            this.$http.post(this.global.lightningUrl + '/companyv1/roadTrace/state/supplySign',JSON.stringify({
                'token':this.token,
                "arriveDepot":this.SignIn.startTime / 1000,    /*到仓时间(s)*/
                "transportId":this.SignIn.transportId,  /*运输单ID*/
                "trackId":this.SignIn.trackId,      /*出车单ID*/
                "driverId":this.SignIn.driverId,    /*司机ID*/
                "address":this.SignIn.address,      /*签到地址*/
                "longitude":this.SignIn.longitude,  /*经度*/
                "latitude":this.SignIn.latitude     /*纬度*/
            })).then(run=>{
                if (run.body.errcode == 0){
                    this.$message({
                        type: 'success',
                        message: '补签到成功!'
                    });
                    this.dialogVisible = false;
                    this.ajax();
                }else {
                    this.$message({
                        showClose: true,
                        message: run.body.message,
                        type: 'error'
                    });
                }
            });
        },
        //分公司
        BranchOffice(){
            this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_filiale_list',JSON.stringify({
                'token':this.token,
            })).then(run=>{
                if (run.body.errcode == 0){
                    this.ids = run.body.result;
                    console.log(this.ids);
                }
            })
        },
        //根据分公司查询所属大区 监听input事件的值
        BranchMonitoring(){
            if (this.formInline.region == ''){
                this.formInline.input = '';
                this.LargeArea();
                this.BranchOffice();
            } else {
                this.$http.post(this.global.lightningUrl + '/company/trunkCenter/region/department/get',JSON.stringify({
                    'token':this.token,
                    'departmentId':this.formInline.region,//分公司
                })).then(run=>{
                    console.log(run);
                    if (run.body.errcode == 0){
                        this.region = [];
                        this.region.push({name:run.body.result.name,id:run.body.result.id});
                    }else {
                        this.region = [];
                    }
                })
            }
        },
        //大区所有数据
        LargeArea(){
            this.$http.post( this.global.lightningUrl + '/companyv1/userManage/region/all_region',JSON.stringify({
                'token':this.token,
            })).then(run=>{
                if (run.body.errcode == 0){
                    this.region = run.body.result
                }
            });
        },
        //管理区
        Management(){
            if (this.formInline.input == ''){
                this.formInline.region = '';
                this.LargeArea();
                this.BranchOffice();
            } else {
                this.$http.post(this.global.lightningUrl + '/company/trunkCenter/department/region/get',JSON.stringify({
                    'token':this.token,
                    'regionId':this.formInline.input,//管理区
                })).then(run=>{
                    console.log(run);
                    if (run.body.errcode == 0){
                        this.ids = [];
                        this.ids = run.body.result;
                    }else {
                        this.ids = [];
                    }
                })
            }
        },
        //导出
        Export(){
            let createTime;
            if (this.formInline.DeliveryTime == undefined || this.formInline.DeliveryTime == '' || this.formInline.DeliveryTime == null){
                createTime = ''
            }else {
                let t = this.formInline.DeliveryTime[0];
                let t2 = this.formInline.DeliveryTime[1] ;
                let a = new Date(t).getTime()-1000*60*60*8 ;
                let b = new Date(t2).getTime() +1000*60*60*16-1 ;
                createTime = 'between ' + a + ' and ' + b ;
            }
            let filialeName;
            let regionName;
            for (let i = 0; i < this.region.length; i++) {
                if (this.formInline.input == this.region[i].id) {
                    filialeName = this.region[i].name
                }
            }
            for (let i = 0; i < this.ids.length; i++) {
                if (this.formInline.region == this.ids[i].id) {
                    regionName = this.ids[i].deptName
                }
            }


            this.$message({
                showClose: true,
                message: '正在导出请耐心等待！',
                type: 'warning'
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
                "token":this.token,
                "exportName":"track",                         /*-- 到处模块*/
                "tf.id":this.formInline.trackId,        /*-- 出车单编号*/
                "df.name":this.formInline.driverName,         /*-- 司机姓名*/
                "df.phone":this.formInline.driverPhone,       /*-- 司机电话*/
                "tf.create_time": createTime,  /*-- 配送日期*/
                "tf.depot_name":this.formInline.depotName,     /*-- 仓库名称*/
                "statusQuery":this.formInline.status,         //-- 出车状态 normal:正常 abnormal:异常 all:全部
                "cf.customer_name":this.formInline.Customer,             //-- 商户名称
                "cf.filiale_name":regionName,
                "cf.region_name":filialeName,          // -- 所属分公司
                "cf.sale_name":this.formInline.SalesConsultant,                //-- 销售专员
                "cf.project_name":this.formInline.ProjectConsultant,           //-- 运营专员
                "trackStatusQuery":this.formInline.Progress,            // 配送进
                "cf.type":this.formInline.ProjectType,
                "df.vehicle_num":this.formInline.plateNum,//车牌号
                "createType":this.formInline.createType,//生成方式
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
        //刷新
        ajax(){
            if (this.formInline.DeliveryTime == '' || this.formInline.DeliveryTime == null || this.formInline.DeliveryTime == undefined){
                this.startTime = '';
                this.endTime = '';
            }else {
                this.startTime =  this.formInline.DeliveryTime[0];
                this.endTime = this.formInline.DeliveryTime[1];
            }
            this.$http.post( this.global.lightningUrl +'/companyv1/trunkCenter/transport/track/manage/get' , JSON.stringify({
                token:this.token,
                pageSize:this.pagesize,
                pageNum:this.currentPage,
                driverName:this.formInline.driverName,//司机姓名
                trackId:this.formInline.trackId,//出车单编号
                driverPhone:this.formInline.driverPhone,//司机手机号
                depotName:this.formInline.depotName,//仓库名称
                status: this.formInline.status,//出车状态
                deliveryStartTime: this.startTime,//配送开始时间
                deliveryEndTime:this.endTime,//配送结束时间
                customerName:this.formInline.Customer,//项目名称
                departmentId:this.formInline.region,//分公司编号
                regionId:this.formInline.input,//大区编号
                customerType:this.formInline.ProjectType,//客户类型
                saleName:this.formInline.SalesConsultant,//销售名称
                projectName:this.formInline.ProjectConsultant,//运营专员
                trackStatus:this.formInline.Progress,//配送进度
                plateNum:this.formInline.plateNum,//車牌号
                createType:this.formInline.createType
            }),{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res)
                if (res.body.errcode == 0){

                    this.tableData = res.data.result.rows;

                    if (res.data.result.rows != undefined){
                        this.total = res.data.result.total;
                        for (let i = 0 ; i < this.tableData.length; i++) {
                            if (isNaN(this.tableData[i].arrDepotTime) === false) {
                                this.tableData[i].arrDepotTime = Number(this.tableData[i].arrDepotTime);
                            }
                            if (isNaN(this.tableData[i].deliveryTime) === false) {
                                this.tableData[i].deliveryTime = Number(this.tableData[i].deliveryTime);
                            }
                            this.exception.push(false);
                            // if (this.tableData[i].status == 'canceled') {
                            //     this.tableData[i].status = '已取消'
                            // }else if (this.tableData[i].status == 'waiting') {
                            //     this.tableData[i].status = '待配送'
                            // }else if ( this.tableData[i].status == 'running') {
                            //     this.tableData[i].status = ' 配送中'
                            // }else if ( this.tableData[i].status == 'finished') {
                            //     this.tableData[i].status = ' 已完成'
                            // }else if ( this.tableData[i].status == 'expired') {
                            //     this.tableData[i].status = '司机未签到'
                            // }else if ( this.tableData[i].status == 'nonDelivered' ) {
                            //     this.tableData[i].status = '司机未配送'
                            // }
                            if (this.tableData[i].projectType == 'ProjectCustomer') {
                                this.tableData[i].projectType = '标准项目'
                            }else if (this.tableData[i].projectType == 'InterimCustomer') {
                                this.tableData[i].projectType = '临时项目'
                            }else if (this.tableData[i].projectType == 'BackToBackCustomer') {
                                this.tableData[i].projectType = '背靠背项目'
                            }
                            if ( this.tableData[i].trackStatus == 'normal' ) {
                                this.tableData[i].trackStatus = '正常'
                            }else if ( this.tableData[i].trackStatus == 'abnormal' ) {
                                this.tableData[i].trackStatus = '异常'
                            }
                            if (this.tableData[i].vehicleTypeReq == undefined) {
                                this.tableData[i].vehicleTypeReq = ''
                            }else {
                                this.tableData[i].vehicleTypeReq = this.tableData[i].vehicleTypeReq.name + ' '
                                    + this.tableData[i].vehicleTypeReq.isElectric + ' '
                                    +this.tableData[i].vehicleTypeReq.isTailBoard + ' '
                                    + this.tableData[i].vehicleTypeReq.length + ' '
                                    +this.tableData[i].vehicleTypeReq.isCertificate + ' '
                                    + this.tableData[i].vehicleTypeReq.isCold ;
                            }
                            if ( this.tableData[i].isTimeOut === 'false'  ){
                                this.exception[i] = true
                            }else {

                                if (this.tableData[i].isAccount == 'yes' ||this.tableData[i].handleStatus == 'handled' || this.tableData[i].customerHandleStatus == 'handled') {
                                    this.exception[i] = true
                                }else {
                                    this.exception[i] = false
                                }
                            }

                            //更新本地存储
                            if(sessionStorage.getItem('currentPage')!=null){
                                //删除本地
                                sessionStorage.removeItem('currentPage');
                                sessionStorage.removeItem('condition');
                                sessionStorage.removeItem('total');
                                //存储本地
                                sessionStorage.setItem('currentPage', JSON.stringify(this.currentPage));
                                sessionStorage.setItem('total', JSON.stringify(this.total));
                                sessionStorage.setItem('condition', JSON.stringify(this.formInline));
                            }else {
                                //存储本地
                                sessionStorage.setItem('currentPage', JSON.stringify(this.currentPage));
                                sessionStorage.setItem('total', JSON.stringify(this.total));
                                sessionStorage.setItem('condition', JSON.stringify(this.formInline));
                            }
                        }
                    }else {
                        this.tableData = [];
                        this.total = 0
                    }
                }else {
                }
            })
        },
        //分页
        handleSizeChange(pagesize){
            this.pagesize = pagesize;
            this.ajax()
        },
        //分页
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.ajax()
        },
        handleEdit( _index){
            this.$router.push({
                path: '/turnout_manage/transportException',
            });
            let esception = this.tableData[_index];
            sessionStorage.setItem('esception',JSON.stringify({ esception }))
        },
        handleDelete(_index) {
            this.$router.push({
                path: '/transportDetails',
            });
            // 出车单编号
            let transport_trackId = this.tableData[_index].trackId;
            let transport_status = this.tableData[_index].trackStatus;
            sessionStorage.setItem('transportid',JSON.stringify( {transport_trackId , transport_status} ));
        },
        //查询
        onSubmit_cx(){
            this.submits = 1;
            this.currentPage=1;
            this.deliveryTime  = this.formInline.DeliveryTime;
            // sessionStorage.setItem('currentPage', JSON.stringify(this.currentPage));
            // sessionStorage.setItem('total', JSON.stringify(this.total));
            // sessionStorage.setItem('condition', JSON.stringify(this.formInline));
            this.ajax();
        },
        dateFormat:function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        },
        dateFormatHM :function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("HH:mm");
        },
        analysis(row) {
            if (row.createType == 'auto') {
                return '自动生成';
            }else if (row.createType == 'offline') {
                return '线下导入';
            }
        },
        distributioning(row){
            if (row.status == 'canceled') {
               return '已取消';
            }else if (row.status == 'waiting') {
                return '待配送';
            }else if ( row.status == 'running') {
                return ' 配送中';
            }else if ( row.status == 'finished') {
                return ' 已完成';
            }else if ( row.status == 'expired') {
                return '司机未签到';
            }else if ( row.status == 'nonDelivered' ) {
                return '司机未配送';
            }
        },
    }
}
</script>
<style  lang="scss" scoped>
.main {
    padding:30px;

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
    .inp {
        width:150px;
        height:30px;
        margin-right: 30px;
        border: 1px solid #ccc;
        padding-left: 10px;
    }
    .dv {
        margin-top: 20px;
    }
    .el-pagination {
        padding: 10px 505px;
    }
    .radio_w{
        width:50px;
    }
    .el-form-item{
        .el-form-item__content{
            width: 50%!important;
        }
    }
    .el-table {
        .cell{
            color: red;
            font-size: 14px!important;
        }
    }
    .step01{
        width: 17px;
        height: 21px;
        display: inline-block;
        background: url("../../images/ic_insurance_light.png") no-repeat center;
        background-size: 17px;
    }
    /*.step01{}*/
    .step02{
        width: 17px;
        height: 21px;
        display: inline-block;
        background: url("../../images/ic_insurance_store.png") no-repeat center;
        background-size: 17px;
    }
    .block {
        padding:20px 0;
        .required{
            color:red;
        }
        .el-radio-group{
            padding: 0 20px;
        }
        .el-textarea{
            width: 53%;
        }
    }
    .b-span{
        float:left;
        width: 100px;
        display: inline-block;
        text-align: right;
    }
    .to-storehouse{
        line-height: 40px;
        width:50%;

       .totalTimes{
            width:50%;
       }
    }

    #submit{
        position: absolute;
        top:205px;
        right: 45%;
    }


}
</style>
