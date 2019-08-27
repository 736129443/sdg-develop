<template>
    <div class="main myStock">
        <div class="header">
            当前位置：<span>物料管理 > 我的库存</span>
        </div>
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="a" v-if="materialApplication" label="物料申请">
                <div class="from_width" style="position: relative;">
                    <div style="padding-bottom:50px;">
                        <el-button type="primary" plain @click="dialogVisible_record=true">物料申请</el-button>
                    </div>
                    <el-table
                        :data="arr_s"
                        style="width: 100%"
                        max-height="100%"
                    >
                        <el-table-column
                            fixed
                            align="center"
                            prop="id"
                            label="编号"
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
                            prop="applyNums"
                            label="申请数量"
                        >
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="applyRemark"
                            label="申请说明"
                        >
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="applyName"
                            label="申请人"
                        >
                        </el-table-column>

                        <el-table-column
                            align="center"
                            prop="applyTime"
                            label="申请时间"
                            :formatter="dateFormat"
                        >
                        </el-table-column>

                        <el-table-column
                            align="center"
                            prop="status"
                            label="审批状态"
                            :formatter="Actual_Reception"
                        >
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="status"
                            label="审批状态"
                            :formatter="Actual_Reception"
                        >
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
                    <!-- 分页插件 -->
                    <el-pagination
                        background
                        layout="total,prev, pager, next,sizes"
                        :total="total_apply"
                        :page-size="pagesize_apply"
                        @size-change="handleSizeChange_apply"
                        @current-change="handleCurrentChange_apply"
                        :page-sizes="[10,20,30,50]"
                        :current-page="currentPage_apply"
                        class="text_right"
                    ></el-pagination>
                    <!--申请记录-->
                    <el-dialog
                        title="物料申请"
                        :visible.sync="dialogVisible_record"
                        width="60%"
                        :before-close="handleClose_record">
                        <span>
                            <el-form ref="form_approval" :rules="rules_approval" :model="form_approval" label-width="80px" >
                        <el-form-item label="物料名称" prop="name" >
                            <el-select v-model="form_approval.name" placeholder="请选择物料名称" @change="Modify_Model(form_approval.name)">
                                <el-option v-for="i in Warehouse_Name" :label='i.materialName' :value="i.id"
                                           :key="i.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="物料型号" prop="Model">
                            <el-select v-model="form_approval.Model" placeholder="请选择物料型号">
                                <el-option v-for="i in Warehouse_s" :label='i.name' :value="i.name" :key="i.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="申请数量" prop="num">
                            <el-input v-model="form_approval.num" placeholder="请输入申请数量"></el-input>
                        </el-form-item>
                        <el-form-item label="申请原因" prop="Reason">
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="form_approval.Reason">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit('form_approval')">提交</el-button>
                        </el-form-item>
                    </el-form>
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
            </el-tab-pane>
            <el-tab-pane name="b" label="物料接收">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="物料名称">
                        <el-select v-model="formInline.name" placeholder="物料名称" @change="Modify_Model(formInline.name)">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="i in Warehouse_Name" :label='i.materialName' :value="i.id" :key="i.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物料型号">
                        <el-select v-model="formInline.Model" placeholder="请选择物料型号">
                            <el-option v-for="i in Warehouse_s" :label='i.name' :value="i.name" :key="i.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="Issue_Queries">查询</el-button>
                        <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none">导出</el-button>
                        <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
                    </el-form-item>
                </el-form>
                <template>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="id" label="ID" align="center"></el-table-column>
                        <el-table-column prop="materialName" label="名称" align="center"></el-table-column>
                        <el-table-column prop="materialType" label="型号" align="center"></el-table-column>
                        <el-table-column prop="headProvideTime" label="总部发放时间" align="center":formatter="dateFormat"></el-table-column>
                        <el-table-column prop="headProvideNum" label="总部发放数量（件）" align="center"></el-table-column>
                        <el-table-column prop="realReceiveNum" label="实际接收数量（件）" align="center" :formatter="Difference_num"></el-table-column>
                        <el-table-column prop="recycleNum" label="回收数量" align="center" ></el-table-column>
                        <el-table-column prop="subNums" label="库存量" align="center" ></el-table-column>
                        <el-table-column label="操作" align="center" v-if="materialReceiving">
                            <template slot-scope="scope">
                                <el-button
                                    v-if="tableData[scope.$index].realReceiveNum == -1 ?true:false"
                                        size="mini"
                                        type="primary"
                                        plain
                                        @click="receive(scope.$index, scope.row)">接收
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <!-- 分页插件 -->
                <el-pagination
                        background
                        layout="total,prev, pager, next,sizes"
                        :total="total"
                        :page-size="pagesize"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10,20,30,50]"
                        :current-page="currentPage"
                        class="text_right"
                ></el-pagination>
                <!--接受-->
                <el-dialog
                        title="提示"
                        :visible.sync="centerDialogVisible"
                        width="30%"
                        class="f_width"
                        center>
                    <el-form :model="formInline1" :rules="rules1" ref="formInline1" label-width="110px" class="demo-ruleForm">
                        <el-form-item label="名称" prop="name" >
                            <el-input v-model="formInline1.name" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="型号" prop="Model">
                            <el-input v-model="formInline1.Model" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="发放数量" prop="num" >
                            <el-input v-model="formInline1.num" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="实际接收数量" prop="Actual_umber">
                            <el-input v-model="formInline1.Actual_umber"></el-input>
                        </el-form-item>
                        <el-form-item label="到货时间" prop="time">
                            <el-date-picker
                                    v-model="formInline1.time"
                                    type="datetime"
                                    value-format="timestamp"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <!--<el-form-item label="备注" prop="Remark">-->
                            <!--<el-input type="textarea" v-model="formInline1.Remark"></el-input>-->
                        <!--</el-form-item>-->
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取 消</el-button>
                        <el-button type="primary" :loading="this.lodg" @click="submitForm('formInline1')">确 定</el-button>
                    </span>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane name="c" v-if="workClothesManage" label="工服管理">
                <div style="margin:20px;">
                    <el-button type="primary" plain @click='grant'  v-if="clothingDistribution">工服发放</el-button>
                    <el-button type="primary" plain @click='Refund_record'  >工服回收</el-button>
                    <el-button type="primary" plain @click='Deposit_record'  >工服押金记录</el-button>
                </div>

                <el-form :inline="true" :model="clothes_Administration" class="demo-form-inline" style="padding-left:22px; ">
                    <el-form-item label="物料名称">
                        <el-select v-model="clothes_Administration.name" placeholder="物料名称" @change="Modify_Model(clothes_Administration.name)">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="i in Warehouse_Name" :label='i.materialName' :value="i.id" :key="i.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="物料型号">
                        <el-select v-model="clothes_Administration.Model" placeholder="请选择物料型号">
                            <el-option v-for="i in Warehouse_s" :label='i.name' :value="i.name" :key="i.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="clothes_Administration.FullName" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="发放时间">
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
                    <el-button type="primary" @click="Issue_Queries_s">查询</el-button>
                </el-form>
                <template class="st_c ">
                <el-table :data="tableData_clothes" style="width: 100%">
                    <el-table-column prop="id" label="ID" align="center"></el-table-column>
                    <el-table-column prop="materialName" label="名称" align="center"></el-table-column>
                    <el-table-column prop="materialType" label="型号" align="center"></el-table-column>
                    <!--<el-table-column prop="unitPrice" label="单价" align="center"></el-table-column>-->
                    <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
                    <el-table-column prop="userPhone" label="电话" align="center"></el-table-column>
                    <el-table-column prop="money" label="工服押金" align="center"></el-table-column>
                    <el-table-column prop="giveNum" label="领取数量"align="center"></el-table-column>
                    <el-table-column prop="giveTime" label="发放时间" align="center":formatter="dateFormat" width="180"></el-table-column>
                    <el-table-column prop="isPayUniform" label="押金状态" align="center"></el-table-column>
                    <!--<el-table-column prop="uniformStatus" label="工服发放状态" align="center"></el-table-column>-->
                    <el-table-column label="查看备注" align="center">
                        <template slot-scope="scope">
                            <el-tooltip placement="top">
                                <div slot="content" v-if="tableData_clothes[scope.$index].remark != undefined  ? true : false ">{{tableData_clothes[scope.$index].remark}}</div>
                                <el-button size="mini" v-if="tableData_clothes[scope.$index].remark == '' ? false:true">查看</el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
                <!-- 分页插件 -->
                <el-pagination
                    background
                    layout="total,prev, pager, next,sizes"
                    :total="total_clothes"
                    :page-size="pagesize_clothes"
                    @size-change="handleSizeChange_clothes"
                    @current-change="handleCurrentChange_clothes"
                    :page-sizes="[10,20,30,50]"
                    :current-page="currentPage_clothes"
                    class="text_right"
                ></el-pagination>
                <!--工服发放-->
                <el-dialog
                        title="工服发放"
                        :visible.sync="dialogVisible1"
                        width="30%"
                        class="uniform"
                >
                    <el-form :model="uniformform" :rules="rules" ref="uniformform" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="发放对象">
                            <p><el-button plain @click="dialogVisible = true;">选择对象</el-button><span style=" font: small-caps bold 14px/1.2em Arial;">{{this.selected}}{{this.phone}}</span></p>
                        </el-form-item>
                        <el-form-item label="选择型号" prop="Model" >
                            <el-select v-model="uniformform.Model" placeholder="请选择型号">
                                <el-option v-for="i in grant_Model_s" :label='i.name' :value="i.name" :key="i.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="发放数量" prop="num">
                            <el-input v-model.trim="uniformform.num"></el-input>
                        </el-form-item>
                        <el-form-item label="发放原因" prop="Reason">
                            <el-select v-model="uniformform.Reason" placeholder="请选择发放原因">
                                <el-option label="首次领取" value="首次领取"></el-option>
                                <el-option label="二次领取" value="二次领取"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注" prop="desc">
                            <el-input type="textarea" v-model="uniformform.desc"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible1 = false">取 消</el-button>
                        <el-button type="primary" :loading="this.lod" @click="submitForm_obj('uniformform')">确 定</el-button>
                    </span>
                </el-dialog>
                <!--选司机弹框-->
                <el-dialog
                    title=""
                    :visible.sync="dialogVisible"
                    width="50%"
                    :before-close="Choice_handleClose">
                    <span style="font-weight: bold;display: block; text-align: center;">选择发放对象</span>
                    <div class="dialog">
                        <div><span style="font-weight: bold;font-size:13px;">请输入司机账号或姓名：</span><el-input style="width:30%;margin-right:10px;" v-model.trim="input" placeholder="请输入内容"></el-input><el-button size="mini" round @click="Select_object">查看</el-button></div>
                    </div>
                    <div>
                        <template>
                            <el-table
                                :data="tableData_obj"
                                border
                                style="width: 100%">
                                <el-table-column
                                    fixed
                                    align="center"
                                    prop=""
                                    label="姓名(电话)"
                                    >
                                    <template slot-scope="scope">
                                        <p>{{tableData_obj.length === 0 ? "" :tableData_obj[scope.$index].name}}</p>
                                        <p>({{tableData_obj.length === 0 ? "" :tableData_obj[scope.$index].phone}})</p>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                    align="center"
                                    prop="isPayUniform"
                                    label="是否缴纳押金"
                                    >
                                </el-table-column>
                                <el-table-column
                                    align="center"
                                    prop="pieces"
                                    label="押金金额和数量"
                                    >
                                    <template slot-scope="scope">
                                        <p>押金：{{tableData_obj.length === 0 ? "" :tableData_obj[scope.$index].money}}</p>
                                        <p>数量：{{tableData_obj.length === 0 ? "" :tableData_obj[scope.$index].pieces}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="操作"
                                    align="center"
                                    >
                                    <template slot-scope="scope">
                                        <el-button
                                            v-if="tableData_obj[scope.$index].isPayDeposit == '否' ?false:true"
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row)">选定</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                </el-dialog>
                <!--工服回收-->
                <el-dialog
                        title="工服回收"
                        :visible.sync="receivedialogVisible"
                        width="30%"
                        class="uniform"
                        :before-close="handleClose">
                    <el-form ref="uniformform1" :rules="rules2" :model="uniformform1" label-width="120px">
                        <el-form-item label="司机:">
                           <span style="font-weight: bold">{{this.userName}}({{this.userPhone}})</span>

                        </el-form-item>
                        <el-form-item label="领取日期:">
                            <span style="font-weight: bold;">{{this.giveTime | dateFrm}}</span>
                        </el-form-item>
                        <el-form-item label="型号:">
                            <span style="font-weight: bold;">{{this.row.materialType}}</span>
                        </el-form-item>
                        <!--<p style="display: block; font-size: 13px;padding-left:100px;"><span style="color:red;">注：</span>(申请退还数量为:-->
                            <!--<span style="font-size:15px;font-weight: bold;">{{this.row.applyNum}}</span>)</p>-->
                        <el-form-item label="工服退还数量:" prop="num">
                            <el-input v-model="uniformform1.num" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="工服退还时间:" prop="time">
                            <el-date-picker
                                v-model="uniformform1.time"
                                type="datetime"
                                placeholder="选择日期时间"
                                value-format="timestamp">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="退还押金:" prop="deposit">
                            <el-radio v-model="uniformform1.deposit" label="押金全额">押金全额</el-radio>
                            <el-radio v-model="uniformform1.deposit" label="部分押金" :disabled="abled">部分押金</el-radio>
                            <el-radio v-model="uniformform1.deposit" label="押金全额抵扣" :disabled="abled">押金全额抵扣</el-radio>
                            <br>
                            <div v-if="uniformform1.deposit == '部分押金' ">
                                <el-input v-model="uniformform1.deposit_num" placeholder="请输入金额/元"></el-input>元
                            </div>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" :loading="recovery" @click="Submission('uniformform1')">提交</el-button>
                    </span>
                </el-dialog>
                <!--工服押金-->
                <el-dialog
                    title="工服押金记录"
                    :visible.sync="clothing_Deposit_record"
                    width="70%"
                    :before-close="Choice_handleClose">
                    <div>
                        <el-form :inline="true" :model="formDeposit" class="demo-form-inline">
                            <el-form-item label="姓名">
                                <el-input v-model="formDeposit.FullName" placeholder="姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="交易时间">
                                <el-date-picker
                                    width="110"
                                    v-model="formDeposit.Registration"
                                    type="daterange"
                                    value-format="timestamp"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-select v-model="formDeposit.type" placeholder="类型">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="交押金" value="buy"></el-option>
                                <el-option label="退押金" value="refund"></el-option>
                            </el-select>
                            <el-button type="primary" @click="DepositInquiry">查询</el-button>
                        </el-form>
                        <template>
                            <el-table :data="Deposit_record_num" style="width: 100%">
                                <el-table-column prop="userName" label="姓名"align="center"></el-table-column>
                                <el-table-column prop="userPhone" label="电话" align="center"></el-table-column>
                                <el-table-column prop="transactionMoney" label="交易金额"align="center"></el-table-column>
                                <el-table-column prop="remark" label="类型" align="center"></el-table-column>
                                <el-table-column prop="createTime" label="交易时间" align="center":formatter="dateFormat" width="180"></el-table-column>
                            </el-table>
                        </template>
                        <el-pagination
                            background
                            layout="total,prev, pager, next,sizes"
                            :total="total_Deposit_record"
                            :page-size="pagesize_Deposit_record"
                            @size-change="handleSizeChange_Deposit_record"
                            @current-change="handleCurrentChange_Deposit_record"
                            :page-sizes="[10,20,30,50]"
                            :current-page="currentPage_Deposit_record"
                            class="text_right"
                        ></el-pagination>
                    </div>
                </el-dialog>
                <!--工服退还记录-->
                <el-dialog
                    title="工服回收"
                    :visible.sync="clothing_Refund_record"
                    width="70%"
                    :before-close="Choice_handleClose">
                    <div>
                        <el-form :inline="true" :model="formRefund" class="demo-form-inline">
                            <el-form-item label="姓名">
                                <el-input v-model="formRefund.FullName" placeholder="姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="回收时间">
                                <el-date-picker
                                    width="110"
                                    v-model="formRefund.Registration"
                                    type="daterange"
                                    value-format="timestamp"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-button type="primary" @click="RefundEnquiry">查询</el-button>
                        </el-form>
                        <template>
                            <el-table :data="Refund_record_num" style="width: 100%">
                                <el-table-column prop="userName" label="姓名"align="center"></el-table-column>
                                <el-table-column prop="userPhone" label="电话" align="center"></el-table-column>
                                <el-table-column prop="giveNum" label="发放数量"align="center"></el-table-column>
                                <el-table-column prop="materialType" label="工服型号" align="center"></el-table-column>
                                <el-table-column prop="giveTime" label="发放时间" align="center":formatter="dateFormat" width="180"></el-table-column>
                                <el-table-column prop="receiveNum" label="回收数量" align="center" width="180"></el-table-column>
                                <el-table-column prop="receiveTime" label="回收时间" align="center":formatter="dateFormat" width="180"></el-table-column>
                                <el-table-column label="操作" align="center" v-if="clothingRecycling">
                                    <template slot-scope="scope">
                                        <el-button
                                            v-if="Refund_record_num[scope.$index].receiveTime == undefined?true:false"
                                            size="mini"
                                            type="primary"
                                            plain
                                            @click="receive_1(scope.$index, scope.row)">回收</el-button>
                                    </template>
                                </el-table-column>

                            </el-table>
                        </template>
                        <el-pagination
                            background
                            layout="total,prev, pager, next,sizes"
                            :total="total_Refund_record"
                            :page-size="pagesize_Refund_record"
                            @size-change="handleSizeChange_Refund_record"
                            @current-change="handleCurrentChange_Refund_record"
                            :page-sizes="[10,20,30,50]"
                            :current-page="currentPage_Refund_record"
                            class="text_right"
                        ></el-pagination>
                    </div>
                </el-dialog>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import moment from 'moment'
    import {F_jurisdiction, AIfirstClass0, secondLevel} from '../../js/Fjurisdiction.js'
    export default {
        name: "myStock",
        data() {
            return {
                fullscreenLoading: false,
                code:'',
                //导出
                queryStatus:true,
                //进度条
                ProgressBar:0,

                abled:false,
                formRefund:{
                    Registration:[],
                    FullName:''
                },
                formDeposit:{
                  type:'',
                  Registration:[],
                  FullName:''
                },
                Refund_record_num:[],//工服退还记录
                total_Refund_record: 0,
                currentPage_Refund_record: 1,
                pagesize_Refund_record: 10,

                Deposit_record_num:[],//工服押金记录
                total_Deposit_record: 0,
                currentPage_Deposit_record: 1,
                pagesize_Deposit_record: 10,
                Total:'',
                clothes_Administration:{
                  name:'',
                  Model:'',
                  FullName:''//姓名
                },
                formInline:{
                    name:'',
                    Model:'',
                    Registration:''
                },
                arr_s:[],
                Warehouse:[],
                Warehouse_s:[],
                dialogVisible_record:false,
                Material_type:[],
                Warehouse_Name:[],
                recovery:false,
                row:{},
                userName:'',
                userPhone:'',
                giveTime:'',
                lod:false,
                grant_Model:[],
                grant_Model_s:[],
                lodg: false,
                token:'',
                input:'',
                selected:'',//选定司机选定
                phone:'',
                form_approval: {
                    name:"",//物料名称
                    Model:"",//型号
                    num:"",//申请个数
                    Reason:"",//申请原因
                },
                tableData: [],//发放明细列表
                tableData_clothes:[],//工服管理
                tableData_obj:[],//选择发放对象
                total: 0,
                currentPage: 1,
                pagesize: 10,



                total_clothes: 0,
                currentPage_clothes: 1,
                pagesize_clothes: 10,
//物料申请的分页数据
                total_apply: 0,
                currentPage_apply: 1,
                pagesize_apply: 10,

                activeName: 'b',
                centerDialogVisible: false,
                centerDialogVisible_s:false,
                pieces:'',
                formInline1: {
                    name:'',//名称
                    Actual_umber:'',//实际接收数
                    num:'',//发放数量
                    Model:'',//型号
                    time:'',//到货时间
                    Remark:'',//备注
                },
                value1: '',
                dialogVisible1:false,
                uniformform:{
                    Model:'',//型号
                    num:'',//数量
                    Reason:'',//发放原因
                    desc:'',//备注
                },
                rows:'',
                uniformform1:{
                    num:'',//退还数量
                    time:'',//退还时间
                    deposit:'',//退押金类型
                    deposit_num:'',//退押金金额
                },
                value112:'',
                receivedialogVisible:false,
                dialogVisible: false,
                CheckApprove:[],
                rules_approval:{
                    name: [
                        {required: true, message: '请选择物料名称', trigger: 'change'}
                    ],
                    Model: [
                        {required: true, message: '请输入物料型号', trigger: 'change'}
                    ],
                    num: [
                        {required: true, message: '请输入发放数量', trigger: 'blur'},
                        {pattern:/^[1-9]\d*$/, message: '发放数量为正整数', trigger: 'blur'}
                    ],
                    Reason: [
                        {required: false, message: '请填备注说明', trigger: 'blur'}
                    ]
                },
                rules1: {
                    time: [
                        {required: true, message: '请选择到货时间', trigger: 'change'}
                    ],
                    Actual_umber: [
                        {required: true, message: '请输入实际接收数量', trigger: 'blur'},
                        {pattern: /^[1-9]\d*$/, message: '实际接收数量为正正数', trigger: 'blur'}
                    ],
                    Remark: [
                        {required: false, message: '请填备注说明', trigger: 'blur'}
                    ]
                },
                rules:{
                    Reason: [
                        {required: true, message: '请输入发放原因', trigger: 'change'}
                    ],
                    num: [
                        {required: true, message: '请输入发放数量', trigger: 'blur'},
                        {pattern:/^[1-9]\d*$/, message: '发放数量为正整数', trigger: 'blur'}
                    ],
                    Model: [
                        {required: true, message: '请输入型号', trigger: 'change'}
                    ],
                    Remark: [
                        {required: false, message: '请填备注说明', trigger: 'blur'}
                    ]
                },
                rules2:{
                    time:[
                        {required: true, message: '请选择退还时间', trigger: 'change'}
                    ],
                    num:[
                        {required: true, message: '请输入发放数量', trigger: 'blur'},
                        {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                    ],
                    deposit:[
                        { required: true, message: '请选择退还押金', trigger: 'change' }
                    ]
                },
                materialReceiving:false,
                materialApplication:false,
                workClothesManage:false,
                clothingDistribution:false,
                clothing_Deposit_record:false,
                clothing_Refund_record:false,
                clothingRecycling:false,
            }
        },
        watch:{
            "clothes_Administration.name"(curVal,oldVal) {
                if (oldVal != ''){
                    if (curVal != oldVal) {
                        this.clothes_Administration.Model ='';
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
            "form_approval.name"(curVal,oldVal) {
                if (oldVal != ''){
                    if (curVal != oldVal) {
                        this.form_approval.Model ='';
                    }
                }
            },
        },
        methods: {
            //发放明细导出
            Export(){
                this.$message({
                    showClose: true,
                    message: '正在导出请耐心等待！',
                    type: 'warning'
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
                    "token":this.token,
                    "exportName": "MateriSubStorage",
                    "mr.material_id": this.formInline.name,
                    "mr.material_type":this.formInline.Model,
                    "mr.opt_type":"subfromheadout",
                })).then(run=>{
                    console.log(run);
                    if(run.body.errcode == 0){
                        this.fullscreenLoading = true;
                        this.queryStatus = false;
                        this.ProgressBar=0,
                            this.code = run.body.result;
                        this.interval = setInterval(() => {
                            this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportProcess',JSON.stringify({
                                "token":this.token,
                                "id":this.code,
                            })).then(run=>{
                                console.log(run);
                                if(run.body.errcode == 0){
                                    this.ProgressBar  =   parseInt(run.body.result.exportProcess) ;
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

            handleClick_s(row) {//查看申请的意见
                this.centerDialogVisible_s=true;
                console.log(row);
                this.rows = row;
                this.$http.post(this.global.lightningUrl+'/companyv1/companyCenter/approval/materialapprovaldetail',JSON.stringify({
                    "token":this.token,
                    "itemId":row.id,
                })).then(run=>{
                    console.log(run);
                    this.CheckApprove = run.body.result;
                })
            },
            Issue_Queries() {//发放明细查询按钮
                this.currentPage = 1;
                this.ajax();
            },
            Issue_Queries_s() {//工服管理
                this.currentPage = 1;
                this.clothes();
            },
            Actual_Reception(row){

                if (row.status == 'approving') {
                    return '审批中'
                }else if (row.status == 'accepted') {
                    return'已通过'
                }else{
                   return'未通过'
                }
            },
            Application_record(){

                let page = JSON.stringify({
                    "token":this.token,
                    'pageNum':this.currentPage_apply,
                    'pageSize':this.pagesize_apply,
                    "searchItem":"materialapplylist", //标示分公司申请列表
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/approval/materialapprovallist', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.arr_s = res.body.result.rows;
                        this.total_apply = res.body.result.total;
                    }
                })
            },
            Modify_Model(name) {
                this.Warehouse_s = [];
                for (var i in this.Warehouse_Name){
                    if (name == this.Warehouse_Name[i].id){
                        this.Warehouse = this.Warehouse_Name[i].materialTypeAndNums;
                        for (var j in this.Warehouse){
                            this.Warehouse_s.push({"name":this.Warehouse[j],"id":j});
                        }
                    }

                }
            },
            // 物料名称
            materiel() {
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
                        this.Warehouse_Name = res.body.result;
                    }
                })
            },
            Difference_num(row) {
                if (row.realReceiveNum == -1) {
                    return ''
                }else {
                    return row.realReceiveNum
                }
            },
            dateFormat:function(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            //工服发放确定按钮
            submitForm_obj(uniformform) {
                if (this.table == undefined) {
                    this.$message({
                        message: '请选择发放对象!',
                        type: 'warning'
                    });
                    this.lod = false;
                    return false;
                }

                this.$refs[uniformform].validate((valid) => {
                    if (valid) {
                        this.lod = true;
                        console.log(this.table);
                        if (this.uniformform.num > this.pieces) {
                            this.$message({
                                message: '发放数量大于已交押金数量，请重新输入',
                                type: 'warning'
                            });
                            this.lod = false;
                            return false;
                        }
                        let page = JSON.stringify({
                            'token': this.token,
                            "userId":this.table.userId,  //司机编号
                            "userName":this.table.name,  //司机姓名
                            "userPhone":this.table.phone,  //司机电话
                            "materialType":this.uniformform.Model, //物料类型
                            "giveNum":this.uniformform.num, //物料个数
                            "giveReason":this.uniformform.Reason,//发放原因
                            "remark":this.uniformform.desc, //备注
                            "transactionId":this.table.transactionId, //交易ID
                            "price":this.table.price,//押金单价
                            "pieces":this.table.pieces,    //已缴纳押金个数
                        });
                        console.log(page);
                        this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/material/give', page, {
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

                                this.lod = false;
                                this.$refs[uniformform].resetFields();
                                this.dialogVisible1 = false;
                                this.clothes();
                            }else {
                                this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'error'
                                });
                                this.uniformform = {};
                                this.lod = false;
                                this.dialogVisible1 = false;
                                this.$refs[uniformform].resetFields();
                                this.clothes();
                            }
                        })
                    }
                });
            },
            //发放明细接收按钮
            submitForm(formInline1) {
                if (this.formInline1.Actual_umber > this.formInline1.num){
                    this.$message({
                        message:"实际接收数量大于发放数量,输入有误。请重新输入！",
                        type: 'warning'
                    });
                    this.lodg = false;
                    return false
                }
                this.$refs[formInline1].validate((valid) => {
                    if (valid) {
                        this.lodg = true;
                        let page = JSON.stringify({
                            'token': this.token,
                            "id": this.id,                          // 编号
                            "headId":this.headId,                   // 总公司发放编号
                            "materialId": this.materialId,              // 物料编号
                            "materialType":this.materialType,           // 物料类型
                            "realReceiveNum": this.formInline1.Actual_umber,            // 实际接收数量
                            "arrivalTime": this.formInline1.time,     // 到仓时间
                            "subRemark": this.formInline1.Remark  //备注
                        });
                        console.log(page);
                        this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/material/subMaterialStorage', page, {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            console.log(res);
                            if (res.body.errcode == 0) {
                                this.$message({
                                    message: '接收成功',
                                    type: 'success'
                                });
                                this.lodg = false;
                                this.centerDialogVisible = false;
                                this.formInline1 = {};
                                this.ajax();
                            }else {
                                this.$message({
                                    showClose: true,
                                    message: '接收失败！',
                                    type: 'error'
                                });
                                this.lodg = false;
                                this.centerDialogVisible = false;
                                this.ajax();
                            }
                        })
                    }
                })
            },
            //回收提交的按钮
            Submission(uniformform1) {
                this.rules2.num = false;
                if (this.uniformform1.deposit != '部分押金'){
                    this.uniformform1.deposit_num = '';
                }
                if (this.uniformform1.deposit == '部分押金' && this.uniformform1.deposit_num == '') {
                    this.$message({
                        message:"请填写部分押金金额！",
                        type: 'warning'
                    });
                    return false
                }
                if (this.uniformform1.deposit_num != null && this.uniformform1.deposit_num != undefined ) {
                    if ( this.uniformform1.deposit_num >= this.row.price*this.uniformform1.num  ) {
                        this.$message({
                            message:"输入金额不能大于已缴纳金额！",
                            type: 'warning'
                        });
                        return false
                    }
                }
                // if (this.uniformform1.num > this.row.applyNum) {
                //     this.$message({
                //         message:"工服退还数量不能大于申请数量！",
                //         type: 'warning'
                //     });
                //     return false
                // }
                if (this.uniformform1.num > this.Total) {
                    this.$message({
                        message: '退还数量不能大于申请数量',
                        type: 'warning'
                    });
                    return false;
                }
                this.$refs[uniformform1].validate((valid) => {
                    if (valid) {
                        this.recovery = true;
                        const loading = this.$loading({
                            lock: true,
                            text: '正在退款中请耐心等待。',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        let page = JSON.stringify({
                        'token': this.token,
                        "userId":this.row.userId, //司机编号
                        "receiveNum":this.uniformform1.num ,//回收数量
                        "receiveTime":this.uniformform1.time ,//回收时间
                        "type":this.uniformform1.deposit,//押金退还状态
                        "receiveMoney":this.uniformform1.deposit_num,  //具体退还金额
                        "giveId":this.row.giveId,     //发放记录编号
                        "id":this.row.id,         //回收记录编号
                        "transactionId":this.row.transactionId
                        });
                        this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/material/recycle', page, {
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
                                this.recovery = false;
                                this.receivedialogVisible = false;
                                setTimeout(() => {
                                    loading.close();
                                }, 2000);
                                this.$refs[uniformform1].resetFields();
                                this.Refund_record();
                            }else {
                                setTimeout(() => {
                                    loading.close();
                                }, 2000);
                                this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'error'
                                });
                                this.recovery = false;
                                this.$refs[uniformform1].resetFields();
                                this.Refund_record();
                            }
                        })
                    }
                });
            },
            //查看选择司机对象
            Select_object() {
                if (this.input == '') {
                    this.$message({
                        showClose: true,
                        message: '请输入司机账号或姓名！',
                        type: 'warning'
                    });
                    return;
                }
                let page = JSON.stringify({
                    'token': this.token,
                    'pageNum':this.currentPage_obj,
                    'pageSize':this.pagesize_obj,
                    "searchItem":"choose_driver",
                    "conditionStr1":this.input
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/search/searchItem', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    if (res.body.result.length == 0) {
                        this.$message({
                            showClose: true,
                            message: '该司机未缴纳押金！',
                            type: 'warning'
                        });
                    }
                    if (res.body.errcode == 0) {
                        this.tableData_obj = res.body.result;
                    }
                })
            },
            //选择发放对象选定按钮
            handleEdit(a,row) {
                console.log(row);
                this.table = row;
                this.pieces = row.pieces;
                this.Total = row.receiveNum;
                this.selected = row.name;
                this.phone = row.phone;
                this.dialogVisible = false;
            },
            //工服回收弹框
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handleClose_record(done){
                this.$confirm('确认关闭？').then(_ => {
                        done();
                }).catch(_ => {});
            },
            //选择司机的弹框
            Choice_handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            //首次刷新
            ajax() {
                let page = JSON.stringify({
                    'token': this.token,
                    "searchItem": "materialsubstoragelist",
                    'pageNum':this.currentPage,
                    'pageSize':this.pagesize,
                    "id3": this.formInline.name,//物料名称
                    "conditionStr2": this.formInline.Model//物料型号
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/search/searchItem', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.tableData = res.body.result.rows;
                        this.total = res.body.result.total;
                    }
                })
            },
            //工服管理表内操作的接收按钮
            receive_1(index,row){
                console.log(row);
                this.row = row;
                this.Total = row.receiveNum;
                this.receivedialogVisible  = true;
                this.userName = row.userName;
                this.giveTime = row.giveTime;
                this.userPhone = row.userPhone;
                this.uniformform1.num = this.row.applyNum;
                if (this.row.giveId == undefined) {
                    this.uniformform1.num = this.row.applyNum;
                    this.uniformform1.deposit = '押金全额';
                    this.abled = true;
                }
            },
            //物料申请的提交
            onSubmit(form_approval) {
                this.$refs[form_approval].validate((valid) => {
                    if (valid) {
                        for (var i in this.Warehouse_Name) {
                            if (this.form_approval.name == this.Warehouse_Name[i].id){
                                this.materialName = this.Warehouse_Name[i].materialName
                            }
                        }
                        let page = JSON.stringify({
                            "token": this.token,
                            "materialId":this.form_approval.name,
                            "materialName":this.materialName, // 物料名称
                            "materialType":this.form_approval.Model, // 物料类型
                            "applyNums":this.form_approval.num,      // 申请数量
                            "applyRemark":this.form_approval.Reason//备注
                        });
                        this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/approval/materialcommit', page, {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then(res => {
                            console.log(res);
                            if (res.body.errcode == 0) {
                                this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'success'
                                });
                                this.$refs[form_approval].resetFields();
                            }else {
                                this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'warning'
                                });
                                this.$refs[form_approval].resetFields();
                            }
                        })
                    }
                })
            },
            //发放明细的接收
            receive(a, b) {
                console.log(b);
                this.centerDialogVisible = true;
                this.formInline1.name = b.materialName;
                this.formInline1.Model = b.materialType;
                this.formInline1.num = b.headProvideNum;
                this.id = b.id;
                this.headId = b.headId;
                this.materialId = b.materialId;
                this.materialType = b.materialType;
            },
            // 分页
            handleSizeChange(val) {
                this.pagesize = val;
                this.ajax();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.ajax();
            },
            //工服押金记录
            handleSizeChange_Deposit_record(val) {
                this.pagesize_Deposit_record = val;
                this.Deposit_record();
            },
            handleCurrentChange_Deposit_record(val) {
                this.currentPage_Deposit_record = val;
                this.Deposit_record();
            },
            //工服退还记录
            handleSizeChange_Refund_record(val) {
                this.pagesize_Refund_record = val;
                this.Refund_record();
            },
            handleCurrentChange_Refund_record(val) {
                this.currentPage_Refund_record = val;
                this.Refund_record();
            },
            //工服分页
            handleSizeChange_clothes(val){
                this.pagesize_clothes = val;
                this.clothes();
            },
            handleCurrentChange_clothes(val) {
                this.currentPage = val;
                this.clothes();
            },
            //物料申请分页
            handleSizeChange_apply(val){
                this.pagesize_apply= val;
                this.Application_record();
            },
            handleCurrentChange_apply(val) {
                this.currentPage_apply = val;
                this.Application_record();
            },

            //工服列表
            clothes() {
                let page = JSON.stringify({
                    'token': this.token,
                    "searchItem":"material_manage",
                    'pageNum':this.currentPage,
                    'pageSize':this.pagesize,
                    'id3':this.clothes_Administration.name,//名称
                    'conditionStr2':this.clothes_Administration.Model,//型号
                    'conditionStr3':this.clothes_Administration.FullName,//名称
                    'id1':this.formInline.Registration != null && this.formInline.Registration != '' ?this.formInline.Registration[0] : '',
                    'id2':this.formInline.Registration != null && this.formInline.Registration != '' ?this.formInline.Registration[1]+86400000-1 : '',
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/search/searchItem', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0 ) {
                        this.tableData_clothes = res.body.result.list;
                        this.total_clothes = res.body.result.total;
                    }
                })
            },
            handleClick(tab, event) {
                if (tab.name == 'a') {
                    this.Application_record();
                }
                if (tab.name == "c"){
                    this.clothes();
                }
                if (tab.name == "b") {
                    this.ajax();
                }
            },
            //发放
            grant() {
                this.tableData_obj = [];
                this.selected = '';
                this.phone = '';
                this.grant_Model_s = [];
                console.log(this.grant_Model_s);
                this.dialogVisible1 = true;
                let page = JSON.stringify({
                    'token': this.token,
                    "searchItem":"material_small_type",
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/search/searchItem', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0 ) {
                        this.grant_Model = res.body.result;
                        for (var i in this.grant_Model) {
                            this.grant_Model_s.push({"name": this.grant_Model[i], "id": i})
                        }
                    }
                })
            },
            //工服押金记录
            Deposit_record() {
                this.clothing_Deposit_record = true;
                let page = JSON.stringify({
                    "token":this.token,
                    "searchItem":"deposit_record_web",
                    'pageNum':this.currentPage_Deposit_record,
                    'pageSize':this.pagesize_Deposit_record,
                    'conditionStr1':this.formDeposit.FullName,//姓名
                    'conditionStr2':this.formDeposit.type,//类型
                    'id1':this.formDeposit.Registration != '' && this.formDeposit.Registration != null?this.formDeposit.Registration[0]:'',
                    'id2':this.formDeposit.Registration != '' && this.formDeposit.Registration != null?this.formDeposit.Registration[1]+86400000-1:''
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/search/searchItem', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.Deposit_record_num = res.body.result.list;
                        this.total_Deposit_record = res.body.result.total;
                    }
                })
            },
            //工服押金记录查询
            DepositInquiry() {
                this.currentPage_Deposit_record = 1;
                this.Deposit_record();
            },
            //工服退还记录
            Refund_record() {
                this.clothing_Refund_record = true;
                let page = JSON.stringify({
                    "token":this.token,
                    "searchItem":"material_receive_record",
                    "pageSize":this.pagesize_Refund_record,
                    "pageNum":this.currentPage_Refund_record,
                    'conditionStr1':this.formRefund.FullName,//姓名
                    'id1':this.formRefund.Registration != '' && this.formRefund.Registration != null?this.formRefund.Registration[0]:'',
                    'id2':this.formRefund.Registration != '' && this.formRefund.Registration != null?this.formRefund.Registration[1]+86400000-1:'',
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/companyCenter/search/searchItem', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.Refund_record_num = res.body.result.list;
                        this.total_Refund_record = res.body.result.total;
                    }
                })
            },
            //工服退还记录查询
            RefundEnquiry() {
                this.currentPage_Refund_record = 1;
                this.Refund_record();
            }
        },
        //时间转换
        filters: {
            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD");
            }
        },
        created() {
            //拿到token
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.ajax();
            this.materiel();
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));

            // if(jurisdictions.length == 17){

//
//                 'materialManagementModule':'物料管理','materialManagement':'物料管理',\
// 'myStock':'我的库存','issue':'发放','workClothesManage':'工服管理','bePutInStorage':'入库','issueDetailCheck':'发放明细查看','materialApplicationApproval':'物料申请审批','materialApplication':'物料申请',\
// 'materialReceiving':'物料接收','clothingDistribution':'工服发放','clothingRecycling':'工服回收','
                //    "materialApplication"   物料申请  F_jurisdiction
                this.materialApplication = F_jurisdiction("materialApplication",jurisdictions) ;
                //    'materialReceiving':'物料接收'
                this.materialReceiving =F_jurisdiction("materialReceiving",jurisdictions) ;
                //'workClothesManage':'工服管理'
                this.workClothesManage = F_jurisdiction("workClothesManage",jurisdictions) ;
                //    clothingDistribution':'工服发放'
                this.clothingDistribution = F_jurisdiction("clothingDistribution",jurisdictions) ;
                //    'clothingRecycling':'工服回收','
                this.clothingRecycling = F_jurisdiction("clothingRecycling",jurisdictions) ;
            // }

        }
    }
</script>

<style lang="scss">
    .myStock {
        background:#eaedf2;
        padding:30px;
        overflow-y: auto;
        .header{
            line-height: 56px;
            color:#606163;
            font-size:16px;
            .header_position{
                color:#2b2c2e;
                font-weight: bold;
            }
        }
        .el-tabs__nav-scroll{
            border-bottom: 1px solid white;
        }
        .el-tabs__header{
            margin:0;
        }
        .el-tabs__nav{
            height:55px;
            .el-tabs__item{
                height:55px;
                line-height: 55px;
                background: white;
                border-top: 4px solid transparent;
            }
            .is-active{
                border-top-color: #337df6;
            }
        }
        .from_width {
            width: 100%;
            /*text-align: center;*/
            min-width: 500px;
            .el-form {
                .el-input {
                    width: 200px;
                }
                .el-textarea {
                    width: 30%;
                    min-width: 300px;
                    .el-textarea__inner {
                        max-height: 150px;
                    }
                }
            }
        }
        .f_width {
            .el-textarea {
                width: 100%;
                min-width: 300px;
                /*.el-textarea__inner {*/
                /*height: 150px!important;*/
                /*}*/
            }
        }
        .st_c{
            .el-dialog__title::after{
                display: inline-block;
                margin-right: 8px;
                content: '';
                width: 4px;
                height: 30px;
                vertical-align: -6px;
                background-color: #277bf5;
            }
        }
        .uniform{
            .el-input {
                width: 200px;
            }
        }
        .dialog{
            margin:20px 0;
            .el-input__inner{
                height: 29px;
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