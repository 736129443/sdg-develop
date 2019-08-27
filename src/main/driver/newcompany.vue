    <template>
        <div class="main" style="background-color: white">
            <div class="header">
                <p  v-if="urlid == 11?true:false"> 当前位置：司机管理 > 运输公司 > 新增运输公司</p>
                <p  v-if="urlid == 11?false:true"> 当前位置：司机管理 > 运输公司 > 编辑运输公司</p>
            </div>
            <div class="form">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" class="demo-ruleForm" :disabled="compile">
                    <el-form-item label="运输公司名称" prop="company" >
                        <el-input v-model="ruleForm.company" placeholder="请输入运输公司名称" @change = "company"></el-input>
                    </el-form-item>

                    <el-form-item label="车队名称" prop="team" >
                        <el-input v-model="ruleForm.team" @change="teamSole" placeholder="请输入车队名称" :disabled =name_disabled ></el-input>
                    </el-form-item>

                    <el-form-item label="所在城市" prop = 'cityName' >
                        <el-cascader
                                :options="options2"
                                clearable
                                @change="handleItemChange"
                                placeholder="请选择所在城市"
                                v-model="ruleForm.cityName"
                        ></el-cascader>
                    </el-form-item>

                    <el-form-item label="所属分公司" prop="filialeId" >
                        <el-select v-model="ruleForm.filialeId"  placeholder="请选择所属分公司" @change="onfiliale">
                            <el-option v-for=" i in filiale"
                                       :label=" i.deptName "
                                       :value=" i.id"
                                       :key="i.id "
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="合同编号" >-->
                        <!--<el-input v-model="ruleForm.contract"  placeholder="请输入合同编号" ></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="电子合同" >-->
                        <!--<el-upload-->
                                <!--class="upload-demo"-->
                                <!--ref="upload"-->
                                <!--action="javascript:;"-->
                                <!--:on-preview="handlePreview"-->
                                <!--:on-remove="handleRemove_wj"-->

                                <!--:on-change="Contract"-->
                                <!--:file-list="fileList4"-->
                                <!--:auto-upload="false">-->
                            <!--<el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
                            <!--&lt;!&ndash;<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>&ndash;&gt;-->
                            <!--<div slot="tip" class="el-upload__tip">合同上传，支持jpg、png、word、excel、wps、zip、pdf格式</div>-->
                        <!--</el-upload>-->
                    <!--</el-form-item>-->

                    <!--<el-form-item label="所在管理区域" prop="areaName">-->
                        <!--<el-select v-model="ruleForm.areaName" placeholder="请选择管理区域">-->
                            <!--<el-option label="华东地区" value="华东地区"></el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="车队长信息" prop="resource" v-if="urlid==0 || urlid==3000?false:true">
                        <el-radio v-model="ruleForm.resource" label="yes" >已注册车队长</el-radio>
                        <el-radio v-model="ruleForm.resource" label="no" >新注册车队长账户</el-radio>
                    </el-form-item>-->
                    <!--已注册车队长-->
                    <!--<div v-if="urlid==0?false:true">-->
                        <!--<el-form-item label="车队长手机号" prop="resource"  v-if="ruleForm.resource == 'no'?false:true" >-->
                    <el-form-item label="车队长手机号" v-if="ruleForm.resource == 'no'?false:true" >
                        <!--<el-input v-model="ruleForm.phone"  placeholder="请输入车队长手机号" class="input-with-select" @change="is_Update()">-->
                            <!--<el-button slot="append" @click="submit_cx" style="background-color:#409EFF;color: white" >查询</el-button>-->

                        <!--</el-input>-->


                        <el-input placeholder="请输入车队长手机号" v-model="ruleForm.phone">
                            <template slot="append">
                                <el-button slot="append" @click="submit_cx" style="background-color:#409EFF;color: white" >查询</el-button>
                            </template>
                        </el-input>


                    </el-form-item>
                    <!--</div>-->

                    <el-form-item label="车队长" prop="namePhone" v-if="ruleForm.resource == 'no'?false:true">
                        <el-input disabled v-model="ruleForm.namePhone" ></el-input>
                        <!--<el-input v-model="userId"></el-input>-->
                        <!--<span>{{userId}}</span>-->
                        <!--leaderPhone    leaderName-->
                    </el-form-item>
                    <!--车队司机-->
                    <el-form-item label="车队司机手机号" v-if="ruleForm.resource == 'no'?false:true" >
                        <el-input placeholder="请输入车队司机手机号" v-model="ruleForm.driverPhone" class="input-with-select">
                            <el-button slot="append" @click="submit_cx1" style="background-color:#409EFF;color: white" >查询</el-button>
                        </el-input>
                    </el-form-item>
                    <div class="driversList" v-show="driversList.length>0" >
                        <el-table
                                :data="driversList.slice((currentPage1-1)*pageSize1,currentPage1*pageSize1)"
                                style="width: 100%"
                                border>
                            <el-table-column
                                    align="center"
                                    prop="name"
                                    label="司机姓名"
                                    >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="phone"
                                    label="司机电话"
                            >
                            </el-table-column>

                            <el-table-column
                                    align="center"
                                    label="操作"
                                    >
                                <template slot-scope="scope">
                                    <!--:disabled = driversList[scope.$index]-->
                                    <el-button
                                        @click.native.prevent="deleteRow(scope.$index, driversList)"
                                        type="text"
                                        size="small">
                                        移除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                @current-change="handleCurrentChange1"
                                :current-page.sync="currentPage1"
                                :page-size="pageSize1"
                                layout="total, prev, pager, next, jumper"
                                :total="urlid == 11?driversList.length:total1">
                        </el-pagination>
                    </div>
                    <!--新注册车队长账户-->
                    <!--<div v-if="urlid==0||urlid==3000?false:true">
                        <el-form-item label="车队长姓名" prop="newname" v-if="ruleForm.resource == 'yes'?false:true">
                            <el-input  v-model="ruleForm.newname" placeholder="请输入车队长姓名" ></el-input>
                        </el-form-item>

                        <el-form-item label="车队长电话" prop="newphone" v-if="ruleForm.resource == 'yes'?false:true">
                            <el-input  v-model="ruleForm.newphone" @blur="phoneSole" placeholder="请输入车队长电话"></el-input>
                        </el-form-item>

                        <el-form-item label="车队长身份证号" prop="idcardNum" v-if="ruleForm.resource == 'yes'?false:true">
                            <el-input  v-model="ruleForm.idcardNum" placeholder="请输入车队长身份证号"></el-input>
                        </el-form-item>

                        <el-form-item label="账户密码" prop="password" v-if="ruleForm.resource == 'yes'?false:true">
                            <el-input  v-model="ruleForm.password" placeholder="请输入账户密码"  disabled></el-input>
                        </el-form-item>
                        &lt;!&ndash;              新增   玩    &ndash;&gt;
                    </div>-->
                    <el-form-item label="所属运营经理" prop="adminId">
                        <el-select v-model="ruleForm.adminId" placeholder="请选择运营">
                            <el-option
                                    v-for="i in capacity"
                                    :label="i.name"
                                    :value="i.id"
                                    :key = "i.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车队类型" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="请选择车队类型">
                            <el-option label="自建型" value="selfBuild"></el-option>
                            <el-option label="家庭型" value="family"></el-option>
                            <el-option label="企业型" value="company"></el-option>
                            <el-option label="其他" value="other"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车队经验" prop="experience">
                        <el-select
                            v-model="ruleForm.experience"
                            multiple
                            style="width: 600px;"
                            :multiple-limit="num"
                            placeholder="请选择车队经验">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="车队状态" prop="status">
                        <el-select v-model="ruleForm.status" placeholder="请选择车队状态">
                            <el-option label="启用" value="1"></el-option>
                            <el-option label="停用" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="结算周期" prop="payPeriod" >
                        <!--<el-select v-model="ruleForm.payPeriod" placeholder="请选择结算周期">-->
                            <!--<el-option label="7天" value="7"></el-option>-->
                            <!--<el-option label="15天" value="15"></el-option>-->
                        <!--</el-select>-->

                        <el-input placeholder="请输入结算周期" v-model="ruleForm.payPeriod">
                            <template slot="prepend">N+</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="上传营业执照"  >

                            <el-upload
                                    ref="upload"
                                    :multiple="true"
                                    action="javascript:;"
                                    list-type="picture-card"
                                    :limit='1'
                                    :file-list="fileList2"
                                    :on-exceed='uploadOverrun'
                                    :auto-upload="false"
                                    :on-preview="handlePictureCardPreview"
                                    :on-change="insert"
                                    :on-remove="handleRemove">
                                <i class="el-icon-plus" ></i>
                            </el-upload>
                            <div class="el-upload__tip">请上传就jpg、png格式文件，每张不大于10M，最多上传1张</div>
                            <!--<el-button type="primary" @click="upload()">点击上传</el-button>-->
                            <el-dialog :visible.sync="dialogVisible" >
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>

                    </el-form-item>
                    <el-form-item label="上传税务登记证" >
                        <!--taxPic-->
                            <el-upload
                                    ref="upload"
                                    :multiple="true"
                                    action="javascript:;"
                                    list-type="picture-card"
                                    :limit='1'
                                    :file-list="fileList3"
                                    :on-exceed='uploadOverrun'
                                    :auto-upload="false"
                                    :on-preview="handlePictureCardPreview"
                                    :on-change="insert1"
                                    :on-remove="handleRemove1">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <div class="el-upload__tip">请上传就jpg、png格式文件，每张不大于10M，最多上传1张</div>
                            <el-dialog :visible.sync="dialogVisible1">
                                <img width="100%" :src="dialogImageUrl1" alt="">
                            </el-dialog>
                    </el-form-item>
                    <el-form-item label="备注" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" v-if="submit==0?false:true" > 提 交</el-button>
                        <el-button type="primary" :loading="true" v-if="submit!=0?false:true">提交中</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--查询司机-->
            <el-dialog
                    title="提示"
                    :visible.sync="centerDialogVisible"
                    width="30%"
                    center>
                <el-table
                        ref="singleTable"
                        :data="tableData"
                        highlight-current-row
                        @current-change="handleCurrentChange"
                        style="width: 100%">
                    <el-table-column
                            property="name"
                            align="center"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            property="phone"
                            align="center"
                            label="电话">
                    </el-table-column>
                    <el-table-column
                            property="hasMission"
                            align="center"
                            label="出车状态">
                    </el-table-column>
                    <el-table-column
                            property="userId"
                            align="center"
                            v-if="userId_cx==true?false:true"
                            label="ID">
                    </el-table-column>
                </el-table>
                <el-pagination
                        @current-change="handleCurrentChange_fy"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next"
                        :total="total">
                </el-pagination>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false,ruleForm.namePhone=''">取 消</el-button>
                    <el-button type="primary" @click="setCurrent()">确 定</el-button>
                </span>
            </el-dialog>
            <!--查询车队司机-->
            <el-dialog title="添加车队司机" :visible.sync="driverTableVisible" center>
                <el-table
                        :data="driverData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="司机姓名"
                            >
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="司机电话"
                            >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="hasMission"
                            label="出车状态"
                    >
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            >
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)"
                                       :disabled='arrs[scope.$index]'
                                       type="text" size="small">添加</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @current-change="handleCurrentChange2"
                        :current-page.sync="currentPage2"
                        :page-size="pageSize2"
                        layout="total, prev, pager, next, jumper"
                        :total="total2">
                </el-pagination>
            </el-dialog>
        </div>
    </template>
    <script>
        import {provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText,TextToCode,code} from 'element-china-area-data';
        const sha256 = require("js-sha256").sha256;
        export default {
            data() {
                return {
                    arrs:[],
                    compile:false,
                    name_disabled:false,
                    submit:'1',
                    total:0,
                    currentPage:1,
                    pageSize:5,
                    userId_cx:true,
                    userId:'',
                    usualRunArea:'',
                    options2:regionData,
                    num:5,
                    ruleForm: {
                        areaName:'',
                        company:'',
                        team:'',
                        resource:'yes',
                        province:'',
                        city:'',
                        county:'',
                        cityName:[],
                        namePhone:'',
                        // 属分公司
                        filialeId:'',
                        // 经理
                        adminId:'',
                        type:'',
                        experience:[],
                        status:'',
                        phone:'',
                        driverPhone:'',
                    //    新注册
                        newphone:'',
                        newname:'',
                        idcardNum:'',
                        // password:'123456',
                        payPeriod:'',
                    },
                    rules:{
                        company:[
                            {required: false, message: '请输入运输公司名称', trigger: 'blur' },
                            {pattern: /[\u4e00-\u9fa5a-zA-Z0-9（）/\-]/,  message: '名称由字母，数字，汉字组成', trigger: 'blur' },
                            { min: 2, max: 50, message: '车队名称不能少于2个字符或多于50个字符', trigger: 'blur' }
                        ],
                        team:[
                            {required: true, message: '请输入车队名称', trigger: 'blur' },
                            {pattern: /[\u4e00-\u9fa5a-zA-Z0-9（）/\-]/,  message: '名称由字母，数字，汉字组成', trigger: 'blur' },
                            { min: 2, max: 50, message: '车队名称不能少于2个字符或多于50个字符', trigger: 'blur' }
                        ],
                        cityName:[
                            {required: true, message: '请选择城市', trigger: 'change' },
                        ],
                        filialeId:[
                            {required: true, message: '请选择所属分公司', trigger: 'blur' },
                        ],
                        adminId:[
                            {required: true, message: '请选择运营经理', trigger: 'blur' },
                        ],
                    //    新增
                        phone:[
                            {required: true, message: '请输入车队长手机号', trigger: 'blur' },
                        ],
                        newname:[
                            {required: true, message: '请输入车队长姓名', trigger: 'blur' },
                        ],
                        newphone:[
                            {required: true, message: '请输入车队长电话', trigger: 'blur' },
                            {pattern: /^0?(13|14|15|17|18|19)[0-9]{9}$/,  message: '请输入正确电话号', trigger: 'blur' },
                        ],
                        type:[
                            {required: true, message: '请选择车队类型', trigger: 'change' },
                        ],
                        experience:[
                            {required: true, message: '请选择车队经验', trigger: 'change' },
                        ],
                        status:[
                            {required: true, message: '请选择车队状态', trigger: 'change' },
                        ],
                        idcardNum:[
                            {required: true, message: '请输入身份证号', trigger: 'blur' },
                            {pattern: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,  message: '请输入正确身份证号', trigger: 'blur' },
                        ],
                        areaName:[
                            {required: true, message: '请选择地区', trigger: 'change' },

                        ],
                        namePhone:[
                            {required: true, message: '请选择车队长', trigger: 'change' },
                        ],
                        payPeriod:[
                            {required: false, message: '请输入', trigger: 'blur' },
                            {pattern: /^\d{0,3}$/,  message: '请输入不能大于3位的整数', trigger: 'blur' },

                        ]
                    },
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
                    arr:[],
                    citys:[],
                    centerDialogVisible:false,
                    tableData: [],
                    coss:'',
                    county:'',
                    dialogImageUrl:'',
                    dialogVisible: false,
                    dialogVisibles: false,
                    fileList2:[],
                    picList:[],
                    city:'',
                    province:'',
                    countys:'',
                    region:'',
                    leaderName:'',
                    leaderPhone:'',
                    adminName:'',
                    filialeName:'',
                //    图二
                    dialogImageUrl1:'',
                    dialogVisible1: false,
                    fileList3:[],
                    picList1:[],
                    token:'',
                    filiale:[],
                    capacity : [],
                    areaName:'',
                    urlid:'',
                //    回显
                    hxprovince:'',
                    hxcity:'',
                    hxcounty:'',
                    newmap:'',
                    newmap1:'',

                    imgs:[],
                    imgs1:[],
                    adminId1:'',
                    leaderId_hx:'',
                    leaderName_hx:'',
                    leaderPhone_hx:'',
                    handleRemove_businessPic:'',
                    handleRemove_taxPic:'',
                    driversList: [],
                    driverTableVisible:false,
                    driverData:[],
                    currentPage1:1,
                    pageSize1:10,
                    total1:0,
                    currentPage2:1,
                    pageSize2:5,
                    total2:0,
                    id:'',
                    arrs2:[],
                    fileList4: [],
                };
            },
            created(){
                // this.first()
                let token =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
                this.token = token.result.token;
                //分公司接口
                let page = JSON.stringify({
                    token:this.token
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_filiale_list',page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    console.log(res.body.result);
                    this.filiale = res.body.result
                })
                this.data();
                this.urlid=Base64.decode(this.$route.params.id) ;
                // alert(JSON.parse(window.sessionStorage.id).j)
                if (this.urlid == 0 && JSON.parse(window.sessionStorage.id).j!=1){
                    // alert(1)
                    this.name_disabled = true
                    this.init();
                }else if (this.urlid == 3000) {
                    this.compile = true
                    this.init();
                }else if (this.urlid == 0 && JSON.parse(window.sessionStorage.id).j==1){
                    this.init0();

                }


            },
            methods: {
                is_Update(){
                    this.$forceUpdate()
                },
                Contract(file, fileList){
                    console.log(file, fileList);
                },
                submitUpload() {
                    this.$refs.upload.submit();
                },
                handleRemove_wj(file, fileList) {
                    console.log(file, fileList);
                },
                handlePreview(file) {
                    console.log(file);
                },
                init(){
                    console.log(JSON.parse(window.sessionStorage.id).i);
                    let page = JSON.stringify({
                        token: this.token,
                        belongTeam : JSON.parse(window.sessionStorage.id).i,
                        pageSize:300,
                        pageNum:1,
                    });
                    this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_driver_by_team',page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res);
                        console.log('----------------------')
                        this.driversList = res.data.result.list;
                        for (let i = 0; i < this.driversList.length; i++) {
                            if (this.driversList[i].hasMission == 0) {
                                this.driversList[i].hasMission = '有任务'
                            }else{
                                this.driversList[i].hasMission = '无任务'
                            }
                        }
                        this.total1 = res.data.result.total;
                    })
                },
                init0(){
                    console.log(JSON.parse(window.sessionStorage.id).i);
                    let page = JSON.stringify({
                        token: this.token,
                        belongTeam : JSON.parse(window.sessionStorage.id).i,
                        pageSize:300,
                        pageNum:1,
                    });
                    this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_driver_by_team_approving',page,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res);
                        console.log('----------------------')
                        this.driversList = res.data.result.list;
                        for (let i = 0; i < this.driversList.length; i++) {
                            if (this.driversList[i].hasMission == 0) {
                                this.driversList[i].hasMission = '有任务'
                            }else{
                                this.driversList[i].hasMission = '无任务'
                            }
                        }
                        this.total1 = res.data.result.total;
                    })
                },
                handleCurrentChange1(val) {
                    // console.log(`当前页: ${val}`);
                    // if (this.urlid == 0){
                    //     this.pageNum = val;
                    //     this.init();
                    // }
                },
                handleCurrentChange2(val){
                    this.currentPage2 = val;
                    this.submit_cx1();
                },
                handleClick(row) {
                    console.log(row);
                    if(this.userId === row.userId){
                        this.$message({
                            showClose: true,
                            message: '已选车队长不能成为车队司机！',
                            type: 'warning'
                        });
                        return;
                    }
                    if(this.urlid == 11){
                        if(this.driversList.length > 0){
                            for(let i=0;i < this.driversList.length;i++){
                                if(row.userId === this.driversList[i].userId){
                                    this.$message({
                                        showClose: true,
                                        message: '车队司机中已有此司机，不能重复添加！',
                                        type: 'warning'
                                    });
                                    return;
                                }
                            }
                            this.driversList.push(row);
                        }else{
                            this.driversList.push(row)
                        }
                    }else{
                        if(this.driversList.length > 0){
                            for(let i=0;i < this.driversList.length;i++){
                                if(row.userId === this.driversList[i].userId){
                                    this.$message({
                                        showClose: true,
                                        message: '车队司机中已有此司机，不能重复添加！',
                                        type: 'warning'
                                    });
                                    return;
                                }
                            }
                            this.driversList.unshift(row);
                            this.$message({
                                message: '车队司机添加成功！',
                                type: 'success'
                            });
                            this.total1 = this.driversList.length;
                        }else{
                            this.driversList.unshift(row);
                            this.$message({
                                message: '车队司机添加成功！',
                                type: 'success'
                            });
                            this.total1 = this.driversList.length;
                        }
                    }

                    console.log(this.driversList)
                },
                deleteRow(index, rows) {
                    console.log(rows[index]);
                    console.log(rows[index].name+rows[index].phone);
                    console.log(this.driversList.slice((this.currentPage1 - 1) * this.pageSize1, this.currentPage1 * this.pageSize1)[index].name);
                    if (this.urlid == 11){
                       var name = rows[index].name;
                        var phone = rows[index].phone;
                    }else{
                        var name = this.driversList.slice((this.currentPage1 - 1) * this.pageSize1, this.currentPage1 * this.pageSize1)[index].name
                        var phone = this.driversList.slice((this.currentPage1 - 1) * this.pageSize1, this.currentPage1 * this.pageSize1)[index].phone
                    }
                    this.$confirm('是否删除司机：' + name + '(' + phone +')', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        rows.splice(index, 1);

                        // if (this.urlid == 11){
                        //     rows.splice(index, 1);
                        // }else{
                        //
                        //     let obj = JSON.stringify({
                        //         token:this.token,
                        //         userId:this.driversList.slice((this.currentPage1 - 1) * this.pageSize1, this.currentPage1 * this.pageSize1)[index].userId
                        //     });
                        //     // this.$http.post(this.global.lightningUrl + '/company/drivermanage/deleteDriver4Team',obj,{
                        //     //     headers: {
                        //     //         'Content-Type': 'application/json;charset=UTF-8'
                        //     //     }
                        //     // }).then((res)=>{
                        //     //     console.log('------------------------------------------------');
                        //     //     console.log(res);
                        //     //     if(res.data.errcode === 0){
                        //     //         this.$message({
                        //     //             message: '删除司机成员成功！',
                        //     //             type: 'success'
                        //     //         });
                        //     //         this.init();
                        //     //     }else if(res.data.errcode === -2){
                        //     //         this.$message({
                        //     //             message: res.data.message,
                        //     //         });
                        //     //     }
                        //     // })
                        // }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                },
                company(){

                },
                data(){
                    //新增
                    if (Base64.decode(this.$route.params.id) == 11){

                        //  获取  运营经理    登陆人Id

                        // let page = JSON.stringify({
                        //    token:this.token
                        // });
                        // this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_admin',page,{
                        //     headers: {
                        //         'Content-Type': 'application/json;charset=UTF-8'
                        //     }
                        // }).then((res)=>{
                        //     console.log(res);
                        //     this.areaName = res.body.result.areaName;
                        //     let page1 = JSON.stringify({
                        //         token:this.token,
                        //         areaName :this.areaName
                        //     })
                        //     this.oncapacity(page1);
                        //     this.ruleForm.filialeId = res.body.result.filialeId;
                        //     this.ruleForm.adminId = res.body.result.id;
                        // })
                    }else {
                        //   回     显
                        console.log(this.token);
                        console.log(this.ruleForm.filialeId);
                        // 经理
                        // let pageName = JSON.stringify({
                        //     token:this.token
                        // });
                        // this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_admin',pageName,{
                        //     headers: {
                        //         'Content-Type': 'application/json;charset=UTF-8'
                        //     }
                        // }).then((res)=>{
                        //     this.areaName = res.body.result.areaName;
                        //
                        // })

                        // let page1 = JSON.stringify({
                        //     token:this.token,
                        //     filialeId: this.ruleForm.filialeId
                        // });
                        //
                        // this.oncapacity()
                        let page = JSON.stringify({
                            token:this.token,
                            id:JSON.parse(window.sessionStorage.id).i
                        });
                        console.log(page);

                        this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/team/get_team',page,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res)=>{
                            console.log(res)
                            var city = '';
                            this.ruleForm = res.body.result;
                            for (let i = 0; i < this.filiale.length; i++) {
                                // if (res.body.result.filialeId == this.filiale[i].filialeId) {
                                    this.ruleForm.filialeId = res.body.result.filialeId
                                this.id = res.body.result.filialeId;
                                    // this.ruleForm.adminId =  res.body.result.adminName
                                // }
                            }
                            // alert(this.ruleForm.filialeId)
                            let page3 = JSON.stringify({
                                token : this.token,
                                filialeId : this.ruleForm.filialeId
                            });
                            this.oncapacity(page3)


                            console.log(this.filiale);
                            if (res.body.result.province == res.body.result.city) {
                                city = '市辖区'
                            }else {
                                city = res.body.result.city
                            }
                            this.ruleForm.cityName= [TextToCode[res.body.result.province].code,
                                TextToCode[res.body.result.province][city].code,
                                TextToCode[res.body.result.province][city][ res.body.result.county].code];
                            this.leaderName_hx = res.body.result.leaderName
                            this.leaderPhone_hx = res.body.result.leaderPhone
                            this.leaderId_hx = res.body.result.leaderId
                            console.log(this.leaderName_hx + this.leaderPhone_hx + '11'+this.leaderId_hx)

                            this.ruleForm.namePhone = res.body.result.leaderName + '/'+res.body.result.leaderPhone;
                            this.ruleForm.experience = res.body.result.experience.split(",");
                            // let like = res.body.result.business;
                            var timestamp1 =Date.parse(new Date());
                            this.imgs.push({'url':res.body.result.businessPic})
                            console.log(this.imgs)
                            // for (let i = 0 ;i < like.length ; i++){
                            if (res.body.result.businessPic!=undefined){
                                this.fileList2.push({'url':res.body.result.businessPic+'?timestamp='+timestamp1 })
                            }
                            let arr = res.body.result.tax;
                            console.log(arr);
                            if (res.body.result.taxPic!=undefined) {
                                this.fileList3.push({'url':res.body.result.taxPic +'?timestamp='+timestamp1})
                            }
                            // this.ruleForm.phone = '';
                            if (res.body.errcode == 0){
                                console.log(res);
                            }
                        })



                    }
                },
                // 地区级联
                handleItemChange(val) {
                    console.log(val);
                    this.province = CodeToText[val[0]];
                    this.city = CodeToText[val[1]];
                    this.countys = CodeToText[val[2]];
                },
                //运营经理
                oncapacity(page1){
                    console.log(page1);
                    this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/admin_list',page1,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        console.log(res);
                        this.capacity = res.body.result;

                    })
                },
                onfiliale(){
                    let page1 = JSON.stringify({
                        token:this.token,
                        filialeId: this.ruleForm.filialeId
                    });
                  this.oncapacity(page1)
                    if (this.ruleForm.filialeId != this.id){
                        this.ruleForm.adminId=''
                    }

                },

                // 创建
                submitForm(formName) {
                    console.log(this.driversList.length);
                    if (this.driversList.length < 50 && (this.driversList.length>2|| this.driversList.length==2)){

                        let str = '';
                        for(let i=0;i<this.driversList.length;i++){
                            str +=  this.driversList[i].userId + ',';
                        }
                        str = str.substring(0, str.length -1);
                        console.log(str);
                        this.$refs[formName].validate((valid) => {
                            if (valid) {

                                for (let i= 0 ;i<this.filiale.length;i++) {
                                    if (this.ruleForm.filialeId == this.filiale[i].id){
                                        //     if (this.filiale[i].id == this.ruleForm.filialeId){
                                        this.filialeName=this.filiale[i].deptName
                                    }
                                }
                                for (let i= 0 ;i<this.capacity.length;i++) {
                                        if (this.ruleForm.adminId == this.capacity[i].id){
                                            this.adminName=this.capacity[i].name
                                            // console.log(1);
                                        }
                                }
                                    if (Base64.decode(this.$route.params.id) == 11){
                                            this.submit = 0
                                            let formdata= new FormData();
                                            if (this.picList.length == 1){
                                                formdata.append('business_1',this.picList[0].raw);
                                            } else if (this.picList.length == 2){
                                                formdata.append('business_1',this.picList[0].raw);
                                                formdata.append('business_2',this.picList[1].raw);
                                            } else if (this.picList.length == 3) {
                                                formdata.append('business_1',this.picList[0].raw);
                                                formdata.append('business_2',this.picList[1].raw);
                                                formdata.append('business_3',this.picList[2].raw);
                                            }

                                            if (this.picList1.length == 1){
                                                formdata.append('tax_1',this.picList1[0].raw);
                                            } else if (this.picList1.length == 2){
                                                formdata.append('tax_1',this.picList1[0].raw);
                                                formdata.append('tax_2',this.picList1[1].raw);
                                            } else if (this.picList1.length == 3) {
                                                formdata.append('tax_1',this.picList1[0].raw);
                                                formdata.append('tax_2',this.picList1[1].raw);
                                                formdata.append('tax_3',this.picList1[2].raw);
                                            }
                                            if (this.ruleForm.resource == 'yes'){
                                                if ( this.city == '市辖区'){
                                                    this.city = this.province
                                                }else {
                                                    this.city =  this.city
                                                }
                                                formdata.append('str',JSON.stringify({
                                                    token:this.token,
                                                    company : this.ruleForm.company,
                                                    team : this.ruleForm.team,
                                                    cityName : this.ruleForm.cityName,
                                                    filialeId : this.ruleForm.filialeId,
                                                    leaderPhone: this.leaderPhone,
                                                    leaderName:this.leaderName,
                                                    adminId:this.ruleForm.adminId,
                                                    type:this.ruleForm.type,
                                                    experience:this.ruleForm.experience.join(","),
                                                    status:this.ruleForm.status,
                                                    remark:this.ruleForm.remark,
                                                    adminName:this.adminName,
                                                    filialeName:this.filialeName,
                                                    province: this.province,
                                                    city:this.city,
                                                    county: this.countys,
                                                    leaderId:this.userId,
                                                    userIds:str,

                                                    payPeriod:this.ruleForm.payPeriod,
                                                }));
                                                console.log(this.userId);
                                            }
                                            let config = {
                                                headers: {
                                                    'Content-Type':'multipart/form-data'  //之前说的以表单传数据的格式来传递from data
                                                }
                                            };
                                        if (this.picList!=[ ] && this.picList1!=[ ]){
                                            this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/team/create', formdata,config).then(res=> {
                                                //做处理
                                                console.log(res);
                                                if( res.body.errcode == 0 ){
                                                    this.submit = 1
                                                    // this.companyPic = res.body.result.companyPic,
                                                    //     this.$message({
                                                    //         showClose: true,
                                                    //         message:res.body.message,
                                                    //         type: 'success'
                                                    //     });
                                                    this.$message({
                                                        message: '新增车队长成功!',
                                                        type: 'success'
                                                    });
                                                    setTimeout((res)=>{
                                                        this.$router.push({ path:'/transportCompany' })
                                                    },500)
                                                }else {
                                                    this.submit = 1
                                                    this.$message.error(res.body.message);
                                                }
                                            });
                                        }else{
                                            console.log(22222);
                                            this.submit = 1
                                            // this.$message({
                                            //     message: '请点选择需要上传的图片',
                                            //     type: 'error'
                                            // });
                                        }

                                    }else{

                                        // filialeId
                                        this.submit= 0;
                                        this.province = CodeToText[this.ruleForm.cityName[0]];
                                        this.city = CodeToText[this.ruleForm.cityName[1]];
                                        this.countys = CodeToText[this.ruleForm.cityName[2]]
                                        let formdata= new FormData();
                                        if (this.picList.length == 1){
                                            formdata.append('business_1',this.picList[0].raw);
                                        } else if (this.picList.length == 2){
                                            formdata.append('business_1',this.picList[0].raw);
                                            formdata.append('business_2',this.picList[1].raw);
                                        } else if (this.picList.length == 3) {
                                            formdata.append('business_1',this.picList[0].raw);
                                            formdata.append('business_2',this.picList[1].raw);
                                            formdata.append('business_3',this.picList[2].raw);
                                        }else if(this.picList.length == 0){
                                            this.picList= this.fileList3
                                        }
                                        if (this.picList1.length == 1){
                                            formdata.append('tax_1',this.picList1[0].raw);
                                        } else if (this.picList1.length == 2){
                                            formdata.append('tax_1',this.picList1[0].raw);
                                            formdata.append('tax_2',this.picList1[1].raw);
                                        } else if (this.picList1.length == 3) {
                                            formdata.append('tax_1',this.picList1[0].raw);
                                            formdata.append('tax_2',this.picList1[1].raw);
                                            formdata.append('tax_3',this.picList1[2].raw);
                                        }else if (this.picList1.length == 0){
                                            this.picList1 = this.fileList2
                                        }

                                        console.log(this.ruleForm.company);
                                        if (this.ruleForm.company == ''){
                                            this.ruleForm.company = ''
                                        }

                                        if (this.leaderName == ''||this.leaderName == undefined){
                                            this.leaderName = this.leaderName_hx;
                                            this.userId = this.leaderId_hx;
                                            this.leaderPhone = this.leaderPhone_hx;
                                        }else {
                                            this.leaderName= this.leaderName
                                            this.userId =  this.userId
                                            this.leaderPhone = this.leaderPhone
                                        }
                                        if ( this.city == '市辖区'){
                                            this.city = this.province
                                        }else {
                                            this.city =  this.city
                                        }
                                        formdata.append('str',JSON.stringify({
                                            token:this.token,
                                            id: JSON.parse(window.sessionStorage.id).i,
                                            company : this.ruleForm.company,
                                            team : this.ruleForm.team,
                                            cityName : this.ruleForm.cityName,
                                            filialeId : this.ruleForm.filialeId,

                                            leaderPhone: this.leaderPhone,
                                            leaderName:this.leaderName,
                                            leaderId:this.userId,

                                            adminId:this.ruleForm.adminId,
                                            type:this.ruleForm.type,
                                            experience:this.ruleForm.experience.join(","),
                                            status:this.ruleForm.status,
                                            remark:this.ruleForm.remark,
                                            adminName:this.adminName,
                                            filialeName:this.filialeName,
                                            province: this.province,
                                            city:this.city,
                                            county: this.countys,
                                            //jiesuan
                                            payPeriod:this.ruleForm.payPeriod,
                                        //    图片删除
                                            businessPic:this.handleRemove_businessPic,
                                            taxPic:this.handleRemove_taxPic,
                                            userIds:str
                                        }));
                                        let config = {
                                            headers: {
                                                'Content-Type':'multipart/form-data'
                                            }
                                        };
                                        this.method( formdata,config)
                                    }

                                // console.log(1);

                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });

                    }else{
                        this.$message({
                            showClose: true,
                            message: '所选择司机不能少于2位，或大于50位！'
                        });
                    }
                },
                method( formdata,config ){
                    // if (this.newmap !=[]){
                    //     this.newmap = this.newmap
                    // } else {
                    //     this.newmap = this.picList
                    // }
                    // if (this.newmap1 !=[]){
                    //     this.newmap1 = this.newmap1
                    // } else {
                    //     this.newmap1= this.picList1
                    // }
                    // if (this.newmap.length !=0 && this.newmap1.length !=0 ) {
                        this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/team/update', formdata,config).then((res)=>{
                            console.log(res);
                            if (res.body.errcode == 0){
                                this.submit = 1
                                this.$message({
                                    message: '保存成功！',
                                    type: 'success'
                                });
                                setTimeout((res)=>{



                                    if (JSON.parse(window.sessionStorage.id).j === 1){
                                        this.$router.push({path:'/motorcadeApplyFor'})
                                    } else{
                                        this.$router.push({path:'/transportCompany'})
                                    }
                                },500)
                            }else{
                                    this.submit = 1;
                                    this.$message.error(res.body.message);
                            }
                        })
                    // }else{
                    //     this.submit = 1 ;
                    //     // this.$message.error('请选择图片上传！');
                    // }


                },
                resetForm(formName) {
                    this.$refs[formName].resetFields();
                },
                submit_cx(){
                    if (this.ruleForm.phone == ''){
                        this.$message('请输入车队长电话!');
                    } else{
                        let page = JSON.stringify({
                            token: this.token,
                            phone : this.ruleForm.phone,
                            pageNum:this.currentPage,
                            pageSize:this.pageSize,
                        })
                        console.log(page);
                        this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_driver_by_phone_fuzzy',page , {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res)=>{
                            console.log(res);
                            if (res.body.result == null){
                                this.$message('该车队长不存在，请注册新车队长');
                            }else {
                                this.centerDialogVisible=true;
                                this.tableData = res.body.result.list;

                                this.total = res.body.result.total
                                for (let i = 0; i < this.tableData.length; i++) {
                                    // this.arrs2.push(false);
                                    if (this.tableData[i].hasMission == 1) {
                                        this.tableData[i].hasMission = '有任务'

                                        // this.arrs2[i] = true;
                                    }else{
                                        this.tableData[i].hasMission = '无任务'
                                        // this.arrs2[i] = false
                                    }
                                }
                            }
                        })
                    }


                },
                submit_cx1(){
                    if(this.ruleForm.namePhone === ''){
                        this.$message('请先选择车队长!');
                        return;
                    }
                    if (this.ruleForm.driverPhone == ''){
                        this.$message('请输入车队司机电话!');
                    } else{
                        let page = JSON.stringify({
                            token: this.token,
                            phone : this.ruleForm.driverPhone,
                            pageNum:this.currentPage2,
                            pageSize:this.pageSize2,
                        })
                        console.log(page);
                        this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/get_driver_by_phone_fuzzy',page , {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res)=>{
                            console.log(res);
                            if (res.body.result == null){
                                this.$message('该车队司机不存在，请检查电话是否正确');
                            }else {
                                this.driverTableVisible=true;
                                this.driverData = res.body.result.list;
                                this.total2 = res.body.result.total;
                                for (let i = 0; i < this.driverData.length; i++) {
                                    this.arrs.push(false);
                                    if (this.driverData[i].hasMission == 1) {
                                        this.driverData[i].hasMission = '有任务'

                                        this.arrs[i] = true;
                                    }else{
                                        this.driverData[i].hasMission = '无任务'
                                        this.arrs[i] = false
                                    }
                                }
                            }
                        })
                    }


                },
                handleCurrentChange(val) {

                    if(val != undefined){
                        if (val.hasMission == '有任务'){
                            this.ruleForm.namePhone = ''
                            this.$message({
                                message: '该司机有任务，不能选中为车队长！',
                            });
                        }else {
                            if(this.driversList.length > 0){
                                for(let i=0;i < this.driversList.length;i++){
                                    if(val.userId === this.driversList[i].userId){
                                        this.$message({
                                            showClose: true,
                                            message: '车队司机中已有此司机，不能设置为车队长！',
                                            type: 'warning'
                                        });
                                        return;
                                    }
                                }

                                this.currentRow = val;
                                this.leaderName =  val.name;
                                this.leaderPhone =  val.phone;
                                this.coss = val.name+ '/'+val.phone
                                // this.centerDialogVisible=false;
                                this.ruleForm.namePhone = this.coss;
                                this.userId = val.userId;
                            }else{
                                this.currentRow = val;
                                this.leaderName =  val.name;
                                this.leaderPhone =  val.phone;
                                this.coss = val.name+ '/'+val.phone
                                // this.centerDialogVisible=false;
                                this.ruleForm.namePhone = this.coss;
                                this.userId = val.userId;
                            }
                        }

                    }

                },
                //已注册司机
                setCurrent(row) {
                    // this.$refs.singleTable.setCurrentRow(row);
                    this.centerDialogVisible=false;
                    // this.ruleForm.namePhone = this.coss;
                    console.log(row);
                    // this.handleCurrentChange()

                },
                // 图片上传
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
                handlePictureCardPreview(file) {
                    console.log(file);
                    this.dialogImageUrl = file.url;
                    this.dialogVisible = true;
                },
                uploadOverrun: function() {
                    this.$message({
                        type: 'error',
                        message: '上传文件个数超出限制!最多上传1张图片!'
                    });
                },
                insert1(file, fileList){
                    console.log(file, fileList);
                    this.picList1=[];
                    this.picList1=fileList;
                    console.log(this.picList1);
                    for(var i in this.picList1) {
                        var fileName = this.picList1[i].name.substring(this.picList1[i].name.lastIndexOf("."));
                        if ((fileName != '.jpg') && (fileName != '.png')) {
                            this.picList1.splice(i,1);
                            this.$message({
                                showClose: true,
                                message: '对不起，系统不支持该格式的文件。',
                                type: 'error'
                            });
                            return false
                        }
                        var size = 0;
                        var num  = 10;
                        size = this.picList1[i].size;//byte
                        size = size / 1024;//kb
                        size = (size / 1024).toFixed(1);//mb
                        if (size > num){
                            this.picList1.splice(i,1);
                            this.$message({
                                showClose: true,
                                message: '对不起，您上传的文件大小为'+ size +'文件大小超出10M。上传失败！',
                                type: 'error'
                            });
                            return false
                        }
                    }
                },
                handleRemove(file,filelist){
                    console.log(file.url);
                    console.log(filelist);
                    console.log(this.imgs)
                    let url = file.url;

                    if(url.indexOf("?") != -1){

                        url = url.split("?")[0];

                        console.log(url);
                        this.handleRemove_businessPic = url

                    }
                },
                handleRemove1(file,filelist){
                    console.log(filelist);
                    this.newmap1=filelist
                    let url = file.url;

                    if(url.indexOf("?") != -1){

                        url = url.split("?")[0];

                        console.log(url);
                        this.handleRemove_taxPic = url

                    }

                },
                // 唯一性校验
                //车队名称唯一性校验
                teamSole(){
                    if (this.ruleForm.team.match( /^([A-Za-z]|[\u4E00-\u9FA5]|\w){2,50}$/)){
                        let page = JSON.stringify({
                            team : this.ruleForm.team ,
                            token: this.token
                        })
                        console.log(page);
                        this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/team/is_team_exist',page,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res)=>{
                            console.log(res);
                            if (res.body.result){
                                this.$message({
                                    message: '该车队名已存在,请重新输入!',
                                    type: 'warning'
                                });

                            }
                        })
                    }
                },
                // 电话唯一
                phoneSole(){
                    if(this.ruleForm.newphone.match(/^[\d-]{1,14}$/)){
                        let page =JSON.stringify({
                            phone: this.ruleForm.newphone,
                            token:this.token
                        })
                        console.log(page);
                        // this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/is_phone_available',page,{
                        this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/driver/is_phone_available',page,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res)=>{
                            console.log(res);
                            if (res.body.result==false){
                                this.$message({
                                    message: '该车队长已存在!',
                                    type: 'warning'
                                });
                            }
                        })
                    }


                },
                //分页
                handleCurrentChange_fy(val) {
                    this.currentPage = val;
                    this.submit_cx()
                },
            },
        }
    </script>
    <style lang="scss">
        .header{
            margin-bottom:20px;
        }
        .driversList{
            margin:0 0 20px 125px;
            width: 612px;
        }
        .form{
            .el-form-item{
                width: 45%;
            }
            .el-cascader{
                width: 100%;
            }
        }
        .el-table__body tr.current-row > td {
            /* background: #edf7ff; */
            background: #20a0ff;
            color: black;
        }
    </style>
