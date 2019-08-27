<template>
    <div class="main">
        <div class="header">
            当前位置：<span>司机管理 > 新建车队申请记录</span>
        </div>
        <div>
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
                        align="center"
                        label="查看审批意见">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="opinions(scope.$index)" :disabled = 'arr[scope.$index]' >查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="submitId(scope.$index)" :disabled = 'arr1[scope.$index]' >编辑</el-button>
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

        </div>
        <!--查看审批详情-->
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
                    申请时间：{{approval_Customer.createTime | dateFrm}}<br><br><br>
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
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        created(){
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.id_dl = user.result.currentUser.id ;
            this.data()
        },
        data(){
            return {
                approval_Customer:[],
                approver:[],
                approvalDetails:false,
                id_dl:'',
                currentPage: 1,
                pageSize:10,
                total:0,
                token:'',
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
                tableData:[],
                arr:[],
                arr1:[],
            }
        },
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm");
            }
        },
        methods:{
            opinions(i){
                let page = JSON.stringify({
                    token:this.token,
                    itemId : this.tableData[i].leaderId,
                })
                console.log(page);
                this.$http.post(this.global.lightningUrl +'/companyv1/driverManage/team/viewApproval',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    if (res.body.errcode == 0 ){
                        this.approvalDetails = true
                        this.approval_Customer = this.tableData[i]
                        this.approver = res.body.result
                    }
                })
            },
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
                          this.arr.push(true)
                          if (this.tableData[i].adminId == this.id_dl) {
                              // if (this.tableData[i].auditStatus == 'approving') {
                              this.arr[i] = false
                              // }else{
                              //     this.arr[i] = false
                              // }
                          }else{
                              this.arr[i] = true
                          }
                          this.arr1.push(true)
                          if (this.tableData[i].adminId == this.id_dl) {
                              if (this.tableData[i].auditStatus == 'approving') {
                              this.arr1[i] = true
                              }else{
                                  this.arr1[i] = false
                              }
                          }else{
                              this.arr1[i] = true
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
                this.currentPage = 1;
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
            submitId(_index){
                let id = '0';
                let i = this.tableData[_index].id;
                let j = 1;

                // window.sessionStorage.setItem('id',this.tableData[_index].id)
                window.sessionStorage.setItem('id',JSON.stringify({i,j}))
                this.$router.push({path: '/transportCompany/newcompany/'+ id});
            },
        },
    }
</script>

<style scoped lang="scss">
    .main {
        .header{
            margin-bottom: 20px;
        }
    }
</style>