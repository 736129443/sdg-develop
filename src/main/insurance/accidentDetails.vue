<template>
    <div class="main">
        <div class="header">当前位置： 事故中心 > 事故详情 </div>
        <div class="center" >
            <div class="accidentDetails-top accidentDetails">
                <p class="acc-title">处理进度</p>
                <el-steps align-center slot="reference">
                    <el-step title="客服创建事故" v-if="typeof(detailsData.customerCreateTime) != 'undefined'" :description="formatDateTime(detailsData.customerCreateTime)" icon="iconfont icon-people"><i class="step01" slot="icon"></i></el-step>
                    <el-step title="司机上传资料" v-if="typeof(detailsData.driverCreateTime) != 'undefined'" :description="formatDateTime(detailsData.driverCreateTime)" icon="iconfont icon-people"><i class="step02" slot="icon"></i></el-step>
                    <el-step title="审核" v-if="typeof(detailsData.auditTime) != 'undefined'" :description="formatDateTime(detailsData.auditTime)" icon="iconfont icon-people"><i class="step03" slot="icon"></i></el-step>
                    <el-step title="金融部总监审批" v-if="typeof(detailsData.chiefAuditTime) != 'undefined'" :description="formatDateTime(detailsData.chiefAuditTime)" icon="iconfont icon-people"><i class="step04" slot="icon"></i></el-step>
                </el-steps>
            </div>
            <div class="accidentDetails-main accidentDetails">
                <p class="acc-title">事故信息</p>
                <ul class="a-ul clear">
                    <li>事故来源反馈> <span>{{detailsData.reportSource}}</span></li>
                    <li>事故反馈方式> <span>{{detailsData.reportStyle}}</span></li>
                    <li></li>
                    <li>事故发生时间> <span v-if="typeof(detailsData.accidentTime) != 'undefined'">{{formatDateTime(detailsData.accidentTime)}}</span></li>
                    <li>事故反馈人> <span>{{detailsData.reporter}}</span></li>
                    <li>反馈人电话> <span>{{detailsData.reporterPhone}}</span></li>
                </ul>
                <ul>
                    <li>事故类型> <span>{{detailsData.accidentType}}</span></li>
                    <li>事故描述> <span>{{detailsData.accidentDescription}}</span></li>
                </ul>
                <ul>
                    <li>出车单编号> <span>{{detailsData.trackId}}</span></li>
                </ul>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="driverName"
                            label="司机姓名"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="driverPhone"
                            label="司机电话"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="adminName"
                            label="运营专员">
                    </el-table-column>
                    <el-table-column
                            prop="adminPhone"
                            label="运营电话">
                    </el-table-column>
                    <el-table-column
                            prop="projectName"
                            label="运营专员">
                    </el-table-column>
                    <el-table-column
                            prop="projectPhone"
                            label="项目电话">
                    </el-table-column>
                    <el-table-column
                            width="300"
                            prop="customerInsurance"
                            label="客户投保"
                            :formatter="changeCustomerInsures"
                            >
                    </el-table-column>
                    <el-table-column
                            width="300"
                            prop="driverInsurance"
                            label="司机投保">
                    </el-table-column>
                </el-table>
            </div>
            <div class="accidentDetails-section accidentDetails">
                <p class="acc-title">司机理赔资料</p>
                <div class="clear">
                    <div class="pic-box">
                        <p class="pic-title">承运车辆照片</p>
                        <div class="clear">
                            <div class="little-box" v-for="(n, index) in imageList1" :data-index="index">
                                <img class="headPic" @click="open1($event)" :src="n.url" :onerror="defaultImg">
                                <span>{{n.content}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="pic-box">
                        <p class="pic-title">货损照片</p>
                        <div class="clear">
                            <div class="little-box" v-for="(n, index) in imageList2" :data-index="index">
                                <img class="headPic" @click="open2($event)" :src="n.url" :onerror="defaultImg">
                                <span>{{n.content}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clear">
                    <div class="pic-box">
                        <p class="pic-title">运输资料</p>
                        <div class="clear">
                            <div class="little-box" v-for="(n, index) in imageList3" :data-index="index">
                                <img class="headPic" @click="open3($event)" :src="n.url" :onerror="defaultImg">
                                <span>{{n.content}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="pic-box">
                        <p class="pic-title">其他资料</p>
                        <div class="clear">
                            <div class="little-box" v-for="(n, index) in imageList4" :data-index="index">
                                <img class="headPic" @click="open4($event)" :src="n.url" :onerror="defaultImg">
                                <span>{{n.content}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="accidentDetails-main accidentDetails">
                <p class="acc-title">事故判定</p>
                <ul>
                    <li>事故调查记录> <span>{{detailsData.inquireRecord}}</span></li>
                    <li>是否可判定为事故>{{detailsData.isAccident | isInsurance1}}</li>
                </ul>
            </div>
            <div class="accidentDetails-footer accidentDetails">
                <p class="acc-title">赔付处理</p>
                <div class="acc-foot-box clear">
                    <div class="acc-foot">
                        <p class="acc-foot-title">罚司机金额</p>
                        <div class="acc-box">
                            <p>司机基础运费价格(不含税): <span>￥</span><span>{{detailsData.driverBasicFee}}</span></p>
                            <p>罚司机金额: <span>￥</span><span>{{detailsData.penaltyDriverFee}}</span></p>
                            <span class="acc-foot-active">*</span><span>司机是否出险:{{detailsData.isDriverInsureOut | isInsurance}}</span>
                        </div>
                    </div>
                    <div class="acc-foot acc-float">
                        <p class="acc-foot-title">赔客户金额</p>
                        <div class="acc-box">
                            <p>客户基础运费价格(不含税): <span>￥</span><span>{{detailsData.customerBasicFee}}</span></p>
                            <p>赔客户金额: <span>￥</span><span>{{detailsData.compensateOffline}}</span></p>
                            <span class="acc-foot-active">*</span><span>客户是否出险:{{detailsData.isCustomerInsureOut | isInsurance}}</span>
                        </div>
                    </div>
                </div>
                <!--<p class="foot-title">事故最终损失: <span>￥</span><span>500.00</span></p>-->
            </div>
        </div>
    </div>
</template>
<script>
    import fancyBox from "vue-fancybox"
export default {
    created(){
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
    },
    data (){
        return{
            token:'',
            detailsData:{},
            defaultImg: 'this.src="' + require('../../images/MR.png') + '"',
            tableData: [],
            imageList1:[],
            imageList2:[],
            imageList3:[],
            imageList4:[]
        }
    },
    methods:{
        changeCustomerInsures(row){
            if(typeof(row.customerInsurance) != 'undefined' && row.customerInsurance != ''){
                return row.customerInsurance;
            }else{
                return '否';
            }
        },
        init(accidentId){
            let page = JSON.stringify({
                token : this.token,
                id:accidentId
            });
            console.log(page);
            this.$http.post( this.global.lightningUrl + '/companyv1/insurance/accident/detail',page ,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            } ).then((res)=>{
                console.log(res);
                this.detailsData = res.data.result;
                this.tableData.push(res.data.result);
                let timestamp=new Date().getTime();
                this.imageList1=[
                    { width: 1024, height: 700, url: res.data.result.frontLeftPic+'?timestamp='+timestamp,content:"前左侧45度"},
                    { width: 1024, height: 700, url: res.data.result.frontRightPic+'?timestamp='+timestamp,content:"前右侧45度"},
                    { width: 1024, height: 700, url: res.data.result.backLeftPic+'?timestamp='+timestamp,content:"后左侧45度"},
                    { width: 1024, height: 700, url: res.data.result.backRightPic+'?timestamp='+timestamp,content:"后右侧45度"},
                ];
                this.imageList2=[
                    { width: 1024, height: 700, url: res.data.result.goodsPic+'?timestamp='+timestamp,content:"货物整体照片"},
                    { width: 1024, height: 700, url: res.data.result.goodsNameplatePic+'?timestamp='+timestamp,content:"货物铭牌/型号/标签"},
                    { width: 1024, height: 700, url: res.data.result.goodsDetailPic+'?timestamp='+timestamp,content:"货物受损细节图"},
                ];
                this.imageList3=[
                    { width: 1024, height: 700, url: res.data.result.transportPic+'?timestamp='+timestamp,content:"运单"},
                    { width: 1024, height: 700, url: res.data.result.goodsSendPic+'?timestamp='+timestamp,content:"货物出库单"},
                    { width: 1024, height: 700, url: res.data.result.goodsReceivePic+'?timestamp='+timestamp,content:"接收方货物单"},
                ];
                this.imageList4=[
                    { width: 1024, height: 700, url: res.data.result.goodsValueEvidencePic+'?timestamp='+timestamp,content:"货物价值证明"},
                    { width: 1024, height: 700, url: res.data.result.responsibilityConfirmationPic+'?timestamp='+timestamp,content:"出警/立案事故责任单"},
                ];
            })
        },
        formatDateTime(inputTime) {
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
        open1 (e) {
            fancyBox(e.target, this.imageList1);
        },
        open2 (e) {
            fancyBox(e.target, this.imageList2);
        },
        open3 (e) {
            fancyBox(e.target, this.imageList3);
        },
        open4 (e) {
            fancyBox(e.target, this.imageList4);
        },
    },
    mounted(){
        let accidentId = this.$route.query.id;
        this.init(accidentId);
    },
    filters:{
        isInsurance(val){
            if(val === 1){
                return '是'
            }
            if(val === 0){
                return '否'
            }
        },
        isInsurance1(val){
            if(val === 1){
                return '是'
            }
            if(val === 2){
                return '否'
            }
        }
    }
}
</script>
<style lang="scss">
    .header{
        margin-bottom: 20px;
    }
    .center{
        .accidentDetails{
            padding: 30px;
            background: #fff;
            margin-bottom: 15px;
            .acc-title{
                font-size:20px;
                font-weight: 700;
                color:#505050;
            }
        }
        .accidentDetails-top{
            .el-step__title.is-wait{
                color:#434343;
            }
            .el-step__icon.is-icon{
                width: 28px;
                height: 26px;
            }
            .step01,.step02,.step03,.step04{
                width: 26px;
                height: 26px;
                display: inline-block;
            }
            .step01{background: url("../../images/ic_found.png") no-repeat center;}
            .step02{background: url("../../images/ic_upload.png") no-repeat center; }
            .step03{background: url("../../images/ic_examine.png") no-repeat center;}
            .step04{background: url("../../images/ic_pass.png") no-repeat center;}
        }
        .accidentDetails-main{
            ul{
                color: #434343;
                padding: 20px 0 0;
                li{
                    height: 30px;
                    line-height: 30px;
                }
            }
            .a-ul{
                li{
                    width: 33.33%;
                    float: left;
                }
            }
            .el-table th{
                text-align: center;
            }
            .el-table{
                margin-top: 15px;
            }
        }
        .accidentDetails-section{
            .pic-box{
                color: #434343;
                margin-top: 20px;
                float: left;
                width: 50%;
                .pic-title{
                    font-size: 18px;
                    font-weight: 700;
                    color:#505050;
                    margin-bottom: 10px;
                    display: block;
                }
                .little-box{
                    float: left;
                    margin-right: 10px;
                    width: 150px;
                    img{
                        width: 100%;
                        display: block;
                    }
                    span{
                        display: inline-block;
                        width: 100%;
                        text-align: center;
                    }
                    &:last-child{
                        margin-right:0;
                    }
                }
            }
        }
        .accidentDetails-footer{
            color: #434343;
            .acc-foot-box{
                padding: 20px;
                .acc-foot{
                    float: left;
                    background: #f5f6fa;
                    padding: 30px 30px 30px 50px;
                    width: 40%;
                    p{
                        display: block;
                    }
                    .acc-foot-title{
                        font-size: 18px;
                        font-weight: 700;
                        color:#505050;
                    }
                    .acc-box{
                        margin-top: 10px;
                        p{
                            line-height: 30px;
                            span{
                                font-weight: 700;

                            }
                        }
                        .acc-foot-active{
                            color:red;
                        }
                    }
                }
                .acc-float{
                    float: right;
                }
            }
            .foot-title{
                padding-left: 20px;
                span{
                    font-weight: 700;
                }
            }
        }
        .clear:after{
            content:'';
            display:block;
            clear:both;
            height:0;
            overflow:hidden;
            visibility:hidden;
        }
        .clear{
            zoom:1;
        }
    }
</style>