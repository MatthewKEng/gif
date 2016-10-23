angular.module('gifApp')
       .service('giphyService', GiphyService);

function GiphyService($http) {
  var api = 'http://api.giphy.com/v1/gifs';
  var key = 'dc6zaTOxFJmzC';


  this.getRandomGif = function() {
    return $http.get(api + '/random', {
      params: {
        api_key: key,
        rating: 'y'
      }
    }).then(function(response){
      console.log(response.data.data.url);
      return response.data.data;
    });
  };

  this.addFav = function(favData) {
    console.log('from service controller', favData);
    return $http.post('/favs', favData)
      .then(function (response) {
        console.log('respone=', response);
        return response;
      });

  };


  this.getFav = function() {
    return $http.get('/favs')
      .then(function (response) {
        return response.data;
    });
  }

  this.displayFav = function(response) {
    console.log(response);
  }
    // var list = $('#fav-list');
    // list.empty();
    // response.forEach(function(fav) {
    //   var li = $('<li></li>');
    //   var form = $('<form></form>');
    //   form.append('<input type="text" name="url" value="' + gif.gif_url + '"/>');
    //   form.append('<input type="text" name="comment" value="' + gif.comment + '"/>');



  this.search = function(query) {
    return $http.get(api + '/search', {
      params: {
        api_key: key,
        rating: 'y',
        q: query
      }
    }).then(function(response){
      console.log('Got response from API', response);
      return response.data.data;
    });
  };

  // this.addGif = function() {
  //   $http.post('/fav') {
  //
  //   }).then(function(response){
  //     return response.data.data;
  //   });
  // };

}
