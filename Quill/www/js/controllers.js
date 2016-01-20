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
    $scope.picText = function(imageURI){
      $scope.text = "ran picTExt"
      canvas = document.getElementById('c');





      //document.body.appendChild(canvas);
      //canvas =document.getElementById("canvas")

      console.log(canvas);
      console.log(canvas)
      $scope.text = "created canvas"

      Tesseract.recognize(canvas,{
        tessedit_char_blacklist:'',
        progress: function(e){
          console.log(e)
          $scope.text = e.reconized
        }
      }).then( function(d){
        $scope.text = d.text
        console.log(d.text)
      } )


      //$scope.text = "test3"
    }
    $scope.getPhoto = function() {

      Camera.getPicture().then(function(imageURI) {
        console.log(imageURI);
        $scope.picText(imageURI);

        $scope.text = "test"

        //var myData = context.getImageData(0, 0, img.width, img.height);
        //$scope.text = "data:image/jpeg;base64," + imageURI
        var img = new Image();
        img.src = imageURI;
        $scope.lastPhoto = imageURI;
        $scope.text = imageURI
        canvas = document.getElementById('c');
        canvas.height = img.height;
        canvas.width = img.width;


        var ctx = canvas.getContext('2d');

        // create new image object to use as pattern

        img.onload = function(){

          // Create pattern and don't repeat!
          var ptrn = ctx.createPattern(img, 'no-repeat');
          ctx.fillStyle = ptrn;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

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
