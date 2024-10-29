<template>
  <el-col :span="12">
    <el-card shadow="hover" class="card-layout">
      <template #header> Drag Vue插件 </template>
      <el-row :gutter="20">
        <el-col :span="12">
          <draggable v-model="list" class="list" item-key="id">
            <template #item="{ element }">
              <div class="item">
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </el-col>
        <el-col :span="12">
          <pre>{{ list }}</pre>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

const list = ref([
  { id: 10, name: 'DragPlugin 0' },
  { id: 11, name: 'DragPlugin 1' },
  { id: 12, name: 'DragPlugin 2' },
  { id: 13, name: 'DragPlugin 3' },
  { id: 14, name: 'DragPlugin 4' },
])
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
