<template>
    <div class="main">
        <div class="header">当前位置：CRM管理>官网意向客户</div>
        <div class="center" >
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="企业名称">
                    <el-input v-model="formInline.companyName" placeholder="请输入企业名称"></el-input>
                </el-form-item>
                <el-form-item label="登记时间">
                    <el-date-picker
                            v-model="formInline.createTime"
                            type="daterange"
                            value-format="timestamp"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="来源">
                    <el-select v-model="formInline.way" placeholder="请输入选择来源" clearable>
                        <el-option label="全部" value=""></el-option>
                        <el-option label="移动端" value="mobile"></el-option>
                        <el-option label="PC端" value="pc"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="primary" @click="exports()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="intentionCustomerListExport">导出</el-button>
                    <el-progress type="circle" :percentage="progressBar"  v-if="queryStatus" style="position:absolute;top:45%;left:45%;z-index:999999;"></el-progress>
                </el-form-item>
            </el-form>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="id"
                        label="ID"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="companyName"
                        label="企业名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        align="center"
                        label="联系人">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        align="center"
                        label="联系电话">
                </el-table-column>
                <el-table-column
                        prop="email"
                        align="center"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        prop="needs"
                        align="center"
                        label="合作需求">
                </el-table-column>
                <el-table-column
                        prop="way"
                        align="center"
                        :formatter="types"
                        label="来源">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        align="center"
                        label="登记时间"
                        :formatter="dateFormatHm"
                >
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                size="mini"
                                plain
                                @click="detail(scope.row,scope.$index)">详情</el-button>
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
            <el-dialog class="officialDialog" title="客户录入详情" width="50%" center :visible.sync="dialogTableVisible">
                <div >公司名称：<span  v-text="listDetail.companyName===undefined?'暂无数据':listDetail.companyName"></span></div>
                <div>联系人：<span  v-text="listDetail.userName===undefined?'暂无数据':listDetail.userName"></span></div>
                <div>联系电话：<span  v-text="listDetail.phone===undefined?'暂无数据':listDetail.phone"></span></div>
                <div>联系邮箱：<span  v-text="listDetail.email===undefined?'暂无数据':listDetail.email"></span></div>
                <div>创建时间：<span  v-text="listDetail.createTime===undefined?'暂无数据':$options.filters.val(listDetail.createTime)"></span></div>
                <div>设备来源：<span  v-text="listDetail.way===undefined?'暂无数据':$options.filters.type(listDetail.way)"></span></div>
                <div class="line">合作需求：<span  v-text="listDetail.needs===undefined?'暂无数据':listDetail.needs"></span></div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        data (){
            return{
                all:'',
                token:'',
                dialogTableVisible: false,
                formInline:{},
                listDetail:{},
                tableData: [],
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
                regions:[],
                //    创建权限
                createCustomerService:'',
                accidentDetail:'',
                entryInvestigationAndCompensateInfo:'',
                ministryOfFinanceMajordomoAuditing:'',
                fullscreenLoading: false,
                code:'',
                //导出
                queryStatus:false,
                //进度条
                progressBar:0,
                //导出权限
                intentionCustomerListExport:false,
            }
        },
        methods:{
            types(row,index){
                return row.way==='pc'?'PC端':'移动端';
            },
            search(){
                this.currentPage = 1;
                this.getUserlist();
            },
            exports(){
                this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
                    "token":this.token,
                    "exportName": "companyNeed",
                    "c.company_name":this.formInline.companyName===undefined?"":this.formInline.companyName,
                    "c.way": this.formInline.way===undefined?"":this.formInline.way ,
                    "c.create_time":this.formInline.createTime===undefined||this.formInline.createTime===null?"":`between ${this.formInline.createTime[0]} and ${this.formInline.createTime[1]+86400000-1}`
                })).then(res=>{
                    console.log(res);
                    if(res.body.errcode == 0){
                        this.fullscreenLoading = true;
                        this.queryStatus = true;
                        this.code = res.body.result;
                        this.interval = setInterval(() => {
                            this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportProcess',JSON.stringify({
                                "token":this.token,
                                "id":this.code,
                            })).then(res=>{
                                console.log(res);
                                if(res.body.errcode == 0){
                                    this.progressBar  =   parseInt(res.body.result.exportProcess) ;
                                    if (this.progressBar == 100){
                                        clearInterval(this.interval);
                                        setTimeout(()=> {
                                            window.location.href = res.body.result.externalRoad;
                                            this.$message({
                                                message: '导出成功',
                                                type: 'success'
                                            });
                                            this.fullscreenLoading = false;
                                            this.queryStatus = false;
                                            this.progressBar=0;
                                        },1000)
                                    }
                                }
                            })
                        },1000);
                    }else {
                        this.$message({
                            showClose: true,
                            message: res.body.message,
                            type: 'error'
                        });
                    }
                })
            },
            dateFormatHm:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm    ");
            },
            getUserlist(){
                let parameter = JSON.stringify({
                    pageSize:this.pagesize,
                    pageNum:this.currentPage,
                    companyName:this.formInline.companyName===undefined?"":this.formInline.companyName, //--企业名称（支持模糊查询）
                    createTimeStart:this.formInline.createTime===undefined||this.formInline.createTime===null?"":this.formInline.createTime[0], //登记时间-起始时间
                    createTimeEnd:this.formInline.createTime===undefined||this.formInline.createTime===null?"":this.formInline.createTime[1]+86400000-1,  // 登记时间-结束时间
                    way:this.formInline.way===undefined?"":this.formInline.way //来源--下拉框显示(移动端/PC端) 传参(mobile/pc)
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/company/get-list',parameter , {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                } ).then((res)=>{
                    console.log(res.body.result.list);
                    this.tableData = res.body.result.list;
                    this.total = res.body.result.total;
                });
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.getUserlist();
            },
            handleSizeChange(val){
                this.pagesize = val ;
                this.getUserlist();
            },
            detail(row,index){
                let parameter = JSON.stringify({
                    id:row.id
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/company/get-one',parameter , {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                } ).then((res)=>{
                    this.listDetail=res.body.result;
                    this.dialogTableVisible = true;
                });
            },
        },
        mounted(){
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse( sessionStorage.getItem('jurisdictions'));

            if (jurisdictions[3].menus[12].choose!==undefined){
                this.intentionCustomerListExport = jurisdictions[3].menus[12].choose;
            } else {
                this.intentionCustomerListExport = false
            }
            this.getUserlist();
        },
    filters: {
        val: (value)=>{
            let date = new Date(value);
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h=h < 10 ? ('0' + h) : h;
            let minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            let second=date.getSeconds();
            second=second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        },
        type:(type)=>{
            return type==='pc'?'PC端':'移动端';
        }
    }
    }
</script>
<style lang="scss" >
    .header{
        margin-bottom: 20px;
    }
    .el-table__row td .cell{
        line-height:25px!important;
        overflow: hidden!important;
        text-overflow:ellipsis!important;
        white-space: nowrap;
    }
    .officialDialog{
        .el-dialog__header{
            border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .el-dialog__body {
            color: rgba(0,0,0,0.6);
            font-size: 15px;
            letter-spacing: 1px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            line-height:40px;
            div{
                word-break:break-all;
                width: 50%;
                font-weight: bold;
                text-align: justify;
                padding: 0 5px;
                box-sizing: border-box;
                span{
                    font-weight: normal;
                }
            }
            .line{
                word-break:break-all;
                width: 100%;
            }
        }
    }


</style>


