import VueRouter from 'vue-router'
// 导入首页组件
import Index from './main/index.vue'
// 登陆组件导入
import Login from './star/login.vue'
// 修改密码组件的导入
import Passworld from './star/passworld.vue'
// 侧边导航组件导入
import Client_manage from './main/mainPage/client_manage.vue'
import Platform_clause from './main/mainPage/platform_clause.vue'
import Insert from "./main/client_manage/insert.vue"
import Change_Insert from "./main/client_manage/change_insert.vue"
import View_The_Details from "./main/client_manage/ViewTheDetails.vue"
import business_Opportunity from "./main/client_manage/business_Opportunity.vue"

import Information_opportunity from "./main/client_manage/Information_opportunity.vue"
import statistics from "./main/client_manage/statistics.vue"


import xj_Subdivision from "./main/organization_manage/xjSubdivision.vue"
import ApprovalList from './main/client_manage/ApprovalList.vue'
import Table from './main/client_manage/components/table.vue'
import officialIntendedCustomer from './main/client_manage/official/officialIntendedCustomer.vue'

//代办事项    backlog
// 司机账单审批
import backlog from './main/backlog/backlog.vue'
import driverDispose from './main/backlog/driverDispose.vue'
// 代办客户
import khDispose from './main/backlog/kh_dispose.vue'
//新增客户
import NewCustomerApprovalRecord from "./main/backlog/NewCustomerApprovalRecord.vue"
// listAccountRegulation  调账审批列表
import listAccountRegulation from "./main/backlog/listAccountRegulation.vue"
//clientlistAccountRegulation 客户调账审批列表
import clientlistAccountRegulation from "./main/backlog/clientlistAccountRegulation.vue"
//teamApproval  车队审批
import teamApproval from "./main/backlog/teamApproval.vue"
//红包审批记录
import ApprovalRedEnvelopes from "./main/backlog/ApprovalRedEnvelopes.vue"
//司机调账审批
import driverApproval from './main/backlog/driverApproval.vue'

// 区域管理
import Area_manage from './main/mainPage/area_manage.vue'
// import two_C_login from './main/two_C_login.vue'
//组织管理   organization_manage   -----
import Organization_manage from './main/organization_manage/organization_manage.vue'
//创建分公司
import branchCompany from "./main/organization_manage/branch_company.vue"

// 创建部门
import createDepartment from "./main/organization_manage/createDepartment.vue"
//新建分公司
import NewBranchOffice from "./main/organization_manage/New_BranchOffice.vue"
 //员工管理
import staffManagement from "./main/mainPage/staffManagement.vue"
// AddedstaffManagement
import AddedstaffManagement from "./main/mainPage/AddedstaffManagement.vue"


 // 部门
import department from "./main/organization_manage/department.vue"
//角色
import Role from "./main/organization_manage/role.vue"
// 用户
import User from "./main/organization_manage/user.vue"
// 角色权限 权限  权限页面
import jsJurisdiction from './main/organization_manage/js_jurisdiction.vue'
// crm
import analysis from './main/client_manage/components/analysis.vue'
import count from './main/client_manage/components/count.vue'

//司机管理  driver  ----------文件下
// 运输公司
import transportCompany from './main/driver/transportCompany.vue'
//运输公司新建
import newCompany from './main/driver/newcompany.vue'
//运输公司司机详情
import driverDetails from  './main/driver/driverDetails.vue'
//新建车队申请记录   motorcadeApplyFor
import motorcadeApplyFor from  './main/driver/motorcadeApplyFor.vue'

// 司机列表
import Driver_manage from './main/driver/driver_manage.vue'
//司机邀请列表
import driverInvitationList from './main/driver/driverInvitationList.vue'
// 司机详情 基本信息页
import sj_message from './main/driver/sj_message.vue'
// 司机认证
import sjAttestation from './main/driver/sj_attestation.vue'
//司机认证   变更
import sjrzAttestation from './main/driver/sjrz_attestation.vue'
//司机认证   邀请详情
import invitation from './main/driver/invitation.vue'
//司机车贴审核
import Driver_StickerAudit from './main/driver/driver_StickerAudit.vue'
//司机车贴审核列表
import Driver_CarAudit from './main/driver/driver_CarAudit.vue'
//司机车贴审核
import Driver_StickerAuditExamine from './main/driver/driver_StickerAuditExamine.vue'
//司机车贴查看
import Driver_StickerAuditDetails from './main/driver/driver_StickerAuditDetails.vue'
//司机线下培训
import driverTraining from './main/driver/driverTraining.vue'
//司机培训记录
import trainingRecord from './main/driver/trainingRecord.vue'


//项目管理   capacity  -------文件下

//bulletedList   项目列表
import bulletedList from './main/capacity/bulletedList.vue'
//点击操作发布用车
import Release_car from './main/capacity/ReleaseCar.vue'
// warehouselist  仓库列表
import warehouselist from './main/capacity/warehouseList.vue'
//其他成本 otherCostlist
import otherCostlist from './main/capacity/otherCostlist.vue'

//warehouse   项目 wed
import warehouse from './main/capacity/components/NewWarehouse/Warehouse.vue'

//new_warehouse   项目 wed
import new_warehouse from './main/capacity/components/NewWarehouse/new_warehouse.vue'

//list_warehouse   项目 wed
import list_warehouse from './main/capacity/components/NewWarehouse/list_warehouse.vue'

// order 项目 wed
// import order from './main/capacity/order.vue'
// order_import 项目 wed
import order_import from './main/capacity/components/TransportDemand/order_import.vue'
// revised_order 项目 wed
import revised_order from './main/capacity/components/TransportDemand/revised_order.vue'
//revised_position 批量修改
import revised_position from './main/capacity/components/TransportDemand/revised_position.vue'
//运输需求管理
import transport from './main/capacity/components/TransportDemand/TransportDemand.vue'
//智能调度
import dispatch from './main/capacity/components/Intelligence/dispatch.vue'
// use-car 项目 wed
import use_car from './main/capacity/components/use-car/use-car.vue'
// import thirdParty from './main/capacity/components/use-car/thirdParty.vue'
import ordinaryUser from './main/capacity/components/use-car/ordinaryUser.vue'
//修正地址
import special_revised_position from './main/capacity/components/use-car/special_revised_position.vue'

// 订单管理
import Order_manage from './main/capacity/order_manage.vue'
// 订单详情
import ddDetails from './main/capacity/dd_details.vue'
//项目财务  itemsFinance
import itemsFinance from './main/capacity/itemsFinance.vue'
// TzApprovalRecord 调账审批记录
import TzApprovalRecord from './main/capacity/TzApprovalRecord.vue'

//运输单详情
import shippingDocument from './main/capacity/shippingDocument.vue'
//出车单管理
import turnout_manage from './main/capacity/turnout_manage.vue'
//红包审批记录
import redPacket_records from './main/capacity/redPacketRecords.vue'


//出车但管理加任务
import addRun from './main/capacity/add-run.vue'
//出车单详情  异常处理
import ysException from './main/capacity/ys_exception.vue'
// 出车单详情 查看
import ysdDetails from './main/capacity/ysd_details.vue'
//    ---------保险 模块   insurance
// 事故中心  accidentcentre
import accidentcentre from './main/insurance/accidentcentre.vue'
// ----  事故详情  accidentDetails
import accidentDetails from './main/insurance/accidentDetails.vue'
//无车承运
import Waybill  from './main/transportation/waybill.vue'
//新建运单
import increaseWaybill  from './main/transportation/increaseWaybill.vue'
//资金流水
import Detailed  from './main/transportation/Detailed.vue'
//运单详情
import DetailsWaybill  from './main/transportation/detailsWaybill.vue'


//       创建（ 客服 ）  establish
import establish from './main/insurance/establish.vue'
//       录入调查和赔付信息  accidentmessage
import accidentmessage from './main/insurance/accidentmessage.vue'
// 金融部总监审核    accidentAudit
import accidentAudit from './main/insurance/accidentAudit.vue'

//财务管理    finance    ----->文件下
// 司机财务
import Driver_bill from './main/finance/driver_bill.vue'
//司机财务审批记录
import driverApprovalList from './main/finance/driverApprovalList.vue'
// 司机财务 查看
import sjcwExamine from './main/finance/sjcw_examine.vue'
//  司机财务  调账审批申请记录
import sjcwRecord from './main/finance/sjcw_record.vue'
//司机已出账单
import Driver_reconciliation from './main/finance/driver_reconciliation.vue'
// 司机已出账单 查看
import Bill_particulars from './main/finance/bill_particulars.vue'
//司机红包
import driverRedEnvelope from './main/finance/driverRedEnvelope.vue'
// 客户财务
import Clientele from './main/finance/clientele.vue'
// 客户财务   查看
import khReconciliation from './main/finance/kh_reconciliation.vue'
// 客户已出账单
import khReconciliationeq from './main/finance/kh_reconciliationeq.vue'
// 客户已出账单 查看
import khzdParticulars from './main/finance/khzdParticulars.vue'
// 客户 调账明细
import khDetail from './main/finance/kh_detail.vue'
// 客户已出账单 调账审批申请记录
import sjzdRecord from './main/finance/sjzdRecord.vue'
//客户回款管理
import Client_bill from './main/finance/client_bill.vue'
//保险账单
import insurance_bill from './main/finance/Insurance_bill.vue'
// 客户回款管理 回款记录
import returnedRecord from './main/finance/returnedRecord.vue'
//财务分析
import Finance_analyze from './main/finance/finance_analyze.vue'
//财务 押金
import financeCashPledge from './main/finance/cashPledge.vue'
//司机提现管理    driverWithdraw
import DriverWithdraw from './main/finance/driverwithdraw.vue'
// 运费结算
import Freight from './main/finance/freight.vue'

//transaction record 交易列表
import transactionRecord from './main/finance/transactionRecord.vue'

//平台条款
import Post from './main/clause/post.vue'//岗位
import Client from './main/clause/client.vue'//客户
import Serve from './main/clause/serve.vue'//服务
//辅助工具    tools  ----->文件下
//版本维护
import versions from './main/tools/versions.vue'
// 车贴补贴设置
import driver_StickerAuditSettings from './main/tools/driver_StickerAuditSettings.vue'
import Message from './main/tools/Message.vue'

import Assist_instrument from './main/tools/assist_instrument.vue' //消息推送
import MessageList from './main/tools/messageList.vue' //消息列表
import Feedback from './main/tools/feedback.vue'  //消息反馈
import Training_materials from './main/tools/TrainingMaterials.vue'  //司机培训资料
import orderDetails from './main/capacity/order-details.vue'  //运输单出车单详情
// 物料管理

 import Management from './main/materiel/management.vue'
 import myStock from './main/materiel/myStock.vue'

import financtReport from './main/capacity/financtReport.vue'
// mapReport
import mapReport from './main/capacity/mapReport.vue'

import residentInformation from './main/capacity/components/use-car/residentInformation.vue' //驻场馆里
 //applyforinvoice 申请开票
import applyforinvoice from './main/finance/applyforinvoice.vue'  //运输单出车单详情
 //clientinvoiceList 客户开票明细
import clientinvoiceList from './main/finance/clientinvoiceList.vue'
// returnedMoney  客户回款明细
import returnedMoney from './main/finance/returnedMoney.vue'
// invoiceapprovalprocess  开票审批
import invoiceapprovalprocess from './main/backlog/invoiceapprovalprocess.vue'
// ticketapplyforlist  开票申请记录
import ticketapplyforlist from './main/finance/ticketapplyforlist.vue'

// 3. 创建路由对象
var router = new VueRouter({
    routes: [
        // 登陆组件
        {path:'/',
            component: (resolve) => require(['./star/login.vue'], resolve),

        },
        // 首页组件
        {path:'/index',
            component: (resolve) => require(['./main/index.vue'], resolve),
            beforeEnter: (to, from, next) => {
                if (sessionStorage.getItem('key')) {
                    next()
                } else {
                    next({
                        path: '/',
                    });
                }
            },
            children:[
                // 侧边导航组件
                {   path:'/area_manage',component:Area_manage,meta: {keepAlive: true}},
                //员工管理  staffManagement
                {   path:'/staffManagement',component:staffManagement,meta: {keepAlive: true}},
                //新建员工  AddedstaffManagement
                {   path:'/AddedstaffManagement',component:AddedstaffManagement,name:'AddedstaffManagement',meta: {keepAlive: true}},

                {   path:'/organization_manage',component:Organization_manage,meta: {keepAlive: true}},
                {   path:'/client_manage',component:Client_manage,meta: {keepAlive: true}},
                {   path:'/ApprovalList', component:ApprovalList,meta: {keepAlive: true}},
                {   path:'/table', component:Table,meta: {keepAlive: true}},
                //官网意向客户
                {   path:'/officialIntendedCustomer', component:officialIntendedCustomer,meta: {keepAlive: true}},
                //2C端登录入口
                // {   path:'/two_C_login',component:two_C_login,meta: {keepAlive: true}},
            // 创建部门
            // import createDepartment from "./main/organization_manage/createDepartment.vue"
                {   path:'/createDepartment', component:createDepartment,name:'createDepartment',meta: {keepAlive: true}},

                // 代办事项
                {   path:'/backlog', component:backlog,meta: {keepAlive: true}},
                // listAccountRegulation  调账审批列表
                {   path:'/listAccountRegulation',name:'listAccountRegulation', component:listAccountRegulation,meta: {keepAlive: true}},

                //driverApproval 代办审批
                {   path:'/driverApproval', component : driverApproval ,name:'driverApproval', meta: { keepAlive: true }},
                //clientlistAccountRegulation   客户调账审批列表
                {   path:'/clientlistAccountRegulation',name:'clientlistAccountRegulation', component:clientlistAccountRegulation,meta: {keepAlive: true}},
                //teamApproval  车队审批
                {   path:'/teamApproval',name:'teamApproval', component:teamApproval,meta: {keepAlive: true}},
                //红包审批记录
                {   path:'/ApprovalRedEnvelopes',name:'ApprovalRedEnvelopes', component:ApprovalRedEnvelopes,meta: {keepAlive: true}},


                // 运输公司  transportCompany
                {   path:'/transportCompany',name:'transportCompany', component:transportCompany,meta: {keepAlive: true}},
                //运输公司新建   newCompany
                {   path:'/transportCompany/newcompany',path:'/transportCompany/newcompany/:id',name:'newCompany', component:newCompany,meta: {keepAlive: true}},
                //运输公司 司机数量详情
                {   path:'/transportCompany/driverDetails',name: 'driverDetails',component:driverDetails ,meta: {keepAlive: true}},
                //新建车队申请记录   motorcadeApplyFor
                {   path:'/motorcadeApplyFor',name: 'motorcadeApplyFor',component:motorcadeApplyFor ,meta: {keepAlive: true}},
                //其他成本 otherCostlist
                {   path:'/otherCostlist',name: 'otherCostlist',component:otherCostlist ,meta: {keepAlive: true}},

                //司机列表
                {   path:'/driver_manage', component:Driver_manage,meta: {keepAlive: true}},
                //司机邀请列表
                {   path:'/driverInvitationList', component:driverInvitationList, name:driverInvitationList,meta: {keepAlive: true}},
                //司机车贴审核
                {   path:'/driver_StickerAudit', component:Driver_StickerAudit,meta: {keepAlive: true}},
                //司机车贴审核列表
                {   path:'/driver_CarAudit', component:Driver_CarAudit,meta: {keepAlive: true}},
                //司机车贴详情
                {   path:'/driver_StickerAuditDetails', component:Driver_StickerAuditDetails,meta: {keepAlive: true}},
                //司机车贴审核
                {   path:'/driver_StickerAuditExamine', component:Driver_StickerAuditExamine,meta: {keepAlive: true}},
                //司机线下培训
                {   path:'/driverTraining', name:'driverTraining',component:driverTraining,meta: {keepAlive: true}},
                //司机培训记录
                {   path:'/trainingRecord', name:'trainingRecord',component:trainingRecord,meta: {keepAlive: true}},
                // 运营订单管理
                {   path: '/order_manage',name:'ordermanage', component: Order_manage,meta: { keepAlive: true, }},
                //bulletedList   项目列表
                {   path:'/bulletedlist',name:'bulletedList',component:bulletedList,meta: { keepAlive: true, }},
                // 点击发布用车
                {   path:'/ReleaseCar',name:'ReleaseCar',component:Release_car,meta: { keepAlive: true, },children:[

                        {   path:'/ReleaseCar',name:'warehouse',component:warehouse,meta: { keepAlive: true, },children:[
                                {   path:'/ReleaseCar',name:'new_warehouse',component:new_warehouse,meta: { keepAlive: true, }},

                                {   path:'/ReleaseCar/warehouse/new_warehouse',name:'new_warehouse',component:new_warehouse,meta: { keepAlive: true, }},
                                {   path:'/ReleaseCar/warehouse/list_warehouse',name:'list_warehouse',component:list_warehouse,meta: { keepAlive: true, }},

                            ]},
                        {   path:'/ReleaseCar/warehouse',name:'warehouse',component:warehouse,meta: { keepAlive: true, },children:[
                                {   path:'/ReleaseCar/warehouse',name:'new_warehouse',component:new_warehouse,meta: { keepAlive: true, }},

                                {   path:'/ReleaseCar/warehouse/new_warehouse',name:'new_warehouse',component:new_warehouse,meta: { keepAlive: true, }},
                                {   path:'/ReleaseCar/warehouse/list_warehouse',name:'list_warehouse',component:list_warehouse,meta: { keepAlive: true, }},

                            ]},
                        {   path:'/ReleaseCar/transport',name:'transport',component:transport,meta: { keepAlive: true, },children:[
                                {   path:'/ReleaseCar/transport',name:'order_import',component:order_import,meta: { keepAlive: true, }},
                                {   path:'/ReleaseCar/transport/order_import',name:'order_import',component:order_import,meta: { keepAlive: true, }},
                                {   path:'/ReleaseCar/transport/revised_order',name:'revised_order',component:revised_order,meta: { keepAlive: true, }},
                                {   path:'/ReleaseCar/transport/revised_position',name:'revised_position',component:revised_position,meta: { keepAlive: true, }},

                            ]},
                        // /ReleaseCar/dispatch
                        {   path:'/ReleaseCar/dispatch',name:'dispatch',component:dispatch,meta: { keepAlive: true, }},
                        {   path:'/ReleaseCar/ordinaryUser',name:'ordinaryUser',component:ordinaryUser,meta: { keepAlive: true, }},
                        // /ReleaseCar/use-car
                        {   path:'/ReleaseCar/use-car',name:'use-car',component:use_car,meta: { keepAlive: false, }},
                        {   path:'/ReleaseCar/residentInformation',name:'residentInformation',component:residentInformation,meta: { keepAlive: true, }},
                        {   path:'/ReleaseCar/use-car/special_revised_position',name:'special_revised_position',component:special_revised_position,meta: { keepAlive: false, }},


                    ]},

                // {   path:'/use_car',name:'use_car',component:use_car,meta: { keepAlive: true, }},
                // {   path:'/thirdParty',name:'thirdParty',component:thirdParty,meta: { keepAlive: true, }},

                // warehouselist  仓库列表
                {   path:'/warehouselist',name:'warehouselist',component:warehouselist,meta: { keepAlive: true, }},

                // 订单管理详情
                {   path:'/order_manage/ddetails',name:'ddetails',component:ddDetails,meta: { keepAlive: true, }},

                 // 运输单详情
                {   path:'/shippingDocument',name:'shippingDocument',component:shippingDocument,meta: { keepAlive: true, }},
                //项目财务  itemsFinance
                {   path:'/itemsFinance',name:'itemsFinance',component:itemsFinance,meta: {keepAlive: true}},
// TzApprovalRecord 调账审批记录
                {   path:'/TzApprovalRecord',name:'TzApprovalRecord',component:TzApprovalRecord,meta: {keepAlive: true}},

                // 出车单详情
                {   path:'/orderDetails',name:'orderDetails',component:orderDetails,meta: {keepAlive: true}},
                //出车单异常处理
                {   path:'/turnout_manage/transportException',component:ysException,meta: {keepAlive: true}},
                {   path:'/redPacketRecords', component:redPacket_records,meta: {keepAlive: true}},
                //
                {   path:'/turnout_manage', component:turnout_manage,meta: {keepAlive: true}},

                {   path:'/driver_bill', component : Driver_bill , meta: { keepAlive: true }},
                //司机财务审核
                {   path:'/driverApprovalList', component : driverApprovalList ,name:'driverApprovalList', meta: { keepAlive: true }},
                // applyforinvoice
                {   path:'/applyforinvoice', component : applyforinvoice ,name:'applyforinvoice', meta: { keepAlive: true }},
                // clientinvoiceList 客户开票明细
                {   path:'/clientinvoiceList', component : clientinvoiceList ,name:'clientinvoiceList', meta: { keepAlive: true }},
                // returnedMoney  客户回款明细
                {   path:'/returnedMoney', component : returnedMoney ,name:'returnedMoney', meta: { keepAlive: true }},
                //出车单管理加任务
                {   path:'/add-run', component : addRun ,name:'addrun', meta: { keepAlive: true }},
                //财务管理司机已出账单
                {   path:'/driver_reconciliation', component:Driver_reconciliation,meta: {keepAlive: true}},
                {   path:'/clientele', component:Clientele,meta: {keepAlive: true}},
                {   path: '/client_bill', component:Client_bill,meta: {keepAlive: true}},
                //保险账单
                {   path: '/Insurance_bill', component:insurance_bill,meta: {keepAlive: true}},
                //财务管理/财务管理
                {   path:'/returnedrecord',component:returnedRecord,meta: {keepAlive: true}},
                //司机红包
                {   path:'/driverRedEnvelope', component:driverRedEnvelope,meta: {keepAlive: true}},
                //财务分析
                {   path:'/finance_analyze',component:Finance_analyze,meta: {keepAlive: true}},
                // 平台条款
                {   path:'/platform_clause',component:Platform_clause,meta: {keepAlive: true}},
                //消息推送
                {   path:'/assist_instrument',component:Assist_instrument,meta: {keepAlive: true}},
                // 司机信息
                {   path:'/sjmessage',component:sj_message,meta: {keepAlive: true}},
                //司机邀请详情
                {   path:'/invitation',component:invitation,name:invitation,meta: {keepAlive: true}},

                // 司机认证
                {   path:'/driverAttestation',component:sjAttestation,meta: {keepAlive: true}},
                {   path:'/sjrz_attestation',component:sjrzAttestation,meta: {keepAlive: true}},
// 组织管理子组件
//                 {   path:'/department',component:department,meta: {keepAlive: true}},
                //创建部门
                {   path:'/branch_company',component:branchCompany,meta: {keepAlive: true}},
                //新建分公司
                {   path:'/New_BranchOffice',component:NewBranchOffice,meta: {keepAlive: true}},
                //


                // {   path:'/department',component:department,meta: {keepAlive: true}},
                {   path:'/role', component:Role,meta: {keepAlive: true}},
                {   path:'/user',component:User,meta: {keepAlive: true}},
                {   path:'/insert',component:Insert,meta: {keepAlive: true}},
                {   path:'/change_insert',component:Change_Insert,name:'changeinsert',meta: {keepAlive: true}},
                {   path:'/ViewTheDetails',component:View_The_Details,name:'ViewTheDetails',meta: {keepAlive: true}},
                {   path:'/business_Opportunity',component:business_Opportunity,name:'business_Opportunity',meta: {keepAlive: true}},
                {   path:'/Information_opportunity',component:Information_opportunity,name:'Information_opportunity',meta: {keepAlive: true}},
                {   path:'/statistics',component:statistics,name:'statistics',meta: {keepAlive: true},
                    children:[
                        { path:'/statistics/analysis',component:analysis,name:'analysis',meta: {keepAlive: true}},
                        {   path:'/statistics/count',component:count,name:'count',meta: {keepAlive: true}}
                    ]
                },



                {   path:'/xjSubdivision',component:xj_Subdivision,meta: {keepAlive: true}},

                {   path:'/NewCustomerApprovalRecord',component:NewCustomerApprovalRecord,meta: {keepAlive: true}},
                {   path:'/bill_particulars',component:Bill_particulars,meta: {keepAlive: true}},
                {   path:'/driverDispose',component:driverDispose,meta: {keepAlive: true}},
                // 角色权限
                {   path:'/roleJurisdiction',component:jsJurisdiction,meta: {keepAlive: true}},
                {   path:'/kh_reconciliation',component:khReconciliation,meta: {keepAlive: true}},

                // 司机账单审批记录、
                {   path:'/sjzd_record',component:sjzdRecord,meta: {keepAlive: true}},
                {   path:'/clientReconciliationeq',component:khReconciliationeq,meta: {keepAlive: true}},
                {   path:'/khzd_particulars',component:khzdParticulars,meta: {keepAlive: true}},
                //司机财务
                {   path:'/driverFinanceExamine',component:sjcwExamine,meta: {keepAlive: true}},
                {   path:'/sjcw_record',component :sjcwRecord ,meta: {keepAlive: true}},
                // driverFinanceRecord
                //订单管理 订单详情
                //    调账明细
                {   path:'/kh_detail',component: khDetail,meta: {keepAlive: true}},
                // clientDetail
                {   path:'/clientDispose',component:khDispose,meta: { keepAlive : true}},
                // 事故中心  accidentcentre
                {   path:'/accidentcentre',component:accidentcentre , name:'accidentcentre',meta: { keepAlive : true}},
                // ----  事故详情  accidentDetails
                {   path:'/accidentcentre/accidentDetails',component:accidentDetails , name:'accidentDetails',meta: { keepAlive : true}},
                //       创建（ 客服 ）  establish
                {   path:'/accidentcentre/establish',component:establish,name:'establish',meta: { keepAlive : true}},
                //       录入调查和赔付信息  accidentmessage
                {   path:'/accidentcentre/accidentmessage',component:accidentmessage,name:'accidentmessage',meta: { keepAlive : true}},
                // 金融部总监审核    accidentAudit
                {   path:'/accidentcentre/accidentAudit',component:accidentAudit,name:'accidentAudit',meta: { keepAlive : true}},

                {   path:'/Waybill',component:Waybill,meta: { keepAlive : true}},
                //新建运单
                {   path:'/increaseWaybill',component:increaseWaybill,meta: { keepAlive : true}},
                //资金流水
                {   path:'/Detailed',component:Detailed,meta: { keepAlive : true}},
                //运单详情
                {   path:'/DetailsWaybill/',name:DetailsWaybill,component:DetailsWaybill,meta: { keepAlive : true}},

                //财务
                {   path:'/cashpledge',component:financeCashPledge,meta: { keepAlive : true}},
                //司机提现管理
                {   path:'/driverwithdraw',name:'driverwithdraw',component:DriverWithdraw,meta: { keepAlive : true}},
                //运费结算
                {   path:'/freight',name:'freight',component:Freight,meta: { keepAlive : true}},

                //transactionRecord 交易列表
                {   path:'/transactionRecord',name:'transactionRecord',component:transactionRecord,meta: { keepAlive : true}},

                //版本维护
                {   path :'/versions',component : versions ,meta: { keepAlive : true} },

                //平台条款
                {   path : '/client' , component:Client},//客户
                {   path : '/post' , component:Post},//岗位
                {   path : '/serve' , component:Serve},//服务
                //辅助功能
                {   path : '/messageList',name:'messageList',component:MessageList,meta: { keepAlive : true} },//消息列表
                {   path : '/message',name:'message',component:Message,meta: { keepAlive : true} },//消息列表

                //
                {   path : '/feedback',name:'feedback',component:Feedback,meta: { keepAlive : true} },
                //司机培训资料
                {path:'/TrainingMaterials',name:'Training_materials',component:Training_materials,meta:{keepAlive:true}},
                // 车贴补贴设置
                {path : '/driverStickerAuditSettings',name:'driver_StickerAuditSettings',component:driver_StickerAuditSettings,meta: { keepAlive : true}},

                //物料管理
                {path:'/Management',name:'Management',component:Management,meta: { keepAlive : true}},
            //    我的库存
                {path:'/myStock',name:'myStock',component:myStock,meta: { keepAlive : true}},
            //项目财务导出明细 financtReport
                {path:'/financtReport',name:'financtReport',component:financtReport,meta: { keepAlive : true}},
                // mapReport 报表
                {path:'/mapReport',name:'mapReport',component:mapReport},
                // invoiceapprovalprocess  开票审批
                {path:'/invoiceapprovalprocess',name:'invoiceapprovalprocess',component:invoiceapprovalprocess,meta: { keepAlive : true}},
                // ticketapplyforlist  开票申请记录
                // {path:'/ticketapplyforlist',name:'ticketapplyforlist',component:ticketapplyforlist,meta: { keepAlive : true}},
                {path:'/ticketapplyforlist',name:'ticketapplyforlist', component: (resolve) => require(['./main/finance/ticketapplyforlist.vue'], resolve),},
            //returnedmoneyinform  回款通知
                {path:'/returnedmoneyinform',name:'returnedmoneyinform', component: (resolve) => require(['./main/finance/returnedmoneyinform.vue'], resolve),},
                // returnedmoneyinD 回款审批
                {path:'/returnedmoneyinD',name:'returnedmoneyinD', component: (resolve) => require(['./main/backlog/returnedmoneyinD.vue'], resolve),},
            //    returnedMoneylist 回款通知列表
                {path:'/returnedMoneylist',name:'returnedMoneylist', component: (resolve) => require(['./main/finance/returnedMoneylist.vue'], resolve),},
                // dispatchlistApproval   出车单调账
                {path:'/dispatchlistApproval',name:'dispatchlistApproval', component: (resolve) => require(['./main/backlog/dispatchlistApproval.vue'], resolve),},
                // managementBacklog   物料申请审批列表
                {path:'/managementBacklog',name:'managementBacklog', component: (resolve) => require(['./main/backlog/managementBacklog.vue'], resolve),},

            ]
        },
        {path:'/passworld', component:Passworld},

    ],

});

// router.beforeEach((to, from, next) => {
//     let toDepth = to.path.split('/').length;
//     let fromDepth = from.path.split('/').length;
//     if (toDepth < fromDepth) {
//         // console.log('后退。。。')
//         from.meta.keepAlive = false
//         to.meta.keepAlive = true
//     }
//     next()
// });
// 把路由对象暴露出去
export default router