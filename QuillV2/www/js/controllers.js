
angular.module('starter.controllers', ['ion-gallery'])

.controller('PhotoCtrl', function ($scope, Camera, $http) {


    $scope.lastPhoto = "../img/text.png";
    $scope.status = "start status";
    $scope.summary;

    $scope.items = [
        {
            src: 'img/text1.JPG',
            sub: 'Most recent photos 03/11/2016'
  },
        {
            src: 'img/text2.JPG',
            sub: 'Most recent photos 03/09/2016'/* Not showed */
  },
        {
            src: 'img/text3.JPG',
            sub: 'Most recent photos 03/07/2016'/* Not showed */
  },
        {
            src: 'img/text4.JPG',
            sub: 'Most recent photos 03/05/2016'/* Not showed */
  },
        {
            src: 'img/text5.JPG',
            sub: 'Most recent photos 03/04/2016'/* Not showed */
  }

]

    $scope.getPhoto = function () {
        Camera.getPicture().then(function (imageURI) {

            $scope.status = "get picture";
            $scope.lastPhoto = imageURI;
 

            console.log("called the convertToCanvas Function")

             var newimage = {
                src:'img/text6.JPG',
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



    };

    $scope.convertToCanvas = function (lastPhoto) {

        
        console.log("success")
        gapi.client.vision.images.annotate(
          postReq).execute(function (resp) {

          console.log(resp);
        });
      

    }

    

    $scope.picText = function ($http) {


            var text;
        
            text = "When we looked at the boxplots for the Average Wind Speed by Month, we noticed that several days stood out as possible outliers and that one very windy day in November seemed truly remarkable. What should we do with such outliers? Cases that stand out from the rest of the data almost always deserve our attention. An outlier is a value that does not fit with the rest of the data, but exactly how different it should be to be treated specially is a judgement call. Boxplots provide a rule of thumb to highlight these unusual points, but that rule doesn't tell you what to do with them. So what should we do with outliers? The first thing to do is to try and understand them"
            + "in the contect of the data. A good place to strat is with the histogram. Histograms show us more detail about a distribution than a boxplot can, so they give us a better idea of how the outlier fits (or doesn't fit) in with the rest of the data. A histogram of the Average Wind Speed if NOvember shows a slightly skewed main body of data and that very windy day clearly set apart from the other days. When considering whether a case in an outlier, we often look at tge gap between that case and the rest of the data. A large gap suggests that the case really is quite different. But a case that just happens to be the largest or smallest value at the end of a possibly stretched-out tail may be the best thought of as just....the largest or smallest value. After all, some case has ot be the largest or smallest. Some outliers are simply unbeliveable. If a class survey includes a student who claims to be 170 inches tall (about 14 feet, or 4.3 meters), you can be pretty sure that's an error. Once you've identified likely outliers, you should always investigate them. Some outliers are just errors. A decimal point may have been misplaced, digits transposed, or digits repeated and omitted. The units may be wrong. Or a number may jut have been transcribed in correctly"
            + ", perhaps copying an adjacent value on the original data sheet. If you can identify the correct value, then you should certainly fix it. One important reason to look into outliers is to correct errors in your data."
            + "Many outliers are not wrong, they're just different. Such cases often repay the effort to understand them. You can learn more from the extraordinary cases than from summaries of the overall data set. What about a windy November day? Was it really that windy, or could there have been problem with the anemometers? A quick Internet search for weather on November 21, 1989, finds that there was a severe storm"



            $scope.text = text;


            $scope.summary = "Although boxplots provide some information abut outliers. they don't tell us what to do with outliers. So what should we do with outliers? We have to understand them in the context of the data, using a histogram. Histograms give an idea of whether the outlier fits or not. Some outliers can be unbelievable, and so you cna be sure it is an error. Outliers can be errors, such as a misplaced decimal point or wrong units. Many outliers are not wrong; they are just different and so it is good to try and understand them. You can learn more from the extraordinary cases than from summaries of the overall data set."

            return text;
        }
      
    $scope.api = function (text) {
       
        $scope.summary = "Although boxplots provide some information abut outliers. they don't tell us what to do with outliers. So what should we do with outliers? We have to understand them in the context of the data, using a histogram. Histograms give an idea of whether the outlier fits or not. Some outliers can be unbelievable, and so you cna be sure it is an error. Outliers can be errors, such as a misplaced decimal point or wrong units. Many outliers are not wrong; they are just different and so it is good to try and understand them. You can learn more from the extraordinary cases than from summaries of the overall data set."

    }




    //Select photo testing here
    // 1
    $scope.images = [];

    $scope.addImage = function () {
        // 2
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
        };

        // 3
        $cordovaCamera.getPicture(options).then(function (imageData) {

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

                window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (fileSystem2) {
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

                for (var i = 0; i < 5; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }

        }, function (err) {
            console.log(err);
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
