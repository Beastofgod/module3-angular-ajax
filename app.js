(function (){
    'use strict';
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .directive('foundItems',foundItems);
    
    NarrowItDownController.$inject =['MenuSearchService'];
    function NarrowItDownController (MenuSearchService) {
        var ctrl1 = this;
        ctrl1.searchThings = function (){
            ctrl1.found = MenuSearchService.getMatchedMenuItems(ctrl1.searchTerm);
            ctrl1.found.then(value => console.log(value));
            console.log(ctrl1.found);
        }
        
    }

    function foundItem() {
        var ddo = {
          restrict: 'E',
          scope: {
            item: '=foundItem',
            arrayName: '@'
          },
          template: '{{item[arrayName].name}} {{item[arrayName].description}} {{item[arrayName].price_small}} {{item[arrayName].price_large}}'
        };
        return ddo;
      }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http){
        var service = this;
        //need to something with the data we get back from this 
        service.getMatchedMenuItems = function(searchStr){
            if (searchStr === undefined){
                searchStr = " ";
            }
            return  $http({
                method: "GET",
                url : ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json")
            })
            .then(function (response) {
            var foundItems = response.data;
            var stuffWeWant = [];
            for (const property in foundItems){
                for(const item in foundItems[property].menu_items){
                    if(foundItems[property].menu_items[item].description.toLowerCase().includes(searchStr.toLowerCase())){
                        stuffWeWant.push(foundItems[property].menu_items[item]);
                    }
                }
            }
            return stuffWeWant;
            });
        }


    }
    
})();