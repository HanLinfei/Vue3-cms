// 配置列 prop：映射到的真实属性数据   label：列名   slotName：是否要插槽进行单独控制内容
const propList = [
  { prop: "name", label: "角色名", minWidth: "100" },
  { prop: "intro", label: "权限介绍", minWidth: "100" },
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
  title: "角色列表",
  btnName: "新建角色"
}
