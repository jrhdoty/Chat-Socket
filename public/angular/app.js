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
          console.log('on: ', args);
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
    var messageList = [];

    socket.on('message:get', function(msg){
      messageList.push(msg);
      console.log('messageList: ', messageList);
    });

    return {
      postMessage:function(message){
        socket.emit('message:send', message);
      },
      getMessageList: function(){return messageList;}
    };
  })
  .controller('chatroom', function($scope, messages){
    $scope.currentUser = null;
    $scope.messages = messages.getMessageList();

    $scope.setUser = function(){
      console.log('setting currentUser');
      $scope.currentUser = $scope.tempUser;
    };

    $scope.submit = function(){
      messages.postMessage(
      {
        message: $scope.currentMessage,
        user: $scope.currentUser
     });
  };
});
