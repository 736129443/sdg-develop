const Mock = require('mockjs');
Mock.mock('/sales',{
    status:0,
    data:[
        // {month:1,area:'山西',income:1111,expend:2222,margin:444},
        // {month:2,area:'山西',income:1111,expend:2222,margin:444}
        {   time:'7月8号',obj:22,bike:55,single:390},
        {   time:'7月9号',obj:220,bike:99,single:300},
        {   time:'7月10号',obj:220,bike:99,single:130},
        {   time:'7月11号',obj:220,bike:99,single:330},
        {   time:'7月12号',obj:20,bike:99,single:330},
        {   time:'7月13号',obj:220,bike:324,single:200},
        {   time:'7月14号',obj:220,bike:99,single:330},
        {   time:'7月15号',obj:220,bike:123,single:330},
        {   time:'7月16号',obj:220,bike:99,single:330},
        {   time:'7月17号',obj:220,bike:42,single:330},
        {   time:'7月18号',obj:220,bike:99,single:330},
    ]
})