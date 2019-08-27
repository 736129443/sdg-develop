<template>
    <div class="main">
        <div class="header">
            当前位置：<span>财务管理 > 交易记录</span>
        </div>
        <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="交易流水号">
                    <el-input v-model.trim="formInline.id"  placeholder="请输入交易流水号"></el-input>
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input v-model.trim="formInline.userName"  placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item label="交易时间">
                    <el-date-picker
                            v-model="formInline.time"
                            type="daterange"
                            range-separator="至"
                            value-format="timestamp"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="用户类型">
                    <el-select v-model="formInline.userType" placeholder="请输入用户类型">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="司机" value="driver"></el-option>
                        <el-option label="客户" value="client"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="交易类型">
                    <el-select v-model="formInline.transactionMode" placeholder="活动区域">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="交押金" value="Deposit"></el-option>
                        <el-option label="退押金" value="退押金"></el-option>
                        <el-option label="提现" value="WithdrawCash"></el-option>
                        <el-option label="客户付款" value="CustomerBalance"></el-option>
                        <el-option label="退畅心保" value="refundInsurance"></el-option>
                        <el-option label="缴纳畅心保" value="payInsurance"></el-option>
                        <el-option label="购买高价值货物险" value="Insurance"></el-option>
                        <el-option label="缴纳工服押金" value="payUniformDeposit"></el-option>
                        <el-option label="退工服押金" value="refundUniformDeposit"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onQuery">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        align="center"
                        label="交易流水号">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        align="center"
                        :formatter="dateFormat"
                        label="交易时间">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        align="center"
                        label="用户名称（手机号）">
                </el-table-column>
                <el-table-column
                        prop="userType"
                        align="center"
                        label="用户类型">
                </el-table-column>
                <el-table-column
                        prop="transactionMoney"
                        align="center"
                        label="金额（元）">
                </el-table-column>
                <el-table-column
                        prop="status"
                        align="center"
                        label="交易类型">
                </el-table-column>
                <el-table-column
                        prop="transactionStatus"
                        align="center"
                        label="状态">
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="pageSize"
                    layout="total,prev, pager, next,sizes"
                    :total="total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    import moment from 'moment'
    export default {
        name: "transactionRecord",
        created(){
            let tokenLisk = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token =  tokenLisk.result.token;
            this.data()
        },
        data(){
            return {
                formInline : {
                    depositMoney:'',
                    transactionMode:'',
                    time:'',
                },
                token:'',
                tableData:[],
                currentPage: 1,
                pageSize:10,
                total:0,

            }
        },
        methods : {
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            ajax(){
                if (this.formInline.time ==''||this.formInline.time ==null ||this.formInline.time == undefined){
                    this.formInline.time = []
                }
                let page
                if (this.formInline.transactionMode=='退押金') {
                    page = JSON.stringify({
                        token:this.token,
                        pageSize:this.pageSize,
                        pageNum:this.currentPage,
                        transactionMode : "Deposit",
                        params:"releasedDeposit",
                        id:this.formInline.id,
                        userName:this.formInline.userName,
                        userType:this.formInline.userType,
                        createStartTime:this.formInline.time[0],
                        createEndTime:this.formInline.time[1]+86400000-1,

                    })
                }else{
                    page = JSON.stringify({
                        token:this.token,
                        pageSize:this.pageSize,
                        pageNum:this.currentPage,
                        transactionMode : this.formInline.transactionMode,
                        id:this.formInline.id,
                        userName:this.formInline.userName,
                        userType:this.formInline.userType,
                        createStartTime:this.formInline.time[0],
                        createEndTime:this.formInline.time[1]+86400000-1,
                    })
                }
                this.$http.post(this.global.lightningUrl +'/companyv1/paymentCenter/payment/getRecord',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    this.total = res.body.result.total ;
                    this.tableData = res.body.result.rows;
                    for (let i = 0; i < this.tableData.length; i++) {
                        let name;
                        if (this.tableData[i].driverType == 'normal'){
                            name = '个体司机'
                        }else if (this.tableData[i].driverType == 'leader'){
                            name = '车队长'
                        }else {
                            name = ''

                        }
                        if (this.tableData[i].transactionMode == 'Deposit'&&(this.tableData[i].params === ''||this.tableData[i].params == null ||this.tableData[i].params === undefined)){
                            this.tableData[i].status = '交押金'+ ' ' + name
                        }else if(this.tableData[i].params == 'true' &&this.tableData[i].transactionMode == 'Deposit'){
                            this.tableData[i].status = '退押金'+ ' ' + name
                        }else if(this.tableData[i].transactionMode == 'WithdrawCash'){
                            this.tableData[i].status = "提现"
                        }else if (this.tableData[i].transactionMode == 'CustomerBalance'){
                            this.tableData[i].status = "商户付款"
                        } else if(this.tableData[i].transactionMode == 'Insurance'){
                            this.tableData[i].status = "购买高价值货物险"
                        }else if(this.tableData[i].transactionMode == 'TrackPay'){
                            this.tableData[i].status ='订单支付'
                        }else if(this.tableData[i].transactionMode == 'CsideDriverInsurance'){
                            if (this.tableData[i].remark == 'buy'){
                                this.tableData[i].status ='缴纳畅心保'
                            } else{
                                this.tableData[i].status ='退畅心保'
                            }

                        }else if(this.tableData[i].transactionMode == 'UniformDeposit'){
                            if (this.tableData[i].remark == 'refund'){
                                this.tableData[i].status ='退工服押金'
                            } else{
                                this.tableData[i].status ='缴纳工服押金'
                            }
                        }
                        if (this.tableData[i].userType == 'driver') {
                            this.tableData[i].userType = '司机'
                        }else{
                            this.tableData[i].userType = '客户'
                        }
                        // fail  失败   success  成功   processing  进行中  launch  待执行

                        if (this.tableData[i].transactionStatus == 'fail') {
                            this.tableData[i].transactionStatus = '失败'
                        }else if (this.tableData[i].transactionStatus == 'success') {
                            this.tableData[i].transactionStatus = '成功'
                        }else if (this.tableData[i].transactionStatus == 'processing') {
                            this.tableData[i].transactionStatus = '处理中'
                        }else if (this.tableData[i].transactionStatus == 'launch') {
                            this.tableData[i].transactionStatus = '待执行'
                        }
                    }

                })
            },
            data(){
                this.ajax()
            },
            onQuery(){
                this.currentPage = 1
                this.ajax()
            },
            handleSizeChange(val) {
                this.pageSize = val ;
                this.ajax();
            },
            handleCurrentChange(val) {
                this.currentPage = val ;
                this.ajax();
            },
        },
    }
</script>

<style scoped lang="scss">
    .main{
        /*background-color: white;*/
        .header{
            margin-bottom: 20px;
        }
    }
</style>