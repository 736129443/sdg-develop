<template>
    <div class="main">
        <div class="header">
            当前位置: <span>项目管理 > 运输单管理</span>
        </div>
        <div class="conter driverReviews">
            <div class="driverReview-top">
                <div class="search-box">
                    <label>运输单编号</label>
                    <el-input
                            class="oddNumbers"
                            placeholder="运输单号"
                            v-model="oddNumbers"
                            @change="regNumss"
                            clearable>
                    </el-input>
                    <!--运输单编号检验-->
                    <!--@change="regNumss"-->
                </div>
                <div class="search-box">
                    <label>所属分公司</label>
                    <el-select class="oddNumbers" v-model="region" placeholder="请选择所属分公司">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                            v-for="i in dept"
                            :key="i.id"
                            :value="i.id"
                            :label='i.deptName'
                        ></el-option>
                    </el-select>
                </div>
                <div class="search-box">
                    <label>生成方式</label>
                    <el-select class="oddNumbers" v-model="createType" placeholder="请选择生成方式">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="自动生成" value="auto"></el-option>
                        <el-option label="线下导入" value="offline"></el-option>
                    </el-select>
                </div>

                <div class="search-box">
                    <label>项目名称</label>
                    <el-input
                        class="oddNumbers"
                        placeholder="项目名称"
                        v-model="customerName"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                        clearable>
                    </el-input>
                </div>

                <div class="search-box">
                    <label>司机姓名</label>
                    <el-input
                            class="oddNumbers"
                            placeholder="司机姓名"
                            v-model="driverName"
                            onkeyup="this.value=this.value.replace(/\s+/g,'')"
                            clearable>
                    </el-input>
                </div>
                <div class="search-box">
                    <label>配送日期</label>
                    <div class="psTime">
                        <el-date-picker
                                value-format="yyyy-MM-dd"
                                v-model="arrDate"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="到仓时间"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
                <div class="search-box">
                    <label>仓库名称</label>
                    <el-input
                            class="oddNumbers"
                            placeholder="仓库名称"
                            v-model="warehouseName"
                            onkeyup="this.value=this.value.replace(/\s+/g,'')"
                            clearable>
                    </el-input>
                </div>
                <div class="search-box">
                    <label>运输状态</label>
                    <el-select class="oddNumbers status" v-model="states"  placeholder="配送进度">
                        <el-option
                                v-for="item in option"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button  type="primary" @click="search" class="search-box left">查询</el-button>
                <!--<el-button  type="primary" @click="search" class="search-box left">导出</el-button>-->
                <el-button type="primary" @click="Export()"  v-if="transportOrderListExport" class="search-box left" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none">导出</el-button>
                <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
            </div>
            <div class="driverReview-table" v-loading="againPush" element-loading-text="正在重新推送本单信息，请稍等...">
                <el-table
                        :data="transportInfos"
                        style="width: 100%">
                    <el-table-column
                            label="运输单编号"
                            width="150"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <div class="transport" @click="viewDetails(scope.row.transportId,scope.row.status)">{{transportInfos[scope.$index].transportId}}</div>
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
                        prop="createType"
                        label="生成方式"
                        :formatter="analysis"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            width="150"
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
                            prop="arrDepotTime"
                            label="到仓时间"
                            width="80"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="deliveryTime"
                            label="配送日期"
                            width="200"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="depotName"
                            label="仓库名称"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="司机姓名(电话)"
                            width="200"
                            v-if="transportselectDriver==true?true:false"
                    >
                        <template slot-scope="scope">
                            <el-button size="small" v-if="arr[scope.$index]&&(transportInfos[scope.$index].status == 'robbing' || transportInfos[scope.$index].status == 'matching')&&transportInfos[scope.$index].isAssign == '1'"  @click="selectDriver(scope.$index,scope.row.transportId)" :disabled="isDisabled[scope.$index]">选择司机</el-button>
                            <!--<div v-if="!arr[scope.$index]">-->
                                <!--<p>司机姓名: {{arrDriver.length === 0 ?"":arrDriver[scope.$index].driverName}}</p>-->
                                <!--<p>司机电话: {{arrDriver.length === 0 ?"":arrDriver[scope.$index].phone}}</p>-->
                            <!--</div>-->
                            <div class="driverDetails-box" @click="driverDetails(-1,scope.$index)" v-show="transportInfos[scope.$index].status !== 'robbing'&&transportInfos[scope.$index].driverName != null?true:false">
                                <p>{{transportInfos.length === 0 ?"":transportInfos[scope.$index].driverName}}</p>
                                <p>{{transportInfos.length === 0 ?"":transportInfos[scope.$index].phone}}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="plateNum"
                            label="车牌号"
                            width="120"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="vehicleTypeReq"
                            :formatter="cayType"
                            label="车型"
                            width="150"
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
                            align="center"
                            prop="status"
                            label="状态"
                            width="100"
                            :formatter="changeState"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作"
                            fixed="right"

                            v-if="transportOrderOperation==true?true:false"
                            width="180"
                    >
                        <template slot-scope="scope" >
                            <div v-if="transportInfos[scope.$index].createType=='auto'">
                                <el-button  @click="handleClick(scope.row)" size="small" v-if="scope.row.depotName != null && scope.row.groupId !== null">复制</el-button>
                                <el-button @click="handleClick1(scope.row)" size="small" v-if="scope.row.groupId === null">复制</el-button>
                                <el-button  @click="cancel($event,scope.$index,scope.row.transportId,scope.row.status)" size="small" v-if="scope.row.status == 'robbing'?true:false">取消发布</el-button>
                                <el-button  @click="cancel($event,scope.$index,scope.row.transportId,scope.row.status)" size="small" v-if="scope.row.status == 'waiting'">取消合作</el-button>
                                <el-button  @click="RePush(scope.row.transportId)" size="small" v-if="scope.row.status == 'matching'">重新推送</el-button>
                                <span style="margin-left: 20px" v-if="scope.row.status == 'matched'">已推送</span>
                                <el-tooltip placement="top">
                                    <div slot="content">{{scope.row.cancelReason}}<br/>{{formatDate(scope.row.cancelTIme)}}</div>
                                    <el-button class="b-btn" size="small" v-show="scope.row.status == 'canceled'">取消原因</el-button>
                                </el-tooltip>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="select-drive-box" v-show="isShow">
                    <div class="select-drive" v-loading="loading" element-loading-text="正在为您指派司机，请稍后...
">
                        <i class="icon el-icon-close" @click="cancelSelectDriver"></i>
                        <p class="select-tittle"><span class="select-shu">|</span><span class="select-text">选择司机</span></p>
                        <div class="assign-drive">
                            <span>指派司机</span>
                            <el-input
                                    class="select-text"
                                    placeholder="请输入司机手机号"
                                    v-model="driverPhone"
                                    clearable>
                            </el-input>
                            <el-button class="buttonColor select-text-one" @click="searchDriver">查询</el-button>
                        </div>
                        <p class="cancelSelectDriver">共有<span>{{selectDrivers == {}?0:selectDrivers.length}}</span>位司机对本单有意向</p>
                        <el-table
                                :data="selectDrivers"
                                height="250"
                                border
                                style="width: 100%">
                            <el-table-column
                                    label="头像"
                                    width="100">
                                <template slot-scope="scope">
                                    <img class="headPic" :src="selectDrivers[scope.$index].headPic" :onerror="defaultImg">
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="driverName"
                                    label="姓名"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="phone"
                                    label="手机号"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="plateNum"
                                    label="车牌号"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="vehicleBrand"
                                    label="车辆品牌">
                            </el-table-column>
                            <el-table-column
                                    prop="vehicleType"
                                    label="车型"
                                    :formatter="changeJson1">
                            </el-table-column>
                            <el-table-column
                                    prop="runTimes"
                                    label="出车次数">
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="180"
                            >
                                <template slot-scope="scope">
                                    <el-button  class="confirm" size="small" v-if="!selectDrivers[scope.$index].driverClass" @click="selectTa(scope.$index)">选他</el-button>
                                    <el-button  class="confirm" size="small" @click="driverDetails(scope.$index)">查看详情</el-button>
                                </template>
                            </el-table-column>

                        </el-table>
                    </div>
                </div>
                <el-dialog
                        title="温馨提示"
                        :visible.sync="centerDialogVisible"
                        :before-close="quxiao"
                        center>
                    <div style="padding:5px 35px;font-size:15px;line-height:25px">
                        <span>该司机车型与合同需求车型不一致，请选择关联一种合同指定车型用于客户计价!</span>
                        <div v-for="(item,index) in arrs">
                            <el-radio v-model="radio" :label="index">{{item.vehicleType | vehicleCarType}}</el-radio>
                            <span>起步价：{{item.price}}元</span>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="quxiao">取 消</el-button>
                      <el-button type="primary" @click="selectTa2(driverIndex)">确 定</el-button>
                    </span>
                </el-dialog>
                <div class="table-foot">
                    <div class="block">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10,20,30,50]"
                                :page-size="pageSize"
                                layout="total,prev, pager, next,sizes"
                                :total="totalText">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <modalWindow v-show="showDialog" v-on:get-data="getData" ref="dialog"></modalWindow>
        </div>
    </div>
</template>

<script>
    import modalWindow from "./modalWindow.vue"
    import {regTransNum,regPhone,newWareName} from "../../js/newWarehouse";
    import {Export} from "../../js/export";
    export default {
        inject:['reload'],
        name: "driverReview",
        data() {
            return {
                fullscreenLoading: false,
                code:'',
                //导出
                queryStatus:true,
                //进度条
                ProgressBar:0,
                customerName:'',
                region:'',
                createType:'',
                radio: 0,
                driverIndex: null,
                arrs: [],
                centerDialogVisible: false,
                driverName:'',
                againPush:false,
                loading: false,
                defaultImg: 'this.src="' + require('../../images/user.png') + '"',
                oddNumbers: '',
                dept:[],
                isShow:false,
                option:[
                    {
                        value: null,
                        label: '全部'
                    },
                    {
                        value: 'robbing',
                        label: '抢单中'
                    },
                    {
                        value: 'waiting',
                        label: '在跑'
                    },
                    {
                        value: 'finished',
                        label: '已完成'
                    },
                    {
                        value: 'matching',
                        label: '无匹配司机'
                    },
                    {
                        value: 'matched',
                        label: '已重新推送'
                    },
                    {
                        value: 'expired',
                        label: '抢单超时'
                    },
                    {
                        value: 'canceled',
                        label: '已取消'
                    }
                ],
                warehouseName: '',
                states:'',
                arrDate: '',
                selectDrivers:[],
                transportInfos:[],
                totalText:0,
                currentPage: 1,
                pageSize:10,
                button:true,
                showDialog:false,
                childData:'',
                multipleSelection: [],
                divIndex:-1,
                cosIndex:-1,
                arr:[],
                arrDriver:[],
                isDisabled:[],
                transportId:'',
                users:'',
                successTransNum:false,
                driverPhone:'',
                transportOrderDetail:false,
                transportOrderListExport:false,
                transportOrderOperation:false,
                transportselectDriver:false,
                driversUserId:''
            }
        },
        filters:{
            vehicleCarType(val){
                let obj = JSON.parse(val);
                let str = '';
                str = obj.name + ' ' + obj.isElectric + ' ' + obj.length + ' ' + obj.isCertificate + ' ' + obj.isTailBoard + ' ' + obj.isCold;
                return str;
            }
        },
        methods: {
            Export(){
                let createTime;
                if (this.arrDate == undefined || this.arrDate == '' || this.arrDate == null){
                    createTime = ''
                }else {
                    let s = new Date(this.arrDate[0]).getTime()-1000*60*60*8 ;
                    let e = new Date(this.arrDate[1]).getTime()+1000*60*60*16-1 ;
                    createTime = 'between ' + s + ' and ' + e ;
                }

                let page = JSON.stringify({
                    "token":this.users.token,
                    "exportName":"transport",
                    "createType":this.createType==''?undefined:this.createType,//生成方式
                    't.id':this.oddNumbers==''?undefined:this.oddNumbers,
                    "bac.filiale_id":this.region==''?undefined:this.region,
                    "bac.customer_name":this.customerName==''?undefined:this.customerName,
                    "bad.name":this.driverName==''?undefined:this.driverName,
                    "stc.depot_name":this.warehouseName==''?undefined:this.warehouseName,
                    "transportStatusQuery":this.states==''?undefined:this.states,
                    "stc.delivery_start_time":createTime==''?undefined:createTime,
                });
                Export(this,this.queryStatus,this.ProgressBar,this.fullscreenLoading,this.code,page)
            },
            //分公司
            regions() {
                //所属区域下拉框（郭）
                let page = JSON.stringify({
                    token: this.users.token,
                    pid: 0,
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByAreaId', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode === 0) {
                        this.dept = res.body.result.deptList;
                    }
                });
            },
            quxiao(){
                this.centerDialogVisible = false;
                this.loading = false;
                this.isShow = false;
            },
            searchDriver(){
                if(!regPhone(this,this.driverPhone)){
                    this.$message({
                        message: '请输入正确手机号，11位数字组成',
                        type: 'warning'
                    });
                    return;
                }
                let searchDriverInfos = JSON.stringify({
                    token: this.users.token,
                    phone:this.driverPhone
                });
                console.log(searchDriverInfos);
                this.$http.post(this.global.lightningUrl +'/companyv1/driverManage/driver/get_driver_by_phone',searchDriverInfos,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    for(let i=0;i<res.data.result.length;i++){
                        res.data.result[i].vehicleType = JSON.parse(res.data.result[i].vehicleType);
                    }
                    this.selectDrivers=res.data.result;
                    console.log(res);
                })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            RePush(id){
                this.againPush = true;
                let searchDriverInfos = JSON.stringify({
                    token: this.users.token,
                    transportId:id
                });
                console.log(searchDriverInfos);
                this.$http.post(this.global.lightningUrl +'/companyv1/trunkCenter/transport/again/push',searchDriverInfos,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.data.errcode === 0) {
                        setTimeout(()=>{
                            this.$message({
                                message: '重新推送成功',
                                type: 'success'
                            });
                            this.againPush = false;
                            this.reload();
                        }, 3000);
                    }
                })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            cancelCooperation(_this,id,childData,el){
                let cooperationInfos = JSON.stringify({
                    token: this.users.token,
                    transportId:id,
                    cancelReason:childData
                });
                console.log(cooperationInfos);
                _this.$http.post(this.global.lightningUrl +'/companyv1/trunkCenter/transport/cooperation/cancel',cooperationInfos,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.data.message === "取消合作成功") {
                        _this.$message({
                            message: '取消合作成功',
                            type: 'success'
                        });
                        el.setAttribute("disabled","disabled");
                        el.classList.add("is-disabled");
                        _this.reload();
                    }
                    if (res.data.message === "暂无可取消合作的订单") {
                        _this.$message({
                            message: '暂无可取消合作的订单',
                            type: 'warning'
                        });
                        _this.reload();
                    }
                })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            regNumss(){
                if(this.oddNumbers !== ''){
                    regTransNum(this,this.oddNumbers);
                }
            },
            // 复制线路到发布用车
            handleClick(row) {
                // console.log(row);
                // this.copyListShow = true;
                let lineNameinfos = JSON.stringify({
                    token: this.users.token,
                    transportId:row.transportId
                });
                this.$http.post(this.global.lightningUrl +'/companyv1/trunkCenter/schedule/copy',lineNameinfos,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then( (res) => {
                    console.log('-----------------------------------------')
                    console.log(res)

                    res.data.result.common.createTime = this.formatDateTime(res.data.result.createTime);
                    //   // res.data.result[i].deliveryCycle = JSON.parse(res.data.result[i].deliveryCycle);
                    //   res.data.result[i].express = JSON.parse(res.data.result[i].express);
                    // res.data.result.common.goodsType = JSON.parse(res.data.result.goodsType);
                    // res.data.result.common.handlingReq = JSON.parse(res.data.result.handlingReq);
                    // res.data.result.common.vehicleAddiReq = JSON.parse(res.data.result.vehicleAddiReq);

                    // res.data.result.vehicleTypeReq = JSON.parse(res.data.result.vehicleTypeReq);

                    let copyLists = res.data.result.common;

                    let obj ={
                        lastTime : copyLists.totalTime,
                        checkedWeeks : copyLists.deliveryCycle,
                        warehouseName : copyLists.depotId,
                        lineName : copyLists.traceName,
                        setNumber : copyLists.groupId,
                        setName : copyLists.groupName,
                        shippingAddress : copyLists.deliveryArea,
                        goodsName : copyLists.goodsName,
                        returnToWarehouse : copyLists.isBackDepot,
                        distributionExperience : copyLists.deliveryExperience,
                        price : copyLists.transportPrice,
                        text : copyLists.handlingReq.remark,
                        selectDriver : copyLists.isAssign,
                        contactPrice : copyLists.contactPrice,
                        depotName :  copyLists.depotName,
                        kilometers: copyLists.kilometers,
                        deliveryArea: copyLists.deliveryArea
                    };

                    sessionStorage.setItem('webCustomerId', JSON.stringify(row.customerId,));
                    this.$router.push(
                        {
                            name: 'use-car',
                            params: {
                                transportCopy: Base64.encode(JSON.stringify(obj))
                            }
                        });
                })
                    .catch((error) => {
                        console.log(error);
                    });

            },
            // 复制到发不用车地址
            handleClick1(row) {
                console.log(row);
                // this.copyListShow = true;
                let addressInfos = JSON.stringify({
                    token: this.users.token,
                    transportId:row.transportId
                });
                this.$http.post(this.global.lightningUrl +'/companyv1/trunkCenter/transport/get',addressInfos,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then( (res) => {
                    console.log(res)

                    let copyAddress = res.data.result;
                    console.log(copyAddress);

                    sessionStorage.setItem('webCustomerId', JSON.stringify(row.customerId,));
                    this.$router.push(
                        {
                            name: 'use-car',
                            params: {
                                addressCopy: Base64.encode(JSON.stringify(copyAddress))
                            }
                        });
                })
                    .catch((error) => {
                        console.log(error);
                    });

            },
            // 改变订单状态
            changeState(row){
                if(row.status === 'robbing'){
                    return "抢单中";
                }
                if(row.status === 'waiting'){
                    return "在跑";
                }
                if(row.status === 'matching'){
                    return "无匹配司机";
                }
                if(row.status === 'matched'){
                    return "已重新推送";
                }
                if(row.status === 'finished'){
                    return "已完成";
                }
                if(row.status === 'canceled'){
                    return "已取消";
                }
                if(row.status === 'expired'){
                    return "抢单超时";
                }
            },
            formatDate(inputTime) {
                let date = new Date(inputTime);
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h=h < 10 ? ('0' + h) : h;
                let minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                let second=date.getSeconds();
                second=second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
            },
            // formatDateTime(inputTime) {
            //   let date = new Date(inputTime);
            //   // let y = date.getFullYear();
            //   // let m = date.getMonth() + 1;
            //   // m = m < 10 ? ('0' + m) : m;
            //   // let d = date.getDate();
            //   // d = d < 10 ? ('0' + d) : d;
            //   let h = date.getHours();
            //   h=h < 10 ? ('0' + h) : h;
            //   let minute = date.getMinutes();
            //   minute = minute < 10 ? ('0' + minute) : minute;
            //   let second=date.getSeconds();
            //   second=second < 10 ? ('0' + second) : second;
            //   return h+':'+minute;
            // },
            // changeTime(row){
            //   return this.formatDateTime(Number(row.arrDepotTime));
            // },
            formatDateTime(inputTime) {
                let date = new Date(inputTime);

                let h = date.getHours();
                h=h < 10 ? ('0' + h) : h;
                let minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                let second=date.getSeconds();
                second=second < 10 ? ('0' + second) : second;
                return h+':'+minute+':'+second;
            },
            analysis(row) {
                if (row.createType == 'auto') {
                    return '自动生成';
                }else if (row.createType == 'offline') {
                    return '线下导入';
                }
            },
            cayType(val){
                console.log(val.vehicleTypeReq);
                let car = val.vehicleTypeReq;
                if (Object.prototype.toString.call(car) === '[object Array]') {
                    let str = '';
                    for (let i = 0; i < car.length; i++) {
                        str += car[i].name + ' ' + car[i].isElectric + ' ' + car[i].length + ' ' + car[i].isCertificate + ' ' + car[i].isTailBoard + ' ' + car[i].isCold + ' / ';
                    }

                    return str.substring(0, str.length - 3);
                } else {
                    let obj = car;
                    let str = '';
                    str = car.name + ' ' + car.isElectric + ' ' + car.length + ' ' + car.isCertificate + ' ' + car.isTailBoard + ' ' + car.isCold;
                    return str;
                }
            },
            // 数据转JSON格式
            changeJson(row){
                // let obj = JSON.parse(row.vehicleTypeReq);
                let obj = row.vehicleTypeReq;
                let str = '';
                str = obj.name + ' ' + obj.isElectric +' ' + obj.length + ' ' + obj.isCertificate +' '+ obj.isTailBoard + ' ' + obj.isCold;
                return str;
            },
            changeJson1(row){
                // let obj = JSON.parse(row.vehicleTypeReq);
                let obj = row.vehicleType;
                let str = '';
                str = obj.name + ' ' + obj.isElectric +' ' + obj.length + ' ' + obj.isCertificate +' '+ obj.isTailBoard + ' ' + obj.isCold;
                return str;
            },
            // 查询
            search(){
                // if (this.oddNumbers===''&&this.driverName===''&&this.arrDate===''&&this.states===''&&this.warehouseName===''){
                //     this.$message.warning('查询资料不能为空!');
                //     return;
                // }
                // console.log(newWareName(this,this.warehouseName))

                // if(newWareName(this,this.warehouseName)){
                //     console.log(0)
                // }
                if(this.oddNumbers !== ''){
                    if(!this.successTransNum){
                        return;
                    }
                }
                this.currentPage = 1;
                this.selectDriverInit();
            },
            // 取消运输单
            cancel(event,index,id,status) {
                let el = event.currentTarget;
                this.showDialog = true;
                let _this =this;
                this.$refs.dialog.confirm().then(() => {
                    this.showDialog = false;
                    _this.$set(_this.isDisabled,index,true);
                    if(status === "robbing"){
                        // _this.$options.methods.cancelTrans(_this,id,_this.childData,el);
                        _this.cancelTrans(_this,id,_this.childData,el);
                    }
                    if(status === "waiting"){
                        _this.cancelCooperation(_this,id,_this.childData,el);
                    }
                }).catch(() => {
                    this.showDialog = false;
                })
            },
            // 取消运输单
            cancelTrans(_this,id,childData,el){
                let cancelInfos = JSON.stringify({
                    token: this.users.token,
                    transportId:id,
                    cancelReason:childData
                });
                console.log(cancelInfos);
                _this.$http.post(this.global.lightningUrl +'/companyv1/trunkCenter/transport/cancel',cancelInfos,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.data.message === "取消运输单成功") {
                        _this.$message({
                            message: '取消运输单成功',
                            type: 'success'
                        });
                        el.setAttribute("disabled","disabled");
                        el.classList.add("is-disabled");
                        _this.reload();
                    }
                })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            // 选择司机
            selectDriver(index,val){
                this.driverPhone = '';
                this.transportId = val;
                this.divIndex = index;
                // console.log(this.transportInfos[index].transportId);
                let transportNumber = this.transportInfos[index].transportId;
                this.isShow=!this.isShow;
                let _this = this;
                let transportNumberInfos = JSON.stringify({
                    token: this.users.token,
                    transportId:transportNumber
                });
                console.log(transportNumberInfos)
                this.$http.post(this.global.lightningUrl +'/companyv1/trunkCenter/scheduleTransport/driver/list',transportNumberInfos,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(function (res) {
                    console.log((res));
                    if(JSON.stringify(res.data.result) === '{}'){
                        _this.$message({
                            message: '当前运输单暂无司机抢单',
                            type: 'warning'
                        });
                        return;
                    }else{
                        _this.selectDrivers = res.data.result ;
                        console.log(_this.selectDrivers);
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleSizeChange(size) {
                // console.log(size);
                this.pageSize = size;
                this.selectDriverInit();
            },
            handleCurrentChange(currentPage) {
                // console.log(currentPage);
                this.currentPage = currentPage;
                this.selectDriverInit();
            },
            // 跳转运输单详情
            viewDetails(row,status){
                let transportNumber = row;
                console.log(transportNumber)
                if (this.transportOrderDetail){
                    this.$router.push(
                        {
                            name: 'orderDetails',
                            query: {
                                transportNumber: transportNumber,
                                status:status
                            }
                        });
                }

            },
            // 接受原因
            getData(data){
                if(data.cancelReason === "其他原因"){
                    data.cancelReason = data.otherReason;
                }
                this.childData = data.cancelReason;
                // console.log(this.childData)
            },
            // 取消选司机页面
            cancelSelectDriver(){
                this.isShow = !this.isShow;
                this.selectDrivers = [];
            },
            selectTa2(index) {
                let _this = this;
                _this.centerDialogVisible = false;
                console.log(_this.driversUserId);
                let driverData = JSON.stringify({
                    token: this.users.token,
                    transportId: _this.transportId,
                    userId: _this.driversUserId,
                    vehicleType: _this.arrs[_this.radio].vehicleType,
                    contractPrice: _this.arrs[_this.radio].price
                });
                console.log(driverData);
                _this.loading = !_this.loading;
                _this.confirmDriver(_this,driverData,index);
                this.selectDrivers = [];
            },
            // 选定司机
            selectTa(index){
                let _this = this;
                this.$confirm('确定选择本司机?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {

                    let driverData = JSON.stringify({
                        token: this.users.token,
                        transportId:_this.transportId,
                        userId:_this.selectDrivers[index].userId
                    });
                    this.driversUserId  = _this.selectDrivers[index].userId;
                    console.log(driverData)
                    // _this.$options.methods.confirmDriver(_this,driverData);
                    _this.loading = !_this.loading;
                    _this.confirmDriver(_this,driverData,index);
                    this.selectDrivers = [];
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消选择'
                    });
                });
            },
            // 跳转司机详情
            driverDetails(index,index1){
                console.log(index,index1);
                let driverId = null;
                if(index == -1){
                    driverId = this.transportInfos[index1].userId;
                }else{
                    driverId = this.selectDrivers[index].userId;
                }
                /*this.$router.push(
                    {
                        path: '/sjmessage',
                        query: {
                            driverId:Base64.encode(driverId)
                        }
                    });*/
                sessionStorage.setItem('rows',Base64.encode(driverId));

                this.$router.push({ path:'/sjmessage' });
            },
            // 确认司机
            confirmDriver(_this,val,index){
                _this.$http.post(_this.global.lightningUrl +'/companyv1/trunkCenter/scheduleTransport/driver/choose',val,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(function (res) {
                    console.log(res)
                    if (res.data.errcode === 1) {
                        _this.centerDialogVisible = true;
                        _this.arrs = res.data.result;
                    }
                    if(res.data.message === "选定抢单司机成功"){
                        _this.$message({
                            message: '选定抢单司机成功',
                            type: 'success'
                        });
                        // _this.$nextTick(() => {
                            _this.loading = !_this.loading;
                        // });
                        _this.cosIndex = _this.divIndex;
                        _this.arrDriver[_this.divIndex] = _this.selectDrivers[index];

                        // console.log(_this.selectDrivers[index])
                        if(_this.cosIndex === _this.transportInfos[_this.divIndex].index){
                            _this.$set(_this.arr,_this.divIndex, false);
                        };
                        _this.isShow = !_this.isShow;
                        _this.reload();
                    }
                    if(res.data.message === "选定抢单司机失败"){
                        _this.$message.error('选定抢单司机失败')
                        // _this.$nextTick(() => {
                            _this.loading = !_this.loading;
                        // });
                    }
                    if(res.data.message === "该司机没有进行培训,无法抢单"){
                        _this.$message.error('该司机没有进行培训,无法抢单')
                        // _this.$nextTick(() => {
                            _this.loading = !_this.loading;
                        // });
                    }
                    if(res.data.message === "该司机未缴纳押金,无法指派"){
                        _this.$message.error('该司机未缴纳押金,无法指派')
                        // _this.$nextTick(() => {
                            _this.loading = !_this.loading;
                        // });
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            // 请求表格数据
            selectDriverInit(){
                let selectDrivers = JSON.stringify({
                    token:this.users.token,
                    driverName:this.driverName,
                    transportId:this.oddNumbers,
                    depotName:this.warehouseName,
                    filialeId:this.region,
                    customerName:this.customerName,
                    customerName:this.customerName,
                    status:this.states,
                    deliveryStartTime:this.arrDate === ""||this.arrDate === null?"":this.arrDate[0],
                    deliveryEndTime:this.arrDate === ""||this.arrDate === null?"":this.arrDate[1],
                    pageSize:this.pageSize,
                    pageNum:this.currentPage,
                    createType:this.createType
                });
                console.log(selectDrivers)

                this.$http.post(this.global.lightningUrl +'/companyv1/trunkCenter/transport/query/list',selectDrivers,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    // console.log(res.data.result.rows);
                    if(JSON.stringify(res.data.result) === '{}'){
                        this.$message({
                            message: '暂无符合条件的数据',
                            type: 'warning'
                        });
                        this.transportInfos = [];
                        this.totalText = 0;
                        return;
                    }else{

                        this.arr = [];
                        this.arrDriver = [];
                        this.isDisabled = [];

                        this.totalText = res.data.result.total;
                        for(let i=0;i<res.data.result.rows.length;i++){
                            this.arr.push(true);
                            this.arrDriver.push({});
                        }

                        for(let i=0;i<res.data.result.rows.length;i++){
                            this.isDisabled.push(false);
                        }
                        // console.log(_this.isDisabled);
                        // 增加index值
                        for(let i=0;i<res.data.result.rows.length;i++){
                            res.data.result.rows[i].index = i;
                        }
                        // 拼接配送日期
                        for(let i=0;i<res.data.result.rows.length;i++){
                            res.data.result.rows[i].deliveryTime = res.data.result.rows[i].deliveryStartTime + ' 至 ' + res.data.result.rows[i].deliveryEndTime;
                        }

                        this.transportInfos = res.data.result.rows;
                        let formInline ={};
                        formInline.oddNumbers = this.oddNumbers ;
                        formInline.driverName = this.driverName ;
                        formInline.arrDate = this.arrDate ;
                        formInline.warehouseName = this.warehouseName ;
                        formInline.states = this.states ;
                        // console.log(_this.transportInfos);
                        if(sessionStorage.getItem('shippingDocumentcurrentPage')!=null){
                            //删除本地
                            sessionStorage.removeItem('shippingDocumentcurrentPage');
                            sessionStorage.removeItem('shippingDocumentcondition');
                            sessionStorage.removeItem('shippingDocumenttotal');
                            //存储本地
                            sessionStorage.setItem('shippingDocumentcurrentPage', JSON.stringify(this.currentPage));
                            sessionStorage.setItem('shippingDocumenttotal', JSON.stringify(this.totalText));
                            sessionStorage.setItem('shippingDocumentcondition', JSON.stringify(formInline));
                        }else {
                            //存储本地
                            sessionStorage.setItem('shippingDocumentcurrentPage', JSON.stringify(this.currentPage));
                            sessionStorage.setItem('shippingDocumenttotal', JSON.stringify(this.totalText));
                            sessionStorage.setItem('shippingDocumentcondition', JSON.stringify(formInline));
                        }

                    }
                }).catch((error) => {
                        console.log(error);
                });
            //    缓存
                //更新本地存储
            }
        },
        // 审核司机页面初始化
        created(){
            this.users = JSON.parse(Base64.decode(sessionStorage.getItem('key'))).result;
            console.log(this.users);
            this.regions();
            //权限
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.transportOrderDetail = jurisdictions[6].menus[10].choose;  //详情
            this.transportOrderListExport = jurisdictions[6].menus[11].choose;  //导出
            this.transportOrderOperation  = jurisdictions[6].menus[13].choose;//   操作
            this.transportselectDriver  = jurisdictions[6].menus[14].choose;//   选司机
            if(sessionStorage.getItem('shippingDocumentcurrentPage')!=null){
                let currentPages = Number(sessionStorage.getItem('shippingDocumentcurrentPage'));
                let totals = Number(sessionStorage.getItem('shippingDocumenttotal'));
                let condition = sessionStorage.getItem('shippingDocumentcondition');
                if (JSON.parse(condition).arrDate == undefined ||JSON.parse(condition).arrDate == null){
                    JSON.parse(condition).arrDate = ''
                }
                // this.formInline = JSON.parse(condition);
                this.currentPage = currentPages;
                this.totalText = totals;
                this.oddNumbers = JSON.parse(condition).oddNumbers ;
                this.driverName = JSON.parse(condition).driverName ;
                this.arrDate = JSON.parse(condition).arrDate ;
                this.warehouseName = JSON.parse(condition).warehouseName ;
                this.states = JSON.parse(condition).states ;
                this.selectDriverInit();
            }else {
                this.selectDriverInit();
            }
            // 调用表格数据

        },
        components:{
            modalWindow
        }
    }
</script>

<style lang="scss">
    .header{
        margin-bottom: 20px;
    }
    .driverReviews{
    .driverReview-top{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        /*padding: 10px 0;*/
        .search-box{
            margin-bottom: 22px;
            .status{
                width: 74%;
            }
        }
        label{
            text-align: right;
            float: left;
            font-size: 14px;
            color: #606266;
            line-height: 40px;
            padding: 0 12px 0 0;
            box-sizing: border-box;
        }
        .psTime{
            display: inline-block;
            .el-range-editor.el-input__inner{
                width: 95%;
            }
        }
    .oddNumbers{
        width: 65%;
    }
    .left{
        margin-left: 10px;
    }
    .search{
        box-shadow:0 3px 15px 2px rgba(255,161,14,0.3);
        width: 10%;
        color: #fff;
        background: #409EFF;
        border-color: #409EFF;
    }
    }
    .driverReview-table{
        /*padding: 15px 0;*/
    .driverDetails-box,.transport{
        color:#409EFF;
    &:hover{
         color:#606266;
         cursor:pointer;
     }
        p{
            display: block;
        }
    }
    .b-btn{
        margin-left: 10px;
    }
    .select-drive-box{
        position: fixed;
        left: 0;
        top:0;
        height: 100%;
        width:100%;
        z-index: 100;
        background: rgba(0,0,0,.1);
    .select-drive{
        position: absolute;
        left: 16%;
        top: 20%;
        width: 68%;
        padding: 30px;
        background: #fff;
        border-radius: 5px;
        border: 1px solid #dedede;
        height:50%;
        overflow-y: auto;
        z-index: 100;
        display: flex;
        flex-direction: column;
    .headPic{
        width: 80px;
        height:80px;
    }
    .select-text{
        margin-left: 20px;
    }
    .select-text-one{
        margin-left: 5px;
    }
    .select-shu{
        color: red;
    }
    .select-tittle{
        font-size: 18px;
        color: #222;
        font-weight: 600;
    }
    .assign-drive{
        margin: 20px 0;
    .el-input{
        width:30%;
    }
    .buttonColor{
        border-color: #409EFF;
        background: #409EFF;
        color:#fff;
        width: 110px;
    }
    }
    .icon{
        padding:0 10px;
        float: right;
        margin-right: 25px;
        position: absolute;
        top: 30px;
        right:20px;
    }
    .cancelSelectDriver{
        height:30px;
        line-height: 30px;
        background: #fff;
        width: 100%;
        margin-bottom:10px ;
    span{
        padding: 0 3px;
        font-weight: 600;
        color: #222;
    }
    }
    .driver-info-box{
        flex:1;
        overflow-y: auto;
    .driver-info{
        width: 46%;
        /*height:18%;*/
        float: left;
        display: flex;
        justify-content: space-between;
        background: #f7f7f7;
        border-radius: 20px;
        padding: 30px 10px 40px;
        margin-bottom: 10px;
    &:nth-child(2n){
         margin-left: 2%;
     }
    .info-left{
        display: flex;
        justify-content: space-between;
    .info{
        margin-left: 10px;
    }
    img{
        width:80px;
        height:80px;
    }
    }
    .info-right{
        margin-left:15px ;
        display: flex;
        align-items: center;
    }
    .confirm{
        background:#409EFF ;
        border-color: #409EFF;
        color:#fff;
    }
    }
    }
    }
    }
    }
    .otherReason{
        width: 60%;
    }
    .bottom{
        margin-bottom:20px;
        padding: 0 20px!important;
    }
    .table-foot{
        margin: 20px 10px 10px ;
        /*display: flex;*/
        justify-content: flex-end;
    }
    }
</style>