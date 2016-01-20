angular.module('starter.services', [])
  .factory('Camera', ['$q', function ($q) {

    return {                                //This actually takes the picture
      getPicture: function () {
        var q = $q.defer();
        var options = {
          quality: 100,
          //destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          //encodingType: Camera.EncodingType.JPEG,
          targetWidth:window.innerWidth,
          targetHeight: window.innerHeight,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
        };
        navigator.camera.getPicture(function (result) {
          // Do any magic you need
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    }
  }])
  //.factory('Upload', function ($q, $cordovaCamera, $cordovaFileTransfer) {
  //  return {
  //    fileTo: function (serverURL) {
  //      //alert("we reached point 1");
  //      var deferred = $q.defer();
  //      if (ionic.Platform.isWebView()) {
  //        //alert("we reached point 2");
  //        var options = {
  //          quality: 100,
  //          destinationType: Camera.DestinationType.FILE_URI,
  //          encodingType: Camera.EncodingType.JPEG
  //        }                                                                   //  This uploads the picture asyncronoslys
  //        $cordovaCamera.getPicture(options).then(
  //          function (fileURL) {
  //            //alert("we reached pt 3:" + fileURL);
  //            //alert("we reached pt 4:" + fileURL)
  //            var uploadOptions = {
  //              fileKey: "file",
  //              fileName: fileURL.substr(fileURL.lastIndexOf('/') + 1),
  //              mimeType: "image/jpeg",
  //              chunkedMode: false
  //            };
  //            $cordovaFileTransfer.uploadFile(serverURL, fileURL, uploadOptions).then(
  //              function (result) {
  //                //alert("hello" + result);
  //              },
  //              function (err) {
  //                //alert("1" + err);
  //              },
  //              function (progress) {
  //                //alert(progress);
  //              });
  //          },
  //
  //          function (err) {
  //            alert("LINE 631" + err);
  //          });
  //      } else {
  //        deferred.reject('Uploading not supported in browser');
  //      }
  //      return deferred.promise;
  //    }
  //  }
  //})
  .service('noteCreation', ['$http', 'photos', function ($http, photos) {

    return {
      getNotes: function (text) {



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
      },
      getArticlesArray: function (notes) {
        //how i finally decide to do it:
        //get the ranked entities --> put in the appropro queries EXCEPT for timestamp
        //timestamp = last 6 months, any important articles + second timestamp = recent articles IFF recent articles have ALL the other queryfields matched (change this later as in during the weekend)
        //if ^ that is less that 5 articles, extend timestamp to 12months, and if not, extend to 3 years. otherwise leave articleNumber as is.
        //THEN, for eac article, provide short description that shows, publication date, author, top concepts, sentiment (change color of title) AND option
        //to view text --> pop up model that extracts the text with text extraction API from alchemy WITH highlighted areas of importance
        //provide option to share/save the article AND go to the article in web browser
        var countOfArticles = 5;
        var conceptsPerArticle = 2;
        var entitiesPerArticle = 3;
        var firstTimeStamp = "180d";
        var recentTimeStamp = "30d";
        var articles = [];
        //var notes = [];




        var titleArray ="";
        var typeArray =""
        for (var i = 0; i < notes.length; i++) {
          if(i != 0) {
            if ( i != 1 ) {
              titleArray+= "^";
              typeArray+="^";
            }
            titleArray+=notes[i].text;
            typeArray+=notes[i].type;
          }
        }
        console.log("entity 1 name: " + notes[0].text);
        console.log("entity 1 type: " + notes[0].type);
        console.log("titleArray: +" + titleArray);
        //get the title or statement
        //api call -->
        //$http.get("https://access.alchemyapi.com/calls/data/GetNews?apikey=2caf1d6439b2ff5593bdaf31ec03919f937c3a56&return=enriched.url.title,enriched.url.url,enriched.url.author,enriched.url.publicationDate,enriched.url.enrichedTitle.entities,enriched.url.enrichedTitle.docSentiment,enriched.url.enrichedTitle.concepts&start=now-" + recentTimeStamp + "&end=now&q.enriched.url.enrichedTitle.entities.entity=|text="+notes[0].text+",type="+notes[0].type+"|&q.enriched.url.title=notes[0].text&q.enriched.url.text="+titleArray+"&count=5&outputMode=json")
        //console.log("https://access.alchemyapi.com/calls/data/GetNews?apikey=2caf1d6439b2ff5593bdaf31ec03919f937c3a56&return=enriched.url.title,enriched.url.url,enriched.url.author,enriched.url.publicationDate,enriched.url.enrichedTitle.entities,enriched.url.enrichedTitle.docSentiment,enriched.url.enrichedTitle.concepts&start=now-" + recentTimeStamp + "&end=now&q.enriched.url.enrichedTitle.entities.entity=|text="+notes[0].text+",type="+notes[0].type+"|&q.enriched.url.title="+notes[0].text+"+&q.enriched.url.text="+titleArray+"&count=5&outputMode=json");
        $http.get("https://access.alchemyapi.com/calls/data/GetNews?apikey=" + api + "&return=enriched.url.title,enriched.url.url,enriched.url.author,enriched.url.publicationDate,enriched.url.enrichedTitle.entities,enriched.url.enrichedTitle.docSentiment,enriched.url.enrichedTitle.concepts&start=now-" + recentTimeStamp + "&end=now&q.enriched.url.enrichedTitle.entities.entity=|text="+notes[0].text+",type="+notes[0].type+"|&q.enriched.url.title="+notes[0].text+"+&q.enriched.url.text="+titleArray+"&count=5&outputMode=json")
          .then(function (response) {
            rawarticles = response.data;
            //console.log(JSON.stringify(response.data));

            for(var x = 0; x < rawarticles.result.docs.length; x++) {

              var objectToAdd = {};
              var conceptsToAdd = [];
              var entitiesToAdd = [];
              for (var j = 0; j < conceptsPerArticle; j++) {
                conceptsToAdd.push(rawarticles.result.docs[x].source.enriched.url.enrichedTitle.concepts[j]);
              }
              objectToAdd.concepts = conceptsToAdd;
              for (var a = 0; a < entitiesPerArticle; a++) {
                entitiesToAdd.push(rawarticles.result.docs[x].source.enriched.url.enrichedTitle.entities[a]);
              }

              objectToAdd.entitiesToAdd = entitiesToAdd;

              objectToAdd.url = rawarticles.result.docs[x].source.enriched.url.url;
              objectToAdd.author = rawarticles.result.docs[x].source.enriched.url.author;
              objectToAdd.title = rawarticles.result.docs[x].source.enriched.url.title;
              objectToAdd.sentiment = rawarticles.result.docs[x].source.enriched.url.enrichedTitle.docSentiment.score;
              objectToAdd.publicationDate = rawarticles.result.docs[x].timestamp;
              //objectToAdd.text = call text exrtraction api here;
              articles.push(objectToAdd);
              console.log(objectToAdd);
            }
          }, function (err) {
            console.error('ERR', JSON.stringify(err));
          });

        // }, function (err) {
        //     console.error('ERR' + JSON.stringify(err));
        // });
        return articles;
      }
    }
  }])
