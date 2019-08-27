<template>
    <div class="app">
        <!--隐藏的二维码-->
        <div id="layer">
            <div class="code ">
                <div class="erwm1">
                    <div id="qrcode1"></div>
                </div>
                <div class="btnBottom">
                    <el-button id="btn2" @click="erwm0" type="primary" v-if="over === 0?true:false">关闭二维码</el-button>
                </div>
            </div>
        </div>
        <!-- 头部 -->
        <el-header id="header">
            <div class="logon"><img src="../images/header_logo.png" alt="闪电狗" title="闪电狗"></div>
            <div class="title">运营管理系统</div>
            <div class="-r">
                <span class="-t-text">{{arr}} <i><img src="../images/png/ic_down.png" alt=""></i> </span>
                <div class="drop-down">
                    <ul>
                        <li>
                            <span class="t-text">{{arr}}</span>
                            <span class="t-text-top"><img src="../images/png/ic_up.png" alt=""></span>
                        </li>
                        <li>
                            <i><img src="../images/png/ic_ewm.png" alt=""></i>
                            <span @click="erwm" v-show="over === 0?false:true">生成二维码</span>
                        </li>
                        <li>
                            <i><img src="../images/png/ic_password.png" alt=""></i>
                            <span @click="quit" class="-r-button">修改密码</span>
                        </li>
                        <li>
                            <i><img src="../images/png/ic_quit.png" alt=""></i>
                            <span @click="password">退出登录</span>
                        </li>
                    </ul>
                </div>
            </div>
        </el-header>
        <!-- 内容 -->
        <el-container class="contain">
            <!-- 侧边栏 -->
            <el-menu
                class="el-menu-vertical-demo"
                :default-active="$route.path"
                router
                unique-opened
                :collapse="isCollapse"
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect"
                text-color="#cccecb"
                active-text-color="#2a7df7">
                <el-menu-item index="" v-model="isCollapse" @click="aaa" style="text-align: center   ">
                    <i><img src="../images/png/ic_unfold.png" alt=""></i>
                </el-menu-item>
                <router-link to="/backlog" v-if="backlog ">
                    <el-menu-item index="/backlog" :class="{'is-active':backlogClass,'click_classOne':backlogClass }">
                        <i><img src="../images/png/icon_todos_normal.png" alt=""></i>
                        <span slot="title">待办事项
                                        <span
                                            style="border-radius: 50%;height: 18px;width: 18px;display: inline-block;background: #f30303;margin-left: 5px">
                                            <span
                                                style="display: block;color: #FFFFFF;height: 18px;line-height: 18px;text-align: center"> {{this.$store.state.backlog}}</span>
                                        </span>
                                    </span>
                    </el-menu-item>
                </router-link>
                <router-link to="/area_manage" v-if="areaManage ">
                    <el-menu-item index="/area_manage">
                        <i><img src="../images/png/ic_rigional_normal.png" alt=""></i>
                        <span slot="title">区域管理</span>
                    </el-menu-item>
                </router-link>
                <!--组织管理开始-->
                <!--     -->
                <!--<router-link to="/organization_manage" >-->
                <!--<el-menu-item index="/organization_manage" :class="{'is-active':roleClass,'click_classOne': roleClass }">-->
                <!--<i><img src="../images/png/icon_organization_normal.png" alt=""></i>-->
                <!--<span slot="title">组织管理</span>-->
                <!--</el-menu-item>-->
                <!--</router-link>-->
                <!--      -->
                <el-submenu index="10" v-if="roleManage ">
                    <template slot="title">
                        <img src="../images/png/icon_organization_normal.png" alt="">
                        <span>组织管理</span>
                    </template>
                    <el-menu-item-group>
                        <router-link to="/branch_company">
                            <el-menu-item index="/branch_company">
                                创建分公司
                            </el-menu-item>
                        </router-link>
                        <router-link to="/createDepartment">
                            <el-menu-item index="/createDepartment">
                                创建部门
                            </el-menu-item>
                        </router-link>
                        <router-link to="/organization_manage">
                            <el-menu-item index="/organization_manage">
                                用户管理
                            </el-menu-item>
                        </router-link>
                        <router-link to="/role">
                            <el-menu-item index="/role">
                                角色/权限
                            </el-menu-item>
                        </router-link>
                        <!--<router-link to="/staffManagement" v-if="staffManagement">-->
                        <!--<el-menu-item index="/staffManagement" >-->
                        <!--员工管理-->
                        <!--</el-menu-item>-->
                        <!--</router-link>-->
                    </el-menu-item-group>
                </el-submenu>
                <!--组织管理结束-->
                <router-link to="/staffManagement" v-if="staffManagement">
                    <el-menu-item index="/staffManagement">
                        <i><img src="../images/yg.png" alt="" height="22px"></i>
                        <span slot="title">员工管理</span>
                    </el-menu-item>
                </router-link>
                <el-submenu index="4" v-if="CRMManage ">
                    <template slot="title">
                        <img src="../images/png/ic_crm_normal.png" alt="">
                        <span>CRM管理</span>
                    </template>
                    <el-menu-item-group>
                        <router-link to="/client_manage" v-if="CRMFirstPage ">
                            <el-menu-item index="/client_manage">
                                客户管理
                            </el-menu-item>
                        </router-link>
                        <router-link to="/ApprovalList" v-if="examine_list ">
                            <el-menu-item index="/ApprovalList">
                                申请记录
                            </el-menu-item>
                        </router-link>
                        <router-link to="/officialIntendedCustomer" v-if="intentionCustomerList">
                            <el-menu-item index="/officialIntendedCustomer">
                                官网意向客户
                            </el-menu-item>
                        </router-link>
                        <router-link to="/business_Opportunity" v-if="businessOpportunityManagerView">
                            <el-menu-item index="/business_Opportunity">
                                商机管理
                            </el-menu-item>
                        </router-link>
                        <router-link to="/statistics" v-if="businessOpportunityStatistics">
                            <el-menu-item index="/statistics">
                                商机统计
                            </el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5" v-if="driverManage ">
                    <template slot="title">
                        <img src="../images/png/ic_driver_normal.png" alt="">
                        <span>司机管理</span>
                    </template>
                    <el-menu-item-group>
                        <router-link to="/transportCompany" v-if="fleetManagement ">
                            <el-menu-item index="/transportCompany">
                                运输公司
                            </el-menu-item>
                        </router-link>
                        <router-link to="/motorcadeApplyFor" v-if="carTeamApplicationRecord">
                            <el-menu-item index="/motorcadeApplyFor">
                                新建车队申请记录
                            </el-menu-item>
                        </router-link>

                        <router-link to="/driver_manage" v-if="driverFirstPage ">
                            <el-menu-item index="/driver_manage">
                                司机列表
                            </el-menu-item>
                        </router-link>

                        <router-link to="/driverInvitationList" v-if="driverInvitation ">
                            <el-menu-item index="/driverInvitationList">
                                司机邀请列表
                            </el-menu-item>
                        </router-link>

                        <router-link to="/driverAttestation" v-if="driverApprove ">
                            <el-menu-item index="/driverAttestation">
                                司机认证
                            </el-menu-item>
                        </router-link>

                        <router-link to="/driver_StickerAudit" v-if="driverCarStickerApprove ">
                            <el-menu-item index="/driver_StickerAudit">
                                司机车贴
                            </el-menu-item>
                        </router-link>
                        <router-link to="/driver_CarAudit" v-if="checklistOfVehicleStickers ">
                            <el-menu-item index="/driver_CarAudit">
                                车贴审核
                            </el-menu-item>
                        </router-link>
                        <router-link to="/driverTraining" v-if="driverOffLineTrain">
                            <el-menu-item index="/driverTraining">
                                司机线下培训
                            </el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="6" v-if="ASKManage ">
                    <template slot="title">
                        <img src="../images/png/ic_capacity_normal.png" alt="">
                        <span>项目管理</span>
                    </template>
                    <el-menu-item-group>


                        <!--项目列表   bulletedList-->
                        <router-link to="/bulletedlist">
                            <el-menu-item index="/bulletedlist" v-if="projectList ">
                                项目列表
                            </el-menu-item>
                        </router-link>

                        <!--运输单管理-->
                        <router-link to="/shippingDocument">
                            <el-menu-item index="/shippingDocument" v-if="transportOrderManage ">
                                运输单管理
                            </el-menu-item>
                        </router-link>
                        <router-link to="/turnout_manage">
                            <el-menu-item index="/turnout_manage" v-if="trackOrderList "
                                          :class="{'is-active':chdClass,'click_class':chdClass }">
                                出车单管理
                            </el-menu-item>
                        </router-link>
                        <router-link to="/itemsFinance">
                            <el-menu-item index="/itemsFinance" v-if="projectFinancialList">
                                出车单调账
                            </el-menu-item>
                        </router-link>
                        <router-link to="/TzApprovalRecord">
                            <el-menu-item index="/TzApprovalRecord" v-if="reconciliationApproveRecord ">
                                出车单调账明细
                            </el-menu-item>
                        </router-link>

                        <!--仓库列表    warehouselist-->
                        <router-link to="/warehouselist">
                            <el-menu-item index="/warehouselist" v-if="depotList ">
                                仓库列表
                            </el-menu-item>
                        </router-link>


                        <router-link to="/order_manage">
                            <el-menu-item index="/order_manage" v-if="orderFirstPage "
                                          :class="{'is-active':ddClass,'click_class':ddClass }">
                                订单列表
                            </el-menu-item>
                        </router-link>

                        <el-submenu index="14" v-if="ProjectFinance">
                            <template slot="title">项目财务</template>
                            <el-menu-item index="/financtReport" v-if="projectReport">项目报表</el-menu-item>

                            <!--<router-link to="/TzApprovalRecord" >-->

                            <el-menu-item index="/redPacketRecords">红包发放明细</el-menu-item>
                            <!--</router-link>-->
                        </el-submenu>
                        <!--<router-link to="/itemsFinance" >-->
                        <!--<el-menu-item index="/itemsFinance" v-if="projectFinancialList ">-->
                        <!--项目财务-->
                        <!--</el-menu-item>-->
                        <!--</router-link>-->

                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="7" v-if="financeManage ">
                    <template slot="title">
                        <img src="../images/png/ic_financial_normal.png" alt="">
                        <span>财务管理</span>
                    </template>
                    <el-menu-item-group>
                        <!--<router-link to="/driver_bill" v-if="driverFinance "  >-->
                        <!--<el-menu-item index="/driver_bill" :class="{'is-active':cwClass,'click_class':cwClass }">-->
                        <!--&lt;!&ndash;router-link-exact-active router-link-active&ndash;&gt;-->
                        <!--司机财务-->
                        <!--</el-menu-item>-->
                        <!--</router-link>-->
                        <!--v-if="ProjectFinance"-->
                        <el-submenu index="15" v-if="driverFinances">
                            <template slot="title">司机财务</template>
                            <el-menu-item v-if="driverFinance" index="/driver_bill">司机财务</el-menu-item>
                            <el-menu-item v-if="driverReconciliationApprovalRecord" index="/driverApprovalList">调账记录
                            </el-menu-item>
                        </el-submenu>

                        <!--<router-link to="/driver_reconciliation" >-->
                        <!--<el-menu-item index="/driver_reconciliation" :class="{'is-active':sjzdClass,'click_class':sjzdClass }">-->
                        <!--司机已出账单-->
                        <!--</el-menu-item>-->
                        <!--</router-link>-->
                        <!--<router-link to="/driverwithdraw"  v-if="driverWithdrawalsManagement == true?true:false">-->
                        <!--<el-menu-item index="/driverwithdraw" >-->
                        <!--司机提现管理-->
                        <!--</el-menu-item>-->
                        <!--</router-link>-->


                        <el-submenu index="18" v-if="CashWithdrawal">
                            <template slot="title">司机提现管理</template>
                            <el-menu-item index="/driverwithdraw" v-if="driverWithdrawalsManagement">司机提现管理</el-menu-item>
                            <el-menu-item index="/freight" v-if="freightDetail">运费结算明细</el-menu-item>
                        </el-submenu>

                        <router-link to="/driverRedEnvelope" v-if="driverRedBag == true?true:false">
                            <el-menu-item index="/driverRedEnvelope">
                                司机红包
                            </el-menu-item>
                        </router-link>

                        <el-submenu index="16" v-if="secondLevelcustomer">
                            <template slot="title">客户财务</template>
                            <el-menu-item v-if="CRMFinance" index="/clientele">客户财务</el-menu-item>
                            <el-menu-item v-if="billApprovalRecord" index="/sjzd_record">账单审批记录</el-menu-item>
                        </el-submenu>
                        <!--<router-link to="/clientele" v-if="CRMFinance ">-->
                        <!--<el-menu-item index="/clientele">-->
                        <!--客户财务-->
                        <!--</el-menu-item>-->
                        <!--</router-link>-->
                        <!--<router-link to="/sjzd_record" v-if="billApprovalRecord ">-->
                        <!--<el-menu-item index="/sjzd_record">-->
                        <!--客户账单审批记录-->
                        <!--</el-menu-item>-->
                        <!--</router-link>-->
                        <router-link to="/clientReconciliationeq" v-if="CRMAccount ">
                            <el-menu-item index="/clientReconciliationeq"
                                          :class="{'is-active':khzdClass,'click_class':khzdClass }">
                                客户账单
                            </el-menu-item>
                        </router-link>
                        <!--<router-link to="/client_bill" v-if="CRMReturnConfirm">-->
                        <!--<el-menu-item index="/client_bill" :class="{'is-active':hkglClass,'click_class':hkglClass }" >-->
                        <!--客户回款管理-->
                        <!--</el-menu-item>-->
                        <!--</router-link>-->

                        <el-menu-item index="/clientinvoiceList" v-if="invoiceDetail">
                            客户开票明细
                        </el-menu-item>
                        <el-menu-item index="/returnedMoney" v-if="CRMReturnConfirm">
                            客户回款明细
                        </el-menu-item>

                        <router-link to="/Insurance_bill" v-if="insuranceBill ">
                            <el-menu-item index="/Insurance_bill">
                                保险账单
                            </el-menu-item>
                        </router-link>

                        <!--<router-link to="/finance_analyze"  v-if="financeAnalyze ">-->
                        <!--<el-menu-item index="/finance_analyze" >-->
                        <!--财务分析-->
                        <!--</el-menu-item>-->
                        <!--</router-link>-->
                        <router-link to="/transactionRecord">
                            <el-menu-item index="/transactionRecord" v-if="tradeRecord">
                                交易记录
                            </el-menu-item>
                        </router-link>
                        <router-link to="/cashpledge" v-if="depositManagement ">
                            <el-menu-item index="/cashpledge">
                                财务金额设置
                            </el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="12" v-if="materialManagementModule">
                    <template slot="title">
                        <img src="../images/png/ic_crm_normal.png" alt="">
                        <span>物料管理</span>
                    </template>
                    <el-menu-item-group>
                        <router-link to="/Management" v-if="materialManagement">
                            <el-menu-item index="/Management">
                                物料管理
                            </el-menu-item>

                        </router-link>
                        <el-menu-item index="/myStock" v-if="myStock">
                            我的库存
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="8" v-if="platformTerms ">
                    <template slot="title">
                        <img src="../images/png/ic_term_normal.png" alt="">
                        <span>平台条款</span>
                    </template>
                    <el-menu-item-group>

                        <router-link to="/client">
                            <el-menu-item index="/client">闪电狗客户协议</el-menu-item>
                        </router-link>

                        <router-link to="/post">
                            <el-menu-item index="/post">闪电狗司机岗控协议</el-menu-item>
                        </router-link>
                        <router-link to="/serve">
                            <el-menu-item index="/serve">闪电狗司机服务协议</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="9" v-if="auxiliaryMeans ">
                    <template slot="title">
                        <img src="../images/png/ic_auxiliary_normal.png" alt="">
                        <span>辅助工具</span>
                    </template>
                    <!--messageManagement-->
                    <el-menu-item-group>
                        <!--<router-link to="/driverStickerAuditSettings"   v-if="subsidiesForVehicleStickers ">-->
                        <!--<el-menu-item index="/driverStickerAuditSettings">-->
                        <!--车贴补贴设置-->
                        <!--</el-menu-item>-->
                        <!--</router-link>-->
                        <router-link to="/message">
                            <el-menu-item index="/message">
                                消息推送
                            </el-menu-item>
                        </router-link>
                        <!--<router-link to="/messageList" >-->
                        <!--<el-menu-item index="/messageList">-->
                        <!--消息列表-->
                        <!--</el-menu-item>-->
                        <!--</router-link>-->
                        <router-link to="/TrainingMaterials" v-if="driverTrainingMaterials ">
                            <el-menu-item index="/TrainingMaterials">
                                司机培训资料
                            </el-menu-item>
                        </router-link>

                        <!--<router-link to="/versions" >-->
                        <!--<el-menu-item index="/versions">-->
                        <!--版本维护-->
                        <!--</el-menu-item>-->
                        <!--</router-link>-->
                    </el-menu-item-group>
                </el-submenu>
                <router-link to="/feedback" v-if="opinionList ">
                    <el-menu-item index="/feedback">
                        <i><img src="../images/png/ic_yjfk_normal.png" alt=""></i>
                        <span slot="title">意见反馈</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/accidentcentre" v-if="accidentCenter ">
                    <el-menu-item index="/accidentcentre">
                        <i><img src="../images/png/ic_accident_normal.png" alt=""></i>
                        <span slot="title">事故中心</span>
                    </el-menu-item>
                </router-link>


                <el-submenu index="17" v-if="regulatoryReporting">
                    <template slot="title">
                        <img src="../images/png/ic_auxiliary_normal.png" alt="">
                        <span>监管上报</span>
                    </template>
                    <el-menu-item-group>
                        <router-link to="/waybill" v-if="electronicWaybill">
                            <el-menu-item index="/waybill">
                                电子运单
                            </el-menu-item>
                        </router-link>
                        <router-link to="/Detailed">
                            <el-menu-item index="/Detailed" v-if="capitalFlowSheet">
                                资金流水
                            </el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>

                <div @click="switchs" v-if="CEndSystem">
                    <el-menu-item index="/">
                        <span slot="title">C端运营管理</span>
                        <el-input v-model.trim="tokens" id="childValue" style="display:none;"></el-input>
                    </el-menu-item>
                    <!--<iframe id="win" :src="this.twoCUrl" frameborder="0"></iframe>-->
                </div>
                <!--<el-menu-item index="">-->
                <!--<i><img src="../images/png/ic_log_normal.png" alt=""></i>-->
                <!--<span slot="title">日志管理</span>-->
                <!--</el-menu-item>-->
            </el-menu>
            <router-view></router-view>
        </el-container>
        <!--二维码-->
    </div>
</template>
<script>
    import QRCode from 'qrcodejs2'
    import {F_jurisdiction, AIfirstClass0, secondLevel} from '../js/Fjurisdiction.js'

    export default {
        data() {
            return {
                backlogCount: '',
                driverOffLineTrain: '',
                tokens: '',
                twoCUrl: '',
                //样式控制
                // isActive: true,
                isCollapse: false,
                arr: [],
                dialogVisible: false,
                token: '',
                user: {},
                over: 1,
                areaManage: '',
                roleManage: false,
                CRMManage: '',
                CRMFirstPage: '',
                RepositoryList: '',
                examine_list: '',
                intentionCustomerList: false,
                businessOpportunityManagerView: '',
                businessOpportunityStatistics: '',
                driverManage: '',
                driverApprove: '',
                driverFirstPage: '',
                //车队
                fleetManagement: '',
                ASKManage: '',
                financeManage: '',
                driverFinance: '',
                CRMFinance: false,
                CRMAccount: false,
                CRMReturnManage: false,
                insuranceBill: false,
                CRMReturnConfirm: '',
                financeAnalyze: '',
                platformTerms: '',
                auxiliaryMeans: '',
                backlog: '',
                code: '',
                cwClass: '',
                // 代办高亮
                backlogClass: '',
                sjzdClass: '',
                // 客户财务高亮
                khClass: '',
                khzdClass: '',
                //组织
                roleClass: '',
                //    回款管理
                hkglClass: '',
                //    出车单管理
                chdClass: '',
                //订单列表
                ddClass: '',
                //    押金管理
                depositManagement: false,
                driverWithdrawalsManagement: '',
                freightDetail: false,//运费结算明细
                CashWithdrawal: false,//司机提现管理
                //    意见
                opinionList: '',
                messageManagement: '',
                //    司机车贴
                driverCarStickerApprove: '',
                CarStickerSubsidySetting: '',
                //    司机红包
                driverRedBag: false,
                //司机邀请列表
                driverInvitation: '',
                //   事故中心
                accidentCenter: '',
                //车贴审核
                checklistOfVehicleStickers: '',
                // 司机补贴设置
                subsidiesForVehicleStickers: '',
                // 司机培训
                driverTrainingMaterials: '',
                billApprovalRecord: false,
                //    运营
                projectList: false,
                depotList: false,
                orderFirstPage: false,
                transportOrderManage: false,
                trackOrderList: false,
                projectFinancialList: false,
                reconciliationApproveRecord: false,
                //    交易记录
                tradeRecord: false,
                //车队申请记录
                carTeamApplicationRecord: false,
                carTeamApprovalRecord: false,
                staffManagement: false,
                materialManagementModule: false, //物料管理
                materialManagement: false,
                myStock: false,
                projectReport: false,
                ProjectFinance: false,
                driverFinances: false,
                CEndSystem: false,
                secondLevelcustomer: '',
                invoiceDetail: '',
                //监管上报
                regulatoryReporting: false,
                //电子运单
                electronicWaybill: false,
                //资金流水
                capitalFlowSheet: false,
            }
        },
        created() {
            // alert(this.$store.state.backlog);
            if (this.global.lightningUrl == "https://www.sdgwl.com:43535") {
                this.twoCUrl = "https://www.sdgwl.com:43535/cschedule/#/";
            } else if (this.global.lightningUrl == "https://192.168.50.88") {
                this.twoCUrl = "https://192.168.50.88:445/cschedule/#/";
            } else if (this.global.lightningUrl == "https://www.shandiangou-app.com") {
                this.twoCUrl = "https://www.shandiangou-app.com:447/cschedule/#/";
            }
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let backlog = JSON.stringify({
                token: this.token,
                "type": "backlogCount"
            })
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/backlog', backlog, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res) => {
                this.backlogCount = res.body.result.backlogCount;
                this.$store.commit('onbacklog', this.backlogCount)
            })
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            let jd = JSON.parse(sessionStorage.getItem('jurisdictions'));
            // console.log(jurisdictions[6].menus);
            if (jurisdictions == undefined) {
                this.$router.push({
                    path: '/',
                });
            }
            console.log(jurisdictions[0].menus);
            this.invoiceDetail = F_jurisdiction('invoiceDetail', jd);
            //物料管理
            // if(jurisdictions.length == 17 ){
            //materialManagement   "myStock"
            // this.myStock = jurisdictions[16].menus[5].choose ;
            // this.materialManagement = jurisdictions[16].menus[0].choose ;
            this.materialManagement = F_jurisdiction('materialManagementModule', jd);
            this.myStock = F_jurisdiction('myStock', jd);
            if (this.myStock || this.materialManagement) {
                this.materialManagementModule = true
            } else if (!this.myStock && !this.materialManagement) {
                this.materialManagementModule = false
            }

            // }
            // console.log(jurisdictions[6].menus);
            // -----项目管理 -E-------
            this.projectList = jurisdictions[6].menus[7].choose;
            this.depotList = jurisdictions[6].menus[5].choose;
            this.orderFirstPage = jurisdictions[6].menus[0].choose;
            this.transportOrderManage = jurisdictions[6].menus[12].choose;
            this.trackOrderList = jurisdictions[6].menus[15].choose;
            this.projectFinancialList = jurisdictions[6].menus[22].choose;
            this.reconciliationApproveRecord = jurisdictions[6].menus[26].choose;
            //28  项目报表  projectReport
            this.projectReport = jurisdictions[6].menus[28].choose;
            if (this.projectFinancialList || this.projectReport) {
                this.ProjectFinance = true
            } else if (!this.projectFinancialList && !this.projectReport) {
                this.ProjectFinance = false
            }
            if (this.projectList || this.depotList || this.orderFirstPage || this.transportOrderManage || this.trackOrderList || this.ProjectFinance || this.reconciliationApproveRecord) {
                this.ASKManage = true
            } else if (this.projectList && this.depotList && this.orderFirstPage && this.transportOrderManage && this.trackOrderList && this.ProjectFinance && this.reconciliationApproveRecord) {
                this.ASKManage = false
            }

            console.log(jurisdictions[7].menus);
            //  18  财务模块  列表
            // if (jurisdictions[7].menus.length == 30 ){
            this.driverFinance = jurisdictions[7].menus[0].choose;
            //司机提现管理
            this.driverWithdrawalsManagement = jurisdictions[7].menus[5].choose;
            //运费结算明细
            this.freightDetail = F_jurisdiction('freightDetail', jurisdictions);
            let CashWithdrawal = [this.driverWithdrawalsManagement, this.freightDetail];
            this.CashWithdrawal = secondLevel(CashWithdrawal);
            this.driverRedBag = jurisdictions[7].menus[7].choose;
            //客户财务
            this.CRMFinance = jurisdictions[7].menus[9].choose;

            this.billApprovalRecord = jurisdictions[7].menus[14].choose;
            let customer = [this.CRMFinance, this.billApprovalRecord];
            this.secondLevelcustomer = secondLevel(customer);
            this.CRMAccount = jurisdictions[7].menus[15].choose;
            this.CRMReturnConfirm = jurisdictions[7].menus[19].choose;

            this.insuranceBill = jurisdictions[7].menus[22].choose;
            //押金管理
            // this.depositManagement = jurisdictions[7].menus[24].choose;
            let depositManagement = jurisdictions[7].menus[24].choose;
            // 司机补贴设置
            // this.subsidiesForVehicleStickers = jurisdictions[11].menus[3].choose;
            let subsidiesForVehicleStickers = jurisdictions[11].menus[3].choose;
            if (depositManagement || subsidiesForVehicleStickers) {
                this.depositManagement = true
            } else if (!depositManagement && !subsidiesForVehicleStickers) {
                this.depositManagement = false
            }
            this.driverReconciliationApprovalRecord = jurisdictions[7].menus[28].choose;

            let driverFinances = [this.driverFinance, this.driverReconciliationApprovalRecord];
            this.driverFinances = secondLevel(driverFinances);

            this.financeAnalyze = jurisdictions[8].choose;
            this.tradeRecord = F_jurisdiction('tradeRecord', jd);
            if (this.driverFinances || this.driverWithdrawalsManagement || this.driverRedBag || this.CRMFinance || this.CRMReturnConfirm || this.billApprovalRecord || this.CRMAccount || this.insuranceBill || this.depositManagement || this.financeAnalyze || this.tradeRecord) {
                this.financeManage = true;
            } else if (this.driverFinances == false && this.driverWithdrawalsManagement == false && this.driverRedBag == false && this.CRMFinance == false && this.CRMReturnConfirm == false && this.billApprovalRecord == false && this.CRMAccount == false && this.insuranceBill == false && this.depositManagement == false && this.financeAnalyze == false && !this.tradeRecord) {
                this.financeManage = false;
            }

            //事故权限  --------S-----
            this.accidentCenter = jurisdictions[15].menus[0].choose;

            this.areaManage = jurisdictions[0].choose;
            this.roleManage = jurisdictions[1].menus[0].choose;
            //员工权限
            // if (jurisdictions[1].menus.length == 13){
            this.staffManagement = jurisdictions[1].menus[4].choose;
            // }
            this.CRMFirstPage = jurisdictions[3].menus[0].choose;
            this.RepositoryList = jurisdictions[3].menus[6].choose;
            // if (jurisdictions[3].menus[11] != undefined){
            this.examine_list = jurisdictions[3].menus[7].choose;
            this.intentionCustomerList = jurisdictions[3].menus[11].choose;
            this.businessOpportunityManagerView = F_jurisdiction('businessOpportunityManagerView', jd);
            this.businessOpportunityStatistics = F_jurisdiction('businessOpportunityStatistics', jd);
            if (this.CRMFirstPage || this.RepositoryList || this.examine_list || this.intentionCustomerList || this.businessOpportunityManagerView || this.businessOpportunityStatistics) {
                this.CRMManage = true
            } else if (!this.CRMFirstPage && !this.RepositoryList && !this.examine_list && !this.intentionCustomerList && !this.businessOpportunityManagerView && !this.businessOpportunityStatistics) {
                this.CRMManage = false
            }
            // -----司机管理 --------
            // if (jurisdictions[5].menus.length == 25){
            this.carTeamApplicationRecord = jurisdictions[5].menus[21].choose;
            // 'carTeamApprovalRecord':'车队审批记录',
            this.carTeamApprovalRecord = jurisdictions[5].menus[22].choose;
            this.checklistOfVehicleStickers = jurisdictions[5].menus[18].choose;
            //司机列表
            this.driverFirstPage = jurisdictions[5].menus[0].choose;
            //司机认证
            this.driverApprove = jurisdictions[5].menus[3].choose;
            //运输公司
            this.fleetManagement = jurisdictions[5].menus[7].choose;
            // 司机车贴列表
            this.driverCarStickerApprove = jurisdictions[5].menus[10].choose;
            // //车贴补贴设置
            // this.CarStickerSubsidySetting =  jurisdictions[5].menus[11].choose;
            // 司机邀请列表
            this.driverInvitation = jurisdictions[5].menus[12].choose;

            if (this.driverApprove || this.driverFirstPage || this.fleetManagement || this.driverCarStickerApprove || this.checklistOfVehicleStickers || this.carTeamApplicationRecord) {
                this.driverManage = true
            } else if (this.driverApprove == false && this.driverFirstPage == false && this.fleetManagement == false && this.driverCarStickerApprove == false && this.checklistOfVehicleStickers == false && this.carTeamApplicationRecord == false) {
                this.driverManage = false
            }
            // }
            this.platformTerms = jurisdictions[10].menus[0].choose;
            this.auxiliaryMeans = jurisdictions[11].menus[0].choose;
            // if (jurisdictions[11].menus.length == 6){
            // 司机培训
            this.driverTrainingMaterials = jurisdictions[11].menus[4].choose;
            console.log(jurisdictions[11].menus);
            this.CEndSystem = jurisdictions[11].menus[5].choose;
            let auxiliaryMeans_a = jurisdictions[11].menus[0].choose;
            if (auxiliaryMeans_a || this.CarStickerSubsidySetting || this.subsidiesForVehicleStickers || this.driverTrainingMaterials) {
                this.auxiliaryMeans = true
            } else if (auxiliaryMeans_a == false && this.CarStickerSubsidySetting == false && this.subsidiesForVehicleStickers == false && this.driverTrainingMaterials == false) {
                this.auxiliaryMeans = false
            }

            this.opinionList = jurisdictions[14].menus[0].choose;
            this.backlog = AIfirstClass0('backlog', jd);

            this.driverOffLineTrain = F_jurisdiction('driverOffLineTrain', jd);
            //监管上报 regulatoryReporting 一级菜单
            this.regulatoryReporting = AIfirstClass0('regulatoryReporting', jd);
            //监管上报  二级菜单 (电子运单)
            this.electronicWaybill = F_jurisdiction('electronicWaybill', jd);
            //监管上报  二级菜单 (资金流水)
            this.capitalFlowSheet = F_jurisdiction('capitalFlowSheet', jd);

        },
        mounted() {
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.user = user;
            this.arr = user.result.currentUser.userName;
            this.token = user.result.token;

            let page = JSON.stringify({
                token: this.token
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/matrix/info', page, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res) => {
                this.code = res.body.result;

                function generateQRCode(rendermethod, picwidth, picheight, url) {
                    new QRCode('qrcode1', {
                        render: rendermethod, // 渲染方式有table方式（IE兼容）和canvas方式
                        width: picwidth, //宽度
                        height: picheight, //高度
                        text: url, //内容
                        typeNumber: -1, //计算模式
                        correctLevel: 2, //二维码纠错级别
                        background: "#ffffff", //背景颜色
                        foreground: "#000000" //二维码颜色
                    });
                }

                generateQRCode("table", 300, 300, this.code);
            });
        },
        watch: {
            $route(to, from) {
                if (to.path == '/driverFinanceExamine' || to.path == '/sjcw_record') {
                    this.cwClass = true
                } else {
                    this.cwClass = false
                }
                if (to.path == '/driverDispose' || to.path == '/clientDispose' || to.path == '/NewCustomerApprovalRecord') {
                    this.backlogClass = true
                } else {
                    this.backlogClass = false
                }
                if (to.path == '/bill_particulars') {
                    this.sjzdClass = true
                } else {
                    this.sjzdClass = false
                }
                if (to.path == '/kh_reconciliation' || to.path == '/sjzd_record') {
                    this.khClass = true
                } else {
                    this.khClass = false
                }
                if (to.path == '/khzd_particulars' || to.path == '/clientReconciliationeq') {
                    this.khzdClass = true
                } else {
                    this.khzdClass = false
                }
                if (to.path == '/returnedrecord' || to.path == '/client_bill') {
                    this.hkglClass = true
                } else {
                    this.hkglClass = false
                }
                if (to.path == '/transportDetails' || to.path == '/transport_manage') {
                    this.chdClass = true
                } else {
                    this.chdClass = false
                }
                if (to.path == '/order_manage' || to.path == '/order_manage/ddetails') {
                    this.ddClass = true
                } else {
                    this.ddClass = false
                }
                //    判断缓存----------------S------------/ReleaseCar/use-car
                if (this.$route.path !== '/shippingDocument' && this.$route.path !== '/sjmessage' && this.$route.path !== '/ReleaseCar/use-car' && this.$route.name !== 'orderDetails') {
                    //删除本地
                    sessionStorage.removeItem('shippingDocumentcurrentPage');
                    sessionStorage.removeItem('shippingDocumentcondition');
                    sessionStorage.removeItem('shippingDocumenttotal');
                }
                if (this.$route.path !== '/bulletedlist' && this.$route.path !== '/ReleaseCar' && this.$route.path !== '/ReleaseCar/Warehouse' && this.$route.path !== '/ReleaseCar/use-car' && this.$route.path !== '/ReleaseCar/transport' && this.$route.path !== '/ReleaseCar/dispatch' && this.$route.path !== '/ReleaseCar/warehouse/new_warehouse' && this.$route.path !== '/ReleaseCar/warehouse/list_warehouse' && this.$route.path !== '/ReleaseCar/transport/order_import' && this.$route.path !== '/ReleaseCar/transport/revised_order' && this.$route.name !== 'special_revised_position' && this.$route.name !== 'revised_position') {
                    sessionStorage.removeItem('bulletedListcurrentPage');
                    sessionStorage.removeItem('bulletedListcondition');
                    sessionStorage.removeItem('bulletedListtotal');
                }

                // web

                if (this.$route.path !== '/ReleaseCar/use-car') {
                    if (this.$route.name !== 'special_revised_position') {
                        sessionStorage.removeItem('collection');
                        sessionStorage.removeItem('useCarData');
                        sessionStorage.removeItem('consigneeArr');
                        sessionStorage.removeItem('consignorArr');
                    }
                }

                if (this.$route.path != '/redPacketRecords' && this.$route.name != 'orderDetails') {
                    //删除本地
                    sessionStorage.removeItem('redPacketRecordscurrentPage');
                    sessionStorage.removeItem('redPacketRecordscondition');
                    sessionStorage.removeItem('redPacketRecordstotal');
                }
                //    代办事项

                //
                if (this.$route.path != '/NewCustomerApprovalRecord' && this.$route.name != 'ViewTheDetails' && this.$route.name != 'changeinsert') {
                    sessionStorage.removeItem('NewCustomerApprovalRecordcurrentPage');
                    sessionStorage.removeItem('NewCustomerApprovalRecordcondition');
                    sessionStorage.removeItem('NewCustomerApprovalRecordtotal');
                    sessionStorage.removeItem('NewCustomerApprovalRecordpagesize');
                }

                //角色管理
                if (this.$route.path != '/role' && this.$route.path != '/roleJurisdiction') {
                    sessionStorage.removeItem('rolecurrentPage');
                    sessionStorage.removeItem('rolecondition');
                    sessionStorage.removeItem('roletotal');
                }
                // /员工
                if (this.$route.path != '/staffManagement' && this.$route.name != 'AddedstaffManagement') {
                    //删除本地
                    sessionStorage.removeItem('staffManagementCurrentPage');
                    sessionStorage.removeItem('staffManagementCondition');
                    sessionStorage.removeItem('staffManagementtotal');
                }
                if (this.$route.path != '/clientele' && this.$route.path != '/kh_reconciliation' && this.$route.name != "applyforinvoice" && this.$route.name != "returnedmoneyinform") {
                    //删除本地
                    sessionStorage.removeItem('clicentelecurrentPage');
                    sessionStorage.removeItem('clicentelecondition');
                    sessionStorage.removeItem('clicenteletotal');
                }

                // CRM 管理

                //客户管理  client_manage   ViewTheDetails  changeinsert
                if (this.$route.path != 'client_manage' && this.$route.path != 'ViewTheDetails' && this.$route.name != 'changeinsert') {
                    sessionStorage.removeItem('client_managecurrentPage');
                    sessionStorage.removeItem('client_managecondition');
                    sessionStorage.removeItem('client_managetotal');
                }
                //神批列表  ApprovalList   changeinsert  /ViewTheDetails
                if (this.$route.path != 'ApprovalList' && this.$route.path != 'ViewTheDetails' && this.$route.name != 'changeinsert') {
                    sessionStorage.removeItem('ApprovalListcurrentPage');
                    sessionStorage.removeItem('ApprovalListcondition');
                    sessionStorage.removeItem('ApprovalListtotal');
                }
                //运输车队
                if (this.$route.name != 'newCompany' && this.$route.name != 'transportCompany' && this.$route.name != 'driverDetails') {
                    sessionStorage.removeItem('transportCompanycurrentPage');
                    sessionStorage.removeItem('transportCompanycondition');
                    sessionStorage.removeItem('transportCompanytotal');
                }
                //司机列表  driver_manage
                if (this.$route.path != '/driver_manage' && this.$route.path != '/sjmessage') {
                    sessionStorage.removeItem('drivermanagecurrentPage');
                    sessionStorage.removeItem('drivermanagecondition');
                    sessionStorage.removeItem('drivermanagetotal');
                }
                //司机认证
                if (this.$route.path != '/driverAttestation' && this.$route.path != '/sjrz_attestation') {
                    sessionStorage.removeItem('driverAttestationcurrentPage');
                    sessionStorage.removeItem('driverAttestationcondition');
                    sessionStorage.removeItem('driverAttestationtotal');
                }
                //司机车贴审核
                if (this.$route.path != '/driver_StickerAudit' && this.$route.path != '/driver_StickerAuditDetails') {
                    //删除本地
                    sessionStorage.removeItem('driver_StickerAuditCurrentPage');
                    sessionStorage.removeItem('driver_StickerAuditCondition');
                    sessionStorage.removeItem('driver_StickerAudittotal');
                }
                //订单列表
                if (this.$route.path != '/order_manage' && this.$route.path != '/order_manage/ddetails') {
                    sessionStorage.removeItem('order_managecurrentPage');
                    sessionStorage.removeItem('order_managecondition');
                    sessionStorage.removeItem('order_managetotal');
                }
                //------------运输单管理------
                if (this.$route.path != '/turnout_manage' && this.$route.path != '/turnout_manage/transportException' && this.$route.path != '/transportDetails' && this.$route.name != 'addrun' && this.$route.name !== 'orderDetails') {
                    sessionStorage.removeItem('currentPage');
                    sessionStorage.removeItem('condition');
                    sessionStorage.removeItem('total');
                }
                //------------项目报表------
                if (this.$route.name != 'financtReport' && this.$route.name != 'mapReport' && this.$route.name != 'otherCostlist') {
                    //删除本地
                    sessionStorage.removeItem('financtReportCurrentPage');
                    sessionStorage.removeItem('financtReportcondition');
                    sessionStorage.removeItem('financtReporttotal');
                }

                //事故缓存
                if (this.$route.path != '/accidentcentre' && this.$route.name != 'accidentDetails' && this.$route.path != '/accidentcentre/accidentmessage' && this.$route.path != '/accidentcentre/accidentAudit') {
                    sessionStorage.removeItem('accidentcentrecurrentPage');
                    sessionStorage.removeItem('accidentcentrecondition');
                    sessionStorage.removeItem('accidentcentretotal');
                }
                //财务 司机
                if (this.$route.path != '/driver_bill' && this.$route.path != '/driverFinanceExamine' && this.$route.path != '/sjcw_record') {
                    //删除本地
                    sessionStorage.removeItem('driverbillCurrentPage');
                    sessionStorage.removeItem('driverbillcondition');
                    sessionStorage.removeItem('driverbilltotal');
                }
                //司机已出账单
                if (this.$route.path != '/driver_reconciliation' && this.$route.path != '/bill_particulars') {
                    sessionStorage.removeItem('driver_reconciliationcurrentPage');
                    sessionStorage.removeItem('driver_reconciliationcondition');
                    sessionStorage.removeItem('driver_reconciliationtotal');
                }
                //司机提现管理
                // if (){
                //
                // }
                //客户财务  clientele
                // if (){
                //
                // }
                //客户已出账单
                if (this.$route.path != '/clientReconciliationeq' && this.$route.path != '/khzd_particulars') {
                    sessionStorage.removeItem('clientReconciliationeqcurrentPage');
                    sessionStorage.removeItem('clientReconciliationeqcondition');
                    sessionStorage.removeItem('clientReconciliationeqtotal');
                }
                // 客户回款管理   client_bill   returnedrecord
                if (this.$route.path != '/client_bill' && this.$route.path != '/returnedrecord') {
                    //删除本地
                    sessionStorage.removeItem('returnedrecordcurrentPage');
                    sessionStorage.removeItem('returnedrecordcondition');
                    sessionStorage.removeItem('returnedrecordtotal');
                }
                //订单列表缓存


                //    判断缓存----------------E------------
            },
        },
        methods: {
            switchs() {

                //let token = this.token;
                // localStorage.setItem('key',token);
                // window.open(this.twoCUrl,'_self');

                // console.log(this.twoCUrl);
                // //拿到token
                // let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
                // this.token = user.result.token;
                //
                // document.getElementById("childValue").value = this.token;
                // window.open(this.twoCUrl,'_self');
                window.location.href = this.twoCUrl;
                console.log("11111111111111111111+");
            },
            aaa() {
                this.isCollapse = !this.isCollapse;
            },
            //点击切换侧边样式
            styles() {
                this.isActive = !this.isActive;
            },
            handleSelect(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            password() {
                this.$confirm('确定要执行退出操作吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '已退出!'
                    });
                    sessionStorage.clear();
                    this.$router.push({path: "/"});
                    // let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
                    // console.log(user);
                    // console.log(123456)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            },
            quit() {
                this.$router.push({path: "/passworld"});
            },
            erwm() {
                this.over = 0;
                let qrcode1 = document.getElementById('qrcode1');
                qrcode1.style.display = 'block';
                let ley = document.getElementById('layer');
                ley.style.display = 'block';
                let btn = document.getElementById('btn2');
            },
            erwm0() {
                this.code = '';
                this.over = 1;
                qrcode1.style.display = 'none';
                let ley = document.getElementById('layer');
                ley.style.display = 'none'
            },
        },
    }
</script>
<style lang="scss">
    .app {
        height: 100%;
        width: 100%;
        overflow: hidden;
        .bLog {
            display: inline-block;
            color: white;
            width: 14px;
            height: 14px;
            border: 1px solid red;
            box-sizing: border-box;
            border-radius: 50%;
            /*position: relative;*/

            display: inline-block;
            line-height: 14px;
            text-align: center;
            font-size: 14px;

            /*.bLog_size{*/
            /*display: inline-block;*/
            /*position: absolute;*/
            /*text-align: center;*/
            /*}*/
        }
        #header {
            width: 100%;
            background-color: #303539;
            color: #333;
            height: 61px !important;
            line-height: 61px;
            min-width: 750px;
            .logon {
                float: left;
                height: 51px;
                margin: 5px 0 5px 0;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .title {
                letter-spacing: 2px;
                float: left;
                font-size: 22px;
                color: #fff;
                padding-left: 5px;
                line-height: 60px;
            }
            .-r {
                float: right;
                width: 175px;
                height: 100%;
                cursor: pointer;
                position: relative;
                transition: background 1s;
                display: flex;
                justify-content: center;
                align-content: center;
                .-t-text {
                    font-size: 16px;
                    color: #fefefe;
                    i {
                        font-size: 14px;
                    }
                }
                .drop-down {
                    width: 174px;
                    height: 64px;
                    z-index: 99;
                    position: absolute;
                    opacity: 0;
                    top: -300px;
                    transition: top 0.3s;
                    transition: opacity 0.2s;

                    ul {
                        width: 174px;
                        background: white;
                        li {
                            border: 1px solid #dfdfdf;
                            width: 174px;
                            height: 60px;
                            i {
                                float: left;
                                line-height: 60px;
                                margin: 0 23px;
                            }
                            span {
                                float: left;
                            }
                        }
                        li:nth-child(1) {
                            display: flex;
                            justify-content: center;
                            align-content: center;
                            font-size: 16px;
                        }
                    }
                }
                .el-menu--inline {
                    color: #F2F2F2;
                }
            }
            .-r:hover {
                .drop-down {
                    top: 0px;
                    opacity: 1;
                }
            }
        }
        //响应
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 225px;
            min-height: 400px;
        }
        .contain {
            width: 100%;
            height: 100%;
            margin-bottom: 50px;
        }
        .el-menu {
            color: #b0b2b1;
            background-color: #333743;
            padding-left: 3px;
            border: 0;
            overflow: hidden;
            overflow-y: auto;
            .con {
                color: white;
            }
            .template {
                color: white;
            }
        }
        .main {
            float: left;
            padding: 30px;
            width: 100%;
            background: #eaedf2;
            overflow-y: auto;
            margin-bottom: 45px;
        }
        .el-dialog--center {
            position: relative;
            img {
                position: absolute;
                top: 100px;
            }
        }
        #layer {
            width: 100%;
            height: 100%;
            z-index: 10000;
            position: absolute;
            background-color: rgba(128, 128, 128, 0.4);
            display: none;
        }
        .code {
            display: inline-block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        #qrcode1 {
            z-index: 1000000;
            display: none;
            border: 1px solid #cccccc;
            width: 330px;
            height: 330px;
            background-color: #cccccc;
            padding-left: 15px;
            padding-top: 10px;
            box-sizing: border-box;
            box-shadow: 0 0 9px 10px #F2F6FC;
            overflow: hidden;
        }
        .btnBottom {
            text-align: center;
        }
        #btn2 {
            margin: 0 auto;
            text-align: center;
            margin: 0 auto;
            margin-top: 25px;
        }
        .el-icon-close {
            font-size: 18px;
        }

        .click_classOne {
            padding-left: 20px !important;
            color: rgb(42, 125, 247) !important;
        }
        .click_class {
            padding-left: 40px !important;
            color: rgb(42, 125, 247) !important;
        }
        .el-menu-vertical-demo {
            padding-bottom: 170px;
        }
    }


</style>
