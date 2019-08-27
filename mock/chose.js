const Mock=require("mockjs");
Mock.mock("/chose",{
	status:0,
	data:[{'menus':[{'choose':false,'name':'areaFirstPage','text':'区域管理首页'},{'choose':false,'name':'areaQuery','text':'区域查询'},{'choose':false,'name':'addArea','text':'新增区域'},{'choose':false,'name':'editArea','text':'编辑区域'}],'name':'areaManage','text':'区域管理'},

        {'menus':[{'choose':false,'name':'orgFirstPage','text':'组织管理首页'},{'choose':false,'name':'orgQuery','text':'组织查询'},{'choose':false,'name':'addOrg','text':'新增组织'},{'choose':false,'name':'editOrg','text':'编辑组织'}],'name':'roleManage','text':'角色管理'},



        {'menus':[{'choose':false,'name':'userQuery','text':'用户查询'},{'choose':false,'name':'addUser','text':'新增用户'},{'choose':false,'name':'editUser','text':'编辑用户'}],'name':'user','text':'用户'},




















		{'menus':[{'choose':true,'name':'CRMFirstPage','text':'客户管理首页'},{'choose':true,'name':'CRMListQuery','text':'客户列表查询'},{'choose':false,'name':'addCRM','text':'新增客户'},{'choose':true,'name':'CRMDetail','text':'客户详情'},{'choose':false,'name':'CRMInfoChange','text':'客户信息变更'},{'choose':false,'name':'addCRMApproval','text':'新增客户审批'},{'choose':false,'name':'RepositoryList','text':'仓库列表'}],'name':'CRMManage','text':'CRM管理'},
		{'menus':[{'choose':false,'name':'sale','text':'销售'},{'choose':false,'name':'project','text':'项目'},{'choose':false,'name':'ASK','text':'运营'}],'name':'CMVManage','text':'GMV管理'},
		{'menus':[{'choose':true,'name':'driverFirstPage','text':'司机管理首页'},{'choose':true,'name':'driverListQuery','text':'司机列表查询'},{'choose':true,'name':'driverDetail','text':'司机详情'},{'choose':false,'name':'driverApprove','text':'司机认证'},{'choose':false,'name':'driverInfoChange','text':'司机信息变更'},{'choose':false,'name':'driverAccountFrozen','text':'司机账户冻结'},{'choose':false,'name':'driverAccountFrozenApprove','text':'司机账户冻结审批'}],'name':'driverManage','text':'司机管理'},
		{'menus':[{'choose':true,'name':'orderFirstPage','text':'订单管理首页'},{'choose':true,'name':'orderListQuery','text':'订单列表查询'},{'choose':true,'name':'transportFirstPage','text':'运输单管理首页'},{'choose':true,'name':'transportQuery','text':'运输单查询'},{'choose':false,'name':'lineException','text':'线路异常处理'},{'choose':false,'name':'carRunFile','text':'车辆运行档案'}],'name':'ASKManage','text':'运营管理'},
		{'menus':[{'choose':false,'name':'driverFinance','text':'司机财务'},{'choose':false,'name':'financeAccount','text':'司机账单'},{'choose':false,'name':'driverAccountDetail','text':'司机账单详情'},{'choose':false,'name':'driverReconciliation','text':'司机调账'},{'choose':false,'name':'driverReconciliationApprove','text':'司机调账审批'},{'choose':false,'name':'CRMFinance','text':'客户财务'},{'choose':false,'name':'CRMAccount','text':'客户账单'},{'choose':false,'name':'CRMAccountDetail','text':'客户账单详情'},{'choose':false,'name':'CRMReconciliation','text':'客户对账'},{'choose':false,'name':'CRMAccountApprove','text':'客户账单审批'},{'choose':false,'name':'CRMReturnConfirm','text':'客户回款确认'}],'name':'financeManage','text':'财务管理'},
		{'menus':[{'choose':false,'name':'financeAnalyzeFirstPage','text':'财务分析首页'},{'choose':false,'name':'financeAnalyzeQuery','text':'财务分析查询'}],'name':'financeAnalyze','text':'财务分析'},
		{'menus':[{'choose':false,'name':'evaluateManagePage','text':'评价管理'}],'name':'evaluateManage','text':'评价管理'},
		{'menus':[{'choose':true,'name':'platformTermsFirstPage','text':'平台条款首页'},{'choose':false,'name':'addPlatformTerms','text':'新增平台条款'}],'name':'platformTerms','text':'平台条款'},
		{'menus':[{'choose':false,'name':'auxiliaryMeansPage','text':'辅助工具'}],'name':'auxiliaryMeans','text':'辅助工具'},
		{'menus':[{'choose':true,'name':'backlogPage','text':'待办事项'}],'name':'backlog','text':'待办事项'},
		{'menus':[{'choose':false,'name':'branchArea','text':'分区域'},{'choose':false,'name':'NoBranchArea','text':'不分区域'}],'name':'area','text':'区域'}]
});