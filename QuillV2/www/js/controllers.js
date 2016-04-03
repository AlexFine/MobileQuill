angular.module('starter.controllers', ['ion-gallery', 'ngCordova', 'auth0', 'angular-storage', 'angular-jwt'])

.controller('PhotoCtrl', function ($scope, Camera, $http, $cordovaCamera, $cordovaImagePicker, $state) {


    $scope.status = "start status";
    $scope.summary;

    $scope.items = [
        {
            src: 'img/text1.JPG',
            sub: 'Most recent photos 03/11/2016'
  }

]
    console.log($scope.items)

    $scope.getPhoto = function () {
        Camera.getPicture().then(function (imageURI) {

            $scope.status = "get picture";
            $scope.lastPhoto = imageURI;


            console.log("called the convertToCanvas Function")

            var newimage = {
                src: imageURI,
                sub: "Most recent photos 03/29/2016"
            };
            console.log($scope.items)
            $scope.items.push(newimage);
            console.log($scope.items);
            $scope.reload();

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

    $scope.picText = function () {
        console.log("ran pictest")
        var url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDdYPAS4Mji2KbCq5PWw3cIzknwxNpOuqc";
        var postReq = {
            "requests": [
                {
                    "image": {
                        "content": dataURL
                    },
                    "features": [
                        {
                            "type": "LABEL_DETECTION",
                            "maxResults": "10"
              }
            ]
          }
        ]
        }
        $http.post(url, postReq).then(function (res) {
            console.log(res.textAnnotations.description);
        });

    }


    $scope.api = function (lastPhoto) {

        $scope.testPhoto = 'img/text1.JPG';
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
        console.log($scope.items)
        window.imagePicker.getPictures(
            function (results) {
                for (var i = 0; i < results.length; i++) {
                    console.log('Image URI: ' + results[i]);

                    var newimage = {
                        src: results[i],
                        sub: "Most recent photos 03/29/2016"
                    };
                    console.log($scope.items);
                    $scope.items.push(newimage);
                    console.log($scope.items);
                    $scope.reload();
                }
            },
            function (error) {
                console.log('Error: ' + error);
            }
        );

    }

    $scope.reload = function () {
        $state.go($state.current, {}, {
            reload: true
        });
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
    
    var notes = ['note one', 'note two', 'note three'];
    

$scope.saveData = function(v){
     window.localStorage.setItem("data", v);
     window.localStorage.setItem("notes", JSON.stringify(notes));
    var storedNotes = JSON.parse(window.localStorage.getItem("notes"));
    $scope.Newnotes = storedNotes;
    console.log(storedNotes);
}
$scope.loadData = function(){
    alert(window.localStorage.getItem("data"));
}

    
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
})

.controller('LoginCtrl', function (auth, $location, store, $scope, $ionicPopup, $state) {
    $scope.signin = function () {
        auth.signin({
            authParams: {
                scope: 'openid name email'

            }
        }, function (profile, idToken, accessToken, state, refreshToken) {
            store.set('profile', profile);
            store.set('token', id_token);
            $location.path('/user-info')
        }, function (err) {
            console.log("Error", err)
        });
    }

    $scope.out = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Logout',
            template: 'Are you sure you want to logout?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                console.log('You are sure');
                $state.go('tab.account');
            } else {
                console.log('You are not sure');
            }
        });
    }

    $scope.info = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Account Details',
            template: 'Username: Banana Man <br> Name: Alex Fine <br> Email: alexkfine2@gmail.com '
        });

        alertPopup.then(function (res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    }



})

.controller('UserInfoCtrl', function (auth) {
    auth.profilePromise.then(function (profile) {
        $scope.profile = profile;



    });
    $scope.profile = auth.profile;
});