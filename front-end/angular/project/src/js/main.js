var app = angular.module('phrasalapp', ['ngRoute', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

app.controller('phrasalAppCtrl', ['$scope', '$http','$timeout', '$q', '$log',  function($scope, $http, $timeout, $q, $log){

    var self = this;

    $scope.suggestionSent = false;
    $scope.suggestionIf = false;
    $scope.newSugHide = true;

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
     *
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
            if(item)
			    var verb = item.value.verb;
			
			$http({
            method: 'GET',
            url: 'http://localhost:3000/api/v1/verbs/' + verb
        }).then(function successCallback(response) {
						var suggestion = !response.data[0].suggestions ? '' : response.data[0].suggestions;
                        $scope.newSugHide = true;
                        $scope.meaning = !response.data[0].descriptions ? '' : response.data[0].descriptions[0];
            
						if(!suggestion){
							$scope.suggestion = "Ainda não há sugestões para esse phrasal verb na sua língua"
                            $scope.suggestionIf = true;
						} else{
							$scope.suggestion = response.data[0].suggestions[0];
                            $scope.suggestionIf = false;
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

    $scope.newSuggestion = function (text){
        console.log("TESTE " + text);
        $scope.suggestion = '';
        $scope.suggestionIf ='';
        $scope.newSugHide = false;
        
    }

    $scope.addSuggestion = function (verb, text){
        return $http({
            method: 'PUT',
            url: 'http://localhost:3000/api/v1/verbs/',
            data : {
                verb: verb,
                suggestion : text
            }
        }).then(function successCallback(response) {
            $scope.suggestionSent = true;
            console.log('Sugestao enviada com sucesso.')
            return;
            

        }, function errorCallback(response) {
            $scope.error = 'Erro: ' + response.statusText;
            console.log(JSON.stringify(response.data) + "wrong");

            return 'teste';

        });
        
    }
}]);


// app.config(function($routeProvider) {
//     $routeProvider
//     .when("/", {
//         templateUrl : "../index.html"
//     })
//     .when("/#about", {
//         templateUrl : "../about.html"
//     })
//     .when("/#contact", {
//         templateUrl : "../contact.html"
//     });
// });

