var app = angular.module('phrasalapp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache']);


app.controller('phrasalAppCtrl', ['$scope', '$http','$timeout', '$q', '$log',  function($scope, $http, $timeout, $q, $log){
    $scope.verb = '';
    $scope.description = {};
    $scope.error = '';

    var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    self.newState = newState;

    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      return loadAll(query);
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
      //TODA VEZ QUE TROCAR O TEXTO
      self.states = loadAll(text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll(verb) {
      
       return $http({
            method: 'GET',
            url: 'http://localhost:3000/api/v1/verbs/' + verb
        }).then(function successCallback(response) {
            console.log(JSON.stringify(response.data + "successful"));
            
            return Object.keys(response.data).map( function (state) {
                return {
                    value: state,
                    display: state
                };
            });
            

        }, function errorCallback(response) {
            $scope.error = 'Erro: ' + response.statusText;
            console.log(JSON.stringify(response.data) + "wrong");

            return 0;
            

        });

    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }

}]);


