<template>
    <div class="main driver_manage">
        <div class="header">
            当前位置：<span>司机管理>司机列表</span>
        </div>
        <div class="dv">
           <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="司机编号">
                        <el-input v-model.trim="formInline.DriverId" placeholder="司机编号"></el-input>
                    </el-form-item>
                    <el-form-item label="司机姓名">
                        <el-input v-model.trim="formInline.DriverName" placeholder="司机姓名"></el-input>
                    </el-form-item>
                   <el-form-item label="司机手机号">
                       <el-input v-model.trim="formInline.iphone" placeholder="司机手机号"></el-input>
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
                        <el-select v-model="formInline.region" placeholder="司机类型">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="个体司机" value="personal"></el-option>
                            <el-option label="车队司机" value="team"></el-option>
                            <el-option label="运输公司" value="company"></el-option>
                        </el-select>
                    </el-form-item>

                   <el-form-item label="所属车队">
                       <el-input v-model.trim="formInline.Convoy" placeholder="所属车队"></el-input>
                   </el-form-item>
                   <el-form-item label="车牌号">
                       <el-input v-model.trim="formInline.plateNum" placeholder="车牌号"></el-input>
                   </el-form-item>
                   <el-form-item label="常跑城市">
                       <el-input v-model.trim="formInline.city" placeholder="常跑城市"></el-input>
                   </el-form-item>
                   <el-form-item label="所属分公司">
                       <el-select v-model="formInline.located" placeholder="所属分公司" :disabled = disabled1>
                           <el-option label="全部" value=""></el-option>
                           <el-option v-for="i in regions" :label='i.deptName' :value="i.id" :key="i.id"></el-option>
                       </el-select>
                   </el-form-item>

                   <el-form-item label="司机注册时间">
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
                   <el-form-item label="是否交押金">
                       <el-select v-model="formInline.deposit" placeholder="是否交押金">
                           <el-option label="全部" value=""></el-option>
                           <el-option label="是" value="1"></el-option>
                           <el-option label="否" value="0"></el-option>
                       </el-select>
                   </el-form-item>
                   <el-form-item label="认证状态">
                       <el-select v-model="formInline.Authentication " placeholder="认证状态">
                           <el-option label="全部" value=""></el-option>
                           <el-option label="已通过" value="2"></el-option>
                           <el-option label="审核中" value="1"></el-option>
                           <el-option label="待认证" value="0"></el-option>
                           <el-option label="未通过" value="3"></el-option>
                       </el-select>
                   </el-form-item>

                    <!--<el-form-item label="注册运营专员">-->
                       <!--<el-input v-model.trim="formInline.registerDeveAdminName" placeholder="注册运营专员"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="运营专员">
                        <el-input v-model.trim="formInline.currentDeveAdminName" placeholder="当前运营专员" :disabled = disabled2></el-input>
                    </el-form-item>
                   <el-form-item label="管理区">
                       <el-select v-model="formInline.area" :disabled = disabled3>
                           <el-option label="全部" value=""></el-option>
                           <el-option v-for="i in regionList" :label='i.name' :value="i.id" :key="i.id"></el-option>
                       </el-select>
                   </el-form-item>
               <el-form-item label="认证处理时间">
                   <el-date-picker
                           v-model="formInline.time"
                           type="daterange"
                           range-separator="至"
                           value-format="timestamp"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期">
                   </el-date-picker>
               </el-form-item>
               <el-form-item label="最后心跳时间">
                   <el-date-picker
                       v-model="formInline.timeEnd"
                       type="daterange"
                       range-separator="至"
                       value-format="timestamp"
                       start-placeholder="开始日期"
                       end-placeholder="结束日期">
                   </el-date-picker>
               </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="query">查询</el-button>
                        <!--<el-button type="primary" @click="exportex" v-if = 'driverDerive==true?true:false'>导出</el-button>-->
                        <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="driverListExport==true?true:false">导出</el-button>
                        <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                    </el-form-item>
           </el-form>
            <el-table
                    :data="arr"
                    style="width: 100%"
                    >
                <el-table-column
                        fixed
                        width="120"
                        align="center"
                        prop="driverId"
                        label="司机编号"
                        >
                        <template slot-scope="scope">
                           <div @click="handleClick(scope.row)">
                               <a style="color: rgb(102,177,255);cursor: pointer;" >{{ arr[scope.$index].driverId }}</a>
                           </div>
                        </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        label="司机姓名"
                        >
                </el-table-column>
                <el-table-column
                        width="115"
                        align="center"
                        prop="phone"
                        label="司机电话"
                        >
                </el-table-column>
                <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="plateNum"-->
                        <!--label="车牌号"-->
                        <!--&gt;-->
                <!--</el-table-column>-->
                <el-table-column
                        align="center"
                        prop="vehicleType"
                        label="车型"
                        width="130"
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
                        prop="team"
                        label="所属车队"
                        width="130"
                >
                </el-table-column>
                <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="registerDeveAdminName"-->
                        <!--label="注册运营专员"-->
                <!--&gt;-->
                <!--</el-table-column>-->
                <el-table-column
                        align="center"
                        prop="currentDeveAdminName"
                        label="运营专员"
                >
                </el-table-column>
                <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="deliveryExperience"-->
                        <!--label="配送经验"-->
                       <!--&gt;-->
                <!--</el-table-column>-->
                <el-table-column
                        width="120"
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
                    width="160"
                    align="center"
                    prop="usualRunArea"
                    label="常跑城市"
                    >
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="createTime"
                        :formatter="dateFormat1"
                        label="注册时间" align="center">
                </el-table-column>
                <el-table-column
                    width="110"
                    align="center"
                    prop="registerChannel"
                    label="注册渠道"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="runTimes"
                        label="出车次数"
                        >
                </el-table-column>
                <!--<el-table-column-->
                        <!--width="120"-->
                        <!--prop="firstDeliver"-->
                        <!--:formatter="dateFormat"-->
                        <!--label="首次出车时间" align="center">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--width="120"-->
                        <!--prop="lastDeliver"-->
                        <!--:formatter="dateFormat"-->
                        <!--label="最后出车时间" align="center">-->
                <!--</el-table-column>-->
                <el-table-column
                    width="110"
                    align="center"
                    prop="plateNum"
                    label="车牌号"
                >
                </el-table-column>
                <el-table-column
                        width="110"
                        align="center"
                        prop="isPayDeposit"
                        label="是否交押金"
                >
                </el-table-column>
                <el-table-column
                        width="150"
                        :formatter="dateFormat"
                        align="center"
                        prop="certifyTime"
                        label="认证处理时间"
                >
                </el-table-column>
                <el-table-column
                    width="120"
                    :formatter="dateFormat"
                    align="center"
                    prop="loginTime"
                    label="最后心跳时间"
                >
                </el-table-column>


                <el-table-column
                        fixed="right"
                        align="center"
                        prop="certifyStatus"
                        label="认证状态"
                        >
                    <template slot-scope="scope">
                        <!--未通过    已通过-->
                        <el-popover
                                v-if="arr[scope.$index].certifyStatus == '未通过'?true:false"
                                placement="right"
                                width="360"
                                trigger="hover">
                            <el-form  label-width="80px">
                                <el-form-item label="退回原因">
                                    <el-input
                                            type="textarea"
                                            :rows="3"
                                            disabled
                                            v-model="arr[scope.$index].notPassReason">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="退回时间">
                                    <el-date-picker
                                            v-model="arr[scope.$index].certifyTime"
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
                        <el-button type="text" size="small" disabled v-if="arr[scope.$index].certifyStatus == '通过认证'?true:false">通过认证</el-button>
                        <el-button type="text" size="small" disabled v-if="arr[scope.$index].certifyStatus == '审核中'?true:false">审核中</el-button>
                        <el-button type="text" size="small" disabled v-if="arr[scope.$index].certifyStatus == '待认证'?true:false">待认证</el-button>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="lastLoginTime"-->
                        <!--:formatter="dateFormat"-->
                        <!--label="最后心跳"-->
                        <!--show-overflow-tooltip>-->
                <!--</el-table-column>-->
            </el-table>
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
    import {Export} from "../../js/export";
    const CarModel = ['厢式货车','冷藏车','小面包','依维柯','商务车','电动车','轿车','中巴','高顶','平顶','金杯','敞车','高栏','平板','栏板','全顺'];
    export default {
    data() {
        return {
            disabled1:false,
            disabled2:false,
            disabled3:false,
            regions:[],
            array:CarModel,
            partition:'',
            Jump:'',
            userId:'',
            arr:[],
            formInline:{
                plateNum:'',//车牌号
                //最后心跳时间
                timeEnd:[],
                //大区
                area:'',
                city:'',
                //认证状态
                Authentication:'',
                //是否交押金
                deposit:'',
                //司机注册的起止时间
                Registration:'',
                //所在区域
                located:'',
                //所属车队
                Convoy:'',
                iphone:'',
                DriverId: '',
                DriverName:'',
                Approver:'',
                region: '' ,
                currentDeveAdminName:'',
                time:'',
            },
            startTime:'',//导出 开始时间
            endTime:'',//导出 结束时间
            t_startTime:'',//认证处理开始时间
            t_endTime:'',//认证处理结束时间
            timeEnd_s:'',//最后心跳时间
            timeEnd_e:'',//最后心跳时间

            multipleSelection: [ ],
            //分页
            total:0,
            currentPage:1,
            pagesize:10,//每页的数据条数
            driverDetail:'',
            driverDerive :'',
            regionList:[],
            fullscreenLoading: false,
            code:'',
            //导出
            queryStatus:true,
            //进度条
            ProgressBar:0,
            driverListExport:'',
        }
    },
    created() {
        //拿到token
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
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

        this.driverListExport = jurisdictions[5].menus[14].choose;
        this.driverDetail = jurisdictions[5].menus[2].choose;
        // //导出
        // if (jurisdictions[5].menus.length == 15){

            this.driverDerive = jurisdictions[5].menus[14].choose
        // }else {
        //     this.driverDerive = false
        // }
        //分区
        this.partition = jurisdictions[13].menus[0].choose;

        let page1 = JSON.stringify({
            token: this.token
        });
        //分公司
        this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_filiale_list',page1 , {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        } ).then((res)=>{
            this.regions = res.body.result;
        });
        //管理区
        this.$http.post(this.global.lightningUrl + '/companyv1/userManage/region/all_region',JSON.stringify({
            'token':this.token,
        })).then(run=>{
            if(run.body.errcode == 0){
                this.regionList = run.body.result;
            }
        });
        if(sessionStorage.getItem('drivermanagecurrentPage')!=null){
            let currentPages = Number(sessionStorage.getItem('drivermanagecurrentPage'));
            let totals = Number(sessionStorage.getItem('drivermanagetotal'));
            let condition = sessionStorage.getItem('drivermanagecondition');

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
            let upload_time ;
            if (this.formInline.Registration == '' || this.formInline.Registration == null || this.formInline.Registration == undefined){
                upload_time = ''
            }else {
                this.startTime =  this.formInline.Registration[0];
                this.endTime = this.formInline.Registration[1]+86400000-1;
                upload_time = 'between '+ this.startTime +' and '+ this.endTime;
            }

            let certify_time ;
            console.log(this.formInline.time);
            if (this.formInline.time == '' || this.formInline.time == null || this.formInline.time == undefined){
                certify_time = ''
            }else {
                this.t_startTime =  this.formInline.time[0];
                this.t_endTime = this.formInline.time[1]+86400000-1;
                certify_time = 'between '+ this.t_startTime +' and '+ this.t_endTime;
            }
            let timeEnd;
            if (this.formInline.timeEnd != null && this.formInline.timeEnd != '' ){
                this.timeEnd_s = this.formInline.timeEnd[0];
                this.timeEnd_e = this.formInline.timeEnd[1]+86400000-1;
                timeEnd = 'between '+ this.timeEnd_s +' and '+ this.timeEnd_e;
            }else {
                this.timeEnd_s = '';
                this.timeEnd_e = '';
            }
            let page = JSON.stringify({
                "token":this.token,
                "exportName":"driver",
                "t.driver_id":this.formInline.DriverId,
                "t.name":this.formInline.DriverName,
                "t.phone":this.formInline.iphone,
                "t.driver_type":this.formInline.region,
                "te.team":this.formInline.Convoy,
                "t.usual_run_area":this.formInline.city,
                "a.filiale_id":this.formInline.located,
                "dd.is_pay_deposit":this.formInline.deposit,
                "t.certify_status":this.formInline.Authentication,
                "branchArea":this.partition,
                "v.vehicle_type" : this.formInline.Approver,
                "u.create_time" : upload_time,
                "t.current_deve_admin_name":this.formInline.currentDeveAdminName,
                "r.id" : this.formInline.area,
                "t.certify_time":certify_time,
                "u.update_time":timeEnd,
                "v.plate_num":this.formInline.plateNum
            });
            Export(this,this.queryStatus,this.ProgressBar,this.fullscreenLoading,this.code,page);
        },
        dateFormatHm:function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm");
        },

        //跳转的userId
        handleClick(row) {
            if(this.driverDetail){
                console.log(row.userId);
                this.userId = row.userId;
                sessionStorage.setItem('rows',Base64.encode(this.userId));
                this.$router.push({ path:'/sjmessage' });
            }
        },
        //缓存请求
        requestTurnout(){
            this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/list',JSON.stringify({
                'token':this.token,
                'pageNum':this.currentPage,
                'pageSize':this.pagesize,
                'branchArea':this.partition,
                //大区
                "regionId":this.formInline.area,
                //司机姓名
                'name':this.formInline.DriverName,
                //车型
                'vehicleType':this.formInline.Approver,
                //司机类型
                'driverType':this.formInline.region,
                //电话
                'phone':this.formInline.iphone,
                //所属车队
                'team':this.formInline.Convoy,
                //所在分公司
                'filialeId':this.formInline.located,
                //是否交押金
                'isPayDeposit':this.formInline.deposit,
                //认证状态
                'certifyStatus':this.formInline.Authentication,
                //司机注册起始时间
                'createTimeStart':this.formInline.Registration[0],
                //司机注册结束时间
                'createTimeEnd':this.formInline.Registration[1],
                //司机编号
                'driverId':this.formInline.DriverId,
                //常跑城市
                'usualRunArea':this.formInline.city,
                'registerDeveAdminName': this.formInline.registerDeveAdminName,
                'currentDeveAdminName': this.formInline.currentDeveAdminName,
            })).then(run=>{
                if(run.body.errcode == 0 && run.body.result.list != null){
                    console.log(run);//JSON.parse()
                    this.arr = run.body.result.list;
                    for(var i in this.arr){
                        if(this.arr[i].driverType == "personal" ){
                            this.arr[i].driverType = "个体司机"
                        }else if(this.arr[i].driverType == "company"){
                            this.arr[i].driverType = "运输公司"
                        }else if(this.arr[i].driverType == "team"){
                            this.arr[i] .driverType = "车队司机"
                        };

                        if (this.arr[i].registerChannel == 'admin'){
                            this.arr[i].registerChannel = '运营邀请'
                        }else if (this.arr[i].registerChannel == 'driver') {
                            this.arr[i].registerChannel = '司机邀请'
                        }else if  (this.arr[i].registerChannel == 'ios'){
                            this.arr[i].registerChannel = '苹果客户端'
                        }else if (this.arr[i].registerChannel == 'android'){
                            this.arr[i].registerChannel = '安卓客户端'
                        }else if (this.arr[i].registerChannel == 'team'){
                            this.arr[i].registerChannel = '车队邀请'
                        }


                        if(this.arr[i].isPayDeposit == '1'){
                            this.arr[i].isPayDeposit = '是'
                        }else if(this.arr[i].isPayDeposit == '0'){
                            this.arr[i].isPayDeposit = '否 '
                        }else if(this.arr[i].isPayDeposit == '2'){
                            this.arr[i].isPayDeposit = '押金退款中'
                        }
                        if(this.arr[i].certifyStatus == 0){
                            this.arr[i].certifyStatus = '待认证'
                        }else if(this.arr[i].certifyStatus == 1){
                            this.arr[i].certifyStatus = '审核中'
                        }else if(this.arr[i].certifyStatus == 2){
                            this.arr[i].certifyStatus = '通过认证'
                        }else if(this.arr[i].certifyStatus == 3){
                            this.arr[i].certifyStatus = '未通过'
                        }
                        //车型

                        if (this.arr[i].vehicleType == undefined) {
                            this.arr[i].vehicleType = ''
                        }
                    }
                    this.total = run.body.result.total;
                }else {
                    this.arr = [];
                }
            })
        },
        //首刷&&查询
        data(){
            if (this.formInline.Registration == undefined || this.formInline.Registration == null || this.formInline.Registration  == ''){
                this.formInline.Registration = ''
            };
            if (this.formInline.time == undefined || this.formInline.time == null || this.formInline.time  == ''){
                this.formInline.time = ''
            };

            this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/list',JSON.stringify({
                'token':this.token,
                'pageNum':this.currentPage,
                'pageSize':this.pagesize,
                'branchArea':this.partition,
                "plateNum":this.formInline.plateNum,//车牌号
                //大区
                "regionId":this.formInline.area,
                //司机姓名
                'name':this.formInline.DriverName,
                //车型
                'vehicleType':this.formInline.Approver,
                //司机类型
                'driverType':this.formInline.region,
                //电话
                'phone':this.formInline.iphone,
                //所属车队
                'team':this.formInline.Convoy,
                //所在分公司
                'filialeId':this.formInline.located,
                //是否交押金
                'isPayDeposit':this.formInline.deposit,
                //认证状态
                'certifyStatus':this.formInline.Authentication,
                //司机注册起始时间
                'createTimeStart':this.formInline.Registration[0],
                //司机注册结束时间
                'createTimeEnd':this.formInline.Registration[1],
                //司机编号
                'driverId':this.formInline.DriverId,
                //常跑城市
                'usualRunArea':this.formInline.city,
                'registerDeveAdminName': this.formInline.registerDeveAdminName,
                'currentDeveAdminName': this.formInline.currentDeveAdminName,
                'certifyTimeStart' : this.formInline.time[0],
                'certifyTimeEnd' : this.formInline.time[1],
                //最后心跳时间
                'loginTimeStart':this.formInline.timeEnd != null && this.formInline.timeEnd != '' ? this.formInline.timeEnd[0] : '',
                'loginTimeEnd':this.formInline.timeEnd != null && this.formInline.timeEnd != '' ? this.formInline.timeEnd[1]+86400000-1 : '',
            })).then(run=>{
                if(run.body.errcode == 0){
                    console.log(run);//JSON.parse()
                    this.arr = run.body.result.list;
                    for(var i in this.arr){
                        if(this.arr[i].driverType == "personal" ){
                            this.arr[i].driverType = "个体司机"
                        }else if(this.arr[i].driverType == "company"){
                            this.arr[i].driverType = "运输公司"
                        }else if(this.arr[i].driverType == "team"){
                            this.arr[i] .driverType = "车队司机"
                        };

                        if (this.arr[i].registerChannel == 'admin'){
                            this.arr[i].registerChannel = '运营邀请'
                        }else if (this.arr[i].registerChannel == 'driver') {
                            this.arr[i].registerChannel = '司机邀请'
                        }else if  (this.arr[i].registerChannel == 'ios'){
                            this.arr[i].registerChannel = '苹果客户端'
                        }else if (this.arr[i].registerChannel == 'android'){
                            this.arr[i].registerChannel = '安卓客户端'
                        }else if(this.arr[i].registerChannel == 'team'){
                            this.arr[i].registerChannel = '车队邀请'
                        }

                        if(this.arr[i].isPayDeposit == '1'){
                            this.arr[i].isPayDeposit = '是'
                        }else if(this.arr[i].isPayDeposit == '0'){
                            this.arr[i].isPayDeposit = '否 '
                        }else if(this.arr[i].isPayDeposit == '2'){
                            this.arr[i].isPayDeposit = '押金退款中'
                        }
                        if(this.arr[i].certifyStatus == 0){
                            this.arr[i].certifyStatus = '待认证'
                        }else if(this.arr[i].certifyStatus == 1){
                            this.arr[i].certifyStatus = '审核中'
                        }else if(this.arr[i].certifyStatus == 2){
                            this.arr[i].certifyStatus = '通过认证'
                        }else if(this.arr[i].certifyStatus == 3){
                            this.arr[i].certifyStatus = '未通过'
                        }
                        //车型

                        if (this.arr[i].vehicleType == undefined) {
                            this.arr[i].vehicleType = ''
                        }
                    }
                    this.total = run.body.result.total;
                }else {
                    this.arr = [];
                }
            })
            //更新本地存储    drivermanage
            if(sessionStorage.getItem('drivermanagecurrentPage')!=null&&sessionStorage.getItem('drivermanagecurrentPage')!=null){
                //删除本地
                sessionStorage.removeItem('drivermanagecurrentPage');
                sessionStorage.removeItem('drivermanagecondition');
                sessionStorage.removeItem('drivermanagetotal');
                //存储本地
                sessionStorage.setItem('drivermanagecurrentPage', JSON.stringify(this.currentPage));
                sessionStorage.setItem('drivermanagetotal', JSON.stringify(this.total));
                sessionStorage.setItem('drivermanagecondition', JSON.stringify(this.formInline));
            }else {
                //存储本地
                sessionStorage.setItem('drivermanagecurrentPage', JSON.stringify(this.currentPage));
                sessionStorage.setItem('drivermanagetotal', JSON.stringify(this.total));
                sessionStorage.setItem('drivermanagecondition', JSON.stringify(this.formInline));
            }
        },
        //查询
        query(){
            this.currentPage = 1;
            this.data();
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

        //分页结束
        //时间格式的转化（戳 -> 时间）
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
    }
}
</script>
 <style  lang='scss'>
    .driver_manage{

    }
</style>