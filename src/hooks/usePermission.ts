import { useStore } from "vuex"
// 校验该角色是否具备权限
export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  if (pageName === "user") {
    pageName = "users"
  }
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permissions.find((item: string) => item === verifyPermission)
}
