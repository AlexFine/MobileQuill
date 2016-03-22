angular.module('starter.services', [])

.factory('Notes', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var notes = [{
    id: 0,
    name: 'World War Two, D-Day, Omaha Beach',
    lastText: 'The invation of normandy marked the begginning of the end for Germany',
    summary: 'At the beginning of World War 2, Germany invaded Poland, causing France, Great Britain and Canada to declare war on Germany. By the spring of 1940, the German army was ready to invade France, defended by not only the French military, but also a sizable British force as well. Within six weeks, the Germans defeated the Allies and seized control of France. By 1944, the Germans knew that the Allies, also now including the United States, among others, would attempt an invasion of France to liberate Europe from Germany. The Allied forces, based in Britain, decided to begin the invasion by landing a huge army at a place called Normandy Beach, which is located on the northwest coast of France. Code-named "Operation Overlord", and commanded by American General Dwight D. Eisenhower, the Allies landed on June 6, 1944 at five beaches in the Normandy area with the code names of: Utah Beach, Omaha Beach, Gold Beach, Juno Beach and Sword Beach. Prior to the actual amphibious invasion, Allied planes pounded the Nazi defenders and dropped thousands of paratroopers behind German lines the night before the seaborne landings. Local French Resistance forces, alerted to the imminent invasion, engaged in behind-the-lines sabotage and combat against the occupying Germans.',
    face: 'img/text1.JPG',
    extraresearch:'Formal planning for the invasion of Northwest Europe began in 1943. A group led by British General Frederick Morgan searched for the best point along the coast to strike and started drawing up assault plans. In May, at an Allied conference in Washington, D.C., a target date of spring 1944 was set for the long-awaited attack.In December 1943 a commander for the operation was selected. The choice was an American,General Dwight D. Eisenhower. Eisenhower had directed Allied invasion forces in North Africa and Italy. He took up his new post,Supreme Commander Allied Expeditionary Force,in January 1944. Eisenhower approved of Morgans selection of the Normandy coast in France as the invasion site, but he increased the size of the assault force. He and his staff then prepared the details of a plan to organize, transport, land, and supply the largest amphibious invasion force in history.The operation was code-named "Overlord." The outcome of the war rested upon its success.The plan for Operation Overlord entailed landing nine divisions of sea and airborne troops, over 150,000 men, along a 60-mile stretch of coast in just 24 hours.On D-Day, three airborne divisions, one British and two American, would drop behind the landing beaches. Their job,seize beach exits, capture key transportation and communication points, and block German counterattacks.Six divisions would assault the five landing beaches. Each beach had a code name. Utah Beach was assigned to the U.S. 4th Division. The US 29th and 1st Divisions would land at Omaha Beach. Further east, the British 50th Division would assault Gold Beach and the Canadian 3rd Division would attack at Juno Beach. The British 3rd Division would take Sword Beach.',
    keywords:['Normandy', 'Germany', 'Unite States', 'Operation Overlord', 'Omaha Beach', 'Casualties'],
    date: '03/11/2016'
  }, {
    id: 1,
    name: 'Electrochemistry, Galvanic Cells, Redox Reactions',
    lastText: 'Galvanic cells spontaniously produce electricity in systems and require a salt bridge.',
    summary:'Voltaic (galvanic) cells are electrochemical cells that contain a spontaneous reaction, and always have a positive voltage. The electrical energy released during the reaction can be used to do work. A voltaic cell consists of two compartments called half-cells. The half-cell where oxidation occurs is called the anode. The other half-cell, where reduction occurs, is called the cathode. The electrons in voltaic cells flow from the negative electrode to the positive electrode—from anode to cathode (see figure below). (Note: the electrodes are the sites of the oxidation and reduction reactions). The following acronym is useful in keeping this information straight:Red Cat and An OxReduction Cathode and Anode OxidationFor an oxidation-reduction reaction to occur, the two substances in each respective half-cell are connected by a closed circuit such that electrons can flow from the reducing agent to the oxidizing agent. A salt bridge is also required to maintain electrical neutrality and allow the reaction to continue.',
    face: 'img/text2.JPG',
    extraresearch:'The oxidation of Zn(s) into Zn2+ and the reduction of Cu2+ to Cu(s) occur spontaneously. In other words, the redox reaction between Zn and Cu2+ is spontaneous. This is due to the difference in potential energy between the two substances. The difference in potential energy between the anode and cathode dictates the direction of electronic movement. Electrons move from areas of higher potential energy to areas of lower potential energy. In this case, the anode has a higher potential energy; electrons therefore move from anode to cathode. The potential difference between the two electrodes is measured in units of volts. One volt (V) is the potential difference necessary to generate a charge of 1 coulomb (C) from 1 joule (J) of energy.',
    keywords:['Oxidation-Reduction', 'Standard Cell Potential', 'Cathode', 'Anode', 'Redox Reactions'],
    date: '03/09/2016'
  }, {
    id: 2,
    name: 'Civil Rights, FDR, 1932 Election',
    lastText: "Despite FDR's successful economic plans, he faltered on social rights issues.",
    summary:'In June 1941, Roosevelt issued Executive Order 8802, which created the Fair Employment Practice Committee (FEPC). It was the most important federal move in support of the rights of African-Americans between Reconstruction and the Civil Rights Act of 1964. The Presidents order stated that the federal government would not hire any person based on their race, color, creed, or national origin. The FEPC enforced the order to ban discriminatory hiring within the federal government and in corporations that received federal contracts. Millions of blacks and women achieved better jobs and better pay as a result. The war brought the race issue to the forefront. The Army and Navy had been segregated since the Civil War. But by 1940 the African-American vote had largely shifted from Republican to Democrat, and African-American leaders like Walter Francis White of the NAACP and T. Arnold Hill of the Urban League had become recognized as part of the Roosevelt coalition. In June 1941, at the urging of A. Philip Randolph, the leading African-American trade unionist, Roosevelt signed an executive order establishing the Fair Employment Practice Committee and prohibiting discrimination by any government agency, including the armed forces. In practice the services, particularly the Navy and the Marines, found ways to evade this order — the Marine Corps remained all-white until 1943. In September 1942, at Eleanors instigation, Roosevelt met with a delegation of African-American leaders, who demanded full integration into the forces, including the right to serve in combat roles and in the Navy, the Marine Corps and the United States Army Air Forces. Roosevelt agreed, but then did nothing to implement his promise. It was left to his successor, Harry S. Truman, to fully desegregate the armed forces.',
    face: 'img/text3.JPG',
    extraresearch:'President Franklin D. Roosevelts smashing victory in the 1936 presidential election revealed that the American political landscape had shifted. With FDR at its head, the Democratic Party put together a formidable coalition whose main components were lower-income groups in the great cities—African-Americans, union members, and ethnic and religious minorities, many from recent immigrant groups—and the traditional source of Democratic strength, "the Solid South." Roosevelt carried every former Confederate state all four times he ran, but no Democrat has done so since 1944, FDRs final race. This "New Deal coalition," as it came to be known, powered the Democratic Party for the next thirty years. Its strong hold on these voters was due largely to the social, political, economic, and cultural changes wrought by the Depression, the New Deal, and World War II.',
    keywords:['New Deal', 'Changes in the 1940s', 'FEPC'],
    date: '03/06/2016'
  }, {
    id: 3,
    name: 'Donald Trump, Racism, Bigotry',
    summary:'If you were one of the handful of Americans who watched Saturday’s Democratic presidential debate, you saw Sen. Bernie Sanders make an extended and impassioned statement against Donald Trump, tying his success to inequality and insecurity in the American economy.“[T]hey’re looking around them,” said Sanders of ordinary Americans, “and they’re looking at Washington, and they’re saying the rich are getting much richer, I’m getting poorer, what are you going to do about it? What are you going to do for my kids?”In that environment, says Sanders, a Trump-type can seduce. “[S]omebody like a Trump comes along and says, ‘I know the answers. The answer is that all of the Mexicans, they’re criminals and rapists, we’ve got to hate the Mexicans. Those are your enemies. We hate all the Muslims, because all of the Muslims are terrorists. We’ve got to hate the Muslims.’ Meanwhile, the rich get richer.”In Sanders’ narrative, Trump is channeling class anger into prejudice, and exploiting the result. And Sanders isn’t the only person who thinks this. In an interview with NPR’s Steve Inskeep, President Obama offered similar sentiments. “[P]articularly blue-collar men have had a lot of trouble in this new economy, where they are no longer getting the same bargain that they got when they were going to a factory and able to support their families on a single paycheck,” said Obama. “You combine those things, and it means that there is going to be potential anger, frustration, fear—some of it justified, but just misdirected,” he continued. “I think somebody like Mr. Trump is taking advantage of that. That’s what he’s exploiting during the course of his campaign."',
    lastText: 'Donald Trump and his campaign messages alarming remind the American ',
    extraresearch:'Donald John Trump (born June 14, 1946) is an American businessman, politician, television personality, and candidate for the Republican nomination for President of the United States in the 2016 election. He is the chairman and president of The Trump Organization and the founder of the gaming and hotel enterprise Trump Entertainment Resorts (now owned by Carl Icahn).Trump, who is from Queens in New York City, is a son of real estate developer Fred Trump. While attending college, he worked for his fathers firm, Elizabeth Trump & Son. Upon graduating from college in 1968 he joined the company, and in 1971 was given control, renaming the company "The Trump Organization". Since then he has built casinos, golf courses, hotels, and other properties, many of which bear his name. Trump and his businesses have received prominent media exposure, and he hosted a popular NBC reality show, The Apprentice, from 2005 to 2015. His three marriages have been highly publicized.Trump first campaigned for the U.S. presidency in 2000, winning two Reform Party primaries. On June 16, 2015, Trump again announced his candidacy for president, this time as a Republican. He became known for his opposition to immigration, free trade, and military interventionism[4] and eventually emerged as the front-runner for the Republican nomination.[5] As of March 16, 2016, he has won 20 contests in the 2016 Republican presidential primaries.',
    face: 'img/text4.JPG',
    keywords:['Donald Trump', 'Presidential Election', 'Bernie Sanders', 'American Economy'],
    date: '03/05/2016'
  }, {
    id: 4,
    name: 'Gravity Waves',
    summary:'One hundred years after Albert Einstein predicted the existence of gravitational waves, scientists have finally spotted these elusive ripples in space-time.In a highly anticipated announcement, physicists with the Advanced Laser Interferometer Gravitational-Wave Observatory (LIGO) revealed on 11 February that their twin detectors have heard the gravitational "ringing" produced by the collision of two black holes about 400 megaparsecs (1.3 billion light-years) from Earth1, 2.“Ladies and gentlemen, we have detected gravitational waves,” David Reitze, the executive director of the LIGO Laboratory, said at a Washington DC press conference. “We did it!”Gravitational waves: 6 cosmic questions they can tacklOne black hole was about 36 times the mass of the Sun, and the other was about 29 solar masses. As they spiralled inexorably into one another, they merged into a single, more-massive gravitational sink in space-time that weighed 62 solar masses, the LIGO team estimates.“These amazing observations are the confirmation of a lot of theoretical work, including Einsteins general theory of relativity, which predicts gravitational waves,” says physicist Stephen Hawking of the University of Cambridge, UK. Hawking noted that Einstein himself never believed in black holes.',
    lastText: 'Einsteins gravity waves found at last',
    'extraresearch': 'It was an oscillation that began at 35 cycles per second (hertz) and rapidly increased to 250 hertz. It then became chaotic and rapidly died down; the whole thing was over within one-fourth of a second. Crucially, both detectors saw it at roughly the same time — Livingston first and Hanford 7 milliseconds later. That delay is an indication of how the waves swept through the Earth.Other gravitational-wave detectors — the Virgo interferometer near Pisa, Italy, and the GEO600 interferometer near Hannover — were not operating at the time and so could not confirm the signal. Had Advanced Virgo been on, it would have probably detected the event as well, says its spokesperson, Fulvio Ricci, a physicist at the University of Rome La Sapienza. LIGO scientists have run a series of careful checks to ensure that the signal is real and means what they think it does.In the past, a few senior members of the LIGO team have tested the groups ability to validate a potential discovery by secretly inserting ‘blind injections’ of fake gravitational waves into the data stream to test whether the research team can differentiate between real and fake signals. But the September detection happened before blind injections were being made, so it is thought to be a signal from a real astrophysical phenomenon in the Universe.',
    face: 'img/text5.JPG',
    keywords:['Einstein', 'LIPO', 'Gravity Waves', 'Space-time'],
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

