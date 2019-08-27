<template>
    <div class="trainingComponent">
        <div class="trainingComponent-top">
            <el-button type="primary" @click="templateDownload">模板下载</el-button>
            <!--<el-button type="primary" @click="upload">批量导入</el-button>-->

            <el-button type="primary" @click="skip">{{this.trainType == 'before'?'岗前培训记录':'上岗培训记录'}}</el-button>

            <el-upload
                    v-if="driverTrainImport"
                    class="upload-demo"
                    style="margin-top: 10px;width: 400px;"
                    ref="upload"
                    :limit="1"
                    :on-exceed="exceedlimit"
                    action="javascript:;"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-change="Contracts"
                    :file-list="fileLists"
                    :auto-upload="false">
                <el-button slot="trigger" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" type="success" @click="submitUpload" >批量导入</el-button>

                <div slot="tip" class="el-upload__tip">只支持xlsx,最多添加1份</div>
            </el-upload>
        </div>
        <div class="trainingComponent-mid">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="培训时间" required>
                    <el-col :span="5">
                        <el-form-item>
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="ruleForm.date"
                                value-format="timestamp"
                                style="width: 100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col class="line" >-</el-col>

                    <el-col :span="5">
                        <el-form-item>
                            <el-time-picker
                                placeholder="选择时间"
                                v-model="ruleForm.time"
                                :clearable="cBoolean"
                                format="HH:mm"
                                @change="selectTime"
                                value-format="HH:mm"
                                style="width: 100%;">
                            </el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="培训方式" prop="style" >
                    <el-col :span="5">
                        <el-select v-model="ruleForm.style" placeholder="请选择" style="width: 100%;">
                            <el-option
                                v-for="item in styles"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>

                <el-form-item label="培训讲师" prop="name">
                        <el-input class="inputStyle" v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="培训司机" required>
                    <el-button type="primary" @click="centerDialogVisible = true">选择司机</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </el-form-item>
            </el-form>

            <el-table
                    :data="tableData1"
                    style="width: 100%"
                    border
                    >
                <el-table-column
                        align="center"
                        prop="driverName"
                        label="姓名"
                        >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="phone"
                        label="电话"
                        >
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作"
                        >
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="deleteRow(scope.$index, tableData1)"
                                type="text"
                                size="small">移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--选择司机弹出框-->
        <el-dialog
                title="选择司机"
                :visible.sync="centerDialogVisible"
                width="50%"
                center>
            <!--手机号查询-->
            <el-form :inline="true" :model="phoneForm" :rules="phones" ref="phoneForm" label-width="55px" class="demo-ruleForm">

                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="phoneForm.phone" placeholder="请输入司机手机号"></el-input>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="onSubmit('phoneForm')">查询</el-button>
                </el-form-item>
            </el-form>

            <el-table
                    :data="tableData"
                    ref="multipleTable"
                    tooltip-effect="dark"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        align="center"
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="driverName"
                        label="姓名"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="phone"
                        label="电话"
                >
                </el-table-column>
            </el-table>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelTable">取 消</el-button>
                <el-button type="primary" @click="confirmTable">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {exceedlimit} from "../../js/upload";
    import {F_jurisdiction,AIfirstClass0,secondLevel} from '../../js/Fjurisdiction.js'
    export default {
        name: "trainingComponent",
        props: ['trainType'],
        data() {
            return {
                driverTrainImport:'',
                picListContract:[],
                succeedfileList: [],
                ServerData: [],
                fileLists: [],
                cBoolean:false,
                total:0,
                pageSize:10,
                currentPage:1,
                timeNum:0,
                // pickerOptions: {
                //     disabledDate(time) {
                //         return time.getTime() < Date.now() - 3600 * 1000 * 24;
                //     }
                // },
                token:'',
                tableData1:[],
                tableData: [],
                multipleSelection: [],
                centerDialogVisible:false,
                styles: [{
                    value: 'scene',
                    label: '现场'
                }, {
                    value: 'wechat',
                    label: '微信'
                }, {
                    value: 'phone',
                    label: '电话'
                }, {
                    value: 'video',
                    label: '视频'
                }, {
                    value: 'other',
                    label: '其他'
                }],
                ruleForm: {
                    date: '',
                    time: '',
                    style: '',
                    name: '',
                },
                rules: {
                    // date: [
                    //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    // ],
                    // time: [
                    //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    // ],
                    style: [
                        { required: true, message: '请选择培训方式', trigger: 'change' }
                    ],
                    name: [
                        {required: true, message: '请输入培训讲师姓名',trigger: 'blur'},
                        {pattern:  /^[\u4e00-\u9fa5]{2,10}$/, message: '培训讲师姓名为中文2-10个字符', trigger:'blur'}
                    ]
                },
                phoneForm:{
                    phone:''
                },
                phones:{
                    phone: [
                        { pattern:  /^\d{1,11}$/, message: '电话号为1-11位有效数字', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            upload (_this){
                console.log(123);
                if (_this.picListContract.length == 0) {
                    return
                }
                let formdata = new FormData();

                for (let i = 0; i < _this.picListContract.length; i++) {
                    formdata.append('file', _this.picListContract[i].raw);
                }
                formdata.append('token', _this.token);

                _this.$http.post(_this.global.lightningUrl + '/companyv1/driverManage/driver/train/import', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递fromdata
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        _this.succeedfileList = res.body.result;
                        for (var i in _this.succeedfileList) {
                            var arr = _this.succeedfileList[i].name.split('~');
                            _this.ServerData.push(arr);
                            _this.fileLists.push({'name': arr[1], 'url': _this.succeedfileList[i].url})
                        }
                        _this.$message({
                            showClose: true,
                            message: res.body.message,
                            type: 'success'
                        });
                        _this.picListContract = [];
                    }else if(res.body.errcode == 1){
                        _this.$message({
                            message: res.body.message,
                            type: 'warning',
                            duration:5000
                        });
                    }else{
                        _this.$message({
                            message: res.body.message,
                            type: 'warning'
                        });
                    }
                })
            },
            Contracts1(file, fileList,_this) {
                console.log(file.name, fileList);
                var result = [];
                var obj = {};
                for(var i =0; i<fileList.length; i++) {
                    if (!obj[fileList[i].name]) {
                        result.push(fileList[i]);
                        obj[fileList[i].name] = true;
                    }
                }
                console.log(result);
                _this.picListContract = [];
                _this.picListContract = fileList;
                if (_this.picListContract.length == 0) {
                    return
                }

                for (var i in _this.picListContract) {
                    var fileName = _this.picListContract[i].name.substring(_this.picListContract[i].name.lastIndexOf("."));
                    if (_this.picListContract[i].name.includes('~')) {
                        _this.picListContract.splice(i, 1);
                        fileList.splice(i, 1);
                        _this.$message({
                            showClose: true,
                            message: '对不起文件名不能带特殊字符！',
                            type: 'error'
                        });
                        return false
                    } else {
                        if ((fileName != '.xlsx')) {
                            _this.picListContract.splice(i, 1);
                            fileList.splice(i, 1);
                            _this.$message({
                                showClose: true,
                                message: '对不起，系统不支持该格式的文件。',
                                type: 'error'
                            });
                            return false
                        }
                        var size = 0;
                        var num = 10;
                        size = _this.picListContract[i].size;//byte
                        size = size / 1024;//kb
                        size = (size / 1024).toFixed(1);//mb
                        if (size > num) {
                            _this.picListContract.splice(i, 1);
                            fileList.splice(i, 1);
                            _this.$message({
                                showClose: true,
                                message: '对不起，您上传的文件大小为' + size + '文件大小超出10M。上传失败！',
                                type: 'error'
                            });
                            return false
                        }
                    }
                }
            },
            exceedlimit(){
                exceedlimit(this,1);
            },
            //删除文件
            handleRemove(file, fileList){
                // handleRemove(file, fileList,this,this.picListContract,this.ServerData,this.fileLists)
            },
            //查看图片
            handlePreview(file){
                // handlePreview(file,this,this.succeedfileList,this.ServerData)
            },
            //限制文件格式
            Contracts(file, fileList ){
                this.Contracts1(file, fileList,this)
            },
            submitUpload(){
                this.upload(this);
            },
            handleSizeChange(pagesize) {
                this.pagesize = pagesize;
                this.driverQuery();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.driverQuery();
            },
            selectTime(){
                console.log(this.ruleForm.time);
                if(this.ruleForm.date == '' || this.ruleForm.date == null){
                    this.$message({
                        message: '请先选择培训日期',
                        type: 'warning'
                    });
                    this.ruleForm.time = '';
                }else{
                    if(this.ruleForm.time != null){
                        let arrTime =  this.ruleForm.time.split(":");
                        this.timeNum = arrTime[0]*60*60*1000 + arrTime[1]*60*1000;
                        console.log(this.timeNum);
                    }
                }

            },
            templateDownload(){
                window.location.href= this.global.lightningUrl + '/companyv1/driverManage/driver/train/download/template'
            },
            skip(){
                this.$router.push({
                    name: 'trainingRecord',
                    query: {
                       type:this.trainType
                    }
                });
            },
            cancelTable(){
                this.centerDialogVisible = false;
                this.multipleSelection = [];
            },
            confirmTable(){
                this.centerDialogVisible = false;
                this.tableData1 = this.tableData1.concat(this.multipleSelection);

            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            },
            submitInfo(){
                console.log(this.ruleForm.date,this.ruleForm.time,this.timeNum);
                console.log(this.ruleForm.date + this.timeNum);
                console.log(this.tableData1);
                let arr = [];
                this.tableData1.forEach((v,k) => {
                    console.log(v,k)
                    arr.push(v.userId);
                });
                console.log(arr);
                console.log(this.trainType)
                let info = JSON.stringify({
                    token:this.token,
                    userIds:arr,
                    teacher:this.ruleForm.name,
                    trainTime:this.ruleForm.date + this.timeNum,
                    trainWay:this.ruleForm.style,
                    type:this.trainType
                });

                console.log(info)
                this.$http.post(this.global.lightningUrl+'/companyv1/driverManage/driver/train/create', info, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if(res.data.errcode === 0){
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.resetForm('ruleForm');
                        this.ruleForm.date = '';
                        this.ruleForm.time = '';
                        this.tableData1 = [];
                        this.multipleSelection = [];
                        this.$refs.multipleTable.clearSelection();

                    }else{
                        this.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
                }).catch((error)  => {
                    console.log(error);
                });
            },
            submitForm(formName) {
                if(this.ruleForm.date == "" || this.ruleForm.date == null || this.ruleForm.time == ""){
                    this.$message({
                        message: '请选择培训时间',
                        type: 'warning'
                    });
                    return;
                }
                console.log(this.tableData1)
                if(this.tableData1.length == 0){
                    this.$message({
                        message: '请选择培训司机',
                        type: 'warning'
                    });
                    return;
                }


                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitInfo();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onSubmit(formName){
                if(this.phoneForm.phone === ''){
                    this.$message({
                        message: '手机号不能为空',
                        type: 'warning'
                    });
                }else{
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.driverQuery();
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }

            },
            // 查询司机
            driverQuery(){
                let driverPhone = JSON.stringify({
                    token:this.token,
                    phone:this.phoneForm.phone,
                    pageNum:this.currentPage,
                    pageSize:this.pageSize
                });
                this.$http.post(this.global.lightningUrl+'/companyv1/driverManage/driver/train/select_driver', driverPhone, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if(res.data.errcode === 0 && res.data.result.total !== 0){
                        this.tableData = res.data.result.list;
                        this.total = res.data.result.total;
                    }else{
                        this.tableData = res.data.result.list;
                        this.total = res.data.result.total;
                        this.$message({
                            message: '暂无数据',
                            type: 'warning'
                        });
                    }


                }).catch((error)  => {
                    console.log(error);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted(){
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jd = JSON.parse(sessionStorage.getItem('jurisdictions'));
            // 'driverTrainImport':'司机培训导入','driverTrainExport':'司机培训导出'?
            this.driverTrainImport = F_jurisdiction('driverTrainImport',jd)
        }
    }
</script>

<style  lang="scss">
  .trainingComponent{
      width: 100%;
      .trainingComponent-top{
          margin-left: 20px;
      }
      .line{
          text-align: center;
          width: 20px;
      }
      .trainingComponent-mid{
          margin-top: 20px;
      }
      .inputStyle{
          width: 20.83333%;
      }
  }
</style>