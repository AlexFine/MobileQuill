angular.module('starter.controllers', [])

.controller('PhotoCtrl', function($scope) {})

.controller('HomeCtrl', function($scope, Notes) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.notes = Notes.all();
  $scope.remove = function(note) {
    Notes.remove(note);
  };
})

.controller('NoteDetailCtrl', function($scope, $stateParams, Notes) {
  $scope.note = Notes.get($stateParams.noteId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LoginCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
