export const util = {
  getQueryString: function (name) {
    var reg = new RegExp('[?|&]' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.hash.substr(1).match(reg)
    if (r != null) return decodeURI(r[1])
    return null
  }
}
