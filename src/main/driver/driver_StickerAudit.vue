<template>
    <div class="main">
        <div class="header">
            当前位置：<span>司机管理>司机车贴</span>
        </div>
        <div class="center">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="司机编号">
                    <el-input v-model.trim="formInline.DriverId" placeholder="司机编号"></el-input>
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
                <el-form-item label="司机类型">
                    <el-select v-model="formInline.type">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="车队司机" value="team"></el-option>
                        <el-option label="运输公司" value="company"></el-option>
                        <el-option label="个体司机" value="personal"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="审核状态">-->
                    <!--<el-select v-model="formInline.state">-->
                        <!--<el-option label="全部" value=""></el-option>-->
                        <!--<el-option label="审批中" value="approving"></el-option>-->
                        <!--<el-option label="已通过" value="accepted"></el-option>-->
                        <!--<el-option label="未通过" value="rejected"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="所属分公司">
                    <el-select v-model="formInline.region" placeholder="请选择所属分公司">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                                v-for="i in ids"
                                :label="i.deptName"
                                :value="i.id"
                                :key="i.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="管理区">
                    <el-select v-model="formInline.input" placeholder="请选择所管理区域">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in region" :label='i.name' :value="i.id" :key="i.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="运营专员">
                    <el-input v-model.trim="formInline.Fleet" placeholder="运营专员"></el-input>
                </el-form-item>
                <el-form-item label="司机电话">
                    <el-input v-model.trim="formInline.phone" placeholder="司机电话"></el-input>
                </el-form-item>

                <el-form-item label="所属车队">
                    <el-input v-model.trim="formInline.belongTeam" placeholder="所属车队"></el-input>
                </el-form-item>

                <el-form-item label="最后上传时间">
                    <el-date-picker
                            width="110"
                            v-model="formInline.Registration"
                            type="daterange"
                            value-format="timestamp"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="最后审批时间">
                    <el-date-picker
                            width="110"
                            v-model="formInline.lastAuditTime"
                            type="daterange"
                            value-format="timestamp"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="query()">查询</el-button>
                    <!--<el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="driverCarStickerListExport==true?true:false">导出</el-button>-->
                    <el-button type="primary" @click="Export()"  v-if="driverCarStickerListExport==true?true:false">导出</el-button>
                    <!--<el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>-->

                </el-form-item>
            </el-form>
            <el-table
                    :data="arr"
                    style="width: 100%"
            >
                <el-table-column
                        fixed
                        width="150"
                        align="center"
                        prop="driverId"
                        label="司机编号"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="driverName"
                        label="司机姓名"
                >
                </el-table-column>
                <el-table-column
                        width="120"
                        align="center"
                        prop="driverPhone"
                        label="司机电话"
                >
                </el-table-column>
                <el-table-column
                        width="110"
                        align="center"
                        prop="plateNum"
                        label="车牌号"
                >
                </el-table-column>
                <el-table-column
                        width="180"
                        align="center"
                        prop="vehicleType"
                        label="车型"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="driverType"
                        label="司机类型"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="belongTeam"
                        label="所属车队"
                >
                </el-table-column>



                <el-table-column
                        align="center"
                        prop="adminName"
                        label="运营专员"
                >
                </el-table-column>
                <el-table-column
                        width="110"
                        align="center"
                        prop="filialeName"
                        label="所属分公司"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="regionName"
                        label="管理区"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="tagsTime"
                        label="补贴次数"
                >
                </el-table-column>
                <el-table-column
                        prop="firstUpload"
                        label="首次上传车贴时间"
                        width="150"
                        align="center"
                        :formatter="dateFormat"
                >
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="lastUploadTime"
                        label="最后上传车贴时间"
                        align="center"
                        :formatter="dateFormat"
                >
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="lastAuditTime"
                        label="最后审批时间"
                        align="center"
                        :formatter="dateFormat"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        align="center"
                        prop=""
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>

                        <!--<el-button type="text" size="small" >审核未通过</el-button>-->
                        <!--<el-button @click="finish(scope.row)" type="text" size="small" v-if="arr[scope.$index].auditStatus == '审批中' ? true:false">去审核</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页插件 -->
            <el-pagination background
                           layout="total,prev, pager, next,sizes"
                           :total="total"
                           :page-size="pagesize"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 30, 50]"
                           :current-page="currentPage"
                           class="text_right">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import {Export} from "../../js/export";
    import {openPostWindow} from '../../js/report.js'
    const CarModel = ['厢式货车','冷藏车','小面包','依维柯','商务车','电动车','轿车','中巴','高顶','平顶','金杯','敞车','高栏','平板','栏板','全顺'];
    export default {
        name: "driver_StickerAudit",
        data(){
            return{
                time:'',
                //遮罩层
                fullscreenLoading: false,
                code:'',
                //导出
                queryStatus:true,
                //进度条
                ProgressBar:0,

                //大区下拉
                region:[],
                token:'',
                array:CarModel,
                currentPage:1,
                pagesize:10,//每页的数据条数
                total:0,
                arr:[],
                formInline:{
                    phone:'',
                    input:'',
                    DriverId:'',
                    DriverName:'',
                    Approver:'',
                    type:'',
                    state:'',
                    region:'',
                    Fleet:'',
                    Registration:'',
                    lastAuditTime:'',
                },
                ids:[],
                queryStatus:true,
                //分页
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
                driverDetail:'',
                driverDerive :'',
                driverCarStickerListExport:'',
            }
        },
        created() {
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));

            this.driverCarStickerListExport = jurisdictions[5].menus[11].choose
            this.$http.post( this.global.lightningUrl + '/companyv1/userManage/region/all_region',JSON.stringify({
                'token':this.token,
            })).then(run=>{
                if (run.body.errcode == 0){
                    this.region = run.body.result
                }
            });
            if(sessionStorage.getItem('driver_StickerAuditCurrentPage')!=null){
                let currentPages = Number(sessionStorage.getItem('driver_StickerAuditCurrentPage'));
                let totals = Number(sessionStorage.getItem('driver_StickerAudittotal'));
                let condition = sessionStorage.getItem('driver_StickerAuditCondition');

                this.formInline = JSON.parse(condition);
                this.currentPage = currentPages;
                this.total = totals;
            }
            this.data();
            this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_filiale_list',JSON.stringify({
                // this.$http.post('http://192.168.50.33:8099/account/companylist',JSON.stringify({
                'token':this.token,
            })).then(run=>{
                this.ids = run.body.result;
                console.log(this.ids);
            })
        },
        methods: {
            //时间格式的转化（戳 -> 时间）
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },

            //页面首刷&&查询
            data() {
                if (this.formInline.Registration == undefined || this.formInline.Registration == '' || this.formInline.Registration == null) {
                    this.formInline.Registration = ''
                }
                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/vehicle_tags/vehicle_tags_list', JSON.stringify({
                    //     this.$http.post('http://192.168.50.33:8099/drivermanage/tagsAuditList',JSON.stringify({

                    "token": this.token,
                    "pageSize": this.pagesize,
                    'pageNum': this.currentPage,
                    //大区
                    'regionId': this.formInline.input,
                    "driverId": this.formInline.DriverId,
                    //司机姓名
                    "driverName": this.formInline.DriverName,
                    //车型
                    "vehicleType": this.formInline.Approver,
                    //司机类型
                    "driverType": this.formInline.type,
                    //审核状态
                    "auditStatus": this.formInline.state,
                    //所属分公司
                    "filialeId": this.formInline.region,
                    //运营专员
                    "adminName": this.formInline.Fleet,
                    //司机注册时间
                    "startTime": this.formInline.Registration == null ? '' : this.formInline.Registration[0],
                    "endTime": this.formInline.Registration == null ? '' : this.formInline.Registration[1] + 86400000 - 1,
                    //最后审批时间
                    'lastAuditStartTime':this.formInline.lastAuditTime == null ? '' : this.formInline.lastAuditTime[0],
                    'lastAuditEndTime':this.formInline.lastAuditTime == null ? '' : this.formInline.lastAuditTime[1] + 86400000 - 1,
                    'belongTeam' : this.formInline.belongTeam,
                    //电话
                    'driverPhone':this.formInline.phone
                })).then(run => {
                    if (run.body.errcode == 0) {
                        this.arr = run.body.result.rows;
                        for (var i in this.arr) {
                            if (this.arr[i].driverType == "personal") {
                                this.arr[i].driverType = "个体司机"
                            } else if (this.arr[i].driverType == "company") {
                                this.arr[i].driverType = "运输公司"
                            } else if (this.arr[i].driverType == "team") {
                                this.arr[i].driverType = "车队司机"
                            }
                            ;
                            // if (this.arr[i].vehicleType != undefined && this.arr[i].vehicleType != '' && this.arr[i].vehicleType != null) {
                            //     this.arr[i].vehicleType = JSON.parse(this.arr[i].vehicleType).name + ' '
                            //         + JSON.parse(this.arr[i].vehicleType).length + ' '
                            //         + JSON.parse(this.arr[i].vehicleType).isCertificate + ' '
                            //         + JSON.parse(this.arr[i].vehicleType).isTailBoard + ' '
                            //         + JSON.parse(this.arr[i].vehicleType).isElectric + ' '
                            //         + JSON.parse(this.arr[i].vehicleType).isCold;
                            // }
                            if (this.arr[i].auditStatus == 'approving') {
                                this.arr[i].auditStatus = '审批中'
                            } else if (this.arr[i].auditStatus == 'rejected') {
                                this.arr[i].auditStatus = '未通过'
                            } else if (this.arr[i].auditStatus == 'accepted') {
                                this.arr[i].auditStatus = '通过'
                            }
                        }
                        this.total = run.body.result.total;
                    } else {
                        this.$message({
                            showClose: true,
                            message: run.body.message,
                            type: 'error'
                        });
                    }
                });
                if(sessionStorage.getItem('driver_StickerAuditCurrentPage')!=null&&sessionStorage.getItem('driver_StickerAuditCurrentPage')!=null){
                    //删除本地
                    sessionStorage.removeItem('driver_StickerAuditCurrentPage');
                    sessionStorage.removeItem('driver_StickerAuditCondition');
                    sessionStorage.removeItem('driver_StickerAudittotal');
                    //存储本地
                    sessionStorage.setItem('driver_StickerAuditCurrentPage', JSON.stringify(this.currentPage));
                    sessionStorage.setItem('driver_StickerAudittotal', JSON.stringify(this.total));
                    sessionStorage.setItem('driver_StickerAuditCondition', JSON.stringify(this.formInline));
                }else {
                    //存储本地
                    sessionStorage.setItem('driver_StickerAuditCurrentPage', JSON.stringify(this.currentPage));
                    sessionStorage.setItem('driver_StickerAudittotal', JSON.stringify(this.total));
                    sessionStorage.setItem('driver_StickerAuditCondition', JSON.stringify(this.formInline));
                }
            },
            //查询
            query() {
                this.currentPage = 1 ;
                this.data();
            },
            //列表操作（查看）
            handleClick(row) {
                console.log(row);
                sessionStorage.setItem('managementid', JSON.stringify(row));
                this.$router.push({path: '/driver_StickerAuditDetails'});
            },
            handleSizeChange(pagesize){
                this.pagesize = pagesize;
                this.data();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.data();
            },
            //导出
            Export(){


                let page = JSON.stringify({
                    "token": this.token,
                    "pageSize": this.pagesize,
                    'pageNum': this.currentPage,
                    //大区
                    'regionId': this.formInline.input,
                    "driverId": this.formInline.DriverId,
                    //司机姓名
                    "driverName": this.formInline.DriverName,
                    //车型
                    "vehicleType": this.formInline.Approver,
                    //司机类型
                    "driverType": this.formInline.type,
                    //审核状态
                    "auditStatus": this.formInline.state,
                    //所属分公司
                    "filialeId": this.formInline.region,
                    //运营专员
                    "adminName": this.formInline.Fleet,
                    //司机注册时间
                    "startTime": this.formInline.Registration!=null?this.formInline.Registration[0]:'',
                    "endTime": this.formInline.Registration!=null?this.formInline.Registration[1] + 86400000 - 1:'',
                    //最后审批时间
                    'lastAuditStartTime':this.formInline.lastAuditTime!=null?this.formInline.lastAuditTime[0]:'',
                    'lastAuditEndTime':this.formInline.lastAuditTime!=null?this.formInline.lastAuditTime[1] + 86400000 - 1:'',
                    'belongTeam' : this.formInline.belongTeam,
                    //电话
                    'driverPhone':this.formInline.phone
                })
                var exportLink = this.global.lightningUrl + '/companyv1/driverManage/report/export/tags_list';
                openPostWindow(exportLink,page);
                //
                // let page = JSON.stringify({
                //     "token":this.token,
                //     "exportName":"DriverVehiclePaster",
                //     "user_id":this.formInline.DriverId,
                //     "driver_name":this.formInline.DriverName,
                //     "vehicle_type":this.formInline.Approver,
                //     "driver_type":this.formInline.type,
                //     "filiale_id":this.formInline.region,
                //     "region_id":this.formInline.input,
                //     "admin_name":this.formInline.Fleet,
                //     "upload_time":this.time,
                //     "audit_time":certify_time,
                //     "team":this.formInline.belongTeam,
                //     'phone':this.formInline.phone
                // });
                // Export(this,this.queryStatus,this.ProgressBar,this.fullscreenLoading,this.code,page)
            },
        }
    }
</script>

<style scoped lang="scss">
    .main {
        padding: 30px;
        .center{
            padding-top:30px;
        }
    }
</style>