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
});
