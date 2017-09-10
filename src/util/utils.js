export const util = {
  getQueryString: function (name) {
    var reg = new RegExp('[?|&]' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.hash.substr(1).match(reg)
    if (r != null) return decodeURI(r[1])
    return null
  },
  getDom: function (dom) {
    let rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/
    let elm = this.noSpace(dom)
    let selector = elm.match(rquickExpr)
    let elems = []
    let doms
    if (selector[3]) {
      doms = document.getElementsByClassName(selector[3])
      for (let i = 0; i < doms.length; i++) {
        elems.push(doms[i])
      }
    } else if (selector[1]) {
      doms = document.getElementById(selector[1])
      elems.push(doms)
    } else {
      doms = document.getElementsByTagName(selector[2])
      for (let j = 0; j < doms.length; j++) {
        elems.push(doms[j])
      }
    }
    return elems
  },
  noSpace: function (str) {
    return str.replace(/^\s*|\s*$/g, '')
  }
}
