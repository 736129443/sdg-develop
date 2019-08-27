const Mock=require("mockjs");
Mock.mock("/details",{
    status:0,
    data:[
        {id:10222010,name:"王小明",city:"北京sfssdfdasdasdsadadaasdsda"},
        {id:10222011,name:"望夏雨",city:"北京"},
        {id:10222012,name:"赵丽颖",city:"北京sdfsdfsfd"},
        {id:10222013,name:"小芳",city:"北京sdfsdfsfd"},
        {id:10222014,name:"王丽",city:"北京sdfsdfsdf"},
        {id:10222015,name:"刘志军",city:"北京"},
        {id:10222010,name:"王小明",city:"北京sdfsdfsfdaasdasdadasdadadasdsdasd"},
        {id:10222011,name:"望夏雨",city:"北京"},
        {id:10222012,name:"赵丽颖",city:"北京sdfsdfsdf"},
        {id:10222013,name:"小芳",city:"北京"}
    ]
});