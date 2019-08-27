<template>
    <div class="main">
        <div class="header">
            当前位置：<span>司机管理>司机车贴审核列表</span>
        </div>
        <div class="center">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="司机编号">
                    <el-input v-model.trim="formInline.DriverId" placeholder="司机编号"></el-input>
                </el-form-item>
                <el-form-item label="司机姓名">
                    <el-input v-model.trim="formInline.DriverName" placeholder="司机姓名"></el-input>
                </el-form-item>
                <el-form-item label="司机电话">
                    <el-input v-model.trim="formInline.phone" placeholder="司机电话"></el-input>
                </el-form-item>
                <el-form-item label="司机类型">
                    <el-select v-model="formInline.type">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="车队司机" value="team"></el-option>
                        <el-option label="运输公司" value="company"></el-option>
                        <el-option label="个体司机" value="personal"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属分公司">
                    <el-select v-model="formInline.region" placeholder="请选择所属分公司">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                                v-for="item in ids"
                                :key="item.id"
                                :label="item.deptName"
                                :value="item.id">
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

                <el-form-item label="上传时间">
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
                <el-form-item label="补贴月份">
                    <el-date-picker
                            width="110"
                            v-model="formInline.subsidy"
                            type="daterange"
                            value-format="yyyy-MM"
                            format="yyyy 年 MM 月"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query()">查询</el-button>
                    <el-button type="primary" @click="Export()" v-if="checklistOfVehicleStickersExport == true?true:false" >导出</el-button>
                    <!--<el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>-->
                </el-form-item>
            </el-form>
            <el-table
                    ref="multipleTable"
                    :data="arr"
                    tooltip-effect="dark"
                    style="width: 100%"
            >
                <el-table-column
                        width="170"
                        prop="lastUploadTime"
                        :formatter="dateFormat"
                        label="上传时间" align="center">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="tagsMonth"
                        label="补贴月份"
                >
                </el-table-column>
                <el-table-column
                        width="170"
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
                        align="center"
                        prop="driverPhone"
                        label="司机电话"
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
                        prop="auditor"
                        label="审批人"
                >
                </el-table-column>
                <el-table-column
                        width="170"
                        prop="auditTime"
                        :formatter="dateFormat"
                        label="审批时间" align="center">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        align="center"
                        prop=""
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="arr[scope.$index].auditStatus == 'approving' && arr[scope.$index].currentApprover == true ? true:false" :disabled="false">去审核</el-button>
                        <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="arr[scope.$index].auditStatus == 'approving' && arr[scope.$index].currentApprover == false ? true:false" :disabled="true">去审核</el-button>
                        <el-popover
                                v-if="arr[scope.$index].auditStatus == 'rejected' ? true:false"
                                trigger="hover"
                                placement="left"
                        >
                            <el-form  label-width="80px">
                                <el-form-item label="退回原因">
                                    <el-input
                                            type="textarea"
                                            :rows="3"
                                            disabled
                                            v-model="arr[scope.$index].opinion">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="退回时间">
                                    <el-date-picker
                                            v-model="arr[scope.$index].auditTime"
                                            disabled
                                            type="datetime"
                                            value-format="timestamp"
                                            :formatter="dateFormat"
                                            default-time="12:00:00">
                                    </el-date-picker>
                                </el-form-item>

                                <el-form-item label="查看图片">
                                    <el-button  type="text" size="small" @click="onimgs(scope.$index)" >查看图片</el-button>
                                </el-form-item>
                            </el-form>
                            <el-button slot="reference" type="text" size="small" >审核未通过</el-button>
                        </el-popover>
                        <el-button type="text" size="small" v-if="arr[scope.$index].auditStatus == 'accepted' ? true:false">通过审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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

        <el-dialog
                width="800px"
                :visible.sync="dialogVisible">
            <el-carousel trigger="click" height="600px">
                <el-carousel-item v-for="item in imageList1" :key="item">
                    <img :src="item" alt=""  width="800px" height="600px" >
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment'
    import {openPostWindow} from '../../js/report.js'
    export default {
        name: "driver_CarAudit",
        data(){
            return{
                dialogVisible:false,
                imageList1:[],
                //导出的转化时间
                subsidy_day:'',
                upload_time:'',
                //遮罩层
                fullscreenLoading: false,
                code:'',
                //导出
                queryStatus:true,
                //进度条
                ProgressBar:0,

                region:[],
                arr:[],
                //权限
                queryStatus:true,

                token:'',
                formInline:{
                    phone:'',
                    input:'',
                    //补贴
                    subsidy:'',
                    DriverId:'',
                    DriverName:'',
                    Approver:'',
                    type:'',
                    state:'',
                    region:'',
                    Fleet:'',
                    Registration:'',
                },
                ids:[],
                //分页
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
                checklistOfVehicleStickersExport:''
            }
        },
        created(){
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));

            this.checklistOfVehicleStickersExport = jurisdictions[5].menus[19].choose
            // this.checklistOfVehicleStickersExport = jurisdictions[5].menus[11].choose

            this.$http.post( this.global.lightningUrl + '/companyv1/userManage/region/all_region',JSON.stringify({
                'token':this.token,
            })).then(run=>{
                if (run.body.errcode == 0){
                    this.region = run.body.result
                }
            });


            this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_filiale_list',JSON.stringify({
                'token':this.token,
            })).then(run=>{
                this.ids = run.body.result;
            });

            if(sessionStorage.getItem('driver_CarAuditCurrentPage')!=null){
                let currentPages = Number(sessionStorage.getItem('driver_CarAuditCurrentPage'));
                let totals = Number(sessionStorage.getItem('driver_CarAudiTtotal'));
                let condition = sessionStorage.getItem('driver_CarAuditCondition');

                this.formInline = JSON.parse(condition);
                this.currentPage = currentPages;
                this.total = totals;
            }
            // 首刷
            this.data();
        },
        methods:{
            onimgs(_index){
                console.log(this.arr[_index]);
                this.imageList1 = []
                this.dialogVisible = true;
                this.imageList1.push(this.arr[_index].behindTags)
                this.imageList1.push(this.arr[_index].leftTags)
                this.imageList1.push(this.arr[_index].rightTags)
            },
            //时间格式的转化（戳 -> 时间）
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            //导出
            Export(){
                if (this.formInline.subsidy == undefined || this.formInline.subsidy == null || this.formInline.subsidy == ''){
                    this.formInline.subsidy = '';
                }
                if (this.formInline.Registration == undefined || this.formInline.Registration == null || this.formInline.Registration == ''){
                    this.formInline.Registration = '';
                }
                let page = JSON.stringify({
                    'token':this.token,
                    'pageNum':this.currentPage,
                    'pageSize':this.pagesize,
                    //大区
                    'regionId':this.formInline.input,
                    //司机编号
                    'driverId':this.formInline.DriverId,
                    //司机姓名
                    'driverName':this.formInline.DriverName,
                    //司机类型
                    'driverType':this.formInline.type,
                    //所属分公司
                    'filialeId':this.formInline.region,
                    //运营专员
                    'adminName':this.formInline.Fleet,
                    //上传时间
                    'startTime':this.formInline.Registration!=null?this.formInline.Registration[0]:'',
                    'endTime':this.formInline.Registration!=null?this.formInline.Registration[1]+1000*60*60*24-1:'',
                    //补贴月份  formInline.Registration
                    'tagsStartMonth':this.formInline.subsidy!= null?this.formInline.subsidy[0]:'',
                    'tagsEndMonth':this.formInline.subsidy!= null?this.formInline.subsidy[1]:'',
                    'driverPhone':this.formInline.phone
                })
                var exportLink = this.global.lightningUrl + '/companyv1/driverManage/report/export/audit_tags_list';
                openPostWindow(exportLink,page);
                // console.log(this.formInline.Registration);
                // if (this.formInline.Registration == '' || this.formInline.Registration == null || this.formInline.Registration == undefined){
                //     this.upload_time = ''
                // } else {
                //     this.startTime =  this.formInline.Registration[0];
                //     this.endTime = this.formInline.Registration[1]+86400000-1;
                //     this.upload_time = 'between '+ this.startTime +' and '+ this.endTime;
                // };
                // if (this.formInline.subsidy == '' || this.formInline.subsidy == null || this.formInline.subsidy == undefined){
                //     this.subsidy_day = ''
                // }else{
                //     let subsidyStart = this.formInline.subsidy[0];
                //     let subsidyEnd = this.formInline.subsidy[1];
                //     var x = '\'';
                //     let subsidy_day1 = 'STR_TO_DATE(CONCAT('+ x + subsidyStart + x +',\'-01\'),\'%Y-%m-%d\')';
                //     let subsidy_day2 = 'STR_TO_DATE(CONCAT('+ x + subsidyEnd + x+ ',\'-01\'),\'%Y-%m-%d\')';
                //     this.subsidy_day =  subsidy_day1 + ' and ' +  subsidy_day2 ;
                //     console.log(this.subsidy_day);
                // };
                // this.$message({
                //     showClose: true,
                //     message: '正在导出请耐心等待！',
                //     type: 'warning'
                // });
                // this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
                //     "token":this.token,
                //     "exportName":"VehiclePaster",
                //     "user_id":this.formInline.DriverId,
                //     "driver_name":this.formInline.DriverName,
                //     "driver_type":this.formInline.type,
                //     "filiale_id":this.formInline.region,
                //     "region_id":this.formInline.input,
                //     "admin_name":this.formInline.Fleet,
                //     "upload_time":this.upload_time,
                //     "STR_TO_DATE":this.subsidy_day,
                //     'phone':this.formInline.phone
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
            //查询
            query(){
                this.currentPage = 1;
                this.data();
            },
            //首刷
            data(){
                console.log(this.formInline.Registration);
                console.log(this.formInline.subsidy);
                //上传时间
                if (this.formInline.Registration == undefined || this.formInline.Registration == null || this.formInline.Registration == ''){
                    this.formInline.Registration = '';
                }
                //补贴月份
                if (this.formInline.subsidy == undefined || this.formInline.subsidy == null || this.formInline.subsidy == ''){
                    this.formInline.subsidy = '';
                }
                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/vehicle_tags/audit_tags_List',JSON.stringify({
                    'token':this.token,
                    'pageNum':this.currentPage,
                    'pageSize':this.pagesize,
                    //大区
                    'regionId':this.formInline.input,
                    //司机编号
                    'driverId':this.formInline.DriverId,
                    //司机姓名
                    'driverName':this.formInline.DriverName,
                    //司机类型
                    'driverType':this.formInline.type,
                    //所属分公司
                    'filialeId':this.formInline.region,
                    //运营专员
                    'adminName':this.formInline.Fleet,
                    //上传时间
                    'startTime':this.formInline.Registration[0],
                    'endTime':this.formInline.Registration[1]+86400000-1,
                    //补贴月份  formInline.Registration
                    'tagsStartMonth':this.formInline.subsidy[0],
                    'tagsEndMonth':this.formInline.subsidy[1],
                    'driverPhone':this.formInline.phone
                })).then(run=>{
                    if (run.body.errcode == 0){
                        this.arr = run.body.result.rows;
                        for(var i in this.arr) {
                            if (this.arr[i].driverType == "personal") {
                                this.arr[i].driverType = "个体司机"
                            } else if (this.arr[i].driverType == "company") {
                                this.arr[i].driverType = "运输公司"
                            } else if (this.arr[i].driverType == "team") {
                                this.arr[i].driverType = "车队司机"
                            }
                        }
                        this.total = run.body.result.total;
                    }
                })
                //更新本地存储
                if(sessionStorage.getItem('driver_CarAuditCurrentPage')!=null&&sessionStorage.getItem('driver_CarAuditCurrentPage')!=null){
                    //删除本地
                    sessionStorage.removeItem('driver_CarAuditCurrentPage');
                    sessionStorage.removeItem('driver_CarAuditCondition');
                    sessionStorage.removeItem('driver_CarAudiTtotal');
                    //存储本地
                    sessionStorage.setItem('driver_CarAuditCurrentPage', JSON.stringify(this.currentPage));
                    sessionStorage.setItem('driver_CarAudiTtotal', JSON.stringify(this.total));
                    sessionStorage.setItem('driver_CarAuditCondition', JSON.stringify(this.formInline));
                }else {
                    //存储本地
                    sessionStorage.setItem('driver_CarAuditCurrentPage', JSON.stringify(this.currentPage));
                    sessionStorage.setItem('driver_CarAudiTtotal', JSON.stringify(this.total));
                    sessionStorage.setItem('driver_CarAuditCondition', JSON.stringify(this.formInline));
                }
            },
            //审核按钮
            handleClick(row){
                console.log(row);
                sessionStorage.setItem('managementid',JSON.stringify(row));
                this.$router.push({path:'/driver_StickerAuditExamine'});
            },
            //分页
            handleSizeChange(pagesize) {
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

<style scoped lang="scss">
    .main {
        padding: 30px;
        .header{
            margin-bottom: 20px;
        }
        .center{
            /*padding-top:30px;*/
        }
    }
</style>