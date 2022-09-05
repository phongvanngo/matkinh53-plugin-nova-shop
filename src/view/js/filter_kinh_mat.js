let gender = [];
let shapes = [];
let brands = [];

let product_type;


var filter_set = {
    gender: [],
    shapes: [],
    brands: [],
    prices: [], // price-ranges
    pageord: 1,
    limit: 15,
    order: "none"
}

// custom css config
let hide_title_feature_filter_item ;

// utils -----------------------
const PRE_ID = {
    cate_checkbox: "CATEINP",
    cate_mobile: "CATEMOBILE",
    active_filter: "ACTIVE_FILTER"
}
const id_cate_checkbox = (id) => `${PRE_ID.cate_checkbox}${id}`;
const extract_id_cate_checkbox = (str) => str.replace(PRE_ID.cate_checkbox, "");

const id_cate_mobile = (id) => `${PRE_ID.cate_mobile}${id}`;
const extract_id_cate_mobile = (str) => str.replace(PRE_ID.cate_mobile, "");

const id_active_filter = (id) => `${PRE_ID.active_filter}${id}`;
const extract_id_active_filter = (str, id) => str.replace(PRE_ID.active_filter, "");


// handle url search params ----------
function convertObjectToQueryParams(object) {

    let query = {...object};

    let str = "";

    query.brands = query.brands ? query.brands.join() : "";
    query.shapes = query.shapes ? query.shapes.join() : "";
    query.gender = query.gender ? query.gender.join() : "";
    query.prices = query.prices ? query.prices.join() : "";

    for (let key in query) {
        if (!query[key]) {
            delete query[key];
        }
    }
    ;

    return "?" + jQuery.param(query);

}

function extractQueryParams(str) {
    let params = new URLSearchParams(str);
    console.log("params", str, params);

    let query = {
        brands: params.get("brands") ? params.get("brands").split(",") : [],
        shapes: params.get("shapes") ? params.get("shapes").split(",") : [],
        gender: params.get("gender") ? params.get("gender").split(",") : [],
        prices: params.get("prices") ? params.get("prices").split(",") : [],
        order: params.get("order") || filter_set.limit,
        limit: params.get("limit") || filter_set.limit,
        pageord: params.get("pageord") || 1,
    };

    console.log(query);


    return query;
}

// utils

//components

function updateCheckStatusCategory(id, status) {
    document.getElementById(id_cate_checkbox(id)).checked = status;
}

function filterActiveBadgeComponent(id, name, filter_name) {
    return `
        <div class="badge-wrapper">
            <span class="active-fitler-name">${name}</span>
            <svg 
                id="${id_active_filter(id)}" 
                onclick="removeFilterBadge('${id}','${filter_name}')" 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor"
                class="bi bi-x-lg" 
                viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
            <span class="btn-remove-filter">
            </span>
        </div>
    `
}

function cateFilterItemComponent(id, name, image, filter_type_name) {
    return `
        <label class="filter-item">
            <input 
                onchange="chooseFilter(this,'${id}','${filter_type_name}')"
                id="${id_cate_checkbox(id)}" 
                type="checkbox" 
                class="nova-checkbox" 
                value="1"
            />
            ${image ? `<img src='${image}'/>` : ""}
            <span>${name}</span>
        </label>
`;
}

function FeatureFilterItemComponent({id, img, filter_name, title}) {
    return `
        <div id="${id_cate_mobile(id)}" class="filter-feature-item" onclick="mobileChooseFilter(this,'${id}','${filter_name}')">
            <img src="${img}"/>
            ${hide_title_feature_filter_item ? "" : `<p class='feature-item'>${title}</p>`}
        </div>
    `
}

function BrandFilterItemComponent({id, filter_name, title}) {
    return `
        <div id="${id_cate_mobile(id)}" onclick="mobileChooseFilter(this,'${id}','${filter_name}')" class="filter-brand-item">
            <span>${title}</span>
        </div>
    `
}
function BrandFilterItemComponent_haveImage({id, filter_name, title,image}) {
    return `
        <div id="${id_cate_mobile(id)}" onclick="mobileChooseFilter(this,'${id}','${filter_name}')" class="filter-feature-item mobile-filter-brand">
            <img src="${image}"/>
        </div>
    `
}

//logic

function removeItemFromArr(arr, value) {
    const index = arr.findIndex(item => item.term_id == value);
    if (index >= 0) arr = arr.splice(index, 1);
}

function addItemToArr(arr, value, filter_name) {

    if (filter_name === "prices") {
        const index = arr.findIndex(item => item.term_id == value);
        if (index >= 0) return;
        const cate = categories_information.price_ranges.find(item => item.term_id == value);
        arr.push(cate);
    } else {
        const index = arr.findIndex(item => item.term_id == value);
        if (index >= 0) return;
        const cate = categories_information.all_categories.find(item => item.term_id == value);
        arr.push(cate);
    }


}

function fetchProducts(filter, changePage = false) {
    const filter_set = filter;
    console.log("fetch_products, fslefkjselk product_type", filter_set, product_type);

    jQuery.ajax({
        dataType: "json", //Dạng dữ liệu trả về xml, json, script, or html
        url: URL_ADMIN_AJAX, //Đường dẫn chứa hàm xử lý dữ liệu. Mặc định của WP như vậy
        data: {
            'action': 'GetProducts', // This is our PHP function below
            'novashop_filter': filter_set,// This is the variable we are sending via AJAX
            'product_type': product_type
        },
        success: function (data) {

            const {pageord, totalPage, products, limit, countResult} = data;
            renderProductsList(products);

            if (countResult === 0) {
                handleNoProduct();
                return;
            }

            if (changePage === false) {
                handleRenderPagaination(pageord, filter_set.limit, totalPage);
            }
            handleHaveProduct();


            renderCountResult(pageord, limit, countResult);
        },
        error: function (errorThrown) {
            console.log("errorThrow", errorThrown.error);

        }
    })
}

function scrollTopAfterFilter() {
    const Y = document.getElementById("nova-mark").offsetTop;
    console.log(Y);
    window.scrollTo(0, Y);

}

function handleFilterProduct({changePage} = {changePage: false}) {
    console.log("handle filter produuct, filter_set", filter_set);
    if (changePage === false) {
        filter_set.pageord = 1;
    }
    ;
    const official_filter_set = {
        ...filter_set,
        gender: filter_set.gender.map(item => item.term_id),
        shapes: filter_set.shapes.map(item => item.term_id),
        brands: filter_set.brands.map(item => item.term_id),
        prices: filter_set.prices.map(item => item.term_id),
    }

    updateCurrentURL(official_filter_set);
    displayBtnClearFilter();
    fetchProducts(official_filter_set, changePage);
}

function emptyFilter() {

    filter_set.brands.forEach(item => {
        document.getElementById(id_cate_checkbox(item.term_id)).checked = false;
        updateMobileFeatureCheckStatus(item.term_id, false);
    })
    filter_set.shapes.forEach(item => {
        document.getElementById(id_cate_checkbox(item.term_id)).checked = false;
        updateMobileFeatureCheckStatus(item.term_id, false);

    })
    filter_set.gender.forEach(item => {
        document.getElementById(id_cate_checkbox(item.term_id)).checked = false;
        updateMobileFeatureCheckStatus(item.term_id, false);

    })
    filter_set.prices.forEach(item => {
        document.getElementById(id_cate_checkbox(item.term_id)).checked = false;
        updateMobileFeatureCheckStatus(item.term_id, false);

    })

    filter_set = {
        ...filter_set,
        brands: [],
        shapes: [],
        gender: [],
        prices: []
    };
    handleFilterProduct();
    updateFilterActiveBar();
}

function removeFilterBadge(id, filter_name) {

    let filter = filter_set[filter_name];
    removeItemFromArr(filter, id);
    filter_set[filter_name] = filter;

    document.getElementById(id_cate_checkbox(id)).checked = false;
    document.getElementById(id_active_filter(id)).parentElement.remove();
    updateMobileFeatureCheckStatus(id_cate_mobile(id), false)
    handleFilterProduct();
}

function updateFilterActiveBar() {
    let res = "";
    filter_set.brands.forEach(item => {
        res += filterActiveBadgeComponent(item.term_id, item.name, `brands`,);
    });
    filter_set.shapes.forEach(item => {
        res += filterActiveBadgeComponent(item.term_id, item.name, `shapes`,);
    });
    filter_set.gender.forEach(item => {
        res += filterActiveBadgeComponent(item.term_id, item.name, `gender`,);
    });
    filter_set.prices.forEach(item => {
        res += filterActiveBadgeComponent(item.term_id, item.name, `prices`,);
    });
    document.getElementById("nova-active-filter-bar").innerHTML = res;
}

function displayBtnClearFilter() {
    const btnSetDefault = document.getElementById("btn-clear-filter");
    if (filter_set.brands.length === 0
        & filter_set.shapes.length === 0
        & filter_set.gender.length === 0
        & filter_set.prices.length === 0
    ) {
        btnSetDefault.classList.remove("open");
    } else {
        btnSetDefault.classList.add("open");
    }
}

function updateCurrentURL(value) {
    if (history.pushState) {
        var newurl =
            window.location.protocol + "//" +
            window.location.host +
            window.location.pathname +
            convertObjectToQueryParams(value)
        ;
        window.history.pushState({path: newurl}, '', newurl);
    }
}

function getCurrentFilterSetFromURL() {
    let current_filter_set = {...filter_set};
    try {
        current_filter_set = {...filter_set, ...extractQueryParams(window.location.search)};
        console.log(current_filter_set);
    } catch {
        console.log("get queryparams failed");
        updateCurrentURL({});
    }
    return current_filter_set;
}

function chooseFilter(element, id, filter_name) {
    let filter = filter_set[filter_name];
    if (element.checked) {
        addItemToArr(filter, id, filter_name);
        updateMobileFeatureCheckStatus(id, true);
    } else {
        removeItemFromArr(filter, id);
        updateMobileFeatureCheckStatus(id, false);
    }
    filter_set[filter_name] = filter;
    handleFilterProduct();
    updateFilterActiveBar();
}

//script handle allow chose one option
let filter_selected_set = {};

function mobileChooseFilter(element, id, filter_name) {
    let filter = filter_set[filter_name];

    if (element.classList.contains("selected")) {
        element.classList.remove("selected");
        removeItemFromArr(filter, id, filter_name)
        updateCheckStatusCategory(id, false);
    } else {
        element.classList.add("selected");
        addItemToArr(filter, id, filter_name);
        updateCheckStatusCategory(id, true);
    }

    filter_set[filter_name] = filter;
    handleFilterProduct();
    updateFilterActiveBar();
    scrollTopAfterFilter();
}

function updateMobileFeatureCheckStatus(id, status) {
    try {
        if (status) {
            document.getElementById(id_cate_mobile(id)).classList.add("selected");
        } else {
            document.getElementById(id_cate_mobile(id)).classList.remove("selected");
        }
    } catch {

    }
}

function renderFilterKinhMat() {

    let gender_options = "";
    let brands_options = "";
    let shapes_options = "";
    let price_options = "";

    let mobile_filter_feature = "";
    let mobile_filter_brands = "";


    categories_information.gender.forEach((item) => {
        gender_options += cateFilterItemComponent(item.term_id, item.name, null, 'gender');
    });
    categories_information.brands.forEach((item) => {
        brands_options += cateFilterItemComponent(item.term_id, item.name, null, 'brands');
        // mobile_filter_brands += BrandFilterItemComponent({title: item.name, id: item.term_id, filter_name: 'brands'});
        mobile_filter_brands += BrandFilterItemComponent_haveImage({image:item.image, title: item.name, id: item.term_id, filter_name: 'brands'});

    });
    categories_information.features.forEach((item) => {
        shapes_options += cateFilterItemComponent(item.term_id, item.name, item.image, 'shapes');
        mobile_filter_feature += FeatureFilterItemComponent({
            id: item.term_id,
            filter_name: 'shapes',
            img: item.image,
            title: item.name
        });
    });

    categories_information.price_ranges.forEach((item) => {
        price_options += cateFilterItemComponent(item.term_id, item.name, null, 'prices');
    });

    //handle error css scrolling in phone
    mobile_filter_brands += `<div style="min-width:50px;color:white">&nbsp;</div>`;
    mobile_filter_feature += `<div style="min-width:50px;color:white">&nbsp;</div>`;

    document.getElementById("filter-shapes").innerHTML = shapes_options;
    document.getElementById("filter-brands").innerHTML = brands_options;
    document.getElementById("filter-gender").innerHTML = gender_options;

    document.getElementById("filter-price-range").innerHTML = price_options;
    document.getElementById("filter-feature-wrapper").innerHTML = mobile_filter_feature;
    document.getElementById("filter-brands-wrapper").innerHTML = mobile_filter_brands;


}

function addEventToToggleFilterBox() {
    let boxes = document.getElementsByClassName("filter-box-title");
    for (let box of boxes) {
        box.addEventListener("click", () => {
            const filter_box_list = box.parentElement;
            filter_box_list.classList.toggle("open")
        })
    }
}

function handleFetchProductsWhenLoadPage() {
    const simple_filter_set = getCurrentFilterSetFromURL();
    fetchProducts(simple_filter_set);
}

function handleUpdateFilterSetWhenLoadPage() {
    //auto check checkbox from filter getting from URL
    const simple_filter_set = getCurrentFilterSetFromURL();
    console.log("handle recheck", simple_filter_set);

    // update simple_filter_set and check checkbox, check featuer in mobile
    simple_filter_set.gender.forEach(id => {
        document.getElementById(id_cate_checkbox(id)).checked = true;
        const item = categories_information.gender.find(cate => cate.term_id == id);
        filter_set.gender.push(item);
    })
    simple_filter_set.shapes.forEach(id => {
        updateMobileFeatureCheckStatus(id, true);
        document.getElementById(id_cate_checkbox(id)).checked = true;
        const item = categories_information.features.find(cate => cate.term_id == id);
        filter_set.shapes.push(item);
    })
    simple_filter_set.brands.forEach(id => {
        updateMobileFeatureCheckStatus(id, true);
        document.getElementById(id_cate_checkbox(id)).checked = true;
        const item = categories_information.brands.find(cate => cate.term_id == id);
        filter_set.brands.push(item);
    })
    simple_filter_set.prices.forEach(id => {
        document.getElementById(id_cate_checkbox(id)).checked = true;
        const item = categories_information.price_ranges.find(cate => cate.term_id == id);
        filter_set.prices.push(item);
    })

    displayBtnClearFilter();

    console.log("update filter when reload page", filter_set);

    document.getElementById(filter_set.order).selected = true;

    updateFilterActiveBar();


};

function handleRenderPagaination(page, pageSize, totalPage) {
    console.log("render pagination,", page, pageSize, totalPage);
    jQuery('#nova-shop-product-pagination').pagination({
        dataSource: (() => {
            let res = [];
            for (let i = 0; i < totalPage * pageSize; i++) res.push(i);
            return res;
        })(),
        pageSize: pageSize,
        pageRange:1,
        pageNumber: page,
        showPrevious: true,
        showNext: true,
        afterPageOnClick: (e) => {
            console.log("after page on click", e.currentTarget.getAttribute("data-num"));
            let chosenPage = e.currentTarget.getAttribute("data-num")
            filter_set.pageord = chosenPage;
            handleFilterProduct({changePage: true});
            scrollTopAfterFilter();
        },
        afterPreviousOnClick: () => {
            let selectedPage = jQuery('#nova-shop-product-pagination').pagination('getSelectedPageNum');
            filter_set.pageord = selectedPage;
            handleFilterProduct({changePage: true});
        },
        afterNextOnClick: () => {
            let selectedPage = jQuery('#nova-shop-product-pagination').pagination('getSelectedPageNum');
            filter_set.pageord = selectedPage;
            handleFilterProduct({changePage: true});
        }
    })
}

addEventToToggleFilterBox();

// handleRenderPagaination(1,filter_set.limit,10)


function changeSort() {
    let select = document.getElementById("nova-sort-product");
    filter_set.order = select.options[select.selectedIndex].value;
    handleFilterProduct();
}


function renderCountResult(page, limit, totalProducts) {
    if (totalProducts === 0) {
        document.getElementById("title-result-count").innerText = "";
        return;
    }
    ;
    let pageord = parseInt(page);
    let pageSize = parseInt(limit);
    let total = parseInt(totalProducts);

    let start = (pageSize * (pageord - 1)) + 1;
    let end = start + pageSize - 1;

    if (end > totalProducts) end = totalProducts;


    //render: Hiển thị 5-12 trên 127 kết quả
    let res = `Hiển thị ${start}-${end} trên ${total} kết quả`;
    document.getElementById("title-result-count").innerText = res;
}

function handleNoProduct() {
    document.getElementById("no-product-message-wrapper").innerHTML = `
        <div class="no-product-message">
           Rất tiếc, hiện tại chưa có sản phẩm nào phù hợp với yêu cầu của bạn
        
          <div class="for-mobile no-product-action-wrapper">
            <div class="btn-filter-come-back" onclick="emptyFilter()">XEM CÁC SẢN PHẨM KHÁC</div>
            <p> - Hoặc - </p>
            <div class="btn-filter-continue" onclick="openFilterSideBar();" >SỬ DỤNG BỘ LỌC</div>
         </div>
</div>
    `;

    document.querySelector('#nova-shop-product-pagination').innerHTML = "";

}

function handleHaveProduct() {
    document.getElementById("no-product-message-wrapper").innerHTML = ``;
}

function openFilterSideBar() {
    document.getElementById("filter-sidebar").classList.add("open");
}

function closeFilterSidebar() {
    document.getElementById("filter-sidebar").classList.remove("open");
    scrollTopAfterFilter();
}
