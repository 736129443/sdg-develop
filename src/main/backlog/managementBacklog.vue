<template>
    <div class="main managementBacklog">
        <div class="header">
            当前位置 : 待办事项 > 物料申请审批列表
        </div>
        <div style="background: white;width: 100%;height: 100%">
            <div style="padding:20px;">
                <el-form :inline="true" :model="form_query" class="demo-form-inline">
                    <el-form-item label="所属分公司">
                        <el-select v-model="form_query.region" placeholder="所属分公司">
                            <el-option label="全部" value=""></el-option>
                            <el-option
                                    v-for="i in arrs"
                                    :key="i.id"
                                    :value="i.id"
                                    :label='i.deptName'
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物料名称">
                        <el-select v-model="form_query.name" placeholder="请选择物料名称" @change="Modify_Model(form_query.name)">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="i in Warehouse_Name_drop_down" :label='i.materialName' :value="i.id" :key="i.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物料型号">
                        <el-select v-model="form_query.Model" placeholder="请选择物料型号" @change="$forceUpdate()">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="i in Material_type" :label='i.materialType' :value="i.materialType" :key="i.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审批状态">
                        <el-select v-model="form_query.state" placeholder="请选择物料型号">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="已通过" value="accepted"></el-option>
                            <el-option label="审批中" value="approving"></el-option>
                            <el-option label="已拒绝" value="rejected"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-button type="primary" @click="query_Approval">查询</el-button>
                </el-form>
            </div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="id" label="编号" align="center"></el-table-column>
                    <el-table-column prop="applyFilialeName" label="分公司" align="center"></el-table-column>
                    <el-table-column prop="materialName" label="物料名称" align="center"></el-table-column>
                    <el-table-column prop="materialType" label="物料型号" align="center"></el-table-column>
                    <el-table-column prop="applyNums" label="申请数量" align="center"></el-table-column>
                    <el-table-column prop="applyRemark" label="申请说明" align="center"></el-table-column>
                    <el-table-column prop="applyName" label="申请人" align="center"></el-table-column>
                    <el-table-column prop="applyTime" label="申请时间" align="center":formatter="dateFormat"></el-table-column>
                    <el-table-column prop="status" label="审批状态" align="center">
                        <template slot-scope="scope">
                            <el-button  size="mini" v-if="scope.row.status == 'approving' && scope.row.canApproval == true ? true :false " type="primary" plain @click="receive(scope.$index, scope.row)">去审批</el-button>
                            <el-button  size="mini" v-if="scope.row.status == 'approving' && scope.row.canApproval == false ? true :false " type="primary" plain>审批中</el-button>
                            <el-button size="mini" v-if="scope.row.status == 'accepted' ? true : false" type="primary" plain>已通过</el-button>
                            <el-button size="mini" v-if="scope.row.status == 'rejected' ? true : false" type="primary" plain>已拒绝</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop=""
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick_s(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-pagination
                    background
                    layout="total,prev, pager, next,sizes"
                    :total="total_obj"
                    :page-size="pagesize_obj"
                    @size-change="handleSizeChange_obj"
                    @current-change="handleCurrentChange_obj"
                    :page-sizes="[10,20,30,50]"
                    :current-page="currentPage_obj"
                    class="text_right"
            ></el-pagination>
        </div>
        <!--去审批弹出-->
        <el-dialog title="物料申请审批" :visible.sync="materialsApproval"
                   width="600px"
                   center>
            <el-form :model="materialsApprovalruleForm" :rules="materialsApprovalruleForm" ref="materialsApprovalruleForm" label-width="100px" class="demo-ruleForm materialsApproval">
                <el-form-item label="申请城市" >
                    <el-input v-model="materialsApprovalruleForm.applyFilialeName" readonly disabled></el-input>
                </el-form-item>
                <el-form-item label="申请人" >
                    <el-input v-model="materialsApprovalruleForm.applyName" readonly disabled></el-input>
                </el-form-item>
                <el-form-item label="申请时间" >
                    <el-input v-model="materialsApprovalruleForm.applyTime" readonly disabled></el-input>
                </el-form-item>
                <el-form-item label="物料名称">
                    <el-input v-model="materialsApprovalruleForm.materialName" readonly disabled></el-input>
                </el-form-item>
                <el-form-item label="型号">
                    <el-input v-model="materialsApprovalruleForm.materialType" readonly disabled></el-input>
                </el-form-item>
                <el-form-item label="申请数量">
                    <el-input v-model="materialsApprovalruleForm.applyNums" readonly disabled></el-input>
                </el-form-item>
                <el-form-item label="申请说明">
                    <el-input v-model="materialsApprovalruleForm.applyRemark" readonly disabled></el-input>
                </el-form-item>
                <el-form-item label="审批意见">
                    <el-radio v-model="materialsApprovalruleForm.state" label="accepted">同意</el-radio>
                    <el-radio v-model="materialsApprovalruleForm.state" label="rejected">拒绝</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-input
                            type="textarea"
                            resize="none"
                            placeholder="请输入内容"
                            v-model="materialsApprovalruleForm.opinion">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="materialsApproval = false,materialsApprovalruleForm.state='accepted',materialsApprovalruleForm.opinion=''">取 消</el-button>
                <el-button type="primary" @click="materialsApprovalsubmit()">确 定</el-button>
            </span>
        </el-dialog>
        <!--查看弹窗-->
        <el-dialog
                title="查看审核记录"
                :visible.sync="centerDialogVisible_s"
                width="30%"
                center>
            <!--<span>需要注意的是内容是默认不居中的</span>-->
            <ul class="oul">
                <li>
                    <span>物料名称：</span>
                    <span>{{this.rows.materialName}}</span>
                </li>
                <li>
                    <span>物料类型：</span>
                    <span>{{this.rows.materialType}}</span>
                </li>
            </ul>
            <!--//城市经理-->
            <ul class="oul" v-for="(i,index) in this.CheckApprove">
                <li>
                    <span>审批人：</span>
                    <span>{{i.adminName}}</span>
                </li>
                <li>
                    <span>审批意见：</span>
                    <span>{{i.opinion}}</span>
                </li>
                <li>
                    <span>审批时间：</span>
                    <span v-if="i.createTime == null?false:true">{{i.createTime | dateFrm}}</span>
                </li>
            </ul>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment'
    import {getDate_s} from "../../js/listWarehouse.js";
    export default {
        name: "managementBacklog",
        created(){
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            //所属区域下拉框（郭）
            let page = JSON.stringify({
                'token': this.token,
                "pid": 0,
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByAreaId', page, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res) => {
                console.log(res);
                if (res.body.errcode === 0) {
                    this.arrs = res.body.result.deptList;
                }
            });
            this.Material_Application();
            this.materiel_drop_down()
        },
        data(){
            return {
                form_query:{},
                arrs:[],
                token:'',
                tableData:[],
                centerDialogVisible_s:false,
                rows:'',
                CheckApprove:[],
                materialsApprovalruleForm:{},
                materialsApproval:false,
                total_obj: 0,
                currentPage_obj: 1,
                pagesize_obj: 10,
                Warehouse_s:[],
                Warehouse_Name_drop_down:[],
                Material_type:[],

            }
        },
        watch:{
            "headquarters.name"(curVal,oldVal) {
                if (oldVal != ''){
                    if (curVal != oldVal) {
                        this.headquarters.Model ='';
                    }
                }
            },
            "formInline.name"(curVal,oldVal) {
                if (oldVal != ''){
                    if (curVal != oldVal) {
                        this.formInline.Model ='';
                    }
                }
            },
            "form_query.name"(curVal,oldVal) {
                if (oldVal != ''){
                    if (curVal != oldVal) {
                        this.form_query.Model ='';
                    }
                }
            },
            "form.name"(curVal,oldVal) {
                if (oldVal != ''){
                    if (curVal != oldVal) {
                        this.form.Model ='';
                    }
                }
            },
            "ruleForm.name"(curVal,oldVal){
                console.log(curVal,oldVal);
                if (oldVal != ''){
                    if (curVal != oldVal) {
                        this.ruleForm.Model ='';
                    }
                }
            },
        },
        methods:{
            materiel_drop_down() {
                let page = JSON.stringify({
                    "token":this.token,
                    "searchItem": "materialtypefromreal",
                    "conditionStr1": "quarter"
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/search/searchItem', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.Warehouse_Name_drop_down = res.body.result;
                    }
                })
            },
            Modify_Model(name) {//拿到物料类型
                this.Material_type = [];
                //选择型号
                let page = JSON.stringify({
                    "token": this.token,
                    "searchItem":"materialtypefromid",
                    "id1":name  //选择的物料名称的编号
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/search/searchItem', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(res => {
                    if (res.body.errcode == 0) {
                        this.Material_type = res.body.result;//发放物料入库类型
                        console.log(this.Material_type);

                    }
                })
            },

            //下拉的物料类型
            Modify_Model_drop_down(name) {
                this.Warehouse_s = [];
                for (var i in this.Warehouse_Name_drop_down){
                    if (name == this.Warehouse_Name_drop_down[i].id){
                        this.Warehouse = this.Warehouse_Name_drop_down[i].materialTypeAndNums;
                        for (var j in this.Warehouse){
                            this.Warehouse_s.push({"name":this.Warehouse[j],"id":j});
                        }
                    }

                }
            },
            query_Approval() {//审批查询
                this.currentPage_obj = 1;
                this.Material_Application();
            },
            //物料申请列表
            Material_Application(){
                let page = JSON.stringify({
                    "token":this.token,
                    'pageNum':this.currentPage_obj,
                    'pageSize':this.pagesize_obj,
                    "searchItem":"materialapprovallist",     //标示审批列表
                    "id1":this.form_query.region, //筛选条件  分公司名称
                    "id3":this.form_query.name,      //筛选条件  物料名称
                    "conditionStr3":this.form_query.Model,      //筛选条件  物料类型
                    "conditionStr4":this.form_query.state,       //筛选条件  审批状态
                    "backlogType":this.$route.query.status == 'backlog'?'backlog': "history"
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/approval/materialapprovallist', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.tableData = res.body.result.rows;
                        this.total_obj = res.body.result.total;
                    }
                });
            },
            //审批确定
            materialsApprovalsubmit(){
                if (this.materialsApprovalruleForm.opinion == '') {
                    this.$message({
                        showClose: true,
                        message: '请填写审批意见（原因）',
                        type: 'error'
                    });
                    return ;
                }
                if (!(/^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/.test(this.materialsApprovalruleForm.opinion))) {
                    this.$message({
                        message: '字数以达到200个上线',
                        type: 'warning'
                    });
                    return;
                }
                let page = JSON.stringify({
                    token:this.token,
                    itemId: this.materialsApprovalruleForm.id,
                    opinion:this.materialsApprovalruleForm.opinion,
                    state:this.materialsApprovalruleForm.state
                });
                this.$http.post(this.global.lightningUrl +'/companyv1/companyCenter/approval/materialapproval',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res);
                    if(res.body.errcode == 0){
                        this.$message({
                            message: res.body.message,
                            type: 'success'
                        });
                        this.materialsApproval=false;
                        this.materialsApprovalruleForm = {};
                        this.materialsApprovalruleForm.state='accepted';
                        this.Material_Application();
                        //    更新代办条数
                        this.backlog()
                    }
                })
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
                    backlogCount = res.body.result.backlogCount;
                    this.$store.commit('onbacklog', backlogCount)
                })
            },
            handleSizeChange_obj(val) {
                this.pagesize_obj = val;
                this.Material_Application();
            },
            handleCurrentChange_obj(val) {
                this.currentPage_obj = val;
                this.Material_Application();
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD  HH:mm");
            },
            receive(i,_index) {
                console.log(i, _index);
                this.materialsApproval = true ;
                this.materialsApprovalruleForm.applyFilialeName = _index.applyFilialeName ;
                this.materialsApprovalruleForm.applyName = _index.applyName;
                this.materialsApprovalruleForm.applyTime = getDate_s(_index.applyTime);
                this.materialsApprovalruleForm.materialName = _index.materialName;
                this.materialsApprovalruleForm.materialType = _index.materialType;
                this.materialsApprovalruleForm.applyNums = _index.applyNums;
                this.materialsApprovalruleForm.applyRemark = _index.applyRemark;
                this.materialsApprovalruleForm.id= _index.id;
            },
            handleClick_s(row) {//查看申请的意见
                console.log(row);
                this.centerDialogVisible_s=true;
                this.rows = row;
                this.$http.post(this.global.lightningUrl+'/companyv1/companyCenter/approval/materialapprovaldetail',JSON.stringify({
                    "token":this.token,
                    "itemId":row.id,
                })).then(run=>{
                    console.log(run);
                    this.CheckApprove = run.body.result;
                })
            },
        },
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm");
            }
        },
    }
</script>

<style scoped lang="scss">
    .managementBacklog{
        .header {
            margin-bottom: 20px;
        }
        .oul{
            padding:20px;
            li{
                margin:10px;
            }
        }
    }
</style>