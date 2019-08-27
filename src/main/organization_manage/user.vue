<template>
   <div class="main">
      <div class="header">
          当前位置  <span>组织管理 > 新增用户  </span>
      </div>

       <div class="fromClass">
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-top: 20px">
               <el-form-item label="编号" prop="id" style="width: 30%" >
                   <el-input v-model="ruleForm.id" disabled></el-input>
               </el-form-item>
               <!--<el-form-item label="区域" prop="value">-->
                   <!--<el-select v-model="ruleForm.value" placeholder="请选择区域"  @change="onoptionsone($event)" >-->
                       <!--<el-option-->
                               <!--v-for="item in options4"-->
                               <!--:key="item.id"-->
                               <!--:label="item.areaName"-->
                               <!--:value="item.id">-->
                       <!--</el-option>-->
                   <!--</el-select>-->
               <!--</el-form-item>-->
               <el-form-item label="所属分公司" prop="value1"  >
                   <el-select v-model="ruleForm.value1" placeholder="请选择所属分公司" @change="onoptionstwo()"  >
                       <el-option
                               v-for="item in options1"
                               :key="item.id"
                               :label="item.deptName"
                               :value="item.id">
                       </el-option>
                   </el-select>
               </el-form-item>
               <el-form-item label="所属部门" prop="value2">
                   <el-select v-model="ruleForm.value2" placeholder="请选择所属部门"  >
                       <el-option
                               v-for="item in options2"
                               :key="item.id"
                               :label="item.deptName"
                               :value="item.id">
                       </el-option>
                   </el-select>
               </el-form-item>
               <el-form-item label="角色" prop="value3">
                   <el-select v-model="ruleForm.value3" placeholder="请选择角色"      >
                       <el-option
                               v-for="item in options3"
                               :key="item.id"
                               :label="item.roleName"
                               :value="item.id">
                       </el-option>
                   </el-select>
               </el-form-item>
               <el-form-item label="姓名" prop="name" style="width: 30%">
                   <el-input v-model="ruleForm.name"  placeholder="请输入姓名" ></el-input>
               </el-form-item>
               <el-form-item label="性别" prop="sex">
                   <el-radio v-model="ruleForm.sex" label="1" >男</el-radio>
                   <el-radio v-model="ruleForm.sex" label="2">女</el-radio>
               </el-form-item>
               <el-form-item label="用户名" prop="username" style="width: 30%">
                   <el-input v-model="ruleForm.username"  placeholder="请输入用户名" ></el-input>
               </el-form-item>
               <el-form-item label="密码" prop="password" style="width: 30%">
                   <el-input type="password" v-model="ruleForm.password"  placeholder="请输入密码" ></el-input>
               </el-form-item>
               <el-form-item label="状态" prop="status" >
                   <el-radio v-model="ruleForm.status" label="1" >启用</el-radio>
                   <el-radio v-model="ruleForm.status" label="0" >禁用</el-radio>
               </el-form-item>
               <el-form-item label="联系电话" prop="phone" style="width: 30%">
                   <el-input v-model="ruleForm.phone"  class='inp_w'></el-input>
               </el-form-item>
               <el-form-item label="邮箱" prop="email" style="width: 30%">
                   <el-input v-model="ruleForm.email"  class='inp_w'></el-input>
               </el-form-item>
           </el-form>
       </div>
      <div class="btn">
            <!--<el-button type="primary" @click="addTr()">新增</el-button>-->
            <el-button type="success" @click="submit('ruleForm')" v-if="save==0?true:false">保存</el-button>
            <el-button type="success" :loading="true" v-if="save==0?false:true">保存中</el-button>
            <el-button type="info" @click="onreturn">返回</el-button>
      </div>
    </div> 
</template>
<script>
    import {roleName} from '../../js/lostPassword.js'
    const sha256 = require("js-sha256").sha256;
export default {
    data() {
        return{
            save:0,
            // options4:[],
            options1:[],
            options2: [],
            options3:[],
            aa:'',
            bb:'',
            cc:'',
            dd:'',
            ruleForm: {
                id:'',
                value:'',
                value1:'',
                value2:'',
                value3:'',
                uesrname:'',
                password:'',
                status:'1',
                sex:'1',
                phone:'',
                email:'',
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    {pattern: /^([A-Za-z]|[\u4E00-\u9FA5]){2,10}$/, message: '请输入 2 到 10 个汉字或字母', trigger: 'blur' }
                ],
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    {pattern: /^([A-Za-z]|[0-9]){2,20}$/, message: ' 请输入2 到 20 个字母，数字或组合', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { pattern: /^([A-Za-z0-9]){6,16}$/, message: '请输入6到16位字母，数字或组合', trigger: 'blur' }
                ],
                // value: [
                //     { required: true, message: '请选择区域', trigger: 'change' }
                // ],
                value1: [
                    { required: true, message: '请选择所属分公司', trigger: 'change' }
                ],
                value2: [
                    { required: true, message: '请选择所属部门', trigger: 'change' }
                ],
                value3: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
                phone:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }
                ],
                sex :[
                    { required: true,  }
                ],
                status :[
                    { required: true,  }
                ]
            },
            selVal:[],
        }
    },
    created(){
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        this.data();
    },
    methods:{
        data(){
            let page0 = JSON.stringify({
                token: this.token,
            });
            this.$http.post( this.global.lightningUrl + '/companyv1/security/admin/generateId',page0, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                this.ruleForm.id = res.body.result.adminNum;
            });


            let page = JSON.stringify({
                token: this.token,
                pid :0
            });
            console.log(page);
            this.$http.post( this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByAreaId',page , {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                console.log(res);
                this.options1 = res.body.result.deptList;
            })






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
                console.log(res);
                this.options3 = res.body.result.rows
            })
        },
        onoptionsone(selVal){
            this.selVal.push(selVal)
            console.log(this.selVal);
            // this.selVal = [];
            if (this.ruleForm.value !==this.selVal.length-1){
                this.ruleForm.value1 = '';
                this.ruleForm.value2 = '';
            }

        },
        onoptionstwo(  ){
            console.log(this.ruleForm.value);
            let page = JSON.stringify({
                token: this.token,
                id : this.ruleForm.value1,
            });
            console.log(page);
            this.$http.post( this.global.lightningUrl + '/companyv1/userManage/department/getDeptTreeByDeptId',page ,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            } ).then((res)=>{
                console.log(res);
                this.options2 = res.body.result.deptList;
            })
        },
        submit(ruleForm){
            if (this.ruleForm.id != '' ){
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        this.save = 1;
                        // for(let i=0;i < this.options4.length ;i++){
                        //     if(this.ruleForm.value == this.options4[i].id){
                        //         this.aa = this.options4[i].areaName;
                        //     }
                        // };
                        for(let i=0;i < this.options1.length ;i++){
                            if(this.ruleForm.value1 == this.options1[i].id){
                                this.bb = this.options1[i].deptName;
                            }
                        };
                        for(let i=0;i < this.options2.length ;i++){
                            if(this.ruleForm.value2 == this.options2[i].id){
                                this.cc = this.options2[i].deptName;
                            }
                        };
                        for(let i=0;i < this.options3.length ;i++){
                            if(this.ruleForm.value3 == this.options3[i].id){
                                this.dd = this.options3[i].roleName;
                            }
                        };
                        let page = JSON.stringify({
                            token:this.token,
                            adminParamList:[{
                                id : this.ruleForm.id,
                                status : this.ruleForm.status,
                                password: sha256(this.ruleForm.password),
                                name : this.ruleForm.name,
                                userName:this.ruleForm.username,
                                roleId:this.ruleForm.value3,
                                roleName: this.dd,
                                filialeId:this.ruleForm.value1,
                                filialeName:this.bb,
                                departmentId: this.ruleForm.value2,
                                departmentName:this.cc,
                                // areaId: this.ruleForm.value,
                                // areaName: this.aa,
                                sex:this.ruleForm.sex,
                                phone:this.ruleForm.phone,
                                email : this.ruleForm.email,
                            }]
                        });
                        console.log(page);
                        this.$http.post( this.global.lightningUrl + '/companyv1/security/admin/batchSave',page,{
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        } ).then((res)=>{
                            console.log(res);
                            if (res.body.errcode == 0){
                                this.$forceUpdate();
                                this.$message({
                                    message: '保存成功',
                                    type: 'success'
                                });
                                // this.ruleForm.id = res.body.result[0].id;
                                // this.options4 = res.body.result[0].areaName;
                                // this.options2=res.body.result[0].departmentName;
                                // this.options1=res.body.result[0].filialeName;
                                // this.ruleForm.name=res.body.result[0].name;
                                // this.ruleForm.password = res.body.result[0].password;
                                //     this.ruleForm.status = JSON.stringify(res.body.result[0].status);
                                // this.ruleForm.username=res.body.result[0].userName;
                                // this.ruleForm.sex=res.body.result[0].sex;
                                // this.ruleForm.phone=res.body.result[0].phone;
                                // this.ruleForm.email=res.body.result[0].email;
                                // console.log(res.body.result[0].status);
                                // this.$set( this.ruleForm , status, res.body.result[0].status )
                                // setTimeout(function () {
                                //     console.log(1);
                                this.$router.push({path:'/organization_manage'})
                                // },500)

                            }else {
                                this.save = 0;
                                this.$message.error(res.body.message);
                            }
                        })
                    } else {
                        return false;
                    }
                });
            } else {

            }


        },
        addTr() {
            this.newsList.push({
                title: this.addDetail.title,
                user: this.addDetail.user,
                dates: this.addDetail.dates,
            });
            this.name=''
        },
        onreturn(){
            this.$router.push({path:'/organization_manage'})
        },
        //删除
        deletelist(id, i) {
            this.newsList.splice(i, 1);
        },
        update() {
            let _this= this
            for(let i = 0; i < _this.newsList.length; i++) {
                if(_this.newsList[i].id ==this.editid) {
                    _this.newsList[i] = {
                        title: _this.editDetail.title,
                        user: _this.editDetail.user,
                        dates: _this.editDetail.dates,
                        id: this.editid
                    }
                    this.editlist = false
                }
            }
        },
        changeCount(){
            if( this.name=='' ){
                this.$message({
                    message: '请输入内容 ',
                    type: 'warning'
                });
            }else{
                roleName(this,this.name);
                if (this.verify == false){
                    this.$message.error('姓名命名不规范');
                }
            }

        }
    }
}
</script>
<style lang="less" scoped>
.main{
    .fromClass{
        .el-form-item{
            margin-bottom: 15px;
        }
    }
    i{
        color: red;
    }
    select{
        display: block;
        width: 150px;
        height: 40px;
    }
    .btn{
        padding-top:2%;
        margin-left: 10%;
    }

}
</style>
