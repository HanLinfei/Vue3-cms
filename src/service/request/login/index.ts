import request from "../../index"
import type { IAccount, IDataType, ILoginResult } from "./types"

enum loginAPI {
  AccountLogin = "/login", //login
  LoginUserInfo = "/users", //  /users/id
  UserMenus = "/role" //  /role/id/menu
}

// 根据账号和密码 返回token和用户id和用户名
export function accountLoginRequest(account: IAccount) {
  return request.post<IDataType<ILoginResult>>({
    url: loginAPI.AccountLogin,
    data: account
  })
}

// 根据id 返回用户信息
export function requestUserInfoById(id: number) {
  return request.get<any>({
    url: `${loginAPI.LoginUserInfo}/${id}`,
    showLoading: false
  })
}

// 根据id返回用户的权限菜单
export function requestUserMenusById(id: number) {
  return request.get<any>({
    url: `${loginAPI.UserMenus}/${id}/menu`,
    showLoading: false
  })
}
