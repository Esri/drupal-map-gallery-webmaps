

<?php
drupal_add_css('//serverapi.arcgisonline.com/jsapi/arcgis/3.3/js/dojo/dijit/themes/claro/claro.css', array (
	'group' => CSS_THEME,
	'type' => 'external'
));

drupal_add_css('//serverapi.arcgisonline.com/jsapi/arcgis/3.3/js/esri/css/esri.css', array (
	'group' => CSS_THEME,
	'type' => 'external'
));
drupal_add_css(drupal_get_path('module', 'mapgallery_group') . '/css/layout.css',  array (
	'group' => CSS_THEME,
	//'type' => 'external'
));
?>

<?php
$url = $GLOBALS['base_url'] . '/'.(drupal_get_path('module', 'mapgallery_group'));

drupal_add_js('function setConfigOptions(x,y,z) { } var dojoConfig = { parseOnLoad: true, packages:[ {name:"esriTemplate",location:"'.$url.'"} ] };', 'inline');
drupal_add_js('//serverapi.arcgisonline.com/jsapi/arcgis/3.3', 'external');
drupal_add_js(drupal_get_path('module', 'mapgallery_group')."/js/layout.js");

 ?>




<script type="text/javascript">
  
</script>

<script type="text/javascript">    
    var configOptions;
      
      function init(){
      	
      	 dojo.requireLocalization("esriTemplate","template");
   var q = esri.urlToObject(window.location.href);
   var pUrl = null;
   
   if(q != null && typeof(q.query) != 'undefined' && q.query != null && typeof(q.query.url) != 'undefined' ) { 
     var pUrl = q.query.url;
   }
      
      configOptions = {
        //The ID for the map from ArcGIS.com
        webmap : "<?php print $mapID ?>",
        //The application id for a configured application 
        appid:'',
        //Specify a theme for the template. Valid options are (seaside, pavement, chrome, contemporary_blue, contemporary_green).
        theme:'chrome',
        //Enter a title, if no title is specified, the webmap's title is used.
        title : "",
        //Enter a subtitle, if not specified the ArcGIS.com web map's summary is used
        subtitle : "",
        //Enter a description for the app, if not specified the arcgis.com web map's description is used
        description:"",
        //If the webmap uses Bing Maps data, you will need to provided your Bing Maps Key
        bingmapskey : "",
        //specify a proxy url if needed
        proxyurl:"",
        //specify the url to a geometry service 
        geometryserviceurl:"http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer",
       //Modify this to point to your sharing service URL if you are using the portal
        sharingurl : "http://www.arcgis.com/sharing/content/items",
        owner:""
      };
      if(pUrl != null && pUrl != '') {
      	configOptions.sharingurl = pUrl + '/content/items';
      }
      initMap();
      //dijit.byId('mainWindow').layout();

     }
        //show map on load 
      dojo.addOnLoad(init);
      
</script>
<div style="height: 1024px" class="arcgis_map">
<div id="mainWindow" dojotype="dijit.layout.BorderContainer" design="headline"
      gutters="false" style="width:100%; height:600px;">

        <!-- Header Section-->
        <div id="header" dojotype="dijit.layout.ContentPane" region="top">
          <div id="title">
          </div>
          <div id="subtitle">
          </div>
      <div id="header_flourish"></div>

        </div>

        <!--Sidebar Section-->
        <div dojotype="dijit.layout.ContentPane" id="leftPane" region="left">
          <div id="leftPaneContent" dojotype="dijit.layout.BorderContainer" design="headline"
          gutters="false" style="width:100%; height:100%;">
           <!--Sidebar Header-->
            <div id="leftPaneHeader" dojotype="dijit.layout.ContentPane" region="top">
              <span id='legendHeader'></span>
            </div>
            <!--Sidebar Content-->
            <div id="leftPaneBody" dojotype="dijit.layout.StackContainer" region="center">
              <div id="panel1" class="panel_content" dojotype="dijit.layout.ContentPane">
                <div id="legendDiv">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Section -->
        <div id="map" dojotype="dijit.layout.ContentPane" region="center" dir="ltr">
        </div>

        <!-- Footer Section-->
        <div id="footer" dojotype="dijit.layout.ContentPane" region="bottom">
          <span id='footerText'></span>
          <span id="owner">
          </span>
        </div>

      </div>


      &nbsp;
</div>