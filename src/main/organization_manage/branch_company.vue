<template>
    <div class="main">
        <div class="header">
            当前位置： 组织管理 > 创建分公司
        </div>
        <div class="dv">
            <el-form :inline="true" :model="formInline">
                <el-form-item label="分公司 :">
                    <el-input v-model.trim="formInline.company" placeholder="请输入分公司"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formInline.state" placeholder="请输入状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="启用" value="0"></el-option>
                        <el-option label="禁用" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                    <el-button type="primary" @click="increase">新增</el-button>
                </el-form-item>
            </el-form>
            <el-table
                    :data="arr"
                    tooltip-effect="dark"
                    style="width: 100%"
            >
                <el-table-column
                        align="center"
                        prop="departmentId"
                        label="ID"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="departmentName"
                        label="分公司名称"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="status"
                        label="状态"
                >
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 编辑部门的模态框   -->
        <el-dialog title="编辑分公司" :visible.sync="dialogFormVisible">
            <el-form :model="form" >
                <el-form-item label="分公司名称 :" >
                    <el-input v-model="form.deptName" placeholder="部门名称" ></el-input>
                </el-form-item>
                <el-form-item label="负责人 :" >
                    <el-input v-model="form.name" placeholder="负责人" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理区域 :"  style="width:27%;float: left">
                    <el-cascader
                            v-model = "inp"
                            :options="options"
                            change-on-select
                    ></el-cascader>
                    <el-button type="primary" @click="region_add()">添加</el-button>
                </el-form-item>

                <div class="eltab">
                    <el-tag
                            v-for="tag in list"
                            :key="tag.id"
                            closable
                            :disable-transitions="false"
                            @close="handleClose2(tag)"
                    >
                        {{tag.name}}
                    </el-tag>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin:40px;">
                <el-button  type="primary" @click=" dialogFormVisible = false,save()">保存</el-button>
            </div>
        </el-dialog>
        <!-- 分页插件 -->
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                layout="total, prev, pager, next"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "branch_company",
        data(){
            return{
                list:[],
                options:[],
                form:{
                    deptName:'',
                    responsible:'',
                },
                dialogFormVisible: false,
                token:'',
                arr:[],
                formInline:{
                    company:'',
                    state:'',
                },
                inp:[],
                //分页
                total:0,
                currentPage:1,
                pagesize:10,//每页的数据条数
                driverDetail:'',
                driverDerive :'',
                insuranceListExport:'',

                departmentName:'',
                id:'',
                array:[],
            }
        },
        created(){
            //拿到token
            let user = JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            //首刷
            this.data();
            this.drop();
        },
        methods:{
            //区域删除
            handleClose2(tag) {
                this.list.splice(this.list.indexOf(tag), 1);
            },
            //获取到下拉
            drop(){
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/area', JSON.stringify({
                    "token":this.token,
                }),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    this.options = res.body.result;
                })
            },
            //添加
            region_add() {
                console.log(this.list);
                console.log(this.inp[this.inp.length - 1]);
                console.log(this.options);
                for (let i in this.options) {
                    if (this.inp[this.inp.length - 1] == this.options[i].value){
                            console.log(this.options[i].label);
                            this.list.push({"id":this.options[i].value,"name":this.options[i].label,});
                    }else {
                        for (let j in this.options[i].children) {
                            if (this.inp[this.inp.length - 1] == this.options[i].children[j].value){
                                this.list.push({"id":this.options[i].children[j].value,"name":this.options[i].children[j].label,});
                                console.log(this.options[i].children[j].label);
                            }
                        }
                    }
                }
                this.inp=[];
                console.log(this.list)
            },
            // 编辑保存
            save(){
                if (this.departmentName == this.form.deptName) {
                    this.form.deptName = '';
                }
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/edit', JSON.stringify({
                    "token":this.token,
                    'id':this.id,
                    'deptName':this.form.deptName,
                    'principalName':this.form.name,
                    'areaArray':this.list,
                }),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0){
                        this.$message({
                            showClose: true,
                            message: res.body.message,
                        });
                        this.data();
                    }else {
                        this.$message({
                            showClose: true,
                            message: res.body.message,
                            type: 'error'
                        });
                        return false
                    }
                })
            },
            //编辑按钮
            handleClick(row) {
                console.log(row);
                this.dialogFormVisible = true;
                this.form.deptName = row.departmentName;
                this.id = row.departmentId;
                this.departmentName = row.departmentName;
                this.list=[];
                for (var i in row.areaList) {
                    this.list.push(row.areaList[i])
                }
            },
            //查询
            query(){
                this.currentPage = 1;
                this.data();
            },
            //首刷
            data(){
                this.$http.post(this.global.lightningUrl + '/companyv1/userManage/department/list', JSON.stringify({
                    "token":this.token,
                    "deptName":this.formInline.company,
                    "status":this.formInline.state,
                    "pageNum":this.currentPage,
                    "pageSize":this.pagesize,
                }),{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.body.errcode == 0) {
                        this.arr = res.body.result.rows;
                        for (var i in res.body.result.rows){
                            if (res.body.result.rows[i].status == 0) {
                                res.body.result.rows[i].status = '启用'
                            }else if (res.body.result.rows[i].status == 1){
                                res.body.result.rows[i].status = '禁用'
                            }
                        }
                        this.total = res.body.result.total;
                    }
                })
            },
            //新增
            increase(){
                this.$router.push({path:'/New_BranchOffice'});
            },
            //分页
            handleSizeChange(pagesize) {
                this.pagesize = pagesize;
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                console.log(this.currentPage);
                this.data();
            },
        }
    }
</script>

<style scoped lang="scss">
    .main{
        width:100%;
        .dv {
            margin-top: 20px;
        }
        .eltab{
            margin-top: 15px;
            border: 1px solid #dcdfe6;
            width: 100%;
            padding: 0 15px;
            display: inline-block;
            box-sizing: border-box;
            border-radius: 4px;
            background-color: #fff;
            -webkit-appearance: none;
            background-image: none;
            height: 100px;
            overflow: auto;
        }
    }
</style>