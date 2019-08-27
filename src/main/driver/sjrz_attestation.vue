<template>
    <div class="main">
        <p class="nav">当前位置 ： 司机管理 > 司机详情</p>
        <div class="top">
            <p class="tit">认证信息</p>
            <div class="cont">
                <div>
                    <p class="name">
                        <a href="javascript:;" class="msg" style="color:#409EFF;">
                            <img src="../../images/user.png" title="头像"
                                 style="width:100px;height:100px;border-radius:35px;"
                                 v-if="arr.headPic == '' ?true:false">

                            <img :src='arr.headPic' :title="arr.headPic"
                                 style="width:150px;height:150px;border-radius:35px;"
                                 v-if="arr.headPic!=''?true:false">

                        </a>
                        <span style="display: block;padding:0 40px;">
                             {{arr.name}}
                        </span>

                    </p>
                    <p class="table">个人信息</p>
                    <ul class="oul">
                        <li>
                            <span>身份证号: {{arr.idcardNum}}</span>
                        </li>
                        <li>
                            <span>驾驶证号: {{arr.licenseNum}}</span>
                        </li>
                        <li>
                            <span>手机号: {{arr.phone}}</span>
                        </li>
                        <li>
                            <span>手机备用号: {{arr.sphone}}</span>
                        </li>
                        <li>
                            <span>居住地址: {{arr.address}}</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <p class="table">车辆信息</p>
                    <ul class="oul">
                        <li>
                            <span>车型: {{arr.vehicleType}}</span>
                        </li>
                        <li>
                            <span>品牌: {{arr.vehicleBrand}}</span>
                        </li>
                        <li>
                            <span>车辆颜色: {{arr.vehicleColor}}</span>
                        </li>
                        <li>
                            <span>车牌号: {{arr.plateNum}}</span>
                        </li>
                        <li>
                            <span>车辆注册日期: {{arr.registDate | dateFrm}}</span>
                        </li>
                        <li>
                            <span>车辆所有人: {{arr.vehicleOwner}}</span>
                        </li>

                    </ul>
                </div>
                <div>
                    <p class="table">照片信息</p>
                    <ul class="oul" style="text-align: center;padding: 0 40px;">
                        <li v-for="(n,index) in imageList" :data-index="index" class="Picture_con" style="padding: 0 30px;">
                            <viewer :images="images" class="h152">
                                <img :src="n.url" height="152" width="140">
                            </viewer>
                            <i class="w235">{{n.pic}}</i>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="cont">
                <p class="table">拓展信息</p>
                <div class="expand">
                    <ul class="sul">
                        <li>
                            <span>注册运营专员：</span>
                            <span>{{arr.registerDeveAdminName}}</span>
                        </li>
                        <li>
                            <span>当前运营专员：</span>
                            <span>
                                 <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.name"
                                        :label="item.label"
                                        :value="item.name">
                                    </el-option>
                                </el-select>
                            </span>
                        </li>
                        <!--<li>-->
                        <!--<span>司机类型：</span>-->
                        <!--<span>{{arr.driverType}}</span>-->
                        <!--</li>-->
                        <!--<li v-if="arr.driverType == '个体司机'?false:true">-->
                        <!--<span>所属车队：</span>-->
                        <!--<span>-->
                        <!--<el-select v-model="value1" placeholder="请选择所属车队" :disabled="this.driverCaptain">-->
                        <!--<el-option-->
                        <!--v-for="item in options1"-->
                        <!--:key="item.value"-->
                        <!--:label="item.name"-->
                        <!--:value="item.id">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <!--</span>-->
                        <!--</li>-->
                    </ul>
                </div>
            </div>
            <div class="bottom">
                <p class="title">补充信息</p>
                <div class="fl_l">
                    <el-form :label-position="labelPosition" label-width="150px" :model="formLabelAlign"
                             style="width:40%;">
                        <el-form-item label="身份证有效期">
                            <el-date-picker
                                v-model="formLabelAlign.name"
                                align="right"
                                type="date"
                                value-format="timestamp"
                                placeholder="选择日期"
                                :picker-options="pickerOptions0"
                            >
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="驾驶证有效期">
                            <div class="block">
                                <el-date-picker
                                    v-model="formLabelAlign.region"
                                    align="right"
                                    type="date"
                                    value-format="timestamp"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions0"
                                >
                                </el-date-picker>
                            </div>
                        </el-form-item>

                        <el-form-item label="行驶证有效期">
                            <div class="block">
                                <el-date-picker
                                    v-model="formLabelAlign.type"
                                    align="right"
                                    type="date"
                                    value-format="timestamp"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions0"
                                >
                                </el-date-picker>
                            </div>
                        </el-form-item>

                    </el-form>

                    <div style="width:30%;">
                        <el-form :model="ruleForm" :rules="rules1" ref="ruleForm" label-width="150px"
                                 class="demo-ruleForm">
                            <el-form-item label="车牌类型" prop="plateType">
                                <el-select v-model="ruleForm.plateType" placeholder="">
                                    <el-option label="黄牌" value="01"></el-option>
                                    <el-option label="蓝牌" value="02"></el-option>
                                    <el-option label="其他" value="99"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="车辆载质量 (千克)" prop="tonnage">
                                <el-input v-model="ruleForm.tonnage"></el-input>
                            </el-form-item>
                            <el-form-item label="道路运输证号" prop="roadTransportCertificateNumber">
                                <el-input v-model="ruleForm.roadTransportCertificateNumber"></el-input>
                            </el-form-item>
                            <div v-if="shuow" style="padding-left:30%;margin:50px;">
                                <el-button type="primary" @click="Preservation('ruleForm')" :loading="etc">保存
                                </el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
            <div style="padding-left:30%;margin:50px;">
                <div v-if="!shuow">
                    <el-button type="primary" @click="open2()" :loading="etc">认证通过</el-button>
                    <el-button type="info" @click="dialogVisible = true " :loading="NotEtc">认证未通过</el-button>
                </div>

            </div>
            <!--未通过模态框-->
            <div>
                <el-dialog
                    title="未通过原因"
                    :visible.sync="dialogVisible"
                    width="60%"
                    :before-close="handleClose">
                    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="原因:" prop="type">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label=" 身份证照片不清晰 " name="type"></el-checkbox>
                                <el-checkbox label="驾驶证照片不清晰" name="type"></el-checkbox>
                                <el-checkbox label="行驶证照片不清晰" name="type"></el-checkbox>
                                <el-checkbox label="身份证号不正确 " name="type"></el-checkbox>
                                <el-checkbox label="行驶证过期" name="type"></el-checkbox>
                                <el-checkbox label="姓名与身份证照片不符" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="其他:" prop="desc">
                            <el-input type="textarea" v-model="form.desc" placeholder="请输入未通过原因"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false ,NotThrough('form')">提 交</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'

    export default {
        data() {
            return {
                imageList1: [],
                imageList: [],
                images: [],
                pic: [
                    {aaa: "身份证照片正面"},
                    {aaa: "身份证照片背面"},
                    {aaa: "手持身份证照片"},
                    {aaa: "驾驶证照片"},
                    {aaa: "车内照片"},
                    {aaa: "车照片45°"},
                    {aaa: "行驶证照片正面"},
                    {aaa: "行驶证照片背面"},
                    {aaa: "车辆保险"},
                ],
                ruleForm: {
                    plateType: '',//车牌类型
                    roadTransportCertificateNumber: '',//道路运输证号
                    tonnage: '',//车辆载质量
                },
                rules1: {
                    plateType: [
                        {required: false, message: '请至少选择一个车牌类型', trigger: 'change'}
                    ],
                    roadTransportCertificateNumber: [
                        {required: false, message: '请输入道路运输证号', trigger: 'blur'},
                        {
                            pattern: /^([A-Za-z]|[0-9]|[\u4E00-\u9FA5]){2,15}$/,
                            message: '汉字、字母、数字或组合2~15个字符',
                            trigger: 'blur'
                        }
                    ],
                    tonnage: [
                        {required: false, message: '请输入车辆载质量（千克）', trigger: 'blur'},
                        {pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/, message: '仅能输入整数', trigger: 'blur'}
                    ]
                },
                shuow: false,
                num: '',
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    }
                },
                value1Id: '',
                driverCaptain: false,
                options1: [],
                city: '',
                //等待状态
                etc: false,
                NotEtc: false,
                obj: '',
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                //有效期
                permitValidDate: '',
                licenseValidDate: '',
                idcardValidDate: '',
                //当前运营专员
                areaIds: '',
                names: '',
                id: '',
                //
                roleId: '01',
                areaId: '02',
                //父页面返回的数据
                all: '',
                //页面数据
                arr: [],
                token: '',
                activeName: '',
                labelPosition: 'right',
                dialogVisible: false,
                options: [],
                value: '',
                value1: '',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: '',
                    plateType: ''
                },
                form: {
                    type: [],
                    desc: ''
                },
                isBondTeam: '',
                rules: {
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个或填写其他原因', trigger: 'change'}
                    ],
                    desc: [
                        {required: false, message: '请输入未通过的原因', trigger: 'blur'},
                        {
                            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,
                            message: '不能包含特殊字符且不超过200个',
                            trigger: 'blur'
                        }
                    ],
                }
            };

        },
        created() {

            if (this.$route.query.info == 1) {
                this.shuow = true;
            }
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            //拿到父页面的 userid
            let all = JSON.parse(Base64.decode(sessionStorage.getItem('userid')));
            this.all = all;
            this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/driver_info', JSON.stringify({
                "token": this.token,
                "userId": this.all,
            })).then(run => {
                if (run.body.errcode == 0) {

                    //回显时间身份证有效期
                    this.formLabelAlign.name = run.body.result.idcardValidDate;
                    //回显驾驶证有效期
                    this.formLabelAlign.region = run.body.result.licenseValidDate;
                    //回显行驶证有效期
                    this.formLabelAlign.type = run.body.result.permitValidDate;
                    this.ruleForm = run.body.result
                }
                this.arr = run.body.result;
                console.log(this.arr.headPic);
                // alert(this.arr.headPic)

                this.value = run.body.result.currentDeveAdminName;
                this.city = run.body.result.usualRunArea;
                if (this.arr.driverType == "personal") {
                    this.arr.driverType = "个体司机"
                } else if (this.arr.driverType == "company") {
                    this.arr.driverType = "运输公司"
                } else if (this.arr.driverType == "team") {
                    this.arr.driverType = "车队司机"
                }
                ;


                let time = new Date().getTime();
                if (this.arr.headPic != '') {
                    this.arr.headPic = this.arr.headPic + '?timestamp=' + time;
                }
                this.imageList1.push(this.arr.idcardPositivePic + '?timestamp=' + time);
                this.imageList1.push(this.arr.idcardReversePic + '?timestamp=' + time);
                this.imageList1.push(this.arr.handingIdcardPic + '?timestamp=' + time);
                this.imageList1.push(this.arr.licensePic + '?timestamp=' + time);
                this.imageList1.push(this.arr.vehicleInsidePic + '?timestamp=' + time);
                this.imageList1.push(this.arr.vehicleSidePic + '?timestamp=' + time);
                this.imageList1.push(this.arr.permitPositivePic + '?timestamp=' + time);
                this.imageList1.push(this.arr.permitReversePic + '?timestamp=' + time);
                this.imageList1.push(this.arr.vehicleInsurancePic + '?timestamp=' + time);
                this.images = this.imageList;
                for (var i in this.imageList1) {
                    this.imageList.push({width: 1024, height: 1024, url: this.imageList1[i], pic: this.pic[i].aaa},)
                }
                ;
                // this.arr.vehicleType = JSON.parse(this.arr.vehicleType).name;
                if (this.arr.vehicleType != '' && this.arr.vehicleType != null && this.arr.vehicleType != undefined) {
                    this.arr.vehicleType = JSON.parse(run.body.result.vehicleType).name + ' '
                        + JSON.parse(run.body.result.vehicleType).isElectric + ' '
                        + JSON.parse(run.body.result.vehicleType).isTailBoard + ' '
                        + JSON.parse(run.body.result.vehicleType).length + ' '
                        + JSON.parse(run.body.result.vehicleType).isCertificate + ' '
                        + JSON.parse(run.body.result.vehicleType).isCold
                } else {
                    this.arr.vehicleType = ''
                }

                // if (run.body.result.isBondTeam == 'false'){
                //     this.$message({
                //         showClose: true,
                //         message: '该队长还没有绑定车队，请先去绑定车队',
                //         type: 'error'
                //     });
                //     setTimeout(()=>{
                //         this.$router.push({path:'/driverAttestation'});
                //     },2000)
                // }else if (run.body.result.isBondTeam == 'true') {
                //     this.isBondTeam = run.body.result.isBondTeam;
                //     this.value1 = run.body.result.team;
                //     this.value1Id = run.body.result.belongTeam;
                //     this.driverCaptain = true;
                // }
            });
            //获取下拉的内容&&所属车队
            setTimeout(() => {
                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/admin_list', JSON.stringify({
                    "token": this.token,
                    "usualRunArea": this.arr.usualRunArea,
                })).then(run => {
                    console.log(run);
                    console.log(this.value);
                    if (run.body.errcode == 0) {
                        this.options = run.body.result;
                    }
                });

                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/team/list', JSON.stringify({
                    "token": this.token,
                    "city": this.city,
                    "pageNum": '1',
                    "pageSize": '1000',
                }), {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        for (var i in res.body.result.list) {
                            this.options1.push({'id': res.body.result.list[i].id, 'name': res.body.result.list[i].team})
                        }
                    }
                })
            }, 1000);
        },
        methods: {
            //时间转化
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            //便更 的保存接口
            Preservation(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.value != undefined && this.value != '') {
                            for (var i in this.options) {
                                if (this.options[i].name == this.value) {
                                    this.areaIds = this.options[i].filialeId;
                                    this.names = this.options[i].areaName;
                                    this.id = this.options[i].id;
                                }
                            }
                        } else {
                            this.$message({
                                showClose: true,
                                message: '请选择运营专员',
                                type: 'error'
                            });
                            return false
                        }
                        this.$confirm('确认保存变更的司机信息？', {
                            confirmButtonText: '保存',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let page = JSON.stringify({
                                token: this.token,
                                plateType: this.ruleForm.plateType,       //--车牌类型（下拉框：01/黄牌，02/蓝牌，99/其它）
                                tonnage: this.ruleForm.tonnage,			//--车辆载质量（单位为千克，只能输入数字，包括小数）
                                roadTransportCertificateNumber: this.ruleForm.roadTransportCertificateNumber,	//--道路运输证号
                                currentDeveAdminId: this.id,				//--司机当前运营专员编号
                                currentDeveAdminName: this.value,		//--司机当前运营专员姓名
                                userId: this.arr.userId
                            });
                            this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/update', page, {
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            }).then(run => {
                                console.log(run);
                                if (run.body.errcode == 0) {
                                    this.$message({
                                        showClose: true,
                                        message: '保存成功！',
                                        type: 'success'
                                    });
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: '保存失败！',
                                        type: 'error'
                                    });
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消提交'

                            });
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //认证通过
            open2() {
                if (this.isBondTeam != 'true') {
                    this.value1Id = this.value1;
                }
                console.log(this.formLabelAlign.name);
                console.log(this.formLabelAlign.region);
                if (this.formLabelAlign.name == undefined || this.formLabelAlign.region == undefined || this.formLabelAlign.type == undefined) {
                    this.$message.error('请填写补充信息，内容不能为空！！');
                    return false
                }
                ;
                this.$confirm('确认司机通过认证？', {
                    confirmButtonText: '提交',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(this.value);
                    console.log(123);
                    if (this.value != undefined && this.value != '') {
                        for (var i in this.options) {
                            if (this.options[i].name == this.value) {
                                this.areaIds = this.options[i].filialeId;
                                this.names = this.options[i].areaName;
                                this.id = this.options[i].id;
                            }
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: '请选择运营专员',
                            type: 'error'
                        });
                        return false
                    }
                    this.etc = true;
                    this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/certify_yes', JSON.stringify({
                        "token": this.token,
                        "driverId": this.arr.driverId,
                        "userId": this.arr.userId,
                        "currentDeveAdminId": this.id,
                        "currentDeveAdminName": this.value,
                        "idcardValidDate": this.formLabelAlign.name,
                        "licenseValidDate": this.formLabelAlign.region,
                        "permitValidDate": this.formLabelAlign.type,
                        "certifyStatus": 2,
                        "plateType": this.ruleForm.plateType,       //--车牌类型（下拉框：01/黄牌，02/蓝牌，99/其它）
                        "tonnage": this.ruleForm.tonnage,			//--车辆载质量（单位为千克，只能输入数字，包括小数）
                        "roadTransportCertificateNumber": this.ruleForm.roadTransportCertificateNumber,	//--道路运输证号

                    })).then(run => {
                        console.log(run)
                        if (run.body.errcode == 0) {
                            this.$message({
                                showClose: true,
                                message: '提交成功',
                                type: 'success'
                            });
                            this.formLabelAlign = {};
                            setTimeout(() => {
                                this.$router.push({path: '/driverAttestation'});
                            }, 100)
                        } else {
                            this.$message({
                                showClose: true,
                                message: '认证失败,请返回重试',
                                type: 'error'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'

                    });
                })
            },
            //未通过
            NotThrough(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.NotEtc = true;
                        this.form.type.push(this.form.desc);
                        console.log(this.form.type);
                        let region = this.form.type.join(',');
                        console.log(region);
                        console.log(this.arr.driverId);
                        this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/certify_no', JSON.stringify({
                            "token": this.token,
                            "driverId": this.arr.driverId,
                            "notPassReason": region,
                            "certifyStatus": 3,
                            "userId": this.arr.userId,
                        })).then(run => {
                            console.log(run);
                            if (run.body.errcode == 0) {
                                this.$message({
                                    showClose: true,
                                    message: '提交成功！',
                                    type: 'success'
                                });
                                this.form = {};
                                this.$router.push({path: '/driverAttestation'});
                            }
                            ;
                        })
                    } else {
                        this.$message({
                            showClose: true,
                            message: '请填写未通过的原因',
                            type: 'error'
                        });
                        return false;
                    }
                });
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
        },
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD");
            }
        }
    }
</script>
<style lang="scss">
    .main {
        padding: 30px;
        .top {
            width: 100%;
            margin: 20px 0;
            padding: 20px;
            .tit {
                font-size: 20px;
                font-weight: lighter;
                padding: 20px 0;
                display: block;
            }
            .cont {
                background: white;
                .name {
                    font-weight: bold;
                    font-size: 20px;
                    display: block;
                    padding: 30px;
                }
                .table {
                    padding: 20px 5px;
                    display: block;
                    font-weight: bold;
                    font-size: 18px;
                }
                .oul {
                    overflow: hidden;
                    li {
                        float: left;
                        padding: 20px 10px;
                        span {
                            padding: 0 10px;
                            border-right: 1px solid #606266;
                        }
                    }
                }
                .sul{
                    li{
                        padding:20px;
                    }
                }
            }
            .bottom{
                .title{
                    display: block;
                    padding:20px 10px;
                    font-size: 18px;
                    font-weight: lighter;
                }
            }
        }
    }
</style>