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
     "esri/arcgis/Portal"
], function(declare, ready, on, esri1, esri2, esriPortal) {
	



//BEGIN maps and apps custom scroll

var homePageFeaturedContentCount = 3;
var shiftStep = 220; // 120;
var shiftElements = 1;



function addToPane(results, strDomMapsAndApps, groupID, rand, _restBaseUrl) {


   

    dojo.query("#scrollPaneLeft" + rand ).forEach(function (e) {
        e.style['display'] = "block";
        dojo.addClass(e, "scrollDisabled");
    });
    dojo.query("#scrollPaneRight" + rand).forEach(function (e) {
        e.style['display'] = "block";
        if (results.length <= homePageFeaturedContentCount) {
            dojo.addClass(e, "scrollDisabled");
        }
    });

    dojo.byId("featuredMapsCarousel").parentNode.style['height'] = "200px";
    dojo.byId("featuredMapsCarousel").parentNode.style['overflow'] = "hidden";

}


return declare('esriTemplate.map_field.map',[], {

_mapElementId  : null,
_baseUrl       : null,
_elBaseSuffix  : null,
_map           : null,

constructor: function() {},

setElBaseSuffix: function(suffix) {
  this._elBaseSuffix = suffix;
},

setMapElementId: function(id) {
  this._mapElementId = id;
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
		sliderStyle: "small"
	  }
	});
  mapDeferred.then(
    dojo.hitch(this, function(response) {
	      this._map = response.map;
		  if(typeof(extent) != 'undefined' && extent != null) {
		    this._map.setExtent(extent);
		  }
          dojo.byId("map-stats").innerHTML = '<span>' + response.itemInfo.item.title + '</span>';
          /*dojo.byId("subtitle").innerHTML = response.itemInfo.item.snippet;
          
          map = response.map;
          
          //add the legend
          var layers = response.itemInfo.itemData.operationalLayers;   
          if (map.loaded) {
            initMap(layers);
          } else {
            dojo.connect(map, "onLoad", function() {
              initMap(layers);
            });
          }*/
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
