/*window.esriGeowConfig = {
    baseUrl: 'http://www.arcgis.com/home/',
    restBaseUrl: 'http://www.arcgis.com/sharing/'
}*/


define ([
     "dojo/_base/declare",    
     "dojo/ready",
     "dojo/on",
     "esri/main",
     "esri/arcgis/utils",
     "esri/arcgis/Portal",
     "esri/dijit/Legend"
], function(declare, ready, on, esri1, esri2, esriPortal) {
	



//BEGIN maps and apps custom scroll

var homePageFeaturedContentCount = 3;
var shiftStep = 220; // 120;
var shiftElements = 1;


return declare('esriWebmap.webmap_field.map',[], {

_mapElementId  : null,
_baseUrl       : null,
_elBaseSuffix  : null,
_map           : null,
_token         : null,

constructor: function() {},

setElBaseSuffix: function(suffix) {
  this._elBaseSuffix = suffix;
},

setMapElementId: function(id) {
  this._mapElementId = id;
},

setToken: function(token) {
	this._token = token;
},


buildLayersList: function(layers){

	 //layers  arg is  response.itemInfo.itemData.operationalLayers;
	  var layerInfos = [];
	  dojo.forEach(layers, function (mapLayer, index) {
	      var layerInfo = {};
	      if (mapLayer.featureCollection && mapLayer.type !== "CSV") {
	        if (mapLayer.featureCollection.showLegend === true) {
	            dojo.forEach(mapLayer.featureCollection.layers, function (fcMapLayer) {
	              if (fcMapLayer.showLegend !== false) {
	                  layerInfo = {
	                      "layer": fcMapLayer.layerObject,
	                      "title": mapLayer.title,
	                      "defaultSymbol": false
	                  };
	                  if (mapLayer.featureCollection.layers.length > 1) {
	                      layerInfo.title += " - " + fcMapLayer.layerDefinition.name;
	                  }
	                  layerInfos.push(layerInfo);
	              }
	            });
	          }
	      } else if (mapLayer.showLegend !== false && mapLayer.layerObject) {
	      var showDefaultSymbol = false;
	      if (mapLayer.layerObject.version < 10.1 && (mapLayer.layerObject instanceof esri.layers.ArcGISDynamicMapServiceLayer || mapLayer.layerObject instanceof esri.layers.ArcGISTiledMapServiceLayer)) {
	        showDefaultSymbol = true;
	      }
	      layerInfo = {
	        "layer": mapLayer.layerObject,
	        "title": mapLayer.title,
	        "defaultSymbol": showDefaultSymbol
	      };
	        //does it have layers too? If so check to see if showLegend is false
	        if (mapLayer.layers) {
	            var hideLayers = dojo.map(dojo.filter(mapLayer.layers, function (lyr) {
	                return (lyr.showLegend === false);
	            }), function (lyr) {
	                return lyr.id;
	            });
	            if (hideLayers.length) {
	                layerInfo.hideLayers = hideLayers;
	            }
	        }
	        layerInfos.push(layerInfo);
	    }
	  });
	  return layerInfos;
},

showWebMap: function(baseUrl, webmapId, extent, title) {

  if(typeof(title) != 'undefined' && title != null) {
    
    dojo.byId("esriMapTitleBar" + this._elBaseSuffix).innerHTML = '<span>' + title + '</span>'; 
  }
  if(this._map != null) {
      this._map.destroy();
  }
  
  esri.arcgis.utils.arcgisUrl = baseUrl + '/sharing/content/items';
  esri.config.defaults.io.proxyUrl = "/arcgisserver/apis/javascript/proxy/proxy.ashx";
  
  var mapDeferred = esri.arcgis.utils.createMap(webmapId, this._mapElementId, {
	  mapOptions: {
		sliderStyle: "large"
	  }
	});
  mapDeferred.then(
    dojo.hitch(this, function(response) {
	      this._map = response.map;
		  if(typeof(extent) != 'undefined' && extent != null) {
		    this._map.setExtent(extent);
		  }
          dojo.byId("esriWebMapTitleBar" + this._elBaseSuffix).innerHTML = '<span>' + response.itemInfo.item.title + '</span>';
          map = response.map;
          
          //add the legend
          var layers = response.itemInfo.itemData.operationalLayers;   
          var layerInfo = this.buildLayersList(layers);
          var legendDijit = new esri.dijit.Legend({
              map: map,
              layerInfos: layerInfo
            }, "esriWebMapLegend" + this._elBaseSuffix);
          legendDijit.startup();
    }),
	function(error){
          console.log("Map creation failed: ", dojo.toJson(error));        
    }
  );


} 



// end of class declare return
});

// end of module declaration
});
