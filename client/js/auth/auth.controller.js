myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
  function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
    $scope.user = {
      email: 'arvind@myApp.com',
      password: 'pass123'
    };

    $scope.login = function() {

      var email = $scope.user.email,
        password = $scope.user.password;

      if (email !== undefined && password !== undefined) {
        UserAuthFactory.login(email, password).success(function(data) {
       
          AuthenticationFactory.isLogged = true;
          AuthenticationFactory.user = data.user.email;
          AuthenticationFactory.userRole = data.user.role;

          $window.sessionStorage.token = data.token;
          $window.sessionStorage.user = data.user.email; // to fetch the user details on refresh
          $window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh

          $location.path("/");

        }).error(function(status) {
          alert('Oops something went wrong!');
        });
      } else {
        alert('Invalid credentials');
      }

    };

  }
]);
