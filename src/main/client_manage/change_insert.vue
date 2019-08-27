<template>
    <div class="main change_insert" >
        <div class="header">
            当前位置：CRM管理 > 客户管理 > {{this.changes}}
            <el-button type="primary" style="float: right;margin:0 8% 0 0;" @click="Resubmit()" v-if="this.$route.query.info == 0 && this.type == 'rejected'?true:false">重新提交</el-button>
        </div>
        <div class="nav">
            <el-tabs v-model="activeName">
                <el-tab-pane label="合作信息" name="second" :disabled = 'DisableTab1'>
                    <div class="Tab2">
                        <div class="center_top">
                            <div class="title"><p>合作信息</p></div>
                            <div class="center">
                                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="15%" class="demo-ruleForm">
                                    <el-form-item label="项目名称：" prop="customerName"  class="q2">
                                        <el-input v-model="ruleForm2.customerName" @change="OnlyCheck()"></el-input>
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

                                    <el-form-item label="客户所属管理区：" prop="filialeName" required>
                                        <el-select v-model="ruleForm2.filialeName" placeholder="客户所属管理区" :disabled="aa">
                                            <el-option  :label="areaList.filialeName" :value="areaList.filialeId"></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="销售专员："  prop="" required>
                                        <el-select v-model="saleName1" placeholder="销售专员" >
                                            <el-option v-for="i in saleList" :label="i.name"  :value="i.name" ></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="客户来源："  prop="customerSource">
                                        <el-select v-model="ruleForm2.customerSource " placeholder="请选择客户来源" >
                                            <el-option label="自拓" value="自拓"></el-option>
                                            <el-option label="接手" value="接手"></el-option>
                                            <el-option label="商机转化" value="商机转化"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="联系电话："  class="q2" required>
                                        <el-input v-model="ruleForm2.phone" :disabled="true"></el-input>
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

                                        <el-select v-model="saleName3" placeholder="货源分类">
                                            <el-option label="一手货源" value="one"></el-option>
                                            <el-option label="二手货源" value="two"></el-option>
                                            <el-option label="三手货源" value="three"></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="业务类型："  prop="businessType" required>

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
                                <el-button type="primary" @click="submitForm2('ruleForm2')">保存</el-button>
                                <el-button type="primary" @click="CooperativeInformation('ruleForm2')">下一步</el-button>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="公司信息" name="first" :disabled = 'DisableTab2'>
                    <div class="Tab1">
                        <div class="center_top">
                            <div class="title">公司主体信息</div>
                            <div class="center">
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="30%" class="demo-ruleForm">
                                    <div style="position: relative;" class="search">
                                        <el-form-item label="公司全称(托运人) ：" prop="name" class="q2 po">
                                            <el-input v-model="ruleForm.name" @input="Lose()"></el-input>
                                        </el-form-item>
                                        <div style="width:70%;margin:0 0 1% 30%;">
                                            <ul style="margin:0 1%;background:#F2F6FC;" >
                                                <li v-for="i in SearchList" @click="SearchClick($event)" style="cursor: pointer;
                                                color:#606266;
                                                font-size:15px;
                                                margin:0 7px;
                                                line-height: 30px; ">{{i.name}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <el-form-item label="注册号/统一社会信用代码 ："  prop="number" class="q2">
                                        <el-input v-model="ruleForm.number"></el-input>
                                    </el-form-item>
                                    <el-form-item label="上市情况：" prop="isQuoted">
                                        <el-select v-model="ruleForm.isQuoted" placeholder="上市情况">
                                            <el-option label="上市" value="1"></el-option>
                                            <el-option label="未上市" value="0"></el-option>
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
                                                :drang="true"
                                                :limit='10'
                                                :file-list="fileList2"
                                                :on-exceed='uploadOverrun'
                                                :auto-upload="false"
                                                :on-preview="handlePictureCardPreview"
                                                :on-change="insert"
                                                >
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <div class="el-upload__tip">请上传就jpg、png格式文件，每张不大于10M，最多上传10张</div>
                                        <el-button type="primary" @click="upload()">点击上传</el-button>
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
                            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                            <el-button type="primary" @click="CompanyInformation('ruleForm')">下一步</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="发票信息" name="thirds" :disabled = 'DisableTab3'>
                    <div class="Tab3">
                        <div class="title"><p>发票信息</p></div>
                        <div class="center_top">
                            <el-form :model="ruleForm3" :rules="rules3" ref="ruleForm3"  label-width="150px" class="demo-ruleForm">
                                <el-form-item label="是否开发票 ：" prop="isInvoice">
                                    <el-radio-group v-model="ruleForm3.isInvoice">
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
                                <el-form-item label="税率 ：" prop="taxRate" v-if="this.IsDisabled == '1'?true:false ">
                                    <el-select v-model="ruleForm3.taxRate" placeholder="请选择税率">
                                        <el-option label="0.1" value="0.1"></el-option>
                                        <el-option label="0.2" value="0.2"></el-option>
                                        <el-option label="0.06" value="0.06"></el-option>
                                        <el-option label="0.09" value="0.09"></el-option>
                                        <!--<el-option label="无税率" value="0" selected="selected"></el-option>-->
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="发票内容 ：" prop="invoiceContent"  v-if="this.IsDisabled == '1'?true:false ">
                                    <el-select v-model="ruleForm3.invoiceContent" placeholder="请选择发票内容" >
                                        <el-option label="*运输服务*运费" value="*运输服务*运费"></el-option>
                                        <el-option label="*经济代理服务*国内货物运输代理服务" value="*经济代理服务*国内货物运输代理服务"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="银行卡     ：" prop="account"  v-if="this.IsDisabled == '1'?true:false ">
                                    <el-input v-model="ruleForm3.account"></el-input>
                                </el-form-item>
                                <el-form-item label="开户行 ：" prop="openingBank"  v-if="this.IsDisabled == '1'?true:false ">
                                    <el-input v-model="ruleForm3.openingBank"></el-input>
                                </el-form-item>

                                <el-form-item label="注册地址 ：" prop="registeredAddress" v-if="this.IsDisabled == '1'?true:false" :rules="ruleForm3.makeType == '增值税专用发票'?rules3.registeredAddress:[{ required: false, message: '请输入注册地址', trigger: 'blur' },{pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\d){2,50}$/,  message: '填写不合规，仅能包含简体中文、英文字母，数字，长度2-50字符', trigger: 'blur' }]">
                                    <el-input v-model="ruleForm3.registeredAddress"></el-input>
                                </el-form-item>

                                <el-form-item label="电话 ：" prop="phone" :rules="ruleForm3.makeType == '增值税专用发票'?rules3.phone:[{ required: false, message: '请输入电话', trigger: 'blur' },{pattern: /^((0\d{2,3}-?\d{7,8})|(1[3-9]\d{9})|(400-?[0-9]{4}-?[0-9]{3})|(800-?[0-9]{4}-?[0-9]{3}))$/, message: '电话格式不正确', trigger: 'blur' }]"  v-if="this.IsDisabled == '1'?true:false ">
                                    <el-input v-model="ruleForm3.phone"></el-input>
                                </el-form-item>


                                <el-form-item label="开票单位 ：" prop="Company" v-if="this.IsDisabled == '1'?true:false ">
                                    <el-select v-model="ruleForm3.makeSite" placeholder="请选择开票单位" >
                                        <el-option label="闪电狗科技" value="闪电狗科技"></el-option>
                                        <el-option label="全达货运" value="全达货运"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="开票盖章类型：" prop="chapterType" v-if="this.IsDisabled == '1'?true:false ">
                                    <el-select v-model="ruleForm3.chapterType" placeholder="请选择盖章类型" >
                                        <el-option label="公章" value="公章"></el-option>
                                        <el-option label="财务章" value="财务章"></el-option>
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
                            <el-button type="primary" @click="third('ruleForm3')">保存</el-button>
                            <el-button type="primary" @click="InvoiceInformation('ruleForm3')">下一步</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="合同信息" name="four" :disabled = 'DisableTab4'>
                    <div class="Tab4">
                        <div class="center_top">
                            <div class="title"><p>合同信息</p></div>
                            <el-form ref="contract" :rules="rules4" :model="contract" label-width="150px" class="demo-ruleForm">
                                <el-form-item label="合同已归档" prop="isArchived">
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
                                <el-form-item label="合同编号" prop="id" :rules="ruleForm2.type == 'InterimCustomer'&&contract.isArchived == '0'? rules4.id:[{ required: true, message: '请输入合同编号', trigger: 'blur' },{pattern: /^\w+$/,  message: '合同编号不合规，仅能包含英文字母、数字，长度12个字符', trigger: 'blur' }]" >
                                    <el-input v-model="contract.id" @change="contractid()"></el-input>
                                    <span style="color:red;font-size:13px;">城市代码+X/Z+J/Y+年+月+3位流水 例:010XY1808001</span>
                                </el-form-item>
                                <el-form-item label="合同起止日期" :required="ruleForm2.type == 'InterimCustomer' && contract.isArchived == '0' ? false:true">
                                    <el-date-picker
                                            v-model="value12"
                                            type="daterange"
                                            value-format="timestamp"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="违约金比例" prop="percentageOfCharge">
                                    <el-input v-model="contract.percentageOfCharge" :disabled = modify></el-input>
                                </el-form-item>


                                <!--<el-form-item label="客户结算方式" prop="">-->
                                    <!--<el-radio-group v-model="ruleForm.">-->
                                        <!--<el-radio label="billCycleType"></el-radio>-->
                                        <!--<el-radio label="driverBillCycleType"></el-radio>-->
                                    <!--</el-radio-group>-->
                                <!--</el-form-item>-->

                                <div style="position:relative;">
                                    <el-form-item label="客户结算周期" prop="billCycle" style="width:50%;">
                                        <el-row>
                                            <el-col :span="20">
                                                <el-select v-model="contract.billCycleType" placeholder="请选择" style="padding:0 0 20px 27px;">
                                                    <el-option label="自然日" value="M"></el-option>
                                                    <el-option label="自然月" value="T"></el-option>
                                                </el-select>
                                            </el-col>
                                            <el-col :span="10">
                                                <span v-if="contract.billCycleType == 'T'">M+</span>
                                                <span v-if="contract.billCycleType == 'M'">N+</span>
                                                <el-input v-model="contract.billCycle" @change="Customer"></el-input>
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
                                                <el-select v-model="contract.driverBillCycleType" placeholder="请选择" style="padding:0 0 20px 27px;">
                                                    <el-option label="自然日" value="M" v-if="contract.billCycleType == 'M'"></el-option>
                                                    <el-option label="自然月" value="T" v-if="contract.billCycleType == 'T'"></el-option>
                                                    <el-option label="背靠背" value="B"></el-option>
                                                </el-select>
                                            </el-col>
                                            <el-col :span="10">
                                                <span v-if="contract.driverBillCycleType == 'T'">M+</span>
                                                <span v-if="contract.driverBillCycleType == 'M'">N+</span>
                                                <el-input v-if="contract.driverBillCycleType == 'B'?false:true" ref="mark" v-model="contract.driverBillCycle" @change="Settlement"></el-input>
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
                                    <el-select v-model="collection" placeholder="请选择催收期" :disabled = true>
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
                                            :on-exceed='uploadOverrunContract'
                                            action="javascript:;"
                                            :limit='10'
                                            :on-preview="handlePictureCardPreviewContract"
                                            :on-remove="handleRemoveContract"
                                            :file-list="fileListContract"
                                            :on-change="Contracts"
                                            :auto-upload="false">
                                        <el-button slot="trigger" size="small" type="primary">选取电子合同</el-button>
                                        <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadFile()">统一上传电子合同</el-button>
                                        <div slot="tip" class="el-upload__tip">合同上传，支持jpg、png、word、excel、wps、zip、pdf，支持下载查看最多添加10份</div>
                                    </el-upload>
                                </el-form-item>
                                <!--<el-form-item label="保险信息">-->
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
                                    <el-button size="mini" type="success" @click="AddDetail">添加价格明细</el-button>

                                </el-form-item>
                                <!--回显子组件表格-->
                                <div class="table" style="margin:10px 50px;">
                                    <tables :dataInfos = 'state' :judgingModel = 'judgingModel' :areaPrice = 'areaPrice'></tables>
                                </div>



                                <el-form-item label="上传客户信息表" required>
                                    <el-upload
                                            class="upload-demo"
                                            ref="upload"
                                            :drang="true"
                                            :on-exceed='uploadOverrunInformationTable'
                                            action="javascript:;"
                                            :limit='10'
                                            :on-preview="ViewCustomerInformationTable"
                                            :on-remove="handleRemoveInformationTable"
                                            :file-list="fileListCustomerInfo"
                                            :on-change="ClickUpload"
                                            :auto-upload="false">
                                        <el-button slot="trigger" size="small" type="primary">选取客户信息表</el-button>
                                        <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadFileInfo()">统一上传客户信息表</el-button>
                                        <div slot="tip" class="el-upload__tip">信息表上传，支持jpg、png、word、excel、wps、zip、pdf，支持下载查看最多添加10份</div>
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
                            <el-button type="primary" @click="submitForm4('contract')">保存提交</el-button>
                            <!--<el-button type="primary" @click="ContractInformation('contract')">下一步</el-button>-->
                        </div>
                    </div>
                </el-tab-pane>

                <!-- 添加价格明细模态框显示 -->
                <div class="Modality">
                    <el-dialog title="合同信息>添加价格明细" :visible.sync="dialogFormVisible" width="80%">
                        <el-form :model="form" :rules="rulesShow" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                            <el-form-item  label="选择区域:" prop="cityName" v-if="contract.billArea == 'yes' ? true : false">
                                <el-cascader
                                        change-on-select
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

                            <div v-if="state == 15 || state == 25 ? true : false" >
                                <span style="padding:0 0 0 100px;line-height: 40px; float:left;color:red;">*</span>
                                <span style="padding:0 40px 0 0;line-height: 40px; float:left;">小时:</span>
                                <div  v-if="state == 15 || state == 25 ? true : false" required style="float:left;">
                                    <el-input v-model.trim="form.FourHours" placeholder=" 元/4小时" style="width:33%;float: left" onkeyup="if( ! /^\d+\.?\d{0,2}$/.test(this.value)){console.log('只能输入数字，小数点后只能保留两位');this.value='';}" type="number"></el-input>
                                    <el-input v-model.trim="form.NineHours" placeholder=" 元/9小时" style="width:33%;float: left" onkeyup="if( ! /^\d+\.?\d{0,2}$/.test(this.value)){console.log('只能输入数字，小数点后只能保留两位');this.value='';}" type="number"></el-input>
                                    <el-input v-model.trim="form.ThirteenHours" placeholder=" 元/13小时" style="width:33%;float: left" onkeyup="if( ! /^\d+\.?\d{0,2}$/.test(this.value)){console.log('只能输入数字，小数点后只能保留两位');this.value='';}" type="number"></el-input>
                                </div>
                            </div>



                            <el-form-item  label="超出部分:" prop="" v-if="state == 11 || state == 21 ? true : false" >
                                <div>
                                    <el-checkbox-group v-model="form.kilometre" style="width:10%;float: left" >
                                        <el-checkbox label="公里" name="" ></el-checkbox>
                                    </el-checkbox-group>
                                    <el-form-item label="起步价内公里数：" prop="" style="width:40%;float: left" required  v-if="this.form.kilometre == true ?  true : false">
                                        <el-input v-model.trim="form.kilometreNum" placeholder="公里" onkeyup="if( ! /^\d+\.?\d{0,2}$/.test(this.value)){console.log('只能输入数字，小数点后只能保留两位');this.value='';}" type="number"></el-input>
                                    </el-form-item>
                                    <el-form-item label="超里程数单价：" prop="" style="width:40%;float: left" required v-if="this.form.kilometre == true ?  true : false">
                                        <el-input v-model.trim="form.mileage" placeholder="元/公里" onkeyup="if( ! /^\d+\.?\d{0,2}$/.test(this.value)){console.log('只能输入数字，小数点后只能保留两位');this.value='';}" type="number"></el-input>
                                    </el-form-item>
                                </div>
                                <div style="clear: both" >
                                    <el-checkbox-group v-model="form.PointPosition" style="width:10%;float: left">
                                        <el-checkbox label="点位" name=""></el-checkbox>
                                    </el-checkbox-group>
                                    <el-form-item label="起步价内点位数：" prop="" style="width:40%;float: left" required v-if="this.form.PointPosition == true ?  true : false" >
                                        <el-input v-model.trim="form.StartingPrice" placeholder="点位" onkeyup="if( ! /^\d+\.?\d{0,2}$/.test(this.value)){console.log('只能输入数字，小数点后只能保留两位');this.value='';}" type="number"></el-input>
                                    </el-form-item>
                                    <el-form-item label="超点位单价：" prop="" style="width:40%;float: left" required v-if="this.form.PointPosition == true ?  true : false" >
                                        <el-input v-model.trim="form.UnitPrice" placeholder="元/点位" onkeyup="if( ! /^\d+\.?\d{0,2}$/.test(this.value)){console.log('只能输入数字，小数点后只能保留两位');this.value='';}" type="number"></el-input>
                                    </el-form-item>
                                </div>
                                <div style="clear: both">
                                    <el-checkbox-group v-model="form.weight" style="width:10%;float: left" >
                                        <el-checkbox label="重量" name=""></el-checkbox>
                                    </el-checkbox-group>
                                    <el-form-item label="起步价内重量：" prop="" style="width:40%;float: left" required v-if="this.form.weight == true ?  true : false">
                                        <el-input v-model="form.startWeight" placeholder="千克" onkeyup="if( ! /^\d+\.?\d{0,2}$/.test(this.value)){console.log('只能输入数字，小数点后只能保留两位');this.value='';}" type="number"></el-input>
                                    </el-form-item>
                                    <el-form-item label="超重量单价：" prop="" style="width:40%;float: left" required v-if="this.form.weight == true ?  true : false">
                                        <el-input v-model="form.ExceedWeight" placeholder="元/千克" onkeyup="if( ! /^\d+\.?\d{0,2}$/.test(this.value)){console.log('只能输入数字，小数点后只能保留两位');this.value='';}" type="number"></el-input>
                                    </el-form-item>
                                </div>
                                <div style="clear: both">
                                    <el-checkbox-group v-model="form.volume" style="width:10%;float: left">
                                        <el-checkbox label="体积" name=""></el-checkbox>
                                    </el-checkbox-group>
                                    <el-form-item label="起步价内体积：" prop="" style="width:40%;float: left" required  v-if="this.form.volume == true ?  true : false">
                                        <el-input v-model="form.startVolume" placeholder="方" onkeyup="if( ! /^\d+\.?\d{0,2}$/.test(this.value)){console.log('只能输入数字，小数点后只能保留两位');this.value='';}" type="number"></el-input>
                                    </el-form-item>
                                    <el-form-item label="超体积单价：" prop="" style="width:40%;float: left" required  v-if="this.form.volume == true ?  true : false">
                                        <el-input v-model="form.ExceedVolume" placeholder="元/方" onkeyup="if( ! /^\d+\.?\d{0,2}$/.test(this.value)){console.log('只能输入数字，小数点后只能保留两位');this.value='';}" type="number"></el-input>
                                    </el-form-item>
                                </div>
                                <div style="clear: both" >
                                    <el-checkbox-group v-model="form.ticket" style="width:10%;float: left">
                                        <el-checkbox label="票" name=""></el-checkbox>
                                    </el-checkbox-group>
                                    <el-form-item label="起步价内票数：" prop="" style="width:40%;float: left" required v-if="this.form.ticket == true ?  true : false">
                                        <el-input v-model="form.startTicket" placeholder="票" onkeyup="if( ! /^\d+\.?\d{0,2}$/.test(this.value)){console.log('只能输入数字，小数点后只能保留两位');this.value='';}" type="number"></el-input>
                                    </el-form-item>
                                    <el-form-item label="超量单价：" prop="" style="width:40%;float: left" required v-if="this.form.ticket == true ?  true : false">
                                        <el-input v-model="form.ExceedTicket" placeholder="元/票" onkeyup="if( ! /^\d+\.?\d{0,2}$/.test(this.value)){console.log('只能输入数字，小数点后只能保留两位');this.value='';}" type="number"></el-input>
                                    </el-form-item>
                                </div>
                            </el-form-item>
                            <!--回显子组件表格-->
                            <div style="margin:10px 30px;">
                                <tables :dataInfos = 'state' :judgingModel = 'judgingModel' :areaPrice = 'areaPrice' @aa="bb"></tables>
                            </div>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="submitForms('ruleForm')">保存并继续添加车型</el-button>
                            <el-button type="primary"  @click="closure('ruleForm')" >确定</el-button>
                        </div>
                    </el-dialog>
                </div>
                <!-- 添加价格明细模态框结束 -->

                <el-tab-pane label="闪电狗物流管理系统设置" name="system" :disabled = 'true'>
                    <div class="Tab5">
                        <div class="center_top">
                            <div class="title"><p>开通账户</p></div>
                            <el-form :model="settings" :rules="rules5"  ref="settings"  class="q1 demo-ruleForm" label-width="8%">
                                <el-form-item label="用户名 ：" prop="customerNameEn" class="q2">
                                    <el-input v-model="settings.customerNameEn"  placeholder="请输入内容" @change="UserNameOnly()"></el-input>
                                </el-form-item>
                                <span style="font-size:13px; color:#909399; margin:50px;">
                                    用户名设置规则：所属城市首字母+电话；例：北京分公司，客户电话 1342***8026，系统账号则设定为：bj1342***8026
                                </span>
                                <el-form-item label="手机号 ：" prop="phone" class="q2">
                                    <el-input v-model="settings.phone" placeholder="用于找回密码" @change="PhoneNumberOnly"></el-input>
                                </el-form-item>
                                <el-form-item  label="密码 ：" prop="pass2" required>
                                    <el-input type="password" v-model="settings.pass2" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码 ：" prop="checkPass2" required>
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
                            <el-button type="primary" @click="openfrom('settings')" >保存</el-button>
                            <el-button type="primary" @click="systemInformation('settings')" >提交</el-button>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
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
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.settings.pass2) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePass4 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    callback();
                }
            };
            return {
                radio: 1,
                business:[
                    {name:'城市配送',id:'1002996'},
                    {name:'干线普货运输',id:'1003997'},
                    {name:'农村配送',id:'1003998'},
                    {name:'集装箱运输',id:'1002998'},
                    {name:'其他',id:'1003999'}
                ],
                echoData:[],
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
                carModels:'',
                areaPrice:[],
                areaPrices:[],
                judgingModel:[],
                verificationCode:'',//验证码
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
                //table1项目名称唯一性
                UniqueCustomerName:'',
                errcode1:'',
                //合同编号
                ContractNumber:'',
                errcode4:'',
                //用户名唯一性
                UniqueUserName:'',
                errcode5:'',
                //电话号码
                TelephoneNumberUnique:'',
                errcode5Phone:'',

                Interactive:'',
                //变更页面的标识
                update:'',
                //2表搜索列表
                SearchList:[],
                SearchId:'',
                DisableTab1:false,
                DisableTab2:true,
                DisableTab3:true,
                DisableTab4:true,
                DisableTab5:true,

                type:'',
                //页面json
                customer:'',
                company:'',
                invoice:'',
                contract:'',
                account:'',
                //重新提交上面的文字信息
                changes:'',
                //table3的禁用介质
                IsDisabled:'',
                //上传图片
                dialogImageUrl:'',
                dialogVisible: false,
                dialogVisibles: false,
                dialogVisiblees:false,
                fileList2:[],
                fileList1:'',
                // fileListArr:[],
                picList:[],
                obj:{},
                companyPic:'',
                //上传合同
                dialogImageUrlContract: '',
                dialogVisibleContract: false,
                picListContract:[],
                objContract:{},
                fileListContract:[],
                fileLists:'',
                NonEmpty:'',
                customerId:'',
                isDisabled:false,
                //上传客户信息表
                dialogImageUrlContract: '',
                dialogVisibleContract: false,
                picListCustomerInfo:[],
                CustomerList:'',
                objContract:{},
                fileListCustomerInfo:[],
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
                //
                // areaList:'',
                //第一次加载的三个全局id
                companyId:'',
                userId:'',
                companyInfoId:'',
                sss:'',
                file:'',
                //上传的图片
                picture:'',
                saleList:'',
                shortname:'',
                dialogVisible: false,

                id:'',
                customerManagement:'',
                token:'',
                //Table1
                //省市
                ProvincesCities1:[],
                ruleForm: {
                    financeMoney:'',
                    financeScope:'',
                    isQuoted:'',
                    name: '',
                    number: '',
                    address: '',
                    contactor: '',
                    certifyStatus: '',
                    delivery: false,
                    remark: '',
                    servicePhone:'',
                    phone:'',
                    position:'',
                    province:'',
                    city:'',
                    shortName:'',
                    shortname:'',
                },
                //Table2、

                filialeId:'',
                saleAdminId:'',
                projectAdminId:'',
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
                    businessType:'1002996',//业务类型
                    customerSource :'',//客户来源
                    commissionRatio:'',
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
                    phone:'',
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
                rules: {
                    //table1
                    name: [
                        { required: true, message: '请输入公司全称', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\w){2,50}$/,  message: '公司全称不合规，仅能包含简体中文、英文字母、数字，长度2-50字符', trigger: 'blur' }
                    ],
                    number: [
                        { required: true, message: '请输入注册号/统一社会信用代码', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[0-9]|[\u4E00-\u9FA5]){2,50}$/ , message: '汉字、字母、数字或组合2~50个字符', trigger: 'blur' }
                    ],
                    isQuoted: [
                        { required: true, message: '请选择上市情况', trigger: 'change' }
                    ],
                    shortName: [
                        { required: false, message: '请选择融资金额', trigger: 'change' },
                    ],
                    certifyStatus:[
                        { required: true, message: '请选择融资能力', trigger: 'change' },
                    ],
                    address: [
                        { required: false, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^.{2,50}$/ , message: '汉字、字母、数字或组合2~50个字符', trigger: 'blur' }
                    ],
                    servicePhone: [
                        { required: false, message: '请输入正确的电话格式', trigger: 'blur' },
                        {pattern: /^((0\d{2,3}-?\d{7,8})|(1[3-9]\d{9})|(400-?[0-9]{4}-?[0-9]{3})|(800-?[0-9]{4}-?[0-9]{3}))$/ , message: '电话格式不正确', trigger: 'blur' }
                    ],
                    contactor: [
                        { required: false, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{2,10}$/,  message: '不能包含特殊字符不少于2个且不超过10个', trigger: 'blur' }
                    ],
                    phone: [
                        { required: false, message: '请输入正确的电话格式', trigger: 'blur' },
                        {pattern: /^((0\d{2,3}-?\d{7,8})|(1[3-9]\d{9})|(400-?[0-9]{4}-?[0-9]{3})|(800-?[0-9]{4}-?[0-9]{3}))$/ , message: '电话格式不正确', trigger: 'blur' }
                    ],
                    shortname: [
                        { required: false, message: '请输入正确的职位格式', trigger: 'blur' },
                        {pattern: /^([A-Za-z_]|[0-9]|[\u4E00-\u9FA5]){2,5}$/ , message: '联系人职位不合规，仅能包含简体中文、英文字母、数字，长度2-50字符 ', trigger: 'blur' }
                    ],
                    //公司简称
                    shortname: [
                        { required: false, message: '汉字、字母、数字或组合2~50个字符', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\w){2,50}$/ , message: '公司简称不合规，仅能包含简体中文、英文字母、数字，长度2-50字符', trigger: 'blur' }
                    ],
                    remark: [
                        { required: false, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,  message: '字数以达到200个上线', trigger: 'blur' }
                    ],
                },
                rules2:{
                    //table2
                    //业务类型
                    businessType:[
                        { required: true, message: '请选择业务类型', trigger: 'change' }
                    ],
                    //项目名称
                    customerName: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\w){2,50}$/,  message: '用户名不能少于2个字符或多于50个字符', trigger: 'blur' }
                    ],
                    //佣金比例
                    commissionRatio:[
                        { required: true, message: '请输入佣金比例', trigger: 'blur' },
                        {pattern: /^(([0-9]|[0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,  message: '格式不正确', trigger: 'blur' }
                    ],
                    //省份
                    city:[
                        { required: true, message: '请选择省份', trigger: 'change' }
                    ],
                    type:[
                        { required: true, message: '请选择客户所属管理区', trigger: 'change' }
                    ],
                    filialeName:[
                        { required: true, message: '请选择客户所属管理区', trigger: 'change' }
                    ],
                    customerSource :[
                        { required: true, message: '请选择项客户来源', trigger: 'change' }
                    ],
                    thirdLevelClassify:[
                        { required: true, message: '请选择三级分类', trigger: 'change' }
                    ],

                    phone:[
                        { required: true, message: '请输入正确的电话格式', trigger: 'blur' },
                        {pattern: /^((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8})$/ , message: '电话格式不正确', trigger: 'blur' }
                    ],

                    name:[
                        { required: true, message: '请输入正确的电话格式', trigger: 'blur' },
                        {pattern: /^((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8})$/ , message: '电话格式不正确', trigger: 'blur' }
                    ],
                    //客户主要货物类型
                    goodsType:[
                        {type: 'array',   required: true, message: '请选择货物类型', trigger: 'change' }
                    ],
                    //客户主要收货人类型
                    consigneeType:[
                        {type: 'array', required: true, message: '请选择收货人类型', trigger: 'change' },
                    ]
                },
                //table3
                // table3
                rules3:{
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
                    isInvoice: [
                        { required: true, message: '请填写是否开发票', trigger: 'change' }
                    ],
                    //开票类型
                    makeType:[
                        { required: true, message: '请填写开票类型', trigger: 'change' }
                    ],
                    //
                    taxRate:[
                        { required: true, message: '请填写税率', trigger: 'change' }
                    ],
                    //发票内容
                    invoiceContent:[
                        { required: true, message: '请填写发票内容', trigger: 'blur' },
                        {pattern: /^.{0,50}$/,  message: '格式不正确', trigger: 'blur' }
                    ],
                    //账号
                    account:[
                        { required: true, message: '请填写账号', trigger: 'blur' },
                        {pattern: /^[\d-]{5,50}$/,  message: '账号不合规，仅为数字，长度5-50字符  ', trigger: 'blur' }
                    ],
                    //开户行
                    openingBank:[
                        { required: true, message: '请填写开户行  ', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]){2,50}$/,  message: '填写不合规，仅能包含简体中文、英文字母，长度2-50字符', trigger: 'blur' }
                    ],
                    //注册地址
                    registeredAddress:[
                        { required: true, message: '请填写注册地址  ', trigger: 'blur' },
                        {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]|\d){2,50}$/,  message: '填写不合规，仅能包含简体中文、英文字母，数字，长度2-50字符', trigger: 'blur' }
                    ],
                    //电话
                    phone:[
                        { required: true,message: '请输入正确的电话格式', trigger: 'blur' },
                        {pattern: /^((0\d{2,3}-?\d{7,8})|(1[3-9]\d{9})|(400-?[0-9]{4}-?[0-9]{3})|(800-?[0-9]{4}-?[0-9]{3}))$/ , message: '电话格式不正确', trigger: 'blur' }
                    ],
                    //开票单位
                    makeSite:[
                        { required: true, message: '请填写开票单位', trigger: 'change' }
                    ],
                    //盖章类型
                    chapterType:[
                        { required: true, message: '请填写盖章类型', trigger: 'change' }
                    ],
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
                    remark:[
                        { required: true, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,  message: '不能包含特殊字符且不超过200个', trigger: 'blur' }
                    ]
                },
                rules4:{
                    //table4
                    //合同编号
                    id:[
                        { required: false, message: '请输入合同编号', trigger: 'blur' },
                        {pattern: /^\w+$/,  message: '合同编号不合规，仅能包含英文字母、数字，长度12个字符', trigger: 'blur' }
                    ],
                    //违约金比例
                    percentageOfCharge:[
                        { required: true, message: '请选择违约金比例', trigger: 'blur' },
                        {pattern: /^(([0-9]|[0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,  message: '格式不正确', trigger: 'blur' }
                    ],
                    billCycle:[
                        { required: true, message: '请填写客户结算周期', trigger: 'blur' },
                        {pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,  message: '格式不正确', trigger: 'blur' }
                    ],
                    driverBillCycle:[
                        { required: true, message: '司机结算周期应大于客户结算周期', trigger: 'blur' },
                        {pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,  message: '格式不正确', trigger: 'blur' }
                    ],
                    //客户邮箱
                    customerEmail:[
                        { required: true, message: '邮箱格式不正确', trigger: 'blur' },
                        {pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,  message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    commitment1:[
                        { required: true, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^[1-9]\d*$/,  message: '输入数字', trigger: 'blur' }
                    ],
                    qualityGuaranteeDeposit:[//质保金
                        { required: true, message: '质保金格式不正确', trigger: 'blur' },
                        {pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,  message: '请输入数字,小数点保留两位小数', trigger: 'blur' }
                    ],
                    remark:[
                        { required: false, message: '格式不正确', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,  message: '不能包含特殊字符且不超过200个', trigger: 'blur' }
                    ],
                    //变更说明
                    Explain:[
                        { required: true, message: '请输入变更说明', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{0,200}$/,  message: '不能包含特殊字符且不超过200个', trigger: 'blur' }
                    ],
                    //合同已归档
                    isArchived:[
                        { required: true, message: '请选择合同是否归档', trigger: 'change' }
                    ],
                    value:[
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    //是否分区计费
                    billArea:[
                        { required: true, message: '请选择是否分区计费', trigger: 'change' }
                    ],
                    //计价方式
                    billWay:[
                        { required: true, message: '请选择计价方式', trigger: 'change' }
                    ]
                },
                value12:'',
                ruleForm3:{
                    receiveName:'',//收件人姓名
                    receiveAddress:'',//收件人地址
                    receivePhone:'',//收件人电话
                    chapterType:'',//盖章类型
                    companyName:'',
                    taxpayerIdentifNum:'',
                    taxRate:'0.09',
                    invoiceContent:'',
                    account:'',
                    openingBank:'',
                    remark:'',
                    isInvoice:'',
                    makeType:'',
                    makeSite:"",//开票单位
                },
                value6: '',
                value7: '',
                //复选框
                checked: true,
                //单选按钮
                radio: '',
                activeName: 'second',
                input: '',
                options: [],
                value: '',
                arr:[],
                verify:'',
                settings:{
                    customerNameEn:'',
                    phone:'',
                    pass2:'',
                    checkPass2:'',
                },
                rules5:{
                    //用户名
                    customerNameEn:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { pattern: /^([A-Za-z]|[0-9]){2,20}$/,  message: '用户名不合规，仅能包含英文字母、数字，长度2-20字符', trigger: 'blur' },
                    ],
                    //手机号
                    phone:[
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { pattern: /^((0\d{2,3}-?\d{7,8})|(1[3-9]\d{9})|(400-?[0-9]{4}-?[0-9]{3})|(800-?[0-9]{4}-?[0-9]{3}))$/,  message: '手机号格式不合规，请输入11位手机号', trigger: 'blur' },
                        { validator: validatePass4, trigger: 'blur' }
                    ],
                    pass2 : [
                        { validator: validatePass, trigger: 'blur' },
                        { pattern: /^([A-Za-z]|[0-9]){6,16}$/,  message: '密码不规范，请输入6-16位字母、数字或组合', trigger: 'blur' }
                    ],
                    checkPass2 : [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                },
                ids:'',
                settingsinput:"",
                settingcphone:'',
                // 444444444444444444
                cities4: checkedCities,
                customerInfos:'',
                customerInfo:'',
                returenName:'',
                returnCustomer:'',
                companyPicFile:'',
                companyPicFiles:'',
                archivedDate:'',
                pigeonhole:'',
                moneys:'',

                //承诺期
                commitment1:'',
                modify:false,
                collection:'5',
                archivedDate:'',
                //保险
                insuranceInformation:'',
                insuranceInformations:'',
                //table4 合同
                options2:[],
                dialogFormVisible:false,//添加收费明细的模态窗

                ContractProvince:'',//合同省
                ContractCity:'',//合同市
                ContractArea:'',//合同区

                contract:{//table4
                    driverBillCycleType:'',//司机结算类型
                    billCycleType:'',//客户结算类型
                    Explain:'',//变更说明
                    //质保金
                    qualityGuaranteeDeposit:'',
                    //结算方式
                    billCycle:'',
                    //司机结算账期
                    driverBillCycle:'',
                    billArea:'',//分区域计费
                    billWay:'',//计价方式
                    isArchived:'',
                    contractPicList:[],
                    resource:'',
                    pigeonhole:'',
                    contractid:'',
                    region:'',
                    percentageOfCharge:'',
                    customerEmail:'',
                    commitment:'',
                    remark:'',
                    isFile:"",
                    value6:'',
                    //
                },
                // table 5
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
                //table5用户名唯一校验
                UserName:'',
            };
        },
        created(){
            //重新提交表头上的数字信息
            if(this.$route.query.info == 0){
                this.modify = false,
                this.changes = '重新提交客户信息'
            }else if(this.$route.query.info == 4){
                this.modify = false,
                this.changes = '客户转正'
            }else if(this.$route.query.info == 5){
                this.modify = false,
                    this.changes = '客户信息编辑'
            }else {
                this.modify = true,
                this.changes = '变更客户信息'
            };
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
            console.log(this.token);

            //获取到下拉
            this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/query/listadmin', JSON.stringify({
                "token": this.token,
            })).then(run => {
                console.log(run);
                console.log(123);
                console.log(run.body.result.saleList);
                if(run.body.errcode == 0 ){
                    this.saleList = run.body.result.saleList;
                    this.projectList = run.body.result.projectList;
                    this.areaList = run.body.result.areaList;
                }
            });
            //大区所有数据
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/area', JSON.stringify({
                "token":this.token,
                "flag":"hasArea"
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

//变更公司信息
            console.log(this.$route.query.info);
            //=4
            if (this.$route.query.info == 4) {
                let page = JSON.stringify({
                    token: this.token,
                    id: this.$route.query.row
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/potential_client/turn_message', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        console.log(res);
                        this.ids = res.body.result.customer.id;
                        console.log(this.ids);
                        this.ruleForm2 = res.body.result.customer;
                        this.ruleForm2.goodsType = [];
                        this.ruleForm2.consigneeType = [];
                        this.ruleForm = res.body.result.company;
                        this.DisableTab2 = false;
                        this.activeName = 'second';
                    }
                }),
                console.log(this.$route.query.row);
                // this.ruleForm2 = this.$route.query.row.customer;
            }else {
                console.log("走变更");
                //拿到id
                let customerManagement = JSON.parse(sessionStorage.getItem('managementid'));
                // console.log(customerManagement);
                this.type = customerManagement.type;
                // console.log(customerManagement.approveId);
                this.customerManagement = customerManagement;
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/detail/getbyid',JSON.stringify({
                    "token":this.token,
                    "id":this.customerManagement.approveId,
                    "isApproveItem":this.$route.query.info == 3?false:true
                }),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(run=>{
                    if (run.body.errcode == 0) {
                        console.log(run);
                        this.customerId = run.body.result.id;
                        console.log(this.customerId);

                        //table1
                        if(run.body.result.customer != null){
                            this.DisableTab2 = false;
                            this.activeName = 'first';
                            this.ruleForm2 = run.body.result.customer;
                            this.UniqueCustomerName = run.body.result.customer.customerName;
                            this.customer = run.body.result.customer;
                            this.adviser = run.body.result.customer.saleAdminId;
                            this.Commissioner = run.body.result.customer.projectAdminId;
                            //客户主要货物类型
                            this.goodsTypestr  = run.body.result.customer.goodsType;
                            this.goodsTypestr1 = this.goodsTypestr.slice(1,-1);
                            //客户主要货物类型
                            this.consigneeTypestr = run.body.result.customer.consigneeType;
                            this.consigneeType1   = this.consigneeTypestr.slice(1,-1);
                            //
                            this.saleName3 = run.body.result.customer.resourceClassification;
                            // if(run.body.result.customer.resourceClassification == 'one'){
                            //     this.saleName3 = '一手货源'
                            // }else if (run.body.result.customer.resourceClassification == 'two') {
                            //     this.saleName3 = '二手货源'
                            // }else {
                            //     this.saleName3 = '三手货源'
                            // }
                            //运营专员
                            this.saleName2 = run.body.result.customer.projectName;
                            this.saleName1 = run.body.result.customer.saleName;
                            this.saleName = this.saleName1;
                            this.ruleForm2.phone = run.body.result.customer.salePhone;
                            this.ruleForm2.name = run.body.result.customer.projectPhone;
                        }
                        //table2
                        if(run.body.result.company != null){
                            this.DisableTab3 = false;
                            this.activeName = 'thirds';
                            this.ruleForm = run.body.result.company;
                            this.ruleForm.shortName = run.body.result.company.shortName;
                            this.company  = run.body.result.company;
                            //营业执照扫描件
                            console.log(run.body.result.company.businessLicensesQS);
                            for(var i in run.body.result.company.businessLicensesQS){
                                this.fileList2.push({'url':run.body.result.company.businessLicensesQS[i].url,'name':run.body.result.company.businessLicensesQS[i].name})
                            };
                            this.companyPic = run.body.result.company.businessLicenses;
                        }
                        //table3
                        if(run.body.result.invoice != null){
                            this.DisableTab4 = false;
                            this.activeName = 'four';
                            this.ruleForm3 =  run.body.result.invoice;
                            //税率
                            // this.ruleForm3.invoiceregion = run.body.result.invoice.taxRate;

                            this.invoice  = run.body.result.invoice;
                            //发票内容
                            this.invoiceContent = run.body.result.invoice.invoiceContent;
                            //开户银行
                            this.openingBank = run.body.result.invoice.openingBank;
                            //纳税人识别码
                            this.taxpayerIdentifNum = run.body.result.invoice.taxpayerIdentifNum;
                            //账号
                            this.account = run.body.result.invoice.account;
                            //备注
                            this.remark = run.body.result.invoice.remark;
                            //是否开发票
                            this.ruleForm3.isInvoice = run.body.result.invoice.isInvoice;
                            this.IsDisabled = run.body.result.invoice.isInvoice;
                        }

                        //Table4
                        console.log(159);
                        if(run.body.result.contract != null){
                            // this.DisableTab5 = false;
                            // this.activeName = 'system';
                            this.contract = run.body.result.contract;
                            this.contract = run.body.result.contract,
                                this.contract.isArchived = run.body.result.contract.isArchived;
                            //合同归档日期
                            this.archivedDate = run.body.result.contract.archivedDate;
                            //上传电子合同
                            for (var i in run.body.result.contract.electricCopyQS ) {
                                if (run.body.result.contract.electricCopyQS[i].name == '') {
                                    run.body.result.contract.electricCopyQS.splice(i,1)
                                }
                                this.fileListContract.push({'url':run.body.result.contract.electricCopyQS[i].url,'name':run.body.result.contract.electricCopyQS[i].name});
                            }

                            this.companyPicFile = run.body.result.contract.electricCopy;
                            this.fileLists = run.body.result.contract.electricCopy;
                            console.log(78129);
                            //上传客户信息表
                            for(var i in run.body.result.contract.customerInfoQS){
                                if (run.body.result.contract.customerInfoQS[i].name == '') {
                                    run.body.result.contract.customerInfoQS.splice(i,1)
                                }
                                this.fileListCustomerInfo.push({'url':run.body.result.contract.customerInfoQS[i].url,'name':run.body.result.contract.customerInfoQS[i].name});
                            }

                            this.customerInfo = run.body.result.contract.customerInfo;
                            this.CustomerList = run.body.result.contract.customerInfo;
                            //合同编号
                            this.contract.id = run.body.result.contract.id;
                            this.ContractNumber = run.body.result.contract.id;
                            //计价模板
                            console.log( run.body.result.contract.billArea);
                            if  (run.body.result.contract.billArea != undefined){
                                this.contract.billArea = run.body.result.contract.billArea;
                                this.contract.billWay = run.body.result.contract.billWay;
                            }
                            this.judge();
                            if (run.body.result.contract.areaPrice != undefined){
                                this.areaPrice = run.body.result.contract.areaPrice;
                                this.areaPrices = run.body.result.contract.areaPrice;
                                for (var i in this.areaPrice){
                                    this.judgingModel.push(run.body.result.contract.areaPrice[i].priceParams);
                                }
                            }
                            console.log(this.backDisplayArray);
                            //合同起止日期
                            var fileDate = run.body.result.contract.beginDate;
                            var endDate  = run. body.result.contract.endDate;
                            this.value12 = [fileDate,endDate];
                            //违约金
                            this.contract.percentageOfCharge =  run.body.result.contract.percentageOfCharge;
                            //催收期
                            this.collection =  run.body.result.contract.deadlineForNoitfy;
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
                        }
                        //table5
                        if(run.body.result.account != null){
                            // this.DisableTab5 = false;
                            // this.activeName = 'system';
                            this.account  = run.body.result.account,
                                this.settings.customerNameEn   = run.body.result.account.username;
                            //用户名的唯一性
                            this.UniqueUserName = run.body.result.account.username;
                            this.UserName = run.body.result.account.username;
                            this.settings.phone            = run.body.result.account.telephone;
                            //电话号码唯一性校验
                            this.TelephoneNumberUnique     = run.body.result.account.telephone;
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
                    }else{
                        this.$message({
                            showClose: true,
                            message:run.body.message,
                            type: 'error'
                        });
                    }
                });
            }

        },
        watch: {
            'contract.billArea'(curVal,oldVal){
                if (oldVal != ''){
                    if(curVal != oldVal){
                        this.judgingModel = [];
                        this.areaPrice = [];
                    }
                }
            },
            'contract.billWay'(curVal,oldVal){
                if (oldVal != ''){
                    if(curVal != oldVal){
                        this.judgingModel = [];
                        this.areaPrice = [];
                        this.form={
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

                            ContractProvince:''
                        }
                    }
                }
            },
            'form.kilometre'(curVal){
                this.form.kilometre = curVal;
            },
            'form.PointPosition'(curVal){
                this.form.PointPosition = curVal;
            },
            'form.weight'(curVal){
                this.form.weight = curVal;
            },
            'form.volume'(curVal){
                this.form.volume = curVal;
            },
            'form.ticket'(curVal){
                this.form.ticket = curVal;
            },
            state(curVal,oldVal){
                if (oldVal != ''){
                    if(curVal != oldVal){
                        this.judgingModel = [];
                    }
                }
            },
            judgingModel(curVal,oldVal){
                console.log (curVal,oldVal);
                this.judgingModel = curVal;
                console.log (this.judgingModel);
            },
            areaPrice(curVal,oldVal){
                this.areaPrice =  curVal;

                console.log(this.areaPrice);
            },
            saleName1: function(curVal,oldVal){
                console.log(curVal,oldVal);
                console.log(this.saleName);
                if (this.saleName != curVal){
                    this.ruleForm2.customerSource = '接手';
                }
                for(var i in this.saleList) {
                    if (curVal == this.saleList[i].name) {
                        this.ruleForm2.phone = this.saleList[i].cphone;
                        console.log(this.ruleForm2.phone)
                    }
                }
            },
            saleName2:function(curVal,oldVal){
                console.log(curVal,oldVal);
                for(var i in this.projectList) {
                    if (curVal == this.projectList[i].name) {
                        this.ruleForm2.name = this.projectList[i].cphone;
                        console.log (this.ruleForm2.name)
                    }
                }
            },
            // 'ruleForm.name':function(NewVal){
            //     this.SearchList = [];
            //     console.log(NewVal);
            //     if(this.ruleForm.name != ''){
            //         this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/query/companybynames', JSON.stringify({
            //             "token":this.token,
            //             "companyName":NewVal,
            //         }),{
            //             headers: {
            //                 'Content-Type': 'application/json;charset=UTF-8'
            //             }
            //         }).then((res) => {
            //             console.log(res);
            //             if (res.body.errcode == 0) {
            //                 this.SearchList = [];
            //                 for(var i in res.body.result){
            //                     this.SearchList.push(res.body.result[i]);
            //                     if(this.ruleForm.name == res.body.result[i].name){
            //                         this.SearchList = false;
            //                     }
            //                 }
            //                 console.log(this.SearchList);
            //             }
            //         })
            //     }else {
            //         this.ruleForm = {};
            //         this.fileList2 = [];
            //     }
            // },
        },
        methods: {
            radios() {
                console.log(this.radio);
            },
            bb(obj){
                console.log(obj);
                console.log('-----------------------------------------------------------------------')
                // console.log(obj);
            },
            handleItemChange(val) {
                console.log(val);
                console.log(val[val.length-3]);
                console.log(val[val.length-2]);
                console.log(val[val.length-1]);
                this.province = [];
                this.city = [];
                this.countys = [];
                // this.province = CodeToText[val[0]];
                // this.city = CodeToText[val[1]];
                // this.countys = CodeToText[val[2]];
                // console.log(val[val.length - 2]);
                // console.log(this.options2);
                // console.log("------------------------------------------");
                // console.log(val[val.length-0]);
                if  (val.length == 3){
                    for (let i in this.options2) {
                        if  (val[val.length - 3] == this.options2[i].value){
                            console.log(this.options2[i].label);
                            this.province = this.options2[i].label;//省
                            for(let j in this.options2[i].children){
                                if  (val[val.length - 2] == this.options2[i].children[j].value){
                                    console.log(this.options2[i].children[j].label);
                                    this.city = this.options2[i].children[j].label;//市
                                }
                                for(let z in this.options2[i].children[j].children){
                                    if (val[val.length - 1] == this.options2[i].children[j].children[z].value){
                                        console.log(this.options2[i].children[j].children[z].label);
                                        this.countys = this.options2[i].children[j].children[z].label;//区
                                    }
                                }
                            }
                        }
                    }
                }
                if (val.length == 2){
                    for (let i in this.options2) {
                        if  (val[val.length - 2] == this.options2[i].value){
                            console.log(this.options2[i].label);
                            this.province = this.options2[i].label;//省
                            for(let j in this.options2[i].children){
                                if  (val[val.length - 1] == this.options2[i].children[j].value){
                                    console.log(this.options2[i].children[j].label);
                                    this.city = this.options2[i].children[j].label;//市
                                }
                            }
                        }
                    }
                }
                if(val.length == 1){
                    for (let i in this.options2) {
                        if  (val[val.length - 1] == this.options2[i].value){
                            console.log(this.options2[i].label);
                            this.province = this.options2[i].label;//省
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
            //计价模板的表格

            //添加价格明细
            AddDetail(){
                if (this.contract.billArea == undefined){
                    this.$message({
                        showClose: true,
                        message: '请选择是否分区域计费！',
                        type: 'error'
                    });
                    return
                }else if(this.contract.billWay == undefined) {
                    this.$message({
                        showClose: true,
                        message: '请选择计价方式！',
                        type: 'error'
                    });
                    return
                };
                this.dialogFormVisible = true;
                console.log(this.contract.billArea,this.contract.billWay);
                this.judge();
                // console.log(this.state)
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
            //继续添加车型
            submitForms(ruleForm){
                console.log(123);
                //车型判断
                if (this.form.carRadio === ''){
                    this.$message({
                        showClose: true,
                        message: '请您选择车型！',
                        type: 'warning'
                    });
                    return
                };
                //校验时间4，9，13
                if (this.state == 15 || this.state == 25){
                    if (this.form.FourHours == '' && this.form.NineHours == '' && this.form.ThirteenHours == '') {
                        this.$message({
                            showClose: true,
                            message: '请您选择小时三者其一即可！',
                            type: 'warning'
                        });
                        return
                    }
                    if  (this.form.FourHours != ''){
                        if  (this.form.FourHours.match(/^\d+\.?\d{0,2}$/)){
                        }else{
                            this.$message.error('输入的4小时价格保留最后两位小数');
                            return
                        };
                    }
                    if  (this.form.NineHours != ''){
                        if (this.form.NineHours.match(/^\d+\.?\d{0,2}$/)){
                        } else{
                            this.$message.error('输入的9小时价格保留最后两位小数！');
                            return
                        }
                    }
                    if(this.form.ThirteenHours != ''){
                        if  (this.form.ThirteenHours.match(/^\d+\.?\d{0,2}$/)){
                        }else{
                            this.$message.error('输入的13小时价格保留最后两位小数!');
                            return
                        }
                    }
                };
                let obj = {};
                //公里校验
                this.objAddProperties(this.form.kilometre,this.form.kilometreNum,this.form.mileage,'请填写起步价内公里数或超里程数单价',obj,'UK','OKP');
                //点位校验
                this.objAddProperties(this.form.PointPosition,this.form.StartingPrice,this.form.UnitPrice,'请填写起步价内点位数或超点位单价',obj,'UIT','OPP');
                //重量校验
                this.objAddProperties(this.form.weight, this.form.startWeight,this.form.ExceedWeight,'请填写起步价内重量或超重量单价',obj,'UW','OWP');
                //体积校验
                this.objAddProperties(this.form.volume,this.form.startVolume,this.form.ExceedVolume,'请填写起步价内体积或超体积单价',obj,'UV','OVP');
                //票
                this.objAddProperties(this.form.ticket, this.form.startTicket,this.form.ExceedTicket,'请填写起步价内票数或超量单价',obj,'UT','OTP');
                if  (this.form.FourHours == ''){
                    this.form.FourHours = '0'
                }
                if(this.form.NineHours == ''){
                    this.form.NineHours = '0'
                }
                if (this.form.ThirteenHours == ''){
                    this.form.ThirteenHours = '0'
                }
                if  (this.form.FourHours == '' && this.form.NineHours == '' && this.form.ThirteenHours == ''){
                    this.$message({
                        showClose: true,
                        message: '请添加小时',
                        type: 'error'
                    });
                    return false
                }
                obj['UP'] = this.form.StartPrice;
                if  (this.form.WholeVehicle == ''){
                    this.form.WholeVehicle = '0'
                }
                if (this.form.ByThePiece == ''){
                    this.form.ByThePiece = '0'
                }
                if(this.form.SingleTicket == ''){
                    this.form.SingleTicket = '0'
                }
                obj['VP'] = this.form.WholeVehicle;//
                obj['PP'] = this.form.ByThePiece;//
                obj['TP'] = this.form.SingleTicket;//
                obj['FHP'] = this.form.FourHours;
                obj['NHP'] = this. form.NineHours;
                obj['THP'] = this.form.ThirteenHours;

                obj['AA'] = this.province+' '+this.city+' '+this.countys;
                //发送到后台的车型数据
                this.carModel = JSON.parse(JSON.stringify(this.cars[this.form.carRadio]));
                //table展示的车型数据
                this.carModels = JSON.parse(JSON.stringify(this.cars[this.form.carRadio])).name + JSON.parse(JSON.stringify(this.cars[this.form.carRadio])).isElectric + JSON.parse(JSON.stringify(this.cars[this.form.carRadio])).length + JSON.parse(JSON.stringify(this.cars[this.form.carRadio])).isCertificate+JSON.parse(JSON.stringify(this.cars[this.form.carRadio])).isTailBoard + JSON.parse(JSON.stringify(this.cars[this.form.carRadio])).isCold;
                obj['VT'] = this.carModels;
                //校验超出部分
                if (this.state == 11 || this.state == 21){
                    console.log(this.Parts,this.Part);
                    if  (this.Part === 5){
                        this.$message({
                            message: '请填写超出部分',
                            type: 'warning'
                        });
                        this.Part = 0;
                        return
                    };
                    if(this.Parts != 0) {
                        this.$message({
                            message: '请完善超出部分信息',
                            type: 'warning'
                        });
                        this.Parts = 0;
                        return
                    };
                    this.Part = 0;
                    this.Parts = 0;
                };
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        if (this.judgingModel != []) {
                            for (var i in this.judgingModel){
                                if (i > 48){
                                    this.$message({
                                        showClose: true,
                                        message: '添加的区域已达到上限！',
                                        type: 'error'
                                    });
                                    return;
                                };
                                if  (this.judgingModel[i].AA === this.province+' '+this.city+' '+this.countys){
                                    if  (this.carModels == this.judgingModel[i].VT){
                                        this.$message({
                                            message: '同种车型只能选择一次！',
                                            type: 'warning'
                                        });
                                        return;
                                    }
                                }
                            }
                        }
                        this.obj = obj;
                        this.judgingModel.push(obj);
                        let objs = {};
                        if (this.province == '') {
                            objs['area'] = ''
                        }else if  (this.city == ''){
                            objs['area'] = this.province
                        }else if (this.countys == '') {
                            objs['area'] = this.province+','+this.city
                        }else {
                            objs['area'] = this.province+','+this.city +','+this.countys;
                        }
                        objs['vehicleType'] = this.carModel;
                        objs['priceParams'] = obj;
                        this.areaPrice.push(objs);
                        this.verificationCode = 0;
                    }
                })
            },
            //确定并关闭
            closure(ruleForm){
                console.log(this.areaPrice,this.judgingModel,this.verificationCode);
                if  (this.areaPrice.length != 0 && this.judgingModel.length != 0){
                    this.dialogFormVisible = false;
                }else {
                    this.submitForms(ruleForm);
                    if(this.verificationCode === 0){
                        this.dialogFormVisible = false;
                    }else {
                        this.$message.error('请确保信息填写完整！');
                    }
                    this.verificationCode = '';
                }
            },
            isObjectValueEqual(obj1, obj2) {
                console.log(obj1, obj2);

                var o1 = obj1 instanceof Object;
                var o2 = obj2 instanceof Object;
                if (!o1 || !o2) {/*  判断不是对象  */
                    return obj1 === obj2;
                }

                if (Object.keys(obj1).length !== Object.keys(obj2).length) {
                    return false;
                    //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
                }

                for (var attr in obj1) {
                    var t1 = obj1[attr] instanceof Object;
                    var t2 = obj2[attr] instanceof Object;
                    if (t1 && t2) {
                        return diff(obj1[attr], obj2[attr]);
                    } else if (obj1[attr] !== obj2[attr]) {
                        return false;
                    }
                }
                return true;
            },
            objAddProperties(choice,num,price,tips,obj,attr,attr1){
                if  (num === '' || price === ''){
                    num = '0';
                    price = '0';
                    obj[attr] = num;
                    obj[attr1] = price;
                };
                if(choice === true){
                    if( num === '' || price === ''){
                        this.$message({
                            message: tips,
                            type: 'warning',
                        });
                        this.Parts++;
                    }else{
                        obj[attr] = num;
                        obj[attr1] = price;
                    }
                }else {
                    this.Part++;
                }
            },
            SearchClick(e){
                console.log(e.target.innerHTML);

                this.ruleForm.name = e.target.innerHTML;
                for (var i in this.SearchList) {
                    if (this.ruleForm.name == this.SearchList[i].name){
                        console.log(this.SearchList[i].id)
                        this.SearchId = this.SearchList[i].id;
                    }
                }
                this.SearchList = [];
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/query/companybyid', JSON.stringify({
                    "token":this.token,
                    "id":this.SearchId,
                }),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((run) => {
                    console.log(run);
                    if (run.body.errcode == 0) {
                        this.ruleForm = run.body.result;
                        if (run.body.result.isQuoted == '1'){
                            this.ruleForm.isQuoted = '上市'
                        } else {
                            this.ruleForm.isQuoted = '未上市'
                        }
                        // console.log(run.body.result.result.businessLicensesQS);
                        for(var i in run.body.result.businessLicensesQS){
                            this.fileList2.push({'url':run.body.result.businessLicensesQS[i].url,'name':run.body.result.businessLicensesQS[i].name})
                        };
                    }
                });
            },
            Lose(){
                this.SearchList = false;
            },
            formatDateTime(inputTime) {
                let date = new Date(inputTime);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h=h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                var second=date.getSeconds();
                second=second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d;
            },
            Resubmit(){

            },
//公用保存的参数
            PublicPreservation() {
            //最后的点击数据
                let account = {
                    token:this.token,
                    id : this.userId,
                    username: this.settings.customerNameEn,
                    telephone : this.settings.phone,
                    password : sha256(this.settings.pass2),
                    confirmPassword:sha256(this.settings.checkPass2),
                    permission :{
                        //运营大厅
                        transportLobby: this.permissions.settingsradio,
                        //发布用车
                        releaseCar  : this.permissions.settingsradio1,
                        //智能调度
                        smartDispatch: this.permissions.settingsradio2,
                        //统计报表
                        statisticsReport: this.permissions.settingsradio3,
                        //选司机
                        chooseDriver: this.permissions.settingsradio4,
                        //给指定司机发任务是否支持
                        assignDriverTask : this.permissions.settingsradio5,
                        //第三方订单
                        thirdPartyOrder : 'false',
                    }
                };
                this.account = account;
            //第一个页面
                let customer = {
                    customerSource:this.ruleForm2.customerSource,
                    consigneeType:this.ruleForm2.consigneeType,
                    goodsType:this.ruleForm2.goodsType,
                    //业务分类
                    businessType:this.ruleForm2.businessType,
                    thirdLevelClassify:this.ruleForm2.thirdLevelClassify,
                    twoLevelClassify:this.ruleForm2.twoLevelClassify,
                    topLevelClassify:this.ruleForm2.topLevelClassify,
                    filialeName:this.areaList.filialeName,
                    filialeId:this.areaList.filialeId,
                    type:this.ruleForm2.type,
                    city:this.ruleForm2.city,
                    province:this.ruleForm2.province,
                    customerName:this.ruleForm2.customerName,
                    saleName: this.ruleForm2.saleName,
                    saleAdminId:this.adviser,
                    projectName:this.ruleForm2.projectName,
                    projectAdminId:this.Commissioner,
                    projectPhone:this.ruleForm2.name,
                    salePhone:this.ruleForm2.phone,
                    commissionRatio:this.ruleForm2.commissionRatio,
                    resourceClassification:this.saleName3,
                };
                this.customer = customer;
            //第二个页面
                let company = {
                    financeMoney:this.ruleForm.financeMoney,
                    number:this.ruleForm.number,
                    name:this.ruleForm.name,
                    isQuoted:this.ruleForm.isQuoted,
                    financeScope:this.ruleForm.financeScope,
                    shortname:this.ruleForm.shortname,
                    city:this.ruleForm.city,
                    province:this.ruleForm.province,
                    position:this.ruleForm.position,
                    phone:this.ruleForm.phone,
                    contactor:this.ruleForm.contactor,
                    servicePhone:this.ruleForm.servicePhone,
                    address:this.ruleForm.address,
                    remark:this.ruleForm.remark,
                    businessLicenses:this.companyPic,
                };
                this.company = company;
            //第三个页面
                let invoice = {
                    companyName: this.ruleForm3.companyName,
                    taxpayerIdentifNum: this.ruleForm3.taxpayerIdentifNum,
                    taxRate: this.ruleForm3.taxRate,
                    invoiceContent: this.ruleForm3.invoiceContent,
                    account: this.ruleForm3.account,
                    openingBank: this.ruleForm3.openingBank,
                    remark: this.ruleForm3.remark,
                    isInvoice: this.ruleForm3.isInvoice,
                    makeType:this.ruleForm3.makeType,//开票类型
                    registeredAddress:this.ruleForm3.registeredAddress,//注册地址
                    phone:this.ruleForm3.phone,//电话
                    makeSite:this.ruleForm3.makeSite,//开票单位
                    chapterType:this.ruleForm3.chapterType,//选择盖章类型
                    receiveName:this.ruleForm3.receiveName,//收件人
                    receivePhone:this.ruleForm3.receivePhone,//收件人电话
                    receiveAddress:this.ruleForm3.receiveAddress//收件人地址
                };
                this.invoice = invoice;
            //第四个页面
                let contract = {
                    //质保金
                    qualityGuaranteeDeposit:this.contract.qualityGuaranteeDeposit,
                    //合同编号
                    id: this.contract.id,
                    //归档
                    isArchived : this.contract.isArchived,
                    //归档日期
                    archivedDate: this.archivedDate,
                    //起止日期
                    beginDate:this.value12 == null ?this.value12 = '' : this.value12[0],
                    endDate:this.value12 == null ?this.value12 = '' : this.value12[1],
                    //违约金比例
                    percentageOfCharge:this.contract.percentageOfCharge,
                    //客戶结算账期
                    billCycle:this.contract.billCycle,
                    //司机结算账期
                    driverBillCycle:this.contract.driverBillCycle,
                    //客户邮箱
                    customerEmail : this.contract.customerEmail ,
                    //承诺期
                    deadlineForBill: this.commitment1,
                    //催收期
                    deadlineForNoitfy : this.collection,
                    //备注
                    remark: this.contract.remark,
                    //上传的电子合同
                    electricCopy:this.companyPicFile,
                    //是否分区域计费
                    billArea:this.contract.billArea,
                    //计价方式
                    billWay:this.contract.billWay,
                    //
                    areaPrice:this.areaPrice,
                    //上传客户信息表
                    customerInfo:this.customerInfo,
                    //保险信息
                    insuranceInformation:this.insuranceInformations,
                    //变更说明
                    Explain:this.contract.Explain,
                    //客户结算方式
                    billCycleType:this.contract.billCycleType,
                    //司机结算方式
                    driverBillCycleType:this.contract.driverBillCycleType,
                };
                this.contract = contract;
            },
//交互数据
            InteractiveData(info){
                if (this.$route.query.info == 3) {

                    let Interactive = {
                        "token":this.token,
                        "id":this.customerManagement.id,
                        "approveId":'',
                        "update":1,
                        "customer": this.customer,//第一个页面
                        'company':this.company, //第二个页面
                        "invoice": this.invoice, //第三个页面
                        "contract":this.contract,//第四个页面
                        "account":this.account,//最后的点击数据
                    };
                    this.Interactive = Interactive;
                }else {
                    // console.log(this.$route.query.info == 4);
                    console.log(this.ids);
                    console.log('1231213');
                    if (info == 1 ) {
                        let Interactive = {
                            "token": this.token,
                            "id":this.ids == '' ? this.customerManagement.id : this.ids,
                            "approveId":this.$route.query.info == 5 ? this.customerManagement.approveId : '',
                            "source":this.$route.query.info == 4 ? "potentialClient":"",
                            "customer": this.customer,//第一个页面
                        };
                        this.Interactive = Interactive;
                        console.log (this.Interactive)
                    }else if (info == 2) {
                        let Interactive = {
                            "token": this.token,
                            "source":this.$route.query.info == 4 ? "potentialClient":"",
                            "id":this.ids == '' ?this.customerManagement.id : this.ids,
                            "approveId":this.$route.query.info == 5 ? this.customerManagement.approveId : '',
                            "customer": this.customer,//第一个页面
                            'company': this.company, //第二个页面
                        };
                        this.Interactive = Interactive;
                    }else if (info == 3) {
                        let Interactive = {
                            "token": this.token,
                            "source":this.$route.query.info == 4 ? "potentialClient":"",
                            "id":this.ids == '' ?this.customerManagement.id : this.ids,
                            "approveId":this.$route.query.info == 5 ? this.customerManagement.approveId : '',
                            "customer": this.customer,//第一个页面
                            'company': this.company, //第二个页面
                            "invoice": this.invoice, //第三个页面
                        };
                        this.Interactive = Interactive;
                    }else {
                        let Interactive = {
                            "token":this.token,
                            "source":this.$route.query.info == 4 ? "potentialClient":"",
                            "id":this.ids == '' ?this.customerManagement.id : this.ids,
                            "approveId":this.$route.query.info == 5 ? this.customerManagement.approveId : '',
                            "customer": this.customer ,
                            'company':this.company,
                            "invoice": this.invoice,
                            "contract":this.contract,
                            "account":this.account,
                        };
                        this.Interactive = Interactive;
                    }
                    // this.Interactive = Interactive;
                }
            },
//table5开始
//最后的点击提交按钮
            systemInformation(setting){
                if (this.contract.billCycle == "") {
                    this.$message.error('请填写客户结算周期');
                    return;
                }
                if (this.contract.driverBillCycle == "") {
                    this.$message.error('请填写司机结算周期');
                    return;
                }
                if (this.contract.billArea == undefined && this.contract.billWay == undefined){
                    this.$message.error('请填写计价模板！');
                    return false
                };
                if (this.judgingModel.length === 0){
                    this.$message({
                        showClose: true,
                        message: '请点击添加价格明细！',
                        type: 'error'
                    });
                    return false
                }
                this.$refs[setting].validate((valid) => {
                    if (valid) {
                        this.$confirm('此操作将提交表中信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            //校验用户名唯一性
                            if (this.errcode5 != 0 ){
                                this.$message.error('您输入的用户名称已重复！');
                                return false
                            }
                            // 校验电话
                            if (this.errcode5Phone != 0 ){0
                                this.$message.error('您输入的手机号已重复！');
                                return false
                            }
                            this.PublicPreservation();
                            this.InteractiveData();
                            this.$http.post(this.global.lightningUrl+'/companyv1/customerManage/commit', JSON.stringify(this.Interactive),{
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            }).then((res) => {
                                console.log(res);
                                if (res.body.errcode == 0) {
                                    this.$message({
                                        showClose: true,
                                        message:res.body.message ,
                                        type: 'success'
                                    });
                                    this.$router.push({path:'/ApprovalList'})
                                }else {
                                    this.$message({
                                        showClose: true,
                                        message: res.body.message,
                                        type: 'error'
                                    });
                                }
                            })

                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消提交'
                            });
                        });

                    }else {
                        this.$message.error('确保信息完整');
                    }
                });
            },
//点击保存按钮
            openfrom( setting ) {
                this.$refs[setting].validate((valid) => {
                    if (valid) {
                        if (this.contract.billCycle == "") {
                            this.$message.error('请填写客户结算周期');
                            return;
                        }
                        if (this.contract.driverBillCycle == "") {
                            this.$message.error('请填写司机结算周期');
                            return;
                        }
                        if(this.contract.billArea == undefined && this.contract.billWay == undefined){
                            this.$message.error('请填写计价模板！');
                            return;
                        }
                        if (this.judgingModel.length === 0){
                            this.$message({
                                showClose: true,
                                message: '请点击添加价格明细！',
                                type: 'error'
                            });
                            return false
                        }
                        this.$confirm('此操作将保存表中信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            //校验用户名唯一性
                            if (this.errcode5 == 0 ){
                                console.log(this.errcode5);
                                console.log(123);
                                // 校验电话
                                if (this.errcode5Phone == 0 ){
                                    console.log(this.errcode5Phone);
                                    console.log(123);
                                    this.PublicPreservation();
                                    this.InteractiveData();
                                    this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/save', JSON.stringify(this.Interactive),{
                                        headers: {
                                            'Content-Type': 'application/json;charset=UTF-8'
                                        }
                                    }).then((res) => {
                                        console.log(res);
                                        console.log(res.body);
                                        if (res.body.errcode == 0){
                                            this.$message({
                                                type: 'success',
                                                message: '保存成功'
                                            });
                                        }else {
                                            this.savabutton = false ;
                                            this.$message.error('保存失败，请检查您的网络。');
                                        }
                                    });
                                }else {
                                    this.$message.error('您输入的手机号已重复！');
                                    return false
                                }
                            }else {
                                this.$message.error('您输入的用户名称已重复！');
                                return false;
                            }
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消保存'
                            });
                        });

                    }else {
                        this.$message('请填写完整信息');
                        return false;
                    }
                });
            },
//table5 结束
//table2
//第2个页面 + 上传图片
//图片上传开始
            insert(file, fileList){
                console.log(file, fileList);
                this.picList=[];
                this.picList=fileList;
                console.log(this.picList);
                for(var i in this.picList) {
                    var fileName = this.picList[i].name.substring(this.picList[i].name.lastIndexOf("."));
                    if ((fileName != '.jpg') && (fileName != '.png')) {
                        this.picList.splice(i,1);
                        this.$message({
                            showClose: true,
                            message: '对不起，系统不支持该格式的文件。',
                            type: 'error'
                        });
                        return false
                    }
                    var size = 0;
                    var num  = 10;
                    size = this.picList[i].size;//byte
                    size = size / 1024;//kb
                    size = (size / 1024).toFixed(1);//mb
                    if (size > num){
                        this.picList.splice(i,1);
                        this.$message({
                            showClose: true,
                            message: '对不起，您上传的文件大小为'+ size +'文件大小超出10M。上传失败！',
                            type: 'error'
                        });
                        return false
                    }
                }
            },
            upload(){
                let formdata= new FormData();
                for(var i in this.picList){
                    console.log(this.picList[i].raw);
                    console.log(123);
                    formdata.append('companyFile',this.picList[i].raw);
                };
                if(this.picList == ''){
                    this.$message({
                        showClose: true,
                        message: '请点选择需要上传的图片',
                        type: 'error'
                    });
                    return false
                }
                let config = {
                    headers: {
                        'Content-Type':'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
                    }
                };
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/upload', formdata, config).then(res=> {
                    //做处理
                    console.log(res);
                    if( res.body.errcode == 0 ){
                        this.companyPic = res.body.result.companyPic;
                            this.$message({
                                showClose: true,
                                message:res.body.message,
                                type: 'success'
                            });
                    }else {
                        this.$message({
                            showClose: true,
                            message: res.body.message,
                            type: 'error'
                        });
                    }
                });
            },
            handlePictureCardPreview(file) {
                console.log(file);
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            uploadOverrun: function() {
                this.$message({
                    type: 'error',
                    message: '上传文件个数超出限制!最多上传10张图片!'
                });
            },
//图片上传结束
//图片上传结束
//table2保存
            submitForm(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if(this.ruleForm.province == undefined){
                        this.ruleForm.province = '';
                    }
                    if(this.ruleForm.city == undefined){
                        this.ruleForm.city = '';
                    }
                    if(this.ruleForm.financeMoney == '< 5000万人民币'){
                        this.ruleForm.financeMoney = 0
                    }else if(this.ruleForm.financeMoney == '5000万人民币 - 1亿人民币'){
                        this.ruleForm.financeMoney = 5000
                    }else{
                        this.ruleForm.financeMoney = 10000
                    }
                    if (this.ruleForm.isQuoted == '上市'){
                        this.ruleForm.isQuoted = '1'
                    } else if(this.ruleForm.isQuoted == '未上市'){
                        this.ruleForm.isQuoted = '0'
                    }
                    if (valid) {

                        this.$confirm('此操作将保存表中信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.PublicPreservation();
                            this.InteractiveData(2);
                            this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/save',JSON.stringify(this.Interactive)).then(res=>{
                                console.log(res);
                                if( res.body.errcode == 0 ){
                                    this.userInfoChangeRecordId = res.body.result.userInfoChangeRecordId;
                                    this.userId = res.body.result.userId;
                                    this.companyId = res.body.result.companyId;
                                    this.companyInfoId = res.body.result.companyInfoId;
                                    console.log(this.userId);
                                    this.DisableTab3 = false;
                                    this.$message({
                                        showClose: true,
                                        message: res.body.message,
                                        type: 'success'
                                    });
                                }else {
                                    this.$message({
                                        showClose: true,
                                        message: res.body.message,
                                        type: 'error'
                                    });
                                }
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消保存'
                            });
                        });

                    } else {
                        this.$message.error("确保公司信息完整！");
                        return false;
                    }
                })
            },
//下一步
            CompanyInformation(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                    if(this.ruleForm.province == undefined){
                        this.ruleForm.province = '';
                    }
                    if(this.ruleForm.city == undefined){
                        this.ruleForm.city = '';
                    }
                    if(this.ruleForm.financeMoney == '< 5000万人民币'){
                        this.ruleForm.financeMoney = 0
                    }else if(this.ruleForm.financeMoney == '5000万人民币 - 1亿人民币'){
                        this.ruleForm.financeMoney = 5000
                    }else{
                        this.ruleForm.financeMoney = 10000
                    }
                    if (this.ruleForm.isQuoted == '上市'){
                        this.ruleForm.isQuoted = '1'
                    } else if(this.ruleForm.isQuoted == '未上市'){
                        this.ruleForm.isQuoted = '0'
                    }
                    if (valid) {
                        this.$confirm('此操作将保存表中数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {

                            this.PublicPreservation();
                            this.activeName = 'thirds';
                            this.DisableTab3=false;
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消下一步'
                            });
                        });

                    }
                })
            },
//第一个页面点击 保存 + 下一步
            submitForm2(ruleForm2) {
                this.$refs[ruleForm2].validate((valid) => {
                    if (valid) {

                        // this.$confirm('此操作将保存表中信息, 是否继续?', '提示', {
                        //     confirmButtonText: '确定',
                        //     cancelButtonText: '取消',
                        //     type: 'warning'
                        // }).then(() => {
                            //校验项目名称
                            if (this.errcode1 != 0){
                                this.$message.error('您输入的项目名称已重复！');
                                return false
                            }
                            //销售专员校验
                            if (this.saleName1 == ''){
                                this.$message({
                                    showClose: true,
                                    message: '请填写销售专员',
                                    type: 'error'
                                });
                                return false
                            }
                            //运营专员校验
                            if (this.saleName2 == ''){
                                this.$message({
                                    showClose: true,
                                    message: '请填写运营专员',
                                    type: 'error'
                                });
                                return false
                            }
                            console.log(JSON.stringify(this.ruleForm2.consigneeType));
                            console.log(this.saleName1);
                            console.log(this.saleName2);
                            for(var i in this.saleList){
                                if(this.saleList[i].name === this.saleName1){
                                    this.adviser = this.saleList[i].id;
                                    console.log(this.adviser );
                                }
                            };
                            console.log(this.projectList);
                            console.log(1);

                            for(var i in this.projectList){
                                if(this.projectList[i].name == this.saleName2){
                                    this.Commissioner = this.projectList[i].id;
                                    console.log(this.Commissioner);
                                    console.log(2)
                                }
                            };
                            //销售专员
                            this.ruleForm2.saleName = this.saleName1;
                            this.ruleForm2.projectName = this.saleName2;
                            if(this.ruleForm2.type == 'ProjectCustomer'){
                                this.ruleForm2.commissionRatio = ''
                            };
                            this.PublicPreservation();
                            this.InteractiveData(1);
                            this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/save',JSON.stringify(this.Interactive)).then(run=>{
                                if( run.body.errcode == 0 ){
                                    //改变唯一性的状态
                                    this.errcode = run.body.errcode;
                                    console.log(run);
                                    // this.customerId = run.body.result.id;
                                    this.customerManagement.approveId = run.body.result.approveId;
                                    console.log(this.customerId);
                                    this.DisableTab2 = false;
                                    this.$message({
                                        showClose: true,
                                        message: run.body.message,
                                        type: 'success'
                                    });
                                }else {
                                    this.$message({
                                        showClose: true,
                                        message:run.body.message,
                                        type: 'error'
                                    });
                                }
                            });

                        // }).catch(() => {
                        //     this.$message({
                        //         type: 'info',
                        //         message: '已取消保存'
                        //     });
                        // });

                    } else {
                        this.$message.error("确保信息完整！");
                        return false;
                    }
                })
            },
//合作信息的下一步
            CooperativeInformation(ruleForm2) {
                this.$refs[ruleForm2].validate((valid) => {
                    if (valid) {

                        this.$confirm('此操作将保存表中信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            //校验项目名称
                            if (this.errcode1 != 0){
                                this.$message.error('您输入的项目名称已重复！');
                                return false
                            }
                            //销售专员校验
                            if (this.saleName1 == '') {
                                this.$message({
                                    showClose: true,
                                    message: '请填写销售专员',
                                    type: 'error'
                                });
                                return false
                            }
                            //运营专员校验
                            if (this.saleName2 == '') {
                                this.$message({
                                    showClose: true,
                                    message: '请填写运营专员',
                                    type: 'error'
                                });
                                return false
                            }
                            console.log(JSON.stringify(this.ruleForm2.consigneeType));
                            console.log(this.saleName1);
                            console.log(this.saleName2);
                            for(var i in this.saleList){
                                if(this.saleList[i].name === this.saleName1){
                                    this.adviser = this.saleList[i].id;
                                }
                            };
                            for(var i in this.projectList){
                                if(this.projectList[i].name == this.saleName2){
                                    this.Commissioner = this.projectList[i].id;
                                }
                            };
                            //所属管理区的name(西安)
                            console.log(this.ruleForm2.filialeName);
                            if(this.areaList.filialeId == this.ruleForm2.filialeName){
                                this.region = this.areaList.filialeName;
                                console.log(this.region);
                            };
                            //销售专员
                            this.ruleForm2.saleName = this.saleName1;
                            this.ruleForm2.projectName = this.saleName2;
                            if(this.ruleForm2.type == 'ProjectCustomer'){
                                this.ruleForm2.commissionRatio = ''
                            };
                            this.PublicPreservation();
                            this.DisableTab2 = false;
                            this.activeName = 'first';
                            console.log(this.customer)


                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消下一步'
                            });
                        });

                    }
                })
            },
            //table1项目名称唯一校验
            OnlyCheck(){
                if (this.ruleForm2.customerName.match(/^([A-Za-z]|[\u4E00-\u9FA5]|\w){2,50}$/)){
                    if (this.UniqueCustomerName == this.ruleForm2.customerName) {
                        this.errcode1 = 0;
                    }else {
                        console.log(this.ruleForm2.customerName);
                        this.$http.post(this.global.lightningUrl + "/companyv1/customerManage/confirm/customerbynames",JSON.stringify({
                            "token":this.token,
                            "name":this.ruleForm2.customerName,
                        })).then(run=>{
                            if( run.body.errcode == 0 ){
                                this.errcode1 = run.body.errcode;
                                this.$message({
                                    showClose: true,
                                    message: run.body.message,
                                    type: 'success'
                                });
                            }else {
                                this.errcode1 = run.body.errcode;
                                this.$message.error('项目名称已经存在,请重新输入');
                                return false
                            }
                        })
                    }
                }
            },
//table3发票信息开始 保存 + 下一步
//table3是否开发票
            clickitem(e) {
                console.log(e);
                this.IsDisabled = e;
                if(this.IsDisabled == '0'){
                    this.ruleForm3={
                        companyName:'',
                        taxpayerIdentifNum:'',
                        taxRate:'',
                        invoiceContent:'',
                        account:'',
                        openingBank:'',
                        remark:'',
                        isInvoice:'',
                    },
                    this.ruleForm3.isInvoice = '0';
                    console.log(this.ruleForm3);
                }
            },
//下一步
            InvoiceInformation(ruleForm3){
                this.$refs[ruleForm3].validate((valid) => {
                    if (valid) {

                        this.$confirm('此操作将保存表中数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.PublicPreservation();
                            this.activeName = 'four';
                            this.DisableTab4 = false;
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消下一步'
                            });
                        });
                    }
                });
            },
            //table3保存
            third:function (ruleForm3) {
                console.log(this.company);
                this.$refs[ruleForm3].validate((valid) => {
                    if (valid) {
                        this.$confirm('此操作将保存表中信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            //税率校验
                            console.log(this.invoiceregion);
                            this.PublicPreservation();
                            this.InteractiveData(3);
                            this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/save', JSON.stringify(this.Interactive),{
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
                                    this.DisableTab4 = false;
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.body.message,
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
                        this.$message.error('请填写是否开发票');
                    }
                })
            },
//发票信息结束
//table4
//合同唯一
            contractid(){
                if (this.contract.id == '') {
                    return
                }
                if (this.ContractNumber == this.contract.id){
                    this.errcode4 = 0;
                }else {
                    let page = JSON.stringify({
                        token : this.token,
                        contractId:this.contract.id,
                    });
                    this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/check/customerbycontractid',page, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res);
                        if (res.body.errcode == 0){
                            this.errcode4 = res.body.errcode;
                            this.$message({
                                showClose: true,
                                message: '合同编号可用',
                                type: 'success'
                            });
                        }else{
                            this.errcode4 = res.body.errcode;
                            this.$message({
                                showClose: true,
                                message: '合同编号不可用',
                                type: 'error'
                            });
                            return false
                        }
                    });
                }
            },
//上传电子合同开始
            Contracts(file, fileList){
                console.log(file.name , fileList);
                this.picListContract=[];
                this.picListContract=fileList;
                console.log(this.picListContract);
                for(var i in this.picListContract) {
                    var fileName = this.picListContract[i].name.substring(this.picListContract[i].name.lastIndexOf("."));
                    if ((fileName != '.jpg') && (fileName != '.png')&& (fileName != '.zip')&& (fileName != '.docx')&&
                        (fileName != '.xlsx')&& (fileName != '.psd')&& (fileName != '.wps')&& (fileName != '.pdf')) {
                        this.picListContract.splice(i,1);
                        this.$message({
                            showClose: true,
                            message: '对不起，系统不支持该格式的文件。',
                            type: 'error'
                        });
                        return false
                    }
                    var size = 0;
                    var num  = 10;
                    size = this.picListContract[i].size;//byte
                    size = size / 1024;//kb
                    size = (size / 1024).toFixed(1);//mb
                    if (size > num){
                        this.picListContract.splice(i,1);
                        this.$message({
                            showClose: true,
                            message: '对不起，您上传的文件大小为'+ size +'文件大小超出10M。上传失败！',
                            type: 'error'
                        });
                        return false
                    }
                }
            },
            uploadFile(){
                    let formdata= new FormData();
                    for(var i in this.picListContract){
                        console.log(this.picListContract[i].raw);
                        console.log(123);
                        formdata.append('contractFile',this.picListContract[i].raw);
                    };
                    console.log(this.picListContract);
                    console.log(789);
                    if(this.picListContract == ''){
                        this.$message({
                            showClose: true,
                            message: '请选择需要上传的文件',
                            type: 'error'
                        });
                        return false
                    }
                    let config = {
                        headers: {
                            'Content-Type':'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
                        }
                    };
                    this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/upload', formdata, config).then(res=> {
                        //做处理
                        console.log(res);
                        if( res.body.errcode == 0 ){
                            console.log(this.fileLists);
                            this.returenName = res.body.result.contractPic;
                            if  (this.fileLists != undefined){
                                this.companyPicFile = this.returenName +','+ this.fileLists;
                                if (this.NonEmpty == '666'){
                                    console.log(789.123);
                                    this.companyPicFile = this.returenName
                                }
                            }else {
                                this.companyPicFile = this.returenName
                            }
                            console.log(256);
                            this.$message({
                                showClose: true,
                                message:res.body.message,
                                type: 'success'
                            });
                        }else {
                            this.$message({
                                showClose: true,
                                message: res.body.message,
                                type: 'error'
                            });
                        }
                    });
            },
            handleRemoveContract(file, fileList) {
                console.log(file.name, fileList);
                this.companyPicFiles = [];
                if (fileList == ''){
                    this.NonEmpty = '666';
                }
                for (var i in fileList) {
                    console.log(fileList[i].name);
                    this.companyPicFiles.push(fileList[i].name);
                    this.companyPicFile = JSON.stringify(this.companyPicFiles).slice(1,-1).replace(/\"/g,"")
                }
            },
            handlePictureCardPreviewContract(file) {
                var fileName = file.name.substring(file.name.lastIndexOf("."));
                if ((fileName != '.jpg') && (fileName != '.png')){
                    window.location.href = file.url;
                    console.log(123);
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
                this.dialogImageUrlContract = file.url;
                this.dialogVisibleContract = true;
            },
            uploadOverrunContract: function() {
                this.$message({
                    type: 'error',
                    message: '上传文件个数超出限制!最多上传10个文件!'
                });
            },
//上传电子合同结束
//上传客户信息表开始
            ClickUpload(file, fileList){
                console.log(file, fileList);
                this.picListCustomerInfo=[];
                this.picListCustomerInfo=fileList;
                console.log(this.picListCustomerInfo);
                for(var i in this.picListCustomerInfo) {
                    var fileName = this.picListCustomerInfo[i].name.substring(this.picListCustomerInfo[i].name.lastIndexOf("."));
                    if ((fileName != '.jpg') && (fileName != '.png')&& (fileName != '.zip')&& (fileName != '.docx')&&
                        (fileName != '.xlsx')&& (fileName != '.psd')&& (fileName != '.wps')&& (fileName != '.pdf')) {
                        this.picListCustomerInfo.splice(i,1);
                        this.$message({
                            showClose: true,
                            message: '对不起，系统不支持该格式的文件。',
                            type: 'error'
                        });
                        return false
                    }
                    var size = 0;
                    var num  = 10;
                    size = this.picListCustomerInfo[i].size;//byte
                    size = size / 1024;//kb
                    size = (size / 1024).toFixed(1);//mb
                    if (size > num){
                        this.picListCustomerInfo.splice(i,1);
                        this.$message({
                            showClose: true,
                            message: '对不起，您上传的文件大小为'+ size +'文件大小超出10M。上传失败！',
                            type: 'error'
                        });
                        return false
                    }
                }
            },
            uploadFileInfo(){
                let formdata= new FormData();
                for(var i in this.picListCustomerInfo){
                    console.log(this.picListCustomerInfo[i].raw);
                    console.log(123);
                    formdata.append('customerInfo',this.picListCustomerInfo[i].raw);
                };
                if(this.picListCustomerInfo == ''){
                    this.$message({
                        showClose: true,
                        message: '请选择需要上传的文件',
                        type: 'error'
                    });
                    return false
                }
                let config = {
                    headers: {
                        'Content-Type':'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
                    }
                };
                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/upload', formdata, config).then(res=> {
                    //做处理
                    console.log(res);
                    if( res.body.errcode == 0 ){
                        this.returnCustomer = res.body.result.customerInfoResult;
                        if  (this.CustomerList != undefined){
                            this.customerInfo = this.returnCustomer +','+ this.CustomerList;
                            if (this.NonEmpty == '666'){
                                this.customerInfo = this.returnCustomer
                            }
                        }else {
                            this.customerInfo = this.returnCustomer
                        }
                            this.$message({
                                showClose: true,
                                message:res.body.message,
                                type: 'success'
                            });
                    }else {
                        this.$message({
                            showClose: true,
                            message: res.body.message,
                            type: 'error'
                        });
                    }
                });
            },
            handleRemoveInformationTable(file, fileList) {
                this.customerInfos=[];
                if (fileList == ''){
                    this.NonEmpty = '666';
                }
                console.log(file.name, fileList);
                for (var i in fileList) {
                    this.customerInfos.push(fileList[i].name);
                    this.customerInfo = JSON.stringify(this.customerInfos).slice(1,-1).replace(/\"/g,"")
                }
            },
            ViewCustomerInformationTable(file) {
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
                this.dialogImageUrlContract = file.url;
                this.dialogVisibleContract = true;
                this.dialogImageUrlContract = file.url;
                this.dialogVisibleContract = true;
            },
            uploadOverrunInformationTable: function() {
                this.$message({
                    type: 'error',
                    message: '上传文件个数超出限制!最多上传10个文件!'
                });
            },
//上传客户信息表结束
//table4点击下一步开始
//             ContractInformation(contract){
//                 console.log(this.contract);
//                 this.$refs[contract].validate((valid) => {
//                     if (valid) {
//                         if (this.judgingModel.length === 0){
//                             this.$message({
//                                 showClose: true,
//                                 message: '请点击添加价格明细！',
//                                 type: 'error'
//                             });
//                             return false
//                         }
//                         this.$confirm('此操作将保存表中数据, 是否继续?', '提示', {
//                             confirmButtonText: '确定',
//                             cancelButtonText: '取消',
//                             type: 'warning'
//                         }).then(() => {
//
//                             //校验合同
//                             if  (this.errcode4 != 0){
//                                 this.$message.error('您输入的合同编号已重复！');
//                                 return false
//                             };
//                             var str = this.collection;
//                             if(this.companyPicFile == ''){
//                                 this.$message({
//                                     showClose: true,
//                                     message: '请选取客户信息表文件',
//                                     type: 'error'
//                                 });
//                                 return false
//                             }
//                             if(this.customerInfo == ''){
//                                 this.$message({
//                                     showClose: true,
//                                     message: '请选取客户信息表文件',
//                                     type: 'error'
//                                 });
//                                 return false
//                             }
//                             this.collection = str.slice(0,1);
//                             console.log(this.collection);
//                             //校验合同归档日期
//                             if (this.contract.isArchived == '1'){
//                                 if (this.archivedDate == null || this.archivedDate === "NaN-NaN-NaN" ){
//                                     this.$message({
//                                         showClose: true,
//                                         message: '请填写合同归档日期',
//                                         type: 'error'
//                                     });
//                                     return false
//                                 }
//                             }
//                             //校验合同起止日期
//                             console.log(this.value12);
//                             if (this.ruleForm2.type != 'InterimCustomer'&&this.contract.isArchived != '0') {
//                                 if (this.value12 == null || this.value12 === "NaN-NaN-NaN" || this.value12 === ""){
//                                     this.$message({
//                                         showClose: true,
//                                         message: '请填写合同起止日期',
//                                         type: 'error'
//                                     });
//                                     return false;
//                                 }
//                             }
//                             //校验承诺期
//                             if (this.commitment1 == ''){
//                                 this.$message({
//                                     showClose: true,
//                                     message: '请填写承诺期',
//                                     type: 'error'
//                                 });
//                                 return false
//                             }
//                             //催收期
//                             if (this.collection == ''){
//                                 this.$message({
//                                     showClose: true,
//                                     message: '请填写催收期',
//                                     type: 'error'
//                                 });
//                                 return false
//                             }
//                             if(this.archivedDate === 'NaN-NaN-NaN'){
//                                 this.archivedDate = '';
//                             }
//                             if ( this.contract.isArchived == '已归档' ){
//                                 this.contract.isArchived = '1';
//                             }else if (this.contract.isArchived == '未归档'){
//                                 this.contract.isArchived = '0';
//                                 this.archivedDate = '';
//                             };
//                             if (this.commitment1 == ''){
//                                 this.$message({
//                                     showClose: true,
//                                     message: '请填写承诺期',
//                                     type: 'error'
//                                 });
//                                 return false
//                             }
//                             this.PublicPreservation();
//                             this.activeName = 'system';
//
//                         }).catch(() => {
//                             this.$message({
//                                 type: 'info',
//                                 message: '已取消下一步'
//                             });
//                         });
//                     }
//                 })
//             },
//点击下一步结束
//table4点击保存

            Customer() {
                this.$refs.mark.$el.querySelector('input').focus();
                if (this.contract.billCycle*100 >= this.contract.driverBillCycle*100) {
                    this.contract.driverBillCycle = '';
                    this.$message({
                        showClose: true,
                        message:'您输入的司机结算账期不小于客户结算账期,请重新输入！',
                        type: 'error'
                    });
                }else {

                }
            },
            Settlement(){
                if (this.contract.billCycle == '') {
                    this.contract.driverBillCycle = '';
                    this.$message({
                        showClose: true,
                        message: '请先填写客户结算周期！',
                        type: 'error'
                    });
                    return;
                }else{
                    if (this.contract.billCycle*100 >= this.contract.driverBillCycle*100) {
                        this.contract.driverBillCycle = '';
                        this.$message({
                            showClose: true,
                            message:'您输入的司机结算账期不小于客户结算账期,请重新输入！',
                            type: 'error'
                        });
                    }else {

                    }
                }
            },
            submitForm4(contract) {
                console.log(this.judgingModel);
                this.$refs[contract].validate((valid) => {
                    if (valid) {
                        this.$confirm('此操作将提交表中信息, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            if (this.judgingModel.length === 0){
                                this.$message({
                                    showClose: true,
                                    message: '请点击添加价格明细！',
                                    type: 'error'
                                });
                                return false
                            }

                                console.log(123);
                                //校验合同唯一性
                                if  (this.errcode4 != 0){
                                    this.$message.error('您输入的合同编号已重复！');
                                    return false
                                };
                                if(this.companyPicFile == '' ){
                                    this.$message({
                                        showClose: true,
                                        message: '请选取客户信息表文件',
                                        type: 'error'
                                    });
                                    return false
                                }
                                if(this.customerInfo == ''){
                                    this.$message({
                                        showClose: true,
                                        message: '请选取客户信息表文件',
                                        type: 'error'
                                    });
                                    return false
                                }
                                console.log(this.companyPicFile);
                                //校验合同归档日期
                                if (this.contract.isArchived == '1'){
                                    if (this.archivedDate == null || this.archivedDate === "NaN-NaN-NaN" ){
                                        this.$message({
                                            showClose: true,
                                            message: '请填写合同归档日期',
                                            type: 'error'
                                        });
                                        return false
                                    }
                                }
                                //校验合同起止日期
                                console.log(this.value12);
                                // console.log(78946123);
                                // if (this.ruleForm2.type != 'InterimCustomer'&&this.contract.isArchived != '0') {
                                //     if (this.value12 == null || this.value12 === "NaN-NaN-NaN" || this.value12 === ""){
                                //         this.$message({
                                //             showClose: true,
                                //             message: '请填写合同起止日期',
                                //             type: 'error'
                                //         });
                                //         return false;
                                //     }
                                // }
                                console.log(this.value12);
                                //校验承诺期
                                if (this.commitment1 == ''){
                                    this.$message({
                                        showClose: true,
                                        message: '请填写承诺期',
                                        type: 'error'
                                    });
                                    return false
                                }
                                //催收期
                                if (this.collection == ''){
                                    this.$message({
                                        showClose: true,
                                        message: '请填写催收期',
                                        type: 'error'
                                    });
                                    return false
                                }
                                if(this.archivedDate === 'NaN-NaN-NaN'){
                                    this.archivedDate = '';
                                }
                                if ( this.contract.isArchived == '已归档' ){
                                    this.contract.isArchived = '1'
                                }else if (this.contract.isArchived == '未归档'){
                                    this.contract.isArchived = '0'
                                    this.archivedDate = '';
                                }
                                if (this.commitment1 == ''){
                                    this.$message({
                                        showClose: true,
                                        message: '请填写承诺期',
                                        type: 'error'
                                    });
                                    return false
                                }
                                if (this.insuranceInformation == true) {
                                    this.insuranceInformations = '畅心保高价值货物险'
                                }else {
                                    this.insuranceInformations = ''
                                }
                                if (this.contract.driverBillCycleType == 'B') {
                                    this.contract.driverBillCycle = ''
                                }
                                this.PublicPreservation();
                                this.InteractiveData();
                                this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/commit', JSON.stringify(this.Interactive),{
                                    headers: {
                                        'Content-Type': 'application/json;charset=UTF-8'
                                    }
                                }).then((res) => {
                                    if (res.body.errcode == 0) {
                                        this.$message({
                                            showClose: true,
                                            message: res.body.message,
                                            type: 'success'
                                        });
                                        this.$router.push({path:'/ApprovalList'});
                                        this.DisableTab5 = false;
                                    }else {
                                        this.$message({
                                            showClose: true,
                                            message:res.body.message,
                                            type: 'error'
                                        });
                                    }
                                });
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消提交'
                                });
                            });
                        } else {
                            this.$message.error("确保信息完整！");
                            return false;
                        }
                });
            },

            //用户名唯一
            UserNameOnly(){
                if (this.UniqueUserName == this.settings.customerNameEn){
                    this.errcode5 = 0;
                }else {
                    if(this.settings.customerNameEn.match(/^([A-Za-z]|[0-9]){2,20}$/)){
                        this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/check/customerbyname', JSON.stringify({
                            "token":this.token,
                            "username":this.settings.customerNameEn,
                        }),{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            console.log(res);
                            if (res.body.errcode == 0) {
                                this.errcode5 = res.body.errcode;
                                    this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'success'
                                });
                            }else {
                                this.errcode5 = res.body.errcode;
                                this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'error'
                                });
                            }
                        })
                    }
                }
            },
            //电话号码唯一
            PhoneNumberOnly(){
                if (this.TelephoneNumberUnique == this.settings.phone) {
                    this.errcode5Phone = 0
                }else {
                    if(this.settings.phone.match(/^(13|14|15|17|18|19)[0-9]{9}$/)){
                        this.$http.post(this.global.lightningUrl + '/companyv1/customerManage/check/customerbyphone', JSON.stringify({
                            "token":this.token,
                            "phoneNum":this.settings.phone,
                        }),{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            if (res.body.errcode == 0) {
                                this.errcode5Phone = res.body.errcode;
                                this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'success'
                                });
                            }else {
                                this.errcode5Phone = res.body.errcode;
                                this.$message({
                                    showClose: true,
                                    message: res.body.message,
                                    type: 'error'
                                });
                            }
                        })
                    }
                }
            },
//点击保存结束
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
<style lang="scss" >
    .change_insert{
        width:100%;
        .nav{
            background: white;
            width:100%;
            margin-top:20px;
            .el-tabs__nav-scroll {
                border-bottom: 2px solid white;
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
                    border-top: 3px solid transparent;
                    padding-left:20px;
                }
                .el-tabs__active-bar{
                    background: white;
                }
                .is-active {
                    border-top-color: #337df6;
                    border-bottom: 2px solid transparent;
                }
            }
            .Modality{
                .el-dialog{
                    width:80%;
                }
                .el-radio{
                    line-height: 3;
                    float: left;
                    width:25%;
                    margin-left:35px;
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
                        .q2{
                            overflow: hidden;
                            .el-input{
                                width:50%;
                            }
                        }
                    }
                }

                .btn{
                    margin:20px 0;
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

                    padding:20px 0;
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

                    padding:20px 0;

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
                        width: 100%;
                        overflow: hidden;
                        li {
                            height:45px;
                            width: 50%;
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

                    padding:20px 0;

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
                    width: 30%;
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
                                width:30%;
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
                    padding:20px 0;
                    text-align: center;
                }
            }
        }
    }
</style>