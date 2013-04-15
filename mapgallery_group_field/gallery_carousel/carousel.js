/*window.esriGeowConfig = {
    baseUrl: 'http://www.arcgis.com/home/',
    restBaseUrl: 'http://www.arcgis.com/sharing/'
}*/


define ([
     "dojo/_base/declare",    
     "dojo/ready",
     "dojo/on",
     "esri/main",
     "esri/arcgis/Portal"
], function(declare, ready, on, esri, esriPortal) {
	


	

//BEGIN maps and apps custom scroll

var homePageFeaturedContentCount = 3;
var shiftStep = 220; // 120;
var shiftElements = 1;






function getShift(node) {
    var shift = node.style['left'];
    if (shift == "") {
        shift = 0;
    } else {
        shift = eval(shift.substr(0, shift.length - 2));
    }
    return shift;
}

function setShift(node, oldShift, newShift) {
    // node.style['left'] = newShift + "px";
    dojo.animateProperty({
        node: node,
        properties: {
            left: {
                end: newShift,
                start: oldShift,
                units: "px"
            }
        }
    }).play();
}

function addToPane(results, strDomMapsAndApps, groupID, rand, _restBaseUrl, objMapField) {

    var firstWebMap = false;

    /*if (results != null && typeof (results.length) != 'undefined') {
        dojo.query(node).addContent(results.length + "");
    }*/
    // LOAD ITEMS INTO SCROLLING PANE
    dojo.forEach(
    results,

    function (resultItem) {
        // console.log(resultItem);

        // TITLE
        var title = (resultItem.title) ? resultItem.title : resultItem.item;

        // THUMBNAIL
        var thumbUrl = (resultItem.thumbnail) ? _restBaseUrl + dojo.replace(
            "content/items/{id}/info/{thumbnail}",
        resultItem) : 'http://static.arcgis.com/images/desktopapp.png';
        // ITEM URL
        var itemUrl = (typeof (resultItem.url) != 'undefined') ? resultItem.url : _restBaseUrl + dojo.replace("item.html?id={id}", resultItem);
        var isWebMap = false;
		if(resultItem.type == 'Web Map') {
          itemUrl = Drupal.settings.basePath + 'mapgallery_group/arcgis/map/'
            + groupID + '/' + resultItem.id + '?url=' + encodeURIComponent(_restBaseUrl);
          itemUrl = itemUrl.replace('//', '/');
		  isWebMap = true;
		  if(firstWebMap == false && isWebMap == true && objMapField != null) {
		    /*firstWebMap = true;
		    var baseUrl = _restBaseUrl.replace('/sharing/', '').replace('/sharing');
		    objMapField.showWebMap(baseUrl, resultItem.id);*/
		  }
        }
        // ITEM CELL
        var itemCell = dojo.create('td', {
            'id': rand + '_' + 'previewNode_' + strDomMapsAndApps + "_" + resultItem.id,
            'class': 'previewNode'
        }, strDomMapsAndApps);
   
        
        // DETAILS LINK
        var detailsLink = dojo.create('a', {
            'id':  rand + '_' + 'linkNode_' + strDomMapsAndApps + "_" + resultItem.id,
            'href': itemUrl,
            'target': '_blank'
        }, itemCell.id);
		
		var imageId = rand + '_' + 'previewImg_' + strDomMapsAndApps + "_" + resultItem.id;
		var itemLabelId = rand + '_' + 'labelNode_' + strDomMapsAndApps + "_" + resultItem.id;
		
		if(isWebMap == true && objMapField != null) {
		   on(detailsLink, 'click', dojo.hitch(this, function(e) {
		      dojo.stopEvent(e); 
			  var baseUrl = _restBaseUrl.replace('/sharing/', '').replace('/sharing');
			  objMapField.showWebMap(baseUrl, resultItem.id, null, title);
			  dojo.query('.galleryThumbnail').forEach( dojo.hitch(this, 
			    function(el, i){
				  if(dojo.attr(el, 'id') != imageId) {
				    dojo.removeClass(el, 'galleryThumbnailHighlight');
				  } else {
				    dojo.addClass(el, 'galleryThumbnailHighlight');
				  }
				})
			  
			  ); 
			  dojo.query('.itemLabel').forEach( dojo.hitch(this, 
			    function(el, i){
				  if(dojo.attr(el, 'id') != itemLabelId) {
				    dojo.removeClass(el, 'itemLabelHighlight');
				  } else {
				    dojo.addClass(el, 'itemLabelHighlight');
				  }
				})
			  
			  ); 
			  
		   }));
		}
		

        // PREVIEW IMAGE
        var previwImg = dojo.create('img', {
            'id':  imageId,
            'title': 'View Item',
			'class': 'galleryThumbnail',
            'src': thumbUrl,
            'align': 'absmiddle',
			'width': '250px', 
            //'height': '133px',
            'style': 'box-shadow: 3px 3px 4px #000'
        }, detailsLink.id);

        // LABEL
		if(title != null && title.length > 50) {
		  title = title.substring(0, 50) + '...';
		}
        var titleDiv = dojo.create('div', {
            'id':  itemLabelId,
            'innerHTML': title,
            'class': 'itemLabel'
        }, detailsLink.id);
    });

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

   // dojo.byId("featuredMapsCarousel").parentNode.style['height'] = "200px";
    //dojo.byId("featuredMapsCarousel").parentNode.style['overflow'] = "hidden";

}


return declare('esriTemplate.gallery_carousel.carousel',[], {

_portal: null,
_baseUrl: null, 
_restBaseUrl: null,
_homeBaseUrl: null,
_elSuffix: null,
_objMapField: null,
_token:null,

constructor: function() {},

setBaseUrl: function(baseUrl) {
	this._baseUrl = baseUrl;
	this._restBaseUrl = this._baseUrl + "/sharing/";
	this._homeBaseUrl = this._baseUrl + "/home/";
},	

setObjMapField: function(objMapField) {
  this._objMapField = objMapField;
},

setElSuffix: function(elSuff) {
  this._elSuffix = elSuff;
},

setToken: function(token) {
  this._token = token;	
},

stubInitfeaturedMapsCarouselAndApps: function() {

    dojo.query("#scrollPaneLeft").forEach(function (e) {
        e.style['display'] = "block";
        dojo.addClass(e, "scrollDisabled");
    });
    dojo.query("#scrollPaneRight").forEach(function (e) {
        e.style['display'] = "block";
        dojo.addClass(e, "scrollDisabled");
    });

},

initfeaturedMapsCarouselAndApps: function (groupID) {
    /* NEPAL = 4fd11aae57d04457ae56481f23edd7cb */
    /* BOLIVIA = 5553773449244b639111fc2748a690cd */

    if(this._portal == null) {
    	this._portal = new esriPortal.Portal(this._baseUrl);
    	this._portal.that = this;
	    on(this._portal, 'ready', function(p) {
	  
	    	var params = {
	            q: 'group:' + groupID,
                    num: 50,
	            sortField: 'title',
	            sortOrder: 'desc'
	        };
	    	p.queryItems(params).then(dojo.hitch(this, function(results){
	    	  	//alert(p.url + "," + this.that._elSuffix);
	    		dojo.query("#featuredMapsCarousel" + this.that._elSuffix).style("display", "block");

	    	   
	    	    addToPane(results.results, 
	    	    		'mapsAndApps'+ this.that._elSuffix, groupID, this.that._elSuffix, this.that._restBaseUrl, this.that._objMapField);
	    	    console.log('success' + dojo.toJson(results));
	    	}));
    	});

    }
    /*esri.request({
        url: _restBaseUrl + "search",
        content: {
            f: 'json',
            q: 'group:' + groupID,
            sortField: 'uploaded',
            sortOrder: 'desc'
        },
        callbackParamName: 'callback',
        load: dojo.hitch(this, groupXhrResponse, groupID, _elSuffix  ),
        error: function (error) {
            console.warn(error.message);
        }
    });*/
},

groupXhrResponse: function(groupID, itemsResponse) {
	
},

getViewerURL2: function(viewer, webmap, owner) {
    // if not defined
    if (!viewer) {
        // set to default in config
        viewer = configOptions.mapViewer;
    }
    // lowercase viewer string
    viewer = viewer.toLowerCase();
    // return url and vars
    var retUrl = '',
        queryString = '',
        firstParamFlag;
    // if webmap is set
    if (webmap) {
        // set webmap in query object
        urlObject.query.webmap = webmap;
    } else {
        // if webmap set
        if (urlObject.query.webmap) {
            // unset it
            delete urlObject.query.webmap;
        }
    }
    // for each query param
    for (var key in urlObject.query) {
        // if url has property
        if (urlObject.query.hasOwnProperty(key)) {
            // if flag not set
            if (!firstParamFlag) {
                // prepend ?
                queryString += '?';
                // flag for first query param
                firstParamFlag = 1;
            } else {
                // prepend &
                queryString += '&';
            }
            // append to query string
            queryString += key + '=' + encodeURIComponent(urlObject.query[key]);
        }
    }
    // return correct url
    switch (viewer) {
        // home page link
    case 'index_page':
        retUrl = 'index.html' + queryString;
        return retUrl;
        // portal viewer link
    case 'cityengine':
        return configOptions._portalUrl + 'apps/CEWebViewer/viewer.html?3dWebScene=' + webmap;
    case 'arcgis':
        return configOptions._portalUrl + 'home/webmap/viewer.html?webmap=' + webmap;
        // arcgis explorer link
    case 'explorer':
        retUrl = "http://explorer.arcgis.com/?open=" + webmap;
        if (retUrl && location.protocol === "https:") {
            retUrl = retUrl.replace('http:', 'https:');
        }
        return retUrl;
        // arcgis explorer presentation mode link
    case 'explorer_present':
        retUrl = "http://explorer.arcgis.com/?present=" + webmap;
        if (retUrl && location.protocol === "https:") {
            retUrl = retUrl.replace('http:', 'https:');
        }
        return retUrl;
        // portal sign up link
    case 'signup_page':
        retUrl = configOptions._portalUrl + 'home/createaccount.html';
        return retUrl;
        // portal owner page link
    case 'owner_page':
        if (configOptions.groupOwner || owner) {
            if (owner) {
                retUrl = configOptions._portalUrl + 'home/user.html?user=' + encodeURIComponent(owner);
            } else {
                retUrl = configOptions._portalUrl + 'home/user.html?user=' + encodeURIComponent(configOptions.groupOwner);
            }
        }
        return retUrl;
        // portal item page
    case 'item_page':
        if (configOptions.webmap) {
            retUrl = configOptions._portalUrl + 'home/item.html?id=' + configOptions.webmap;
        }
        return retUrl;
        // portal group page
    case 'group_page':
        if (configOptions.groupOwner && configOptions.groupTitle) {
            retUrl = configOptions._portalUrl + 'home/group.html?owner=' + encodeURIComponent(configOptions.groupOwner) + '&title=' + encodeURIComponent(configOptions.groupTitle);
        }
        return retUrl;
        // portal mobile URL data
    case 'mobile':
        if (configOptions.agent_ios) {
            retUrl = configOptions.mobilePortalUrl + 'sharing/rest/content/items/' + webmap + '/data';
        } else if (configOptions.agent_android) {
            retUrl = configOptions.mobilePortalUrl + '?webmap=' + webmap;
        }
        return retUrl;
    case 'mobile_app':
        // if iOS Device
        if (configOptions.agent_ios && configOptions.iosAppUrl) {
            retUrl = configOptions.iosAppUrl;
        }
        // if Android Device
        else if (configOptions.agent_android && configOptions.androidAppUrl) {
            retUrl = configOptions.androidAppUrl;
        }
        return retUrl;
        // simple viewer
    case 'simple':
        retUrl = Drupal.settings.basePath + 'mapgallery_group/arcgis/map/xyz/' + webmap;
        retUrl = retUrl.replace('//', '/');
        return retUrl;
    default:
        return '';
    }
},

initGui: function() {
	
    dojo.query("#featuredMapsCarousel"+ this._elSuffix +" .scrollPrev")
        .forEach(

    function (spNode) {
        dojo.connect(
        spNode,
            "onclick",

        function (evt) {
            dojo.query(
                ".scrollContent",
            spNode.parentNode)
                .forEach(

            function (
            scNode) {
                var shift = getShift(scNode);
                var newShift = shift + (shiftElements * shiftStep);
                if (newShift >= 0) {
                    newShift = 0;
                    dojo.addClass(
                    spNode,
                        "scrollDisabled");
                }
                setShift(
                scNode,
                shift,
                newShift);
                dojo.query(
                    ".scrollNext",
                spNode.parentNode)
                    .forEach(

                function (
                s) {
                    dojo.removeClass(
                    s,
                        "scrollDisabled");
                });
            });
        });
    });
    dojo.query(".scrollNext")
        .forEach(

    function (spNode) {
        dojo.connect(
        spNode,
            "onclick",

        function (evt) {
            dojo.query(
                ".scrollContent",
            spNode.parentNode)
                .forEach(

            function (c) {
                var shift = getShift(c);
                var newShift = shift - (shiftElements * shiftStep);
                var tdCount = dojo.query(
                    "td",
                c).length;
                var shMax = (tdCount - homePageFeaturedContentCount) * shiftStep;
                if ((-newShift) >= shMax) {
                    newShift = -shMax;
                    dojo.addClass(
                    spNode,
                        "scrollDisabled");
                }
                setShift(
                c,
                shift,
                newShift);
                dojo.query(
                    ".scrollPrev",
                spNode.parentNode)
                    .forEach(

                function (
                s) {
                    dojo.removeClass(
                    s,
                        "scrollDisabled");
                });
            });
        });
    });
}



});

});
