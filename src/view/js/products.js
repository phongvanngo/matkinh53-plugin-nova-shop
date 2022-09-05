// component
function numberWithCommas(x) {
    if (!x) return "";
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
}

function ProductCardGallery({id, thumbnail, gallery, link}) {

    let gallery_html = "";

    const display_id = `nova-card-gallery-${thumbnail}`;

    if (gallery.length > 1) {
        const arr = [...gallery];
        gallery = arr.filter(function (item, pos) {
            return arr.indexOf(item) == pos;
        })
        gallery_html = `<ul class=\"image-list\">`;
        gallery.forEach(item => {
            gallery_html += `
            <li onclick="changeImageGalleryCard(this,'${display_id}','${item}')" class="image-item ${thumbnail === item ? "active" : ""}">
                <img  src="${item}" />
            </li>
        `;
        });

        gallery_html += `</ul>`;
    }


    return `
        <div class="nova-card-gallery-wrapper">
            <div class="image-show">
                <a href="${link}">
                    <img id="${display_id}" src="${thumbnail}" />
                </a>
            </div>
            
                ${gallery_html}

        </div>
    
    `
}

function changeImageGalleryCard(e, id, image) {
    document.getElementById(id).src = image;
    let parent = e.parentNode;
    const list = parent.querySelectorAll("li");
    list.forEach(item => item.classList.remove("active"));
    e.classList.add("active");

}

function ProductCardComponentNoGallery(product) {
    const {name, link, images, price_info, id, gallery} = product;
    let {regular_price, sale_price} = price_info;
    let thumbnail = images[0];

    let official_price = "";
    let price_to_delete = "";

    let discount_percentage = -1;

    if (sale_price !== -1) {
        official_price = sale_price;
        price_to_delete = regular_price;

        discount_percentage = (regular_price - sale_price) / regular_price * 100;

    } else official_price = regular_price;

    if (gallery.length > 0) {
        thumbnail = gallery[0];
    }

    return `
   
                <div class="product-card-wrapper">
                    <div class="product-image">
                        <a href="${link}">
                            <img src="${thumbnail}"/>
                            
                             ${sale_price !== -1 ? `
                             
                             <div class="badge-sale-image">
                                 <img  src="https://i.imgur.com/HWyLTud.png"/>
                                 <div class="discount">-${discount_percentage}%</div>
                               </div>

                            ` : ""}
                            


                        </a>
                        <div>
</div>
                       
                    </div>
                    <div class="product-info-wrapper">
                        
                        <a href="${link}">
                            <div class="product-title">
                                ${name}
                            </div>
                        </a>
                        <div class="product-price-area">
                            <div class="main-price">${numberWithCommas(official_price)}</div>
                            <div>
                                <del>${numberWithCommas(price_to_delete)}</del>
                            </div>
                        </div>
                        <div class="action-wrapper">
                            <a style="display:none;" class="btn-see-more" href="${link}">
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

function ProductCardComponent(product) {
    const {name, link, images, price_info, id, gallery} = product;
    let {regular_price, sale_price} = price_info;
    let thumbnail = images[0];

    let official_price = "";
    let price_to_delete = "";

    let discount_percentage = -1;

    if (sale_price !== -1) {
        official_price = sale_price;
        price_to_delete = regular_price;

        discount_percentage = (regular_price - sale_price) / regular_price * 100;

    } else official_price = regular_price;

    if (gallery.length > 0) {
        thumbnail = gallery[0];
    }

    return `
   
                <div class="product-card-wrapper">
                    <div class="product-image">

                        ${ProductCardGallery({id, thumbnail, gallery: [...gallery, images[0]], link})}

                        <div>
</div>
                       
                    </div>
                    <div class="product-info-wrapper">
                        
                        <a href="${link}">
                            <div class="product-title">
                                ${name}
                            </div>
                        </a>
                        <div class="product-price-area">
                            <div class="main-price">${numberWithCommas(official_price)}</div>
                            <div>
                                <del>${numberWithCommas(price_to_delete)}</del>
                            </div>
                        </div>
                        <div class="action-wrapper">
                            <a style="display:none;" class="btn-see-more" href="${link}">
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

let arrImagesPRSale = [
    'https://matkinh53.com/wp-content/uploads/2022/09/P1.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P2.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P3.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P4.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P5.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P6.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P7.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P8.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P9.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P10.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P11.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P12.webp',

    'https://matkinh53.com/wp-content/uploads/2022/09/P15.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P16.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P17.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P18.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P19.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P20.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P21.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P22.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P23.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P24.webp',
    'https://matkinh53.com/wp-content/uploads/2022/09/P25.webp',
]

let countToPutPRCard = 1;
let showedImages = [];

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomPRSale() {
    const ran = randomIntFromInterval(0, 10)
    // if (ran > 5 && countToPutPRCard >0) {
    countToPutPRCard -= 1;
    let image = '';
    do {
        const index = randomIntFromInterval(0, arrImagesPRSale.length - 1);
        if (showedImages.findIndex(item => item === index) < 0) {
            image = arrImagesPRSale[index];
            showedImages.push(index);
            break;
        }
    } while (true)
    return `
            <div class="product-card-wrapper pr-card-wrapper"
            style="
    background-size: cover;
    background-image: url(${image});
"
            >
                
            </div>
        `
    // }
}

function renderProductsList(products) {
    let res = "";
    showedImages = [];
    products.forEach((product, index) => {
        if (index === 0 | index === 6 | index == 12) {
            res += randomPRSale();
        }
        res += ProductCardComponent(product);
    });
    document.getElementById("products-list").innerHTML = res;
}