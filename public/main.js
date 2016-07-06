(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let app = angular.module('Jeopardy', ['ngRoute']);
////////////////ROUTER//////////////////////////////////////////////////////////////
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/login',
        })
        .when('/game', {
            controller: 'JeopardyController',
            templateUrl: 'templates/game.html',
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'templates/login.html',
        })
        .when('/gameover', {
            controller: 'GameOverController',
            templateUrl: 'templates/gameover.html',
        });
}]);
///////////CONTROLLERS////////////////////////////////////////////////////////////////
app.controller('JeopardyController', ['QuestionService', '$scope', function(QuestionService, $scope) {

    $scope.humananswer = "";

    $scope.answer = "";

    $scope.score = 0,

    $scope.categories = QuestionService.getCategories();

    $scope.values = QuestionService.getValues();


    // $scope.id= QuestionService.getValues();

    $scope.newQuestion = {
        answer: 'answer to question',
        question: 'random',
        value: 0,
        category: 'category',
    };
    $scope.newQ = function() {
        console.log('clickin');

    };
    $scope.newQ();

    $scope.answerClick = function() {
        $scope.answer = $scope.newQuestion.answer;
        // $scope.score = $scope.newQuestion.value;
        console.log($scope.newQuestion.answer);
        if ($scope.humananswer === $scope.newQuestion.answer) {
            let a = Number($scope.newQuestion.value + $scope.score)
            $scope.score = a

        } else {
            console.log('wrongggggggg');
            let b = Number($scope.score - $scope.newQuestion.value)
            $scope.score = b
        }
    }

}]);



app.controller('LoginController',['UserService', '$scope', '$location', function(UserService, $scope, $location) {
    let passcode = 'GABE';
    $scope.newUser = {
      username: "",
    }
    $scope.username = "";
    $scope.password = "";
    $scope.loginClick = function(){
      $scope.username = $scope.newUser.username;
      if ($scope.password === passcode) {
        console.log('good password');
        $location.path('/game') ////DOESNT WORK
      } else {
        alert('Your Password is Incorrect, Try Again!')
      }
    }
}]);

app.controller('GameOverController', function($scope, $http) {});

//////SERVICES//////////////////////////////////////////////////////////////////////////////////////
app.factory('UserService', function($http) {
    let user = [];

    return  {
      addUser: function (name) {
              user.push(name);
          },
        }
});


app.factory('QuestionService', function($http) {
    let categories = [];
    let values = [];
    let id = [];

    $http({
        method: 'GET',
        url: 'http://jservice.io/api/categories?count=5',
    }).then(function(response) {
        let categoryObject = response.data;
        angular.copy(categoryObject, categories)
        categories.forEach(function(element) {
            id.push(element.id);
        })
        getValues();
    });

    let getValues = function() {
        id.forEach(function(element) {
            console.log('id number');
            $http({
                method: 'GET',
                url: `http://jservice.io/api/clues?category=${element}`,
            }).then(function(response) {
                let valueText = response.data;
                valueText.forEach(function(element) {
                    values.push(element.value);
                    console.log('ALLLLL the values',values);
                })
            })
        })
    };


    return {
        getCategories: function() {
            return categories;
        },
        getValues: function(){
          return values;
        },
    };



});

},{}]},{},[1])