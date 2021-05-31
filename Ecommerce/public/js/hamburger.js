// Selecteer alle classes die je nodig hebt.
const hamburger = document.querySelector(" header .hamburger");
const mobileMenu = document.querySelector(".mobileMenu");
const bar1 = document.querySelector(".bar-1");
const bar2 = document.querySelector(".bar-2");
const bar3 = document.querySelector(".bar-3");

// Functie om hamburger menu mobiel te laten zien zodra erop word geklikt.
const showMenu = () => {
  bar1.style.display = "none";
  bar2.style.display = "none";
  mobileMenu.style.left = "0%";
};

// Functie om hamburger menu mobiel te laten verdwijnen zodra erop het hamburger icoon wordt geklikt.
const hideMenu = () => {
  bar1.style.display = "block";
  bar2.style.display = "block";
  mobileMenu.style.left = "100%";
};

// Als de pagina laad willen we dat het navigatie menu niet gelijk word weergegeven
hideMenu();

// Eventlistener die luistert wanneer je op het hamburger icoon klikt.
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");

  // If statement die checkt of de hamburger en mobileMenu de class active bevat zoja laat het navigatie menu zien.
  if (hamburger.classList.contains("active") && mobileMenu.classList.contains("active")) {
    showMenu();
  } // If statement die checkt of de hamburger en mobileMenu niet de active class bevat zodat we het kunnen weghalen.
  if (!hamburger.classList.contains("active") && !mobileMenu.classList.contains("active")) {
    hideMenu();
  }
});
