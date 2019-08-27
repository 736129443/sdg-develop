<template>
    <div class="returnedmoneyinform main">
        <div class="header">
            当前位置：财务管理 > 客户财务 > 回款通知
        </div>
        <div style="width: 500px">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="position: relative">
                <el-form-item label="分公司">
                    <el-input v-model="form.filialeName" readonly></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="form.customerName" readonly></el-input>
                </el-form-item>
                <el-form-item label="付款账户名称" prop="repayAccountName">
                    <el-input v-model="form.repayAccountName"></el-input>
                </el-form-item>
                <el-form-item label="收款银行" prop="receiveBankName">
                    <el-input v-model="form.receiveBankName"></el-input>
                </el-form-item>
                <el-form-item label="收款账户名称" prop="receiveAccountName">
                    <el-input v-model="form.receiveAccountName"></el-input>
                </el-form-item>
                <el-form-item label="收款项目" prop="receiveProjectName">
                    <el-input v-model="form.receiveProjectName"></el-input>
                </el-form-item>

                <el-form-item label="回款日期" prop="repayTime">
                    <el-date-picker v-model="form.repayTime" type="date" placeholder="选择日期" :formatter="dateFormat"
                                    value-format="timestamp"></el-date-picker>
                </el-form-item>
                <el-form-item label="回款方式" prop="repayChannel">
                    <el-select v-model="form.repayChannel" placeholder="请选择收款方式">
                        <el-option label="线下-现金" value="underline_cash"></el-option>
                        <el-option label="线下-转帐" value="underline_transfer"></el-option>
                        <el-option label="线下-微信" value="underline_wechat"></el-option>
                        <el-option label="线下-支付宝" value="underline_alipay"></el-option>
                        <el-option label="线下-POS机刷卡" value="underline_pos"></el-option>
                        <el-option label="其他" value="other"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="开票税率">
                    <el-input v-model="form.taxRate" readonly></el-input>
                </el-form-item>
                <el-form-item label="还款方式" prop="repayWay">
                    <el-select v-model="form.repayWay" placeholder="请选择还款方式"
                               @change="form.repayMoney  = '',onrepayWay()">
                        <el-option label="自动还款" value="automatic" ></el-option>
                        <el-option label="指定还款" value="assign"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="账单时间" prop="checkedCities" v-if="form.repayWay== 'assign'">
                    <el-checkbox-group v-model="form.checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="i in cities" :label="i.month" :key="i.month">{{i.month | dateFrm}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="回款金额" prop="repayMoney">
                    <el-input v-model="form.repayMoney" :readonly="form.repayWay=='assign'"
                              @change="ismoney()"></el-input>

                    <!--<span style="color: red;font-size: 14px"-->
                          <!--v-if="form.repayWay== 'automatic'">最大开票金额 {{maxMoney}}</span>-->
                </el-form-item>
                <div style="margin-left: 120px;margin-bottom: 10px;position:absolute;top:550px;right: -550px;"
                     v-if="tableData.length!=0">
                    <el-table
                            :data="tableData"
                            style="width: 450px">
                        <el-table-column
                                prop="month"
                                align="center"
                                :formatter="dateFormat_a"
                                label="账单周期">
                        </el-table-column>
                        <el-table-column
                                prop="repayMoney"
                                align="center"
                                label="账单金额">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="finMoney"
                                label="还款金额">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                align="center"
                                label="是否结清">
                        </el-table-column>
                        <el-table-column
                                v-if="residueMoney "
                                prop="residueMoney"
                                align="center"
                                label="预存金额">
                        </el-table-column>
                    </el-table>
                </div>
                <el-form-item label="附件">
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

    export default {
        name: "returnedmoneyinform",
        created() {
            console.log(Base64.decode(this.$route.query.id));
            this.clienteleForm = JSON.parse(sessionStorage.getItem('clientelid')).clientelid;
            // console.log(this.clienteleForm);
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.form.filialeName = this.clienteleForm.filialeName;
            this.form.customerName = this.clienteleForm.customerName;
            if (this.clienteleForm.taxRate == undefined) {
                this.form.taxRate = '无税率'
            } else {
                this.form.taxRate = this.clienteleForm.taxRate;

            }
            console.log(this.cities);
            let page_l = JSON.stringify({
                token: this.token,
                id1: Base64.decode(this.$route.query.id)
            })
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/business/customerRepay/findCustomerRepayBill', page_l, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res) => {
                if (res.body.errcode == '-1'){
                    this.$message({
                        message: res.body.message,
                        type: 'error'
                    });
                    this.$router.push({path: '/clientele'});
                }else{
                    this.cities = res.body.result
                    this.maxMoney = this.cities[0].maxMoney
                    let arr = []
                    for (let i = 0; i <  this.cities.length; i++) {
                        arr.push(this.cities[i].month)
                    }
                    for(let i = 0 ; i < arr.length-1 ; i++){
                        for (let j = 0 ; j < arr.length - i - 1; j++) {
                            if (arr[j] > arr[j+1]) {
                                let max = arr[j]
                                arr[j] = arr[j+1]
                                arr[j+1] = max
                            }
                        }
                    }
                    let arr2 = []
                    for (let i = 0; i < this.cities.length; i++) {
                        for (let j = 0; j < arr.length; j++) {
                            if (arr[j] == this.cities[i].month) {
                                arr2.push(this.cities[i])
                            }
                        }
                    }
                    this.cities = arr2.reverse()
                    console.log(this.cities);
                }
            })
        },
        data() {
            return {
                findInvoice: '',
                ServerData: [],
                clienteleForm: {},
                sumMoney: '',
                form: {
                    repayAccountName: '',
                    receiveBankName: '',
                    receiveAccountName: '',
                    receiveProjectName: '',
                    repayTime: '',
                    repayChannel: '',
                    filialeName: '',
                    repayWay: 'automatic',
                    repayMoney: '',
                    customerBillTime: '',
                    resource: '',
                    remark: '',
                    checkedCities: [],

                },
                rules: {
                    repayChannel: [
                        {required: true, message: '请选择发票类别', trigger: 'change'}
                    ],
                    customerBillTime: [
                        {required: true, message: '请选择时间', trigger: 'change'},
                    ],
                    repayTime: [
                        {required: true, message: '请选择时间', trigger: 'change'},
                    ],
                    repayWay: [
                        {required: true, message: '请选择', trigger: 'change'},
                    ],
                    repayAccountName: [
                        {required: true, message: '请输入付款账户名称', trigger: 'blur'},
                        {pattern: /[\u4e00-\u9fa5a-zA-Z0-9（）/\-]/, message: '付款账户名称由字母，数字，汉字组成', trigger: 'blur'},
                        {min: 2, max: 50, message: '付款账户名称不能少于2个字符或多于50个字符', trigger: 'blur'}
                    ],
                    receiveAccountName: [
                        {required: true, message: '请输入收款账户名称', trigger: 'blur'},
                        {pattern: /[\u4e00-\u9fa5a-zA-Z0-9（）/\-]/, message: '收款账户名称由字母，数字，汉字组成', trigger: 'blur'},
                        {min: 2, max: 50, message: '收款账户名称不能少于2个字符或多于50个字符', trigger: 'blur'}
                    ],
                    receiveBankName: [
                        {required: true, message: '请输入收款银行名称', trigger: 'blur'},
                        {pattern: /[\u4e00-\u9fa5a-zA-Z0-9（）/\-]/, message: '收款银行名称由字母，数字，汉字组成', trigger: 'blur'},
                        {min: 2, max: 50, message: '收款银行名称不能少于2个字符或多于50个字符', trigger: 'blur'}
                    ],
                    receiveProjectName: [
                        {required: false, message: '请输入收款项目组名称', trigger: 'blur'},
                        {pattern: /[\u4e00-\u9fa5a-zA-Z0-9（）/\-]/, message: '收款项目组名称由字母，数字，汉字组成', trigger: 'blur'},
                        {min: 2, max: 50, message: '收款项目组名称不能少于2个字符或多于50个字符', trigger: 'blur'}
                    ],
                    repayMoney: [
                        {required: true, message: '请输入金额', trigger: 'blur'},
                        {
                            pattern: /(^[0-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                            message: '金额只能输入正数,或小数点后两位'
                        }
                    ],
                    resource: [
                        {required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    checkedCities: [
                        {required: true, message: '请选择时间', trigger: 'change'}
                    ],

                },
                fileLists: [],
                picListContract: [],
                succeedfileList: [],
                billtime: [],
                checkAll: false,
                isIndeterminate: true,
                // checkedCities: [],
                cities: [],
                assign: [],
                maxMoney: '',
                tableData: [],
                assign_a: [],
                residueMoney:false
            }
        },
        methods: {
            dateFormat_a: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM");
            },
            // createddata() {
            //     this.invoiceMoney = '';
            //     let page = JSON.stringify({
            //         token: this.token,
            //         id1: Base64.decode(this.$route.query.id)
            //     })
            //     this.$http.post(this.global.lightningUrl + '/companyv1/finance/invoice/findInvoice', page, {
            //         headers: {
            //             'Content-Type': 'application/json;charset=UTF-8'
            //         }
            //     }).then((res) => {
            //         console.log(res);
            //         if (res.body.errcode == 0) {
            //             this.form.makeType = res.body.result.makeType ;
            //             this.form.unit = res.body.result.makeSite ;
            //             this.form.name = res.body.result.companyName ;
            //             this.form.number = res.body.result.taxpayerIdentifNum ;
            //             this.form.site = res.body.result.registeredAddress ;
            //             this.form.phone = res.body.result.phone ;
            //             this.form.bank = res.body.result.openingBank ;
            //             this.form.bankcard = res.body.result.account ;
            //             this.form.tax = res.body.result.taxRate ;
            //             this.sumMoney = res.body.result.sumMoney ;
            //         } else if (res.body.errcode == -1) {
            //             this.$message({
            //                 showClose: true,
            //                 message: res.body.message,
            //                 type: 'error'
            //             });
            //             this.$router.push({path: '/clientele'});
            //             return false;
            //         }
            //     })
            // },
            ismoney() {
                var repay = this.form.repayMoney;
                //还有未还完的钱
                // 账单金额  repayMoney
                // 还款金额  finMoney
                // 预存金额  residueMoney

                this.assign = []
                    for (let i = 0; i < this.cities.length; i++) {
                        repay = repay - this.cities[i].repayMoney;
                        //前面所有账单已还清
                        if (repay >= 0) {
                            this.assign.push({
                                'status': 'fin',
                                'month': this.cities[i].month,
                                'repayMoney': this.cities[i].repayMoney,
                                'finMoney':0
                            })
                            if (repay == 0) {
                                break;
                            }
                            continue;
                        }
                        this.assign.push({
                            'status': 'not',
                            'month': this.cities[i].month,
                            'repayMoney': this.cities[i].repayMoney ,
                            'finMoney': repay
                        })
                        break;
                    }
                    if(repay > 0){
                        var arr =this.assign[this.assign.length -1] ;
                        // arr.status = 'out';
                        arr.residueMoney = repay.toFixed(2);
                    }
                    this.tableData = this.assign
                    let status = []
                    for (let i = 0; i < this.tableData.length; i++) {
                        // 账单金额  repayMoney 还款金额 finMoney  预存金额  residueMoney

                        this.tableData[i].status = this.tableData[i].status == 'fin' ? '已结清' : '未结清'

                        this.tableData[i].finMoney = (this.tableData[i].repayMoney + this.tableData[i].finMoney).toFixed(2);

                        // this.tableData[i].finMoney = this.tableData[i].finMoney.toFixed(2)
                        if (this.tableData[i].residueMoney == undefined){
                            status.push(this.tableData[i])
                        }
                    }
                console.log(this.tableData);
                if (status.length == this.tableData.length ){
                            this.residueMoney = false
                        }else{
                            this.residueMoney = true
                        }


                //console.log(status);
                // }
                // }
            },

            onrepayWay() {
                // if (this.form.repayWay == 'automatic'){
                this.assign = []
                this.tableData = []
                console.log(this.tableData);
                //     console.log(this.assign_a);
                //     for (let i = 0; i < this.tableData.length; i++) {
                //         this.tableData[i].finMoney = this.tableData[i].repayMoney+this.tableData[i].finMoney;
                //         this.tableData[i].status = this.tableData[i].status=='fin'?'已还清':'未还清' ;
                //         this.tableData[i].finMoney = this.tableData[i].finMoney.toFixed(2)
                //     }
                // }else{
                //     this.tableData = this.assign
                //     for (let i = 0; i < this.tableData.length; i++) {
                //         this.tableData[i].finMoney = this.tableData[i].repayMoney+this.tableData[i].finMoney;
                //         this.tableData[i].status = this.tableData[i].status=='fin'?'已还清':'未还清' ;
                //         this.tableData[i].finMoney = this.tableData[i].finMoney.toFixed(2)
                //     }
                // }
            },
            handleCheckAllChange(val) {
                let a = this.cities
                this.checkedCities = val ? a : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
                console.log(this.form.checkedCities);
                this.form.repayMoney = 0;
                this.assign = []
                for (let i = 0; i < this.cities.length; i++) {
                    for (let j = 0; j < this.form.checkedCities.length; j++) {
                        if (this.form.checkedCities[j] == this.cities[i].month) {
                            console.log(this.cities[i]);
                            this.assign.push({
                                'status': 'fin',
                                'month': this.form.checkedCities[j],
                                'repayMoney': this.cities[i].repayMoney,
                                'finMoney': 0,
                                'residueMoney':undefined,
                            })
                            this.form.repayMoney += this.cities[i].repayMoney
                        }
                    }
                }
                this.tableData = this.assign
                console.log(this.assign);
                let status = []
                for (let i = 0; i < this.tableData.length; i++) {
                    this.tableData[i].finMoney = this.tableData[i].repayMoney + this.tableData[i].finMoney;
                    this.tableData[i].status = this.tableData[i].status == 'fin' ? '已结清' : '未结清'
                    this.tableData[i].finMoney = this.tableData[i].finMoney
                    if (this.tableData[i].residueMoney == undefined){
                        status.push(this.tableData[i])
                    }

                }
                if (status.length == this.tableData.length ){
                    this.residueMoney = false
                }else{
                    this.residueMoney = true
                }

            },
            submitForm(form) {
                console.log(this.invoiceMoney);
                console.log(this.ServerData);
                var ServerData = [];
                for (let i in this.ServerData) {
                    ServerData.push(this.ServerData[i][0] + '~' + this.ServerData[i][1]);
                }
                var fileStr = ServerData.join(",");
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        // if (this.form.money > this.sumMoney) {
                        //     this.$message({
                        //         showClose: true,
                        //         // message: '当前票面金额不大于已出账金额this.sumMoney+'请重新输入',
                        //         message: `当前票面金额${this.form.money}不能大于已出账金额${this.sumMoney}`,
                        //         type: 'error'
                        //     });
                        //     return
                        // }

                        let page = JSON.stringify({
                            "token": this.token,
                            "customerId": this.clienteleForm.customerId,
                            "repayAccountName": this.form.repayAccountName,      //付款账户名称
                            "receiveAccountName": this.form.receiveAccountName,   //收款账户名称
                            "receiveBankName": this.form.receiveBankName,        //收款银行
                            "receiveProjectName": this.form.receiveProjectName,   //收款项目组
                            "repayTime": this.form.repayTime,          //收款日期
                            "repayChannel": this.form.repayChannel,      //收款方式(前台写死六种)
                            "repayMoney": this.form.repayMoney,     //收款金额
                            "repayWay": this.form.repayWay, //还款方式(automatic(自动还款) | assign(指定账单还款))
                            "customerBillTime":  JSON.stringify(this.tableData),//账单时间(当还款方式为自动还款的时候无账单时间)

                            "remark": this.form.remark,                //备注
                            "customerBillPic": fileStr
                        });
                        console.log(page);
                        this.$http.post(this.global.lightningUrl + '/companyv1/finance/business/customerRepay/customerBillRepayCommit', page, {
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
                                this.$router.push({path: '/clientele'});
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
            submitUpload() {
                console.log(this.picListContract);
                console.log(this.ServerData);
                if (this.picListContract.length == 0) {
                    return
                }
                let formdata = new FormData();

                for (let i = 0; i < this.picListContract.length; i++) {
                    formdata.append('file', this.picListContract[i].raw);
                }
                formdata.append('filePath', "repay_relation");

                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/file/upload', formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递fromdata
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.succeedfileList = res.body.result;
                        for (var i in this.succeedfileList) {
                            var arr = this.succeedfileList[i].name.split('~');
                            this.ServerData.push(arr);
                            this.fileLists.push({'name': arr[1], 'url': this.succeedfileList[i].url})
                        }
                        this.$message({
                            showClose: true,
                            message: res.body.message,
                            type: 'success'
                        });
                        this.picListContract = [];
                    }
                })
            },
            //限制最多上传文件个数
            exceedlimit() {
                this.$message({
                    message: '对不起，最大上传5个文件',
                    type: 'error'
                });
            },
            //删除文件
            handleRemove(file, fileList) {
                console.log(file, fileList);
                // var str = '';
                // for (var i in this.succeedfileList) {
                //     if (this.succeedfileList[i].url == file.url ){
                //         str = this.ServerData[i][0] + '~' + file.name;
                //         this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/file/reset', JSON.stringify({
                //             "filePath": "invoice_relation",
                //             "name": str
                //         })).then((res) => {
                //             console.log(res);
                //             if (res.body.errcode == 0) {
                //                 this.$message({
                //                     message: '删除成功！',
                //                     type: 'success'
                //                 });
                //             }
                //             this.ServerData.splice(i, 1);
                //             this.fileLists.splice(i, 1);
                //             this.picListContract.splice(i,1);
                //         })
                //     }
                // }


                this.picListContract = fileList;
                console.log(file, fileList);


                var str = '';
                for (var i in this.ServerData) {
                    if (file.name == this.ServerData[i][1]) {
                        console.log("文件已经上传过");
                        str = this.ServerData[i][0] + '~' + file.name;
                        this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/file/reset', JSON.stringify({
                            "filePath": "repay_relation",
                            "name": str
                        })).then((res) => {
                            console.log(res);
                            if (res.body.errcode == 0) {
                                this.$message({
                                    message: '删除成功！',
                                    type: 'success'
                                });
                                this.ServerData.splice(i, 1);
                                this.fileLists.splice(i, 1);
                                this.picListContract.splice(i, 1);

                            } else {
                                this.$message.error('删除失败！');
                            }
                        });
                        return;
                    } else {
                        console.log("文件没有上传过");
                    }
                }
            },
            //查看图片
            handlePreview(file) {
                console.log(file);
                if (this.succeedfileList.length == 0) {
                    var fileName = file.name.substring(file.name.lastIndexOf("."));
                    if ((fileName != '.jpg') && (fileName != '.png')) {
                        window.location.href = file.url;
                    } else {
                        let url = file.url;
                        window.open(url, '_blank')
                    }
                } else {

                    let fileUrl = '';
                    for (var j in this.succeedfileList) {
                        this.ServerData.push(this.succeedfileList[j].name.split('~'));
                        if (file.name == this.ServerData[j][1]) {
                            fileUrl = this.succeedfileList[j].url;
                            console.log(fileUrl);
                        }
                    }
                    var fileName = file.name.substring(file.name.lastIndexOf("."));
                    if ((fileName != '.jpg') && (fileName != '.png')) {
                        window.location.href = fileUrl;
                    } else {
                        window.open(fileUrl, '_blank');
                    }
                }
            },
            //
            onBeforeUpload(file) {
                console.log(file);
            },
            uniq(array) {

            },
            //限制文件格式
            Contracts(file, fileList) {
                console.log(file.name, fileList);
                var result = [];
                var obj = {};
                for (var i = 0; i < fileList.length; i++) {
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
                // for (var i in this.picListContract) {
                //     for (var j in  this.ServerData) {
                //         if (this.picListContract[i].name == this.ServerData[j][1]) {
                //             this.ServerData.splice(i, 1);
                //             this.picListContract.splice(i, 1);
                //             fileList.splice(i, 1);
                //             this.fileLists.splice(i, 1);
                //             console.log(this.picListContract);
                //             this.$message({
                //                 showClose: true,
                //                 message: '警告文件上传有重复文件，请删除后重新上传！',
                //                 type: 'warning'
                //             });
                //             return
                //         }
                //     }
                // }
                // console.log(this.picListContract.name);
                // console.log(this.ServerData);

                for (var i in this.picListContract) {
                    var fileName = this.picListContract[i].name.substring(this.picListContract[i].name.lastIndexOf("."));
                    if (this.picListContract[i].name.includes('~')) {
                        this.picListContract.splice(i, 1);
                        fileList.splice(i, 1);
                        this.$message({
                            showClose: true,
                            message: '对不起文件名不能带特殊字符！',
                            type: 'error'
                        });
                        return false
                    } else {
                        if ((fileName != '.jpg') && (fileName != '.png') && (fileName != '.zip') && (fileName != '.docx') &&
                            (fileName != '.xlsx') && (fileName != '.pdf') && (fileName != '.rar')) {
                            this.picListContract.splice(i, 1);
                            fileList.splice(i, 1);
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
                            fileList.splice(i, 1);
                            this.$message({
                                showClose: true,
                                message: '对不起，您上传的文件大小为' + size + '文件大小超出10M。上传失败！',
                                type: 'error'
                            });
                            return false
                        }
                    }
                    console.log(this.picListContract);
                }
            },
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            //转大写
            convertCurrency(moneys) {
                //汉字的数字
                var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
                //基本单位
                var cnIntRadice = new Array('', '拾', '佰', '仟');
                //对应整数部分扩展单位
                var cnIntUnits = new Array('', '万', '亿', '兆');
                //对应小数部分单位
                var cnDecUnits = new Array('角', '分', '毫', '厘');
                //整数金额时后面跟的字符
                var cnInteger = '整';
                //整型完以后的单位
                var cnIntLast = '元';
                //最大处理的数字
                var maxNum = 999999999999999.9999;
                //金额整数部分
                var integerNum;
                //金额小数部分
                var decimalNum;
                //输出的中文金额字符串
                var chineseStr = '';
                //分离金额后用的数组，预定义
                var parts;
                if (money == '') {
                    return '';
                }
                money = parseFloat(money);
                if (money >= maxNum) {
                    //超出最大处理数字
                    return '';
                }
                if (money == 0) {
                    chineseStr = cnNums[0] + cnIntLast + cnInteger;
                    return chineseStr;
                }
                //转换为字符串
                money = money.toString();
                if (money.indexOf('.') == -1) {
                    integerNum = money;
                    decimalNum = '';
                } else {
                    parts = money.split('.');
                    integerNum = parts[0];
                    decimalNum = parts[1].substr(0, 4);
                }
                //获取整型部分转换
                if (parseInt(integerNum, 10) > 0) {
                    var zeroCount = 0;
                    var IntLen = integerNum.length;
                    for (var i = 0; i < IntLen; i++) {
                        var n = integerNum.substr(i, 1);
                        var p = IntLen - i - 1;
                        var q = p / 4;
                        var m = p % 4;
                        if (n == '0') {
                            zeroCount++;
                        } else {
                            if (zeroCount > 0) {
                                chineseStr += cnNums[0];
                            }
                            //归零
                            zeroCount = 0;
                            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                        }
                        if (m == 0 && zeroCount < 4) {
                            chineseStr += cnIntUnits[q];
                        }
                    }
                    chineseStr += cnIntLast;
                }
                //小数部分
                if (decimalNum != '') {
                    var decLen = decimalNum.length;
                    for (var i = 0; i < decLen; i++) {
                        var n = decimalNum.substr(i, 1);
                        if (n != '0') {
                            chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                        }
                    }
                }
                if (chineseStr == '') {
                    chineseStr += cnNums[0] + cnIntLast + cnInteger;
                } else if (decimalNum == '') {
                    chineseStr += cnInteger;
                }
                return chineseStr;
            }
        },
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD")
            },
            dateFrmHm: function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm")
            }
        }
    }
</script>

<style scoped lang="scss">
    .returnedmoneyinform {
        .header {
            margin-bottom: 20px;
        }
    }
</style>