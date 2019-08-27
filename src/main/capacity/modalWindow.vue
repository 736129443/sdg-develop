<template>
  <div class="dialog">
    <div class="popup">
      <div class="shadow">
        <p class="bottom">提示</p>
        <p class="bottom">此操作将永久取消运输单, 是否继续?</p>
        <el-select class="bottom c-reason" v-model="cancelReason" clearable placeholder="请选择取消原因">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          type="textarea"
          class="otherReason bottom"
          :autosize="{ minRows: 4, maxRows: 10}"
          placeholder="请输入其他原因,最少输入5个字"
          v-model="otherReason"
          v-show="this.cancelReason === '其他原因'?true:false"
        >
        </el-input>
        <div>
          <el-button round @click="cancel">取消</el-button>
          <el-button round @click="submit">确定</el-button>
        </div>
        <div class="cancelA" @click="cancel">
          <i class="iconfont icon-close"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import {regReason1} from "../assets/js/newWarehouse";
  export default {
    name: 'vdialog',
    data() {
      return {
        resolve: '',
        reject: '',
        promise: '', // 保存promise对象
        options: [{
          value: '运输单信息有变动',
          label: '运输单信息有变动'
        }, {
          value: '重新选择司机',
          label: '重新选择司机'
        }, {
          value: '发布运输单重复',
          label: '发布运输单重复'
        },{
          value: '其他原因',
          label: '其他原因'
        }],
        cancelReason: '',
        otherReason:''
      }
    },
    methods: {
      //确定,将promise断定为完成态
      submit() {
        let a = 0;
        for(let i =0;i<this.otherReason.length;i++){
          a++;
        }
        console.log(a)
        // if(!regReason1(this,this.otherReason)&&this.otherReason!==''){
        //   this.$message({
        //     message: '评价内容要求长度5-128位,或不能包含特殊字符!',
        //     type: 'warning'
        //   });
        //   return;
        // }
        let childData = {
          cancelReason:this.cancelReason,
          otherReason:this.otherReason,
        };
        if(this.cancelReason === ''){
          this.$message({
            showClose: true,
            message: '请选择取消原因',
            type: 'warning'
          });
        }else{
          if(this.cancelReason === '其他原因'){
            if(this.otherReason === '') {
              this.$message({
                showClose: true,
                message: '请填写其他原因',
                type: 'warning'
              });
              return;
            }
          }
          this.$emit('get-data',childData);
          this.resolve('submit');
          this.cancelReason ='';
          this.otherReason = '';
        }
      },
      // 取消,将promise断定为reject状态
      cancel() {
        this.reject('cancel');
        this.cancelReason ='';
        this.otherReason = '';
      },
      //显示confirm弹出,并创建promise对象，给父组件调用
      confirm() {
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        return this.promise; //返回promise对象,给父级组件调用
      }
    }
  }
</script>

<style scoped lang="scss">
    .popup{
      position: fixed;
      left:0;
      top:0;
      height:100%;
      width:100%;
      background: rgba(0,0,0,.5);
      z-index: 100;
      .shadow{
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        width: 50%;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius:10px;
        /*justify-content: center;*/
        padding: 20px 0;
        .cancelA{
          position: absolute;
          top:15px;
          right:15px;
          padding: 5px;
          cursor:pointer;
        }
        .c-reason{
          width: 37%;
        }
      }
    }
</style>
