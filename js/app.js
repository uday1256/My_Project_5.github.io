	// create the module and name it scotchApp
	var poolTrack = angular.module('poolTrack', ['ngRoute','ngStorage']);

	// configure our routes
	poolTrack.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'template/player.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/gameManagement', {
				templateUrl : 'template/gameManagement.html',
				controller  : 'gameManagementController'
			})

			// route for the contact page
			.when('/leaderboard', {
				templateUrl : 'template/leaderboard.html',
				controller  : 'leaderBoardController'
			});
	});

	// create the controller and inject Angular's $scope
	poolTrack.controller('mainController', function($scope,$localStorage,$location) {

		$scope.isActive = function (viewLocation) {
		     var active = (viewLocation === $location.path());
		     return active;
		};		
		$scope.players =[];
		$scope.enableCreateForm = false;
		$scope.createPlayer = {};
		var oldData = $localStorage.message;
		console.log(oldData);
		if(oldData != null){
			$scope.players = JSON.parse($localStorage.message);
			console.log($scope.players);	
		}
		$scope.closeForm = function(){
			$scope.enableCreateForm = false;	
		};		
		$scope.initCreatePlayer = function (){
			$scope.createPlayer = {};
			$scope.enableCreateForm = true;
		};
		$scope.createPlayerForm = function () {
			var extEntries = [];
			var existingEntries = $localStorage.message;
			$scope.createPlayer.usercount = 0;
			if(existingEntries != null){
			 extEntries = JSON.parse($localStorage.message);
			 
			 extEntries.push($scope.createPlayer);
			 $localStorage.message = JSON.stringify(extEntries);        	 
        	} else {
        		extEntries.push($scope.createPlayer);
        		$localStorage.message = JSON.stringify(extEntries);
        	}
        	$scope.enableCreateForm = false;	
        	$scope.players = JSON.parse($localStorage.message);	
        	console.log($scope.players);	
        	//$scope.createPlayer = null;
		}
	});

	poolTrack.controller('gameManagementController', function($scope,$localStorage,$location) {

		$scope.isActive = function (viewLocation) {
		     var active = (viewLocation === $location.path());
		     return active;
		};	
		$scope.closeForm = function(){
			$scope.enableGameForm = false;	
		};
		//$scope.gameList = [];
		$scope.enableGameForm = false;
		$scope.disabledSubmit = false;
		$scope.gameModel = {};
		$scope.gameModel.usercount = '1';
		var oldData = $localStorage.gameForm;
		if(oldData != null){
			$scope.gameList = JSON.parse($localStorage.gameForm);
		}		
		$scope.initCreateGame = function (){
			$scope.enableGameForm = true;	
			$scope.gameModel ={};		
			var wnList = JSON.parse($localStorage.message);
			if(wnList !=null){
			 $scope.playerNameList = wnList;
			} else {
				$scope.playerNameList = null;
			}
		};
		$scope.changingPlayer = function(players){
			console.log(players.length);
			if(players.length > 2 || players.length <2){
				$scope.disabledSubmit = true;
			} else {
				$scope.disabledSubmit = false;
			}
			$scope.winnerNameList = players;
		};
		$scope.createGameForm =function () {
			// console.log($scope.gameModel);
			$scope.gameModel.usercount = '1';
			var extGameEntries = [];
			var extPlayerEntries =[];
			var existingEntries = $localStorage.gameForm;

			
			console.log(existingEntries);

			if (typeof existingEntries != "undefined") {
				extGameEntries = JSON.parse($localStorage.gameForm);
			} else {
				extGameEntries = [];
			}
			
			extPlayerEntries = JSON.parse($localStorage.message);
			var setCondition = false;
			for(var i=0; i<extPlayerEntries.length; i++){
		        visitor = extPlayerEntries[i];
		        if ($scope.gameModel.winnerName === visitor.username) {
		            visitor.usercount = parseInt(visitor.usercount) + 1;
		            setCondition = true;
		            break;
		        }
		    }
		   
		    extGameEntries.push($scope.gameModel);		 
        	$localStorage.gameForm = JSON.stringify(extGameEntries);
        	$localStorage.message = JSON.stringify(extPlayerEntries);
        	$localStorage.winningList = JSON.stringify(extPlayerEntries);  			 			 	 
        	    
        	$scope.enableGameForm = false;	
        	$scope.gameList = JSON.parse($localStorage.gameForm);
        	
		}
	});

	poolTrack.controller('leaderBoardController', function($scope,$location,$localStorage) {
		//$scope.winningList =[];
		$scope.isActive = function (viewLocation) {
		     var active = (viewLocation === $location.path());
		     return active;
		};	

		var oldData = $localStorage.winningList;
		console.log(oldData);
		if(oldData != null){
			console.log(JSON.stringify($localStorage.winningList));
			$scope.winningList = JSON.parse($localStorage.winningList);
		}		
	});