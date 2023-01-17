// 编写校验规则
const rules = {
  name: [
    {
      message: "用户名不可为空",
      required: true, //该选项必传
      trigger: "blur" //什么时候进行验证，目前是失去焦点时候验证
    },
    {
      pattern: /^[a-z0-9]{3,10}$/,
      message: "用户名必须是5-10个字母或者数字",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "密码不可为空",
      trigger: "blur"
    },
    {
      pattern: /^[a-z0-9]{4,}$/,
      message: "密码必须是3位以上字母或数字",
      trigger: "blur"
    }
  ]
}

export { rules }
