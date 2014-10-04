/*
https://graph.facebook.com/me/emojibrush:create?
access_token=ACCESS_TOKEN&
method=POST&
drawing=http%3A%2F%2Fsamples.ogp.me%2F1542204659325075
*/

var FBShare = {
  share: function(image) {
    FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        FBShare.postImage(response.authResponse.accessToken, "EmojiBrush", "image/png", decodedPng, "www.nobodysofnyc.com/emoji-brush");
      } else if (response.status === "not_authorized") {
        FB.login(function(response) {
          console.log(response);
          FBShare.postImage(response.authResponse.accessToken, "EmojiBrush", "image/png", decodedPng, "www.nobodysofnyc.com/emoji-brush");
        }, {scope: "publish_stream"});
      } else {
        FB.login(function(response)  {
          console.log(response);
          FBShare.postImage(response.authResponse.accessToken, "EmojiBrush", "image/png", decodedPng, "www.nobodysofnyc.com/emoji-brush");
        }, {scope: "publish_stream"});
      }
    });
  },

  postImage: function(image) {
    console.log(image);
  }
}
