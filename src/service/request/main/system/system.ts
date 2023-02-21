import Request from "../../../index"
import { IDataType } from "../../login/types"
import type { IListType } from "./types"

// 根据条件获得数据
export function getPageListData(url: string, queryInfo: any) {
  return Request.post<IListType>({
    url: url,
    data: queryInfo
  })
}

// 删除数据操作
// url: users/id
export function deletePageData(url: string) {
  return Request.delete<IDataType>({
    url: url
  })
}

// 新建数据
export function createPageData(url: string, pageData: any) {
  return Request.post<IDataType>({
    url,
    data: pageData
  })
}

// 编辑数据
export function editPageData(url: string, pageData: any) {
  return Request.patch<IDataType>({
    url,
    data: pageData
  })
}
