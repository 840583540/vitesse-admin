/**
 * 菜单文件
 */

export interface IMenu {
  name: string
  path?: string
  icon?: string
  children?: IMenu []
}

export const MENUS: IMenu [] = [
  {
    name: 'test0',
    path: '/name',
    icon: 'i-carbon:home',
  },
  {
    name: '员工管理',
    path: '/staff-management',
    icon: 'i-carbon:home',
    children: [
      {
        name: '员工管理',
        path: '/staff-management',
        icon: 'i-carbon:home',
      },
      {
        name: '测试',
        path: '/staff-management/test',
        icon: 'i-carbon:home',
      },
    ],
  },
]
