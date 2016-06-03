angular.module('quizzimodo.quizzes', [])

.controller('QuizzesController', function($scope, $location, Quiz, $rootScope) {

  $scope.taken;
  //
  $scope.quizzes;
  //
  $scope.userTopic;
  $scope.subTopic;
  $scope.userTopic;


  $scope.$watch('topicPick', function(x){
    $scope.userTopic = $scope.topics[x]['topic'];
    $scope.subTopics = $scope.topics[x]['subtopics'];
  });

  $scope.$watch('subtopicPick', function(y){
    $scope.userSubtopic = $scope.subTopics[y].id;
  });

  $scope.$watch('userSubtopic', function(z){
    $scope.quizzes = $scope.temp.filter(function(quiz){
      return quiz.subtopic_id === z;
    });
  });

  $scope.startUp = function(){
    Quiz.getQuizzes()
    .then(function(data){

      $scope.quizzes = data.data;
      $scope.temp = data.data;
      $scope.image = '../assets/avatar.png';
      $scope.topics = $rootScope.topics;

      if(data.data.result){
        $scope.taken = 'Retake';
      } else {
        $scope.taken = 'Take Quiz'
      }
    })
    .catch(function(err){
      $scope.selectError = "Error retrieving quizzes";
      console.log(err);
    });
  };
  $scope.startUp();


  $scope.takeQuiz = function(quizID){
    console.log('- - - - - - - - - quizID from takeQuiz- - - - - - - - : ', quizID)
    Quiz.setData(quizID);
    $location.path('/edit_quiz');
  };

  $scope.editQuiz = function(quizID){
    console.log('- - - - - - - - - quizID from editQuiz - - - - - - - - : ', quizID)
    Quiz.getQuiz(quizID);
    $location.path('/take_quiz');
    console.log('- - - - - - - - quizzes: ', $scope.quizzes)
  };


});