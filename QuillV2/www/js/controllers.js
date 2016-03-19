angular.module('starter.controllers', ['starter.services'])

.controller('PhotoCtrl', function ($scope, Camera) {


    $scope.lastPhoto = "../img/text.png";
    $scope.status = "start status";
    $scope.summary;

    $scope.getPhoto = function () {
        Camera.getPicture().then(function (imageURI) {
            $scope.status = "get picture";
            //console.log(imageURI);
            $scope.lastPhoto = imageURI;
            var temp = $scope.convertToCanvas(imageURI);
            $scope.convertToCanvas(imageURI);
            console.log("called the convertToCanvas Function")

        }, function (err) {
            console.err(err);
        }, {
            quality: 100,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false
        });
    };

    $scope.convertToCanvas = function (lastPhoto, $http) {
        // console.log("reached last photo")
        // lastPhoto.src = lastPhoto;
        // console.log("processed last photo")

        // $scope.status = "STARTED REACHED THIS PLACE 1" + lastPhoto;

        // var canvas2 = document.getElementById("canvas2");
        // $scope.status = "STARTED REACHED THIS PLACE 2" + lastPhoto;

        // canvas2.width = lastPhoto.width;
        // $scope.status = "STARTED REACHED THIS PLACE 3" + lastPhoto;

        // canvas2.height = lastPhoto.height;
        // $scope.status = "STARTED REACHED THIS PLACE 4" + lastPhoto;

        // canvasbanana = canvas2.getContext("2d");
        // $scope.status = "STARTED REACHED THIS PLACE 5" + lastPhoto;

        // var img = new Image();
        // img.src = lastPhoto;
        // img.width = "1000";
        // img.height = "1000";
        // canvas2.width = img.width;
        // canvas2.height = img.height;
        // console.log(img.width + " " + img.height);
        // img.onload = function () {
        //     canvasbanana.drawImage(img, 0, 0);
        // }
        // $scope.status = "STARTED REACHED THIS PLACE 6" + lastPhoto;

        // return canvasbanana;
        // $scope.picText();

        // $scope.status = "finish convert to canvas";
        // $scope.status = "STARTED REACHED THIS PLACE 6" + lastPhoto;
canvas.toDataUrl()


        // return canvasbanana;

        // $scope.status = "finish convert to canvas";

        var url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDdYPAS4Mji2KbCq5PWw3cIzknwxNpOuqc";
        var postReq = {
            "requests":[
                {
                "image":{
                    "content":
                },
                "features":[
                {
                    "type":"LABEL_DETECTION",
                    "maxResults":"10"
                }
            ]
        }
    ]
}

    $http.post(url, postReq).then(function(res) {
        console.log(res.textAnnotations.description);
    });
    }

    $scope.picText = function () {
        var canvas = document.getElementById('canvas2');


        Tesseract.recognize(canvas, {
            tessedit_char_blacklist: 'zzbp',
            progress: function (zzbp) {
                $scope.text = zzbp.reconized
                console.log(zzbp);

            }
        }).then(function (d) {
            console.log(d.text);
            $scope.api(d.text);
            //$scope.text = d.text
        }, function (err) {
            console.log(err);
            alert(err);
        });
    }
    $scope.api = function (text) {
        var text;
        console.log("started")
        var ROOT = 'https://quill-1176.appspot.com/_ah/api';
        gapi.client.load('uberApi', 'v1', function () {
            console.log("success")
            gapi.client.uberApi.ride.return({
                'message': text,
                'num': 1
            }).execute(function (resp) {
                $scope.summary = resp;
                console.log(resp);
            });
        }, ROOT);
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


    //Select photo testing here 
    // 1
$scope.images = [];
 
$scope.addImage = function() {
	// 2
	var options = {
		destinationType : Camera.DestinationType.FILE_URI,
		sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
		allowEdit : false,
		encodingType: Camera.EncodingType.JPEG,
		popoverOptions: CameraPopoverOptions,
	};
	
	// 3
	$cordovaCamera.getPicture(options).then(function(imageData) {
 
		// 4
		onImageSuccess(imageData);
 
		function onImageSuccess(fileURI) {
			createFileEntry(fileURI);
		}
 
		function createFileEntry(fileURI) {
			window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
		}
 
		// 5
		function copyFile(fileEntry) {
			var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
			var newName = makeid() + name;
 
			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
				fileEntry.copyTo(
					fileSystem2,
					newName,
					onCopySuccess,
					fail
				);
			},
			fail);
		}
		
		// 6
		function onCopySuccess(entry) {
			$scope.$apply(function () {
				$scope.images.push(entry.nativeURL);
			});
		}
 
		function fail(error) {
			console.log("fail: " + error.code);
		}
 
		function makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
			for (var i=0; i < 5; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		}
 
	}, function(err) {
		console.log(err);
	});
}

$scope.urlForImage = function(imageName) {
  var name = imageName.substr(imageName.lastIndexOf('/') + 1);
  var trueOrigin = cordova.file.dataDirectory + name;
  return trueOrigin;
}
})

.controller('NotesCtrl', function ($scope, Notes, $state) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $scope.api = function () {
        console.log("started")
        var ROOT = 'https://quill-1176.appspot.com/_ah/api';
        gapi.client.load('uberApi', 'v1', function () {
            console.log("success")
            gapi.client.uberApi.ride.return({
                'message': 'If you were a pirate, you know what would be the one thing that would really make you mad? Treasure chests with no handles. How the hell are you supposed to carry it?! The face of a child can say it all, especially the mouth part of the face.',
                'num': 1
            }).execute(function (resp) {

                console.log(resp);
            });
        }, ROOT);
    }
    $scope.goto = function (toState, params) {
        $state.go(toState, params) //remember to inject $state to your controller
    }
    $scope.notes = Notes.all();
    $scope.remove = function (note) {
        Notes.remove(note);
    };
})

.controller('NoteDetailCtrl', function ($scope, $stateParams, Notes) {
    $scope.note = Notes.get($stateParams.noteId);
    $scope.summaryisCollapsed = true;
    $scope.keywordsisCollapsed = true;
    $scope.textisCollapsed = false;
    $scope.researchisCollapsed = true;

})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});