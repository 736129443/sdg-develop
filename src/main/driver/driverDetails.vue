<template>
    <div class="main">
        <div class="header">
            <p> 当前位置：司机管理 > 运输公司 > 司机明细</p>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="司机姓名">
                <el-input v-model.trim="formInline.name" onkeyup="this.value=this.value.replace(/\s+/g,'')"   placeholder="请输入司机姓名"></el-input>
            </el-form-item>
            <el-form-item label="司机电话">
                    <el-input v-model.trim="formInline.phone" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入司机电话"></el-input>
            </el-form-item>
            <el-form-item label="车型">

                <el-select v-model="formInline.vehicleType" placeholder="车型">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(val,key) in arr"
                               :key="key"
                               :label="val"
                               :value="val"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="常跑城市">
                <el-input v-model.trim="formInline.usualRunArea" onkeyup="this.value=this.value.replace(/\s+/g,'')"   placeholder="请输入常跑城市"> </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <!--<el-button type="primary" @click="onSubmit_dc" >导出</el-button>-->
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="driverId"
                    label="编号"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="司机姓名"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    align="center"
                    label="电话">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    align="center"
                    label="性别">
            </el-table-column>
            <el-table-column
                    prop="vehicleType"
                    align="center"
                    label="车型">
            </el-table-column>
            <el-table-column
                    prop="address"
                    align="center"
                    label="地址">
            </el-table-column>
            <el-table-column
                    prop="usualRunArea"
                    align="center"
                    label="常跑城市">
            </el-table-column>
            <el-table-column
                    prop="deliveryExperience"
                    align="center"
                    label="配送经验">
            </el-table-column>
            <el-table-column
                    prop="runTimes"
                    align="center"
                    label="出车次数">
            </el-table-column>
            <el-table-column
                prop="joinTeamTime"
                align="center"
                :formatter="dateFormat"
                label="加入车队时间">
            </el-table-column>
            <el-table-column
                    prop="lastDeliver"
                    align="center"
                    :formatter="dateFormat"
                    label="最后出车日期">
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="deposit"-->
                    <!--align="center"-->
                    <!--label="押金">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                    <!--prop="ableToCash"-->
                    <!--align="center"-->
                    <!--label="可提现金额">-->
            <!--</el-table-column>-->
            <el-table-column
                    prop="lastLoginTime"
                    align="center"
                    :formatter="dateFormatHM"

                    label="最后心跳">
            </el-table-column>
        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="total">
        </el-pagination>
    </div>
</template>
<script>
    import moment from 'moment'
    const CarModel = ['厢式货车','冷藏车','小面包','依维柯','商务车','电动车','轿车','中巴','高顶','平顶','金杯','敞车','高栏','平板','栏板','全顺'];
    export default {
        data(){
            return{
                formInline: {
                    name: '',
                    phone:'',
                    vehicleType:'',
                    usualRunArea:'',
                },
                tableData: [],
                token:'',
                total:0,
                currentPage:1,
                pageSize:10,
                belongTeam:'',
                arr:CarModel,
            }
        },
        created(){
            let token =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = token.result.token;
            this.data()
        },
        methods:{
            data(){
                this.belongTeam = window.sessionStorage.id ;
                let page = JSON.stringify({
                    token: this.token,
                    belongTeam : this.belongTeam,
                    pageSize:this.pageSize,
                    pageNum:this.currentPage,
                })
                console.log(page);
                this.ajax(page)
            },
            ajax(page){
                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_driver_by_team',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.body.result == null){
                        this.total = 0;
                        this.tableData = ''
                    } else {
                        this.total = res.body.result.total;
                        this.tableData = res.body.result.list;
                        for (let i = 0 ; i < this.tableData.length ; i++){


                            if (this.tableData[i].vehicleType != ''&&this.tableData[i].vehicleType != null &&this.tableData[i].vehicleType != undefined ){
                                this.tableData[i].vehicleType = JSON.parse(this.tableData[i].vehicleType).name + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).isElectric + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).isTailBoard + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).length + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).isCertificate + ' '
                                    + JSON.parse(this.tableData[i].vehicleType).isCold
                            } else {
                                this.tableData[i].vehicleType = ''
                            }
                        }
                    }

                })
            },
            onSubmit() {
                console.log(window.sessionStorage.id);
                let page = JSON.stringify({
                    token : this.token,
                    name : this.formInline.name,
                    phone : this.formInline.phone,
                    vehicleType : this.formInline.vehicleType,
                    usualRunArea : this.formInline.usualRunArea,
                    belongTeam: window.sessionStorage.id,
                    pageSize:this.pageSize,
                    pageNum:this.currentPage = 1,
                });
                console.log(page);
                this.ajax(page)
            },
            onSubmit_dc(){

            },
            handleCurrentChange(val){
                this.currentPage = val;
                let page = JSON.stringify({
                    token : this.token,
                    name : this.formInline.name,
                    phone : this.formInline.phone,
                    vehicleType : this.formInline.vehicleType,
                    usualRunArea : this.formInline.usualRunArea,
                    belongTeam: window.sessionStorage.id,
                    pageSize:this.pageSize,
                    pageNum:this.currentPage ,
                });
                this.ajax(page)
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            dateFormatHM:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH-mm");
            },
        },

    }
</script>
<style lang="scss" scoped>
    .header{
        margin-bottom: 20px;
    }
</style>