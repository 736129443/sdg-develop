<template>
    <div class="main">
        <div class="header">
            当前位置：<span>财务管理 > 客户回款管理 > 回款记录</span>
        </div>

        <div class="headerfrom" >
            <el-form ref="form" :model="headerfrom" :inline="true" class="demo-form-inline">
                <el-form-item label="回款时间">
                    <el-date-picker
                            v-model="headerfrom.time"
                            type="daterange"
                            value-format="timestamp"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label=回款方式>
                    <el-select v-model="headerfrom.region" placeholder="请选择" >
                        <el-option  label="全部" value=""></el-option>
                        <el-option  label="线下-现金" value="underline_cash"></el-option>
                        <el-option  label="线下-转帐" value="underline_transfer"></el-option>
                        <el-option  label="线下-微信" value="underline_wechat"></el-option>
                        <el-option  label="线下-支付宝" value="underline_alipay"></el-option>
                        <el-option  label="线下-POS机刷卡" value="underline_pos"></el-option>
                        <el-option  label="其他" value="other"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <template>
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">

                    <el-table-column
                            prop="customerId"
                            label="客户编号"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="customerName"
                            label="项目名称"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="customerName"
                            label="项目类型"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="filialeName"
                            label="所属分公司"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="regionName"
                            label="管理区"
                            align="center"
                    >
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--prop="customerName"-->
                            <!--label="管理区"-->
                            <!--align="center"-->
                    <!--&gt;-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="repayMoney"
                            label="回款金额"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="repayTime"
                            align="center"
                            label="回款时间"
                            :formatter="dateFormat"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="repayChannel"
                            label="回款方式"
                            align="center">
                    </el-table-column>

                    <!--<el-table-column-->
                            <!--prop="isInvoice"-->
                            <!--label="开票状态"-->
                            <!--align="center"-->
                    <!--&gt;-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                            <!--prop="invoiceMoney"-->
                            <!--label="开票金额"-->
                            <!--align="center"-->
                    <!--&gt;-->
                    <!--</el-table-column>-->

                    <el-table-column
                            prop="repayAccountNo"
                            label="客户银行账号"
                            align="center"
                    >
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--prop="bankType"-->
                            <!--label="开户行"-->
                            <!--align="center"-->
                    <!--&gt;-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="optAdmin"
                            label="线下收款处理人"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="处理时间"
                            :formatter="dateFormatHm"
                            align="center"
                    >
                    </el-table-column>
                </el-table>
            </template>
            <el-pagination background
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           @size-change="handleSizeChange"
                           :page-sizes="[10, 20, 30, 50]"
                           layout="total,prev, pager, next,sizes"
                           :total = 'total'>
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        data(){
            return {
                //所有数据的中间层的转换
                // Transformation:[],
                //是否开发票
                isInvoice:'',
                //回款方式
                repayWay:'',
                //回款时间
                repayTime:'',
                //处理时间
                operateTime:'',
                headerfrom:{
                    time:'',
                    region:''
                },
                tableData: [],
                startTime:'',
                endTime:'',
                //分页
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
                customerId:'',

            }
        },
        created(){
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            // console.log(this.token);
            //获取的时间
            this.getTime();

            this.customerId = sessionStorage.getItem('customerId');
            // console.log(this.customerId);
            //首次加载的数据

            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_repay_record',JSON.stringify({
                'token':this.token,
                'pageNum':this.currentPage,
                'pageSize':this.pagesize,
                'customerId':this.customerId,
                'repayChannel':this.headerfrom.region,
            })).then(run=>{
                console.log(run)
                for(var i in run.body.result.rows){
                    // console.log(run.body.result.rows[i].isInvoice)
                    if(run.body.result.rows[i].isInvoice == 0){
                        run.body.result.rows[i].isInvoice = '不开票'
                    }else if(run.body.result.rows[i].isInvoice == 1){
                        run.body.result.rows[i].isInvoice = '开票'
                    }
                    if(run.body.result.rows[i].repayChannel == 'underline_alipay'){
                        run.body.result.rows[i].repayChannel = '线下-支付宝'
                    }else if(run.body.result.rows[i].repayChannel == 'underline_wechat'){
                        run.body.result.rows[i].repayChannel = '线下-微信'
                    }else if (run.body.result.rows[i].repayChannel == 'underline_cash'){
                        run.body.result.rows[i].repayChannel = '线下-现金'
                    }else if (run.body.result.rows[i].repayChannel == 'underline_transfer'){
                        run.body.result.rows[i].repayChannel = '线下-转账'
                    }else if (run.body.result.rows[i].repayChannel == 'other'){
                        run.body.result.rows[i].repayChannel = '其他'
                    }else if (run.body.result.rows[i].repayChannel == 'underline_pos'){
                        run.body.result.rows[i].repayChannel = '线下-pos机刷卡'
                    }

                };
                this.tableData = run.body.result.rows;
                this.total = run.body.result.total;
            })
        },
        methods:{

            //格式转换
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            dateFormatHm:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            //获取到当前时间
            getTime(){
                let myDate = new Date();
                let y = myDate.getFullYear();
                let m = myDate.getMonth() + 1;
                let ms = m < 10 ? ('0' + (m-1)) : m;
                m = m < 10 ? ('0' + m) : m;
                let d = myDate.getDate();
                d = d < 10 ? ('0' + d) : d;
                this.startTime = y + ms +d;
                this.endTime = y + m + d;
            },
            //点击查询的按钮
            onSubmit(){
                // console.log(this.headerfrom.time)
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_repay_record',JSON.stringify({
                    'token':this.token,
                    'pageNum':this.currentPage,
                    'pageSize':this.pagesize,
                    'customerId':this.customerId,
                    'repayChannel':this.headerfrom.region,
                    'repayStartTime' :this.headerfrom.time ==null? undefined: this.headerfrom.time[0],
                    'repayEndTime' :this.headerfrom.time ==null? undefined: this.headerfrom.time[1] +86400000-1,
                })).then(run=>{
                    console.log(run)
                    for(var i in run.body.result.rows){
                        // console.log(run.body.result.rows[i].isInvoice)
                        if(run.body.result.rows[i].isInvoice == 0){
                            run.body.result.rows[i].isInvoice = '不开票'
                        }else if(run.body.result.rows[i].isInvoice == 1){
                            run.body.result.rows[i].isInvoice = '开票'
                        }
                        if(run.body.result.rows[i].repayChannel == 'underline_alipay'){
                            run.body.result.rows[i].repayChannel = '线下-支付宝'
                        }else if(run.body.result.rows[i].repayChannel == 'underline_wechat'){
                            run.body.result.rows[i].repayChannel = '线下-微信'
                        }else if (run.body.result.rows[i].repayChannel == 'underline_cash'){
                            run.body.result.rows[i].repayChannel = '线下-现金'
                        }else if (run.body.result.rows[i].repayChannel == 'underline_transfer'){
                            run.body.result.rows[i].repayChannel = '线下-转账'
                        }else if (run.body.result.rows[i].repayChannel == 'other'){
                            run.body.result.rows[i].repayChannel = '其他'
                        }else if (run.body.result.rows[i].repayChannel == 'underline_pos'){
                            run.body.result.rows[i].repayChannel = '线下-pos机刷卡'
                        }
                    };
                    this.tableData = run.body.result.rows;
                    this.total = run.body.result.total;
                })
            },
            //分页
            handleSizeChange(pagesize) {
                this.pagesize = pagesize;
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_repay_record',JSON.stringify({
                    'token':this.token,
                    'pageNum':this.currentPage,
                    'pageSize':this.pagesize,
                    'customerId':this.customerId,
                    'repayChannel':this.headerfrom.region,
                })).then(run=>{
                    console.log(run)
                    for(var i in run.body.result.rows){
                        // console.log(run.body.result.rows[i].isInvoice)
                        if(run.body.result.rows[i].isInvoice == 0){
                            run.body.result.rows[i].isInvoice = '不开票'
                        }else if(run.body.result.rows[i].isInvoice == 1){
                            run.body.result.rows[i].isInvoice = '开票'
                        }
                        if(run.body.result.rows[i].repayChannel == 'underline_alipay'){
                            run.body.result.rows[i].repayChannel = '线下-支付宝'
                        }else if(run.body.result.rows[i].repayChannel == 'underline_wechat'){
                            run.body.result.rows[i].repayChannel = '线下-微信'
                        }else if (run.body.result.rows[i].repayChannel == 'underline_cash'){
                            run.body.result.rows[i].repayChannel = '线下-现金'
                        }else if (run.body.result.rows[i].repayChannel == 'underline_transfer'){
                            run.body.result.rows[i].repayChannel = '线下-转账'
                        }else if (run.body.result.rows[i].repayChannel == 'other'){
                            run.body.result.rows[i].repayChannel = '其他'
                        }else if (run.body.result.rows[i].repayChannel == 'underline_pos'){
                            run.body.result.rows[i].repayChannel = '线下-pos机刷卡'
                        }
                    };
                    this.tableData = run.body.result.rows;
                    this.total = run.body.result.total;
                })
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage),
                    this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/customer_repay_record',JSON.stringify({
                        'token':this.token,
                        'pageNum':this.currentPage,
                        'pageSize':this.pagesize,
                        'customerId':this.customerId,
                        'repayChannel':this.headerfrom.region,
                    })).then(run=>{
                        console.log(run)
                        for(var i in run.body.result.rows){
                            // console.log(run.body.result.rows[i].isInvoice)
                            if(run.body.result.rows[i].isInvoice == 0){
                                run.body.result.rows[i].isInvoice = '不开票'
                            }else if(run.body.result.rows[i].isInvoice == 1){
                                run.body.result.rows[i].isInvoice = '开票'
                            }
                            if(run.body.result.rows[i].repayChannel == 'underline_alipay'){
                                run.body.result.rows[i].repayChannel = '线下-支付宝'
                            }else if(run.body.result.rows[i].repayChannel == 'underline_wechat'){
                                run.body.result.rows[i].repayChannel = '线下-微信'
                            }else if (run.body.result.rows[i].repayChannel == 'underline_cash'){
                                run.body.result.rows[i].repayChannel = '线下-现金'
                            }else if (run.body.result.rows[i].repayChannel == 'underline_transfer'){
                                run.body.result.rows[i].repayChannel = '线下-转账'
                            }else if (run.body.result.rows[i].repayChannel == 'other'){
                                run.body.result.rows[i].repayChannel = '其他'
                            }else if (run.body.result.rows[i].repayChannel == 'underline_pos'){
                                run.body.result.rows[i].repayChannel = '线下-pos机刷卡'
                            }
                        };
                        this.tableData = run.body.result.rows;
                        this.total = run.body.result.total;
                    })
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
        }
    }
</script>
<style lang="scss" scoped>
    .main{

        .header{
            margin-bottom: 20px;
        }
    }
</style>