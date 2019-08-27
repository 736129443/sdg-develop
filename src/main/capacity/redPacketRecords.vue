<template>
    <div class="main">
        <div class="header">
            当前位置：<span> 项目管理 > 红包申请记录</span>
        </div>
        <div class="dv">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="出车单编号">
                    <el-input v-model.trim="formInline.trackId" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入客户编号"></el-input>
                </el-form-item>

                <el-form-item label="司机姓名">
                    <el-input v-model.trim="formInline.driverName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入客户编号"></el-input>
                </el-form-item>
                <el-form-item label="配送日期">
                    <el-date-picker
                            width="110"
                            v-model="formInline.Registration"
                            type="daterange"
                            value-format="timestamp"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="仓库名称">
                    <el-input v-model.trim="formInline.depotName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入客户编号"></el-input>
                </el-form-item>

                <el-form-item label="项目名称">
                    <el-input v-model.trim="formInline.customerName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="销售专员">
                    <el-input v-model.trim="formInline.saleName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入客户编号"></el-input>
                </el-form-item>
                <el-form-item label="运营专员">
                    <el-input v-model.trim="formInline.projectName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入客户编号"></el-input>
                </el-form-item>
                <el-form-item label="审批状态">
                    <el-select v-model="formInline.checkStatus" placeholder="请选择审批状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已通过审批" value="accepted"></el-option>
                        <el-option label="未通过审批" value="rejected"></el-option>
                        <el-option label="审批中" value="approving"></el-option>
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
                            prop=""
                            width="210"
                            label="出车单编号" align="center">
                        <template slot-scope="scope">
                            <div @click="handleClick(scope.row.trackId,scope.row.status)">
                                <a style="color: rgb(102,177,255);cursor: pointer;">{{ tableData[scope.$index].trackId }}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="210"
                            prop="lineName"
                            label="线路名称" align="center">
                    </el-table-column>
                    <el-table-column
                            width="180"
                            prop="trackStartTime"
                            :formatter="dateFormat"
                            label="配送日期" align="center">
                    </el-table-column>
                    <el-table-column
                            width="120"
                            prop="depotName"
                            label="仓库名称" align="center">
                    </el-table-column>
                    <el-table-column
                            width="160"
                            prop="saleAdminName"
                            label="司机姓名（电话）" align="center">
                        <template slot-scope="scope">
                            <p>{{tableData.length === 0 ?"":tableData[scope.$index].driverName}}</p>
                            <p>{{tableData.length === 0 ?"":tableData[scope.$index].phone}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="110"
                            prop="customerName"
                            label="项目名称" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="saleName"
                            label="销售专员" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="projectName"
                            label="运营专员" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="objectName"
                            label="发放人" align="center">
                    </el-table-column>
                    <el-table-column
                            width="120"
                            prop="amount"
                            label="发放金额（元）" align="center">
                    </el-table-column>
                    <el-table-column
                            width="80"
                            prop="reason"
                            label="发放原因" align="center">
                    </el-table-column>
                    <el-table-column
                            width="130"
                            prop="checkStatus"
                            label="状态" align="center">
                    </el-table-column>
                    <el-table-column label="操作"
                                     fixed="right"
                                     width="130"
                                     align="center">
                        <template  slot-scope="scope">
                            <el-button  type="text" size="small"  @click="open(scope.row)">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--查看弹窗-->
                <el-dialog
                        title="查看审核记录"
                        :visible.sync="centerDialogVisible"
                        width="70%"
                        center>
                    <div class="cen">
                        <div class="left_50">
                            <ul class="oul">
                                <li style="font-weight: bold;font-size: 18px">
                                    审批进度
                                </li>
                                <li>
                                    <span>申请人：</span>
                                    <span>{{this.CheckRow.objectName}}</span>
                                </li>
                                <li>
                                    <span>提交时间：</span>
                                    <span>{{this.CheckRow.commitTime| dateFrm}}</span>
                                </li>
                            </ul>
                            <!--城市经理-->
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
                        <!--<span>需要注意的是内容是默认不居中的</span>-->
                        <div class="right_50">
                            <ul>
                                <li style="font-weight: bold;font-size: 18px">
                                    基本信息
                                </li>
                                <li>
                                    <span>出车单编号：</span>
                                    <span>{{this.CheckRow.trackId}}</span>
                                </li>
                                <li>
                                    <span>线路名称：</span>
                                    <span>{{this.CheckRow.lineName}}</span>
                                </li>
                                <li>
                                    <span>仓库名称：</span>
                                    <span>{{this.CheckRow.depotName}}</span>
                                </li>
                                <li>
                                    <span>项目名称：</span>
                                    <span>{{this.CheckRow.customerName}}</span>
                                </li>
                                <li>
                                    <span>发放原因：</span>
                                    <span>{{this.CheckRow.reason}}</span>
                                </li>
                                <li>
                                    <span>备注：</span>
                                    <span>{{this.CheckRow.remark}}</span>
                                </li>
                                <li>
                                    <span>发放金额：</span>
                                    <span>{{this.CheckRow.amount}}</span>
                                </li>
                                <li>
                                    <span>申请人：</span>
                                    <span>{{this.CheckRow.objectName}}</span>
                                </li>
                                <li>
                                    <span>提交时间：</span>
                                    <span>{{this.CheckRow.commitTime| dateFrm}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </template>
        </div>
        <!-- 分页插件 -->
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10,20,30,50]"
                       layout="total,prev, pager, next,sizes"
                       pagesize="this.pagesize"
                       :total="total">
        </el-pagination>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: "redPacketRecords",
        data() {
            return {
                ids:'',
                current:'',
                CheckApproveManagement:'',
                CheckApprove:[],
                centerDialogVisible: false,
                //查看审批意见
                CheckRow:'',
                name:'',
                accountStatus:'',
                userId:'',
                row:'',
                ruleFormPopup: {
                    resource:'',
                    name: '',
                    desc:'',//原因
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
                    trackId:"",  //出车单编号       id
                    driverName:"", //司机姓名       字符串
                    depotName:"",	//仓库名称        字符串
                    customerName:"", //商户名称   字符串
                    saleName:"",	//销售专员名      字符串
                    projectName:"", //运营专员名    字符串
                    checkStatus:"",  //审批状态     字符串
                    createTimeBegin:"", //起始时间  时间戳
                    createTimeEnd:"",	//结束时间    时间戳
                    Registration:[],//配送日期
                },
            }
        },
        created(){
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            if(sessionStorage.getItem('redPacketRecordscurrentPage')!=null){
                let currentPages = Number(sessionStorage.getItem('redPacketRecordscurrentPage'));
                let totals = Number(sessionStorage.getItem('redPacketRecordstotal'));
                let condition = sessionStorage.getItem('redPacketRecordscondition');

                this.formInline = JSON.parse(condition);
                this.currentPage = currentPages;
                this.total = totals;
                // 新增接口
                this.data();
            }else {
                this.data();
            }
            // this.data();
        },
        //时间转换
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm");
            }
        },
        methods:{
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            //列表的查看编辑按钮
            handleClick(row,status) {
                console.log(row);
                console.log(status);
                let trackId = row;
                this.$router.push({
                    path: './orderDetails',
                    query: {
                        trackId: trackId,
                        status: 'finished'
                    }
                });
            },
            //查询
            query(){
                console.log(this.currentPage);
                this.currentPage=1;
                this.data()
            },
            //页面首次刷新
            data() {
                if (this.formInline.Registration == '' || this.formInline.Registration == null || this.formInline.Registration == undefined){
                    this.formInline.Registration = ''
                }
                this.$http.post(this.global.lightningUrl+'/companyv1/finance/redpacket/queryRedPackets',JSON.stringify({
                    "token":this.token,
                    "pageNum": this.currentPage,
                    "pageSize":this.pagesize,
                    "trackId":this.formInline.trackId,  //出车单编号       id         用于过滤
                    "driverName":this.formInline.driverName, //司机姓名       字符串     用于过滤
                    "depotName":this.formInline.depotName,	//仓库名称        字符串     用于过滤
                    "customerName":this.formInline.customerName, //商户名称   字符串     用于过滤
                    "saleName":this.formInline.saleName,	//销售专员名      字符串     用于过滤
                    "projectName":this.formInline.projectName, //运营专员名    字符串     用于过滤
                    "checkStatus":this.formInline.checkStatus,  //审批状态     字符串     用于过滤
                    "createTimeBegin":this.formInline.Registration[0], //起始时间  时间戳     用于过滤
                    "createTimeEnd":this.formInline.Registration[1]+86400000-1,	//结束时间    时间戳     用于过滤
                    "isCommit" : 1
                })).then(run=>{
                    console.log(run);
                    if (run.body.errcode == 0){
                        this.arr = run;
                        this.tableData  = this.arr.body.result.rows;
                        this.total = this.arr.body.result.total;
                        console.log(this.total);
                        for(let i in this.tableData){
                            if(this.tableData[i].checkStatus == 'accepted'){
                                this.tableData[i].checkStatus = '已通过审批'
                            }else if (this.tableData[i].checkStatus == 'approving') {
                                this.tableData[i].checkStatus = '审批中'
                            }else if (this.tableData[i].checkStatus == 'rejected'){
                                this.tableData[i].checkStatus = '未通过审批'
                            }
                        }
                    }
                    //更新本地存储
                    if(sessionStorage.getItem('redPacketRecordscurrentPage')!= null){
                        //删除本地
                        sessionStorage.removeItem('redPacketRecordscurrentPage');
                        sessionStorage.removeItem('redPacketRecordscondition');
                        sessionStorage.removeItem('redPacketRecordstotal');
                        //存储本地
                        sessionStorage.setItem('redPacketRecordscurrentPage', JSON.stringify(this.currentPage));
                        sessionStorage.setItem('redPacketRecordstotal', JSON.stringify(this.total));
                        sessionStorage.setItem('redPacketRecordscondition', JSON.stringify(this.formInline));
                    }else {
                        //存储本地
                        sessionStorage.setItem('redPacketRecordscurrentPage', JSON.stringify(this.currentPage));
                        sessionStorage.setItem('redPacketRecordstotal', JSON.stringify(this.total));
                        sessionStorage.setItem('redPacketRecordscondition', JSON.stringify(this.formInline));
                    }
                })

            },
            open(row) {
                console.log(row);
                console.log("123");
                this.centerDialogVisible = true;
                this.CheckRow = row;
                this.$http.post(this.global.lightningUrl+'/companyv1/finance/redpacket/approvalDetail',JSON.stringify({
                    "token":this.token,
                    "redPacketId":row.id,
                })).then(run=>{
                    console.log(run);
                    this.CheckApprove = run.body.result;
                })
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

<style scoped lang='scss'>
    .main {
        font-size: 16px;
        padding-top: 30px;
        padding-left: 30px;

        ul{
            li {
                margin: 10px 0;
                display: block;
                padding-right: 40px;
            }
        }
        .cen{
            overflow: hidden;
            .left_50{
                float: left;
                width:50%;
                .oul{
                    padding-top:20px;
                }
            }
            .right_50{
                float: left;
                width:50%;
                ul{
                   li{
                       padding-top:20px;
                   }
                }
            }
        }
        .dialog-footer{
            overflow: hidden;
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
        .number{
            padding:0 50px;
        }
    }
</style>