import { ILoginState } from "./login/types"
import { ISystemState } from "./main/system/types"

interface IRootState {}
export { IRootState }

// store中的state的类型声明
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
