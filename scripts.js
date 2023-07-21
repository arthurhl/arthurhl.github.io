$(document).ready(function () {
  $(".menu-toggler").on("click", function () {
    $(this).toggleClass("open");
    $(".top-nav").toggleClass("open");
  });

  $(".top-nav .nav-link").on("click", function () {
    $(".menu-toggler").removeClass("open");
    $(".top-nav").removeClass("open");
  });

  $('nav a[href*="#"]').on("click", function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top - 100,
      },
      2000
    );
  });

  $("#up").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      2000
    );
  });

  AOS.init({
    easing: "ease",
    duration: 1800,
    once: true,
  });
});

const html = document.querySelector("html");

const getStyle = (element, style) =>
  window.getComputedStyle(element).getPropertyValue(style);

const initialColors = {
  colorbackground: getStyle(html, "--colorbackground"),
  colorbackgrounddark: getStyle(html, "--colorbackgrounddark"),
  descriptiontext: getStyle(html, "--descriptiontext"),
  colorcard: getStyle(html, "--colorcard"),
};

const whiteMode = {
  colorbackground: "#ced4da",
  colorbackgrounddark: "#adb5bd",
  descriptiontext: "#24292f",
  colorcard: "#adb5bd",
};

const transformKey = (key) => "--" + key.replace(/()/, "$1").toLowerCase();

const changeColors = (colors) => {
  Object.keys(colors).map((key) =>
    html.style.setProperty(transformKey(key), colors[key])
  );
};

const checkbox = document.querySelector("input[name=theme]");

const checkboxColorMode = JSON.parse(localStorage.getItem("color-mode"));

if (checkboxColorMode) {
  checkbox.checked = checkboxColorMode;
  changeColors(whiteMode);
}

checkbox.addEventListener("change", ({ target }) => {
  target.checked ? changeColors(whiteMode) : changeColors(initialColors);

  localStorage.setItem("color-mode", target.checked);
});

// Function to set the initial language based on the stored value (default: "pt")
function setInitialLanguage() {
  var storedLanguage = localStorage.getItem("language");
  if (storedLanguage && (storedLanguage === "pt" || storedLanguage === "en")) {
    document.documentElement.lang = storedLanguage;
  } else {
    // If no language is stored or it's invalid, set "pt" as the default language
    localStorage.setItem("language", "pt");
    document.documentElement.lang = "pt";
  }
}

// Function to hide alternative language content on page load
function hideAlternativeLanguage() {
  var currentLanguage = document.documentElement.lang;
  var spans = document.querySelectorAll("[data-lang]");

  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    var lang = span.getAttribute("data-lang");

    if (lang !== currentLanguage) {
      span.style.display = "none";
    }
  }
}

// Function to change the language when the button is clicked
function changeLanguage() {
  var currentLanguage = document.documentElement.lang;
  var spans = document.querySelectorAll("[data-lang]");

  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    var lang = span.getAttribute("data-lang");

    if (lang === currentLanguage) {
      span.style.display = "none";
    } else {
      span.style.display = "inline";
    }
  }

  // Toggle between "pt" and "en" languages and store the new language in localStorage
  var newLanguage = currentLanguage === "pt" ? "en" : "pt";
  localStorage.setItem("language", newLanguage);
  document.documentElement.lang = newLanguage;
}

// Call the function to set the initial language and hide alternative language content on page load
window.addEventListener("DOMContentLoaded", function () {
  setInitialLanguage();
  hideAlternativeLanguage();
});
