   document.addEventListener("DOMContentLoaded", function () {
  // שליפת אלמנטים
  let loginTab = document.getElementById("loginTab");
  let registerTab = document.getElementById("registerTab");
  let loginForm = document.getElementById("loginForm");
  let registerForm = document.getElementById("registerForm");
  let loginError = document.getElementById("loginError");
  let registerError = document.getElementById("registerError");

  // מעבר בין התחברות להרשמה
  loginTab.onclick = () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    loginError.textContent = "";
    registerError.textContent = "";
  };

  registerTab.onclick = () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    loginError.textContent = "";
    registerError.textContent = "";
  };

  // התחברות
  loginForm.onsubmit = (e) => {
    e.preventDefault();
    loginError.textContent = "";

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    let users = JSON.parse(sessionStorage.getItem("users") || "{}");

    if (!users[email]) {
      loginError.textContent = "משתמש לא קיים, מפנה להרשמה...";
      setTimeout(() => registerTab.click(), 1500);
      return;
    }

    if (users[email].password !== password) {
      loginError.textContent = "סיסמה שגויה.";
      return;
    }

    sessionStorage.setItem("currentUser", email);

    // חזרה לדף הקודם
      window.history.back()
  };

  // הרשמה
  registerForm.onsubmit = (e) => {
    e.preventDefault();
    registerError.textContent = "";

    let name = document.getElementById("registerName").value;
    let dob = document.getElementById("registerDOB").value;
    let phone = document.getElementById("registerPhone").value;
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;

    if (!name || !dob || !phone || !email || !password) {
      registerError.textContent = "יש למלא את כל השדות";
      return;
    }

  
    if (password.length < 6) {
      registerError.textContent = "הסיסמה צריכה להכיל לפחות 6 תווים.";
      return;
    }

    let users = JSON.parse(sessionStorage.getItem("users") || "{}");

    if (users[email]) {
      registerError.textContent = "משתמש כבר קיים.";
      return;
    }

    users[email] = { name, dob, phone, password };
    sessionStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("currentUser", email);

    window.location.href = "../html/shop.html";
  };
});



