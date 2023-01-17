// 开发环境:development
// 生产环境:production
// 测试环境:test
let BASE_URL = ""
const TIME_OUT = 2000
if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://152.136.185.210:4000"
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://152.136.185.210:4000"
} else {
  BASE_URL = "http://localhost:6000"
}

export { BASE_URL, TIME_OUT }
