angular.module('quizzimodo', [
  'quizzimodo.services',
  'quizzimodo.auth',
  'quizzimodo.quizzes',
  'quizzimodo.quiz',
  'quizzimodo.user',
  'quizzimodo.nav',
  'ngMaterial',
  'ngMessages',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      views: {
        'nav': navView,
        'signin@app': signinView,
        '': {
          templateUrl: '../views/landing.html'
        }
      }
    })
    .state('signup', {
      url: '/signup',
      views: {
        'nav': navView,
        'signin@signup': signinView,
        '': {
          templateUrl: '../views/signup.html',
          controller: 'AuthController'
        }
      }
    })
    .state('main', {
      url: '/main',
      views: {
        'nav': navView,
        'signin@main': signoutView,
        'menu@main': menuView,
        '': {
          templateUrl: '../views/main.html',
          controller: 'AuthController'
        }
      }
    })
      .state('user', {
      url: '/user',
      views: {
        'nav': navView,
        'signin@user': signoutView,
        'menu@user': menuView,
        '': {
          templateUrl: '../views/user.html',
          controller: 'UserController'
        }
      }
    })
    .state('selectQuiz', {
      url: '/select_quiz',
      views: {
        'nav': navView,
        'signin@selectQuiz': signoutView,
        'menu@selectQuiz': menuView,
        '': {
          templateUrl: '../views/selectQuiz.html',
          controller: 'QuizzesController'
        } 
      }
    })
    .state('takeQuiz', {
      url: '/take_quiz',
      views: {
        'nav': navView,
        'signin@takeQuiz': signoutView,
        'menu@takeQuiz': menuView,
        '': {
          templateUrl: '../views/takeQuiz.html',
          controller: 'QuizController'
        } 
      }
    });



  $httpProvider.interceptors.push('AttachTokens');
})

.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.quizzimodo');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})

.run(function ($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});

var navView = {
  templateUrl: '../views/nav.html',
  controller: 'NavController'
};

var signinView = {
  templateUrl: '../views/signin.html',
  controller: 'AuthController'
};

var signoutView = {
  templateUrl: '../views/signout.html',
  controller: 'AuthController'
};

var menuView = {
  templateUrl: '../views/menu.html',
  controller: 'AuthController'
};
