let productsFromStorage = JSON.parse(localStorage.getItem("products"));

// יצירת המוצר על המסך
function createProductsCards() {
  let container = document.getElementById("products");

  // שליפה מה url
  let urlParams = new URLSearchParams(window.location.search);
  let categoryId = parseInt(urlParams.get('id'));
  let filteredProducts = categoryId ? filterProducts(categoryId) : productsFromStorage;

  filteredProducts.forEach(product => {
    let quantity = 1; 

    let div = document.createElement("div");
    div.setAttribute("class", "product");

    // קישור לתמונה
    let link = document.createElement("a");
    link.href = `product.html?id=${product.id}`;

    let img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    link.appendChild(img);

    // שם המוצר
    let h3 = document.createElement("h3");
    h3.textContent = product.name;

    // מחיר
    let p = document.createElement("p");
    p.textContent = `₪ `+product.price;

    // כמות
    let quantityControl = document.createElement("div");
    quantityControl.setAttribute("class", "quantity-control");

    let quantityButtons = document.createElement("div");
    quantityButtons.setAttribute("class", "quantity-buttons");

    let minusBtn = document.createElement("button");
    minusBtn.textContent = "-";

    let quantitySpan = document.createElement("span");
    quantitySpan.textContent = "1"; // מתחיל מ-1

    let plusBtn = document.createElement("button");
    plusBtn.textContent = "+";

    //  שינוי כמות
    minusBtn.onclick = () => {
      quantity = Math.max(1, quantity - 1);
      quantitySpan.textContent = quantity;
    };
    plusBtn.onclick = () => {
      quantity += 1;
      quantitySpan.textContent = quantity;
    };

    quantityButtons.appendChild(minusBtn);
    quantityButtons.appendChild(quantitySpan);
    quantityButtons.appendChild(plusBtn);
    quantityControl.appendChild(quantityButtons);

    // כפתור הוספה לסל
    let addToCartBtn = document.createElement("button");
    addToCartBtn.setAttribute("class", "add-to-cart");
    addToCartBtn.textContent = "הוספה לסל";
    addToCartBtn.onclick = () => add(product.id, quantity);

    div.appendChild(link);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(quantityControl);
    div.appendChild(addToCartBtn);
  
    container.appendChild(div);
  });
}

// פונקציה שמסננת לפי קטגוריה
function filterProducts(categoryId) {
  return productsFromStorage.filter(
    product => product && typeof product === "object" && product.categoryId === categoryId
  );
}


// פונקציית הוספה לסל
let currentQuantity = 1;
function changeQuantity(amount) {
  currentQuantity = Math.max(1, currentQuantity + amount);
  document.getElementById("quantity").textContent = currentQuantity;
}

function add(productId, quantity = 1) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = productsFromStorage.find(p => p.id === productId);

  if (product) {
    for (let i = 0; i < quantity; i++) {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    let popup = document.getElementById("popup-message");
    popup.setAttribute("class", "popup-message show"); 

    setTimeout(() => {
      popup.setAttribute("class", "popup-message");
    }, 1500);
  }
}

