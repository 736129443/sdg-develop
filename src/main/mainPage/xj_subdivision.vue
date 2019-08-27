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
            <span class="sdg">后台 </span>
            <ul class="qu_bm">
                <li>
                    <span class="bm">创建组织/部门名称</span>
                </li>
                <li class="oli" v-for="(i, index) in inp_list">
                    <div class="q2">
                        <el-form >
                            <el-form-item >
                                <el-input v-model="i.inp"></el-input>
                                <el-button id="q3" @click="shangji_del(index)">删除</el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                </li>
                <li>
                    <div>
                        <el-form>
                            <el-form-item>
                                <el-button @click="shangji_add()" >添加</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bottom">
            <span>下级部门结构 ></span>
            <ul>
                <li>
                    <span>销售部</span>
                    <div>
                        <span @click="dialogFormVisible = true" style="cursor:pointer;color: blue;">编辑</span>
                        <span>删除</span>
                    </div>

                </li>
            </ul>
        </div>
        <div class="btn">
            <el-button  type="success">保存</el-button>
            <el-button  type="info">返回</el-button>
        </div>
        <!-- 编辑部门的模态框   -->
        <el-dialog title="编辑部门" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="选择区域" >
                    <el-select v-model="form.region" placeholder="请选择区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上级部门" >
                    <el-select v-model="form.region0" placeholder="请选择活动区域">
                        <el-option label="销售部" value="shanghai"></el-option>
                        <el-option label="研发部" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门名称" >
                    <el-input v-model="form.name" placeholder="部门名称" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="负责人" >
                    <el-input v-model="form.name0" placeholder="负责人" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button  type="info" @click="ass">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogTableVisible: false,
                dialogFormVisible: false,
                inp_list:[
                    {
                        inp:'',
                        city:["北京1", "上海2", "北京3", "北京4", "北京5"],
                        city_value:'',
                        before_val:'',
                        bumen:''
                    },
                    {
                        inp:'',
                        city:["北京1", "上海2", "北京3", "北京4", "北京5"],
                        city_value:'',
                        before_val:'',
                        bumen:''
                    },
                    {
                        inp:'',
                        city:["北京1", "上海2", "北京3", "北京4", "北京5"],
                        city_value:'',
                        before_val:'',
                        bumen:''
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
        methods:{
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    key: Date.now()
                });
            },
            shangji_add() {
                let arr = {
                    inp: '',
                    city: ["北京1", "上海2", "北京3", "北京4", "北京5"],
                    city_value: '',
                    before_val: ''
                };
                this.inp_list.push(arr)
            },
            shangji_del(index) {
                this.inp_list.splice(index, 1)
            },
            sev(){
                this.$post();
            },
            ass(){
                dialogFormVisible: true;
                location. reload()
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
            padding-left: 20px;
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
            span{
                float: left;
            }
            ul{
                padding-left: 120px;
                li{
                    display: block;
                    overflow: hidden;
                    span{
                        float: left;
                    }
                    div{
                        overflow: hidden;
                        padding-left: 40px;
                        display: block;
                        span{
                            padding-left: 20px;
                        }
                    }
                }

            }
        }
        .btn{
            margin-top: 20px;
            text-align: center;
        }
    }
</style>