var app = angular.module('phrasalapp', ['ngRoute', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

app.controller('phrasalAppCtrl', ['$scope', '$http','$timeout', '$q', '$log',  function($scope, $http, $timeout, $q, $log){

    var self = this;

    // list of `verb` value/display objects
    self.verbs        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for verbs... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      return loadAll(query);
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
      //TODA VEZ QUE TROCAR O TEXTO
      self.verbs = loadAll(text);
    }

    function selectedItemChange(item) {
      
			var verb = item.value.verb;
			
			$http({
            method: 'GET',
            url: 'http://localhost:3000/api/v1/verbs/' + verb
        }).then(function successCallback(response) {  
						var suggestion = response.data[0].suggestions;

            $scope.meaning = response.data[0].descriptions[0];
            
						if(!suggestion){
							$scope.suggestion = "Ainda não há sugestões para esse phrasal verb na sua língua, deseja ser o primeiro a sugerir uma tradução?"
						} else{
							$scope.suggestion = response.data[0].suggestions;
						}

				}, function errorCallback(response) {
            $scope.error = 'Erro: ' + response.statusText;
            console.log(JSON.stringify(response.data) + "wrong");

            return 'teste';
            

        });
    }
    
    /**
     * Build `verbs` list of key/value pairs
     */
    function loadAll(verb) {
      
       return $http({
            method: 'GET',
            url: 'http://localhost:3000/api/v1/verbs/' + verb
        }).then(function successCallback(response) {
        
            return response.data.map( function (text) {
                return {
                    value: text,
                    display: text.verb
                };
            });
            

        }, function errorCallback(response) {
            $scope.error = 'Erro: ' + response.statusText;
            console.log(JSON.stringify(response.data) + "wrong");

            return 'teste';
            

        });

    }

}]);


app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../index.html"
    })
    .when("/#about", {
        templateUrl : "../about.html"
    })
    .when("/#contact", {
        templateUrl : "../contact.html"
    });
});

