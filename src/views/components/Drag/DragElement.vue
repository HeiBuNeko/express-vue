<template>
  <el-row>
    <el-col :span="24">
      <el-card shadow="hover" class="card-layout">
        <template #header>
          Drag ElementUI 低代码（需ElementUI全局导入）
        </template>
        <el-container class="container">
          <el-aside class="aside">
            <draggable
              v-model="ElTagList"
              class="list"
              item-key="id"
              :group="{ name: 'components', pull: 'clone', put: false }"
            >
              <template #item="{ element }">
                <div class="item">
                  {{ element.tag }}
                </div>
              </template>
            </draggable>
          </el-aside>
          <el-main class="main">
            <draggable v-model="ElUIList" item-key="id" group="components">
              <!-- is: 组件名 v-bind: 动态 props -->
              <template #item="{ element }">
                <component :is="element.tag" v-bind="element.props">
                  {{ element.text }}
                </component>
              </template>
            </draggable>
          </el-main>
        </el-container>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

const ElTagList = ref([
  {
    id: 1,
    tag: 'el-button',
    props: {
      type: 'primary',
    },
    text: '按钮',
  },
  {
    id: 2,
    tag: 'el-input',
    props: {
      placeholder: '请输入内容',
    },
  },
])

const ElUIList = ref([
  {
    id: 1,
    tag: 'el-button',
    props: {
      type: 'primary',
    },
    text: '按钮',
  },
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
.main {
  width: 100%;
}
</style>
