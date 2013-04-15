<!-- WEBMAP -->
<!-- STYLESHEETS -->
<?php


drupal_add_css("//serverapi.arcgisonline.com/jsapi/arcgis/3.3/js/dojo/dijit" .
"/themes/claro/claro.css", array (
	'group' => CSS_THEME,
	'type' => 'external'
));

drupal_add_css("//serverapi.arcgisonline.com/jsapi/arcgis/3.3/js/esri/css/esri.css", 
array (
	'group' => CSS_THEME,
	'type' => 'external'
));

drupal_add_css(drupal_get_path('module', 'webmap') . '/css/webmap.css');
$rand = rand();
?>

<!-- JAVASCRIPT -->
<?php
$url = $GLOBALS['base_url'] . '/'.(drupal_get_path('module', 'webmap'));
drupal_add_js('var esri_webmap_field_url = "'.$url.'"; esriMapGalleryDoDojoConfig();', 'inline', array('group' => JS_LIBRARY, 'weight' => -10));
drupal_add_js(drupal_get_path('module', 'webmap')."/../common/js/djConfig.js", array('group' => JS_LIBRARY, 'weight' => -5));
drupal_add_js('http://serverapi.arcgisonline.com/jsapi/arcgis/3.3', 'external', array('group' =>JS_DEFAULT));
?>

<script type="text/javascript">

 dojo.require("esri.utils");

  require(["esriWebmap/js/map" ], 
  function(esriWebmap) {
      var map<?php print $rand?> = new esriWebmap();	
	  map<?php print $rand?>.setElBaseSuffix('<?php print $rand?>');
	  map<?php print $rand?>.setMapElementId('esriWebMapField<?php print $rand?>');
	  map<?php print $rand?>.setToken("<?php print $item['ags_token'] ?>")
	  map<?php print $rand?>.showWebMap("<?php print $ags_url; ?>", "<?php print $item['ags_webmapid'] ?>" );
  });
  
</script>

<div id="esriWebMap<?php print $rand?>" class="esriWebMap claro">
  <div id="esriWebMapTitleBar<?php print $rand?>" class="esriWebMapTitleBar">
  </div>
  <div>
    <div id="esriWebMapLegend<?php print $rand?>" class="claro esriWebMapLegend"></div>
    <div id="esriWebMapField<?php print $rand?>" class="claro esriWebMapField"></div>
  </div>
</div>