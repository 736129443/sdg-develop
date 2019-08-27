<template>
  <div class="main">
    <div class="list_menu">
      <router-link to="/new_warehouse"><div :class="{'active':selected===1}" @click="select(1)">新建仓库</div></router-link>
      <router-link to="/list_warehouse"> <div :class="{'actives':selected===2}" @click="select(2)">仓库列表</div></router-link>
    </div>
    <router-view>

    </router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      msg:'transportation',
      selected:1
      };
    },
    methods:{
      select:function (index) {
       this.selected=index;
      },
    },
      watch:{
          $route(to,from){
              if (to.path == '/new_warehouse'  ){
                  this.selected=1
              }else {
                  this.selected=2
              }
          }
      },
    mounted(){
      // if(this.$route.path ==='/new_warehouse'){
      //   this.selected=1
      // }
      // if(this.$route.path ==='/list_warehouse'){
      //   this.selected=2
      // }
    }
  }
</script>

<style scoped >

 .list_menu div{
   float: left;
   width: 10%;
   height:50px;
   text-align: center;
   line-height: 50px;
 }

 .list_menu .actives{
  border-radius:50px 50px 50px 0px/ 0px 50px 50px 50px;
  background:rgb(255,161,14);
  color: white;
  box-shadow:0 5px 15px 2px rgba(255,161,14,0.4);
  }
 .list_menu .active{
   border-radius:50px 50px 50px 50px/ 50px 0px 0px 50px;
   background:rgb(255,161,14);
   color: white;
   box-shadow:0 5px 15px 2px rgba(255,161,14,0.4);
 }

</style>
