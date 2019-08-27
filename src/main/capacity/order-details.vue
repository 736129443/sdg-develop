<template>
    <div class="main">
        <div class="orderDetails" v-loading="loading" element-loading-text="正在加载数据,请稍等...">
            <div class="container_border o-position" style="margin-bottom: 20px;" v-if="showDistribution">
                <div class="orderDetail o-step">
                    <p style="border-bottom: none;height: 200px;line-height: 200px;">配送状态</p>
                    <el-steps align-center slot="reference">
                        <el-step title="配送日期" v-if="typeof(transportTemp.trackId) !== 'undefined'"
                                 :description="transportTemp.deliveryStartTime" icon="iconfont icon-zhongdian-copy"><i
                            class="step01" slot="icon"></i></el-step>
                        <el-step title="到仓签到" v-if="typeof(delivered.arrivalDepot) !== 'undefined'"
                                 :description="delivered.arrivalDepot == null ? '':formatDateTime(delivered.arrivalDepot.createTime)+'\n'+delivered.arrivalDepot.address"
                                 icon="iconfont icon-zhongdian-copy"><i class="step02" slot="icon"></i></el-step>
                        <el-step title="离仓" v-if="typeof(delivered.leavedDepot) !== 'undefined'"
                                 :description="delivered.leavedDepot == null ? '':formatDateTime(delivered.leavedDepot.createTime)"
                                 icon="iconfont icon-zhongdian-copy"><i class="step03" slot="icon"></i></el-step>
                        <el-step v-if="delivered.leaveStatus.length>0" v-for="(group,index) in delivered.leaveStatus"
                                 :key="index" :title="group.status == 'properDelivery'?'妥投':'未妥投'"
                                 :description="'到达 '+formatDateTime(group.arriveTime)+'\n'+'离开 '+formatDateTime(group.createTime)"
                                 icon="iconfont icon-zhongdian-copy"
                                 @mouseenter.native="selectStyle(index)"
                                 @mouseleave.native="selectStyle1()"
                                 ref="arrive" style="cursor: pointer">
                            <i class="step04" slot="icon" v-show="group.status == 'properDelivery'"></i>
                            <i class="step05" slot="icon" v-show="group.status == 'notDeliveredProperly'">
                            </i></el-step>
                        <el-step title="配送完成" v-if="typeof(delivered.finishedTransport) !== 'undefined'"
                                 :description="delivered.finishedTransport == null ? '':formatDateTime(delivered.finishedTransport.createTime)"
                                 icon="iconfont icon-zhongdian-copy"><i class="step01" slot="icon"></i></el-step>
                    </el-steps>
                    <!--</el-popover>-->
                </div>
                <div class="popover post" v-show="isShow" ref="pop">
                    <div class="arrows"></div>
                    <p style="padding:1px 0"><span>{{delivered.leaveStatus.length > 0 ?delivered.leaveStatus[pIndex].address:""}}</span>
                    </p>
                    <p style="padding:1px 0"><span>{{delivered.leaveStatus.length > 0 ?delivered.leaveStatus[pIndex].consignee:""}}</span>
                        <span>{{delivered.leaveStatus.length > 0 ?delivered.leaveStatus[pIndex].phone:""}}</span></p>
                    <p style="padding:1px 0"
                       v-show="delivered.leaveStatus.length > 0 &&delivered.leaveStatus[pIndex].status === 'notDeliveredProperly'">
                        <span>未妥投原因：{{delivered.leaveStatus.length > 0 ?delivered.leaveStatus[pIndex].situation:""}}</span>
                    </p>
                    <div class="d-pic"
                         v-show="delivered.leaveStatus.length > 0 &&delivered.leaveStatus[pIndex].status === 'properDelivery'">
                        <img :src="pic"
                             v-for="(pic,index) in delivered.leaveStatus.length > 0&&delivered.leaveStatus[pIndex].status === 'properDelivery'?delivered.leaveStatus[pIndex].deliveryImg:[]"
                             :key="index"/>
                    </div>
                </div>
            </div>
            <div class="container_border">
                <div class="orderDetail">
                    <p v-if="!showDistribution">运输单详情</p>
                    <p v-if="showDistribution">出车单详情</p>
                    <div class="title">
                        <div class="tittle-box">
                            <div class="shu"></div>
                            <span class="title-text">基本信息</span>
                        </div>
                        <div class="dotted"></div>
                    </div>
                    <ul>
                        <li>运输单编号 > {{transportTemp.id}}</li>
                        <li v-show="typeof(transportTemp.trackId) == 'undefined'?false:true">出车单编号 >
                            {{typeof(transportTemp.trackId) == 'undefined'?'':transportTemp.trackId}}
                        </li>
                        <li>任务创建时间 > {{formatDateTime(Number(transportTemp.createTime))}}</li>
                        <li>任务状态 > <span>{{this.$route.query.status | status(transportTemp.trackId)}}</span></li>
                        <!--<li v-if="typeof(this.$route.query.status) == 'undefined'">任务状态 > <span>{{transportTemp.status | status(transportTemp.trackId)}}</span></li>-->
                    </ul>
                    <ul>
                        <li>仓库名称 > {{transportTemp.depotName}}</li>
                        <li>是否需要返仓 > {{transportTemp.isBackDepot | isBackDepot}}</li>
                        <li>线路名称 > {{transportTemp.traceName}}</li>
                        <!--<li>配送点固定 > {{transportTemp.distributionFixed}}</li>-->
                        <!--<li>配送点数量 > {{transportInfos.groupBody.length}}个</li>-->
                        <!--<li>限行区域说明 > {{transportInfos.restrictedArea}}</li>-->
                        <!--<li>配送总里程 > {{transportInfos.totalKilometres}}公里</li>-->
                        <li>配送地点 > {{transportTemp.deliveryArea}}</li>
                        <!--<li>配送区域描述 > {{transportInfos.areaDescription}}</li>-->
                        <li>联系人 > {{JSON.stringify(transportTemp) != '{}'?transportTemp.location[0].consignee:''}}</li>
                        <li>联系电话 > {{JSON.stringify(transportTemp) != '{}'?transportTemp.location[0].phone:''}}</li>
                        <li v-if="typeof(transportTemp.trackId) !== 'undefined'&&typeof(transportTemp.addRunReason) !== 'undefined'">
                            加任务原因 > {{transportTemp.addRunReason}}
                        </li>
                    </ul>
                    <ul class="car-type">
                        <li style="width:100%;">
                            <div class="transport-route flex">运输路线 >
                                <el-steps direction="vertical">
                                    <el-step
                                        v-if="transportTemp.location[0].type == null || typeof(transportTemp.location[0].type) == 'undefined'"
                                        :title="JSON.stringify(transportTemp) != '{}'?transportTemp.location[0].address+'('+transportTemp.location[0].consignee+' '+ transportTemp.location[0].phone+')':''"
                                        icon="iconfont icon-qidian-copy"><i class="step9" slot="icon"></i></el-step>
                                    <el-step
                                        v-if="transportTemp.location[0].type == null || typeof(transportTemp.location[0].type) == 'undefined'"
                                        v-for="(group,index) in arr"
                                        v-bind:title="JSON.stringify(transportTemp) != '{}'?group.address+'('+group.consignee+' '+ group.phone+')':''"
                                        :key="index" icon="iconfont icon-zhongdian-copy"><i class="step10"
                                                                                            slot="icon"></i></el-step>
                                    <el-step
                                        v-if="transportTemp.location[0].type !== null && typeof(transportTemp.location[0].type) != 'undefined'"
                                        v-for="(group,index) in arr"
                                        v-bind:title="JSON.stringify(transportTemp) != '{}'?group.address+'('+group.consignee+' '+ group.phone+')':''"
                                        :key="'new'+index" icon="iconfont icon-zhongdian-copy"><i class="step9"
                                                                                                  slot="icon"
                                                                                                  v-show="arr[index].type === '0'"></i><i
                                        class="step10" slot="icon" v-show="arr[index].type === '1'"></i></el-step>
                                </el-steps>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li v-if="showDistribution">配送日期 > {{transportTemp.deliveryStartTime}}</li>
                        <li v-if="!showDistribution">配送日期 > {{transportTemp.deliveryStartTime}} 至
                            {{transportTemp.deliveryEndTime}}
                        </li>
                        <li>到仓时间 > <span>{{transportTemp.arrDepotTime}}</span></li>
                        <li>预计完成时间 > {{transportTemp.lastArrTime}}</li>
                        <span v-if="!showDistribution">
                          <li v-if="transportTemp.status=='waiting'||transportTemp.status=='finished' ">出车单 >
              <el-button type="text" @click="istracklist();centerDialogVisible=true">查看出车单</el-button>
            </li>
            </span>

                    </ul>
                    <div class="title">
                        <div class="tittle-box">
                            <div class="shu"></div>
                            <span class="title-text">货物信息</span>
                        </div>
                        <div class="dotted"></div>
                    </div>
                    <ul>
                        <li>货物名称 > {{transportTemp.goodsName}}</li>
                        <li>货物类型 > {{transportTemp.goodsType | goodsTypes}}</li>
                        <li>货物总体积 > {{transportTemp.totalVolume}}立方米</li>
                        <li>货物总重量 > {{transportTemp.totalWeight}}kg</li>
                        <li>货物件数 > <span>{{transportTemp.goodsNum}}</span>件/箱/捆</li>
                        <li>货物票数 > <span>{{transportTemp.votes}}</span></li>
                        <!--<li>客户单趟预计价格 > <span>{{transportTemp.contactPrice}}元</span></li>-->

                        <!--<li>司机单趟预计收入 > <span>{{prices}}元</span></li>-->
                        <li v-if="showDistribution && typeof(transportTemp.insuranceFullPrice) != 'undefined'">强险 >
                            <span>{{transportTemp.insuranceFullPrice}}元</span></li>

                        <li>是否需要回单 > {{transportTemp.receipt | isReceipt}}</li>
                        <li v-show="transportTemp.receipt.receiptWay === '' ?false:true">回单方式 >
                            {{transportTemp.receipt.receiptWay}}
                        </li>
                        <li v-show="transportTemp.receipt.receiptWay === '' ?false:true">回单联系人 >
                            {{transportTemp.receipt.receiptContact}}
                        </li>
                        <li v-show="transportTemp.receipt.receiptWay === '' ?false:true">回单联系人电话 >
                            {{transportTemp.receipt.receiptNum}}
                        </li>
                        <li v-show="transportTemp.receipt.receiptWay == '快递'?true:false">回单地址 >
                            {{transportTemp.receipt.address}}
                        </li>
                        <li v-show="transportTemp.receipt.receiptWay == '快递'?true:false">回单快递费方式 >
                            {{transportTemp.receipt.express}}
                        </li>
                    </ul>
                    <div class="title"
                         v-if="this.$route.query.status == 'waiting' || this.$route.query.status == 'running' || this.$route.query.status == 'finished'">
                        <div class="tittle-box">
                            <div class="shu"></div>
                            <span class="title-text">价格信息</span>
                        </div>
                        <div class="dotted"></div>
                    </div>
                    <ul>
                        <li class="l-width"
                            v-if="this.$route.query.status == 'waiting' || this.$route.query.status == 'running' || this.$route.query.status == 'finished'">
                            司机端预计价格 > <span>{{typeof(transportTemp.driverPrice) != 'undefined'?transportTemp.driverPrice:transportTemp.price}}元</span>
                            <!--<li class="l-width" v-if="this.$route.query.status == 'waiting' || this.$route.query.status == 'running' || this.$route.query.status == 'finished'">司机单趟预计价格 > <span>{{transportTemp.contractPrice}}元</span>-->
                        </li>
                        <li class="l-width"
                            v-if="this.$route.query.status == 'waiting' || this.$route.query.status == 'running' || this.$route.query.status == 'finished'">
                            客户报价 > <span>{{transportTemp.contractPrice}}元</span>
                        </li>
                        <!--<li class="l-width"-->
                        <!--v-if="typeof(transportTemp.trackId) == 'undefined' && (this.$route.query.status == 'waiting' || this.$route.query.status == 'running' || this.$route.query.status == 'finished')">-->
                        <!--客户报价 > <span>{{transportTemp.contractPrice}}元</span>-->
                        <!--</li>-->
                        <!--<li class="l-width"-->
                        <!--v-if="typeof(transportTemp.trackId) != 'undefined' && (this.$route.query.status == 'waiting' || this.$route.query.status == 'running' || this.$route.query.status == 'finished')">-->
                        <!--客户报价 > <span>{{transportTemp.price}}元</span>-->
                        <!--</li>-->
                        <li class="l-width"
                            v-if="(this.$route.query.status == 'waiting' || this.$route.query.status == 'running' || this.$route.query.status == 'finished') && transportTemp.valuationParam!= null">
                            报价方式 > {{transportTemp.valuationType | valuationTypes(transportTemp.valuationParam)}}
                        </li>
                        <li class="l-width"
                            v-if="(this.$route.query.status == 'waiting' || this.$route.query.status == 'running' || this.$route.query.status == 'finished') && transportTemp.valuationType == 'BK'&& transportTemp.valuationParam != null">
                            起步价 > {{transportTemp.valuationParam[0].UP}}元
                        </li>
                        <li class="l-width"
                            v-if="(this.$route.query.status == 'waiting' || this.$route.query.status == 'running' || this.$route.query.status == 'finished') && transportTemp.valuationParam != null">
                            单价 > {{transportTemp.valuationParam |
                            valuationParams(transportTemp.valuationType,this.$route.query.status)}}
                        </li>
                    </ul>
                    <div class="title">
                        <div class="tittle-box">
                            <div class="shu"></div>
                            <span class="title-text">配送要求</span>
                        </div>
                        <div class="dotted"></div>
                    </div>
                    <ul>
                        <li>车型 > {{transportTemp.vehicleTypeReq | cayType}}</li>
                        <li>配送经验要求 > {{transportTemp.deliveryExperience}}</li>
                        <li v-if="transportTemp.handlingReq != null">搬运说明 > {{transportTemp.handlingReq.remark}}</li>
                        <li>是否需要拆后座 > {{transportTemp.vehicleAddiReq.isDemolition | isBackDepot}}</li>
                        <li v-if="transportTemp.handlingReq != null">是否需要搬运 > {{transportTemp.handlingReq.isHandling |
                            isBackDepot}}
                        </li>
                        <li v-if="transportTemp.handlingReq != null">是否需要自带小工 > {{transportTemp.handlingReq.isEmployee |
                            isBackDepot}}
                        </li>
                        <li v-if="transportTemp.handlingReq != null">是否需要有人帮忙装货 > {{transportTemp.handlingReq.isInstall
                            | isBackDepot}}
                        </li>
                        <li v-if="transportTemp.handlingReq != null">是否需要有人帮忙卸货 >
                            {{transportTemp.handlingReq.isDischarge | isBackDepot}}
                        </li>
                        <li v-if="transportTemp.handlingReq != null">是否需要小推车 > {{transportTemp.vehicleAddiReq.isTrolley
                            | isBackDepot}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <el-dialog
            title="出车单明细"
            :visible.sync="centerDialogVisible"
            width="600px"
            center>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="trackId" label="出车单编号" align="center"></el-table-column>
                <el-table-column prop="createTime" label="配送日期" :formatter="dateFormat"
                                 align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleClick(scope.row.trackId,scope.row.status)">
                            查看详情
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page.sync="currentPage"
                :page-sizes="[8, 15, 20, 25]"
                :page-size="pagesize"
                layout="total,prev, pager, next,sizes"
                :total="total">
            </el-pagination>
            <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
        </el-dialog>


    </div>

</template>

<script>
    import moment from 'moment'

    export default {
        name: "orderDetails",
        data() {
            return {
                urlParameter: [],
                tableData: [],
                total: 0,
                //数据
                currentPage: 1,
                pagesize: 10,//每页的数据条数
                centerDialogVisible: false,
                finalPrice: 0,
                prices: 0,
                isShow: false,
                bb: false,
                pIndex: 0,
                transportInfos: {},
                transportTemp: {
                    receipt: {
                        receiptWay: ''
                    },
                    location: [
                        {
                            consignee: '',
                            phone: ''
                        }
                    ],
                    vehicleTypeReq: {
                        name: ''
                    },
                    vehicleAddiReq: {
                        isDemolition: ''
                    },
                    handlingReq: {
                        remark: ''
                    }
                },
                arr: [],
                delivered: {
                    // arrivalDepot:{
                    //   address: "",
                    //   createTime: 0,
                    //   status: "arrivalDepot"
                    // },
                    // finishedTransport:{
                    //   address: "",
                    //   createTime: 0,
                    //   status: "finishedTransport"
                    // },
                    // leavedDepot:{
                    //   address: "",
                    //   createTime: 0,
                    //   status: "finishedTransport"
                    // },
                    leaveStatus: [
                        // {
                        //   address:"",
                        //   arriveTime:0,
                        //   consignee:"",
                        //   createTime:0,
                        //   phone:"",
                        //   status:"",
                        //   deliveryImg:[]
                        // }
                    ]
                },
                showDistribution: false,
                fullHeight: document.documentElement.clientWidth,
                loading: true
            }
        },
        methods: {
            istracklist() {
                let page = JSON.stringify({
                    token: this.users.token,
                    pageSize: this.pagesize,
                    pageNum: this.currentPage,
                    transportId: this.transportTemp.id,
                    // transportId:21905270000501,
                })
                this.$http.post(this.global.lightningUrl + '/companyv1/trunkCenter/transport/track/list', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.tableData = res.body.result.rows;
                        this.total = res.body.result.total;
                    }
                })
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.istracklist()
            },
            handleSizeChange(val) {
                this.pagesize = val;
                this.istracklist()
            },
            handleClick(row, status) {
                console.log(row);
                console.log(status);
                this.arr = [];

                console.log(this.arr)
                let trackId = row;

                this.$router.replace({
                    path: '/orderDetails',
                    query: {
                        trackId: trackId,
                        status: status
                    }
                });
                this.trackInfos(trackId);
                this.showDistribution = true;
                this.centerDialogVisible = false;

            },
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            handleResize(event) {
                this.fullHeight = document.documentElement.clientWidth
                console.log(this.fullHeight);
            },
            selectStyle1() {
                this.isShow = false;
                // this.$refs.pop.classList.remove("o-left");
                // this.$refs.pop.classList.remove("d-left");
            },
            selectStyle(i) {
                this.isShow = true;
                // console.log(this.$refs.arrive[i]);
                this.pIndex = i;
                // if(this.delivered.leaveStatus[i].status === 'properDelivery'){
                //   this.$refs.pop.classList.remove("d-left");
                //   this.$refs.pop.classList.add("o-left");
                // }
                // if(this.delivered.leaveStatus[i].status === 'notDeliveredProperly'){
                //   this.$refs.pop.classList.remove("o-left");
                //   this.$refs.pop.classList.add("d-left");
                // }

                console.log(this.$refs)
                // console.log(this.$refs.arrive[i].$el.offsetLeft,this.$refs.pop.offsetWidth,this.$refs.arrive[i].$el.offsetLeft + this.$refs.pop.offsetWidth,this.fullHeight)
                if (this.$refs.arrive[i].$el.offsetLeft + 492 < this.fullHeight) {
                    document.querySelector(".popover").style.left = this.$refs.arrive[i].$el.offsetLeft - this.$refs.arrive[i].$el.offsetWidth / 2 + 'px';
                    document.querySelector(".arrows").style.left = this.$refs.arrive[i].$el.offsetWidth - 8 + 'px';
                } else {
                    document.querySelector(".popover").style.left = this.$refs.arrive[i].$el.offsetLeft - this.$refs.arrive[i].$el.offsetWidth * 2 + 'px';
                    document.querySelector(".arrows").style.left = this.$refs.arrive[i].$el.offsetWidth * 2.5 - 8 + 'px';
                }

                console.log(document.querySelector(".popover"))
                document.querySelector(".popover").style.bottom = this.$refs.arrive[i].$el.offsetHeight + 50
                    + 'px';
            },
            // 转时间戳
            formatDateTime(inputTime) {
                let date = new Date(inputTime);
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                let second = date.getSeconds();
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            },
            // 运输单请求
            transInfos(transportNumber) {
                this.transportTemp = ''
                let transportNumberInfos = JSON.stringify({
                    token: this.users.token,
                    transportId: transportNumber
                });
                console.log(transportNumberInfos);
                this.$http.post(this.global.lightningUrl + '/companyv1/trunkCenter/transport/get', transportNumberInfos, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res)
                    console.log(res.data)
                    // this.transportInfos = res.data.result.location;
                    // res.data.result.transportTemp.handlingReq = JSON.parse(res.data.result.transportTemp.handlingReq);
                    // res.data.result.transportTemp.express = JSON.parse(res.data.result.transportTemp.express);
                    // res.data.result.transportTemp.vehicleAddiReq = JSON.parse(res.data.result.transportTemp.vehicleAddiReq);
                    let locationArr = [];
                    this.loading = false;
                    this.transportTemp = res.data.result.transportTemp;
                    if (this.transportTemp.location[0].type == null || typeof(this.transportTemp.location[0].type) == undefined) {
                        for (let i = 0; i < this.transportTemp.location.length; i++) {
                            if (i > 0) {
                                locationArr.push(this.transportTemp.location[i]);
                                // JSON.parse(JSON.stringify(this.list))
                                //   this.arr =   this.arr.concat(this.transportTemp.location[i])
                            }
                        }
                        this.arr = JSON.parse(JSON.stringify(locationArr));
                    } else {
                        this.arr = JSON.parse(JSON.stringify(this.transportTemp.location));
                    }


                    this.prices = Number(this.transportTemp.price) - 1.99;
                    this.prices = this.prices.toFixed(2)
                    this.finalPrice = Number(this.prices) - Number(this.transportTemp.insuranceFullPrice);
                    if (this.transportTemp.contractPrice == null || this.transportTemp.contractPrice == '') {
                        this.transportTemp.contractPrice = 0
                    }
                    if (this.transportTemp.price === null || this.transportTemp.price === '') {
                        this.transportTemp.contractPrice = 0
                    }
                })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            // 出车单详情
            trackInfos(trackId) {
                this.arr = []
                let trackInfos = JSON.stringify({
                    token: this.users.token,
                    trackId: trackId
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/trunkCenter/transport/track/detail/get', trackInfos, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res)
                    console.log(res.data)
                    let locationArr = [];
                    this.loading = false;
                    this.transportInfos = res.data.result.location;
                    // res.data.result.transportTemp.handlingReq = JSON.parse(res.data.result.transportTemp.handlingReq);
                    // res.data.result.transportTemp.express = JSON.parse(res.data.result.transportTemp.express);
                    // res.data.result.transportTemp.vehicleAddiReq = JSON.parse(res.data.result.transportTemp.vehicleAddiReq);
                    this.transportTemp = res.data.result.transportTemp;
                    if (this.transportTemp.location[0].type == null || typeof(this.transportTemp.location[0].type) == undefined) {
                        for (let i = 0; i < this.transportTemp.location.length; i++) {
                            if (i > 0) {
                                locationArr.push(this.transportTemp.location[i]);
                                // this.arr.push(JSON.parse(JSON.stringify(this.transportTemp.location[i])))
                                // this.arr.push(this.transportTemp.location[i])
                            }
                        }
                        this.arr = JSON.parse(JSON.stringify(locationArr));
                    } else {
                        this.arr = JSON.parse(JSON.stringify(this.transportTemp.location));
                    }
                    this.transportTemp.contractPrice = res.data.result.transportTemp.price;
                    this.transportTemp.price = this.transportTemp.driverPrice;
                    this.prices = (Number(this.transportTemp.price) - Number(1.99)).toFixed(2);
                    this.finalPrice = Number(this.prices) - Number(this.transportTemp.insuranceFullPrice);
                    this.finalPrice = Number(this.transportTemp.price) - Number(this.transportTemp.insuranceFullPrice);
                    // console.log(this.arr)
                })
                    .catch((error) => {
                        console.log(error);
                    });

                this.$http.post(this.global.lightningUrl + '/companyv1/roadTrace/state/allStatus', trackInfos, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    // console.log(res);

                    this.delivered = res.data.result;
                    if (this.delivered.arrivalDepot.address == null) {
                        this.delivered.arrivalDepot.address = ''
                    }
                    if (this.delivered.leavedDepot.address == null) {
                        this.delivered.leavedDepot.address = ''
                    }

                }).catch((error) => {
                    console.log(error);
                });
            },
            // 将监听操作写在methods里面，removeEventListener取消监听内容必须跟开启监听保持一致，所以函数拿到methods里面写
            goBack() {
                // this.$router.replace({path: '/'});
                //replace替换原路由，作用是避免回退死循环
                this.showDistribution = false;
                let transportNumber = this.$route.query.transportNumber;
                if (typeof(transportNumber) !== 'undefined') {
                    this.transInfos(transportNumber);
                }

                let trackId = this.$route.query.trackId;
                if (typeof(trackId) !== 'undefined') {
                    this.trackInfos(trackId);
                    this.showDistribution = true;
                }
            }

        },
        filters: {
            valuationParams(val, style, status) {
                console.log(style)
                if (status == 'waiting' || status == 'running' || status == 'finished') {
                    switch (style) {
                        case 'BK':
                            if (typeof(val) != "undefined") {
                                // val = JSON.parse(val)
                                let str = '';
                                if (typeof(val[0].UK) != "undefined") {
                                    str += '超出' + val[0].UK + '公里,' + val[0].OKP + '元/公里; '
                                }
                                if (typeof(val[0].UIT) != "undefined") {
                                    str += '超出' + val[0].UIT + '点,' + val[0].OPP + '元/点; '
                                }
                                if (typeof(val[0].UW) != "undefined") {
                                    str += '超出' + val[0].UW + 'kg,' + val[0].OWP + '元/kg; '
                                }
                                if (typeof(val[0].UV) != "undefined") {
                                    str += '超出' + val[0].UV + 'm³,' + val[0].OVP + '元/m³; '
                                }
                                if (typeof(val[0].UT) != "undefined") {
                                    str += '超出' + val[0].UT + '票,' + val[0].OTP + '元/票; '
                                }
                                return str;
                            }
                            break;
                        case 'BV':
                            if (typeof(val) != "undefined") {
                                // val = JSON.parse(val)
                                let str = val[0].VP + '元';
                                return str;
                            }
                            break;
                        case 'BP':
                            if (typeof(val) != "undefined") {
                                // val = JSON.parse(val)
                                let str = val[0].PP + '元/件';
                                return str;
                            }
                            break;
                        case 'BT':
                            if (typeof(val) != "undefined") {
                                // val = JSON.parse(val)
                                let str = val[0].TP + '元/票';
                                return str;
                            }
                            break;
                        default:
                            if (typeof(val) != "undefined") {
                                // val = JSON.parse(val)
                                if (typeof(val[0].HRF) != "undefined") {
                                    let str = '4小时' + val[0].FHP + '元';
                                    return str;
                                }
                                if (typeof(val[0].HRN) != "undefined") {
                                    let str = '9小时' + val[0].NHP + '元';
                                    return str;
                                }
                                if (typeof(val[0].HRT) != "undefined") {
                                    let str = '13小时' + val[0].THP + '元';
                                    return str;
                                }
                            }
                    }
                }
            },
            valuationTypes(val, data) {
                if (data != null) {
                    // data = JSON.parse(data)
                    switch (val) {
                        case 'BK':
                            let str = '起步价+超出部分,'
                            if (typeof(data.UK) != "undefined") {
                                str += '超公里,'
                            }
                            if (typeof(data.UIT) != "undefined") {
                                str += '超点位,'
                            }
                            if (typeof(data.UW) != "undefined") {
                                str += '超重量,'
                            }
                            if (typeof(data.UV) != "undefined") {
                                str += '超体积,'
                            }
                            if (typeof(data.UV) != "undefined") {
                                str += '超票数,'
                            }
                            return str.substring(0, str.length - 1);
                        case 'BV':
                            return '整车';
                        case 'BP':
                            return '件';
                        case 'BT':
                            return '票';
                        default:
                            let str1 = ''
                            if (typeof(data.HRF) != "undefined") {
                                return str1 = '4小时'
                            }
                            if (typeof(data.HRN) != "undefined") {
                                return str1 = '9小时'
                            }
                            if (typeof(data.HRT) != "undefined") {
                                return str1 = '13小时'
                            }
                    }
                }
            },
            cayType(val) {
                if (Object.prototype.toString.call(val) === '[object Array]') {
                    let str = '';
                    for (let i = 0; i < val.length; i++) {
                        str += val[i].name + ' ' + val[i].isElectric + ' ' + val[i].length + ' ' + val[i].isCertificate + ' ' + val[i].isTailBoard + ' ' + val[i].isCold + ' / ';
                    }

                    return str.substring(0, str.length - 3);
                } else {
                    let obj = val;
                    let str = '';
                    str = obj.name + ' ' + obj.isElectric + ' ' + obj.length + ' ' + obj.isCertificate + ' ' + obj.isTailBoard + ' ' + obj.isCold;
                    return str;
                }

            },
            status(val, id) {
                console.log(val, id);
                if (val === "robbing") {
                    return '抢单中'
                }

                if (val === "waiting") {
                    if (typeof(id) !== 'undefined') {
                        return '待配送'
                    } else {
                        return '在跑'
                    }
                }

                if (val === "running") {
                    return '配送中'
                }

                if (val === "finished") {
                    if (typeof(id) !== 'undefined') {
                        return '配送完成'
                    } else {
                        return '已完成'
                    }
                }

                if (val === "expired") {
                    if (typeof(id) !== 'undefined') {
                        return '司机未签到'
                    } else {
                        return '抢单超时'
                    }
                }
                if (val === "canceled") {
                    return '已取消'
                }
                if (val === "matching") {
                    return '无匹配司机'
                }
                if (val === "matched") {
                    return '已重新推送'
                }
            },
            isBackDepot(val) {
                if (val == 0) {
                    return '否';
                }
                if (val == 1) {
                    return '是';
                }
            },
            goodsTypes(val) {
                if (typeof(val) !== 'undefined') {
                    let str = '';
                    // console.log(val.length)
                    for (let i = 0; i < val.length; i++) {
                        str += val[i] + ',';
                    }
                    return str.substring(0, str.length - 1);
                }
            },
            isReceipt(val) {
                console.log(val)
                if (typeof(val) !== 'undefined') {
                    if (val.receiptWay === "") {
                        return '否';
                    } else {
                        return '是';
                    }
                }
            }
        },
        mounted() {
            window.addEventListener('resize', this.handleResize)
            this.users = JSON.parse(Base64.decode(sessionStorage.getItem('key'))).result;
            let transportNumber = this.$route.query.transportNumber;
            if (typeof(transportNumber) !== 'undefined') {
                this.transInfos(transportNumber);
            }
            let trackId = this.$route.query.trackId;
            if (typeof(trackId) !== 'undefined') {
                this.trackInfos(trackId);
                this.showDistribution = true;
            }
            console.log(this.showDistribution);

            // 挂载完成后，判断浏览器是否支持popstate
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);
            }


        },
        // 页面销毁时，取消监听。否则其他vue路由页面也会被监听
        destroyed() {
            window.removeEventListener('popstate', this.goBack, false);
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.handleResize)
        },

        // beforeRouteLeave(to, from, next) {
        //   // 设置下一个路由的 meta
        //   to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
        //   next();
        // }
        beforeUpdate() {
            if (this.$route.query.transportNumber != undefined) {
                let transportNumber = this.$route.query.transportNumber;
                let status = this.$route.query.status;
                // console.log('beforeUpdate 9999 +++'+transportNumber,status)
                this.urlParameter = [transportNumber, status]
            }

        },
    }
</script>

<style lang="scss">
    .orderDetails {
        .container_border {
            padding: 30px 0;
            width: 100%;
        }
        p {
            display: block;
        }
        .el-step.is-center .el-step__description {
            padding-left: 5%;
            padding-right: 5%;
        }
        .o-position {
            position: relative;
        }
        .post {
            position: absolute;
            bottom: 0;
            font-size: 14px;
            text-align: left;
            padding: 10px;
            box-sizing: border-box;
            box-shadow: 0 8px 12px 2px rgba(0, 0, 0, 0.05);
            border-radius: 5px;
            transition: top 0.01s linear 0.01s;
        }
        .o-left {
            /*top:45px;*/
            /*top:35px;*/
            /*bottom: 35px;*/
        }
        .d-left {
            /*top:170px;*/
        }
        .arrows {
            position: absolute;
            bottom: -8px;
            /*left:118px;*/
            overflow: hidden;
            width: 13px;
            height: 13px;
            background: white;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        .popover {
            /*min-height: 100px;*/
            border: 1px solid #e5e5e5;
            width: 492px;
            background: #fff;
            z-index: 100;
            p {
                span {
                    word-wrap: break-word;
                    overflow: hidden;
                }
            }
            .d-pic {
                margin-top: 5px;
                img {
                    width: 150px;
                    height: 150px;
                    margin-right: 10px;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
        /*padding:20px 20px;*/
        .orderDetail {
            /*border: 1px solid #e5e5e5;*/
            /*border-radius: 20px;*/
            .title {
                display: flex;
                align-items: center;
                margin: 10px 100px;
                .tittle-box {
                    display: flex;
                    align-items: center;
                }
                .shu {
                    display: inline-block;
                    width: 7px;
                    height: 20px;
                    background: #409EFF;
                }
                .title-text {
                    margin: 0 20px;
                    font-size: 18px;
                    font-weight: 700;
                }
                .dotted {
                    flex: 1;
                    display: inline-block;
                    border: 1px dashed #d4d4d4;
                }
            }
            .l-width {
                width: 100%;
            }
            .el-step__title.is-finish {
                color: rgba(0, 0, 0, 0.65);
            }
            .el-step__title.is-process {
                font-weight: 400;
                color: rgba(0, 0, 0, 0.65);
            }
            .el-step__title.is-wait {
                color: rgba(0, 0, 0, 0.65);
            }
            .el-step__description.is-wait {
                color: rgba(0, 0, 0, 0.65);
            }
            .el-step__description {
                white-space: pre-line;
            }
            .step01, .step02, .step03, .step04, .step05 {
                width: 36px;
                height: 32px;
                display: inline-block;
            }
            .step01 {
                background: url("../../images/io_finish.png") no-repeat center;
            }
            .step02 {
                background: url("../../images/io_dcqd.png") no-repeat center;
            }
            .step03 {
                background: url("../../images/io_lc.png") no-repeat center;
            }
            .step04 {
                background: url("../../images/io_tt.png") no-repeat center;
            }
            .step05 {
                background: url("../../images/ic_wtt.png") no-repeat center;
            }
            p {
                height: 100px;
                line-height: 100px;
                text-align: center;
                /*border-bottom: 1px solid #e5e5e5;*/
                margin: 0 50px;
                padding: 0 50px;
                font-weight: 700;
                font-size: 20px;
            }
            ul {
                overflow: hidden;
                /*border-bottom: 1px solid #e5e5e5;*/
                margin: 0 50px;
                padding: 0 50px;
                &:last-child {
                    border-bottom: none;
                }
                li {
                    float: left;
                    width: 33.33%;
                    min-height: 60px;
                    display: flex;
                    align-items: center;
                    word-break: break-all;
                    white-space: normal;
                    span {
                        font-size: 18px;
                        color: #409EFF;

                    }
                }
                .iconfont {
                    font-size: 24px;
                }
                .flex {
                    display: flex;
                    align-items: center;
                }
            }
            .transport-route {

                .step9, .step10 {
                    width: 24px;
                    height: 26px;
                    display: inline-block;
                }
                .step9 {
                    background: url("../../images/ic_begin1.png") no-repeat center;
                }
                .step10 {
                    background: url("../../images/ic_finish1.png") no-repeat center;
                }
            }
            .el-step.is-vertical .el-step__head {
                height: 40px;
            }
            .car-type {
                li {
                    margin: 20px 0;
                    min-height: 96px;
                }
            }
        }
        .o-step {
            .el-step__icon.is-icon {
                width: 36px;
                height: 32px;
            }
        }
        .el-step__icon {
            background: transparent;
        }
    }
</style>
