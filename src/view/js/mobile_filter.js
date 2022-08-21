// component
function FeatureFilterItemComponent(img,title) {
    return `
        <div class="filter-feature-item">
            <img src="${img}"/>
            <p>${title}</p>
        </div>
    `
}

function BrandFilterItemComponent(title) {
    return `
        <div class="filter-brand-item">
            <span>${title}</span>
        </div>
    `
}



function openFilterSideBar() {
    document.getElementById("filter-sidebar").classList.add("open");
    document.getElementById("overlay-filter-sidebar").classList.add("open");
}

function closeFilterSidebar() {
    document.getElementById("filter-sidebar").classList.remove("open");
    document.getElementById("overlay-filter-sidebar").classList.remove("open");

}