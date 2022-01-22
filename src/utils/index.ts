/**
 * 生成随机字符串
 * @returns 
 */
export function randomStr(): string {
  return Math.random().toString(36).substr(2)
}

/**
 * 获取dom元素的 X Y 坐标
 * @param ele 
 * @returns 
 */
export const getDomXY = (ele: HTMLElement) => {
  var x = 0, y = 0;
  if (ele.getBoundingClientRect) {
    var box = ele.getBoundingClientRect();
    var D = document.documentElement;
    x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;
    y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop
  }
  else {
    for (; ele != document.body; x += ele.offsetLeft, y += ele.offsetTop, ele = ele.offsetParent as HTMLElement) { }
  }
  return {
    x: x,
    y: y
  }
}