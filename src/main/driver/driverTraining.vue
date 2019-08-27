<template>
    <div class="driverTraining">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="岗前培训" name="before" v-if="postJobTrain">
                <trainingComponent :trainType="activeName"></trainingComponent>
            </el-tab-pane>
            <el-tab-pane label="上岗培训" name="in" v-if="onDutyTrain">
                <trainingComponent :trainType="activeName"></trainingComponent>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import trainingComponent from './trainingComponent.vue'
    import {F_jurisdiction,AIfirstClass0,secondLevel} from '../../js/Fjurisdiction.js'
    export default {
        name: "driverTraining",
        created(){
            let jd = JSON.parse(sessionStorage.getItem('jurisdictions'));
            this.postJobTrain = F_jurisdiction('postJobTrain',jd)
            this.onDutyTrain = F_jurisdiction('onDutyTrain',jd)
            // postJobTrain':'岗前培训','onDutyTrain':'上岗培训',/**/
        },
        data() {
            return {
                postJobTrain:'',
                onDutyTrain:'',
                activeName:'before'
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        components: {
            trainingComponent
        }
    }
</script>

<style scoped lang="scss">
  .driverTraining{
      width: 100%;
      padding: 30px;
      overflow-y: auto;
  }
</style>