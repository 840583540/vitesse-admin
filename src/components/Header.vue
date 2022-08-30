<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()
const commonStore = useCommonStore()
const router = useRouter()
const onChangeMenuCollapse = () => {
  commonStore.setMenuCollapse()
}

const loginOut = () => {
  localStorage.clear()
  router.push('/login')
}
const route = useRoute()
</script>

<template>
  <nav class="flex items-center h-full w-full justify-between">
    <div class="flex items-center">
      <span
        class="inline-block cursor-pointer mr-2" :class="[
          commonStore.isCollapse ? 'i-carbon:text-indent-more' : 'i-carbon:text-indent-less',
        ]"
        @click="onChangeMenuCollapse"
      />
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          {{ route.meta.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.userInfo.username || '默认用户' }}
          <i class="inline-block i-carbon:chevron-sort-down" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="loginOut">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </nav>
</template>
