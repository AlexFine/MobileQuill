angular.module('starter.controllers', ['ion-gallery', 'ngCordova'])
    .controller('IntroCtrl', function ($scope, $http, $state, $ionicSlideBoxDelegate, $rootScope, $ionicHistory, $stateParams, $ionicLoading) {


        $scope.status;
        $scope.pageswitch = function () {
            $state.go('tab.notes');
        }

        currentUser = null;
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;

        var apisToLoad;
        var loadCallback = function () {
            if (--apisToLoad == 0) {
                signin(true, userAuthed);
            }
        };









        $scope.checkLogged = function () {

            //Check if logged in here
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
            console.log(window.localStorage.getItem('rememberme'))
            if (window.localStorage.getItem('rememberme') == "true") {
                $state.go('tab.notes');
            } else {
                $state.go('intro');
                console.log("test")
                window.localStorage['didTutorial'] = true;
            }
        };

        //        if (window.localStorage['didTutorial'] === "true") {
        //            console.log('Skip intro');
        //            $state.go('intro');
        //        }

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

        $scope.slideNext = function () {
            $ionicSlideBoxDelegate.next();
            $ionicSlideBoxDelegate.next();
            $ionicSlideBoxDelegate.next();
        }

        $scope.username;
        $scope.password;
        $scope.register = function (username, password) {
            $scope.status = "";
            console.log("hello");
            console.log(password.length)
            console.log(password + username);
            if (username == undefined) {
                //alert("Invalid Username")
                alert("No username entered");
                $scope.status = "No username entered";
            } else if (username == password) {
                //alert("Invalid Username")
                alert("Username can't be your password");
                $scope.status = "Username can't be your password";
            } else {

                if (password.length < 7) {
                    //alert("Invalid Username")
                    alert("Password not long enough. Needs to be 8 characters or longer.");
                    $scope.status = "Password not long enough. Needs to be 8 characters or longer."
                } else {
                    $scope.password = password;

                    $scope.username = username;

                    $scope.error;

                    var url = "https://quill-1176.appspot.com/_ah/api/quillApi/v1/user/new"
                    $http.post(url, {

                        "user": username,
                        "passwrd": password
                    }).then(function (resp) {
                        console.log(resp);
                        $scope.status = "Login Successful. If this persists please contact us at alexkfine2@gmail.com";
                        console.log(resp.data.message);
                        if (resp.data.message == "key success") {
                            $scope.status = "Successful Login Credentials. Internal Server Error";
                            window.localStorage.setItem("password", password);
                            // var storedPassword = window.localStorage.getItem("password"));
                            $scope.storedPassword = password;
                            window.localStorage.setItem("username", username);
                            // var storedUsername = window.localStorage.getItem("username");
                            $scope.storedUsername = username;
                            window.localStorage.setItem("rememberme", "true");
                            $state.go('tab.notes');
                            console.log(storedUsername);
                            console.log(storedPassword);
                        }
                    });

                }


            }
        }

    })
    .controller('LoginCtrl', function ($location, $scope, $ionicPopup, $state, $http) {

        $scope.username;
        $scope.password;
        $scope.login = function (username, password) {


            if (username == undefined) {
                //alert("Invalid Username")
                $scope.status = "Invalid Username";
            }


            var url = "https://quill-1176.appspot.com/_ah/api/quillApi/v1/user/login";
            // var url ="http://localhost:8080/_ah/api/quillApi/v1/user/login";
            console.log(username, password)
            $http.post(url, {

                    "user": username,
                    "passwrd": password
                })
                .then(function (resp) {
                    console.log(resp);
                    if (resp.data.message == "logged in") {
                        $scope.username = username

                        $scope.password = password
                            // if(resp.message=)
                        window.localStorage.setItem("password", $scope.password);
                        window.localStorage.setItem("username", $scope.username);
                        window.localStorage.setItem("rememberme", "true");

                        $state.go('tab.notes');
                    } else {

                        alert("Invalid Username and Password combination")
                        $scope.status = "Invalid Username and Password combination."

                    }
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
                    window.localStorage.setItem("rememberme", "false");
                    window.localStorage.setItem("notes", JSON.stringify([]));
                    $state.go('intro');
                } else {
                    console.log('You are not sure');
                }
            });
        }


        var storedUsername = window.localStorage.getItem("username");
        var storedPassword = window.localStorage.getItem("password");


        $scope.info = function () {
            console.log("USRNAME IS" + storedUsername)

            var alertPopup = $ionicPopup.alert({
                title: 'Account Details',
                template: 'Username: ' + storedUsername + '<br>' + 'Password: ' + storedPassword + '<br><hr class="normalhr"> Interested in Quill? Check out our website at quillapp.io'
            });

            alertPopup.then(function (res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        }



    })
    .controller('PhotoCtrl', function ($scope, Camera, $http, $cordovaCamera, $cordovaImagePicker, $state, $ionicModal, $ionicPopup, $ionicLoading) {


        $ionicModal.fromTemplateUrl('my-modal2.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function () {
            console.log("modal open")
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });

        $scope.items = [
            {
                src: 'img/text1.JPG',
                sub: 'Most recent photos 03/11/2016'
  },
            {
                src: 'img/text2.JPG',
                sub: 'Most recent photos 03/11/2016'
  }
        ]
        console.log($scope.items);

        $scope.status = "Sending Image";
        $scope.summary;



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


        var canvas = document.createElement('canvas');
        $scope.base64 = function (url, callback) {
                var image = new Image();

                image.onload = function () {

                    canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
                    canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

                    canvas.getContext('2d').drawImage(this, 0, 0);

                    // Get raw image data
                    callback(canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, ''));
                };
                image.src = url;


            }
            //why do we need this part ^^
           
        

        $scope.picText = function () {
            $scope.status = "Sending Images ... ";
            $scope.loadingbar();
            var addInfo = {};

            var text = "";
            var url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDdYPAS4Mji2KbCq5PWw3cIzknwxNpOuqc";
            console.log("ran pictest");
            //$scope.base64(testPhoto);
            console.log("items length: " + $scope.items.length);
            var dataURL;
            console.log($scope.items.length)
            var num = 0;
            items = $scope.items
            for (var i = 0; i < $scope.items.length; i++) {
                
                $scope.status = "Sending Image Number " + i;
                console.log("why did you not show?");
                var imgURL = $scope.items[i].src;


                $scope.base64(imgURL, function (resp) {
                    // console.log(resp);
                    dataURL = resp;


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
                    var storedPassword = window.localStorage.getItem("password");
                    // $scope.storedPassword = storedPassword;
                    // window.localStorage.setItem("username", JSON.stringify(username));
                    var storedUsername = window.localStorage.getItem("username");
                    var summary;
                    var concepts;
                    
                    // console.log(postReq)
                    $http.post(url, postReq).then(function (res) {
                        // console.log(res);

                        text += res.data.responses[0].textAnnotations[0].description;
                        text = text.replace(/\n/g, " ");
                        // console.log(text);
                        num += 1
                            //now at this point, we have text, we'll run summary, concepts, and bias;
                        console.log(i)
                        if (items.length == num) {
                            $scope.status = "Gathering image dates ..."
                            console.log("True")
                            var d = new Date();
                            var str = d.toString();
                            str = str.substring(0, 15);
                            addInfo.text = text;
                            // console.log(text);
                            var url = "https://quill-1176.appspot.com/_ah/api/quillApi/v1/text/upload"
                            $http.post(url, {
                                "message": text,
                                "user": storedUsername,
                                "passwrd": storedPassword,
                                "date": str
                            }).then(function (resp) {
                                resp = resp.data
                                console.log(resp);
                                summary = resp.summary;
                                // console.log(summary)
                                summary = summary[0].summary

                                concepts = resp.keywords;
                                sentiment = resp.sentiment;
                                keywords = []
                                for (var x = 0; x < concepts.length; x++) {
                                    keywords.push([concepts[x], sentiment[x]])
                                }



                                addInfo.summary = summary;
                                addInfo.text = resp.text;

                                //concepts
                                //var concepts;

                                //console.log("concepts size: " + concepts.length);
                                addInfo.keywords = keywords;
                                
                                //bias

                                //date
                                var d = new Date();
                                var str = d.toString();
                                str = str.substring(0, 15);
                                addInfo.dates = str;

                                // var newID = window.localStorage.getItem("notes").length;
                                // addInfo.id = newID;

                                // window.localStorage.setItem("notes", JSON.stringify(notes));
                                var storedNotes = JSON.parse(window.localStorage.getItem("notes"));
                                $scope.status = "Storing notes..."
                                if (storedNotes == null) {
                                    storedNotes = [];
                                    addInfo.id = 0
                                } else {
                                    addInfo.id = storedNotes.length;
                                }
                                // console.log(storedNotes)
                                storedNotes.push(addInfo)
                                window.localStorage.setItem("notes", JSON.stringify(storedNotes));
                                $scope.Newnotes = storedNotes;
                                // console.log(Newnotes)
                                $scope.endloadingbar();
                                $scope.closeModal();

                                // console.log(JSON.stringify(addInfo));

                                // window.localStorage.getItem("notes").push(addInfo);

                            });
                        }
                        // gapi.client.quillApi.user.new({

                        //   "user":"ad",
                        //   "passwrd":"21"
                        // }).execute(function (resp) {
                        //   console.log(resp);
                        // });

                        // gapi.client.quillApi.user.return.posts({

                        //   "user":"ad",
                        //   "passwrd":"21"
                        // }).execute(function (resp) {
                        //   console.log(resp);
                        // });
                        //summary
                        //var summary;
                        //console.log("summary : " + summary);

                    })
                })

            }
            //$scope.endloadingbar();
        }
//        $scope.meme;
//        $scope.getmemes = function(){
//        var memes = [
//            "http://25.media.tumblr.com/20463acf0cd7032c1047b03526bc80c4/tumblr_mm6typKnQB1qeak1oo1_500.gif", 
//            "https://40.media.tumblr.com/358994cd528efde9d75e2088deeec8f4/tumblr_ne9stytIE81tpri36o1_500.jpg",
//            "http://a.fod4.com/misc/Creed%20taliban.gif",
//            "http://www.relatably.com/m/img/office-appropriate-memes/the-office-meme-jim.jpg",
//            "http://4.bp.blogspot.com/-4sEseI_hyC4/VRujMvF8ptI/AAAAAAAAD4A/oyTvQbvktr8/s1600/inside%2Bjokes.jpg",
//            "http://2.bp.blogspot.com/-MmEzOgZi2XQ/UYc94KwI7mI/AAAAAAAAB9c/rrpJt9gw4e0/s1600/MICHAELSFLAWS.jpg",
//            "http://3.bp.blogspot.com/-m7kV0Qf2ZMM/UYU8Pu4Ft3I/AAAAAAAAB88/yPrk29Hv87s/s1600/superstitious.jpg",
//            "https://s-media-cache-ak0.pinimg.com/736x/d2/1c/51/d21c517cd10e209038c42a66661251b4.jpg",
//            "http://memesvault.com/wp-content/uploads/Happy-Friday-Office-Meme-10.jpg",
//            "http://s.quickmeme.com/img/c9/c9c9573e46b3fb7bd6003c62958f4e9bbe9b305801c1e14dff0ab955172c0f74.jpg",
//            "http://memesvault.com/wp-content/uploads/Funny-Meme-8.jpg"
//        ]
//        var meme = memes[Math.floor(Math.random()*memes.length)];
//            $scope.meme = meme;
//        }

     $scope.loadingbar = function(){
         //$scope.getmemes();
         
         
         var memes = [
            "http://25.media.tumblr.com/20463acf0cd7032c1047b03526bc80c4/tumblr_mm6typKnQB1qeak1oo1_500.gif", 
            "https://40.media.tumblr.com/358994cd528efde9d75e2088deeec8f4/tumblr_ne9stytIE81tpri36o1_500.jpg",
            "http://a.fod4.com/misc/Creed%20taliban.gif",
            "http://www.relatably.com/m/img/office-appropriate-memes/the-office-meme-jim.jpg",
            "http://4.bp.blogspot.com/-4sEseI_hyC4/VRujMvF8ptI/AAAAAAAAD4A/oyTvQbvktr8/s1600/inside%2Bjokes.jpg",
            "http://2.bp.blogspot.com/-MmEzOgZi2XQ/UYc94KwI7mI/AAAAAAAAB9c/rrpJt9gw4e0/s1600/MICHAELSFLAWS.jpg",
            "http://3.bp.blogspot.com/-m7kV0Qf2ZMM/UYU8Pu4Ft3I/AAAAAAAAB88/yPrk29Hv87s/s1600/superstitious.jpg",
            "https://s-media-cache-ak0.pinimg.com/736x/d2/1c/51/d21c517cd10e209038c42a66661251b4.jpg",
            "http://memesvault.com/wp-content/uploads/Happy-Friday-Office-Meme-10.jpg",
            "http://s.quickmeme.com/img/c9/c9c9573e46b3fb7bd6003c62958f4e9bbe9b305801c1e14dff0ab955172c0f74.jpg",
            "http://memesvault.com/wp-content/uploads/Funny-Meme-8.jpg"
        ]
        var meme = memes[Math.floor(Math.random()*memes.length)];
            $scope.meme = meme;
             
            console.log("made it")
            console.log("THE MEME IS " + meme);
            $ionicLoading.show({
                template: $scope.status + "<br> Depending on how many images you submitted,<br> it may take up to one minute to load <br> In the meantime enjoy some classic memes below ... <br> <img src='" + meme + "' style='width:100%;'>"
            });
         
         
        }
        $scope.endloadingbar = function(){
            console.log("hi")
            $ionicLoading.hide();
        }

        //Select photo testing here
        // 1

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


        //            $scope.photoselector = function () {
        //                var confirmPopup = $ionicPopup.confirm({
        //                        title: 'Upload or take photo',
        //                        template: 'Would you like to upload a photo from your camera roll or take a new photo?',
        //                        buttons: [
        //                            {
        //                                text: 'Upload'
        //                            },
        //                            {
        //                                text: 'Take Photo',
        //                                type: 'button-positive',
        //                                onTap: function () {
        //                                    console.log('...')
        //                                }
        //   }
        //                        });
        //
        //                    confirmPopup.then(function (res) {
        //                        if (res) {
        //                            console.log('You are sure');
        //                            $scope.getPhoto();
        //                        } else {
        //                            $scope.choosePhoto();
        //                        }
        //                    });
        //                }
        //            })

        $scope.photoselector = function () {
            var myPopup = $ionicPopup.show({
                template: "Upload from camera roll or take photo? Or <a ng-click='closepopup();'>Close</a>",
                title: "Take Photos",
                scope: $scope,
                buttons: [
                    {
                        text: 'Upload',
                        type: 'button-positive',
                        onTap: function () {
                            console.log("hello1");
                            myPopup.close();
                            $scope.choosePhoto();


                        }
                },
                    {
                        text: 'Take Photo',
                        type: 'button-positive',
                        onTap: function () {
                            console.log("hello2");
                            myPopup.close();
                            $scope.getPhoto();

                        }
                }
            ]
            });
            $scope.closepopup = function () {
                myPopup.close();
            }
        }

        $scope.choosePhoto = function () {

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


    })

.controller('NotesCtrl', function ($scope, Notes, $state, $ionicModal, $http) {

    $ionicModal.fromTemplateUrl('my-modal2.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {
        console.log("modal open")
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });



    $scope.photo = function () {
        console.log("hello")
        $state.go('photoinfo');
        console.log("went")
    }

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
        // {
        //     text: 'note one',
        //     keywords: 'Alex, Is, a, cool, bean',
        //     summary: 'summar',
        //     dates: 'here is a date',
        //     img: 'img/text1.JPG',
        //     id: 0
        // },
        // {
        //     text: 'note two',
        //     keywords: 'note two',
        //     summary: 'summar',
        //     dates: 'more dates',
        //     img: 'img/text2.JPG',
        //     id: 1
        // },
        // {
        //     text: 'note three i thinik',
        //     keywords: 'note two',
        //     summary: 'summar',
        //     dates: 'banana',
        //     img: 'img/text3.JPG',
        //     id: 2
        // },
        // {
        //     text: 'note so many notes',
        //     keywords: 'note two',
        //     summary: 'summar',
        //     dates: 'banana',
        //     img: 'img/text4.JPG',
        //     id: 3
        // }

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

        var storedNotes = JSON.parse(window.localStorage.getItem("notes"));
        $scope.newNotes = storedNotes

        //Load dates
        var notes = []
        var storedPassword = window.localStorage.getItem("password");
        // $scope.storedPassword = storedPassword;
        // window.localStorage.setItem("username", JSON.stringify(username));
        var storedUsername = window.localStorage.getItem("username");
        var url = "https://quill-1176.appspot.com/_ah/api/quillApi/v1/user/return/posts"
            // var url = "http://localhost:8080/_ah/api/quillApi/v1/user/return/posts"
        $http.post(url, {
            "user": storedUsername,
            "passwrd": storedPassword
                // "user": storedPassword ,
                // "passwrd": storedUsername
        }).then(function (resps) {
            // console.log(resps)
            console.log(notes)
            resps = resps.data.posts

            if (resps == undefined) {
                return $scope.$broadcast('scroll.refreshComplete');
            }
            for (var x = 0; x < resps.length; x++) {

                addInfo = {}
                resp = resps[x]
                if (resp.text == "User Fail") {
                    alert("please log in again")
                    return $scope.$broadcast('scroll.refreshComplete');
                }
                // console.log(resp);
                summary = resp.summary;
                // console.log(summary)
                summary = summary[0].summary

                concepts = resp.keywords;
                sentiment = resp.sentiment;
                keywords = []
                    // console.log(concepts)
                    // console.log(sentiment)
                for (var y = 0; y < concepts.length; y++) {
                    keywords.push([concepts[y], sentiment[y]])
                }
                addInfo.summary = summary;

                //concepts
                //var concepts;

                //console.log("concepts size: " + concepts.length);
                addInfo.keywords = keywords;
                addInfo.text = resp.text;
                //bias

                //date
                // var d = new Date();
                // var str = d.toString();
                // str = str.substring(0, 15);
                addInfo.dates = resp.date;
                addInfo.id = x
                console.log(notes)
                console.log(x)
                notes.push(addInfo)
                console.log(notes)
                    // $scope.Newnotes = notes
                    // Stop the ion-refresher from spinning


            }
            $scope.$broadcast('scroll.refreshComplete');
            $scope.Newnotes = notes
            console.log($scope.Newnotes)
            window.localStorage.setItem("notes", JSON.stringify(notes));

        })

    }



    $scope.loadData = function () {
        alert(window.localStorage.getItem("data"));
    }


    $scope.api = function () {
        console.log("started")

        gapi.client.quillApi.user.new({}).execute(function (resp) {
            console.log(resp);
        });

    }
    $scope.goto = function (toState, params) {
        $state.go(toState, params) //remember to inject $state to your controller
    }
    $scope.notes = Notes.all();


    $scope.saveData();
})

.controller('NoteDetailCtrl', function ($scope, $stateParams, Notes, $cordovaEmailComposer) {
    $scope.note = Notes.get($stateParams.noteId);
    $scope.summaryisCollapsed = true;
    $scope.keywordsisCollapsed = true;
    $scope.textisCollapsed = true;
    $scope.researchisCollapsed = true;

    var storedNotes = JSON.parse(window.localStorage.getItem("notes"));
    $scope.Newnotes = storedNotes;

    $scope.currentpage = window.location.href;
    var currentpage = window.location.href;
    var lastChar = currentpage.charAt(currentpage.length - 1);
    $scope.lastChar = lastChar;

    $scope.submit = function () {
        $cordovaEmailComposer.isAvailable().then(function () {
            // is available
        }, function () {
            // not available
        });

        var email = {
            to: 'max@mustermann.de',
            cc: 'erika@mustermann.de',
            bcc: ['john@doe.com', 'jane@doe.com'],
            attachments: [
      'file://img/logo.png',
      'res://icon.png',
      'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      'file://README.pdf'
    ],
            subject: 'Cordova Icons',
            body: 'How are you? Nice greetings from Leipzig',
            isHtml: true
        };

        $cordovaEmailComposer.open(email).then(null, function () {
            // user cancelled email
        });
    }


    $scope.delete = function (id) {
        console.log(id);
        window.localStorage.removeItem(id);
        console.log("removed");
    };
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
})



.controller('UserInfoCtrl', function (auth) {
    auth.profilePromise.then(function (profile) {
        $scope.profile = profile;



    });
    $scope.profile = auth.profile;
})