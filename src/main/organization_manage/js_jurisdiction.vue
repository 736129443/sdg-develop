<template>
    <div class="main jurisdiction">
        <div class="header">
            当前位置：<span>角色管理 > 角色权限</span>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="B端权限" name="Bend">
                <p>
                    <el-button type="primary" style="float: right;margin-right: 30%;margin-bottom: 10px" @click="submit" v-if="save==0?true:false">保存</el-button>
                    <el-button type="primary" style="float: right;margin-right: 30%;margin-bottom: 10px" :loading="true" v-if="save==0?false:true">保存中</el-button>
                    <!--<el-button type="primary" style="float: right;margin-right: 30%;"  >保存中</el-button>-->
                </p>
                <!--<table  width="100%" border="1" cellpadding="0" cellspacing="0" bordercolor="#dcdfe6" style="border-collapse:collapse;margin-top:30px;" >-->
                    <!--<tr bgcolor="">-->
                        <!--<th>模块</th>-->
                        <!--<th></th>-->
                    <!--</tr>-->
                    <!--<tr  v-for="(i,index) in arr" >-->
                        <!--<td class="left_td" >-->
                            <!--<el-checkbox   v-model="i.choose"   :value="i.name"   @change="changeindex(i)">{{ i.text }}</el-checkbox>-->
                        <!--</td>-->
                        <!--<td class="right_td">-->
                            <!--<el-checkbox-group v-for="j in i.menus" v-model="j.choose" @change="selectItem( i,j )" >-->
                                <!--<el-checkbox :label=j.name :value="j.name"  :checked="j.choose"  > {{j.text}}</el-checkbox>-->
                            <!--</el-checkbox-group>-->
                        <!--</td>-->
                    <!--</tr>-->
                <!--</table>-->
                <el-table :data="arr" style="width: 100%" border>
                    <el-table-column prop="name" label="模块" width="180" header-align="left" >
                        <!--<template slot-scope="scope">-->
                        <!--<div  @click="submit(scope.$index)">-->
                        <!--<router-link to="" style="color:#409EFF;">{{ tableData[scope.$index].id }} </router-link>-->
                        <!--</div>   v-for="(i,index) in arr"-->
                        <!--</template>-->
                        <template slot-scope="scope">
                            <div >
                                <el-checkbox v-model="arr[scope.$index].choose" :value="arr[scope.$index].name" @change="changeindex(arr[scope.$index])">{{ arr[scope.$index].text }}</el-checkbox>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="权限" header-align="left">
                        <template slot-scope="scope">
                            <el-checkbox-group v-for="j in arr[scope.$index].menus" v-model="j.choose" @change="selectItem( arr[scope.$index],arr[scope.$index].menus )" >
                                <el-checkbox :label=j.name :value="j.name" :checked="j.choose"> {{j.text}}</el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="C端权限" name="Cend">
                <el-button type="primary" style="float: right;margin-right: 30%;margin-bottom: 10px" @click="Consubmit" v-if="Csave==0?true:false">保存</el-button>
                <el-button type="primary" style="float: right;margin-right: 30%;margin-bottom: 10px" :loading="true" v-if="Csave==0?false:true">保存中</el-button>
                <el-table :data="tableData" style="width: 100%" >
                    <el-table-column prop="name" label="模块" width="180" align="center">
                        <!--<template slot-scope="scope">-->
                            <!--<div  @click="submit(scope.$index)">-->
                                <!--<router-link to="" style="color:#409EFF;">{{ tableData[scope.$index].id }} </router-link>-->
                            <!--</div>   v-for="(i,index) in arr"-->
                        <!--</template>-->
                        <template slot-scope="scope">
                            <div >
                                <el-checkbox v-model="tableData[scope.$index].choose" :value="tableData[scope.$index].name" @change="changeindex(tableData[scope.$index])">{{ tableData[scope.$index].text }}</el-checkbox>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="权限" >
                        <template slot-scope="scope">
                        <el-checkbox-group v-for="j in tableData[scope.$index].menus" v-model="j.choose" @change="selectItem( tableData[scope.$index],tableData[scope.$index].menus )" >
                            <el-checkbox :label=j.name :value="j.name"  :checked="j.choose"  > {{j.text}}</el-checkbox>
                        </el-checkbox-group>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                token:'',
                id:'',
                checkAll: '',
                arr:[],
                // checked:'false',
                aaa:'',
                save:0,
                // isIndeterminate:true,
                activeName:'Bend',
                tableData:[{
                }],
                Csave:0,
            };
        },
        created(){
            let user =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = user.result.token;
            let aaa = JSON.parse(sessionStorage.getItem("obj"));
            this.id = aaa;
            this.data();
            if (this.activeName =="Bend"){
            } else {
            }
        },
        methods:{
            data(){
                if (this.activeName =="Bend"){
                    let page = JSON.stringify({
                        token: this.token,
                        id : this.id,
                        type:'B'
                    });
                    this.$http.post(this.global.lightningUrl + '/companyv1/security/role/getPermission', page ,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        this.arr = res.body.result;
                    })
                } else {
                    let page = JSON.stringify({
                        token: this.token,
                        id : this.id,
                        type:'C'
                    });
                    this.$http.post(this.global.lightningUrl + '/companyv1/security/role/getPermission', page ,{
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((res)=>{
                        this.tableData = res.body.result;
                    })
                }
                // let page = JSON.stringify({
                //     token: this.token,
                //     id : this.id
                // });
                // this.$http.post(this.global.lightningUrl + '/companyv1/security/role/getPermission', page ,{
                //     headers: {
                //         'Content-Type': 'application/json;charset=UTF-8'
                //     }
                // }).then((res)=>{
                //     this.arr = res.body.result;
                //     this.tableData = res.body.result;
                //     console.log(res);
                // })
            },
            changeindex( i ){
                console.log(i);
                this.$forceUpdate();
                if(i.choose === true){
                    this.$forceUpdate();
                    i.menus.forEach(function(j){
                        j.choose=true;
                    });
                }else{
                    // this.$forceUpdate();
                    i.menus.forEach(function(j){
                        i.choose = false;
                        j.choose = false;
                    });
                }
            },
            selectItem(i,j) {
                this.$forceUpdate();
                if (i.menus.every( a => a.choose )){
                    this.$forceUpdate();
                    i.choose = true;
                    this.$set( this.arr , i.choose , true)
                } else {
                    this.$forceUpdate();
                    i.choose = false;
                    this.$set( this.arr , i.choose , false);
                }
            },
            submit(){
                this.save = 1;
                let page = JSON.stringify({
                    id:this.id,
                    token: this.token,
                    permissionList: this.arr,
                    type:'B'
                });
                this.$http.post( this.global.lightningUrl + '/companyv1/security/role/updatePermission' ,page ,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    if (res.body.errcode == 0){
                        this.save = 0;
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                            this.data()
                    }else {
                        this.$message.error('保存失败,请刷新重试');
                    }
                })
            },
            handleClick(tab, event){
                console.log(tab, event);
                // if (this.activeName =="Bend"){
                //     alert(1)
                // } else {
                //     alert(2)
                //
                // }
                this.data()
            },
            Consubmit(){
                this.Csave = 1;
                let page = JSON.stringify({
                    id:this.id,
                    token: this.token,
                    permissionList: this.tableData,
                    type:'C'
                });
                console.log(page);
                this.$http.post( this.global.lightningUrl + '/companyv1/security/role/updatePermission' ,page ,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                    if (res.body.errcode == 0){
                        this.Csave = 0;
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.data()
                    }else {
                        this.$message.error('保存失败,请刷新重试');
                    }
                })
            }

        }
    };
</script>
<style lang="scss" scoped>
    .jurisdiction{
        padding: 30px;

        .left_td{
            text-align: center;
            width: 15%;
        }
        .right_td{
            padding-left: 20px;
            div{
                margin-top: 10px;
                margin-bottom: 10px;
            }
        }
        td{
            text-align: left;
            height: 50px;
        }
        .el-checkbox+.el-checkbox{
            margin-left: 20px;
        }
        .el-checkbox-group {
            float: left;
            margin-right: 20px;
        }
        .el-table th{
            text-align: center;
        }
    }
</style>
