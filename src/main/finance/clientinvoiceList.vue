<template>
    <div class="main clientinvoiceList">
        <div class="none header">
            当前位置：财务管理 > 客户开票明细
        </div>
        <el-form :inline="true" :model="forminline" class="demo-form-inline none">
            <!--<el-form-item label="管理区">-->
                <!--<el-select v-model="forminline.regionId" placeholder="请选择所管理区域">-->
                    <!--<el-option label="全部" value=""></el-option>-->
                    <!--<el-option v-for="i in regionarr" :label='i.name' :value="i.id" :key="i.id"></el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->

            <el-form-item label="所属分公司">
                <el-select v-model="forminline.filialeId" placeholder="请选择所属分公司">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in link" :label='i.filialeName' :value="i.filialeId" :key="i.filialeId"></el-option>
                </el-select>
            </el-form-item>
            <!--<el-form-item label="项目编号">-->
                <!--<el-input v-model="forminline.customerId" placeholder="请输入项目编号" class="list_driver"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="项目名称">
                <el-input v-model="forminline.customerName" placeholder="请输入项目姓名"></el-input>
            </el-form-item>
            <el-form-item label="项目类型">
                <!--<el-input v-model="formInline.user" placeholder="请输入项目类型"></el-input>-->
                <el-select v-model="forminline.projectType" placeholder="请选择项目类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="临时项目" value="InterimCustomer"></el-option>
                    <el-option label="标准项目" value="ProjectCustomer"></el-option>
                    <el-option label="背靠背项目" value="BackToBackCustomer"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发票类型">
                <!--<el-input v-model="formInline.user" placeholder="请输入项目类型"></el-input>-->
                <el-select v-model="forminline.type" placeholder="请选择发票类别" >
                    <el-option label="全部" value=""></el-option>

                    <el-option label="增值税普通发票" value="增值税普通发票"></el-option>
                    <el-option label="增值税专用发票" value="增值税专用发票"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售专员">
                <el-input v-model="forminline.saleName" placeholder="请输入销售专员"></el-input>
            </el-form-item>
            <el-form-item label="运营专员">
                <el-input v-model="forminline.projectName" placeholder="请输入运营专员" class="list_driver"></el-input>
            </el-form-item>
            <el-form-item label="开票单位">
                <el-select v-model="forminline.freezeAccount" placeholder="请选择" >
                    <el-option label="全部" value=""></el-option>
                    <el-option label="闪电狗科技" value="闪电狗科技" ></el-option>
                    <el-option label="全达货运" value="全达货运"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="申请时间">
                <el-date-picker
                        v-model="forminline.time"
                        value-format="timestamp"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="最后审批时间">
                <el-date-picker
                        v-model="forminline.time1"
                        value-format="timestamp"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="Export()" v-if="invoiceDetailExport">导出</el-button>
                <!--<el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>-->
                <!--<el-button  @click="onSubmit0" type="primary" v-if="limit==1 || limit==2?true:false">调账记录</el-button>-->
                <!--<el-button  @click="onSubmit0" type="primary">调账记录</el-button>-->
                <el-button  @click="$router.push({path:'/ticketapplyforlist'})" type="primary" v-if="invoiceApplyAndRecord">开票申请记录</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" class="none" style="width: 100%">
            <el-table-column prop="regionName"  align="center" label="开票编号">
                <template slot-scope="scope" >
                    <el-button type="text" @click="detailsing(scope.row,info='open')" v-if="invoiceDetailView">{{tableData[scope.$index].id}}</el-button>
                    <span v-if="!invoiceDetailView">{{tableData[scope.$index].id}}</span>

                </template>
            </el-table-column>
            <!--<el-table-column prop="regionName" align="center" label="管理区"></el-table-column>-->
            <el-table-column prop="filialeName" align="center" label="所属分公司"></el-table-column>
            <el-table-column prop="customerName" align="center" label="项目名称"></el-table-column>
            <el-table-column prop="type" align="center" label="项目类型"></el-table-column>
            <el-table-column prop="projectName" align="center" label="运营专员"></el-table-column>
            <el-table-column prop="saleName" align="center" label="销售专员"></el-table-column>
            <el-table-column prop="makeType" align="center" label="发票类型" width="120"></el-table-column>
            <el-table-column prop="makeSite" align="center" label="开票单位"></el-table-column>
            <el-table-column prop="taxRate" align="center" label="税点"></el-table-column>
            <el-table-column prop="invoiceMoney" align="center" label="开票金额（元）"></el-table-column>
            <el-table-column prop="applyName" align="center" label="申请人"></el-table-column>
            <el-table-column prop="createTime" align="center" label="申请时间" :formatter="dateFormatHM" width="150"></el-table-column>
            <el-table-column prop="billTime" align="center" label="账单时间"></el-table-column>
            <el-table-column prop="approvalName" align="center" label="审批人"></el-table-column>
            <el-table-column prop="approvalTime" align="center" label="最后审批时间" :formatter="dateFormatHM" width="150"></el-table-column>

            <!--approvalStatus-->
            <!--<el-table-column prop="approvalStatus" align="center" label="申请人"></el-table-column>-->
            <!--<el-table-column-->
                    <!--label="审批状态"-->
                    <!--align="center"-->
            <!--&gt;-->
                <!--<template slot-scope="scope">-->
                    <!--&lt;!&ndash;<el-button @click="handleClick(scope.$index)" type="text" size="small"&ndash;&gt;-->
                    <!--&lt;!&ndash;:disabled='arr[scope.$index]'>审核&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
                    <!--<el-button type="text" size="small"-->
                               <!--v-if="tableData[scope.$index].approvalStatus == 'accepted'"><span>已通过</span>-->
                    <!--</el-button>-->
                    <!--<el-button type="text" size="small"-->
                               <!--v-if="tableData[scope.$index].approvalStatus == 'rejected'">未通过-->
                    <!--</el-button>-->

                    <!--<el-button type="text" size="small"-->
                               <!--v-if="(tableData[scope.$index].approvalStatus == 'approving')">-->
                        <!--审核中-->
                    <!--</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--label="审核"-->
                    <!--align="center"-->
            <!--&gt;-->
                <!--<template slot-scope="scope">-->
                    <!--<el-button @click="handleClick_c(scope.$index)" type="text" size="small" >查看</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="applyName" align="center" label="申请人"></el-table-column>-->

        </el-table>
        <el-pagination
                class="none"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 50]"
                :current-page.sync="currentPage1"
                :page-size="pagesize"
                layout="total,prev, pager, next,sizes"
                :total="total">
        </el-pagination>
        <!--审批查看详情-->
        <el-dialog
                class="none"
                title="审批详情"
                :visible.sync="approvalDetails"
                width="30%"
                min-width = '650px'
        >
            <div style="width: 100%;padding: 0 20px">
                项目名称：{{approval_Customer.customerName}} <br>
                申请人：&nbsp;&nbsp;&nbsp;{{approval_Customer.applyName}}<br>
                申请时间：{{approval_Customer.createTime | dateFrmHm}}<br><br>
                <div v-for="i in approver" style="width: 100%;padding: 20px 0 0 0 " >
                    审批人：&nbsp;&nbsp;&nbsp;{{i.adminName}} <br>
                    审批意见：<span v-if="i.opinion">{{i.opinion}}</span><br>
                    申请时间：<span v-if="i.createTime">{{i.createTime|dateFrmHm}}</span>
                </div>

            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="approvalDetails = false">取 消</el-button>
                <el-button type="primary" @click="approvalDetails = false">确 定</el-button>
            </span>
        </el-dialog>
        <!--startprint-->
        <div id="box">

            <el-dialog
                title="开票详情"
                :visible.sync="dialogFormVisible2"
                center
                :show-close=false
                top = "0"
                :fullscreen="screen"
                :modal = true
                class="eldialogs"
            >
                <div class="titleMessage">

                    <div class="titleMessage_50">
                        <ul>
                            <li>
                                <span>分公司 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.filialeName}}</span>
                            </li>
                            <!--<li>-->
                            <!--<span>所在部门 :</span>-->
                            <!--<span style="font:bold 15px 微软雅黑;">{{}}</span>-->
                            <!--</li>-->
                            <li>
                                <span>项目名称 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.customerName}}</span>
                            </li>

                        </ul>
                        <ul>
                            <li>
                                <span>账单时间 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.billStartTime | dateFrm}}至{{details.billEndTime | dateFrm}}</span>
                            </li>
                            <!--<li>-->
                            <!--<span>提交时间 :</span>-->
                            <!--<span style="font:bold 15px 微软雅黑;">{{details.createTime | dateFrm}}</span>-->
                            <!--</li>-->
                            <li>
                                <span>预计回款日期 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.predictReturnTime | dateFrm}}</span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>开票单号 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.makeId}}</span>
                            </li>
                            <li>
                                <span>开票时间 :</span>
                                <span v-if="details.approvalAccTime != null" style="font:bold 15px 微软雅黑;">{{details.approvalAccTime | dateFrm}}</span>
                            </li>
                            <!--<li>-->
                            <!--<span>提交人 :</span>-->
                            <!--<span style="font:bold 15px 微软雅黑;">{{details.applyName}}</span>-->
                            <!--</li>-->
                            <li>
                                <span>发票类别 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.makeType}}</span>
                            </li>
                            <li>
                                <span>开票单位 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.makeSite}}</span>
                            </li>

                        </ul>
                    </div>
                </div>
                <div class="titleMessage">

                    <div class="titleMessage_50">
                        <ul>
                            <li>
                                <span>纳税人识别号 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.taxpayerIdentifyNum}}</span>
                            </li>
                            <li>
                                <span>电话 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.phone}}</span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>地址 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.address}}</span>
                            </li>
                            <li>
                                <span>客户开票名称 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.companyName}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="titleMessage">

                    <div class="titleMessage_50">
                        <ul>
                            <li>
                                <span>开户银行 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.openingBank}}</span>
                            </li>
                            <li>
                                <span>银行账号 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.openingBankAccount}}</span>
                            </li>

                        </ul>
                        <ul>
                            <li>
                                <span>税点 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.taxRate}}</span>
                            </li>
                            <li>
                                <span>票面金额 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.invoiceMoney}}</span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>票面备注 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.invoiceRemark}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="titleMessage">
                    <div class="titleMessage_60">
                        <ul class="addressee">
                            <li>
                                <span>收件人姓名 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.receiverName}}</span>
                            </li>
                            <li>
                                <span>收件人住址 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.receiverAddr}}</span>
                            </li>
                            <li>
                                <span>收件人电话 :</span>
                                <span style="font:bold 15px 微软雅黑;">{{details.receiverPhone}}</span>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <!--<span class='Remarks'>附件 :</span>-->
                                <!--<span style="float: left;width:50%;">-->
                                <!--<el-upload-->
                                <!--class="upload-demo"-->
                                <!--action="javascript:;"-->
                                <!--:on-preview="handlePreview"-->
                                <!--:file-list="fileList"-->
                                <!--:auto-upload="false">-->
                                <!--</el-upload>-->
                                <!--</span>-->
                                <div class="accessory" v-if=" details.pictures !== []">
                                    <div class="accessory_t">客户对账单 ：</div>
                                    <div class="accessory_box">
                                    <span class="accessory_c" v-for="i in details.pictures">
                        {{i.name}} &nbsp;&nbsp;<span  @click="ondownloads(i)" style="cursor:pointer;">下载</span></span>
                                    </div>

                                </div>
                                <div class="accessory" v-if=" details.affirmPics !== []">
                                    <div class="accessory_t">客户开票信息确认函 ：</div>
                                    <div class="accessory_box">
                                    <span class="accessory_c" v-for="i in details.affirmPics">
                        {{i.name}} &nbsp;&nbsp;<span  @click="ondownloads1(i)" style="cursor:pointer;">下载</span></span>
                                    </div>

                                </div>
                            </li>
                            <li>
                                <div>
                                    <span class='Remarks'>其他说明 ：</span>
                                    <span style="font:bold 15px 微软雅黑;">{{details.otherRemark}}</span>
                                </div>

                            </li>
                            <li v-if="this.info == 'off'?true:false">
                                <span class='Remarks' >审批意见 :</span>
                                <span style="float: left;width:50%;">
                                <template>
                                  <el-radio v-model="Opinion" label="accepted">同意</el-radio>
                                  <el-radio v-model="Opinion" label="rejected">拒绝</el-radio>
                                </template>
                            </span>
                            </li>
                            <li v-if="info == 'off'?true:false">
                                <span class='Remarks'></span>
                                <span style="float: left;width:50%;padding:0 0 0 6%">
                                <el-input
                                    type="textarea"
                                    placeholder="请输入内容"
                                    v-model="approvalOpinion">
                                </el-input>
                            </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div  class="titleMessage" v-if="this.info == 'off'?false:true">
                    <p>审批进度</p>
                    <div class="Progress">
                        <div class="Progress_content">
                            <ul class="oul">
                                <li>
                                    <span>项目名称：</span>
                                    <span>{{this.rows.customerName}}</span>
                                </li>
                                <li>
                                    <span>姓名：</span>
                                    <span>{{this.rows.applyName}}</span>
                                </li>
                                <li>
                                    <span>提交时间：</span>
                                    <span>{{this.rows.createTime | dateFrmHm}}</span>
                                </li>
                            </ul>
                            <!--//城市经理-->
                            <ul class="oul" v-for="(i,index) in this.CheckApprove">
                                <li>
                                    <span>审批人：</span>
                                    <span>{{i.adminName}}</span>
                                </li>
                                <li>
                                    <span>审批意见：</span>
                                    <span>{{i.opinion}}</span>
                                </li>
                                <li >
                                    <span>审批时间：</span>
                                    <span v-if="i.createTime == null?false:true">{{i.createTime | dateFrmHm}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <span slot="footer" class="dialog-footer" >
                <el-button v-if="button?false:true" @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button v-if="button?false:true" @click="doPrint()">打 印</el-button>
                <el-button type="primary" @click="Submission" :loading="wait" v-if="this.info == 'off'?true:false">确 定</el-button>
            </span>
            </el-dialog>
        </div>

        <!--endprint-->
    </div>
</template>

<script>
    import moment from 'moment'
    import {openPostWindow} from "../../js/report.js";
    import {F_jurisdiction,AIfirstClass0,secondLevel} from '../../js/Fjurisdiction.js'
    import {getDate} from '../../js/dispatch.js'


    export default {
        name: "clientinvoiceList",
        created(){
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));

            this.token = user.result.token;
            let jd = JSON.parse(sessionStorage.getItem('jurisdictions'));

            this.invoiceDetailExport =  F_jurisdiction('invoiceDetailExport',jd);
            this.invoiceApplyAndRecord =  F_jurisdiction('invoiceApplyAndRecord',jd);
            this.invoiceDetailView =  F_jurisdiction('invoiceDetailView',jd);
            let page1 = JSON.stringify({
                token: this.token
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/area',page1 , {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            } ).then((res)=>{
                this.link = res.body.result;
            })

            this.$http.post( this.global.lightningUrl + '/companyv1/userManage/region/all_region',JSON.stringify({
                'token':this.token,
            })).then(run=>{
                this.regionarr = run.body.result
            })
            this.ajax()
        },
        data(){
            return {
                button:false,
                screen:false,//开票的全屏设置
                forminline:{},
                regionarr:[],
                link:[],
                tableData:[],
                total: 0,
                currentPage1: 1,
                pagesize: 10,
                approver:[],
                approvalDetails:false,
                approval_Customer:{},
                dialogFormVisible2:false ,
                info:'',
                CheckApprove:[],
                ID:'',
                rows:{},
                fileList:[],
                details:'',
                invoiceDetailExport:'',
                invoiceApplyAndRecord:'',
            }
        },
        methods:{
            doPrint() {
                this.screen = true;
                this.button = true;
                setTimeout(()=>{
                    window.print();
                    this.screen = false;
                    this.button = false;
                },1000)
            },
            detailsing(row,info) {
                if (info == 'open'){
                    this.info = 'open';
                }
                let page ={
                    "token": this.token,
                    "itemId": row.id, //id
                    "itemName":"makeinvoice"
                };
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/approval/approvaldetail', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if  (res.body.errcode == 0){
                        this.CheckApprove = res.body.result;
                        for (let i = 0; i < this.CheckApprove.length; i++) {
                            if ( this.CheckApprove[i].opinion == 'accepted'){
                                this.CheckApprove[i].opinion = '冻结'
                            }else if ( this.CheckApprove[i].opinion == 'rejected'){
                                this.CheckApprove[i].opinion = '正常'

                            }

                        }
                    }
                });
                console.log(row);
                this.rows = row;
                this.dialogFormVisible2 = true;
                this.Approval(row)
            },
            Approval(row,info) {
                if (info == "off") {
                    this.info = 'off';

                }
                console.log(this.info);
                this.dialogFormVisible2 = true;
                console.log(row);
                this.ID = row.id;
                let page ={
                    "token": this.token,
                    "id1": row.id, //列表编号
                    "conditionStr1":"invoice_relation" //文件路径
                }
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/invoice/getOneApplyInvoice', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if(res.body.errcode == 0){
                        this.details = res.body.result;
                        if (res.body.result.pictures != undefined){
                            this.fileList = res.body.result.pictures
                        }
                        if (this.details.taxRate == 0) {
                            this.details.taxRate = '无税率'
                        }
                    }
                })
            },
            handlePreview(file) {
                console.log(file);
                var fileName = file.name.substring(file.name.lastIndexOf("."));
                if ((fileName != '.jpg') && (fileName != '.png')){
                    window.location.href = file.url;
                }else {
                    var a = document.createElement('a');
                    a.href = file.url;
                    a.target = '_blank';
                    a.id='exppub';
                    document.body.appendChild(a);
                    var alink = document.getElementById('exppub');
                    alink.click();
                    alink.parentNode.removeChild(a);
                }
            },
            ondownloads(i){
                // console.log(i.filePath);
                // window.location.href = i.filePath;
                window.open(i.url,'_blank ')

            },
            ondownloads1(i){
                // console.log(i.filePath);
                // window.location.href = i.filePath;
                window.open(i.url,'_blank ')

            },
            Export(){
                let forminline = this.forminline;
                let page = JSON.stringify({
                    "token": this.token,
                    "id1": forminline.customerId,  //项目编号
                    "conditionStr1": forminline.customerName,  //项目名称
                    "id3": forminline.filialeId, //分公司编号
                    "id4": forminline.time!= null?forminline.time[0]:undefined, //4和5是申请时间成对出现
                    "id5": forminline.time!= null?forminline.time[1]+1000*60*60*24-1:undefined,
                    "id2": forminline.regionId,  //大区id
                    "conditionStr2": forminline.projectType,  //项目类型
                    "conditionStr3": forminline.type,  //发票类型
                    "conditionStr4":forminline.saleName,  //销售专员
                    "conditionStr5": forminline.projectName,  //运营专员
                    "conditionStr6": forminline.freezeAccount,  //开票单位
                    "id7": forminline.time1!= null?forminline.time1[0]:undefined, //4和5是申请时间成对出现
                    "id8": forminline.time1!= null?forminline.time1[1]+1000*60*60*24-1:undefined,
                    pageNum : this.currentPage1,
                    pageSize : this.pagesize,
                    conditionStr7:'invoicepermissionlist'
                })
                console.log(page);
                var exportLink = this.global.lightningUrl + '/companyv1/finance/report/export/invoice_apply_list';
                openPostWindow(exportLink,page);
            },
            ajax(){
                let forminline = this.forminline;
                let page = JSON.stringify({
                    "token": this.token,
                    "id1": forminline.customerId,  //项目编号
                    "conditionStr1": forminline.customerName,  //项目名称
                    "id3": forminline.filialeId, //分公司编号
                    "id4": forminline.time!= null?forminline.time[0]:undefined, //4和5是申请时间成对出现
                    "id5": forminline.time!= null?forminline.time[1]+1000*60*60*24-1:undefined,
                    "id7": forminline.time1!= null?forminline.time1[0]:undefined, //4和5是申请时间成对出现
                    "id8": forminline.time1!= null?forminline.time1[1]+1000*60*60*24-1:undefined,
                    "id2": forminline.regionId,  //大区id
                    "conditionStr2": forminline.projectType,  //项目类型
                    "conditionStr3": forminline.type,  //发票类型
                    "conditionStr4":forminline.saleName,  //销售专员
                    "conditionStr5": forminline.projectName,  //运营专员
                    "conditionStr6": forminline.freezeAccount,  //开票单位
                    pageNum : this.currentPage1,
                    pageSize : this.pagesize,
                    conditionStr7:'invoicepermissionlist'
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/finance/invoice/applyInvoiceList',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    this.tableData = res.body.result.rows;
                    this.total = res.body.result.total;
                    // "type": "ProjectCustomer",
                    //     "freezeAccount": "normal",
                    for (let i = 0; i < this.tableData.length; i++) {
                        if (this.tableData[i].type == 'ProjectCustomer') {
                            this.tableData[i].type = '标准项目'
                        }else if (this.tableData[i].type == 'InterimCustomer') {
                            this.tableData[i].type = '临时项目'
                        }else if (this.tableData[i].type == 'BackToBackCustomer') {
                            this.tableData[i].type = '背靠背项目'
                        }
                        if (this.tableData[i].freezeAccount == 'ProjectCustomer') {
                            this.tableData[i].freezeAccount ='正常'
                        }else {
                            this.tableData[i].freezeAccount ='冻结'
                        }
                        if (this.tableData[i].billStartTime!=undefined||this.tableData[i].billStartTime!=null||this.tableData[i].billStartTime!=''){
                            this.tableData[i].billTime =`${getDate(this.tableData[i].billStartTime)} 至 ${getDate(this.tableData[i].billEndTime)}`;

                        }

                    }
                })
            },
            handleClick_c(_index){
                console.log(this.tableData[_index]);
                this.approval_Customer = this.tableData[_index]
                let page = JSON.stringify({
                    token:this.token,
                    itemId:this.tableData[_index].id,
                    itemName:"makeinvoice"
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/companyCenter/approval/approvaldetail',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.body.result == null){
                        this.approvalDetails = false
                        this.$message({
                            message: '该单当前无审批记录！',
                            type: 'warning'
                        });
                    } else{
                        this.approvalDetails = true ;
                        this.approver = res.body.result
                        for (let i = 0; i <this.approver.length; i++) {
                            if (this.approver[i].state == undefined){
                                this.approver[i].state = '';

                            } else if (this.approver[i].state == 'accepted') {
                                this.approver[i].state = '同意'
                            }else{
                                this.approver[i].state = '退回'

                            }
                        }
                    }
                })
            },
            onSubmit(){
                this.currentPage1 =1
                this.ajax()
            },
            handleCurrentChange(val) {
                this.currentPage1 = val;
                this.ajax()
            },
            handleSizeChange(val) {
                this.pagesize = val ;
                this.ajax();
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            dateFormatHM:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            dateFormatHm:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("HH:mm");
            },
        },
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD")
            },
            dateFrmHm: function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm")
            }
        }
    }
</script>

<style scoped lang="scss">
    .clientinvoiceList{
        .header{
            margin-bottom: 20px;
        }
        .eldialogs{
            width: 100%;
            .titleMessage{
                p{
                    display: block;
                    padding-bottom:10px;
                    border-bottom:1px solid #f5f6fb;
                }
                .titleMessage_50{
                    font-size: 14px;
                    margin:10px 0 0 0;
                    // background: #f5f6fb;
                    background-color: red;
                    ul{
                        margin:0 0 0 20px;
                        padding:10px 0 ;
                        overflow: hidden;
                        li{
                            float: left;
                            width:50%;
                        }
                    }
                }
                .titleMessage_60{
                    font-size: 14px;
                    margin:10px 0 0 0;
                    // background: #f5f6fb;
                      background-color: red;
                    ul{
                        padding:0 0 0 20px;
                        li{
                            overflow: hidden;
                            padding:8px 0 ;
                            .Remarks{
                                display: block;
                                float: left;
                            }
                            span{
                                .el-textarea{
                                    width: 60%;
                                }
                            }
                        }
                    }
                    .addressee{
                        li{
                            display: inline-block;
                            width: 49.7%;
                        }
                    }
                }
                .Progress{
                    overflow: hidden;
                    font-size: 14px;
                    margin:10px 0 0 0;
                    background: #f5f6fb;
                    ul{
                        margin:0 0 0 10%;
                        padding:10px 0 ;
                        overflow: hidden;
                        li{
                            float: left;
                            width:33%;
                        }
                    }
                }
            }
        }
        .accessory{
            margin-top: 10px;
            background-color: #F3F7FA;
            box-sizing: border-box;
            width: 100%;
            .accessory_t{
                color: #606266;
                /*height:100% ;*/
                max-width: 150px;
                display: inline-block;
            }
            .accessory_box{
                display: inline-block;
                vertical-align:text-top;
                .accessory_c{
                    width: 100%;
                    display: inline-block;
                    color: #4874D0;
                    font-weight: bold;
                }
            }
        }
    }
</style>