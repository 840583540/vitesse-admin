import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const setToken = (val: string) => {
    token.value = val
    localStorage.setItem('token', val)
  }

  const userInfo = ref<any>({})
  const setUserInfo = (val: any) => {
    userInfo.value = val
    localStorage.setItem('user_info', JSON.stringify(val))
  }
  const loginOut = () => {
    token.value = ''
    localStorage.clear()
  }

  return {
    token,
    setToken,
    userInfo,
    setUserInfo,
    loginOut,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
