// 表单数据
export const formData = {
  district: "",
  enterpriseType: "",
  peopleType: "",
  projectType: "",
  eventType: "",
  inputValue: "",
};

// 表格头部映射
export const tableHeaderMapper = {
  enterprise: [
    { label: "企业名称", prop: "name" },
    { label: "企业类型", prop: "type" },
    { label: "所在辖区", prop: "district" },
    { label: "注册时间", prop: "registerTime" },
  ],
  people: [
    { label: "姓名", prop: "name" },
    { label: "人员类型", prop: "type" },
    { label: "所属企业", prop: "enterprise" },
    { label: "注册时间", prop: "registerTime" },
  ],
  project: [
    { label: "项目名称", prop: "name" },
    { label: "项目类型", prop: "type" },
    { label: "建设单位", prop: "enterprise" },
    { label: "开工时间", prop: "startTime" },
  ],
  emergency: [
    { label: "事件名称", prop: "name" },
    { label: "事件类型", prop: "type" },
    { label: "处理状态", prop: "status" },
    { label: "发生时间", prop: "time" },
  ],
};

// 辖区选项
export const districtOptions = [
  { label: "中心城区", value: "center" },
  { label: "郊区", value: "suburb" },
  { label: "开发区", value: "development" },
];

// 企业类型选项
export const enterpriseTypeOptions = [
  { label: "勘察单位", value: "survey" },
  { label: "设计单位", value: "design" },
  { label: "建设单位", value: "construction" },
  { label: "监理单位", value: "supervision" },
  { label: "施工单位", value: "contractor" },
  { label: "其他单位", value: "other" },
];

// 人员类型选项
export const peopleOptions = [
  { label: "注册建筑师", value: "architect" },
  { label: "勘察设计注册工程师", value: "surveyEngineer" },
  { label: "注册监理工程师", value: "supervisionEngineer" },
  { label: "注册建造师", value: "constructionEngineer" },
  { label: "注册造价工程师", value: "costEngineer" },
  { label: "其他", value: "other" },
];

// 项目类型选项
export const projectTypeOptions = [
  { label: "房屋建筑工程", value: "building" },
  { label: "市政工程", value: "municipal" },
  { label: "其他", value: "other" },
];

// 事件类型选项
export const eventTypeOptions = [
  { label: "安全事故", value: "safety" },
  { label: "质量事故", value: "quality" },
  { label: "环境事故", value: "environment" },
  { label: "其他", value: "other" },
];

// 图表类型列表
export const echarsTypeList = [
  { title: "勘察单位", color: "#FF6B6B" },
  { title: "设计单位", color: "#4ECDC4" },
  { title: "建设单位", color: "#45B7D1" },
  { title: "监理单位", color: "#96CEB4" },
  { title: "施工单位", color: "#FFEEAD" },
  { title: "其他单位", color: "#D4A5A5" },
];

export const echarsTypeList2 = [
  { title: "注册建筑师", color: "#FF6B6B" },
  { title: "勘察设计注册工程师", color: "#4ECDC4" },
  { title: "注册监理工程师", color: "#45B7D1" },
  { title: "注册建造师", color: "#96CEB4" },
  { title: "注册造价工程师", color: "#FFEEAD" },
  { title: "其他", color: "#D4A5A5" },
];

export const echarsTypeList3 = [
  { title: "房屋建筑工程", color: "#FF6B6B" },
  { title: "市政工程", color: "#4ECDC4" },
  { title: "其他", color: "#45B7D1" },
];

export const echarsTypeList4 = [
  { title: "已处理", color: "#4ECDC4" },
  { title: "处理中", color: "#FFEEAD" },
  { title: "未处理", color: "#FF6B6B" },
];

// 表格数据
export const leftList = [
  { name: "企业A", type: "勘察单位", district: "中心城区", registerTime: "2023-01-01" },
  { name: "企业B", type: "设计单位", district: "郊区", registerTime: "2023-02-01" },
  { name: "企业C", type: "建设单位", district: "开发区", registerTime: "2023-03-01" },
];

export const peopleScrollList = [
  { name: "张三", type: "注册建筑师", enterprise: "企业A", registerTime: "2023-01-01" },
  { name: "李四", type: "勘察设计注册工程师", enterprise: "企业B", registerTime: "2023-02-01" },
  { name: "王五", type: "注册监理工程师", enterprise: "企业C", registerTime: "2023-03-01" },
];

export const projectScrollList = [
  { name: "项目A", type: "房屋建筑工程", enterprise: "企业A", startTime: "2023-01-01" },
  { name: "项目B", type: "市政工程", enterprise: "企业B", startTime: "2023-02-01" },
  { name: "项目C", type: "其他", enterprise: "企业C", startTime: "2023-03-01" },
];

export const yingjiScrollTableList = [
  { name: "事件A", type: "安全事故", status: "已处理", time: "2023-01-01" },
  { name: "事件B", type: "质量事故", status: "处理中", time: "2023-02-01" },
  { name: "事件C", type: "环境事故", status: "已处理", time: "2023-03-01" },
];

// 表格头部
export const leftHeader = tableHeaderMapper.enterprise;
export const peopleScrollHeader = tableHeaderMapper.people;
export const projectScrollHeader = tableHeaderMapper.project;
export const yingjiScrollTableListHeader = tableHeaderMapper.emergency;

// 状态选项
export const statusOptions = [
  { label: "全部", value: "all" },
  { label: "待处理", value: "pending" },
  { label: "处理中", value: "processing" },
  { label: "已完成", value: "completed" },
];

// 其他内容图表类型列表
export const echarsTypeList5 = [
  { title: "总数据量", color: "#FF6B6B" },
  { title: "今日新增", color: "#4ECDC4" },
  { title: "待处理", color: "#FFEEAD" },
  { title: "已处理", color: "#45B7D1" },
];

// 其他内容表格数据
export const otherScrollList = [
  { name: "数据A", type: "类型1", status: "待处理", time: "2023-01-01" },
  { name: "数据B", type: "类型2", status: "处理中", time: "2023-02-01" },
  { name: "数据C", type: "类型3", status: "已完成", time: "2023-03-01" },
];

// 其他内容表格头部
export const otherScrollHeader = [
  { label: "名称", prop: "name" },
  { label: "类型", prop: "type" },
  { label: "状态", prop: "status" },
  { label: "时间", prop: "time" },
]; 