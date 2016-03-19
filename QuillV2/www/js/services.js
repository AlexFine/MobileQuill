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
    },
    getIBMNotes:function(text) {
        var words = text.split(" ");
        var relevance = (Math.log(words.length / 500) / Math.LN10) + 0.6;
        var apikeys = ["4fae7a8b25921ca2646f1bbb121e3185c1a06ad5", "e616d19e7eb129a5ff63b8d7cdf8cb095a1a8a12", "f324c6866929c38be963aa75a915cbf4ff1b2243"];
        var api = apikeys[Math.floor(Math.random()*apikeys.length)];
        //Mathematically modeling the number of notes - kush
        //console.log("relevance for index: " + relevance);

        var notes = [];

        //alert(text);
        $http.get("http://access.alchemyapi.com/calls/text/TextGetRankedNamedEntities?apikey=" + api + "&text=" + text + "&outputMode=json")
          .then(function (resp) {
            rawnotes = resp.data;
            //go through the top ones to store and put them in the notes array
            for (var i = 0; i < rawnotes.entities.length; i++) {
              if (rawnotes.entities[i].relevance > relevance) {
                notes.push(rawnotes.entities[i]);

                notes[notes.length - 1].sentences = [];
                notes[notes.length - 1].subTopics = [];
                notes[notes.length - 1].dresearch = [];

              }
            }



            $http.get("http://access.alchemyapi.com/calls/text/TextGetRelations?apikey=" + api + "&text=" + text + "&outputMode=json&keywords=1")
              .then(function (resp2) {
                rawnotes2 = resp2.data;
                for (var x = 0; x < notes.length; x++) {
                  for (var j = 0; j < rawnotes2.relations.length; j++) {
                    if (rawnotes2.relations[j].subject.hasOwnProperty("keywords")) {
                      if (notes[x].text == rawnotes2.relations[j].subject.keywords[0].text) {

                        notes[x].sentences.push(rawnotes2.relations[j].object.text)

                        if (rawnotes2.relations[j].object.hasOwnProperty("keywords")) {

                          for (var b = 0; b < rawnotes2.relations[j].object.keywords.length; b++) {

                          }
                        }
                      }
                    }
                  }
                }
              }, function (err) {
                console.error('ERR', JSON.stringify(err)); //TODO save  to parse
              });
          }, function (err) {
            console.error('ERR', JSON.stringify(err)); //TODO save  to parse
          });

        return notes;
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

