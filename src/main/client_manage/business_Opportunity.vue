<template>
    <div class="main">
        <div class="header">
            当前位置：<span>CRM管理>商机管理</span>
        </div>
        <div class="dv">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="客户ID">
                    <el-input v-model.trim="formInline.ID" placeholder="请输入客户编号"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model.trim="formInline.person" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="联系人电话">
                    <el-input v-model.trim="formInline.phone" placeholder="请输入联系人电话"></el-input>
                </el-form-item>
                <el-form-item label="客户名称">
                    <el-input v-model.trim="formInline.CustomerName" placeholder="请输入客户名称"></el-input>
                </el-form-item>
                <el-form-item label="录入时间">
                    <el-date-picker
                        width="110"
                        v-model="formInline.time"
                        type="daterange"
                        value-format="timestamp"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="来源">
                    <el-select v-model="formInline.from" placeholder="请选择来源">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="官网" value="官网"></el-option>
                        <el-option label="客服" value="客服"></el-option>
                        <el-option label="总部洽谈" value="总部洽谈"></el-option>
                        <el-option label="自行挖掘" value="自行挖掘"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formInline.status" placeholder="请选择状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="跟进中" value="doing"></el-option>
                        <el-option label="未分配" value="noAdmin"></el-option>
                        <el-option label="搁置中" value="giveUp"></el-option>
                        <el-option label="已完结" value="finish"></el-option>
                        <el-option label="提交转正" value="commit"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-select v-model="formInline.charge" placeholder="请选择来源">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="有负责人" value="1"></el-option>
                        <el-option label="无负责人" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="负责人姓名">
                    <el-input v-model.trim="formInline.adminName" placeholder="请输入负责人姓名"></el-input>
                </el-form-item>
                <el-form-item label="所属分公司">
                    <el-select v-model="formInline.region" placeholder="请选择所属分公司">
                        <el-option label="全部" value=""></el-option>
                        <el-option
                            v-for="i in dept"
                            :key="i.id"
                            :value="i.id"
                            :label='i.deptName'
                        ></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="query()">查询</el-button>
                    <el-button type="primary" @click="newOpportunities(info = 0)" v-if="addBusinessOpportunity">新增</el-button>
                    <el-button type="primary" @click="Export()" v-if="businessOpportunityExport">导出</el-button>
                </el-form-item>
            </el-form>
            <template>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="客户ID" align="center">
                        <template slot-scope="scope">
                            <div @click="handleClick(scope.row)">
                                <a style="color: rgb(102,177,255);cursor: pointer;">{{ tableData[scope.$index].id }}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="clientName"
                        label="客户名称" align="center">
                    </el-table-column>
                    <el-table-column
                        prop="person"
                        label="联系人" align="center">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="联系电话" align="center">
                    </el-table-column>
                    <el-table-column
                        prop=""
                        width="180"
                        label="所在区域" align="center">
                        <template slot-scope="scope">
                            <p>{{tableData.length === 0 ?"":tableData[scope.$index].province}}</p>
                            <p>{{tableData.length === 0 ?"":tableData[scope.$index].city}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="from"
                        label="来源" align="center">
                    </el-table-column>

                    <!--<el-table-column-->
                        <!--prop="createTime"-->
                        <!--:formatter="dateFormat"-->
                        <!--label="录入时间"-->
                        <!--align="center">-->
                    <!--</el-table-column>-->
                    <el-table-column
                        prop="adminName"
                        label="负责人"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="filialeName"
                        label="所属分公司"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        width="150"
                        prop="createTime"
                        :formatter="dateFormat"
                        label="录入时间"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop=""
                        width="210"
                        label="操作" align="center">
                        <template  slot-scope="scope">
                            <el-button :disabled = "disableds[scope.$index] || scope.row.status == '已完结' || scope.row.status == '提交转正'"  type="text" size="small" @click="distribution(scope.row, info = 1)" v-if="businessOpportunityDistribute">分配</el-button>
                            <el-button :disabled = "arr1[scope.$index]  || scope.row.status == '已完结' || scope.row.status == '提交转正'" type="text" size="small" @click="distribution(scope.row, info = 3)" v-if="businessOpportunityEdit">编辑</el-button>
                            <!--<el-button  type="text" size="small" @click="distribution(scope.row , info = 2)">申请跟进</el-button>-->
                            <el-button :disabled = "arr1[scope.$index] || scope.row.status == '已完结' || scope.row.status == '提交转正'"  type="text" size="small" @click="distribution(scope.row , info = 2)" v-if="businessOpportunityFollowUp">放弃</el-button>
                            <!--<el-button  type="text" size="small" >审核</el-button>-->
                            <!--<el-button  type="text" size="small" >申请立项</el-button>-->
                            <el-button :disabled = "arr1[scope.$index] || scope.row.status != '跟进中' "  type="text" size="small" @click="distribution(scope.row , info = 4)" v-if="businessOpportunityFollowUp">客户转正</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <!--&lt;!&ndash;新增商机&ndash;&gt;:fullscreen = true-->
            <el-dialog
                center
                :title=tit
                width="60%"
                top = "0"
                :visible.sync="dialogVisible1"
                :before-close="handleClose">
                <!--新增 编辑-->
                <div v-if="info == 0 || info == 3 ? true:false" class="lod_content">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
                        <el-form-item label="客户名称" prop="clientName">
                            <el-input v-model="ruleForm.clientName" @change="valid_client_name"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" prop="person">
                            <el-input v-model="ruleForm.person"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人职位" prop="personJob">
                            <el-input v-model="ruleForm.personJob"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人电话" prop="phone">
                            <el-input v-model="ruleForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="公司地址" prop="address">
                            <el-input v-model="ruleForm.address"></el-input>
                        </el-form-item>
                        <el-form-item label="联系邮箱" prop="email">
                            <el-input v-model="ruleForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="商机提供人" prop="providerFilialeId">
                            <el-select v-model="ruleForm.providerFilialeId" placeholder="请选择商机提供人" @input="empty">
                                <el-option label="编外人员" value="编外人员"></el-option>
                                <el-option v-for="i in dept"
                                           :label="i.deptName "
                                           :value="i.id"
                                           :key="i.id "
                                ></el-option>
                            </el-select>
                            <el-select v-if="ruleForm.providerFilialeId != '编外人员' ? true:false" v-model="ruleForm.providerId"  placeholder="请选择提供商机人">
                                <el-option v-for=" i in Supplier"
                                           :label=" i.name"
                                           :value=" i.id"
                                           :key="i.id "
                                ></el-option>
                            </el-select>
                            <el-input v-if="ruleForm.providerFilialeId == '编外人员' ? true:false" v-model="ruleForm.providerName" placeholder="提供人姓名" style="width:25%;"></el-input>
                            <el-input v-if="ruleForm.providerFilialeId == '编外人员' ? true:false" v-model="ruleForm.providerPhone" placeholder="提供人电话" style="width:25%;"></el-input>
                        </el-form-item>
                        <el-form-item label="商机所在" prop="inps">
                            <el-cascader
                                v-model = "ruleForm.inps"
                                :options="options"
                                change-on-select
                            ></el-cascader>
                        </el-form-item>
                        <el-form-item label="来源" prop="from">
                            <el-select v-model="ruleForm.from" placeholder="请选择来源">
                                <el-option label="官网" value="官网"></el-option>
                                <el-option label="客服" value="客服"></el-option>
                                <el-option label="总部洽谈" value="总部洽谈"></el-option>
                                <el-option label="自行挖掘" value="自行挖掘"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属分公司" prop="filialeId">
                            <el-select v-model="ruleForm.filialeId"  placeholder="请选择所属分公司">
                                <el-option v-for=" i in filiale"
                                           :label=" i.deptName "
                                           :value=" i.id"
                                           :key="i.id "
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="负责人" prop="adminId">
                            <el-select v-model="ruleForm.adminId"  placeholder="请选择业务人员">
                                <el-option v-for=" i in Workers"
                                           :label=" i.name "
                                           :value=" i.id"
                                           :key="i.id "
                                ></el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="商机概述" prop="remark">
                            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
                            <el-button @click="resetForm('ruleForm')">重新填写</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer" v-if="info == 0 || info == 3 ? false:true">
                    <el-button @click="dialogVisible1 = false">取 消</el-button>
                    <el-button type="primary"  @click="adopt">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                center
                :title=tit
                width="60%"
                top = "0"
                :visible.sync="dialogVisible2"
                :before-close="handleClose">
                <!--分配-->
                <div v-if="info == 1 ? true:false" class="lod_content" >
                    <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="130px" class="demo-ruleForm">
                        <el-form-item label="所属分公司" prop="filialeId">
                            <el-select v-model="ruleForm1.filialeId"  placeholder="请选择所属分公司" @change="responsible">
                                <el-option v-for=" i in filiale"
                                           :label=" i.deptName "
                                           :value=" i.id"
                                           :key="i.id "
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="负责人" prop="adminId">
                            <el-select v-model="ruleForm1.adminId"  placeholder="请选择业务人员">
                                <el-option v-for=" i in Workers"
                                           :label=" i.name "
                                           :value=" i.id"
                                           :key="i.id "
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                 <span slot="footer" class="dialog-footer" v-if="info == 0 ? false:true">
                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                    <el-button type="primary"  @click="adopt">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                center
                :title=tit
                width="60%"
                top = "0"
                :visible.sync="dialogVisible3"
                :before-close="handleClose">
                <!--申请跟进-->
                <div v-if="info == 2 ? true:false" class="lod_content">
                    <div class="title"><span>商机ID:</span><span class="title_con">{{this.row.id}}</span><!--<span style="font-size: 12px;color:red;padding:0 0 0 10px;">(确定以下信息,点击确定申请跟进)</span>--></div>
                    <div style="overflow: hidden">
                        <ul>
                            <li>客户名称:</li>
                            <li>{{this.row.clientName}}</li>
                        </ul>
                        <ul>
                            <li>联系人:</li>
                            <li>{{this.row.person}}</li>
                        </ul>
                        <ul>
                            <li>联系电话:</li>
                            <li>{{this.row.phone}}</li>
                        </ul>
                        <ul>
                            <li>跟进时间:</li>
                            <li>{{this.row.adminTime | dateFrm}}</li>
                        </ul>
                    </div>
                    <div>
                        <el-form ref="form" :model="form" label-width="73px">
                            <el-form-item label="放弃原因">
                                <el-select v-model="form.Reason" placeholder="请选择放弃原因">
                                    <el-option label="客户意向不足" value="客户意向不足"></el-option>
                                    <el-option label="费用太高" value="费用太高"></el-option>
                                    <el-option label="其他原因" value="其他原因"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="其他原因">
                                <el-input type="textarea" v-model="form.Other"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>

                </div>
                 <span slot="footer" class="dialog-footer" v-if="info == 0 ? false:true">
                    <el-button @click="dialogVisible3 = false">取 消</el-button>
                    <el-button type="primary"  @click="adopt">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 分页插件 -->
        <el-pagination background
                       layout="total,prev, pager, next,sizes"
                       :total="total"
                       :page-size="pagesize"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-sizes="[10,20,30,50]"
                       :current-page="currentPage"
                       class="text_right">
        </el-pagination>
    </div>
</template>

<script>
    import {F_jurisdiction, AIfirstClass0, secondLevel} from '../../js/Fjurisdiction.js'
    import {openPostWindow} from '../../js/report.js'
    import moment from 'moment'
    export default {
        name: "business_Opportunity",
        data() {
            return{
                pages:{},
                businessOpportunityDistribute:'',
                businessOpportunityFollowUp:'',
                addBusinessOpportunity:'',
                businessOpportunityApprove:'',
                businessOpportunityEdit:'',
                businessOpportunityExport:'',
                dis:false,
                branchArea: '',
                wholeCountry: '',
                managementArea: '',
                arr1:[],
                disableds:[],
                tit:'',
                info:'',
                form:{
                    Reason:'',
                    Other:'',
                },
                row:{},
                ruleForm1:{
                    filialeId:'',//分配的分公司
                    adminId:''//分配的负责人
                },
                Supplier:[],
                Workers:[],//职工数据
                filiale:[],//分公司数据
                options:[],
                ruleForm: {
                    from:'',//来源
                    phone:'',
                    providerId:'',
                    Supplier:'',//供应人
                    filialeIds:'',
                    providerFilialeId:'',//编内 外人员
                    adminId:'',//分公司下业务人员
                    clientName: '',
                    person:'',//联系人
                    personJob:'',//职位
                    email:'',//邮箱
                    personJob:'',//职位
                    providerPhone:'',//提供人电话
                    providerName:'',//提供人姓名
                    filialeId:'',//分公司
                    address:'',//公司地址
                    remark:'',
                    region:'',
                    inps:[]
                },
                rules1:{
                    filialeId:[
                        { required: true, message: '请选择分公司', trigger: 'change' }
                    ],
                    adminId:[
                        { required: true, message: '请选择业务负责人', trigger: 'change' }
                    ],
                },
                rules: {
                    providerFilialeId:[
                        { required: false, message: '请选择商及提供人', trigger: 'change' }
                    ],
                    provider:[
                        { required: true, message: '请选择商机提供人', trigger: 'change' }
                    ],
                    providerName:[
                        { required: true, message: '请输入商机提供人姓名', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,10}$/,  message: '不能包含特殊字符且不超过10个', trigger: 'blur' }
                    ],
                    providerPhone:[
                        { required: true,message: '请输入商机提供人电话', trigger: 'blur' },
                        {pattern: /^((0\d{2,3}-?\d{7,8})|(1[3-9]\d{9})|(400-?[0-9]{4}-?[0-9]{3})|(800-?[0-9]{4}-?[0-9]{3}))$/ , message: '电话格式不正确', trigger: 'blur' }
                    ],
                    email:[
                        { required: false, message: '邮箱格式不正确', trigger: 'blur' },
                        {pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,  message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    address:[
                        { required: false, message: '请输入公司地址', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,  message: '不能包含特殊字符且不超过200个', trigger: 'blur' }
                    ],
                    adminId:[
                        { required: true, message: '请选择业务负责人', trigger: 'change' }
                    ],
                    filialeId:[
                        { required: true, message: '请选择分公司', trigger: 'change' }
                    ],
                    filialeIds:[
                        { required: true, message: '请选择分公司', trigger: 'change' }
                    ],
                    clientName: [
                        { required: true, message: '请输入客户名称', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    personJob: [
                        { required: false, message: '请输入联系人职位', trigger: 'blur' },
                        {pattern: /^([A-Za-z_]|[0-9]|[\u4E00-\u9FA5]){2,20}$/ , message: '联系人职位不合规，仅能包含简体中文、英文字母、数字，长度2-20字符 ', trigger: 'blur' }
                    ],
                    phone:[
                        { required: true,message: '请输入正确的电话格式', trigger: 'blur' },
                        {pattern: /^((0\d{2,3}-?\d{7,8})|(1[3-9]\d{9})|(400-?[0-9]{4}-?[0-9]{3})|(800-?[0-9]{4}-?[0-9]{3}))$/ , message: '电话格式不正确', trigger: 'blur' }
                    ],
                    person: [
                        { required: true, message: '请输入联系人姓名', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{2,10}$/,  message: '不能包含特殊字符不少于2个且不超过10个', trigger: 'blur' }
                    ],
                    remark: [
                        { required: true, message: '请输入商机概述', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,  message: '不能包含特殊字符且不超过200个', trigger: 'blur' }
                    ],
                    inps: [
                        { required: true, message: '请选择商机所在地', trigger: 'change' }
                    ],
                    from:[
                        { required: true, message: '请选择来源', trigger: 'change' }
                    ]
                },
                dialogVisible1: false,
                dialogVisible2: false,
                dialogVisible3: false,
                tableData:[],
                formInline:{
                    status:'',
                    ID:'',//客户ID
                    person:'',//联系人
                    CustomerName:'',//客户名称
                    phone:'',//联系电话
                    time:[],
                    from:'',//來源
                    charge:'',//负责人
                    region:'',//所属分公司
                    adminName:''//负责人
                },
                dept:[],//所属分公司
                token:'',
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
                potentialClientId:'',
                array:[],
                id_dl:'',
                currentUser:'',
                url:''
            }
        },
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD HH ：mm");
            }
        },
        watch:{
            "ruleForm.providerFilialeId"(curVal,oldVal){
                console.log(oldVal);
                if  (oldVal == '编外人员'){
                    this.ruleForm.providerId = '';
                }
            },
            "form.Reason"(curVal,oldVal) {
                if (curVal != oldVal) {
                    this.form.Other = '';
                }
            },
            "ruleForm.filialeId"(curVal,oldVal){
                console.log(curVal,oldVal);
                let page = JSON.stringify({
                    token:this.token,
                    filialeId:curVal,
                    roleIds:'3,9,11'
                });
                this.Worker(page);
            }
        },
        mounted(){
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            console.log(user);
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.branchArea = F_jurisdiction('branchArea', jurisdictions);
            this.wholeCountry = F_jurisdiction('wholeCountry', jurisdictions);
            this.managementArea = F_jurisdiction('managementArea', jurisdictions);
            this.businessOpportunityDistribute = F_jurisdiction('businessOpportunityDistribute', jurisdictions);
            this.businessOpportunityFollowUp = F_jurisdiction('businessOpportunityFollowUp', jurisdictions);
            this.addBusinessOpportunity = F_jurisdiction('addBusinessOpportunity', jurisdictions);
            this.businessOpportunityApprove = F_jurisdiction('businessOpportunityApprove', jurisdictions);
            this.businessOpportunityEdit = F_jurisdiction('businessOpportunityEdit', jurisdictions);
            this.businessOpportunityExport = F_jurisdiction('businessOpportunityExport', jurisdictions);

            this.id_dl = user.result.currentUser.id;
            console.log(this.id_dl);
            this.currentUser = user.result.currentUser;
            this.regions();//所属分公司
            this.data();


        },
        methods:{
            Export() {
                 var exportLink = this.global.lightningUrl + '/companyv1/customerManage/report/export/potential_client_list';
                 openPostWindow(exportLink,this.pages);
            },
            //客户名称唯一校验
            valid_client_name() {
                let page = JSON.stringify({
                    id:this.info == 0 ? null : this.row.id,
                    token:this.token,
                    clientName:this.ruleForm.clientName,
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/potential_client/valid_client_name',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    // console.log(res.body.result);
                    if (res.body.result) {
                        this.$http.post(this.global.lightningUrl + "/companyv1/customerManage/confirm/customerbynames",JSON.stringify({
                            "token":this.token,
                            "name":this.ruleForm.clientName,
                        })).then(res=>{
                            if( res.body.errcode == 0 ){
                                this.$message({
                                    showClose: true,
                                    message: '客户名称可用！',
                                    type: 'success'
                                });
                            }else {
                                this.$message({
                                    showClose: true,
                                    message: '用户名称不可用！',
                                    type: 'error'
                                });
                                this.ruleForm.clientName = ''
                            }
                        })
                    }else {
                        this.$message({
                            showClose: true,
                            message: '用户名称不可用！',
                            type: 'error'
                        });
                        this.ruleForm.clientName = ''
                    }
                })
            },
            //查看商机详情
            handleClick(row) {
                // console.log(row);
                this.$router.push({
                    path: './Information_opportunity',
                    query: {
                        row: row,
                    }
                });
            },

            adopt() {
                if  (this.info == 2){//放弃
                    if (this.form.Reason == '其他原因' && this.form.Other == '') {
                        this.$message({
                            showClose: true,
                            message: '请填写放弃原因！',
                            type: 'warning'
                        });
                    }else if (this.form.Reason == '' && this.form.Other == '') {
                        this.$message({
                            showClose: true,
                            message: '请填写完整信息！',
                            type: 'warning'
                        });
                    }else {
                        let page = JSON.stringify({
                            token:this.token,
                            status:"giveUp",
                            giveUpReason:this.form.Reason != '其他原因'? this.form.Reason:this.form.Other,
                            id:this.row.id,
                            adminId:this.row.adminId,
                        });
                        console.log(page);
                        this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/potential_client/update',page,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res)=>{
                            console.log(res.body.result);
                            if (res.body.errcode == 0) {
                                this.$message({
                                    showClose: true,
                                    message: '放弃成功！',
                                    type: 'success'
                                });
                                this.form = {};
                                this.dialogVisible3 = false;
                                this.data();
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: '放弃失败！',
                                    type: 'error'
                                });
                            }
                        })
                    }
                }else {
                    if (this.ruleForm1.adminId == '') {
                        this.$message({
                            showClose: true,
                            message: '请选择负责人！',
                            type: 'error'
                        });
                        return
                    }
                    let page = JSON.stringify({
                        token:this.token,
                        potentialClientId:this.row.id,
                        operation:"分配负责人",
                        adminId:this.ruleForm1.adminId,
                        type:"choose"
                    });
                    this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/potential_client/create_record',page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res.body.result);
                        if (res.body.errcode == 0) {
                            this.$message({
                                showClose: true,
                                message: '分配成功！',
                                type: 'success'
                            });
                            this.dialogVisible2 = false;
                            this.data();
                        }else {
                            this.$message({
                                showClose: true,
                                message: '分配失败！',
                                type: 'error'
                            });
                        }
                    })
                }
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH : mm");
            },
            //分配
            distribution(row,info) {
                console.log(info);
                console.log(row);
                this.info = info;
                this.row = row;
                this.clientName = this.row.clientName;
                if (info == 1) {
                    this.tit = '分配商机';
                    this.dialogVisible2 = true;
                }else if (info == 2) {
                    this.tit = '放弃商机';
                    this.dialogVisible3 = true;
                }else if (info == 3) {
                    this.tit = '编辑商机';
                    this.dialogVisible1 = true;
                    this.ruleForm = this.row;
                    if (this.row.providerFilialeId != '编外人员' && this.row.providerFilialeId != undefined){
                        this.ruleForm.providerFilialeId = JSON.parse(this.row.providerFilialeId);
                    }
                    var arr = [];
                    arr.push(this.row.provinceId);
                    arr.push(this.row.cityId);
                    console.log(arr);
                    this.ruleForm.inps = arr,
                    this.url = '/companyv1/customerManage/potential_client/update';
                    // this.row.filialeId
                    let page = JSON.stringify({
                        token:this.token,
                        filialeId:this.row.filialeId,
                    });
                    this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/potential_client/get_people',page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res.body.result);
                        if (res.body.errcode == 0) {
                            this.Supplier = res.body.result;
                        }
                    });
                    this.regions();
                    this.empty();
                    this.drop();
                    // this.Branch();//分公司
                }else if (info == 4) {
                    this.$router.push({
                        path: './change_insert',
                        query: {
                            row:row.id,
                            info: 4
                        }
                    });
                }
                // console.log(row)
                this.Branch();//分公司
            },
            //分配所属分公司
            responsible() {
                let page = JSON.stringify({
                    roleIds:'3,9,11',
                    token:this.token,
                    filialeId:this.ruleForm1.filialeId,
                });
               this.Worker(page);
            },
            empty() {
                console.log(this.ruleForm.providerFilialeId);
                // if (this.ruleForm.providerFilialeId == '编外人员') {
                //     this.ruleForm.providerId = '';
                // }
                if (this.ruleForm.providerFilialeId != '编外人员' && this.ruleForm.providerFilialeId != '') {

                    let page = JSON.stringify({
                        token:this.token,
                        filialeId:this.ruleForm.providerFilialeId,
                    });
                    this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/potential_client/get_people',page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res.body.result);
                        if (res.body.errcode == 0) {
                            this.Supplier = res.body.result;
                        }
                    });
                }else {
                    this.Supplier = '';
                }
            },
            Worker(page) {
                this.Workers = [];
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/potential_client/get_people',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res.body.result);
                    if (res.body.errcode == 0) {
                        if (!this.dis){
                            this.Workers.push({name:this.currentUser.name,id:this.currentUser.id});
                        }else {
                            this.Workers = res.body.result;
                        }
                        console.log(this.Workers);
                    }
                });
            },
             //分公司
            Branch() {
                this.filiale = [];
                let page = JSON.stringify({
                    token:this.token
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_filiale_list',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res.body.result);
                    if (!this.dis){
                        this.filiale.push({deptName:this.currentUser.filialeName,id:this.currentUser.filialeId});
                    }else {
                        this.filiale = res.body.result
                    }
                    console.log(this.filiale);

                })
            },
            //获取到下拉
            drop(){
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/area', JSON.stringify({
                    "token":this.token,
                }),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    this.options = res.body.result;
                })
            },
            //新增提交
            submitForm(formName) {
                this.array = [];
                console.log(this.ruleForm.providerFilialeId,this.ruleForm.providerId);

                if (this.ruleForm.providerFilialeId != '' && (this.ruleForm.providerId == undefined , this.ruleForm.providerId == '')) {
                    this.$message({
                        showClose: true,
                        message: '请填写完整商机提供人！',
                        type: 'error'
                    });
                    return;
                }
                if (this.ruleForm.providerFilialeId != '' && (this.ruleForm.providerName == '' && this.ruleForm.providerPhone == '')) {
                    this.$message({
                        showClose: true,
                        message: '请填写完整商机提供人！',
                        type: 'error'
                    });
                    return
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('此操作将保存表中信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            if  (this.ruleForm.inps != undefined) {
                                for (var i in this.options) {
                                    if (this.ruleForm.inps.length == 1) {
                                        if (this.ruleForm.inps[0] == this.options[i].value) {
                                            // console.log(this.options[i].label);
                                            this.array.push(this.options[i].label)
                                        }
                                    } else if (this.ruleForm.inps.length == 2) {
                                        for (let j in this.options[i].children) {
                                            if (this.ruleForm.inps[1] == this.options[i].children[j].value) {
                                                this.array.push(this.options[i].label)
                                                this.array.push(this.options[i].children[j].label)
                                            }
                                        }
                                    }
                                }
                            }
                            // return false;
                            let page = JSON.stringify({
                                id:this.ruleForm.id,
                                token: this.token,
                                person:this.ruleForm.person,                 	//联系人姓名
                                phone:this.ruleForm.phone,    			       //联系人电话
                                province:this.array[0] == undefined ? '':this.array[0] ,  //商机所在省份
                                city:this.array[1] == undefined ? '':this.array[1],     //商机所在城市
                                provinceId:this.ruleForm.inps[0] == undefined ? '':this.ruleForm.inps[0] ,  //商机所在省份
                                cityId:this.ruleForm.inps[1] == undefined ? '':this.ruleForm.inps[1],     //商机所在城市
                                from:this.ruleForm.from,          			            //商机来源
                                clientName:this.ruleForm.clientName,    		//客户名称
                                email:this.ruleForm.email,  	                //联系人邮箱
                                personJob:this.ruleForm.personJob,               //	联系人职位
                                address:this.ruleForm.address,               	//公司地址
                                remark:this.ruleForm.remark, 	                //商机概述
                                providerId:this.ruleForm.providerId,       		//商机提供人编号（编内）
                                adminId:this.ruleForm.adminId,            		//负责人编号
                                providerPhone:this.ruleForm.providerPhone,   	//商机提供人电话（编外）
                                providerName:this.ruleForm.providerName,       	//商机提供人姓名（编外）
                                filialeId:this.ruleForm.filialeId,               //合作意向分公司
                                providerFilialeId:this.ruleForm.providerFilialeId//编外人员
                            });
                            this.$http.post(this.global.lightningUrl + this.url, page, {
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            }).then((res) => {
                                console.log(res);
                                if (res.body.errcode == 0) {
                                    this.ruleForm.providerName = '';
                                    this.ruleForm.provider = '';
                                    this.ruleForm.providerPhone = '';
                                    this.$message({
                                        showClose: true,
                                        message: '提交成功！',
                                        type: 'success'
                                    });
                                    this.resetForm(formName);
                                    this.dialogVisible1 = false;
                                    this.data();
                                }else {
                                    this.$message({
                                        showClose: true,
                                        message: '提交失败！',
                                        type: 'error'
                                    });
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消保存'
                            });
                        });
                    } else {
                            console.log('error submit!!');
                            return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            //新增商机
            newOpportunities(info){
                console.log(info);
                this.info = info;
                if (info == 0) {
                    this.tit = '新增商机';
                    this.dialogVisible1 = true;
                    this.ruleForm = {}
                    this.url = '/companyv1/customerManage/potential_client/create'
                }
                this.drop();
                this.Branch();//分公司
            },
            //分公司
            regions() {
                //所属区域下拉框（郭）
                let page = JSON.stringify({
                    token: this.token,
                    pid: 0,
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByAreaId', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode === 0) {
                        this.dept = res.body.result.deptList;
                    }
                });
            },
            data() {
                let page = JSON.stringify({
                    token:this.token,
                    pageNum: this.currentPage,
                    pageSize:this.pagesize,
                    id:this.formInline.ID,
                    person:this.formInline.person,//联系人
                    phone:this.formInline.phone,//电话
                    clientName:this.formInline.CustomerName,//客户名称
                    createTimeStart:this.formInline.time==null?'':this.formInline.time[0],// 录入开始时间
                    createTimeEnd:this.formInline.time == null ? '':this.formInline.time[1]+86400000-1,// 录入结束时间
                    from:this.formInline.from,//来源
                    status:this.formInline.status,//状态
                    filialeId:this.formInline.region,//分公司
                    adminId:this.formInline.charge,//负责人
                    adminName:this.formInline.adminName,//负责人
                });
                this.pages = page;
                this.$http.post(this.global.lightningUrl +'/companyv1/customerManage/potential_client/list',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    if (res.body.errcode == 0) {
                        this.tableData = res.body.result.list;
                        this.total =  res.body.result.total;
                        console.log(res);
                        this.arr1 = [];
                        this.dis = [];
                        this.disableds = [];

                        // console.log(this.branchArea, this.wholeCountry, this.managementArea);
                        for (var i in this.tableData){

                            if (!this.branchArea &&  !this.wholeCountry && !this.managementArea){
                                this.disableds.push(true);
                            }else {
                                this.disableds.push(false);
                            }

                            if (this.tableData[i].adminId == this.id_dl) {
                                console.log(this.tableData[i].adminId, this.id_dl);
                                this.arr1.push(false);
                            }else {
                                console.log(this.tableData[i].adminId, this.id_dl);
                                this.arr1.push(true);
                            }
                            // this.tableData[i].adminId == this.id_dl
                            // // console.log(this.tableData[i].adminId,this.id_dl);
                            // this.arr1.push(true);
                        }
                        if (this.branchArea ||  this.wholeCountry || this.managementArea){
                           this.dis = true
                        }
                        console.log(this.branchArea , this.wholeCountry , this.managementArea);
                        console.log(this.dis);
                    }
                })
            },
            query() {
                this.data();
            },
            //分页
            handleSizeChange(pagesize){
                this.pagesize = pagesize;
                this.data();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.data();
            },
        }
    }
</script>

<style scoped lang="scss">
    .main{
        padding:20px;
        .lod_content{
            margin:0 auto;
            width:60%;
            overflow: hidden;
            .title{
                font-size: 16px;
                .title_con{
                    font-weight: bold;
                }
            }
            ul{
                padding-top:20px;
                float:left;
                width:50%;
                li{
                    float:left;
                    padding:5px;
                }
                :nth-child(2) {
                    font-size: 16px;
                    font-weight: bold;

                }
            }
        }
    }
</style>