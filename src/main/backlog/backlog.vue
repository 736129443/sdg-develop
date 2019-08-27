<template>
    <div class="main " id="backlog">
        <div class="header">
            当前位置 : 待办事项
        </div>
        <div class="backlogMessage">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick" id="my_tabClass">
                <el-tab-pane label="待办数据" name="backlog_list" v-loading.fullscreen.lock="fullscreenLoading">
                    <span class="b_message" v-if="b_message">
                        <i class="el-message__icon el-icon-info "></i>
暂无待办数据...
                    </span>
                    <ul>
                        <!--<li v-if="backlog_three==true?true:false">司机账单审批 <span class="untreated"> new!!</span><router-link to="/driverDispose">查看</router-link></li>-->
                        <li v-if="backlog_one&&customerOutBill">
                            <span style="color: #878787">{{customerOutBill_t | dateFrm}}</span>
                            &nbsp;&nbsp;
                            客户账单审批
                            <span class="untreated">({{customerOutBill_c}})</span>
                            <router-link :to="{path:'/clientDispose',query: {status:'backlog'}}">去处理>></router-link>
                        </li>
                        <li v-if="invoiceApplyApproval&&makeinvoice">

                            <span style="color: #878787">{{makeinvoice_t | dateFrm}}</span>
                            &nbsp;&nbsp;
                            开票申请审批
                            <span class="untreated">({{makeinvoice_c}})</span>
                            <router-link :to="{path:'/invoiceapprovalprocess',query:{status:'backlog'}}">去处理>>
                            </router-link>
                        </li>
                        <li v-if="moneyBackNotice&&repaymoney">

                            <span style="color: #878787">{{repaymoney_t | dateFrm}}</span>
                            &nbsp;&nbsp;
                            回款申请审批
                            <span class="untreated">({{repaymoney_c}})</span>
                            <router-link :to="{path:'/returnedmoneyinD',query:{status:'backlog'}}">去处理>></router-link>
                        </li>
                        <li v-if="backlog_two&&customerContractor">
                            <span style="color: #878787">{{customerContractor_t | dateFrm}}</span>
                            &nbsp;&nbsp;
                            新增/变更客户审批 <span class="untreated">({{customerContractor_c}})</span>
                            <router-link :to="{path:'/NewCustomerApprovalRecord',query:{status:'backlog'}}">去处理>>
                            </router-link>
                        </li>
                        <!--司机调账审批-->
                        <li v-if="backlog_seven&&driverWithoutTrackbill">
                            <span style="color: #878787">{{driverWithoutTrackbill_t | dateFrm}} </span>
                            &nbsp;&nbsp;
                            司机预出账调账审批
                            <span class="untreated"> ({{driverWithoutTrackbill_c}})</span>
                            <router-link :to="{path:'/driverApproval',query:{status:'backlog'}}">去处理>></router-link>
                        </li>
                        <!--<li v-if="backlog_three&&customerbill">出车单司机调账审批列表 <span class="untreated"> new!!</span><router-link :to="{path:'/listAccountRegulation',query:{status:'history'}}">去处理>></router-link></li>-->
                        <!--<li v-if="backlog_four">出车单客户调账审批列表 <span class="untreated"> new!!</span><router-link to="/clientlistAccountRegulation">去处理>></router-link></li>  driverbill-->
                        <li v-if="trackOrderReconciliationApproveList&&customerbill">

                            <span style="color: #878787">{{customerbill_t | dateFrm}}</span>
                            &nbsp;&nbsp;
                            出车单调账审批 <span class="untreated"> ({{customerbill_c}})</span>
                            <router-link :to="{path:'/dispatchlistApproval',query:{status:'backlog'}}">去处理>>
                            </router-link>
                        </li>
                        <li v-if="backlog_five&&teamCreateAudit">

                            <span style="color: #878787">{{teamCreateAudit_t | dateFrm}}</span>
                            &nbsp;&nbsp;
                            新增/变更车队审批 <span
                                class="untreated">({{teamCreateAudit_c}})</span>
                            <router-link :to="{path:'/teamApproval',query:{status:'backlog'}}">去处理>></router-link>
                        </li>

                        <li v-if="backlog_six&&redPacket">

                            <span style="color: #878787">{{redPacket_t | dateFrm}}</span>
                            &nbsp;&nbsp;
                            红包审批
                            <span class="untreated">({{redPacket_c}})</span>
                            <router-link :to="{path:'/ApprovalRedEnvelopes',query:{status:'backlog'}}">去处理>>
                            </router-link>
                        </li>

                        <li v-if="materialApplicationApproval&&material">

                            <span style="color: #878787">{{material_t | dateFrm}}</span>
                            &nbsp;&nbsp;
                            物料申请审批
                            <span class="untreated">({{material_c}})</span>
                            <router-link :to="{path:'/managementBacklog',query:{status:'backlog'}}">去处理>></router-link>
                        </li>
                        <!--material-->
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="历史记录" name="history" v-loading.fullscreen.lock="fullscreenLoading">
                    <span class="b_message" v-if="b_message">
                        <i class="el-message__icon el-icon-info"></i>
暂无历史记录...
                    </span>
                    <ul>
                        <!--<li v-if="backlog_three==true?true:false">司机账单审批 <span class="untreated"> new!!</span><router-link to="/driverDispose">查看</router-link></li>    :to="{path:'/clientDispose',query: {name: id}}"-->
                        <li v-if="backlog_one&&customerOutBill">客户账单审批
                            <router-link :to="{path:'/clientDispose',query: {status:'history'}}">查看>></router-link>
                        </li>
                        <li v-if="invoiceApplyApproval&&makeinvoice">开票申请审批
                            <router-link :to="{path:'/invoiceapprovalprocess',query:{status:'history'}}">查看>>
                            </router-link>
                        </li>
                        <li v-if="moneyBackNotice&&repaymoney">回款申请审批
                            <router-link :to="{path:'/returnedmoneyinD',query:{status:'history'}}">查看>></router-link>
                        </li>
                        <li v-if="backlog_two&&customerContractor">新增/变更客户审批
                            <router-link :to="{path:'/NewCustomerApprovalRecord',query:{status:'history'}}">查看>>
                            </router-link>
                        </li>
                        <!--司机调账审批-->
                        <li v-if="backlog_seven&&driverWithoutTrackbill">司机调账审批
                            <router-link :to="{path:'/driverApproval',query:{status:'history'}}">查看>></router-link>
                        </li>
                        <li v-if="backlog_three&&driverWithoutTrackbill">出车单司机调账审批 <span
                                class="untreated"> new!!</span>
                            <router-link :to="{path:'/listAccountRegulation',query:{status:'history'}}">查看>>
                            </router-link>
                        </li>
                        <!--<li v-if="backlog_four">出车单客户调账审批列表 <span class="untreated"> new!!</span><router-link to="/clientlistAccountRegulation">查看>></router-link></li>-->
                        <li v-if="trackOrderReconciliationApproveList&&customerbill">出车单调账审批
                            <router-link :to="{path:'/dispatchlistApproval',query:{status:'history'}}">查看>>
                            </router-link>
                        </li>
                        <li v-if="backlog_five&&teamCreateAudit">新增/变更车队审批
                            <router-link :to="{path:'/teamApproval',query:{status:'history'}}">查看>></router-link>
                        </li>
                        <li v-if="backlog_six&&redPacket">
                            红包审批
                            <router-link :to="{path:'/ApprovalRedEnvelopes',query:{status:'history'}}">查看>>
                            </router-link>
                        </li>

                        <li v-if="materialApplicationApproval&&material">
                            物料申请审批
                            <router-link :to="{path:'/managementBacklog',query:{status:'history'}}">查看>></router-link>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>
<script>
    import {F_jurisdiction, AIfirstClass0, secondLevel} from '../../js/Fjurisdiction.js'
    import moment from "moment"

    export default {
        data() {
            return {
                fullscreenLoading: false,
                token: '',
                backlog_one: false,
                backlog_two: false,
                backlog_three: false,
                activeName: 'backlog_list',
                backlog_four: false,
                backlog_five: false,
                backlog_six: false,
                backlog_seven: false,
                invoiceApplyApproval: '',
                moneyBackNotice: '',
                trackOrderReconciliationApproveList: '',

                customerContractor: false,
                customerbill: false,
                driverWithoutTrackbill: false,
                customerOutBill: false,
                makeinvoice: false,
                repaymoney: false,
                redPacket: false,
                teamCreateAudit: false,
                material: false,
                driverbill: false,

                customerContractor_c: '',
                driverbill_c: '',
                customerbill_c: '',
                driverWithoutTrackbill_c: '',
                customerOutBill_c: '',
                makeinvoice_c: '',
                repaymoney_c: '',
                redPacket_c: '',
                teamCreateAudit_c: '',
                material_c: '',

                customerContractor_t: '',
                driverbill_t: '',
                customerbill_t: '',
                driverWithoutTrackbill_t: '',
                customerOutBill_t: '',
                makeinvoice_t: '',
                repaymoney_t: '',
                redPacket_t: '',
                teamCreateAudit_t: '',
                material_t: '',

                materialApplicationApproval: false,
                b_message:false
            }
        },
        created() {
            this.token = JSON.parse(Base64.decode(sessionStorage.getItem('key'))).result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            //console.log(jurisdictions[12]);
            this.materialApplicationApproval = F_jurisdiction('materialApplicationApproval', jurisdictions);
            // this.backlog_one = jurisdictions[12].menus[0].choose;
            //     this.backlog_two = jurisdictions[12].menus[1].choose;
            //     this.backlog_three = jurisdictions[12].menus[2].choose;
            //     this.backlog_four = jurisdictions[12].menus[3].choose;
            //     this.backlog_five = jurisdictions[12].menus[4].choose;
            //     this.backlog_six = jurisdictions[12].menus[5].choose;
            //     this.backlog_seven = jurisdictions[12].menus[6].choose;
            this.backlog_one = F_jurisdiction('CustomerBillApproval', jurisdictions);
            this.backlog_two = F_jurisdiction('addCustomerApproval', jurisdictions);
            this.backlog_five = F_jurisdiction('carTeamApprovalList', jurisdictions);
            this.backlog_six = F_jurisdiction("RedBagApproveRecord", jurisdictions);
            this.backlog_seven = F_jurisdiction("driverReconciliationApproval", jurisdictions);
            this.invoiceApplyApproval = F_jurisdiction('invoiceApplyApproval', jurisdictions);
            this.moneyBackNotice = F_jurisdiction('moneyBackNotice', jurisdictions);
            this.trackOrderReconciliationApproveList = F_jurisdiction('trackOrderReconciliationApproveList', jurisdictions);
            // let backlog = JSON.stringify({
            //     token : this.token,
            //     "type":"backlog"
            // })
            // this.$http.post(this.global.lightningUrl +'/companyv1/userManage/backlog',backlog,{
            //     headers: {
            //         'Content-Type': 'application/json;charset=UTF-8'
            //     }
            // }).then((res)=>{
            //     console.log(res);
            //     // customerContractor  新客户
            //     // customerbill  出车单调账审批
            //     // driverWithoutTrackbill  司机调账审批列表
            //     // customerOutBill  客户账单
            //     // makeinvoice  开票
            //     // repaymoney  回款申请
            //     // redPacket  红包
            //     // teamCreateAudit  车队
            //     // material 物料
            //     let result = res.body.result.backlog ;
            //     for(var i in result){
            //         if (result[i].content == "customerContractor") {
            //             this.customerContractor = true
            //             this.customerContractor_c = result[i].count
            //             continue
            //         }
            //         if (result[i].content == "customerbill") {
            //             this.customerbill = true
            //             this.customerbill_c = result[i].count
            //             continue
            //         }
            //         if (result[i].content == "driverWithoutTrackbill") {
            //             this.driverWithoutTrackbill = true
            //             this.driverWithoutTrackbill_c = result[i].count
            //             continue
            //         }
            //         if (result[i].content == "customerOutBill") {
            //             this.customerOutBill = true
            //             this.customerOutBill_c = result[i].count
            //             continue
            //         }
            //         if (result[i].content == "makeinvoice") {
            //             this.makeinvoice = true
            //             this.makeinvoice_c = result[i].count
            //             continue
            //         }
            //         if (result[i].content == "repaymoney") {
            //
            //             this.repaymoney = true
            //             this.repaymoney_c = result[i].count
            //             continue
            //         }
            //         if (result[i].content == "redPacket") {
            //             this.redPacket = true
            //             this.redPacket_c = result[i].count
            //             continue
            //         }
            //         if (result[i].content == "teamCreateAudit") {
            //             this.teamCreateAudit = true
            //             this.teamCreateAudit_c = result[i].count
            //             continue
            //         }
            //         if (result[i].content == "material") {
            //             this.material = true
            //             this.material_c = result[i].count
            //             continue
            //         }
            //         if (result[i].content == "driverbill") {
            //             this.driverbill = true
            //             this.driverbill_c = result[i].count
            //             continue
            //         }
            //
            //
            //     }
            // })
            this.handleClick()
        },
        methods: {
            // aaa(){
            //     this.backlogCount =99
            //     this.$store.commit('onbacklog', this.backlogCount)
            // },
            handleClick() {
                //console.log(this.activeName);
                this.fullscreenLoading = true;
                this.customerContractor = false;
                this.customerbill = false;
                this.driverWithoutTrackbill = false;
                this.customerOutBill = false;
                this.makeinvoice = false;
                this.repaymoney = false;
                this.redPacket = false;
                this.teamCreateAudit = false;
                this.material = false;
                this.driverbill = false;
                let backlog;
                if (this.activeName == 'backlog_list') {
                    this.b_message = false
                    backlog = JSON.stringify({
                        token: this.token,
                        "type": "backlog"
                    })
                    this.$http.post(this.global.lightningUrl + '/companyv1/userManage/backlog', backlog, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res) => {
                        let result = res.body.result.backlog;
                        if (res.body.errcode == 0) {
                            setTimeout(() => {
                                this.fullscreenLoading = false;
                            }, 200) ;
                            //    更新代办条数
                            this.backlog()
                            var count=0;
                            for (var i in result) {
                                if (result[i].content == "customerContractor") {
                                    this.customerContractor = true;
                                    this.customerContractor_c = result[i].count;
                                    this.customerContractor_t = result[i].createTime;
                                    continue
                                }
                                if (result[i].content == "customerbill"||result[i].content == "driverbill") {
                                    this.customerbill = true;
                                    count =count+result[i].count;
                                    this.customerbill_c=count
                                    if (result[i].content == "customerbill") {
                                        var customerbillTime=result[i].createTime;
                                    }
                                    if (result[i].content == "driverbill") {
                                        var driverbillTime=result[i].createTime;
                                    }
                                    if (customerbillTime!=null && driverbillTime!=null){
                                        if (customerbillTime>driverbillTime) {
                                            this.customerbill_t=customerbillTime
                                        }else {
                                            this.customerbill_t=driverbillTime
                                        }
                                    }else if (customerbillTime!=null && driverbillTime==null){
                                        this.customerbill_t=customerbillTime
                                    } else {
                                        this.customerbill_t=driverbillTime
                                    }
                                    continue
                                }
                                if (result[i].content == "driverWithoutTrackbill") {
                                    this.driverWithoutTrackbill = true;
                                    this.driverWithoutTrackbill_c = result[i].count;
                                    this.driverWithoutTrackbill_t = result[i].createTime;
                                    continue
                                }
                                if (result[i].content == "customerOutBill") {
                                    this.customerOutBill = true;
                                    this.customerOutBill_c = result[i].count;
                                    this.customerOutBill_t = result[i].createTime;
                                    continue
                                }
                                if (result[i].content == "makeinvoice") {
                                    this.makeinvoice = true;
                                    this.makeinvoice_c = result[i].count;
                                    this.makeinvoice_t = result[i].createTime;
                                    continue
                                }
                                if (result[i].content == "repaymoney") {

                                    this.repaymoney = true;
                                    this.repaymoney_c = result[i].count;
                                    this.repaymoney_t = result[i].createTime;
                                    continue
                                }
                                if (result[i].content == "redPacket") {
                                    this.redPacket = true;
                                    this.redPacket_c = result[i].count;
                                    this.redPacket_t = result[i].createTime;
                                    continue
                                }
                                if (result[i].content == "teamCreateAudit") {
                                    this.teamCreateAudit = true;
                                    this.teamCreateAudit_c = result[i].count;
                                    this.teamCreateAudit_t = result[i].createTime;
                                    continue
                                }
                                if (result[i].content == "material") {
                                    this.material = true;
                                    this.material_c = result[i].count;
                                    this.material_t = result[i].createTime;
                                    continue
                                }
                                if (result[i].content == "driverbill") {
                                    this.driverbill = true;
                                    this.driverbill_c = result[i].count;
                                    this.driverbill_t = result[i].createTime;
                                    continue
                                }
                            }
                            if(result.length == 0){

                                this.b_message =true

                            }
                        }

                    })
                } else if (this.activeName == 'history') {
                    this.b_message = false
                    backlog = JSON.stringify({
                        token: this.token,
                        "type": "history"
                    })
                    this.$http.post(this.global.lightningUrl + '/companyv1/userManage/backlog', backlog, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res) => {
                        let result = res.body.result.history;
                        if (res.body.errcode == 0) {
                            setTimeout(() => {

                                this.fullscreenLoading = false;
                            }, 500)
                            for (var i in result) {
                                if (result[i].content == "customerContractor") {
                                    this.customerContractor = true
                                    continue
                                }
                                if (result[i].content == "customerbill"||result[i].content == "driverbill") {
                                    this.customerbill = true

                                    continue
                                }
                                if (result[i].content == "driverWithoutTrackbill") {
                                    this.driverWithoutTrackbill = true
                                    continue
                                }
                                if (result[i].content == "customerOutBill") {
                                    this.customerOutBill = true
                                    continue
                                }
                                if (result[i].content == "makeinvoice") {
                                    this.makeinvoice = true
                                    continue
                                }
                                if (result[i].content == "repaymoney") {

                                    this.repaymoney = true
                                    continue
                                }
                                if (result[i].content == "redPacket") {
                                    this.redPacket = true
                                    continue
                                }
                                if (result[i].content == "teamCreateAudit") {
                                    this.teamCreateAudit = true
                                    continue
                                }
                                if (result[i].content == "material") {
                                    this.material = true
                                    continue
                                }
                                if (result[i].content == "driverbill") {
                                    this.driverbill = true
                                    continue
                                }
                            }
                            if(result.length == 0){

                                this.b_message =true

                            }
                        }
                    })
                }
            },
            backlog(){
                let backlog = JSON.stringify({
                    token : this.token,
                    "type":"backlogCount"
                })
                let backlogCount
                this.$http.post(this.global.lightningUrl +'/companyv1/userManage/backlog',backlog,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    backlogCount = res.body.result.backlogCount
                    this.$store.commit('onbacklog', backlogCount)
                })
            },
        },
        mounted() {
            //console.log(Object);
        },
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY/MM/DD");
            }
        },
    }
</script>
<style lang="scss" scoped>
    .main {
        padding: 30px;
        .header {
            margin-bottom: 20px;
        }
        .b_message{
            min-width: 380px;
            box-sizing: border-box;
            border-width: 1px;
            border-style: solid;
            border-color: #ebeef5;
            border-radius: 10px;
            position: fixed;
            left: 50%;
            top: 330px;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            background-color: #edf2fc;
            -webkit-transition: opacity .3s,-webkit-transform .4s;
            transition: opacity .3s,-webkit-transform .4s;
            transition: opacity .3s,transform .4s;
            transition: opacity .3s,transform .4s,-webkit-transform .4s;
            padding: 15px 15px 15px 20px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            color: #909399;
        }
        .el-icon-info:before {
            content: "\E61A";
        }
        .untreated {
            color: red;
        }
        .backlogMessage {
            width: 100%;
            height: 95%;
            background-color: white;
            box-sizing: border-box;

        }
        .el-icon-info:before {
            content: "\E7A1";
        }
        .el-tabs__nav-scroll {
            border-bottom: 1px solid white;
        }
        .el-tabs__header {
            margin: 0;
        }
        .el-tabs__nav {
            height: 55px;
            .el-tabs__item {
                height: 55px;
                line-height: 55px;
                background: white;
                border-top: 4px solid transparent;
            }
            .is-active {
                border-top-color: #337df6;
            }
        }
        ul {
            width: 30%;
            li {
                line-height: 50px;
                min-width: 450px;
                a {
                    color: rgb(42, 125, 247);
                    display: block;
                    float: right;
                    margin-left: 50px;
                }
            }
        }

    }

</style>