import type { IForm } from "@/base-ui/form"
export const searchFormConfig: IForm = {
  formItems: [
    {
      field: "id",
      type: "input",
      label: "ID",
      placeholder: "请输入ID"
    },
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
  ]
}
