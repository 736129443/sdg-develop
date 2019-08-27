<template>
    <div class="main">
        <div class="header">
            <p> 当前位置：司机管理 > 运输公司</p>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="车队编号：">
                <el-input v-model.trim="formInline.id" onkeyup="this.value=this.value.replace(/\s+/g,'')"   placeholder="请输入车队编号"></el-input>
            </el-form-item>
            <el-form-item label="车队名称：">
                <el-input v-model.trim="formInline.team" onkeyup="this.value=this.value.replace(/\s+/g,'')"   placeholder="请输入车队名称"></el-input>
            </el-form-item>
            <el-form-item label="车队长电话：">
                <el-input v-model.trim="formInline.leaderPhone"  onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入车队长电话"></el-input>
            </el-form-item>
            <el-form-item label="运输公司名称：">
                <el-input v-model.trim="formInline.company" onkeyup="this.value=this.value.replace(/\s+/g,'')"   placeholder="请输入运输公司名称"></el-input>
            </el-form-item>
            <el-form-item label="车队类型：">
                <el-select v-model="formInline.type" placeholder="请选择车队类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="自建型" value="selfBuild"></el-option>
                    <el-option label="家庭型" value="family"></el-option>
                    <el-option label="企业型" value="company"></el-option>
                    <el-option label="其他" value="other"></el-option>
                </el-select>
            </el-form-item>
            <!--<el-form-item label="所在管理区：">-->
            <!--<el-select v-model="formInline.region" placeholder="请选择所在管理区">-->
            <!--<el-option label="区域一" value="shanghai"></el-option>-->
            <!--<el-option label="区域二" value="beijing"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="所在城市：">
                <!--<el-select v-model="formInline.cityName" placeholder="请选择所在城市">-->
                    <!--<el-option v-for="i in link" :label='i.areaName' :value="i.allId" :key="i.allId"></el-option>-->
                <!--</el-select>-->
                <el-input v-model.trim="formInline.cityName"  onkeyup="this.value=this.value.replace(/\s+/g,'')"  placeholder="请输入所在城市"></el-input>
            </el-form-item>
            <el-form-item label="车队经验：">
                <el-select v-model="formInline.experience" placeholder="请选择车队经验">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <!--<el-select-->
                        <!--v-model="formInline.value11"-->
                        <!--multiple-->
                        <!--collapse-tags-->
                        <!--:multiple-limit="num"-->
                        <!--placeholder="请选择">-->
                    <!--<el-option-->
                            <!--v-for="item in options"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            </el-form-item>
            <el-form-item label="状态：">
                <el-select v-model="formInline.status" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="停用" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="onSubmit_xj" v-if="NewBuiltMotorcade==true?true:false">新建</el-button>
                <!--<el-button type="primary" @click="onSubmit_dc" v-if="queryStatus == true? true:false" >导出</el-button>-->
                <!--<el-button type="primary" :loading="true" v-if="queryStatus == true? false:true" >导出中</el-button>-->
                <el-button type="primary" @click="Export()" v-loading.fullscreen.lock="fullscreenLoading" element-loading-spinner="none" v-if="transportCompanyExport==true?true:false">导出</el-button>
                <el-progress type="circle" :percentage="this.ProgressBar" color="#8e71c7" v-if="queryStatus == true? false:true" style="position: absolute;top:44%;left:47%;z-index: 999999;"></el-progress>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="车队编号"
                    height="1000px"

                    align="center">
                    <template slot-scope="scope">
                        <div @click="handleClick(scope.$index)">
                            <!--<router-link to="sjmessage" style="color:#409EFF;">{{ arr[scope.$index].driverId }} </router-link>-->
                            <a style="color: rgb(102,177,255);cursor: pointer;"  >{{ tableData[scope.$index].id }}</a>
                        </div>
                    </template>
            </el-table-column>
            <el-table-column
                    prop="team"
                    label="车队名称"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="leaderName"
                    label="车队长姓名"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="leaderPhone"
                    align="center"
                    label="车队长电话">
            </el-table-column>
            <el-table-column
                    prop="company"
                    align="center"
                    label="运输公司名称">
            </el-table-column>
            <el-table-column
                    prop="areaName"
                    align="center"
                    label="所在管理区">
            </el-table-column>
            <el-table-column
                    prop="city"
                    align="center"
                    label="所在城市">
            </el-table-column>
            <el-table-column
                    prop="adminName"
                    align="center"
                    label="运营专员">
            </el-table-column>
            <el-table-column
                    prop="type"
                    align="center"
                    label="车队类型">
            </el-table-column>
            <el-table-column
                    prop="driverNum"
                    align="center"
                    label="车队司机数量">
                <template slot-scope="scope">
                    <div @click="submitDriverNum(scope.$index)">
                        <!--<router-link to="sjmessage" style="color:#409EFF;">{{ arr[scope.$index].driverId }} </router-link>-->
                        <a style="color: rgb(102,177,255);cursor: pointer;"  >{{ tableData[scope.$index].driverNum }}</a>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="experience"
                    align="center"
                    label="车队经验">
            </el-table-column>
            <el-table-column
                    prop="status"
                    align="center"
                    label="状态">
            </el-table-column>
            <el-table-column
                    prop="auditStatus"
                    align="center"
                    label="审批状态">
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作">
                <template  slot-scope="scope">
                    <el-button type="text" size="small"  @click="submitId(scope.$index)"  :disabled="arr[scope.$index]">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                :page-sizes="[10,20,30,50]"
                layout="total,prev, pager, next,sizes"
                :total="total">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                id_dl:'',
                queryStatus:true,
                NewBuiltMotorcade:'',
                num:5,
                formInline: {},
                tableData: [],
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
                token:'',
                total:0,
                currentPage:1,
                pageSize:10,
                link:'',
                id: 11,
                fleetList:'',
            //导出权限
                transportCompanyExport:'',
            //    明细
                teamDriverDetails:'',
            //    编辑
                transportCompanyEdit:'',
            //    查看
                transportCompanyView:'',
                fullscreenLoading: false,
                code:'',
                //导出
                queryStatus:true,
                //进度条
                ProgressBar:0,
                transportCompanyExport:'',
                arr:[],
            }
        },
        created(){
            let jurisdictions = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.transportCompanyExport = jurisdictions[5].menus[17].choose
            let token =JSON.parse(Base64.decode(sessionStorage.getItem('key')));
            this.token = token.result.token;
            this.id_dl = token.result.currentUser.id ;

            // if(jurisdictions[5].menus.length == 18){
            //     //导出
            //     this.transportCompanyExport = jurisdictions[5].menus[17].choose;
            //     //    编辑  "transportCompanyEdit"
            //     this.transportCompanyEdit = jurisdictions[5].menus[16].choose;
            //     //    查看  "transportCompanyView"
            //     this.transportCompanyView = jurisdictions[5].menus[15].choose;
            //
            // }else {
            //     this.transportCompanyExport = false;
            //     this.transportCompanyEdit = false;
            //     this.transportCompanyView = false
            // }
            this.NewBuiltMotorcade = jurisdictions[5].menus[8].choose;
            this.fleetList = jurisdictions[5].menus[9].choose;

            if(sessionStorage.getItem('transportCompanycurrentPage')!=null){
                let currentPages = Number(sessionStorage.getItem('transportCompanycurrentPage'));
                let totals = Number(sessionStorage.getItem('transportCompanytotal'));
                let condition = sessionStorage.getItem('transportCompanycondition');

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
            Export(){
                this.$message({
                    showClose: true,
                    message: '正在导出请耐心等待！',
                    type: 'warning'
                });
                this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportRecord',JSON.stringify({
                        "token":this.token,
                        "exportName":"team",
                        't.id':this.formInline.id,
                        "t.team":this.formInline.team,
                        "t.leader_phone":this.formInline.leaderPhone,
                        "t.company":this.formInline.company,
                        "t.type":this.formInline.type,
                        "t.experience":this.formInline.experience,
                        "t.status": this.formInline.status,
                        "t.city" : this.formInline.cityName,

            })).then(run=>{
                    console.log(run);
                    if(run.body.errcode == 0){
                        this.fullscreenLoading = true;
                        this.queryStatus = false;
                        this.ProgressBar=0,
                        this.code = run.body.result;
                        this.interval = setInterval(() => {
                            this.$http.post(this.global.lightningUrl + '/companyv1/exportCenter/export/exportProcess',JSON.stringify({
                                "token":this.token,
                                "id":this.code,
                            })).then(run=>{
                                console.log(run);
                                if(run.body.errcode == 0){
                                    this.ProgressBar  =   parseInt(run.body.result.exportProcess) ;
                                    if (this.ProgressBar == 100){
                                        clearInterval(this.interval);
                                        setTimeout(()=> {
                                            window.location.href = run.body.result.externalRoad;
                                            this.$message({
                                                message: '导出成功',
                                                type: 'success'
                                            });
                                            this.fullscreenLoading = false;
                                            this.queryStatus = true;
                                        },1200)
                                    }
                                }
                            })
                        },1000);
                    }else {
                        this.$message({
                            showClose: true,
                            message: run.body.message,
                            type: 'error'
                        });
                    }
                })
            },

            // this.transportCompany = jurisdictions[5].menus[7].choose;
            data(){
                // let page1 = JSON.stringify({
                //     token: this.token
                // });
                // this.$http.post(this.global.lightningUrl + '/company/account/companylist',page1 , {
                //     headers: {
                //         'Content-Type': 'application/json;charset=UTF-8'
                //     }
                // } ).then((res)=>{
                //     this.link = res.body.result;
                // })
                let page = JSON.stringify({
                    token:this.token,
                    pageNum:this.currentPage,
                    pageSize: this.pageSize,
                })
                this.ajax(page)
            },
            ajax(page){
                this.$http.post(this.global.lightningUrl + '/companyv1/driverManage/team/list',page,{
                // this.$http.post('http://192.168.50.202:8080/drivermanage/getTeamList',page,{
                  headers: {
                      'Content-Type': 'application/json;charset=UTF-8'
                  }
              }).then((res)=>{
                  console.log(res);
                  if (res.body.result == null){
                      this.tableData = []
                      // this.total = 0
                  } else {
                      this.total = res.body.result.total;
                      this.tableData = res.body.result.list;
                      for (let i = 0 ; i<this.tableData.length;i++) {
                          this.arr.push(true)
                          if (this.tableData[i].auditStatus == null ){
                              this.arr[i] = true;
                          } else if (this.tableData[i].adminId == this.id_dl) {
                              if (this.tableData[i].auditStatus == 'rejected' ||this.tableData[i].auditStatus == 'accepted') {
                                  this.arr[i] = false
                              }else {
                                  this.arr[i] = true
                              }
                          }else {
                              this.arr[i] = true
                          }
                          if (this.tableData[i].auditStatus =="approving" ) {
                              this.tableData[i].auditStatus = '审批中'

                          }else if (this.tableData[i].auditStatus =="accepted" ) {
                              this.tableData[i].auditStatus = '已通过'

                          }else if (this.tableData[i].auditStatus =="rejected" ) {
                              this.tableData[i].auditStatus = '未通过'
                          }
                      //     if (this.tableData[i].type == 'selfBuild') {
                      //         this.tableData[i].type = '自建型'
                      //     }else if (this.tableData[i].type == 'family'){
                      //         this.tableData[i].type = '家庭型'
                      //     }else if (this.tableData[i].type == 'company'){
                      //         this.tableData[i].type = '企业型'
                      //     }else if (this.tableData[i].type == 'other'){
                      //         this.tableData[i].type = '其他'
                      //     }
                      //     if(this.tableData[i].status == '1'){
                      //         this.tableData[i].status = '启用'
                      //     }else if(this.tableData[i].status == '0'){
                      //         this.tableData[i].status = '停用'
                      //     }
                      }
                  //    缓存
                      //更新本地存储
                      if(sessionStorage.getItem('transportCompanycurrentPage')!=null&&sessionStorage.getItem('transportCompanycurrentPage')!=null){
                          //删除本地
                          sessionStorage.removeItem('transportCompanycurrentPage');
                          sessionStorage.removeItem('transportCompanycondition');
                          sessionStorage.removeItem('transportCompanytotal');
                          //存储本地
                          sessionStorage.setItem('transportCompanycurrentPage', JSON.stringify(this.currentPage));
                          sessionStorage.setItem('transportCompanytotal', JSON.stringify(this.total));
                          sessionStorage.setItem('transportCompanycondition', JSON.stringify(this.formInline));
                      }else {
                          //存储本地
                          sessionStorage.setItem('transportCompanycurrentPage', JSON.stringify(this.currentPage));
                          sessionStorage.setItem('transportCompanytotal', JSON.stringify(this.total));
                          sessionStorage.setItem('transportCompanycondition', JSON.stringify(this.formInline));
                      }
                  }

              })
            },
            onSubmit() {
                let page = JSON.stringify({
                    token:this.token,
                    pageNum:this.currentPage=1,
                    pageSize: this.pageSize,
                    id:this.formInline.id,
                    team:this.formInline.team,
                    leaderPhone:this.formInline.leaderPhone,
                    company:this.formInline.company,
                    type:this.formInline.type,
                    city:this.formInline.cityName,
                    experience:this.formInline.experience,
                    status: this.formInline.status,
                })
                this.ajax(page)
            },
            requestTurnout(){
                let page = JSON.stringify({
                    token:this.token,
                    pageNum:this.currentPage,
                    pageSize: this.pageSize,
                    id:this.formInline.id,
                    team:this.formInline.team,
                    leaderPhone:this.formInline.leaderPhone,
                    company:this.formInline.company,
                    type:this.formInline.type,
                    city:this.formInline.cityName,
                    experience:this.formInline.experience,
                    status: this.formInline.status,
                })
                this.ajax(page)
            },
            onSubmit_xj(){
                // newcompany

                this.$router.push({path: '/transportCompany/newcompany/'+ Base64.encode(this.id)});

            },
            onSubmit_dc(){
                this.queryStatus = false
                let page = JSON.stringify({
                    token:this.token,
                    id:this.formInline.id,
                    team:this.formInline.team,
                    leaderPhone:this.formInline.leaderPhone,
                    company:this.formInline.company,
                    type:this.formInline.type,
                    cityName:this.formInline.cityName,
                    experience:this.formInline.experience,
                    status: this.formInline.status,
                })
                if (this.formInline.id == undefined){
                    this.formInline.id = ''
                }
                if (this.formInline.team == undefined){
                    this.formInline.team = ''
                }
                if (this.formInline.leaderPhone == undefined){
                    this.formInline.leaderPhone = ''
                }
                if (this.formInline.company == undefined){
                    this.formInline.company = ''
                }
                if (this.formInline.type == undefined){
                    this.formInline.type = ''
                }
                if (this.formInline.cityName == undefined){
                    this.formInline.cityName = ''
                }
                if (this.formInline.experience == undefined){
                    this.formInline.experience = ''
                }
                if (this.formInline.status == undefined){
                    this.formInline.status = ''
                }
                this.$http.get(this.global.lightningUrl + '/company/drivermanage/teamExport?token='+this.token + '&id='+this.formInline.id+'&team='+this.formInline.team+'&leaderPhone='+this.formInline.leaderPhone+'&company='+this.formInline.company+'&type='+this.formInline.type+'&cityName='+this.formInline.cityName+'&experience='+this.formInline.experience+'&status='+this.formInline.status,page,{
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then((res)=>{
                        console.log(res );
                    if ( res.body.message == '暂无数据' ){
                        this.$message.error(res.body.message);
                        this.queryStatus = true
                    }else if (res.status == 200 ){
                        window.location.href = res.url;
                        this.$message({
                                message: '导出成功',
                                type: 'success'
                            });
                            this.queryStatus = true
                        } else {
                            this.$message.error('导出失败！');
                            this.queryStatus = true

                        }

                })
            },
            handleSizeChange(val){
                this.pageSize = val
                let page = JSON.stringify({
                    token:this.token,
                    pageNum:this.currentPage,
                    pageSize: this.pageSize,
                    id:this.formInline.id,
                    team:this.formInline.team,
                    leaderPhone:this.formInline.leaderPhone,
                    company:this.formInline.company,
                    type:this.formInline.type,
                    city:this.formInline.cityName,
                    experience:this.formInline.experience,
                    status: this.formInline.status,
                })
                this.ajax(page)
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                let page = JSON.stringify({
                    token:this.token,
                    pageNum:this.currentPage,
                    pageSize: this.pageSize,
                    id:this.formInline.id,
                    team:this.formInline.team,
                    leaderPhone:this.formInline.leaderPhone,
                    company:this.formInline.company,
                    type:this.formInline.type,
                    city:this.formInline.cityName,
                    experience:this.formInline.experience,
                    status: this.formInline.status,
                })
                this.ajax(page)
            },
            submitId(_index){
                let id = '0';
                let i = this.tableData[_index].id;
                let j = this.tableData[_index].city;

                // window.sessionStorage.setItem('id',this.tableData[_index].id)
                window.sessionStorage.setItem('id',JSON.stringify({i,j}))
                this.$router.push({path: '/transportCompany/newcompany/'+ Base64.encode(id)});
            },
            handleClick(_index){
                let id = '3000';
                let i = this.tableData[_index].id;
                let j = this.tableData[_index].city;
                window.sessionStorage.setItem('id',JSON.stringify({i,j}))
                this.$router.push({path: '/transportCompany/newcompany/'+ Base64.encode(id)});
            },
            submitDriverNum(_index){
                console.log(this.tableData[_index].id);
                if (this.fleetList ){
                    window.sessionStorage.setItem('id',this.tableData[_index].id)
                    this.$router.push({path: '/transportCompany/driverDetails'});
                }

            }
        }

    }
</script>
<style lang="scss" scoped>
    .header{
        margin-bottom: 20px;
    }
    .main{
        margin-bottom: 50px;
    }
</style>