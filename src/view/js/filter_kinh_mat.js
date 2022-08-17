let gender = [];
let shapes = [];
let brands = [];

let product_type = "kinh-mat";

var filter_set = {
    gender: [],
    shapes: [],
    brands: [],
    prices: [], // price-ranges
    pageord:1,
    limit:9,
}

// utils -----------------------
const PRE_ID = {
    cate_checkbox: "CATEINP",
    active_filter: "ACTIVE_FILTER"
}
const id_cate_checkbox = (id) => `${PRE_ID.cate_checkbox}${id}`;
const extract_id_cate_checkbox = (str) => str.replace(PRE_ID.cate_checkbox,"");

const id_active_filter = (id) => `${PRE_ID.active_filter}${id}`;
const extract_id_active_filter = (str,id) => str.replace(PRE_ID.active_filter,"");


// handle url search params ----------
function convertObjectToQueryParams(object) {

    let query = {...object};

    let str ="";

    query.brands = query.brands ? query.brands.join(): "";
    query.shapes = query.shapes ? query.shapes.join() :"";
    query.gender = query.gender ? query.gender.join() : "";
    query.prices = query.prices ? query.prices.join() : "";

    for (let key in query) {
        if (!query[key]) {
            delete query[key];
        }
    };

    return "?" +jQuery.param(query);

}

function extractQueryParams(str) {
    let params = new URLSearchParams(str);
    console.log("params",str,params);

    let query ={
        brands: params.get("brands") ? params.get("brands").split(","):[],
        shapes: params.get("shapes") ? params.get("shapes").split(","):[],
        gender: params.get("gender") ? params.get("gender").split(","):[],
        prices: params.get("prices") ? params.get("prices").split(","):[],
        limit : params.get("limit"),
        pageord : params.get("pageord"),
    };

    console.log(query);




    return query;
}

// utils

//components
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

function cateFilterItemComponent(id,name,image,filter_type_name) {
    return`
        <label class="filter-item">
            <input 
                onchange="chooseFilter(this,'${id}','${filter_type_name}')"
                id="${id_cate_checkbox(id)}" 
                type="checkbox" 
                class="nova-checkbox" 
                value="1"
            />
            ${image ? `<img src='${image}'/>` :""}
            <span>${name}</span>
        </label>
`;
}

//logic

function removeItemFromArr(arr, value) {
    const index = arr.findIndex(item => item.term_id == value);
    if (index >= 0) arr = arr.splice(index, 1);
}

function addItemToArr(arr, value,filter_name) {

    if (filter_name === "prices") {
        const index = arr.findIndex(item => item.term_id == value);
        if (index >= 0) return;
        const cate = categories_information.price_ranges.find(item => item.term_id == value);
        arr.push(cate);
    }

    else {
        const index = arr.findIndex(item => item.term_id == value);
        if (index >= 0) return;
        const cate = categories_information.all_categories.find(item => item.term_id == value);
        arr.push(cate);
    }


}

function fetchProducts(filter) {
    const filter_set = filter;
    console.log("fetch_products",filter_set);

    jQuery.ajax({
        dataType: "json", //Dạng dữ liệu trả về xml, json, script, or html
        url: URL_ADMIN_AJAX, //Đường dẫn chứa hàm xử lý dữ liệu. Mặc định của WP như vậy
        data: {
            'action': 'GetProducts', // This is our PHP function below
            'novashop_filter': filter_set,// This is the variable we are sending via AJAX
            'product_type':product_type
        },
        success: function (data) {
            console.log(data);
            renderProductsList(data.products);
        },
        error: function (errorThrown) {
            console.log(errorThrown);

        }
    })


}

function handleFilterProduct() {
    console.log(filter_set);

    const official_filter_set = {
        pageord:filter_set.pageord,
        limit:filter_set.limit,
        gender:filter_set.gender.map(item => item.term_id),
        shapes:filter_set.shapes.map(item => item.term_id),
        brands: filter_set.brands.map(item => item.term_id),
        prices:filter_set.prices.map(item => item.term_id),
    }

    // const simple_filter_set = {
    //     ...filter_set,
    //     gender : filter_set.gender.map(item => item.term_id),
    //     shapes : filter_set.shapes.map(item => item.term_id),
    //     brands: filter_set.brands.map(item => item.term_id),
    //     price_ranges: filter_set.prices.map(item => item.value),
    //     prices:filter_set.price_ranges.map(item => item.term_id),
    // }

    // console.log(simple_filter_set);

    updateCurrentURL(official_filter_set);
    displayBtnClearFilter();
    fetchProducts(official_filter_set);
}

function emptyFilter() {

    filter_set.brands.forEach(item=>{
        document.getElementById(id_cate_checkbox(item.term_id)).checked=false;
    })
    filter_set.shapes.forEach(item=>{
        document.getElementById(id_cate_checkbox(item.term_id)).checked=false;
    })
    filter_set.gender.forEach(item=>{
        document.getElementById(id_cate_checkbox(item.term_id)).checked=false;
    })
    filter_set.prices.forEach(item=>{
        document.getElementById(id_cate_checkbox(item.term_id)).checked=false;
    })

    filter_set = {
        ...filter_set,
        brands: [],
        shapes : [],
        gender:[],
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
    }
    else
    {
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
        window.history.pushState({path:newurl},'',newurl);
    }
}

function getCurrentFilterSetFromURL() {
    let current_filter_set = {...filter_set};
    try {
       current_filter_set ={...filter_set, ...extractQueryParams(window.location.search)};
       console.log(current_filter_set);
    }catch {
        console.log("get queryparams failed");
        updateCurrentURL({});
    }
    return current_filter_set;
}

function chooseFilter(element,id, filter_name) {

    let filter = filter_set[filter_name];
    if (element.checked) {
        addItemToArr(filter, id,filter_name);
    } else {
        removeItemFromArr(filter, id)
    }
    filter_set[filter_name] = filter;
    handleFilterProduct();
    updateFilterActiveBar();

}

function renderFilterKinhMat() {

    let gender_options = "";
    let brands_options = "";
    let shapes_options = "";
    let price_options = "";
    categories_information.gender.forEach((item) => {
        gender_options += cateFilterItemComponent(item.term_id,item.name,null,'gender');
    });
    categories_information.brands_kinh_mat.forEach((item) => {
        brands_options += cateFilterItemComponent(item.term_id,item.name,null,'brands');
    });
    categories_information.shapes_kinh_mat.forEach((item) => {
        shapes_options +=cateFilterItemComponent(item.term_id,item.name,item.image,'shapes');
    });

    categories_information.price_ranges.forEach((item) => {
        price_options +=cateFilterItemComponent(item.term_id,item.name,null,'prices');
    });

    document.getElementById("filter-shapes").innerHTML = shapes_options;
    document.getElementById("filter-brands").innerHTML = brands_options;
    document.getElementById("filter-gender").innerHTML = gender_options;

    document.getElementById("filter-price-range").innerHTML = price_options;



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
    console.log("handle recheck",simple_filter_set);

    // update simple_filter_set and check checkbox
    simple_filter_set.gender.forEach(id=>{
        document.getElementById(id_cate_checkbox(id)).checked = true;
        const item = categories_information.gender.find(cate => cate.term_id == id);
        filter_set.gender.push(item);
    })
    simple_filter_set.shapes.forEach(id=>{
        document.getElementById(id_cate_checkbox(id)).checked = true;
        const item = categories_information.shapes_kinh_mat.find(cate => cate.term_id == id);
        filter_set.shapes.push(item);
    })
    simple_filter_set.brands.forEach(id=>{
        document.getElementById(id_cate_checkbox(id)).checked = true;
        const item = categories_information.brands_kinh_mat.find(cate => cate.term_id == id);
        filter_set.brands.push(item);
    })
    simple_filter_set.prices.forEach(id=>{
        document.getElementById(id_cate_checkbox(id)).checked = true;
        const item = categories_information.price_ranges.find(cate => cate.term_id == id);
        filter_set.prices.push(item);
    })

    displayBtnClearFilter();

    console.log("update filter when reload page",filter_set);



    updateFilterActiveBar();


};

addEventToToggleFilterBox();

handleFetchProductsWhenLoadPage();


