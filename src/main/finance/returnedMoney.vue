<template>
    <div class="main returnedMoney">
        <div class="header">
            当前位置：财务管理 > 客户回款明细
        </div>
        <el-form :inline="true" :model="forminline" class="demo-form-inline">
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

            <el-form-item label="项目编号">
                <!--<el-select v-model="forminline.regionId" placeholder="请选择所管理区域">-->
                    <el-input v-model="forminline.customerId" placeholder="请输入项目编号" class="list_driver"></el-input>
                <!--</el-select>-->
            </el-form-item>
            <!--<el-form-item label="客户编号">-->
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
            <el-form-item label="销售专员">
                <el-input v-model="forminline.saleName" placeholder="请输入销售专员"></el-input>
            </el-form-item>
            <el-form-item label="运营专员">
                <el-input v-model="forminline.projectName" placeholder="请输入运营专员" class="list_driver"></el-input>
            </el-form-item>

            <el-form-item label="回款时间">
                <el-date-picker v-model="forminline.time" type="daterange" range-separator="至" start-placeholder="开始日期"  end-placeholder="结束日期" value-format="timestamp" >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="账单周期">
                <el-date-picker
                v-model="forminline.conditionStr5"
                value-format="timestamp"
                type="month"
                placeholder="选择月">
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
                <el-button type="primary" @click="Export()" v-if="CRMReturnConfirm">导出</el-button>
                <el-button  @click="$router.push({path:'/returnedMoneylist'})" type="primary" v-if="CRMReturnRecord">回款申请记录</el-button>

                <!--<el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>-->
                <!--<el-button  @click="onSubmit0" type="primary" v-if="limit==1 || limit==2?true:false">调账记录</el-button>-->
                <!--<el-button  @click="onSubmit0" type="primary">调账记录</el-button>-->
                <!--<el-button  @click="onSubmit0" type="primary">审批记录</el-button>-->
            </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="regionName"  align="center" label="回款编号">
                <template slot-scope="scope">
                    <el-button type="text" @click="detailsing(scope.row,info='open')">{{tableData[scope.$index].id}}</el-button>
                </template>
            </el-table-column>

            <!--<el-table-column prop="regionName" align="center" label="管理区"></el-table-column>-->
            <el-table-column prop="filialeName" align="center" label="所属分公司"></el-table-column>
            <el-table-column prop="customerId" align="center" label="项目编号" width="130"></el-table-column>
            <el-table-column prop="customerName" align="center" label="项目名称"></el-table-column>
            <el-table-column prop="type" align="center" label="项目类型" :formatter="type"></el-table-column>
            <el-table-column prop="regionName" align="center" label="项目状态" :formatter="Transformation"></el-table-column>
            <el-table-column prop="projectName"  align="center" label="运营专员"></el-table-column>
            <el-table-column prop="saleName"  align="center" label="销售专员"></el-table-column>
            <el-table-column prop="repayMoney" align="center" label="回款金额" ></el-table-column>
            <el-table-column prop="financeRepayTime" align="center" label="回款时间"  :formatter="dateFormatHm"></el-table-column>
            <el-table-column prop="repayWay"  align="center" label="回款方式"></el-table-column>
            <el-table-column prop="approvalTime"  align="center" label="最后审批时间" :formatter="dateFormatHm1"></el-table-column>
            <el-table-column prop="billMoth"  align="center" label="账单周期">
                <template  slot-scope="scope">
                    <p v-for="i in tableData[scope.$index].billMoth" style="display: inline-block;width: 100%">{{i}}</p>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 50]"
                :current-page.sync="currentPage1"
                :page-size="pagesize"
                layout="total,prev, pager, next,sizes"
                :total="total">
        </el-pagination>
        <!--去审批按钮-->
        <el-dialog
                title="回款详情"
                :visible.sync="dialogFormVisible2"
                width="70%"
                center
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

                        <li>
                            <span>提交时间 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.confirmTime | dateFrm}}</span>
                        </li>
                    </ul>
                    <!--<ul>-->
                    <!--<li>-->
                    <!--<span>账单时间 :</span>-->
                    <!--<span style="font:bold 15px 微软雅黑;">{{details.customerBillTime | dateFrm}}</span>-->
                    <!--</li>-->
                    <!--</ul>-->
                    <ul>
                        <li>
                            <span>提交人 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.optAdmin}}</span>
                        </li>
                        <li>
                            <span>账单周期 :</span>
                            <span style="font:bold 15px 微软雅黑;"><el-button type="text" @click="dialogVisible = true" style="padding: 0">点击查看</el-button></span>
                        </li>

                        <li>
                            <span>付款账户名称 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.repayAccountName}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="titleMessage">

                <div class="titleMessage_50">
                    <ul>
                        <li>
                            <span>收款账户名称 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.receiveAccountName}}</span>
                        </li>
                        <li>
                            <span>收款银行 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.receiveBankName}}</span>
                        </li>
                        <li>
                            <span>收款项目组 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.receiveProjectName}}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>收款日期 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.repayTime | dateFrmH}}</span>
                        </li>
                        <li>
                            <span>收款方式 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.repayChannel}}</span>
                        </li>
                        <li>
                            <span>收款金额 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.repayMoney}}</span>
                        </li>
                    </ul>

                </div>
            </div>
            <div class="titleMessage">

                <div class="titleMessage_50">
                    <ul>
                        <li>
                            <span>税率 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.taxRate}}</span>
                        </li>
                        <li>
                            <span>还款方式 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.repayWay}}</span>
                        </li>
                        <li>
                            <span>实际回款时间 :</span>
                            <span v-if="details.financeRepayTime != null">{{details.financeRepayTime | dateFrmH}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="titleMessage">

                <div class="titleMessage_60">
                    <ul>
                        <li>
                            <span>备注 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.remark}}</span>
                        </li>
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
                                <div class="accessory_t">附件 ：</div>
                                <div class="accessory_box">
                                    <span class="accessory_c" v-for="i in details.pictures">
                        {{i.name}} &nbsp;&nbsp;<span  @click="ondownloads(i)" style="cursor:pointer;">下载</span></span>
                                </div>

                            </div>
                        </li>
                        <!--<li>-->
                            <!--<span class='Remarks'>其他说明 :</span>-->
                            <!--<span style="float: left;width:50%;">-->
                                <!--<el-input-->
                                        <!--type="textarea"-->
                                        <!--autosize-->
                                        <!--placeholder=""-->
                                        <!--v-model="textarea1">-->
                                <!--</el-input>-->
                            <!--</span>-->
                        <!--</li>-->
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
                                <span>{{this.rows.optAdmin}}</span>
                            </li>
                            <li>
                                <span>提交时间：</span>
                                <span>{{this.rows.confirmTime | dateFrm}}</span>
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
                                <span v-if="i.createTime == null?false:true">{{i.createTime | dateFrm}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <span slot="footer" class="dialog-footer" >
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="Submission" :loading="wait" v-if="this.info == 'off'?true:false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="账单时间"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <el-table
                    :data="tableData1"
                    style="width: 100%">
                <el-table-column
                        prop="month"
                        align="center"
                        :formatter="dateFormat_a"
                        label="账单周期">
                </el-table-column>
                <el-table-column
                        prop="repayMoney"
                        align="center"
                        label="剩余应还金额">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="finMoney"
                        label="还款金额">
                </el-table-column>
                <el-table-column
                        prop="status"
                        align="center"
                        label="是否结清">
                </el-table-column>
                <el-table-column
                        v-if="residueMoney"
                        prop="residueMoney"
                        align="center"
                        label="预存金额">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment'
    import {openPostWindow} from "../../js/report.js";
    import {F_jurisdiction,AIfirstClass0,secondLevel} from '../../js/Fjurisdiction.js'

    export default {
        name: "returnedMoney",
        created(){
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.CRMReturnConfirm = F_jurisdiction('CRMReturnConfirm',jurisdictions)
            this.CRMReturnRecord =  F_jurisdiction('CRMReturnRecord',jurisdictions)
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
                billMoth:[],
                forminline:{},
                regionarr:[],
                link:[],
                tableData:[],
                total: 0,
                currentPage1: 1,
                pagesize: 10,
                dialogFormVisible2:false ,
                info:'',
                CheckApprove:[],
                ID:'',
                rows:{},
                fileList:[],
                details:'',
                textarea1:'',//其他备注
                Opinion:'accepted',
                dialogVisible:false,
                tableData1:[],
                approvalOpinion:'',
                wait:false,
                residueMoney:false,
                CRMReturnConfirm:'',
                CRMReturnRecord:'',
            }
        },
        methods:{
            Export(){
                let page = JSON.stringify({
                    token:this.token,
                    "conditionStr7": "repaypermissionlist",          //带权限的标示
                    "id1": this.forminline.customerId ,                                      //项目编号
                    "id2": this.forminline.regionId,                                       //区域
                    "id3":this.forminline.filialeId,                                        //分公司
                    "id4":this.forminline.time!=null?this.forminline.time[0]:undefined,                                        //申请时间 成对出现
                    "id5":this.forminline.time!=null?this.forminline.time[1]+1000*60*60*24-1:undefined  ,
                    "conditionStr1":this.forminline.customerName,                              //项目名称
                    "conditionStr2":this.forminline.projectType,                              //项目类型
                    "conditionStr3":this.forminline.saleName,                              //销售顾问
                    "conditionStr4":this.forminline.projectName,                               //运营专员
                    pageNum : this.currentPage1,
                    pageSize : this.pagesize,
                    conditionStr5: this.forminline.conditionStr5,
                    "id7": this.forminline.time1!= null?this.forminline.time1[0]:undefined, //4和5是申请时间成对出现
                    "id8": this.forminline.time1!= null?this.forminline.time1[1]+1000*60*60*24-1:undefined,

                })
                var exportLink = this.global.lightningUrl + '/companyv1/finance/report/export/repay_apply_list';
                openPostWindow(exportLink,page);
            },
            ajax(){
                let page = JSON.stringify({
                    token:this.token,
                    "conditionStr7": "repaypermissionlist",          //带权限的标示
                    "id1": this.forminline.customerId ,                                      //项目编号
                    "id2": this.forminline.regionId,                                       //区域
                    "id3":this.forminline.filialeId,                                        //分公司
                    "id4":this.forminline.time!=null?this.forminline.time[0]:undefined,                                        //申请时间 成对出现
                    "id5":this.forminline.time!=null?this.forminline.time[1]+1000*60*60*24-1:undefined  ,
                    "conditionStr1":this.forminline.customerName,                              //项目名称
                    "conditionStr2":this.forminline.projectType,                              //项目类型
                    "conditionStr3":this.forminline.saleName,                              //销售顾问
                    "conditionStr4":this.forminline.projectName,                               //运营专员
                    pageNum : this.currentPage1,
                    pageSize : this.pagesize,
                    conditionStr5: this.forminline.conditionStr5,

                    "id7": this.forminline.time1!= null?this.forminline.time1[0]:undefined, //4和5是申请时间成对出现
                    "id8": this.forminline.time1!= null?this.forminline.time1[1]+1000*60*60*24-1:undefined,
                })
                console.log(page);
                this.$http.post(this.global.lightningUrl +'/companyv1/finance/business/customerRepay/repayApplyList',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.body.errcode == 0){
                        this.tableData = res.body.result.rows;
                        this.total = res.body.result.total;
                        let billMoth ;
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].repayWay == "automatic") {
                                this.tableData[i].repayWay = '自动还款'

                            }else{
                                this.tableData[i].repayWay = '指定还款'
                            }

                        }


                    }
                })
            },
            detailsing(row,info) {
                if (info == 'open'){
                    this.info = 'open';
                }
                let page ={
                    "token": this.token,
                    "itemId": row.id, //id
                    "itemName":"repaymoney"
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
            type(row) {
                if (row.type == 'ProjectCustomer'){
                    return '标准项目'
                }else if (row.type == 'InterimCustomer'){
                    return '临时项目'
                }else if (row.type == 'BackToBackCustomer'){
                    return '背靠背项目'
                }


            },

            Transformation(row){
                if (row.freezeAccount == 'normal'){
                    return '正常'
                }else {
                    return '冻结'
                }
            },
            onSubmit(){
                this.currentPage1 = 1;
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
            dateFormatHm: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            dateFormatHm1: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
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
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            dateFormat_a: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM");
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
                    "conditionStr1":"repay_relation" //文件路径
                }
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/business/customerRepay/searchOne', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if(res.body.errcode == 0){
                        this.details = res.body.result;
                        if (this.details.taxRate == null){
                            this.details.taxRate = '无税率'
                        }
                        console.log(JSON.parse(this.details.customerBillTime));
                        this.tableData1 = JSON.parse(this.details.customerBillTime)
                        if (this.details.repayWay == "automatic") {
                            this.details.repayWay = '自动还款'
                        }else{
                            this.details.repayWay = '指定还款'
                        }
                        if(this.details.repayChannel == 'underline_alipay'){
                            this.details.repayChannel = '线下-支付宝'
                        }else if(this.details.repayChannel == 'underline_wechat'){
                            this.details.repayChannel = '线下-微信'
                        }else if (this.details.repayChannel == 'underline_cash'){
                            this.details.repayChannel = '线下-现金'
                        }else if (this.details.repayChannel == 'underline_transfer'){
                            this.details.repayChannel = '线下-转账'
                        }else if (this.details.repayChannel == 'other'){
                            this.details.repayChannel = '其他'
                        }else if (this.details.repayChannel == 'underline_pos'){
                            this.details.repayChannel = '线下-pos机刷卡'
                        }
                        if (res.body.result.pictures != undefined){
                            this.fileList = res.body.result.pictures
                        }
                        if (this.details.taxRate == 0) {
                            this.details.taxRate = '无税率'
                        }
                        this.textarea1 = res.body.result.otherRemark;
                        console.log(this.textarea1);
                        // for (let i = 0; i < this.tableData1.length; i++) {
                        //     // this.tableData1[i].finMoney =this.tableData1[i].finMoney;
                        //     // this.tableData1[i].status = this.tableData1[i].status == 'fin' ? '已还清' : '未还清'
                        //     this.tableData1[i].finMoney = this.tableData1[i].finMoney
                        // }
                        let status = []

                        console.log(this.assign);
                        for (let i = 0; i < this.tableData1.length; i++) {
                            this.tableData1[i].finMoney = this.tableData1[i].finMoney
                            if (this.tableData1[i].residueMoney == undefined){
                                status.push(this.tableData1[i])
                            }
                        }
                        // if (status.length != this.tableData1.length ){
                        //     this.residueMoney = false
                        // }else{
                        //     this.residueMoney = true
                        // }
                        if (status.length == this.tableData1.length ){
                            this.residueMoney = false
                        }else{
                            this.residueMoney = true
                        }
                    }
                })
            },
            ondownloads(i){
                // console.log(i.filePath);
                // window.location.href = i.filePath;
                window.open(i.url,'_blank ')

            },
        },
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm");
            },
            dateFrmH: function (el) {
                return moment(el).format("YYYY-MM-DD");
            }
        },
    }
</script>

<style scoped lang="scss">
    .returnedMoney{
        .header{
            margin-bottom: 20px;
        }
        .accessory{
            margin-top: 10px;
            background-color: #F3F7FA;
            box-sizing: border-box;
            width: 100%;
            .accessory_t{
                color: #606266;
                /*height:100% ;*/
                width: 5%;
                max-width: 90px;
                display: inline-block;
            }
            .accessory_box{
                display: inline-block;
                vertical-align:text-top;
                width: 93%;
                .accessory_c{
                    width: 100%;
                    display: inline-block;
                    color: #4874D0;
                    font-weight: bold;
                }
            }
        }
        .eldialogs{
            width: 100%;
            .titleMessage{
                padding:5px 20px;
                p{
                    display: block;
                    padding-bottom:10px;
                    border-bottom:1px solid #f5f6fb;
                }
                .titleMessage_50{
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
                .titleMessage_60{
                    font-size: 14px;
                    margin:10px 0 0 0;
                    background: #f5f6fb;

                    ul{
                        margin:0 0 0 10%;
                        padding:10px 0 ;
                        li{
                            overflow: hidden;
                            padding:8px 0 ;
                            .Remarks{
                                display: block;
                                float: left;
                                margin-right: 10px;
                            }
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
    }

</style>