<template>
    <div class="main">
        <div class="header">
            当前位置：<span>财务管理 > 司机红包</span>
        </div>
        <div class="content">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="红包编号">
                    <el-input v-model.trim="formInline.id" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入红包编号"></el-input>
                </el-form-item>
                <el-form-item label="所属分公司">
                    <!--<el-input v-model.trim="formInline.manageArea" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入客户所属分公司"></el-input>-->

                    <el-select v-model="formInline.filialeId" placeholder="请选择所属分公司">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in link" :label='i.filialeName' :value="i.filialeId" :key="i.filialeId"></el-option>
                    </el-select>


                </el-form-item>
                <el-form-item label="项目类型">
                    <!--<el-input v-model="formInline.user" placeholder="请输入项目类型"></el-input>-->
                    <el-select v-model="formInline.projectType" placeholder="请选择项目类型">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="临时项目" value="InterimCustomer"></el-option>
                        <el-option label="标准项目" value="ProjectCustomer"></el-option>
                        <el-option label="背靠背项目" value="BackToBackCustomer"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model.trim="formInline.customerName" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="司机姓名">
                    <el-input v-model.trim="formInline.driverName" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入司机姓名"></el-input>
                </el-form-item>
                <el-form-item label="司机手机号">
                    <el-input v-model.trim="formInline.phone" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入司机手机号"></el-input>
                </el-form-item>
                <el-form-item label="发放原因">
                    <el-select v-model="formInline.reason" placeholder="请选择发放原因">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="超点" value="超点"></el-option>
                        <el-option label="上楼" value="上楼"></el-option>
                        <el-option label="加急" value="加急"></el-option>
                        <el-option label="超公里" value="超公里"></el-option>
                        <el-option label="超时配送" value="超时配送"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出车日期">

                    <el-date-picker
                            v-model="formInline.time"
                            type="daterange"
                            value-format="timestamp"
                            range-separator="至"
                            :picker-options="pickerOptions"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="driverRedBagExport">导出</el-button>
                    <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                </el-form-item>
            </el-form>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="红包编号"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="filialeName"
                        label="所属分公司"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="regionName"
                        label="管理区"
                        align="center">
                </el-table-column>

                <el-table-column
                        prop="projectType"
                        align="center"
                        label="项目类型">
                </el-table-column>
                <el-table-column
                        prop="customerName"
                        align="center"
                        label="项目名称">
                </el-table-column>
                <el-table-column
                        prop="driverName"
                        align="center"
                        label="司机姓名">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        align="center"
                        label="司机电话">
                </el-table-column>
                <el-table-column
                        prop="vehicleType"
                        align="center"
                        label="车型">
                </el-table-column>
                <el-table-column
                        prop="trackId"
                        align="center"
                        label="出车单编号">
                </el-table-column>
                <el-table-column
                        prop="trackStartTime"
                        :formatter="dateFormat"
                        align="center"
                        label="出车日期">
                </el-table-column>



                <el-table-column
                        prop="reason"
                        align="center"
                        label="发放原因">
                </el-table-column>
                <el-table-column
                        prop="terminal"
                        align="center"
                        label="发放端">
                </el-table-column>
                <el-table-column
                        prop="amount"
                        align="center"
                        label="发放金额（元）">
                </el-table-column>
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--align="center"-->
                        <!--label="税费（元）">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="amount"-->
                        <!--align="center"-->
                        <!--label="总金额（元）">-->
                <!--</el-table-column>-->
                <el-table-column
                        prop="createTime"
                        align="center"
                        :formatter="dateFormat"
                        label="发放时间">
                </el-table-column>
                <el-table-column
                        prop="checkStatus"
                        align="center"
                        label="审核状态">
                </el-table-column>
                <el-table-column
                        prop="checkAdminName"
                        align="center"
                        label="当前审核人">
                </el-table-column>
                <el-table-column
                        prop="checkTime"
                        align="center"
                        :formatter="dateFormat"
                        label="审核时间">
                </el-table-column>

            </el-table>
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
    </div>
</template>
<script>
    import moment from 'moment'
export default {
    created(){
        let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.driverRedBagExport = jurisdictions[7].menus[8].choose;
        this.data()
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
    },
    data(){
        return {
            formInline:{
                time:''
            },
            tableData: [],
            link:[],
            token:'',
            total:0,
            currentPage:1,
            pagesize:10,
            pickerOptions:{
                disabledDate(time) {
                    let curDate = (new Date()).getTime();
                    let three = 360 * 24 * 3600 * 1000;
                    let threeMonths = curDate - three;
                    return time.getTime() > Date.now() || time.getTime() < threeMonths;;
                }
            },
            //导出
            queryStatus:true,
            fullscreenLoading: false,
            trackManageListExport:false,
//进度条
            ProgressBar:0,
            driverRedBagExport:false,
        }
    },
    methods :{
        Export(){
            let start_time
            if (this.formInline.time == undefined || this.formInline.time == '' || this.formInline.time == null){
                start_time = ''
            }else {
                // cashtime = 'between '+ startTime +' and '+ endTime;
                let a = this.formInline.time[0] ;
                let b = this.formInline.time[1]+86400000-1 ;
                start_time = 'between '+ a +' and '+ b
            }
            this.$message({
                showClose: true,
                message: '正在导出请耐心等待！',
                type: 'warning'
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
                "token":this.token,
                "exportName":"driverRedEnvelope",                         /*-- 到处模块*/
                "rp.id":this.formInline.id,
                "cf.filiale_id":this.formInline.filialeId,
                "cf.type":this.formInline.projectType,
                "cf.customer_name":this.formInline.customerName,
                "rp.reason":this.formInline.reason,
                "df.name":this.formInline.driverName,
                "df.phone":this.formInline.phone,
                "tf.start_time":start_time

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
        dateFormat:function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        },
        ajax(page){
            this.$http.post(this.global.lightningUrl +'/companyv1/finance/redpacket/queryRedPackets',page,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                // if (res.body.result == ''){
                //     this.tableData = []
                // }else {
                this.total = res.body.result.total
                this.tableData = res.body.result.rows;
                for ( let i= 0;i<this.tableData.length;i++ ) {
                    if (this.tableData[i].projectType == 'ProjectCustomer') {
                        this.tableData[i].projectType = '标准项目'
                    }else if (this.tableData[i].projectType == 'InterimCustomer') {
                        this.tableData[i].projectType = '临时项目'
                    }else if (this.tableData[i].projectType == 'BackToBackCustomer') {
                        this.tableData[i].projectType = '背靠背项目'
                    }
                    if (this.tableData[i].terminal == 'project') {
                        this.tableData[i].terminal = '项目'
                    }else if (this.tableData[i].terminal == 'customer') {
                        this.tableData[i].terminal = '客户'
                    }
                    if (this.tableData[i].checkStatus == 'approving'){
                        this.tableData[i].checkStatus = '审批中';
                    }else if(this.tableData[i].checkStatus == 'accepted'){
                        this.tableData[i].checkStatus = '审批通过';
                    }else if(this.tableData[i].checkStatus ==  'rejected'){
                        this.tableData[i].checkStatus = '审批未通过';
                    }

                    if (this.tableData[i].vehicleType != ''&&this.tableData[i].vehicleType != null &&this.tableData[i].vehicleType != undefined ){
                        this.tableData[i].vehicleType = JSON.parse(this.tableData[i].vehicleType).name + ' '
                            + JSON.parse(this.tableData[i].vehicleType).length + ' '
                            + JSON.parse(this.tableData[i].vehicleType).isCertificate + ' '
                            + JSON.parse(this.tableData[i].vehicleType).isTailBoard + ' '
                            + JSON.parse(this.tableData[i].vehicleType).isElectric + ' '
                            + JSON.parse(this.tableData[i].vehicleType).isCold ;

                    }else {
                        this.tableData[i].vehicleType = ''
                    }

                }
            })
        },
        data(){
            let page = JSON.stringify({
                token:this.token,
                pageNum : this.currentPage,
                pageSize : this.pagesize,
            })
            console.log(page);
            this.ajax(page)
        },
        onSubmit(){
            if (this.formInline.time == undefined){
                this.formInline.time = ''
            }
            // for (let i = 0 ; i < this.link.length; i ++){
            //     if (this.formInline.manageArea == this.link[i].id) {
            //         this.formInline.manageArea = this.link[i].filialeName
            //     }
            // }
            // if (this.formInline.manageArea == '全部'){
            //     this.formInline.manageArea= ''
            // }
            console.log(this.formInline.time);
            let page = JSON.stringify({
                token:this.token,
                pageNum : this.currentPage=1,
                pageSize : this.pagesize,
                id:this.formInline.id,
                filialeId:this.formInline.filialeId,
                projectType:this.formInline.projectType,
                customerName:this.formInline.customerName,
                reason:this.formInline.reason,
                driverName:this.formInline.driverName,
                phone:this.formInline.phone,
                createTimeBegin:this.formInline.time[0],
                createTimeEnd:this.formInline.time[1]+86400000-1,
            })
            console.log(page);
            this.ajax(page)
        },

        handleCurrentChange(val) {
            this.currentPage = val;
            if (this.formInline.time == undefined){
                this.formInline.time = ''
            }
            // for (let i = 0 ; i < this.link.length; i ++){
            //     if (this.formInline.manageArea == this.link[i].id) {
            //         this.formInline.manageArea = this.link[i].filialeName
            //     }
            // }
            // if (this.formInline.manageArea == '全部'){
            //     this.formInline.manageArea= ''
            // }
            let page = JSON.stringify({
                token:this.token,
                pageNum : this.currentPage,
                pageSize : this.pagesize,
                id:this.formInline.id,
                filialeId:this.formInline.manageArea,
                projectType:this.formInline.projectType,
                customerName:this.formInline.customerName,
                reason:this.formInline.reason,
                driverName:this.formInline.driverName,
                phone:this.formInline.phone,
                createTimeBegin:this.formInline.time[0],
                createTimeEnd:this.formInline.time[1]+86400000-1,
            })
            console.log(page);
            this.ajax(page)
        },
        handleSizeChange(val){
            if (this.formInline.time == undefined){
                this.formInline.time = ''
            }
            this.pagesize = val
            let page = JSON.stringify({
                token:this.token,
                pageNum : this.currentPage,
                pageSize : this.pagesize,
                id:this.formInline.id,
                filialeId:this.formInline.manageArea,
                projectType:this.formInline.projectType,
                customerName:this.formInline.customerName,
                reason:this.formInline.reason,
                driverName:this.formInline.driverName,
                phone:this.formInline.phone,
                createTimeBegin:this.formInline.time[0],
                createTimeEnd:this.formInline.time[1]+86400000-1,
            })
            console.log(page);
            this.ajax(page)
        }
    },
}
</script>
<style lang="scss" scoped>
    .header{
        margin-bottom: 20px;
    }
</style>