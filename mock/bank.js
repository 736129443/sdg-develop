const Mock=require("mockjs");
Mock.mock("/bank",{
    status:0,
    data:[
        {id:'BKCH',name:'中国银行'},
        {id:'ABOC',name:'农业银行'},
        {id:'ICBK',name:'工商银行'},
        {id:'PCBC',name:'建设银行'},
        {id:'PSBC',name:'邮政储蓄'},
        {id:'COMM',name:'交通银行'},
        {id:'CMBC',name:'招商银行'},
        {id:'SZDB',name:'平安银行'},
        {id:'CIBK',name:'中信银行'},
        {id:'MSBC',name:'民生银行'},
        {id:'GDBK',name:'广发银行'},
        {id:'SPDB',name:'浦发银行'},
        {id:'FJIB',name:'兴业银行'},
        {id:'EVER',name:'光大银行'},
        {id:'ZJCB',name:'浙商银行'},
        {id:'CTBA',name:'澳大利亚联邦银行'},
        {id:'ANBK',name:'鞍山银行'},
        {id:'ANZB',name:'澳新银行'},
        {id:'NOLA',name:'北德意志州银行'},
        {id:'CHBH',name:'渤海银行'},
        {id:'BRCB',name:'北京农村商业银行'},
        {id:'BJCN',name:'北京银行'},
        {id:'BARC',name:'巴克莱银行'},
        {id:'BARB',name:'巴罗达银行'},
        {id:'KRED',name:'比利时联合银行'},
        {id:'BTCB',name:'包商银行'},
        {id:'CDRC',name:'成都农村商业银行'},
        {id:'CBOC',name:'成都银行'},
        {id:'CSCB',name:'常熟农村商业银行'},
        {id:'DDBK',name:'丹东银行'},
        {id:'CRLY',name:'东方汇理银行'},
        {id:'DGCB',name:'东莞银行'},
        {id:'UOVB',name:'大华银行'},
        {id:'DLCB',name:'大连银行'},
        {id:'DSBA',name:'大新银行'},
        {id:'DECC',name:'德阳银行'},
        {id:'BEAS',name:'东亚银行'},
        {id:'DYSH',name:'东营银行'},
        {id:'DEUT',name:'德意志银行'},
        {id:'FSBC',name:'富邦华一银行'},
        {id:'KCCB',name:'富滇银行'},
        {id:'BNPA',name:'法国巴黎银行'},
        {id:'NATX',name:'法国外贸银行'},
        {id:'SGCL',name:'法国兴业银行'},
        {id:'PNBP',name:'富国银行'},
        {id:'FZCB',name:'福建海峡银行'},
        {id:'FXBK',name:'阜新银行'},
        {id:'GDHB',name:'广东华兴银行'},
        {id:'RCNH',name:'广东南海农村商业银行'},
        {id:'RCCS',name:'广东顺德农村商业银行'},
        {id:'SDBC',name:'国家开发银行'},
        {id:'GLBK',name:'桂林银行'},
        {id:'CZNB',name:'国民银行'},
        {id:'BGBK',name:'广西北部湾银行'},
        {id:'GYCB',name:'贵阳银行'},
        {id:'GZRC',name:'广州农村商业银行'},
        {id:'BKGZ',name:'赣州银行'},
        {id:'GZCB',name:'广州银行'},
        {id:'BKSH',name:'河北银行'},
        {id:'BKHD',name:'邯郸银行'},
        {id:'HCCB',name:'哈尔滨银行'},
        {id:'HSBC',name:'汇丰银行'},
        {id:'KODB',name:'韩国产业银行'},
        {id:'SHBK',name:'韩国新韩银行'},
        {id:'WHCB',name:'汉口银行'},
        {id:'INGB',name:'荷兰安智银行'},
        {id:'RABO',name:'荷兰合作银行'},
        {id:'DRCB',name:'黑龙江东宁农村商业银行'},
        {id:'EWBK',name:'华美银行'},
        {id:'CITI',name:'花旗银行'},
        {id:'OCBC',name:'华侨银行'},
        {id:'HASE',name:'恒生银行'},
        {id:'CNMB',name:'华商银行'},
        {id:'HXBK',name:'华夏银行'},
        {id:'HNBN',name:'韩亚银行'},
        {id:'HRCN',name:'惠州农村商业银行'},
        {id:'HZCB',name:'杭州银行'},
        {id:'JHCB',name:'金华银行'},
        {id:'BOJJ',name:'九江银行'},
        {id:'HCRR',name:'吉林珲村农村商业银行'},
        {id:'JTCB',name:'吉林九台农村商业银行'},
        {id:'JLBK',name:'吉林银行'},
        {id:'NOSC',name:'加拿大丰业银行'},
        {id:'ROYC',name:'加拿大皇家银行'},
        {id:'BKJN',name:'济宁银行'},
        {id:'DYCB',name:'江苏丹阳农村商业银行'},
        {id:'HRCB',name:'江苏海安农村商业银行'},
        {id:'HMCB',name:'江苏海门农村商业银行'},
        {id:'RCWJ',name:'江苏靖江农村商业银行'},
        {id:'JYCB',name:'江苏江阴农村商业银行'},
        {id:'JRCB',name:'江苏姜堰农村商业银行'},
        {id:'NRCB',name:'江苏南通农村商业银行'},
        {id:'PZCB',name:'江苏邳州农村商业银行'},
        {id:'RRCB',name:'江苏如东农村商业银行'},
        {id:'RGCB',name:'江苏如皋农村商业银行'},
        {id:'JSCB',name:'江苏射阳农村商业银行'},
        {id:'WJRB',name:'江苏吴江农村商业银行'},
        {id:'JYHR',name:'江苏盐城黄海农村商业银行'},
        {id:'BOJS',name:'江苏银行'},
        {id:'JSHB',name:'晋商银行'},
        {id:'URCC',name:'江苏宜兴农村商业银行'},
        {id:'YZRC',name:'江苏扬州农村商业银行'},
        {id:'JRZC',name:'江苏紫金农村商业银行'},
        {id:'BOJX',name:'嘉兴银行'},
        {id:'CIYU',name:'集友银行'},
        {id:'JZCB',name:'锦州银行'},
        {id:'CKLB',name:'昆仑银行'},
        {id:'BOLF',name:'廊坊银行'},
        {id:'LJBC',name:'龙江银行'},
        {id:'LSCC',name:'乐山市商业银行'},
        {id:'LWCB',name:'莱商银行'},
        {id:'LYCB',name:'临商银行'},
        {id:'LCOM',name:'辽阳银行'},
        {id:'BOLY',name:'洛阳银行'},
        {id:'LZCB',name:'兰州银行'},
        {id:'LZBK',name:'柳州银行'},
        {id:'CHAS',name:'摩根大通银行'},
        {id:'BOFO',name:'美国建东银行'},
        {id:'MSBK',name:'摩根士丹利国际银行'},
        {id:'NAGO',name:'民古屋银行'},
        {id:'BOFA',name:'美国银行'},
        {id:'MBBE',name:'马来亚银行'},
        {id:'BOFM',name:'蒙特利尔银行'},
        {id:'DHBC',name:'宁波东海银行'},
        {id:'BINH',name:'宁波通商银行'},
        {id:'BKNB',name:'宁波银行'},
        {id:'NCCC',name:'南充市商业银行'},
        {id:'NCCK',name:'南昌银行'},
        {id:'NJCB',name:'南京银行'},
        {id:'HSSY',name:'内蒙古银行'},
        {id:'YCCB',name:'宁夏银行'},
        {id:'NYCB',name:'南洋商业银行'},
        {id:'BNYM',name:'纽约银行'},
        {id:'SSVB',name:'浦发硅谷银行'},
        {id:'BKKB',name:'盘谷银行'},
        {id:'QDRC',name:'青岛农村商业银行'},
        {id:'QCCB',name:'青岛银行'},
        {id:'BOXN',name:'青海银行'},
        {id:'JNSH',name:'齐鲁银行'},
        {id:'ZBBK',name:'齐商银行'},
        {id:'IBKO',name:'企业银行'},
        {id:'QRCB',name:'泉州农村商业银行'},
        {id:'BKQZ',name:'泉州银行'},
        {id:'ESSE',name:'瑞典北欧斯安银行'},
        {id:'CRES',name:'瑞士信贷银行'},
        {id:'UBSW',name:'瑞士银行'},
        {id:'MHCB',name:'瑞穗银行'},
        {id:'RZCB',name:'日照银行'},
        {id:'SGRB',name:'山东寿光农村商业银行'},
        {id:'MBTC',name:'首都银行'},
        {id:'ZDRB',name:'山东张店农村商业银行'},
        {id:'ABNA',name:'苏格兰皇家银行'},
        {id:'SHRC',name:'上海农村商业银行'},
        {id:'BOSH',name:'上海银行'},
        {id:'SYCB',name:'盛京银行'},
        {id:'SMBC',name:'三井住友银行'},
        {id:'BOTK',name:'三菱东京日联银行'},
        {id:'IBXH',name:'厦门国际银行'},
        {id:'RCXM',name:'厦门农村商业银行'},
        {id:'CBXM',name:'厦门银行'},
        {id:'YDBK',name:'陕西药都农村商业银行'},
        {id:'SXCB',name:'绍兴银行'},
        {id:'SRCC',name:'深圳农村商业银行'},
        {id:'BHRC',name:'天津滨海农村商业银行'},
        {id:'TJRC',name:'天津农村商业银行'},
        {id:'TCCB',name:'天津银行'},
        {id:'BOTS',name:'唐山市商业银行'},
        {id:'TZBK',name:'台州银行'},
        {id:'WRCB',name:'潍坊农村商业银行'},
        {id:'WFCB',name:'潍坊银行'},
        {id:'WRCC',name:'武汉农村商业银行'},
        {id:'KOEX',name:'外换银行'},
        {id:'WHBK',name:'威海银行'},
        {id:'UCCB',name:'乌鲁木齐商业银行'},
        {id:'HFCB',name:'徽商银行'},
        {id:'WZCB',name:'温州银行'},
        {id:'IXAB',name:'西安银行'},
        {id:'CBNB',name:'协和银行'},
        {id:'DBSS',name:'新加坡发展银行'},
        {id:'COXI',name:'新联商业银行'},
        {id:'WPAC',name:'西太平洋银行'},
        {id:'YBRC',name:'延边农村商业银行'},
        {id:'BCIT',name:'意大利联合圣保罗银行'},
        {id:'BROM',name:'意大利联合信贷'},
        {id:'WIHB',name:'永亨银行'},
        {id:'YKCB',name:'营口银行'},
        {id:'HVBK',name:'友利银行'},
        {id:'ZFRB',name:'烟台农村商业银行'},
        {id:'CRCK',name:'长春农村商业银行'},
        {id:'SCBL',name:'渣打银行'},
        {id:'ICBC',name:'兆丰国际商业银行'},
        {id:'EIBC',name:'中国进出口银行'},
        {id:'ADBN',name:'中国农业发展银行'},
        {id:'CTCB',name:'中国信托银行'},
        {id:'ZRCB',name:'珠海农村商业银行'},
        {id:'CZCB',name:'浙江稠州银行'},
        {id:'HCRC',name:'浙江禾城农村商业银行'},
        {id:'YHBK',name:'浙江杭州余杭农村商业银行'},
        {id:'ZJMT',name:'浙江民泰商业银行'},
        {id:'ZJTL',name:'浙江泰隆商业银行'},
        {id:'LCBK',name:'浙江温州鹿城农村商业银行'},
        {id:'ZXBK',name:'浙江新昌农村商业银行'},
        {id:'YWBK',name:'浙江义乌农村商业银行'},
        {id:'ZJRB',name:'浙江诸暨农村商业银行'},
        {id:'ZJPT',name:'浙江舟山普陀农村商业银行'},
        {id:'CQRB',name:'重庆农村商业银行'},
        {id:'CTGB',name:'重庆三峡银行'},
        {id:'CQCB',name:'重庆银行'},
        {id:'CHCC',name:'长沙银行'},
        {id:'ZXBC',name:'正信银行'},
        {id:'ZZBK',name:'郑州银行'},
        {id:'9999',name:'其他（如第三方支付牌照)'},
    ]
});