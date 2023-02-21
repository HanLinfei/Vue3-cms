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
      label: "用户名",
      placeholder: "请输入用户名"
    },
    {
      field: "realname",
      type: "input",
      label: "真实姓名",
      placeholder: "请输入真实姓名"
    },
    {
      field: "cellphone",
      type: "input",
      label: "电话号码",
      placeholder: "请输入电话号码"
    },
    {
      field: "enable",
      type: "select",
      label: "状态",
      options: [
        {
          value: 0,
          label: "不可用"
        },
        {
          value: 1,
          label: "可用"
        }
      ],
      placeholder: "请选择状态"
    },
    {
      field: "createAt",
      type: "datepicker",
      label: "创建时间",
      placeholder: "请选择创建时间"
    }
  ],
  itemStyle: {
    padding: "0 0 10px 0"
  }
}
