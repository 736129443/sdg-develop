<template>
    <div class="main">
        <div class="header">
            <p> 当前位置：辅助工具 > 消息反馈</p>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="类型">
                <el-select v-model="formInline.type" placeholder="请选则类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="平台" value="平台"></el-option>
                    <el-option label="结算" value="结算"></el-option>
                    <el-option label="司机服务" value="司机服务"></el-option>
                    <el-option label="客户服务" value="客户服务"></el-option>
                    <el-option label="运营管理" value="运营管理"></el-option>
                    <el-option label="其他建议" value="其他建议"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="来源">
                <el-select v-model="formInline.source" placeholder="请选则来源">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="司机App" value="driverApp"></el-option>
                    <el-option label="客户App" value="customerApp"></el-option>
                    <el-option label="企业物流管理系统" value="customerWeb"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formInline.Status" placeholder="请选则状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已处理" value="1"></el-option>
                    <el-option label="未处理" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="反馈时间">
            <el-date-picker
                    v-model="formInline.time"
                    type="daterange"
                    range-separator="至"
                    value-format="timestamp"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="feedbackTime"
                    align="center"
                    :formatter="dateFormatHM"
                    label="反馈时间"
            >
            </el-table-column>
            <el-table-column
                    prop="type"
                    align="center"
                    label="类型"
                   >
            </el-table-column>
            <el-table-column
                    prop="content"
                    align="center"
                    label="内容"
                    >
            </el-table-column>
            <el-table-column
                    prop="feedbackSource"
                    align="center"
                    label="来源"
            >
            </el-table-column>
            <el-table-column
                    prop="feedbackPerson"
                    align="center"
                    label="姓名"
            >
            </el-table-column>
            <el-table-column
                    prop="phone"
                    align="center"
                    label="联系电话"
            >
            </el-table-column>
            <el-table-column
                    prop="status"
                    align="center"
                    label="状态"
            >
            </el-table-column>
            <el-table-column
                    prop="adminName"
                    align="center"
                    label="处理人"
            >
            </el-table-column>
            <el-table-column
                    prop="replyTime"
                    align="center"
                    :formatter="dateFormatHM"
                    label="处理时间"
            >
            </el-table-column>
            <el-table-column
                    prop="platformReply"
                    align="center"
                    label="处理结果"
            >
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="onSubmit_hf(scope.$index)" v-if="tableData[scope.$index].status=='未处理'?true:false" >回复</el-button>
                    <el-button type="text" size="small"  v-if="tableData[scope.$index].status=='已处理'?true:false">已回复</el-button>
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
        <!--回复-->
        <el-dialog
                title="处理内容"
                :visible.sync="dialogVisible"
                width="550px"
                :before-close="handleClose">
            <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="textarea">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false,textarea=''">取 消</el-button>
                <el-button type="primary" @click="onSubmit_tj">提 交</el-button>
              </span>
        </el-dialog>
        <!--查看-->
        <!--<el-dialog-->
                <!--title="提示"-->
                <!--:visible.sync="dialogVisible_ck"-->
                <!--width="550px">-->
            <!--<el-form :model="form" label-width="80px">-->
                <!--<el-form-item label="处理结果">-->
                    <!--<el-input type="textarea" v-model="form.desc" disabled></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="处理人">-->
                    <!--<el-input v-model="form.name" disabled></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="处理时间">-->
                    <!--<el-date-picker-->
                            <!--v-model="form.time"-->
                            <!--disabled-->
                            <!--type="datetime"-->
                            <!--value-format="timestamp"-->
                            <!--:formatter="dateFormatHM"-->
                            <!--default-time="12:00:00">-->
                    <!--</el-date-picker>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button @click="dialogVisible_ck = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="dialogVisible_ck = false">确 定</el-button>-->
            <!--</span>-->
        <!--</el-dialog>-->
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        data() {
            return {
                formInline: {
                    type: '',
                    source: '',
                    Status:'',
                    time:'',
                },
                tableData: [],
                textarea:'',
                input:'',
                total:0,
                currentPage:1,
                pageSize:10,
                dialogVisible: false,
                dialogVisible_ck: false,
                token:'',
                form:{
                    desc:'',
                    name:'',
                    time:'',
                },
                id:'',
            }
        },
        created(){
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.data()
        },
        methods: {
            dateFormatHM :function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            data(){
                let page = JSON.stringify({
                    token : this.token,
                    pageNum : this.currentPage,
                    pageSize : this.pageSize,
                    // type: this.formInline.type,
                    // status: this.formInline.status,
                    // feedbackSource: this.formInline.source,
                })
                console.log(page);
                this.ajax(page)
            },
            ajax(page){
                this.$http.post( this.global.lightningUrl + '/companyv1/serviceCenter/customer_service/feedback_list',page , {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    this.total = res.body.result.total;
                    this.tableData = res.body.result.rows;
                    for (let i = 0 ; i <  this.tableData.length; i++){
                        if (this.tableData[i].status == 0){
                            this.tableData[i].status = '未处理'
                        } else {
                            this.tableData[i].status = '已处理'
                        }
                        if ( this.tableData[i].feedbackSource=='driverApp' ) {
                            this.tableData[i].feedbackSource = '司机App'
                        }else if(this.tableData[i].feedbackSource=='customerApp'){
                            this.tableData[i].feedbackSource = '客户App'
                        }else {
                            this.tableData[i].feedbackSource = '企业物流管理系统'
                        }
                    }
                })
            },
            onSubmit(){
                if (this.formInline.time[0] == this.formInline.time[1]){
                    var page = JSON.stringify({
                        token : this.token,
                        pageNum : this.currentPage =1 ,
                        pageSize : this.pageSize,
                        type: this.formInline.type,
                        status: this.formInline.Status,
                        feedbackSource: this.formInline.source,
                        startTime: this.formInline.time[0],
                        endTime: this.formInline.time[0]+ 86400000 - 1,
                    })
                }else {
                    var page = JSON.stringify({
                        token : this.token,
                        pageNum : this.currentPage=1 ,
                        pageSize : this.pageSize,
                        type: this.formInline.type,
                        status: this.formInline.Status,
                        feedbackSource: this.formInline.source,
                        startTime: this.formInline.time[0],
                        endTime: this.formInline.time[1]+ 86400000 - 1,

                    })
                }
                console.log(page);
               this.ajax(page)

            },
            onSubmit_hf(_index) {
                this.dialogVisible = true;
                this.id = this.tableData[_index].id
            },
            // onSubmit_ck(_index){
            //     this.dialogVisible_ck = true;
            //     this.form.desc = this.tableData[_index].platformReply;
            //     this.form.name = this.tableData[_index].adminName;
            //     this.form.time = this.tableData[_index].replyTime;
            //     console.log( this.form.time);
            // },
            onSubmit_tj(){
                if (this.textarea.match(/^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{2,200}$/)){
                    let  page = JSON.stringify({
                        platformReply: this.textarea,
                        token: this.token,
                        id: this.id
                    })
                    console.log(page);
                    this.$http.post( this.global.lightningUrl + '/companyv1/serviceCenter/customer_service/platform_reply' , page , {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then( (res)=>{
                        console.log(res);
                        if (res.body.errcode == 0) {
                            this.dialogVisible = false
                            this.data()
                            this.textarea = ''
                        }
                    })
                }else{
                        this.$message('请输入至少2个，最多200个字符！');

                }

            },
            handleClose(done) {
                this.dialogVisible = false;
                this.textarea = ''
            },
            handleCurrentChange(val) {
                this.currentPage = val
                if (this.formInline.time[0] == this.formInline.time[1]){
                    var page = JSON.stringify({
                        token : this.token,
                        pageNum : this.currentPage ,
                        pageSize : this.pageSize,
                        type: this.formInline.type,
                        status: this.formInline.Status,
                        feedbackSource: this.formInline.source,
                        startTime: this.formInline.time[0],
                        endTime: this.formInline.time[0]+ 86400000 - 1,
                    })
                }else {
                    var page = JSON.stringify({
                        token : this.token,
                        pageNum : this.currentPage ,
                        pageSize : this.pageSize,
                        type: this.formInline.type,
                        status: this.formInline.Status,
                        feedbackSource: this.formInline.source,
                        startTime: this.formInline.time[0],
                        endTime: this.formInline.time[1]+ 86400000 - 1,

                    })
                }
                console.log(page);
                this.ajax(page)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .header{
        margin-bottom: 20px;
    }
</style>