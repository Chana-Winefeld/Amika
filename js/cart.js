let cart = JSON.parse(localStorage.getItem("cart")) || [];
let container = document.getElementsByTagName("section")[0]
let amountToBePaid
function onload1() {
  displayCart();
  AmountToBePaid();
}
//  יצירת הכרטיסים על המסך
function displayCart() {
  container.innerHTML = "";
  cart.forEach((item, index) => {
    let c1 = document.createElement('div');
    c1.classList.add('cart-item');
    let c2 = document.createElement('div');
    c1.appendChild(c2);
    container.appendChild(c1);

    let p = document.createElement('p');
    p.innerText = item.name;
    c2.appendChild(p);

    let image = document.createElement('img');
    image.src = item.image;
    c1.appendChild(image);

    let p1 = document.createElement('p');
    p1.innerText = `₪ ` + item.price;
    c2.appendChild(p1);

    let button = document.createElement('button');
    button.innerText = "הסר";
    button.addEventListener('click', () => clearCard(index));
    c2.appendChild(button);
  });
}

//הסרת מוצר
function clearCard(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  amountToBePaid.innerHTML = ""
  onload1()
}

// בדיקה האם הלקוח קיים
function check() {
  let useremail = sessionStorage.getItem("currentUser");
  if (useremail == null) {
    window.location = '../html/login.html';
    return;
  }

  let popup = document.getElementById("popup-message");
  popup.classList.add("show");

  // הצגת ההודעה ל-2 שניות
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => {
      localStorage.removeItem("cart");
      container.innerHTML = "";
      window.location = '../html/index.html';
    }, 500);

  }, 2000);
}

//חישוב סכום לתשלום
function AmountToBePaid() {
  let calcDiv = document.getElementById("calc");
  let sum = 0;
  cart.forEach(item => {
    sum += item.price;
  });
  amountToBePaid = document.createElement('h2');
  amountToBePaid.textContent = `הסכום לתשלום: ${sum} ₪`;
  calcDiv.appendChild(amountToBePaid);
}
