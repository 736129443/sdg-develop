<template>
    <div class="main management">
        <div class="header">当前位置/
            <router-link to="/management">物料管理/</router-link>
            <span class="header_position">物料管理</span>
        </div>
        <template>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="入库明细" name="first">
                    <div class="Warehousing">
                        <div class="nav">
                            <span class="nav_2">
                                <el-button type="primary" @click="Warehousing" plain v-if="bePutInStorage">入库</el-button>
                                <el-button type="primary" @click="grants" plain v-if="issue">发放</el-button>
                            </span>
                        </div>
                        <div>
                            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                <el-form-item label="物料名称">
                                    <el-select v-model="formInline.name" placeholder="物料名称" @change="Modify_Model_drop_down(formInline.name)">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option v-for="i in Warehouse_Name_drop_down" :label='i.materialName' :value="i.id" :key="i.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="物料型号">
                                    <el-select v-model="formInline.Model" placeholder="请选择物料型号">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option v-for="i in Warehouse_s" :label='i.name' :value="i.name" :key="i.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="供应商">
                                    <el-input v-model.trim="formInline.Supplier" placeholder="供应商"></el-input>
                                </el-form-item>
                                <el-form-item label="入库时间">
                                    <el-date-picker
                                        width="110"
                                        v-model="formInline.Registration"
                                        type="daterange"
                                        value-format="timestamp"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="query">查询</el-button>
                                    <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none">导出</el-button>
                                    <el-progress type="circle" :percentage="ProgressBar" color="#8e71c7"  v-if="queryStatus == true? false:true" style="position: absolute;top:30%;left:40%;z-index: 999999;"></el-progress>
                                </el-form-item>
                            </el-form>

                        </div>
                        <div class="content">
                            <el-table
                                :data="arr"
                                style="width: 100%"
                            >
                                <el-table-column
                                    fixed
                                    align="center"
                                    prop="id"
                                    label="ID"
                                >
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="materialName"
                                    label="物料名称"
                                >
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="materialType"
                                    label="型号"
                                >
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="supplier"
                                    label="供应商"
                                >
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="arrivalSum"
                                    label="入库数量(件)"
                                >
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="unitPrice"
                                    label="单价(元)"
                                >
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="totalSums"
                                    label="总金额(元)"
                                >
                                </el-table-column>

                                <el-table-column
                                    align="center"
                                    prop="materialNum"
                                    label="库存量(件)"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="arrivalTime"
                                    :formatter="dateFormat1"
                                    label="到货时间" align="center">
                                </el-table-column>
                                <el-table-column
                                    prop="createTime"
                                    :formatter="dateFormat1"
                                    label="入库时间" align="center">
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="optAdminName"
                                    label="经手人"
                                >
                                </el-table-column>
                            </el-table>
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
                </el-tab-pane>
                <el-tab-pane label="总部发放明细" v-if="issueDetailCheck" name="second">
                    <div class="Detailed">
                        <el-form :inline="true" :model="headquarters" class="demo-form-inline">
                            <el-form-item label="物料名称">
                                <el-select v-model="headquarters.name" placeholder="物料名称" @change="Modify_Model_drop_down(headquarters.name)">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option v-for="i in Warehouse_Name_drop_down" :label='i.materialName' :value="i.id" :key="i.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="物料类型">
                                <el-select v-model="headquarters.Model" placeholder="请选择物料型号">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option v-for="i in Warehouse_s" :label='i.name' :value="i.name" :key="i.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="发放区域" prop="region">
                                <el-select v-model="headquarters.region" placeholder="请选择发放区域">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option
                                        v-for="i in arrs"
                                        :key="i.id"
                                        :value="i.id"
                                        :label='i.deptName'
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="发放时间">
                                <el-date-picker
                                    width="110"
                                    v-model="headquarters.Registration"
                                    type="daterange"
                                    value-format="timestamp"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="grant_Details">查询</el-button>
                                <el-button type="primary" @click="HeadquartersExport()" v-loading.fullscreen.lock="fullscreenLoading_grant" element-loading-spinner="none">导出</el-button>
                                <el-progress type="circle" :percentage="ProgressBar_grant" color="#8e71c7" v-if="queryStatus_grant == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                            </el-form-item>
                        </el-form>
                        <el-table
                                :data="arr_s"
                                style="width: 100%"
                            >
                                <el-table-column
                                    fixed
                                    align="center"
                                    prop="id"
                                    label="ID"
                                >
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="materialName"
                                    label="物料名称"
                                >
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="materialType"
                                    label="物料型号"
                                >
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="filialeName"
                                    label="发放区域"
                                >
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="provideNum"
                                    label="发放数量"
                                >
                                </el-table-column>
                            <el-table-column
                                prop="provideTime"
                                label="发放时间"
                                align="center"
                                :formatter="dateFormat">
                            </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="realReceiveNum"
                                    label="实际接收数量"
                                    :formatter="Actual_Reception"
                                >
                                </el-table-column>

                                <el-table-column
                                    align="center"
                                    prop="subTractNums"
                                    label="差异数"
                                    :formatter="Difference_num"
                                >
                                </el-table-column>

                                <el-table-column
                                    align="center"
                                    prop="materialNum"
                                    label="总部库存量(件)"
                                >
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="remark"
                                    label="备注"
                                >
                                </el-table-column>
                            </el-table>
                        <!-- 分页插件 -->
                        <el-pagination background
                                       layout="total,prev, pager, next,sizes"
                                       :total="total_grant"
                                       :page-size="pagesize_grant"
                                       @size-change="handleSizeChange_grant"
                                       @current-change="handleCurrentChange_grant"
                                       :page-sizes="[10,20,30,50]"
                                       :current-page="currentPage_grant"
                                       class="text_right">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane  label="物料申请审批列表" v-if="materialApplicationApproval" name="Third">
                    <div style="background: white;">
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
                                    <el-select v-model="form_query.Model" placeholder="请选择物料型号">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option v-for="i in Warehouse_s" :label='i.name' :value="i.name" :key="i.id"></el-option>
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

                </el-tab-pane>
            </el-tabs>
        </template>
        <!-- 入库的模态框   -->
        <el-dialog :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div style="text-align: center;font-size: 16px;font-weight: bold;padding-bottom:20px;">物料入库</div>
                <el-form-item label="名称:" prop="name">
                    <div>
                        <el-select v-model="ruleForm.name" placeholder="请选择物料名称" @change="Modify_Model(ruleForm.name)">
                            <el-option v-for="i in Warehouse_Name" :label='i.materialName' :value="i.id"
                                       :key="i.id"></el-option>
                        </el-select>
                        <el-button type="primary" size="mini" round @click="add_materiel('1')">添加</el-button>
                        <el-button type="primary" size="mini" round @click="Delete_materiel('1')">删除</el-button>
                    </div>

                </el-form-item>
                <el-form-item label="型号:" prop="Model">
                    <div>
                        <el-select v-model="ruleForm.Model" placeholder="请选择物料型号">
                            <el-option v-for="i in Material_type" :label='i.materialType' :value="i.materialType" :key="i.id1"></el-option>
                        </el-select>
                        <el-button type="primary" size="mini" round @click="add_materiel('2')">添加</el-button>
                        <el-button type="primary" size="mini" round @click="Delete_materiel('2')">删除</el-button>
                    </div>

                </el-form-item>
                <el-form-item label="供应商:" prop="Supplier">
                    <el-input v-model="ruleForm.Supplier" placeholder="请选填供应商"></el-input>
                </el-form-item>
                <el-form-item label="入库数量:" prop="num">
                    <el-input v-model="ruleForm.num" placeholder="入库数量"></el-input>
                </el-form-item>
                <el-form-item label="单价:" prop="Price">
                    <el-input v-model="ruleForm.Price" placeholder="单价"></el-input>
                </el-form-item>
                <el-form-item label="到货时间:" prop="time">
                    <el-date-picker
                        v-model="ruleForm.time"
                        type="datetime"
                        placeholder="选择日期时间"
                        value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="this.lodg" @click="save('ruleForm')">提交</el-button>
            </div>
        </el-dialog>
        <!--发放的模态窗口-->
       <el-dialog :visible.sync="grant" width="30%" :before-close="Choice_handleClose">
            <el-form :model="form" :rules="rules1" ref="form" label-width="100px" class="demo-ruleForm">
                <div style="text-align: center;font-size: 16px;font-weight: bold;padding-bottom:20px;">物料发放</div>
                <el-form-item label="发放区域:" prop="region">
                    <el-select v-model="form.region" placeholder="请选择发放区域">
                        <el-option
                            v-for="i in arrs"
                            :key="i.id"
                            :value="i.id"
                            :label='i.deptName'
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物料名称:" prop="name"  >
                    <el-select v-model="form.name" placeholder="请选择物料名称" @change="Modify_Model(form.name)">
                        <el-option v-for="i in Warehouse_Name" :label='i.materialName' :value="i.id" :key="i.id"
                                   ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物料型号:" prop="Model">
                    <el-select v-model="form.Model" placeholder="请选择物料型号" @change="Quantity_Issued">
                        <el-option v-for="i in Material_type" :label='i.materialType' :value="i.materialType" :key="i.materialType"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发放数量:" prop="number">
                    <el-input v-model="form.number" placeholder="发放数量"></el-input>
                </el-form-item>
                <p style="display: block; font-size: 13px;text-align: center"><span style="color:red;">注：</span>(目前库存总数量为:
                    <span style="font-size:15px;font-weight: bold;">{{Total}}</span>)</p>
                <el-form-item label="备注说明:" prop="desc">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="this.lod" @click="submitForm('form')">提交</el-button>
                <el-button type="primary" :loading="this.lod" @click="cancel('form')">取消</el-button>
            </div>
        </el-dialog>
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
    import {F_jurisdiction} from "../../js/Fjurisdiction";

    export default {
        name: "management",
        data() {
            return {
                //入库明细
                startTime:'',//导出 开始时间
                endTime:'',//导出 结束时间
                fullscreenLoading: false,//导出遮罩层
                queryStatus:true,//导出
                ProgressBar:0,//进度条
                code:'',
                //总部发放明细
                startTime_grant:'',//导出 开始时间
                endTime_grant:'',//导出 结束时间
                fullscreenLoading_grant: false,//导出遮罩层
                queryStatus_grant:true,//导出
                ProgressBar_grant:0,//进度条
                code_grant:'',


                centerDialogVisible_s:false,
                rows:'',
                CheckApprove:[],

                total_obj: 0,
                currentPage_obj: 1,
                pagesize_obj: 10,

                headquarters:{
                    name:'',
                    Model:'',
                    region:'',
                    Registration:[]
                },
                form_query:{//查询form
                    region:'',//区域
                    name:'',//物料名称
                    Model:'',//物料类型
                    state:''//状态
                },
                tableData:[],
                materiel:'',//删除的物料展示名称
                value:'',
                formInline:{
                    name:'',
                    Model:'',
                    Supplier:'',//供应商
                    Registration:[]//入库时间
                },
                lodg: false,
                lod: false,
                Total: '',//物料库存总数
                Material_Name: [],//物料发放数据
                arrs: [],//区域
                materialName: '',
                Material_type:'',//物料类型
                Warehouse_Model: [],
                Warehouse_Name: [],//物料入库名称数据
                arr_s: [],
                grant: false,
                dialogFormVisible: false,
                form: {
                    region: '', //发放区域
                    name: '',  //物料名称
                    Model: '',  //物料型号
                    number: '', //发放数量
                    Remarks: '' //备注说明
                },
                ruleForm: {
                    name: '',     //名称
                    Model: '',    //型号
                    Supplier: '', //供应商
                    num: '',      //入库数量
                    Price: '',    //单价
                    time: '',     //到货时间
                },

                arr: [],
                token: '',
                activeName: 'first',
                Warehouse_s:'',
                //分页
                total: 0,
                currentPage: 1,
                pagesize: 10,//每页的数据条数
                //发放明细
                total_grant: 0,
                currentPage_grant: 1,
                pagesize_grant: 10,//每页的数据条数
                name:'',
                Warehouse_Name_drop_down:[],
                rules: {
                    name: [
                        {required: true, message: '请选择物料名称', trigger: 'change'}
                    ],
                    Model: [
                        {required: true, message: '请输入型号', trigger: 'change'}
                    ],
                    Supplier: [
                        {required: false, message: '请输入共供应商', trigger: 'blur'},
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\w){2,50}$/, message: '汉字、字母或组合2~50个字符', trigger: 'blur'}
                    ],
                    num: [
                        {required: true, message: '请输入入库数量', trigger: 'blur'},
                        {pattern:/^[1-9]\d*$/, message: '入库数量为正整数', trigger: 'blur'}
                    ],
                    Price: [
                        {required: true, message: '请输入单价', trigger: 'blur'},
                        {pattern: /^\d+\.?\d{0,2}$/, message: '输入的价格保留最后两位小数', trigger: 'blur'}
                    ],
                    time: [
                        {required: true, message: '请选择到货时间', trigger: 'change'}
                    ]
                },
                rules1: {
                    region: [
                        {required: true, message: '请选择发放区域', trigger: 'change'}
                    ],
                    name: [
                        {required: true, message: '请选择物料名称', trigger: 'change'}
                    ],
                    Model: [
                        {required: true, message: '请选择物料型号', trigger: 'change'}
                    ],
                    number: [
                        {required: true, message: '请输入发放数量', trigger: 'blur'},
                        {pattern:/^[1-9]\d*$/, message: '发放数量为正整数', trigger: 'blur'}
                    ],
                    desc: [
                        {required: false, message: '请填备注说明', trigger: 'blur'}
                    ]
                },
                materialsApprovalruleForm:{
                    state:'accepted'
                },
                materialsApproval:false,
                bePutInStorage:false,
                issue:false,
                issueDetailCheck:false,
                materialApplicationApproval:false,
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
        created() {
            //拿到token
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));

            // if(jurisdictions.length == 17){
            //    bePutInStorage   入库
                this.bePutInStorage = F_jurisdiction('bePutInStorage',jurisdictions) ;
            //    发放   "issue"
                this.issue = F_jurisdiction('issue',jurisdictions) ;
            //issueDetailCheck  发放明细
                this.issueDetailCheck = F_jurisdiction('issueDetailCheck',jurisdictions) ;
            //    物料审批   materialApplicationApproval
            //     this.materialApplicationApproval = jurisdictions[16].menus[4].choose ;
            // }
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
            this.data();
            //发放物料名称
            this.goods_name();
            //下拉物料名称
            this.materiel_drop_down();
        },
        //时间转换
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD");
            }
        },
        methods: {
            Choice_handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        this.form.Model = '';
                    })
                    .catch(_ => {});
            },
            //入库明细导出
            Export(){
                let certify_time ;
                if (this.formInline.Registration == '' || this.formInline.Registration == null || this.formInline.Registration == undefined){
                    certify_time = ''
                }else {
                    this.startTime =  this.formInline.Registration[0];
                    this.endTime = this.formInline.Registration[1]+86400000-1;
                    certify_time = 'between '+ this.startTime +' and '+ this.endTime;
                }
                console.log(certify_time);
                this.$message({
                    showClose: true,
                    message: '正在导出请耐心等待！',
                    type: 'warning'
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
                    "token":this.token,
                    "exportName": "MateriHead",
                    "mr.material_id": this.formInline.name,//物料id
                    "mr.material_type": this.formInline.Model,//物料类型
                    "mr.supplier": this.formInline.Supplier,//供应商
                    "mr.create_time": certify_time,
                    "mr.opt_type":"headquarterstorage",
                    "mt.type":"quarter"
                }),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(run=>{
                    console.log(run);
                    if(run.body.errcode == 0){
                        this.fullscreenLoading = true;
                        this.queryStatus = false;
                        this.ProgressBar = 0;
                        this.code = run.body.result;
                        this.interval = setInterval(() => {
                            this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportProcess',JSON.stringify({
                                "token":this.token,
                                "id":this.code,
                            })).then(run=>{
                                console.log(run);
                                if(run.body.errcode == 0){
                                    this.ProgressBar  =   parseInt(run.body.result.exportProcess);
                                    if (this.ProgressBar == 100){
                                        clearInterval(this.interval);
                                        setTimeout(()=> {
                                            window.location.href = run.body.result.externalRoad;
                                            this.$message({
                                                message: '导出成功',
                                                type: 'success'
                                            });
                                            this.fullscreenLoading = false;
                                            this.queryStatus = true;
                                        },1200)
                                    }
                                }
                            })
                        },1000);
                    }else {
                        this.$message({
                            showClose: true,
                            message: run.body.message,
                            type: 'error'
                        });
                    }
                })
            },
            //总部发放明细
            HeadquartersExport() {
                this.$message({
                    showClose: true,
                    message: '正在导出请耐心等待！',
                    type: 'warning'
                });
                let certify_time ;
                if (this.headquarters.Registration == '' || this.headquarters.Registration == null || this.headquarters.Registration == undefined){
                    certify_time = ''
                }else {
                    this.startTime =  this.headquarters.Registration[0];
                    this.endTime = this.headquarters.Registration[1]+86400000-1;
                    certify_time = 'between '+ this.startTime +' and '+ this.endTime;
                }
                this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
                    "token":this.token,
                    "exportName": "MateriHeadOut",
                    "mr.material_id": this.headquarters.name,
                    "mr.material_type": this.headquarters.Model,
                    "mr.filiale_id":this.headquarters.region,
                    "mr.provide_time":certify_time,
                    "mr.opt_type":"headquarterout",
                    "mt.type":"quarter"
                }),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(run=>{
                    console.log(run);
                    if(run.body.errcode == 0){
                        this.fullscreenLoading_grant = true;
                        this.queryStatus_grant = false;
                        this.ProgressBar_grant = 0;
                        this.code_grant = run.body.result;
                        this.interval = setInterval(() => {
                            this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportProcess',JSON.stringify({
                                "token":this.token,
                                "id":this.code_grant,
                            })).then(run=>{
                                console.log(run);
                                if(run.body.errcode == 0){
                                    this.ProgressBar_grant  =   parseInt(run.body.result.exportProcess);
                                    if (this.ProgressBar_grant == 100){
                                        clearInterval(this.interval);
                                        setTimeout(()=> {
                                            window.location.href = run.body.result.externalRoad;
                                            this.$message({
                                                message: '导出成功',
                                                type: 'success'
                                            });
                                            this.fullscreenLoading_grant = false;
                                            this.queryStatus_grant = true;
                                        },1200)
                                    }
                                }
                            })
                        },1000);
                    }else {
                        this.$message({
                            showClose: true,
                            message: run.body.message,
                            type: 'error'
                        });
                    }
                })
            },
            //审批原因
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
            //选司机分页
            handleSizeChange_obj(val) {
                this.pagesize_obj = val;
                this.Material_Application();
            },
            handleCurrentChange_obj(val) {
                this.currentPage_obj = val;
                this.Material_Application();
            },
            grant_Details(){//查询
                this.currentPage_grant = 1;
                this.grant_Detailed();
            },
            query_Approval() {//审批查询
                this.currentPage_obj = 1;
                this.Material_Application();
            },
            //
            goods_name(){
                let page = JSON.stringify({
                    "token": this.token,
                    "searchItem": "materialtypefromdb",
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/search/searchItem', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(res => {
                    if (res.body.errcode == 0) {
                        console.log(res);
                        this.Warehouse_Name = res.body.result;//发放物料入库名称
                    }
                })
            },
            query() {//查询
                this.currentPage = 1;
                this.data();
            },
            ajax(url,page) {
                this.$http.post(this.global.lightningUrl + url, page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.$message({
                            showClose: true,
                            message: res.body.message,
                            type: 'success'
                        });
                        this.goods_name();
                        this.Modify_Model(this.ruleForm.name);
                        this.ruleForm.name = '';
                        this.ruleForm.Model = '';
                    }else {
                        this.$message({
                            showClose: true,
                            message: res.body.message,
                            type: 'error'
                        });
                    }
                })
            },
            //删除物料类型和名称
            Delete_materiel(name) {
                var type = '';
                if (name == 1 ) {
                    this.name = "物料名称";
                    for (var i in this.Warehouse_Name) {
                        if (this.ruleForm.name == this.Warehouse_Name[i].id){
                            this.materiel = this.Warehouse_Name[i].materialName;
                        }
                    }
                    if (this.ruleForm.name == '') {
                        this.$message.error("请先选择物料名称！");
                        return;
                    }
                    var type = this.materiel;
                }else if (name == 2) {
                    this.name = "物料类型";
                    var type  = this.ruleForm.Model;
                    if (this.ruleForm.Model == '') {
                        this.$message.error("请先选择物料类型！");
                        return;
                    }
                }
                this.$confirm(this.name+ '：' + type, '删除' + this.name, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (name == 1 ){
                        let page = JSON.stringify({
                            "id": this.ruleForm.name,
                            "type":"all"  // 写死在只选择物料名称的时候将物料名称的编号带过来
                        });
                        this.ajax('/companyv1/companyCenter/material/deleteMaterialName',page);
                    }else if (name == 2){
                        let page = JSON.stringify({
                            "id": this.ruleForm.name, // 物料名称的编号
                            "materialType":this.ruleForm.Model,   // 物料名称的类型
                            "type":"sub" // 写死 在选择了物料名称和物料类型的时候删除
                        });
                        this.ajax('/companyv1/companyCenter/material/deleteMaterialName',page);
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //新增物料名称和类型新增
            add_materiel(name) {
                if (name == 1 ) {
                    this.name = "物料名称";
                }else if (name == 2) {
                    this.name = "物料类型";
                    if(this.ruleForm.name == ''){
                        this.$message.error('请先选择物料名称！');
                        return;
                    }
                }
                this.$prompt('输入'+this.name, '新增' + this.name, {

                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{2,10}$/,
                    inputErrorMessage: '物料'+ this.name +'格式不正确（2-10个字符）'
                }).then(({ value }) => {
                        if (name ==1){
                            this.value = value;
                            let page = JSON.stringify({
                                "token":this.token,
                                "materialName": this.value     //录入名称
                            });
                            this.ajax('/companyv1/companyCenter/material/addMaterialName',page);
                        }else if (name == 2){
                            this.value = value;
                            let page = JSON.stringify({
                                "token":this.token,
                                "id":this.ruleForm.name, //所选物料名称的编号
                                "materialType": this.value     //录入名称
                            });
                            this.ajax('/companyv1/companyCenter/material/addMaterialType',page);
                        }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            Difference_num(row) {
                if (row.subTractNums == -1) {
                    return ''
                }else {
                    return row.subTractNums
                }
            },
            Actual_Reception(row){
                if (row.realReceiveNum == -1){
                    return '';
                }else {
                    return row.realReceiveNum;
                }
            },
            //发放取消按钮
            cancel(form) {
                this.Total = '';
                this.$refs[form].resetFields();
                this.grant = false;
            },
            //发放保存按钮
            submitForm(form) {
                var materialName = '';
                var deptName = '';
                if (this.form.number > this.Total) {
                    this.$message({
                        message: '发放数量超额，请重新输入',
                        type: 'warning'
                    });
                    return false;
                }
                for (var i in this.arrs) {
                    if (this.form.region == this.arrs[i].id) {
                        deptName = this.arrs[i].deptName;
                    }
                }
                for (var i in this.Material_Name) {
                    if (this.form.name == this.Material_Name[i].id) {
                        materialName = this.Material_Name[i].materialName
                    }
                };
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.lod = true;
                        let page = JSON.stringify({
                            'token': this.token,
                            "materialId": this.form.name,       //物料编号
                            "materialName": materialName,    //物料名称#
                            "materialType": this.form.Model,   //物料型号
                            "remark": this.form.desc, //备注
                            "provideNum": this.form.number,         //出库数量
                            "filialeId": this.form.region,           //出库分公司编号
                            "filialeName": deptName //出库分公司名称
                        });
                        this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/material/outQuarterGrant', page, {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            console.log(res);
                            if (res.body.errcode == 0) {
                                this.$message({
                                    message: res.body.message,
                                    type: 'success'
                                });
                                this.lod = false;
                                this.grant = false;
                                this.form = {};
                                this.$refs[form].resetFields();
                                this.data();
                            } else {
                                this.$message({
                                    message: res.body.message,
                                    type: 'warning'
                                });
                                this.lod = false;
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //入库保存按钮
            save(formName) {
                for (var i in this.Warehouse_Name) {
                    if (this.ruleForm.name == this.Warehouse_Name[i].id) {
                        this.materialName = this.Warehouse_Name[i].materialName
                    }
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.lodg = true;
                        let page = JSON.stringify({
                            "token": this.token,
                            "materialId": this.ruleForm.name,            //物料编号
                            "materialName": this.materialName,         //物料名称
                            "materialType": this.ruleForm.Model,        //物料类型
                            "supplier": this.ruleForm.Supplier,    //供应商
                            "unitPrice": this.ruleForm.Price,              //单价
                            "arrivalSum": this.ruleForm.num,             //到仓数量
                            "arrivalTime": this.ruleForm.time    //到仓时间
                        });
                        this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/material/headQuarterStorage', page, {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then(res => {
                            if (res.body.errcode == 0) {
                                console.log(res);
                                this.$message({
                                    message: res.body.message,
                                    type: 'success'
                                });
                                this.lodg = false;
                                this.dialogFormVisible=false;
                                this.ruleForm = {};
                                this.data();
                            }else {
                                this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'error'
                                });
                                this.lodg = false;
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //发放总数量
            Quantity_Issued() {
                let page = JSON.stringify({
                    'token': this.token,
                    "searchItem": "materialsurplusnums",
                    "id1": this.form.name,                               //物料编号
                    "conditionStr1": "quarter",                 // 写死
                    "conditionStr2": this.form.Model                    // 物料类型

                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/search/searchItem', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode === 0) {
                        this.Total = res.body.result;
                    }
                })
            },
            //发放
            grants() {
                this.grant = true;

                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/search/searchItem', JSON.stringify({
                    "searchItem": "materialtypefromreal",
                    "conditionStr1": "quarter"
                }), {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    if (res.body.errcode == 0) {
                        this.Material_Name = res.body.result
                    }
                })
            },
            //入库
            Warehousing() {
                this.dialogFormVisible = true;
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
            //下拉物料名称
            // 物料名称
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
                    }
                })
            },
            //页面首刷
            data() {
                let page = JSON.stringify({
                    "token": this.token,
                    'pageNum':this.currentPage,
                    'pageSize':this.pagesize,
                    "searchItem": "materialheadstoragelist",
                    "id3":this.formInline.name,
                    "conditionStr2":this.formInline.Model,//物料型号
                    "conditionStr3":this.formInline.Supplier,//供应商
                    "id1":this.formInline.Registration != '' && this.formInline.Registration != null?this.formInline.Registration[0]:'',
                    "id2":this.formInline.Registration != '' && this.formInline.Registration != null?this.formInline.Registration[1]+86400000-1:'',
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/search/searchItem', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(res => {
                    if (res.body.errcode == 0) {
                        this.arr = res.body.result.rows;
                        this.total = res.body.result.total;
                    }
                })
            },
            //发放明细
            grant_Detailed() {
                let page = JSON.stringify({
                    "token": this.token,
                    'pageNum':this.currentPage_grant,
                    'pageSize':this.pagesize_grant,
                    "searchItem": "materialheadoutlist",
                    "id3": this.headquarters.name,//物料名称
                    "conditionStr2": this.headquarters.Model,//物料型号
                    "id4": this.headquarters.region,//发放区域
                    "id1":this.headquarters.Registration != '' && this.headquarters.Registration != null?this.headquarters.Registration[0]:'',
                    "id2": this.headquarters.Registration != '' && this.headquarters.Registration != null?this.headquarters.Registration[1]+86400000-1:'',
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/search/searchItem', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(res => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.arr_s = res.body.result.rows;
                        this.total_grant = res.body.result.total;
                    }
                })
            },
            //去审批
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
                    }
                })
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
                    "conditionStr4":this.form_query.state       //筛选条件  审批状态
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
            //table
            handleClick(tab, event) {
                console.log(tab, event);
                if (tab.name == "second"){
                    this.grant_Detailed();
                }
                if (tab.name == "Third"){
                    this.Material_Application();
                }
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD  HH:mm");
            },
            //分页
            handleSizeChange(pagesize) {
                this.pagesize = pagesize;
                this.data();
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.data();
            },
            //发放明细
            handleSizeChange_grant(pagesize_grant) {
                this.pagesize_grant = pagesize_grant;
                this.grant_Detailed();
            },
            handleCurrentChange_grant(currentPage_grant) {
                this.currentPage_grant = currentPage_grant;
                this.grant_Detailed();
            },
            //时间转换
            dateFormat1: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD ");
            }
        }
    }
</script>

<style lang="scss">
    .management {
        background: #eaedf2;
        padding: 30px;
        overflow-y: auto;
        .header {
            line-height: 56px;
            color: #606163;
            font-size: 16px;
            .header_position {
                color: #2b2c2e;
                font-weight: bold;
            }
        }
        .el-tabs__nav-scroll {
            border-bottom: 1px solid white;
        }
        .el-tabs__header {
            margin: 0;
        }
        .el-tabs__nav {
            height: 55px;
            .el-tabs__item {
                height: 55px;
                line-height: 55px;
                background: white;
                border-top: 4px solid transparent;
            }
            .is-active {
                border-top-color: #337df6;
            }
        }
        .Warehousing {
            padding: 20px;
            background: white;
            .nav {
                line-height: 40px;
                overflow: hidden;
                .nav_1 {
                    font-weight: bold;
                    display: block;
                    font-size: 15px;
                    color: #303133;
                    overflow: hidden;
                    text-align: center;
                    width: 80%;
                    float: left;
                }
                .nav_2 {
                    float: left;
                    display: block;
                    width: 20%;
                    padding:20px;
                }
            }
            .content {
                margin-top: 30px;
            }
        }
        .Detailed {
            padding: 20px;
            background: white;
            .IssueDetails {
                .nav {
                    display: block;
                    font-size: 15px;
                    font-weight: bold;
                    color: #303133;
                    text-align: center;
                    padding: 20px;
                }
            }
        }
        .materialsApproval{
            .el-input{
                width: 260px;
            }
        }
        .oul{
            padding:20px;
            li{
                margin:10px;
            }
        }
    }
</style>