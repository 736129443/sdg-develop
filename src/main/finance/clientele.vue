<template>
    <div class="main">
        <div class="header">
            当前位置：财务管理 > 客户财务
        </div>
        <div class="dv">
            <el-form :inline="true" :model="forminline" class="demo-form-inline">
                <el-form-item label="客户编号">
                    <el-input v-model="forminline.customerId" placeholder="请输入客户编号" class="list_driver"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="forminline.customerName" placeholder="请输入客户姓名"></el-input>
                </el-form-item>
                <el-form-item label="所在分公司">
                    <el-select v-model="forminline.areaId" placeholder="请选择">
                        <!--<el-option v-for="i in link" :label='i.areaName' :value="i.allId" :key="i.allId"></el-option>-->
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in link" :label='i.filialeName' :value="i.filialeId" :key="i.filialeId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理区">
                    <el-select v-model="forminline.regionId" placeholder="请选择所管理区域">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in arr" :label='i.name' :value="i.id" :key="i.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="销售专员">
                    <el-input v-model="forminline.saleName" placeholder="请输入销售专员"></el-input>
                </el-form-item>
                 <el-form-item label="运营专员">
                     <el-input v-model="forminline.projectName" placeholder="请输入运营专员" class="list_driver"></el-input>
                </el-form-item>
                <el-form-item label="账户状态">
                    <el-select v-model="forminline.freezeAccount" placeholder="请选择" >
                        <el-option label="全部" value=""></el-option>
                        <el-option label="正常" value="normal" ></el-option>
                        <el-option label="冻结" value="freezeAccount"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="CRMFinanceExport">导出</el-button>
                    <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                    <!--<el-button  @click="onSubmit0" type="primary" v-if="limit==1 || limit==2?true:false">调账记录</el-button>-->
                    <!--<el-button  @click="onSubmit0" type="primary">调账记录</el-button>-->
                    <!--<el-button  @click="onSubmit0" type="primary">审批记录</el-button>-->
                </el-form-item>
            </el-form>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="customerId"
                    label="客户编号"
                    align="center"
                    >
                <!--<template slot-scope="scope">-->
                    <!--<div  @click="examine(scope.$index)">-->
                        <!--<router-link to="" style="color:#409EFF;">{{ tableData[scope.$index].customerId }} </router-link>-->
                    <!--</div>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column
                    prop="regionName"
                    label="管理区"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="filialeName"
                    label="所在分公司"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="customerName"
                    label="项目名称"
                    align="center"
                   >
            </el-table-column>
            <el-table-column
                    prop="type"
                    align="center"
                    label="客户类型"
                    >
            </el-table-column>
            <el-table-column
                    prop="saleName"
                    align="center"
                    label="销售专员"
                    >
            </el-table-column>
            <el-table-column
                    prop="projectName"
                    label="运营专员"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="arrearsAmount"
                    label="客户总欠款金额"
                    align="center"
            >
            </el-table-column>


            <!--<el-table-column-->
                    <!--prop=""-->
                    <!--label="是否开票"-->
                    <!--align="center"-->
            <!--&gt;-->
            <!--</el-table-column>-->


            <el-table-column
                    prop="lastDate"
                    label="最后出车日期"
                    :formatter="dateFormat"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="freezeAccount"
                    label="账户状态"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="judgeInvoice"
                    label="是否开发票"
                    align="center"
            >
            </el-table-column>

            <el-table-column
                    prop="detail"
                    label="费用明细"
                    align="center"
            >
                <template slot-scope="scope">
                    <!--<el-button  type="text" size="small" v-show="limit === 0?true:false" @click="examine(scope.$index)">查看</el-button>-->
                    <!--<el-button  type="text" size="small" v-show="limit === 1||limit === 2?true:false" style="padding: 0" @click="tz(scope.$index)">调账</el-button>-->
                    <el-button  type="text" size="small"  @click="examine(scope.$index)" v-if="CRMDetail">查看</el-button>
                    <!--<el-button  type="text" size="small"  style="padding: 0" @click="tz(scope.$index)" v-if="CRMOutOfAccount">出账</el-button>-->
                    <!--<el-button  type="text" size="small"  style="padding: 0" @click="kp(scope.$index)" v-if="tableData[scope.$index].judgeInvoice=='是'">开票</el-button>-->
                </template>
            </el-table-column>
            <el-table-column
                    prop="detail"
                    label="操作"
                    align="center"
            >
                <template slot-scope="scope">
                    <!--<el-button  type="text" size="small" v-show="limit === 0?true:false" @click="examine(scope.$index)">查看</el-button>-->
                    <!--<el-button  type="text" size="small" v-show="limit === 1||limit === 2?true:false" style="padding: 0" @click="tz(scope.$index)">调账</el-button>-->
                    <!--<el-button  type="text" size="small"  @click="examine(scope.$index)" v-if="CRMDetail">查看</el-button>-->
                    <el-button  type="text" size="small"  style="padding: 0" @click="tz(scope.$index)" v-if="CRMOutOfAccount" >申请出账</el-button>

                    <el-button  type="text" size="small"  style="padding: 0" @click="hk(scope.$index)" v-if="CRMReturnApply" :disabled="index_disabled[scope.$index]">回款通知</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="pagesize"
                layout="total,prev, pager, next,sizes"
                :total="total">
        </el-pagination>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                >
            <el-form ref="form" :model="ruleForm" label-width="80px">
            <el-form-item label="冻结">
                <el-radio v-model="ruleForm.resource" label="资金">冻结资金</el-radio>
                <el-radio v-model="ruleForm.resource" label="账号">冻结账号</el-radio>
            </el-form-item>
            <el-form-item label="冻结时间">
            <el-select v-model="ruleForm.region" placeholder="请选择">
                <el-option label="一个月" value='0'></el-option>
                <el-option label="二个月" value='1'></el-option>
                <el-option label="三个月" value='2'></el-option>
                <el-option label="永久" value='-1'></el-option>
            </el-select>
            </el-form-item >
                <el-form-item label="冻结原因" >
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    const sha256 = require("js-sha256").sha256;
    import moment from 'moment'
    import {F_jurisdiction,AIfirstClass0,secondLevel} from '../../js/Fjurisdiction.js'
    import {openPostWindow} from '../../js/report.js'

    export default {
    data() {
        return {
            index_disabled:[],
            token:'',
            arr:'',
            total:0,
            //数据
            tableData:[],
            currentPage:1,
            pagesize:10,//每页的数据条数
            forminline:{
                customerId:'',
                customerName:'',
                saleName:'',
                areaId:'',
                freezeAccount:'',
                projectName:'',
            },
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            // formLabelWidth: '120px',
            ruleForm:{
                resource:'',
                region:'',
                desc:'',
            },
            dialogVisible: false,
            limit:'',
            link:[],
            freeze:{
                driverId:'',
            },
            CRMDetail:false,
            CRMOutOfAccount:false,
            arr:[],
            //导出
            queryStatus:true,
            fullscreenLoading: false,
            trackManageListExport:false,
//进度条
            ProgressBar:0,
            CRMFinanceExport:false,
            invoiceApply:'',
            CRMReturnApply:'',
        }
    },
    created(){
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        this.data();
        let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.CRMFinanceExport = jurisdictions[7].menus[10].choose;
            this.CRMDetail = jurisdictions[7].menus[11].choose;
            this.CRMOutOfAccount = jurisdictions[7].menus[12].choose;
        this.invoiceApply = F_jurisdiction('invoiceApply',jurisdictions)
        this.CRMReturnApply = F_jurisdiction('CRMReturnApply',jurisdictions)

        this.$http.post( this.global.lightningUrl + '/companyv1/userManage/region/all_region',JSON.stringify({
            'token':this.token,
        })).then(run=>{
            this.arr = run.body.result
        })
        if(sessionStorage.getItem('clicentelecondition')!=null){
            let currentPages = Number(sessionStorage.getItem('clicentelecurrentPage'));
            let condition = sessionStorage.getItem('clicentelecondition');
            let totals = Number(sessionStorage.getItem('clicenteletotal'));
            console.log(currentPages);
            console.log(totals);
            console.log(condition);
            this.forminline = JSON.parse(condition)
            this.currentPage = currentPages;
            this.total = totals;
            //查询接口
            this.data()
        }else {
            this.data();
        }
    },
    methods:{
        Export(){
            let page = JSON.stringify({
                token: this.token ,
                pageNum : this.currentPage ,
                pageSize : this.pagesize ,
                customerId : this.forminline.customerId,//管理区
                filialeId : this.forminline.areaId,//
                customerName : this.forminline.customerName,
                saleName : this.forminline.saleName,
                projectName : this.forminline.projectName,
                freezeAccount : this.forminline.freezeAccount,
                regionId : this.forminline.regionId
            });
            var exportLink = this.global.lightningUrl + '/companyv1/finance/report/export/customer_info';
            openPostWindow(exportLink,page)
        },
        // 请求
        ajax(){
            let page = JSON.stringify({
                token: this.token ,
                pageNum : this.currentPage ,
                pageSize : this.pagesize ,
                customerId : this.forminline.customerId,//管理区
                filialeId : this.forminline.areaId,//
                customerName : this.forminline.customerName,
                saleName : this.forminline.saleName,
                projectName : this.forminline.projectName,
                freezeAccount : this.forminline.freezeAccount,
                regionId : this.forminline.regionId
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_info' , page ,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                if (res.body.errcode == 0){
                    this.total = res.body.result.total ;
                    this.tableData = res.body.result.rows;
                    for (let i = 0 ; i < this.tableData.length;i++) {
                        if (this.tableData[i].freezeAccount == 'normal') {
                            this.tableData[i].freezeAccount = '正常'
                        }else if ( this.tableData[i].freezeAccount == 'FreezeAccount' ) {
                            this.tableData[i].freezeAccount = '冻结'
                        }
                        if (this.tableData[i].type == 'ProjectCustomer') {
                            this.tableData[i].type = '标准项目'
                        }else if (this.tableData[i].type == 'InterimCustomer') {
                            this.tableData[i].type = '临时项目'
                        }else if (this.tableData[i].type == 'BackToBackCustomer') {
                            this.tableData[i].type = '背靠背项目'
                        }

                        if (this.tableData[i].judgeInvoice == 'no'){
                            this.tableData[i].judgeInvoice = '否'
                        }else if (this.tableData[i].judgeInvoice == 'yes'){
                            this.tableData[i].judgeInvoice = '是'
                        }
                        this.index_disabled.push(true)
                        // console.log(this.tableData[i].arrearsAmount);
                        if (this.tableData[i].arrearsAmount <= 0){
                            this.index_disabled[i]=true
                        }else{
                            this.index_disabled[i]=false
                        }
                    }
                    // sessionStorage.setItem('clicenteletotal',this.total)
                    // sessionStorage.setItem('clicenteletableData',this.tableData)
                    // sessionStorage.setItem('clicenteletableData',this.tableData)

                    //    缓存
                    //更新本地存储
                    if(sessionStorage.getItem('clicentelecurrentPage')!=null&&sessionStorage.getItem('clicentelecurrentPage')!=null){
                        //删除本地
                        sessionStorage.removeItem('clicentelecurrentPage');
                        sessionStorage.removeItem('clicentelecondition');
                        sessionStorage.removeItem('clicenteletotal');
                        //存储本地
                        sessionStorage.setItem('clicentelecurrentPage', JSON.stringify(this.currentPage));
                        sessionStorage.setItem('clicenteletotal', JSON.stringify(this.total));
                        sessionStorage.setItem('clicentelecondition', JSON.stringify(this.forminline));
                    }else {
                        //存储本地
                        sessionStorage.setItem('clicentelecurrentPage', JSON.stringify(this.currentPage));
                        sessionStorage.setItem('clicenteletotal', JSON.stringify(this.total));
                        sessionStorage.setItem('clicentelecondition', JSON.stringify(this.forminline));
                    }

                  } else{
                    this.total = 0 ;
                    this.tableData = []
                }

            });
        },
        data() {
            this.ajax()
            let page1 = JSON.stringify({
               token: this.token
            });
            this.$http.post( this.global.lightningUrl + '/companyv1/finance/query/admin_management/area',page1 , {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            } ).then((res)=>{
                console.log(res);
                this.link = res.body.result;
            })
        },
        dateFormat:function(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.ajax()
        },
        handleSizeChange(val){
            this.pagesize = val;
            this.ajax()
        },
        onSubmit(){
            this.currentPage = 1 ;
            this.ajax()
        },
        onfreeze(_index){
            this.freeze.driverId = this.tableData[_index].customerId;
            this.dialogVisible = true;
        },
        save(){
            this.dialogVisible=false;
            let page = JSON.stringify({
                token : this.token,
                driverId : this.freeze.driverId,
                status :this.ruleForm.resource,
                monthNum : this.ruleForm.region,
                reason : this.ruleForm.desc,
            });
            this.$http.post(this.global.lightningUrl + '/company/finance/frozen',page,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            } ).then((res)=>{
                setTimeout(function(){
                    location.reload()
                },1000)
            })
        },
        cancel(){
            this.dialogVisible=false;
            this.ruleForm.resource='';
            this.ruleForm.region='';
            this.ruleForm.desc='';
        },
        examine(_index){
            sessionStorage.setItem('clientellimit',JSON.stringify( this.limit));
            let clientelid = this.tableData[_index];
            clientelid.number = 1 ;
            console.log(clientelid);
            sessionStorage.setItem('clientelid',JSON.stringify({clientelid}));
            this.$router.push({path:'/kh_reconciliation'});

        },
        tz(_index){
            let clientelid=this.tableData[_index];
            clientelid.number = 0 ;
            sessionStorage.setItem('clientellimit',JSON.stringify( this.limit));
            sessionStorage.setItem('clientelid',JSON.stringify({clientelid} ));
            this.$router.push({path:'/kh_reconciliation'});

        },

        hk(_index){
            // console.log(this.tableData[_index].customerId);
            let clientelid = this.tableData[_index];
            sessionStorage.setItem('clientelid',JSON.stringify({clientelid}));
            this.$router.push({name:'returnedmoneyinform',query:{id:Base64.encode(this.tableData[_index].customerId)}})
        }
    }
}
</script>
<style lang="scss" scoped >
.main{
    padding:30px;
    .el-input{
        width: 158px;
    }
    .dv {
        margin-top: 20px;

    }
    .el-pagination {
        padding-top: 20px ;
        text-align: center;
    }
    .required:before{
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
        vertical-align:top;
    }
    .db_d{
        display:inline-block;
        width: 70px;
        padding-bottom: 20px;
        text-align: left;
        vertical-align:top;
    }
    .el-form{
        text-align: left;
    }
    .el-button+.el-button{
        margin: 0;
    }
}
</style>
