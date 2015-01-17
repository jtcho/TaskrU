'use strict';

angular.module('taskrUApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        console.log('Submitting...');
        Auth.setStudentEmail($scope.user.studentEmail)
          .then(function() {
            $scope.message = 'Confirmation email sent! Please check your student email.';
          })
          .catch(function() {
            console.log('Oops...');
          });
        // Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        // .then( function() {
        //   $scope.message = 'Password successfully changed.';
        // })
        // .catch( function() {
        //   form.password.$setValidity('mongoose', false);
        //   $scope.errors.other = 'Incorrect password';
        //   $scope.message = '';
        // });
      }
		};
  });
