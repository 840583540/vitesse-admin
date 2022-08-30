<script setup lang="tsx">
import { useRoute } from 'vue-router'
import { ElMenuItem, ElSubMenu } from 'element-plus'
import type { IMenu } from '~/enums/menus'
import { MENUS } from '~/enums/menus'
import LOGO from '~/assets/images/logo.svg'
const route = useRoute()
const commonStore = useCommonStore()

const activeIndex = computed(() => route.path)
const MenuComponent = {
  props: ['menus'],
  render(context: any) {
    const menus = context.menus
    return (menus.map((menu: IMenu) => {
      if (menu.children) {
        return (
          <ElSubMenu index={menu.path} v-slots={{
            title: () => (
              <>
                {menu.icon && <i className={`inline-block ${menu.icon} mr-2`} />}
                <span>{ menu.name }</span>
              </>
            ),
            default: () => <MenuComponent menus={menu.children} />,
          }}>
          </ElSubMenu>
        )
      }
      else {
        return (
          <ElMenuItem index={menu.path}>
            {menu.icon && <i className={`inline-block ${menu.icon} mr-2`} />}
            <span>{ menu.name }</span>
          </ElMenuItem>
        )
      }
    }))
  },
}
</script>

<template>
  <div class="h-full" style="background-color: #fff">
    <a href="/" class="text-white flex justify-center leading-55px h-55px bg-[#548cec]">
      <img :src="LOGO" alt="admin" class="w-10 inline-block mr-2">
      <span v-if="!commonStore.isCollapse">后台管理系统</span>
    </a>
    <el-menu
      :collapse="commonStore.isCollapse"
      :default-active="activeIndex"
      class="aside-menu w-full"
      background-color="#fff"
      text-color="#404040"
      active-text-color="#409EFF"
      router
    >
      <MenuComponent :menus="MENUS" />
    </el-menu>
  </div>
</template>

<style lang="css">
.aside-menu {
    border-right: none;
}
.aside-menu:not(.el-menu--collapse) {
    width: 200px;
}
.aside-menu .el-menu-item.is-active {
    background: rgba(232, 240, 255, 0.992);
    border-right: 2px solid #409EFF;
}
.aside-menu .el-menu-item:hover {
    background: rgba(232, 240, 255, 0.992);
}
</style>
