angular.module('starter.controllers', ['ion-gallery', 'ngCordova'])

.controller('PhotoCtrl', function ($scope, Camera, $http, $cordovaCamera, $cordovaImagePicker) {


    $scope.status = "start status";
    $scope.summary;

    $scope.items = [
        {
            src: 'img/text1.JPG',
            sub: 'Most recent photos 03/11/2016'
  },
        {
            src: 'img/text2.JPG',
            sub: 'Most recent photos 03/09/2016' /* Not showed */
  },
        {
            src: 'img/text3.JPG',
            sub: 'Most recent photos 03/07/2016' /* Not showed */
  },
        {
            src: 'img/text4.JPG',
            sub: 'Most recent photos 03/05/2016' /* Not showed */
  },
        {
            src: 'img/text5.JPG',
            sub: 'Most recent photos 03/04/2016' /* Not showed */
  }

]

    $scope.getPhoto = function () {
        Camera.getPicture().then(function (imageURI) {

            $scope.status = "get picture";
            $scope.lastPhoto = imageURI;


            console.log("called the convertToCanvas Function")

            var newimage = {
                src: lastPhoto,
                sub: 'Most recent photos 03/19/2016'
            }
            $scope.items.push(newimage);

            var newimage = {
                src: imageURI,
                sub: 'Most recent photos 03/19/2016'
            }
            $scope.items.push(newimage);


        }, function (err) {
            console.err(err);
        }, {
            quality: 100,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false
        });

        $scope.api(lastPhoto);

    };

    $scope.convertToCanvas = function (lastPhoto) {

    }
    //why do we need this part ^^

    $scope.picText = function () {}


    $scope.api = function (lastPhoto) {

        $scope.testPhoto = "../img/text.png";
        var testPhoto = $scope.testPhoto;
        var dataURL = testPhoto;
        dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        //console.log("base64 string: " + dataURL);
        var url = "https://vision.googleapis.com";
        var postReq = {
            "requests": [
                {
                    "image": {
                        "content": dataURL
                    },
                    "features": [
                        {
                            "type": "TEXT_DETECTION",
                         }
                     ]
                 }
             ]
        };

        gapi.client.load('vision', 'v1', function () {
            console.log("success")
            gapi.client.vision.images.annotate(
                postReq).execute(function (resp) {
                console.log(resp);
            });
        })
    }

    //Select photo testing here
    // 1
    $scope.choosePhoto = function () {
        //           console.log("choose photo ran")
        //           var options = {
        //             quality: 75,
        //             destinationType: Camera.DestinationType.FILE_URL,
        //             sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        //             allowEdit: true,
        //             encodingType: Camera.EncodingType.JPEG,
        //             targetWidth: 300,
        //             targetHeight: 300,
        //             popoverOptions: CameraPopoverOptions,
        //             saveToPhotoAlbum: false
        //         };
        //
        //             $cordovaCamera.getPicture(options).then(function (imageData) {
        //                 $scope.imgURI = "data:image/jpeg;base64," + imageData;
        //             }, function (err) {
        //                 // An error occured. Show a message to the user
        //
        //
        //
        //
        //         return text;
        //
        //
        // }, function (err) {
        //     console.log(err);
        // });
      window.imagePicker.getPictures(
        function(results) {
          for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);
          }
        }, function (error) {
          console.log('Error: ' + error);
        }
      );

    }

    $scope.urlForImage = function (imageName) {
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
