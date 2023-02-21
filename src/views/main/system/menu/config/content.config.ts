// 配置列 prop：映射到的真实属性数据   label：列名   slotName：是否要插槽进行单独控制内容
const propList = [
  { prop: "name", label: "菜单名称", minWidth: "100" },
  { prop: "type", label: "类型", minWidth: "60" },
  { prop: "url", label: "菜单url", minWidth: "100" },
  { prop: "permission", label: "按钮权限", minWidth: "100" },
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
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: "id",
    treeProp: {
      children: "children"
    }
  },
  title: "菜单列表",
  btnName: "新建菜单"
}
