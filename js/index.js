// שליפת הקטגוריות מהמחסנית
let categoriesFromStorage = JSON.parse(localStorage.getItem("categories"));
function loadPage() {
  loadImg()
  createCategoriesCards()
  setInterval(loadImg, 5000);
}

//פונקציה שמחליפה את התמונות בדף הבית
let i = 1;
function loadImg() {
  let containerImg = document.getElementById("containerImg");
  containerImg.style.backgroundImage = `url("../images/דף הבית/${i}.png")`;
  i++;
  if (i > 2) i = 1;
}

//יצירת הקטגוריות
function createCategoriesCards() {
  let container = document.getElementById("categories");

  categoriesFromStorage.forEach(category => {
    let div = document.createElement("div");
    div.className = "product";

    let link = document.createElement("a");
    link.href = `shop.html?id=${category.id}`;

    let img = document.createElement("img");
    img.src = category.image;
    img.alt = category.name;

    link.appendChild(img);

    let title = document.createElement("h3");
    title.textContent = category.name;

    div.appendChild(link);
    div.appendChild(title);

    container.appendChild(div);
  });
}
