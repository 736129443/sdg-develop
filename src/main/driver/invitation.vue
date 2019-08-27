<template>
    <div class="main" style="background-color: white">
        <div class="header">
            <p  > 当前位置：司机详情 > 推广信息 > 推荐记录</p>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="司机注册进度">
                <el-select v-model="formInline.certifyStatus" placeholder="请选择司机注册进度">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="未认证" value="un_certifiy"></el-option>
                    <el-option label="已认证" value="certify_success"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否有效期内">
                <el-select v-model="formInline.isInValid" placeholder="请选择是否有效期内">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="是" value="in_valid"></el-option>
                    <el-option label="否" value="out_valid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="奖励状态">
                <el-select v-model="formInline.awardStatus" placeholder="请选择奖励状态">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="未奖励" value="unaward"></el-option>
                    <el-option label="已奖励" value="awarded"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="inviteeName"
                    align="center"
                    label="推荐司机">
            </el-table-column>
            <el-table-column
                    prop="inviteePhone"
                    label="司机电话"
                    align="center"
                    >
            </el-table-column>
            <el-table-column
                    prop="inviteeStatus"
                    align="center"
                    label="完成进度">
            </el-table-column>
            <el-table-column
                    prop="isInValid"
                    align="center"
                    label="是否有效期内">
            </el-table-column>
            <el-table-column
                    prop="inviteeRegiestTime"
                    align="center"
                    :formatter="dateFormatHm"
                    label="注册时间">
            </el-table-column>
            <el-table-column
                    prop="awarded"
                    align="center"
                    label="当次奖励金额（元）">
            </el-table-column>
            <el-table-column
                    prop="awardStatus"
                    align="center"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="totalEarn"
                    align="center"
                    label="奖励总金额（元）">
            </el-table-column>
        </el-table>
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
        created(){
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let userIds =JSON.parse(Base64.decode(sessionStorage.getItem('rows')));
            this.userId = userIds;
            this.data()
        },
        data(){
            return{
                formInline:{
                    certifyStatus:''
                },
                tableData:[],
                userId:'',
                token:'',
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
            }
        },
        methods:{
            dateFormatHm:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            ajax(page){
                this.$http.post( this.global.lightningUrl + '/companyv1/driverPromotion/recordsForBackWeb' , page , {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then( (res)=>{
                    console.log(res);
                    this.tableData= res.body.result.list;
                    this.total =res.body.result.pager.totalCount;
                    for (let i = 0 ; i <this.tableData.length; i++) {
                        if (this.tableData[i].inviteeStatus == 'un_certifiy'){
                            this.tableData[i].inviteeStatus = '未认证'
                        } else if (this.tableData[i].inviteeStatus == 'certify_success'){
                            this.tableData[i].inviteeStatus = '已认证'
                        }
                        if (this.tableData[i].isInValid == 'in_valid'){
                            this.tableData[i].isInValid = '是'
                        } else if (this.tableData[i].isInValid == 'out_valid'){
                            this.tableData[i].isInValid = '否'
                        }
                        if (this.tableData[i].awardStatus == 'unaward'){
                            this.tableData[i].awardStatus = '未奖励'
                        } else if (this.tableData[i].awardStatus == 'awarded'){
                            this.tableData[i].awardStatus = '已奖励'
                        }
                    }
                })
            },
            data(){
                let page = JSON.stringify({
                    token:this.token,
                    userId: this.userId,
                    pageNo: this.currentPage,
                    pageSize: this.pagesize,
                    certifyStatus:this.formInline.certifyStatus,
                    isInValid:this.formInline.isInValid,
                    awardStatus:this.formInline.awardStatus,
                })
                this.ajax(page)
            },
            onSubmit(){

                let page = JSON.stringify({
                    token:this.token,
                    userId: this.userId,
                    pageNo: this.currentPage=1,
                    pageSize: this.pagesize,
                    certifyStatus:this.formInline.certifyStatus,
                    isInValid:this.formInline.isInValid,
                    awardStatus:this.formInline.awardStatus,
                })
                console.log(page);
                this.ajax(page)
            },
            handleCurrentChange(val){
                this.currentPage=val
                let page = JSON.stringify({
                    token:this.token,
                    userId: this.userId,
                    pageNo: this.currentPage,
                    pageSize: this.pagesize,
                    certifyStatus:this.formInline.certifyStatus,
                    isInValid:this.formInline.isInValid,
                    awardStatus:this.formInline.awardStatus,
                })
                this.ajax(page)
            }
        },
    }
</script>
<style lang="scss" scoped>

    .main{
        background:#eaedf2;
        .header{
            margin-bottom: 50px;
        }
    }
</style>