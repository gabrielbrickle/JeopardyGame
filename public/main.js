(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let app = angular.module('Jeopardy', []);

app.controller('JeopardyController', function($scope, $http) {

    $scope.arrayOfQuestionHistory = [];

    $scope.humananswer = "";

    $scope.answer = "";

    $scope.score = 0,

    $scope.newQuestion = {
        answer: 'answer to question',
        question: 'random',
        value: 0,
        category: 'category',
    };

    $scope.newQ = function() {
        console.log('clickin');
        $http({
            method: 'GET',
            url: 'http://jservice.io/api/random',
        }).then(function(response) {
            console.log(response);
            $scope.newQuestion = response.data[0];
            console.log($scope.newQuestion);
            $scope.arrayOfQuestionHistory.push({
                question: $scope.newQuestion.question
            });
        });
    };
    $scope.newQ();

    $scope.answerClick = function() {
        $scope.answer = $scope.newQuestion.answer;
        $scope.score = $scope.newQuestion.value;
        console.log($scope.newQuestion.answer);
        if ($scope.humananswer === $scope.newQuestion.answer) {
          $scope.score + $scope.newQuestion.value;
        } else {
            console.log('wrongggggggg');
            $scope.newQuestion.value - $scope.newQuestion.value;
        }
    }
});

},{}]},{},[1])