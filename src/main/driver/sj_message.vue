<template>
    <div class="main">
        <div class="header">当前位置/
            <router-link to="/driver_manage">司机列表/</router-link>
            <span class="header_position">用户详情</span>
        </div>
        <template>
            <el-tabs v-model="activeName" type="card"  @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <div class="basicInformation">
                        <ul class="oul" style="padding:20px;">
                            <li>{{result.name}}</li>
                            <li>
                                <ul>
                                    <li>
                                        <span>年龄:</span>
                                        <span>{{result.age}}</span>
                                        <span>岁</span>
                                    </li>
                                    <li>
                                        <span>性别:</span>
                                        <span>{{result.sex}}</span>
                                    </li>
                                    <li>
                                        <span>居住地:</span>
                                        <span>{{result.address}}</span>
                                    </li>

                                    <li>
                                        <span class="s1">常跑地址：</span>
                                        <span>{{result.usualRunArea}}</span>
                                    </li>
                                    <li>
                                        <span v-show="disCreateTime">注册时间:</span>
                                        <span v-show="disCreateTime">{{result.createTime | dateFrm}}</span>
                                    </li>
                                    <li>
                                        <span>注册渠道:</span>
                                        <span>{{result.registerChannel}}</span>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>
                                        <span>手机号:</span>
                                        <span>{{result.phone}}</span>
                                    </li>
                                    <li>
                                        <span>身份证号:</span>
                                        <span>{{result.idcardNum}}</span>
                                    </li>
                                    <li>
                                        <span>驾驶证号:</span>
                                        <span>{{result.licenseNum}}</span>
                                    </li>
                                    <li>
                                        <span>驾驶证类型：</span>
                                        <span>{{result.licenseType}}</span>
                                    </li>
                                    <!--<li>-->
                                        <!--<span>行驶证号:</span>-->
                                        <!--<span>{{result.permitNum}}</span>-->
                                    <!--</li>-->
                                    <li>
                                        <span>认证状态:</span>
                                        <span>{{result.vehicleCertifyStatus}}</span>
                                    </li>
                                </ul>
                            </li>
                            <span class="spn"><img :src="result.headPic"></span>
                        </ul>
                        <ul class="sul" style="padding:20px;">
                            <li>车辆信息</li>
                            <li>
                                <ul>
                                    <li>
                                        <span>车辆品牌:</span>
                                        <span>{{result.vehicleBrand}}</span>
                                    </li>
                                    <li>
                                        <span class="s1">司机等级：</span>
                                        <span>{{result.level}}</span>
                                    </li>
                                    <!--<li>-->
                                        <!--<span class="s1">配送经验：</span>-->
                                        <!--<span>{{result.deliveryExperience}}</span>-->
                                    <!--</li>-->
                                    <li>
                                        <span>车型:</span>
                                        <span>{{result.vehicleType}}</span>
                                    </li>
                                    <li>
                                        <span>车牌号:</span>
                                        <span>{{result.plateNum}}</span>
                                    </li>
                                    <li>
                                        <span v-if="result.registDate == 0?false:true">车辆注册日期:</span>
                                        <span v-if="result.registDate == 0?false:true">{{result.registDate| dateFrm}}</span>
                                    </li>
                                    <li>
                                        <span>车牌类型:</span>
                                        <span>{{result.plateType}}</span>
                                    </li>
                                    <li>
                                        <span>车辆载质量 (千克):</span>
                                        <span>{{result.tonnage}}</span>
                                    </li>
                                    <li>
                                        <span>道路运输证号:</span>
                                        <span>{{result.roadTransportCertificateNumber}}</span>
                                    </li>

                                </ul>
                            </li>
                        </ul>
                        <ul class="oul" style="padding:20px;">
                            <li >其他</li>
                            <li class="li-bottom">
                                <ul>
                                    <li>
                                        <span>司机等级:</span>
                                        <span>{{result.level}}</span>
                                    </li>
                                    <li>
                                        <span>司机类型:</span>
                                        <span>{{result.driverType}}</span>
                                    </li>
                                    <li>
                                        <span >配送经验:</span>
                                        <span >{{result.deliveryExperience}}</span>
                                    </li>
                                    <!--<li>-->
                                        <!--<span>常跑城市:</span>-->
                                        <!--<span>{{result.usualRunArea}}</span>-->
                                    <!--</li>-->
                                    <li>
                                        <span>出车次数:</span>
                                        <span>{{result.runTimes}}</span>
                                    </li>
                                    <li>
                                        <span>身份认证:</span>
                                        <span>{{result.identityStatus}}</span>
                                    </li>
                                    <li>
                                        <span>是否交押金:</span>
                                        <span>{{result.isPayDeposit}}</span>
                                    </li>
                                    <li>
                                        <span class="s1">缴纳押金次数：</span>
                                        <span >{{result.payDepositTimes}} 次</span>
                                    </li>

                                </ul>
                                <ul>
                                    <li style="line-height: 28px;">
                                        <span>是否通过线上培训:</span>
                                        <span>{{result.isTrain==1?'是':'否'}}</span>
                                    </li>
                                    <li>
                                        <span>岗前培训次数:</span>
                                        <span >{{`${result.beforeTrainCount}次`}}</span>
                                        <el-button @click="PostJob(info = 2)" style="padding-bottom:7px;" type="primary" size="mini">查看培训记录</el-button>
                                    </li>
                                    <li>
                                        <span>上岗培训次数:</span>
                                        <span >{{`${result.inTrainCount}次`}}</span>
                                        <el-button @click="MountGuard(info = 2)" style="padding-bottom:7px;"  type="primary" size="mini">查看培训记录</el-button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="sul" style="padding:20px;">
                            <li>拓展信息</li>
                            <li class="li-bottom1">
                                <ul>
                                    <li v-if="namePhone!=''">
                                        <span>推荐司机:</span>
                                        <span>{{namePhone}}</span>
                                    </li>
                                    <li>
                                        <span>注册运营专员:</span>
                                        <span>{{result.registerDeveAdminName}}</span>
                                    </li>
                                    <li>
                                        <span>当前运营专员:</span>
                                        <span>{{result.currentDeveAdminName}}</span>
                                    </li>
                                    <li>
                                        <span>所属车队:</span>
                                        <span>{{result.team}}</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="sul" style="padding:20px;">
                            <li>运营信息</li>
                            <li class="li-bottom1">
                                <ul>
                                    <li>
                                        <span class="s1">首次出车时间：</span>
                                        <span v-if="result.firstDeliver!=undefined">{{result.firstDeliver|dateFrm}}</span>
                                    </li>
                                    <li>
                                        <span class="s1">最后出车时间：</span>
                                        <span v-if="result.lastDeliver!=undefined">{{result.lastDeliver|dateFrm}}</span>
                                    </li>
                                    <li>
                                        <span class="s1">闪电狗出车次数：</span>
                                        <span>{{result.runTimes}}</span>
                                    </li>
                                    <!--<li>-->
                                        <!--<span class="s1">平台总收入：</span>-->
                                        <!--<span>{{totalIncome}}</span>-->
                                        <!--<span>元</span>-->
                                    <!--</li>-->
                                </ul>
                            </li>
                        </ul>
                        <ul class="sul" style="padding:20px;">
                            <li>司机最后登录信息</li>
                            <li class="li-bottom">
                                <ul>
                                    <li>
                                        <span>最后心跳时间:</span>
                                        <span>{{result.lastLoginTime| dateFrm}}</span>
                                    </li>
                                    <li>
                                        <span>最后心跳位置:</span>
                                        <span>{{result.lastAddress}}</span>
                                    </li>
                                    <li>
                                        <span>手机品牌信息:</span>
                                        <span>{{result.brand}}</span>
                                    </li>
                                    <li>
                                        <span>手机系统版本:</span>
                                        <span>{{result.sysVersion}}</span>
                                    </li>
                                    <li>
                                        <span>imei:</span>
                                        <span>{{result.deviceId}}</span>
                                    </li>
                                    <li>
                                        <span>APP版本:</span>
                                        <span>{{result.apkVersion}}</span>
                                    </li>
                                    <li>
                                        <span>APP下载渠道:</span>
                                        <span>{{result.channelName}}</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <el-dialog
                        :title="title"
                         :visible.sync="dialogVisible"
                        width="70%"
                        :before-close="handleClose">
                        <span>
                            <template>
                                <el-table
                                    :data="tables"
                                    border
                                    style="width: 100%">
                                    <el-table-column
                                        prop="regionName"
                                        label="大区"
                                        align="center"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="filialeName"
                                        label="分公司"
                                        width="120"
                                        align="center"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="trainTime"
                                        label="培训时间"
                                        :formatter="dateFormatHm"
                                        align="center"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="trainWay"
                                        label="培训方式"
                                        align="center"
                                        :formatter="mode"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="teacher"
                                        label="讲师"
                                        align="center"
                                        >
                                    </el-table-column>

                                    <el-table-column
                                        prop="phone"
                                        label="司机电话"
                                        width="140"
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
                                        prop="creatorName"
                                        label="录入人"
                                        align="center"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="createTime"
                                        label="录入时间"
                                        align="center"
                                        :formatter="dateFormatHm"
                                    >
                                    </el-table-column>
                                </el-table>
                            </template>
                        </span>
                        <el-pagination background
                                       layout="total,prev, pager, next,sizes"
                                       :total="totalTrain"
                                       :page-size="pagesizeTrain"
                                       @size-change="handleSizeChangeTrain"
                                       @current-change="handleCurrentChangeTrain"
                                       :page-sizes="[10,20,30,50]"
                                       :current-page="currentPageTrain"
                                       class="text_right">
                        </el-pagination>
                    </el-dialog>
                </el-tab-pane>
                <el-tab-pane label="认证信息" v-if="authenticationInformation" name="second">
                    <div class="basicInformation">
                        <ul class="oul" style="padding:20px;">
                            <li>{{result.name}}</li>
                            <li>
                                <ul>
                                    <li>
                                        <span>居住地:</span>
                                        <span>{{result.address}}</span>
                                    </li>
                                    <li>
                                        <span>手机号:</span>
                                        <span>{{result.phone}}</span>
                                    </li>
                                    <li>
                                        <span>备用号:</span>
                                        <span>{{result.sphone}}</span>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>
                                        <span>身份证号:</span>
                                        <span>{{result.idcardNum}}</span>
                                    </li>
                                    <li>
                                        <span>驾驶证号:</span>
                                        <span>{{result.licenseNum}}</span>
                                    </li>
                                    <li>
                                        <span>行驶证号:</span>
                                        <span>{{result.permitNum}}</span>
                                    </li>
                                </ul>
                            </li>
                            <span class="spn"><img :src="result.headPic"></span>
                        </ul>
                        <div class="landingInformation">
                            <ul class="sul">
                                <li>车辆信息</li>
                                <li>
                                    <ul>
                                        <li>
                                            <span>车辆品牌:</span>
                                            <span>{{result.vehicleBrand}}</span>
                                        </li>
                                        <li>
                                            <span>车型:</span>
                                            <span>{{result.vehicleType}}</span>
                                        </li>
                                        <li>
                                            <span>车牌号:</span>
                                            <span>{{result.plateNum}}</span>
                                        </li>
                                        <li>
                                            <span>车辆颜色:</span>
                                            <span>{{result.vehicleColor}}</span>
                                        </li>
                                        <li>
                                            <span>车辆注册日期:</span>
                                            <span v-if="result.registDate == 0?false:true">{{result.registDate| dateFrm}}</span>
                                        </li>
                                        <li>
                                            <span>车辆所有人:</span>
                                            <span>{{result.vehicleOwner}}</span>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="Picture">
                            <ul>
                                <div class="Picture_nav">照片信息</div>
                                <li v-for="(n,index) in imageList" :data-index="index" class="Picture_con">
                                    <viewer :images="images" class="h152">
                                        <img :src="n.url"  height="152" width="140" >
                                    </viewer>
                                    <span class="w235">{{n.pic}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <!--<div class="table2">-->
                        <!--<div class="PersonalInformation">-->
                            <!--<ul>-->
                                <!--<li class="one">个人信息</li>-->
                                <!--<li>-->
                                    <!--<span>个人头像</span>-->
                                    <!--<span><img :src="result.headPic" style="width:100px;height:100px;border-radius: 25px;"></span>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!--<span>真实姓名</span>-->
                                    <!--<span>{{result.name}}</span>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!--<span>身份证号</span>-->
                                    <!--<span>{{result.idcardNum}}</span>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!--<span>驾驶证号</span>-->
                                    <!--<span>{{result.licenseNum}}</span>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!--<span>手机号码</span>-->
                                    <!--<span>{{result.phone}}</span>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!--<span>备用号码</span>-->
                                    <!--<span>{{result.sphone}}</span>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!--<span>居住地址</span>-->
                                    <!--<span>{{result.address}}</span>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!--<span>行驶证号码</span>-->
                                    <!--<span>{{result.permitNum}}</span>-->
                                <!--</li>-->
                            <!--</ul>-->
                        <!--</div>-->
                        <!--<div class="VehicleInformation">-->
                            <!--<ul>-->
                                <!--<li class="one">车辆信息</li>-->
                                <!--<li>-->
                                    <!--<span>车型</span>-->
                                    <!--<span>{{result.vehicleType}}</span>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!--<span>品牌</span>-->
                                    <!--<span>{{result.vehicleBrand}}</span>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!--<span>车辆颜色</span>-->
                                    <!--<span>{{result.vehicleColor}}</span>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!--<span>车牌号</span>-->
                                    <!--<span>{{result.plateNum}}</span>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!--<span>车辆注册日期</span>-->
                                    <!--<span v-if="result.registDate == 0?false:true">{{result.registDate| dateFrm}}</span>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!--<span>车辆所有人</span>-->
                                    <!--<span>{{result.vehicleOwner}}</span>-->
                                <!--</li>-->
                            <!--</ul>-->
                        <!--</div>-->
                        <!--<div class="PhotoInformation">-->
                            <!--<ul>-->
                                <!--<li class="one">照片信息</li>-->
                                <!--<li v-for="(n,index) in imageList" :data-index="index">-->
                                    <!--<span >{{n.pic}}</span>-->
                                    <!--<viewer :images="images">-->
                                        <!--<img :src="n.url"  width="300">-->
                                    <!--</viewer>-->
                                <!--</li>-->
                            <!--</ul>-->
                        <!--</div>-->
                    <!--</div>-->
                </el-tab-pane>
                <el-tab-pane label="银行卡信息" v-if="bankCarInfo" name="third">
                    <div class="jz">

                        <el-form ref="form" :model="form" label-width="80px">

                        <el-form-item label="银行：">
                            <el-input v-model="form.name" :disabled="true" ></el-input>
                        </el-form-item>

                        <el-form-item label="账号：">
                            <el-input v-model="form.date1" :disabled="true" ></el-input>
                        </el-form-item>

                        <el-form-item label="户名：">
                            <el-input v-model="form.date2" :disabled="true" ></el-input>
                        </el-form-item>

                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="积分信息" name="integral">
                    <div class="integral">
                        <div class="title_mx" >
                            积分明细
                        </div>
                        <p style="font-size: 14px;">总积分：<span style="font-weight: bold;font-size: 17px;">{{ this.totalPoints }}</span>分</p>
                        <template>
                            <el-table
                                :data="tableData"
                                style="width: 70%;margin:0 auto;">
                                <el-table-column
                                    type="index"
                                    width="110"
                                    label="编号"
                                    align="center"
                                >
                                </el-table-column>


                                <el-table-column
                                    prop="type"
                                    label="类别"
                                    align="center">
                                </el-table-column>
                                <el-table-column
                                    prop="score"
                                    align="center"
                                    label="明细">
                                </el-table-column>
                                <el-table-column
                                    prop="time"
                                    align="center"
                                    :formatter="dateFormatHm"
                                    label="时间">
                                </el-table-column>
                            </el-table>
                        </template>
                        <!-- 分页插件 -->
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="pagesize"
                            layout="total, prev, pager, next"
                            :total="total">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="邀请司机" name="Invitation">
                    <div class="dirver_Invitation">
                        <ul>
                            <li>
                                <span class="s1" style="display: inline-block; text-align: right" >推荐注册人数&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                                <span  >{{totalRegiestCount}}&nbsp;&nbsp;
                                </span>
                            </li>
                            <li>
                                <span class="s1" style="display: inline-block;text-align: right" >奖励总人数&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                                <span >{{inviteeCount}}&nbsp;&nbsp;
                                    <router-link to="invitation" style="color:blue;">
                                        查看详情
                                    </router-link>
                                </span>
                            </li>
                            <li>
                                <span class="s1" style="display: inline-block; text-align: right" >奖励总金额&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                                <span >{{awardedMoney}}&nbsp;&nbsp;
                                </span>
                            </li>

                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </template>
    </div>
</template>
<script >
    import moment from 'moment'
    import fancyBox from 'vue-fancybox';
export default {
    data() {
      return {
          title:'',
          dialogVisible: false,
          arr:[],
          tables:[],//司机岗前培训列表
          total:0,
          currentPage:1,
          pagesize:10,
          totalTrain:0,
          currentPageTrain:1,
          pagesizeTrain:10,
          disCreateTime:true,
          pic:[
              {aaa:"身份证照片正面"},
              {aaa:"身份证照片背面"},
              {aaa:"手持身份证照片"},
              {aaa:"驾驶证照片"},
              {aaa:"车内照片"},
              {aaa:"车照片45°"},
              {aaa:"行驶证照片正面"},
              {aaa:"行驶证照片背面"},
              {aaa:"车辆保险"},
          ],
          //照片
          imageList1:[],
          imageList:[],
            images:[],
          //上个页面拿来的userId
          userId:'',
        //单页面所有的原始信息
          result:[],
            activeName: 'first',
            activeNames: ['1'],
            form: {
              name: '',
              date1: '',
              date2: '',
            },
          tableData:[],
          totalPoints:'',
          totalRegiestCount:'',
          inviteeCount:'',
          awardedMoney:'',
          namePhone:'',
          totalIncome:'',
          bankCarInfo:'',
          authenticationInformation:'',
      };
    },
    filters: {
        dateFrm: function (el) {
            return moment(el).format("YYYY-MM-DD HH:mm");
        }
    },
    created(){
        // 拿到token
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
        // if (jurisdictions[5].menus.length == 25){
            this.authenticationInformation = jurisdictions[5].menus[23].choose
            this.bankCarInfo = jurisdictions[5].menus[24].choose
            // 'authenticationInformation':'认证信息','bankCarInfo':'银行卡信息'
        // }
        //拿到userId
        let userIds =JSON.parse(Base64.decode(sessionStorage.getItem('rows')));
        this.userId = userIds;
        this.$http.post( this.global.lightningUrl + '/companyv1/driverManage/driver/driver_info',JSON.stringify({
            "token":this.token,
            "userId":this.userId,
        })).then(run=>{
            console.log(run);
            if(run.body.errcode == 0){
                this.result = run.body.result;
                console.log(this.result.registDate);
                console.log(159);
                if (this.result.inviteUserName == undefined){
                    this.namePhone=''
                }else {
                    this.namePhone =this.result.inviteUserName + '('+ this.result.inviteUserPhone + ')'
                }
                if (this.result.registerChannel == undefined){
                    this.result.registerChannel = ''
                }
                // console.log(this.result.firstDeliver);
                // if (this.result.firstDeliver == undefined){
                //     this.result.firstDeliver = 'null'
                // }
                // <i>{{result.inviteUserName}}（ {{result.inviteUserPhone}} ）</i>
                if(this.result.identityStatus == '0'){
                    this.result.identityStatus = '待认证'
                }else if(this.result.identityStatus == '1'){
                    this.result.identityStatus = '审核中'
                }else if(this.result.identityStatus == '2'){
                    this.result.identityStatus = '已通过'
                }else if(this.result.identityStatus == '3'){
                    this.result.identityStatus = '未通过'
                }
                if (this.result.plateType == '01') {
                    this.result.plateType = '黄牌';
                }else if (this.result.plateType == '02') {
                    this.result.plateType = '蓝牌';
                }else {
                    this.result.plateType = '其他';
                }
                if (this.result.registerChannel == 'admin'){
                    this.result.registerChannel = '运营邀请';
                }else if (this.result.registerChannel == 'driver') {
                    this.result.registerChannel = '司机邀请';
                }else if  (this.result.registerChannel == 'ios'){
                    this.result.registerChannel = '苹果客户端';
                }else if (this.result.registerChannel == 'android'){
                    this.result.registerChannel = '安卓客户端';
                }else if(this.result.registerChannel == 'team'){
                    this.result.registerChannel = '车队邀请';
                }

                if(this.result.driverType == 'team'){
                    this.result.driverType = '车队司机'
                }else if (this.result.driverType == 'personal') {
                    this.result.driverType = '个体司机'
                }else if(this.result.driverType == 'company'){
                    this.result.driverType = '运输公司'
                }
                if(this.result.vehicleCertifyStatus == 0){
                    this.result.vehicleCertifyStatus = '待认证'
                }else if(this.result.vehicleCertifyStatus == 1){
                    this.result.vehicleCertifyStatus = '审核中'
                }else if(this.result.vehicleCertifyStatus == 2){
                    this.result.vehicleCertifyStatus = '通过认证'
                }else if(this.resul.vehicleCertifyStatus == 3){
                    this.result.vehicleCertifyStatus = '未通过'
                }
                if(this.result.isPayDeposit == 0){
                    this.result.isPayDeposit = '未缴纳押金'
                }else if(this.result.isPayDeposit == 1){
                    this.result.isPayDeposit = '已缴纳押金'
                }else if(this.result.isPayDeposit == 2){
                    this.result.isPayDeposit = '押金退款中'
                }
                if(this.result.createTime === 0){
                    this.disCreateTime = false
                }
                // 图片
                let time = new  Date().getTime();
                this.result.headPic = this.result.headPic+'?timestamp='+time;
                //司机照片
                this.imageList1.push(run.body.result.idcardPositivePic+'?timestamp='+time);
                this.imageList1.push(run.body.result.idcardReversePic+'?timestamp='+time);
                this.imageList1.push(run.body.result.handingIdcardPic+'?timestamp='+time);
                this.imageList1.push(run.body.result.licensePic+'?timestamp='+time);
                this.imageList1.push(run.body.result.vehicleInsidePic+'?timestamp='+time);
                this.imageList1.push(run.body.result.vehicleSidePic+'?timestamp='+time);
                this.imageList1.push(run.body.result.permitPositivePic+'?timestamp='+time);
                this.imageList1.push(run.body.result.permitReversePic+'?timestamp='+time);
                this.imageList1.push(run.body.result.vehicleInsurancePic+'?timestamp='+time);
                console.log(111);
                console.log(this.imageList);
                this.images = this.imageList;
                for(var i in this.imageList1){
                    this.imageList.push({width: 1024, height: 1024,url:this.imageList1[i],pic:this.pic[i].aaa},)
                };
                console.log(this.imageList);
                // this.result.vehicleType = JSON.parse(run.body.result.vehicleType).name;

                if (this.result.vehicleType != ''&&this.result.vehicleType != null &&this.result.vehicleType != undefined ){
                    this.result.vehicleType = JSON.parse(run.body.result.vehicleType).name + ' '
                        + JSON.parse(run.body.result.vehicleType).isElectric + ' '
                        + JSON.parse(run.body.result.vehicleType).isTailBoard + ' '
                        + JSON.parse(run.body.result.vehicleType).length + ' '
                        + JSON.parse(run.body.result.vehicleType).isCertificate + ' '
                        + JSON.parse(run.body.result.vehicleType).isCold
                } else {
                    this.result.vehicleType = ''
                }
                // alert(this.result.vehicleType)

            }
            this.form.name = run.body.result.bankName;
            this.form.date1 = run.body.result.cardNum;
            this.form.date2 = run.body.result.name;


        });
        let page = JSON.stringify({
            "token":this.token,
            "userId":this.userId,
        })
        // this.$http.post(this.global.lightningUrl +'/companyv1/driverManage/driver/get_total_income',page,{
        //
        //     headers: {
        //         'Content-Type': 'application/json;charset=UTF-8'
        //     }
        // }).then((res)=>{
        //     console.log(res);
        //
        //     this.totalIncome =res.body.result
        // })
        this.data()
        this.invitation()
    },
    methods: {
        type(row) {
            if (row.type == 'before'){
                return '岗前培训'
            }else {
                return '上岗培训'
            }
        },
        mode(row) {
            if (row.trainWay == 'scene'){
                return '现场'
            }else   if(row.trainWay == 'wechat') {
                return '微信'
            }else if (row.trainWay == 'phone') {
                return '电话'
            }else if (row.trainWay == 'video') {
                return '视频'
            }else if (row.trainWay == 'other') {
                return '其他'
            }

        },
        //岗前培训列表
        PostJob() {
            this.title = '岗前培训列表';
            this.dialogVisible = true;
            let type = 'before';
            this.Train(type);
        },
        //上岗培训列表
        MountGuard() {
            this.title = '上岗培训列表';
            this.dialogVisible = true;
            let type = 'in';
            this.Train(type);
        },
        Train(type) {
            let page = JSON.stringify({
                token:this.token,
                pageSize:this.pagesizeTrain,
                pageNum:this.currentPageTrain,
                userId:this.userId, //司机编号
                type:type  //--上岗培训 | 岗前培训
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/train/list',page,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                if (res.body.errcode == 0) {
                    this.tables = res.body.result.list;
                    this.totalTrain = res.body.result.total;
                }
            });
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        open () {

        },
        handleClick(tab, event) {
        },
        handleChange(val) {

        },
        data(){
            let page = JSON.stringify({
                token:this.token,
                // userId:this.userId,
                userId:this.userId,

            });
            this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/query_score',page,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                this.totalPoints= res.body.result
            })
            let page1 = JSON.stringify({
                token:this.token,
                userId:this.userId,
                pageSize: this.pagesize,
                pageNum : this.currentPage,
            });
            this.ajax(page1)
            // total:0,
            //     currentPage:1,
            //     pagesize:10,


        },
        ajax(page){
            this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/query_score_record',page,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                this.total =res.body.result.total
                this.tableData = res.body.result.list;
                for (let i = 0 ; i < this.tableData.length;i++){
                    if (this.tableData[i].type=='LOGIN_IN'){
                        this.tableData[i].type='每日首次登录'
                    }else if (this.tableData[i].type=='LOGIN_IN_SEVEN'){
                        this.tableData[i].type='连续登录7天'
                    }else if (this.tableData[i].type=='FINISH_TASK'){
                        this.tableData[i].type='完成出车任务'
                    }else if (this.tableData[i].type=='FINISH_ADD_RUN_TASK'){
                        this.tableData[i].type='完成加跑任务'
                    }else if (this.tableData[i].type=='SHARE'){
                        this.tableData[i].type='成功分享'
                    }else if (this.tableData[i].type=='INVITE_REGISTER'){
                        this.tableData[i].type='邀请司机注册'
                    }else if (this.tableData[i].type=='COMPLETE_INFO'){
                        this.tableData[i].type='完善资料'
                    }else if (this.tableData[i].type=='CERTIFY_YES'){
                        this.tableData[i].type='通过身份认证'
                    }else if (this.tableData[i].type=='LATE'){
                        this.tableData[i].type='迟到'
                    }else if (this.tableData[i].type=='POINT_NOT_GOOD'){
                        this.tableData[i].type='打点不完整'
                    }else if (this.tableData[i].type=='ACCIDENT'){
                        this.tableData[i].type='发生事故'
                    }else if (this.tableData[i].type=='MISSED'){
                        this.tableData[i].type='爽约'
                    }
                }
            })
        },
        //
        //分页
        handleSizeChangeTrain(pagesizeTrain) {//每业条数
            console.log(pagesizeTrain);
            this.pagesizeTrain = pagesizeTrain;
            if (this.title == '岗前培训列表') {
                let type = 'before';
                this.Train(type='before')
            }else {
                let type = 'in';
                this.Train(type)
            }
        },
        handleCurrentChangeTrain(currentPageTrain) {//业数
            this.currentPageTrain = currentPageTrain;
            if (this.title == '岗前培训列表') {
                let type = 'before';
                this.Train(type='before')
            }else {
                let type = 'in';
                this.Train(type)
            }
            // this.currentPage = currentPage;
        },
        handleCurrentChange(val) {
            this.currentPage = val
            let page1 = JSON.stringify({
                token:this.token,
                userId:this.userId,
                pageSize: this.pagesize,
                pageNum : this.currentPage,
            });
            this.ajax(page1)
        },
        dateFormatHm:function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm");
        },
    //    邀请司机
        invitation(){
            let page = JSON.stringify({
                token:this.token,
                userId:this.userId,
                // userId:1534204800008,
            });
            console.log(page);
            this.$http.post(this.global.lightningUrl + '/companyv1/driverPromotion/analysisForBackweb',page,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                if (res.body.result.totalRegiestCount != undefined){
                    this.totalRegiestCount = res.body.result.totalRegiestCount;
                } else {
                    this.totalRegiestCount = '0';
                }

                if (res.body.result.inviteeCount != undefined){
                    this.inviteeCount = res.body.result.inviteeCount;
                } else {
                    this.inviteeCount = '0';
                }
                if (res.body.result.awardedMoney!=undefined){
                    this.awardedMoney = res.body.result.awardedMoney + '' +' 元';
                }else{
                    this.awardedMoney = '0'
                }

            })
        }
    }
}
</script>
<style lang="scss">
    .main{
        width:100%;
        background:#eaedf2;
        padding:30px;
        overflow-y: auto;
        .header{
            line-height: 56px;
            color:#606163;
            font-size:16px;
            .header_position{
                color:#2b2c2e;
                font-weight: bold;
            }
        }
        .el-tabs__nav-scroll{
            border-bottom: 1px solid white;
        }
        .el-tabs__header{
            margin:0;
        }
        .el-tabs__nav{
            height:55px;
            .el-tabs__item{
                height:55px;
                line-height: 55px;
                background: white;
                border-top: 4px solid transparent;
            }

            .is-active{
                border-top-color: #337df6;
            }
        }
        .title_mx{
            width: 100%;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 18px;
        }
        .basicInformation{
            padding:75px;
            background: white;
            /*border-top:1px solid red;*/
            border-top:1px solid transparent;
            .oul{
                border-bottom:1px solid #dadada;
                :nth-child(1){
                     position: relative;
                     font-size:22px;
                     font-weight: bold;
                     line-height: 46px;
                 }
                :nth-child(2){
                    font-size:22px;
                    font-weight: bold;
                }
                .spn{
                    position: absolute;
                    top: 30px;
                    left:180px;
                    img{
                        width:100px;
                        height:100px;
                        border-radius: 50%;
                    }
                }
                :nth-child(2){
                    ul{
                        height:20px;
                        line-height: 20px;
                        padding:10px 0;
                        li{
                            line-height: 20px;
                            float: left;
                            padding:0 30px;
                            border-left:1px solid #e3e3e3;
                            span{
                                height:20px;
                                line-height: 20px;
                            }
                        }
                        :nth-child(1){
                            padding-left:0;
                            border:none;
                        }
                        span{
                            font-size: 14px;
                            font-weight: lighter;
                        }
                    }
                }
                :nth-child(3){
                    padding-bottom:38px;
                    ul{
                        height:20px;
                        line-height: 20px;
                        padding:10px 0;
                        li{
                            line-height: 20px;
                            float: left;
                            padding:0 30px;
                            border-left:1px solid #e3e3e3;
                            span{
                                height:20px;
                                line-height: 20px;
                            }
                        }
                        :nth-child(1){
                            padding-left:0;
                            border:none;
                        }
                        span{
                            font-size: 14px;
                            font-weight: lighter;
                        }
                    }
                }
            }
            .sul{
                padding-top:35px;
                overflow:hidden;
                li{
                    display:block;
                }
                :nth-child(1){
                    font-size:22px ;
                    font-weight: bold;
                    line-height: 46px;
                }
                :nth-child(2){
                    ul{
                        height:20px;
                        line-height: 20px;
                        padding:10px 0;
                        li{
                            line-height: 20px;
                            float: left;
                            padding:0 30px;
                            margin:5px 0;
                            border-left:1px solid #e3e3e3;
                            span{
                                height:20px;
                                line-height: 20px;
                            }
                        }
                        :nth-child(1){
                            padding-left:0;
                            border:none;
                        }
                        span{
                            font-size: 14px;
                            font-weight: lighter;
                        }
                    }
                }
            }
        }
        .box{
            width:100%;
            height:100%;
            .imgs{
                width:200px;
                img{
                    width:100%;
                    height:100%;
                }
                .spa{
                    text-align: center;
                }
            }
            .basic{
                margin-top:20px;
                ul{
                    li{
                        margin:10px 0 0 0;
                        color:#606266;
                        .s1{
                            font-size:14px;
                            color:#303133;
                        }

                        .s3{
                            i{

                            }
                            .i1{
                                margin-left:20px;
                            }
                        }
                    }
                }
            }
            .Expand{
                margin:20px 0;
                background: #909399;
                p{
                    font-size:20px;
                    color: white;
                }
            }
            .LandingInformation{
                margin:20px 0;
                background: #909399;
                p{
                    font-size:20px;
                    color: white;
                }
            }
        }
        .basicInformation{
            padding:75px;
            background: white;
            border-top:1px solid transparent;
            .oul{
                border-bottom:1px solid #dadada;
                :nth-child(1){
                    position: relative;
                    font-size:22px;
                    font-weight: bold;
                    line-height: 46px;
                }
                .spn{
                    position: absolute;
                    top: 30px;
                    left:180px;
                    img{
                        width:100px;
                        height:100px;
                        border-radius: 50%;
                    }
                }
                :nth-child(2){
                    ul{
                        height:20px;
                        line-height: 20px;
                        padding:10px 0;
                        li{
                            line-height: 20px;
                            float: left;
                            padding:0 20px;

                            border-left:1px solid #e3e3e3;
                            span{
                                height:20px;
                                line-height: 20px;
                            }
                        }
                        :nth-child(1){
                            padding-left:0;
                            border:none;
                        }
                        span{
                            font-size: 14px;
                            font-weight: lighter;
                        }
                    }
                }
                :nth-child(3){
                    padding-bottom:38px;
                    ul{
                        height:20px;
                        line-height: 20px;
                        padding:10px 0;
                        li{
                            line-height: 20px;
                            float: left;
                            padding:0 30px;
                            border-left:1px solid #e3e3e3;
                            span{
                                height:20px;
                                line-height: 20px;
                            }
                        }
                        :nth-child(1){
                            padding-left:0;
                            border:none;
                        }
                        span{
                            font-size: 14px;
                            font-weight: lighter;
                        }
                    }
                }
            }
            .landingInformation{
                width:100%;
                padding:10px 0;
                border-bottom:1px solid #dadada;
                .sul{
                    padding:35px 20px;
                    overflow:hidden;
                    background:white;
                    :nth-child(1){
                        font-size:22px ;
                        font-weight: bold;
                        line-height: 46px;
                    }
                    :nth-child(2){
                        ul{
                            height:20px;
                            line-height: 20px;
                            padding:10px 0;
                            li{
                                line-height: 20px;
                                float: left;
                                padding:0 30px;
                                border-left:1px solid #e3e3e3;
                                span{
                                    height:20px;
                                    line-height: 20px;
                                }
                            }
                            :nth-child(1){
                                padding-left:0;
                                border:none;
                            }
                            span{
                                font-size: 14px;
                                font-weight: lighter;
                            }
                        }
                    }
                    :nth-child(3){
                        ul{
                            height:20px;
                            line-height: 20px;
                            padding:10px 0;
                            li{
                                line-height: 20px;
                                float: left;
                                padding:0 30px;
                                border-left:1px solid #e3e3e3;
                                span{
                                    height:20px;
                                    line-height: 20px;
                                }
                            }
                            :nth-child(1){
                                padding-left:0;
                                border:none;
                            }
                            span{
                                font-size: 14px;
                                font-weight: lighter;
                            }
                        }
                    }
                    :nth-child(4){
                        ul{
                            height:20px;
                            line-height: 20px;
                            padding:10px 0;
                            li{
                                line-height: 20px;
                                float: left;
                                padding:0 30px;
                                span{
                                    height:20px;
                                    line-height: 20px;
                                }
                            }
                            :nth-child(1){
                                padding-left:0;
                                border:none;
                            }
                            span{
                                font-size: 14px;
                                font-weight: lighter;
                            }
                        }
                    }
                }
            }
            .Picture{
                width:100%;
                padding:10px 0;
                ul{
                    padding:35px 20px;
                    overflow:hidden;
                    background:white;
                    li {
                        float: left;
                        font-size: 15px;

                    }
                    .Picture_nav{
                        font-size: 22px;
                        font-weight: bold;
                        overflow: hidden;
                    }
                    .Picture_con{
                        padding:10px 120px;
                        text-align: center;
                        .h152{
                            height:152px;
                            width:140px;
                        }
                        .w235{
                            line-height:46px;
                            text-align: center;

                        }
                    }
                }
            }
        }
        .jz{
            width:100%;
            padding:50px;
            background: white;
            .el-input{
                width:20%;
            }
        }
        .integral{
            width:100%;
            padding:50px;
            background: white;
        }
        .dirver_Invitation{
            padding:50px;
            width:100%;
            background:white;
            ul{
                li{
                    line-height:40px;
                    font-size: 16px;
                }
            }
        }
    }

</style>

