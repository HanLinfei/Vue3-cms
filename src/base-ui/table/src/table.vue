<template>
  <div>
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="header-handler">
            <el-button type="success" size="large">
              {{ btnName }}
            </el-button>
          </slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @select="handleSelectChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        align="center"
        type="index"
        label="序号"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <!-- 使用插槽进行手动控制内容 -->
          <!-- 作用域插槽 这个el-table-column插槽会传来一个属性 row 这个row其实就是当前这一行：propItem -->
          <!-- 如果我们外界觉得这些内容在做一次控制 那么我们可以继续写一个插槽 然后每个插槽的名字由外界来绑定 -->
          <!-- 外界传进来名字 内部进行绑定具名插槽 并且把当前这一行传给外界 属性为row  -->
          <template #default="scope">
            <slot :name="(propItem as any).slotName" :row="scope.row">
              {{ scope.row[(propItem as any).prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :page-sizes="[100, 200, 300, 400]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue"
defineProps({
  listData: {
    type: Array
  },
  propList: {
    type: Array
  },
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  showSelectColumn: {
    type: Boolean,
    default: false
  },
  title: {
    type: String
  },
  btnName: {
    type: String
  }
})
const emit = defineEmits(["selectChange"])
// 发送到外面
const handleSelectChange = (value: any) => {
  emit("selectChange", value)
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .title {
    font-weight: bold;
    font-size: 22px;
  }
}
</style>
