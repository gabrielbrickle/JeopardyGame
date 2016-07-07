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

    $scope.questions = QuestionService.getQuestions();



    $scope.valueClick = function() {
        // let ques = [];
        console.log('clicked a value');
        let newQues = QuestionService.getQuestions();
        let quesVal = QuestionService.getValues();
        console.log($scope.questions(question));
        ////need to match question with its question id or match question to category id or match question to its value
        if ($scope.questions === $scope.values) {
            console.log('her');
        }
    }


}]);



app.controller('LoginController', ['UserService', '$scope', '$location', function(UserService, $scope, $location) {
    let passcode = 'GABE';
    $scope.newUser = {
        username: "",
    }
    $scope.username = "";
    $scope.password = "";
    $scope.loginClick = function() {
        $scope.username = $scope.newUser.username;
        if ($scope.password === passcode) {
            console.log('good password');
            $location.path('/game') ////DOESNT WORK
        } else {
            alert('Your Password is Incorrect, Try Again!')
        }
    }
}]);

app.controller('GameOverController', function($scope, $location) {
    $scope.restart = function() {
        $location.path('/login')
    }
});

//////SERVICES//////////////////////////////////////////////////////////////////////////////////////
app.factory('UserService', function($http) {
    let user = [];

    return {
        addUser: function(name) {
            user.push(name);
            console.log('this is the user'); ///NOT WORKING
        },
    }
});


app.factory('QuestionService', function($http) {
    let categories = [];
    let values = [];
    let id = [];
    let questions = [];

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
            $http({
                method: 'GET',
                url: `http://jservice.io/api/clues?category=${element}`,
            }).then(function(response) {
                let valueText = response.data;
                valueText.forEach(function(element) {
                    values.push(element.value);
                })
            })
        })
        getQuestions();
    };

    let getQuestions = function() {
        id.forEach(function(element) {
            $http({
                method: 'GET',
                url: `http://jservice.io/api/clues?category=${element}`,
            }).then(function(response) {
                let questionText = response.data;
                questionText.forEach(function(element) {
                    questions.push(element.question);

                })
            })
        })
    }

    return {
        getCategories: function() {
            return categories;
        },
        getValues: function() {
            return values;
        },
        getQuestions: function() {
            return questions;
        },
    };



});

},{}]},{},[1])