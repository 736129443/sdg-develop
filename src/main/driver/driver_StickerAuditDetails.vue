<template>
    <div class="main">
        <div class="header">
            当前位置：<span>司机管理>司机车贴查看</span>
        </div>
        <div class="center">
            <ul class="oul">
                <li>
                    <span>司机姓名 ：</span>
                    <span>{{CarSticker.driverName}}</span>
                </li>
                <li>
                    <span>司机电话 ：</span>
                    <span>{{CarSticker.driverPhone}}</span>
                </li>
            </ul>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="上传时间">
                    <el-date-picker
                            v-model="formInline.time"
                            type="daterange"
                            range-separator="至"
                            value-format="timestamp"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="审批状态">
                    <el-select v-model="formInline.auditStatus" placeholder="请选择审批状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="审批中" value="approving"></el-option>
                        <el-option label="已通过" value="accepted"></el-option>
                        <el-option label="未通过" value="rejected"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="补贴状态">
                    <el-select v-model="formInline.tagsStatus" placeholder="请选择补贴状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已补贴" value="已补贴"></el-option>
                        <el-option label="未补贴" value="未补贴"></el-option>
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
                        prop="id"
                        label="编号"
                        align="center"
                        >
                </el-table-column>
                <el-table-column
                        prop="uploadTime"
                        :formatter="dateFormat"
                        label="上传时间"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="auditStatus"
                        label="审批状态"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="tagsStatus"
                        label="补贴状态"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="tagsMoney"
                        label="补贴金额（元）"
                        align="center">
                </el-table-column>

                <el-table-column
                        label="操作"
                        align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.$index)" type="text" size="small">查看图片</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="total">
            </el-pagination>
            <!--图片-->
            <el-dialog
                    :visible.sync="dialogVisible"
                    width="800px"
                    height="800px"
                    :before-close="handleClose"
                   >
                <!--<span>这是一段信息</span>-->
                <!--<span slot="footer" class="dialog-footer">-->
                    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
                    <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
                <!--</span>-->


                <el-carousel trigger="click" >
                    <el-carousel-item v-for="item in arr" :key="item">
                        <!--<h3>{{ item }}</h3>-->
                        <img :src="item"  style="width:100%;height:100%;">
                    </el-carousel-item>
                </el-carousel>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        name: "driver_StickerAuditDetails",
        data(){
            return{
                token:'',
                CarSticker:'',
                formInline:{
                    time:''
                },
                tableData: [],
                total:0,
                currentPage:1,
                pageSize:10,
                dialogVisible:false,
                arr:[],
            }
        },
        created(){
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let CarSticker = JSON.parse(sessionStorage.getItem('managementid'));
            this.CarSticker = CarSticker;

            //页面首刷
            this.data();
        },
        methods:{
            data (){
                console.log(this.formInline.time);
                let page = JSON.stringify({
                    "token":this.token,
                    "userId":this.CarSticker.driverId,
                    //审核状态
                    "auditStatus":this.formInline.auditStatus,
                    //补贴状态
                    "tagsStatus":this.formInline.tagsStatus,
                    'pageNum':this.currentPage,
                    'pageSize': this.pageSize,
                    // 'startTime':this.formInline.time[0],
                    // 'endTime':this.formInline.time[1],
                })
                this.ajax(page)
            },
            ajax(page){
                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/vehicle_tags/query_history',page).then(run=>{
                    if(run.body.errcode == 0){
                        this.tableData = run.body.result.rows;
                        this.total =  run.body.result.total;
                        for ( let i = 0 ; i < this.tableData.length; i++ ){
                            if (this.tableData[i].auditStatus == 'approving') {
                                this.tableData[i].auditStatus = '审批中'
                            }else if (this.tableData[i].auditStatus == 'accepted') {
                                this.tableData[i].auditStatus = '已通过'
                            }else{
                                this.tableData[i].auditStatus = '未通过'
                            }
                        }
                    }
                })
            },
            onSubmit() {
                let page = JSON.stringify({
                    "token":this.token,
                    "userId":this.CarSticker.driverId,
                    //审核状态
                    "auditStatus":this.formInline.auditStatus,
                    //补贴状态
                    "tagsStatus":this.formInline.tagsStatus,
                    'pageNum':this.currentPage,
                    'pageSize': this.pageSize,
                    'startTime':this.formInline.time[0],
                    'endTime':this.formInline.time[1] +86400000-1,
                })
                console.log(page);
                this.ajax(page)
            },
            handleCurrentChange(val){

            },
            handleClick(_index){
                this.dialogVisible = true
                // console.log(this.tableData[_index].behindTags);
                // console.log(this.tableData[_index].leftTags);
                // console.log(this.tableData[_index].rightTags);
                this.arr.push(this.tableData[_index].behindTags);
                this.arr.push(this.tableData[_index].leftTags);
                this.arr.push(this.tableData[_index].rightTags);
                // this.arr.push('C:/Users/dell/Pictures/Camera Roll/微信截图_20180914093928.png')
                // this.arr.push('C:/Users/dell/Pictures/Camera Roll/微信截图_20180914093950.png');
                // this.arr.push('C:/Users/dell/Pictures/Camera Roll/微信截图_20180914093954.png');

                console.log(this.arr);
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            handleClose(done) {
                // this.$confirm('确认关闭？')
                //     .then(_ => {
                //         done();
                //     })
                //     .catch(_ => {});
                this.arr=[];
                done();


            }
        },
    }
</script>

<style scoped lang="scss">
    .main {
        padding: 30px;
        .center{
            padding:20px 0 ;
            background: white;
            .oul{
                width:100%;
                overflow: hidden;
                margin-bottom: 15px;
                li{
                    fonet-size:15px;
                    color:#303133;
                    float: left;
                    padding:0 20px;
                }
            }
            .el-carousel__item h3 {
                color: #475669;
                font-size: 14px;
                opacity: 0.75;
                line-height: 150px;
                margin: 0;
            }

            .el-carousel__item:nth-child(2n) {
                background-color: #99a9bf;
            }

            .el-carousel__item:nth-child(2n+1) {
                background-color: #d3dce6;
            }
        }
    }
</style>