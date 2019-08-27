<template>
    <div class="mian freight">
        <div class="header">
            <p> 当前位置：财务管理 > 运费结算明细</p>
        </div>
        <div class="center">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="所属分公司">
                    <el-select v-model="formInline.filialeId" placeholder="请选择所属分公司">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in company" :label='i.filialeName' :value="i.filialeId"
                                   :key="i.filialeId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出车单编号">
                    <el-input v-model.trim="formInline.id3"
                              placeholder="请输入出车单编号"></el-input>
                </el-form-item>
                <el-form-item label="司机姓名">
                    <el-input v-model.trim="formInline.driverName"
                              placeholder="请输入司机姓名"></el-input>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-input v-model.trim="formInline.customerName"
                              placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="配送日期">
                    <el-date-picker
                        v-model="formInline.time"
                        type="daterange"
                        range-separator="至"
                        value-format="timestamp"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结算时间">
                    <el-date-picker
                        v-model="formInline.id6"
                        type="daterange"
                        range-separator="至"
                        value-format="timestamp"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="Export">导出</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" class="none" style="width: 100%">
                <el-table-column prop="filialeName" align="center" label="所属分公司"></el-table-column>
                <el-table-column prop="customerName" align="center" label="项目名称"></el-table-column>
                <el-table-column prop="type" align="center" label="项目类型"></el-table-column>
                <el-table-column prop="trackId" align="center" label="出车单编号"></el-table-column>
                <el-table-column prop="startTime" align="center" label="配送日期" :formatter="dateFormatHm"></el-table-column>
                <el-table-column prop="driverName" align="center" label="司机姓名"></el-table-column>
                <el-table-column prop="teamName" align="center" label="所属车队"></el-table-column>
                <el-table-column prop="transportsPrice" align="center" label="司机运费(元)"></el-table-column>
                <el-table-column prop="approverTime" align="center" label="结算时间" :formatter="dateFormatHm"></el-table-column>
            </el-table>
        </div>
        <div class="footer">
            <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :page-sizes="[10, 20, 30, 50]"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="total,prev, pager, next,sizes,jumper"
                :total="total">
            </el-pagination>
        </div>


    </div>
</template>

<script>
    import moment from 'moment'
    import {openPostWindow} from '../../js/report.js'
    export default {
        //运费结算
        name: "freight",
        data() {
            return{
                tableData:[],
                total: 0,
                currentPage: 1,
                pageSize: 10,
                company:[],
                token:'',
                page:{},
                formInline:{
                    // filialeId:'',//所属分公司
                    // id3:'',
                    // time:[],//时间
                    // driverName:'',//司机姓名
                    // customerName:'',//项目名称
                }
            }
        },
        created() {
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
        },
        mounted() {
            let page1 = JSON.stringify({
                token: this.token
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/area', page1, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res) => {
                this.company = res.body.result;
            })
            this.data();
        },
        methods:{
            dateFormatHm: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            data() {
                let page = JSON.stringify({
                    token:this.token,
                    conditionStr3: 'list',
                    id2:this.formInline.filialeId,//所属分公司
                    id3:this.formInline.id3,//出车单编号
                    id4:this.formInline.time == null ? "" :  this.formInline.time[0],//4和5是申请时间成对出现
                    id5:this.formInline.time == null ? "" :  this.formInline.time[1]+86400000-1,
                    id6:this.formInline.id6 == null ? "" :  this.formInline.id6[0],
                    id7:this.formInline.id6== null ? "" :  this.formInline.id6[1]+86400000-1,
                    conditionStr1:this.formInline.driverName,//司机名称
                    conditionStr2:this.formInline.customerName,//商户名称
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                });
                this.page = page;
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/cash_record_detail',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res.body.result);
                    if (res.body.errcode == 0) {
                        this.tableData = res.body.result.rows;
                        this.total = res.body.result.total;
                    }
                })
            },
            // 导出
            Export() {
                var exportLink = this.global.lightningUrl + '/companyv1/finance/report/export/cash_record_detail';
                openPostWindow(exportLink,this.page);
            },

            onSubmit(){
                this.currentPage = 1;
                this.data()
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.data()
            },
            handleSizeChange(val) {
                this.pageSize = val ;
                this.data();
            },
        }
    }
</script>

<style lang="scss" scoped>
    .freight{
        width:100%;
        overflow: auto;
        background: #EAEDF2;
        margin:10px;
        padding-bottom:40px;
        .header{
            padding:20px 0 ;
            font-size:16px;
        }
        .center{
        }
        .footer{
            padding:10px;
        }
    }
</style>