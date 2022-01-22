import ContextMenu from '../components/ContextMenu.vue'
import { App, createApp } from 'vue'

/**
 * @x 菜单X坐标
 * @y 菜单Y坐标
 * @width 菜单宽度
 * @height 菜单高度
 * @itemHeight 菜单项高度
 * @maxHeight 菜单最大高度
 * @bgColor 菜单背景颜色
 * @hoverBgColor 鼠标移入项背景颜色
 * @hoverColor 鼠标移入项文字颜色
 * @customLayoutClass 菜单自定义类名
 * @customItemClass 菜单项自定义类名
 * @menuList 菜单项列表
 */
export interface ContextMenuOptions {
  x?: number
  y?: number
  width?: number | string
  height?: number | string
  itemHeight?: number | string
  maxHeight?: number | string
  bgColor?: string
  hoverBgColor?: string
  hoverColor?: string
  customLayoutClass?: string | string[]
  customItemClass?: string | string[]
  menuList: ContextMenuItem[]
}

/**
 * @text 菜单项文本
 * @icon 菜单项左侧图标
 * @onClick 菜单项点击回调
 * @children 菜单项子菜单项
 */
export interface ContextMenuItem {
  text: string | number
  icon?: string
  renderKey?: string | number
  onClick?: (...args: any[]) => any
  children?: ContextMenuItem[]
}

let vm: App | null = null
let container: HTMLElement | null = null
export const createContextMenu = (options: ContextMenuOptions): void => {
  createContextMenu.destroy()
  vm = createApp(ContextMenu, { options })
  container = document.createElement('div')

  vm.mount(container)
  document.body.appendChild(container)


  document.body.addEventListener('click', ($event: MouseEvent) => {
    vm && vm.unmount()
    container && document.body.removeChild(container) && (container = null)
    $event.stopPropagation()
  })

}

createContextMenu.destroy = function () {
  vm && vm.unmount()
  container && document.body.removeChild(container) && (container = null)
}

export const createContextItemMenu = (options: ContextMenuOptions): App => createApp(ContextMenu, { options })

