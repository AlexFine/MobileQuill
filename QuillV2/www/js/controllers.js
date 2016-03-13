angular.module('starter.controllers', [])

.controller('PhotoCtrl', function ($scope, Camera) {
    $scope.function =
        $scope.picText = function () {
            var canvas = document.getElementById('c')
            canvas.width = 400
            canvas.height = 400
            var ctx = canvas.getContext('2d');
            //ctx is a common name for canvas attributes 
            ctx.font = '30px "Arial Black"'
            ctx.fillText('Hello World', 100, 40)
                //Text for hello world
            ctx.font = '30px "Times New Roman"'
            ctx.fillText('from beyond', 100, 80)
                //text for from beyond 
            ctx.font = '30px sans-serif'
            ctx.fillText('the Cosmic Void', 100, 120)
            console.log(canvas)
                //Setting up canvas above, doing the magic here
            Tesseract.recognize(canvas, {
                tessedit_char_blacklist: 'zzbp',
                progress: function (zzbp) {
                    $scope.text = zzbp.reconized
                    console.log(zzbp)
                }
            }).then(function (d) {
                $scope.text = d.text
                console.log(d.text)
            }, function (err) {
                console.log(err);
                alert(err);
            });
        }

    //    $scope.getPhoto = function(){
    //        console.log('Getting camera');
    //        Camera.getPicture().then(function(imageURI) {
    //            console.log(imageURI);
    //            
    //            $scope.lastPhoto = imageURI;
    //            $scope.text = imageURI
    //            var canvas = document.getElementById('c');
    //            canvas.height = window.innerHeight;
    //            canvas.width = window.innerWidth;
    //            
    //            var ctx = canvas.getContext('2d');
    //            
    //            var img = new Image ();
    //            img.src = imageURI;
    //            img.onload = function(){
    //                var ptrn = ctx.createPatter(img, 'no-repeat');
    //                ctx.fillStyle = ptrn; 
    //                ctx.fillRect(0,0,canvas.width,canvas.height);
    //                
    //                
    //            }
    //            $scope.text = "test"
    //            $scope.picText();
    //        }, function (err){
    //            console.log(err);
    //            alert(err);
    //            
    //        });
    //    }
    $scope.lastPhoto = "../img/text.png";
    $scope.status = "start status";
    $scope.getPhoto = function () {
        Camera.getPicture().then(function (imageURI) {
            $scope.status = "get picture";
            console.log(imageURI);
            $scope.lastPhoto = imageURI;
            $scope.convertToCanvas(imageURI);
        }, function (err) {
            console.err(err);
        }, {
            quality: 100,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false
        });
    };
    var img = new Image();
    img.src = '../img/text.png';
        $scope.convertToCanvas = function(lastPhoto){
            $scope.status = "STARTED REACHED THIS PLACE 1" + lastPhoto;
        
            var canvas2 = document.getElementById("canvas2");
            $scope.status = "STARTED REACHED THIS PLACE 2" + lastPhoto;
            
            canvas2.width = lastPhoto.width;
            $scope.status = "STARTED REACHED THIS PLACE 3" + lastPhoto;
        
            canvas2.height = lastPhoto.height;
            $scope.status = "STARTED REACHED THIS PLACE 4" + lastPhoto;
      
            canvasbanana = canvas2.getContext("2d");
            $scope.status = "STARTED REACHED THIS PLACE 5" + lastPhoto;
         
            canvasbanana.drawImage(img, 0, 0);
       $scope.status = "STARTED REACHED THIS PLACE 6" + lastPhoto;
       
            return canvasbanana;
         $scope.status = "finish convert to canvas";
        }
        
        
        
})

.controller('NotesCtrl', function ($scope, Notes) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.notes = Notes.all();
    $scope.remove = function (note) {
        Notes.remove(note);
    };
})

.controller('NoteDetailCtrl', function ($scope, $stateParams, Notes) {
    $scope.note = Notes.get($stateParams.noteId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});