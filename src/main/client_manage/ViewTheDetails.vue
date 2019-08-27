<template>
    <div class="main ViewTheDetails" >
        <div class="header">
            当前位置：CRM管理 > 客户管理 > {{this.Examination}}
            <el-button type="primary" style="float: right;margin:0 25% 0 0;" @click="partition($event)" v-if="this.$route.query.info == 0?true:false">审批提交</el-button>
        </div>
        <div class="nav">

            <el-tabs v-model="activeName">
                <el-tab-pane label="合作信息" name="second" >
                    <div class="Tab2">
                        <div class="center_top">
                            <div class="title"><p>合作信息</p></div>
                            <div class="center">
                                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="15%" class="demo-ruleForm">

                                    <el-form-item label="项目名称：" prop="customerName"  class="q2">
                                        <el-input v-model="ruleForm2.customerName"></el-input>
                                    </el-form-item>

                                    <el-form-item label="省份：" prop="city">
                                        <el-select v-model="ruleForm2.province" placeholder="请选择省份" @change="choseProvince2" >
                                            <el-option
                                                    v-for="(val,key,index) in arr"
                                                    :key="key"
                                                    :label="key"
                                                    :value="key"
                                            ></el-option>
                                        </el-select>
                                        <el-select v-model="ruleForm2.city" placeholder="请选择市">
                                            <el-option v-for='(val,key,index) in ProvincesCities2'
                                                       :label="val"
                                                       :value="val"
                                                       :key="val"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="项目类型：" prop="type" required>
                                        <el-select v-model="ruleForm2.type" placeholder="客户类型">
                                            <el-option label="临时项目" value="InterimCustomer"></el-option>
                                            <el-option label="标准项目" value="ProjectCustomer"></el-option>
                                            <!--<el-option label="背靠背项目" value="BackToBackCustomer"></el-option>-->
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="佣金比例：" prop="commissionRatio" v-if="this.ruleForm2.type == 'IndependentCustomer'?true:false ">
                                        <el-input v-model="ruleForm2.commissionRatio" class="commissionRatio"></el-input>
                                    </el-form-item>

                                    <el-form-item label="项目所属管理区：" prop="filialeName" required>
                                        <el-select v-model="ruleForm2.filialeName" placeholder="客户所属管理区" :disabled="aa">
                                            <el-option  :label="areaList.areaName" :value="areaList.areaId"></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="销售专员："  prop="" required>
                                        <el-select v-model="saleName1" placeholder="销售专员" >
                                            运营专员
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="客户来源：" required>
                                        <el-select v-model="ruleForm2.customerSource " placeholder="请选择客户来源" >
                                            <el-option label="自拓" value="自拓"></el-option>
                                            <el-option label="接手" value="接手"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="联系电话："  class="q2" required>
                                        <el-input v-model="ruleForm2.cphone" :disabled="true"></el-input>
                                    </el-form-item>

                                    <el-form-item label="运营专员：" prop="" required >
                                        <el-select v-model="saleName2" placeholder="运营专员">
                                            <el-option v-for="i in projectList"  :label="i.name" :value="i.name"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="联系电话："  class="q2" required>
                                        <el-input v-model="ruleForm2.name" :disabled="true"></el-input>
                                    </el-form-item>
                                    <!--<el-form-item label="三级分类：" prop="thirdLevelClassify" required>-->
                                        <!--<el-select v-model="ruleForm2.topLevelClassify" placeholder="请选择一级分类">-->
                                            <!--<el-option label="直客" value="直客"></el-option>-->
                                        <!--</el-select>-->
                                        <!--<el-select v-model="ruleForm2.twoLevelClassify" placeholder="请选择二及分类">-->
                                            <!--<el-option label="零售集团" value="零售集团"></el-option>-->
                                        <!--</el-select>-->
                                        <!--<el-select v-model="ruleForm2.thirdLevelClassify" placeholder="请选择三级分类">-->
                                            <!--<el-option label="B2C平台" value="B2C平台"></el-option>-->
                                        <!--</el-select>-->
                                    <!--</el-form-item>-->

                                    <el-form-item label="货源分类："  prop="" required>

                                        <el-select v-model="saleName3" placeholder="货源分类" >
                                            <el-option label="一手货源" value="1"></el-option>
                                            <el-option label="二手货源" value="2"></el-option>
                                            <el-option label="三手货源" value="3"></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="业务类型："  prop="" required>

                                        <el-select v-model="ruleForm2.businessType" placeholder="业务类型">
                                            <el-option v-for="i in business" :label="i.name" :value="i.id" :key="i.id"></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="客户主要货物类型:" prop="goodsType" >
                                        <el-checkbox-group v-model="ruleForm2.goodsType">
                                            <el-checkbox v-for="city in cities" :label="city" :key="city" name="goodsType">{{city}}</el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>

                                    <el-form-item label="客户主要收货人类型:" prop="consigneeType" >
                                        <el-checkbox-group v-model="ruleForm2.consigneeType">
                                            <el-checkbox v-for="city in cities1" :label="city" :key="city" name="consigneeType">{{city}}</el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>

                                </el-form>
                            </div>
                            <div class="btn">
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="公司信息" name="first">
                    <div class="Tab1">
                        <div class="center_top">
                            <div class="title">公司主体信息</div>
                            <div class="center">
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="30%" class="demo-ruleForm">
                                    <el-form-item label="公司全称(托运人) ：" prop="name" class="q2">
                                        <el-input v-model="ruleForm.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="注册号/统一社会信用代码 ："  prop="number" class="q2">
                                        <el-input v-model="ruleForm.number"></el-input>
                                    </el-form-item>
                                    <el-form-item label="上市情况：" prop="isQuoted">
                                        <el-select v-model="ruleForm.isQuoted" placeholder="上市情况">
                                            <el-option label="上市" value="isQuoted"></el-option>
                                            <el-option label="未上市" value="is0tListed"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="融资能力-轮次：" prop="financeScope">
                                        <el-select v-model="ruleForm.financeScope" placeholder="融资能力-轮次">
                                            <el-option label="非融资" value="非融资"></el-option>
                                            <el-option label="融资" value="融资"></el-option>
                                            <el-option label="天使轮" value="天使轮"></el-option>
                                            <el-option label="A轮" value="A轮"></el-option>
                                            <el-option label="B轮" value="B轮"></el-option>
                                            <el-option label="C轮" value="C轮"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="融资能力-金额：" prop="financeMoney">
                                        <el-select v-model="ruleForm.financeMoney" placeholder="融资能力-金额">
                                            <el-option label="< 5000万人民币" value="0"></el-option>
                                            <el-option label="5000万人民币 - 1亿人民币" value="5000"></el-option>
                                            <el-option label="> 1亿人民币" value="10000"></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="营业执照扫描件："  class="is-required">
                                        <el-upload
                                                ref="upload"
                                                :multiple="true"
                                                action="javascript:;"
                                                list-type="picture-card"
                                                :limit='10'
                                                :file-list="fileList2"
                                                :on-preview="handlePictureCardPreview"
                                                :auto-upload="false"
                                        >
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <div class="el-upload__tip">只支持jpg、png、word、excel、wps、war、pdf文件，且不超过10M</div>

                                        <el-dialog :visible.sync="dialogVisible">
                                            <img width="100%" :src="dialogImageUrl" alt="">
                                        </el-dialog>
                                    </el-form-item>
                                    <div class="center_bottom">
                                        <div class="title" style="width:200%;">公司基本信息</div>
                                        <div class="center">
                                            <el-form-item label="总部所在地址 ：" prop="address"  class="q2">
                                                <el-input v-model="ruleForm.address"></el-input>
                                            </el-form-item>
                                            <el-form-item label="客户服务电话 ：" prop="servicePhone" class="q2">
                                                <el-input v-model="ruleForm.servicePhone"></el-input>
                                            </el-form-item>
                                            <el-form-item label="公司联系人姓名 ：" prop="contactor" class="q2">
                                                <el-input v-model="ruleForm.contactor"></el-input>
                                            </el-form-item>
                                            <el-form-item label="联系人电话 ：" prop="phone" class="q2">
                                                <el-input v-model="ruleForm.phone"></el-input>
                                            </el-form-item>
                                            <el-form-item label="联系人职位 ：" prop="position" class="q2">
                                                <el-input v-model="ruleForm.position"></el-input>
                                            </el-form-item>

                                            <el-form-item label="公司所在省份 : " prop="province" >

                                                <el-select v-model="ruleForm.province" placeholder="请选择公司所在省份" @change="choseProvince1" >
                                                    <el-option
                                                            v-for="(val,key,index) in arr"
                                                            :key="key"
                                                            :label="key"
                                                            :value="key"
                                                    ></el-option>
                                                </el-select>

                                                <el-select v-model="ruleForm.city" placeholder="请选择公司所在市" >
                                                    <el-option v-for='(val,key,index) in ProvincesCities1'
                                                               :label="val"
                                                               :value="val"
                                                               :key="val"
                                                    ></el-option>

                                                </el-select>

                                            </el-form-item>


                                            <el-form-item label="公司简称 ：" prop="shortname" class="q2" >
                                                <el-input v-model="ruleForm.shortname"></el-input>
                                            </el-form-item>
                                            <el-form-item label="公司备注：" prop="remark">
                                                <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </el-form>
                            </div>
                        </div>
                        <div class="btn">
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="发票信息" name="third">
                    <div class="Tab3">
                        <div class="title"><p>发票信息</p></div>
                        <div class="center_top">
                            <el-form :model="ruleForm3" :rules="rules3" ref="ruleForm3"  label-width="150px" class="demo-ruleForm">
                                <el-form-item label="是否开发票 ：" prop="needInvoice">
                                    <el-radio-group v-model="ruleForm3.needInvoice">
                                        <el-radio @change.native.prevent="clickitem('1')" label='1'>是</el-radio>
                                        <el-radio @change.native.prevent="clickitem('0')" label='0'>否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="开票类型 ：" prop="makeType" v-if="this.IsDisabled == '1'?true:false">
                                    <el-select v-model="ruleForm3.makeType" placeholder="请选择开票类型" >
                                        <el-option label="增值税普通发票" value="增值税普通发票"></el-option>
                                        <el-option label="增值税专用发票" value="增值税专用发票"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="单位名称 ：" prop="companyName"   v-if="this.IsDisabled == '1'?true:false ">
                                    <el-input v-model="ruleForm3.companyName"></el-input>
                                </el-form-item>
                                <el-form-item label="纳税人识别码 ：" prop="taxpayerIdentifNum"  v-if="this.IsDisabled == '1'?true:false ">
                                    <el-input v-model="ruleForm3.taxpayerIdentifNum"></el-input>
                                </el-form-item>
                                <el-form-item label="税率 ：" required v-if="this.IsDisabled == '1'?true:false ">
                                    <el-select v-model="ruleForm3.taxRate" placeholder="请选择税率" >
                                        <el-option label="0.1" value="0.1"></el-option>
                                        <el-option label="0.2" value="0.2"></el-option>
                                        <el-option label="0.06" value="0.06"></el-option>
                                        <el-option label="0.09" value="0.09"></el-option>
                                        <!--<el-option label="无税率" value="0" selected="selected"></el-option>-->
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="发票内容 ：" prop="invoiceContent"  v-if="this.IsDisabled == '1'?true:false ">
                                    <el-select v-model="ruleForm3.invoiceContent" placeholder="请选择税率" >
                                        <el-option label="*运输服务*运费" value="*运输服务*运费"></el-option>
                                        <el-option label="*经济代理服务*国内货物运输代理服务" value="*经济代理服务*国内货物运输代理服务"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="银行卡 ：" prop="account"  v-if="this.IsDisabled == '1'?true:false ">
                                    <el-input v-model="ruleForm3.account"></el-input>
                                </el-form-item>
                                <el-form-item label="开户行 ：" prop="openingBank"  v-if="this.IsDisabled == '1'?true:false ">
                                    <el-input v-model="ruleForm3.openingBank"></el-input>
                                </el-form-item>
                                <el-form-item label="注册地址 ：" prop="registeredAddress" v-if="this.IsDisabled == '1'?true:false" :rules="ruleForm3.makeType == '增值税专用发票'?ruleForm3.registeredAddress:[{ required: false, message: '请输入注册地址', trigger: 'blur' }]">
                                    <el-input v-model="ruleForm3.registeredAddress"></el-input>
                                </el-form-item>

                                <el-form-item label="电话 ：" prop="phone" :rules="ruleForm3.makeType == '增值税专用发票'?ruleForm3.phone:[{ required: false, message: '请输入电话', trigger: 'blur' }]"  v-if="this.IsDisabled == '1'?true:false ">
                                    <el-input v-model="ruleForm3.phone"></el-input>
                                </el-form-item>


                                <el-form-item label="开票单位 ：" prop="makeSite" v-if="this.IsDisabled == '1'?true:false ">
                                    <el-select v-model="ruleForm3.makeSite" placeholder="请选择开票单位" >
                                        <el-option label="闪电狗科技" value="闪电狗科技"></el-option>
                                        <el-option label="全达货运" value="全达货运"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="备注 ：" prop="remark" v-if="this.IsDisabled == '1'?true:false ">
                                    <el-input type="textarea" v-model="ruleForm3.remark"></el-input>
                                </el-form-item>
                                <el-form-item label="发票邮寄信息 ：" prop="" v-if="this.IsDisabled == '1'?true:false ">
                                </el-form-item>
                                <el-form-item label="收件人姓名" prop="receiveName"v-if="this.IsDisabled == '1'?true:false ">
                                    <el-input v-model="ruleForm3.receiveName"></el-input>
                                </el-form-item>
                                <el-form-item label="收件人地址" prop="receiveAddress"v-if="this.IsDisabled == '1'?true:false ">
                                    <el-input v-model="ruleForm3.receiveAddress"></el-input>
                                </el-form-item>
                                <el-form-item label="收件人电话" prop="receivePhone"v-if="this.IsDisabled == '1'?true:false ">
                                    <el-input v-model="ruleForm3.receivePhone"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="btn">
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="合同信息" name="four">
                    <div class="Tab4">
                        <div class="center_top">
                            <div class="title"><p>合同信息</p></div>
                            <el-form ref="contract" :rules="rules4" :model="contract" label-width="150px" class="demo-ruleForm">
                                <el-form-item label="合同已归档">
                                    <el-radio  v-model="contract.isArchived" label="1" >已归档</el-radio>
                                    <el-radio  v-model="contract.isArchived" label="0">未归档</el-radio>
                                </el-form-item>
                                <el-form-item label="合同归档日期"  required v-if="contract.isArchived == '0'?false:true">
                                    <el-form-item prop="archivedDate">
                                        <el-date-picker
                                                v-model="archivedDate"
                                                type="date"
                                                value-format="timestamp"
                                                placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-form-item>
                                <el-form-item label="合同编号" prop="id">
                                    <el-input v-model="contract.id"></el-input>
                                    <span style="color:red;font-size:13px;">城市代码+X/Z+J/Y+年+月+3位流水 例:010XY1808001</span>
                                </el-form-item>
                                <el-form-item label="合同起止日期" required>
                                    <el-form-item prop="value12">
                                        <el-date-picker
                                                v-model="value12"
                                                type="daterange"
                                                value-format="timestamp"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-form-item>
                                <el-form-item label="违约金比例" prop="percentageOfCharge">
                                    <el-input v-model="contract.percentageOfCharge" ></el-input>
                                </el-form-item>

                                <!--<el-form-item label="客户结算周期" prop="billCycle" style="width:30%;">-->
                                    <!--<span>N+</span>-->
                                    <!--<el-input v-model="contract.billCycle" ></el-input>天-->
                                <!--</el-form-item>-->

                                <!--<div style="position:relative;">-->
                                    <!--<el-form-item label="司机结算周期"  prop="driverBillCycle" style="width:30%;">-->
                                        <!--<span>N+</span>-->
                                        <!--<el-input ref="mark" v-model="contract.driverBillCycle" ></el-input>天-->
                                    <!--</el-form-item>-->
                                    <!--<span style="color:red;font-size:13px;position:absolute;top:10px;left:327px;">（说明：标品项目司机账期请输入15、30、45或60，其他结算周期请特批通过后再录入）</span>-->
                                <!--</div>-->
                                <div style="position:relative;">
                                    <el-form-item label="客户结算周期" prop="billCycle" style="width:50%;">
                                        <el-row>
                                            <el-col :span="20">
                                                <el-select v-model="contract.billCycleType" placeholder="请选择" style="padding:0 0 0 27px;">
                                                    <el-option label="自然日" value="M"></el-option>
                                                    <el-option label="自然月" value="T"></el-option>
                                                </el-select>
                                            </el-col>
                                            <el-col :span="10">
                                                <span v-if="contract.billCycleType == 'T'">M+</span>
                                                <span v-if="contract.billCycleType == 'M'">N+</span>
                                                <el-input v-model="contract.billCycle" ></el-input>
                                                天
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                    <span style="color:red;font-size:13px;position:absolute;top:10px;left:338px;">
                                        （说明："N"代表自然月；请按照合同信息录入数据）
                                    </span>
                                </div>


                                <div style="position:relative;">
                                    <el-form-item label="司机结算周期" prop="driverBillCycle" style="width:50%;">
                                        <el-row>
                                            <el-col :span="20">
                                                <el-select v-model="contract.driverBillCycleType" placeholder="请选择" style="padding:0 0 0 27px;">
                                                    <el-option label="自然日" value="M" v-if="contract.billCycleType == 'M'"></el-option>
                                                    <el-option label="自然月" value="T" v-if="contract.billCycleType == 'T'"></el-option>
                                                    <el-option label="背靠背" value="B"></el-option>
                                                </el-select>
                                            </el-col>
                                            <el-col :span="10">
                                                <span v-if="contract.driverBillCycleType == 'T'">M+</span>
                                                <span v-if="contract.driverBillCycleType == 'M'">N+</span>
                                                <el-input v-if="contract.driverBillCycleType == 'B'?false:true" ref="mark" v-model="contract.driverBillCycle" ></el-input>
                                                <span v-if="contract.driverBillCycleType == 'B'?false:true">天</span>
                                            </el-col>
                                        </el-row>

                                    </el-form-item>
                                    <span style="color:red;font-size:13px;position:absolute;top:10px;left:338px;">（说明：标品项目司机账期请输入15、30、45或60，其他结算周期请特批通过后再录入）</span>
                                </div>
                                <el-form-item label="客户邮箱" prop="customerEmail">
                                    <el-input v-model="contract.customerEmail"></el-input>
                                </el-form-item>

                                <el-form-item label="质保金" prop="qualityGuaranteeDeposit">
                                    <el-input v-model="contract.qualityGuaranteeDeposit"></el-input>
                                </el-form-item>

                                <el-form-item label="承诺期" required>
                                    <el-select v-model="commitment1" placeholder="请选择期限">
                                        <el-option label="0天" value="0"></el-option>
                                        <el-option label="3天" value="3"></el-option>
                                        <el-option label="5天" value="5"></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="催收期" required>
                                    <!--<el-input v-model="collection"></el-input>天-->
                                    <el-select v-model="collection" placeholder="请选择催收期">
                                        <el-option label="0天" value="0"></el-option>
                                        <el-option label="1天" value="1"></el-option>
                                        <el-option label="2天" value="2"></el-option>
                                        <el-option label="3天" value="3"></el-option>
                                        <el-option label="4天" value="4"></el-option>
                                        <el-option label="5天" value="5"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="上传电子合同" required>
                                    <el-upload
                                            class="upload-demo"
                                            ref="upload"
                                            :drang="true"
                                            action="javascript:;"
                                            :limit='10'
                                            :file-list="fileListContract"
                                            :on-preview="handlePictureCardPreviewContract"
                                            :auto-upload="false">
                                        <el-button slot="trigger" size="small" type="primary">选取电子合同</el-button>
                                        <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadFile()">上传电子合同</el-button>
                                        <div slot="tip" class="el-upload__tip">合同上传，支持jpg、png、word、excel、wps、zip、pdf，支持下载查看最多添加10份</div>
                                    </el-upload>
                                </el-form-item>
                                <!--<el-form-item label="保险信息:">-->
                                    <!--<el-checkbox-group v-model="insuranceInformation">-->
                                        <!--<el-checkbox v-for="insurance in cities4" :label="insurance" :key="insurance" name="insuranceInformation">{{insurance}}</el-checkbox>-->
                                    <!--</el-checkbox-group>-->
                                <!--</el-form-item>-->

                                <el-form-item label="是否分区域计费" prop="billArea">
                                    <el-radio  v-model="contract.billArea" label="yes" >是</el-radio>
                                    <el-radio  v-model="contract.billArea" label="no">否</el-radio>
                                </el-form-item>
                                <el-form-item label="计价方式" prop="billWay">
                                    <el-radio  v-model="contract.billWay" label="BK" >起步价+超出部分</el-radio>
                                    <el-radio  v-model="contract.billWay" label="BV">整车</el-radio>
                                    <el-radio  v-model="contract.billWay" label="BP">件</el-radio>
                                    <el-radio  v-model="contract.billWay" label="BT">票</el-radio>
                                    <el-radio  v-model="contract.billWay" label="BH">小时</el-radio>
                                </el-form-item>
                                <el-form-item label="点击添加" required>
                                    <el-button size="mini" type="success">添加价格明细</el-button>
                                </el-form-item>
                                <!--回显子组件表格-->
                                <tables :dataInfos = 'state' :judgingModel = 'judgingModel'></tables>

                                <el-form-item label="上传客户信息表" required>
                                    <el-upload
                                            class="upload-demo"
                                            ref="upload"
                                            :drang="true"
                                            action="javascript:;"
                                            :limit='10'
                                            :file-list="fileListCustomerInfo"
                                            :on-preview="ViewCustomerInformationTable"
                                            :auto-upload="false">
                                        <el-button slot="trigger" size="small" type="primary">选取客户信息表</el-button>
                                        <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadFileInfo()">上传客户信息表</el-button>
                                        <div slot="tip" class="el-upload__tip">合同上传，支持jpg、png、word、excel、wps、zip、pdf，支持下载查看最多添加10份</div>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="备注" prop="remark">
                                    <el-input type="textarea" v-model="contract.remark"></el-input>
                                </el-form-item>
                                <el-form-item label="变更说明" prop="Explain">
                                    <el-input type="textarea" v-model="contract.Explain"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="btn">
                        </div>
                    </div>
                </el-tab-pane>

                <!-- 添加价格明细模态框显示 -->
                <div class="Modality">
                    <el-dialog title="合同信息>添加价格明细" :visible.sync="dialogFormVisible">
                        <el-form :model="form" :rules="rulesShow" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                            <el-form-item  label="选择区域:" prop="cityName" v-if="contract.billArea == 'yes' ? true : false">
                                <el-cascader
                                        :options="options2"
                                        clearable
                                        @change="handleItemChange"
                                        placeholder="请选择所在城市"
                                        v-model="form.cityName"
                                ></el-cascader>
                            </el-form-item>

                            <el-form-item  label="选择车型:" prop="carRadio" required>
                                <el-tabs v-model="form.activeName" @tab-click="handleClick">
                                    <el-tab-pane label="常用" name="usual" >
                                        <el-radio-group v-model="form.carRadio">
                                            <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
                                        </el-radio-group>
                                    </el-tab-pane>
                                    <el-tab-pane label="电动" name="电动" >
                                        <el-radio-group v-model="form.carRadio">
                                            <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
                                        </el-radio-group>
                                    </el-tab-pane>
                                    <el-tab-pane label="金杯" name="金杯">
                                        <el-radio-group v-model="form.carRadio">
                                            <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
                                        </el-radio-group>
                                    </el-tab-pane>
                                    <el-tab-pane label="小面包" name="小面包">
                                        <el-radio-group v-model="form.carRadio">
                                            <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
                                        </el-radio-group>
                                    </el-tab-pane>
                                    <el-tab-pane label="平板" name="平板">
                                        <el-radio-group v-model="form.carRadio">
                                            <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
                                        </el-radio-group>
                                    </el-tab-pane>
                                    <el-tab-pane label="高栏" name="高栏">
                                        <el-radio-group v-model="form.carRadio">
                                            <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
                                        </el-radio-group>
                                    </el-tab-pane>
                                    <el-tab-pane label="冷藏" name="冷藏">
                                        <el-radio-group v-model="form.carRadio">
                                            <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
                                        </el-radio-group>
                                    </el-tab-pane>
                                    <el-tab-pane label="厢式货车" name="厢式货车">
                                        <el-radio-group v-model="form.carRadio">
                                            <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
                                        </el-radio-group>
                                    </el-tab-pane>
                                    <el-tab-pane label="栏板" name="栏板">
                                        <el-radio-group v-model="form.carRadio">
                                            <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
                                        </el-radio-group>
                                    </el-tab-pane>
                                    <el-tab-pane label="其他" name="other">
                                        <el-radio-group v-model="form.carRadio">
                                            <el-radio :label="index" v-for="(arr,index) in cars" :key="index">{{arr.name}}&nbsp;{{arr.isElectric}}&nbsp;{{arr.length}}&nbsp;{{arr.isCertificate}}&nbsp;{{arr.isTailBoard}}&nbsp;{{arr.isCold}}</el-radio>
                                        </el-radio-group>
                                    </el-tab-pane>
                                </el-tabs>
                            </el-form-item>

                            <el-form-item  label="起步价格:" prop="StartPrice" style="width:40%;" v-if="state == 11 || state == 21 ? true : false">
                                <el-input v-model.trim="form.StartPrice" placeholder="元"></el-input>
                            </el-form-item>
                            <el-form-item  label="单票价格:"  prop="SingleTicket" style="width:40%;" v-if="state == 14 || state == 24? true : false">
                                <el-input v-model.trim="form.SingleTicket" placeholder="元"></el-input>
                            </el-form-item>
                            <el-form-item  label="计件单价:" prop="ByThePiece" style="width:40%;" v-if="state == 13 || state == 23 ? true : false">
                                <el-input v-model.trim="form.ByThePiece" placeholder="元"></el-input>
                            </el-form-item>
                            <el-form-item  label="整车价格:" prop="WholeVehicle" style="width:40%;" v-if="state == 12 || state == 22 ? true : false">
                                <el-input v-model.trim="form.WholeVehicle" placeholder="元"></el-input>
                            </el-form-item>

                            <el-form-item label="小时：" prop=""  v-if="state == 15 || state == 25 ? true : false" required>
                                <el-input v-model.trim="form.FourHours" placeholder="4 元/小时" style="width:33%;float: left"></el-input>
                                <el-input v-model.trim="form.NineHours" placeholder="9 元/小时" style="width:33%;float: left"></el-input>
                                <el-input v-model.trim="form.ThirteenHours" placeholder="13 元/小时" style="width:33%;float: left"></el-input>
                            </el-form-item>


                            <el-form-item  label="超出部分:" prop="" v-if="state == 11 ? true : false" required>
                                <div>
                                    <el-checkbox-group v-model="form.kilometre" style="width:10%;float: left" >
                                        <el-checkbox label="公里" name="" ></el-checkbox>
                                    </el-checkbox-group>
                                    <el-form-item label="起步价内公里数：" prop="" style="width:40%;float: left">
                                        <el-input v-model.trim="form.kilometreNum" placeholder="公里"></el-input>
                                    </el-form-item>
                                    <el-form-item label="超里程数单价：" prop="" style="width:40%;float: left">
                                        <el-input v-model.trim="form.mileage" placeholder="元/公里"></el-input>
                                    </el-form-item>
                                </div>
                                <div style="clear: both">
                                    <el-checkbox-group v-model="form.PointPosition" style="width:10%;float: left">
                                        <el-checkbox label="点位" name=""></el-checkbox>
                                    </el-checkbox-group>
                                    <el-form-item label="起步价内点位数：" prop="" style="width:40%;float: left">
                                        <el-input v-model.trim="form.StartingPrice" placeholder="点位"></el-input>
                                    </el-form-item>
                                    <el-form-item label="超点位单价：" prop="" style="width:40%;float: left">
                                        <el-input v-model.trim="form.UnitPrice" placeholder="元/点位"></el-input>
                                    </el-form-item>
                                </div>
                                <div style="clear: both">
                                    <el-checkbox-group v-model="form.weight" style="width:10%;float: left">
                                        <el-checkbox label="重量" name=""></el-checkbox>
                                    </el-checkbox-group>
                                    <el-form-item label="起步价内重量：" prop="" style="width:40%;float: left">
                                        <el-input v-model="form.startWeight" placeholder="吨"></el-input>
                                    </el-form-item>
                                    <el-form-item label="超重量单价：" prop="" style="width:40%;float: left">
                                        <el-input v-model="form.ExceedWeight" placeholder="元/吨"></el-input>
                                    </el-form-item>
                                </div>
                                <div style="clear: both">
                                    <el-checkbox-group v-model="form.volume" style="width:10%;float: left">
                                        <el-checkbox label="体积" name=""></el-checkbox>
                                    </el-checkbox-group>
                                    <el-form-item label="起步价内体积：" prop="" style="width:40%;float: left">
                                        <el-input v-model="form.startVolume" placeholder="方"></el-input>
                                    </el-form-item>
                                    <el-form-item label="超体积单价：" prop="" style="width:40%;float: left">
                                        <el-input v-model="form.ExceedVolume" placeholder="元/方"></el-input>
                                    </el-form-item>
                                </div>
                                <div style="clear: both">
                                    <el-checkbox-group v-model="form.ticket" style="width:10%;float: left">
                                        <el-checkbox label="票" name=""></el-checkbox>
                                    </el-checkbox-group>
                                    <el-form-item label="起步价内票数：" prop="" style="width:40%;float: left">
                                        <el-input v-model="form.startTicket" placeholder="票"></el-input>
                                    </el-form-item>
                                    <el-form-item label="超量单价：" prop="" style="width:40%;float: left">
                                        <el-input v-model="form.ExceedTicket" placeholder="元/票"></el-input>
                                    </el-form-item>
                                </div>
                            </el-form-item>
                            <!--回显子组件表格-->
                            <div style="padding: 30px;">
                                <tables :dataInfos = 'state' :judgingModel = 'judgingModel' @aa="bb"></tables>
                            </div>

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="submitForms('ruleForm')">·添加车型</el-button>
                            <el-button type="primary"  @click="dialogFormVisible = false" >提交</el-button>
                            <el-button  @click="dialogFormVisible=false">取消</el-button>
                        </div>

                    </el-dialog>
                </div>
                <!-- 添加价格明细模态框结束 -->

                <el-tab-pane label="闪电狗物流管理系统设置" :disabled = 'true' name="system">
                    <div class="Tab5">
                        <div class="center_top">
                            <div class="title"><p>开通账户</p></div>
                            <el-form :model="settings"  class="q1 demo-ruleForm" label-width="8%">
                                <el-form-item label="用户名 ：" prop="customerNameEn" class="q2">
                                    <el-input v-model="settings.customerNameEn"  placeholder="请输入内容"></el-input>
                                </el-form-item>
                                <span style="font-size:13px; color:#909399; margin:50px;">
                                    用户名设置规则：所属城市首字母+电话；例：北京分公司，客户电话 1342***8026，系统账号则设定为：bj1342***8026
                                </span>
                                <el-form-item label="手机号 ：" prop="phone" class="q2">
                                    <el-input v-model="settings.phone" placeholder="用于找回密码"></el-input>
                                </el-form-item>
                                <el-form-item  label="密码 ：" prop="pass2" >
                                    <el-input type="password" v-model="settings.pass2" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码 ：" prop="checkPass2" >
                                    <el-input type="password" v-model="settings.checkPass2" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="center_bottom">
                            <div class="title"><p>系统设置</p></div>
                            <ul :model="permissions">
                                <li>
                                    <span>运营大厅是否开通 ：</span>
                                    <span>
                                    <el-radio v-model="permissions.settingsradio" label="true" value="true">是</el-radio>
                                    <el-radio v-model="permissions.settingsradio" label="false" value="false">否</el-radio>
                                </span>
                                </li>
                                <li>
                                    <span>发布用车是否开通 ：</span>
                                    <span>
                                    <el-radio v-model="permissions.settingsradio1" label="true"  value="true">是</el-radio>
                                    <el-radio v-model="permissions.settingsradio1" label="false" value="false">否</el-radio>
                                </span>
                                </li>
                                <li>
                                    <span>智能调度是否开通 ：</span>
                                    <span>
                                    <el-radio v-model="permissions.settingsradio2" label="true"  value="true">是</el-radio>
                                    <el-radio v-model="permissions.settingsradio2" label="false" value="false">否</el-radio>
                                </span>
                                </li>
                                <li>
                                    <span>统计报表是否开通 ：</span>
                                    <span>
                                    <el-radio v-model="permissions.settingsradio3" label="true" value="true">是</el-radio>
                                    <el-radio v-model="permissions.settingsradio3" label="false" value="false">否</el-radio>
                                </span>
                                </li>
                                <li>
                                    <span>选司机是否开通 ：</span>
                                    <span>
                                    <el-radio v-model="permissions.settingsradio4" label="true" value="true">是</el-radio>
                                    <el-radio v-model="permissions.settingsradio4" label="false" value="false">否</el-radio>
                                </span>
                                </li>
                                <li>
                                    <span>给指定司机发任务是否支持 ：</span>
                                    <span>
                                        <el-radio v-model="permissions.settingsradio5" label="true" value="true">是</el-radio>
                                        <el-radio v-model="permissions.settingsradio5" label="false" value="false">否</el-radio>
                                    </span>
                                </li>
                                <!--<li>-->
                                    <!--<span>第三方订单 ：</span>-->
                                    <!--<span>-->
                                        <!--<el-radio v-model="permissions.settingsradio6" label="true" value="true">是</el-radio>-->
                                        <!--<el-radio v-model="permissions.settingsradio6" label="false" value="false">否</el-radio>-->
                                    <!--</span>-->
                                <!--</li>-->
                            </ul>
                        </div>
                        <div class="btn">
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>

            <el-dialog
                    title="审批意见"
                    :visible.sync="dialogVisiblesPopup"
            >
                <span slot="footer" class="dialog-footer">
                    <el-form :model="ruleFormPopup" :rules="rulesPopup" ref="ruleFormPopup" label-width="80px" class="demo-ruleForm">
                          <el-form-item label="客户姓名" prop="name">
                            <el-input v-model="ruleFormPopup.name" disabled></el-input>
                          </el-form-item>
                        <el-form-item label="审批原因" prop="desc">
                            <el-input type="textarea" v-model="ruleFormPopup.desc"></el-input>
                        </el-form-item>
                    </el-form>
                <el-button type="primary" @click="adopt('ruleFormPopup')">通过</el-button>
                <el-button type="primary" @click="returns('ruleFormPopup')">退回</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText,TextToCode,code} from 'element-china-area-data';
    import tables from './components/table.vue';
    import "../../../mock/city.js";
    const sha256 = require("js-sha256").sha256;
    const cityOptions = ['食材', '水果', '方便食品', '团餐外卖', '酒水饮料' ,'建材', '汽配' ,'家电','日化','家具','鲜花蛋糕','3c数码','洗涤','印刷品','服装鞋帽','医药保健','包装','母婴','五金','自行车','大包裹/仪器','电子','配件','其他'];
    const cityOptions1 = ['仓库', '门店', '宅配', '指定位置', '无人值守货架' ,'无人便利店', '自助售货机','个人'];
    const checkedCities = ['购买畅心保高价值货物险'];
    export default {
        components:{
            tables
        },
        data() {
            // var validatePass = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入密码'));
            //     } else {
            //         callback();
            //     }
            // };
            // var validatePass2 = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请再次输入密码'));
            //     } else if (value !== this.settings.pass2) {
            //         callback(new Error('两次输入密码不一致!'));
            //     } else {
            //         callback();
            //     }
            // };
            // var validatePass3 = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入用户名'));
            //     }else{
            //         let page =JSON.stringify({
            //             token : this.token,
            //             customerNameEn: this.settings.name
            //         });
            //         //this.global.lightningUrl+':8080
            //         this.$http.post(this.global.lightningUrl + '/company/customermanage/checklegal', page ,{
            //             headers: {
            //                 'Content-Type': 'application/json;charset=UTF-8'
            //             }
            //         }).then((res)=>{
            //             if ( res.body.result == 1 ){
            //                 callback(new Error('命名重复'));
            //             }
            //         });
            //         callback();
            //     }
            // };
            // var validatePass4 = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入手机号'));
            //     } else {
            //         callback();
            //     }
            // };
            return {
                business:[
                    {name:'城市配送',id:'1002996'},
                    {name:'干线普货运输',id:'1003997'},
                    {name:'农村配送',id:'1003998'},
                    {name:'集装箱运输',id:'1002998'},
                    {name:'其他',id:'1003999'}
                ],
                state:'',
                //计价明细的模态窗口
                obj:'',
                activeName: 'usual',
                backDisplayArray:[],//回显的子组件数组
                cars:'',
                province:[],
                city:[],
                countys:[],
                Part:0,
                Parts:0,
                carModel:'',//车型
                areaPrice:[],
                judgingModel:[],
                form:{
                    carRadio:'',
                    activeName:'',
                    cityName:[],//区域名称
                    //选择车型
                    StartPrice:'',//起步价格
                    SingleTicket:'',//单票价格
                    ByThePiece:'',//计件单价
                    WholeVehicle:'',//整车价格
                    FourHours:'',//四小时
                    NineHours:'',//九小时
                    ThirteenHours:'',//13小时
                    kilometreNum:'',//公里数
                    kilometre:'',//起步价内公里数
                    mileage:'',//超里程
                    PointPosition:'',//点位
                    StartingPrice:'',//起步价点位数
                    UnitPrice:'',//点位单价
                    weight:'',//重量
                    startWeight:'',//起步价重量
                    ExceedWeight:'',//超重量单价
                    volume:'',//体积
                    startVolume:'',//起步价内体积
                    ExceedVolume:'',//超体积单价
                    ticket:'',//票
                    startTicket:'',//起步票
                    ExceedTicket:'',//超票

                    ContractProvince:'',
                },


                fileListCustomerInfo:[],
                saleName3:'',
                archivedDate:'',
                //切换的uid
                userInfoRecordId:'',
                batch:'',
                Final:'',
                ruleFormPopup:{
                    desc:'',
                    name:'',
                },
                //弹窗
                dialogVisiblesPopup:false,
                Examination:'',
                //上传图片
                dialogImageUrl:'',
                dialogVisible: false,
                dialogVisibles: false,
                fileList2:[],
                fileList1:'',
                picList:[],
                obj:{},
                //上传合同
                dialogImageUrlContract: '',
                dialogVisibleContract: false,
                picListContract:[],
                objContract:{},
                fileListContract:[],
                isVisible:'',
                customerId:'',
                isDisabled:false,
                //taba2 页面下拉来表id
                //区域下拉名字
                region:'',
                //销售
                adviser:'',
                //顾问
                Commissioner:'',
                areaList:'',
                projectList:'',
                salename:'',
                // areaList:'',
                //第一次加载的三个全局id
                companyId:'',
                userId:'',
                userInfoChangeRecordId:'',
                sss:'',
                file:'',
                //上传的图片
                picture:'',
                saleList:'',
                dialogVisible: false,
                id:'',
                customerManagement:'',
                token:'',
                //Table1
                //省市
                ProvincesCities1:[],
                ruleForm: {
                    financingMoney:'',
                    financingTrun:'',
                    isListed:'',
                    companyFname: '',
                    registrationNum: '',
                    headOfficeAddr: '',
                    contractName: '',
                    certifyStatus: '',
                    delivery: false,
                    remark: '',
                    customerServicePhone:'',
                    contractPhone:'',
                    contractPosition:'',
                    province:'',
                    city:'',
                    companySname:''
                },
                //转化
                cities: cityOptions,
                cities1: cityOptions1,
                aa:true,
                goodsTypestr:'',
                goodsTypestr1:[],
                consigneeTypestr:'',
                consigneeType1:[],
                projectAdminName:'',
                saleAdminName:'',
                ProvincesCities2:[],
                saleName1:'',
                phone1:'',
                saleName2:'',
                saleName3:'',
                ruleForm2: {
                    businessType:'1002996',
                    customerSource:'',
                    customerName:'',
                    province:'',
                    city:'',
                    type:'',
                    filialeName:'',
                    projectName:'',
                    saleName:'',
                    topLevelClassify:'',
                    twoLevelClassify:'',
                    thirdLevelClassify:'',
                    goodsType:[],
                    consigneeType:[],
                    cphone:'',
                },
                ruleForm3:{
                    receiveName:'',//收件人姓名
                    receiveAddress:'',//收件人地址
                    receivePhone:'',//收件人电话
                    companyName:'',
                    taxpayerIdentifNum:'',
                    taxRate:'0.09',
                    invoiceContent:'',
                    account:'',
                    openingBank:'',
                    remark:'',
                    needInvoice:'',
                    makeType:'',
                    makeSite:"",//开票单位
                },
                //table3的禁用介质
                IsDisabled:'',
                rulesPopup:{
                    desc: [
                        { required: true, message: '请输入审批意见', trigger: 'blur' },
                        {pattern: /^.{0,200}$/,  message: '汉字、字母或数字组合2~200个字符', trigger: 'blur' }
                    ]
                },
                rules: {
                    //table1
                    companyFname: [
                        { required: true, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\w){2,50}$/,  message: '汉字、字母或组合2~50个字符', trigger: 'blur' }
                    ],
                    registrationNum: [
                        { required: true, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[0-9]|[\u4E00-\u9FA5]){2,50}$/ , message: '汉字、字母、数字或组合2~50个字符', trigger: 'blur' }
                    ],
                    isListed: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    financingMoney: [
                        { required: true, message: '请选择融资金额', trigger: 'change' },

                    ],
                    certifyStatus:[
                        { required: true, message: '请选择融资能力', trigger: 'change' },
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    headOfficeAddr: [
                        { required: false, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^.{2,50}$/ , message: '汉字、字母、数字或组合2~50个字符', trigger: 'blur' }
                    ],
                    customerServicePhone: [
                        { required: false, message: '请输入正确的电话格式', trigger: 'blur' },
                        {pattern: /^400[0-9]{7}|800[0-9]{7}|0[0-9]{2,3}[0-9]{8}$/ , message: '电话格式不正确', trigger: 'blur' }
                    ],
                    contractName: [
                        { required: false, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]{2,10})$/ , message: '汉字、字母或组合2~10个字符', trigger: 'blur' }
                    ],
                    contractPhone: [
                        { required: false, message: '请输入正确的电话格式', trigger: 'blur' },
                        {pattern: /^((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8})$/ , message: '电话格式不正确', trigger: 'blur' }
                    ],
                    contractPosition: [
                        { required: false, message: '请输入正确的职位格式', trigger: 'blur' },
                        {pattern: /^([\u4e00-\u9fa5]{2,5})$/ , message: '职位格式不正确', trigger: 'blur' }
                    ],
                    companySname: [
                        { required: false, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\w){2,50}$/ , message: '汉字、字母、数字或组合2~50个字符', trigger: 'blur' }
                    ],
                    remark: [
                        { required: false, message: '  ', trigger: 'blur' },
                        {pattern: /^(.{0,200})$/ , message: '字数以达到200个上线',}
                    ],
                },
                rules2:{
                    //table2
                    customerName: [
                        { required: true, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\w){2,50}$/,  message: '汉字、字母或组合2~50个字符', trigger: 'blur' }
                    ],
                    cphone:[
                        { required: true, message: '请输入正确的电话格式', trigger: 'blur' },
                        {pattern: /^((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8})$/ , message: '电话格式不正确', trigger: 'blur' }
                    ],
                    companyFname:[
                        { required: true, message: '请输入正确的电话格式', trigger: 'blur' },
                        {pattern: /^((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8})$/ , message: '电话格式不正确', trigger: 'blur' }
                    ],
                    goodsType:[
                        { type: 'array', required: true, message: '请至少选择一个客户主要货物类型', trigger: 'change' }
                    ],
                    consigneeType:[
                        { type: 'array', required: true, message: '请至少选择一个客户主要收货人类型', trigger: 'change' }
                    ],
                },
                //table3
                rules3:{
                    //收件人姓名
                    receiveName:[
                        { required: true, message: '请输入收件人姓名', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,10}$/,  message: '不能包含特殊字符且不超过10个', trigger: 'blur' }
                    ],
                    //收件人电话
                    receivePhone:[
                        { required: true,message: '请输入正确的电话格式', trigger: 'blur' },
                        {pattern: /^((0\d{2,3}-?\d{7,8})|(1[3-9]\d{9})|(400-?[0-9]{4}-?[0-9]{3})|(800-?[0-9]{4}-?[0-9]{3}))$/ , message: '电话格式不正确', trigger: 'blur' }
                    ],
                    //收件人地址
                    receiveAddress:[
                        { required: true, message: '请输入收件人地址', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,  message: '不能包含特殊字符且不超过200个', trigger: 'blur' }
                    ],
                    //单位名称
                    companyName: [
                        { required: true, message: '请填写单位名称', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\(|\)|（|）){2,50}$/,  message: '单位名称不合规，仅能包含简体中文、英文字母，长度2-50字符 ', trigger: 'blur' }
                    ],
                    //纳税人识别码
                    taxpayerIdentifNum:[
                        { required: true, message: '请填写纳税人识别码', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[0-9]){15,20}$/,  message: '纳税人识别码不合规，仅能包含英文字母、数字，长度15-20字符', trigger: 'blur' }
                    ],
                    //是否开发票
                    needInvoice: [
                        { required: true, message: '请填写是否开发票', trigger: 'change' }
                    ],
                    //发票内容
                    invoiceContent:[
                        { required: true, message: '请填写发票内容', trigger: 'blur' },
                        {pattern: /^.{0,50}$/,  message: '格式不正确', trigger: 'blur' }
                    ],
                    //账号
                    account:[
                        { required: true, message: '请填写账号', trigger: 'blur' },
                        {pattern: /^[\d-]{10,30}$/,  message: '账号不合规，仅为数字，长度10-30字符  ', trigger: 'blur' }
                    ],
                    //开户行
                    openingBank:[
                        { required: true, message: '请填写开户行  ', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]){2,50}$/,  message: '填写不合规，仅能包含简体中文、英文字母，长度2-50字符', trigger: 'blur' }
                    ],
                    remark:[
                        { required: true, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,  message: '不能包含特殊字符且不超过200个', trigger: 'blur' }
                    ]
                },
                rules4:{
                    //table4
                    money:[
                        { required: true, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,  message: '格式不正确', trigger: 'blur' }
                    ],
                    email:[
                        { required: true, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,  message: '格式不正确', trigger: 'blur' }
                    ],
                    commitment:[
                        { required: true, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^[1-9]\d*$/,  message: '输入数字', trigger: 'blur' }
                    ],
                    collection:[
                        { required: true, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^[1-9]\d*$/,  message: '输入数字', trigger: 'blur' }
                    ]
                },
                //合同的弹框校验
                rulesShow:{
                    StartPrice:[
                        { required: true, message: '请选择起步价格', trigger: 'change' },
                        {pattern:  /^\d+\.?\d{0,2}$/,  message: '输入的价格保留最后两位小数', trigger: 'blur' }
                    ],
                    cityName:[
                        { required: true, message: '请选择区域！', trigger: 'change' }
                    ],
                    WholeVehicle:[
                        { required: true, message: '请选择整车价格', trigger: 'change' },
                        {pattern:  /^\d+\.?\d{0,2}$/,  message: '输入的价格保留最后两位小数', trigger: 'blur' }
                    ],
                    ByThePiece:[
                        { required: true, message: '请选择计件单价', trigger: 'change' },
                        {pattern:  /^\d+\.?\d{0,2}$/,  message: '输入的价格保留最后两位小数', trigger: 'blur' }
                    ],
                    SingleTicket:[
                        { required: true, message: '请选择单票单价', trigger: 'change' },
                        {pattern:  /^\d+\.?\d{0,2}$/,  message: '输入的价格保留最后两位小数', trigger: 'blur' }
                    ]
                },
                //合同起止日期
                // var file = new File()
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                // 5 5 设置

                // TP33333333333333333
                value12:'',
                companyName:'',
                taxpayerIdentifNum:'',
                account:'',
                openingBank:'',
                remark:'',
                needInvoice:'',
                value6: '',
                value7: '',
                //复选框
                checked: true,
                //单选按钮
                radio: '',
                textarea: '',

                activeName: 'second',
                input: '',
                options: [],
                value: '',
                arr:[],
                // ----------------
                verify:'',
                settings:{
                    customerNameEn:'',
                    phone:'',
                    pass2:'',
                    checkPass2:'',
                },
                settingsinput:"",
                settingsphone:'',
                // 444444444444444444
                //
                cities4: checkedCities,
                pigeonhole1:'',
                pigeonhole:'',
                moneys:'',
                //结算方式
                region1:'',
                //承诺期
                commitment1:'',
                //保险
                insuranceInformation:'',
                //table4
                options2:[],
                dialogFormVisible:false,//添加收费明细的模态窗

                ContractProvince:'',//合同省
                ContractCity:'',//合同市
                ContractArea:'',//合同区
                contract:{
                    Explain:'',//变更说明
                    qualityGuaranteeDeposit:'',//质保金
                    billArea:'',//分区域计费
                    billWay:'',//计价方式
                    isArchived:'',
                    contractPicList:[],
                    resource:'',
                    pigeonhole:'',
                    contractid:'',
                    money:'',
                    region:'',
                    email:'',
                    commitment:'',
                    collection:'',
                    remark:'',
                    value6:'',
                },
                collection:'',
                // 555555555555555555
                permissions:{
                    settingsradio:'true',
                    settingsradio1:'true',
                    settingsradio2:'true',
                    settingsradio3:'true',
                    settingsradio4:'true',
                    settingsradio5:'true',
                    settingsradio6:'false',
                },
                savabutton:false,
                auditorinput :'',
                auditorid :'',
            };
        },
        created(){
            this.Identification();
            // if(this.$route.query.info == 0){
            //     this.Examination = '查看审批客户'
            // }else {
                this.Examination = '查看客户详情';
            // };
            //获取到的省市信息
            this.sss = this.$route.query.id;
            this.$http.get("/city").then(res=>{
                console.log(res);
                this.arr = res.body.arr[0];
                console.log(this.arr);
            });

            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            // console.log(this.token)
            //大区所有数据
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/area', JSON.stringify({
                "token":this.token,
            }),{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res) => {
                console.log(res);
                if  (res.body.errcode == 0){
                    this.options2 = res.body.result;
                }
            });
            //车型
            this.requestCarType('usual');




            if (this.$route.query.info == 0) {
                //审批的Id
                let batch = JSON.parse(sessionStorage.getItem('scopes'));
                console.log(batch)
                console.log(789);
                this.batch = batch.approveId;
                this.Final =  this.batch
            }else if(this.$route.query.info == 1){
                let uid = JSON.parse(sessionStorage.getItem('managementid'));
                console.log(uid.userId);
                console.log(uid);
                console.log(123);
                this.Final =  uid.approveId
            }else {
                console.log(753);
                //拿到id
                let customerManagement = JSON.parse(sessionStorage.getItem('scopes'));
                console.log(customerManagement);
                console.log(753);
                this.customerManagement = customerManagement.approveId;
                this.Final =  this.customerManagement
            }
            setTimeout(()=>{
                console.log(this.$route.query.info);
                console.log("-------------------------------");

                //查看公司信息
                let Participation0  = JSON.stringify({
                    "token":this.token,
                    "id":this.Final,
                    "isApproveItem":true
                });
                let Participation  = JSON.stringify({
                    "token":this.token,
                    "id":this.Final,
                    "isApproveItem":false
                });
                let Participation1  =JSON.stringify({
                    "token":this.token,
                    "id":this.Final,
                    "isApproveItem":true
                });
                let Participation2  =JSON.stringify({
                    "token":this.token,
                    "id":this.Final,
                    "isApproveItem":true
                });

                if (this.$route.query.info == 1) {
                    var page = Participation1;//新增审批
                } else if(this.$route.query.info == undefined){
                    var page = Participation;//查看
                }else if (this.$route.query.info == 2) {
                    var page = Participation2;//审批列表
                }else if (this.$route.query.info == 0) {
                    var page = Participation0;//去审批
                }
                console.log(page);
                this.$http.post(this.global.lightningUrl+'/companyv1/customerManage/detail/getbyid',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(run=>{
                    if (run.body.errcode == 0) {
                        console.log(run);
                        console.log(123);
                        this.ruleFormPopup.name = run.body.result.customer.customerName,
                        this.customer = run.body.result.customer,
                            this.company = run.body.result.company,
                            this.invoice = run.body.result.invoice,
                            this.contract = run.body.result.contract,
                            this.account = run.body.result.account,
                            this.customerId = run.body.result.id;
                        console.log(this.customerId);

                        //table2
                        if (run.body.result.company != null) {

                            this.ruleForm = run.body.result.company;

                            if (run.body.result.company.isQuoted == '1'){
                                this.ruleForm.isQuoted = '上市'
                            } else {
                                this.ruleForm.isQuoted = '未上市'
                            }
                            console.log(run.body.result.company.businessLicensesQS);
                            for(var i in run.body.result.company.businessLicensesQS){
                                this.fileList2.push({'url':run.body.result.company.businessLicensesQS[i].url,'name':run.body.result.company.businessLicensesQS[i].name})
                            };
                        }

                        //table1
                        if (run.body.result.customer != null) {
                            this.ruleForm2 = run.body.result.customer;
                            console.log(this.projectList);
                            //销售专员
                            this.saleName1 = run.body.result.customer.saleName;
                            this.ruleForm2.cphone = run.body.result.customer.salePhone;

                            this.saleName3 = run.body.result.customer.resourceClassification;
                            if(run.body.result.customer.resourceClassification == 'one'){
                                this.saleName3 = '一手货源'
                            }else if (run.body.result.customer.resourceClassification == 'two') {
                                this.saleName3 = '二手货源'
                            }else {
                                this.saleName3 = '三手货源'
                            }
                            //运营专员
                            this.saleName2 = run.body.result.customer.projectName;
                            this.ruleForm2.name = run.body.result.customer.projectPhone;
                            //客户主要货物类型
                            this.goodsTypestr = run.body.result.customer.goodsType;
                            this.goodsTypestr1 = this.goodsTypestr.slice(1, -1);
                            // this.ruleForm2.goodsType = this.goodsTypestr1.split(", ");
                            //客户主要货物类型
                            this.consigneeTypestr = run.body.result.customer.consigneeType;
                            this.consigneeType1 = this.consigneeTypestr.slice(1, -1);
                            // this.ruleForm2.consigneeType = this.consigneeType1.split(", ");
                        }

                        //table3
                        if (run.body.result.invoice != null) {
                            this.ruleForm3 = run.body.result.invoice;
                            //发票内容
                            this.ruleForm3.invoiceContent = run.body.result.invoice.invoiceContent;
                            //开户银行
                            this.openingBank = run.body.result.invoice.openingBank;
                            //纳税人识别码
                            this.taxpayerIdentifNum = run.body.result.invoice.taxpayerIdentifNum;
                            //账号
                            this.account = run.body.result.invoice.account;
                            //备注
                            this.remark = run.body.result.invoice.remark;
                            //是否开发票
                            this.ruleForm3.needInvoice = run.body.result.invoice.isInvoice;
                            this.IsDisabled = run.body.result.invoice.isInvoice;
                        }

                        //Table4
                        if (run.body.result.contract != null) {
                            this.contract.isArchived = run.body.result.contract.isArchived;
                            this.contract = run.body.result.contract;
                            this.isVisible = run.body.result.contract.isVisible;
                            //合同归档日期
                            this.archivedDate = run.body.result.contract.archivedDate;
                            console.log(this.archivedDate);
                            console.log(this.contract);
                            //上传电子合同
                            for(var i in run.body.result.contract.electricCopyQS){
                                this.fileListContract.push({'url':run.body.result.contract.electricCopyQS[i].url,'name':run.body.result.contract.electricCopyQS[i].name});
                            }
                            //上传客户信息表
                            for(var i in run.body.result.contract.customerInfoQS){
                                this.fileListCustomerInfo.push({'url':run.body.result.contract.customerInfoQS[i].url,'name':run.body.result.contract.customerInfoQS[i].name});
                            }
                            //合同编号
                            this.contract.id = run.body.result.contract.id;
                            //合同起止日期
                            var fileDate = run.body.result.contract.beginDate;
                            var endDate = run.body.result.contract.endDate;
                            this.value12 = [fileDate, endDate];
                            //违约金
                            this.contract.percentageOfCharge = run.body.result.contract.percentageOfCharge;
                            //催收期
                            this.collection = run.body.result.contract.deadlineForNoitfy;
                            //结算方式
                            this.contract.billCycle = run.body.result.contract.billCycle;
                            //司机结算账期
                            this.contract.driverBillCycle = run.body.result.contract.driverBillCycle;
                            //承诺期
                            this.commitment1 = run.body.result.contract.deadlineForBill;
                            //保险信息
                            if (run.body.result.contract.insuranceInformation == '畅心保高价值货物险'){
                                this.insuranceInformation = true
                            }else{
                                this.insuranceInformation = false
                            }
                            //计价模板
                            console.log( run.body.result.contract.billArea);
                            if  (run.body.result.contract.billArea != undefined){
                                this.contract.billArea = run.body.result.contract.billArea;
                                this.contract.billWay = run.body.result.contract.billWay;
                            }
                            this.judge();
                            if (run.body.result.contract.areaPrice != undefined){
                                this.areaPrice = run.body.result.contract.areaPrice;
                                for (var i in run.body.result.contract.areaPrice){
                                    this.judgingModel.push(run.body.result.contract.areaPrice[i].priceParams);
                                }
                            }
                        }

                        //table5
                        if (run.body.result.account != null) {
                            this.settings.customerNameEn = run.body.result.account.username;
                            this.settings.phone = run.body.result.account.telephone;
                            console.log (run.body.result.account.permission);
                            console.log(756);
                            //运营大厅
                            this.permissions.settingsradio  = run.body.result.account.permission.transportLobby;
                            //发布用车
                            this.permissions.settingsradio1 = run.body.result.account.permission.releaseCar;
                            //智能调度
                            this.permissions.settingsradio2 =  run.body.result.account.permission.smartDispatch;
                            //统计报表
                            this.permissions.settingsradio3 =  run.body.result.account.permission.statisticsReport;
                            //选司机
                            this.permissions.settingsradio4 =  run.body.result.account.permission.chooseDriver;
                            //给指定司机发任务是否支持
                            this.permissions.settingsradio5 =  run.body.result.account.permission.assignDriverTask;
                            //第三方订单
                            this.permissions.settingsradio6 =  run.body.result.account.permission.thirdPartyOrder;
                        }
                    }
                })
            },5);

        },
        watch: {
            saleName1: function(curVal,oldVal){
                console.log(curVal,oldVal);
                for(var i in this.saleList) {
                    if (curVal == this.saleList[i].id) {
                        this.ruleForm2.cphone = this.saleList[i].cphone;
                    }
                }
            },
            saleName2:function(curVal,oldVal){
                console.log(curVal,oldVal);
                for(var i in this.projectList) {
                    if (curVal == this.projectList[i].id) {
                        this.ruleForm2.companyFname = this.projectList[i].cphone;
                    }
                }
            },
        },
        methods: {
            bb(obj){
                console.log('-----------------------------------------------------------------------')
                console.log(obj);
            },
            handleItemChange(val) {
                console.log(val);
                // this.province = CodeToText[val[0]];
                // this.city = CodeToText[val[1]];
                // this.countys = CodeToText[val[2]];
                console.log(val[val.length - 2]);
                console.log(this.options2);
                for (let i in this.options2) {
                    if  (val[val.length - 2] == this.options2[i].value){
                        console.log(this.options2[i].label);
                        this.province = this.options2[i].label;
                        for(let j in this.options2[i].children){
                            if  (val[val.length - 1] == this.options2[i].children[j].value){
                                console.log(this.options2[i].children[j].label);
                                this.city = this.options2[i].children[j].label;
                            }
                        }
                    }
                }
            },
            //车型
            handleClick(tab) {
                console.log(tab.name);
                this.requestCarType(tab.name);
            },
            requestCarType(types){
                let car = JSON.stringify({
                    type : types
                });
                console.log(car);

                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/vehicle_type',car,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res.data);
                    this.cars = res.data.result;
                    console.log(this.cars)
                })
                    .catch( (error) => {
                        console.log(error);
                    });
            },
            judge(){
                if (this.contract.billArea == 'yes' && this.contract.billWay == 'BK'){
                    this.state = 11
                }else if (this.contract.billArea == 'yes'  && this.contract.billWay == "BV") {
                    this.state = 12
                }else if (this.contract.billArea == 'yes' && this.contract.billWay == "BP"){
                    this.state = 13
                } else if (this.contract.billArea == 'yes' && this.contract.billWay == "BT"){
                    this.state = 14
                }else if (this.contract.billArea == 'yes' && this.contract.billWay == "BH"){
                    this.state = 15
                }else if (this.contract.billArea == 'no' && this.contract.billWay == "BK"){
                    this.state = 21
                }else if (this.contract.billArea == 'no' && this.contract.billWay == "BV"){
                    this.state = 22
                } else if (this.contract.billArea == 'no' && this.contract.billWay == "BP"){
                    this.state = 23
                } else if (this.contract.billArea == 'no' && this.contract.billWay == "BT"){
                    this.state = 24
                }else if (this.contract.billArea == 'no' && this.contract.billWay == "BH"){
                    this.state = 25
                }
            },
            //编辑窗口的通过按钮
            adopt(ruleFormPopup){
                this.$refs[ruleFormPopup].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.global.lightningUrl+'/companyv1/customerManage/approve',JSON.stringify({
                            'token':this.token,
                            'id':this.Final,
                            'opinion':this.ruleFormPopup.desc,
                            'state':'accepted',
                        })).then(run=> {
                            console.log(run);
                            if(run.body.errcode == 0){
                                this.$message({
                                    message: '审批通过',
                                    type: 'success'
                                });
                                this.dialogVisiblesPopup = false;
                                this.$router.push({path:'/NewCustomerApprovalRecord'});
                            }else {
                                this.$message({
                                    showClose: true,
                                    message: run.body.message,
                                    type: 'error'
                                });
                                return false
                            }
                        });
                    }
                });
            },
            //编辑窗口的退回按钮
            returns(ruleFormPopup){
                this.$refs[ruleFormPopup].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.global.lightningUrl+'/companyv1/customerManage/approve',JSON.stringify({
                            'token':this.token,
                            'id':this.Final,
                            'opinion':this.ruleFormPopup.desc,
                            'state':'rejected',
                        })).then(run=> {
                            console.log(run);
                            if(run.body.errcode == 0){
                                this.$message({
                                    message: '退回成功',
                                    type: 'warning'
                                });
                            }
                            this.dialogVisiblesPopup = false;
                            this.$router.push({path:'/NewCustomerApprovalRecord'});
                        });
                    }
                });
            },
            //路由跳转的标识
            Identification(){
                console.log(this.$route.query.info);
            },
            //点击审批提交
            partition(e){
                e.stopPropagation();
                this.dialogVisiblesPopup = true
            },
            q2(e){
                this.file = e.target.files[0];
                console.log(this.file)
            },
            //table3
            //table3是否开发票
            clickitem (e) {
                this.IsDisabled = e;
            },
            //点击查看图片的详情
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //点击查看下载电子合同
            handlePictureCardPreviewContract(file) {
                var fileName = file.name.substring(file.name.lastIndexOf("."));
                if ((fileName != '.jpg') && (fileName != '.png')){
                    window.location.href = file.url;
                }else {
                    var a = document.createElement('a');
                    a.href = file.url;
                    a.target = '_blank';
                    a.id='exppub';
                    document.body.appendChild(a);
                    var alink = document.getElementById('exppub');
                    alink.click();
                    alink.parentNode.removeChild(a);
                }
            },
            //点击查看客户信息表
            ViewCustomerInformationTable(file) {
                console.log(file);
                var fileName = file.name.substring(file.name.lastIndexOf("."));
                if ((fileName != '.jpg') && (fileName != '.png')){
                    window.location.href = file.url;
                }else {
                    var a = document.createElement('a');
                    a.href = file.url;
                    a.target = '_blank';
                    a.id='exppub';
                    document.body.appendChild(a);
                    var alink = document.getElementById('exppub');
                    alink.click();
                    alink.parentNode.removeChild(a);
                }
            },
            //Table1 下拉省市联动
            choseProvince1(){
                this.ProvincesCities1 = [];
                for(var i in this.arr){
                    if(this.ruleForm.province == i){
                        for(var j in this.arr[i]){
                            this.ProvincesCities1.push(j);
                        }
                    }
                }
            },
            // 提交审核
            present(){

            },
            // 提交审核的取消
            cancel(){
                this.dialogVisible = false;

                this.$router.push({path:'/NewCustomerApprovalRecord'})
            },
            //Table2 下拉省市联动
            choseProvince2(){
                this.ProvincesCities2 = [];
                for(var i in this.arr){
                    if(this.ruleForm2.province == i){
                        for(var j in this.arr[i]){
                            this.ProvincesCities2.push(j);
                        }
                    }
                };
            },
        },
    }

</script>

<style lang="scss">
    .ViewTheDetails{
        width:100%;
        .nav{
            background: white;
            width:100%;
            margin-top:20px;
            .el-tabs__nav-scroll {
                border-bottom: 2px solid white;
            }
            .el-tabs__nav {
                height: 55px;
                .el-tabs__item {
                    height: 55px;
                    line-height: 55px;
                    background: white;
                    border-top: 3px solid transparent;
                    padding:0 5px 0 15px;
                }
                .el-tabs__active-bar{
                    background: white;
                }
                .is-active {
                    border-top-color: #337df6;
                    border-bottom: 2px solid transparent;
                }
            }
            .Tab1{
                width:100%;
                height:auto;
                .center_top{
                    margin-top:20px;
                    .title{
                        color:white;
                        width:100%;
                        line-height:50px;
                        background: #6d6d72;
                    }
                    .center{
                        width:50%;
                        margin:15px 0;
                        .q1{
                            .el-input{
                                width:50%;
                            }
                        }
                    }
                }
                .center_bottom{
                    margin-top:20px;
                    .title{
                        color:white;
                        width:100%;
                        line-height:50px;
                        background: #6d6d72;
                    }
                    .center{
                        width:100%;
                        margin:15px 0;
                        .q1{
                            overflow: hidden;
                            .el-input{
                                width:50%;
                            }
                        }
                    }
                }
                .btn{
                    overflow: hidden;
                    margin:20px 0;
                    width:100%;
                    text-align: center;
                }
            }
            .Tab2 {
                width: 100%;
                height: auto;
                .center_top {
                    margin-top: 20px;
                    .title {
                        color: white;
                        width: 100%;
                        line-height: 50px;
                        background: #6d6d72;
                    }
                    .center {
                        padding-top:20px;
                        width: 70%;
                        .commissionRatio{
                            width:8%;
                        }
                    }
                }
                .btn{
                    overflow: hidden;
                    padding:50px 0;
                    width:100%;
                    text-align: center;
                }
            }
            .Tab3{
                width:100%;
                height:auto;
                .title {
                    color:white;
                    width: 100%;
                    line-height: 50px;
                    background: #6d6d72;
                    margin:20px 0;
                }
                .center_top {
                    margin-top: 20px;
                    width:50%;
                }
                .btn{
                    overflow: hidden;
                    padding:50px 0;
                    width:100%;
                    text-align: center;
                }
            }
            .Tab4{
                width:100%;
                height:auto;
                .el-input{
                    width: 50%;
                }
                .el-form-item__content{
                    width: 50%;
                }
                .el-textarea{
                    width: 50%;
                }
                .center_top {
                    margin-top: 20px;
                    .title {
                        color:white;
                        width: 100%;
                        line-height: 50px;
                        background: #6d6d72;
                    }

                    ul {
                        overflow: hidden;
                        li {
                            min-height: 50px;
                            width: 50%;
                            margin: 20px 0;
                            overflow: hidden;
                            i{
                                float: left;
                                line-height:50px;
                                color:red;
                                margin-right:20px;

                            }
                            span{
                                line-height:50px;
                                float: left;
                            }
                            .sp2{
                                margin-left:20px;
                                float: left;
                                width:37%;
                            }
                        }
                    }
                }
                .btn{
                    overflow: hidden;
                    padding:50px 0;
                    width:100%;
                    text-align: center;
                }
            }
            .Tab5{

                width:100%;
                height:auto;
                .el-form{
                    margin-top:  20px;
                }
                .el-input{
                    width: 50%;
                }
                .center_top {
                    margin-top: 20px;
                    .title {
                        color:white;
                        width: 100%;
                        line-height: 50px;
                        background: #6d6d72;
                    }
                    ul {
                        width: 100%;
                        overflow: hidden;
                        li {
                            min-height: 50px;
                            width: 100%;
                            margin: 20px 0;
                            overflow: hidden;
                            i{
                                float: left;
                                line-height:50px;
                                color:red;
                                margin-right:20px;
                            }
                            span{
                                line-height:50px;
                                float: left;
                            }
                            .sp2{
                                margin-left:20px;
                                float: left;
                            }
                        }
                    }
                }
                .center_bottom{
                    margin-top: 20px;
                    .title {
                        color:white;
                        width: 100%;
                        line-height: 50px;
                        background: #6d6d72;
                    }
                    ul{
                        width: 100%;
                        overflow: hidden;
                        li {
                            min-height: 50px;
                            width: 100%;
                            margin: 20px 0;
                            overflow: hidden;
                        }
                    }
                }
                .btn{
                    overflow: hidden;
                    padding:50px 0;
                    width:100%;
                    text-align: center;
                }
            }
        }
    }
</style>