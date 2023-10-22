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

function setInitialLanguage() {
  var storedLanguage = localStorage.getItem("language");
  var userLanguage = navigator.language.toLowerCase();

  if (storedLanguage && (storedLanguage === "pt" || storedLanguage === "en")) {
    document.documentElement.lang = storedLanguage;

    // Update the "Baixar Curriculo" button dynamically
    const curriculoButton = document.getElementById('curriculoButton');

    if (storedLanguage === 'pt') {
      curriculoButton.href = './CurriculoArthurHulleLeite.pdf';
      curriculoButton.download = 'CurriculoArthurHulleLeite';
    } else if (storedLanguage === 'en') {
      curriculoButton.href = './ResumeArthurHulleLeite.pdf';
      curriculoButton.download = 'ResumeArthurHulleLeite';
    }
  } else if (userLanguage.startsWith("pt")) {
    localStorage.setItem("language", "pt");
    document.documentElement.lang = "pt";
  } else {
    localStorage.setItem("language", "en");
    document.documentElement.lang = "en";
  }
}


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
  var newLanguage = currentLanguage === "pt" ? "en" : "pt";
  localStorage.setItem("language", newLanguage);
  document.documentElement.lang = newLanguage;

  const curriculoButton = document.getElementById('curriculoButton');

  if (newLanguage === 'pt') {
    curriculoButton.href = './CurriculoArthurHulleLeite.pdf';
    curriculoButton.download = 'CurriculoArthurHulleLeite';
  } else if (newLanguage === 'en') {
    curriculoButton.href = './CurriculumArthurHulleLeite.pdf';
    curriculoButton.download = 'CurriculumArthurHulleLeite';
  }
}

window.addEventListener("DOMContentLoaded", function () {
  setInitialLanguage();
  hideAlternativeLanguage();
});