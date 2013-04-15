
dojo.require('esri.arcgis.Portal');
dojo.require("esri.IdentityManager");
dojo.require("dojox.lang.aspect");

var displayOptions = {
		templateUrl: 'http://www.arcgis.com/apps/OnePane/basicviewer/profile.html',
		themeName:'gray',
		numItemsPerPage: 6,
		group: {
			"owner": "Kelly",
			"title": "Running Routes"
		},
		portalUrl: 'http://www.arcgis.com'
};
var portal;
var group;
var nextQueryParams;
var queryParams;

function init() {
	portal = new esri.arcgis.Portal(displayOptions.portalUrl);
	dojo.connect(portal, 'onLoad', loadPortal);
	dojox.lang.aspect.advise(portal, "queryItems", {
		afterReturning: function (queryItemsPromise) {
			queryItemsPromise.then(function (result) {
				nextQueryParams = result.nextQueryParams;
				queryParams = result.queryParams;
			});
		}
	});
}

function loadPortal() {
	var params = {
			q: 'title: ' + displayOptions.group.title + ' AND owner:' + displayOptions.group.owner
	};
	portal.queryGroups(params).then(function(groups){
		//get group title and thumbnail url 
		if (groups.results.length > 0) {
			group = groups.results[0];
			if (group.thumbnailUrl) {
				dojo.create('img', {
					src: group.thumbnailUrl,
					width: 64,
					height: 64,
					alt: group.title
				}, dojo.byId('groupThumbnail'));
			}

			dojo.byId('groupTitle').innerHTML = group.title;
			dojo.byId('sidebar').innerHTML = group.snippet;

			//Retrieve the web maps and applications from the group and display 
			var params = {
					q: ' type: Web Map',
					num: displayOptions.numItemsPerPage
			};
			group.queryItems(params).then(updateGrid);
		}
	});
}

function updateGrid(queryResponse) {
	//update the gallery to get the next page of items

	var galleryList = dojo.byId('galleryList');
	dojo.empty(galleryList);  //empty the gallery to remove existing items

	//navigation buttons 
	(queryResponse.results.length < 6) ? esri.hide(dojo.byId('next')) : esri.show(dojo.byId('next'));
	(queryResponse.queryParams.start > 1) ? esri.show(dojo.byId('prev')) : esri.hide(dojo.byId('prev'));

	//Build the thumbnails for each item the thumbnail when clicked will display the web map in a template or the web application 
	var frag = document.createDocumentFragment();
	dojo.forEach(queryResponse.results, function (item) {
		if (item.id) {
			var url = (item.type === 'Web Map') ?  
					displayOptions.templateUrl + '?webmap=' + item.id + '&theme=' + displayOptions.themeName : 
						item.url;

			var li = dojo.create('li', {}, frag);
			var a = dojo.create('a', {
				href: url,
				target: '_blank',
				innerHTML: '<div class="tooltip"><p>' + item.snippet + '</p></div><img src="' + item.thumbnailUrl + '"/><div>' + item.title + '</div>'
			}, li);
		}
	});

	dojo.place(frag, galleryList);
}

function getNext() {
	if (nextQueryParams.start > -1) {
		group.queryItems(nextQueryParams).then(updateGrid);
	}
}

function getPrevious() {
	if (nextQueryParams.start !== 1) { //we aren't at the beginning keep querying. 
		var params = queryParams;
		params.start = params.start - params.num;
		group.queryItems(params).then(updateGrid);
	}
}

dojo.ready(init);

