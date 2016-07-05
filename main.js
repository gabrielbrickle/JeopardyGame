let app = angular.module('Jeopardy', []); /////[] is a second param

app.controller('JeopardyController', function($scope, $http) {
    // $scope.people = [
    //   {name: 'gabe'},
    //   {name: 'nik'},
    //   {name: 'max'},
    //   {name: 'winnie'}
    // ];////created a ul in html

    $scope.person = {
      name: 'Unknown Human'
    };
    /////YOU CAN ALSO ADD FUNCTIONS TO SCOPES
    $scope.flip = function(){
      console.log('flippin');
/////was below, now says make an ajax request
      $http({
        url: 'http://jservice.io/api/random',
      }).then(function(response) {
        console.log(response);
        let question= response.data.results[0];
        // $scope.question.name = question.name.first; ////UPDATE THE $SCOPE.PERSON.NAME WITH A NEW VALUE
        // $scope.question.push({ name: question.name.first});
      });
    };
    $scope.flip();/////must call that function

});
