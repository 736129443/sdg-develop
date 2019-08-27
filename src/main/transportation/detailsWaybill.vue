<template>
    <div class="main detailsWaybill">
        <div class="header">
            当前位置：<span>无车承运数据>电子运单>详情</span>
        </div>
        <div class="tits">
            <span class="top">配送状态</span>
            <el-steps align-center slot="reference">
                <el-step title="托运日期时间" icon="iconfont icon-zhongdian-copy" :description="transformTime(Number(datas.consignmentDateTime))"><i class="step01" slot="icon"></i></el-step>
                <el-step title="发运实际日期时间" icon="iconfont icon-zhongdian-copy" :description="transformTime(Number(datas.despatchActualDateTime))"><i class="step02" slot="icon" ></i></el-step>
                <el-step title="收货日期时间" icon="iconfont icon-zhongdian-copy" :description="transformTime(Number(datas.goodsReceiptDateTime))"><i class="step03" slot="icon"></i></el-step>
            </el-steps>
        </div>
        <div class="content">
            <!--基本信息-->
            <div class="basic">
                <span class="content_tit">基本信息</span>
                <ul>
                    <li>
                        <span>原始单号：</span>
                        <span>{{datas.originalDocumentNumber}}</span>
                    </li>
                    <li>
                        <span>托运单号：</span>
                        <span>{{datas.shippingNoteNumber}}</span>
                    </li>
                    <li>
                        <span>承运人：</span>
                        <span>{{datas.carrier}}</span>
                    </li>
                    <li>
                        <span>统一社会信用代码：</span>
                        <span>{{datas.unifiedSocialCreditIdentifier}}</span>
                    </li>
                    <li>
                        <span>许可证编号：</span>
                        <span>{{datas.permitNumberNoTruck}}</span>
                    </li>
                    <li>
                        <span>业务类型：</span>
                        <span>{{datas.businessTypeCode}}</span>
                    </li>
                    <!--<li>-->
                        <!--<span>联系电话：</span>-->
                        <!--<span>{{}}</span>-->
                    <!--</li>-->
                </ul>
            </div>
            <!--收发货信息-->
            <div class="basic">
                <span class="content_tit">收发货信息</span>
                <ul>
                    <li>
                        <span>发货人：</span>
                        <span>{{datas.consignor}}</span>
                    </li>
                    <li>
                        <span>身份证号：</span>
                        <span>{{datas.personalIdentityDocument}}</span>
                    </li>
                    <li>
                        <span>发货地地区：</span>
                        <span>{{datas.countrySubdivisionCodeFrom}}</span>
                    </li>
                    <li>
                        <span>装货地点：</span>
                        <span>{{datas.placeOfLoading}}</span>
                    </li>
                    <li>
                        <span>收货人：</span>
                        <span>{{datas.consignee}}</span>
                    </li>
                    <li>
                        <span>收货地地区：</span>
                        <span>{{datas.countrySubdivisionCodeTo}}</span>
                    </li>
                    <li>
                        <span>收货地点：</span>
                        <span>{{datas.goodsReceiptPlace}}</span>
                    </li>
                </ul>
            </div>
            <!--车辆信息-->
            <div class="basic">
                <span class="content_tit">车辆信息</span>
                <ul>
                    <li>
                        <span>牌照类型：</span>
                        <span>{{datas.licensePlateTypeCode}}</span>
                    </li>
                    <li>
                        <span>车辆牌照号：</span>
                        <span>{{datas.vehicleNumber}}</span>
                    </li>
                    <li>
                        <span>车辆分类：</span>
                        <span>{{datas.vehicleClassificationCode}}</span>
                    </li>
                    <li>
                        <span>车辆载质量(千克)：</span>
                        <span>{{datas.vehicleTonnage}}</span>
                    </li>
                    <li>
                        <span>道路运输证号：</span>
                        <span>{{datas.roadTransportCertificateNumber}}</span>
                    </li>
                    <li>
                        <span>挂车牌照号：</span>
                        <span>{{datas.trailerVehiclePlateNumber}}</span>
                    </li>
                    <li>
                        <span>所有人：</span>
                        <span>{{datas.owner}}</span>
                    </li>
                    <li>
                        <span>许可证编号：</span>
                        <span>{{datas.permitNumberOwner}}</span>
                    </li>
                    <li>
                        <span>驾驶员姓名：</span>
                        <span>{{datas.nameOfPerson}}</span>
                    </li>
                    <li>
                        <span>从业资格证号：</span>
                        <span>{{datas.qualificationCertificateNumber}}</span>
                    </li>
                    <li>
                        <span>电话号码：</span>
                        <span>{{datas.telephoneNumber}}</span>
                    </li>
                </ul>
            </div>
            <!--货物类型-->
            <div class="basic">
                <span class="content_tit">货物信息</span>
                <ul>
                    <li>
                        <span>货物名称：</span>
                        <span>{{datas.descriptionOfGoods}}</span>
                    </li>
                    <li>
                        <span>货物类型：</span>
                        <span>{{datas.cargoTypeClassificationCode}}</span>
                    </li>
                    <li>
                        <span>货物体积(立方米)：</span>
                        <span>{{datas.cube}}</span>
                    </li>
                    <li>
                        <span>货物毛重(千克)：</span>
                        <span>{{datas.goodsItemGrossWeight}}</span>
                    </li>
                    <li>
                        <span>货物件数(个)：</span>
                        <span>{{datas.totalNumberOfPackages}}</span>
                    </li>
                    <!--<li>-->
                        <!--<span>备注：</span>-->
                        <!--<span>{{}}</span>-->
                    <!--</li>-->
                </ul>
            </div>
            <!--价格信息-->
            <div class="basic">
                <span class="content_tit">价格信息</span>
                <ul>
                    <li>
                        <span>货币总金额(元)：</span>
                        <span>{{datas.totalMonetaryAmount}}</span>
                    </li>
                    <li>
                        <span>备注：</span>
                        <span>{{datas.remark}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        //运单详情
        name: "detailsWaybill",
        data(){
            return{
                row:{},
                datas:{},
                classification:[//车辆分类
                    {name:'普通货车',id:'H01'},
                    {name:'厢式货车',id:'H02'},
                    {name:'罐式货车',id:'H04'},
                    {name:'牵引车',id:'Q00'},
                    {name:'普通挂车',id:'G01'},
                    {name:'集装箱挂车',id:'G05'},
                    {name:'仓栅式货车',id:'H09'},
                    {name:'封闭货车',id:'H03'},
                    {name:'平板货车',id:'H05'},
                    {name:'集装箱车',id:'H06'},
                    {name:'自卸货车',id:'H07'},
                    {name:'特殊结构货车',id:'H08'},
                    {name:'专项作业车',id:'Z00'},
                    {name:'厢式挂车',id:'G02'},
                    {name:'仓栅式挂车',id:'G07'},
                    {name:'平板挂车',id:'G04'},
                    {name:'自卸挂车',id:'G06'},
                    {name:'专项作业挂车',id:'G09'},
                    {name:'车辆运输车',id:'X91'},
                    {name:'车辆运输车(单排)',id:'X92'},
                ],
                business:[
                    {name:'干线普货运输',id:'1002996'} ,
                    {name:'城市配送',id:'1003997'} ,
                    {name:'农村配送',id:'1003998'} ,
                    {name:'集装箱运输',id:'1002998'} ,
                    {name:'其他',id:'1003999'}
                ],
                brand:[
                    {name:'大型汽车号牌',id:'01'} ,
                    {name:'小型汽车号牌',id:'02'} ,
                    {name:'其他号牌',id:'99'} ,
                ],
                brand:[
                    {name:'大型汽车号牌',id:'01'} ,
                    {name:'小型汽车号牌',id:'02'} ,
                    {name:'其他号牌',id:'99'} ,
                ],
                goods:[
                    {name:'电子产品',id:'90'} ,
                    {name:'商品汽车',id:'92'} ,
                    {name:'冷藏货物',id:'93'} ,
                    {name:'大宗货物',id:'94'} ,
                    {name:'快速消费品',id:'95'} ,
                    {name:'农产品',id:'96'} ,
                    {name:'其他',id:'999'} ,
                ]
            }
        },
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm");
            }
        },
        created() {
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
        },
        mounted() {
            this.data();

            // console.log(this.transformTime(Number(datas.originalDocumentNumber)));
        },
        methods:{
            transformTime(timestamp = +new Date()) {
                if (timestamp) {
                    var time = new Date(timestamp);
                    var y = time.getFullYear();
                    var M = time.getMonth() + 1;
                    var d = time.getDate();
                    var h = time.getHours();
                    var m = time.getMinutes();
                    var s = time.getSeconds();
                    return y + '-' + this.addZero(M) + '-' + this.addZero(d) + ' ' + this.addZero(h) + ':' + this.addZero(m) + ':' + this.addZero(s);
                } else {
                    return '';
                }
            },
            addZero(m) {
                return m < 10 ? '0' + m : m;
            },
            data() {
                // this.datas = this.$route.query.info;
                // this.transformTime(Number(this.datas.originalDocumentNumber));
                // console.log(this.$route.query.info);
                // console.log(Base64.decode(this.$route.query.lest));

                let page = JSON.stringify({
                    token:this.token,
                    shippingNoteNumber:Base64.decode(this.$route.query.info),
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/truckBroker/truck/get',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res.body.result);
                    if (res.body.errcode == 0) {
                        this.datas = res.body.result;
                        this.datas.countrySubdivisionCodeFrom = res.body.result.from;
                        this.datas.countrySubdivisionCodeTo = res.body.result.to;
                        for (var i in this.business) {
                            if (this.business[i].id == this.datas.businessTypeCode) {
                                this.datas.businessTypeCode = this.business[i].name
                            }
                        }
                        for (var i in this.brand) {
                            if (this.brand[i].id == this.datas.licensePlateTypeCode) {
                                this.datas.licensePlateTypeCode = this.brand[i].name
                            }
                        }
                        for (var i in this.classification){
                            if (this.classification[i].id == this.datas.vehicleClassificationCode) {
                                this.datas.vehicleClassificationCode = this.classification[i].name
                            }
                        }
                        for (var i in this.goods){
                            if (this.goods[i].id == this.datas.cargoTypeClassificationCode) {
                                this.datas.cargoTypeClassificationCode = this.goods[i].name
                            }
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .detailsWaybill{
        background:white ;
        .tits{
            padding-top:50px;
            .top{
                font-size:20px;
                font-weight: bold;
                text-align: center;
                display: block;
                padding-bottom:20px;
            }
            .step01,.step02,.step03{
                width: 36px;
                height: 32px;
                display: inline-block;
            }
            .step01{background: url("../../images/io_finish.png") no-repeat center;}
            .step02{background: url("../../images/io_dcqd.png") no-repeat center; }
            .step03{background: url("../../images/io_lc.png") no-repeat center;}
        }
        .content{
            padding:20px;
            .content_tit{
                padding:30px 0 0 20px;
                font-weight: bold;
                font-size: 20px;
                display: block;
            }
            .basic{
                background: #EAEDF2;
                margin:20px 0;
                ul{
                    padding:20px;
                    overflow: hidden;
                    li{
                        width:32%;
                        padding:20px 0;
                        float: left;
                    }
                }
            }
        }
    }
</style>