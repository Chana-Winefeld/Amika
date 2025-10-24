// id פונקציה ששומרת את כל ה
function saveSettings() {
  let textColor = document.getElementById("textColor").value;
  let fontFamily = document.getElementById("fontFamily").value;
  let fontSize = document.getElementById("fontSize").value;
  let hoverHighlight = document.getElementById("hoverHighlight").checked;
  /*localStorage כל המשתנים ששמרנו למעלה מוכנסים ונשמרים ב*/
  localStorage.setItem("textColor", textColor);
  localStorage.setItem("fontFamily", fontFamily);
  localStorage.setItem("fontSize", fontSize);
  localStorage.setItem("hoverHighlight", hoverHighlight);
  /*עובר לדף הבית בלחיצה על אישור*/
  window.location.href = "../html/index.html";
  applySettings();
}
/*פונקציה שמוציאה את כל הנתונים ששמרנו לפני כן ומחילה אותם על הדף*/
function applySettings() {
  textColor = localStorage.getItem("textColor") || "#000000";
  fontFamily = (localStorage.getItem("fontFamily") || "Arial").replace(/\s+/g, '-').toLowerCase();
  fontSize = localStorage.getItem("fontSize") || "16";
  hoverHighlight = localStorage.getItem("hoverHighlight") === "true";
  let body = document.body;

  // הסרה של כל מחלקות עיצוב ישנות
  body.classList.forEach(cls => {
    if (cls.startsWith("font-") || cls.startsWith("size-") || cls.startsWith("bold-")) {
      body.classList.remove(cls);
    }
  });

  // הוספת מחלקות חדשות
  body.classList.add(`font-${fontFamily}`);
  body.classList.add(`size-${fontSize}`);
  body.style.setProperty("color", textColor, "important");

  // הדגשה של הטקסט
  if (hoverHighlight) {
    body.classList.add("hover-highlight");
  } else {
    body.classList.remove("hover-highlight");
  }
}

document.addEventListener("DOMContentLoaded", applySettings);