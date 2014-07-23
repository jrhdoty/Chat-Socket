angular.module('app', ['ui.router'])
  .config(function($stateProvider){
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl:'/angular/features/home/home.html'
      })
      .state('account', {
        url:'/account',
        templateUrl:'partials/account'
      });
})
  .controller('chatroom', function($scope){
    $scope.currentUser = null;
    $scope.messages = [];
    $scope.messages.push(
      { 
        text: 'hello world',
        user: 'john doe'
      });
    $scope.setUser = function(){
      console.log('setting currentUser');
      $scope.currentUser = $scope.tempUser;
    };
  });
