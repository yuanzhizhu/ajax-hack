(function(XHR) {
  var open = XHR.prototype.open;
  var send = XHR.prototype.send;
  XHR.prototype.open = function(method, url, async, user, pass) {
    this._url = url;
    open.call(this, method, url, async, user, pass);
  };
  XHR.prototype.send = function(data) {
    var self = this;
    var oldOnReadyStateChange;
    function onReadyStateChange() {
      if (self.readyState == 4) {
        // 此处可以注入自己的逻辑
        console.log(this.responseText);
      }
      if (oldOnReadyStateChange) {
        oldOnReadyStateChange();
      }
    }
    /*xhr.noIntercept表开关 */
    if (!this.noIntercept) {
      if (this.addEventListener) {
        this.addEventListener("readystatechange", onReadyStateChange, false);
      } else {
        oldOnReadyStateChange = this.onreadystatechange;
        this.onreadystatechange = onReadyStateChange;
      }
    }

    send.call(this, data);
  };
})(XMLHttpRequest);
