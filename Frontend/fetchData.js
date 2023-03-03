let title = document.getElementById("title"),
  price = document.getElementById("price"),
  taxes = document.getElementById("taxes"),
  ads = document.getElementById("ads"),
  discount = document.getElementById("discount"),
  count = document.getElementById("count"),
  category = document.getElementById("category"),
  createBtn = document.getElementById("create"),
  submitBtn = document.getElementById("submit"),
  small = document.getElementById("small"),
  tbody = document.getElementById("tbody"),
  deleteAllBtn = document.getElementById("delete-all"),
  allProducts = [];

localStorage.data != null
  ? (allProducts = JSON.parse(localStorage.getItem("data")))
  : getData();

showAllProducts(allProducts);

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
  fetch("http://localhost:3000/product/all");
  allProducts = [];
  localStorage.removeItem("data");
  tbody.innerHTML = "";
});

function getData() {
  fetch("http://localhost:3000/product/show")
    .then((response) => response.json())
    .then((data) => {
      allProducts = data;
      showAllProducts(allProducts);
    });
}
async function createProduct() {
  var newProduct = {
    id: "",
    title: `${title.value}`[0].toUpperCase() + `${title.value}`.slice(1),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: geTotalPrice(price.value, taxes.value, ads.value, discount.value),
    category: category.value,
    count: count.value,
  };
  await postData("http://localhost:3000/product/create", newProduct)
    .then((res) => res.json())
    .then((data) => {
      insertProduct(newProduct, data);
      newProduct.id = data;
    });
  allProducts.push(newProduct);
  localStorage.setItem("data", JSON.stringify(allProducts));
}
async function deleteProduct(id) {
  await fetch(`http://localhost:3000/product/${id}`, {
    method: "DELETE",
  });
  allProducts = allProducts.filter((product) => {
    if (product.id != id) {
      return product;
    }
  });
  showAllProducts(allProducts);
}
function updateProduct(id) {
  product = allProducts.filter((product) => product.id == id)[0];
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
function showAllProducts(arr) {
  localStorage.setItem("data", JSON.stringify(allProducts));
  tbody.innerHTML = "";
  arr.forEach((product, index) => {
    insertProduct(product, product.id);
  });
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
        <td>${geTotalPrice(
          product.price,
          product.taxes,
          product.ads,
          product.discount
        )}</td>
        <td>${product.category}</td>
        <td>${product.count}</td>
        <td><button onclick="updateProduct(${id})">update</button></td>
        <td><button onclick="deleteProduct(${id})" >delete</button></td>
        `;
  tbody.innerHTML += tableRaw;
}
function geTotalPrice(price, taxes, ads, discount) {
  var total = Number(price) + Number(taxes) + Number(ads) - Number(discount);

  small.innerText = total;
  return total;
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
function submitChange(id) {
  allProducts.forEach((product) => {
    if (product.id == id) {
      product.title = title.value;
      product.price = price.value;
      product.taxes = taxes.value;
      product.ads = ads.value;
      product.category = category.value;
      product.discount = discount.value;
      product.count = count.value;

      const newValues = {
        product: {
          id: "",
          title: `${title.value}`[0].toUpperCase() + `${title.value}`.slice(1),
          price: price.value,
          taxes: taxes.value,
          ads: ads.value,
          discount: discount.value,
          total: geTotalPrice(
            price.value,
            taxes.value,
            ads.value,
            discount.value
          ),
          category: category.value,
          count: count.value,
        },
        id: product.id,
      };

      putData("http://localhost:3000/product/update/", newValues);
    }
  });
  showAllProducts(allProducts);

  clearValues();
  submitBtn.style.display = "none";
  createBtn.style.display = "block";
}
async function postData(url = "", product = {}) {
  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(product),
  });

  return res;
}
async function putData(url = "", body = {}) {
  const res = await fetch(url, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(body),
  });

  return res;
}
