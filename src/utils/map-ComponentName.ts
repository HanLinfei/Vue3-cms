/**  传进来一个对象 传进来一个属性名，将属性对应的组件名进行映射驼峰命名
 el-icon-line-round  =>  LineRound
 1. 切割数组 => ["el","icon","line","round"]
 2. 剥离前缀 => ["line","round"]
 3. 首字母转大写 进行完整拼接:
    3.1 遍历数组 取到每一项名字 => "line"  "round"
    3.2 遍历每一个名字 取到每一个字符  "l" "i" "n" "e"     "r" "o" "u" "n" "d"
    3.3 首字符置为大写"L" "i" "n" "e"     "R" "o" "u" "n" "d"
    3.4 拼接"Line"  "Round"
    3.5 完整的拼接"LineRound"
*/
export function mapComponentNameByString<T>(
  icons: T[],
  key: keyof T
): string[] {
  const humpIconNames = []
  for (const item of icons) {
    // 以 "-" 来切割 分成数组
    const iconNameSplited = (item[key] as unknown as string).split("-")
    // 剥离前缀 "el-icon"
    const iconNamePeeledPrefix = []
    for (let i = 0; i < iconNameSplited.length; i++) {
      if (i > 1) {
        iconNamePeeledPrefix.push(iconNameSplited[i])
      }
    }
    // 取出每一个名字 首字母转大写 并且进行拼接
    let fullHumpIconName = ""
    for (let i = 0; i < iconNamePeeledPrefix.length; i++) {
      // 首字母转大写 并且进行拼接
      let fullIconName = ""
      for (let j = 0; j < iconNamePeeledPrefix[i].length; j++) {
        if (j === 0) {
          // 首字母大写
          fullIconName += iconNamePeeledPrefix[i][j].toLocaleUpperCase()
        } else {
          fullIconName += iconNamePeeledPrefix[i][j]
        }
      }
      fullHumpIconName += fullIconName
    }
    humpIconNames.push(fullHumpIconName)
  }
  return humpIconNames
}
