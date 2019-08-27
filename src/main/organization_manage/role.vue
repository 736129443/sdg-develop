<template>
   <div class="main">
      <div class="header">
          当前位置 : <span>组织管理 > 角色/权限管理</span>
      </div> 
      <div class="dv">
        <!-- 部门结构 -->   
        <el-form :inline="true" :model="formInline" class="demo-form-inline hg">
                <el-form-item label="角色名称">
                    <el-input v-model.trim="formInline.region"  onkeyup="this.value=this.value.replace(/\s+/g,'')"    placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button type="primary" @click="newly">新增</el-button>
                </el-form-item>
            </el-form>
        <!-- 主要内容 -->
        <div class="center">
                <template>
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="id"
                                label="角色ID"
                                align="center"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="roleName"
                                label="角色名称"
                                align="center"
                                >
                        </el-table-column>
                        <el-table-column
                                prop="roleStatusName"
                                align="center"
                                label="状态">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                align="center"
                                label="编辑">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click=" compile(scope.$index)">编辑</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                align="center"
                                label="权限">
                            <template slot-scope="scope">
                                <!--:to="{path:'libraryDetail/', query:{library_id:data.library_id}}"-->
                                <!--:to="{path:'/test',query: {name: id}}-->
                                <!--<router-link :to="{path:'jsjurisdiction'}">-->
                                <el-button type="text" size="small" @click="jurisdiction(scope.$index)">权限</el-button>
                                <!--</router-link>-->
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>
          <!--分页-->
        <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="pagesize"
                  layout="total, prev, pager, next"
                  :total="total">
          </el-pagination>
        <!-- 管理员新增模块 -->
        <el-dialog title="管理员 > 新增" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="角色ID" :label-width="formLabelWidth">
                            <el-input v-model="form.id" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="角色名称" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="角色状态" :label-width="formLabelWidth">
                            <!--<el-radio v-model="form.state" label="1">启用</el-radio>-->
                            <!--<el-radio v-model="form.state" label="0">禁用</el-radio>-->
                            <el-select v-model="form.state" >
                                <el-option label="启用" value="1"></el-option>
                                <el-option label="禁用" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="preserve">保存</el-button>
                        <el-button @click="dialogFormVisible = false,form.name = ''">取 消</el-button>
                    </div>
            </el-dialog>
        <!-- 管理员编辑模块 -->
        <el-dialog title="管理员 > 编辑" :visible.sync="dialogFormVisible1" >
            <el-form :model="compileform">
                <el-form-item label="角色ID" :label-width="formLabelWidth">
                <el-input v-model="compileform.id" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" :label-width="formLabelWidth">
                <el-input v-model="compileform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色状态" :label-width="formLabelWidth">
                    <el-select v-model="compileform.state" >
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!--<el-button type="primary" @click="compilePreserve">保存</el-button>-->



                <el-button type="primary"  @click="compilePreserve" v-if="save==0?true:false">保存</el-button>
                <el-button type="primary" :loading="true" v-if="save==0?false:true">保存中</el-button>



                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            </div>
        </el-dialog>
      </div>      
   </div> 
</template>
<script>
    import {roleName} from '../../js/lostPassword.js'
export default {
    data() {
        return{
            token:'',
            currentPage:1,
            pagesize:10,
            total:0,
            formInline: {
                region:'',
            },
            dialogTableVisible: false,
            dialogFormVisible: false,
            dialogFormVisible1: false,
            form: {
                id:'',
                name: '',
                state: '1'
            },
            compileform:{
                id:'',
                name: '',
                state: ''
            },
            formLabelWidth: '120px',
            tableData: [],
            verify:'',
            save:0,
        }
    },
    created(){
        let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
        this.token = user.result.token;
        if(sessionStorage.getItem('rolecurrentPage')!=null){
            let currentPages = Number(sessionStorage.getItem('rolecurrentPage'));
            let totals = Number(sessionStorage.getItem('roletotal'));
            let condition = sessionStorage.getItem('rolecondition');

            this.formInline = JSON.parse(condition)
            this.currentPage = currentPages;
            this.total = totals;
            //查询接口
            this.requestTurnout()
        }else {
            this.data();
        }
    },
    methods: {
        ajax(page){
            this.$http.post(this.global.lightningUrl + '/companyv1/security/role/list',page,{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then((res)=>{
                this.total = res.body.result.total;
                this.tableData = res.body.result.rows;
                //更新本地存储
                if(sessionStorage.getItem('rolecurrentPage')!=null&&sessionStorage.getItem('rolecurrentPage')!=null){
                    //删除本地
                    sessionStorage.removeItem('rolecurrentPage');
                    sessionStorage.removeItem('rolecondition');
                    sessionStorage.removeItem('roletotal');
                    //存储本地
                    sessionStorage.setItem('rolecurrentPage', JSON.stringify(this.currentPage));
                    sessionStorage.setItem('roletotal', JSON.stringify(this.total));
                    sessionStorage.setItem('rolecondition', JSON.stringify(this.formInline));
                }else {
                    //存储本地
                    sessionStorage.setItem('rolecurrentPage', JSON.stringify(this.currentPage));
                    sessionStorage.setItem('roletotal', JSON.stringify(this.total));
                    sessionStorage.setItem('rolecondition', JSON.stringify(this.formInline));
                }
            })
        },
        // 列表请求
        data(){
            let page = JSON.stringify({
                token: this.token,
                pageNum : this.currentPage,
                pageSize : this.pagesize,
            })
            this.ajax(page)
        },
        // 查询
        onSubmit() {
            let page = JSON.stringify({
                token: this.token,
                roleName : this.formInline.region,
                pageSize : this.pagesize,
                pageNum : this.currentPage=1,
            })
            this.ajax(page)
        },
        requestTurnout(){
            let page = JSON.stringify({
                token: this.token,
                roleName : this.formInline.region,
                pageSize : this.pagesize,
                pageNum : this.currentPage,
            })
            this.ajax(page)
        },
        //新增
        newly(){
            let _this=this;
            _this.dialogFormVisible = true;
            let page =JSON.stringify({
                token: this.token,
            })
            this.$http.post(this.global.lightningUrl + '/companyv1/security/role/generateId',page,{
              headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then((res)=>{
                _this.form.id = res.data.result.roleNum;
            })
        },
        // 新增保存
        preserve(){
            let _this = this;
            roleName(_this,_this.form.name);
            if (this.verify == true){
                let page = JSON.stringify({
                    token: this.token,
                    id:_this.form.id,
                    roleStatus:_this.form.state,
                    roleName : _this.form.name,
                });
                this.$http.post( this.global.lightningUrl + '/companyv1/security/role/save',page ,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                } ).then((res)=>{
                    if (res.data.errcode == 0) {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.dialogFormVisible = false;
                        this.form.name = ''
                        this.data();
                    }else {
                        this.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }else {
                this.$message({
                    message: '保存失败,命名不规范',
                    type: 'warning'
                });
            }
        },
        // 编辑
        compile(_index){
            this.dialogFormVisible1 = true;
            this.compileform.id = this.tableData[_index].id;
            this.compileform.name = this.tableData[_index].roleName;
            this.compileform.state = this.tableData[_index].roleStatus;
        },
        // 编辑保存
        compilePreserve(){
            this.save = 1;
            // let _this = this;
            roleName(this,this.compileform.name);
            if (this.verify == true) {
                let page = JSON.stringify({
                    token: this.token,
                    id:this.compileform.id,
                    roleName:this.compileform.name,
                    roleStatus : this.compileform.state
                });
                this.$http.post( this.global.lightningUrl + '/companyv1/security/role/updateRoleById', page ,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    if (res.data.errcode == 0) {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.data();
                        this.save = 0;
                        this.dialogFormVisible1 = false
                    }else {
                        this.$message({
                            message: res.body.message,
                            type: 'warning'
                        });
                        this.save = 0;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }else {
                this.$message({
                    message: '保存失败,命名不规范',
                    type: 'warning'
                });
            }
        },
        // 权限
        jurisdiction(_index){
            this.$router.push({path:'/roleJurisdiction'});
            let jurisdictionid =  this.tableData[_index].id;
            sessionStorage.setItem("obj",JSON.stringify(jurisdictionid));
        },
        handleCurrentChange(val) {
            this.currentPage=val;
            let page = JSON.stringify({
                token: this.token,
                pageNum : this.currentPage,
                pageSize : this.pagesize,
            });
            this.ajax(page)
        }
    }
}
</script>
<style lang="scss" scoped>
.main{
    form {
        margin-top: 20px;
        .el-form-item__content {
            margin-left: 10px;
            .el-button {
                margin-left: 30px;
            }
        }
    }
}
</style>
