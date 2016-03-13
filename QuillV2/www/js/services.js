angular.module('starter.services', [])

.factory('Notes', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var notes = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
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
