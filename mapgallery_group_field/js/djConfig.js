// Dojo Config
var dojoConfig = null;

function esriMapGalleryDoDojoConfig() {
dojoConfig = {
    parseOnLoad: true,
    asyn: false,
    isDebug: true,
    packages: [{
        name: "esriTemplate",
        location: esri_mapgallery_field_url
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