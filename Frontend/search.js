let searchBar = document.getElementById("search");
let searchByTitleBtn = document.getElementById("searchTitle");
let searchByCategoryBtn = document.getElementById("searchCategory");
let searchFlag = "title";

searchByTitleBtn.addEventListener("click", () => {
  changeSearchPlaceholder("Search By Title");
  searchFlag = "title";
  searchBar.focus();
});

searchByCategoryBtn.addEventListener("click", () => {
  changeSearchPlaceholder("Search By Category");
  searchFlag = "category";
  searchBar.focus();
});

searchBar.addEventListener("keyup", () => {
  if (searchFlag == "title") {
    SearchFun("title", searchBar.value);
  }
  if (searchFlag == "category") {
    SearchFun("category", searchBar.value);
  }
});
function changeSearchPlaceholder(value) {
  searchBar.placeholder = value;
}

function SearchFun(type, searchValue) {
  filteredData = allProducts.filter((product) =>
    `${product[type].toLowerCase()}`.includes(searchValue)
  );
  showAllProducts(filteredData);
}
