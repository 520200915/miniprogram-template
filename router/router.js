const _routeHooks = Symbol('_routeHooks')
const _query = Symbol('_query')
const _routerList = Symbol('_routerList')
import watch from '../utils/watch.js'
const generateRoutList = routerList => {
  let _routerList = routerList
  try {
    __wxConfig &&
      __wxConfig.tabBar &&
      __wxConfig.tabBar.list &&
      (_routerList = routerList.map(item => {
        return {
          ...item,
          isTab: __wxConfig.tabBar.list.some(({
              pagePath
            }) =>
            item.url.includes(pagePath.replace('.html', ''))
          )
        }
      }))
  } catch (err) {}
  return _routerList
}
class Router {
  [_query] = {};
  [_routeHooks] = [];
  [_routerList] = [];
  constructor(router) {
    this[_routerList] = generateRoutList(router)
    wx.onAppRoute &&
      wx.onAppRoute(e => {
        const thisPage = this.getPageInstance()
        if (thisPage) {
          const onRoute = thisPage.onRoute
          thisPage.$query = this[_query]
          typeof onRoute === 'function' && onRoute(this[_query])
          watch(thisPage)
        }
        this[_routeHooks].forEach(fn => {
          try {
            typeof fn === 'function' && fn(e, this[_query], this[_routerList])
          } catch (err) {
            console.log(err)
          }
        })
        this[_query] = {}
      })
  }
  /**获取路由列表 */
  getRouterList(){
    return this[_routerList]
  }
  /**获取页面对象实例 */
  getPageInstance = (size = 1) => {
    const pages = getCurrentPages()
    return pages[pages.length - size]
  }
  checkRouter(route, events) {
    this[_query] = events || {}
    const [_parent, _name] = route.split('.')
    let name = route
    let parent = this.getPageInstance().__route__.split('/')[0]
    let query = ''
    if (route.includes('?')) {
      let [_name_, _query_] = route.split('?')
      query = `?${_query_}`
      name = _name_
    }
    if (_parent && _name) {
      name = _name.split('?')[0]
      parent = _parent
    }
    const routerMapItem = this[_routerList].find(item => item.parent === parent && item.name === name)
    if (!routerMapItem) {
      console.error('找不到路由')
      return
    }
    return {
      routerMapItem,
      query
    }
  }
  /**页面跳转
   * 
   */
  jump(e) {
    const item = e.currentTarget.dataset
    this.go(item.url, item)
  }
  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 ||
   * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 $router.back() 可以返回到原页面。小程序中页面栈最多十层
   */
  go(route, events) {
    let {
      routerMapItem,
      query
    } = this.checkRouter(route, events)
    if (routerMapItem.isTab) {
      wx.switchTab({
        url: routerMapItem.url
      })
    } else {
      wx.navigateTo({
        url: `${routerMapItem.url}${query}`,
        success(res) {
          if (events) res.eventChannel.emit('getData', events)
        }
      })
    }
  }
  /**关闭所有页面，打开到应用内的某个页面 */
  reLaunch(route, events) {
    let {
      routerMapItem,
      query
    } = this.checkRouter(route, events)
    wx.reLaunch({
      url: `${routerMapItem.url}${query}`,
    })
  }
  /**关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。 */
  redirectTo(route, events) {
    let {
      routerMapItem,
      query
    } = this.checkRouter(route, events)
    wx.redirectTo({
      url: `${routerMapItem.url}${query}`,
    })
  }
  /**prevPageSize = 1
   * 返回上prevPageSize页
   * callBack返回上prevPageSize页对象  */
  back(callBack, prevPageSize = 1) {
    let prevPage = this.getPageInstance(Number(prevPageSize) + 1)
    if (callBack && 'function' === typeof callBack) callBack(prevPage)
    wx.navigateBack({
      delta: prevPageSize
    })
  }
  /**获取上一个页面传的数据 */
  getData(callBack) {
    let page = this.getPageInstance()
    let data = page.getOpenerEventChannel()
    if (Object.keys(data).length !== 0) {
      data.on('getData', res => {
        callBack(res)
      })
    }
  }
  onRoute(fn) {
    this[_routeHooks].push(fn);
    return () => {
      const i = list.indexOf(fn);
      if (i > -1) list.splice(i, 1);
    };
  }
}

export default Router