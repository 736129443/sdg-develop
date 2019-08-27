<template>
    <div class="main">
        <p>当前位置 ： 辅助工具 > 车贴补贴设置</p>
        <div class="msg">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="车贴补贴金额">
                    <el-input v-model.trim="formInline.depositMoney" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="元"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
            <div class="titleSize">
                <span>车 贴 补 贴 金 额 设 置 记 录</span>
            </div>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="tagsMoney"
                        align="center"
                        label="金额">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        align="center"
                        :formatter="dateFormat"
                        label="提交时间">
                </el-table-column>
                <el-table-column
                        prop="optAdmin"
                        align="center"
                        label="提交人">
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pagesize"
                    layout="total, prev, pager, next"
                    :total='total'>
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                formInline: {
                    depositMoney: '',
                },
                tableData: [],
                total:0,
                currentPage:1,
                pagesize:10,
                token:'',
            }
        },
        created(){
            //token
            let tokenLisk = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token =  tokenLisk.result.token;
            //列表
            this.data()
        },
        methods: {
            data(){
                let page = JSON.stringify({
                    token : this.token,
                    pageNum : this.currentPage,
                    pageSize : this.pagesize,
                })
                console.log(page);
                this.$http.post(this.global.lightningUrl + 'companyv1/finance/query/admin_management/query_money' , page,{
                    // this.$http.post('http://192.168.50.33:8099/account/tagsRecord' , page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res)
                    this.tableData = res.body.result.rows;
                    this.total = res.body.result.total
                })
            },
            onSubmit() {
                if (this.formInline.depositMoney == ''){
                    this.$message.error('请输入金额 ！');
                }else if (!this.formInline.depositMoney.match(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/)) {
                    this.$message({
                        message: '请输入数字，或小数点后两位 ！',
                        type: 'warning'
                    });
                }else {
                    this.$confirm('金额 : '+ this.formInline.depositMoney , '请确认车贴补贴金额，是否提交？', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        // type: 'warning'
                    }).then(() => {
                        console.log('确定');
                        let page = JSON.stringify({
                            token : this.token,
                            tagsMoney : this.formInline.depositMoney
                        })
                        // this.$http.post('http://192.168.50.33:8099/account/tagsSetting',page,{
                        this.$http.post(this.global.lightningUrl + '/companyv1/finance/business/usage_money/set' , page,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res)=>{
                            this.$message({
                                message: '提交成功！',
                                type: 'success'
                            });
                            console.log(res);
                            this.data()
                            this.formInline.depositMoney=''
                        })
                    }).catch(() => {
                        console.log('取消');
                    });
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.data()
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
<style lang="scss">
    .msg{
        margin-top: 20px;
        .el-message-box__content{
            font-size: 16px;
        }
        .titleSize{
            width: 100%;
            font-size: 16px;
            line-height: 40px;
            text-align: center;
            padding-bottom: 10px;
        }
    }
</style>