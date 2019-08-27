<template>
    <div class="main applyforinvoice">
        <div class="header">
            当前位置：财务管理 > 客户财务 > 申请开票
        </div>
        <div style="width: 500px">
            <el-form ref="form" :model="form" :rules="rules" label-width="160px">
                <el-form-item label="分公司">
                    <el-input v-model="form.filialeName" readonly></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="form.customerName" readonly></el-input>
                </el-form-item>
                <el-form-item label="账单周期" prop="time">
                    <el-date-picker v-model="form.time" type="daterange"  range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" disabled>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="预计回款日期" prop="time1">
                    <el-date-picker v-model="form.time1" type="date" placeholder="选择日期"
                                    value-format="timestamp"></el-date-picker>
                </el-form-item>
                <el-form-item label="发票类别" prop="makeType">
                    <el-select v-model="form.makeType" placeholder="请选择发票类别">
                        <el-option label="增值税普通发票" value="增值税普通发票"></el-option>
                        <el-option label="增值税专用发票" value="增值税专用发票"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="开票单位" prop="unit">
                    <el-select v-model="form.unit" placeholder="请选择开票单位">
                        <el-option label="全达货运" value="全达货运"></el-option>
                        <el-option label="闪电狗科技" value="闪电狗科技"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户开票名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="纳税人识别号" prop="number">
                    <el-input v-model="form.number"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="site"
                              :rules="form.makeType === '增值税专用发票'?rules.site:[{ required: false, message: '请输入地址', trigger: 'blur' }]">
                    <el-input v-model="form.site"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone"
                              :rules="form.makeType === '增值税专用发票'?rules.phone:[{ required: false, message: '请输入电话', trigger: 'blur' }]">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="开户银行" prop="bank">
                    <el-input v-model="form.bank"></el-input>
                </el-form-item>
                <el-form-item label="银行账号" prop="bankcard">
                    <el-input v-model="form.bankcard "></el-input>
                </el-form-item>

                <el-form-item label="税点" prop="tax">
                    <el-select v-model="form.tax" placeholder="请选择税点">
                        <el-option label="0.1" value="0.1"></el-option>
                        <el-option label="0.2" value="0.2"></el-option>
                        <el-option label="0.06" value="0.06"></el-option>
                        <el-option label="0.09" value="0.09"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="票面金额" prop="money">

                    <el-input v-model="form.money "></el-input>
                    <span style="color: red;font-size: 14px">(当前项目可开票金额为:{{sumMoney}})</span>
                </el-form-item>
                <el-form-item label="票面备注" prop="moneyremark">
                    <el-input v-model="form.moneyremark"></el-input>
                </el-form-item>
                <div style="background-color: rgb(228, 222, 222);padding:15px 10px 15px 0;margin-bottom: 10px">
                    <div style="padding: 0 0 10px 120px;color: #606266;font-size: 14px">快递信息</div>
                    <el-form-item label="收件人姓名" prop="recipientsmessage">
                        <el-input v-model="form.recipientsmessage" @change="Up_date()"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人地址" prop="receiverAddr">
                        <el-input v-model="form.receiverAddr"  @change="Up_date()"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人电话" prop="receiverPhone">
                        <el-input v-model="form.receiverPhone"  @change="Up_date()"></el-input>
                    </el-form-item>
                </div>
                <div style="position: relative">
                    <span style="color: red;position: absolute;top:10px;left:68px;">*</span>
                    <el-form-item label="客户对账单">
                        <el-upload
                                class="upload-demo"
                                style="float: left;"
                                ref="upload"
                                :limit="5"
                                :on-exceed="exceedlimit"
                                action="javascript:;"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-change="Contracts"
                                :file-list="fileLists"
                                :before-upload="onBeforeUpload"
                                :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">统一上传文件
                            </el-button>

                            <div slot="tip" class="el-upload__tip">支持jpg、png、word、excel、zip、pdf，最多添加5份</div>
                        </el-upload>
                    </el-form-item>
                </div>
                <div style="position: relative">
                    <span style="color: red;position: absolute;top:10px;left:12px;">*</span>
                    <el-form-item label="客户开票信息确认函">
                        <el-upload
                                class="upload-demo"
                                style="float: left;"
                                ref="upload"
                                :limit="5"
                                :on-exceed="exceedlimit1"
                                action="javascript:;"
                                :on-preview="handlePreview1"
                                :on-remove="handleRemove1"
                                :on-change="Contracts1"
                                :file-list="fileLists1"
                                :before-upload="onBeforeUpload1"
                                :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload1">统一上传文件
                            </el-button>

                            <div slot="tip" class="el-upload__tip">支持jpg、png、word、excel、zip、pdf，最多添加5份</div>
                        </el-upload>
                    </el-form-item>
                </div>


                <el-form-item label="备注">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :rows="2" v-model="form.remark"
                              resize="none"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import {upload,exceedlimit,handleRemove,handlePreview,Contracts,Contracts1,upload1,handlePreview1} from "../../js/upload";
    export default {
        name: "applyforinvoice",
        created() {
            console.log(Base64.decode(this.$route.query.id));
            this.clienteleForm = JSON.parse(sessionStorage.getItem('clientelid')).clientelid;
            console.log(this.clienteleForm);
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.form.filialeName = this.clienteleForm.filialeName;
            this.form.customerName = this.clienteleForm.customerName;
            let data = [];
            data[0] =  this.clienteleForm.billStartTime;
            data[1] = this.clienteleForm.billEndTime;
            this.form.time = data;
            this.createddata()
        },
        data() {
            return {

                findInvoice: '',
                ServerData: [],
                ServerData1: [],
                clienteleForm: {},
                sumMoney:'',
                form: {
                    time: '',
                    time1: '',
                    makeType: '',
                    unit: '',
                    name: '',
                    number: '',
                    site: '',
                    phone: '',
                    bank: '',
                    bankcard: '',
                    tax: '0.09',
                    money: '',
                    moneyremark: '',
                    receiverName: '',
                    remark: '',
                    recipientsmessage:'',
                    receiverAddr:'',
                    receiverPhone:''
                },
                rules: {
                    makeType: [
                        {required: true, message: '请选择发票类别', trigger: 'change'}
                    ],
                    tax: [
                        {required: true, message: '请选择税点', trigger: 'change'}
                    ],
                    site: [
                        {required: true, message: '请输入地址', trigger: 'blur'},
                        {pattern: /^.{2,50}$/, message: '地址由字母、数字或组合组成', trigger: 'blur'},
                    ],
                    receiverAddr: [
                        {required: true, message: '请输入地址', trigger: 'blur'},
                        {pattern: /^.{2,50}$/, message: '地址由字母、数字或组合组成', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入电话', trigger: 'blur'},
                        {pattern: /^[\d-]{1,14}$/, message: '电话格式不正确', trigger: 'blur'}
                    ],
                    receiverPhone: [
                        {required: true, message: '请输入电话', trigger: 'blur'},
                        {pattern: /^[\d-]{1,14}$/, message: '电话格式不正确', trigger: 'blur'}
                    ],
                    time: [
                        {required: true, message: '请选择时间', trigger: 'change'},
                    ],
                    time1: [
                        {required: true, message: '请选择时间', trigger: 'change'},
                    ],
                    unit: [
                        {required: true, message: '请输入开票单位', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入客户开票名称', trigger: 'blur'},
                        {pattern: /^.{2,50}$/, message: '客户开票名称不能少于2个字符或多于50个字符', trigger: 'blur'},
                    ],
                    number: [
                        {required: true, message: '请输入纳税人识别号', trigger: 'blur'},
                        {pattern: /^([A-Za-z]|[0-9]){2,50}$/, message: '纳税人识别号由字母、数字或组合组成', trigger: 'blur'},
                        {min: 2, max: 50, message: '纳税人识别号不能少于2个字符或多于50个字符', trigger: 'blur'}
                    ],
                    bank: [
                        {required: true, message: '请输入开户银行', trigger: 'blur'},
                        {pattern: /[\u4e00-\u9fa5a-zA-Z0-9（）/\-]/, message: '开户银行由字母，数字，汉字组成', trigger: 'blur'},
                        {min: 2, max: 50, message: '开户银行名称不能少于2个字符或多于50个字符', trigger: 'blur'}
                    ],
                    bankcard: [
                        {required: true, message: '请输入银行卡号', trigger: 'blur'},
                        {pattern: /^[\d-]{5,50}$/, message: '银行卡号不规范', trigger: 'blur'},
                    ],
                    money: [
                        {required: true, message: '请输入金额', trigger: 'blur'},
                        {
                            pattern: /(^[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                            message: '金额只能输入正数,或小数点后两位'
                        }
                    ],
                    moneyremark:[
                        { required: true, message: '请输入票面备注', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    recipientsmessage: [
                        {required: true, message: '请输入收件人信息', trigger: 'blur'},
                        {pattern: /^.{2,50}$/, message: '收件人信息由字母、数字或组合组成', trigger: 'blur'},
                    ]

                },
                fileLists: [],
                fileLists1: [],
                picListContract: [],
                picListContract1: [],
                succeedfileList: [],
                succeedfileList1: []
            }
        },
        methods: {
            Up_date(){
                this.$forceUpdate()
            },
            createddata() {
                this.invoiceMoney = '';
                let page = JSON.stringify({
                    token: this.token,
                    id2: Base64.decode(this.$route.query.id2),
                    id1: Base64.decode(this.$route.query.id1)
                })
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/invoice/findInvoice', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {

                        this.form.makeType = res.body.result.makeType ;
                        this.form.unit = res.body.result.makeSite ;
                        this.form.name = res.body.result.companyName ;
                        this.form.number = res.body.result.taxpayerIdentifNum ;
                        this.form.site = res.body.result.registeredAddress ;
                        this.form.phone = res.body.result.phone ;
                        this.form.bank = res.body.result.openingBank ;
                        this.form.bankcard = res.body.result.account ;
                        this.form.tax = res.body.result.taxRate ;
                        this.sumMoney = res.body.result.sumMoney ;
                        this.form.recipientsmessage = res.body.result.receiveName;//收件人姓名
                        this.form.receiverPhone = res.body.result.receivePhone;//收件人电话
                        this.form.receiverAddr = res.body.result.receiveAddress;//收件人地址
                    } else if (res.body.errcode == -1) {
                        this.$message({
                            showClose: true,
                            message: res.body.message,
                            type: 'error'
                        });
                        this.$router.push({path: '/clientReconciliationeq'});
                        return false;
                    }
                })
            },
            submitForm(form) {
                console.log(this.form.time == null ? undefined : this.form.time[1] );
                if (this.succeedfileList.length == 0  ) {
                    this.$message({
                        showClose: true,
                        message: '请点击上传客户对账单',
                        type: 'error'
                    });
                    return
                }else if (this.succeedfileList1.length == 0) {
                    this.$message({
                        showClose: true,
                        message: '请点击上传客户开票信息确认函',
                        type: 'error'
                    });
                    return
                }
                console.log(this.invoiceMoney);
                console.log(this.ServerData);
                var ServerData = [];
                for (let i in this.ServerData) {
                    ServerData.push(this.ServerData[i][0] + '~' + this.ServerData[i][1]);
                }
                var fileStr = ServerData.join(",");
                //er
                var ServerData1 = [];
                for (let i in this.ServerData1) {
                    ServerData1.push(this.ServerData1[i][0] + '~' + this.ServerData1[i][1]);
                }
                var fileStr1 = ServerData1.join(",");
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        if (this.form.money > this.sumMoney) {
                            this.$message({
                                showClose: true,
                                // message: '当前票面金额不大于已出账金额this.sumMoney+'请重新输入',
                                message: `当前票面金额${this.form.money}不能大于已出账金额${this.sumMoney}`,
                                type: 'error'
                            });
                            return
                        }
                        let page = JSON.stringify({
                            "token": this.token,
                            "customerId": this.clienteleForm.customerId,   //项目编号
                            "customerName": this.form.customerName,  //项目名称
                            "billStartTime": this.form.time == null ? undefined : this.form.time[0],    //账单开始时间
                            "billEndTime": this.form.time == null ? undefined : this.form.time[1],      //账单结束时间
                            "predictReturnTime": this.form.time1 + 1000 * 60 * 60 * 24 - 1,//预计回款时间
                            "makeType": this.form.makeType,       //开票类别
                            "makeSite": this.form.unit,     //开票单位
                            "companyName": this.form.name,  //客户开票名称
                            "taxpayerIdentifyNum": this.form.number, //纳税人识别码
                            "address": this.form.site,           //地址
                            "phone": this.form.phone,            //电话
                            "openingBank": this.form.bank,      //开户银行
                            "openingBankAccount": this.form.bankcard, //开户行账号
                            "taxRate": this.form.tax,                    //税率
                            "invoiceMoney": this.form.money,                 //票面金额
                            "invoiceRemark": this.form.moneyremark,      //开票备注
                            "receiverName": this.form.recipientsmessage,            // 接收人姓名
                            "receiverAddr": this.form.receiverAddr,            // 接收人地址
                            "receiverPhone": this.form.receiverPhone,            // 接收人电话
                            "otherRemark": this.form.remark,    //其他备注
                            "reconciliationNumbers": fileStr,
                            makeInvoiceAffirm:fileStr1,
                            "billId":Base64.decode(this.$route.query.id2)
                        });
                        this.$http.post(this.global.lightningUrl + '/companyv1/finance/invoice/commitApply', page, {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            console.log(res);
                            if (res.body.errcode == 0) {
                                this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'success'
                                });
                                this.$router.push({path: '/clientReconciliationeq'});
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'error'
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //上传
            submitUpload(){
                upload(this,this.picListContract,this.succeedfileList,this.ServerData,this.fileLists);
            },
            //限制最多上传文件个数
            exceedlimit(){
                exceedlimit(this,5);
            },
            //删除文件
            handleRemove(file, fileList){
                handleRemove(file, fileList,this,this.picListContract,this.ServerData,this.fileLists)
            },
            //查看图片
            handlePreview(file){
                handlePreview(file,this,this.succeedfileList,this.ServerData)
            },
            //限制文件格式
            Contracts(file, fileList){
                Contracts(file, fileList,this,this.picListContract)
            },
            onBeforeUpload(file) {
                console.log(file);
            },
            //上传
            submitUpload1(){
                upload1(this,this.picListContract1,this.succeedfileList1,this.ServerData1,this.fileLists1);
            },
            //限制最多上传文件个数
            exceedlimit1(){
                exceedlimit(this,5);
            },
            //删除文件
            // handleRemove1(file, fileList){
            //     handleRemove(file, fileList,this,this.picListContract1,this.ServerData1,this.fileLists1)
            // },
            handleRemove1(file, fileList) {
                this.picListContract1 = fileList;
                var str = '';
                console.log(file, fileList);
                for (var i in this.ServerData1) {
                    if (file.name == this.ServerData1[i][1]) {
                        console.log("文件已经上传过");

                        str = this.ServerData1[i][0] + '~' + file.name;
                        this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/file/reset', JSON.stringify({
                            "filePath": "invoice_relation",
                            "name": str
                        })).then((res) => {
                            console.log(res);
                            if (res.body.errcode == 0) {
                                this.$message({
                                    message: '删除成功！',
                                    type: 'success'
                                });
                                this.ServerData1.splice(i, 1);
                                this.fileLists1.splice(i, 1);
                                this.picListContract1.splice(i, 1);
                            } else {
                                this.$message.error('删除失败！');
                            }
                        });
                        return;
                    }
                }
            },
            //查看图片
            handlePreview1(file){
                handlePreview1(file,this,this.succeedfileList1,this.ServerData1)
            },
            //限制文件格式
            Contracts1(file, fileList){
                Contracts1(file, fileList,this,this.picListContract1)
            },
            onBeforeUpload1(file) {
                console.log(file);
            },

        }
    }
</script>

<style scoped lang="scss">
    .applyforinvoice {
        .header {
            margin-bottom: 20px;
        }
    }
</style>