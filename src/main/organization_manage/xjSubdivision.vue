<template>
    <div class="main">
        <div class="header">
            当前位置 : <span>组织管理 > 部门</span>
        </div>
        <div class="nav">
            <span>部门结构</span>
        </div>
        <div class="center">
            <span class="sdg">闪电狗 > </span>
            <span class="sdg" v-for="i in data" >{{i}}></span>
            <ul class="qu_bm">
                <li>
                    <span class="bm">创建组织/部门名称</span>
                </li>
                <li class="oli" v-for="(i, index) in inp_list">
                    <div class="q2">
                        <el-form >
                            <el-form-item >
                                <el-input v-model="i.inp"></el-input>
                                <el-button id="q3" @click="shangji_del(index)" type="primary">删除</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </li>
                <li>
                    <div>
                        <el-form>
                            <el-form-item>
                                <el-button @click="shangji_add()" type="primary">添加</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bottom">
            <span class="sp1">下级部门结构 </span>
            <ul >
                <span @click.stop>
                    <li class="oli" v-for="(i,index) in arr" @click="Office(index)">

                            <!--<router-link to="/xjSubdivision">-->
                                <span class="sp2" @click="Preservation">{{i}}</span>
                            <!--</router-link>-->
                            <span class="sp1">
                                <i><el-button type="primary" @click="dialogFormVisible = true,edit(index,$event)">编辑</el-button></i>
                               <i><el-button type="primary" @click="del(index,$event)" :loading="DeleteWaiting" >删除</el-button></i>
                            </span>
                    </li>
                </span>
            </ul>
        </div>
        <div class="btn">
            <el-button type="primary" @click="Preservations()" :loading="buttonState">保存</el-button>
            <router-link to="createDepartment">
                <el-button  type="primary">返回</el-button>
            </router-link>
        </div>
        <!-- 编辑部门的模态框   -->
        <el-dialog title="编辑部门" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="上级部门" >
                    <el-select v-model="form.region" disabled >
                        <el-option label="销售部" value="shanghai"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门名称" >
                    <el-input v-model="form.deptName1" placeholder="部门名称" ></el-input>
                </el-form-item>
                <el-form-item label="负责人" >
                    <el-input v-model="form.name1" placeholder="负责人" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button  type="primary" @click="dialogFormVisible = false,SaveEditor()">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tt:'',
                DeleteWaiting:false,
                aggregates:"",
                deptListStr:[],
                //按钮状态
                buttonState:false,
                token:'',
                ids:'',
                id:'',
                dialogTableVisible: false,
                dialogFormVisible: false,
                data:[],
                arr:[],
                inp_list:[
                    {
                        inp:'',
                    },
                    {
                        inp:'',
                    },
                    {
                        inp:'',
                    },
                ],
                form:{
                    region : '',
                    region0:'',
                    name : '',
                    name0 : '',
                }
            }
        },
        created() {
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.data = JSON.parse(sessionStorage.getItem('Branch'));
            this.ids =JSON.parse(sessionStorage.getItem('BranchOffice'));
            //取到点击的下级部门名称的所有集合
            let aggregate =JSON.parse(sessionStorage.getItem('Establishs'));
            console.log(1)
            this.aggregates = aggregate;
            console.log(this.aggregates);
            for(var i in this.aggregates){
                this.arr.push(this.aggregates[i].deptName);
            }
            console.log(this.arr);
            console.log(this.ids);
            this.subordinate();
        },
        methods:{
            //获取到下拉
            subordinate(){
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByPid',JSON.stringify({
                    'token':this.token,
                    "pid":this.ids.id,
                })).then(run=>{
                    this.arr = [];
                    //所有的原始数据
                    this.app = run.body.result.deptList;
                    for(var i in run.body.result.deptList ){
                        this.arr.push(run.body.result.deptList[i].deptName)
                    }
                })
            },
            Preservation(e){
                let q = e.target.innerText;
                this.data.push(q);
                sessionStorage.setItem('Branch', JSON.stringify(this.data));
            },
            // 编辑
            edit(index,e){
                e.stopPropagation();
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptById',JSON.stringify({
                    'token':this.token,
                    "id":this.app[index].id,
                    "pid":this.app[index].pid,
                })).then(run=>{
                    console.log(run);
                    this.savedata = run;
                    this.$forceUpdate();
                    this.form.deptName1 = run.body.result.dept.deptName;
                    this.form.name1 = run.body.result.dept.principalName;
                    console.log(this.form.deptName1);
                    for(let i in this.data){
                         this.form.region = this.data[this.data.length-1];
                    }
                })
            },
            SaveEditor(){
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/updateDept',JSON.stringify({
                    'token':this.token,
                    "id":this.savedata.body.result.dept.id,
                    "pid":this.savedata.body.result.dept.pid,
                    "deptName":this.form.deptName1,
                    "principalName":this.form.name1,
                })).then(run=>{
                    console.log(run)
                })
            },
            //点击下级部门
            Office(index){
                console.log(123);
                console.log(this.app[index]);
                console.log(this.app[index].id);
                this.id = this.app[index].id;
                sessionStorage.setItem('BranchOffice', JSON.stringify(this.app[index]));
                // console.log(123);
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByPid',JSON.stringify({
                    //id
                    'pid':this.id,
                    'token':this.token,
                })).then(run=>{
                    console.log(run);
                    this.Establish = run.body.result.deptList;
                    // console.log(this.Establish);
                    sessionStorage.setItem('Establishs', JSON.stringify(this.Establish));
                    location.reload();
                })
            },
            shangji_add() {
                let arr = {
                    inp: '',
                };
                this.inp_list.push(arr)
            },
            //保存
            Preservations(){
                var deptListStrs = [];
                for(var i in this.inp_list){
                    this.deptListStr.push({"deptName":this.inp_list[i].inp,"pid":this.ids.id});
                }
                for (var i in this.deptListStr) {
                    if (this.deptListStr[i].deptName != '') {
                        deptListStrs.push(this.deptListStr[i])
                    }
                }
                console.log(deptListStrs);
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/saveBatchDept',JSON.stringify({
                    'token':this.token,
                    'deptListStr':deptListStrs,
                })).then(run=>{
                    console.log(run);
                    this.deptListStr=[];
                    if(run.body.errcode == 0){
                        this.$message({
                            message: run.body.message,
                            type: 'success'
                        });
                        //保存完的回显示
                        this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByPid',JSON.stringify({
                            'token':this.token,
                            "pid":this.ids.pid,
                        })).then(run=>{
                            console.log(run);
                            this.arr = [];
                            for(var i in run.body.result.deptList){
                                this.arr.push(run.body.result.deptList[i].deptName)
                            }
                            this.arr = '';
                            //再次回现数据（下级部门）
                            //获取到下拉
                            this.subordinate();
                        })
                    }else {
                        this.$message({
                            showClose: true,
                            message: run.body.message,
                            type: 'error'
                        });
                    }
                });
            },
            shangji_del(index) {
                this.inp_list.splice(index,1)
            },
            del(index,e){
                console.log(this.app[index]);
                console.log(this.app[index].id);
                console.log(e);
                e.stopPropagation();
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/enableDeleteDept',JSON.stringify({
                    'token':this.token,
                    "id":this.app[index].id,
                })).then(run=>{
                    console.log(run);
                    // console.log(run.body.result);
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
                            console.log(run);
                            this.DeleteWaiting = true;
                            setTimeout(()=>{
                                this.arr.splice(index, 1);
                                this.$message({
                                    type: 'info',
                                    message: '删除成功'
                                });
                                this.DeleteWaiting = false;
                            },1000)
                        })
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scpoed>
    .main{
        height:100%;
        width:100%;
        padding:30px 0 100px 30px;
        .nav{
            margin-top:20px;
            width:100%;
            background:#b6b6b6;
            line-height:50px;
        }
        .center{
            overflow: hidden;
            width:100%;
            margin-top:20px;
            .sdg{
                padding-top:112px;
                float: left;
            }
            .qu_bm{
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
                    width:100%;
                    .q1{
                        float: left;
                        margin:0 10px;
                        .q1-1{
                            display:block;
                            width:100px;
                            border:1px solid #ccc;
                            padding:10px 0;
                            border-radius: 3px;
                        }
                    }
                    .q2{
                        margin:0 10px;
                        position: relative;
                        float: left;
                        #q3{
                            position: absolute;
                            top:0;
                            right:-80px;
                        }
                    }
                }
            }
        }
        .bottom{
            overflow: hidden;
            clear: both;
            span{
                float: left;
            }
            ul{
                float: left;
                padding-left:20px;
                li{
                    overflow: hidden;
                    .sp2{
                        cursor: pointer;
                        margin:10px 20px;
                    }
                    .sp1{
                        margin:4px 20px;
                    }
                }
            }
        }
        .btn{
            clear: both;
            padding: 20px 0;
            text-align: center;
        }
    }
</style>