import { reactive, ref, markRaw } from "vue";
// form
export const formData = reactive({
  formData: {
    goodsName: "",
    serviceArea: "",
    goodsStatus: "",
  },
  config: [
    {
      label: "项目名称",
      prop: "goodsName",
      type: "input",
      placeholder: "请输入",
    },
    {
      label: "区域名称",
      prop: "serviceArea",
      type: "select",
      placeholder: "请选择",
      options: [
        { value: "渝中区", label: "渝中区" },
        { value: "大渡口区", label: "大渡口区" },
        { value: "江北区", label: "江北区" },
        { value: "沙坪坝区", label: "沙坪坝区" },
        { value: "九龙坡区", label: "九龙坡区" },
        { value: "南岸区", label: "南岸区" },
        { value: "北碚区", label: "北碚区" },
        { value: "綦江区", label: "綦江区" },
        { value: "大足区", label: "大足区" },
        { value: "渝北区", label: "渝北区" },
        { value: "巴南区", label: "巴南区" },
        { value: "黔江区", label: "黔江区" },
        { value: "长寿区", label: "长寿区" },
        { value: "荣昌区", label: "荣昌区" },
        { value: "万盛区", label: "万盛区" },
        { value: "武隆区", label: "武隆区" },
        { value: "丰都县", label: "丰都县" },
        { value: "奉节县", label: "奉节县" },
        { value: "云阳县", label: "云阳县" },
        { value: "忠县", label: "忠县" },
        { value: "酉阳县", label: "酉阳县" },
        { value: "彭水县", label: "彭水县" },
        { value: "石柱县", label: "石柱县" },
        { value: "秀山县", label: "秀山县" },
      ],
    },
    {
      label: "项目类型",
      prop: "goodsStatus",
      type: "select",
      placeholder: "请选择",
      options: [
        { label: "房屋建筑工程", value: "房屋建筑工程" },
        { label: "市政工程", value: "市政工程" },
        { label: "其他", value: "其他" },
      ],
    },
    // {
    //   label: "创建时间",
    //   prop: "createTime",
    //   dateType: "date",
    //   type: "date",
    //   placeholder: "选择日期时间"
    // },
    // {
    //   label: "上架时间",
    //   prop: "listingTime",
    //   dateType: "date",
    //   type: "date",
    //   placeholder: "选择日期时间"
    // },
    // {
    //   label: "更新时间",
    //   prop: "updateTime",
    //   dateType: "date",
    //   type: "date",
    //   placeholder: "选择日期时间"
    // }
    // {
    //   label: "创建时间",
    //   prop: "date",
    //   dateType: "date",
    //   starKey: "starTime",
    //   endKey: "endTime",
    //   type: "daterange",
    //   starPlace: "开始时间",
    //   endPlace: "开始时间"
    // }
  ],
  rules: [],
});
// table
export const tableHeaderMapper = ref({
  a: {
    label: "序号",
    // type: "selection",
    width: "55",
    isShown: true,
  },
  b: {
    label: "项目名称",
    width: "auto",
    isShown: true,
  },
  c: {
    label: "项目类型",
    width: "auto",
    isShown: true,
  },
  d: {
    label: "项目地址",
    width: "auto",
    isShown: true,
  },
  e: {
    label: "所属区域",
    width: "auto",
    isShown: true,
  },
  f: {
    label: "建设单位",
    width: "auto",
    isShown: true,
  },
  g: {
    label: "施工单位",
    width: "auto",
    isShown: true,
  },
});
