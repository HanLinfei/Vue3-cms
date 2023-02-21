import { ILoginState } from "./login/types"
import { ISystemState } from "./main/system/types"
import { IDashboardState } from "./main/analysis/types"
interface IRootState {
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}
export { IRootState }

// store中的state的类型声明
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboardModule: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
