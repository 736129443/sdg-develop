<template>
    <div class="main statistics">
        <div class='btn'>
            <span :class="activeClass == '' ? 'active':''" @click="Statistics " v-if="dataStatistics">数据统计</span>
            <span :class="activeClass == 'active' ? 'active':''" @click="Analysis "  v-if="dataAnalysis">数据分析</span>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import {F_jurisdiction} from '../../js/Fjurisdiction'

    export default {
        name: "statistics",
        data() {
            return{
                dataStatistics:'',
                dataAnalysis:'',
            }
        },
        created() {
            let jd = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.dataStatistics = F_jurisdiction('dataStatistics',jd);
            this.dataAnalysis = F_jurisdiction('dataAnalysis',jd);
            this.Statistics();
        },
        methods: {
            Statistics() {
                this.activeClass = '';
                this.$router.push({path: '/statistics/count'});
                this.activeClass = ''
            },
            Analysis() {
                this.activeClass = '';
                this.$router.push({path: '/statistics/analysis'});
                this.activeClass = 'active'
            },
        }
    }
</script>

<style scoped lang="scss">
    .statistics{
        .btn{
            height:40px;
            span{
                float: left;
                background: white;
                padding:15px;
                overflow: hidden;
                border:1px solid #eaedf2;
                margin:0 0.1px;
                cursor: pointer;
            }
            .active{
                border-top:4px solid #409EFF;
                background: white;
            }
        }
    }
</style>