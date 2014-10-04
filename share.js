var FBShare = {
  share: function(image) {
    FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        FBShare.postImage(response.authResponse.accessToken, "EmojiBrush", "image/png", decodedPng, "www.nobodysofnyc.com/emoji-brush");
      } else if (response.status === "not_authorized") {
        FB.login(function(response) {
          FBShare.postImage(response.authResponse.accessToken, "EmojiBrush", "image/png", decodedPng, "www.nobodysofnyc.com/emoji-brush");
        }, {scope: "publish_stream"});
      } else {
        FB.login(function(response)  {
          FBShare.postImage(response.authResponse.accessToken, "EmojiBrush", "image/png", decodedPng, "www.nobodysofnyc.com/emoji-brush");
        }, {scope: "publish_stream"});
      }
    });
  },

  postImage: function(image) {
    console.log(image);
  }
}
