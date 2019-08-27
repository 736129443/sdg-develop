<template>
    <div class="main">
        <div class="header">
            当前位置：<span> 待办事项 > 新客户审批</span>
        </div>
        <div class="dv">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="客户编号">
                    <el-input v-model.trim="formInline.CustomerID" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入客户编号"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model.trim="formInline.CustomerName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="审批状态">
                    <el-select v-model="formInline.region" placeholder="请选择审批状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已通过" value="accepted"></el-option>
                        <el-option label="未通过" value="rejected"></el-option>
                        <el-option label="审批中" value="approving"></el-option>
                        <el-option label="未提交" value="saved"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query()">查询</el-button>
                </el-form-item>
            </el-form>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="项目编号" align="center">
                        <template slot-scope="scope">
                            <div @click="handleClick(scope.row)">
                                <a style="color: rgb(102,177,255);cursor: pointer;">{{ tableData[scope.$index].id }}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="项目名称" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="filialeName"
                            label="所属分公司" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="city"
                            label="城市" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="saleAdminName"
                            label="所属销售" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="createAdminName"
                            label="申请人" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="checkType"
                            label="审批类别" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="checkState"
                            label="审批状态" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            :formatter="dateFormat"
                            label="申请时间"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="操作" align="center">
                        <template  slot-scope="scope">
                            <el-button @click="approve(scope.row)" type="text" size="small" v-if="tableData[scope.$index].checkState == '审批中' && tableData[scope.$index].approving == true?true:false">去审批</el-button>
                            <!--<el-button  type="text" size="small" v-if="tableData[scope.$index].checkState == '审批中' && tableData[scope.$index].approving == false?true:false">审批中</el-button>-->
                            <!--<el-button  type="text" size="small" disabled  v-if="tableData[scope.$index].checkState == '未通过审批'?true:false">已审批</el-button>-->
                            <!--<el-button  type="text" size="small" v-if="tableData[scope.$index].checkState == '已通过审批'?true:false">已审批</el-button>-->
                            <!--<el-button  type="text" size="small" v-if="tableData[scope.$index].checkState == '未提交'?true:false">去完成</el-button>-->
                            <el-button  type="text" size="small" @click="open(scope.row)" v-if="(tableData[scope.$index].checkState != '审批中')|| (tableData[scope.$index].checkState == '审批中' && tableData[scope.$index].approving != true?true:false)" >查看审批记录</el-button>
                        </template>
                    </el-table-column>
                    <!--<el-table-column label="查看审批意见"-->
                                     <!--align="center">-->
                        <!--<template  slot-scope="scope">-->
                            <!--<el-button  type="text" size="small"  @click="open(scope.row)">查看</el-button>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                </el-table>
                <!--查看弹窗-->
                <el-dialog
                        title="查看审核记录"
                        :visible.sync="centerDialogVisible"
                        width="60%"
                        center>
                    <!--<span>需要注意的是内容是默认不居中的</span>-->
                    <div class="content" v-if="checkType == '新增客户审批'?false:true">
                        <span><i>分公司：</i><i style="font-weight: bold">{{CheckRow.filialeName}}</i></span>
                        <div class="top">
                            <ul>
                                <li>
                                    <span style="font-weight: bold;font-size: 17px">变更内容</span>
                                </li>
                                <li v-for="(i,index) in Change_item">
                                    <span>{{i.Change_content}}</span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <span style="font-weight: bold;font-size: 17px">变更前</span>
                                </li>
                                <li v-for="(i,index) in Change_item" >
                                    <span>{{i.Change_before}}</span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <span  style="font-weight: bold;font-size: 17px">变更后</span>
                                </li>
                                <li v-for="(i,index) in Change_item">
                                    <span>{{i.Change_after}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="areaPrice">
                            <div class="title" >
                                <span style="color: transparent">-</span>
                                <div  class="con" v-for="(i,index) in valuation1">
                                    <span>{{i.Change_content}}</span>
                                </div>
                            </div>
                            <div class="title" >
                                <span style="color: transparent">-</span>
                                <div class="con"  v-for="(i,index) in valuation3">
                                    <span>{{i.Change_before}}</span>
                                </div>
                            </div>
                            <div class="title" >
                                <span style="color: transparent">-</span>
                                <div class="con" v-for="(i,index) in valuation2">
                                    <span> {{i.Change_after}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="content_top">
                            <span class="spa">变更说明：</span>
                            <span>{{this.Explain}}</span>
                        </div>
                    </div>
                    <div class="content_approval">
                        <ul class="oul">
                            <li>
                                <span>项目名称：</span>
                                <span style="font-weight: bold">{{this.CheckRow.name}}</span>
                            </li>
                            <li>
                                <span>申请人：</span>
                                <span  style="font-weight: bold">{{this.CheckRow.createAdminName}}</span>
                            </li>
                            <li>
                                <span>提交时间：</span>
                                <span  style="font-weight: bold">{{this.CheckRow.createTime| dateFrm}}</span>
                            </li>
                        </ul>
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

                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
                <!--去审批-->
                <el-dialog
                    title="变更单审批"
                    :visible.sync="dialogVisiblesPopup"
                    width="60%"
                    center
                    top = "0"
                    :modal = true
                    class="eldialogs"
                >
                    <div class="content">
                        <span><i>分公司：</i><i style="font-weight: bold">{{CheckRow.filialeName}}</i></span>
                        <div class="top">
                            <ul>
                                <li>
                                    <span style="font-weight: bold;font-size: 17px">变更内容</span>
                                </li>
                                <li v-for="(i,index) in Change_item">
                                    <span>{{i.Change_content}}</span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <span style="font-weight: bold;font-size: 17px">变更前</span>
                                </li>
                                <li v-for="(i,index) in Change_item" >
                                    <span>{{i.Change_before}}</span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <span  style="font-weight: bold;font-size: 17px">变更后</span>
                                </li>
                                <li v-for="(i,index) in Change_item">
                                    <span>{{i.Change_after}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="areaPrice">
                            <div class="title" >
                                <span style="color: transparent">-</span>
                                <div  class="con" v-for="(i,index) in valuation1">
                                    <span>{{i.Change_content}}</span>
                                </div>
                            </div>
                            <div class="title" >
                                <span style="color: transparent">-</span>
                                <div class="con"  v-for="(i,index) in valuation3">
                                    <span>{{i.Change_before}}</span>
                                </div>
                            </div>
                            <div class="title" >
                                <span style="color: transparent">-</span>
                                <div class="con" v-for="(i,index) in valuation2">
                                    <span> {{i.Change_after}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="content_top">
                            <span class="spa">变更说明：</span>
                            <span>{{this.Explain}}</span>
                        </div>
                        <span style="margin:20px 0 ;display: block">审批意见：</span>
                        <div class="content_bottom">
                            <ul class="oul">
                                <li>
                                    <span>项目名称：</span>
                                    <span style="font-weight: bold">{{this.CheckRow.name}}</span>
                                </li>
                                <li>
                                    <span>姓名：</span>
                                    <span  style="font-weight: bold">{{this.CheckRow.createAdminName}}</span>
                                </li>
                                <li>
                                    <span>提交时间：</span>
                                    <span  style="font-weight: bold">{{this.CheckRow.createTime| dateFrm}}</span>
                                </li>
                            </ul>
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
                        <div class="bottom" v-if="this.$route.query.status == 'backlog'?true: false">
                            <el-form :model="ruleFormPopup" :rules="rulesPopup" ref="ruleFormPopup" label-width="80px" class="demo-ruleForm">
                                <el-form-item label="审批原因" prop="desc">
                                    <el-input type="textarea" v-model="ruleFormPopup.desc"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button v-if="this.$route.query.status == 'backlog'?true: false" type="primary" @click="adopt('ruleFormPopup')">通过</el-button>
                        <el-button v-if="this.$route.query.status == 'backlog'?true: false" type="primary" @click="returns('ruleFormPopup')">退回</el-button>
                    </span>
                </el-dialog>
            </template>
        </div>
        <!-- 分页插件 -->
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10,20, 30, 50]"
                       layout="total,prev, pager, next,sizes"
                       :pagesize="pagesize"
                       :total="total">
        </el-pagination>
    </div>
</template>
<script>
    import {getDate} from '../../js/dispatch.js'
    import "../../../mock/crm_change_data.js";
    import moment from 'moment'
    export default {
        data() {
            return {
                checkType:'',//审批状态
                arrs:[],
                valuation1:[],
                valuation2:[],
                valuation3:[],
                Explain:'',
                Change_item:[],
                content:[],
                crm_change:[],
                ruleFormPopup:{
                    desc:'',
                },
                dialogVisiblesPopup:false,
                CheckApproveManagement:'',
                CheckApprove:[],
                centerDialogVisible: false,
                //查看审批意见
                CheckRow:'',
                CheckRows:'',
                CheckRowing:'',
                name:'',
                accountStatus:'',
                userId:'',
                row:'',
                ruleForm: {
                    name: '',
                    desc:'',
                },
                Apply:'',
                arrObj:[],
                total:0,
                tableData:[],
                input3: '',
                input4: '',
                input5: '',
                select: '',
                arr:[],
                Price:[],
                currentPage:1,
                pagesize:10,//每页的数据条数
                formInline:{
                    CustomerID: '',
                    CustomerName:'',
                    region: '',
                },
                rules: {
                    desc: [
                        { required: true, message: '请填写申请原因', trigger: 'blur' }
                    ]
                },
                rulesPopup:{
                    desc: [
                        { required: true, message: '请输入审批意见', trigger: 'blur' },
                        {pattern: /^.{0,200}$/,  message: '汉字、字母或数字组合2~200个字符', trigger: 'blur' }
                    ]
                },
            }
        },
        created(){
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.$http.get("/crm_change_data").then(res=>{
                // console.log(res.body.data);
                this.crm_change = res.body.data;
                this.Price = res.body.areaPrice;
                // console.log(this.Price);
            });

            if(sessionStorage.getItem('NewCustomerApprovalRecordcurrentPage')!=null){
                let currentPages = Number(sessionStorage.getItem('NewCustomerApprovalRecordcurrentPage'));
                let totals = Number(sessionStorage.getItem('NewCustomerApprovalRecordtotal'));
                let pagesize = Number(sessionStorage.getItem('NewCustomerApprovalRecordpagesize'));
                // sessionStorage.removeItem('NewCustomerApprovalRecordpagesize');

                let condition = sessionStorage.getItem('NewCustomerApprovalRecordcondition');
                this.formInline = JSON.parse(condition);
                this.currentPage = currentPages;
                this.total = totals;
                this.pagesize = pagesize;
                // 新增接口
                this.requestTurnout()
            }else {
                this.data();
            }
            // this.data();
        },
        //时间转换
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD");
            }
        },
        methods:{
            open(row) {
                console.log(row);
                this.checkType = row.checkType;
                this.CheckRow = row;
                this.centerDialogVisible = true;
                this.$http.post(this.global.lightningUrl+'/companyv1/customerManage/query/listapproversdetail',JSON.stringify({
                    "token":this.token,
                    "id":row.approveId,
                    "areaId":row.manageAreaId,
                })).then(run=>{
                    console.log(run);
                    this.CheckApprove = run.body.result;
                })
                this.aa(row);
            },
            //编辑窗口的通过按钮
            adopt(ruleFormPopup){
                this.$refs[ruleFormPopup].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.global.lightningUrl+'/companyv1/customerManage/approve',JSON.stringify({
                            'token':this.token,
                            'id':this.CheckRow.approveId,
                            'opinion':this.ruleFormPopup.desc,
                            'state':'accepted',
                        })).then(run=> {
                            console.log(run);
                            if(run.body.errcode == 0){
                                this.$message({
                                    message: '审批通过',
                                    type: 'success'
                                });
                                this.dialogVisiblesPopup = false;
                                this.data();
                                this.backlog();
                                // this.$router.push({path:'/NewCustomerApprovalRecord'});
                            }else {
                                this.$message({
                                    showClose: true,
                                    message: run.body.message,
                                    type: 'error'
                                });
                                return false
                            }
                        });
                    }
                });
            },
            //编辑窗口的退回按钮
            returns(ruleFormPopup){
                this.$refs[ruleFormPopup].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.global.lightningUrl+'/companyv1/customerManage/approve',JSON.stringify({
                            'token':this.token,
                            'id':this.CheckRow.approveId,
                            'opinion':this.ruleFormPopup.desc,
                            'state':'rejected',
                        })).then(run=> {
                            console.log(run);
                            if(run.body.errcode == 0){
                                this.$message({
                                    message: '退回成功',
                                    type: 'warning'
                                });
                            }
                            this.dialogVisiblesPopup = false;
                            this.data();
                            this.backlog()
                            // this.$router.push({path:'/NewCustomerApprovalRecord'});
                        });
                    }
                });
            },
            //改变待办事项小红圈里的数字
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

            requestTurnout(){
                this.$http.post(this.global.lightningUrl+'/companyv1/customerManage/query/listapproveitems',JSON.stringify({
                    "token":this.token,
                    "id":this.formInline.CustomerID,
                    "pageNum": this.currentPage,
                    "pageSize":this.pagesize,
                    "customerName":this.formInline.CustomerName,
                    "status":this.formInline.region,
                    "backlogType":this.$route.query.status == 'backlog'?'backlog': "history"
                })).then(run=>{
                    console.log(run);
                    if (run.body.errcode == 0){
                        this.arr = run;
                        this.tableData = this.arr.body.result.rows;
                        this.total = this.arr.body.result.total;
                        for(let i in this.tableData){
                            if(this.tableData[i].checkState == 'accepted'){
                                this.tableData[i].checkState = '已通过'
                            }else if (this.tableData[i].checkState == 'approving') {
                                this.tableData[i].checkState = '审批中'
                            }else if (this.tableData[i].checkState == 'rejected'){
                                this.tableData[i].checkState = '未通过'
                            }else {
                                this.tableData[i].checkState = '未提交'
                            }
                            if (this.tableData[i].checkType == 'add'){
                                this.tableData[i].checkType =  '新增客户审批'
                            }else if (this.tableData[i].checkType == 'update'){
                                this.tableData[i].checkType =  '变更客户审批'
                            }
                        }
                    }
                })
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            //列表的查看编辑按钮
            handleClick(row) {
                console.log(row.id);
                sessionStorage.setItem('managementid',JSON.stringify(row));
                this.$router.push({path:'/ViewTheDetails',query:{info:1}})
            },
            //查询
            query(){
                console.log(this.currentPage);
                this.currentPage=1;
                this.data()
            },
            //页面首次刷新
            data() {
                let page =JSON.stringify({
                    "token":this.token,
                    "id":this.formInline.CustomerID,
                    "pageNum": this.currentPage,
                    "pageSize":this.pagesize,
                    "customerName":this.formInline.CustomerName,
                    "status":'approving',
                    "backlogType":this.$route.query.status == 'backlog'?'backlog': "history",
                });
                console.log(page);
                this.$http.post(this.global.lightningUrl+'/companyv1/customerManage/query/listapproveitems',JSON.stringify({
                    "token":this.token,
                    "id":this.formInline.CustomerID,
                    "pageNum": this.currentPage,
                    "pageSize":this.pagesize,
                    "customerName":this.formInline.CustomerName,
                    "status":this.formInline.region,
                    "backlogType":this.$route.query.status == 'backlog'?'backlog': "history"
                })).then(run=>{
                    console.log(run);
                    if (run.body.errcode == 0){
                        this.arr = run;
                        this.tableData = this.arr.body.result.rows;
                        this.total = this.arr.body.result.total;
                        console.log(this.total);
                        for(let i in this.tableData){
                            if(this.tableData[i].checkState == 'accepted'){
                                this.tableData[i].checkState = '已通过'
                            }else if (this.tableData[i].checkState == 'approving') {
                                this.tableData[i].checkState = '审批中'
                            }else if (this.tableData[i].checkState == 'rejected'){
                                this.tableData[i].checkState = '未通过'
                            }else {
                                this.tableData[i].checkState = '未提交'
                            }


                            if (this.tableData[i].checkType == 'add'){
                                this.tableData[i].checkType =  '新增客户审批'
                            }else if (this.tableData[i].checkType == 'update'){
                                this.tableData[i].checkType =  '变更客户审批'
                            }
                        }
                    }
                    // NewCustomerApprovalRecord
                    //更新本地存储
                    if(sessionStorage.getItem('NewCustomerApprovalRecordcurrentPage')!= null){
                        //删除本地
                        sessionStorage.removeItem('NewCustomerApprovalRecordcurrentPage');
                        sessionStorage.removeItem('NewCustomerApprovalRecordcondition');
                        sessionStorage.removeItem('NewCustomerApprovalRecordtotal');
                        sessionStorage.removeItem('NewCustomerApprovalRecordpagesize');
                        //存储本地
                        sessionStorage.setItem('NewCustomerApprovalRecordcurrentPage', JSON.stringify(this.currentPage));
                        sessionStorage.setItem('NewCustomerApprovalRecordtotal', JSON.stringify(this.total));
                        sessionStorage.setItem('NewCustomerApprovalRecordcondition', JSON.stringify(this.formInline));
                        sessionStorage.setItem('NewCustomerApprovalRecordpagesize', JSON.stringify(this.pagesize));

                    }else {
                        //存储本地
                        sessionStorage.setItem('NewCustomerApprovalRecordcurrentPage', JSON.stringify(this.currentPage));
                        sessionStorage.setItem('NewCustomerApprovalRecordtotal', JSON.stringify(this.total));
                        sessionStorage.setItem('NewCustomerApprovalRecordcondition', JSON.stringify(this.formInline));
                        sessionStorage.setItem('NewCustomerApprovalRecordpagesize', JSON.stringify(this.pagesize));
                    }
                })
            },
            aa(row){
                this.Change_item = [];
                this.dialogVisiblesPopup = this.$route.query.status == 'backlog' ?true:false;
                console.log(row);
                this.CheckRow = row;
                this.$http.post(this.global.lightningUrl+'/companyv1/customerManage/query/listapproversdetail',JSON.stringify({
                    "token":this.token,
                    "id":row.approveId,
                    "areaId":row.manageAreaId,
                })).then(run=>{
                    console.log(run);
                    this.CheckApprove = run.body.result;
                });
                let page = JSON.stringify({
                    "token":this.token,
                    "id":row.approveId,
                    "type": this.$route.query.status == 'history' ?'history':'',
                });
                this.$http.post(this.global.lightningUrl+'/companyv1/customerManage/customer/modify/info',page).then(res=>{
                    console.log(res);
                    if  (res.body.result == null){
                        this.Change_item=[];
                        this.valuation1=[];
                        this.valuation2=[];
                        this.valuation3=[];
                        this.Explain = '';
                    }else {
                        this.valuation1=[];
                        this.valuation2=[];
                        this.valuation3=[];
                        this.Explain = '';
                        this.content = res.body.result;
                        if (res.body.result.Explain.after != undefined) {
                            this.Explain = res.body.result.Explain.after;
                        }else {
                            this.Explain = '';
                        }

                        for (var i in this.crm_change) {
                            for (var key in this.content){
                                if (this.crm_change[i].Backstage == key) {
                                    if (key == 'resourceClassification'){
                                        console.log(this.content[key].after);
                                        if (this.content[key].after === 'one') {
                                            this.content[key].after = '一手货源'
                                        }else if (this.content[key].after == 'two') {
                                            this.content[key].after = '二手货源'
                                        }else{
                                            this.content[key].after = '三手货源'
                                        }
                                        if (this.content[key].before === 'one') {
                                            this.content[key].before = '一手货源'
                                        }else if (this.content[key].before == 'two') {
                                            this.content[key].before = '二手货源'
                                        }else{
                                            this.content[key].before = '三手货源'
                                        }
                                    }
                                    if (key == 'driverBillCycleType') {
                                        if (this.content[key].after === 'T') {
                                            this.content[key].after = '自然日'
                                        }else if (this.content[key].after == 'M') {
                                            this.content[key].after = '自然月'
                                        }else if (this.content[key].after == 'B') {
                                            this.content[key].after = '背靠背'
                                        }
                                        if (this.content[key].before === 'T') {
                                            this.content[key].before = '自然日'
                                        }else if (this.content[key].before == 'M') {
                                            this.content[key].before = '自然月'
                                        }else if (this.content[key].before == 'B') {
                                            this.content[key].before = '背靠背'
                                        }
                                    }
                                    if (key == 'billCycleType') {
                                        if (this.content[key].after === 'T') {
                                            this.content[key].after = '自然日'
                                        }else if (this.content[key].after == 'M') {
                                            this.content[key].after = '自然月'
                                        }
                                        if (this.content[key].before === 'T') {
                                            this.content[key].before = '自然日'
                                        }else if (this.content[key].before == 'M') {
                                            this.content[key].before = '自然月'
                                        }
                                    }
                                    if (key == 'isQuoted'){
                                        console.log(this.content[key].after);
                                        if (this.content[key].after === '1') {
                                            this.content[key].after = '上市'
                                        }else if (this.content[key].after == '0') {
                                            this.content[key].after = '未上市'
                                        }
                                        if (this.content[key].before === '1') {
                                            this.content[key].before = '上市'
                                        }else if (this.content[key].before == '0') {
                                            this.content[key].before = '未上市'
                                        }
                                    }
                                    if (key == 'endDate'){
                                        console.log(getDate(parseInt(this.content[key].after)));
                                        this.content[key].after = getDate(parseInt(this.content[key].after));
                                        this.content[key].before = getDate(parseInt(this.content[key].before));
                                    }
                                    if (key == 'beginDate'){
                                        console.log(getDate(parseInt(this.content[key].after)));
                                        this.content[key].after = getDate(parseInt(this.content[key].after));
                                        this.content[key].before = getDate(parseInt(this.content[key].before));
                                    }
                                    if (key == 'archivedDate'){
                                        console.log(getDate(parseInt(this.content[key].after)));
                                        this.content[key].after = getDate(parseInt(this.content[key].after));
                                        this.content[key].before = getDate(parseInt(this.content[key].before));
                                    }

                                    if (key == 'isInvoice'){
                                        console.log(this.content[key].after);
                                        if (this.content[key].after === '1') {
                                            this.content[key].after = '是'
                                        }else if (this.content[key].after == '0') {
                                            this.content[key].after = '否'
                                        }
                                        if (this.content[key].before === '1') {
                                            this.content[key].before = '是'
                                        }else if (this.content[key].before == '0') {
                                            this.content[key].before = '否'
                                        }
                                    }
                                    if (key == 'isArchived'){
                                        console.log(this.content[key].after);
                                        if (this.content[key].after === '1') {
                                            this.content[key].after = '是'
                                        }else if (this.content[key].after == '0') {
                                            this.content[key].after = '否'
                                        }
                                        if (this.content[key].before === '1') {
                                            this.content[key].before = '是'
                                        }else if (this.content[key].before == '0') {
                                            this.content[key].before = '否'
                                        }
                                    }
                                    if (key == 'financeMoney'){
                                        console.log(this.content[key].after);
                                        if (this.content[key].after === '0') {
                                            this.content[key].after = '< 5000万人民币'
                                        }else if (this.content[key].after == '5000') {
                                            this.content[key].after = '5000万人民币 - 1亿人民币'
                                        }else{
                                            this.content[key].after = '1亿人民币'
                                        }
                                        if (this.content[key].before === '0') {
                                            this.content[key].before = '< 5000万人民币'
                                        }else if (this.content[key].before == '5000') {
                                            this.content[key].before = '5000万人民币 - 1亿人民币'
                                        }else{
                                            this.content[key].before = '1亿人民币'
                                        }
                                    }
                                    if (key == 'businessType') {

                                        if (this.content[key].after === '1002996') {
                                            this.content[key].after = '城市配送'
                                        }else if (this.content[key].after == '1003997') {
                                            this.content[key].after = '干线普货运输'
                                        }else if(this.content[key].after == '1003998'){
                                            this.content[key].after = '农村配送'
                                        }else if (this.content[key].after == '1002998') {
                                            this.content[key].after = '集装箱运输'
                                        }else {
                                            this.content[key].after = '其他'
                                        }

                                        if (this.content[key].before === '1002996') {
                                            this.content[key].before = '城市配送'
                                        }else if (this.content[key].before == '1003997') {
                                            this.content[key].before = '干线普货运输'
                                        }else if(this.content[key].before == '1003998'){
                                            this.content[key].before = '农村配送'
                                        }else if (this.content[key].before == '1002998') {
                                            this.content[key].before = '集装箱运输'
                                        }else {
                                            this.content[key].before = '其他'
                                        }

                                    }
                                    if (key == 'type'){
                                        console.log(this.content[key].after);
                                        if (this.content[key].after === 'InterimCustomer') {
                                            this.content[key].after = '临时项目'
                                        }else if (this.content[key].after == 'ProjectCustomer') {
                                            this.content[key].after = '标准项目'
                                        }else{
                                            this.content[key].after = '背靠背项目'
                                        }
                                        if (this.content[key].before === 'InterimCustomer') {
                                            this.content[key].before = '临时项目'
                                        }else if (this.content[key].before == 'ProjectCustomer') {
                                            this.content[key].before = '标准项目'
                                        }else{
                                            this.content[key].before = '背靠背项目'
                                        }
                                    }

                                    if (key == 'areaPrice'){
                                        this.valuation1.push({'Change_content':"计价方式"});
                                        for (let j in JSON.parse(this.content[key].after)){
                                            for (let k in JSON.parse(this.content[key].after)[j].priceParams) {
                                                if (JSON.parse(this.content[key].after)[j].priceParams[k] != 0) {
                                                    for (let x in this.Price){
                                                        if  (this.Price[x].Backstage == k){
                                                            if (JSON.parse(this.content[key].after)[j].priceParams[k] != 0) {
                                                                this.valuation2.push({'Change_after':JSON.parse(this.content[key].after)[j].area+' '+ this.Price[x].name + ' ' + JSON.parse(this.content[key].after)[j].priceParams[k]});
                                                                // console.log(this.valuation);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        for (let j in JSON.parse(this.content[key].before)){
                                            for (let k in JSON.parse(this.content[key].before)[j].priceParams) {
                                                if (JSON.parse(this.content[key].before)[j].priceParams[k] != 0) {
                                                    for (let x in this.Price){
                                                        if  (this.Price[x].Backstage == k){
                                                            if (JSON.parse(this.content[key].before)[j].priceParams[k] != 0) {
                                                                this.valuation3.push({'Change_before':JSON.parse(this.content[key].before)[j].area +' '+ this.Price[x].name + ' ' + JSON.parse(this.content[key].before)[j].priceParams[k]});
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    this.Change_item.push({'Change_content':this.crm_change[i].name,'Change_before':this.content[key].before,'Change_after':this.content[key].after});
                                }
                            }
                        }
                        for (var i in this.Change_item){
                            // console.log(this.Change_item[i].Change_content);
                            if  (this.Change_item[i].Change_content == '计价方式'){
                                // console.log(i)
                                this.Change_item.splice(i,1);
                            }
                        }
                    }

                })
            },
            //操作按钮（去审批）
            approve(row){
                console.log(row.checkType);
                if (row.checkType == '新增客户审批'){
                    var scope = row;
                    sessionStorage.setItem('scopes',JSON.stringify(scope));
                    this.$router.push({path:'/ViewTheDetails',query:{info:0}});
                }else {
                    this.aa(row)
                }
            },
            //分页
            handleSizeChange(pagesize){
                this.pagesize = pagesize;
                this.data();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.data();
            },
        }
    }
</script>
<style lang="scss" scoped>
    .main {
        font-size: 16px;
        padding-top: 30px;
        padding-left: 30px;
        .content{
            .top{
                background: #F2F2F2;
                margin:20px 0 0 0 ;
                ul{
                    text-align: center;
                    padding:10px 0 ;
                    overflow: hidden;
                    display: inline-block;
                    width:33%;
                    li{
                       height:25px;
                        padding:10px 0;
                    }
                }
            }
            .areaPrice{
                overflow: hidden;
                background: #F2F2F2;
                .title{
                    float:left;
                    width:33%;
                    text-align: center;

                    .nam{
                        font-weight: bold;
                    }
                    .con{
                        height:25px;
                        padding:10px 0;
                    }
                }
            }
            .content_top{
                padding:10px 0;
                margin:15px 0;
                background: #F2F2F2;
                .spa{
                    padding:0 0 0 25px;
                }
            }
            .content_bottom{
                background: #F2F2F2;
                .oul{
                    text-align: center;
                    padding:10px 0 ;
                    overflow: hidden;
                    li{
                        float: left;
                        width: 30%;
                    }
                }
            }
            .bottom{
                background: #F2F2F2;
                margin:15px 0;
                padding:10px 0;
            }
        }
        .content_approval{
            background: #F2F2F2;
            .oul{
                text-align: center;
                padding:10px 0 ;
                overflow: hidden;
                li{
                    float: left;
                    width: 30%;
                }
            }

        }
    }
</style>
