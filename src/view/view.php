<?php

function CreatePageKinhMat()
{
    ob_start();
    ?>
    <link rel="stylesheet" href="<?php echo plugins_url('/css/filter.css', __FILE__) ?>">
    <link rel="stylesheet" href="<?php echo plugins_url('/css/products-page.css', __FILE__) ?>">
    <link rel="stylesheet" href="<?php echo plugins_url('/css/custom-checkbox.css', __FILE__) ?>">
    <link rel="stylesheet" href="<?php echo plugins_url('/css/products.css', __FILE__) ?>">
    <link rel="stylesheet" href="<?php echo plugins_url('/css/pagination.css', __FILE__) ?>">
    <div id="kinh-mat"/>

    <div class="nova-products">

    </div>

    <div class="nova-products">
        <div class="filter-wrapper">
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
                    <h3>DÁNG KÍNH</h3>
                    <span class="plus">+</span>
                    <span class="minus">-</span>
                </div>
                <div id="filter-shapes" class="filter-box-list">

                </div>
            </div>
            <div class="filter-box open">
                <div class="filter-box-title">
                    <h3>GIỚI TÍNH</h3>
                    <span class="plus">+</span>
                    <span class="minus">-</span>
                </div>
                <div id="filter-gender" class="filter-box-list">

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
        </div>
        <div class="products-wrapper">
            <div id="products-list" class="products-list-area">
            </div>
            <div id="nova-shop-product-pagination"></div>
        </div>
    </div>

    <script src="https://pagination.js.org/dist/2.1.5/pagination.min.js"></script>
    <script src="<?php echo plugins_url('/js/global_state.js', __FILE__) ?>"></script>
    <script>
        URL_ADMIN_AJAX = '<?php echo admin_url('admin-ajax.php');?>';
    </script>
    <script src="<?php echo plugins_url('/js/fetch_filter.js', __FILE__) ?>"></script>
    <script src="<?php echo plugins_url('/js/products.js', __FILE__) ?>"></script>
    <script src="<?php echo plugins_url('/js/filter_kinh_mat.js', __FILE__) ?>"></script>



    <?php
    return ob_get_clean();
}