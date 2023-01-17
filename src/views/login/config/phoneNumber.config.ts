// 编写校验规则
const rules = {
  name: [
    {
      message: "手机号不可为空",
      required: true, //该选项必传
      trigger: "blur" //什么时候进行验证，目前是失去焦点时候验证
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "手机号必须是11位",
      trigger: "blur"
    }
  ],
  code: [
    {
      message: "验证码不可为空",
      required: true,
      trigger: "blur"
    }
  ]
}

export { rules }
