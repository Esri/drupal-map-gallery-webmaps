/*// host path regular expression
var pathRegex = new RegExp(/\/[^\/]+$/);
var locationPath = location.pathname.replace(pathRegex, '');

// Dojo Config
var dojoConfig = {
    parseOnLoad: true,
    packages: [{
        name: "esriTemplate",
        location: locationPath
    }, {
        name: "myModules",
        location: locationPath + '/javascript'
    }, {
        name: "apl",
        location: locationPath + '/apl'
    }]
};
*/
// Global Variables
var i18n, dataOffset, prevVal, ACObj, ACTimeout, timer, urlObject, portal, map, locateResultLayer, resultConnect, mapFullscreen, resizeTimer, mapCenter, globalUser, globalComments, globalItem, ratingWidget, ratingConnect, ratingTimer;