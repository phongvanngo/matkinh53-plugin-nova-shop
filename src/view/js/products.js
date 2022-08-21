// component
function numberWithCommas(x) {
    if(!x) return "";
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+"đ";
}

function ProductCardComponent(product) {
    const {name, link, images, price_info,id} = product;
    let {regular_price, sale_price} = price_info;

    let official_price = "";
    let price_to_delete = "";

    let discount_percentage = -1;

    if (sale_price !== -1) {
        official_price = sale_price;
        price_to_delete = regular_price;

        discount_percentage = (regular_price - sale_price)/regular_price*100;

    } else official_price = regular_price;

    return `
   
                <div class="product-card-wrapper">
                    <div class="product-image">
                        <a href="${link}">
                            <img src="${images[0]}"/>
                        </a>
                        
                        ${sale_price !== -1 ? `<div class="badge-sale">-${discount_percentage}%</div>`:""}
                    </div>
                    <div class="product-info-wrapper">
                        
                        <a href="${link}">
                            <div class="product-title">
                                ${name}
                            </div>
                        </a>
                        <div class="product-price-area">
                            <div>${numberWithCommas(official_price)}</div>
                            <div>
                                <del>${numberWithCommas(price_to_delete)}</del>
                            </div>
                        </div>
                        <div class="action-wrapper">
                            <a class="btn-see-more" href="${link}">
                                <button >
                                    Chi tiết
                                </button>
                            </a>
                            <a style="display:none;" class="btn-add-to-cart ajax-add-to-cart" href="?add-to-cart=${id}">
                                <button ">
                                   Thêm vào giỏ 
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
    `
}

function renderProductsList(products) {
    let res ="";
    products.forEach(product=> {
        res+=ProductCardComponent(product);
    });
    document.getElementById("products-list").innerHTML = res;
}