<template>
    <div class="main">
        <div class="header">当前位置： 项目管理 > 项目列表 </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="项目编号">
                <el-input v-model="formInline.id" placeholder="请选择项目编号"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
                <el-input v-model="formInline.customerName" placeholder="请选择项目名称"></el-input>
            </el-form-item>
            <el-form-item label="所属分公司">
                <el-select v-model="formInline.filialeName" placeholder="请选择所属分公司">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                            v-for="item in ids"
                            :key="item.id"
                            :label="item.deptName"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="管理区">
                <el-select v-model="formInline.regionName" placeholder="请选择所管理区域">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in region" :label='i.name' :value="i.id" :key="i.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目状态">
                <el-select v-model="formInline.status" placeholder="请选择项目状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="正常" value="normal"></el-option>
                    <el-option label="冻结" value="FreezeAccount"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="运营专员">
                <el-input v-model="formInline.projectAdminName" placeholder="请选择运营专员"></el-input>
            </el-form-item>
            <el-form-item label="销售专员">
                <el-input v-model="formInline.saleAdminName" placeholder="请选择销售专员"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="projectListExport">导出</el-button>
                <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="项目编号"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="regionName"
                    align="center"
                    label="管理区">
            </el-table-column>
            <el-table-column
                    prop="filialeName"
                    align="center"
                    label="所属分公司">
            </el-table-column>
            <el-table-column
                    prop="customerName"
                    label="项目名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="type"
                    align="center"
                    label="项目类型">
            </el-table-column>
            <el-table-column
                    prop="saleAdminName"
                    align="center"
                    label="销售专员">
            </el-table-column>
            <el-table-column
                    prop="projectAdminName"
                    align="center"
                    label="运营专员">
            </el-table-column>
            <el-table-column
                    prop="runningItem"
                    align="center"
                    label="在跑任务数">
            </el-table-column>
            <el-table-column
                    prop="dispatchCarTime"
                    align="center"
                    label="最后出车时间">
            </el-table-column>
            <el-table-column
                    prop="customerState"
                    align="center"
                    :formatter="customer"
                    label="项目状态">
            </el-table-column>
            <el-table-column
                prop="trackCount"
                align="center"
                label="出车异常未处理数量">
            </el-table-column>
            <el-table-column
                    align="center"
                    v-if="projectOperation==true?true:false"
                    label="项目操作">
                <template slot-scope="scope">
                    <!--<el-button @click="submit(scope.$index)" :disabled='arrs[scope.$index]'>-->
                        <!--操作-->
                    <!--</el-button>-->
                    <el-button @click="submit(scope.$index)" :disabled='arrs[scope.$index]' type="text" size="small">发单</el-button>
                    <el-button @click="imports(scope.row,scope.$index)"  type="text" size="small" v-if="projectDataImport">导入</el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                :page-sizes="[10, 20, 30, 50]"
                layout="total,prev, pager, next,sizes"
                :total='total'>
        </el-pagination>
        <el-dialog
            title=""
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div>
                <span style="color:red;padding:20px 0;display: block">注意：请先点击下载xlsx模板</span>
                <div style="text-align: center">
                    <el-upload

                        class="upload-demo"
                        drag
                        action="javaScript:;"
                        multiple
                        ref="upload"
                        :limit="1"
                        :on-exceed="exceedlimit"
                        :on-change="Contracts"
                        :file-list="fileLists"
                        :auto-upload="false"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">支持xlsx，最多添加1份</div>
                    </el-upload>
                </div>

                <div style="width:50%;overflow: hidden;padding:20px 0;margin:0 auto;">
                    <el-button type="success" size="small" @click="download" style="width: 124px;float:left;">下载模板</el-button>
                    <el-button type="primary" size="small" @click="submitUpload" style="width: 124px;float:left;" :loading="loadings">提 交</el-button >
                </div>

            </div>
        </el-dialog>
        <el-dialog
            title="报错提示"
            :visible.sync="dialog"
            width="50%"
            :before-close="handleClose">
            <div class="tit">
                <ul>
                    <li v-for="i in arr">
                        {{i}}
                    </li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment'
    import {Export} from "../../js/export";
    import {exceedlimit} from "../../js/upload";
    import {F_jurisdiction} from "../../js/Fjurisdiction";
    export default {
        name: "bulletedList",
        created(){
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));


            // if (jurisdictions[6].menus.length == 37){
                this.projectOperation = jurisdictions[6].menus[9].choose;
                this.projectListExport = jurisdictions[6].menus[8].choose;
            // }
            this.projectDataImport = F_jurisdiction('projectDataImport',jurisdictions);
            this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_filiale_list',JSON.stringify({
                'token':this.token,
            })).then(run=>{
                this.ids = run.body.result;
            });
            this.$http.post( this.global.lightningUrl + '/companyv1/userManage/region/all_region',JSON.stringify({
                'token':this.token,
            })).then(run=>{
                if (run.body.errcode == 0){
                    this.region = run.body.result
                }
            });
            if(sessionStorage.getItem('bulletedListcurrentPage')!=null){
                let currentPages = Number(sessionStorage.getItem('bulletedListcurrentPage'));
                let totals = Number(sessionStorage.getItem('bulletedListtotal'));
                let condition = sessionStorage.getItem('bulletedListcondition');

                this.formInline = JSON.parse(condition)
                this.currentPage = currentPages;
                this.total = totals;
                //查询接口
                this.requestTurnout()
            }else {
                this.data()
            }
            
        },
        data(){
            return {
                loadings: false,
                arr:[],
                upload: [],
                succeedfileList: [],
                ServerData: [],
                picListContract: [],
                fileLists: [],
                dialog: false,
                dialogVisible: false,
                projectDataImport:false,//导入权限
                row:{},
                formInline:{},
                tableData: [],
                ids:[],
                region:[],
                token:'',
                total:0,
                currentPage:1,
                pagesize:10,
                projectOperation:false,
                projectListExport:false,
                //    导出
                fullscreenLoading: false,
                trackManageListExport:false,
                ProgressBar:0,
                queryStatus:true,
                arrs:[],
            }
        },
        methods:{
            customer(row) {
                if (row.customerState == "normal"){
                    return '正常'
                } return '冻结'
            },
            //导出
            Export() {
                let page = JSON.stringify({
                    "token":this.token,
                    "exportName":"CustomerProjectList",                       /*-- 到处模块*/
                    "tt.id":this.formInline.id,
                    "tt.customer_name":this.formInline.customerName,
                    "tt.filiale_id":this.formInline.filialeName,
                    "re.id":this.formInline.regionName,
                    "us.freeze_status":this.formInline.status,
                    "tt.project_name":this.formInline.projectAdminName,
                    "tt.sale_name":this.formInline.saleAdminName,
                });
                Export(this,this.queryStatus,this.ProgressBar,this.fullscreenLoading,this.code,page);
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                // :formatter="dateFormat"
                return moment(date).format("YYYY-MM-DD");
            },
            data(){
                this.ajax()
            },
            requestTurnout(){
                this.ajax()
            },
            ajax(){
                let page = JSON.stringify({
                    "token":this.token,
                    "id2":this.formInline.id,//项目编号
                    "conditionStr4":this.formInline.customerName,//项目名称
                    "id1":this.formInline.filialeName,
                    "id3":this.formInline.regionName,
                    "conditionStr3":this.formInline.status,
                    "conditionStr1":this.formInline.saleAdminName,
                    "conditionStr2":this.formInline.projectAdminName,
                    "pageSize" : this.pagesize,
                    "pageNum" : this.currentPage,
                })
                this.$http.post(this.global.lightningUrl+'/companyv1/customerManage/projectList',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res)
                    if (res.body.errcode == 0){
                        this.total = res.body.result.total;
                        this.tableData = res.body.result.rows ;
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].dispatchCarTime == 0){
                                this.tableData[i].dispatchCarTime = ''
                            }
                            this.arrs.push(false)
                            if (this.tableData[i].customerState == '冻结') {
                                this.arrs[i] = true
                            }else{
                                this.arrs[i] = false
                            }
                        }
                        // 缓存
                        //更新本地存储
                        if(sessionStorage.getItem('bulletedListcurrentPage')!=null&&sessionStorage.getItem('bulletedListcurrentPage')!=null){
                            //删除本地
                            sessionStorage.removeItem('bulletedListcurrentPage');
                            sessionStorage.removeItem('bulletedListcondition');
                            sessionStorage.removeItem('bulletedListtotal');
                            //存储本地
                            sessionStorage.setItem('bulletedListcurrentPage', JSON.stringify(this.currentPage));
                            sessionStorage.setItem('bulletedListtotal', JSON.stringify(this.total));
                            sessionStorage.setItem('bulletedListcondition', JSON.stringify(this.formInline));
                        }else {
                            //存储本地
                            sessionStorage.setItem('bulletedListcurrentPage', JSON.stringify(this.currentPage));
                            sessionStorage.setItem('bulletedListtotal', JSON.stringify(this.total));
                            sessionStorage.setItem('bulletedListcondition', JSON.stringify(this.formInline));
                        }
                    }
                })
            },
            onSubmit(){
                this.currentPage = 1;
                this.ajax()
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.ajax()
            },
            handleSizeChange(val){
                this.pagesize = val;
                this.ajax()
            },
            //导入
            imports(row,_index) {
                this.dialogVisible = true;
                console.log(row);
                this.row = row;
            },
            //下载模板
            download() {
                window.location.href = this.global.lightningUrl + '/companyv1/trunkCenter/download/offline/template';
            },
            //上传
            submitUpload(){
                if (this.picListContract.length == 0) {
                    return
                }
                let formdata = new FormData();

                for (let i = 0; i < this.picListContract.length; i++) {
                    formdata.append('file', this.picListContract[i].raw);
                }
                formdata.append('contractorId',this.row.id);
                formdata.append('customerName', this.row.customerName);
                this.loadings=true;
                this.$http.post(this.global.lightningUrl + '/companyv1/trunkCenter/upload/offline', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递fromdata
                    }
                }).then((res) => {
                    console.log(res);
                    this.loadings=false;
                    if (res.body.errcode == 0) {
                        this.$message({
                            showClose: true,
                            message: res.body.message,
                            type: 'success'
                        });
                        this.fileLists = [];
                        this.picListContract = [];
                        this.dialogVisible=false;
                        this.ajax();
                    }else if(res.body.errcode == -1) {
                        this.$message({
                            showClose: true,
                            message: '上传失败'+res.body.message,
                            type: 'error'
                        });
                        this.fileLists = [];
                        this.picListContract = [];
                    }else if(res.body.errcode == -2) {
                        this.$message({
                            showClose: true,
                            message: res.body.message,
                            type: 'error'
                        });
                        this.dialog = true;
                        var src =  res.body.result;
                        var st = src.split(";");
                        this.arr = st.slice(1);
                    }
                })
            },
            //限制最多上传文件个数
            exceedlimit(){
                exceedlimit(this,1);
            },
            //限制文件格式
            Contracts(file, fileList){

                var result = [];
                var obj = {};
                for(var i =0; i<fileList.length; i++) {
                    if (!obj[fileList[i].name]) {
                        result.push(fileList[i]);
                        obj[fileList[i].name] = true;
                    }
                }
                console.log(result);
                this.picListContract = [];
                this.picListContract = fileList;
                if (this.picListContract.length == 0) {
                    return
                }
                for (var i in this.picListContract) {
                    var fileName = this.picListContract[i].name.substring(this.picListContract[i].name.lastIndexOf("."));
                    if (fileName != '.xlsx') {
                        this.picListContract.splice(i, 1);

                        this.$message({
                            showClose: true,
                            message: '对不起，系统不支持该格式的文件。',
                            type: 'error'
                        });
                        return false
                    }
                    var size = 0;
                    var num = 10;
                    size = this.picListContract[i].size;//byte
                    size = size / 1024;//kb
                    size = (size / 1024).toFixed(1);//mb
                    if (size > num) {
                        this.picListContract.splice(i, 1);

                        this.$message({
                            showClose: true,
                            message: '对不起，您上传的文件大小为' + size + '文件大小超出10M。上传失败！',
                            type: 'error'
                        });
                        return false
                    }
                }

            },


            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            submit(_index){
                this.$router.push(
                    {
                        path: '/ReleaseCar',
                    });

                sessionStorage.setItem('webCustomerId', JSON.stringify(this.tableData[_index].customerId));
                let infos = {
                    projectName:this.tableData[_index].customerName
                }
                sessionStorage.setItem('projectName', JSON.stringify(infos));
            }
        }

    }
</script>

<style lang="scss" scoped>
    .main{
        .header{
            margin-bottom: 20px;
        }
        .tit{
            width: 100%;
            ul{
                overflow: hidden;
                li{
                    font-weight: bold;
                    padding:30px;
                    float: left;
                    color: red;
                    width:26%;
                }
            }
        }
    }
</style>