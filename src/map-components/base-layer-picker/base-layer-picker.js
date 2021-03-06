/**
 * Created by bipol on 01/20/16.
 */
'use strict';

angular.module('angularCesium').directive('acBaseLayerPicker', function() {
  return {
    restrict : 'E',
    require : '^acMap',
    transclude: true,
    template : '<div id="baseLayerPickerContainer" style="position:absolute;top:24px;right:24px;width:38px;height:38px;"><div ng-transclude></div></div>',
    controller : function($scope) {
      this.getProviderViewModels = getProviderViewModels;
      this.pushProviderViewModel = pushProviderViewModel;
      this.getImageryViewModels = getImageryViewModels;
      this.getTerrainViewModels = getTerrainViewModels;

      function getTerrainViewModels() {
        return $scope.providerViewModels.terrainProviderViewModels;
      }
      function getImageryViewModels() {
        return $scope.providerViewModels.imageryProviderViewModels;
      }
      function getProviderViewModels() {
        return $scope.providerViewModels;
      }
      function pushProviderViewModel(key,item) {
        $scope.providerViewModels[key].push(item);
      }
    },
    link :{
      pre: function(scope, element, attrs, acMapCtrl) {
        scope.providerViewModels = {
          imageryProviderViewModels: [],
          terrainProviderViewModels: [],
        };
        scope.baseLayerPicker = null;

        scope.$on('$destroy', function() {
          acMapCtrl.getCesiumWidget().baseLayerPicker.destroy();
        });
      },
      post: function(scope, element, attrs, acMapCtrl) {
        scope.$watch(function() { return scope.providerViewModels }, function(val) {
            if (!scope.baseLayerPicker) {
              scope.baseLayerPicker = new Cesium.BaseLayerPicker('baseLayerPickerContainer', {
                  globe : acMapCtrl.getCesiumWidget().scene.globe,
                  imageryProviderViewModels : scope.providerViewModels.imageryProviderViewModels,
                  terrainProviderViewModels : scope.providerViewModels.terrainProviderViewModels
              });
            } else {
              scope.baseLayerPicker.destroy();
              scope.baseLayerPicker = new Cesium.BaseLayerPicker('baseLayerPickerContainer', {
                  globe : acMapCtrl.getCesiumWidget().scene.globe,
                  imageryProviderViewModels : scope.providerViewModels.imageryProviderViewModels,
                  terrainProviderViewModels : scope.providerViewModels.terrainProviderViewModels
              });
            }
        }, true);
      }
    }
  }
});
