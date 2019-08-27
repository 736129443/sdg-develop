<template>
    <div class="main">
        <div class="header">
            当前位置： 组织管理 > 创建分公司 > 新建分公司
        </div>
        <div class="nav">
            <span>部门结构</span>
        </div>
        <div class="center">
            <span class="sdg">闪电狗 ></span>
            <ul class="qu_bm">
                <li>
                    <span class="bm">创建分公司名称</span>
                </li>
                <li class="oli" v-for="(i, index) in inp_list">
                    <div class="q2">
                        <el-form >
                            <el-form-item >
                                <el-input v-model="i.inp" id="q3"></el-input>
                                <el-button id="q4" type="primary" @click="shangji_del(index)">删除</el-button>
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
        <div class="btn">
            <el-button type="primary" @click="Preservation()" :loading="buttonState" >保存</el-button>
            <el-button @click="Return()" type="primary">返回</el-button>

        </div>
    </div>
</template>

<script>
    export default {
        name: "New_BranchOffice",
        data(){
            return{
                array:[],
                //保存按钮
                buttonState:false,
                token:'',
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
            }
        },
        created(){
            //拿到token
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
        },
        methods:{
            //保存按钮
            Preservation(){
                for (var i in this.inp_list){
                    this.array.push(this.inp_list[i].inp);
                }
                var deptListStrs = [];
                for (let i = 0; i < this.array.length; i++) {
                    if (this.inp_list[i].inp != '') {
                        deptListStrs.push(this.inp_list[i].inp)
                    }
                }
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/create', JSON.stringify({
                    "token":this.token,
                    "departmentNames":deptListStrs,
                }),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0){
                        this.$message({
                            showClose: true,
                            message: '保存成功！'
                        });
                        this.$router.push({path:'/branch_company'});
                    }else {
                        this.$message({
                            showClose: true,
                            message: res.body.message,
                        });
                    }
                })
            },
            //返回按钮
            Return(){
                this.$router.push({path:'/branch_company'});
            },
            //删除按钮
            shangji_del(index) {
                this.inp_list.splice(index, 1)
            },
            //添加
            shangji_add(){
                let arr = {
                    inp: '',
                };
                this.inp_list.push(arr);
            },
        }
    }
</script>

<style scoped lang="scss">
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
                        width:100%;
                        .el-input{
                            width: 83%;
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