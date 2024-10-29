<template>
  <el-col :span="12">
    <el-card shadow="hover" class="card-layout">
      <template #header> Drag 底层原理 </template>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="list">
            <div
              class="item"
              v-for="(item, index) in list"
              :key="item.id"
              :draggable="true"
              @dragstart="onDragStart(index)"
              @dragover="onDragOver(index)"
              @dragend="onDragEnd"
            >
              {{ item.name }}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <pre class="data">{{ list }}</pre>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 高亮下标
const activeIndex = ref(-1)
// 列表数据
const list = ref([
  { id: 10, name: 'DragItem 0' },
  { id: 11, name: 'DragItem 1' },
  { id: 12, name: 'DragItem 2' },
  { id: 13, name: 'DragItem 3' },
  { id: 14, name: 'DragItem 4' },
])

// 拖拽开始
const onDragStart = (index: number) => {
  // 更新下标
  activeIndex.value = index
}

const onDragOver = (index: number) => {
  // 提取数据
  const draggingItem = list.value.splice(activeIndex.value, 1)
  // 添加数据
  list.value.splice(index, 0, ...draggingItem)
  // 更新下标
  activeIndex.value = index
}

const onDragEnd = () => {
  // 恢复下标
  activeIndex.value = -1
}
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .item {
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 10px;
    cursor: move;
    &:hover {
      color: #000;
      background-color: #eee;
    }
  }
}
</style>
