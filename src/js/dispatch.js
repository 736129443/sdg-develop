
export function regCollectionName(_this,name){
  let regNam=/^[\u4e00-\u9fa5\w]{2,10}$/g;
  if(!regNam.test(name)){
    _this.$message.error('仓库名要求2-10位,或不能包含特殊字符');
    _this.successCollectionName=false;
  }else {
    _this.successCollectionName=true;
    // _this.$message({
    //   message: '仓库名正确!',
    //   type: 'success'
    // });
  }
}
function add0(m){return m<10?'0'+m:m }
export function getNowTime()
{
  //times是整数，否则要parseInt转换
  let time = new Date();
  let y = time.getFullYear();
  let m = time.getMonth()+1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d)
  // +' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

export function getDate(times)
{
  //times是整数，否则要parseInt转换
  let time = new Date(times);
  let y = time.getFullYear();
  let m = time.getMonth()+1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d)
  // +' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
