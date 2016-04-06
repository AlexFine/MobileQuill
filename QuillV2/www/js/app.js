// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ion-gallery'])

.run(function ($ionicPlatform, $rootScope, $state, jwtHelper) {


    //currentuser will be set to something other than null over here when u link to login
//    currentUser = "hi";
//    $rootScope.user = null;
//    $rootScope.isLoggedIn = false;
//
//    if (currentUser) {
//        $rootScope.user = currentUser;
//        $rootScope.isLoggedIn = true;
//        $state.go('tab.photo');
//
//    }

    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    //I'm not sure if this is where I put this code. I think it might need to go in the controllers section where the login stuff is located.
//    $rootScope.$on('$locationChangeStart', function () {
//        var token = store.get('token');
//        if (token) {
//            if (!jwtHelper.isTokenExpired(token)) {
//                if (!auth.isAuthenticated) {
//                    auth.authenticate(store.get('profile'), token);
//                }
//            }
//            //else{ show Login page. This is like if the user is not loged in show login page. I feel like debuggin where clarify where this stuff goes }
//        }
//    })
//    auth.hookEvents();

})


.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


        .state('intro', {
        url: '/intro',
        templateUrl: 'templates/intro.html',
        controller: 'IntroCtrl'
    })
    
    

    .state('login', {
            url: '/login',
            views: {
                '': {
                    templateUrl: 'templates/login-page.html',
                    controller: 'LoginCtrl'
                }
            }
        })
        .state('signup', {
            url: '/signup',
            views: {
                '': {
                    templateUrl: 'templates/signup-page.html',
                    controller: 'SignUpController'
                }
            }
        })

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })


    // Each tab has its own nav history stack:



    .state('photo', {
        url: '/photo',
        views: {
            'tab-photo': {
                templateUrl: 'templates/tab-photo.html',
                controller: 'PhotoCtrl'
            }
        }
    })

    .state('tab.notes', {
            url: '/notes',
            views: {
                'tab-notes': {
                    templateUrl: 'templates/tab-notes.html',
                    controller: 'NotesCtrl'
                }
            }
        })
        .state('tab.note-detail', {
            url: '/notes/:noteId',
            views: {
                'tab-notes': {
                    templateUrl: 'templates/note-detail.html',
                    controller: 'NoteDetailCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/tab/notes');
    $urlRouterProvider.otherwise('/intro');





});