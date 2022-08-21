<?php

define("price_range", [
    array(
        'term_id' => "0|500000",
        'name' => 'Dưới 500.000đ',
        'value' => [0, 500000]
    ),
    array(
        'term_id' => "500000|1000000",
        'name' => 'Từ 500.000đ đến 1.000.000đ',
        'value' => [500000, 1000000]
    ),
    array(
        'term_id' => "1000000|2000000",
        'name' => 'Từ 1.000.000đ đến 2.000.000đ',
        'value' => [1000000, 2000000]
    ),
    array(
        'term_id' => "2000000|5000000",
        'name' => 'Từ 2.000.000đ đến 5.000.000đ',
        'value' => [2000000, 5000000]
    ),
    array(
        'term_id' => "5000000|10000000",
        'name' => 'Từ 5.000.000đ đến 10.000.000đ',
        'value' => [5000000, 10000000]
    ),
    array(
        'term_id' => "10000000|00",
        'name' => 'Trên 10.000.000đ',
        'value' => [10000000, '00']
    ),
]);

function getMetaData($terms = array()): array
{
    $res = array();
    if (!empty($terms)) {
        foreach ($terms as $key => $category) {
            $thumbnail_id = get_term_meta($category->term_id, 'thumbnail_id', true);
            $image = wp_get_attachment_url($thumbnail_id);
//            $item = $category;
            $category->image = $image;
            array_push($res, $category);
        }
    };
    return $res;
}

function GetCategory()
{
    if (isset($_REQUEST)) {

        $product_type = $_REQUEST["product_type"];

        global $novashop_env;
        $novashop_env = apply_filters('change_novashop_env', $novashop_env);

        $gender = get_terms('product_cat', array('hide_empty' => false, 'parent' => $novashop_env['cate_id_gender']));
        $brands = array();
        $features = array();

        $all_categories = get_terms('product_cat', array('hide_empty' => false));
        switch ($product_type) {
            case "kinh-mat":
                $features = get_terms('product_cat', array('hide_empty' => false, 'parent' => $novashop_env['cate_id_shapes_kinh_mat']));
                $brands = get_terms('product_cat', array('hide_empty' => false, 'parent' => $novashop_env['cate_id_brands_kinh_mat']));
                break;
            case "trong-kinh":
                $features = get_terms('product_cat', array('hide_empty' => false, 'parent' => $novashop_env['cate_id_features_trong_kinh']));
                $brands = get_terms('product_cat', array('hide_empty' => false, 'parent' => $novashop_env['cate_id_brands_trong_kinh']));
                break;
            case "gong-kinh":
                $features = get_terms('product_cat', array('hide_empty' => false, 'parent' => $novashop_env['cate_id_shapes_gong_kinh']));
                $brands = get_terms('product_cat', array('hide_empty' => false, 'parent' => $novashop_env['cate_id_brands_gong_kinh']));
                break;
        }

        $response_data = array(
            'all_categories' => $all_categories,
            'features' => getMetaData($features),
            'brands' => getMetaData($brands),
            'gender' => $gender,
            'price_ranges' => price_range,
        );

        echo json_encode($response_data);

    }
    die();
}

function GetCategory02()
{
    if (isset($_REQUEST)) {

        global $novashop_env;
        $novashop_env = apply_filters('change_novashop_env', $novashop_env);
        $all_categories = get_terms('product_cat', array('hide_empty' => false));

        $cate_brands_kinh_mat = get_terms('product_cat', array('hide_empty' => false, 'parent' => $novashop_env['cate_id_brands_kinh_mat']));
        $cate_brands_trong_kinh = get_terms('product_cat', array('hide_empty' => false, 'parent' => $novashop_env['cate_id_brands_trong_kinh']));
        $cate_brands_gong_kinh = get_terms('product_cat', array('hide_empty' => false, 'parent' => $novashop_env['cate_id_brands_gong_kinh']));
        $cate_gender = get_terms('product_cat', array('hide_empty' => false, 'parent' => $novashop_env['cate_id_gender']));
        $cate_shapes_kinh_mat = get_terms('product_cat', array('hide_empty' => false, 'parent' => $novashop_env['cate_id_shapes_kinh_mat']));
        $cate_shapes_gong_kinh = get_terms('product_cat', array('hide_empty' => false, 'parent' => $novashop_env['cate_id_shapes_gong_kinh']));
        $cate_features_gong_kinh = get_terms('product_cat', array('hide_empty' => false, 'parent' => $novashop_env['cate_id_features_trong_kinh']));

        $response_data = array(
            'all_categories' => $all_categories,
            'brands_kinh_mat' => getMetaData($cate_brands_kinh_mat),
            'brands_gong_kinh' => getMetaData($cate_brands_gong_kinh),
            'brands_trong_kinh' => getMetaData($cate_brands_trong_kinh),
            'shapes_kinh_mat' => getMetaData($cate_shapes_kinh_mat),
            'shapes_gong_kinh' => getMetaData($cate_shapes_gong_kinh),
            'features_trong_kinh' => getMetaData($cate_features_gong_kinh),
            'gender' => $cate_gender,
            'price_ranges' => price_range,
        );

        echo json_encode($response_data);
    }
    die();
}

add_action('wp_ajax_GetCategory', 'GetCategory');
add_action('wp_ajax_nopriv_GetCategory', 'GetCategory');

function extractPriceFromHTML($str)
{

    $price = new stdClass();

    $res = $str;

    $res = strstr($res, "<bdi>");
    $start = 5;

    $end = strpos($res, "&nbsp");
    $price->regular_price = substr($res, $start, $end - $start);
    $res = substr($res, 5);
    $res = strstr($res, "<bdi>");
    $end = strpos($res, "&nbsp");
    $price->sale_price = substr($res, $start, $end - $start);

    $price->regular_price = str_replace(".", "", $price->regular_price);
    $price->sale_price = str_replace(".", "", $price->sale_price);

    if (empty($price->sale_price)) $price->sale_price = -1;
    $price->sale_price = (int)$price->sale_price;
    $price->regular_price = (int)$price->regular_price;


    return $price;
}

function formatProducts($loop): array
{
    $res = array();
    while ($loop->have_posts()) :
        $loop->the_post();
        global $product;
        $product_info = new stdClass();

        $product_info->images = wp_get_attachment_image_src(get_post_thumbnail_id($product->get_id()), 'single-post-thumbnail');
        $product_info->title = $product->get_title();
        $product_info->price = $product->get_price();
        $product_info->regular_price = $product->get_regular_price();
        $product_info->sale_price = $product->get_sale_price();
        $product_info->price_info = extractPriceFromHTML($product->get_price_html());
        $product_info->price_html = $product->get_price_html();
        $product_info->link = $product->get_permalink();
        $product_info->id = $product->get_id();
        $product_info->meta_data = get_post_meta($product->get_id());
        array_push($res, $product_info);
    endwhile;

    return $res;
}

function formatWooProducts($products)
{
    $res = array();

    foreach ($products as &$product) {
        $item = new stdClass();

        $item->id = $product->get_id();

// Get Product General Info

        $item->type = $product->get_type();
        $item->name = $product->get_name();
        $item->slug = $product->get_slug();

        $item->images = wp_get_attachment_image_src(get_post_thumbnail_id($product->get_id()), 'single-post-thumbnail');
        $item->price_info = extractPriceFromHTML($product->get_price_html());
        $item->status = $product->get_status();
        $item->featured = $product->get_featured();
        $item->catalog_visibility = $product->get_catalog_visibility();
        $item->description = $product->get_description();
        $item->short_description = $product->get_short_description();
        $item->sku = $product->get_sku();
        $item->menu_order = $product->get_menu_order();

        $item->link = get_permalink($product->get_id());

// Get Product Prices

        $item->price = $product->get_price();
        $item->regular_price = $product->get_regular_price();
        $item->sale_price = $product->get_sale_price();
        $item->data_on_sale_from = $product->get_date_on_sale_from();
        $item->date_on_sale_to = $product->get_date_on_sale_to();
        $item->total_sale = $product->get_total_sales();

// Get Product Tax, Shipping & Stock

//        $item->field=$product->get_tax_status();
//        $item->field=$product->get_tax_class();
//        $item->field=$product->get_manage_stock();
//        $item->field=$product->get_stock_quantity();
//        $item->field=$product->get_stock_status();
//        $item->field=$product->get_backorders();
//        $item->field=$product->get_sold_individually();
//        $item->field=$product->get_purchase_note();
//        $item->field=$product->get_shipping_class_id();

// Get Product Dimensions

//        $item->field=$product->get_weight();
//        $item->field=$product->get_length();
//        $item->field=$product->get_width();
//        $item->field=$product->get_height();
//        $item->field=$product->get_dimensions();

// Get Linked Products

//        $item->field=$product->get_upsell_ids();
//        $item->field=$product->get_cross_sell_ids();
//        $item->field=$product->get_parent_id();

// Get Product Variations and Attributes

        $item->children = $product->get_children(); // get variations
        $item->attributes = $product->get_attributes();
        $item->default_attributes = $product->get_default_attributes();
//        $item->field=$product->get_attribute( 'attributeid' ); //get specific attribute value

// Get Product Taxonomies

        $item->categories = $product->get_categories();
        $item->category_id = $product->get_category_ids();
        $item->tag_ids = $product->get_tag_ids();

// Get Product Downloads

//        $item->field=$product->get_downloads();
//        $item->field=$product->get_download_expiry();
//        $item->field=$product->get_downloadable();
//        $item->field=$product->get_download_limit();

// Get Product Images

        $item->image_id = $product->get_image_id();
        $item->image = $product->get_image();
        $item->gallery_image_ids = $product->get_gallery_image_ids();

// Get Product Reviews

//        $item->field=$product->get_reviews_allowed();
//        $item->field=$product->get_rating_counts();
//        $item->field=$product->get_average_rating();
//        $item->field=$product->get_review_count();
        array_push($res, $item);

    }


    return $res;
}

function GetProducts()
{
    if (isset($_REQUEST)) {

        $payload = $_REQUEST["novashop_filter"];
        $product_type = $_REQUEST["product_type"];


        $filter_set = new stdClass();
        $filter_set->gender = $payload['gender'];
        $filter_set->brands = $payload['brands'];
        $filter_set->shapes = $payload['shapes'];
        $filter_set->page = $payload['pageord'];
        $filter_set->price_ranges = $payload['prices'];
        $filter_set->product_type = $product_type;
        $filter_set->limit = $payload['limit'];
        $filter_set->order = $payload['order'];

        $tax_query = array('relation' => 'AND');
        if (!empty($filter_set->gender)) {
            array_push($tax_query, array(
                'taxonomy' => 'product_cat',
                'field' => 'id',
                'terms' => $filter_set->gender
            ));
        };
        if (!empty($filter_set->shapes)) {
            array_push($tax_query, array(
                'taxonomy' => 'product_cat',
                'field' => 'id',
                'terms' => $filter_set->shapes
            ));
        };

        if (!empty($filter_set->brands)) {
            array_push($tax_query, array(
                'taxonomy' => 'product_cat',
                'field' => 'id',
                'terms' => $filter_set->brands
            ));
        };

        array_push($tax_query, array(
            'taxonomy' => 'product_cat',
            'field' => 'slug',
            'terms' => $filter_set->product_type,
        ));


//        $args = array(
//            'post_type' => 'product',
//            'posts_per_page ' =>2 ,
//            'paged' => $filter_set->page,
//            'tax_query' => $tax_query,
//            'price_range' => '1000000|2000000',

//        );

//        $loop = new WP_Query($args);
//        $products = formatProducts($loop);
//

        $args_to_count = array(
            'limit' => -1,
            'tax_query' => $tax_query,
            'price_range' => $filter_set->price_ranges,
            'visibility' => 'visible',
            'status' => 'publish',
        );

        $loop = wc_get_products($args_to_count);
        $count_all_products = count($loop);

        $args = array(
            'limit' => $filter_set->limit,
            'page' => $filter_set->page,
            'paginate' => true,
            'tax_query' => $tax_query,
            'price_range' => $filter_set->price_ranges,
            'visibility' => 'visible',
            'status' => 'publish',
        );

        switch ($filter_set->order) {
            case "priceasc":
                $args['order'] = "ASC";
                $args['orderby'] = "meta_value_num";
                $args['meta_key'] = "_price";
                break;
            case "pricedesc":
                $args['order'] = "DESC";
                $args['orderby'] = "meta_value_num";
                $args['meta_key'] = "_price";
                break;
            case "datedesc":
                $args['order'] = "DESC";
                $args['orderby'] = "date";
                break;
            case "dateasc":
                $args['order'] = "ASC";
                $args['orderby'] = "date";
                break;
            case "none":
                $args['orderby'] = "none";
                break;
        }


        $loop = wc_get_products($args);
        $products = formatWooProducts($loop->products);

        $response_data = array(
            'products' => $products,
            'loop' => $loop,
            'countResult' => $count_all_products,
            'totalPage' => $loop->max_num_pages,
            'pageord' => $filter_set->page,
            'limit' => $filter_set->limit,
            'filter_set' => $filter_set,
        );

        echo json_encode($response_data);
    }
    die();
}

add_action('wp_ajax_GetProducts', 'GetProducts');
add_action('wp_ajax_nopriv_GetProducts', 'GetProducts');

// --- handle meta query wc_get_products  -----
// --- add meta query through this function, otherwise meta queries are ignored

add_filter('woocommerce_product_data_store_cpt_get_products_query', 'handle_price_range_query_var', 10, 2);
function handle_price_range_query_var($query, $query_vars)
{
    if (!empty($query_vars['price_range'])) {
        $price_range = $query_vars['price_range'];

        if (is_array($price_range)) {
            $query['meta_query']['relation'] = 'OR';


            foreach ($price_range as $value) {

                $range = explode('|', esc_attr($value));

                if (end($range) == "00") {
                    // above $value[0]
                    $query['meta_query'][] =
                        array(
                            'key' => '_price',
                            'value' => reset($range),
                            'compare' => '>=',
                            'type' => 'NUMERIC'
                        );
                } else {
                    $query['meta_query'][] =
                        array(
                            'key' => '_price',
                            'value' => $range,
                            'compare' => 'BETWEEN',
                            'type' => 'NUMERIC'
                        );
                }

            }

//            $query['meta_query'][] =
//                array(
//                    'key' => '_price',
//                    'value' => array(0, 1000000),
//                    'compare' => 'BETWEEN',
//                    'type' => 'NUMERIC'
//                );

//            $query['meta_query'][] =
//                array(
//                    'key' => '_price',
//                    'value' => array(1000000,4000000),
//                    'compare' => 'BETWEEN',
//                    'type' => 'NUMERIC'
//                )
//            ;


            $query['orderby'] = 'meta_value_num'; // sort by price
            $query['order'] = 'ASC'; // In ascending order
        }
    }
    return $query;
}



