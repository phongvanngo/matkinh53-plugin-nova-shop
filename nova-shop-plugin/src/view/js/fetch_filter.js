function Fetch_filter(product_type="kinh-mat") {
    jQuery.ajax({
        // type : "post", //Phương thức truyền post hoặc get
        dataType: "json", //Dạng dữ liệu trả về xml, json, script, or html
        // url: '<?php echo admin_url('admin-ajax.php');?>', //Đường dẫn chứa hàm xử lý dữ liệu. Mặc định của WP như vậy
        url: URL_ADMIN_AJAX, //Đường dẫn chứa hàm xử lý dữ liệu. Mặc định của WP như vậy
        data: {
            'action': 'GetCategory', // This is our PHP function below
            // 'novapo_filter': `${JSON.stringify(currentFilter)}`// This is the variable we are sending via AJAX
            'product_type':product_type
        },
        success: function (data) {
            categories_information = data;
            console.log(categories_information);
            renderFilterKinhMat();
            handleUpdateFilterSetWhenLoadPage();

        },
        error: function (errorThrown) {
            console.log(errorThrown);
        }
    })
};


