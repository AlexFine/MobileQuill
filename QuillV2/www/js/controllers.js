angular.module('starter.controllers', ['ngCordova', 'jrCrop'])
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
                console.log("Go")
                $state.go('tab.notes');
              $scope.saveData();
            } else {
                $state.go('intro');
                console.log("test")
                window.localStorage['didTutorial'] = true;
            }
        };

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
        $scope.register = function () {
            $scope.status = "";
          window.plugins.googleplus.login(
            {
              // 'scopes': ' ', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
              // 'webClientId': 'client id of the web app/server side', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
              // 'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
            },
            function (obj) {
              // alert(JSON.stringify(obj));
              $scope.error;

              var url = "https://quill-1176.appspot.com/_ah/api/quillApi/v1/user/new"
              $http.post(url, {
                "message": obj.idToken,
              }).then(function (resp) {
                console.log(resp);
                //alert("hi")
                $scope.status = "Email has already been used or entered email is not a vlid email.";
                console.log(resp.data.message);
                if (resp.data.message == "key success") {
                  $scope.status = "Successful Login Credentials. Internal Server Error";

                  window.localStorage.setItem("rememberme", "true");
                  $state.go('tab.notes');

                }
              });// do something useful instead of alerting
            },
            function (msg) {
              alert('error: ' + msg);
            }
          );
        }
    })
    .controller('LoginCtrl', function ($location, $scope, $ionicPopup, $state, $http) {

        $scope.username;
        $scope.password;





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
                  $scope.deleteNotes()
                  window.plugins.googleplus.logout(
                    function (msg) {
                      alert(msg); // do something useful instead of alerting
                    }
                  );
                    $state.go('intro');
                } else {
                    console.log('You are not sure');
                }
            });
        }




        $scope.info = function () {            
            var alertPopup = $ionicPopup.alert({
                title: 'About Quill',
                template: 'Quill helps students learn more from their textbook pages. If you encounter a bug feel free to email us at company@quillapp.io. Interested in Quill? Check out our website at quillapp.io'
             });
            
             alertPopup.then(function (res) {
                 console.log('Thank you for not eating my delicious ice cream cone');
             });

        }

    })
    .controller('PhotoCtrl', function ($scope, Camera, $http, $cordovaCamera, $cordovaImagePicker, $state, $ionicModal, $ionicPopup, $ionicLoading, $jrCrop) {


            $ionicModal.fromTemplateUrl('my-modal2.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.openModal = function () {
                console.log("modal open")
                $scope.modal.show();
                $scope.items = []
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

            $scope.status = "Sending Image";
            $scope.summary;



            $scope.getPhoto = function () {
                Camera.getPicture().then(function (imageURI) {

                    $scope.status = "get picture";
                    $scope.lastPhoto = imageURI;

                    console.log("called the convertToCanvas Function")

                    var newimageURI;
                    $jrCrop.crop({
                        url: imageURI,
                        width: 200,
                        height: 200
                    }).then(function(canvas) {
                        newimageURI = canvas.toDataURL();
                    }, function() {
                        console.log("can't get image");
                    });

                    var newimage = {
                        src: newimageURI,
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

            $scope.picText = function () {
                if($scope.items.length == 0){
                    alert("You didn't choose any photos!");
                }
                else{
                    $scope.loadingbar();
                    $scope.status = "Sending Images ... ";


                    var addInfo = {};

                    var text = "";
                    var url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAFdrwTV52IbCFFo0tISUK007o7p3sfXIo";
                    console.log("ran pictest");
                    //$scope.base64(testPhoto);
                    console.log("items length: " + $scope.items.length);
                    var dataURL;
                    console.log($scope.items.length)
                    var num = 0;
                    items = $scope.items
                    for (var i = 0; i < $scope.items.length; i++) {

                        $scope.status = "Sending Image Number " + num;
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

                    var summary;
                    var concepts;

                    // console.log(postReq)
                    $http.post(url, postReq).then(function (res) {
                        // console.log(res);
                        //alert(res)
                        text += res.data.responses[0].textAnnotations[0].description;
                        text = text.replace(/\n/g, " ");
                      //alert(text)
                        // console.log(text);
                        num += 1
                            //now at this point, we have text, we'll run summary, concepts, and bias;
                        console.log(i)
                      //alert(num)
                        if (items.length == num) {
                          //alert("login")
                          window.plugins.googleplus.login(
                            {
                              // 'scopes': ' ', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
                              // 'webClientId': 'client id of the web app/server side', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
                              // 'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
                            },
                            function (obj) {
                              //alert(JSON.stringify(obj));
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
                                "userID": obj.idToken,
                                "date": str
                            }).then(function (resp) {
                                resp = resp.data
                                console.log(resp);
                              //alert(JSON.stringify(resp))
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
                                addInfo.postID = resp.id;
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
                              $scope.saveData();


                                // console.log(JSON.stringify(addInfo));

                                // window.localStorage.getItem("notes").push(addInfo);

                            });
                        },
                      function (msg) {
                        alert('error: ' + msg);
                      }
                      );}
                    })
                })

                }
                }
        }

     $scope.loadingbar = function(){

    var Base64 = {


    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },


    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}
          var memes =[];

         $http.get("https://api.github.com/repos/kushaltirumala/memestorage/contents/memelist.json", {headers:{'Accept': 'application/json'}}).then(function(resp){

            var response = JSON.parse(Base64.decode(resp.data.content));

            for(var i = 0; i < response.links.length; i++) {
              memes.push(response.links[i]);
            }
            var meme = memes[Math.floor(Math.random()*memes.length)];
            console.log(meme);
            $scope.meme = meme;

            console.log("made it")
            console.log("THE MEME IS " + meme);
            $ionicLoading.show({
                template: $scope.status + "<br> Depending on how many images you've <br>submitted it may take a minute to load.<br> <br> <img src='" + meme + "' style='width:100%;'>"
            });
         }, function(err){
            console.log(JSON.stringify(err));
         })


         //memes by kushal tirumala
        //  var memes = [
        //     "http://25.media.tumblr.com/20463acf0cd7032c1047b03526bc80c4/tumblr_mm6typKnQB1qeak1oo1_500.gif",
        //     "https://40.media.tumblr.com/358994cd528efde9d75e2088deeec8f4/tumblr_ne9stytIE81tpri36o1_500.jpg",
        //     "http://a.fod4.com/misc/Creed%20taliban.gif",
        //     "http://www.relatably.com/m/img/office-appropriate-memes/the-office-meme-jim.jpg",
        //     "http://4.bp.blogspot.com/-4sEseI_hyC4/VRujMvF8ptI/AAAAAAAAD4A/oyTvQbvktr8/s1600/inside%2Bjokes.jpg",
        //     "http://2.bp.blogspot.com/-MmEzOgZi2XQ/UYc94KwI7mI/AAAAAAAAB9c/rrpJt9gw4e0/s1600/MICHAELSFLAWS.jpg",
        //     "http://3.bp.blogspot.com/-m7kV0Qf2ZMM/UYU8Pu4Ft3I/AAAAAAAAB88/yPrk29Hv87s/s1600/superstitious.jpg",
        //     "https://s-media-cache-ak0.pinimg.com/736x/d2/1c/51/d21c517cd10e209038c42a66661251b4.jpg",
        //     "http://memesvault.com/wp-content/uploads/Happy-Friday-Office-Meme-10.jpg",
        //     "http://memesvault.com/wp-content/uploads/Funny-Meme-8.jpg",
        //      "http://i3.kym-cdn.com/photos/images/newsfeed/000/611/250/de9.gif",
        //      "http://cdn2.crushable.com/wp-content/uploads/2012/10/Screen-Shot-2012-10-05-at-10.49.48-AM.png",
        //      "http://big.assets.huffingtonpost.com/ronswansononbacon4-17.400x226.gif",
        //      "http://memesvault.com/wp-content/uploads/Funny-Pictures-With-Captions-About-Women-14.jpg",
        //      "http://www.twitquotes.com/uploads/1/162.jpg"
        // ]
    //code goes here that will be run every 5 seconds.
             // var meme = memes[Math.floor(Math.random()*memes.length)];

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






            //setTimeout($scope.endloadingbar(),60000);

        }
        $scope.endloadingbar = function () {
            console.log("Images Finished Loading")
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

                        if (i < 4) {


                            console.log('Image URI: ' + results[i]);

                            var newimage = {
                                src: results[i],
                                sub: "Most recent photos 03/29/2016"
                            };
                            console.log($scope.items);
                            $scope.items.push(newimage);
                            console.log($scope.items);
                            $scope.reload();
                        } else {

                            alert("You can't upload more than 3 images, sorry!")
                        }
                    }
                },
                function (error) {
                    console.log('Error: ' + error);
                }
            );

        }


    })

.controller('NotesCtrl', function ($scope, $state, $ionicModal, $http, $ionicPopup) {

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

    $scope.deletePost = function (postid, id) {
        var myPopup = $ionicPopup.show({
            template: "Are you sure you want to delete this note?",
            title: "Delete Note",
            scope: $scope,
            buttons: [

                {
                    text: 'Cancel',
                    type: 'button-light',
                    onTap: function () {
                        console.log("hello2");
                        myPopup.close();

                    }
                },
                {
                    text: 'Delete',
                    type: 'button-assertive',
                    onTap: function () {
                        console.log("hello1");
                        myPopup.close();
                        $scope.deletePost2(postid, id);
                    }
                }
            ]
            })

        }



    $scope.deletePost2 = function(postid, id){

      var url = "https://quill-1176.appspot.com/_ah/api/quillApi/v1/post/delete";

      window.plugins.googleplus.login(
        {
          // 'scopes': ' ', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
          // 'webClientId': 'client id of the web app/server side', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          // 'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        },
        function (obj) {
          //alert(JSON.stringify(obj));
          $scope.error;

      $http.post(url, {
          "id": postid,
          "message":obj.idToken

        })

            .then(function (resp) {
                console.log(resp);
                if (resp.data.message == "user fail") {
                    alert("please try logging in again")
                }
                if (resp.data.message == "Post Not in database") {
                    alert("no post in database please reload")
                }
                if (resp.data.message == "success") {
                    alert("Deleted")
                    $scope.newNotes.splice(id, 1)
                    window.localStorage.setItem("notes", JSON.stringify($scope.newNotes));
                    $state.go('tab.notes');
                }

            });
    // });
    },
      function (msg) {
        alert('error: ' + msg);
      }
  );

    }
    $scope.saveDatas = function(){
      var storedNotes = JSON.parse(window.localStorage.getItem("notes"));
      $scope.newNotes = storedNotes
    }
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
      window.plugins.googleplus.login(
        {
          // 'scopes': ' ', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
          // 'webClientId': 'client id of the web app/server side', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
          // 'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
        },
        function (obj) {
          //alert(JSON.stringify(obj));
          $scope.error;
            var url = "https://quill-1176.appspot.com/_ah/api/quillApi/v1/user/return/posts"
        $http.post(url, {
          "message":obj.idToken
                // "passwrd": storedUsername
        }).then(function (resps) {

            // console.log(resps)
            console.log(notes)
            resps = resps.data.posts
          //alert(JSON.stringify(resps))
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
                addInfo.postID = resp.id;
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
        },
        function (msg) {
          alert('error: ' + msg);
        }
      );

    }
  $scope.deleteNotes = function(){
    $scope.Newnotes = []
  }



    $scope.loadData = function () {
        //alert(window.localStorage.getItem("data"));
    }



    $scope.goto = function (toState, params) {
        $state.go(toState, params) //remember to inject $state to your controller
    }


})

.controller('NoteDetailCtrl', function ($scope, $stateParams, $cordovaEmailComposer) {
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
        var comments = "Keywords: " + $scope.Newnotes[lastChar].keywords[0] + "Summary: " + $scope.Newnotes[lastChar].summary + "Text: " + $scope.Newnotes[lastChar].text;

        var config = {
            'subject': "Saved Notes from Quill",
            'comments': "Keywords: " + $scope.Newnotes[lastChar].keywords[0] + "<br> Summary: " + $scope.Newnotes[lastChar].summary + "<br> Text: " + $scope.Newnotes[lastChar].text
        }

        var emails = {
            subject: "Saved Notes from Quill",
            body: comments,
            isHtml: false
        };
        window.plugin.email.open(emails, function () {
            console.log("email view dismissed")
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
