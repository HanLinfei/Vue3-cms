import type { RouteRecordRaw } from "vue-router"
import type { IBreadcrumb } from "@/base-ui/breadcrumb"
// 当路由为main的时候需要跳转到的菜单
let firstMenu: any

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载默认的所有routes
  const allRoutes: RouteRecordRaw[] = []

  // 这个require是webpack下的一个工具 他是一个全局对象
  // 第一个参数是需要加载的文件夹 第二个参数是指 是否要去递归的加载文件夹：
  // 因为文件夹下面还存在文件夹 那么是否继续加载这些文件夹 如果只是加载当前文件夹下面的这个文件
  // 那么这里是false 但是我们这里需要继续往下加载 因为我们文件是在这些文件夹下面的文件夹的
  // 第三个参数是一个正则 这里是指加载以.ts结尾的文件
  const routeFiles = require.context("../router/main", true, /\.ts/)
  // 返回的是一个对象 该对象下面有一个keys方法 该方法返回一个数组 该数组中就包括所有找到的文件路径
  routeFiles.keys().forEach((key) => {
    // eslint-disable-next-line
    const route = require("../router/main" + key.split(".")[1])
    allRoutes.push(route.default)
  })
  // 2.根据菜单获取需要添加的routes

  const _recurseGetRoute = (menus: any[]) => {
    // 现在需要将菜单中的每一个路由拿到 然后判断类型是否为2
    // 如果类型为2 则说明该路由是已经到底 可以直接进行添加
    // 如果类型不为2 那么说明类型可能还是1 那么就说明该路由没有到底 需要继续遍历
    // 那么就直接开始递归遍历 将这个路由下面的子路由传进去 继续对这个子路由进行判断
    // 当路由类型为2时候 那么这个路由是可以直接进行添加的 那么就需要将这个路径路径
    // 和我们实现配好的路由进行一个映射 事先配好的路由已经映射了一个个组件了
    // 映射办法：将菜单中的路由和事先配好的路由进行比较 如果相等 那么就说明有该权限
    // 那么就做一个映射 并且将该路由添加到路由数组中
    if (menus.length) {
      for (const menu of menus) {
        if (menu.type === 2) {
          const route = allRoutes.find((route) => route.path === menu.url)
          if (route) routes.push(route)
          if (!firstMenu) {
            firstMenu = menu
          }
        } else {
          _recurseGetRoute(menu.children)
        }
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}

// 传进一个菜单 传进一个路径 对菜单进行路由匹配 返回匹配的菜单
export function pathMapToMenu(userMenus: any[], currentPath: string): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 传进一个菜单 传进一个路径 获取当前路径的父菜单和路径对应的菜单本身
export function pathMapToBreadcrumb(userMenus: any[], currentPath: string) {
  const breadcrumb: IBreadcrumb[] = []
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumb.push({ name: menu.name })
        breadcrumb.push({ name: findMenu.name })
        return breadcrumb
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 获取改登录角色的所有菜单权限
export function mapMenusToPermissions(userMenus: any[]) {
  const permission: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permission.push(menu.permission)
      }
    }
  }

  _recurseGetPermission(userMenus)
  return permission
}

// 传入菜单 映射叶子节点
export function mapLeafNodeByMenus(userMenus: any[]) {
  const leafMenu: number[] = []
  function _recurseGetLeafMenuKey(userMenus: any[]) {
    for (const menuItem of userMenus) {
      if (menuItem.children) {
        _recurseGetLeafMenuKey(menuItem.children)
      } else {
        leafMenu.push(menuItem.id)
      }
    }
  }
  _recurseGetLeafMenuKey(userMenus)
  return leafMenu
}

export { firstMenu }
