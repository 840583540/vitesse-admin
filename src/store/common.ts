import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
  // 折叠菜单
  const isCollapse = ref(false)
  const setMenuCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  return {
    isCollapse,
    setMenuCollapse,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot))
