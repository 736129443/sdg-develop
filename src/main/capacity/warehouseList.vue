<template>
    <div class="main" >
        <div class="header">
            当前位置 ：<span>项目管理 > 仓库管理</span>
        </div>
        <div class="dv">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="所在分公司">
                    <el-select  v-model="formInline.manageAreaId" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in link" :label='i.filialeName' :value="i.filialeId" :key="i.filialeId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="仓库联系人电话">
                    <el-input v-model.trim="formInline.firstTel" placeholder="仓库联系人电话"></el-input>
                </el-form-item>
                <el-form-item label="仓库编号">
                    <el-input v-model.trim="formInline.Id" placeholder="仓库编号"></el-input>
                </el-form-item>
                <el-form-item label="仓库名称">
                    <el-input v-model.trim="formInline.depotName" placeholder="仓库名称"></el-input>
                </el-form-item>
                <el-form-item label="所属客户">
                    <el-input v-model.trim="formInline.cutomerName" placeholder="所属客户"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">查询</el-button>
                    <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="depotListExport==true?true:false">导出</el-button>
                    <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                </el-form-item>
            </el-form>
            <el-table
                    style="width: 100%"
                    :data="tableData">

                <el-table-column
                        align="center"
                        prop="id"
                        label="仓库编号"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="manageArea"
                        label="分公司"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="depotName"
                        label="仓库名称"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="customerName"
                        label="所属客户">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="address"
                        width="500px"
                        label="仓库地址">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="firstContact"
                        label="仓库联系人">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="firstTel"
                        label="仓库联系人电话">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="createTime"
                        :formatter="dateFormat"
                        label="创建时间">
                </el-table-column>
            </el-table>
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
                //遮罩层
                fullscreenLoading: false,
                code:'',
                //导出
                queryStatus:true,
                //进度条
                ProgressBar:0,
                token:'',
                arr:[],
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
                formInline : {
                    Id: '',
                    depotName:'',
                    cutomerName:'',
                    firstTel:''//仓库联系人电话
                },
                tableData: [],
                depotListExport:'',
                link:[],
            }
        },
        created() {
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            // if (jurisdictions[3].menus.length==28){
                this.depotListExport = jurisdictions[6].menus[6].choose
            // } else {
            //     this.depotListExport = false
            // }
            let page = JSON.stringify({
                token: this.token
            });
            this.$http.post( this.global.lightningUrl + '/companyv1/finance/query/admin_management/area',page , {

                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            } ).then((res)=>{
                console.log(res);
                this.link = res.body.result;
            });

            this.data();
        },
        methods:{
            //导出
            Export(){
                this.$message({
                    showClose: true,
                    message: '正在导出请耐心等待！',
                    type: 'warning'
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
                    "token":this.token,
                    "exportName":"Depot",
                    "dt.depot_name":this.formInline.depotName,
                    "dt.id":this.formInline.Id,
                    "dt.customer_name":this.formInline.cutomerName,
                    "dt.is_delete":"0",
                    "cu.filiale_id":this.formInline.manageAreaId,
                })).then(run=>{
                    console.log(run);
                    if(run.body.errcode == 0){
                        this.fullscreenLoading = true;
                        this.queryStatus = false;
                        this.ProgressBar = 0;
                        this.code = run.body.result;
                        this.interval = setInterval(() => {
                            this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportProcess',JSON.stringify({
                                "token":this.token,
                                "id":this.code,
                            })).then(run=>{
                                console.log(run);
                                if(run.body.errcode == 0){
                                    this.ProgressBar  =   parseInt(run.body.result.exportProcess) ;
                                    if (this.ProgressBar == 100){
                                        clearInterval(this.interval);
                                        setTimeout(()=> {
                                            window.location.href = run.body.result.externalRoad;
                                            this.$message({
                                                message: '导出成功',
                                                type: 'success'
                                            });
                                            this.fullscreenLoading = false;
                                            this.queryStatus = true;
                                        },1200)
                                    }
                                }
                            })
                        },1000);
                    }else {
                        this.$message({
                            showClose: true,
                            message: run.body.message,
                            type: 'error'
                        });
                    }
                })
            },
            data() {
                let page = JSON.stringify({
                    pageNum:this.currentPage ,
                    pageSize:this.pagesize,
                    token:this.token ,
                    id:this.formInline.Id,
                    depotName:this.formInline.depotName,
                    customerName : this.formInline.cutomerName,
                    manageAreaId:this.formInline.manageAreaId,
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/depotManage/depot/list_for_company',page , {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                }).then((res)=>{
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.total = res.body.result.total;
                        this.tableData = res.body.result.rows;
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
            handleSizeChange(pagesize){
                this.pagesize = pagesize;
                this.data();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.data();
            },
            submit(){
                let page = JSON.stringify({
                    token:this.token ,
                    id:this.formInline.Id,
                    depotName:this.formInline.depotName,
                    customerName : this.formInline.cutomerName,
                    pageNum:this.currentPage=1 ,
                    pageSize:this.pagesize,
                    manageAreaId:this.formInline.manageAreaId,
                    firstTel:this.formInline.firstTel
                });
                this.$http.post( this.global.lightningUrl + '/companyv1/depotManage/depot/list_for_company',page ,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                } ).then((res)=>{
                    if (res.body.errcode == 0) {
                        this.total = res.body.result.total;
                        this.tableData = res.body.result.rows;
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .main {
        font-size: 16px;
        padding-top: 30px;
        padding-left: 30px;
        ul{
            li {
                margin: 10px 0;
                display: inline-block;
                padding-right: 40px;
            }
        }
        .top {
            margin-top: 20px;
        }
        .inp {
            width:150px;
            height:30px;
            margin-right: 30px;
            border: 1px solid #ccc;
            padding-left: 10px;
        }
        .el-form{
            height: 50px;
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
            text-align: center;
            margin-top: 20px;
        }
    }
</style>
