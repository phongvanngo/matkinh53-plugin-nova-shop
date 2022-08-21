<?php
/**
 * @package nova-shop
 * @version 1.0.0
 */
/*
Plugin Name: Nova Shop
Description: provide products layout developed from woo commerce
Author: Novapo
Version: 1.2.0
*/

require __DIR__ . '/src/api/product_api.php';
require __DIR__ . '/src/view/view.php';

$novashop_env = array(
    'cate_id_trong_kinh' => 0,
    'cate_id_gong_kinh' => 0,
    'cate_id_kinh_mat' => 0,
    'cate_id_brands_trong_kinh' => 0,
    'cate_id_brands_gong_kinh' => 0,
    'cate_id_brands_kinh_mat' => 0,
    'cate_id_gender' => 0,
    'cate_id_shapes_kinh_mat' => 0,
    'cate_id_shapes_gong_kinh' => 0,
    'cate_id_features_trong_kinh' => 0,
);

add_shortcode('novashop', 'BuildProductPage');

function BuildProductPage($atts) {
    return CreatePageKinhMat($atts["type"]);
};

//add feature price range products
