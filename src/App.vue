<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: import.meta.env.VITE_NAME,
  meta: [
    { name: 'description', content: import.meta.env.VITE_NAME },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
const userStore = useUserStore()
const token = localStorage.getItem('token') || ''
const userInfo = localStorage.getItem('user_info')
userStore.setToken(token)
userInfo && userStore.setUserInfo(JSON.parse(userInfo))

if (!token) {
  const router = useRouter()
  router.push('/login')
}
</script>

<template>
  <RouterView />
</template>
