function add0(m){return m<10?'0'+m:m }
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

export function getDateDetail(times)
{
  //times是整数，否则要parseInt转换
  let time = new Date(times);
  let y = time.getFullYear();
  let m = time.getMonth()+1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

export function getTime(times)
{
  //times是整数，否则要parseInt转换
  let time = new Date(times);
  let y = time.getFullYear();
  let m = time.getMonth()+1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  // let s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);
}

export function getDates(times)
{
  //times是整数，否则要parseInt转换
  let time = new Date(times);
  let y = time.getFullYear();
  let m = time.getMonth()+1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
export function getDate_s(times)
{
    //times是整数，否则要parseInt转换
    let time = new Date(times);
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    return y+add0(m)+add0(d)
    // +' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
export function getDate_s1(times)
{
    //times是整数，否则要parseInt转换
    let time = new Date(times);
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    // return y+add0(m)+add0(d)
    return `${y}/${add0(m)}/${add0(d)}`
    // +' '+add0(h)+':'+add0(mm)+':'+add0(s);
}


