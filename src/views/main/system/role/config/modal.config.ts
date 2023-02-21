import type { IForm } from "@/base-ui/form"
export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "角色名称",
      placeholder: "请输入角色名称"
    },
    {
      field: "intro",
      type: "input",
      label: "权限介绍",
      placeholder: "请输入权限介绍"
    }
  ],
  colLayout: { xl: 24, lg: 24, md: 24, sm: 24, xs: 24 }
}
