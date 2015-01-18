'use strict';

angular.module('taskrUApp')
	.controller('MainCtrl', ['$scope', '$state', '$http', 'Auth', function ($scope, $state, $http, Auth) {

		var logo = angular.element('.logo');
		$scope.animateLogo = function() {
			logo.addClass('animated pulse');
			logo.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
				function() {
					logo.removeClass('animated pulse');
				});
		};

		$scope.sidebarItems = [
			{
				title: 'HOME',
				state: 'main.home'
			},
			{
				title: 'PROFILE',
				state: 'main.profile'
			},
			{
				title: 'TASKS',
				state: 'main.tasks'
			},
			{
				title: 'SETTINGS',
				state: 'main.settings'
			},
			{
				title: 'LOGOUT',
				action: function() {
					Auth.logout();
					angular.element('.animate-screen').fadeOut(500, function() {
      					$state.go('login');
					});
				}
			}
		];

		$scope.onSidebarItemClick = function(item) {
			if (item.state)
				$state.go(stateName);
			else if (item.action)
				item.action();
		};

    	$scope.logout = function() {
	      Auth.logout();
	      $location.path('/login');
	    };    
  	}]);
