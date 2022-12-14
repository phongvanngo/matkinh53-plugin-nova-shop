<?php

function CreatePageKinhMat($productType = "kinh-mat")
{
    $pageTitle = "";
    $features_label = "DÁNG KÍNH";

    $hide_title_feature_filter_item = false;

    switch ($productType) {
        case "kinh-mat":
            $pageTitle = "KÍNH MÁT";
            break;
        case "trong-kinh":
            $pageTitle = "TRÒNG KÍNH";
            $features_label = "ĐẶC TÍNH TRÒNG";
            break;
        case "gong-kinh":
            $pageTitle = "GỌNG KÍNH";
            break;
    }


    ob_start();
    ?>
    <link rel="stylesheet" href="<?php echo plugins_url('/css/products-page02.css', __FILE__) ?>">
    <link rel="stylesheet" href="<?php echo plugins_url('/css/custom-checkbox02.css', __FILE__) ?>">
    <link rel="stylesheet" href="<?php echo plugins_url('/css/products02.css', __FILE__) ?>">
    <link rel="stylesheet" href="<?php echo plugins_url('/css/pagination02.css', __FILE__) ?>">
    <link rel="stylesheet" href="<?php echo plugins_url('/css/brand-style02.css', __FILE__) ?>">
    <div id="kinh-mat"/>

    <div class="nova-products">

    </div>

    <div class="nova-products">
        <div id="nova-mark"
        <div class="nova-mobile-filter">
            <div style="overflow:hidden" class="filter-feature-container">
                <div onclick="handleSlide(false,'filter-brands-wrapper')" class="arrow-icon btn-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-chevron-compact-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
                    </svg>
                </div>
                <div id="filter-brands-wrapper" class="filter-feature-wrapper">
                </div>
                <div class="arrow-icon btn-right" onclick="handleSlide(true,'filter-brands-wrapper')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-chevron-compact-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
                    </svg>
                </div>

            </div>
            <div class="filter-feature-container" style="overflow:hidden">
                <div onclick="handleSlide(false,'filter-feature-wrapper')" class="arrow-icon btn-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-chevron-compact-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
                    </svg>
                </div>
                <div id="filter-feature-wrapper" class="filter-feature-wrapper">
                </div>
                <div class="arrow-icon btn-right" onclick="handleSlide(true,'filter-feature-wrapper')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-chevron-compact-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
                    </svg>
                </div>
            </div>
            <script>
                function handleSlide(toRight, id) {
                    if (toRight) {
                        document.getElementById(id).scrollLeft += 50;
                        console.log("scroll");
                    } else {
                        document.getElementById(id).scrollLeft -= 50;
                    }
                }
            </script>
        </div>

        <!--        <div id="overlay-filter-sidebar" onclick="closeFilterSidebar()">-->
        <!--            <div class="btn-close-filter-sidebar">-->
        <!--                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">-->
        <!--                    <path fill-rule="evenodd"-->
        <!--                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"-->
        <!--                          clip-rule="evenodd"/>-->
        <!--                </svg>-->
        <!--            </div>-->
        <!--        </div>-->
        <div id="filter-sidebar" class="filter-wrapper ">
            <div class="for-mobile mobile-filter-header">
                <div class="filter-title">LỌC SẢN PHẨM</div>
                <div class="btn-close" onclick="closeFilterSidebar()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x"
                         viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </div>
            </div>
            <div class="filter-section">
                <div id="nova-active-filter-bar" class="active-filter-bar-wrapper"></div>
                <button onclick="emptyFilter()" id="btn-clear-filter" class="btn-clear-filter">
                    BỎ CHỌN TẤT CẢ
                </button>
                <div class="filter-box open">
                    <div class="filter-box-title">
                        <h3>GIÁ</h3>
                        <span class="plus">+</span>
                        <span class="minus">-</span>
                    </div>
                    <div id="filter-price-range" class="filter-box-list">

                    </div>
                </div>
                <div class="filter-box open">
                    <div class="filter-box-title">
                        <h3>THƯƠNG HIỆU</h3>
                        <span class="plus">+</span>
                        <span class="minus">-</span>
                    </div>
                    <div id="filter-brands" class="filter-box-list">

                    </div>
                </div>
                <div class="filter-box open">
                    <div class="filter-box-title">
                        <h3> <?php echo $features_label ?> </h3>
                        <span class="plus">+</span>
                        <span class="minus">-</span>
                    </div>
                    <div id="filter-shapes" class="filter-box-list">

                    </div>
                </div>
                <div id="filter-gender-wrapper" class="filter-box open">
                    <div class="filter-box-title">
                        <h3>GIỚI TÍNH</h3>
                        <span class="plus">+</span>
                        <span class="minus">-</span>
                    </div>
                    <div id="filter-gender" class="filter-box-list">

                    </div>
                </div>
            </div>
            <div class="apply-filter-section">
                <div class="btn-apply-filter for-mobile" onclick="closeFilterSidebar()">
                    TÌM KIẾM
                </div>
            </div>
        </div>
        <div class="products-wrapper">

            <div class="mobile-filter-action">
                <div onclick="openFilterSideBar()" class="btn-open-filter">

                    <svg xmlns="http://www.w3.org/2000/svg" class="filter-icon" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                    </svg>
                    <span>Lọc Sản Phẩm</span>
                </div>
            </div>
            <div class="product-header-wrapper">

                <h1 id="nova-page-title" class="page-title">
                    <?php echo $pageTitle ?>
                </h1>
                <div class="nova-sort-wrapper">
                    <div id="title-result-count"></div>
                    <select name="cars" id="nova-sort-product" onchange="changeSort(event)">
                        <option value="none" id="none" hidden>Sắp xếp</option>
                        <option value="datedesc" id="datedesc">Mới nhất</option>
                        <option value="dateasc" id="dateasc">Cũ nhất</option>
                        <option value="pricedesc" id="pricedesc">Giá từ cao tới thấp</option>
                        <option value="priceasc" id="priceasc">Giá từ thấp tới cao</option>
                    </select>
                </div>
            </div>
            <div id="no-product-message-wrapper">

            </div>
            <div id="products-list" class="products-list-area">

            </div>
            <div id="nova-shop-product-pagination"></div>
        </div>
    </div>


    <script src="<?php echo plugins_url('/js/global_state.js', __FILE__) ?>"></script>
    <script src="<?php echo plugins_url('/js/paginationjs.min.js', __FILE__) ?>"></script>
    <script>
        URL_ADMIN_AJAX = '<?php echo admin_url('admin-ajax.php');?>';
    </script>
    <script src="<?php echo plugins_url('/js/fetch_filter.js', __FILE__) ?>"></script>
    <script src="<?php echo plugins_url('/js/products.js', __FILE__) ?>"></script>
    <script src="<?php echo plugins_url('/js/filter_kinh_mat.js', __FILE__) ?>"></script>
    <script>
        product_type = "<?php echo $productType ?>";
        hide_title_feature_filter_item = "<?php echo $hide_title_feature_filter_item ?>";
        Fetch_filter(product_type);
        handleFetchProductsWhenLoadPage();
    </script>

    <?php
    return ob_get_clean();
}