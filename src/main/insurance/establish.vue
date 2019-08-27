<template>
    <div class="main">
        <div class="header">当前位置： 事故中心 > 创建(客服) </div>
        <div class="center" style="background-color: white;width: 100%;height: 100%">
            <el-form :inline="true" :model="formInline"  :rules="rules"  ref="formInline"  class="demo-form-inline" :label-position="labelPosition" label-width="150px" >
                <el-col :span="24" style="margin-bottom: 20px">
                <el-form-item label="事故反馈来源"  prop="reportSource">
                    <el-select v-model="formInline.reportSource" placeholder="请选择">
                        <el-option label="司机" value="司机"></el-option>
                        <el-option label="运营" value="运营"></el-option>
                        <el-option label="项目" value="项目"></el-option>
                        <el-option label="客户" value="客户"></el-option>
                        <el-option label="收货人" value="收货人"></el-option>
                        <el-option label="法务" value="法务"></el-option>
                        <el-option label="风控" value="风控"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="事故反馈方式" prop="reportStyle">
                    <el-select v-model="formInline.reportStyle" placeholder="请选择">
                        <el-option label="400热线" value="400热线"></el-option>
                        <el-option label="其他" value="其他"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="事故发生时间" prop="accidentTime">
                    <el-date-picker
                            v-model="formInline.accidentTime"
                            type="datetime"
                            value-format="timestamp"
                            :picker-options="pickerOptions0"
                            placeholder="选择日期时间"
                            default-time="12:00:00">
                    </el-date-picker>
                </el-form-item>
                </el-col>
                <el-col :span="24"  style="margin-bottom: 20px">
                    <el-form-item label="事故类型" prop="accidentType">
                        <el-select v-model="formInline.accidentType" placeholder="请选择">
                            <el-option label="货损" value="货损"></el-option>
                            <el-option label="货丢" value="货丢"></el-option>
                            <el-option label="少货未点清" value="少货未点清"></el-option>
                            <el-option label="送错货" value="送错货"></el-option>
                            <el-option label="交通事故" value="交通事故"></el-option>
                            <el-option label="其他" value="其他"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="事故反馈人" prop="reporter">
                        <el-input v-model="formInline.reporter" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="事故反馈人电话" prop="reporterPhone" >
                        <el-input v-model="formInline.reporterPhone" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24"  style="margin-bottom: 20px" >
                <el-form-item label="事故描述" prop="accidentDescription">
                    <el-input type="textarea" v-model="formInline.accidentDescription" placeholder="请输入事故描述..." :rows="5" resize="none" ></el-input>
                </el-form-item>
                </el-col>



                <el-col :span="24"  style="margin-bottom: 20px">
                <el-form-item label="出车单编号">
                    <el-input v-model="formInline.trackId" placeholder="出车单编号" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认</el-button>
                    <!--<el-button type="primary"  @click="dialogTableVisible = true">选择事故出车任务</el-button>-->
                </el-form-item>
                </el-col>
                <el-col :span="24" >
                <!--<el-form-item>-->
                    <el-table
                            :data="tableData"
                            style="width: 100%;margin-bottom: 20px">
                        <el-table-column
                                prop="driverName"
                                label="司机姓名"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="driverPhone"
                                label="司机电话"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="adminName"
                                align="center"
                                label="运营专员">
                        </el-table-column>
                        <el-table-column
                                prop="adminPhone"
                                align="center"
                                label="运营电话">
                        </el-table-column>
                        <el-table-column
                                prop="projectName"
                                align="center"
                                label="运营专员">
                        </el-table-column>
                        <el-table-column
                                prop="projectPhone"
                                align="center"
                                label="项目电话">
                        </el-table-column>
                        <el-table-column
                                prop="insuranceNameCustomer"
                                align="center"
                                label="客户投保">
                        </el-table-column>
                        <el-table-column
                                prop="isInsurance"
                                align="center"
                                label="客户是否投保">
                        </el-table-column>
                        <el-table-column
                                prop="insuranceNameDriver"
                                align="center"
                                label="司机投保">
                        </el-table-column>
                        <!--是-->
                        <el-table-column
                                prop="yes"
                                align="center"
                                label="司机是否投保">
                            <!--<template slot-scope="scope" v-if="arr.length == 1">-->
                                <!--<span>是</span>-->
                            <!--</template>-->
                        </el-table-column>
                    </el-table>
                    <!--<el-pagination-->
                            <!--@current-change="handleCurrentChange"-->
                            <!--:current-page.sync="currentPage"-->
                            <!--:page-size="pagesize"-->
                            <!--layout="total, prev, pager, next"-->
                            <!--style="margin-bottom: 20px"-->
                            <!--:total="total">-->
                    <!--</el-pagination>-->
                <!--</el-form-item>-->

                </el-col>
                <el-col :span="24" :offset="11">
                <el-form-item>
                    <el-button type="primary" @click="submit('formInline')" v-if="save==true?true:false">保存</el-button>
                    <el-button type="primary" :loading="true" v-if="save==true?false:true">保存中</el-button>
                </el-form-item>
                </el-col>
            </el-form>
            <!--弹出-->
            <el-dialog title='选择事故出车任务' :visible.sync="dialogTableVisible"  width="55%">
                <el-form :inline="true" :model="formInline1" class="demo-form-inline">
                    <el-form-item label="出车日期">
                        <el-date-picker
                                v-model="formInline1.value3"
                                type="datetime"
                                value-format="timestamp"
                                placeholder="选择日期时间"
                                default-time="12:00:00">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="司机姓名">
                        <el-input v-model="formInline1.name" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item label="出车单号">
                        <el-input v-model="formInline1.name" placeholder="请输入" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>

                <el-table :data="gridData" highlight-current-row >
                    <el-table-column property="date" label="出车单号" align="center"></el-table-column>
                    <el-table-column property="name" label="出车时间" align="center"></el-table-column>
                    <el-table-column property="address" label="到仓时间" align="center"></el-table-column>
                    <el-table-column property="address" label="司机姓名" align="center"></el-table-column>
                    <el-table-column property="address" label="司机电话" align="center"></el-table-column>
                    <el-table-column property="address" label="项目名称" align="center"></el-table-column>
                    <el-table-column property="address" label="线路名称" align="center"></el-table-column>
                </el-table>
                <el-pagination
                        @current-change="handleCurrentChange1"
                        :current-page.sync="currentPage1"
                        :page-size="pagesize1"
                        layout="total, prev, pager, next"
                        :total="total1">
                </el-pagination>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        created(){
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
        },

        data (){
            return{

                token:'',
                labelPosition: 'right',
                formInline:{},
                tableData:[
                ],
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
                dialogTableVisible:false,
                gridData:[{}],
                formInline1:{},
                total1:0,
                currentPage1:1,
                pagesize1:10,//每页的数据条数
                save:true,
                arr:'',
                rules: {
                    reportSource: [
                        {required: true, message: '请选择事故反馈来源', trigger: 'change'}
                    ],
                    reportStyle: [
                        {required: true, message: '请选择事故反馈方式', trigger: 'change'}
                    ],
                    accidentTime: [
                        {required: true, message: '请选择事故发生时间', trigger: 'change'}
                    ],
                    accidentType: [
                        {required: true, message: '请选择事故类型', trigger: 'change'}
                    ],
                    reporter: [
                        { required: true, message: '请输入事故反馈人', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]){2,50}$/ , message: '请输入正确事故反馈人姓名', trigger: 'blur' }
                    ],
                    reporterPhone: [
                        { required: true, message: '请输入事故反馈人电话', trigger: 'blur' },
                        {pattern: /^((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8})$/ , message: '请输入正确手机号格式', trigger: 'blur' }
                    ],
                    accidentDescription:[
                        { required: true, message: '请输入事故描述', trigger: 'blur' },
                        { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。.\-，、？\n\r ]*$/ , message: '内容不规范', trigger: 'blur' }
                    ]
                } ,
                string:'',
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now()
                    }
                },
            }
        },
        methods:{
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            onSubmit ( ) {
                let page = JSON.stringify({
                    token : this.token,
                    trackId:this.formInline.trackId
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/trunkCenter/transport/track/accident/get',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    this.arr =[];
                    this.arr.push(res.body.result);
                    if (this.arr.length == 0){
                        this.arr = []

                    }
                    if ( res.body.message=='暂无符合条件的数据') {
                        this.$message('该出车单暂无信息');
                    }
                    this.string = res.body.message;
                    this.tableData = this.arr;
                    if (this.tableData.length !=0){
                        if (this.tableData[0].adminPhone=='null'){
                            this.tableData[0].adminPhone = ''
                        }
                        if (this.tableData[0].adminName=='null'){
                            this.tableData[0].adminName = ''
                        }
                        if (this.tableData[0].driverName=='null'){
                            this.tableData[0].driverName = ''
                        }
                        if (this.tableData[0].driverPhone=='null'){
                            this.tableData[0].driverPhone = ''
                        }
                        if (this.tableData[0].projectName=='null'){
                            this.tableData[0].projectName = ''
                        }
                        if (this.tableData[0].projectPhone=='null'){
                            this.tableData[0].projectPhone = ''
                        }
                        // 3218101300066001
                        if (this.tableData[0].insuranceNameCustomer != ''||this.tableData[0].insuranceNameCustomer!=undefined ) {
                            if (this.tableData[0].insuranceNameCustomer != null) {
                                this.tableData[0].insuranceNameCustomer = this.tableData[0].insuranceNameCustomer.substr(1);
                            } else {
                                this.tableData[0].insuranceNameCustomer = ''
                            }
                        }

                        if (this.tableData[0].insuranceNameDriver != ''||this.tableData[0].insuranceNameDriver!=undefined ) {
                            if (this.tableData[0].insuranceNameDriver != null) {
                                this.tableData[0].insuranceNameDriver = this.tableData[0].insuranceNameDriver.substr(1);
                            } else {
                                this.tableData[0].insuranceNameDriver = ''
                            }
                        }
                        if (this.tableData[0].isInsurance == 'null' || this.tableData[0].isInsurance == undefined){
                            this.tableData[0].isInsurance = '否'
                        } else {
                            this.tableData[0].isInsurance = '是'
                        }
                        this.tableData[0].yes ='是'
                    }

                })
            },
            sub(){
                alert(1)
            },
            handleCurrentChange(val){
            },
            handleCurrentChange1(val){
            },
            submit(formInline){

                this.$refs[formInline].validate((valid) => {
                    if (valid) {
                        if (this.string !='暂无符合条件的数据'){
                            this.save=false;
                            //     console.log(this.arr[0].insuranceNameDriver);
                            let isCustomerInsure
                            if (this.tableData[0].isInsurance == '是'){
                                isCustomerInsure = 1
                            } else {
                                isCustomerInsure = 0
                            }
                            if (this.tableData[0].yes=='是') {
                                this.tableData[0].yes=1
                            }
                            console.log(this.arr[0].insurancePriceDriver);
                            let page = JSON.stringify({
                                token : this.token,
                                reportSource : this.formInline.reportSource,
                                reportStyle : this.formInline.reportStyle,
                                accidentTime : this.formInline.accidentTime,
                                accidentType : this.formInline.accidentType,
                                reporter : this.formInline.reporter,
                                reporterPhone : this.formInline.reporterPhone,
                                accidentDescription : this.formInline.accidentDescription,
                                trackId:this.arr[0].trackId,
                                driverInsurance : this.arr[0].insuranceNameDriver,
                                isDriverInsure : 1,
                                isCustomerInsure : isCustomerInsure,
                                driverInsuranceMoney : this.arr[0].insurancePriceDriver,
                                projectType : this.arr[0].projectType,
                                customerInsurance : this.arr[0].insuranceNameCustomer,
                                customerName : this.arr[0].customerName,
                                adminName : this.arr[0].adminName,
                                customerOffice : this.arr[0].manageArea,
                                saleAdmin : this.arr[0].saleName,
                                customerInsuranceMoney : this.arr[0].insurancePriceCustomer,
                                adminPhone : this.arr[0].adminPhone,
                                driverName : this.arr[0].driverName,
                                driverPhone : this.arr[0].driverPhone,
                                projectName : this.arr[0].projectName,
                                projectPhone : this.arr[0].projectPhone,
                            });
                            this.$http.post(this.global.lightningUrl + '/companyv1/insurance/customerService/create',page,{
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            }).then((res)=>{
                                console.log(res);
                                if(res.body.errcode == 0){
                                    this.$message({
                                        message: '保存成功！',
                                        type: 'success'
                                    });
                                    this.save=true;
                                    setTimeout((res)=>{
                                        this.$router.push(
                                            {
                                                name: 'accidentcentre',
                                            });
                                    },1000)

                                }else {
                                    this.save=true;
                                    this.$message.error('保存失败，不能重复创建');
                                }
                            })
                        }else {
                            this.$message({
                                message: '出车单信息不能为空！',
                                type: 'warning'
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

        },
    }
</script>
<style lang="scss" scoped>
    .header{
        margin-bottom: 20px;
    }
    .center{
        padding: 20px 0 ;
    }

    .el-form-item{
        /*width: 100%;*/
    }
    .el-input {
        min-width: 220px;
    }
    /*.el-textarea{*/
        /*min-width: 400px;*/
    /*}*/
    .el-textarea{
        width: 350px;
    }
    .el-textarea{
        min-height: 100px;
    }
    .el-dialog{
    }
</style>