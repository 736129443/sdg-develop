// 一级菜单权限 jd :权限数据 、 k 索引
export function AIfirstClass(k, jd) {
    let arr = [];
    for (const i in jd[k].menus) {
        if (jd[k].menus[i].choose == false) {
            arr.push(jd[k].menus[i].choose);
        }
    }
    if (arr.length == jd[k].menus.length) {
        return false
    }else{
        return true
    }
}
// ccccccc     jd :权限数据 、 k name   一级
export function AIfirstClass0(k, jd) {
    //  判断权限索引是否小于K，若小于则属于旧权限 该一级权限隐藏
    // 若大于等于 则判断
    let arr = [];
    let status; 
    for (let i = 0; i < jd.length; i++) {
        if (k == jd[i].name) {
            for (const o in jd[i].menus) {
                if (jd[i].menus[o].choose == false) {
                    arr.push(jd[i].menus[o].choose);
                }
            }
            if (arr.length == jd[i].menus.length) {
                status = false
            }else{
                status = true
            }
        }
    }
    return status == undefined ? false : status
}

// jd :权限数据 、 k 权限 name  子菜单
export  function F_jurisdiction(k,jd){
    let status;
    for (let i = 0; i < jd.length; i++) {
        if(k == jd[i].name){
            status = jd[i].choose ;
        }else{
            for (let l = 0; l < jd[i].menus.length; l++) {
                if (k == jd[i].menus[l].name) {
                    status = jd[i].menus[l].choose ;
                }
            }
        }
    }
    return status == undefined?false:status
}
//二级权限控制 arr子菜单数组
export function secondLevel(arr) {
    let jurisdiction ;
    let arr_i = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == false){
            arr_i.push(false)
        }
    }
    if (arr_i.length == arr.length){
        jurisdiction = false
    } else{
        jurisdiction = true

    }
    return jurisdiction
}