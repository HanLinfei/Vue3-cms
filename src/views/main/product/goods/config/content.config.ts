// 配置列 prop：映射到的真实属性数据   label：列名   slotName：是否要插槽进行单独控制内容
const propList = [
  { prop: "name", label: "商品名称", minWidth: "100" },
  { prop: "oldPrice", label: "原价格", minWidth: "40", slotName: "oldPrice" },
  { prop: "newPrice", label: "现价格", minWidth: "40", slotName: "newPrice" },
  { prop: "imgUrl", label: "商品图片", minWidth: "100", slotName: "img" },
  // { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
  {
    prop: "createAt",
    label: "创建时间",
    minWidth: "80",
    slotName: "createAt"
  },
  {
    prop: "updateAt",
    label: "更新时间",
    minWidth: "80",
    slotName: "updateAt"
  },
  { label: "操作", minWdith: "120", slotName: "handler" }
]

export const contentTableConfig = {
  propList,
  showIndexColumn: true,
  showSelectColumn: true,
  title: "商品列表",
  btnName: "新建商品"
}
