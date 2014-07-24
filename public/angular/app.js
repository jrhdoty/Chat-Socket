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
  .factory('socket', function($rootScope){
    var socket = io.connect();
    return {
      on : function(event, callback){
        socket.on(event, function(){
          var args = arguments;
          $rootScope.$apply(function(){
            callback.apply(socket, args);
          });
        });
      },

      emit: function(event, data, callback){
        socket.emit(event, data, function(){
          var args = arguments;
          $rootScope.$apply(function(){
            callback.apply(socket, args);
          });
        });
      }
    };
  })
  .factory('messages', function(socket){
    var messageList = null;
    return {
      postMessage:function(message){
        socket.emit('message:post', message);
      }
    };
  })
  .controller('chatroom', function($scope, messages){
    $scope.currentUser = null;
    // $scope.messages = messages.getMessageList();

    $scope.setUser = function(){
      console.log('setting currentUser');
      $scope.currentUser = $scope.tempUser;
    };

    $scope.submit = function(){
      messages.postMessage($scope.currentMessage);
    };
  });
