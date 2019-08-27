<template>
    <div class="residentInformation">
        <el-tabs type="border-card" v-model="activeName" @tab-click="tableClick">
            <el-tab-pane label="驻场考勤记录" name="1">
                <!--查询条件-->
                <div class="query-criteria">
                    <el-form :inline="true" :model="formInfos" class="demo-form-inline">
                        <el-form-item label="仓库">
                            <el-select v-model="formInfos.warehouse" clearable placeholder="全部">
                                <el-option
                                        v-for="item in warehouses"
                                        :key="item.id"
                                        :label="item.depotName"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="到仓时间">
                            <el-date-picker
                                    v-model="formInfos.warehouseArrivalTime"
                                    type="daterange"
                                    format="yyyy-MM-dd"
                                    value-format="timestamp"
                                    align="right"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="状态">
                            <el-select v-model="formInfos.state" clearable placeholder="全部">
                                <el-option
                                        v-for="item in formInfos.states"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>

                        <!--补卡-->
                        <el-dialog
                                title="补卡"
                                @close="dialogClose"
                                :visible.sync="centerDialogVisible"
                                width="40%"
                                center>
                            <el-form :model="cardForm" :rules="cardRules" ref="cardForm"  class="cardStyle demo-ruleForm">
                                <el-form-item label="补卡原因" prop="reason">
                                    <el-input
                                            type="textarea"
                                            :autosize="{ minRows: 5, maxRows: 10}"
                                            placeholder="请输入内容"
                                            v-model="cardForm.reason">
                                    </el-input>

                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit('cardForm')">提 交</el-button>
  </span>
                        </el-dialog>
                    </el-form>
                </div>
                <!--表格-->
                <el-table
                        class="tableStyle"
                        :data="formInfos.tableData"
                        style="width: 100%">
                    <el-table-column
                            label="序号"
                            prop="id"
                            width="50"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            label="系统设置到仓时间"
                            align="center"
                            :formatter="arrWarehouseTime"
                    >
                    </el-table-column>
                    <el-table-column
                            label="到仓打卡时间"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <div>
                                <span v-if="formInfos.tableData[scope.$index].arrivalClockTime != undefined">{{formInfos.tableData[scope.$index].arrivalClockTime | transformationTime}}</span>
                                <img class="imgStyle" v-if="formInfos.tableData[scope.$index].arrivalClockTime != undefined && formInfos.tableData[scope.$index].arrivalClockTime > formInfos.tableData[scope.$index].systemClockTime" src="../../../../images/ic_late.png" alt="迟到" title="迟到"/>
                                <span v-if="formInfos.tableData[scope.$index].addArriveTime != undefined">{{formInfos.tableData[scope.$index].addArriveTime | transformationTime}}</span>
                                <img class="imgStyle" v-if="formInfos.tableData[scope.$index].addArriveTime != undefined" src="../../../../images/ic.png" alt="补卡" title="补卡"/>
                                <el-button type="primary" @click="repairCard('arrive',scope.row.id)" v-if="formInfos.tableData[scope.$index].arrivalClockTime == undefined && formInfos.tableData[scope.$index].addArriveTime == undefined">补 卡</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="leaveClockTime"
                            label="离仓打卡时间"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <div>
                                <span v-if="formInfos.tableData[scope.$index].leaveClockTime != undefined">{{formInfos.tableData[scope.$index].leaveClockTime | transformationTime}}</span>
                                <span v-if="formInfos.tableData[scope.$index].addLeaveTime != undefined">{{formInfos.tableData[scope.$index].addLeaveTime | transformationTime}}</span>
                                <img class="imgStyle" v-if="formInfos.tableData[scope.$index].addLeaveTime != undefined" src="../../../../images/ic.png" alt="补卡" title="补卡"/>
                                <el-button type="primary" @click="repairCard('leave',scope.row.id)" v-if="formInfos.tableData[scope.$index].leaveClockTime == undefined && formInfos.tableData[scope.$index].addLeaveTime == undefined">补 卡</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="驻场人姓名(电话)"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <div>
                                <span>{{formInfos.tableData[scope.$index].workerName}}</span>
                                <span>({{formInfos.tableData[scope.$index].workerPhone}})</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="depotName"
                            label="仓库"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="clockAddress"
                            label="打卡地址"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="状态"
                            align="center"
                            :formatter="analysisType"
                    >
                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-pagination
                        class="pagination"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="formInfos.currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="formInfos.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="formInfos.totalNum">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="设置驻场信息" name="2">

                <el-button class="newlyAdded" @click="newlyAdded('add')" type="primary">新 增</el-button>

                <!--表格-->
                <el-table
                        class="tableStyle"
                        :data="dataInfos"
                        style="width: 100%">
                    <el-table-column
                            label="序号"
                            prop="id"
                            width="80"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="projectName"
                            label="项目名称"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="depotName"
                            label="仓库"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="workerName"
                            label="驻场人员姓名"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="workerPhone"
                            label="驻场人员电话"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="workerWage"
                            label="驻场人员日薪"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="到岗时间"
                            align="center"
                            :formatter="reportTime"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="arriveDepotTimeStr"
                            label="到仓时间"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            label="操作时间"
                            align="center"
                            :formatter="optTime"
                    >
                    </el-table-column>

                    <el-table-column
                            label="状态"
                            align="center"
                            :formatter="freezeStatus"
                    >
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            align="center"
                            width="100">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.status != 'transfer'" @click="handleClick(scope.row,scope.$index,'change')" type="text" size="small">变 更</el-button>
                            <el-button v-if="scope.row.status != 'transfer'" type="text" size="small" @click="leaveOffice(scope.row.id)">调 离</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-pagination
                        class="pagination"
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :current-page="dataCurrentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="dataPageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="datatotalNum">
                </el-pagination>
                <el-dialog
                        title="新增/变更驻场信息"
                        :visible.sync="addDialogVisible"
                        @close="closeDialog"
                        width="50%"
                        center>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="formStyle demo-ruleForm">
                        <el-form-item label="项目名称" prop="name" :label-width="formLabelWidth">
                            <el-input v-model="ruleForm.name" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="选择仓库" prop="warehouse" :label-width="formLabelWidth">
                            <el-select :disabled="isDisabled" v-model="ruleForm.warehouse" clearable placeholder="请选择仓库名称">
                                <el-option
                                        v-for="item in warehouses"
                                        :key="item.id"
                                        :label="item.depotName"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="驻场人员姓名" prop="contactName" :label-width="formLabelWidth">
                            <el-input :disabled="isDisabled" v-model="ruleForm.contactName"></el-input>
                        </el-form-item>
                        <el-form-item label="驻场人员电话" prop="contactTelephone" :label-width="formLabelWidth">
                            <el-input v-model="ruleForm.contactTelephone"></el-input>
                        </el-form-item>
                        <el-form-item label="驻场人员日薪" prop="perDiem" :label-width="formLabelWidth">
                            <el-input v-model="ruleForm.perDiem"></el-input>
                        </el-form-item>
                        <el-form-item label="首次到岗时间" :label-width="formLabelWidth" prop="reportTime">
                            <el-date-picker
                                    :disabled="isDisabled"
                                    v-model="ruleForm.reportTime"
                                    type="date"
                                    placeholder="选择到岗时间"
                                    format="yyyy-MM-dd"
                                    :picker-options="pickerOptions"
                                    value-format="timestamp">
                            </el-date-picker>
                        </el-form-item>
                        <!--<el-form-item label="到仓时间" :label-width="formLabelWidth" prop="warehouseArrivalTime">
                            <el-time-picker
                                    v-model="ruleForm.warehouseArrivalTime"
                                    format="HH:mm"
                                    @change="selectTime"
                                    value-format="HH:mm"
                                    placeholder="选择到仓时间">
                            </el-time-picker>
                        </el-form-item>-->
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary"  @click="submitForm('ruleForm',changeType)">确 定</el-button>
                  </span>
                </el-dialog>

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {getTime,getDate} from '../../../../js/listWarehouse.js';
    export default {
        name: "residentInformation",
        data(){
            return {
                id:null,
                changeType:null,
                isDisabled:false,
                activeName: '1',
                customerId:'',
                projectName:'',
                addDialogVisible:false,
                cardInfos:{},
                token:'',
                centerDialogVisible:false,
                cardForm:{
                    reason:''
                },
                cardRules:{
                    reason:[
                        { required: true, message: '补卡原因不能为空',trigger: 'blur'},
                        { pattern:  /^[\u4e00-\u9fa5_a-zA-Z0-9_!$()=|':;',?！…（）%——‘；：”“'。，、,.？]{5,225}$/, message: '补卡原因5-225位字符', trigger: ['blur', 'change'] }
                        ]
                },
                warehouses:[],
                formLabelWidth:'110px',
                formInfos:{
                    warehouse:'',
                    warehouseArrivalTime:'',
                    states:[
                        {
                            value:0,
                            label:'正常'
                        },
                        {
                            value:1,
                            label:'异常'
                        }
                    ],
                    state:'',
                    tableData:[],
                    currentPage:1,
                    pageSize:10,
                    totalNum:0
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 3600 * 1000 * 24
                    }
                },
                ruleForm: {
                    name: '',
                    warehouse: '',
                    contactName:'',
                    contactTelephone:'',
                    perDiem:'',
                    reportTime:'',
                    warehouseArrivalTime:'',
                    index:-1
                },
                rules: {
                    warehouse: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    contactName: [
                        { required: true, message: '驻场人员姓名不能为空',trigger: 'blur'},
                        { pattern:  /^[\u4e00-\u9fa5\w\-]{2,10}$/g, message: '驻场人员姓名最少两位汉字', trigger: ['blur'] }
                    ],
                    contactTelephone: [
                        { required: true, message: '驻场人员电话不能为空',trigger: 'blur'},
                        { pattern:  /^1[3-9]\d{9}$/, message: '驻场人员电话11位数字', trigger: ['blur'] }
                    ],
                    perDiem: [
                        { required: true, message: '驻场人员日薪不能为空',trigger: 'blur'},
                        { pattern:  /^\d+\.?\d{0,2}$/, message: '驻场人员日薪为数字且最多保留2位小数', trigger: ['blur'] }
                    ],
                    reportTime: [
                        {required: true, message: '请选择到岗日期', trigger:['change'] }
                    ]
                },
                dataInfos:[],
                dataCurrentPage:1,
                dataPageSize:10,
                datatotalNum:0,
                timeNum:null
            };
        },
        filters:{
            transformationTime(val){
                if(val != undefined){
                    return getTime(val)
                }
            }
        },
        methods:{
            handleClick(val,index,str){
                console.log(val);
                this.changeType = str;
                console.log(this.changeType);
                this.id = val.id;
                this.addDialogVisible = true;
                this.isDisabled = true;
                this.ruleForm.name = val.projectName;
                this.ruleForm.warehouse = val.depotId;
                this.ruleForm.contactName = val.workerName;
                this.ruleForm.contactTelephone = val.workerPhone;
                this.ruleForm.perDiem = val.workerWage;
                this.ruleForm.reportTime = val.reportTime;
                this.ruleForm.index = index;
                // this.ruleForm.warehouseArrivalTime = val.arriveDepotTimeStr;
            },
            leaveOffice(id){
                this.$confirm('确定该人员调离, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(id)
                    let leaveInfos = {
                        token:this.token,
                        id:id,
                    };

                    this.$http.post(this.global.lightningUrl+'/companyv1/depotManage/station/departure', leaveInfos, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then(function (res) {
                        console.log(res);
                        if(res.body.errcode === 0){
                            this.$message({
                                message: res.body.message,
                                type: 'success'
                            });
                            setTimeout(()=>{
                                this.stationingInit(this.token);
                            },1000)
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消调离操作'
                    });
                });

            },
            closeDialog(){
                this.id = null;
                this.changeType = null;
                this.isDisabled = false;
                this.$refs['ruleForm'].resetFields();
                this.ruleForm.name = '';
                this.ruleForm.warehouse = '';
                this.ruleForm.contactName = '';
                this.ruleForm.contactTelephone = '';
                this.ruleForm.perDiem = '';
                this.ruleForm.reportTime = '';
                this.ruleForm.index = -1;
                // this.ruleForm.warehouseArrivalTime = '';
            },
            tableClick(){
                console.log(this.activeName)
            },
            /*selectTime(){
                console.log(this.ruleForm.warehouseArrivalTime)
                if(this.ruleForm.warehouseArrivalTime != null){
                    let arrTime =  this.ruleForm.warehouseArrivalTime.split(":");
                    this.timeNum = arrTime[0]*60*60*1000 + arrTime[1]*60*1000 + 59*1000;
                    console.log(this.timeNum)
                }
            },*/
            newlyAdded(str){
                this.changeType = str;
                console.log(this.changeType)
                this.addDialogVisible = true;
                this.ruleForm.name = this.projectName;
            },
            dialogClose(){
                this.cardForm.reason = '';
                this.$refs['cardForm'].resetFields();
            },
            onSubmit(){
                this.init(this.token);
            },
            submit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.cardInfos.optReason = this.cardForm.reason;
                        console.log(this.cardInfos);
                        this.$http.post(this.global.lightningUrl+'/companyv1/depotManage/station/repair_clock', this.cardInfos, {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then(function (res) {
                            console.log(res);
                            if(res.body.errcode == 0){
                                this.$message({
                                    message: '补卡成功!',
                                    type: 'success'
                                });
                                this.centerDialogVisible = false;
                                this.init(this.token);
                            }else{
                                this.$message.error(res.body.message);
                            }

                        }).catch(function (error) {
                            console.log(error);
                        });
                    } else {
                        return false;
                    }
                });
            },
            repairCard(type,id){
              console.log(type,id)
              this.centerDialogVisible = true;
              this.cardInfos = {
                  token:this.token,
                  stationOperatorClockId:id,
                  optReason:'',
                  type:''
              }
              if(type == 'arrive'){
                  this.cardInfos.type = 'arrive'
              }else{
                  this.cardInfos.type = 'leave'
              }
            },
            analysisType(val){
                let str = '';
                if(val.type === 0){
                    str = '正常'
                }else{
                    str = '异常'
                }
                return str;
            },
            arrWarehouseTime(val){
                return getTime(val.systemClockTime)
            },
            optTime(val){
                if(val.updateTime != undefined){
                    return getTime(val.updateTime)
                }else{
                    return getTime(val.optTime)
                }

            },
            reportTime(val){
                return getDate(val.reportTime)
            },
            freezeStatus(val){
                let str = '';
                if(val.status === 'working'){
                    str = '在职'
                }else{
                    str = '调离'
                }
                return str;
            },
            // 获取页面信息
            init(token){
                let infos = {
                    token:token,
                    userId:this.customerId,
                    type:this.formInfos.state,
                    depotId:this.formInfos.warehouse,
                    systemStartTime:this.formInfos.warehouseArrivalTime != '' && this.formInfos.warehouseArrivalTime != null?this.formInfos.warehouseArrivalTime[0]:'',
                    systemEndTime:this.formInfos.warehouseArrivalTime != '' && this.formInfos.warehouseArrivalTime != null?this.formInfos.warehouseArrivalTime[1]+86400000-1:'',
                    pageNum:this.formInfos.currentPage,
                    pageSize:this.formInfos.pageSize
                };

                this.$http.post(this.global.lightningUrl+'/companyv1/depotManage/station/clock_record', infos, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(function (res) {
                    console.log(res);
                    this.formInfos.tableData = res.data.result.rows;
                    this.formInfos.totalNum = res.data.result.total;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            // 获取驻场信息
            stationingInit(token){
                let infos = {
                    token:token,
                    userId:this.customerId,
                    pageNum:this.dataCurrentPage,
                    pageSize:this.dataPageSize
                };

                this.$http.post(this.global.lightningUrl+'/companyv1/depotManage/station/setting_record', infos, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(function (res) {
                    console.log(res);
                    // if(res.body.result.total === 0){
                    //     this.$message({
                    //         message: '暂无数据',
                    //         type: 'warning'
                    //     });
                    // }else{
                        this.dataInfos = res.data.result.rows;
                        this.datatotalNum = res.data.result.total;
                    // }

                }).catch(function (error) {
                    console.log(error);
                });
            },
            // 获取仓库列表
            getWarehouse(token,userId){
                let userinfos = {
                    token: token,
                    userId:userId,
                };

                this.$http.post(this.global.lightningUrl+'/companyv1/depotManage/depot/all_depot_name', userinfos, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(function (res) {
                    console.log(res);
                    if(res.body.errcode === 0){
                        this.warehouses = res.body.result;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            submitForm(formName,type) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.ruleForm.perDiem > 10000){
                            this.$message({
                                message: '驻场人员日薪不能大于10000',
                                type: 'warning'
                            });
                            return;
                        }
                        let depotName = '';
                        for(let i=0;i < this.warehouses.length;i++){
                            if(this.ruleForm.warehouse === this.warehouses[i].id){
                                depotName = this.warehouses[i].depotName;
                            }
                        }
                        console.log(depotName)
                        if(type == "add"){
                            let addInfos = {
                                token:this.token,
                                userId:this.customerId,  //项目id
                                projectName:this.projectName,
                                depotId: this.ruleForm.warehouse,
                                depotName:depotName,
                                reportTime:this.ruleForm.reportTime,
                                workerName:this.ruleForm.contactName,
                                workerPhone:this.ruleForm.contactTelephone,
                                workerWage:this.ruleForm.perDiem,
                                // arriveDepotTime:this.timeNum //传9*60*60*1000
                            };

                            this.$http.post(this.global.lightningUrl+'/companyv1/depotManage/station/setting_station', addInfos, {
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            }).then(function (res) {
                                console.log(res);
                                this.addDialogVisible = false;
                                if(res.body.errcode == 0){
                                    this.$message({
                                        message: res.body.message,
                                        type: 'success'
                                    });
                                    setTimeout(()=>{
                                        this.stationingInit(this.token);
                                    },1000)
                                }else{
                                    this.$message({
                                        message: res.body.message,
                                        type: 'warning'
                                    });
                                }

                            }).catch(function (error) {
                                console.log(error);
                            });
                        }else{
                            if(this.ruleForm.contactTelephone == this.dataInfos[this.ruleForm.index].workerPhone){
                                this.ruleForm.contactTelephone = '';
                            }

                            let changeInfos = {
                                token:this.token,
                                id:this.id,
                                workerPhone:this.ruleForm.contactTelephone,
                                workerWage:this.ruleForm.perDiem,
                                // arriveDepotTime:this.timeNum //传9*60*60*1000
                            };

                            this.$http.post(this.global.lightningUrl+'/companyv1/depotManage/station/change', changeInfos, {
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            }).then(function (res) {
                                console.log(res);
                                this.addDialogVisible = false;
                                if(res.body.errcode == 0){
                                    this.$message({
                                        message: res.body.message,
                                        type: 'success'
                                    });
                                    setTimeout(()=>{
                                        this.stationingInit(this.token);
                                    },1000)
                                }else{
                                    this.$message({
                                        message: res.body.message,
                                        type: 'warning'
                                    });
                                }

                            }).catch(function (error) {
                                console.log(error);
                            });
                        }

                    } else {
                        return false;
                    }
                });

            },
            handleSizeChange(pageSize){
                this.formInfos.pageSize = pageSize;
                this.init(this.token);
            },
            handleCurrentChange(currentPage){
                this.formInfos.currentPage = currentPage;
                this.init(this.token);
            },
            handleSizeChange1(pageSize){
                this.dataPageSize = pageSize;
                this.stationingInit(this.token);
            },
            handleCurrentChange1(currentPage){
                this.dataCurrentPage = currentPage;
                this.stationingInit(this.token);
            }
        },
        created(){
            let project = JSON.parse(sessionStorage.getItem('projectName'));
            console.log(project)
            this.projectName = project.projectName;
            this.customerId = sessionStorage.getItem('webCustomerId');
            this.token = JSON.parse(Base64.decode(sessionStorage.getItem('key'))).result.token;
            this.getWarehouse(this.token,this.customerId);
            this.init(this.token);
            this.stationingInit(this.token);
        }
    }
</script>

<style  lang="scss">
  .residentInformation{
      .newlyAdded{
          margin-bottom: 10px;
          float: right;
      }
      .imgStyle{
          vertical-align: top;
      }
      padding: 30px;
      .tableStyle{
          border: 1px solid #ebeef5;
      }
      .el-table td, .el-table th.is-leaf {
           border-bottom: none;
      }
      .el-form-item__content{
          width: 75%;
      }

      .cardStyle{
          width: 80%;
          margin: 0 auto;
          .el-form-item{
              width:100% ;
          }
      }
      .formStyle{
          width: 475px;
          margin: 0 auto;
      }

      .query-criteria{
          width: 100%;
      }
  }
</style>