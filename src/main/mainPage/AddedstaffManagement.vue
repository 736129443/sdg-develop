<template>
    <div class="AddedstaffManagement main">
        <div class="header">
            当前位置 : <span>组织管理 > 员工管理 >  <span v-if="$route.query.type == 'add'">新建员工</span><span v-if="$route.query.type == 'compile'">编辑员工</span><span v-if="$route.query.type == 'Details'">员工详情</span> </span>
        </div>
        <!--<div class="tit">基本信息</div>-->
        <el-form :inline="true" :model="formInline"  ref="formInline" :disabled="readonly" :rules="rules" class="forms demo-form-inline"
                 label-width="150px">
            <div class="tit" v-if="stafBaseInfo">基本信息</div>
            <div class="one" v-if="stafBaseInfo">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="员工编号" prop="employeeNo" >
                            <el-input v-model="formInline.employeeNo" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入员工编号" :disabled="readonly1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属区域" prop="regionId" >
                            <el-select v-model="formInline.regionId" placeholder="请选择所属区域" @change='onregionId'>
                                <el-option v-for="link in arr" :label='link.name' :value="link.name"
                                           :key="link.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属分公司" prop="filialeId">
                            <el-select v-model="formInline.filialeId" placeholder="请选择所属分公司" @change='onfilialeId'>
                                <el-option v-for="link in list" :label='link.deptName' :value="link.deptName"
                                           :key="link.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="部门" prop="deptNameid">
                            <el-select v-model="formInline.deptNameid" placeholder="请选择分公司"  @change='onregionId'>
                                <el-option v-for="link in deptName" :label='link.deptName' :value="link.deptName"
                                           :key="link.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">

                        <el-form-item label="职务" prop="duty">
                            <el-select v-model="formInline.duty" placeholder="请选择分公司">
                                <el-option label="项目驻场" value="项目驻场"></el-option>
                                <el-option label="顾问" value="顾问"></el-option>
                                <el-option label="司机" value="司机"></el-option>
                                <el-option label="专员" value="专员"></el-option>
                                <el-option label="主管" value="主管"></el-option>
                                <el-option label="经理" value="经理"></el-option>
                                <el-option label="负责人" value="负责人"></el-option>
                                <el-option label="需求分析工程师" value="需求分析工程师"></el-option>
                                <el-option label="研发总监" value="研发总监"></el-option>
                                <el-option label="架构师" value="架构师"></el-option>
                                <el-option label="开发工程师" value="开发工程师"></el-option>
                                <el-option label="测试工程师" value="测试工程师"></el-option>
                                <el-option label="产品经理" value="产品经理"></el-option>
                                <el-option label="UI设计工程师" value="UI设计工程师"></el-option>
                                <el-option label="法务专员" value="法务专员"></el-option>
                                <el-option label="项目支持" value="项目支持"></el-option>
                                <el-option label="副总裁" value="副总裁"></el-option>
                                <el-option label="董事长" value="董事长"></el-option>
                                <el-option label="城市经理" value="城市经理"></el-option>
                                <el-option label="总监" value="总监"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="8">-->

                    <!--</el-col>-->
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="姓名" prop="name" >
                            <el-input v-model="formInline.name" onkeyup="this.value=this.value.replace(/\s+/g,'')" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别" class="is-required">
                            <el-select v-model="formInline.sex" placeholder="请选择性别">
                                <el-option label='男' value="男"></el-option>
                                <el-option label='女' value="女"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="民族" prop="nation" >
                            <el-input  v-model="formInline.nation" placeholder="请输入民族" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="电话" prop="phone">
                            <el-input v-model="formInline.phone" placeholder="请输入电话" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="邮箱" >
                            <el-input v-model="formInline.email" placeholder="请输入邮箱" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="用工类型" prop="employType">

                            <el-select v-model="formInline.employType" placeholder="请选择用工类型">
                                <el-option label="全日制" value="全日制"></el-option>
                                <el-option label="第三方驻派" value="第三方驻派"></el-option>
                                <el-option label="兼职" value="兼职"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="任职状态" prop="status" >
                            <el-select v-model="formInline.status" placeholder="请选择状态" >
                                <el-option label="在职" value="在职"></el-option>
                                <el-option label="离职" value="离职"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="入职时间" prop="entryDate">
                            <el-date-picker
                                    @change='onseniority'
                                    value-format="timestamp"
                                    v-model="formInline.entryDate"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="转正时间" >
                            <el-date-picker
                                    @change='onseniority'
                                    value-format="timestamp"
                                    v-model="formInline.turnDate"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8" v-if="formInline.status == '离职'">
                        <el-form-item label="离职时间" prop="leaveDate">
                            <el-date-picker
                                    v-model="formInline.leaveDate"
                                    value-format="timestamp"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!--】========================-->
                    <el-col :span="8" v-if="formInline.status == '离职'">
                        <el-form-item label="工作交接人" prop="successorName">
                            <el-input v-model="formInline.successorName" placeholder="请输入交接人姓名" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="是否调岗" >
                            <el-select v-model="formInline.isTransfer" placeholder="请选择">
                                <el-option label="是" value="是"></el-option>
                                <el-option label="否" value="否"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formInline.isTransfer =='是'">
                        <el-form-item label="调岗日期"  >
                            <el-date-picker
                                    v-model="formInline.transferDate "
                                    value-format="timestamp"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formInline.isTransfer =='是'">
                        <el-form-item label="调岗职位"  >
                            <el-input v-model="formInline.transferJob" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="工龄" v-if="$route.query.type != 'add'" class="month">
                            <el-input v-model="formInline.seniority" readonly></el-input>
                            <span class="gold">月</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="招聘渠道" >
                            <el-select v-model="formInline.hireChannel" placeholder="请选择">
                                <el-option label="内推" value="内推"></el-option>
                                <el-option label="外聘" value="外聘"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formInline.hireChannel =='内推'">
                        <el-form-item label="推荐人姓名" prop="referrer">
                            <el-input v-model="formInline.referrer" placeholder="请输入姓名" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="是否在我司有亲属" >
                            <el-select v-model="formInline.hasFamily" placeholder="请选择">
                                <el-option label="是" value="是"></el-option>
                                <el-option label="否" value="否"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="formInline.hasFamily =='是'">
                        <el-form-item label="亲属姓名" prop="familyName" >
                            <el-input v-model="formInline.familyName" placeholder="请输入姓名" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div class="tit" v-if="stafPersonalInfo">个人信息</div>
            <!--<br>-->
            <div class="one" v-if="stafPersonalInfo">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="婚姻状况" class="is-required">

                            <el-select v-model="formInline.maritalStatus" placeholder="请选择婚姻状况">
                                <el-option label="未婚" value="未婚"></el-option>
                                <el-option label="已婚" value="已婚"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="学历" class="is-required" prop="education">
                            <el-select v-model="formInline.education" placeholder="请选择学历">
                                <el-option label="小学" value="小学"></el-option>
                                <el-option label="初中" value="初中"></el-option>
                                <el-option label="高中" value="高中"></el-option>
                                <el-option label="大专" value="大专"></el-option>
                                <el-option label="本科" value="本科"></el-option>
                                <el-option label="硕士" value="硕士"></el-option>
                                <el-option label="博士" value="博士"></el-option>
                                <el-option label="博士后" value="博士后"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="毕业院校" prop="university" >
                            <el-input v-model="formInline.university"  placeholder="请输入毕业院校" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="专业" >
                            <el-input v-model="formInline.speciality"  placeholder="请输入专业" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出生日期" prop="birthday">
                            <el-date-picker
                                    v-model="formInline.birthday"
                                    type="date"
                                    placeholder="选择日期"
                                    value-format="timestamp">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身份证号" prop="idCard">
                            <el-input v-model="formInline.idCard" placeholder="请输入身份证号" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" v-if="$route.query.type == 'Details'">
                        <el-form-item label="年龄" prop="age" >
                            <el-input v-model="formInline.age"  placeholder="请输入年龄" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="籍贯" prop="nativePlace" >
                            <el-input v-model="formInline.nativePlace"  placeholder="请输入籍贯" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="户籍所在地" prop="censusPlace" >
                            <el-input v-model="formInline.censusPlace"  placeholder="请输入户籍所在地" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="现住址" prop="address">
                            <el-input v-model="formInline.address" placeholder="请输入现住址" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="户籍性质" prop="censusType">
                            <el-select v-model="formInline.censusType"  placeholder="请选择户籍性质">
                                <el-option label="城镇" value="城镇"></el-option>
                                <el-option label="农村" value="农村"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="紧急联系人" prop="emergencyContact">
                            <el-input v-model="formInline.emergencyContact"  placeholder="请输入紧急联系人" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="紧急联系人关系" prop="emergencyContactType" >
                            <el-select v-model="formInline.emergencyContactType"  placeholder="请选择">
                                <el-option label="父" value="父"></el-option>
                                <el-option label="母" value="母"></el-option>
                                <el-option label="子女" value="子女"></el-option>
                                <el-option label="夫妻" value="夫妻"></el-option>
                                <el-option label="亲戚" value="亲戚"></el-option>
                                <el-option label="朋友" value="朋友"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="紧急联系人电话" prop="emergencyContactPhone">
                            <el-input v-model="formInline.emergencyContactPhone" placeholder="请输入联系人电话" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注" >
                            <el-input
                                    type="textarea"
                                    :rows="3"
                                    placeholder="请输入内容"
                                    v-model="formInline.remark">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div class="tit" v-if="stafContractInfo">合同信息</div>
            <div class="one" v-if="stafContractInfo" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="劳动合同编号" prop="contractNo" >
                            <el-input v-model="formInline.contractNo" placeholder="请输入劳动合同编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="劳动合同归档日期" prop="contractArchiveDate">
                            <!--<el-input v-model="formInline.contractArchiveDate" ></el-input>-->
                            <el-date-picker
                                    v-model="formInline.contractArchiveDate"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="timestamp"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="银行账号（工行）" prop="cardNumFirst">
                            <el-input v-model="formInline.cardNumFirst" placeholder="请输入银行账号（工行）" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="持卡人姓名（工行）" prop="peopleFirst">
                            <el-input v-model="formInline.peopleFirst" placeholder="请输入持卡人姓名" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开户行信息（工行）" prop="bankNameFirst">
                            <el-input v-model="formInline.bankNameFirst" placeholder="请输入开户行信息" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="银行账号（农行）" prop="cardNumSecond">
                            <el-input v-model="formInline.cardNumSecond" placeholder="请输入银行账号（农行）" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="持卡人姓名（农行）" prop="peopleSecond">
                            <el-input v-model="formInline.peopleSecond" placeholder="请输入持卡人姓名" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开户行信息（农行）" prop="bankNameSecond">
                            <el-input v-model="formInline.bankNameSecond" placeholder="请输入开户行信息" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="我司社保缴纳时间">
                            <el-date-picker
                                    v-model="formInline.insuranceDate"
                                    value-format="timestamp"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="缴纳城市">
                            <el-input v-model="formInline.insuranceCity" placeholder="请输入缴纳城市" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="我司公积金缴纳时间">
                            <el-date-picker
                                    v-model="formInline.accumulationFundDate"
                                    value-format="timestamp"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="缴纳城市">
                            <el-input v-model="formInline.accumulationFundCity" placeholder="请输入缴纳城市" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <!--<br>-->
            <div class="one" style="text-align: center" v-if="$route.query.type != 'Details'">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('formInline')" v-if="$route.query.type == 'add'">提 交</el-button>
                    <el-button type="primary" @click="submitForm('formInline')" v-if="$route.query.type == 'compile'">保 存</el-button>

                </el-form-item>
            </div>
        </el-form>
        <div class="one btn">
            <el-button type="primary"  @click="$router.push({path: '/staffManagement'})" v-if="$route.query.type == 'Details'">返 回</el-button>

        </div>

    </div>
</template>

<script>
    import {provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText,TextToCode,code} from 'element-china-area-data';
    export default {
        name: "AddedstaffManagement",
        created() {
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/region/all_region', JSON.stringify({
                token: this.token,
            })).then(run => {
                this.arr = run.body.result
            })
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByAreaId', JSON.stringify({
                token: this.token,
                pid: 0,
            })).then(run => {
                console.log(run);
                if (run.body.errcode == 0) {
                    this.list = run.body.result.deptList
                }
            });
            let page1=JSON.stringify({
                token: this.token,
                pageNum : 1,
                pageSize : 10000,
                roleStatus : 1 ,
            });
            this.$http.post( this.global.lightningUrl + '/companyv1/security/role/list',page1 ,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                this.options3 = res.body.result.rows
            })
            if ( this.$route.query.type == 'Details'){
                this.readonly = true
                let page = JSON.stringify({
                    token:this.token,
                    id :this.$route.query.no
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/userManage/employee/get',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    //console.log(res.body.result);
                    let formInlines = res.body.result;
                    this.formInline = formInlines
                    this.formInline.regionId = formInlines.regionName
                    this.formInline.filialeId = formInlines.filialeName
                    this.formInline.deptNameid = formInlines.deptName
                })
            }
            if (this.$route.query.type == 'compile' ) {
                // this.readonly1 = true
                let formInlines
                let page = JSON.stringify({
                    token:this.token,
                    id :this.$route.query.no
                })
                this.$http.post(this.global.lightningUrl +'/companyv1/userManage/employee/get',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    formInlines = res.body.result;
                    console.log(formInlines);
                    this.formInline = formInlines
                    this.formInline.regionId = formInlines.regionName
                    this.formInline.filialeId = formInlines.filialeName
                    this.formInline.deptNameid = formInlines.deptName
                    // alert(this.formInline.filialeId)list
                    this.onlist(this.formInline.filialeId)

                })
            }
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));

            // if (jurisdictions[1].menus.length == 13){
                // 'stafBaseInfo':'员工基本信息','stafPersonalInfo':'员工个人信息','stafContractInfo':'员工合同信息'
                // 10   11   12
                this.stafBaseInfo = jurisdictions[1].menus[10].choose;  //详情
                this.stafPersonalInfo = jurisdictions[1].menus[11].choose; //导入
                this.stafContractInfo = jurisdictions[1].menus[12].choose; //导出
            // }
        },
        data() {
            return {
                formInline: {
                    sex: '男',
                    employType: '全日制',
                    status: '',
                    maritalStatus:'未婚',
                    deptNameid:'',
                    isTransfer:'否'
                },
                options2:regionData,
                readonly:false,
                readonly1:false,
                rules: {
                    employeeNo:[
                        {required: true, message: '请输入', trigger: 'blur'},
                        {
                            pattern: /^[a-zA-Z0-9]+$/,message: '请输入字母或数字',trigger: 'blur'
                        },
                    ],
                    regionId: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    filialeId: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    deptNameid: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    duty: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    birthday:[
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    name: [
                        {required: true, message: '请输入', trigger: 'blur'},
                        {pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '姓名不规范', trigger: 'blur'},
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    successorName :[
                        {required: true, message: '请输入', trigger: 'blur'},
                        {pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '姓名不规范', trigger: 'blur'},
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    referrer: [
                        {required: true, message: '请输入', trigger: 'blur'},
                        {pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '姓名不规范', trigger: 'blur'},
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    familyName: [
                        {required: true, message: '请输入', trigger: 'blur'},
                        {pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '姓名不规范', trigger: 'blur'},
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    nation: [
                        {required: true, message: '请输入', trigger: 'blur'},
                        {pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{1,10}$/, message: '内容不规范', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入电话', trigger: 'blur'},
                        {pattern: /^0?(13|14|15|17|18|19)[0-9]{9}$/, message: '请输入正确电话号', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {
                            pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                            message: '请输入正确邮箱地址',
                            trigger: 'blur'
                        },
                    ],
                    employType: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    status: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    entryDate: [
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    leaveDate: [

                        {required: true, message: '请选择', trigger: 'change'}
                    ],

                    emergencyContactType:[
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    education:[
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    university:[
                        {required: true, message: '请输入', trigger: 'blur'},
                        {pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,10}$/, message: '内容不规范', trigger: 'blur'},
                    ],
                    idCard:[
                        {required: true, message: '请输入', trigger: 'blur'},
                        {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '内容不规范', trigger: 'blur'},

                    ],
                    bankNameSecond:[
                        {required: true, message: '请输入开户行信息', trigger: 'blur'},
                        // {pattern: /^\w$/, message: '请输入开户行信息', trigger: 'blur'},
                    ],
                    peopleSecond:[
                        {required: true, message: '请输入持卡人姓名', trigger: 'blur'},
                        {pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '姓名不规范', trigger: 'blur'},
                    ],
                    cardNumSecond:[
                        {required: true, message: '请输入银行卡号', trigger: 'blur'},
                        {pattern: /^[\d-]{5,50}$/,  message: '银行卡号不规范', trigger: 'blur'},
                    ],

                    bankNameFirst:[
                        {required: true, message: '请输入开户行信息', trigger: 'blur'},
                    ],
                    peopleFirst:[
                        {required: true, message: '请输入持卡人姓名', trigger: 'blur'},
                        {pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '姓名不规范', trigger: 'blur'},
                    ],
                    cardNumFirst:[
                        {required: true, message: '请输入银行卡号', trigger: 'blur'},
                        {pattern: /^[\d-]{5,50}$/,  message: '银行卡号不规范', trigger: 'blur'},
                    ],
                    age:[
                        {required: true, message: '请输入年龄', trigger: 'blur'},
                        {pattern: /^\d{2}$/, message: '年龄不规范', trigger: 'blur'},
                    ],
                    contractArchiveDate:[
                        {required: true, message: '请选择', trigger: 'change'}
                    ],
                    contractNo:[
                        {required: true, message: '请输入劳动合同编号', trigger: 'blur'},
                    ],
                    emergencyContactPhone:[
                        {required: true, message: '请输入电话', trigger: 'blur'},
                        {pattern: /^((0\d{2,3}-?\d{7,8})|(\d{11}))$/, message: '请输入正确电话号', trigger: 'blur'},
                    ],
                    emergencyContactType:[
                        {required: true, message: '请选择紧急联系人关系', trigger: 'change'}
                    ],
                    emergencyContact:[
                        {required: true, message: '请输入紧急联系人', trigger: 'blur'},
                        {pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '姓名不规范', trigger: 'blur'},
                    ],
                    address:[
                        {required: true, message: '请输入现住址', trigger: 'blur'},
                        // /[^\x00-\xff]|[A-Za-z0-9_]/ig
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]*$/, message: '住址不规范', trigger: 'blur'},
                    ],
                    censusPlace:[
                        {required: true, message: '请输入户籍所在地', trigger: 'blur'},
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]*$/, message: '户籍所在地不规范', trigger: 'blur'},
                    ],
                    nativePlace:[
                        {required: true, message: '请输入籍贯', trigger: 'blur'},
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*()=|{}':;',?！￥…（）%——【】‘；：”“'。，、？\n\r ]{2,20}$/, message: '内容不规范', trigger: 'blur'},

                    ],
                    censusType:[
                        {required: true, message: '请选择户籍性质', trigger: 'change'},

                    ]
                },
                arr: '',
                list: '',
                deptName: "",
                options3:'',
                stafBaseInfo:false,
                stafPersonalInfo:false,
                stafContractInfo:false,
            }
        },
        methods: {
            onlist(k){
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].deptName == k){
                        k = this.list[i].id
                    }

                }
                let page = JSON.stringify({
                    token: this.token,
                    id: k,
                });
                console.log(page);
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptTreeByDeptId', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    // this.formInline.deptNameid = ''
                    this.deptName = res.body.result.deptList;

                })
            },
            submitForm(formInline) {

                this.$refs[formInline].validate((valid) => {
                    if (valid) {
                        if (this.$route.query.type == 'add') {
                            let page = JSON.stringify({
                                token:this.token,
                                regionName:this.formInline.regionId,
                                filialeName:this.formInline.filialeId,
                                deptName:this.formInline.deptNameid,
                                duty:this.formInline.duty,
                                email:this.formInline.email,
                                nation:this.formInline.nation,
                                employType:this.formInline.employType,
                                status:this.formInline.status,
                                entryDate:this.formInline.entryDate,
                                turnDate:this.formInline.turnDate,
                                hireChannel:this.formInline.hireChannel,
                                referrer:this.formInline.referrer,
                                hasFamily:this.formInline.hasFamily,
                                familyName:this.formInline.familyName,
                                leaveDate:this.formInline.leaveDate,
                                successorId:this.formInline.successorId,
                                maritalStatus:this.formInline.maritalStatus,
                                education:this.formInline.education,
                                university:this.formInline.university,
                                speciality:this.formInline.speciality,
                                birthday:this.formInline.birthday,
                                idCard:this.formInline.idCard,
                                nativePlace:this.formInline.nativePlace,
                                censusPlace:this.formInline.censusPlace,
                                censusType:this.formInline.censusType,
                                emergencyContact:this.formInline.emergencyContact,
                                emergencyContactType:this.formInline.emergencyContactType,
                                emergencyContactPhone:this.formInline.emergencyContactPhone,
                                remark:this.formInline.remark,
                                contractNo:this.formInline.contractNo,
                                contractArchiveDate:this.formInline.contractArchiveDate,
                                bankNameFirst:this.formInline.bankNameFirst,
                                cardNumFirst:this.formInline.cardNumFirst,
                                peopleFirst:this.formInline.peopleFirst,
                                bankNameSecond:this.formInline.bankNameSecond,
                                cardNumSecond:this.formInline.cardNumSecond,
                                peopleSecond:this.formInline.peopleSecond,
                                name:this.formInline.name,
                                age:this.formInline.age,
                                sex:this.formInline.sex,
                                address:this.formInline.address,
                                phone:this.formInline.phone,
                                employeeNo:this.formInline.employeeNo,
                                insuranceDate:this.formInline.insuranceDate,
                                insuranceCity:this.formInline.insuranceCity,
                                accumulationFundDate:this.formInline.accumulationFundDate,
                                accumulationFundCity:this.formInline.accumulationFundCity,
                                isTransfer:this.formInline.isTransfer,
                                transferDate:this.formInline.transferDate,
                                transferJob:this.formInline.transferJob,
                                successorName:this.formInline.successorName,
                            })
                            this.$http.post(this.global.lightningUrl +'/companyv1/userManage/employee/create',page,{
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            }).then((res)=>{
                                console.log(res);
                                if (res.body.errcode == 0){
                                    this.$message({
                                        message: res.body.message,
                                        type: 'success'
                                    });
                                    this.$router.push({path: '/staffManagement'})
                                }else{
                                    // this.$message({
                                    //     message: res.body.message,
                                    //     type: 'error'
                                    // });
                                    this.$message.error(res.body.message);
                                }
                            })
                        }else if (this.$route.query.type == 'compile') {
                            let page = JSON.stringify({
                                token:this.token,
                                id:this.$route.query.no,
                                regionName:this.formInline.regionId,
                                filialeName:this.formInline.filialeId,
                                deptName:this.formInline.deptNameid,
                                duty:this.formInline.duty,
                                email:this.formInline.email,
                                nation:this.formInline.nation,
                                employType:this.formInline.employType,
                                status:this.formInline.status,
                                entryDate:this.formInline.entryDate,
                                leaveDate:this.formInline.leaveDate,
                                successorId:this.formInline.successorId,
                                maritalStatus:this.formInline.maritalStatus,
                                education:this.formInline.education,
                                university:this.formInline.university,
                                speciality:this.formInline.speciality,
                                birthday:this.formInline.birthday,
                                idCard:this.formInline.idCard,
                                nativePlace:this.formInline.nativePlace,
                                censusPlace:this.formInline.censusPlace,
                                censusType:this.formInline.censusType,
                                emergencyContact:this.formInline.emergencyContact,
                                emergencyContactType:this.formInline.emergencyContactType,
                                emergencyContactPhone:this.formInline.emergencyContactPhone,
                                remark:this.formInline.remark,
                                contractNo:this.formInline.contractNo,
                                contractArchiveDate:this.formInline.contractArchiveDate,
                                bankNameFirst:this.formInline.bankNameFirst,
                                cardNumFirst:this.formInline.cardNumFirst,
                                peopleFirst:this.formInline.peopleFirst,
                                bankNameSecond:this.formInline.bankNameSecond,
                                cardNumSecond:this.formInline.cardNumSecond,
                                peopleSecond:this.formInline.peopleSecond,
                                name:this.formInline.name,
                                age:this.formInline.age,
                                sex:this.formInline.sex,
                                address:this.formInline.address,
                                phone:this.formInline.phone,
                                employeeNo:this.formInline.employeeNo,
                                turnDate:this.formInline.turnDate,
                                hireChannel:this.formInline.hireChannel,
                                referrer:this.formInline.referrer,
                                hasFamily:this.formInline.hasFamily,
                                familyName:this.formInline.familyName,
                                insuranceDate:this.formInline.insuranceDate,
                                insuranceCity:this.formInline.insuranceCity,
                                accumulationFundDate:this.formInline.accumulationFundDate,
                                accumulationFundCity:this.formInline.accumulationFundCity,
                                isTransfer:this.formInline.isTransfer,
                                transferDate:this.formInline.transferDate,
                                transferJob:this.formInline.transferJob,
                                successorName:this.formInline.successorName,

                            })
                            this.$http.post(this.global.lightningUrl +'/companyv1/userManage/employee/update',page,{
                                headers: {
                                    'Content-Type': 'application/json;charset=UTF-8'
                                }
                            }).then((res)=>{
                                if (res.body.errcode == 0){
                                    this.$message({
                                        message: res.body.message,
                                        type: 'success'
                                    });
                                    this.$router.push({path: '/staffManagement'})
                                }else{
                                    this.$message.error(res.body.message);
                                }
                            })
                        }
                    } else {
                        this.$message({
                            message: '请填写完整信息',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            // 地区级联
            handleItemChange(val) {
                console.log(val);
                this.province = CodeToText[val[0]];
                this.city = CodeToText[val[1]];
                this.countys = CodeToText[val[2]];
            },
            onfilialeId() {
                // this.formInline.deptNameid = ''
                let name ;
                console.log(this.list);
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].deptName == this.formInline.filialeId) {
                        name = this.list[i].id
                    }
                }
                let page = JSON.stringify({
                    token: this.token,
                    id: name,
                });
                console.log(page);
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptTreeByDeptId', page, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    this.formInline.deptNameid = ''
                    this.deptName = res.body.result.deptList;

                })
            },
            onseniority() {
            },
            onregionId(){
                this.$forceUpdate()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .AddedstaffManagement {
        .tit {
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 22px;
            width: 100%;
            border-bottom: 1px solid whitesmoke;
        }
        .one {
            padding: 20px 20px;
            background-color: white;
        }
        .el-textarea{
            width: 200%;


        }
        .el-textarea__inner{
            max-height: 200px;
        }
        .btn{
            text-align: center;
        }
        .month{
            position: relative;
        }
        .gold {
            width: 20px;
            position: absolute;
            top: 0;
            right: 0;
            color: rgb(132, 146, 166);
        }
        .el-input{
            width: 110%;
        }
        .el-date-editor{
            width: 95% ;
        }
    }
</style>