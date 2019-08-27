<template>
    <div class="main">
        <div class="header">
            当前位置：<span> 辅助工具 > 司机培训资料 </span>
        </div>
        <div class="center">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="124px" class="demo-ruleForm">
                <el-form-item label="培训资料名称：" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="司机培训资料：" required>
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            :drang="true"
                            :on-exceed='uploadOverrunContract'
                            action="javascript:;"
                            :limit='2'
                            :on-preview="handlePictureCardPreviewContract"
                            :on-remove="handleRemoveContract"
                            :file-list="fileListContract"
                            :on-change="Contracts"
                            :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取司机培训资料</el-button>
                        <div slot="tip" class="el-upload__tip"><span style="color:red;">注 : 先上传培训封面图，后上传培训资料</span> 上传，支持jpg、png、word、excel、wps、zip、pdf、mp4，支持下载查看最多添加2份</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="培训视频时间：" prop="time"  v-if="this.none == 'none' ? true : false">
                    <el-input v-model="ruleForm.time" disabled  ></el-input>
                </el-form-item>
                <el-form-item label="预览：" v-if="this.none == 'none' ? true : false">
                    <div class="avatar-box" >
                        <video :src="videoUrl" controls preload="auto" id="videoPlayer" style="width:100%;height:500px;" ></video>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin: 30px;" size="small" type="success" @click="uploadFile('ruleForm')">提交司机培训资料</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
                ref="multipleTable"
                :data="arr"
                tooltip-effect="dark"
                style="width: 100%"
        >
            <el-table-column
                    align="center"
                    :formatter="dateFormatHm"
                    prop="createTime"
                    label="上传时间"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="name"
                    label="资料名称"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="uploaderName"
                    label="上传人"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="fileName"
                    label="详情"
            >
                <template slot-scope="scope">
                    <a target="view_window" :href="arr[scope.$index].filePath">{{ arr[scope.$index].fileName}} </a>
                </template>
            </el-table-column>
            <el-table-column
                    prop=""
                    label="操作" align="center"width="110">
                <template slot-scope="scope">
                    <el-button @click="finish(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页插件 -->
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                layout="total, prev, pager, next"
                :total="total">
        </el-pagination>
    </div>

</template>

<script>
    import moment from 'moment'
    export default {
        name: "TrainingMaterials",
        data (){
            return{
                ids:[],
                none:'',
                //获取到上传视频的地址
                videoUrl:'',
                //查看开关
                dialogVisible:true,
                arr:[],
                token:'',
                ruleForm:{
                    name:'',
                    time:'',
                },
                fileListContract:[],
                picListContract:[],
                //分页
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
                rules: {
                    name: [
                        { required: true, message: '请输入培训名称', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,50}$/,  message: '字数以达到200个上线', trigger: 'blur' }
                    ],
                    time:[
                        { required: true, message: '请输入培训视频时间', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,50}$/,  message: '字数以达到200个上线', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            console.log(this.token);
            //首刷列表
            this.data();
        },
        methods:{
            // 查询列表接口
            data(){
                this.$http.post( this.global.lightningUrl + '/companyv1/security/train/file/list',JSON.stringify({
                    token:this.token,
                    pageSize:this.pagesize,
                    pageNum:this.currentPage,
                })).then(run=>{
                    console.log(run);
                    if (run.body.errcode==0){
                        this.arr = run.body.result.rows;
                        this.total = run.body.result.total
                    }
                })
            },
            //列表删除
            finish(row){
                console.log(row);
                this.ids.push(row.id);
                this.$http.post( this.global.lightningUrl + '/companyv1/security/train/file/delete',JSON.stringify({
                    token: this.token,
                    ids:this.ids,
                })).then(run=>{
                    console.log(run);
                    if (run.body.errcode==0){
                        this.$message({
                            showClose: true,
                            message: run.body.message,
                            type:'success',
                        });
                        //刷新列表
                        this.data();
                    }else {
                        this.$message({
                            showClose:true,
                            message:run.body.message,
                            type:'error',
                        })
                    }
                });
            },
            //提交
            uploadFile(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        console.log(this.picListContract) ;
                        if (this.picListContract.length == 0){
                            this.$message({
                                showClose: true,
                                message: '对不起，请上传视频封面图和资料。',
                                type: 'error'
                            });
                            return false
                        }
                        var fileName = this.picListContract[0].name.substring(this.picListContract[0].name.lastIndexOf("."));
                        if ((fileName != '.jpg') && (fileName != '.png')) {
                            this.picListContract.splice(0, 1);
                            this.$message({
                                showClose: true,
                                message: '对不起，请上传视频封面图。',
                                type: 'error'
                            });
                            return false
                        }
                        if (this.picListContract[1] == undefined){
                            this.$message({
                                showClose: true,
                                message: '对不起，请上传视频资料',
                                type: 'error'
                            });
                            return false
                        }
                        let formdata = new FormData();
                        for (var i in this.picListContract) {
                            var fileName = this.picListContract[i].name.substring(this.picListContract[i].name.lastIndexOf("."));
                            if (fileName == undefined) {
                                this.$message({
                                    showClose: true,
                                    message: '对不起，请上传视频封面图和资料。',
                                    type: 'error'
                                });
                                return false
                            }else if ((fileName == '.jpg') || (fileName == '.png')) {
                                console.log(this.picListContract[i].raw);
                                formdata.append('frontCover', this.picListContract[i].raw);
                            } else {
                                formdata.append('trainFile', this.picListContract[i].raw);
                            }
                        };
                        formdata.append('token', this.token);
                        formdata.append('videoTime', this.ruleForm.time);
                        formdata.append('name', this.ruleForm.name);
                        formdata.append('type', 'driver');
                        if (this.picListContract == '') {
                            this.$message({
                                showClose: true,
                                message: '请选择需要上传的文件',
                                type: 'error'
                            });
                            return false
                        }
                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递fromdata
                            }
                        };
                        this.$http.post(this.global.lightningUrl + '/companyv1/security/train/file/upload', formdata, config).then(res => {
                            //做处理
                            console.log(res);
                            if (res.body.errcode == 0) {
                                this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'success'
                                });
                                //刷新列表
                                this.data();
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'error'
                                })
                            }
                        });
                    } else {
                        this.$message.error("确保信息完整！");
                        return false;
                    }
                });
            },
            //判断图片大小及格式
            Contracts(file, fileList){
                console.log(file.name , fileList);
                this.picListContract=[];
                this.picListContract=fileList;
                console.log(this.picListContract);
                //获取到视频的时间长度
                for (var i in this.picListContract) {
                    var fileName = this.picListContract[i].name.substring(this.picListContract[i].name.lastIndexOf("."));
                    if (fileName == '.mp4'){
                        this.none = 'none';
                        this.videoUrl = fileList[i].url;
                        console.log(this.videoUrl);
                        setTimeout(()=>{
                            this.ruleForm.time = document.getElementById('videoPlayer').duration;
                            this.ruleForm.time = Math.floor(this.ruleForm.time/60) + " ' " + (this.ruleForm.time%60/100).toFixed(2).slice(-2) + ' \'\' '
                        },1000);
                    }else {
                        this.none = '';
                    }
                }
                for(var i in this.picListContract) {
                    var fileName = this.picListContract[i].name.substring(this.picListContract[i].name.lastIndexOf("."));
                    if ((fileName != '.jpg') && (fileName != '.png')&& (fileName != '.zip')&& (fileName != '.docx')&&
                        (fileName != '.xlsx')&& (fileName != '.psd')&& (fileName != '.wps')&& (fileName != '.pdf')&&
                        (fileName != '.mp4')) {
                        this.picListContract.splice(i, 1);
                        this.$message({
                            showClose: true,
                            message: '对不起，系统不支持该格式的文件。',
                            type: 'error'
                        });
                        return false
                    }
                    var size = 0;
                    var num  = 20;
                    size = this.picListContract[i].size;//byte
                    size = size / 1024;//kb
                    size = (size / 1024).toFixed(1);//mb
                    if (size > num){
                        this.picListContract.splice(i,1);
                        this.$message({
                            showClose: true,
                            message: '对不起，您上传的文件大小为'+ size +'文件大小超出20M。上传失败！',
                            type: 'error'
                        });
                        return false
                    }
                }
            },
            //删除文件
            handleRemoveContract(file, fileList) {
                console.log(file.name, fileList);
                this.companyPicFiles = [];
                for (var i in fileList) {
                    console.log(fileList[i].name);
                    this.companyPicFiles.push(fileList[i].name);
                    this.companyPicFile = JSON.stringify(this.companyPicFiles).slice(1,-1).replace(/\"/g,"")
                }
            },
            //点击查看上传的文件
            handlePictureCardPreviewContract(file) {
                var fileName = file.name.substring(file.name.lastIndexOf("."));
                if ((fileName != '.jpg') && (fileName != '.png')&& (fileName != '.mp4')){
                    window.location.href = file.url;
                    console.log(123);
                }else {
                    var a = document.createElement('a');
                    a.href = file.url;
                    a.target = '_blank';
                    a.id='exppub';
                    document.body.appendChild(a);
                    var alink = document.getElementById('exppub');
                    alink.click();
                    alink.parentNode.removeChild(a);
                }
                this.dialogImageUrlContract = file.url;
                this.dialogVisibleContract = true;
            },
            //限制上传的文件个数
            uploadOverrunContract: function() {
                this.$message({
                    type: 'error',
                    message: '上传文件个数超出限制!最多上传2个文件!'
                });
            },
            //点击查看详情
            handleClick(row){
                console.log(row );
                this.dialogVisible = true;
            },
            //时间的格式转换
            dateFormatHm:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            //分页
            handleSizeChange(pagesize) {
                this.pagesize = pagesize;
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage);
                this.data();
            },
        },
    }
</script>

<style scoped lang="scss">
    .main {
        padding: 30px;
        .center {
            width:40%;
            margin-top: 20px;
            .el-input{
                width: 100%;
            }
        }
    }
</style>