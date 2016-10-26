var app = angular.module('phrasalapp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache']);


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
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    
    /**
     * Build `verbs` list of key/value pairs
     */
    function loadAll(verb) {
      
       return $http({
            method: 'GET',
            url: 'http://localhost:3000/api/v1/verbs/' + verb
        }).then(function successCallback(response) {
            // console.log(JSON.stringify(response.data + "successful"));
            
            return response.data.map( function (text) {
                console.log(JSON.stringify(text + "successful"));
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


