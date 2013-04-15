// Dojo Config
var dojoConfig = null;

function esriMapGalleryDoDojoConfig() {
	if(typeof(esri_mapgallery_field_url) == 'undefined') {
		esri_mapgallery_field_url = '';
	}
dojoConfig = {
    parseOnLoad: true,
    asyn: false,
    isDebug: true,
    packages: [{
        name: "esriTemplate",
        location: (typeof(esri_mapgallery_field_url)!= 'undefined')? esri_mapgallery_field_url: ''
    }, 
    {
        name: "esriWebmap",
        location: (typeof(esri_webmap_field_url) != 'undefined')? esri_webmap_field_url: ''
    },
    {
        name: "jsapi",
        location: esri_mapgallery_field_url + '/javascript'
    },
    
    {
        name: "myModules",
        location: esri_mapgallery_field_url + '/javascript'
    }, 
    {
        name: "apl",
        location: esri_mapgallery_field_url + '/apl'
    }]
};
}

// Global Variables
var i18n, searchVal = '', dataOffset, prevVal = "", ACObj, ACTimeout, timer, urlObject, portal, map, locateResultLayer, aoGeocoder, aoGeoCoderAutocomplete, mapFullscreen, resizeTimer, mapCenter;