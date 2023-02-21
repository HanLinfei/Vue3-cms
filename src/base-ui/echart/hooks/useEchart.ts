import * as echarts from "echarts"

import ChinaMapData from "../data/china.json"

echarts.registerMap("china", ChinaMapData)

export default function (el: HTMLElement) {
  const eChartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    eChartInstance.setOption(options)
  }

  window.addEventListener("resize", () => {
    eChartInstance.resize()
  })

  return {
    eChartInstance,
    setOptions
  }
}
