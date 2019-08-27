<template>
    <div class="invoiceapprovalprocess main">
        <div class="header">
            当前位置: 待办事项 > 开票申请审批
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
            <el-table-column prop="makeType" align="center" label="发票类型" width="130"></el-table-column>
            <el-table-column prop="makeSite" align="center" label="开票单位"></el-table-column>
            <el-table-column prop="taxRate" align="center" label="税点"></el-table-column>
            <el-table-column prop="invoiceMoney" align="center" label="开票金额（元）"></el-table-column>
            <el-table-column prop="applyName" align="center" label="申请人"></el-table-column>
            <el-table-column prop="createTime" align="center" label="申请时间" :formatter="dateFormatHm" width="110"></el-table-column>
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
        <!-- 分页插件 -->
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
            title="开票申请"
            :visible.sync="dialogFormVisible2"
            width="60%"
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
                    </ul>
                    <ul>
                        <li>
                            <span>账单时间 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.billStartTime | dateFrm}}至{{details.billEndTime | dateFrm}}</span>
                        </li>
                        <li>
                            <span>提交时间 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{this.rows.createTime | dateFrm}}</span>
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
                    </ul>
                </div>
            </div>
            <div class="titleMessage">
                <div class="titleMessage_50">
                    <ul>
                        <li>
                            <span>发票类别 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.makeType}}</span>
                        </li>
                        <li>
                            <span>开票单位 :</span>
                            <span style="font:bold 15px 微软雅黑;">{{details.makeSite}}</span>
                        </li>
                    </ul>
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
                                <div class="accessory_t">客户对账单</div>
                                <div class="accessory_box">
                                    <span class="accessory_c" v-for="i in details.pictures">
                        {{i.name}} &nbsp;&nbsp;<span  @click="ondownloads(i)" style="cursor:pointer;">下载</span></span>
                                </div>

                            </div>
                            <div class="accessory" v-if=" details.affirmPics !== []">
                                <div class="accessory_t">客户开票信息确认函</div>
                                <div class="accessory_box">
                                    <span class="accessory_c" v-for="i in details.affirmPics">
                        {{i.name}} &nbsp;&nbsp;<span  @click="ondownloads1(i)" style="cursor:pointer;">下载</span></span>
                                </div>

                            </div>
                        </li>
                        <li>
                            <span class='Remarks'>其他说明 :  &nbsp;</span>
                            <span style="float: left;width:50%;">
                                <el-input
                                        type="textarea"
                                        autosize
                                        placeholder=""
                                        readonly
                                        v-model="textarea1">
                                </el-input>
                            </span>
                        </li>
                        <li v-if="this.info == 'off' ">
                            <span class='Remarks' >审批意见 : &nbsp;</span>
                            <span style="float: left;width:50%;">
                                <template>
                                  <el-radio v-model="Opinion" label="accepted" >同意</el-radio>
                                  <el-radio v-model="Opinion" label="rejected" @input="time0=''">拒绝</el-radio>
                                </template>
                            </span>
                        </li>
                        <li v-if="this.info == 'off'&&approvalextra && Opinion == 'accepted'" >
                            <span class='Remarks is-required' >开票时间 :  &nbsp;</span>
                            <span style="float: left;width:50%;">
                                <el-date-picker
                                        v-model="time0"
                                        value-format="timestamp"
                                        :rules="[{ required: true, message: '请输入地址', trigger: 'blur' }]"
                                        type="date"
                                        placeholder="开票时间">
                                </el-date-picker>
                            </span>
                        </li>
                        <li v-if="this.info == 'off'&&approvalextra && Opinion == 'accepted'">
                            <span class='Remarks is-required' >开票单号 :  &nbsp;</span>
                            <span style="float: left;width:50%;">
                                <el-input v-model="ticketId"  placeholder="请输入开票单号" @keyup.native="proving1"></el-input>
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
                        <span>{{this.rows.createTime | dateFrm}}</span>
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
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "invoiceapprovalprocess",
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm");
            },
            dateFrmH: function (el) {
                return moment(el).format("YYYY-MM-DD");
            }
        },
        created(){
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
                ticketId:'',
                time0:'',
                info:'',
                CheckApprove:[],
                rows:{},
                wait:false,
                approvalOpinion:'',
                Opinion:'accepted',
                fileList:[],
                textarea1:'',//其他备注
                dialogFormVisible2:false ,
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
                formInline: {},
                link:[],
                arr:[],
                tableData:[],
                token:'',
                details:'',
                ID:'',
                approvalextra:'',
                gz:'',
            }
        },
        methods :{
            proving1(){
                console.log(this.ticketId);
                if (this.ticketId.match(/^[1-9A-Za-z\-]{1,50}$/)){
                    this.gz = true
                } else{
                    this.gz = false
                }
                console.log(this.gz);
            },
            //详情
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
                if (this.approvalextra&& this.Opinion == 'accepted'){
                    if (this.time0 == ''){
                        this.$message({
                            showClose: true,
                            message:'请选择开票时间',
                            type: 'warning'
                        });
                        this.wait = false;
                        return false
                    } else if (this.ticketId == ''&&!this.gz ){
                        this.$message({
                            showClose: true,
                            message:'对不起！请输入含有字母、数字、或‘-’的开票编号',
                            type: 'warning'
                        });
                        this.wait = false;
                        return false
                    }else{
                        page ={
                            "token": this.token,
                            "itemId": this.ID, //id
                            "state":'accepted',//审批意见
                            "opinion":this.approvalOpinion,//审批说明
                            "accTime":this.time0,
                            makeId:this.ticketId,
                        };
                    }
                }else{
                    page ={
                        "token": this.token,
                        "itemId": this.ID, //id
                        "state":this.Opinion,//审批意见
                        "opinion":this.approvalOpinion//审批说明
                    };
                }
                console.log(page);
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/invoice/approvalInvoice', page, {
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
            //去审批
            Approval(row,info) {
                if (info == "off") {
                    this.info = 'off';

                }
                console.log(this.info);
                let page0 = JSON.stringify({
                    token:this.token,
                    "itemSeq": 3,
                    "itemId": row.id,
                    "itemName": "makeinvoice"
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
                        console.log(this.details);
                        if (res.body.result.pictures != undefined){
                            this.fileList = res.body.result.pictures
                        }
                        if (this.details.taxRate == 0) {
                            this.details.taxRate = '无税率'
                        }
                        this.textarea1 = res.body.result.otherRemark;
                    }
                })
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
            dateFormatHm:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            ajax(){
                let page = JSON.stringify({
                    'token':this.token,
                    'pageNum':this.currentPage,
                    'pageSize':this.pagesize,
                    "id1": this.formInline.customerId,  //项目编号
                    "conditionStr1": this.formInline.customerName,  //项目名称
                    "id3":this.formInline.filialeName , //分公司编号
                    "id4":this.formInline.time == null ? "" :  this.formInline.time[0],//4和5是申请时间成对出现
                    "id5":this.formInline.time == null ? "" :  this.formInline.time[1]+86400000-1,
                    "id2": this.formInline.regionId,  //大区id
                    "backlogType":this.$route.query.status == 'backlog'?'backlog': "history"
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/finance/invoice/approvalInvoiceList',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.tableData = res.body.result.rows;
                        this.total = res.body.result.total;
                    }
                })
            },
            onSubmit(){
                this.currentPage = 1;
                this.ajax();
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
        }
    }
</script>

<style scoped lang="scss">
.invoiceapprovalprocess{
    .header{
        margin-bottom: 20px ;
    }
    .eldialogs{
        width: 100%;
        .titleMessage{
            padding:5px 10px;
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
                background: #f5f6fb;

                ul{
                    margin:0 0 0 3%;
                    li{
                        overflow: hidden;
                        padding:8px 0 ;
                        .Remarks{
                            display: block;
                            float: left;
                        }
                    }
                }
                .addressee{
                    li{
                        display: inline-block;
                        width: 48%;
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
            max-width: 140px;
            display: inline-block;
        }
        .accessory_box{
            display: inline-block;
            vertical-align:text-top;
            /*width: 53%;*/
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