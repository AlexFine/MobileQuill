angular.module('starter.services', [])

.factory('Notes', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var notes = [{
    id: 0,
    name: 'World War Two, D-Day, Omaha Beach',
    lastText: 'The invation of normandy marked the begginning of the end for Germany',
    face: 'img/text1.JPG',
    date: '03/11/2016'
  }, {
    id: 1,
    name: 'Electrochemistry, Galvanic Cells, Redox Reactions',
    lastText: 'Galvanic cells spontaniously produce electricity in systems and require a salt bridge.',
    face: 'img/text2.JPG',
    date: '03/09/2016'
  }, {
    id: 2,
    name: 'Civil Rights, FDR, 1932 Election',
    lastText: "Despite FDR's successful economic plans, he faltered on social rights issues.",
    face: 'img/text3.JPG',
    date: '03/06/2016'
  }, {
    id: 3,
    name: 'Donald Trump, Racism, Bigotry',
    lastText: 'Donald Trump and his campaign messages alarming remind the American ',
    face: 'img/text4.JPG',
    date: '03/05/2016'
  }, {
    id: 4,
    name: 'Bernie Sanders, Hilary Clinton, DNC',
    lastText: 'Hilary Clinton and Bernie Sanders are battling for the Democratic National Convention support, with Hilary gaining much of the popularity.',
    face: 'img/text5.JPG',
    date: '03/01/2016'
  }];

  return {
    all: function() {
      return notes;
    },
    remove: function(note) {
      notes.splice(notes.indexOf(note), 1);
    },
    get: function(noteId) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === parseInt(noteId)) {
          return notes[i];
        }
      }
      return null;
    }
  };
})

//.factory('Camera', ['$q', function($q) {
//    //q allows us to run functions asynchronously
//    //For more information see https://docs.angularjs.org/api/ng/service/$q
//    //Use as input for the tesseract 
//    return{
//        getPicture: function() {
//            var q = $q.defer();
//            var options = {
//                quality:100,
//                //quality of image/canvas
//                //destinationType = Camera.DestinationType.DATA_URL,
//                //Destination of image. This is not applicable for us. 
//                sourceType: Camera.PictureSourceType.CAMERA,
//                allowEdit: true,
//                targetWidth: 100, 
//                targetHeight: 100,
//                popoverOptions: CameraPopoverOptions, 
//                saveToPhotoAlbum: false,
//                correctOrientation: true
//                //All the settings for taking the photo
//            };
//            navigator.camera.getPicture(function (result) {
//                q.resolve(result);
//            }, function(err){
//                q.reject(err);
//                
//            }, options);
//            return q.promise;
//        }
//    }
//}]);
.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
      var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  }
}]);
