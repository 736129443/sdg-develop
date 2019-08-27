<template >
    <!--什么注释-->
    <div class="main">
        <el-input type="text" v-model="name" @change="in_put"
         ></el-input>
        <el-input type="text" v-model="sex"></el-input>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                name:'',
                sex:'',
            }
        },
        watch:{
            "name"(curVal,oldVal){
                if (curVal === '123'){
                    this.sex = 'jiankong'
                } else{
                    this.sex = ''
                }
            }
        },
        methods:{
            in_put(){
            }
        },
        created(){

        },
        mounted(){

        }
    }
</script>