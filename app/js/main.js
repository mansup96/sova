// //////// for max-width 768px ///////////
// window.addEventListener("resize", function() {
//   if (window.screen.availWidth < 768) {
//     let slideWrapper = document.querySelector(".slide-wrapper");

//     slideWrapper.classList.add("slide-wrapper-mobile");

//     slides.forEach(elem => {
//       elem.classList.add("slide-mobile");
// 		});
// 		console.log(window.screen.availWidth);

//   }
// });

$(function() {
	
  $("#form-commerc").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      url: "send-form.php",
      type: "POST",
      contentType: false,
      processData: false,
      data: new FormData(this),
      success: function(msg) {
        console.log(msg);
        if (msg == "ok") {
          alert("Сообщение отправлено");
          $("#form").trigger("reset"); // очистка формы
        } else {
          alert("Ошибка");
        }
      }
    });
  });

  $("#form-commerc").trigger("reset");

  $("#form-career").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      url: "send-file.php",
      type: "POST",
      contentType: false,
      processData: false,
      data: new FormData(this),
      success: function(msg) {
        console.log(msg);
        if (msg == "ok") {
          alert("Сообщение отправлено");
          $("#form").trigger("reset"); // очистка формы
        } else {
          alert("Ошибка");
        }
      }
    });
  });

  $("#form-career").trigger("reset");

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
  activeSlide = 0,
  navBar = document.querySelector(".nav.fixed"),
  footerMapItems = document.querySelectorAll(".map li");

navItems.forEach(item => {
  menuItems.push(item);
});
menuItems.unshift(logo);

slides.forEach(element => {
  element.style.zIndex = zIndex;
  zIndex++;
});


footerMapItems.forEach(elem => {
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
		sortToBottom(curSlide);
		activeSlide = parseInt(curSlide.style.zIndex);
		navItemColorChange(curSlide);
		changeNavPos();
	});
});

menuItems.forEach(elem => {
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
		sortToBottom(curSlide);
		activeSlide = parseInt(curSlide.style.zIndex);
		navItemColorChange(curSlide);
		changeNavPos();
	});
});

  // Функция для добавления обработчика событий
  function addHandler(object, event, handler) {
    if (object.addEventListener) {
      object.addEventListener(event, handler, false);
      // } else if (object.attachEvent) {
      //   object.attachEvent("on" + event, handler);
    } else alert("Обработчик не поддерживается");
  }
  function removeHandler(object, event, handler) {
    object.removeEventListener(event, handler, false);
  }
  // Добавляем обработчики для разных браузеров
  addHandler(window, "DOMMouseScroll", wheel);
  // addHandler(window, "mousewheel", wheel);
  addHandler(document, "mousewheel", wheel);
  // Функция, обрабатывающая событие
  function wheel(event) {
    let delta; // Направление колёсика мыши
    event = event || window.event;
    // Opera и IE работают со свойством wheelDelta
    if (event.wheelDelta) {
      // В Opera и IE
      delta = event.wheelDelta / 120;
      // В Опере значение wheelDelta такое же, но с противоположным знаком
      if (window.opera) delta = -delta; // Дополнительно для Opera
    } else if (event.detail) {
      // Для Gecko
      delta = -event.detail / 3;
    }
		// Запрещаем обработку события браузером по умолчанию
		flipping(delta)
  }

function flipping(delta) {
	if (delta < 0) {
		flipDown();
	}
	if (delta > 0 && activeSlide > 0) {
		flipUp();
	}
}

document.addEventListener("keydown", flipByButtons, false);

function flipByButtons(event) {
  if (event.key === "ArrowDown" || event.key === "PageDown") {
    flipDown();
  }
  if (event.key === "ArrowUp" || event.key === "PageUp") {
    flipUp();
  }
}

function flipDown() {
  if (activeSlide < slides.length - 1) {
    activeSlide++;
    slides[activeSlide].classList.add("to-top");
    blurNavItem();
    focusNavItem();
    stopItPlease();
    changeNavPos();
  }
}

function flipUp() {
  if (activeSlide > 0) {
    slides[activeSlide].classList.remove("to-top");
    activeSlide--;
    blurNavItem();
    if (activeSlide !== 0) {
      focusNavItem();
    }
    stopItPlease();
    changeNavPos();
  }
}

function stopItPlease() {
  removeHandler(window, "DOMMouseScroll", wheel);
  removeHandler(document, "mousewheel", wheel);
  setTimeout(() => {
    addHandler(window, "DOMMouseScroll", wheel);
    addHandler(document, "mousewheel", wheel);
  }, 400);
}

function navItemColorChange(curSlide) {
  blurNavItem();
  if (curSlide.getAttribute("name") !== "main") {
    focusNavItem();
  }
}
function blurNavItem() {
  menuItems.forEach(item => {
    item.classList.remove("btn-active");
  });
  circles.forEach(item => {
    item.classList.remove("fill-circle");
  });
}

function focusNavItem() {
  menuItems[activeSlide].classList.add("btn-active");
  circles[activeSlide - 1].classList.add("fill-circle");
}

function sortToBottom(curSlide) {
  slides.forEach(item => {
    if (item.style.zIndex > curSlide.style.zIndex) {
      item.classList.remove("to-top");
    }
  });
}

////// for max-width 768px ///////////
window.addEventListener("resize", () => {
  if (window.screen.availWidth < 768) {
		console.log(window.screen.availWidth);
		removeHandler(window, "DOMMouseScroll", wheel);
		removeHandler(document, "mousewheel", wheel);
	}
	if (window.screen.availWidth >= 768) {
		footerMapItems.forEach(elem => {
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
				sortToBottom(curSlide);
				activeSlide = parseInt(curSlide.style.zIndex);
				navItemColorChange(curSlide);
				changeNavPos();
			});
		});
	
		menuItems.forEach(elem => {
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
				sortToBottom(curSlide);
				activeSlide = parseInt(curSlide.style.zIndex);
				navItemColorChange(curSlide);
				changeNavPos();
			});
		});
	}
});

//////// Change Nav position for Contacts slide ///////////

function changeNavPos() {
  if (activeSlide === slides.length - 1) {
    navBar.classList.add("for-contact-slide");
    logo.classList.add("dissappear");
    setTimeout(() => {
      logo.style.zIndex = -200;
    }, 400);
  } else {
    navBar.classList.remove("for-contact-slide");
    logo.style.zIndex = 1000;
    logo.classList.remove("dissappear");
  }
}

//////// service modal ///////////

let servBtn = document.querySelectorAll(".serv-item");
let modalWindow = document.querySelectorAll(".modal-wrapper");
let closers = document.querySelectorAll(".modal-closer");
let fixedEls = document.querySelectorAll(".fixed");

servBtn.forEach(item => {
  item.addEventListener("click", () => {
		removeHandler(window, "DOMMouseScroll", wheel);
		removeHandler(document, "mousewheel", wheel);
    fixedEls.forEach(elem => {
      elem.style.zIndex = -200;
    });
    let link = item.getAttribute("link-to");
    let modal = document.querySelector(`.modal-wrapper[name='${link}']`);
    modal.classList.add("show-modal");
  });
});

closers.forEach(item => {
  item.addEventListener("click", () => {
		addHandler(window, "DOMMouseScroll", wheel);
    addHandler(document, "mousewheel", wheel);
    modalWindow.forEach(el => {
      el.classList.remove("show-modal");
    });
    fixedEls.forEach(elem => {
      elem.style.zIndex = 2000;
    });
  });
})