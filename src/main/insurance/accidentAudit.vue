<template>
    <div class="main" >
        <div v-loading="loading" element-loading-text="审核中,请稍等...">
        <div class="header">当前位置： 事故中心 > 金融部总监审核 </div>
        <div class="center" >
            <div class="container_box">
                <div class="title">事故信息</div>
                <div class="box">
                    <div class="content">
                        <div>事故反馈来源> <span>{{reportSource}}</span> </div>
                        <div>事故反馈方式> <span>{{reportStyle}}</span></div>
                    </div>
                    <div class="content">
                        <div>事故发生时间> <span>{{accidentTime|val}}</span> </div>
                        <div>事故反馈人> <span>{{reporter}}</span></div>
                        <div>反馈人电话> <span>{{reporterPhone}}</span></div>
                    </div>
                </div>

                <div class="box">
                    <div class="content">
                        <div>事故类型> <span>{{accidentType}}</span></div>
                    </div>
                    <div class="content">
                        <div>事故描述> <span>{{accidentDescription}}</span> </div>
                    </div>
                </div>
                <div class="box">
                    <div class="content" style="margin:0 0 10px 0">
                        <div>出车单编号> <span>{{trackId}}</span></div>
                    </div>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            border>
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
                        >
                        </el-table-column>
                        <el-table-column
                                width="300"
                                prop="driverInsurance"
                                label="司机投保"
                        >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="container_box">
                <div class="title">司机理赔资料</div>
                <div class="box">
                    <div class="titles">
                        <div>承运车辆照片</div>
                        <div>货损照片</div>
                    </div>
                    <div class="contentImg">
                        <div class="imgBox">
                            <div class="list" v-for="(n, index) in imageList" :data-index="index">
                                <img @click="open($event)" :src="n.url" :onerror="defaultImg">
                                <p class="imgContent">{{n.content}}</p>
                            </div>
                        </div>
                        <div class="imgBox">
                            <div class="list" v-for="(n, index) in imageList2" :data-index="index">
                                <img @click="open2($event)" :src="n.url" :onerror="defaultImg" >
                                <p class="imgContent">{{n.content}}</p>
                            </div>
                        </div>
                        <!--<el-upload-->
                                <!--action="javascript:;"-->
                                <!--list-type="picture-card"-->
                                <!--:on-preview="handlePictureCardPreview"-->
                                <!--:on-remove="handleRemove">-->
                            <!--<i class="el-icon-plus"></i>-->
                        <!--</el-upload>-->
                        <!--<el-dialog :visible.sync="dialogVisible">-->
                            <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                        <!--</el-dialog>-->
                    </div>
                </div>
                <div class="box">
                    <div class="titles">
                        <div>运输资料</div>
                        <div>其他资料</div>
                    </div>
                    <div class="contentImg">
                        <div class="imgBox">
                            <div class="list" v-for="(n, index) in imageList3" :data-index="index">
                                <img @click="open3($event)" :src="n.url" :onerror="defaultImg">
                                <p class="imgContent">{{n.content}}</p>
                            </div>
                        </div>
                        <div class="imgBox">
                            <div class="list" v-for="(n, index) in imageList4" :data-index="index">
                                <img @click="open4($event)" :src="n.url" :onerror="defaultImg">
                                <p class="imgContent">{{n.content}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container_box">
                <div class="title">事故判定</div>
                <div class="box">
                    <div class="content">
                        <div>事故调查记录> <span>{{inquireRecord}}</span> </div>
                    </div>
                    <div class="content">
                        <div>是否可判定事故> <span class="amount">{{isAccident===1?'是':isAccident===2?'否':''}}</span></div>
                    </div>
                </div>
            </div>
            <div class="container_box">
                <div class="title">赔付处理</div>
                <div class="boxBg">
                      <div>
                          <p class="titleBg">罚司机金额</p>
                          <p>司机基础运费价格(不含税)：￥<span class="amount">{{driverBasicFee}}</span></p>
                          <p>罚司机金额：￥<span class="amount">{{penaltyDriverFee}}</span></p>
                          <p>司机是否出险：
                              <span class="amount">{{isDriverInsureForPay===1?'是':isDriverInsureForPay===0?'否':''}}</span>
                          </p>
                          <p>
                             险种：{{ tableData[0].driverInsurance}}
                          </p>
                      </div>
                      <div>
                          <p class="titleBg">赔客户金额</p>
                          <p>客户基础运费价格(不含税)：￥<span class="amount">{{customerBasicFee}}</span></p>
                          <p>赔客户金额：￥<span class="amount">{{compensateOffline}}</span></p>
                          <!--<p>客户是否出险：-->
                              <!--<span class="amount">{{isCustomerInsureForPay===1?'是':isCustomerInsureForPay===0?'否':''}}</span>-->
                          <!--</p>-->
                      </div>
                </div>
                <div class="finally" v-show="false">事故最终损失：￥<span class="amounts">--</span> </div>
            </div>
            <div class="container_box">
                <div class="title">审批意见</div>
                <div class="textareas">
                        <el-input
                                type="textarea"
                                placeholder="请输入审批意见..."
                                v-model="textarea2"
                        >
                        </el-input>
                </div>
                <div class="texts">
                    <el-button type="primary" @click="onSubmit('1')">同意</el-button>
                    <el-button @click="onSubmit('2')">退回</el-button>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
    import fancyBox from "vue-fancybox"
    export default {
        data (){
            return{
                loading:false,
                token:'',
                id:'',
                tableData:[],
                dialogImageUrl:'',
                dialogVisible: false,
                radio: '1',
                radio2: '1',
                radio3: '1',
                textarea2:'',
                imageList: [],
                imageList2: [],
                imageList3: [],
                imageList4: [],
                reportSource:'',
                reportStyle:'',
                accidentTime:'',
                reporter:'',
                reporterPhone:'',
                accidentType:'',
                accidentDescription:'',
                trackId:'',
                inquireRecord:'',
                isAccident:'',
                penaltyDriverFee:'',
                isDriverInsureForPay:'',
                compensateOffline:'',
                isCustomerInsureForPay:'',
                driverBasicFee:'',
                customerBasicFee:'',
                customerInsurance:'',
                driverInsurance:'',
                defaultImg: 'this.src="' + require('../../images/MR.png') + '"',
            }
        },
        methods:{
            isCustomer(row){
                return row.isCustomerInsure===1?"是":"否"
            },
            isDriver(row){
                return row.isDriverInsure===1?"是":"否"
            },
            onSubmit(num){
                if(this.textarea2===''){
                    this.$message({
                        message: '审批意见不能为空!',
                        type: 'warning'
                    });
                    return;
                }
                let regNam=/^[\u4e00-\u9fa5_a-zA-Z0-9_!$()=|':;',?！…（）%——‘；：”“'。，、,.？]{5,225}$/;
                if (!regNam.test(this.textarea2)){
                    this.$message({
                        message: '审批意见要求长度5-225位,或不能包含特殊字符!',
                        type: 'warning'
                    });
                    return ;
                }
                let data = JSON.stringify({
                        token:this.token,
                        status:num==='1'?'accepted':num==='2'?'rejected':'',//审批状态 (rejected:退回|accepted:同意)
                        opinion:this.textarea2,
                        accidentId:this.id  // 此次待审批事故的ID
                    }
                );
                console.log(data);
                this.$http.post(this.global.lightningUrl+'/companyv1/insurance/insurance/repay/doInsuranceAudit',data,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    //console.log(res);
                    this.loading = true;
                    if(res.data.errcode === 0){
                        this.$message({
                            message:res.body.message,
                            type: 'success'
                        });
                        this.textarea2='';
                        setTimeout(()=>{
                            this.loading = false;
                            this.$router.push('/accidentcentre');
                        },1500);
                        return
                    }

                    if(res.data.errcode === -1){
                        if(res.body.message==="审核失败"){
                            this.$message({
                                message: '审核失败！',
                                type: 'error'
                            });
                        }else{
                            this.$message({
                                message: '暂无权限！',
                                type: 'warning'
                            });
                        }
                        setTimeout(()=>{
                            this.loading = false;
                            this.$router.push('/accidentcentre');
                        },1500);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            open (e) {
                fancyBox(e.target, this.imageList);
            },
            open2 (e) {
                fancyBox(e.target, this.imageList2);
            },
            open3 (e) {
                fancyBox(e.target, this.imageList3);
            },
            open4 (e) {
                fancyBox(e.target, this.imageList4);
            }
        },
        mounted(){
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            //事故ID
            if(this.$route.query.id===undefined){
                this.$router.go(-1)
            }else{
                this.id=this.$route.query.id;
            }
            let data = JSON.stringify({
                    token:this.token,
                    accidentId:this.id
                }
            );
            //console.log(data);
            this.$http.post(this.global.lightningUrl+'/companyv1/insurance/insurance/repay/toFill',data,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res) => {
                console.log(res);
                if(res.data.errcode === 0){
                    let timestamp=new Date().getTime();
                    this.reportSource=res.data.result.reportSource;
                    this.reportStyle=res.data.result.reportStyle;
                    this.accidentTime=res.data.result.accidentTime;
                    this.reporter=res.data.result.reporter;
                    this.reporterPhone=res.data.result.reporterPhone;
                    this.accidentType=res.data.result.accidentType;
                    this.accidentDescription=res.data.result.accidentDescription;
                    this.trackId=res.data.result.trackId;
                    this.inquireRecord=res.data.result.inquireRecord;
                    this.isAccident=res.data.result.isAccident;
                    this.penaltyDriverFee=res.data.result.penaltyDriverFee;
                    this.isDriverInsureForPay=res.data.result.isDriverInsureForPay;
                    this.compensateOffline=res.data.result.compensateOffline;
                    this.isCustomerInsureForPay=res.data.result.isCustomerInsureForPay;
                    this.driverBasicFee=res.data.result.driverBasicFee;
                    this.customerBasicFee=res.data.result.customerBasicFee;
                    this.tableData=[
                        {
                            driverName:res.data.result.driverName,
                            driverPhone:res.data.result.driverPhone,
                            adminName:res.data.result.adminName,
                            adminPhone:res.data.result.adminPhone,
                            projectName:res.data.result.projectName,
                            projectPhone:res.data.result.projectPhone,
                            customerInsurance:res.data.result.customerInsurance,
                            driverInsurance:res.data.result.driverInsurance
                        }
                    ];
                    this.imageList=[
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
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        filters: {
            val: (value)=>{
                let date = new Date(value);
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
            }
        }
    }
</script>
<style lang="scss" >

    .header{
        margin-bottom: 20px;
    }
    .main{
        .container_box{
            border: 1px solid rgba(0,0,0,0.04);
            padding:30px;
            border-radius:5px;
            box-shadow:0 3px 8px 2px rgba(0,0,0,0.04);
            background: white;
            letter-spacing:1px;
            margin: 0 0 12px 0;
             .title{
                 font-weight: bold;
                 font-size:16px;
                 color: rgba(0,0,0,0.75);
                 margin: 0 0 24px 0;
             }
            .el-table th {
                text-align: center;
            }
            .box{
                margin: 0 0 24px 0;
                .titles{
                    font-weight: bold;
                    font-size:15px;
                    color: rgba(0,0,0,0.75);
                    margin: 0 0 15px 0;
                    display: flex;
                    justify-content: space-between;
                    div{
                        width: 49%;
                    }
                }
                .content{
                    color: rgba(0,0,0,0.65);
                    font-size:14px;
                    div{
                        display: inline-block;
                        width: 33%;
                        margin: 3px 0;
                    }
                    .amount{
                        font-size:16px;
                        font-weight: bold;
                    }
                }
                .contentImg{
                    color: rgba(0,0,0,0.65);
                    font-size:14px;
                    display: flex;
                    justify-content: space-between;
                    .imgBox{
                        width: 49%;
                        display: flex;
                        justify-content: flex-start;
                        overflow:auto;
                        cursor: pointer;
                        .list{
                            margin: 0 2% 0 0 ;
                            img{
                                width:150px;
                                height:110px;
                            }
                            .imgContent{
                                color: rgba(0,0,0,0.75);
                                display: block;
                                width:150px;
                                line-height:50px;
                                text-align: center;
                            }
                        }
                    }
                }
            }

            .boxBg{
                display: flex;
                justify-content: space-between;
                div{
                    width:45%;
                    background: #F5F6FA;
                    padding:25px;
                    color: rgba(0,0,0,0.65);
                    font-size:14px;
                    .titleBg{
                        font-weight: bold;
                        font-size:15px;
                        color: rgba(0,0,0,0.75);
                        margin: 0 0 24px 0;
                    }
                    p{
                        display: block;
                        margin: 4px 0;
                        .amount{
                            font-size:16px;
                            font-weight: bold;
                        }
                    }
                }
            }
            .finally{
                margin:25px 0 0 0;
                color: rgba(0,0,0,0.75);
                font-size:15px;
                .amounts{
                    font-size:17px;
                    font-weight: bold;
                }
            }
            .textareas{
                display: flex;
                justify-content: center;
                .el-textarea{
                    width: 50%;
                    margin: 0 0 0 15px;
                    vertical-align: middle;
                    .el-textarea__inner{
                        max-height:100px;
                    }
                }
            }
            .texts{
                display: flex;
                justify-content: center;
                .el-button{
                    margin:10px 0 0 10px;
                    padding:14px 50px ;
                    letter-spacing:2px;
                }
            }
        }

    }

</style>