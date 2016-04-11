angular.module('starter.services', [])

.factory('Notes', function() {
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
                console.error('ERR', JSON.stringify(err)); 
              });
          }, function (err) {
            console.error('ERR', JSON.stringify(err)); 
          });

        return notes;
    }
  };
})

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

