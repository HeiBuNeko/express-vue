<template>
  <el-row>
    <el-col :span="24">
      <el-card
        shadow="hover"
        class="card-layout"
      >
        <template #header>
          Drag 拖拽编组
        </template>
        <el-row :gutter="20">
          <el-col :span="6">
            <draggable
              v-model="listA"
              class="list"
              item-key="id"
              group="group"
            >
              <template #item="{ element }">
                <div class="item">
                  {{ element.name }}
                </div>
              </template>
            </draggable>
          </el-col>
          <el-col :span="6">
            <draggable
              v-model="listB"
              class="list"
              item-key="id"
              group="group"
            >
              <template #item="{ element }">
                <div class="item">
                  {{ element.name }}
                </div>
              </template>
            </draggable>
          </el-col>
          <el-col :span="6">
            <pre>{{ listA }}</pre>
          </el-col>
          <el-col :span="6">
            <pre>{{ listB }}</pre>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

const listA = ref([
  { id: 10, name: 'DragGroupA 0' },
  { id: 11, name: 'DragGroupA 1' },
  { id: 12, name: 'DragGroupA 2' },
  { id: 13, name: 'DragGroupA 3' },
  { id: 14, name: 'DragGroupA 4' }
])

const listB = ref([
  { id: 20, name: 'DragGroupB 0' },
  { id: 21, name: 'DragGroupB 1' },
  { id: 22, name: 'DragGroupB 2' },
  { id: 23, name: 'DragGroupB 3' },
  { id: 24, name: 'DragGroupB 4' }
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
