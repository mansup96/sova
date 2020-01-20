$(function() {
  $(".input-file").each(function() {
    var $input = $(this),
      $label = $input.next(".js-labelFile"),
      labelVal = $label.html();

    $input.on("change", function(element) {
      var fileName = "";
      if (element.target.value)
        fileName = element.target.value.split("\\").pop();
      fileName
        ? $label
            .addClass("has-file")
            .find(".js-fileName")
            .html(fileName)
        : $label.removeClass("has-file").html(labelVal);
    });
  });
});

let slides = document.querySelectorAll(".slide"),
  navItems = document.querySelectorAll(".nav a"),
  logo = document.querySelector(".logo"),
  menuItems = [],
  circles = document.querySelectorAll(".nav a path"),
  zIndex = 0,
  activeSlide = 0;

navItems.forEach(item => {
  menuItems.push(item);
});
menuItems.unshift(logo);

slides.forEach(element => {
  element.style.zIndex = zIndex;
  zIndex++;
});

menuItems.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    let attr = elem.getAttribute("link-to");
    let curSlide = document.querySelector(`.slide[name='${attr}']`);
    slides.forEach(slide => {
      if (
        slide.style.zIndex <= curSlide.style.zIndex &&
        activeSlide <= curSlide.style.zIndex
      )
        slide.classList.add("to-top");
    });
    clear(curSlide);
    navItemColorChange(elem, index, curSlide);
    activeSlide = curSlide.style.zIndex;
  });
});

// Функция для добавления обработчика событий
function addHandler(object, event, handler) {
  if (object.addEventListener) {
    object.addEventListener(event, handler, false);
  } else if (object.attachEvent) {
    object.attachEvent("on" + event, handler);
  } else alert("Обработчик не поддерживается");
}
// Добавляем обработчики для разных браузеров
addHandler(window, "DOMMouseScroll", wheel);
addHandler(window, "mousewheel", wheel);
// addHandler(document, "mousewheel", wheel);
// Функция, обрабатывающая событие
function wheel(event) {
  var delta; // Направление колёсика мыши
  event = event || window.event;
  // // Opera и IE работают со свойством wheelDelta
  // if (event.wheelDelta) {
  //   // В Opera и IE
  delta = event.wheelDelta / 120;
  //   // В Опере значение wheelDelta такое же, но с противоположным знаком
  //   if (window.opera) delta = -delta; // Дополнительно для Opera
  // } else if (event.detail) {
  //   // Для Gecko
  //   delta = -event.detail / 3;
  // }
  // Запрещаем обработку события браузером по умолчанию
  if (delta < 0 && activeSlide < slides.length - 1) {
      activeSlide++;
      console.log(slides.length);
      slides[activeSlide].classList.add("to-top");
  }
  if (delta > 0 && activeSlide > 0) {
    slides[activeSlide].classList.remove("to-top");
    activeSlide--;
    console.log(activeSlide);
  }
}

function navItemColorChange(elem, index, curSlide) {
  menuItems.forEach(item => {
    item.classList.remove("btn-active");
  });
  circles.forEach(item => {
    item.classList.remove("fill-circle");
  });
  if (curSlide.getAttribute("name") !== "main") {
    elem.classList.add("btn-active");
    circles[index - 1].classList.add("fill-circle");
  }
}

function clear(curSlide) {
  slides.forEach(item => {
    if (item.style.zIndex > curSlide.style.zIndex) {
      item.classList.remove("to-top");
    }
  });
}

//////// service modal ///////////

let servBtn = document.querySelectorAll(".serv-item");
let modalWindow = document.querySelectorAll(".modal-wrapper");
let closers = document.querySelectorAll(".modal-closer");
let fixedEls = document.querySelectorAll(".fixed");

servBtn.forEach((item, pos) => {
  item.addEventListener("click", () => {
    modalWindow[pos].classList.add("show-modal");
    fixedEls.forEach(elem => {
      elem.style.zIndex = -200;
    });
  });
});

closers.forEach((item, ind) => {
  item.addEventListener("click", () => {
    modalWindow.forEach(el => {
      el.classList.remove("show-modal");
    });
    fixedEls.forEach(elem => {
      elem.style.zIndex = 2000;
    });
  });
});
