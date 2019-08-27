<template>
    <div class="main client_manage" >
        <div class="header">
            当前位置：<span>CRM管理 > 客户管理</span>
        </div>
        <div class="dv">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="项目编号">
                    <el-input v-model.trim="formInline.CustomerID" placeholder="客户编号"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model.trim="formInline.CustomerName" placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item label="合同编号">
                    <el-input v-model.trim="formInline.ContractNo" placeholder="合同编号"></el-input>
                </el-form-item>
                <el-form-item label="管理区">
                    <el-select v-model="formInline.area">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in regionList" :label='i.name' :value="i.id" :key="i.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属分公司">
                    <el-select v-model="formInline.region" placeholder="所属分公司">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                                v-for="i in arrs"
                                :key="i.id"
                                :value="i.id"
                                :label='i.deptName'
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目状态">
                    <el-select v-model="formInline.state" placeholder="项目状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="正常" value="normal"></el-option>
                        <el-option label="冻结" value="FreezeAccount"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="query()">查询</el-button>
                    <el-button type="primary" v-if="addCRM ==true?true:false" to="/insert" @click="insert">新增</el-button>
                    <el-button type="primary" @click="Export()" v-if="customerManageExport==true?true:false">导出</el-button>
                    <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                </el-form-item>
                <el-alert
                    title="说明:"
                    type="warning"
                    description="已过期的合同(合同编号)为橙色"
                    show-icon>
                </el-alert>
            </el-form>
            <template>
                <el-table
                        :row-class-name="tableRowClassName"
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="项目编号"
                            align="center"
                            width="130">
                        <template slot-scope="scope">
                            <div @click="handleClicks(scope.row)">
                                <router-link to="/ViewTheDetails" style="color:#409EFF;">{{ tableData[scope.$index].id }} </router-link>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            width="100"
                            label="项目名称" align="center">
                    </el-table-column>
                    <el-table-column
                        prop="regionName"
                        label="管理区"
                        width="110"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        width="100"
                            prop="filialeName"
                            label="所属分公司" align="center">
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--prop="city"-->
                    <!--label="城市" align="center">-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="saleAdminName"
                            label="销售专员" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="projectAdminName"
                            label="运营专员" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="createAdminName"
                            label="创建人" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="createTransportTime"
                            :formatter="dateFormat"
                            label="开跑日期" align="center" width="100">
                    </el-table-column>
                    <el-table-column
                            prop="transportItem"
                            width="100"
                            label="在跑任务数" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="contractNo"
                            width="180"
                            label="合同编号" align="center">
                        <template scope="scope" >
                            <el-tag slot="reference" :type="scope.row.endDate > Date.parse(new Date()) ? 'success' : 'warning'" close-transition>{{scope.row.contractNo}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="beginDate"
                            :formatter="dateFormat"
                            label="合同开始日期"
                            align="center"
                            width="110">
                    </el-table-column>
                    <el-table-column
                            prop="endDate"
                            :formatter="dateFormat"
                            label="合同结束日期"
                            width="110"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="contractState"
                            width="110"
                            label="合同是否归档" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="isInvoice"
                            width="100"
                            label="是否开发票" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="customerState"
                            label="项目状态" align="center">
                        <template scope="scope">
                            <el-tag :type="scope.row.customerState === '正常' ? 'success' : 'warning'" close-transition>{{scope.row.customerState}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            prop=""
                            label="操作" align="center"width="110">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small" :disabled="!change"
                                       v-if="tableData[scope.$index].checkState ==  'accepted' || tableData[scope.$index].checkState ==  'rejected'?true:false"
                            >变更</el-button>
                            <el-button type="text"
                                       size="small"
                                       v-if="customerFreeze"
                                       @click.native.prevent="deleteRow(scope.$index, $event, scope.row,dialogVisible = true)"
                            >解/冻结</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-dialog
                    title="（解冻/冻结）申请"
                    :visible.sync="dialogVisible"
            >
                <span slot="footer" class="dialog-footer">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                          <el-form-item label="项目名称" prop="name">
                            <el-input v-model="name" disabled>{{this.row}}</el-input>
                          </el-form-item>
                        <el-form-item label="申请原因" prop="desc">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                    </el-form>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
            </el-dialog>
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
    import {Export} from "../../js/export";
    import {openPostWindow} from '../../js/report.js'
    export default {
        data() {
            return {
                regionList:[],
                //遮罩层
                fullscreenLoading: false,
                code:'',
                //导出
                queryStatus:true,
                //进度条
                ProgressBar:0,
                //权限
                addCRM:'',
                change:'',
                name:'',
                accountStatus:'',
                userId:'',
                row:'',
                ruleForm: {
                    name: '',
                    desc:'',
                },
                Apply:'',
                //弹窗
                dialogVisible: false,
                arrObj:[],
                // this.
                arrs:[],
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
                    ContractNo:'',
                    region: '',
                    area:'',
                    state:''
                },
                rules: {
                    desc: [
                        { required: true, message: '请填写申请原因', trigger: 'blur' }
                    ]
                },
                customerManageExport:'',
                customerFreeze:false,
            }
        },
        created(){
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            // console.log(this.token)
            // this.data();
            //获取大区数据
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/region/all_region',JSON.stringify({
                'token':this.token,
            })).then(run=>{
                if(run.body.errcode == 0){
                    this.regionList = run.body.result;
                }
            });
            //判断权限
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.addCRM = jurisdictions[3].menus[2].choose;
            //变更权限
            this.change = jurisdictions[3].menus[4].choose;
            // if (jurisdictions[3].menus.length==11){
                this.customerManageExport = jurisdictions[3].menus[8].choose ;
            //    冻结
                this.customerFreeze = jurisdictions[3].menus[10].choose ;

            // } else {
            //     this.customerFreeze=false ;
            //     this.customerManageExport = jurisdictions[3].menus[8].choose
            //
            // }
            //所属区域下拉框（郭）
            let page = JSON.stringify({
                'token': this.token,
                "pid":0,
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByAreaId',page,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                if (res.body.errcode === 0) {
                    this.arrs = res.body.result.deptList;
                }
            });
            if(sessionStorage.getItem('client_managecurrentPage')!=null){
                let currentPages = Number(sessionStorage.getItem('client_managecurrentPage'));
                let totals = Number(sessionStorage.getItem('client_managetotal'));
                let condition = sessionStorage.getItem('client_managecondition');

                this.formInline = JSON.parse(condition);
                this.currentPage = currentPages;
                this.total = totals;
                // 新增接口
                this.requestTurnout()
            }else {
                this.data();
            }
        },
        methods:{
            //导出
            Export() {
                let page = JSON.stringify({
                    "token":this.token,
                    "id3":this.formInline.area,
                    "id2":this.formInline.CustomerID,
                    "conditionStr1":this.formInline.CustomerName,
                    "conditionStr3":this.formInline.ContractNo,
                    "id1":this.formInline.region,
                    "pageNum": this.currentPage,
                    "pageSize":this.pagesize,
                    "conditionStr2":this.formInline.state,
                });
                var exportLink = this.global.lightningUrl + '/companyv1/customerManage/report/export/customer_list';
                openPostWindow(exportLink,page)
            },
            // Export() {
            //     let page = JSON.stringify({
            //         "token":this.token,
            //         "exportName":"Customer",
            //         "co.id":this.formInline.CustomerID,
            //         "co.customer_name":this.formInline.CustomerName,
            //         "co.filiale_id":this.formInline.region,
            //         "con.id":this.formInline.ContractNo,
            //         "us.freeze_status":this.formInline.state,
            //         "rd.region_id":this.formInline.area,
            //     })
            //     Export(this,this.queryStatus,this.ProgressBar,this.fullscreenLoading,this.code,page);
            // },
            // 查看详情
            handleClicks(row){
                console.log(row);
                sessionStorage.setItem('scopes',JSON.stringify(row));
            },
            //申请确定
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.global.lightningUrl + '/companyv1/security/user/freeze',JSON.stringify({
                            "token":this.token,
                            "id":this.userId,
                            "freezeReason":this.ruleForm.desc,//申请原因
                            "freezeStatus":this.accountStatus,//冻结状态
                        })).then(run=>{
                            console.log(run);
                            if(run.body.errcode == 0){
                                this.$message({
                                    message:run.body.message,
                                    type: 'success'
                                });
                                setTimeout(()=>{
                                    this.dialogVisible = false;
                                    this.data();
                                },100);
                                this.ruleForm = {};
                            }else{
                                this.$message({
                                    message: run.body.message,
                                    type: 'warning'
                                });
                            }
                        });
                    } else {
                        this.ruleForm = {};
                        return false;
                    }
                });
            },
            deleteRow(index,row){
                console.log(this.tableData[index].id);
                this.userId = this.tableData[index].userId;
                this.row = this.tableData[index].name;
                row = this.row;
                this.name = this.row;
                if(this.tableData[index].customerState == '正常'){
                    this.accountStatus = 'FreezeAccount'
                }else if(this.tableData[index].customerState == '冻结' ){
                    this.accountStatus = 'normal'
                };
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            //列表的变更按钮
            handleClick(row) {
                console.log(row.userId);
                sessionStorage.setItem('managementid',JSON.stringify(row));
                this.$router.push({path:'/change_insert',query:{info:3}});
            },
            //查询
            query(){
                console.log(this.formInline.state);
                this.currentPage = 1;
                this.data();
                console.log(this.formInline.region);
                //更新本地存储
                if(sessionStorage.getItem('client_managecurrentPage')!=null&&sessionStorage.getItem('client_managecurrentPage')!=null){
                    //删除本地
                    sessionStorage.removeItem('client_managecurrentPage');
                    sessionStorage.removeItem('client_managecondition');
                    sessionStorage.removeItem('client_managetotal');
                    //存储本地
                    sessionStorage.setItem('client_managecurrentPage', JSON.stringify(this.currentPage));
                    sessionStorage.setItem('client_managetotal', JSON.stringify(this.total));
                    sessionStorage.setItem('client_managecondition', JSON.stringify(this.formInline));
                }else {
                    //存储本地
                    sessionStorage.setItem('client_managecurrentPage', JSON.stringify(this.currentPage));
                    sessionStorage.setItem('client_managetotal', JSON.stringify(this.total));
                    sessionStorage.setItem('client_managecondition', JSON.stringify(this.formInline));
                }
            },
            //预警判断
            tableRowClassName({row, rowIndex}){
                console.log(row, rowIndex);
                var timestamp = Date.parse(new Date());
                if (row.endDate < timestamp){
                    return 'warning-row' ;
                }
            },
            //页面首次刷新
            data() {
                let config = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                };
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/query/customerlist',JSON.stringify({
                    "token":this.token,
                    "id3":this.formInline.area,
                    "id2":this.formInline.CustomerID,
                    "conditionStr1":this.formInline.CustomerName,
                    "conditionStr3":this.formInline.ContractNo,
                    "id1":this.formInline.region,
                    "pageNum": this.currentPage,
                    "pageSize":this.pagesize,
                    "conditionStr2":this.formInline.state,
                }),config).then(run=>{
                    console.log(run);
                    this.arr = run;
                    if(run.body.errcode == 0){
                        if (run.body.result == null){
                            this.$message({
                                showClose: true,
                                message: '暂无数据',
                                type: 'warning'
                            });
                            return false
                        }
                        this.tableData = this.arr.body.result.rows;

                        for(var i in this.tableData){
                            if(this.tableData[i].contractState == '1'){
                                this.tableData[i].contractState = '已归档'
                            }else if(this.tableData[i].contractState == '0'){
                                this.tableData[i].contractState = '未归档'
                            };

                            if(this.tableData[i].invoiceState == '1'){
                                this.tableData[i].invoiceState = '是'
                            }else if(this.tableData[i].invoiceState == '0'){
                                this.tableData[i].invoiceState = '否'
                            };

                            if(this.tableData[i].customerState == 'normal'){
                                this.tableData[i].customerState = '正常'
                            }else if(this.tableData[i].customerState == 'FreezeAccount'){
                                this.tableData[i].customerState = '冻结'
                            };
                            if (this.tableData[i].createTransportTime == 0){
                                this.tableData[i].createTransportTime = null
                            }
                        }
                        this.total = this.arr.body.result.total;
                    }else {
                        this.tableData = [];
                    }
                })
                //更新本地存储
                if(sessionStorage.getItem('client_managecurrentPage')!=null&&sessionStorage.getItem('client_managecurrentPage')!=null){
                    //删除本地
                    sessionStorage.removeItem('client_managecurrentPage');
                    sessionStorage.removeItem('client_managecondition');
                    sessionStorage.removeItem('client_managetotal');
                    //存储本地
                    sessionStorage.setItem('client_managecurrentPage', JSON.stringify(this.currentPage));
                    sessionStorage.setItem('client_managetotal', JSON.stringify(this.total));
                    sessionStorage.setItem('client_managecondition', JSON.stringify(this.formInline));
                }else {
                    //存储本地
                    sessionStorage.setItem('client_managecurrentPage', JSON.stringify(this.currentPage));
                    sessionStorage.setItem('client_managetotal', JSON.stringify(this.total));
                    sessionStorage.setItem('client_managecondition', JSON.stringify(this.formInline));
                }
            },
            requestTurnout(){
                this.data();
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
            //新增
            insert() {
                setTimeout(()=>{
                    this.$router.push({path:'/insert'})
                },500)
            }
        }
    }
</script>

<style lang="scss" >

    .client_manage {
        font-size: 16px;
        padding: 30px;
        .el-table .warning-row {
            background: #DCDFE6;
            color: black;
        }
        .el-alert__icon.is-big{
            font-size: 25px;
        }
        .el-alert__title {
            font-size: 16px;
        }
        ul{
            li {
                margin: 10px 0;
                display: inline-block;
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


        .el-pagination {
            padding: 10px 505px;
        }
    }

</style>
