import { ref } from "vue"
import pageModal from "@/components/page-modal"
export function usePageModal(
  createCb?: () => void,
  updateCb?: (item?: any) => void
) {
  const defaultInfo = ref({})
  const dialogTitle = ref("")
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  function openPageModalHandler() {
    dialogTitle.value = "新建"
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true
    }
    createCb && createCb()
  }

  function updateHandle(item: any) {
    dialogTitle.value = "编辑"
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true
    }
    updateCb && updateCb(item)
  }
  return [
    pageModalRef,
    defaultInfo,
    dialogTitle,
    openPageModalHandler,
    updateHandle
  ]
}
