<script setup lang="tsx">
import { useRoute, useRouter } from 'vue-router'
import { ElMenuItem, ElSubMenu } from 'element-plus'
import type { IMenu } from '~/enums/menus'
import { MENUS } from '~/enums/menus'
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
  <div class="h-full" style="background-color: #282c34">
    <a href="/" class="text-white text-center block leading-55px h-55px">
      <i v-if="commonStore.isCollapse" class="i-carbon-show-data-cards inline-block" />
      <span v-else>后台管理系统</span>
    </a>
    <el-menu
      :collapse="commonStore.isCollapse"
      :default-active="activeIndex"
      class="aside-menu w-full"
      background-color="#282c34"
      text-color="#fff"
      active-text-color="#409EFF"
      router
    >
      <MenuComponent :menus="MENUS" />
    </el-menu>
  </div>
</template>

<style lang="css" scoped>
.aside-menu {
    border-right: none;
}
.aside-menu:not(.el-menu--collapse) {
    width: 266px;
}
.aside-menu .el-menu-item.is-active {
    background: #1890ff;
}
</style>
