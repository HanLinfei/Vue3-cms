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
      field: "accountName",
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名"
    },
    {
      field: "name",
      type: "input",
      label: "真实姓名",
      placeholder: "请输入真实姓名"
    },
    {
      field: "phoneNumber",
      type: "input",
      label: "电话号码",
      placeholder: "请输入电话号码"
    },
    {
      field: "state",
      type: "select",
      label: "状态",
      options: [
        {
          value: "true",
          label: "可用"
        },
        {
          value: "false",
          label: "不可用"
        }
      ],
      placeholder: "请选择状态"
    },
    {
      field: "createTime",
      type: "datepicker",
      label: "创建时间",
      placeholder: "请选择创建时间"
    }
  ]
}
