<template>
    <div class="main">
        <div class="header">当前位置： 事故中心  </div>
        <div class="center" >
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="事故编号">
                    <el-input v-model="formInline.id" placeholder="请输入事故编号"></el-input>
                </el-form-item>
                <el-form-item label="出车单编号">
                    <el-input v-model="formInline.trackId" placeholder="请输入事故编号"></el-input>
                </el-form-item>
                <el-form-item label="司机姓名">
                    <el-input v-model="formInline.driverName" placeholder="请输入司机姓名"></el-input>
                </el-form-item>
                <el-form-item label="司机电话">
                    <el-input v-model="formInline.driverPhone" placeholder="请输入司机电话"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="formInline.customerName" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="销售专员">
                    <el-input v-model="formInline.saleAdmin" placeholder="请输入销售专员"></el-input>
                </el-form-item>
                <el-form-item label="运营专员">
                    <el-input v-model="formInline.projectName" placeholder="请输入运营专员"></el-input>
                </el-form-item>
                <el-form-item label="事故判定结果">
                    <el-select v-model="formInline.isAccident" placeholder="请选择事故判定结果">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属分公司">
                    <el-select v-model="formInline.customerOffice" placeholder="所属分公司">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in regions" :label='i.deptName' :value="i.deptName" :key="i.allId"></el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="理赔状态">
                    <el-select v-model="formInline.auditStatus" placeholder="请选择理赔状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已理赔" value="accepted"></el-option>
                        <el-option label="未理赔" value="rejected"></el-option>
                        <el-option label="调查中" value="inquiring"></el-option>
                        <el-option label="审核中" value="approving"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="$router.push({name: 'establish'})" v-if="createCustomerService==true?true:false">创建</el-button>
                    <!--<el-button type="primary" @click="onderive">导出</el-button>-->
                    <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="accidentCenterListExport==true?true:false">导出</el-button>
                    <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                </el-form-item>
            </el-form>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="id"
                        label="事故编号"
                        align="center"
                       >
                        <template slot-scope="scope">
                            <div  @click="examine(scope.$index)">
                                <router-link to="" style="color:#409EFF;">{{ tableData[scope.$index].id }} </router-link>
                            </div>
                        </template>
                </el-table-column>
                <el-table-column
                        prop="trackId"
                        label="出车单编号"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="accidentTime"
                        label="事故发生时间"
                        :formatter="dateFormatHm"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        align="center"
                        :formatter="dateFormatHm"
                        label="事故创建时间">
                </el-table-column>
                <el-table-column
                        prop="createUserName"
                        align="center"
                        label="创建人">
                </el-table-column>
                <el-table-column
                        prop="driverName"
                        align="center"
                        label="司机姓名">
                </el-table-column>
                <el-table-column
                        prop="driverPhone"
                        align="center"
                        label="司机电话">
                </el-table-column>
                <el-table-column
                        prop="projectName"
                        align="center"
                        label="运营专员">
                </el-table-column>
                <el-table-column
                        prop="customerName"
                        align="center"
                        label="项目名称">
                </el-table-column>
                <el-table-column
                        prop="projectType"
                        align="center"
                        label="项目类型">
                </el-table-column>
                <el-table-column
                        prop="customerOffice"
                        align="center"
                        label="客户所属分公司">
                </el-table-column>
                <el-table-column
                        prop="saleAdmin"
                        align="center"
                        label="销售专员">
                </el-table-column>
                <el-table-column
                        prop="driverInsuranceMoney"
                        align="center"
                        label="司机保障费（元）">
                </el-table-column>
                <el-table-column
                        prop="customerInsuranceMoney"
                        align="center"
                        label="客户保障费（元）">
                </el-table-column>
                <el-table-column
                        prop="penaltyDriverFee"
                        align="center"
                        label="司机罚款金额（元）">
                </el-table-column>
                <el-table-column
                        prop="compensateOffline"
                        align="center"
                        label="客户赔付金额（元）">
                </el-table-column>
                <el-table-column
                        prop="compensateOffline"
                        align="center"
                        label="赔付总金额（元）">
                </el-table-column>
                <el-table-column
                        prop="isAccident"
                        align="center"
                        label="事故判定结果">
                </el-table-column>
                <el-table-column
                        prop="auditStatus"
                        align="center"
                        label="理赔状态">
                </el-table-column>
                <el-table-column
                        prop="auditTime"
                        align="center"
                        :formatter="dateFormatHm"
                        label="事故处理完成时间">
                </el-table-column>
                <el-table-column
                        prop="auditTime"
                        fixed="right"
                        align="center"
                        width="100px"
                        label="操作">
                    <template slot-scope="scope">
                        <div >
                            <el-button type="primary" @click="examine0(scope.$index)" v-if="(tableData[scope.$index].auditStatus=='审核中'&&ministryOfFinanceMajordomoAuditing) || (tableData[scope.$index].auditStatus=='调查中' && entryInvestigationAndCompensateInfo)">处 理</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="pagesize"
                    layout="total,prev, pager, next,sizes"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        created(){
            let jurisdictions = JSON.parse( sessionStorage.getItem('jurisdictions'));
            console.log(jurisdictions);
            // if (jurisdictions[15].menus.length == 6){
                this.accidentCenterListExport = jurisdictions[15].menus[5].choose;

            //事故权限  --------S-----
            if ( jurisdictions.length == 17 ){
                // 创建
                this.createCustomerService = jurisdictions[15].menus[1].choose;
                // 详情
                this.accidentDetail = jurisdictions[15].menus[2].choose;
                this.entryInvestigationAndCompensateInfo = jurisdictions[15].menus[3].choose;
                this.ministryOfFinanceMajordomoAuditing = jurisdictions[15].menus[4].choose;
            }else {
                this.createCustomerService = false;
                this.accidentDetail = false;
                this.entryInvestigationAndCompensateInfo = false;
                this.ministryOfFinanceMajordomoAuditing = false;
            }
            // ---------------------E-------------
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
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
            if(sessionStorage.getItem('accidentcentrecurrentPage')!=null){
                let currentPages = Number(sessionStorage.getItem('accidentcentrecurrentPage'));
                let totals = Number(sessionStorage.getItem('accidentcentretotal'));
                let condition = sessionStorage.getItem('accidentcentrecondition');
                this.formInline = JSON.parse(condition)
                this.currentPage = currentPages;
                this.total = totals;
                //定义回显接口
                this.requestTurnout()
            }else {
                this.data();
            }
            // this.data();

        },
        data (){
            return{
                token:'',
                formInline:{},
                tableData: [],
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
                regions:[],
            //    创建权限
                createCustomerService:'',
                accidentDetail:'',
                entryInvestigationAndCompensateInfo:'',
                ministryOfFinanceMajordomoAuditing:'',
                fullscreenLoading: false,
                code:'',
                //导出
                queryStatus:true,
                //进度条
                ProgressBar:0,
                accidentCenterListExport:'',
            }
        },
        methods:{
            Export(){
                this.$message({
                    showClose: true,
                    message: '正在导出请耐心等待！',
                    type: 'warning'
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
                    "token":this.token,
                    "exportName":"accident",
                    "a.id":this.formInline.id,
                    "c.track_id":this.formInline.trackId,
                    "c.driver_name":this.formInline.driverName,
                    "c.customer_name":this.formInline.customerName,
                    "c.driver_phone":this.formInline.driverPhone,
                    "c.project_name":this.formInline.projectName,
                    "c.sale_admin":this.formInline.saleAdmin,
                    "co.is_accident":this.formInline.isAccident,
                    "c.customer_office":this.formInline.customerOffice,
                    "a.audit_status":this.formInline.auditStatus,


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
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            dateFormatHm:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm    ");
            },
            data(){
                let page = JSON.stringify({
                    pageSize : this.pagesize,
                    pageNum : this.currentPage,
                    token : this.token,
                });
                this.ajax(page)
            },
            requestTurnout(){
                let page = JSON.stringify({
                    pageSize : this.pagesize,
                    pageNum : this.currentPage,
                    token : this.token,
                    id : this.formInline.id,
                    trackId:this.formInline.trackId,
                    driverName : this.formInline.driverName,
                    driverPhone : this.formInline.driverPhone,
                    customerName : this.formInline.customerName,
                    saleAdmin : this.formInline.saleAdmin,
                    projectName : this.formInline.projectName,
                    isAccident : this.formInline.isAccident,
                    customerOffice : this.formInline.customerOffice,
                    auditStatus : this.formInline.auditStatus,
                });
                this.ajax(page)
            },
            ajax(page){
                this.$http.post(this.global.lightningUrl + '/companyv1/insurance/accident/list',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    this.total = res.body.result.total;
                    this.tableData = res.body.result.list ;
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].isAccident == 1) {
                            this.tableData[i].isAccident = '是'
                        }else if (this.tableData[i].isAccident == 2){
                            this.tableData[i].isAccident = '否'
                        }
                        if (this.tableData[i].auditStatus == 'inquiring') {
                            this.tableData[i].auditStatus = '调查中'
                        }else if (this.tableData[i].auditStatus == 'approving') {
                            this.tableData[i].auditStatus = '审核中'
                        }else if (this.tableData[i].auditStatus == 'accepted') {
                            this.tableData[i].auditStatus = '已理赔'
                        }else if (this.tableData[i].auditStatus == 'rejected') {
                            this.tableData[i].auditStatus = '未理赔'
                        }
                        if (this.tableData[i].projectType == 'ProjectCustomer') {
                            this.tableData[i].projectType = '标准项目'
                        }else if (this.tableData[i].projectType == 'InterimCustomer') {
                            this.tableData[i].projectType = '临时项目'
                        }else if (this.tableData[i].projectType == 'BackToBackCustomer') {
                            this.tableData[i].projectType = '背靠背项目'
                        }

                        //更新本地存储
                        if(sessionStorage.getItem('accidentcentrecurrentPage')!=null&&sessionStorage.getItem('accidentcentrecurrentPage')!=null){
                            //删除本地
                            sessionStorage.removeItem('accidentcentrecurrentPage');
                            sessionStorage.removeItem('accidentcentrecondition');
                            sessionStorage.removeItem('accidentcentretotal');
                            //存储本地
                            sessionStorage.setItem('accidentcentrecurrentPage', JSON.stringify(this.currentPage));
                            sessionStorage.setItem('accidentcentretotal', JSON.stringify(this.total));
                            sessionStorage.setItem('accidentcentrecondition', JSON.stringify(this.formInline));
                        }else {
                            //存储本地
                            sessionStorage.setItem('accidentcentrecurrentPage', JSON.stringify(this.currentPage));
                            sessionStorage.setItem('accidentcentretotal', JSON.stringify(this.total));
                            sessionStorage.setItem('accidentcentrecondition', JSON.stringify(this.formInline));
                        }
                    }
                })
            },
            onSubmit(){
                // for (let i = 0; i < this.regions.length; i++) {
                //     if (this.formInline.customerOffice == )
                // }
                let page = JSON.stringify({
                    pageSize : this.pagesize,
                    pageNum : this.currentPage=1,
                    token : this.token,
                    id : this.formInline.id,
                    trackId:this.formInline.trackId,
                    driverName : this.formInline.driverName,
                    driverPhone : this.formInline.driverPhone,
                    customerName : this.formInline.customerName,
                    saleAdmin : this.formInline.saleAdmin,
                    projectName : this.formInline.projectName,
                    isAccident : this.formInline.isAccident,
                    customerOffice : this.formInline.customerOffice,
                    auditStatus : this.formInline.auditStatus,
                });
                this.ajax(page)
            },
            handleCurrentChange(val){
                this.currentPage = val;
                let page = JSON.stringify({
                    pageSize : this.pagesize,
                    pageNum : this.currentPage,
                    token : this.token,
                    id : this.formInline.id,
                    driverName : this.formInline.driverName,
                    driverPhone : this.formInline.driverPhone,
                    customerName : this.formInline.customerName,
                    saleAdmin : this.formInline.saleAdmin,
                    projectName : this.formInline.projectName,
                    isAccident : this.formInline.isAccident,
                    customerOffice : this.formInline.customerOffice,
                    auditStatus : this.formInline.auditStatus,
                });
                this.ajax(page)

            },
            handleSizeChange(val){
                this.pagesize = val ;
                let page = JSON.stringify({
                    pageSize : this.pagesize,
                    pageNum : this.currentPage,
                    token : this.token,
                    id : this.formInline.id,
                    driverName : this.formInline.driverName,
                    driverPhone : this.formInline.driverPhone,
                    customerName : this.formInline.customerName,
                    saleAdmin : this.formInline.saleAdmin,
                    projectName : this.formInline.projectName,
                    isAccident : this.formInline.isAccident,
                    customerOffice : this.formInline.customerOffice,
                    auditStatus : this.formInline.auditStatus,
                });
                this.ajax(page)
            },
            examine(_index){
                console.log(this.tableData[_index].id);
                if (this.accidentDetail){
                    this.$router.push(
                        {
                            name: 'accidentDetails',
                            query: {
                                id: this.tableData[_index].id,
                            }
                        });
                }
            },
            examine0(_index){
                if (this.tableData[_index].auditStatus == '调查中' ) {
                    this.$router.push(
                        {
                            name: 'accidentmessage',
                            query: {
                                id: this.tableData[_index].id,
                            }
                        });
                }else if (this.tableData[_index].auditStatus == '审核中'){
                    this.$router.push(
                        {
                            name: 'accidentAudit',
                            query: {
                                id: this.tableData[_index].id,
                            }
                        });
                }
            },
            onderive(){
                // let num=[];
                // let a ;
                // for (let i = 0; i < this.tableData.length; i++) {
                //     // console.log(this.tableData[i].id);
                //     num.push(this.tableData[i].id )
                //     a =  num.join(',')
                // }
                // console.log(a);
            }
        },
    }
</script>
<style lang="scss" scoped>
    .header{
        margin-bottom: 20px;
    }
</style>


