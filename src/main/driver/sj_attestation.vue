<template>
    <div class="main">   
        <p>当前位置：司机管理>司机认证</p>
         <div class="dv">
             <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="司机编号">
                    <el-input v-model.trim="formInline.DriverId" placeholder="司机编号"></el-input>
                </el-form-item>

                 <el-form-item label="司机电话">
                     <el-input v-model.trim="formInline.phone" placeholder="司机电话"></el-input>
                 </el-form-item>

                <el-form-item label="司机姓名">
                    <el-input v-model.trim="formInline.DriverName" placeholder="司机姓名"></el-input>
                </el-form-item>
                 <el-form-item label="车型">
                     <el-select v-model="formInline.Approver" placeholder="车型">
                         <el-option label="全部" value=""></el-option>
                         <el-option v-for="(val,key) in array"
                                    :key="key"
                                    :label="val"
                                    :value="val"
                         ></el-option>
                     </el-select>
                 </el-form-item>

                 <el-form-item label="所属分公司">
                     <el-select v-model="formInline.region" placeholder="所属分公司" :disabled = disabled1>
                         <el-option label="全部" value=""></el-option>
                         <el-option v-for="i in regions" :label='i.deptName' :value="i.id" :key="i.id"></el-option>
                     </el-select>
                 </el-form-item>

                 <el-form-item label="所属车队">
                     <el-input v-model="formInline.Fleet" placeholder="所属车队"></el-input>
                 </el-form-item>
                 <el-form-item label="常跑城市">
                     <el-input v-model.trim="formInline.city" placeholder="常跑城市"></el-input>
                 </el-form-item>
                <el-form-item label="认证状态">
                    <el-select v-model="formInline.state">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已通过" value="2"></el-option>
                    <el-option label="未通过" value="3"></el-option>
                    <!--<el-option label="待认证" value="0"></el-option>-->
                    <el-option label="审核中" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="司机类型">
                    <el-select v-model="formInline.class">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="车队司机" value="team"></el-option>
                        <el-option label="运输公司" value="company"></el-option>
                        <el-option label="个体司机" value="personal"></el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item label="运营专员">
                     <el-input v-model.trim="formInline.currentDeveAdminName" placeholder="运营专员" :disabled = disabled2></el-input>
                 </el-form-item>
                 <el-form-item label="审核人">
                     <el-input v-model.trim="formInline.checkerName" placeholder="审核人"></el-input>
                 </el-form-item>

                 <el-form-item label="管理区">
                     <el-select v-model="formInline.area" :disabled = disabled3>
                         <el-option label="全部" value=""></el-option>
                         <el-option v-for="i in regionList" :label='i.name' :value="i.id" :key="i.id"></el-option>
                     </el-select>
                 </el-form-item>

                 <el-form-item label="司机注册时间">
                     <el-date-picker
                             v-model="formInline.time"
                             type="daterange"
                             range-separator="至"
                             value-format="timestamp"
                             start-placeholder="开始日期"
                             end-placeholder="结束日期">
                     </el-date-picker>
                 </el-form-item>
                 <el-form-item label="认证时间">
                     <el-date-picker
                             v-model="formInline.time2"
                             type="daterange"
                             range-separator="至"
                             value-format="timestamp"
                             start-placeholder="开始日期"
                             end-placeholder="结束日期">
                     </el-date-picker>
                 </el-form-item>
                 <!--<el-form-item label="提交认证时间">-->
                     <!--<el-date-picker-->
                             <!--v-model="formInline.time1"-->
                             <!--type="daterange"-->
                             <!--range-separator="至"-->
                             <!--value-format="timestamp"-->
                             <!--start-placeholder="开始日期"-->
                             <!--end-placeholder="结束日期">-->
                     <!--</el-date-picker>-->
                 <!--</el-form-item>-->

                <el-form-item>
                    <el-button type="primary" @click="query()">查询</el-button>
                    <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="driverIdentificationListExport == true?true:false">导出</el-button>
                    <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                </el-form-item>
            </el-form>
            <template>
                <el-table
                        :data="tableData"
                        align="center" >
                    <el-table-column
                            width="110"
                            prop="driverId"
                            label="司机编号" align="center" size="medium" >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="司机姓名" align="center" size="medium">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="联系电话" align="center" width="130">
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--prop="plateNum"-->
                            <!--label="车牌号" align="center">-->
                    <!--</el-table-column>-->
                    <el-table-column
                            width="150"
                            prop="vehicleType"
                            label="车型"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="driverType"
                            label="司机类型" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="team"
                            label="所属车队" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="currentDeveAdminName"
                            label="运营专员 " align="center">
                    </el-table-column>

                    <el-table-column
                            width="210"
                            prop="usualRunArea"
                            label="常跑地" align="center">
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--prop="deliveryExperience"-->
                            <!--label="配送经验" align="center">-->
                    <!--</el-table-column>-->
                    <el-table-column
                            width="110"
                            prop="filialeName"
                            label="所属分公司" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="regionName"
                            label="管理区" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="certifyStatus"
                            label="认证状态" align="center">
                        <template slot-scope="scope">
                            <!--未通过    已通过-->
                            <el-popover
                                    v-if="tableData[scope.$index].certifyStatus == '未通过'?true:false"
                                    placement="right"
                                    width="360"
                                    trigger="hover">
                                <el-form  label-width="80px">
                                    <el-form-item label="退回原因">
                                        <el-input
                                                type="textarea"
                                                :rows="3"
                                                disabled
                                                v-model="tableData[scope.$index].notPassReason">
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item label="退回时间">
                                        <el-date-picker
                                                v-model="tableData[scope.$index].certifyTime"
                                                disabled
                                                type="datetime"
                                                value-format="timestamp"
                                                :formatter="dateFormatHm"
                                                default-time="12:00:00">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-form>
                                <el-button type="text" size="small" slot="reference">未通过</el-button>
                            </el-popover>
                            <el-button type="text" size="small" disabled v-if="tableData[scope.$index].certifyStatus == '通过认证'?true:false">通过认证</el-button>
                            <el-button type="text" size="small" disabled v-if="tableData[scope.$index].certifyStatus == '审核中'?true:false">审核中</el-button>
                            <el-button type="text" size="small" disabled v-if="tableData[scope.$index].certifyStatus == '待认证'?true:false">待认证</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="idcardValidDate"
                            width="110"
                            :formatter="dateFormat"
                            label="身份证有效期" align="center">
                    </el-table-column>
                    <el-table-column
                            width="110"
                            prop="licenseValidDate"
                            :formatter="dateFormat"
                            label="驾驶证有效期" align="center">
                    </el-table-column>
                    <el-table-column
                            width="110"
                            prop="permitValidDate"
                                :formatter="dateFormat"
                            label="行驶证有效期" align="center">
                    </el-table-column>
                    <el-table-column
                            width="150"
                            prop="createTime"
                            :formatter="dateFormat1"
                            label="司机注册时间" align="center">
                    </el-table-column>
                    <el-table-column
                            width="150"
                            prop="certifyTime"
                            :formatter="dateFormatHm"
                            label="认证时间" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="checkerName"
                            label="审核人" align="center">
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--width="110"-->
                            <!--prop="certifyTime"-->
                            <!--:formatter="dateFormatHm"-->
                            <!--label="认证处理时间" align="center">-->
                    <!--</el-table-column>-->

                    <el-table-column label="操作" align="center" fixed="right" width="120px" v-if="driverApprove == true?true:false">
                        <template slot-scope="scope">
                            <router-link to="/sjrz_attestation">
                                <el-button @click="handleClick(scope.row)" type="primary" size="medium" v-if="tableData[scope.$index].certifyStatus == '待认证'? true:false">去认证</el-button>
                                <el-button @click="handleClick(scope.row)" type="primary" size="medium" v-if="tableData[scope.$index].certifyStatus == '审核中' ? true:false">去认证</el-button>

                                <el-button @click="handleClick(scope.row)" type="primary" size="medium" v-if="tableData[scope.$index].certifyStatus == '未通过' ? true:false">查看</el-button>
                            </router-link>
                            <el-button @click="handleClick1(scope.row)" type="primary" size="medium" v-if="tableData[scope.$index].certifyStatus ==  '通过认证' ? true:false">变更</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!-- 分页插件 -->
        <el-pagination background
                       layout="total ,prev, pager, next, jumper"
                       :total="total"
                       :page-size="pagesize"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-sizes="[10,20,30,50]"
                       :current-page="currentPage"
                       class="text_right">
        </el-pagination>
    </div>
</template>
<script>
    import {F_jurisdiction,AIfirstClass0,secondLevel} from '../../js/Fjurisdiction.js'
    import moment from 'moment'
const CarModel = ['厢式货车','冷藏车','小面包','依维柯','商务车','电动车','轿车','中巴','高顶','平顶','金杯','敞车','高栏','平板','栏板','全顺'];
export default {
    data() {
        return {
            disabled1:false,
            disabled2:false,
            disabled3:false,
            regions:[],
            //是否分区
            partition:'',
            array:CarModel,
            //认证页面的所有信息
            run:'',
            //去认证的userId
            userId:'',
            total:0,
            token:'',
            tableData:[],
            arr:[],
            currentPage:1,
            pagesize:10,//每页的数据条数
            formInline:{
                //大区
                area:'',
                city:'',
                //车队
                Fleet:'',
                phone:'',
                DriverId: '',
                DriverName:'',
                Approver:'',
                //区域
                region: '' ,
                //类型
                state:'',
                class:'',
                time:'',
                time1:'',
                time2:'',
            },
            driverApprove:'',
            regionList:[],
            fullscreenLoading: false,
            code:'',
            //导出
            queryStatus:true,
            //进度条
            ProgressBar:0,
            driverIdentificationListExport:'',
        }
    },
    created() {
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
        this.driverApprove = jurisdictions[5].menus[3].choose;
        //分区
        this.partition = jurisdictions[13].menus[0].choose;
        this.driverIdentificationListExport=jurisdictions[5].menus[20].choose;
        this.wholeCountry =F_jurisdiction('wholeCountry',jurisdictions);
        this.managementArea =F_jurisdiction('managementArea',jurisdictions);
        this.branchArea =F_jurisdiction('branchArea',jurisdictions);
        console.log(this.wholeCountry  ,this.managementArea , this.branchArea);
        if (!this.wholeCountry && !this.managementArea && !this.branchArea){
            this.disabled1 = true;
            this.disabled2 = true;
            this.disabled3 = true;
        }else if (this.managementArea) {
            this.disabled3 = true;
        }else if(this.branchArea){
            this.disabled1 = true;
            this.disabled3 = true;
        }
        let page1 = JSON.stringify({
            token: this.token
        });
        this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_filiale_list',page1 , {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        } ).then((res)=>{
            this.regions = res.body.result;
        });
        //获取大区数据
        this.$http.post(this.global.lightningUrl + '/companyv1/userManage/region/all_region',JSON.stringify({
            'token':this.token,
        })).then(run=>{
            if(run.body.errcode == 0){
                this.regionList = run.body.result;
            }
        });
        //页面初始化
        if(sessionStorage.getItem('driverAttestationcurrentPage')!=null){
            let currentPages = Number(sessionStorage.getItem('driverAttestationcurrentPage'));
            let totals = Number(sessionStorage.getItem('driverAttestationtotal'));
            let condition = sessionStorage.getItem('driverAttestationcondition');

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
        Export(){
            let create_time ;
            if (this.formInline.time == undefined || this.formInline.time == '' || this.formInline.time == null){
                create_time = ''
            }else {
                let startTime =  this.formInline.time[0];
                let endTime = this.formInline.time[1]+86400000-1;
                create_time = 'between '+ startTime +' and '+ endTime;
            }
            let submit_time;

            if (this.formInline.time1 == undefined || this.formInline.time1 == '' || this.formInline.time1 == null){
                submit_time = ''
            }else {
                let startTime =  this.formInline.time1[0];
                let endTime = this.formInline.time1[1]+86400000-1;
                submit_time = 'between '+ startTime +' and '+ endTime;
            }
            let certify_time;
            if (this.formInline.time2 == undefined || this.formInline.time2 == '' || this.formInline.time2 == null){
                certify_time = ''
            }else {
                let startTime =  this.formInline.time2[0];
                let endTime = this.formInline.time2[1]+86400000-1;
                certify_time = 'between '+ startTime +' and '+ endTime;
            }
            this.$message({
                showClose: true,
                message: '正在导出请耐心等待！',
                type: 'warning'
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
                "token":this.token,
                "exportName":"driverCertify",
                "t.driver_id":this.formInline.DriverId,
                "t.name":this.formInline.DriverName,
                "t.phone":this.formInline.phone,
                "t.driver_type":this.formInline.class,
                "te.team":this.formInline.Fleet,
                "t.usual_run_area":this.formInline.city,
                "a.filiale_id":this.formInline.region,
                "t.checker_name":this.formInline.checkerName,
                "t.current_deve_admin_name":this.formInline.currentDeveAdminName,
                "t.certify_status":this.formInline.state,
                "v.vehicle_type" :this.formInline.Approver,
                "u.create_time" : create_time,
                "t.submit_time" : submit_time,
                "r.id" : this.formInline.area,
                "t.certify_time":certify_time,
                //是否分区权限
                "branchArea":this.partition,

            })).then(run=>{
                console.log(run);
                if(run.body.errcode == 0){
                    this.fullscreenLoading = true;
                    this.queryStatus = false;
                    this.ProgressBar=0,
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

        dateFormatHm:function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm");
        },
        //
        formatter(row, column) {
            return row.address;
            // console.log(123)
        },
        dateFormat:function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        },
        dateFormat1:function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm");
        },
        //去认证
        handleClick(row) {
            this.userId = row.userId;
            sessionStorage.setItem('userid',Base64.encode(this.userId));
        },
        handleClick1(row) {
            this.userId = row.userId;
            sessionStorage.setItem('userid',Base64.encode(this.userId));
            this.$router.push({path:'/sjrz_attestation',query:{info:1}});
        },
        //点击查询
        query(){
            this.currentPage=1;
            this.data();
        },
        requestTurnout(){
            this.data();
        },
        //首刷
        data(){
            if (this.formInline.time == '' || this.formInline.time == undefined || this.formInline.time == null){
                this.formInline.time = ''
            }
            if (this.formInline.time1 == undefined || this.formInline.time1 == '' || this.formInline.time1 == null){
                this.formInline.time1 = ''
            }
            if (this.formInline.time2 == undefined || this.formInline.time2 == null || this.formInline.time2 == ''){
                this.formInline.time2 = ''
            }

            let config = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            };
            this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/check_list',JSON.stringify({
                "pageSize":this.pagesize,
                "pageNum":this.currentPage,
                "token":this.token,
                //是否分区权限
                "branchArea":this.partition,
                //大区
                "regionId":this.formInline.area,
                //常跑城市
                'usualRunArea':this.formInline.city,
                //司机编号
                "driverId":this.formInline.DriverId,
                //司机姓名
                "name":this.formInline.DriverName,
                //车型
                "vehicleType":this.formInline.Approver,
                //司机类型
                "driverType":this.formInline.class,
                //认证状态
                "certifyStatus":this.formInline.state,
                //电话
                "phone":this.formInline.phone,
                //所属车队
                "team":this.formInline.Fleet,
                'currentDeveAdminName' : this.formInline.currentDeveAdminName,
                'checkerName' : this.formInline.checkerName,
                //所属分公司
                "filialeId":this.formInline.region,
                'createStartTime':this.formInline.time[0],
                'createEndTime':this.formInline.time[1]+86400000-1,
                'submitStartTime':this.formInline.time1[0],
                'submitEndTime':this.formInline.time1[1]+86400000-1,
                'certifyStartTime':this.formInline.time2[0],
                'certifyEndTime':this.formInline.time2[1]+86400000-1,
            }),config).then(run=>{
                console.log(run);
                // console.log(run.body.result.list)
                if (run.body.errcode == 0){
                    this.tableData = run.body.result.list;
                    for(var i in this.tableData){
                        // if(this.tableData[i].certifyStatus == 0){
                        //     this.tableData[i].certifyStatus = '待认证'
                        // }else
                        if(this.tableData[i].certifyStatus == 1){
                            this.tableData[i].certifyStatus = '审核中'
                        }else if(this.tableData[i].certifyStatus == 2){
                            this.tableData[i].certifyStatus = '通过认证'
                        }else if(this.tableData[i].certifyStatus == 3){
                            this.tableData[i].certifyStatus = '未通过'
                        }
                        if(this.tableData[i].driverType == 'team'){
                            this.tableData[i].driverType = '车队司机'
                        }else if (this.tableData[i].driverType == 'personal') {
                            this.tableData[i].driverType = '个体司机'
                        }else if(this.tableData[i].driverType == 'company'){
                            this.tableData[i].driverType = '运输公司'
                        }
                        //车型
                        if (this.tableData[i].vehicleType == undefined) {
                            this.tableData[i].vehicleType = ''
                        }
                    };
                    this.total = run.body.result.total;
                }else {
                    this.tableData = [];
                }
            })
            //更新本地存储   driverAttestation
            if(sessionStorage.getItem('driverAttestationcurrentPage')!=null&&sessionStorage.getItem('driverAttestationcurrentPage')!=null){
                //删除本地
                sessionStorage.removeItem('driverAttestationcurrentPage');
                sessionStorage.removeItem('driverAttestationcondition');
                sessionStorage.removeItem('driverAttestationtotal');
                //存储本地
                sessionStorage.setItem('driverAttestationcurrentPage', JSON.stringify(this.currentPage));
                sessionStorage.setItem('driverAttestationtotal', JSON.stringify(this.total));
                sessionStorage.setItem('driverAttestationcondition', JSON.stringify(this.formInline));
            }else {
                //存储本地
                sessionStorage.setItem('driverAttestationcurrentPage', JSON.stringify(this.currentPage));
                sessionStorage.setItem('driverAttestationtotal', JSON.stringify(this.total));
                sessionStorage.setItem('driverAttestationcondition', JSON.stringify(this.formInline));
            }
        },
        handleSizeChange(pagesize){
            this.pagesize = pagesize;
            this.data();
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            this.data();
        },
    }
}
</script>
<style lang='scss' scoped>
.main {
    .el-pagination{
        margin-bottom:30px;

    }
    padding: 30px;
    margin-bottom:30px;
    p {
        line-height:50px;
        color: #606266;
    }
    .dv{
        padding:8px 0;
    }
}
</style>
