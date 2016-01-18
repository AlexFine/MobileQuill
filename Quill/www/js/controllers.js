angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope) {})

.controller('NotesCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('NoteDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

  .controller('Camera', function($scope, Camera){
    $scope.function =
    $scope.picText = function(img){

      var canvas = document.getElementById('c')
      $scope.text = "test2"

      Tesseract.recognize(canvas,{
        tessedit_char_blacklist:'',
        progress: function(e){
          console.log(e)
          $scope.text = e
        }
      }).then( function(d){
        $scope.text = d
      } )
    }
    $scope.getPhoto = function() {
      console.log('Getting camera');
      Camera.getPicture().then(function(imageURI) {
        console.log(imageURI);

        $scope.lastPhoto = imageURI;
        $scope.text = imageURI
        var canvas = document.getElementById('c');
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        // Get a 2D context.
        var ctx = canvas.getContext('2d');

        // create new image object to use as pattern
        var img = new Image();
        img.src = imageURI;
        img.onload = function(){
          // Create pattern and don't repeat!
          var ptrn = ctx.createPattern(img,'no-repeat');
          ctx.fillStyle = ptrn;
          ctx.fillRect(0,0,canvas.width,canvas.height);



        }
        $scope.text = "test"
        $scope.picText(ctx);
        //var myData = context.getImageData(0, 0, img.width, img.height);
        //$scope.text = "data:image/jpeg;base64," + imageURI


      }, function(err) {
        console.err(err);
      });





    }
  })
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
