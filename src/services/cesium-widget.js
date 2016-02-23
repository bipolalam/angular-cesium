/**
 * Created by bipol on 02/09/16.
 */
angular.module('angularCesium').factory('CesiumWidget', function($log) {
  var data = {};
  data.getCesiumWidget = getCesiumWidget;
  data.setCesiumWidget = setCesiumWidget;
  var cesiumWidget = {};

  function getCesiumWidget(id) {
    if(!cesiumWidget) {
      $log.warn("Angular-Cesium: CesiumViewer has not been set!");
    }

    if (!id && Object.keys(cesiumWidget).length > 1) {
      $log.warn("Angular-Cesium: You have multiple CesiumViewer instances, you must specify an id");
      return cesiumWidget['main'];
    } else {
      return cesiumWidget['main'];
    }

    return cesiumWidget[id];
  }

  function setCesiumWidget(cv, id) {
    if (id) {
      cesiumWidget[id] = cv;
    } else {
      cesiumWidget['main'] = cv;
    }
  }

  return data;
});
