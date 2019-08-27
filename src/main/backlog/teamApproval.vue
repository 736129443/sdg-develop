<template>
    <div class="main">
        <div class="header">
            当前位置：<span>待办事项 > 车队审批列表</span>
        </div>
        <div class="a">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="车队名称：">
                    <el-input v-model.trim="formInline.team" onkeyup="this.value=this.value.replace(/\s+/g,'')"   placeholder="请输入车队名称"></el-input>
                </el-form-item>
                <el-form-item label="车队长电话：">
                    <el-input v-model.trim="formInline.leaderPhone"  onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入车队长电话"></el-input>
                </el-form-item>
                <el-form-item label="运输公司名称：">
                    <el-input v-model.trim="formInline.company" onkeyup="this.value=this.value.replace(/\s+/g,'')"   placeholder="请输入运输公司名称"></el-input>
                </el-form-item>
                <el-form-item label="车队类型：">
                    <el-select v-model="formInline.type" placeholder="请选择车队类型">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="自建型" value="selfBuild"></el-option>
                        <el-option label="家庭型" value="family"></el-option>
                        <el-option label="企业型" value="company"></el-option>
                        <el-option label="其他" value="other"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="车队经验：">-->
                    <!--<el-select v-model="formInline.experience" placeholder="请选择车队经验">-->
                        <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="审批状态：">
                    <el-select v-model="formInline.auditStatus" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="审批中" value="approving"></el-option>
                        <el-option label="已通过" value="accepted"></el-option>
                        <el-option label="未通过" value="rejected"></el-option>
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
                        prop="regionName"
                        label="管理区"
                        align="center"
                >
                    <!--regionName-->
                </el-table-column>
                <el-table-column
                        prop="filialeName"
                        label="所属分公司"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="team"
                        label="车队名称"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="leaderName"
                        label="车队长姓名"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="leaderPhone"
                        align="center"
                        label="车队长电话">
                </el-table-column>
                <el-table-column
                        prop="company"
                        align="center"
                        label="运输公司名称">
                </el-table-column>
                <el-table-column
                        prop="yunli"
                        align="center"
                        label="运营专员">
                </el-table-column>
                <el-table-column
                        prop="type"
                        align="center"
                        label="车队类型">
                </el-table-column>
                <el-table-column
                        prop="auditStatus"
                        align="center"
                        label="审批状态">
                </el-table-column>
                <el-table-column
                        prop="createBy"
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
                        label="审批状态"
                        align="center"
                >

                        <template slot-scope="scope">
                            <!--<el-button @click="handleClick(scope.$index)" type="text" size="small"-->
                            <!--:disabled='arr[scope.$index]'>审核-->
                            <!--</el-button>-->
                            <el-button type="text" size="small"
                                       v-if="tableData[scope.$index].auditStatus == '已通过'">已通过
                            </el-button>

                            <el-popover
                                    v-if="tableData[scope.$index].auditStatus == '未通过'"
                                    placement="right"
                                    trigger="hover"
                            >
                                <el-form  label-width="80px">
                                    <el-form-item label="审批意见">
                                        <el-input
                                                disabled
                                                type="textarea"
                                                placeholder="请输入内容"
                                                resize="none"
                                                v-model="tableData[scope.$index].approvalOption">
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                                <el-button slot="reference" type="text">未通过</el-button>
                            </el-popover>



                            <el-button type="text" size="small" @click="handleClick(scope.$index)"
                                       v-if="(tableData[scope.$index].auditStatus == '审批中'&&tableData[scope.$index].currentApproval == true)">审核
                            </el-button>
                            <el-button type="text" size="small"
                                       v-if="(tableData[scope.$index].auditStatus == '审批中'&&tableData[scope.$index].currentApproval == false)">审核中
                            </el-button>
                        </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="查看审批意见"
                        align="center"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="approvalDetails =true,onapprovalDetails(scope.$index)">查看</el-button>
                    </template>
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
            <el-dialog title='新建车队审批' center  :visible.sync="dialogFormVisible" class="dialog" :before-close="handleClose" width="900px">
                <div class="message_a">
                    <div class="massage_left">
                        <div class="massage_top">
                            <el-row>
                                <el-col :span="11"><span>运输公司名称 ： </span>{{link.company}}</el-col>
                                <el-col :span="2"></el-col>
                                <el-col :span="11"><span>车队名称 ： </span>{{link.team}}</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11"><span>所在城市 ： </span>{{link.city}}</el-col>
                                <el-col :span="2"></el-col>
                                <el-col :span="11"><span>所属分公司 ：</span>{{link.filialeName}} </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11"><span>所在管理区 ： </span>{{link.regionName}}</el-col>
                                <el-col :span="2"></el-col>
                                <el-col :span="11"><span>所属运营 ：</span>{{link.yunli}} </el-col>
                            </el-row>
                        </div>
                        <div class="massage_bottom">

                            <!--<el-row>-->
                                <!--<el-col :span="11"><span>合同编号 ： </span>{{link.team}}</el-col>-->
                                <!--<el-col :span="2"></el-col>-->
                                <!--<el-col :span="11"><span>电子合同 ： </span>{{link.team}}</el-col>-->
                            <!--</el-row>-->
                            <el-row>
                                <el-col :span="11"><span>车队长姓名 ： </span>{{link.leaderName}}</el-col>
                                <el-col :span="2"></el-col>
                                <el-col :span="11"><span>车队司机人数 ： </span>{{link.driverNum}}</el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11"><span>车队经验 ： </span>{{link.experience}}</el-col>
                                <el-col :span="2"></el-col>
                                <el-col :span="11"><span>车队类型 ：</span>{{link.type}} </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="massage_right">
                        <div style="padding: 9px 20px">
                            <div  style="margin-bottom: 20px">
                                <div style="margin-bottom: 10px">营业执照 ： </div>
                                <div style="width: 150px;height: 90px;" class="bgc_im">
                                    <img :src="imageList1[0]" alt="" @click="imgesCarousel=true" style="margin-top: 20px" width="150px" height="90px">
                                </div>
                            </div>
                            <div>
                                <div style="margin-bottom: 10px">税务登记证 ： </div>
                                <div style="width: 150px;height: 90px;" class="bgc_im">
                                    <img :src="imageList1[1]" alt="" @click="imgesCarousel=true"  style="margin-top: 162px" width="150px" height="90px" >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog_top">
                    <el-row>
                        <el-col :span="24">
                            审批意见：
                            <el-radio v-model="radio" label="accepted">同意</el-radio>
                            <el-radio v-model="radio" label="rejected">退回</el-radio>
                            <br>
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    resize="none"
                                    v-model="textarea">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="teamsubmit" >提交</el-button>
                    <el-button   @click="dialogFormVisible = false;radio='accepted';textarea=''" >取消</el-button>
                </span>
            </el-dialog>
            <div class="min_w">
                <el-dialog
                        title="查看审批详情"
                        :visible.sync="approvalDetails"
                        width="30%"
                        min-width = '650px'
                >
                    <div style="width: 100%;padding: 0 20px">
                        车队名称：{{approval_Customer.team}} <br>
                        申请人：&nbsp;&nbsp;&nbsp;{{approval_Customer.createBy}}<br>
                        申请时间：{{approval_Customer.createTime | dateFrm}}<br><br>
                        <div v-for="i in approver" style="width: 100%;padding: 20px 0 0 0 " >
                            审批人：&nbsp;&nbsp;&nbsp;{{i.approvalName}} <br>
                            审批意见：<span v-if="i.auditOpinion"></span>{{i.auditOpinion}}<br>
                            申请时间：<span v-if="i.auditTime">{{i.auditTime}}</span>
                        </div>

                    </div>

                    <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="approvalDetails = false">确 定</el-button>
            </span>
                </el-dialog>

            </div>
            <!--图片轮播-->
            <el-dialog
                    :visible.sync="imgesCarousel"
                    width="800px"
            >
                <el-carousel trigger="click" height="600px">
                    <el-carousel-item v-for="item in imageList1" :key="item">
                        <img :src="item" alt=""  width="800px" height="600px" >
                    </el-carousel-item>
                </el-carousel>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        created(){
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.data() ;
        },
        data(){
            return {
                currentPage: 1,
                pageSize:10,
                total:0,
                token:'',
                approvalDetails: false,
                imgesCarousel:false,
                approval_Customer:[],
                approver:[],
                options: [{
                    value: '生鲜农产品',
                    label: '生鲜农产品'
                },{
                    value: '食品行业',
                    label: '食品行业'
                },{
                    value: '快消品',
                    label: '快消品'
                },{
                    value: '电子产品',
                    label: '电子产品'
                },{
                    value: '图书',
                    label: '图书'
                },{
                    value: '服装',
                    label: '服装'
                },{
                    value: '建材',
                    label: '建材'
                },{
                    value: '家具',
                    label: '家具'
                },{
                    value: '汽车配件',
                    label: '汽车配件'
                },{
                    value: '医药',
                    label: '医药'
                },{
                    value: '物流行业',
                    label: '物流行业'
                },{
                    value: '快运行业',
                    label: '快运行业'
                },{
                    value: '快递行业',
                    label: '快递行业'
                },{
                    value: '专车直送',
                    label: '专车直送'
                },{
                    value: '落地配',
                    label: '落地配'
                },{
                    value: '商超',
                    label: '商超'
                },{
                    value: '餐饮店',
                    label: '餐饮店'
                },{
                    value: '学校食堂',
                    label: '学校食堂'
                },{
                    value: '机关单位',
                    label: '机关单位'
                },{
                    value: '部队',
                    label: '部队'
                },{
                    value: '智能柜',
                    label: '智能柜'
                },],
                formInline:{},
                tableData:[
                ],
                dialogFormVisible:false,
                radio:'accepted',
                textarea : '',
                link:'',
                imageList1:[],
                imageList:[]

            }
        },
        methods:{
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            ajax(){
                let page = JSON.stringify({
                    token:this.token,
                    pageSize:this.pageSize,
                    pageNum:this.currentPage,
                    team :this.formInline.team,
                    leaderPhone :this.formInline.leaderPhone,
                    company :this.formInline.company,
                    type :this.formInline.type,
                    experience :this.formInline.experience,
                    auditStatus :this.formInline.auditStatus,
                    "backlogType":this.$route.query.status == 'backlog'?'backlog': "history"
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/driverManage/team/teamApproveList',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    this.total = res.body.result.total ;
                    this.tableData = res.body.result.rows ;
                    if (this.tableData!=undefined){
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].type =="selfBuild" ) {
                                this.tableData[i].type = '自建型'

                            }else if (this.tableData[i].type =="family" ) {
                                this.tableData[i].type = '家庭型'

                            }else if (this.tableData[i].type =="company" ) {
                                this.tableData[i].type = '企业型'

                            }else if (this.tableData[i].type =="other" ) {
                                this.tableData[i].type = '其他'
                            }
                            if (this.tableData[i].auditStatus =="approving" ) {
                                this.tableData[i].auditStatus = '审批中'

                            }else if (this.tableData[i].auditStatus =="accepted" ) {
                                this.tableData[i].auditStatus = '已通过'

                            }else if (this.tableData[i].auditStatus =="rejected" ) {
                                this.tableData[i].auditStatus = '未通过'

                            }
                        }

                    }
                })
            },
            data(){
                this.ajax()
            },
            onSubmit(){
                this.currentPage = 1 ;
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
            handleClick(_index) {
                this.imageList1=[] ;
                let page = JSON.stringify({
                    token:this.token,
                    leaderId: this.tableData[_index].leaderId
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/driverManage/team/view',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    this.dialogFormVisible = true ;
                    this.link = res.body.result ;
                    if (this.link.type == 'selfBuild'){
                        this.link.type = '自建型'
                    } else if (this.link.type == 'family'){
                        this.link.type = '家庭型'
                    } else if (this.link.type == 'company'){
                        this.link.type = '企业型'
                    }else if (this.link.type == 'other'){
                        this.link.type = '其他'
                    }
                    // let a = {url :this.link.taxPic,name : '' }
                    this.imageList1.push(this.link.businessPic) ;

                    this.imageList1.push(this.link.taxPic) ;
                    this.link.leaderId =  this.tableData[_index].leaderId
                })

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.radio = 'accepted';
                        this.textarea='' ;
                        done();
                    })
                    .catch(_ => {});
            },
            onapprovalDetails(_index){
                console.log(this.tableData[_index].trackId);
                this.approval_Customer = this.tableData[_index] ;

                let page = JSON.stringify({
                    token:this.token,
                    itemId : this.tableData[_index].leaderId,
                    itemName : this.tableData[_index].itemName,

                })
                console.log(page);
                this.$http.post(this.global.lightningUrl +'/companyv1/driverManage/team/viewApproval',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.body.errcode == 0 ){
                        this.approvalDetails = true ;
                        // this.approval_Customer = this.tableData[_index];
                        this.approver = res.body.result
                    }
                })
            },
            teamsubmit(){
                if (this.textarea == ''){
                    this.$message('请输入审核意见！');
                    this.$message({
                        showClose: true,
                        message: '请输入审批意见！',
                        type: 'error'
                    });
                }else{
                    let page = JSON.stringify({
                        token:this.token,
                        leaderId: this.link.leaderId,
                        opinion:this.textarea,      //-- 审核意见
                        status:this.radio     //-- 审核状态 (accepted:通过|rejected:拒绝)
                    })
                    this.$http.post(this.global.lightningUrl +'/companyv1/driverManage/team/audit',page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res);
                        if (res.body.errcode == 0 ){
                            this.dialogFormVisible = false;
                            this.$message({
                                message: '提交成功！',
                                type: 'success'
                            });
                            this.radio='accepted';
                            this.textarea='';
                            this.data ();
                            this.backlog()
                        } else {
                            this.$message.error('提交失败，请联系管理员！');
                            this.dialogFormVisible = false;
                            this.data()
                        }
                    })
                }

            },

            backlog(){
                let backlog = JSON.stringify({
                    token : this.token,
                    "type":"backlogCount"
                })
                let backlogCount
                this.$http.post(this.global.lightningUrl +'/companyv1/userManage/backlog',backlog,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    backlogCount = res.body.result.backlogCount
                    this.$store.commit('onbacklog', backlogCount)
                })
            },
        },
        filters:{
            dateFrm:function (el) {
                return moment(el).format("YYYY-MM-DD")
            }
        }
    }
</script>
<style scoped lang="scss">
    .main {
        .header{
            margin-bottom: 20px;
        }
        .message_a{
            overflow: hidden;
            width: 100%;
            .massage_left{
                width: 75%;
                box-sizing: border-box;
                float: left;
                .massage_top{
                    margin-bottom: 15px;
                    background-color: #f4f5fa;
                    padding: 20px 35px;
                    .el-col{
                        margin-bottom: 10px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }

                }
                .massage_bottom{
                    padding: 20px 35px;
                    margin-bottom: 15px;
                    background-color: #f4f5fa;
                    .el-col{
                        margin-bottom: 10px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }

                }
            }
            .massage_right{
                float: right;
                background-color: #f9fafc;
                margin-left: 15px;
                box-sizing: border-box;
                width: 23%;
            }
        }
        .dialog_top{
            padding:  25px 35px;
            background-color: #f9fafc;
            .el-textarea{
                width: 80%;
                margin-left: 70px;
                margin-top: 15px;
            }
        }
        .bgc_im{
            background-image: url(../../images/MR.png);
            -webkit-background-size: 100%;
            background-size: 100%;
            background-repeat: no-repeat;

        }
        .a{
            .el-carousel__container{
                height: 600px;
            }
        }
    }
</style>