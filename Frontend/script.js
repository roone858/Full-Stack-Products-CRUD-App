let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let createBtn = document.getElementById("create");
let submitBtn = document.getElementById("submit");
let searchBar = document.getElementById("search");
let searchByTitleBtn = document.getElementById("searchTitle");
let searchByCategoryBtn = document.getElementById("searchCategory");
let small = document.getElementById("small");
let tbody = document.getElementById("tbody");
let deleteAllBtn = document.getElementById("delete-all");

let searchFlag = "title";

let data;
if (localStorage.data != null) {
  data = JSON.parse(localStorage.getItem("data"));
  showData(data);
} else {
  data = [];
}

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

createBtn.addEventListener("click", () => {
  if (
    title.value == "" ||
    price.value == "" ||
    taxes.value == "" ||
    ads.value == "" ||
    discount.value == "" ||
    category.value == ""
  ) {
    console.log("you must enter all value");
    return;
  }
  createProduct();
  clearValues();
});

deleteAllBtn.addEventListener("click", () => {
  deleteAll();
});

function deleteProduct(id) {
  data.splice(id, 1);
  data.forEach((product, index) => (product.id = index));
  localStorage.setItem("data", JSON.stringify(data));
  showData(data);
}

function createProduct() {
  var newProduct = {
    id: data.length,
    title: `${title.value}`[0].toUpperCase() + `${title.value}`.slice(1),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: geTotalPrice(price.value, taxes.value,ads.value,discount.value),
    category: category.value,
    count: count.value,
  };
  data.push(newProduct);
  localStorage.setItem("data", JSON.stringify(data));
  insertProduct(newProduct, newProduct.id);
}

function insertProduct(product, id) {
  var tableRaw = `
      <tr>
      <td>${id}</td>
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>${product.taxes}</td>
      <td>${product.ads}</td>
      <td>${product.discount}</td>
      <td>${ geTotalPrice(price.value, taxes.value,ads.value,discount.value)}</td>
      <td>${product.category}</td>
      <td>${product.count}</td>
      <td><button onclick="updateProduct(${id})">update</button></td>
      <td><button onclick="deleteProduct(${id})" >delete</button></td>
      `;
  tbody.innerHTML += tableRaw;
}

function updateProduct(id) {
  product = data.filter((product) => product.id == id)[0];
  title.value = product.title;
  price.value = product.price;
  taxes.value = product.taxes;
  ads.value = product.ads;
  category.value = product.category;
  discount.value = product.discount;
  count.value = product.count;
  createBtn.style.display = "none";
  submitBtn.style.display = "block";
  submitBtn.setAttribute("onclick", `submitChange(${id});`);
}
function submitChange(id) {
  data[id].title = title.value;
  data[id].price = price.value;
  data[id].taxes = taxes.value;
  data[id].ads = ads.value;
  data[id].category = category.value;
  data[id].discount = discount.value;
  data[id].count = count.value;
  showData(data);
  localStorage.setItem("data", JSON.stringify(data));
  clearValues();
  submitBtn.style.display = "none";
  createBtn.style.display = "block";
}

function showData(arr) {
  tbody.innerHTML = "";
  arr.forEach((product, index) => {
    insertProduct(product, index);
  });
}

function changeSearchPlaceholder(value) {
  searchBar.placeholder = value;
}

function SearchFun(type, searchValue) {
  filteredData = data.filter((product) =>
    `${product[type].toLowerCase()}`.includes(searchValue)
  );
  showData(filteredData);
}

function clearValues() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
}

function deleteAll() {
  data = [];
  localStorage.removeItem("data");
  tbody.innerHTML = "";
}
