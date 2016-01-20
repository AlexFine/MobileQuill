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
    $scope.picText = function(){

      var canvas = document.getElementById('c')

      var ctx = canvas.getContext('2d');
      ctx.font = '30px "Arial Black"'
      ctx.fillText('Hell0 World', 100, 40)
      // ctx.fillText("囚犯離奇掙脫囚犯離奇掙脫", 100, 40)
      ctx.font = '30px "Times New Roman"'
      ctx.fillText('from beyond', 100, 80)
      // ctx.fillText('2小時可換乘2次2小時可換乘2次', 100, 80)
      ctx.font = '30px sans-serif'
      ctx.fillText('the Cosmic Void', 100, 120)
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
        $scope.picText();
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
