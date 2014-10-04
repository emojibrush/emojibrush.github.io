function FacebookShare() {

}

FacebookShare.prototype = {
  login: function(callback) {
    if (FB) {
      FB.getLoginStatus(function(response) {
        if (callback) {
          callback(response);
        }
      });
    }
  }
}
