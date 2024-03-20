import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore(
  'login',
  () => {
    const token = ref('')
    const setToken = (val: string) => {
      token.value = val
    }
    return { token, setToken }
  },
  {
    persist: true
  }
)
