var appT = angular.module('2ledger-sample-client-manager', ['ngMaterial', 'ngRoute', 'clientServices', 'ngLocale', 'ui.bootstrap', 'ngTable']);

appT.controller('clientController', function ($scope, $http, $timeout, $rootScope, $route, $routeParams, $location) {

	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;

	var me = this;
	var escopo = $scope;

	me.openLogin = function () {
		$('.mainForm').animate({'margin-left':'2000px'}, 100, function (){
			$scope.$broadcast('hideScreen');
			
			setTimeout(function (){
				$('.mainForm').animate({'margin-left':'232px'}, 100, function (){
					$location.path("/login");
					$scope.$apply();
					$scope.$broadcast('showScreen');
				});
			}, 300);
		})
		
	}

	me.openManager = function () {
		$('.mainForm').animate({'margin-left':'2000px'}, 100, function (){
			$scope.$broadcast('hideScreen');

			setTimeout(function (){
				$('.mainForm').animate({'margin-left':'232px'}, 100, function (){
					$location.path("/manager");
					$scope.$apply();
					$scope.$broadcast('showScreen');
				});
			}, 300);
		})		
	}

	
});

appT.run(function ($rootScope) {
	$rootScope.$on('$routeChangeStart', function (event, next, prev) {
	})
});

appT.config(function ($routeProvider) {
	$routeProvider
		.when("/login", {
			templateUrl: "/models/login/login.html",
		})
		.when("/manager", {
			templateUrl: "/models/manager/manager.html",
		})
});
