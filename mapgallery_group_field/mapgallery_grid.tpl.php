<!-- STYLESHEETS -->
<?php
drupal_add_css("//serverapi.arcgisonline.com/jsapi/arcgis/2.7/js/dojo/dijit/" .
"themes/claro/claro.css", array (
	'group' => CSS_THEME,
	'type' => 'external'
));

drupal_add_css("//servicesbeta.esri.com/jsapi/arcgis/3.4/js/dojo/dojox/form/resources/Rating.css", 
array (
	'group' => CSS_THEME,
	'type' => 'external'
));
drupal_add_css(drupal_get_path('module', 'mapgallery_group') . '/gallery_grid'.'/css/reset.css');
drupal_add_css(drupal_get_path('module', 'mapgallery_group') . '/gallery_grid'.'/css/960.css');
drupal_add_css(drupal_get_path('module', 'mapgallery_group') . '/gallery_grid'.'/css/common.css');
drupal_add_css(drupal_get_path('module', 'mapgallery_group') . '/gallery_grid'.'/css/themes.css');
?>

<!-- JAVASCRIPTS -->
<?php
$url = $GLOBALS['base_url'] . '/'.(drupal_get_path('module', 'mapgallery_group'));
drupal_add_js('var esri_mapgallery_field_url = "'.$url.'"; esriMapGalleryDoDojoConfig();', 'inline', array('group' => JS_LIBRARY, 'weight' => -10));
drupal_add_js(drupal_get_path('module', 'mapgallery_group')."/../common/js/djConfig.js", array('group' => JS_LIBRARY, 'weight' => -5));
drupal_add_js('http://serverapi.arcgisonline.com/jsapi/arcgis/3.3', 'external', array('group' =>JS_DEFAULT));

drupal_add_js(drupal_get_path('module', 'mapgallery_group'). '/gallery_grid'.'/javascript/djConfig.js');
$url = $GLOBALS['base_url'] . '/'.(drupal_get_path('module', 'mapgallery_group').'/gallery_grid');
//drupal_add_js('var dojoConfig = { parseOnLoad: true, packages:[ {name:"esriTemplate",location:"'.$url.'"} ] };', 'inline');
drupal_add_js(drupal_get_path('module', 'mapgallery_group'). '/gallery_grid'.'/javascript/common.js');
drupal_add_js(drupal_get_path('module', 'mapgallery_group'). '/gallery_grid'.'/javascript/home/layout.js');
?>

<script type="text/javascript">  
var configOptions = {
    "group": "<?php print  $item['ags_groupid'] ?>",
    "appid": "",
    "theme": "blueTheme",
    "siteTitle": "",
    "siteBannerImage": "",
    "mapTitle": "",
    "mapSnippet": "",
    "mapItemDescription": "",
    "mapLicenseInfo": "",
    "homeHeading": "",
    "homeSnippet": "",
    "homeSideHeading": "",
    "homeSideContent": "",
    "footerHeading": "",
    "footerDescription": "",
    "footerLogo": "",
    "footerLogoUrl": "",
    "addThisProfileId": "xa-4f3bf72958320e9e",
    "defaultLayout": "grid",
    "searchString": "",
    "sortField": "modified",
    "sortOrder": "desc",
    "searchType": "Maps",
    "mapViewer": "simple",
    "galleryItemsPerPage": 9,
    "showProfileUrl": false,
    "showSocialButtons": true,
    "showFooter": true,
    "showBasemapGallery": true,
    "showArcGISBasemaps": true,
    "basemapsGroup": {},
    "showGroupSearch": true,
    "showGroupSort": false,
    "showMapSearch": true,
    "showLayerToggle": true,
    "showLayoutSwitch": true,
    "showOverviewMap": true,
    "showMoreInfo": false,
    "showPagination": true,
    "showExplorerButton": false,
    "showArcGISOnlineButton": false,
    "showLicenseInfo": true,
    "showAttribution": true,
    "showComments": false,
    "showRatings": false,
    "showViews":true,
    "showMobileButtons": true,
    "openGalleryItemsNewWindow": false,
    "bannerBackground": "images/ui/banner.png",
    "bingMapsKey":"Akt3ZoeZ089qyG3zWQZSWpwV3r864AHStal7Aon21-Fyxwq_KdydAH32LTwhieA8",
    "locatorserviceurl": "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
    "geometryserviceurl": "http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer",
    "proxyUrl":"<?php drupal_get_path('module', 'mapgallery_group').'/proxy/proxy.php'?>",
    "sharingurl":"<?php print $ags_url; ?>",
    "mobilePortalUrl":"arcgis://www.arcgis.com/",
    "iosAppUrl": "itms://itunes.apple.com/us/app/arcgis/id379687930?mt=8",
    "androidAppUrl": "https://market.android.com/details?id=com.esri.android.client",
    "pointGraphic": "images/ui/bluepoint-21x25.png",
	"sourceCountry":"USA"
};  
</script>

<div id="galleryBody" class="claro">
<div id="esriheader">
	<div class="container_12 headerContainer" id="topHeader">
		<div class="grid_12">
			<ul id="templateNav">
			</ul>
		</div>
	</div>
</div>
<div id="content">
	<div class="container_12">
		<div id="mainPanel" class="grid_12">
			<h1 id="homeHeading"></h1>
			<p id="homeSnippet"></p>
			<div id="layoutAndSearch"></div>
			<div id="groupSortOptions"></div>
			<div id="featuredMaps">
				<p id="featuredLoading" class="featuredLoading"></p>
			</div>
			<div class="clear"></div>
			<div class="grid_6 alpha">
				<div id="maps_pagination" class="pagination"></div>
			</div>
			<div class="grid_3 omega">
				<div id="socialHTML" class="socialButtons itemRight"></div>
				<div class="clear"></div>
			</div>
			<div class="clear"></div>
		</div>
		<!--div id="sidePanel" class="grid_3">
			<div class="scrollHeight">
				<div id="homeSideContent"></div>
			</div>
		</div -->
		<div class="clear"></div>
	</div>
</div>
