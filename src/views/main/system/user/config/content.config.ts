// 配置列 prop：映射到的真实属性数据   label：列名   slotName：是否要插槽进行单独控制内容
const propList = [
  { prop: "name", label: "用户名", minWidth: "100" },
  { prop: "realname", label: "真实姓名", minWidth: "100" },
  { prop: "cellphone", label: "手机号", minWidth: "100" },
  { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
  {
    prop: "createAt",
    label: "创建时间",
    minWidth: "180",
    slotName: "createAt"
  },
  {
    prop: "updateAt",
    label: "更新时间",
    minWidth: "180",
    slotName: "updateAt"
  },
  { label: "操作", minWdith: "120", slotName: "handler" }
]

export const contentTableConfig = {
  propList,
  showIndexColumn: true,
  showSelectColumn: true,
  title: "用户列表",
  btnName: "新建用户"
}
