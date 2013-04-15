<?php

/**
 * @file
 * Template file for theming_example_text_form
 *
 * The array $text_form_content contains the individual form components
 * To view them in the source html use this
 *
 * <?php print '<!--' . print_r($text_form_content, TRUE) . '-->'; ?>
 *
 */
 
  //dpm( var_dump( $entity ));

?>

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

drupal_add_css(drupal_get_path('module', 'mapgallery_group') . '/gallery_carousel/css/carousel.css');
drupal_add_css(drupal_get_path('module', 'mapgallery_group') . '/map_field/css/map.css');

$rand = rand();
?>

<!-- JAVASCRIPTS -->
<?php
$url = $GLOBALS['base_url'] . '/'.(drupal_get_path('module', 'mapgallery_group'));
drupal_add_js('var esri_mapgallery_field_url = "'.$url.'"; esriMapGalleryDoDojoConfig();', 'inline', array('group' => JS_LIBRARY, 'weight' => -10));
drupal_add_js(drupal_get_path('module', 'mapgallery_group')."/../common/js/djConfig.js", array('group' => JS_LIBRARY, 'weight' => -5));
drupal_add_js('http://serverapi.arcgisonline.com/jsapi/arcgis/3.3', 'external', array('group' =>JS_DEFAULT));

//drupal_add_js('//d3w50ib5d2uy0g.cloudfront.net/cdn/2265A/js/esri/base.js', 'external');



?>

<script type="text/javascript">

  dojo.require("esri.utils");

  require(["esriTemplate/gallery_carousel/carousel", 
           "esriTemplate/map_field/map" ], 
  function(carousel, map) {
    var showMapOnPage = <?php print  $item['ags_showmap_onpage'] ?>;
    
    var map<?php print $rand?> = null;
    if(showMapOnPage == 1) {
      map<?php print $rand?> = new esriTemplate.map_field.map();	
	  map<?php print $rand?>.setElBaseSuffix('<?php print $rand?>');
	  map<?php print $rand?>.setMapElementId('esriMapField<?php print $rand?>');
	  map<?php print $rand?>.showWebMap("http://www.arcgis.com", "dbd1c6d52f4e447f8c01d14a691a70fe", esri.geometry.Extent(-50094000, -15615000, 50094000, 15615000, new esri.SpatialReference({"wkid":102100})));
    } 
	
  	var csl<?php print $rand?> = new esriTemplate.gallery_carousel.carousel();
  	csl<?php print $rand?>.setBaseUrl("<?php print $ags_url; ?>");
  	csl<?php print $rand?>.setElSuffix("<?php print $rand; ?>");
	csl<?php print $rand?>.setObjMapField(map<?php print $rand?>);
	csl<?php print $rand?>.setToken('<?php print $item['ags_token'] ?>');
  	csl<?php print $rand?>.initGui();
  	csl<?php print $rand?>.initfeaturedMapsCarouselAndApps("<?php print  $item['ags_groupid'] ?>");
  });

 
   
</script>

<style type="text/css">


.claro .dijitContentPane {
	padding: 0;
}

.field-label, #map {
  display: none;
  visibility: hidden;
}


</style>

<div class="carouselParent">

<?php if ( $item['ags_showmap_onpage'] == '1'): ?>
<div id="esriMap">
  <div id="esriMapTitleBar<?php print $rand?>" class="esriMapTitleBar">
  </div>
  <div id="esriMapField<?php print $rand?>" class="claro esriMapField">
  </div>
</div>
<?php endif; ?>

<div id="featuredMapsCarousel<?php print $rand?>" class="featuredMapsCarousel eoe-wp-wrapper">
  				
        				<div dojotype="dijit.layout.ContentPane" class="scrollPaneParent rounded" style="overflow-x:hide; overflow-y:hide;">
        					<div align="center" style="overflow: hidden; position: relative; margin-left: 0;">
        						<table class="scrollContent" cellpadding="0" cellspacing="0">
        							<tr id="mapsAndApps<?php print $rand?>" height="120px;" valign="top">
   
        							</tr>
        						</table>
        					</div>
        					<div id="scrollPaneLeft<?php print $rand?>" style="display: none" class="scroll scrollPrev"></div>
        					<div id="scrollPaneRight<?php print $rand?>" style="display: none" class="scroll scrollNext"></div>
        				</div>
        			</div>
    
    
    </div>

</div>
