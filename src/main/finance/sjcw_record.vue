<template>
    <div class="main">
        <p>
            当前位置：<span>财务管理 > 司机对账 > 对账 > 账单审批记录</span>
        </p>
        <h1>调账审批申请记录</h1>
        <div class="top">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <!--<el-form-item label="司机编号">-->
                    <!--<el-input v-model="formInline.driverId" placeholder="请输入司机编号"></el-input>-->

                <!--</el-form-item>-->
                <!--<el-form-item label="司机姓名">-->
                    <!--<el-input v-model="formInline.driverName" placeholder="请输入司机姓名"></el-input>-->

                <!--</el-form-item>-->
                <el-form-item label="出车编号">
                    <el-input v-model.trim="formInline.trackId" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入出车编号"></el-input>
                </el-form-item>
                <!--<el-form-item label="司机手机号">-->
                    <!--<el-input v-model="formInline.driverPhone" placeholder="请输入司机手机号"></el-input>-->
                <!--</el-form-item>-->

                <el-form-item label="所属车队">
                    <el-input v-model.trim="formInline.teamName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入所属车队"></el-input>
                </el-form-item>
                <el-form-item label="司机类型">
                    <el-select v-model="formInline.driverType" placeholder="请选择审批状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="车队长" value="company"></el-option>
                        <el-option label="车队司机" value="team"></el-option>
                        <el-option label="个体司机" value="personal"></el-option>
                        <!--司机类型：车队司机 team， company，个体司机 personal'-->
                    </el-select>
                </el-form-item>

                <el-form-item label="审批状态">
                    <el-select v-model="formInline.status" placeholder="请选择账单状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="审批中" value="audit"></el-option>
                        <el-option label="已通过" value="pass"></el-option>
                        <el-option label="未通过" value="notpass"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="driverId"
                    align="center"
                    label="司机编号">
            </el-table-column>
            <el-table-column
                    prop="driverName"
                    align="center"
                    label="司机姓名">
            </el-table-column>
            <el-table-column
                    prop="driverPhone"
                    align="center"
                    label="司机手机号">
            </el-table-column>
            <el-table-column
                    prop="driverType"
                    align="center"
                    label="司机类型">
            </el-table-column>
            <el-table-column
                    prop="teamName"
                    align="center"
                    label="所属车队">
            </el-table-column>
            <el-table-column
                    prop="trackId"
                    align="center"
                    label="出车编号">
            </el-table-column>
            <el-table-column
                    prop="outTime"
                    align="center"
                    :formatter="dateFormat"
                    label="出车日期">
            </el-table-column>


<!--            <el-table-column
                    prop="optBeforePrice"
                    align="center"
                    label="出车费用（元）">
            </el-table-column>-->

            <el-table-column
                    prop="redPacketMoney"
                    align="center"
                    label="红包金额（元）">
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="insuranceCost"-->
                    <!--align="center"-->
                    <!--label="畅心保（元）">-->
            <!--</el-table-column>-->

            <el-table-column
                    prop="optMoney"
                    align="center"
                    label="调账前总金额（元）">
            </el-table-column>
            <el-table-column
                    prop="optMoney"
                    align="center"
                    label="调账金额（元）">
            </el-table-column>
            <el-table-column
                    prop="optAfterPrice"
                    align="center"
                    label="调账后总金额（元）">
            </el-table-column>
            <el-table-column
                    prop="adjustmentReason"
                    align="center"
                    label="差异原因">
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="remark"-->
                    <!--align="center"-->
                    <!--label="附加说明">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="optAdminName"
                    align="center"
                    label="申请人">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    align="center"
                    :formatter="dateFormat"
                    label="申请时间">
            </el-table-column>
            <el-table-column
                    prop="examineOperaterName"
                    align="center"
                    label="审核人">
            </el-table-column>
            <el-table-column
                    prop="status"
                    align="center"
                    label="审批状态">
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
        data() {
            return {
                token:'',
                total:0,
                arr:[],
                currentPage:1,
                pagesize:10,//每页的数据条数
                formInline:{
                    driverId:'',
                    driverName:'',
                    driverPhone:'',
                    region:'',
                    DriverName:'',
                    status:'',
                    teamName:'',
                    driverType:'',
                },
                tableData: [],
                userId:'',
                type:'',
            }
        },
        created() {
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.userId = JSON.parse(sessionStorage.getItem('examinenameid'));

            this.type = this.userId.examineid;
            console.log(this.type);
            if ( this.type == '1' ){
                this.type = 'query'
            }else {
                this.type = 'adjust'
            }
            this.driver_reconciliation();
        },
        methods: {
            ajax(page){
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/query/customerlist/finance/recordaccout',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    if (res.body.result.rows !== undefined){
                        this.total =res.body.result.total;
                        this.tableData = res.body.result.rows;
                        for (let i = 0 ; i < this.tableData.length; i++){
                            if (this.tableData[i].status == 'audit'){
                                this.tableData[i].status = '审批中';
                            }else if(this.tableData[i].status == 'pass'){
                                this.tableData[i].status = '已通过';
                            }else if(this.tableData[i].status == 'notpass'){
                                this.tableData[i].status = '未通过';
                            }
                            this.tableData[i].outTime = Number(this.tableData[i].outTime);
                            if (this.tableData[i].driverType =='team') {
                                this.tableData[i].driverType = '车队司机'
                            }else if (this.tableData[i].driverType =='company') {
                                this.tableData[i].driverType = '车队长'
                            }else if (this.tableData[i].driverType =='personal') {
                                this.tableData[i].driverType = '个体司机'
                            }
                        };
                    }

                })
            },
            driver_reconciliation() {
                let page = JSON.stringify({
                    token : this.token,
                    driverId: this.userId.examinenameid,
                    // this.userId.customerName
                    // driverPhone : this.formInline.driverPhone,
                    driverName : this.userId.customerName,
                    // status: this.formInline.status,
                    pageNum : this.currentPage,
                    pageSize : this.pagesize,
                    type: this.type,
                    driverType:this.formInline.driverType,
                    teamName:this.formInline.teamName,
                });
                console.log(page);
                this.ajax(page)

            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                let page = JSON.stringify({
                    token : this.token,
                    driverId: this.userId.examinenameid,
                    // this.userId.customerName
                    // driverPhone : this.formInline.driverPhone,
                    driverName : this.userId.customerName,
                    // status: this.formInline.status,
                    pageNum : this.currentPage,
                    pageSize : this.pagesize,
                    type: this.type,
                    driverType:this.formInline.driverType,
                    teamName:this.formInline.teamName,
                });
                this.ajax(page)
            },
            onSubmit(){
                let page = JSON.stringify({
                    token : this.token,
                    driverId: this.userId.examinenameid,
                    driverName : this.userId.customerName,
                    trackId: this.formInline.trackId,
                    status: this.formInline.status,
                    pageNum : this.currentPage,
                    pageSize : this.pagesize,
                    type: this.type,
                    driverType:this.formInline.driverType,
                    teamName:this.formInline.teamName,
                });
                console.log(page);
                this.ajax(page)
            }
        }
    }
</script>
<style lang='less' scoped>
    .main {
        font-size: 16px;
        padding-top: 30px;
        padding-left: 30px;
        p{
            display: block;
            padding-bottom: 15px;
        }
        h1{
            font-size: 20px
        }

        .el-pagination {
            padding: 10px 405px;
        }
        .el-pagination{
            text-align: center;
        }
    }

</style>
