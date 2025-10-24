let productsFromStorage = JSON.parse(localStorage.getItem("products"));
// סינון לפי  id ע"י שליפה מהה url
let urlParams = new URLSearchParams(window.location.search);
let productId = parseInt(urlParams.get('id'));
let product = productsFromStorage.find(p => p.id === productId);
let container = document.getElementById("product-details");

// יצירת הכרטיסים על המסך
if (product) {
  let img = document.createElement("img");
  img.src = product.image;

  let Div = document.createElement("div");
  Div.className = "product-div";

  let h2 = document.createElement("h2");
  h2.textContent = product.name;

  let priceP = document.createElement("p");
  priceP.className = "price";
  priceP.textContent = `₪ `+product.price;

  let text1 = document.createElement("h3");
  text1.textContent = product.Text;

  let text2 = document.createElement("h3");
  text2.textContent = product.Text1;

  let text3 = document.createElement("h4");
  text3.textContent = product.Text2;

  let text4 = document.createElement("h4");
  text4.textContent = product.Text3;

  let text5 = document.createElement("h4");
  text5.textContent = product.Text4;

  // בחירת כמות
  let quantity = document.createElement("div");
  quantity.className = "quantity";

  let minusBtn = document.createElement("button");
  minusBtn.textContent = "-";

  let quantitySpan = document.createElement("span");
  quantitySpan.id = "quantity";
  quantitySpan.textContent = "1";

  let plusBtn = document.createElement("button");
  plusBtn.textContent = "+";

  minusBtn.onclick = () => {
    Quantity = Math.max(1, Quantity - 1);
    quantitySpan.textContent = Quantity;
  };

  plusBtn.onclick = () => {
    Quantity += 1;
    quantitySpan.textContent = Quantity;
  };

  quantity.appendChild(minusBtn);
  quantity.appendChild(quantitySpan);
  quantity.appendChild(plusBtn);

  // הרכבת כל חלקי המידע
  Div.appendChild(h2);
  Div.appendChild(priceP);
  Div.appendChild(text1);
  Div.appendChild(text2);
  Div.appendChild(text3);
  Div.appendChild(text4);
  Div.appendChild(text5);
  Div.appendChild(quantity);

  container.appendChild(img);
  container.appendChild(Div);
} else {
  let notFound = document.createElement("p");
  notFound.textContent = "המוצר לא נמצא.";
  container.appendChild(notFound);
}

let Quantity = 1;

// פונקצית הוספה לסל
function add(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = productsFromStorage.find(p => p.id === productId);

  if (product) {
    for (let i = 0; i < Quantity; i++) {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    let popup = document.getElementById("popup-message");
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
    }, 1500);
  }
}
//פונקציה המנתבת לדף קודם
function goBack()
{
    window.history.back()
}