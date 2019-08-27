<template>
    <div class="main increaseWaybill">
        <div class="header">
            当前位置：<span>无车承运数据>电子运单>新建运单</span>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <span class="title">
                基本信息
            </span>
            <div class="basic">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="原始单号" prop="originalDocumentNumber">
                            <el-input v-model="ruleForm.originalDocumentNumber" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="托运单号" prop="shippingNoteNumber">
                            <el-input v-model="ruleForm.shippingNoteNumber" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="承运人" prop="carrier">
                            <el-input v-model="ruleForm.carrier"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="社会统一信用代码" prop="unifiedSocialCreditIdentifier" >
                            <el-input v-model="ruleForm.unifiedSocialCreditIdentifier" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="许可证编号" prop="permitNumberNoTruck">
                            <el-input v-model="ruleForm.permitNumberNoTruck"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="业务类型" prop="businessTypeCode">
                            <el-select v-model="ruleForm.businessTypeCode" placeholder="业务类型">
                                <el-option label="干线普货运输" value="1002996"></el-option>
                                <el-option label="城市配送" value="1003997"></el-option>
                                <el-option label="农村配送" value="1003998"></el-option>
                                <el-option label="集装箱运输" value="1002998"></el-option>
                                <el-option label="其他" value="1003999"></el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="托运日期时间" required prop="consignmentDateTime">
                            <el-date-picker
                                v-model="ruleForm.consignmentDateTime"
                                type="datetime"
                                value-format="timestamp"
                                :picker-options="pickerOptions"
                                placeholder="选择日期时间"
                                default-time="12:00:00">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="发运实际日期时间" required prop="despatchActualDateTime">
                            <el-date-picker
                                v-model="ruleForm.despatchActualDateTime"
                                type="datetime"
                                value-format="timestamp"
                                placeholder="选择日期时间"
                                align="right"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="收货日期时间" required prop="goodsReceiptDateTime">
                            <el-date-picker
                                v-model="ruleForm.goodsReceiptDateTime"
                                type="datetime"
                                value-format="timestamp"
                                placeholder="选择日期时间"
                                align="right"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <span class="title">
                发货信息
            </span>
            <div class="basic">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="发货人" prop="consignor">
                            <el-input v-model="ruleForm.consignor"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="个人证件号" prop="personalIdentityDocument">
                            <el-input v-model="ruleForm.personalIdentityDocument"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!--<el-form-item label="发货地国家行政去列" prop="countrySubdivisionCodeFrom">-->
                            <!--<el-input v-model="ruleForm.countrySubdivisionCodeFrom"></el-input>-->
                        <!--</el-form-item>-->

                        <el-form-item label="发货行政区划" prop="countrySubdivisionCodeFrom">
                            <el-cascader
                                v-model = "ruleForm.countrySubdivisionCodeFrom"
                                :options="options"
                                change-on-select
                            ></el-cascader>
                        </el-form-item>

                    </el-col>
                </el-row>
                <el-row>

                    <el-col  :span="8">
                        <el-form-item label="发货地" prop="placeOfLoading">
                            <el-input v-model="ruleForm.placeOfLoading"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="收货人" prop="consignee">
                            <el-input v-model="ruleForm.consignee"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!--<el-form-item label="收货地国家行政区列" prop="countrySubdivisionCodeTo">-->
                            <!--<el-input v-model="ruleForm.countrySubdivisionCodeTo"></el-input>-->
                        <!--</el-form-item>-->

                        <el-form-item label="收货行政区划" prop="countrySubdivisionCodeTo">
                            <el-cascader
                                v-model = "ruleForm.countrySubdivisionCodeTo"
                                :options="options"
                                change-on-select
                            ></el-cascader>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="收货地" prop="goodsReceiptPlace">
                            <el-input v-model="ruleForm.goodsReceiptPlace"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <span class="title">
                车辆信息
            </span>
            <div class="basic">
                <!--<el-row>-->
                    <!--<el-col :span="8">-->
                        <!--<el-form-item label="注册信息" prop="name">-->
                            <!--<el-radio-group v-model="ruleForm.name">-->
                                <!--<el-radio label="已注册司机"></el-radio>-->
                                <!--<el-radio label="未注册司机"></el-radio>-->
                            <!--</el-radio-group>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->
                <!--<el-row>-->
                    <!--<el-col :span="8">-->
                        <!--<el-form-item label="收货地国家行政区列" prop="name">-->
                            <!--<el-input v-model="ruleForm.name"></el-input>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--<el-col :span="8">-->
                        <!--<el-form-item>-->
                            <!--<el-button type="primary">确定</el-button>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="牌照类型" prop="licensePlateTypeCode">
                            <el-select v-model="ruleForm.licensePlateTypeCode " placeholder="请选择牌照类型" >
                                <el-option label="大型汽车号牌" value="01"></el-option>
                                <el-option label="小型汽车号牌" value="02"></el-option>
                                <el-option label="其他号牌" value="99"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="车辆牌照号" prop="vehicleNumber">
                            <el-input v-model="ruleForm.vehicleNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="挂车牌照号" prop="trailerVehiclePlateNumber">
                            <el-input v-model="ruleForm.trailerVehiclePlateNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col  :span="8">
                        <el-form-item label="车辆分类" prop="vehicleClassificationCode">
                            <el-select v-model="ruleForm.vehicleClassificationCode" placeholder="车辆分类">
                                <el-option v-for="i in classification" :label='i.name' :value="i.id" :key="i.id"></el-option>
                            </el-select>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8">
                        <div style="position: relative">
                            <el-form-item label="车辆载质量(千克)" prop="vehicleTonnage">
                                <el-input v-model="ruleForm.vehicleTonnage"></el-input>
                            </el-form-item>
                            <span style="color:cornflowerblue;position: absolute;top:10px;right:0;">/吨</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="道路运输证号" prop="roadTransportCertificateNumber">
                            <el-input v-model="ruleForm.roadTransportCertificateNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="所有人" prop="owner">
                            <el-input v-model="ruleForm.owner"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="许可证编号" prop="permitNumberOwner">
                            <el-input v-model="ruleForm.permitNumberOwner"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="驾驶员姓名" prop="nameOfPerson">
                            <el-input v-model="ruleForm.nameOfPerson"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="从业资格证" prop="qualificationCertificateNumber">
                            <el-input v-model="ruleForm.qualificationCertificateNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电话号码" prop="telephoneNumber">
                            <el-input v-model="ruleForm.telephoneNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!--<el-row>-->
                    <!--<div class="vehicleInformation">-->
                        <!--<ul>-->
                            <!--<li><span>牌照类型</span><span>{{}}</span></li>-->
                            <!--<li><span>车辆牌照号</span><span>{{}}</span></li>-->
                            <!--<li><span>挂车牌照号</span><span>{{}}</span></li>-->
                        <!--</ul>-->
                        <!--<ul>-->
                            <!--<li><span>车辆分类</span><span>{{}}</span></li>-->
                            <!--<li><span>车辆载重量（吨）</span><span>{{}}</span></li>-->
                            <!--<li></li>-->
                        <!--</ul>-->
                        <!--<ul>-->
                            <!--<li><span>道路运输证号</span><span>{{}}</span></li>-->
                            <!--<li><span>所有人</span><span>{{}}</span></li>-->
                            <!--<li><span>许可证编号</span><span>{{}}</span></li>-->
                        <!--</ul>-->
                        <!--<ul>-->
                            <!--<li><span>驾驶员姓名</span><span>{{}}</span></li>-->
                            <!--<li><span>从业资格证</span><span>{{}}</span></li>-->
                            <!--<li><span>电话号码</span><span>{{}}</span></li>-->
                        <!--</ul>-->
                    <!--</div>-->
                <!--</el-row>-->
            </div>
            <span class="title">
                货物信息
            </span>
            <div class="basic">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="货物名称" prop="descriptionOfGoods">
                            <el-input v-model="ruleForm.descriptionOfGoods"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="货物类型："  prop="cargoTypeClassificationCode">
                            <el-select v-model="ruleForm.cargoTypeClassificationCode " placeholder="请选择货物类型" >
                                <el-option label="电子产品" value="90"></el-option>
                                <el-option label="商品汽车" value="92"></el-option>
                                <el-option label="冷藏货物" value="93"></el-option>
                                <el-option label="大宗货物" value="94"></el-option>
                                <el-option label="快速消费品" value="95"></el-option>
                                <el-option label="农产品" value="96"></el-option>
                                <el-option label="其他" value="999"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div style="position: relative">
                            <el-form-item label="货物体积" prop="cube">
                                <el-input v-model="ruleForm.cube"></el-input>
                            </el-form-item>
                            <span style="color:cornflowerblue;position: absolute;top:10px;right:0;">/立方米</span>
                        </div>

                    </el-col>
                    <el-col :span="8">
                        <div style="position: relative">
                            <el-form-item label="货物重量" prop="goodsItemGrossWeight">
                                <el-input v-model="ruleForm.goodsItemGrossWeight"></el-input>
                            </el-form-item>
                            <span style="color:cornflowerblue;position: absolute;top:10px;right:0;">/千克</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div style="position: relative">
                            <el-form-item label="货物件数" prop="totalNumberOfPackages">
                                <el-input v-model="ruleForm.totalNumberOfPackages"></el-input>
                            </el-form-item>
                            <span style="color:cornflowerblue;position: absolute;top:10px;right:0;">/个</span>
                        </div>
                    </el-col>
                </el-row>
                <!--<el-row>-->
                    <!--<el-col :span="8">-->
                        <!--<el-form-item label="备注" prop="name">-->
                            <!--<el-input type="textarea" v-model="ruleForm.name"></el-input>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
                <!--</el-row>-->
            </div>
            <span class="title">
                价格信息
            </span>
            <div class="basic">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="货币总金额" prop="totalMonetaryAmount">
                            <el-input v-model="ruleForm.totalMonetaryAmount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="备注" prop="remark">
                            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <el-form-item class="btn">
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <!--<el-button @click="resetForm('ruleForm')">重新填写</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        //新建 编辑 运单
        name: "increaseWaybill",
        data() {
            return{
                classification:[//车辆分类
                    {name:'普通货车',id:'H01'},
                    {name:'厢式货车',id:'H02'},
                    {name:'罐式货车',id:'H04'},
                    {name:'牵引车',id:'Q00'},
                    {name:'普通挂车',id:'G01'},
                    {name:'集装箱挂车',id:'G05'},
                    {name:'仓栅式货车',id:'H09'},
                    {name:'封闭货车',id:'H03'},
                    {name:'平板货车',id:'H05'},
                    {name:'集装箱车',id:'H06'},
                    {name:'自卸货车',id:'H07'},
                    {name:'特殊结构货车',id:'H08'},
                    {name:'专项作业车',id:'Z00'},
                    {name:'厢式挂车',id:'G02'},
                    {name:'仓栅式挂车',id:'G07'},
                    {name:'平板挂车',id:'G04'},
                    {name:'自卸挂车',id:'G06'},
                    {name:'专项作业挂车',id:'G09'},
                    {name:'车辆运输车',id:'X91'},
                    {name:'车辆运输车(单排)',id:'X92'},
                ],
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                fromProvince:'',//发货省份
                countrySubdivisionCodeFrom:'',//发货市
                toProvince:'',//收货省份
                countrySubdivisionCodeTo:'',//收货市
                ruleForm: {
                    originalDocumentNumber:'',//原始单号
                    shippingNoteNumber:'',//托运单号
                    carrier:'',//承运人
                    unifiedSocialCreditIdentifier:'',//社会统一信用代码
                    permitNumberNoTruck:'',//许可证编号
                    businessTypeCode:'',//业务类型
                    consignmentDateTime:'',//托运日期
                    goodsReceiptDateTime:'',//收货日期

                    consignor:'',//发货人
                    personalIdentityDocument:'',//身份证号
                    countrySubdivisionCodeFrom:[],//发货地国家新政区域代码
                    placeOfLoading:'',//发货地
                    consignee:'',//收货人
                    countrySubdivisionCodeTo:[],//收货地国家区划分
                    goodsReceiptPlace:'',//收货地

                    vehicleTonnage:'',//车辆载质量
                    licensePlateTypeCode:'',//牌照类型
                    vehicleNumber:'',//车辆牌照号
                    trailerVehiclePlateNumber:'',//挂车牌照号
                    owner:'',//车辆所有人
                    permitNumberOwner:'',//许可证编号
                    nameOfPerson:'',//驾驶员姓名
                    qualificationCertificateNumber:'',//从业资格证
                    telephoneNumber:'',//电话号码
                    vehicleClassificationCode:'',//车辆分类


                    descriptionOfGoods:'',//货物名称
                    cargoTypeClassificationCode:'',//货物类型
                    cube:'',//体积
                    goodsItemGrossWeight:'',//重量（毛重）
                    totalNumberOfPackages:'',//件数


                    totalMonetaryAmount:'',//货币总金额

                    remark: '',//备注
                },
                options:[],
                rules: {

                    originalDocumentNumber:[//原始单号
                        { required: true, message: '请输入原始单号', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,35}$/,  message: '请规范输入格式且不能超过35位', trigger: 'blur' }
                    ],
                    shippingNoteNumber:[//托运单号
                        { required: true, message: '请输入托运单号', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,20}$/,  message: '请规范输入格式且不能超过20位', trigger: 'blur' }
                    ],
                    carrier:[//承运人
                        { required: true, message: '请输入承运人', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    unifiedSocialCreditIdentifier:[//社会统一信用代码
                        { required: false, message: '请输入社会统一信用代码', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,18}$/,  message: '请规范输入格式且不能超过18位', trigger: 'blur' }
                    ],
                    permitNumberNoTruck:[//许可证编号
                        { required: false, message: '请输入许可证编号', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    businessTypeCode:[//业务类型
                        { required: true, message: '请选择业务类型', trigger: 'change' },
                    ],
                    consignmentDateTime:[//托运日期
                        { required: true, message: '请输入托运日期', trigger: 'change' },
                    ],
                    despatchActualDateTime:[
                        { required: true, message: '请输入发运实际日期时间', trigger: 'change' },
                    ],
                    goodsReceiptDateTime:[
                        { required: true, message: '请输入收货日期时间', trigger: 'change' },
                    ],
                    vehicleClassificationCode:[//车辆分类
                        { required: true, message: '请输入车辆分类', trigger: 'change' },
                    ],
                    consignor:[//发货人
                        { required: false, message: '请输入发货人', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    personalIdentityDocument:[//身份证号
                        { required: false, message: '请输入身份证号', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,35}$/,  message: '请规范输入格式且不能超过35位', trigger: 'blur' }
                    ],
                    countrySubdivisionCodeFrom:[//发货地国家新政区域代码
                        { required: true, message: '请输入发货地地区代码', trigger: 'change' },
                    ],
                    placeOfLoading:[//发货地
                        { required: false, message: '请输入发货地', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    consignee:[//收货人
                        { required: false, message: '请输入收货人', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    countrySubdivisionCodeTo:[//收货地国家区划分
                        { required: true, message: '请输入收货地地区代码', trigger: 'change' },
                    ],
                    goodsReceiptPlace:[//收货地
                        { required: false, message: '请输入收货地', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],

                    roadTransportCertificateNumber:[
                        {required: true, message: '请输入道路运输证号', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,15}$/,  message: '请规范输入格式且不能超过15位', trigger: 'blur' }
                    ],
                    licensePlateTypeCode:[//牌照类型
                        { required: true, message: '请输入牌照类型', trigger: 'change' },
                    ],
                    vehicleNumber:[//车辆牌照号
                        { required: true, message: '请输入车辆牌照号', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    vehicleTonnage:[//车辆载质量
                        { required: true, message: '请输入车辆载质量', trigger: 'blur' },
                        {pattern: /^((([1-9]{1}\d{0,9}))|([0]{1}))((\.(\d){2}))?$/,  message: '请规范输入格式且保留2位小数', trigger: 'blur' }
                    ],
                    trailerVehiclePlateNumber:[//挂车牌照号
                        { required: false, message: '请输入挂车牌照号', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    owner:[//车辆所有人
                        { required: false, message: '请输入车辆所有人', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    permitNumberOwner:[//许可证编号
                        { required: false, message: '请输入许可证编号', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,50}$/,  message: '请规范输入格式且不能超过50位', trigger: 'blur' }
                    ],
                    nameOfPerson:[//驾驶员姓名
                        { required: true, message: '请输入驾驶员姓名', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    qualificationCertificateNumber:[//从业资格证
                        { required: false, message: '请输入从业资格证', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,19}$/,  message: '请规范输入格式且不能超过19位', trigger: 'blur' }
                    ],
                    telephoneNumber:[//电话号码
                        { required: false, message: '请输入电话号码', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_\-!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],


                    descriptionOfGoods:[//货物名称
                        { required: true, message: '请输入货物名称', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                    cargoTypeClassificationCode:[//货物类型
                        { required: true, message: '请输入货物类型', trigger: 'change' },
                    ],
                    cube:[//体积
                        { required: false, message: '请输入体积', trigger: 'blur' },
                        {pattern: /^((([1-9]{1}\d{0,9}))|([0]{1}))((\.(\d){4}))?$/,  message: '请规范输入格式且保留4位小数', trigger: 'blur' }
                    ],
                    goodsItemGrossWeight:[//重量（毛重）
                        { required: true, message: '请输入重量', trigger: 'blur' },
                        {pattern: /^((([1-9]{1}\d{0,9}))|([0]{1}))((\.(\d){3}))?$/,  message: '请规范输入格式且保留3位小数', trigger: 'blur' }
                    ],
                    totalNumberOfPackages:[//件数
                        { required: false, message: '请输入件数', trigger: 'blur' },
                        {pattern: /^((([1-9]{1}\d{0,9}))|([0]{1}))((\.(\d){3}))?$/,  message: '请规范输入格式只能输入正整数', trigger: 'blur' }
                    ],


                    totalMonetaryAmount:[//货币总金额
                        { required: true, message: '请输入货币总金额', trigger: 'blur' },
                        {pattern: /^((([1-9]{1}\d{0,9}))|([0]{1}))((\.(\d){3}))?$/,  message: '请规范输入格式且保留3位小数', trigger: 'blur' }
                    ],

                    remark: [//备注
                        { required: false, message: '请输入备注', trigger: 'blur' },
                        {pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_!@#$&*~()=|{}':;',?！￥…（）%——【】[\]‘；：”“'。，、？\n\r ]{0,200}$/,  message: '请规范输入格式且不能超过200字', trigger: 'blur' }
                    ],
                }
            }
        },
        created() {
            //拿到token
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
        },
        mounted() {
            this.data();
            this.drop();
        },
        methods:{
            //省市区三级联动数据
            drop(){
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/area', JSON.stringify({
                    token:this.token,
                    flag:"hasArea"
                }),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    this.options = res.body.result;
                })
            },
            data() {
                let page = JSON.stringify({
                    token:this.token,
                    shippingNoteNumber:Base64.decode(this.$route.query.info),
                    originalDocumentNumber:this.$route.query.OriginalNum == undefined ? '' : Base64.decode(this.$route.query.OriginalNum),
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/truckBroker/truck/get',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=> {
                    console.log(res.body.result);
                    if (res.body.errcode == 0) {
                        this.ruleForm = res.body.result;
                        var arr=[];
                        arr.push(Number(res.body.result.fromProvince),Number(res.body.result.countrySubdivisionCodeFrom));
                        this.ruleForm.countrySubdivisionCodeFrom = arr;
                        var array=[];
                        array.push(Number(res.body.result.toProvince),Number(res.body.result.countrySubdivisionCodeTo));
                        this.ruleForm.countrySubdivisionCodeTo = array;
                    }
                })
            },

            submitForm(formName) {
                for (var i in this.ruleForm.countrySubdivisionCodeFrom){
                    console.log(JSON.stringify(this.ruleForm.countrySubdivisionCodeFrom[0]).substring(0,6));
                    this.fromProvince = JSON.stringify(this.ruleForm.countrySubdivisionCodeFrom[0]).substring(0,6);
                    this.countrySubdivisionCodeFrom = JSON.stringify(this.ruleForm.countrySubdivisionCodeFrom[1]).substring(0,6);
                }
                for (var i in this.ruleForm.countrySubdivisionCodeTo){
                    console.log(JSON.stringify(this.ruleForm.countrySubdivisionCodeTo[0]).substring(0,6));
                    this.toProvince = JSON.stringify(this.ruleForm.countrySubdivisionCodeTo[0]).substring(0,6);
                    this.countrySubdivisionCodeTo = JSON.stringify(this.ruleForm.countrySubdivisionCodeTo[1]).substring(0,6);
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        let page = JSON.stringify({
                            token:this.token,
                            originalDocumentNumber:this.ruleForm.originalDocumentNumber,//原始单号
                            shippingNoteNumber:this.ruleForm.shippingNoteNumber,//托运单号
                            carrier:this.ruleForm.carrier,//承运人
                            unifiedSocialCreditIdentifier:this.ruleForm.unifiedSocialCreditIdentifier,//社会统一信用代码
                            permitNumberNoTruck:this.ruleForm.permitNumberNoTruck,//许可证编号
                            businessTypeCode:this.ruleForm.businessTypeCode,//业务类型
                            consignmentDateTime:this.ruleForm.consignmentDateTime,//托运日期
                            goodsReceiptDateTime:this.ruleForm.goodsReceiptDateTime,//收货日期
                            despatchActualDateTime:this.ruleForm.despatchActualDateTime,//发货实际日期

                            consignor:this.ruleForm.consignor,//发货人
                            personalIdentityDocument:this.ruleForm.personalIdentityDocument,//身份证号
                            fromProvince:this.fromProvince,

                            // fromProvince:'',//发货省份
                            // countrySubdivisionCodeFrom:'',//发货市
                            // toProvince:'',//收货省份
                            // countrySubdivisionCodeTo:'',//收货市
                            countrySubdivisionCodeFrom:this.countrySubdivisionCodeFrom,//发货地国家新政区域代码
                            placeOfLoading:this.ruleForm.placeOfLoading,//发货地
                            consignee:this.ruleForm.consignee,//收货人
                            toProvince:this.toProvince,
                            countrySubdivisionCodeTo:this.countrySubdivisionCodeTo,//收货地国家区划分
                            goodsReceiptPlace:this.ruleForm.goodsReceiptPlace,//收货地

                            licensePlateTypeCode:this.ruleForm.licensePlateTypeCode,//牌照类型
                            vehicleNumber:this.ruleForm.vehicleNumber,//车辆牌照号
                            trailerVehiclePlateNumber:this.ruleForm.trailerVehiclePlateNumber,//挂车牌照号
                            owner:this.ruleForm.owner,//车辆所有人
                            permitNumberOwner:this.ruleForm.permitNumberOwner,//许可证编号
                            nameOfPerson:this.ruleForm.nameOfPerson,//驾驶员姓名
                            qualificationCertificateNumber:this.ruleForm.qualificationCertificateNumber,//从业资格证
                            telephoneNumber:this.ruleForm.telephoneNumber,//电话号码
                            vehicleClassificationCode:this.ruleForm.vehicleClassificationCode,//车辆分类
                            vehicleTonnage:this.ruleForm.vehicleTonnage,//车辆载质量
                            roadTransportCertificateNumber:this.ruleForm.roadTransportCertificateNumber,//道路运输证号

                            descriptionOfGoods:this.ruleForm.descriptionOfGoods,//货物名称
                            cargoTypeClassificationCode:this.ruleForm.cargoTypeClassificationCode,//货物类型
                            cube:this.ruleForm.cube,//体积
                            goodsItemGrossWeight:this.ruleForm.goodsItemGrossWeight,//重量（毛重）
                            totalNumberOfPackages:this.ruleForm.totalNumberOfPackages,//件数


                            totalMonetaryAmount:this.ruleForm.totalMonetaryAmount,//货币总金额

                            remark:this.ruleForm.remark,//备注
                        });
                        this.$http.post(this.global.lightningUrl + '/companyv1/truckBroker/truck/update',page,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res)=>{
                            console.log(res.body.result);
                            if (res.body.errcode == 0) {
                                this.$message({
                                    showClose: true,
                                    message: '提交成功！',
                                    type: 'success'
                                });
                                this.$router.push({ path:'/Waybill'});
                            }else {
                                this.$message({
                                    showClose: true,
                                    message: '提交失败！',
                                    type: 'warning'
                                });
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // resetForm(formName) {
            //     this.$refs[formName].resetFields();
            // }
        }
    }
</script>

<style scoped lang="scss">
    .increaseWaybill{
        .el-cascader{
            display: block;
        }
        .header {
            padding: 20px;
        }
        .title{
            display: block;
            padding:15px;
            font-size: 20px;
            font-weight:lighter;

        }
        .basic{
            background: white;
            padding: 20px 10px;
            margin:0 20px;
            .vehicleInformation{
                ul{
                    color:#909399;
                    overflow: hidden;
                    li{
                        float: left;
                        width:30.33%;
                        padding-top:20px;
                        margin:0 20px;
                    }
                }
            }
        }
        .btn{
            text-align: center;
            padding:30px 0;
        }
    }
</style>