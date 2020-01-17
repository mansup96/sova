$(function() {

	$('.input-file').each(function() {
    var $input = $(this),
        $label = $input.next('.js-labelFile'),
        labelVal = $label.html();
     
   $input.on('change', function(element) {
      var fileName = '';
      if (element.target.value) fileName = element.target.value.split('\\').pop();
      fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
   });
  });

});

let slides = document.querySelectorAll(".slide"),
  navItems = document.querySelectorAll(".nav a"),
  logo = document.querySelector(".logo"),
  menuItem = [],
  circles = document.querySelectorAll(".nav a path"),
  zIndex = 0,
  activeSlide = 0;

navItems.forEach(item => {
  menuItem.push(item);
});
menuItem.unshift(logo);

// logo.addEventListener("click", () => {
//   slides[0].classList.add("active");
//   slides[0].style.zIndex = zIndex;
//   zIndex += 2;
//   navItems.forEach(item => {
//     item.style.color = "#fff";
//   });
//   circles.forEach(item => {
//     item.style.fill = "#fff";
//   });
//   activeSlide = -0;
// });

menuItem.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    slides[index].style.zIndex = zIndex;
    slides[index].classList.add("active");
    zIndex += 1;
    clear(index);
    navItemColorChange(index);
  });
});

function navItemColorChange(index) {
  menuItem.forEach((item, index) => {
    if (index > 0) item.classList.remove("btn-active");
  });
  circles.forEach(item => {
    item.classList.remove("fill-circle");
  });
  if (index !== 0) {
    menuItem[index].classList.add("btn-active");
    circles[index - 1].classList.add("fill-circle");
  }
}

function clear(index) {
  setTimeout(() => {
    slides.forEach((item, number) => {
      if (number !== index) {
        item.classList.remove("active");
      }
    });
  }, 400);
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

// // Функция для добавления обработчика событий
// function addHandler(object, event, handler) {
//   if (object.addEventListener) {
//     object.addEventListener(event, handler, false);
//   } else if (object.attachEvent) {
//     object.attachEvent("on" + event, handler);
//   } else alert("Обработчик не поддерживается");
// }
// // Добавляем обработчики для разных браузеров
// addHandler(window, "DOMMouseScroll", wheel);
// addHandler(window, "mousewheel", wheel);
// addHandler(document, "mousewheel", wheel);
// // Функция, обрабатывающая событие
// function wheel(event) {
//   var delta; // Направление колёсика мыши
//   event = event || window.event;
//   // Opera и IE работают со свойством wheelDelta
//   if (event.wheelDelta) {
//     // В Opera и IE
//     delta = event.wheelDelta / 120;
//     // В Опере значение wheelDelta такое же, но с противоположным знаком
//     if (window.opera) delta = -delta; // Дополнительно для Opera
//   } else if (event.detail) {
//     // Для Gecko
//     delta = -event.detail / 3;
//   }
//   // Запрещаем обработку события браузером по умолчанию
//   if (delta < 0) {
//     slides[activeSlide].style.zIndex = zIndex;
//     slides[activeSlide].classList.add("active");
//     activeSlide++;
//   }
//   if (delta > 0) {
//     slides[activeSlide - 1].style.zIndex = zIndex;
//     slides[activeSlide - 1].classList.add("active");
//     activeSlide--;
//   }
// }
