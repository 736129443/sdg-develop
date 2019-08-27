<template>
    <div class="main">
        <div class="header">
            当前位置：<span>司机管理>司机车贴审核</span>
        </div>
        <div class="center">
            <ul class="oul">
                <li>
                    <span>上传时间:</span>
                    <span>{{this.arr.lastUploadTime | dateFrm}}</span>
                </li>
                <li>
                    <span>司机姓名:</span>
                    <span>{{this.arr.driverName}}</span>
                </li>
                <li>
                    <span>司机电话:</span>
                    <span>{{this.arr.driverPhone}}</span>
                </li>
                <li>
                    <span>车牌号:</span>
                    <span>{{this.arr.plateNum}}</span>
                </li>
                <li>
                    <span>车型:</span>
                    <span>{{this.arr.vehicleType}}</span>
                </li>
                <li>
                    <span>司机类型:</span>
                    <span>{{this.arr.driverType}}</span>
                </li>
                <li>
                    <span>所属车队:</span>
                    <span>{{this.arr.belongTeam}}</span>
                </li>
                <li>
                    <span>所属分公司:</span>
                    <span>{{this.arr.filialeName}}</span>
                </li>
                <li>
                    <span>所在大区:</span>
                    <span>{{this.arr.regionName}}</span>
                </li>
                <!--<li>-->
                    <!--<span>补贴次数:</span>-->
                    <!--<span>{{this.arr.tagsTime}}</span>-->
                <!--</li>-->
                <li v-for="(n,index) in imageList" :data-index="index">
                    <span >{{n.pic}}</span>
                    <img class="spa" @click="open($event)" :src="n.url" style="width:200px;height:200px;">
                </li>
            </ul>
            <div class="bottom">
                <el-button type="primary" @click="examine">通过</el-button>
                <el-button type="primary" @click="dialogVisible = true ">未通过</el-button>
            </div>
            <!--未通过模态框-->
            <el-dialog
                    title="未通过原因"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="司机姓名">
                        <el-input type="text" v-model="ruleForm.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="审批意见" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入未通过原因"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="AuditAailure('ruleForm')">提 交</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    import fancyBox from 'vue-fancybox';
    export default {
        name: "driver_StickerAuditDetails",
        data(){
            return{
                ruleForm:{
                    name:'',
                    desc:'',
                },
                //未通过的窗口
                dialogVisible: false,
                //跳转页面的所有数据
                CarSticker:'',
                imageLists:[],
                array:[{pic:'左侧车贴照片:'},{pic:'右侧车贴照片:'},{pic:'车尾车贴照片:'}],
                imageList:[],
                arr:[],
                id:'',
                rules: {
                    desc: [
                        { required: true, message: '请填写审批原因', trigger: 'blur' },
                        {pattern: /^.{0,200}$/,  message: '汉字、字母或数字组合2~200个字符', trigger: 'blur' }
                    ]
                },
            }
        },
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm");
            }
        },
        created() {
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            //拿到ID
            let CarSticker = JSON.parse(sessionStorage.getItem('managementid'));
            this.CarSticker = CarSticker;
            this.id = CarSticker.id;
            console.log(this.id);
            this.ruleForm.name = this.CarSticker.driverName;
            this.data();
        },
        methods:{
            //审核通过按钮
            examine(){
                this.$confirm('确认司机通过认证？', {
                    confirmButtonText: '提交',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.AuditButton();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });
            },
            //审核未通过
            AuditAailure(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let page = JSON.stringify({
                            "token":this.token,
                            "userId":this.CarSticker.driverId,
                            "status":"rejected",
                            "id":this.CarSticker.id,
                            "opinion":this.ruleForm.desc,
                        })
                        this.ajax(page);
                    }else {

                    }
                })
            },
            //审核未通过的模态窗口
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_=> {
                    done();
                })
                .catch(_ => {});
            },

            //审核按钮
            AuditButton(){
                let page = JSON.stringify({
                    "token":this.token,
                    "userId":this.CarSticker.driverId,
                    "status":"accepted",
                    "id":this.CarSticker.id,
                    "opinion":this.ruleForm.desc,
                })
               this.ajax(page)
            },
            ajax(page){
                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/vehicle_tags/approve_tags',page).then(run=>{
                    console.log(run);
                    if(run.body.errcode == 0){
                        this.$message({
                            showClose: true,
                            message: run.body.message,
                            type: 'success'
                        });
                        setTimeout(()=>{
                            this.$router.push({path:'/driver_CarAudit'});
                        },100)
                    }else {
                        this.$message({
                            showClose: true,
                            message: run.body.message,
                            type: 'error'
                        });
                    }
                });
            },
            data(){
                this.arr = this.CarSticker;
                if(this.CarSticker.driverType == "personal" ){
                    this.arr.driverType = "个体司机"
                }else if(this.CarSticker.driverType == "company"){
                    this.arr.driverType = "运输公司"
                }else if(this.CarSticker.driverType == "team"){
                    this.arr.driverType = "车队司机"
                }
                this.imageLists.push(this.CarSticker.leftTags);
                this.imageLists.push(this.CarSticker.rightTags);
                this.imageLists.push(this.CarSticker.behindTags);
                for(var i in this.imageLists){
                    this.imageList.push({width: 1024, height: 1024,url:this.imageLists[i],pic:this.array[i].pic},)
                };
            },
            open(e) {
                fancyBox(e.target, this.imageList);
            },
        },
    }
</script>

<style scoped lang="scss">
    .main {
        padding: 30px;
        .center{
            width: 100%;
            background: white;
            margin-bottom: 35px;
            .oul{
                padding:10px 0 ;
                margin:30px 0  0 30px;
                li{
                    margin:30px 0 ;
                    color:#303133;
                    font-size:16px;
                }
            }
        }
        .bottom{
            width:100%;
            padding-bottom:10px;
            text-align: center;
        }
    }
</style>