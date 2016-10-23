angular.module('gifApp')
       .controller('GifController', GifController);

function GifController(giphyService){
  console.log('GifController loaded');
  var ctrl = this;

  ctrl.getRandomGif = function() {
    console.log('clicked on the button');
    giphyService.getRandomGif()
                .then(function(gif){
                  ctrl.randomGifURL = gif.image_url;
                });
  };

ctrl.addFav = function(comment, url) {
    console.log('before prevDefault');
    // title=someTitle&author=someAuthor&published=today
    var favData = {comment:comment, url:url};
    console.log(favData);
    giphyService.addFav(favData);

  };

ctrl.getFav = function () {
  ctrl.group = {};
  giphyService.getFav().then(function(response){
    ctrl.group = response;
    console.log(ctrl.group);

  });
};

ctrl.displayFav = function(response) {
  console.log(response);
  var $list = $('#fav-list');
  $list.empty();
  response.forEach(function(fav) {
    var $li = $('<li></li>');
    var $form = $('<form></form>');
    $form.append('<input type="text" name="url" value="' + gif.gif_url + '"/>');
    $form.append('<input type="text" name="comment" value="' + gif.comment + '"/>');
  });
};



  ctrl.searchForGif = function(searchTerm) {
    console.log('Got search term from the view:', searchTerm);

    giphyService.search(searchTerm)
                .then(function(gifs) {
                  ctrl.searchedGifs = gifs;
                });
  };
  ctrl.getFav();
}
