import { reactive, ref, markRaw } from "vue"
// --------------->项目信息
// form
export const formData = {
  formData: {
    serviceTitle: "",
    serviceArea: "",
    status: "",
    createTime: ""
  },
  config: [
    {
      label: "区域",
      prop: "goodsName",
      type: "select",
      placeholder: "请选择",
      options: [
        { label: "中心城区", value: "中心城区" },
      ]
    },
    {
      label: "区县",
      prop: "goodsName",
      type: "select",
      placeholder: "请选择",
      options: [
        { label: "渝中区", value: "渝中区" },
        { label: "江北区", value: "江北区" },
        { label: "南岸区", value: "南岸区" },
        { label: "北碚区", value: "北碚区" },
        { label: "渝北区", value: "渝北区" },
        { label: "巴南区", value: "巴南区" },
        
      ]
    },
    {
      label: "项目分类",
      prop: "goodsName",
      type: "select",
      placeholder: "请选择类型",
      options: [
        { label: "渝中区", value: "渝中区" },
        { label: "江北区", value: "江北区" },
      ]
    },
    {
      label: "项目阶段",
      prop: "goodsName",
      type: "select",
      placeholder: "请选择类型",
      options: [
        { label: "渝中区", value: "渝中区" },
      ]
    },
    
  ],
  rules: []
}

export const tableHeaderMapper = ref({
  // num: {
  //   label: "复选框",
  //   type: "selection",
  //   width: "55",
  //   isShown: true
  // },
  id: {
    label: "序号",
    width: "auto",
    isShown: true
  },
  goodsName: {
    label: "项目编码",
    width: "auto",
    isShown: true
  },
  goodsName2: {
    label: "项目名称",
    width: "auto",
    isShown: true
  },
  goodsName3: {
      label: "项目分类",
    width: "auto",
    isShown: true
  },
  goodsName4: {
    label: "区域",
    width: "auto",
    isShown: true
  },
  goodsName5: {
    label: "区县",
    width: "auto",
    isShown: true
  },
  goodsName6: {
    label: "建设单位",
    width: "auto",
    isShown: true
  },
  goodsName7: {
    label: "项目阶段",
    width: "auto",
    isShown: true
  },
  options: {
    label: "操作",
    width: "auto",
    isShown: true,
    fixed: "right",
    minWidth: "120"
  }
})


// ----------->企业
export const enterpriseFormData = {
  formData: {
    serviceTitle: "",
    serviceArea: "",
    status: "",
    createTime: ""
  },
  config: [
    {
      label: "区域",
      prop: "goodsName",
      type: "select",
      placeholder: "请选择",
      options: [
        { label: "中心城区", value: "中心城区" },
      ]
    },
    {
      label: "区县",
      prop: "goodsName",
      type: "select",
      placeholder: "请选择",
      options: [
        { label: "渝中区", value: "渝中区" },
        { label: "江北区", value: "江北区" },
        { label: "南岸区", value: "南岸区" },
        { label: "北碚区", value: "北碚区" },
        { label: "渝北区", value: "渝北区" },
        { label: "巴南区", value: "巴南区" },
        
      ]
    },
    {
      label: "项目分类",
      prop: "goodsName",
      type: "select",
      placeholder: "请选择类型",
      options: [
        { label: "渝中区", value: "渝中区" },
        { label: "江北区", value: "江北区" },
      ]
    },
    {
      label: "项目阶段",
      prop: "goodsName",
      type: "select",
      placeholder: "请选择类型",
      options: [
        { label: "渝中区", value: "渝中区" },
      ]
    },
    
  ],
  rules: []
}

export const enterpriseTableHeaderMapper = ref({
  // num: {
  //   label: "复选框",
  //   type: "selection",
  //   width: "55",
  //   isShown: true
  // },
  id: {
    label: "序号",
    width: "auto",
    isShown: true
  },
  goodsName: {
    label: "企业名称",
    width: "auto",
    isShown: true
  },
  goodsName2: {
    label: "统一社会信用代码",
    width: "auto",
    isShown: true
  },
  goodsName3: {
      label: "所属区域",
    width: "auto",
    isShown: true
  },
  goodsName4: {
    label: "企业类型",
    width: "auto",
    isShown: true
  },
  goodsName5: {
    label: "法人代表",
    width: "auto",
    isShown: true
  },
  options: {
    label: "操作",
    width: "auto",
    isShown: true,
    fixed: "right",
    minWidth: "120"
  }
})