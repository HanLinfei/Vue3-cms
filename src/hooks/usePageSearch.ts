import { ref } from "vue"
import pageContent from "@/components/page-content"
export function usePageSearch(): any {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }

  const handleQueryClick = (queryInfo: any): any => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  return [pageContentRef, handleResetClick, handleQueryClick]
}
