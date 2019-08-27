<template>
    <div class="main">
        <div class="header">
            当前位置 : <span>组织管理 > 部门</span>
        </div>
        <div class="nav">
            <span>部门结构</span>
        </div>
        <div class="center">
            <span class="sdg">闪电狗 ></span>
            <ul class="qu_bm">
                <li>
                    <span class="qu">选择区域</span>
                    <span class="bm">创建分公司名称</span>
                </li>
                <li class="oli" v-for="(i, index) in inp_list">
                    <div class="q1" >
                        <select class="q1-1" v-model="i.city_value" style="cursor: pointer;">
                            <option  v-for="(j,index) in i.city">{{j}}</option>
                        </select>
                    </div>
                    <div class="q2">
                        <el-form >
                            <el-form-item >
                                <el-input v-model="i.inp"></el-input>
                                <el-button id="q3" type="primary" @click="shangji_del(index)">删除</el-button>
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
                <li v-for="(i,index) in arr"  @click="Office(index)" >

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
            <el-button type="primary" @click="ssda()" :loading="buttonState" >保存</el-button>
            <el-button @click="Return()" type="primary">返回</el-button>

        </div>
        <!-- 编辑部门的模态框   -->
        <el-dialog title="编辑部门" :visible.sync="dialogFormVisible">
            <el-form :model="form" >
                <el-form-item label="选择区域" >
                    <el-select v-model="form.region1" placeholder="请选择区域" disabled>
                        <el-option v-for="i in this.tt" :label=i.areaName :value="i.areaName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上级部门" >
                    <el-select v-model="form.region" placeholder="闪电狗" disabled >
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
                <el-button  type="info" @click=" dialogFormVisible = false,save()">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {

                //删除等待
                DeleteWaiting:false,
                //编辑保存按钮
                savedata:'',
                //按钮状态
                buttonState:false,
                //删除的临界状态
                state:'',

                token:'',
                qq:[],
                postId:[],
                postName:[],
                check:[],
                names:[],
                ids:[],
                name:[],
                ss:[],
                ccc:'',
                ggg:'',
                tt:'',
                deptListStr:[],
                Establish:'',
                id:'',
                app:'',
                dialogFormVisible: false,
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
                arr:[],
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
            }
        },
        created(){
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByPid',JSON.stringify({
                'token':this.token,
                "pid":0,
            })).then(run=>{
                var tt = run.body.result.deptList;
                //所有的原始数据
                this.app =  tt;
                for(var i in tt ){
                    this.arr.push(tt[i].deptName)
                }
                //下级部门的名称
                // console.log(this.arr)
            });
            this.$http.post(this.global.lightningUrl + '/company/usermanage/areagetareallistbyname',JSON.stringify({
                'token':this.token,
                "pageNum":1,
                "pageSize":100,
                'status':1
            })).then(run=>{
                this.tt = run.body.result.rows;
                //所有下拉列表的内容
                for(var i in this.tt ){
                    var ss = this.tt[i].areaName;
                    var cc = this.inp_list;
                    var id = this.tt[i].id;
                    this.ids.push(id);
                    for ( i in cc){
                        cc[i].city.push(ss)
                    }
                    this.names.push(ss)
                }
            })
        },
        beforeDestroy() {
            location.reload();
        },
        methods: {
            //首次加载
            //点击保存按钮
            ssda(){

                this.postId=[];
                this.name=[];
                //手动添加的分公司名称的数组ddd
                var ddd = this.inp_list;
                this.deptListStr = [];
                for(var i in ddd){
                   this.ccc = ddd[i].city_value;
                   this.ggg =  ddd[i].inp;
                    var qq = this.postId[i];
                    this.deptListStr.push({"areaId":qq,"areaName":this.ccc,"deptName":this.ggg,"pid":0});
                    this.name.push(this.deptListStr[i].areaName);
                    console.log(this.ggg);
                    console.log(this.ccc);
                    console.log(qq);
                };
                console.log(this.names);
                console.log(this.name);
                console.log(this.tt);
                for(var i in this.tt){
                    for(var j in this.name){
                        if(this.tt[i].areaName == this.name[j] ){
                            console.log(this.tt[i]);
                            this.postId.push(this.tt[i].id);
                            this.postName.push(this.tt[i].areaName);
                        }
                    }
                }
                console.log(this.postId);
                for(let i=0;i<this.postId.length;i++){
                    this.deptListStr[i].areaId = this.postId[i];
                    this.deptListStr[i].areaName = this.postName[i];
                    console.log(this.deptListStr[i].areaId);
                };

                var deptListStrs = [];
                for (let i = 0; i < this.deptListStr.length; i++) {
                    if (this.deptListStr[i].deptName != '') {
                        deptListStrs.push(this.deptListStr[i])
                    }
                }
                console.log(deptListStrs);

                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/saveBatchDept',JSON.stringify({
                    'token':this.token,
                    "deptListStr":deptListStrs,
                })).then(run=>{
                    console.log(run)
                });
                //保存完的回显示
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByPid',JSON.stringify({
                    'token':this.token,
                    "pid":0,
                })).then(run=>{
                        // console.log(run);
                });
                this.arr = '';
                //再次回现数据（下级部门）
                this.buttonState = true;
                setTimeout(()=>{
                    // location.reload();
                },1000)
            },
            Preservation(e){
                let q = e.target.innerText;
                let info = [];
                info.push(q);
                sessionStorage.setItem('Branch', JSON.stringify(info));
            },
            Office(index){
                this.id = this.app[index].id;
                sessionStorage.setItem('BranchOffice', JSON.stringify(this.app[index]));
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/getDeptListByPid',JSON.stringify({
                    'token':this.token,
                    "pid":this.id,
                })).then(run=>{
                    this.Establish = run.body.result.deptList;
                    sessionStorage.setItem('Establishs', JSON.stringify(this.Establish));
                })
            },
            shangji_add() {
                this.$http.post(this.global.lightningUrl + '/company/usermanage/areagetareallistbyname',JSON.stringify({
                    'token':this.token,
                    "pageNum":1,
                    "pageSize":100,
                    'status':1
                })).then(run=>{
                    var tt = run.body.result.rows;
                    for(var i in tt ){
                        var ss = tt[i].areaName;
                        var cc = this.inp_list;
                        for ( i in cc){
                            cc[i].city.push(ss)
                        }
                    }
                });
                let arr = {
                    city:[],
                    inp: '',
                    city_value: '',
                    before_val: ''
                };
                this.inp_list.push(arr)
            },
            shangji_del(index) {
                this.inp_list.splice(index, 1)
            },
            //删除按钮
            del(index,e){
                e.stopPropagation();
                // console.log(this.app[index]);
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
                    this.savedata = run;
                    console.log(this.savedata);
                    this.form.deptName1 = run.body.result.dept.deptName;
                    this.form.region1 = run.body.result.dept.areaName;
                    this.form.name1 = run.body.result.dept.principalName;
                })
            },
            // 编辑保存
            save(){
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/updateDept',JSON.stringify({
                    'token':this.token,
                    "id":this.savedata.body.result.dept.id,
                    "pid":this.savedata.body.result.dept.pid,
                    "areaName":this.form.region1,
                    "areaId":this.savedata.body.result.dept.areaId,
                    "deptName":this.form.deptName1,
                    "principalName":this.form.name1,
                })).then(run=>{
                    console.log(run)
                })
            },
            Return(){
                this.$router.push({path:'/organization_manage'});
            },
        }
    }
</script>

<style lang="scss" scpoed>
    .main{
        width:100%;
        .nav{
            margin-top:20px;
            width:100%;
            background:#b6b6b6;
            line-height:50px;
        }
        .center{
            width:100%;
            margin-top:20px;
            .sdg{
                line-height:260px;
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