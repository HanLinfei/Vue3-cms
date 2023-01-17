import Request from "../../../index"
import type { IListType } from "./types"

export function getPageListData(url: string, queryInfo: any) {
  return Request.post<IListType>({
    url: url,
    data: queryInfo
  })
}
