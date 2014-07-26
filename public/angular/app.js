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
  .factory('messages', function(socket, $rootScope){
    var messageList = [];

    socket.on('message:get', function(msg){

      if($rootScope.currentUser === msg.user){
        msg.currentUser = true;
      }
      messageList.push(msg);
    });

    return {
      postMessage:function(message){
        socket.emit('message:send', message);
      },
      getMessageList: function(){return messageList;}
    };
  })
  .controller('chatroom', function($rootScope, $scope, messages){
    $rootScope.currentUser = null;
    $scope.messages = messages.getMessageList();

    $scope.setUser = function(){
      $rootScope.currentUser = $scope.tempUser;
    };

    $scope.submit = function(){
      messages.postMessage(
      {
        message: $scope.currentMessage,
        user: $scope.currentUser
     });
  };
})
  .directive('enterSubmit', function () {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        console.log('scope is: ', scope);
        console.log('elem is: ', elem);
        console.log('attrs is: ', attrs);
        elem.bind('keydown', function(event) {
          var code = event.keyCode || event.which;
                  
          if (code === 13) {
            if (!event.shiftKey) {
              event.preventDefault();
              scope.$apply(attrs.enterSubmit);
            }
          }
        });
      }
    };
  })
  .directive('autoScroll', function(){
    return {
      restrict: 'A',
      scope: {
        items:'=items'
      },
      link:function(scope, elem, attr){
        console.log("INSIDE AUTOSCROLL");
        console.log("scope.items: ", scope.items);
        scope.$watch('items', function(newItems, oldItems){
          elem[0].scrollTop = elem[0].scrollHeight;
        }, true);
      }
    };
});


