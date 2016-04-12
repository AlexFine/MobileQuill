angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
.run(function ($ionicPlatform, $rootScope, $state) {

    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });



})


.config(function ($stateProvider, $urlRouterProvider) {

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
    
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })
    
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
    $urlRouterProvider.otherwise('/intro');
});