<template>
    <div class="main">
        <div class="header">
            当前位置：<span>司机管理 > 司机邀请列表</span>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="司机编号">
                <el-input v-model.trim="formInline.driverId" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入司机编号"></el-input>
            </el-form-item>
            <el-form-item label="司机姓名">
                <el-input v-model.trim="formInline.driverName" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入司机姓名"></el-input>
            </el-form-item>
            <el-form-item label="司机电话">
                <el-input v-model.trim="formInline.driverPhone" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入司机电话"></el-input>
            </el-form-item>
            <el-form-item label="邀请人">
                <el-input v-model.trim="formInline.inviteName" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入邀请人"></el-input>
            </el-form-item>
            <!--<el-form-item label="司机类型">-->
                <!--<el-select v-model="formInline.driverType" placeholder="请选择司机类型">-->
                    <!--<el-option label="全部" value=""></el-option>-->

                    <!--<el-option label="车队司机" value="team"></el-option>-->
                    <!--<el-option label="运输公司" value="company"></el-option>-->
                    <!--<el-option label="个体司机" value="personal"></el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="所属车队">-->
                <!--<el-input v-model.trim="formInline.belongTeam" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入所属车队"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="司机所属分公司">
                <el-select v-model="formInline.belongCompany" placeholder="请选择分公司">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                            v-for="item in ids"
                            :key="item.id"
                            :label="item.deptName"
                            :value="item.deptName">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="认证状态">
                <el-select v-model="formInline.certifyStatus" placeholder="请选择认证状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待认证" value="un_certifiy"></el-option>
                    <el-option label="认证成功" value="certify_success"></el-option>
                    <el-option label="认证失败" value="certify_fail"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="注册时间">
                <el-date-picker
                        width="110"
                        v-model="formInline.time"
                        type="daterange"
                        value-format="timestamp"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="认证时间">
                <el-date-picker
                    width="110"
                    v-model="formInline.Authentication"
                    type="daterange"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="运营专员">
                <el-input v-model.trim="formInline.regiestYunli" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入运营专员"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="driverInvitationExport==true?true:false">导出</el-button>
                <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
            </el-form-item>
        </el-form>
        <el-table

                :data="tableData"
                style="width: 100%">
            <el-table-column
                fixed
                width="120"
                align="center"
                prop="driver_id"
                label="司机编号"
               >
            </el-table-column>
            <el-table-column
                    prop="driver_name"
                    label="司机姓名"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="driver_phone"
                    label="司机电话"
                    align="center"
            >
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="driver_sex"-->
                    <!--label="性别"-->
                    <!--align="center"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="plate_num"-->
                    <!--label="车牌号"-->
                    <!--align="center"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="vehicle_type"
                    label="车型"
                    align="center"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="invite_name"
                    label="邀请人"
                    align="center"

            >
            </el-table-column>
            <el-table-column
                    prop="invite_phone"
                    label="邀请人电话"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="current_yunli"
                    label="运营专员"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="belong_company"
                    label="所属分公司"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    width="150"
                    prop="invitee_regist_time"
                    :formatter="dateFormatHm"
                    label="注册时间"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                width="150"
                prop="invitee_certify_time"
                :formatter="dateFormatHm"
                label="认证时间"
                align="center"
            >
            </el-table-column>

            <!--<el-table-column-->
                    <!--prop="address"-->
                    <!--label="注册渠道"-->
                    <!--align="center"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="award"
                    label="邀请人是否奖励"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                fixed="right"
                prop="invitee_status"
                label="认证状态"
                align="center"
            >
            </el-table-column>
        </el-table>
        <!-- 分页插件 -->
        <el-pagination background
                       layout="total,prev, pager, next,sizes"
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
<script >
    import moment from 'moment'
export default {
    created(){
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
        this.driverInvitationExport = jurisdictions[5].menus[13].choose
        this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_filiale_list',JSON.stringify({
            'token':this.token,
        })).then(run=>{
            this.ids = run.body.result;
            console.log(this.ids);
        })
        this.data()
    },
    data(){
        return {
            time:'',
            //遮罩层
            fullscreenLoading: false,
            code:'',
            //导出
            queryStatus:true,
            //进度条
            ProgressBar:0,

            formInline:{
                Authentication:'',
                time:''
                // belongCompany:''
            },
            tableData: [],
            token:'',
            total:0,
            currentPage:1,
            pagesize:10,//每页的数据条数
            ids:[],
            driverInvitationExport:'',
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
            if (this.formInline.time == undefined || this.formInline.time == null || this.formInline.time == '' ){
                this.time = ''
            } else {
                this.startTime =  this.formInline.time[0];
                this.endTime = this.formInline.time[1]+86400000-1;
                this.time = 'between '+ this.startTime +' and '+ this.endTime;
            };
            let certify_time ;
            if (this.formInline.Authentication == '' || this.formInline.Authentication == null || this.formInline.Authentication == undefined){
                certify_time = ''
            }else {
                this.invitee_certify_startTime =  this.formInline.Authentication[0];
                this.invitee_certify_endTime = this.formInline.Authentication[1]+86400000-1;
                certify_time = 'between '+ this.invitee_certify_startTime +' and '+ this.invitee_certify_endTime;
            }
            this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
                "token":this.token,
                "exportName":"driverPromotion",                 /* -- 导出模块*/
                "driver_id":this.formInline.driverId,           /*-- 司机编号*/
                "driver_name":this.formInline.driverName,       /*-- 司机姓名*/
                "driver_phone":this.formInline.driverPhone,     /*-- 司机电话*/
                "invite_name":this.formInline.inviteName,       /*-- 邀请人姓名*/
                // "driver_type":,                              /*-- 司机类型*/
                // "team_name":"南葛队123",                      /*-- 团队名称*/
                "belong_company":this.formInline.belongCompany, /*-- 所属分公司*/
                "invitee_status":this.formInline.certifyStatus, /*-- 邀请状态 (un_certifiy|certify_success|certify_fail)*/
                "invitee_regist_time":this.time,                /*-- 注册时间*/
                "invitee_certify_time":certify_time,/*-- 认证时间*/
                "current_yunli":this.formInline.regiestYunli    /*-- 当前运营*/
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
            console.log(page);
            // for (let i = 0; i < this.ids.length; i++) {
            //     if (this.formInline.belongCompany ==  this.ids[i].id) {
            //         console.log(2);
            //
            //         this.formInline.belongCompany = this.ids[i].deptName
            //     }
            // }
            for (let i = 0; i < this.ids.length; i++) {
                if (this.formInline.belongCompany ==  this.ids[i].id) {
                    this.formInline.belongCompany = this.ids[i].deptName
                }
                if (this.formInline.belongCompany == '全部'){
                    this.formInline.belongCompany = ''
                }
            }

            this.$http.post(this.global.lightningUrl + '/companyv1/driverPromotion/recordsForBackWeb2',page,{
                // this.$http.post('http://192.168.50.205:8080/driverPromotion/promotion/records2',page,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                if  (res.body.errcode == 0){
                    this.tableData = res.body.result.list;
                    this.total = res.body.result.pager.totalCount;
                    for (let i = 0; i < this.tableData.length ; i++) {
                        if (this.tableData[i].award == 'awarded'){
                            this.tableData[i].award = '是'
                        }else if ( this.tableData[i].award == 'unawarded'){
                            this.tableData[i].award = '否'
                        }
                        if (this.tableData[i].invitee_status == 'certify_success') {
                            this.tableData[i].invitee_status = '认证成功'
                        }else if (this.tableData[i].invitee_status == 'un_certifiy') {
                            this.tableData[i].invitee_status = '待认证'
                        }else if (this.tableData[i].invitee_status == 'certify_fail') {
                            this.tableData[i].invitee_status = '认证失败'
                        }
                    }
                }
            })
        },
        data(){
          let page = JSON.stringify({
              token:this.token,
              driverId: this.formInline.driverId,
              driverName: this.formInline.driverName,
              driverPhone: this.formInline.driverPhone,
              inviteName: this.formInline.inviteName,
              // driverType: this.formInline.driverType,
              // belongTeam: this.formInline.belongTeam,
              belongCompany: this.formInline.belongCompany,
              certifyStatus: this.formInline.certifyStatus,
              regiestStartTime: this.formInline.time[0],
              regiestEndTime: this.formInline.time[1]+86400000-1,
              regiestYunli: this.formInline.regiestYunli,
              certifyStartTime:this.formInline.Authentication[0],//认证开始时间
              certifyEndTime:this.formInline.Authentication[1]+86400000-1,//认证结束时间
              pageSize:this.pagesize,
              pageNo:this.currentPage,
          });
          this.ajax(page)
        },
        //查询
        onSubmit(){
            if (this.formInline.time == undefined || this.formInline.time == null || this.formInline.time == ''){
                this.formInline.time = ''
            }
            if (this.formInline.Authentication == undefined || this.formInline.Authentication == null || this.formInline.Authentication == ''){
                this.formInline.Authentication = ''
            }
            let page = JSON.stringify({
                token:this.token,
                driverId: this.formInline.driverId,
                driverName: this.formInline.driverName,
                driverPhone: this.formInline.driverPhone,
                inviteName: this.formInline.inviteName,
                // driverType: this.formInline.driverType,
                // belongTeam: this.formInline.belongTeam,
                belongCompany: this.formInline.belongCompany,
                certifyStatus: this.formInline.certifyStatus,
                regiestStartTime: this.formInline.time[0],
                regiestEndTime: this.formInline.time[1]+86400000-1,
                certifyStartTime:this.formInline.Authentication[0],//认证开始时间
                certifyEndTime:this.formInline.Authentication[1]+86400000-1,//认证结束时间
                regiestYunli: this.formInline.regiestYunli,
                pageSize:this.pagesize,
                pageNo:this.currentPage = 1,
            })

            this.ajax(page)
        },
        exportSubmit(){},
        handleSizeChange(pagesize){
            this.pagesize = pagesize;
            this.data();
        },
        handleCurrentChange(val){
            if (this.formInline.time == null || this.formInline.time == undefined || this.formInline.time == ''){
                this.formInline.time = ''
            }
            this.currentPage = val;
            console.log(val);
            this.data();
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
            return moment(date).format("YYYY-MM-DD HH:mm");
        },
    },
}
</script>
<style lang="scss" scoped>
    .header{
        margin-bottom: 20px;
    }
</style>