<template>
    <div class="financtReport main">
        <div class="header">
            当前位置: <span>项目管理 > 项目财务 > 项目报表</span>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="管理区">
                <el-select v-model="formInline.regionId" placeholder="请选择所管理区域">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in arr" :label='i.name' :value="i.id" :key="i.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="所属分公司">
                <el-select v-model="formInline.filialeId" placeholder="请选择所管理区域">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in link" :label='i.filialeName' :value="i.filialeId" :key="i.filialeId"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="项目名称">
                <el-input v-model.trim="formInline.customerName"  placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="项目状态">
                <el-select v-model="formInline.freezeStatus" placeholder="请选择项目状态">
                    <el-option label="正常" value="normal"></el-option>
                    <el-option label="冻结" value="FreezeAccount"></el-option>
                    <el-option label="全部" value=""></el-option>

                </el-select>
            </el-form-item>
            <el-form-item label="销售专员">
                <el-input v-model="formInline.saleName" placeholder="请输入销售专员"></el-input>
            </el-form-item>
            <el-form-item label="运营专员">
                <el-input v-model="formInline.projectName" placeholder="请输入运营专员" class="list_driver"></el-input>
            </el-form-item>
            <el-form-item label="配送日期">
                <el-date-picker
                        v-model="formInline.time"
                        type="daterange"
                        range-separator="至"
                        value-format="timestamp"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="任务状态">
                <el-select v-model="formInline.task" placeholder="请选择项目状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="有任务" value="yes"></el-option>
                    <el-option label="无任务" value="no"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="financtReport" v-if="projectReportExport">导出财务报表</el-button>
            </el-form-item>
        </el-form>
            <el-button type="primary" @click="onisdata" style="font-size: 16px;margin-bottom: 8px;">查看GMV统计结果</el-button>

        <div v-if="isresult" style="display: inline" >
            <span style="color:#606266">GMV : </span> <span  style="color: blue; cursor:pointer">{{GMVTotal}}</span>&nbsp;&nbsp;
            <span style="color:#606266">总成本 : </span><span style="color: blue; cursor:pointer">{{totalCost}}</span>&nbsp;&nbsp;
            <span style="color:#606266">毛利额 : </span><span style="color: blue; cursor:pointer">{{totalGrossProfit}}</span>&nbsp;&nbsp;
            <span style="color:#606266">毛利率 : </span><span style="color: blue; cursor:pointer">{{totalGrossProfitMargin}}</span>&nbsp;&nbsp;
            <span style="color:#606266">总出车数量 : </span><span style="color: blue; cursor:pointer">{{totalTrackCount}}</span>&nbsp;&nbsp;
            <br>
        </div>
        <div class="hint">说明：默认展示昨日数据</div>


        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="regionName" label="管理区" align="center"> </el-table-column>
            <el-table-column prop="filialeName" label="所属分公司" align="center"> </el-table-column>
            <el-table-column prop="customerName" label="项目名称" align="center"> </el-table-column>
            <el-table-column prop="type" label="项目类型" align="center"> </el-table-column>
            <el-table-column prop="trackCount" label="出车次数" align="center"> </el-table-column>
            <el-table-column prop="billCycle" label="客户账期（天）" align="center"> </el-table-column>
            <el-table-column prop="driverBillCycle" label="司机账期（天）" align="center"> </el-table-column>
            <el-table-column prop="freezeStatus" label="项目状态" align="center"> </el-table-column>
            <el-table-column prop="saleName" label="销售专员" align="center"> </el-table-column>
            <el-table-column prop="projectName" label="运营专员" align="center"> </el-table-column>
            <el-table-column prop="taxRate" label="开票税率" align="center"> </el-table-column>
            <el-table-column prop="gmv" label="GMV" align="center"> </el-table-column>
            <el-table-column prop="driverCount" label="司机数量" align="center"> </el-table-column>
            <el-table-column prop="operationCount" label="运营天数" align="center"> </el-table-column>
            <el-table-column prop="totalCost" label="总成本" align="center"> </el-table-column>
            <el-table-column prop="grossProfit" label="毛利额" align="center"> </el-table-column>
            <el-table-column prop="grossProfitMargin" label="毛利率" align="center"> </el-table-column>
            <el-table-column prop="date" label="操作" align="center" v-if="operationjurisdiction">
                <template  slot-scope="scope">
                    <el-button type="text"  v-if="checkReport" @click="Report(scope.$index)">查看报表</el-button><br>
                    <el-button type="text" v-if="otherCosts" @click="OtherCost(scope.$index,scope.row)" style="margin-left:0">其它成本</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="pageSize"
                layout="total,prev, pager, next,sizes"
                :total="total">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        name: "financtReport",
        created(){
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            // if (jurisdictions[6].menus.length == 37){
                //    29 导出  projectReportExport
                this.projectReportExport = jurisdictions[6].menus[29].choose;
                this.checkReport = jurisdictions[6].menus[30].choose;
                this.otherCosts = jurisdictions[6].menus[33].choose;
                if ( this.checkReport|| this.otherCosts) {
                    this.operationjurisdiction = true
                }else if ( !this.checkReport&& !this.otherCosts) {
                    this.operationjurisdiction = false

                }


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
                this.arr = run.body.result
            })
            if(sessionStorage.getItem('financtReportCurrentPage')!=null){
                let currentPages = Number(sessionStorage.getItem('financtReportCurrentPage'));
                let totals = Number(sessionStorage.getItem('financtReporttotal'));
                let condition = sessionStorage.getItem('financtReportcondition');
                this.formInline = JSON.parse(condition)
                this.currentPage = currentPages;
                this.total = totals;
                //查询接口
                this.ajax()
            }else {
                this.ajax()
            }

        },
        data(){
            return {
                formInline:{
                    freezeStatus:'normal'
                },
                arr:[],
                link:[],
                token:'',
                currentPage: 1,
                pageSize:10,
                total:0,
                tableData:[
                ],
                projectReportExport:false,
                checkReport:false,
                otherCosts:false,
                operationjurisdiction : false,
                totalGrossProfitMargin:0,
                totalGrossProfit:0,
                GMVTotal:0,
                totalCost:0,
                numcar:0,
                isresult:false,
                totalTrackCount:'',
            }
        },
        methods:{
            financtReport(){
                // /company/finance/report/export/project_list
                let page = JSON.stringify({
                    token:this.token,
                    pageSize:this.pageSize,
                    pageNum:this.currentPage,
                    userId:this.formInline.userId,
                    customerName:this.formInline.customerName,
                    filialeId:this.formInline.filialeId,
                    regionId:this.formInline.regionId,
                    freezeStatus:this.formInline.freezeStatus,
                    saleName:this.formInline.saleName,
                    projectName:this.formInline.projectName,
                    startTime:this.formInline.time!=null?this.formInline.time[0]:'',
                    endTime:this.formInline.time!=null?this.formInline.time[1]+1000*60*60*24-1:'',
                    task:this.formInline.task,
                })
                console.log(page);
                var exportLink = this.global.lightningUrl + '/companyv1/finance/report/export/project_list';
                this.openPostWindow(exportLink,page);
            },
            openPostWindow(url, page) {
                var newWin = window.open('toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no'),
                    formStr = '';
                //设置样式为隐藏，打开新标签再跳转页面前，如果有可现实的表单选项，用户会看到表单内容数据
                formStr = '<form style="visibility:hidden;" method="POST" accept-charset="UTF-8" onsubmit="document.charset=\'UTF-8\';" action="' + url + '">' +
                    '<input type="text" name="param" value=' + page + ' :about="" />' +
                    '</form>';
                console.log(url);
                newWin.document.body.innerHTML = formStr;
                newWin.document.forms[0].submit();
                return newWin;
            },
            ajax(){
                let page = JSON.stringify({
                    token:this.token,
                    pageSize:this.pageSize,
                    pageNum:this.currentPage,
                    userId:this.formInline.userId,
                    customerName:this.formInline.customerName,
                    filialeId:this.formInline.filialeId,
                    regionId:this.formInline.regionId,
                    freezeStatus:this.formInline.freezeStatus,
                    saleName:this.formInline.saleName,
                    projectName:this.formInline.projectName,
                    startTime:this.formInline.time!=null?this.formInline.time[0]:'',
                    endTime:this.formInline.time!=null?this.formInline.time[1]+1000*60*60*24-1:'',
                    task:this.formInline.task,
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/finance/query/admin_management/project_list',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.body.errcode == 0){
                        this.tableData = res.body.result.rows ;
                        this.total = res.body.result.total ;
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].type == 'ProjectCustomer') {
                                this.tableData[i].type = '标准项目'
                            }else if (this.tableData[i].type == 'InterimCustomer') {
                                this.tableData[i].type = '临时项目'
                            }else if (this.tableData[i].type == 'BackToBackCustomer') {
                                this.tableData[i].type = '背靠背项目'
                            }
                            if (this.tableData[i].freezeStatus == 'normal') {
                                this.tableData[i].freezeStatus = '正常'
                            }else{
                                this.tableData[i].freezeStatus = '冻结'
                            }
                            //更新本地存储
                            if(sessionStorage.getItem('financtReportCurrentPage')!=null){
                                //删除本地
                                sessionStorage.removeItem('financtReportCurrentPage');
                                sessionStorage.removeItem('financtReportcondition');
                                sessionStorage.removeItem('financtReporttotal');
                                //存储本地
                                sessionStorage.setItem('financtReportCurrentPage', JSON.stringify(this.currentPage));
                                sessionStorage.setItem('financtReporttotal', JSON.stringify(this.total));
                                sessionStorage.setItem('financtReportcondition', JSON.stringify(this.formInline));
                            }else {
                                //存储本地
                                sessionStorage.setItem('financtReportCurrentPage', JSON.stringify(this.currentPage));
                                sessionStorage.setItem('financtReporttotal', JSON.stringify(this.total));
                                sessionStorage.setItem('financtReportcondition', JSON.stringify(this.formInline));
                            }
                        }
                    }

                })
            },
            onSubmit(){
                this.currentPage= 1;
                this.isresult = false;
                this.ajax();
            },
            Report(_index){
                sessionStorage.setItem('financtReport', JSON.stringify(this.tableData[_index]));
                this.$router.push({name:'mapReport',query:{userId:Base64.encode(this.tableData[_index].userId)}})
            },
            OtherCost(index,row){
                console.log(row.userId);
                this.$router.push({name:'otherCostlist',query:{info:row.userId}});

            },
            handleSizeChange(val) {
                this.pageSize = val ;
                this.ajax();
            },
            handleCurrentChange(val) {
                this.currentPage = val ;
                this.ajax();
            },
            onisdata(){
                let page = JSON.stringify({
                    token:this.token,
                    userId:this.formInline.userId,
                    customerName:this.formInline.customerName,
                    filialeId:this.formInline.filialeId,
                    regionId:this.formInline.regionId,
                    freezeStatus:this.formInline.freezeStatus,
                    saleName:this.formInline.saleName,
                    projectName:this.formInline.projectName,
                    startTime:this.formInline.time!=null?this.formInline.time[0]:'',
                    endTime:this.formInline.time!=null?this.formInline.time[1]+1000*60*60*24-1:''
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/finance/query/admin_management/caculate_data',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.body.errcode == 0){
                        this.isresult = true;
                        this.totalGrossProfitMargin =res.body.result.totalGrossProfitMargin;
                        this.totalGrossProfit=res.body.result.totalGrossProfit;
                        this.GMVTotal=res.body.result.GMVTotal;
                        this.totalCost =res.body.result.totalCost;
                        this.totalTrackCount = res.body.result.totalTrackCount
                    }

                })
            },
        }
    }
</script>

<style scoped lang="scss">
.financtReport{
    .header{
        padding-bottom: 20px ;

    }
    .hint{
        color: red;
        font-size: 14px;
        margin-bottom: 10px;
    }
}
</style>