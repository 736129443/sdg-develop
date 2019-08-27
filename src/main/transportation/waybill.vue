<template>
    <div class="main Waybill">
        <div class="header">
            当前位置：<span>无车承运数据>电子运单</span>
        </div>

        <div style="padding:40px 0;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="项目名称">
                    <el-input v-model.trim="formInline.customerName" placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item label="原始单号">
                    <el-input v-model.trim="formInline.originalDocumentNumber" placeholder="原始单号"></el-input>
                </el-form-item>
                <el-form-item label="托运单号">
                    <el-input v-model.trim="formInline.shippingNoteNumber" placeholder="托运单号"></el-input>
                </el-form-item>
                <el-form-item label="承运人">
                    <el-input v-model.trim="formInline.carrier" placeholder="承运人"></el-input>
                </el-form-item>
                <el-form-item label="上报状态">
                    <el-select v-model="formInline.reportedStatus" placeholder="上报状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="上报成功" value="success"></el-option>
                        <el-option label="待上报" value="wait"></el-option>
                        <el-option label="上报失败" value="fail"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务类型">
                    <el-select v-model="formInline.businessTypeCode" placeholder="业务类型">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="干线普货运输" value="1002996"></el-option>
                        <el-option label="城市配送" value="1003997"></el-option>
                        <el-option label="农村配送" value="1003998"></el-option>
                        <el-option label="集装箱运输" value="1002998"></el-option>
                        <el-option label="其他" value="1003999"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车辆牌照号">
                    <el-input v-model.trim="formInline.vehicleNumber" placeholder="车牌号"></el-input>
                </el-form-item>
                <el-form-item label="车辆分类">
                    <el-select v-model="formInline.vehicleClassificationCode" placeholder="车辆分类">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in classification" :label='i.name' :value="i.id" :key="i.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上报时间">
                    <el-date-picker
                        width="110"
                        v-model="formInline.time"
                        type="daterange"
                        value-format="timestamp"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <!--<el-form-item label="抵运状态">-->
                <!--<el-select v-model="formInline.name" placeholder="抵运状态">-->
                <!--<el-option label="全部" value=""></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                    <el-button type="primary" @click="Export()" v-if="electronicWaybillExport">导出</el-button>
                    <!--<el-button type="primary" @click="add()">新建</el-button>-->
                    <el-button type="primary" @click="Report" v-if="electronicWaybillReporting">上报</el-button>
                    <el-button type="primary" plain @click="Import1" v-if="electronicWaybillImport">导入运单</el-button>
                    <!--<el-button type="primary" @click="">抵运检查</el-button>-->
                </el-form-item>

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
                            <el-button type="success" size="small" @click="onSubmit1" style="width: 124px;float:left;">下载模板</el-button>
                            <el-button type="primary" size="small" @click="submitUpload" style="width: 124px;float:left;" :loading="loadings">提 交</el-button>
                        </div>
                    </div>
                </el-dialog>
            </el-form>
        </div>

        <template>
            <el-table
                v-loading="loading"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    :selectable = "selectable"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="customerName"
                    label="项目名称"
                    width="150"
                >
                </el-table-column>
                <el-table-column
                    prop=""
                    width="170"
                    label="原始单号">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleClick(scope.row)">{{ tableData[scope.$index].originalDocumentNumber }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    width="170"
                    prop="shippingNoteNumber"
                    label="托运单号">
                    <template slot-scope="scope">
                        <el-button :disabled = "tableData[scope.$index].dataSources != 'dataSync'" type="text" @click="Consignment(scope.row)">{{ tableData[scope.$index].shippingNoteNumber }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="carrier"
                    width="210"
                    label="承运人"
                >
                </el-table-column>
                <el-table-column
                    prop="consignmentDateTime"
                    :formatter="dateFormat1"
                    label="托运日期时间"
                    width="180"
                    align="center">
                </el-table-column>
                <el-table-column
                    width="100"
                    prop="businessTypeCode"
                    label="业务类型"
                    >
                </el-table-column>
                <el-table-column
                    prop="totalMonetaryAmount"
                    width="100"
                    label="货币总金额">
                </el-table-column>
                <el-table-column
                    prop="licensePlateTypeCode"
                    width="120"
                    label="牌照类型代码">
                </el-table-column>
                <el-table-column
                    prop="vehicleNumber"
                    width="100"
                    label="车辆牌照号">
                </el-table-column>
                <el-table-column
                    prop="vehicleClassificationCode"
                    label="车辆分类">
                </el-table-column>
                <el-table-column
                    width="130"
                    prop="roadTransportCertificateNumber"
                    label="道路运输证号">
                </el-table-column>
                <el-table-column
                    prop="descriptionOfGoods"
                    label="货物名称">
                </el-table-column>
                <el-table-column
                    prop="cargoTypeClassificationCode"
                    label="货物分类">
                </el-table-column>
                <el-table-column
                    prop="reportedTime"
                    :formatter="dateFormat"
                    label="上报时间"
                    width="180"
                    align="center">
                </el-table-column>

                <!--<el-table-column-->
                    <!--prop=""-->
                    <!--label="抵运检查状态">-->
                <!--</el-table-column>-->
                <el-table-column
                    prop="reportedStatus"
                    :formatter="types"
                    label="上报状态">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    prop=""
                    label="操作" align="center"width="110">
                    <template slot-scope="scope">
                        <el-button :disabled="tableData[scope.$index].reportedStatus == 'success'" @click="deletes(scope.row)" type="text" size="small" v-if="electronicWaybillDelete">删除</el-button>
                        <el-button :disabled="tableData[scope.$index].reportedStatus == 'success'" @click="handleClick(scope.row,info = 2)" type="text" size="small" v-if="electronicWaybillEdit">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!-- 分页插件 -->
        <el-pagination background
                       layout="total,prev, pager, next,sizes,jumper"
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
    import {exceedlimit} from "../../js/upload";
    import {openPostWindow} from '../../js/report.js'
    import {F_jurisdiction} from "../../js/Fjurisdiction";
    export default {

        //电子运单
        name: "waybill",
        data() {
            return{
                dialogVisible: false,
                loading: false,
                loadings: false,
                pages:{},
                upload: [],
                succeedfileList: [],
                ServerData: [],
                picListContract: [],
                fileLists: [],

                classification:[//车辆分类
                    {name:'普通货车',id:'H01'},
                    {name:'厢式货车',id:'H02'},
                    {name:'罐式货车',id:'H04'},
                    {name:'牵引车',id:'Q00'},
                    {name:'普通挂车',id:'G01'},
                    {name:'集装箱挂车',id:'G05'},
                    {name:'仓栅式货车',id:'H09'},
                    {name:'封闭货车',id:'H03'},
                    {name:'平板货车',id:'H05'},
                    {name:'集装箱车',id:'H06'},
                    {name:'自卸货车',id:'H07'},
                    {name:'特殊结构货车',id:'H08'},
                    {name:'专项作业车',id:'Z00'},
                    {name:'厢式挂车',id:'G02'},
                    {name:'仓栅式挂车',id:'G07'},
                    {name:'平板挂车',id:'G04'},
                    {name:'自卸挂车',id:'G06'},
                    {name:'专项作业挂车',id:'G09'},
                    {name:'车辆运输车',id:'X91'},
                    {name:'车辆运输车(单排)',id:'X92'},
                ],
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
                tableData:[],
                formInline:{
                    originalDocumentNumber:'',//原始单号
                    shippingNoteNumber:'',//托运单号
                    reportedStatus:'',//上报状态
                    vehicleNumber:'',//车牌号
                    vehicleClassificationCode:'',//车辆分类
                    time:[],//上报时间
                    businessTypeCode:'',//业务类型
                    carrier:'',//承运人
                    customerName:''//项目名称
                },
                multipleSelection: [],
                shippingNoteNumberList:[],
                electronicWaybillExport:false,//导出权限
                electronicWaybillImport:false,//导入权限
                electronicWaybillReporting:false,//上报权限
                electronicWaybillEdit:false,//电子运单编辑
                electronicWaybillDelete:false,//电子运单删除
            }
        },
        created() {
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.electronicWaybillExport = F_jurisdiction('electronicWaybillExport',jurisdictions);
            this.electronicWaybillImport = F_jurisdiction('electronicWaybillImport',jurisdictions);
            this.electronicWaybillReporting = F_jurisdiction('electronicWaybillReporting',jurisdictions);
            this.electronicWaybillEdit = F_jurisdiction('electronicWaybillEdit',jurisdictions);
            this.electronicWaybillDelete = F_jurisdiction('electronicWaybillDelete',jurisdictions);
            this.data();
        },
        mounted() {

        },
        methods:{
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            Import1() {
                this.dialogVisible = true;
            },
            onSubmit1() {
                // console.log(this.global.lightningUrl);
                // if (this.global.lightningUrl == 'https://www.sdgwl.com') {
                if (this.global.lightningUrl == "https://www.sdgwl.com:43535") {
                    window.location.href = 'https://www.sdgwl.com/uploadfile/truckFile/运单资金流水上报模板.xlsx';
                }else if(this.global.lightningUrl == "https://www.shandiangou-app.com"){
                    window.location.href = 'https://www.shandiangou-app.com:450/uploadfile/truckFile/运单资金流水上报模板.xlsx';
                }
            },
            types(row) {
                if (row.reportedStatus == "success"){
                    return '上报成功'
                }else if (row.reportedStatus == 'fail'){
                    return '上报失败'
                }else if (row.reportedStatus == 'wait'){
                    return '待上报'
                }
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
                formdata.append('param', JSON.stringify({
                    token:this.token,
                    type:"truck"
                }));
                this.loadings=true;
                this.$http.post(this.global.lightningUrl + '/companyv1/truckBroker/excel/import', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递fromdata
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.$message({
                            showClose: true,
                            message: res.body.message,
                            type: 'success'
                        });
                        this.fileLists = [];
                        this.picListContract = [];
                        this.loading=true;
                        setTimeout(()=>{
                            this.dialogVisible = false;
                            this.loading=false;
                            this.loadings=false;
                            this.data();
                        },2000)
                    }else {
                        this.$message({
                            showClose: true,
                            message: '上传失败'+res.body.message,
                            type: 'error'
                        });
                        this.fileLists = [];
                        this.picListContract = [];
                        this.loadings=false;
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
            Report() {
                if (this.shippingNoteNumberList.length == 0) {
                    this.$message({
                        showClose: true,
                        message: '请先勾选需要上报的数据！',
                        type: 'error'
                    });
                    return
                }
                this.$confirm('此操作将上报表中信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    let page = JSON.stringify({
                        token:this.token,
                        shippingNoteNumberList:this.shippingNoteNumberList
                    });
                    this.$http.post(this.global.lightningUrl + '/companyv1/truckBroker/report/truck',page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res.body.result);
                        if (res.body.errcode == 0) {
                            this.$message({
                                showClose: true,
                                message: '上报成功',
                                type: 'success'
                            });
                            this.loading=true;
                            setTimeout(()=>{
                                this.data();
                                this.loading=false;
                            },2000)
                        }else {
                            this.$message({
                                showClose: true,
                                message: res.body.message,
                                type: 'error'
                            });
                            setTimeout(()=>{
                                this.data();
                            },500)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消上报'
                    });
                    setTimeout(()=>{
                        this.data();
                    },500)
                });
            },
            //导出
            Export() {
                var exportLink = this.global.lightningUrl + '/companyv1/truckBroker/report/export/truck_list';
                openPostWindow(exportLink,this.pages );
            },
            //查询
            query() {
                this.currentPage = 1;
                this.data();
            },
            add() {
                this.$router.push({ path:'/increaseWaybill'});
            },
            deletes(row) {
                this.$confirm('此操作将删除表中信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let page = JSON.stringify({
                        token:this.token,
                        shippingNoteNumber:row.shippingNoteNumber,
                    });
                    this.$http.post(this.global.lightningUrl + '/companyv1/truckBroker/truck/delete',page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res.body.result);
                        if (res.body.errcode == 0) {
                            this.$message({
                                showClose: true,
                                message: '删除成功！',
                                type: 'success'
                            });
                            this.data();
                        }else {
                            this.$message({
                                showClose: true,
                                message: '删除失败！',
                                type: 'warning'
                            });
                            this.data();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //跳转详情
            handleClick(row,info) {
                console.log(row);
                if (info == 2){
                    this.$router.push({ path:'./increaseWaybill',
                        query:{
                            info:Base64.encode(row.shippingNoteNumber),
                            OriginalNum: Base64.encode( row.originalDocumentNumber)
                        }
                    })
                } else {
                    this.$router.push({ path:'./detailsWaybill',
                        query:{
                            info:Base64.encode(row.shippingNoteNumber)
                        }
                    })
                }
            },
            //跳转到出车单详情
            Consignment(row) {
                console.log(row.shippingNoteNumber);
                // return
                this.$router.push({ path:'/orderDetails',
                    query:{
                        trackId: row.shippingNoteNumber
                    }
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
            dateFormat1:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            data() {
                let page = JSON.stringify({
                    token:this.token,
                    pageNum: this.currentPage,
                    pageSize:this.pagesize,
                    customerName:this.formInline.customerName,//项目名称
                    businessTypeCode:this.formInline.businessTypeCode,//业务类型
                    originalDocumentNumber:this.formInline.originalDocumentNumber,//原始单号
                    shippingNoteNumber:this.formInline.shippingNoteNumber,//托运单号
                    reportedStatus:this.formInline.reportedStatus,//上报状态
                    vehicleNumber:this.formInline.vehicleNumber,//车牌号
                    carrier:this.formInline.carrier,//承运人
                    vehicleClassificationCode:this.formInline.vehicleClassificationCode,//车辆分类
                    reportedTimeStart:this.formInline.time==null?'':this.formInline.time[0],
                    reportedTimeEnd:this.formInline.time==null?'':this.formInline.time[1]+86400000-1,
                });
                this.pages = page;
                this.$http.post(this.global.lightningUrl + '/companyv1/truckBroker/truck/list',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res.body.result);
                    if (res.body.errcode == 0) {
                        this.tableData = res.body.result.list;
                        this.total = res.body.result.total;
                    }
                })
            },
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = [];
                this.shippingNoteNumberList = [];
                this.multipleSelection = val;
                for (var i in this.multipleSelection) {
                    this.shippingNoteNumberList.push(this.multipleSelection[i].shippingNoteNumber)
                }
            },
            //表格复选框选择性禁用
            selectable(row) {
                if (row.reportedStatus == 'success') {
                    return false
                }else {
                    return true
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .Waybill{

    }
</style>