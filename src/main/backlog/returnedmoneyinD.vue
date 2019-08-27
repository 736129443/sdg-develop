<template>
    <div class="returnedmoneyinD main">
        <div class="header">
            当前位置: 待办事项 > 回款申请审批
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="项目编号">
                <el-input v-model.trim="formInline.customerId" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入客户编号" ></el-input>
            </el-form-item>
            <el-form-item label="管理区">
                <el-select v-model="formInline.regionId" placeholder="请选择所管理区域">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in arr" :label='i.name' :value="i.id" :key="i.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="所属分公司">
                <el-select v-model="formInline.filialeName" placeholder="请选择所管理区域">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in link" :label='i.filialeName' :value="i.filialeId"
                               :key="i.filialeId"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="项目名称">
                <el-input v-model.trim="formInline.customerName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="申请时间">
                <el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期"  end-placeholder="结束日期" value-format="timestamp" >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="regionName"  align="center" label="编号">
                <template slot-scope="scope">
                    <el-button type="text" @click="detailsing(scope.row,info='open')">{{tableData[scope.$index].id}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="regionName" align="center" label="管理区"></el-table-column>
            <el-table-column prop="filialeName" align="center" label="所属分公司"></el-table-column>
            <el-table-column prop="customerId" align="center" label="项目编号" width="130"></el-table-column>
            <el-table-column prop="customerName" align="center" label="项目名称"></el-table-column>
            <el-table-column prop="type" align="center" label="项目类型" :formatter="type"></el-table-column>
            <el-table-column prop="regionName" align="center" label="项目状态" :formatter="Transformation"></el-table-column>
            <el-table-column prop="repayMoney" align="center" label="回款金额" width="130"></el-table-column>
            <el-table-column prop="repayTime" align="center" label="回款时间"  :formatter="dateFormatHm"></el-table-column>
            <el-table-column prop="optAdmin" align="center" label="申请人"></el-table-column>
            <el-table-column prop="confirmTime" align="center" label="申请时间" :formatter="dateFormatHm" width="110"></el-table-column>
            <el-table-column prop="" align="center" label="操作">
                <template slot-scope="scope">
                    <!--<el-button @click="handleClick(scope.$index)" type="text" size="small"-->
                    <!--:disabled='arr[scope.$index]'>审核-->
                    <!--</el-button>-->
                    <el-button type="text" size="small"
                               v-if="tableData[scope.$index].approvalStatus == 'accepted'">
                        已通过
                    </el-button>
                    <el-button type="text" size="small"
                               v-if="tableData[scope.$index].approvalStatus == 'rejected'">
                        未通过
                    </el-button>
                    <el-button type="text" size="small"
                               v-if="(tableData[scope.$index].approvalStatus == 'approving'&&tableData[scope.$index].approval == true)" @click="Approval(scope.row,info='off')">去审核
                    </el-button>
                    <el-button type="text" size="small"
                               v-if="(tableData[scope.$index].approvalStatus == 'approving'&&tableData[scope.$index].approval == false)">审核中
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background
                       layout="total,prev, pager, next,sizes"
                       :total="total"
                       :page-size="pagesize"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-sizes="[10,20,30,50]"
                       :current-page="currentPage"
                       class="text_right">
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
                            <span style="font:bold 15px 微软雅黑;">{{details.repayTime | dateFrm}}</span>
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
                        <li v-if="this.info == 'off'&&approvalextra && Opinion =='accepted'" >
                            <span class='Remarks is-required' >实际回款时间 :</span>
                            <span style="float: left;width:50%;">
                                <el-date-picker
                                        v-model="time0"
                                        value-format="timestamp"
                                        :rules="[{ required: true, message: '请输入地址', trigger: 'blur' }]"
                                        type="date"
                                        placeholder="选择实际回款时间">
                                </el-date-picker>
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
                        <!--<ul>-->
                            <!--<span>实际回款时间：</span>-->
                            <!--&lt;!&ndash;<span v-if="i.createTime == null?false:true">{{i.createTime | dateFrm}}</span>&ndash;&gt;-->
                            <!--&lt;!&ndash;1557072000000&ndash;&gt;-->
                        <!--</ul>-->
                    </div>
                </div>
            </div>

            <span slot="footer" class="dialog-footer" >
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="Submission" :loading="wait" v-if="this.info == 'off'?true:false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="账单周期"
                :visible.sync="dialogVisible"
                width="30%"
                >
            <el-table
                    :data="tableData1"
                    style="width: 100%">
                <el-table-column
                        prop="month"
                        :formatter="dateFormat"
                        label="日期">
                </el-table-column>
                <el-table-column
                        prop="repayMoney"
                        label="剩余应还金额">
                </el-table-column>
                <el-table-column
                        prop="finMoney"
                        label="还款金额">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="是否还清">
                </el-table-column>
                <el-table-column
                    v-if="show"
                    prop="residueMoney"
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
    export default {
        name: "returnedmoneyinD",

        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm");
            },
            dateFrmH: function (el) {
                return moment(el).format("YYYY-MM-DD");
            }
        },
        created(){
            console.log(this.$route.query.status);
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let page1 = JSON.stringify({
                token: this.token
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/area', page1, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res) => {
                this.link = res.body.result;
            })
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/region/all_region', JSON.stringify({
                'token': this.token,
            })).then(run => {
                this.arr = run.body.result
            })
            this.ajax()
        },
        data(){
            return {
                show:false,
                token:'',
                formInline:{},
                arr:[],
                link:[],
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
                tableData:[],
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
                time0:'',
                approvalextra:'',
            }
        },
        methods:{
            ondownloads(i){
                // console.log(i.filePath);
                // window.location.href = i.filePath;
                window.open(i.url,'_blank ')

            },
            ajax(){
              let page = JSON.stringify({
                  'token':this.token,
                  'pageNum':this.currentPage,
                  'pageSize':this.pagesize,
                  "id1": Number(this.formInline.customerId),  //项目编号
                  "conditionStr1": this.formInline.customerName,  //项目名称
                  "id3":this.formInline.filialeName , //分公司编号
                  "id4":this.formInline.time == null ? "" :  this.formInline.time[0],//4和5是申请时间成对出现
                  "id5":this.formInline.time == null ? "" :  this.formInline.time[1]+86400000-1,
                  "id2": this.formInline.regionId,  //大区id
                  "backlogType":this.$route.query.status == 'backlog'?'backlog': "history"
              })
              this.$http.post(this.global.lightningUrl +'/companyv1/finance/business/customerRepay/customerBillApprovalList',page,{
                  headers: {
                      'Content-Type': 'application/json;charset=UTF-8'
                  }
              }).then((res)=>{
                  console.log(res);
                  // this.tableData = res.body.result
                  this.tableData = res.body.result.rows;
                  this.total = res.body.result.total;
              })
            },
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
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
                        console.log(this.CheckApprove);
                        console.log(this.CheckApprove[1]);
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
                console.log(this.rows.createTime);
                this.dialogFormVisible2 = true;
                this.Approval(row)
            },
            onSubmit(){
                this.currentPage = 1
                this.ajax()
            },
            //查看附件
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
            Transformation(row){
                if (row.freezeAccount == 'normal'){
                    return '正常'
                }else {
                    return '冻结'
                }
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
            dateFormatHm:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            //去审批
            Approval(row,info) {
                console.log(row, info);
                if (info == "off") {
                    this.info = 'off';

                }
                let page0 = JSON.stringify({
                    token:this.token,
                    "itemId": row.id,
                    "itemSeq": 2,
                    "itemName": "repaymoney"
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/companyCenter/approval/approvalextra',page0,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    this.approvalextra = res.body.result
                })



                this.dialogFormVisible2 = true;

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
                    if(res.body.errcode == 0){
                        this.details = res.body.result;
                        if (this.details.taxRate == null){
                            this.details.taxRate = '无税率'
                        }
                        console.log(JSON.parse(this.details.customerBillTime));
                        this.tableData1 = JSON.parse(this.details.customerBillTime);
                            let status = [];
                        for (let i = 0; i < this.tableData1.length; i++) {
                            console.log(this.tableData1[i].residueMoney);
                            if (this.tableData1[i].residueMoney == undefined){
                                status.push(this.tableData1[i])
                            }
                        }
                        if (status.length == this.tableData1.length ){
                            this.show = false
                        }else{
                            this.show = true
                        }
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
                        for (let i = 0; i < this.tableData1.length; i++) {
                            // this.tableData1[i].finMoney =this.tableData1[i].finMoney;
                            // this.tableData1[i].status = this.tableData1[i].status == 'fin' ? '已还清' : '未还清'
                            this.tableData1[i].finMoney = this.tableData1[i].finMoney
                        }
                    }
                })

            },

            //提交审批
            Submission() {
                this.wait = true;
                if (this.approvalOpinion == '') {
                    this.$message({
                        showClose: true,
                        message:'请输入审批意见！',
                        type: 'warning'
                    });
                    this.wait = false;
                    return false;
                }else if(/^.{0,200}$/.test(this.approvalOpinion)){

                }else{
                    this.$message({
                        showClose: true,
                        message:'汉字、字母或数字组合2~200个字符',
                        type: 'warning'
                    });
                    this.wait = false;
                    return false;
                }
                let page
                if (this.approvalextra){
                    if ( this.Opinion=='accepted' ) {
                        if (this.time0 == '') {
                            this.$message({
                                showClose: true,
                                message:'请选择实际回款时间',
                                type: 'warning'
                            });
                            this.wait = false;
                            return false
                        }else {
                            page ={
                                "token": this.token,
                                "itemId": this.ID, //id
                                "state":this.Opinion,//审批意见
                                "opinion":this.approvalOpinion,//审批说明,
                                "financeRepayTime":this.time0!=null?this.time0+1000*60*60*24-1:''
                            };
                        }
                    }else{
                        page ={
                            "token": this.token,
                            "itemId": this.ID, //id
                            "state":this.Opinion,//审批意见
                            "opinion":this.approvalOpinion,//审批说明,
                        };
                    }
                }else{
                    page ={
                        "token": this.token,
                        "itemId": this.ID, //id
                        "state":this.Opinion,//审批意见
                        "opinion":this.approvalOpinion,//审批说明,
                    };
                }
                    this.$http.post(this.global.lightningUrl + '/companyv1/finance/business/customerRepay/customerBillRepayApproval', page, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res) => {
                        console.log(res);
                        if  (res.body.errcode == 0){
                            this.$message({
                                showClose: true,
                                message:res.body.message,
                                type: 'success'
                            });
                            this.dialogFormVisible2 = false;
                            this.wait = false;
                            this.ajax();
                            this.backlog()
                        }else{
                            this.$message({
                                showClose: true,
                                message:res.body.message,
                                type: 'warning'
                            });
                        }
                    })
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
            //分页
            handleSizeChange(pagesize) {
                this.pagesize = pagesize;
                this.ajax();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.ajax();
            },
        }
    }
</script>

<style scoped lang="scss">
    .returnedmoneyinD{

    .header{
        margin-bottom: 20px ;
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
                        li:nth-child(2){
                            span:nth-child(2){
                               .upload-demo{
                                   margin: -32px 0 0 0;
                               }
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