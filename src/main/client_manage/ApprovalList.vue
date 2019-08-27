<template>
    <div class="main">
        <div class="header">
            当前位置：<span>CRM管理>客户管理>审批列表</span>
        </div>
        <div class="dv">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="客户编号">
                    <el-input v-model.trim="formInline.CustomerID" placeholder="请输入客户编号"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model.trim="formInline.CustomerName" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="审批状态">
                    <el-select v-model="formInline.region" placeholder="请选择审批状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
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
                            prop="ids"
                            label="项目编号" align="center">
                        <template slot-scope="scope">

                            <el-button type="text" size="small"  :disabled="tableData[scope.$index].checkState == '未提交'" @click="handleClick(scope.row)">{{ tableData[scope.$index].id }}</el-button>
                            <!--<a style="color: rgb(102,177,255);cursor: pointer;" disabled="tableData[scope.$index].checkState == '未提交'"></a>-->

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
                    <!--<el-table-column-->
                            <!--prop="city"-->
                            <!--label="城市" align="center">-->
                    <!--</el-table-column>-->
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

                    <el-table-column label="操作"
                                     align="center"
                    >
                        <template  slot-scope="scope">
                            <!--版本一-->
                            <el-button  @click="edit(scope.row)" type="text" size="small"  v-if="tableData[scope.$index].checkState == '未提交' ?true:false">编辑</el-button>
                            <el-button  @click="Jump(scope.row)" type="text" size="small"  v-if="tableData[scope.$index].checkState == '未通过' && tableData[scope.$index].checkType == '新增客户审批' ">重新提交</el-button>
                            <el-button v-if="tableData[scope.$index].checkState != '未提交' || tableData[scope.$index].checkState == '未通过(历史记录)'"  type="text" size="small"  @click="open(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>

                    <!--<el-table-column-->
                            <!--prop=""-->
                            <!--label="操作" align="center">-->
                        <!--<template  slot-scope="scope">-->
                            <!--<el-button  type="text" size="small" v-if="tableData[scope.$index].checkState == '审批中'?true:false">等待审批</el-button>-->
                            <!--<el-button  @click="Jump(scope.row)" type="text" size="small"  v-if="tableData[scope.$index].checkState == '未提交'?true:false">去完成</el-button>-->
                            <!---->
                            <!--<el-button  type="text" size="small" v-if="tableData[scope.$index].checkState == '已通过审批'?true:false">已通过</el-button>-->
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
                    <div class="content_approval">
                        <div class="content_title">
                            <span>项目名称：</span>
                            <span>{{this.CheckRow.name}}</span>
                        </div>
                        <ul class="oul">
                            <li>
                                <span>申请人：</span>
                                <span>{{this.CheckRow.createAdminName}}</span>
                            </li>
                            <li>
                                <span>提交时间：</span>
                                <span>{{this.CheckRow.createTime| dateFrm}}</span>
                            </li>
                        </ul>
                        <!--//城市经理-->
                        <ul class="oul" v-for="i in this.CheckApprove">
                            <li>
                                <span>审批人：</span>
                                <span>{{i.adminName}}</span>
                            </li>
                            <li>
                                <span>审批意见：</span>
                                <span>{{i.opinion}}</span>
                            </li>
                            <li >
                                <span >审批时间：</span>
                                <span v-if="i.createTime == null?false:true">{{i.createTime | dateFrm}}</span>
                            </li>
                        </ul>
                    </div>

                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </template>
        </div>
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
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                CheckApproveManagement:'',
                CheckApprove:[],
                CheckRow:'',
                centerDialogVisible:false,
                options: [{
                    value: 'accepted',
                    label: '已通过审批'
                }, {
                    value: 'rejected',
                    label: '未通过审批'
                },{
                    value: 'approving',
                    label: '审批中'
                },{
                    value: 'saved',
                    label: '未提交'
                }],
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
                currentPage:1,
                pagesize:10,//每页的数据条数
                formInline:{
                    CustomerID: '',
                    CustomerName:'',
                    region: '',
                },
                size:'',
            }
        },
        created(){
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;

            //页面初始化
            if(sessionStorage.getItem('ApprovalListcurrentPage')!=null){
                let currentPages = Number(sessionStorage.getItem('ApprovalListcurrentPage'));
                let totals = Number(sessionStorage.getItem('ApprovalListtotal'));
                let condition = sessionStorage.getItem('ApprovalListcondition');

                this.formInline = JSON.parse(condition)
                this.currentPage = currentPages;
                this.total = totals;
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
            edit(row){
                console.log(row);
                sessionStorage.setItem('managementid',JSON.stringify(row));
                this.$router.push({path:'/change_insert',query:{info:5}});
            },
            Jump(row){
                console.log(row);
                sessionStorage.setItem('managementid',JSON.stringify(row));
                this.$router.push({path:'/change_insert',query:{info:0}});
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
                sessionStorage.setItem('managementid',Base64.encode(row.userId));
                sessionStorage.setItem('scopes',JSON.stringify(row));
                this.$router.push({path:'/ViewTheDetails',query:{info:2}})
            },
            requestTurnout(){
              this.data()
            },
            //查询this.global.lightningUrl +
            query(){
                this.currentPage = 1 ;
                this.data();
            },
            //页面首次刷新
            data() {
                this.$http.post(this.global.lightningUrl+'/companyv1/customerManage/applyApprovalList',JSON.stringify({
                    "token":this.token,
                    "id1":this.formInline.CustomerID,
                    "conditionStr1":this.formInline.CustomerName,
                    "conditionStr2":this.formInline.region,
                    "pageNum": this.currentPage,
                    "pageSize":this.pagesize,
                })).then(run=>{
                    console.log(run);
                    if (run.body.errcode == 0){
                        if (run.body.result == null){
                            this.$message({
                                showClose: true,
                                message: '暂无数据',
                                type: 'warning'
                            });
                            return false
                        }
                        this.arr = run;
                        this.tableData = this.arr.body.result.rows;
                        console.log(this.tableData);
                        this.total = this.arr.body.result.total;
                        for(var i in this.tableData){
                            if ( this.tableData[i].checkState == 'saved' ){
                                this.tableData[i].checkState = '未提交'
                            } else if ( this.tableData[i].checkState == 'approving'){
                                this.tableData[i].checkState = '审批中'
                            }else if(this.tableData[i].checkState == 'rejected'){
                                this.tableData[i].checkState = '未通过'
                            }else if(this.tableData[i].checkState == 'accepted'){
                                this.tableData[i].checkState = '已通过'
                            }else if(this.tableData[i].checkState == 'expire'){
                                this.tableData[i].checkState = '未通过(历史记录)'
                            }

                            if (this.tableData[i].checkType == 'add'){
                                this.tableData[i].checkType =  '新增客户审批'
                            }else if (this.tableData[i].checkType == 'update'){
                                this.tableData[i].checkType =  '变更客户审批'
                            }
                        }
                    }else {
                        this.tableData = [];
                    }
                })
                //更新本地存储
                if(sessionStorage.getItem('ApprovalListcurrentPage')!=null&&sessionStorage.getItem('ApprovalListcurrentPage')!=null){
                    //删除本地
                    sessionStorage.removeItem('ApprovalListcurrentPage');
                    sessionStorage.removeItem('ApprovalListcondition');
                    sessionStorage.removeItem('ApprovalListtotal');
                    //存储本地
                    sessionStorage.setItem('ApprovalListcurrentPage', JSON.stringify(this.currentPage));
                    sessionStorage.setItem('ApprovalListtotal', JSON.stringify(this.total));
                    sessionStorage.setItem('ApprovalListcondition', JSON.stringify(this.formInline));
                }else {
                    //存储本地
                    sessionStorage.setItem('ApprovalListcurrentPage', JSON.stringify(this.currentPage));
                    sessionStorage.setItem('ApprovalListtotal', JSON.stringify(this.total));
                    sessionStorage.setItem('ApprovalListcondition', JSON.stringify(this.formInline));
                }
            },
            //操作按钮（去审批）
            //分页
            handleSizeChange(pagesize){
                this.pagesize = pagesize;
                this.data();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.data();
            },
            open(row) {
                console.log(row);
                this.centerDialogVisible = true;
                this.CheckRow = row;
                console.log(this.CheckRow);
                this.$http.post(this.global.lightningUrl+'/companyv1/customerManage/query/listapproversdetail',JSON.stringify({
                    "token":this.token,
                    "id":row.approveId,
                    "areaId":row.manageAreaId,
                })).then(run=>{
                    console.log(run);
                    this.CheckApprove = run.body.result;
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
    .main {
        font-size: 16px;
        padding-top: 30px;
        padding-left: 30px;
        /*ul{*/
            /*li {*/
                /*margin: 10px 0;*/
                /*display: block;*/
                /*padding-right: 40px;*/
            /*}*/
        /*}*/
        .content_approval{
            background: #F2F2F2;
            .content_title{
                font-weight: bold;
                padding:20px;
            }
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
        .el-form-item {
            margin-bottom: 10px;
        }
        .top {
            margin-top: 20px;
        }
        .inp {
            width:150px;
            height:30px;
            margin-right: 30px;
            border: 1px solid #ccc;
            padding-left:10px;
            color: #ccc;
        }
        .dv {
            margin-top: 20px;
        }
        .dc {
            position: absolute;
            top:45px;
            right: 180px;
        }
        .dr {
            position: absolute;
            top: 45px;
            right: 10px;
        }
        .search {
            margin:0 30px;
        }

        td {
            border: 1px solid #ccc;
        }
        .el-pagination {
            padding: 10px 505px;
        }
    }

</style>
