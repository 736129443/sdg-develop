<template>
    <div class="main">
        <div class="header">
            当前位置 : <span>组织管理 > 创建部门  </span>
        </div>
        <div class="nav">
            <span>部门结构</span>
        </div>
        <div class="center">
            <span class="sdg">
                <template>
                      <el-select v-model="value" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.deptName"
                                    :value="item.id">
                            </el-option>
                      </el-select>
                </template>
                >
            </span>
            <ul class="qu_bm">
                <li>
                    <span class="bm">创建部门名称</span>
                </li>
                <li class="oli" v-for="(i, index) in inp_list">
                    <div class="q2">
                        <el-form >
                            <el-form-item >
                                <el-input v-model="i.inp" ></el-input>
                                <el-button type="primary" @click="shangji_del(index)">删除</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </li>
                <li>
                    <div>
                        <el-form>
                            <el-form-item>
                                <el-button type="primary" @click="shangji_add()" >添加</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bottom">
            <span class="bto-sp">下级部门结构 </span>
            <ul class="bto-oul">
                <span @click.stop>
                <li v-for="(i,index) in arr"  @click="Office(index)">
                    <router-link to="xjSubdivision" >
                        <span class="company" @click="Preservation" style="color:#409EFF;">{{i}}</span>
                    </router-link>
                    <span class="bto-oul-li-sp">
                        <i><el-button type="primary" @click="edit(index),dialogFormVisible = true" >编辑</el-button></i>
                        <i><el-button @click="del(index,$event)" type="primary" :loading="DeleteWaiting">删除</el-button></i>
                    </span>
                </li>
                </span>
            </ul>
        </div>
        <div class="btn">
            <el-button type="primary" @click="PreservationBranch()" :loading="buttonState" >保存</el-button>
        </div>
        <!-- 编辑部门的模态框   -->
        <el-dialog title="编辑部门" :visible.sync="dialogFormVisible">
            <el-form :model="form" >
                <el-form-item label="上级部门" >
                    <el-select v-model="form.region" disabled >
                        <el-option label="销售部" value="shanghai"></el-option>
                        <el-option label="研发部" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门名称" >
                    <el-input v-model="form.deptName1" placeholder="部门名称" ></el-input>
                </el-form-item>
                <el-form-item label="负责人" >
                    <el-input v-model="form.name1" placeholder="负责人" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" >
                <el-button  type="primary" @click=" dialogFormVisible = false,save()">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                app:'',
                //删除等待
                DeleteWaiting:false,
                arr:[],
                form: {
                    deptName1: '',
                    name1: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                },
                //编辑窗口
                dialogFormVisible: false,
                value: '',
                options: [],
                //保存按钮
                buttonState:false,
                token:'',
                inp_list:[
                    {
                        city:[''],
                        inp:'',
                        city_value:'',
                        before_val:'',
                        bumen:''
                    },
                    {
                        city:[''],
                        inp:'',
                        city_value:'',
                        before_val:'',
                        bumen:''
                    },
                    {
                        city:[''],
                        inp:'',
                        city_value:'',
                        before_val:'',
                        bumen:''
                    },
                ],
                deptListStr:[],
                curVal:'',
                Superior:'',
                idx:'',
                data:[],
            }
        },
        created(){
            //拿到token
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;

            //下拉的填充数据
            let page = JSON.stringify({
                'token': this.token,
                'pid':'0',
            });
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByAreaId',page,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                if (res.body.errcode == 0){
                    this.options = res.body.result.deptList;

                }
            });
            if(sessionStorage.getItem('value')!=null){
                this.options = [];
                this.options.push(JSON.parse(sessionStorage.getItem('value'))) ;
                this.value = this.options[0].id
            }
            console.log(this.options)
        },
        watch:{
            value: function(curVal){
                console.log(curVal);
                this.curVal = curVal;
                for (var i in this.options){
                    if (this.options[i].id == this.curVal) {
                        sessionStorage.setItem('value', JSON.stringify(this.options[i]));
                    }
                }
                //下级部门数据
                this.subordinate();
            }
        },
        methods:{
            //
            Office(index){
                this.id = this.app[index].id;
                sessionStorage.setItem('BranchOffice', JSON.stringify(this.app[index]));
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByPid',JSON.stringify({
                    'token':this.token,
                    "pid":this.id,
                })).then(run=>{
                    console.log(run);
                    this.Establish = run.body.result.deptList;
                    sessionStorage.setItem('Establishs', JSON.stringify(this.Establish));
                })
            },
            //点击下级部门
            Preservation(e){
                for (var i in this.options){
                    if (this.options[i].id == this.value){
                        this.data.push(this.options[i].deptName);
                        sessionStorage.setItem('Branch', JSON.stringify(this.data));
                    }
                }
                this.data.push(e.target.innerText);
                sessionStorage.setItem('Branch', JSON.stringify(this.data));
                this.$router.push({path:'/xjSubdivision'});
            },
            // 编辑保存
            save(){
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/updateDept',JSON.stringify({
                    'token':this.token,
                    "id":this.savedata.body.result.dept.id,
                    "pid":this.savedata.body.result.dept.pid,
                    "deptName":this.form.deptName1,
                    "principalName":this.form.name1,
                })).then(run=>{
                    console.log(run)
                    if (run.body.errcode == 0){
                        this.$message({
                            showClose: true,
                            message: run.body.message,
                            type: 'success'
                        });
                    }
                })
            },
            //下级部门的数据
            subordinate(){
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByPid',JSON.stringify({
                    'token':this.token,
                    "pid":this.curVal,
                }),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(run=>{
                    //所有下级部门的的原始数据
                    this.arr = [];
                    if (run.body.errcode == 0) {
                        this.app = run.body.result.deptList;
                        for(var i in run.body.result.deptList ){
                            this.arr.push(run.body.result.deptList[i].deptName)
                        }
                    }
                });
            },
            //下级部门删除
            del(index,e){
                e.stopPropagation();
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/enableDeleteDept',JSON.stringify({
                    'token':this.token,
                    "id":this.app[index].id,
                })).then(run=>{
                    this.state = run.body.result;
                    if(!this.state){
                        this.$message({
                            type: 'info',
                            message: '该部门不能被删除'
                        });
                        // location.reload();
                    }else if(this.state){
                        this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/deleteDept',JSON.stringify({
                            'token':this.token,
                            "id":this.app[index].id,
                        })).then(run=>{
                            this.DeleteWaiting = true;
                            setTimeout(()=>{
                                this.arr.splice(index, 1);
                                this.$message({
                                    type: 'info',
                                    message: '删除成功'
                                });
                                this.DeleteWaiting = false;
                                //下级部门数据
                                this.subordinate();
                            },1000)
                        })
                    }
                });
            },
            // 编辑
            edit(index){
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptById',JSON.stringify({
                    'token':this.token,
                    "id":this.app[index].id,
                    "pid":this.app[index].pid,
                })).then(run=>{
                    if (run.body.errcode == 0){
                        this.savedata = run;
                        console.log(this.savedata);
                        this.form.deptName1 = run.body.result.dept.deptName;
                        this.form.name1 = run.body.result.dept.principalName;
                        for(let i in this.options){
                            if (this.options[i].id == this.value){
                                this.form.region = this.options[i].deptName;
                            }
                        }
                    }
                })
            },
            //保存
            PreservationBranch(){
                for(let i in this.inp_list ){
                    this.deptListStr.push({"deptName":this.inp_list[i].inp,"pid":this.value});
                };
                var deptListStrs = [];
                for (let i = 0; i < this.deptListStr.length; i++) {
                    if (this.deptListStr[i].deptName != '') {
                        deptListStrs.push(this.deptListStr[i])
                    }
                }
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/saveBatchDept',JSON.stringify({
                    'token':this.token,
                    'deptListStr':deptListStrs,
                })).then(run=>{
                    console.log(run);
                    this.deptListStr=[];

                    //下级部门数据
                    this.arr = [];
                    if (run.body.errcode == 1903){
                        this.$message({
                            showClose: true,
                            message: run.body.message
                        });
                    }else if (run.body.errcode == 0){
                        this.$message({
                            showClose: true,
                            message: run.body.message
                        });
                    }
                    this.subordinate();
                })
            },
            //删除按钮
            shangji_del(index) {
                this.inp_list.splice(index, 1)
            },
            //添加
            shangji_add(){
                let arr = {
                    inp:'',
                };
                this.inp_list.push(arr);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .main{
        .header{
            margin-bottom: 20px;
        }
        .nav{
            margin-top:20px;
            width:100%;
            background:#b6b6b6;
            line-height:50px;
        }
        .center {
            width: 100%;
            margin-top: 20px;
            .sdg{
                padding-top:112px;
                float: left;
            }
            .qu_bm{
                width:50%;
                float: left;
                margin-left:50px;
                li{
                    margin-bottom:20px;
                    .qu{
                        margin:0 30px;
                    }
                    .bm{
                        margin:0 30px;
                    }
                }
                .oli{
                    min-height:50px;
                    .q2{
                        width:60%;
                        .el-input{
                            width: 50%;
                        }
                    }
                }
            }
        }
        .bottom{
            clear: both;
            .bto-sp{
                float: left;
            }
            .bto-oul{
                float: left;
                margin:20px 20px;
                li{
                    .company{
                        cursor: pointer;
                    }
                    margin-bottom:20px;
                    .bto-oul-li-sp{
                        margin-left:20px;
                        i{
                            color:blue;
                            margin:0 5px;
                        }
                    }
                }
            }
        }
        .btn{
            padding:50px 0;
            clear: both;
            width:20%;
            margin:0 auto;
        }
    }
</style>