
var portalInstance = new Array();
var djDialog = null;
var groupGrid = null;
function initSearchGroup(url, el) {
	
	
	
	/*var portal = new esri.arcgis.Portal(url + "/sharing/rest/");
	portal.signIn().then(queryPortal);
	portalInstance[portalInstance.length] = portal;*/

	this.strUrlPortal = url;
	this.elLink = el;
	require([ "dijit/Dialog", "dijit/layout/ContentPane", 
	          "dojo/dom-style", "dojo/dom-class",
	          "dojo/parser", "dojo/ready", "dojo/dom", "dojo/dom-construct", 
	          "dojo/_base/array", "dijit/registry", "dojo/on", "esri/main", 
	          "esri/arcgis/Portal", "dgrid/Grid", 
	          "dijit/layout/BorderContainer", "dijit/layout/ContentPane", 
	          "dojo/query", "dojo/dom-attr" ], 
			function(Dialog, ContentPane, domStyle, domClass,
					parser, ready, dom, domConstruct, array, registry, 
					on, esri,esriPortal, Grid, query, domAttr) {

		this.dom = dom;
		this.on = on;
		this.domConstruct = domConstruct;
		this.array = array;
		this.registry = registry;
		this.Grid = Grid;
		this.query = query;
	    this.domAttr = domAttr;
	    this.newUrl = false;
		esri.config.defaults.io.proxyUrl = '../proxy/proxy.ashx';
        this.portalUrl = strUrlPortal;
        //create the portal
        if(this.portal == null || this.portal.url != this.strUrlPortal) {
          this.portal = new esriPortal.Portal(portalUrl);
          this.newUrl = true;
        }

		
		if(djDialog == null) {
		  var cPane = new ContentPane({
		      content:"<p>Loading...</p>",
		      href: agsGidHtmlFrag,
		      style:"height:700px"
		  });
		  cPane.set("onDownloadEnd", dojo.hitch(this, fetchedHtmlFrag));
		
		  djDialog = new Dialog({
			title : "Search ArcGIS Groups",
			content : cPane,
			style : "width: 600px; height: 700px;"
		  });
		} else {
			findArcGISGroup();
		}
	    var elHeader = dom.byId('agsGidFinderHeader');
	    if(elHeader != null) {
		   elHeader.innerHTML = 'Search in ' +  
			  this.strUrlPortal;
	    }
		djDialog.show();
		domClass.add(djDialog.domNode.parentNode, 'claro');

	});
	
	function fetchedHtmlFrag() {
		//debugger;
		//dom.byId replaces dojo.byId
        dom.byId('groupFinderSubmit').disabled = false;
        dom.byId('signIn').disabled = false;
        var elHeader = dom.byId('agsGidFinderHeader');
	    if(elHeader != null) {
		   elHeader.innerHTML = 'Search in ' +  
			  this.strUrlPortal;
	    }
        //hook up the sign-in click event
        on(dom.byId('signIn'),'click', signIn);

        //search when enter key is pressed or button is clicked
        on(dom.byId('groupFinderSubmit'), 'click', findArcGISGroup);

        on(dom.byId('groupFinder') , 'keyup', function(e){
          if (e.keyCode === 13) {
            findArcGISGroup();
          }
        });
        findArcGISGroup();
	
	}
	
	 // find groups based on input keyword
    function findArcGISGroup(evt) {
      if(groupGrid != null) {
        groupGrid.renderArray([]);
        groupGrid.refresh();
      }
      var keyword = dom.byId('groupFinder').value;
      if(keyword == '') {
    	  keyword = '*';
      }
      var params = {
        q:  keyword,
        sortField:'modified',
        sortOrder:'desc',
        num:20  //find 20 items - max is 100
      };
      portal.queryGroups(params).then(function (data) {
        showGroupResults(data);
      });
      
      if(typeof(evt) != 'undefined' && evt != null) {
        evt.stopPropagation();
      }
    }


    //display a list of groups that match the input user name
    function showGroupResults(response) {
      //clear any existing results
      dom.byId('groupResults').innerHTML = '';	
      var data = [];
        if (groupGrid) {
          groupGrid.refresh();
        }
        if (response.total > 0) {
          //create an array of attributes for each group - we'll display these in a dojo dgrid
          data = array.map(response.results, function (group) {
            return {
              'snippet': group.snippet,
              'title': group.title,
              'url': group.url,
              'thumbnail': group.thumbnailUrl || '',
              'id': group.id,
              'owner': group.owner
            }
          });
          //create the grid
          if(groupGrid == null) {
            groupGrid = new Grid({
              columns: {
                thumbnail: 'Group Icon',
                title: 'Group',
                snippet: 'Description',
                id: 'Group ID'
              },
              renderRow: renderTable,
              //this function renders the table in a non-grid looking view
              showHeader: false
            }, "grid");
          }
          groupGrid.renderArray(data);

        } else {
          groupGrid.renderArray(data)	
          dom.byId('groupResults').innerHTML = '<h2>Group Results</h2><p>No groups were found. If the group is not public use the sign-in link to sign in and find private groups.</p>';
        }
      }

      function renderTable(obj, options) {

        var template = '<div class="thumbnail" style="cursor: pointer;"><img src=${thumbnail} width="50" height="50"/></div><b>${title} &nbsp; <a target="_blank" class="title" href=${url}>${url}</a></b><span class="owner"> (${owner} ) </span><div class="summary">${snippet} </div>';

        obj.url = portalUrl + '/home/group.html?groupid=id:' + obj.id;
        obj.thumbnail = obj.thumbnail || '';

        //domConstruct.create is a replacement for dojo.create
        var div = domConstruct.create("div",{
          innerHTML : esri.substitute(obj,template)
        });
        on(div, 'click', dojo.hitch(this, updateInput, obj.id));
        return div;
      }

      // gets private groups as well
      function signIn() {
        var signInLink = dom.byId('signIn');

        if (signInLink.innerHTML.indexOf('In') !== -1) {
            portal.signIn().then(function (loggedInUser) {
            	debugger;
            	var elInput = dojo.query('input', el.parentNode.parentNode);
                dojo.attr(elInput[1], 'value', loggedInUser.credential.token);
                signInLink.innerHTML = "Sign Out";
                findArcGISGroup();   // update results
            }, function (error) {
              signInLink.innerHTML = 'Sign In';   //error so reset sign in link
            });
        } else {
          portal.signOut().then(function (portalInfo) {
            signInLink.innerHTML = "Sign In";
            findArcGISGroup();
          });
        }
      }
      
      function updateInput(groupid) {
        var elInput = dojo.query('input', el.parentNode.parentNode);
        dojo.attr(elInput[0], 'value', groupid);
        djDialog.hide();
      }

}

function queryPortal() {
	
}