<template>
    <div class="main">
        <div class="header">
            当前位置：财务管理 > 客户财务 > 账单审批记录
        </div>
        <div class="top">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="账单周期">
                    <el-date-picker
                            v-model="formInline.value6"
                            type="month"
                            value-format="timestamp"
                            format="yyyy 年 MM 月"
                            placeholder="选择开始时间">
                    </el-date-picker>
                    &nbsp;至&nbsp;
                    <el-date-picker
                            v-model="formInline.value7"
                            type="month"
                            value-format="timestamp"
                            format="yyyy 年 MM 月"
                            placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>


                <el-form-item label="客户编号">
                    <el-input v-model="formInline.customerId" placeholder="请输入客户编号" ></el-input>

                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model="formInline.customerName" placeholder="请输入项目名称" ></el-input>
                </el-form-item>


                <el-form-item label="账单状态">
                    <el-select v-model="formInline.status" placeholder="请选择">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="审批中" value="approving"></el-option>
                        <el-option label="已通过" value="accepted"></el-option>
                        <el-option label="未通过" value="rejected"></el-option>
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
                    prop="customerId"
                    align="center"
                    label="客户编号">
            </el-table-column>
            <el-table-column
                    prop="regionName"
                    align="center"
                    label="管理区">
            </el-table-column>
            <el-table-column
                    prop="filialeName"
                    align="center"
                    label="所属分公司">
            </el-table-column>
            <el-table-column
                    prop="customerName"
                    align="center"
                    label="项目名称">
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="billStartTime"-->
                    <!--align="center"-->
                    <!--:formatter="dateFormat"-->
                    <!--label="账单开始时间">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="billEndTime"-->
                    <!--align="center"-->
                    <!--:formatter="dateFormat"-->
                    <!--label="账单结束时间">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="billEndTime"
                    align="center"
                    :formatter="dateFormatMM"
                    label="账单周期">
            </el-table-column>

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
            <!--<el-table-column-->
                    <!--prop="schedulePrice"-->
                    <!--align="center"-->
                    <!--label="合同价格（元）">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="scheduleMoney"
                    align="center"
                    label="基础运费（元）">
            </el-table-column>
            <el-table-column
                    prop="adjustBeforeMoney"
                    align="center"
                    label="调账前总金额（元）">
            </el-table-column>
            <el-table-column
                    prop="adjustmentMountMoney"
                    align="center"
                    label="调账金额（元）">
            </el-table-column>
            <el-table-column
                    prop="adjustAfterMoney"
                    align="center"
                    label="调账后总金额（元）">
            </el-table-column>
            <el-table-column
                    prop="invoiceRate"
                    align="center"
                    label="税率">
            </el-table-column>
            <el-table-column
                    prop="invoiceCharge"
                    align="center"
                    label="税费（元）">
            </el-table-column>
            <el-table-column
                    prop="actualBillMoney"
                    align="center"
                    label="账单总金额（元）">
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="remark"-->
                    <!--align="center"-->
                    <!--label="调账说明">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="optAdminName"
                    align="center"
                    label="申请人">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    align="center"
                    :formatter="dateFormathm"
                    label="申请时间">
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="examineOperaterName"-->
                    <!--align="center"-->
                    <!--label="审核人">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="examineStatus"
                    align="center"
                    label="账单状态">
                <template slot-scope="scope">
                    <el-button type="text"  v-if="tableData[scope.$index].examineStatus =='审批中' " disabled>审批中</el-button>
                    <el-button type="text"  v-if="tableData[scope.$index].examineStatus =='已通过' " disabled>已通过</el-button>
                    <el-popover
                            v-if="tableData[scope.$index].examineStatus =='未通过' "
                            placement="right"
                            trigger="hover"
                            >
                        <el-form  label-width="80px">
                            <el-form-item label="审批意见">
                                <el-input
                                        disabled
                                        type="textarea"
                                        resize="none"
                                        v-model="tableData[scope.$index].approvalComments">
                                </el-input>
                            </el-form-item>
                        </el-form>

                        <el-button slot="reference" type="text">未通过</el-button>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    label="审批进度">
                <template slot-scope="scope">
                    <el-button type="text" @click="onapprovalDetails(scope.$index)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--审批查看详情-->
        <el-dialog
                title="查看审批详情"
                :visible.sync="approvalDetails"
                width="30%"
                min-width = '650px'
        >
            <div style="width: 100%;padding: 0 20px">
                司机姓名：{{approval_Customer.customerName}} <br>
                申请人：&nbsp;&nbsp;&nbsp;{{approval_Customer.optAdminName}}<br>
                申请时间：{{approval_Customer.createTime | dateFrmHm}}<br><br>
                <div v-for="i in approver" style="width: 100%;padding: 20px 0 0 0 " >
                    审批人：&nbsp;&nbsp;&nbsp;{{i.adminName}} <br>
                    审批意见：<span v-if="i.opinion">{{i.opinion}}</span><br>
                    申请时间：<span v-if="i.createTime">{{i.createTime|dateFrmHm}}</span>
                </div>

            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="approvalDetails = false">取 消</el-button>
                <el-button type="primary" @click="approvalDetails = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 分页插件 -->
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 50]"
                layout="total,prev, pager, next,sizes"
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
                    status:'',
                    time:'',
                    value6:'',
                    value7:'',
                },
                tableData: [],
                id:'',
                approvalDetails:false,
                approval_Customer:{},
                approver:[]
            }
        },
        created() {
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.driver_reconciliation();
        },
        methods: {
            driver_reconciliation() {
                let page = JSON.stringify({
                    token : this.token,
                    startTime:this.formInline.value6,
                    endTime:this.formInline.value7 ,
                    examineStatus: this.formInline.status,
                    customerId: this.formInline.customerId,
                    customerName: this.formInline.customerName,
                    pageNum : this.currentPage,
                    pageSize : this.pagesize,
                });
                console.log(page);
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_apr_record',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                        if (res.body.result.rows !== undefined){
                            this.total =res.body.result.total;
                            this.tableData = res.body.result.rows;
                            for (let i = 0 ; i < this.tableData.length; i++){

                                if (this.tableData[i].examineStatus == 'approving'){
                                    this.tableData[i].examineStatus = '审批中';
                                }else if(this.tableData[i].examineStatus == 'accepted'){
                                    this.tableData[i].examineStatus = '已通过';
                                }else if(this.tableData[i].examineStatus == 'rejected' ||this.tableData[i].examineStatus == 'expire' ){
                                    this.tableData[i].examineStatus = '未通过';
                                }
                            };
                        } else {}

                })

            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            dateFormathm:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            dateFormatMM:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM");
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.driver_reconciliation();
            },
            handleSizeChange(val){
                this.pagesize = val
                this.driver_reconciliation();
            },
            onSubmit(){
                if (this.formInline.value6!=''&&this.formInline.value6!=null &&this.formInline.value7!=''&&this.formInline.value7!=null){
                    // if(this.formInline.value6 == this.formInline.value7){
                    //     this.$message({
                    //         message: '账单开始时间不能等于账单结束时间！',
                    //         type: 'warning'
                    //     });
                    // }else
                    if (this.formInline.value6 > this.formInline.value7) {
                        this.$message({
                            message: '账单开始时间不能大于账单结束时间！',
                            type: 'warning'
                        });
                    }else{
                        this.currentPage = 1 ;
                        this.driver_reconciliation()
                    }
                }else if (this.formInline.value6!=''&&this.formInline.value6!=null&&(this.formInline.value7==null||this.formInline.value7=='')) {
                    this.$message({
                        message: '请选择账单结束时间',
                        type: 'warning'
                    });
                }else if(this.formInline.value7!=''&&this.formInline.value7!=null&&(this.formInline.value6==null||this.formInline.value6=='')){
                    this.$message({
                        message: '请选择账单开始时间',
                        type: 'warning'
                    });
                }else{
                    this.currentPage = 1 ;
                    this.driver_reconciliation()
                }
            },
            onapprovalDetails(_ind){
                this.approval_Customer = this.tableData[_ind]
                let page = JSON.stringify({
                    token:this.token,
                    id:this.tableData[_ind].id,
                })
                console.log(page);
                this.$http.post(this.global.lightningUrl +'/companyv1/finance/customeroutbillapprovaldetail',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.body.result == null){
                        this.approvalDetails = false
                        this.$message({
                            message: '该单当前无审批记录！',
                            type: 'warning'
                        });
                    } else{
                        this.approvalDetails = true ;
                        this.approver = res.body.result
                        for (let i = 0; i <this.approver.length; i++) {
                            if (this.approver[i].state == undefined){
                                this.approver[i].state = '';

                            } else if (this.approver[i].state == 'accepted') {
                                this.approver[i].state = '同意'
                            }else{
                                this.approver[i].state = '退回'

                            }
                        }
                    }

                })
            },
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
            font-size: 20px;

        }
        >ul>li {
            margin: 10px 0;
            display: inline-block;
            padding-right: 40px;
        }
        .top {
            margin-top: 20px;
        }
        .inp {
            width:150px;
            height:30px;
            margin-right: 30px;
            border: 1px solid #ccc;
        }
        .dv {
            margin-top: 40px;
        }
        .dc {
            position: absolute;
            top:45px;
            right: 180px;
        }
        .dr {
            position: absolute;
            top: 45px;
            right: 10px;
        }
        .search {
            margin:0 30px;
        }

        td {
            border: 1px solid #ccc;
        }
        .el-pagination {
            padding: 10px 405px;
        }
        .el-pagination{
            text-align: center;
        }
    }

</style>
