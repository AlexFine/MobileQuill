angular.module('starter.controllers', ['ion-gallery', 'ngCordova', 'angular-storage', 'angular-jwt'])
    .controller('IntroCtrl', function ($scope, $state, $ionicSlideBoxDelegate, $rootScope, $ionicHistory, $stateParams, $ionicLoading) {

        currentUser = null;
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;

        var apisToLoad;
        var loadCallback = function () {
            if (--apisToLoad == 0) {
                signin(true, userAuthed);
            }
        };


        $scope.signin = function (mode, authorizeCallback) {
            console.log("hello");
            gapi.auth.authorize({
                    client_id: '717056452157-5udkhp8gsi6imu2lj684ushiecsrn1qq.apps.googleusercontent.com',
                    scope: 'https://www.googleapis.com/auth/userinfo.email',
                    mode: false
                },
                authorizeCallback);
        }

        $scope.userAuthed = function () {
            var request = gapi.client.oauth2.userinfo.get().execute(function (resp) {
                if (!resp.code) {
                    // User is signed in, call my Endpoint
                    $rootScope.user = currentUser;
                    $rootScope.isLoggedIn = true;
                    $state.go('tab.notes');
                }
            });
        }



        $scope.deviceReady = function () {
            //I get called when everything's ready for the plugin to be called!
            console.log('Device is ready!');
            window.plugins.googleplus.trySilentLogin();
        }

        $scope.logingoogleplus = function () {

            window.plugins.googleplus.login({
                    'scopes': 'https://www.googleapis.com/auth/userinfo.email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
                    'webClientId': '717056452157-5udkhp8gsi6imu2lj684ushiecsrn1qq.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
                    'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
                },
                function (obj) {
                    alert(JSON.stringify(obj)); // do something useful instead of alerting
                },
                function (msg) {
                    alert('error: ' + msg);
                }
            );
        }

        $scope.logoutgoogleplus = function () {
            window.plugins.googleplus.disconnect(
                function (msg) {
                    alert(msg); // do something useful instead of alerting
                }
            );
        }




        $scope.checkLogged = function () {
            $scope.startApp();
        };

        if ($stateParams.clear) {
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
        };

        $scope.login = function () {

            $state.go('login');
        };

        if ($rootScope.isLoggedIn) {
             $state.go('tab.notes');
        }

        $scope.startApp = function () {
            if (window.localStorage['rememberme'] == "true") {
                $state.go('tab.notes');
            } else {
                $state.go('intro');
                window.localStorage['didTutorial'] = true;
            }
        };

        if (window.localStorage['didTutorial'] === "true") {
            console.log('Skip intro');
            $state.go('intro');
        }

        $scope.next = function () {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function () {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function (index) {
            $scope.slideIndex = index;
        };
        $scope.user = {};
        $scope.error = {};
        $scope.test = function (n) {
            //alert(n);
        }
        $scope.register = function () {
            //put register function here
        };
        $scope.slideNext = function () {
            $ionicSlideBoxDelegate.next();
            $ionicSlideBoxDelegate.next();
            $ionicSlideBoxDelegate.next();
        }
    })
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
          $scope.testPhoto = 'img/text1.JPG';
          var url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDdYPAS4Mji2KbCq5PWw3cIzknwxNpOuqc";
          var testPhoto = $scope.testPhoto;

          var dataURL = testPhoto;
          dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
          //console.log("base64 string: " + dataURL);
          // var url = "https://vision.googleapis.com";
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
        //     var postReq = {
        //         "requests": [
        //             {
        //                 "image": {
        //                     "source": {
        //                         "gcsImageUri": "gs://test-2343/test.png"
        //                     }
        //                 },
        //
        //                 "features": [
        //                     {
        //                         "type": "TEXT_DETECTION",
        //       }
        //     ]
        //   }
        // ]
        //     }
            $http.post(url, postReq).then(function(res){
                console.log(res);
            })
        }


        $scope.api = function (lastPhoto) {

            $scope.testPhoto = 'img/text1.JPG';


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

    window.onload = function () {
        $scope.saveData();
    };
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});



    var notes = [
        {
            text: 'note one',
            keywords: 'Alex, Is, a, cool, bean',
            summary: 'summar',
            dates: 'here is a date',
            img: 'img/text1.JPG',
            id: 0
        },
        {
            text: 'note two',
            keywords: 'note two',
            summary: 'summar',
            dates: 'more dates',
            img: 'img/text2.JPG',
            id: 1
        },
        {
            text: 'note three i thinik',
            keywords: 'note two',
            summary: 'summar',
            dates: 'banana',
            img: 'img/text3.JPG',
            id: 2
        },
        {
            text: 'note so many notes',
            keywords: 'note two',
            summary: 'summar',
            dates: 'banana',
            img: 'img/text4.JPG',
            id: 3
        }
    ];


    $scope.saveData = function () {
        //CALL DATABASE HERE TO UPDATE LOCAL STORAGE
        //        window.localStorage.setItem("text", JSON.stringify(text));
        //        var storedText = JSON.parse(window.localStorage.getItem("text"));
        //        $scope.text = storedText;
        //        //Load text
        //
        //        window.localStorage.setItem("keywords", JSON.stringify(keywords));
        //        var storedKeywords = JSON.parse(window.localStorage.getItem("keywords"));
        //        $scope.keywords = storedKeywords;
        //        //Load keywords
        //
        //        window.localStorage.setItem("dates", JSON.stringify(dates));
        //        var storedDates = JSON.parse(window.localStorage.getItem("dates"));
        //        $scope.dates = storedDates;
        //        //Load dates
        //
        window.localStorage.setItem("notes", JSON.stringify(notes));
        var storedNotes = JSON.parse(window.localStorage.getItem("notes"));
        $scope.Newnotes = storedNotes;
        //Load dates

        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');


    }



    $scope.loadData = function () {
        alert(window.localStorage.getItem("data"));
    }


    $scope.api = function () {
        console.log("started")
        // gapi.client.user.new({}, )
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


    var storedNotes = JSON.parse(window.localStorage.getItem("notes"));
    $scope.Newnotes = storedNotes;

    $scope.currentpage = window.location.href;
    var currentpage = window.location.href;
    var lastChar = currentpage.charAt(currentpage.length - 1);
    $scope.lastChar = lastChar;

})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
})

.controller('LoginCtrl', function ($location, store, $scope, $ionicPopup, $state) {

    // var apisToLoad;
    //     var loadCallback = function () {
    //         if (--apisToLoad == 0) {
    //             signin(true, userAuthed);
    //         }
    //     };


    //     $scope.signin = function (mode, authorizeCallback) {
    //         console.log("hello");
    //         gapi.auth.authorize({
    //                 client_id: '717056452157-5udkhp8gsi6imu2lj684ushiecsrn1qq.apps.googleusercontent.com',
    //                 scope: 'https://www.googleapis.com/auth/userinfo.email',
    //                 mode: false
    //             },
    //             authorizeCallback);
    //     }

    //     $scope.userAuthed = function () {
    //         var request = gapi.client.oauth2.userinfo.get().execute(function (resp) {
    //             if (!resp.code) {
    //                 // User is signed in, call my Endpoint
    //                 $rootScope.user = currentUser;
    //                 $rootScope.isLoggedIn = true;
    //                 $state.go('tab.notes');
    //             }
    //         });
    //     }
        gapi.client.load('plus', 'v1');



        $scope.deviceReady = function () {
            //I get called when everything's ready for the plugin to be called!
            console.log('Device is ready!');
            window.plugins.googleplus.trySilentLogin();
        }

        $scope.logingoogleplus = function () {

            window.plugins.googleplus.login({
                    'scopes': 'https://www.googleapis.com/auth/userinfo.email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
                    'webClientId': '717056452157-5udkhp8gsi6imu2lj684ushiecsrn1qq.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
                    'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
                },
                function (obj) {
                    alert(JSON.stringify(obj)); // do something useful instead of alerting
                },
                function (msg) {
                    alert('error: ' + msg);
                }
            );
        }

        $scope.logoutgoogleplus = function () {
            window.plugins.googleplus.disconnect(
                function (msg) {
                    alert(msg); // do something useful instead of alerting
                }
            );
        }
    // $scope.signin = function () {
    //     auth.signin({
    //         authParams: {
    //             scope: 'openid name email'

    //         }
    //     }, function (profile, idToken, accessToken, state, refreshToken) {
    //         store.set('profile', profile);
    //         store.set('token', id_token);
    //         $location.path('/user-info')
    //     }, function (err) {
    //         console.log("Error", err)
    //     });
    // }

    $scope.out = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Logout',
            template: 'Are you sure you want to logout?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                console.log('You are sure');
                $state.go('intro');
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
