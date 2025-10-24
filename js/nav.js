document.addEventListener("DOMContentLoaded", () => {
    let userEmail = sessionStorage.getItem("currentUser");
    let users = JSON.parse(sessionStorage.getItem("users") || "{}");

    if (userEmail && users[userEmail]) {
      let displayName = users[userEmail].name;
      let userSpan = document.getElementById("userNameDisplay");

      if (userSpan) {
        userSpan.textContent = `שלום, ${displayName}`;
        userSpan.style.marginRight = "10px";
        userSpan.style.fontWeight = "bold";
      }
    }
  });