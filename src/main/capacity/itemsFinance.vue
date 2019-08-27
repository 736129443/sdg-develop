<template>
    <div class="main">
        <div class="header">
            <!--当前位置: <span>项目管理 > 出车单明细</span>运输单调账-->
            当前位置: <span>项目管理 > 出车单调账</span>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="出车单编号">
                <el-input v-model.trim="formInline.trackId"
                          placeholder="请输入出车单编号"></el-input>
            </el-form-item>
            <el-form-item label="司机姓名">
                <el-input v-model.trim="formInline.driverName"
                          placeholder="请输入司机姓名"></el-input>
            </el-form-item>
            <el-form-item label="司机调账状态">
                <el-select v-model="formInline.driverHandleStatus" placeholder="请选择司机调账状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已处理" value="handled"></el-option>
                    <el-option label="处理中" value="handling"></el-option>
                    <el-option label="未调账" value="noAdjust"></el-option>

                </el-select>
            </el-form-item>

            <el-form-item label="客户调账状态">
                <el-select v-model="formInline.customerHandleStatus" placeholder="请选择客户调账状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已处理" value="handled"></el-option>
                    <el-option label="处理中" value="handling"></el-option>
                    <el-option label="未调账" value="noAdjust"></el-option>
                </el-select>
            </el-form-item>

            <!--<el-form-item label="仓库名称">-->
            <!--<el-input v-model.trim="formInline.depotName" onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入仓库名称"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="出车状态">-->
            <!--<el-select v-model="formInline.status" placeholder="请选择出车状态">-->
            <!--<el-option label="全部" value=""></el-option>-->
            <!--<el-option label="正常" value="normal"></el-option>-->
            <!--<el-option label="异常" value="abnormal"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="项目名称">
                <el-input v-model.trim="formInline.customerName" 
                          placeholder="请输入项目名称"></el-input>
            </el-form-item>

            <el-form-item label="所属分公司">
                <el-select v-model="formInline.filialeId" placeholder="请选择所管理区域">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in link" :label='i.filialeName' :value="i.filialeId"
                               :key="i.filialeId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="管理区">
                <el-select v-model="formInline.regionId" placeholder="请选择所管理区域">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="i in arr" :label='i.name' :value="i.id" :key="i.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="出车状态">
                <el-select v-model="formInline.status" placeholder="请选择出车状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="正常" value="finished"></el-option>
                    <el-option label="异常" value="running"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目类型">
                <el-select v-model="formInline.projectType" placeholder="请选择项目类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="临时项目" value="InterimCustomer"></el-option>
                    <el-option label="标准项目" value="ProjectCustomer"></el-option>
                    <el-option label="背靠背项目" value="BackToBackCustomer"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售专员">
                <el-input v-model="formInline.saleName" placeholder="请输入销售专员"></el-input>
            </el-form-item>
            <el-form-item label="运营专员">
                <el-input v-model="formInline.projectName" placeholder="请输入运营专员" class="list_driver"></el-input>
            </el-form-item>
            <el-form-item label="配送日期">
                <el-date-picker
                        v-model="formInline.time"
                        type="daterange"
                        :picker-options="pickerOptions0"
                        value-format="timestamp"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="司机运费出账时间">
                <el-date-picker
                        v-model="formInline.outAccounttime"
                        type="daterange"
                        value-format="timestamp"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="Export()" v-if="projectFinancialListExport" :disabled="exportDisabled">导出
                </el-button>
                <el-button  type="primary" @click="changeAccountTime">变更出账时间</el-button>
                <!--<el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7"-->
                             <!--v-if="queryStatus == true? false:true"-->
                             <!--style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>-->
            </el-form-item>
        </el-form>
        <!--<div class="load">-->
        <!--总出车数 <span style="color: blue">{{total}}</span>&nbsp;，GMV <span style="color: blue;" v-if="gmv">: 司机({{driverGMV}} 元)&nbsp; ;&nbsp;客户 ({{clientGmv}} 元) </span>&nbsp;&nbsp; <span style="color: blue; cursor:pointer" @click="onGmv" v-if="!gmv">点击查看</span>-->
        <!--</div>-->
        <el-table
                :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                 >
            <el-table-column
                    type="selection"
                    width="55"
                    :selectable='checkboxT'
                    >
            </el-table-column>
            <el-table-column
                    prop="regionName"
                    label="管理区"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="filialeName"
                    label="所属分公司"
                    align="center"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                width="170"
                    label="出车单编号"
                    prop="trackId"
                    align="center">
            </el-table-column>
            <el-table-column
                width="180"
                    prop="lineName"
                    label="线路名称"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    width="110"
                    prop="startTime"
                    :formatter="dateFormat"
                    align="center"
                    label="配送日期">
            </el-table-column>
            <el-table-column
                    prop="status"
                    align="center"
                    label="出车状态">
            </el-table-column>
            <el-table-column
                    width="180"
                    prop="driverName"
                    label="司机姓名(电话)"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                width="150"
                prop="driverType"
                label="任务归属"
                align="center"
            >
            </el-table-column>

            <el-table-column
                width="160"
                    prop="customerName"
                    label="项目名称"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="type"
                    align="center"
                    label="项目类型"
            >
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="saleName"-->
            <!--align="center"-->
            <!--label="销售专员"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
                width="110"
                    prop="driverHandleStatus"
                    align="center"
                    label="司机调账状态"
            >
            </el-table-column>
            <el-table-column
                width="110"
                    prop="customerHandleStatus"
                    align="center"
                    label="客户调账状态"
            >
            </el-table-column>
            <el-table-column
                    prop="projectName"
                    label="运营专员"
                    align="center"
            >
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="schedulePrice"-->
                    <!--label="客户报价（元）"-->
                    <!--align="center"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
                    width="180"
                    prop="schedulePrice"
                    label="客户GMV合同价格（元）"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    width="180"
                    prop="transportPrice"
                    label="司机运费发布价格（元）"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                width="170"
                    prop=""
                    label="客户调账后GMV（元）"
                    align="center"
            >
                <template slot-scope="scope">
                    <a v-if="tableData[scope.$index].customerStatus == 'no'" type="text" size="small">-</a>
                    <a v-if="tableData[scope.$index].customerStatus == 'yes'" type="text" size="small">{{tableData[scope.$index].customerAdjustmentAfterPrice}}</a>
                </template>
            </el-table-column>
            <el-table-column
                width="170"
                    prop=""
                    label="司机调账后运费（元）"
                    align="center"
            >
                <template slot-scope="scope">
                    <a v-if="tableData[scope.$index].driverStatus == 'no'" type="text" size="small">-</a>
                    <a v-if="tableData[scope.$index].driverStatus == 'yes'" type="text" size="small">{{tableData[scope.$index].driverAdjustmentAfterPrice}}</a>
                </template>
            </el-table-column>
            <el-table-column
                    width="150"
                    prop="outAccountTime"
                    label="司机运费出账时间"
                    :formatter="dateFormatHM"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    width="110"
                    prop="isAccount"
                    label="运费出账状态"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    width="110"
                    prop="customerAccount"
                    label="项目出账状态"
                    align="center"
                    :formatter="analysis_customerAccount"
            >
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="200px"
            >
                <template slot-scope="scope">
                    <!--<el-row>-->
                    <!--<el-col :span="24" v-if="projectFinancialDriverReconciliation">-->
                    <!--<el-button type="text" @click="ondriver(scope.$index)" :disabled='bears[scope.$index]'>司机调账</el-button></el-col>-->
                    <!--<el-col :span="24" v-if="projectFinancialCustomerReconciliation">-->
                    <!--<el-button type="text" @click="onclient(scope.$index)" :disabled='clientbears[scope.$index]'>客户调账</el-button>-->
                    <!--</el-col>-->
                    <!---->
                    <!--</el-row>-->
                    <el-button type="text" @click="ondriver(scope.$index,scope.row) "
                               v-if="projectFinancialDriverReconciliation && bears[scope.$index]"
                               >调账
                    </el-button>
                    <el-button type="text" @click="checkChangeRecord(scope.$index,scope.row)">查看变更时间</el-button>
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
        <!--司机调账-->
        <!--<div class="dag_w">-->
            <!--&lt;!&ndash;<el-dialog&ndash;&gt;-->
                    <!--&lt;!&ndash;title="司机运费调账"&ndash;&gt;-->
                    <!--&lt;!&ndash;:visible.sync="drivercenterDialogVisible"&ndash;&gt;-->
                    <!--&lt;!&ndash;:before-close="driverhandleClose"&ndash;&gt;-->
                    <!--&lt;!&ndash;width="650px"&ndash;&gt;-->
                    <!--&lt;!&ndash;center>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-form ref="driverform" :model="driverform" :rules="driverrules" label-width="100px">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="分公司名称">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="driverform.filialeName" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="项目名称">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="driverform.customerName" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="司机姓名">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="driverform.driverName" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="出车单号">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="driverform.trackId" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="配送日期">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="driverform.startTime" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="基础运费">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="driverform.transportPrice" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="司机红包">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="driverform.redPacketMoney" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="畅心保金额">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="driverform.driverInsuranceMoney" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->

                    <!--&lt;!&ndash;<el-form-item label="调账前总金额">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="driverform.driverAdjustmentBeforePrice" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="是否有出车" class="textcla" prop="remark">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-radio-group v-model="driverform.remark" @input="$forceUpdate(),isradio_D()">&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-radio label="0">有出车</el-radio>&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-radio label="-1">无出车</el-radio>&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-radio-group>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="调账金额" prop="money">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="driverform.money" placeholder="元" @input="onmoney2"&ndash;&gt;-->
                                  <!--&lt;!&ndash;:disabled="driverform.remark=='-1'"></el-input>&ndash;&gt;-->
                        <!--&lt;!&ndash;<br>&ndash;&gt;-->
                        <!--&lt;!&ndash;<span style="color:red;">说明：调账金额可为“+”和“-”，不填符号默认是正数“+”</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="调账后总金额">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="driverform.backmoney" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->

                    <!--&lt;!&ndash;<el-form-item label="调账原因" class="textcla" prop="textarea">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input type="textarea" v-model="driverform.textarea" resize="none"></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div style="text-align: center">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-button&ndash;&gt;-->
                                <!--&lt;!&ndash;@click="driverform.backmoney= driverform.frontmoney;driverform.money='';driverform.textarea='';drivercenterDialogVisible = false;">&ndash;&gt;-->
                            <!--&lt;!&ndash;取消&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;<el-button type="primary" @click="driverbtn('driverform')">提交</el-button>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-button type="primary" @click="driverbtn('driverform')" v-if="save==0?true:false">提交&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-button type="primary" :loading="true" v-if="save==0?false:true">提交中</el-button>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->

                <!--&lt;!&ndash;</el-form>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-dialog>&ndash;&gt;-->
            <!--&lt;!&ndash;客户调账&ndash;&gt;-->
            <!--&lt;!&ndash;<el-dialog&ndash;&gt;-->
                    <!--&lt;!&ndash;title="客户GMV调账"&ndash;&gt;-->
                    <!--&lt;!&ndash;:visible.sync="centerDialogVisible"&ndash;&gt;-->
                    <!--&lt;!&ndash;:before-close="handleClose"&ndash;&gt;-->
                    <!--&lt;!&ndash;width="650px"&ndash;&gt;-->
                    <!--&lt;!&ndash;class="btncla"&ndash;&gt;-->
                    <!--&lt;!&ndash;center>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-form ref="form" :model="form" :rules="rules" label-width="100px">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="分公司名称">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="form.filialeName" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="项目名称">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="form.customerName" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="司机姓名">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="form.driverName" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="出车单号">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="form.trackId" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="配送日期">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="form.startTime" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="客户报价">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="form.schedulePrice" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="司机红包">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="form.redPacketMoney" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="畅心保金额">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="form.customerInsuranceMoney" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="调账前总金额">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="form.customerAdjustmentBeforePrice" disabled></el-input>&nbsp;&nbsp;&nbsp;（不含税）&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;<el-form-item label="是否有出车"  >&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;<el-radio v-model="form.remark" label="0">有出车</el-radio>&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;<el-radio v-model="form.remark" label="-1">无出车</el-radio>&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;</el-form-item>&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="是否有出车" class="textcla" prop="remark">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-radio-group v-model="form.remark" @input="$forceUpdate(),isradio()">&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-radio label="0">有出车</el-radio>&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-radio label="-1">无出车</el-radio>&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-radio-group>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="调账金额" prop="money">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="form.money" placeholder="元" :disabled="form.remark=='-1'"&ndash;&gt;-->
                                  <!--&lt;!&ndash;@input="onmoney "></el-input>&nbsp;&nbsp;&nbsp;（不含税）<br>&ndash;&gt;-->
                        <!--&lt;!&ndash;<span style="color:red;">说明：调账金额可为“+”和“-”，不填符号默认是正数“+”</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-form-item label="调账后总金额">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-input v-model="form.backmoney" disabled></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->

                    <!--&lt;!&ndash;<el-form-item label="调账原因" class="textcla" prop="textarea">&ndash;&gt;-->

                        <!--&lt;!&ndash;<el-input type="textarea" v-model="form.textarea" resize="none"></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div style="text-align: center">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-button&ndash;&gt;-->
                                <!--&lt;!&ndash;@click="form.backmoney= form.frontmoney;form.money='';form.textarea='';centerDialogVisible = false">&ndash;&gt;-->
                            <!--&lt;!&ndash;取消&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-button>&ndash;&gt;-->

                        <!--&lt;!&ndash;&lt;!&ndash;<el-button type="primary" @click="clientbtn('form')">提交</el-button>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-button type="primary" @click="clientbtn('form')" v-if="save1==0?true:false">提交</el-button>&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-button type="primary" :loading="true" v-if="save1==0?false:true">提交中</el-button>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-form>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-dialog>&ndash;&gt;-->
        <!--</div>-->
        <!--调账-->
        <div class="adjustment">
            <el-dialog
                    title="申请调账"
                    :visible.sync="dialogVisibleadjustment"
                    center
                    width="850px"
                    :before-close="handleClose">
                <div class="ct">
                    <div class="basic">
                        <p class="wire">基本信息</p>
                    </div>
                    <div class="wire_m">
                        <ul>
                            <li>
                                <span class="wire_m_n">分公司名称 ：</span><span>{{driverform.filialeName}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">出车单号 ：</span><span>{{driverform.trackId}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">项目名称 ：</span><span>{{driverform.customerName}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">司机红包 ：</span><span>{{driverform.redPacketMoney}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">司机姓名 ：</span><span>{{driverform.driverName}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">畅心保金额 ：</span><span>{{driverform.driverInsuranceMoney}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">配送日期 ：</span><span>{{driverform.startTime}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">司机运费发布价格 ：</span><span>{{driverform.transportPrice}}</span>
                            </li>
                            <li>
                                <span class="wire_m_n">GMV合同价格 ：</span><span>{{driverform.schedulePrice}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="basic">
                        <p class="wire">调账信息</p>
                    </div>
                    <div class="wire_m tz_m">
                        <div>
                            <span class="m_title">
                                是否有出车 ：
                            </span>
                            <span class="m_con">
                                <el-radio-group v-model="isremark" @change="onremark">
                                    <el-radio label="0" :disabled="isremark_radio">有出车</el-radio>
                                    <el-radio label="-1" :disabled="isremark_radio">无出车</el-radio>
                                </el-radio-group>
                            </span>

                        </div>
                        <!--当前司机运费-->
                        <div>
                            <span class="m_title" v-if="!gz">
                                当前司机运费 ：
                            </span>
                            <span class="m_con1" v-if="!gz">
                                <span v-if="row.driverStatus == 'no'">{{driverform.driverAdjustmentBeforePrice}} 元</span>
                                <span v-if="row.driverStatus == 'yes'">{{driverform.driverAdjustmentAfterPrice}} 元</span>

                            </span>

                            <span class="m_con1" v-if="!gz">
                                调账差额 ： <el-input v-model="money" placeholder="请输入内容" @input="onmoney2" :disabled="db||gz"></el-input>
                            </span>
                            <span class="m_con1"  v-if="!gz">
                                调账后司机运费 ： {{driverform.backmoney}}
                            </span>
                            <br>
                            <span v-if="gz" style="color: red">

                                (注：司机运费已出账或已过出账时间，运费调账通道已关闭！)
                            </span>
                        </div>

                        <!-- 当前GMV-->
                        <div>
                            <span class="m_title" v-if="!gzGMV">
                                当前GMV ：
                            </span>
                            <span class="m_con1" style="width: 132px" v-if="!gzGMV">
                                <span v-if="row.customerStatus == 'no'">{{driverform.customerAdjustmentBeforePrice}} 元</span>
                                <span v-if="row.customerStatus == 'yes'">{{driverform.customerAdjustmentAfterPrice}} 元</span>
                            </span>
                            <span class="m_con1" v-if="!gzGMV">
                                调账差额 ： <el-input v-model="money2" placeholder="请输入内容" @input="onmoney" :disabled="db"></el-input>
                            </span>
                            <span class="m_con1"  v-if="!gzGMV">
                                调账后客户GMV ： {{backmoney}}
                            </span>
                            <br>

                            <span v-if="gzGMV" style="color: red">

                                (注：项目运费已出账，运费调账通道已关闭！)
                            </span><br>
                        <span style="color:red;padding-bottom: 8px">说明：调账金额可为“+”和“-”，不填符号默认是正数“+”</span>
                        </div>
                        <div>

                            <span class="is-required m_title">
                                调账原因 ：
                            </span>
                            <span class="m_con1">

                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="textarea">
                            </el-input>
                            </span>

                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleadjustment = false,textarea= '',money2='',money='',backmoney='',driverform.backmoney='',isremark='0'">取 消</el-button>
                    <el-button type="primary" @click="AccountAdjustment();" :disabled="ifsub">提 交</el-button>
                </span>
            </el-dialog>
        </div>
        <el-dialog
                :visible.sync="dialogVisibles"
                width="30%"
                center>
            <div class="choose">您共选择了{{varlist.length}}个出账单:</div>
            <div class="record" v-for="item in varlist">{{item}}</div>
            <div class="confirm">请确认是否变更</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibles = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                title="变更出账时间"
                :visible.sync="changedialogVisible"
                width="30%"
                center
                @close="changedDialogClosed">
            <el-form :model="changeForm" :rules="changerules" ref="changeForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="" prop="type">
                    <el-radio-group v-model="changeForm.type" >
                        <el-radio label="背靠背" checked></el-radio>
                        <el-radio label="修改时间" id="el-radio">
                            <span>修改时间</span>
                            <el-date-picker
                                    v-if="changeForm.type == '背靠背'?disabled=false:disabled=true"
                                    v-model="changeForm.elseTime"
                                    type="datetime"
                                    >
                            </el-date-picker>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="变更原因(必填)" prop="changeReason" >
                    <el-input type="textarea" v-model="changeForm.changeReason" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('changeForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
                title="调帐变更记录"
                :visible.sync="changeAccountDialogVisible"
                width="30%"
                center
                >
            <ul v-for="item in this.recordList" id="recordList">
                <li>操作人:{{item.optAdminName}}</li>
                <li>操作时间:{{item.createTime | dateFrm}}</li>
                <li>变更前出账时间:{{item.oldTime | dateFrms}}</li>
                <li>变更后出账时间:{{item.newTime | dateFrms}}</li>
                <li>变更原因:{{item.reason}}</li>
            </ul>
        </el-dialog>
    </div>
</template>
<script>
    import moment from 'moment'
    import {F_jurisdiction} from "../../js/Fjurisdiction.js";
    import {openPostWindow} from '../../js/report.js'

    export default {
        created() {
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            //权限
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'))
            this.projectFinancialListExport = F_jurisdiction('projectFinancialListExport', jurisdictions)
            this.projectFinancialCustomerReconciliation = F_jurisdiction('projectFinancialCustomerReconciliation', jurisdictions);
            this.projectFinancialDriverReconciliation = F_jurisdiction('projectFinancialDriverReconciliation', jurisdictions)

            let page1 = JSON.stringify({
                token: this.token
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/area', page1, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res) => {
                this.link = res.body.result;
            })
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/region/all_region', JSON.stringify({
                'token': this.token,
            })).then(run => {
                this.arr = run.body.result
            })

            this.data()
        },
        data() {
            return {
                row:'',
                isremark_radio:false,
                exportDisabled:true,
                ifsub:false,
                gz:false,
                db:false,
                textarea:'',
                backmoney:'',
                money2:'',
                money:'',
                drivermoney:'',
                isremark:'0',
                dialogVisibleadjustment:false,
                projectOperation: false,
                projectFinancialListExport: false,
                projectFinancialCustomerReconciliation: false,
                //    导出
                fullscreenLoading: false,
                trackManageListExport: false,
                ProgressBar: 0,
                queryStatus: true,
                startTime: '',
                endTime: '',
                save: 0,
                save1: 0,
                token: '',
                formInline: {
                    trackId: '',
                    driverName: '',
                    depotName: '',
                    driverHandleStatus: '',
                    customerHandleStatus: '',
                    customerName: '',
                    filialeId: '',
                    regionId: '',
                    projectType: '',
                    saleName: '',
                    projectName: '',
                    time: '',
                    outAccounttime: [],
                },
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6
                    }
                },
                link: [],
                arr: [],
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                total: 0,
                num: 0,
                driverGMV: '',
                clientGmv: '',
                gmv: false,
                centerDialogVisible: false,
                form: {
                    frontmoney: '',
                    money: '',
                    backmoney: '',
                    textarea: '',
                    remark: '0',
                },
                rules: {
                    money: [
                        {required: true, message: '请输入金额', trigger: 'blur'},
                        {pattern: /(^(-|\+)?[0-9]+(.[0-9]{1,2})?$)/, message: '只能输入数字,小数点后两位'}
                    ],
                    textarea: [
                        {required: true, message: '原因不能为空', trigger: 'blur'},
                        {
                            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。.，、？\n\r ]{0,500}$/,
                            message: '输入内容不规范'
                        },
                        {min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur'},
                    ],
                    remark: [
                        {required: true, message: '请选择是否有出车', trigger: 'change'}
                    ]

                },
                drivercenterDialogVisible: false,
                driverform: {

                    remark: '0',
                },
                driverrules: {
                    money: [
                        {required: true, message: '请输入金额', trigger: 'blur'},
                        {pattern: /(^(-|\+)?[0-9]+(.[0-9]{1,2})?$)/, message: '只能输入数字,小数点后两位'}
                    ],
                    textarea: [
                        {required: true, message: '原因不能为空', trigger: 'blur'},
                        {
                            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。.，、？\n\r ]{0,500}$/,
                            message: '输入内容不规范'
                        },
                        {min: 1, max: 500, message: '长度在 1 到 500 个字符', trigger: 'blur'},
                    ],
                    remark: [
                        {required: true, message: '请选择是否有出车', trigger: 'change'}
                    ]
                },
                bears: [],
                clientbears: [],
                backmoney: '',
                gzGMV:'',
                varlist:[],//数组类型的出车单编号
                trackId:'',//出车单编号
                recordList:[],
                dialogVisibles:false,//变更出账时间弹框显示
                changedialogVisible:false,//变更出账时间弹框
                changeForm:{//变更出账表单
                    type:'背靠背',//背靠背或者其他时间
                    elseTime:'',//其他时间
                    changeReason:'',//变更原因
                },
                //变更验证规则
                changerules:{
                    type: [
                        { required: true, message: '请选择修改时间类型', trigger: 'change' }
                    ],
                    changeReason:[
                        { required: true, message: '请填写变更原因', trigger: 'blur' }
                    ]
                },
                //调帐变更记录弹框
                changeAccountDialogVisible:false,
            }
        },
        filters: {

            dateFrm: function (el) {
                return moment(el).format("YYYY-MM-DD HH:mm:ss");
            },
            dateFrms(row) {
                console.log(row);
                if (row == '-1') {
                    return '背靠背'
                }else  {
                    return moment(row).format("YYYY-MM-DD HH:mm:ss");
                }
            },
        },
        methods: {

            checkboxT(row,index){

                if (row.isAccount == '已出账') {
                    return false
                }else{
                    return true
                }
            },
            handleSelectionChange(val) {
                console.log(val);
                this.varlist = [];
                this.multipleSelection = val;
                for (var i in val){
                    this.varlist.push(val[i].trackId)
                }
                console.log(this.varlist);
            },
            changeAccountTime(){
                if(this.varlist.length == 0){
                    this.$message({
                        message: '请至少选择一条记录',
                        type: 'warning'
                    });
                    return
                }
                this.dialogVisibles=true;
            },
            confirm(){//是否确认变更
                this.changedialogVisible=true;
                this.dialogVisibles=false;
            },
            checkChangeRecord(_index, row){
                console.log(row);
                this.trackId=row.trackId
                console.log(this.trackId);
                this.changeAccountDialogVisible=true
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/business/assignOutTimeRecord',JSON.stringify({
                    trackId:this.trackId, //出车单编号
                    token:this.token  //token
                })).then(row=>{
                    console.log(row.body.result);
                    this.recordList=row.body.result
                    console.log(this.recordList)
                })
            },
            changedDialogClosed(){
                this.$refs.changeForm.resetFields();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var time = new Date(this.changeForm.elseTime).getTime();//修改时间时间戳
                        let outAccountTimeValue="-1";
                        if(this.changeForm.type!="背靠背"){
                            if(this.changeForm.elseTime==""){
                                this.$message({
                                    message: '请选择时间',
                                    type: 'warning'
                                });
                                return;
                            }
                            outAccountTimeValue= new Date(this.changeForm.elseTime).getTime();
                        }
                        console.log(time);
                        this.$http.post(this.global.lightningUrl + '/companyv1/finance/business/assignOutBillTime',JSON.stringify({
                            tracks:this.varlist, // 数组类型的出车单编号
                            reason:this.changeForm.changeReason, // 变更原因
                            token:this.token, // token
                            outAccountTime:outAccountTimeValue //变更的时间
                        })).then(row=>{
                            console.log(row);
                            if (row.body.errcode == 0){
                                this.$message({
                                    message: '修改记录成功',
                                    type: 'success'
                                });
                            }else {
                                this.$message({
                                    message: '修改记录失败',
                                    type: 'warning'
                                });
                            }
                        })
                        this.changedialogVisible=false;
                        this.$refs[formName].resetFields();
                        this.data()
                    }
                });
            },
            //当前GMV
            onmoney() {
                if (this.row.customerStatus == 'no'){

                    var a = Number(this.driverform.customerAdjustmentBeforePrice);
                }
                if (this.row.customerStatus == 'yes'){

                    var a = Number(this.driverform.customerAdjustmentAfterPrice);
                }
                let b = Number(this.money2);
                if (b == '') {
                    this.backmoney = a
                } else if (b == 0) {
                    this.backmoney = a
                } else {
                    let c = a + b;
                    if (isNaN(c)) {
                        this.backmoney = ''
                    } else {
                        this.backmoney = c.toFixed(2)
                    }
                }
                // this.$forceUpdate()
            },
            //当前司机运费
            onmoney2() {
                if (this.row.driverStatus == 'no') {
                    var a = Number(this.driverform.driverAdjustmentBeforePrice);
                }
                if (this.row.driverStatus == 'yes') {
                    var a = Number(this.driverform.driverAdjustmentAfterPrice);
                }
                let b = Number(this.money);
                if (b == '') {
                    this.driverform.backmoney = a
                } else if (b == 0) {
                    this.driverform.backmoney = a
                } else {
                    let c = a + b;
                    if (isNaN(c)) {
                        this.driverform.backmoney = ''
                    } else {
                        this.driverform.backmoney = c.toFixed(2)
                    }
                }
                // this.$forceUpdate()
            },

            handleClose() {
                this.form.backmoney = this.form.frontmoney;
                this.form.money = '';
                this.form.textarea = '';
                this.textarea= '';
                this.money2='';
                this.money='';
                this.backmoney='';
                this.driverform.backmoney='';
                this.isremark='0'

                setTimeout((res) => {
                    console.log(res);
                    this.dialogVisibleadjustment =false
                }, 50)
            },
            //提交调账
            AccountAdjustment() {
                if (this.gz){
                    if (this.money2 === '' ){
                        this.$message({
                            showClose: true,
                            message: '请输入调账差额！',
                            type: 'error'
                        });
                        return false
                    }
                } else if (this.gzGMV) {
                      if (this.money === ''){
                        this.$message({
                            showClose: true,
                            message: '请输入调账差额！',
                            type: 'error'
                        });
                        return false
                    }
                } else {
                    if (this.money === '' || this.money2 === '') {
                        this.$message({
                            showClose: true,
                            message: '请输入调账差额！',
                            type: 'error'
                        });
                        return false
                    }
                }
                if (this.textarea == '') {
                    this.$message({
                        showClose: true,
                        message: '请输入调账原因！',
                        type: 'error'
                    });
                    return false
                }
                let adjustType ;
                if (!this.gz && !this.gzGMV){
                    adjustType = 'all'
                } else if ( this.gzGMV && !this.gz){
                    adjustType = 'driver'
                }else if ( !this.gzGMV && this.gz){
                    adjustType = 'customer'
                }
                this.ifsub=true;
                let page = JSON.stringify({
                    token: this.token,
                    trackId: this.form.trackId,
                    customerAdjustMoney: this.money2,
                    driverAdjustMoney:this.money,
                    adjustType:adjustType,
                    reason: this.textarea,
                    remark: this.isremark
                });
                console.log(page);
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/adjustcommit', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    this.save1 = 0;
                    if (res.body.errcode == 0) {
                        this.ifsub=false;
                        this.$message({
                            message: '提交成功！',
                            type: 'success'
                        });
                        this.dialogVisibleadjustment = false;
                        this.ajax();
                        this.money2 = '';
                        this.money = '';

                    } else {
                        this.$message({
                            message: res.body.message,
                            type: 'warning'
                        });
                    }
                })
            },
            //是否有出车单选按钮
            onremark(){
                console.log(this.isremark);
                if (this.isremark == '-1' ){
                    this.db = true;

                    if (this.row.customerStatus == 'no'){

                        this.money2 = -this.driverform.customerAdjustmentBeforePrice;
                    }
                    if (this.row.customerStatus == 'yes'){
                        this.money2 = -this.driverform.customerAdjustmentAfterPrice;
                    }
                    //gmv无出车
                    // this.money2 = -this.driverform.customerAdjustmentAfterPrice;

                    this.driverform.backmoney = 0;
                    this.backmoney = 0 ;
                    if (this.gz == true){
                        this.money = ''
                    }else{
                        //当前司机
                        if (this.row.driverStatus == 'no') {
                            this.money = -this.driverform.driverAdjustmentBeforePrice;
                        }
                        if (this.row.driverStatus == 'yes') {
                            this.money = -this.driverform.driverAdjustmentAfterPrice;
                        }

                    }
                } else{
                    this.db = false
                    this.money2 = '';
                    this.money = '';
                }
            },
            //导出
            Export() {                   /*-- 到处模块*/
                let page = JSON.stringify({
                    token: this.token,
                    pageSize: this.pageSize,
                    pageNum: this.currentPage,
                    trackId: this.formInline.trackId,
                    driverName: this.formInline.driverName,
                    customerName: this.formInline.customerName,
                    filialeId: this.formInline.filialeId,
                    regionId: this.formInline.regionId,
                    type: this.formInline.projectType,
                    saleName: this.formInline.saleName,
                    projectName: this.formInline.projectName,
                    startTime: this.formInline.time!= null?this.formInline.time[0]:undefined,
                    endTime:this.formInline.time!= null?this.formInline.time[1] + 86400000 - 1:undefined,
                    status: this.formInline.status,
                    driverHandleStatus: this.formInline.driverHandleStatus,
                    customerHandleStatus: this.formInline.customerHandleStatus,
                    outAccountStartTime: this.formInline.outAccounttime != null ? this.formInline.outAccounttime[0] : undefined,
                    outAccountEndTime: this.formInline.outAccounttime != null ? this.formInline.outAccounttime[1] + 1000 * 60 * 60 * 24 - 1 : undefined
                })
                var exportLink = this.global.lightningUrl + '/companyv1/finance/report/export/project_track';
                openPostWindow(exportLink,page)
            },
            //时间格式转化
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            //时间格式转化
            dateFormatHM: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm");
            },
            //页面首刷
            ajax() {
                this.exportDisabled = true;
                if (this.formInline.time == undefined || this.formInline.time == null) {
                    this.formInline.time = []
                }
                let page = JSON.stringify({
                    token: this.token,
                    pageSize: this.pageSize,
                    pageNum: this.currentPage,
                    trackId: this.formInline.trackId,
                    driverName: this.formInline.driverName,
                    customerName: this.formInline.customerName,
                    filialeId: this.formInline.filialeId,
                    regionId: this.formInline.regionId,
                    type: this.formInline.projectType,
                    saleName: this.formInline.saleName,
                    projectName: this.formInline.projectName,
                    startTime: this.formInline.time[0],
                    endTime: this.formInline.time[1] + 86400000 - 1,
                    status: this.formInline.status,
                    driverHandleStatus: this.formInline.driverHandleStatus,
                    customerHandleStatus: this.formInline.customerHandleStatus,
                    outAccountStartTime: this.formInline.outAccounttime != null ? this.formInline.outAccounttime[0] : undefined,
                    outAccountEndTime: this.formInline.outAccounttime != null ? this.formInline.outAccounttime[1] + 1000 * 60 * 60 * 24 - 1 : undefined
                })
                this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/project_track', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    this.tableData = res.body.result.rows;
                    this.total = res.body.result.total;
                    if (res.body.errcode == 0){
                        this.exportDisabled = false;

                        for (let i = 0; i < this.tableData.length; i++) {

                            this.bears.push(false);
                            // 商户和司机都可以调账  all
                            if (this.tableData[i].customerAccount=='no'&&this.tableData[i].customerAdjust=='yes'&&this.tableData[i].driverAccount=='no'&&this.tableData[i].driverAdjust=='yes') {
                                this.bears[i] = true ;
                                // this.gz = false;
                                // 商户可调账 司机不可以调账 customer
                            }else if(this.tableData[i].customerAccount=='no'&&this.tableData[i].customerAdjust=='yes'&&this.tableData[i].driverAccount=='yes'){
                                this.bears[i] = true;
                                // this.gz = true;
                                // 商户不可以调账 司机可调账 driver
                            }else if(this.tableData[i].customerAccount=='yes'&&this.tableData[i].driverAccount=='no'&&this.tableData[i].driverAdjust=='yes'){
                                this.bears[i] = true;
                                // this.gz = true;
                            }else{
                                this.bears[i] = false;
                            }
                            if (this.tableData[i].type == 'ProjectCustomer') {
                                this.tableData[i].type = '标准项目'
                            }else if (this.tableData[i].type == 'InterimCustomer') {
                                this.tableData[i].type = '临时项目'
                            }else if (this.tableData[i].type == 'BackToBackCustomer') {
                                this.tableData[i].type = '背靠背项目'
                            }else{
                                this.tableData[i].type = ''
                            }
                            if (this.tableData[i].status == 'finished') {
                                this.tableData[i].status = '正常'
                            } else {
                                this.tableData[i].status = '异常'
                            }
                            // if (this.tableData[i].driverAdjust != 'yes') {
                            //     this.bears[i] = true
                            // } else if (this.tableData[i].isAccount === 'yes') {
                            //
                            //     this.bears[i] = true
                            // } else {
                            //     this.bears[i] = false
                            // }
                            if (this.tableData[i].isAccount == 'no') {
                                this.tableData[i].isAccount = '未出账'
                            } else if (this.tableData[i].isAccount == 'yes') {
                                this.tableData[i].isAccount = '已出账'
                            }

                            this.clientbears.push(false);

                            if (this.tableData[i].customerAdjust != 'yes') {
                                this.clientbears[i] = true
                            } else if (this.tableData[i].customerAccount == 'yes') {
                                this.clientbears[i] = true
                            } else {
                                this.clientbears[i] = false
                            }

                        }
                    }

                })
            },
            //页面首刷
            data() {
                this.num = this.total;
                this.ajax()
            },
            //列表查询接口
            onSubmit() {
                this.gmv = false;
                this.num = this.total;
                this.currentPage = 1;
                this.ajax();
            },
            //分页
            handleSizeChange(val) {
                this.pageSize = val;
                this.ajax();
            },
            //分页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.ajax();
            },
            //项目状态格式转化
            analysis_customerAccount(row){
                if (row.customerAccount == 'no'){
                    return '未出账'
                }else{
                    return '已出账'
                }
            },
            //列表调账按钮
            ondriver(_index,row) {
                console.log(row);
                // this.Status = row.customerStatus;
                this.row = row;
                this.isremark_radio = false ;
                this.isremark = '0';
                this.driverform = this.tableData[_index];
                this.driverform.startTime = this.function(this.driverform.startTime);
                this.dialogVisibleadjustment = true;
                this.form = this.tableData[_index];
                // this.form.startTime = this.function(this.form.startTime)
                this.gz = '';

                if (this.tableData[_index].customerAccount=='no'&&this.tableData[_index].customerAdjust=='yes'&&this.tableData[_index].driverAccount=='no'&&this.tableData[_index].driverAdjust=='yes') {
                    this.gz = false;
                    this.gzGMV = false;

                }else if(this.tableData[_index].customerAccount=='no'&&this.tableData[_index].customerAdjust=='yes'&&this.tableData[_index].driverAccount=='yes'){
                    // this.bears[i] = true;

                    this.gz = true;
                    this.gzGMV = false;

                    // 商户不可以调账 司机可调账 driver
                }else if(this.tableData[_index].customerAccount=='yes'&&this.tableData[_index].driverAccount=='no'&&this.tableData[_index].driverAdjust=='yes'){
                    // this.bears[i] = true;
                    this.gz = false;
                    this.gzGMV = true;
                    if (this.tableData[_index].remark == '0' || this.tableData[_index].remark == '1'){
                        this.isremark_radio = true;
                        this.isremark = '0'
                    }else if (this.tableData[_index].remark == '-1'){
                        this.isremark_radio = true;
                        this.isremark = '-1'
                    }

                }


                this.backmoney = this.form.customerAdjustmentAfterPrice
                this.driverform.backmoney = this.driverform.driverAdjustmentAfterPrice
                if (this.driverform.customerAdjustmentAfterPrice == 0){
                    this.backmoney = 0
                }
                if (this.driverform.driverAdjustmentAfterPrice == 0){
                    this.driverform.backmoney = 0
                }
                // }
            },
            // isradio() {
            //     if (this.form.remark == '-1') {
            //         this.form.money = `-${this.form.customerAdjustmentBeforePrice}`;
            //         this.form.backmoney = 0
            //     }
            // },
            // isradio_D() {
            //     if (this.driverform.remark == '-1') {
            //         this.driverform.money = `-${this.driverform.driverAdjustmentBeforePrice}`;
            //         this.driverform.backmoney = 0
            //     }
            // },
            // onclient(_index) {
            //     this.form = this.tableData[_index];
            //     this.form.startTime = this.function(this.form.startTime)
            //     this.form.driverName = this.form.driverName.split('(')[0];
            //     this.form.remark = '0';
            //     // if (this.form.customerAdjustmentId !=null && this.form.customerAdjustmentId !=''){
            //     //     this.$message('该出车单已调账');
            //     // }else if (this.form.customerAccount =='yes' ){
            //     //     this.$message('该出车单已出账，不能进行调账！');
            //     // }else{
            //     this.centerDialogVisible = true
            //     // }
            // },
            function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d;
            },
            // onGmv() {
            //     const loading = this.$loading({
            //         lock: true,
            //         text: '请求数据中，请稍后。。。',
            //         spinner: 'el-icon-loading',
            //         background: 'rgba(0, 0, 0, 0.7)'
            //     });
            //     let page = JSON.stringify({
            //         token: this.token,
            //         pageSize: this.pageSize,
            //         pageNum: this.currentPage,
            //         trackId: this.formInline.trackId,
            //         driverName: this.formInline.driverName,
            //         customerName: this.formInline.customerName,
            //         filialeId: this.formInline.filialeId,
            //         regionId: this.formInline.regionId,
            //         type: this.formInline.projectType,
            //         saleName: this.formInline.saleName,
            //         projectName: this.formInline.projectName,
            //         startTime: this.formInline.time[0],
            //         endTime: this.formInline.time[1] + 86400000 - 1,
            //         status: this.formInline.status,
            //     })
            //     this.$http.post(this.global.lightningUrl + '/companyv1/finance/query/admin_management/project_gmv', page, {
            //         headers: {
            //             'Content-Type': 'application/json;charset=UTF-8'
            //         }
            //     }).then((res) => {
            //         if (res.body.errcode == 0) {
            //             loading.close();
            //             this.gmv = true
            //             this.driverGMV = res.body.result.driverGMV;
            //             this.clientGmv = res.body.result.customerGMV;
            //         } else {
            //             loading.close();
            //             this.$message.error('请求失败，请联系管理员！');
            //         }
            //     })
            //
            //     // setTimeout(() => {
            //     // }, 2000);
            // },

            // clientbtn(formName) {
            //     this.$refs[formName].validate((valid) => {
            //         if (valid) {
            //             this.save1 = 1;
            //             // this.centerDialogVisible = false ;
            //             let page = JSON.stringify({
            //                 token: this.token,
            //                 trackId: this.form.trackId,
            //                 accountRegulation: this.form.money,
            //                 reason: this.form.textarea,
            //                 remark: this.form.remark
            //             });
            //             console.log(page);
            //             this.$http.post(this.global.lightningUrl + '/companyv1/finance/customerbillcommit', page, {
            //                 headers: {
            //                     'Content-Type': 'application/json;charset=UTF-8'
            //                 }
            //             }).then((res) => {
            //                 console.log(res);
            //                 this.save1 = 0;
            //                 if (res.body.errcode == 0) {
            //                     this.centerDialogVisible = false;
            //                     this.$message({
            //                         message: '提交成功！',
            //                         type: 'success'
            //                     });
            //                     this.ajax()
            //
            //                 } else {
            //                     this.$message({
            //                         message: res.body.message,
            //                         type: 'warning'
            //                     });
            //                 }
            //             })
            //         } else {
            //             console.log('error submit!!');
            //             return false;
            //         }
            //     });
            // },

            // driverbtn(driverform) {
            //     this.$refs[driverform].validate((valid) => {
            //         if (valid) {
            //             this.save = 1;
            //             // this.drivercenterDialogVisible = false;
            //             let page = JSON.stringify({
            //                 token: this.token,
            //                 accountRegulation: this.driverform.money,
            //                 trackId: this.driverform.trackId,
            //                 reason: this.driverform.textarea,
            //                 remark: this.driverform.remark
            //             });
            //             console.log(page);
            //             this.$http.post(this.global.lightningUrl + '/companyv1/finance/driverbillcommit', page, {
            //                 headers: {
            //                     'Content-Type': 'application/json;charset=UTF-8'
            //                 }
            //             }).then((res) => {
            //                 console.log(res);
            //                 this.save = 0;
            //                 if (res.body.errcode == 0) {
            //                     this.drivercenterDialogVisible = false;
            //                     this.$message({
            //                         message: '提交成功！',
            //                         type: 'success'
            //                     });
            //                     this.ajax()
            //
            //                 } else {
            //                     this.$message({
            //                         message: res.body.message,
            //                         type: 'warning'
            //                     });
            //                 }
            //             })
            //         } else {
            //             console.log('error submit!!');
            //             return false;
            //         }
            //     });
            // },

            // driverhandleClose() {
            //     this.driverform.backmoney = this.driverform.frontmoney;
            //     this.driverform.money = '';
            //     this.driverform.textarea = '';
            //     this.drivercenterDialogVisible = false
            // },

        },

    }

</script>
<style lang="scss" scoped>
    .main {
        .adjustment{

            .wire::before {
                display: inline-block;
                margin-right: 8px;
                content: '';
                width: 3px;
                height: 20px;
                vertical-align: -4px;
                background-color: #277bf5;
            }
            .basic{
                p{
                    font-size: 16px;
                }
            }
            .wire_m{
                margin: 10px;
                padding: 15px 20px;
                background-color: #F3F7FA;
                li{
                    display: inline-block;
                    width: 48%;
                    padding-bottom: 8px;
                }
                .wire_m_n{
                    display: inline-block;
                    width: 133px;
                    white-space: normal;
                    /*text-align: right;*/
                }
            }
            .tz_m{
                div{
                    padding-bottom: 10px;
                    .m_title{
                        width: 15%;
                        min-width: 125px;
                        white-space: normal;

                        text-align: right;
                    }

                    .m_con1{
                        display: inline-block;

                        .el-input{
                            width: 150px;
                        }
                        .el-textarea{
                            width: 350px;
                            vertical-align:text-top
                        }
                    }

                    .m_con1:nth-child(2){
                        width: 110px;
                    }
                    .m_con1:nth-child(3){
                        width: 270px;
                    }
                    .m_con{
                        div{

                        padding-bottom: 0;
                        }
                    }
                }
                /*.is-required{*/
                    /*width: ;*/
                /*}*/
                .is-required:before {
                    content: "*";
                    color: #f56c6c;
                    margin-right: 4px;
                }
            }
        }

        .header {
            margin-bottom: 20px;
        }

        .btncla {
            .el-input {
                width: 82%;
            }
        }
        .dag_w {
            .el-dialog {
                min-width: 630px !important;
            }
        }
        .el-form-item__content {
            margin-left: 0 !important;
            text-align: center !important;
        }
        .choose,
        .confirm{
            font-size: 18px;
            text-align: center;
        }
        .choose{
            margin-bottom: 20px;
        }
        .record{
            font-size: 14px;
            text-align: center;
            margin-bottom: 20px;
        }
        #checkRecord{
            position: absolute;
            top:20px;
            right: 50px;
        }
        .el-radio{
            position: absolute;
            top:60px;
            left:60px;
        }
        #el-radio{
            margin-top: 30px;
        }
        #recordList{
            margin-top: 20px;
            margin-left: 100px;
            font-size: 14px;
            line-height: 28px;
        }
    }

</style>