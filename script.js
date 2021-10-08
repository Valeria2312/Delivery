window.addEventListener('DOMContentLoaded', () => {
  //Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  //Скрываем не нужные нам элементы со страницы.
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    //удаляем класс активности со всех элементов.
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  //Активируем элементы и добаляем им класс активности
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  //назначаем переключение элементов
  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    //Проверяем условие нажатия на элемент именно с классом tabheader__item, а не на пустое место в блоке
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

//  Timer
//Создаем заключительную точку таймера
  const deadline = new Date();

  function getTimeRemaining(zendTime) {
    //Создаем переменную для количества милисекунд до конечного времени, вычетанием из итогового времени, начальное
    const t = Date.parse(zendTime) - Date.parse(new Date()),
      //Получаем поличство дней до конца, детим милисекунды из t на (в минуте, в часе, в сутках)
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      // так же считаем часы, делим на 24 с остатком и остаток передается в переменную (для того что бы отбросить целые сутки и отсавить часы от неполных суток)
      hours = Math.floor((t / (1000 * 60 * 60) % 24)),
      //делим на 60, т.к. в минуте 60 секунд
      minutes = Math.floor((t / (1000 * 60) % 60)),
      seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  //делаем вункцию, что бы поставить 0, к числам меньше 10
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`
    } else {
      return num;
    }
  }

  //передаем блок с таймером и дедлайн таймера

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      //Создаем функцию setInterval дял обновления
      timeInterval = setInterval(updateClock, 1000);
    //Вызываем функцию в начале, что бы первый раз запуска не маргала вертка. Дальше будет работать setInterval
    updateClock();

    //    создаем вункцию для обновления таймера
    function updateClock() {
      const t = getTimeRemaining(endTime);
      //Записываем новые значения на страницу
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      // читсим таймер иесли он исток и милисекунд не соталось
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  //Запускаем функцию передаем селектор где это происходит и конечную дату из переменной
  setClock('.timer', deadline);

//  Modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });


  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
// закрытие окна по клику на подложку и Esc

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

// модификация
  const modalTimerId = setTimeout(openModal, 500000);

function showModalByScroll() {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    openModal();
    window.removeEventListener('scroll',showModalByScroll);
  }
}
  window.addEventListener('scroll',showModalByScroll);

  // Используем классы для карточек
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToRU();
    }
    changeToRU() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement('div');
      if(this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
          <img src= ${this.src} alt= ${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>`;
      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    // "menu__item",
    // 'big'
  ).render();
  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    20,
    '.menu .container',
    "menu__item"
  ).render();
  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    12,
    '.menu .container',
    "menu__item"
  ).render();
// отправка данных на сервер
//  Forms
  const forms = document.querySelectorAll('form');

  const  message = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    postData(item);
  });
  //используем функцию
  function postData(form) {
    //по нажатию или Enter
    form.addEventListener('submit', (e) => {
      //отмена перезагрузки станицы при отпраквки форм, всегда в конце
      e.preventDefault();
      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto
      `;
      // к форме добавляем сообщение
      form.insertAdjacentElement('afterend', statusMessage);
      // автоматически объект из  формы отпраки
      const formData = new FormData(form);
      // создаем пустой объект
      const object = {};
      // перебираем formData и записываем в object
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      // переводим в формат json
      //отправляем форму на сервер, (formData из form при обычноя запросе) (json при запросе JSON)
      // request.send(json);
      //отправляем данные н сервер
      fetch('server1.php', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(object)
      }).then(data => data.text())
        .then(data => {
            console.log(data);
            //выводим сообщение пользователю
            showThanksModal(message.success);
            //очищаем форму
            form.reset();
            //удаляем сообщение
            statusMessage.remove();
      }).catch(() => {
            //выводим сообщение опользователю с неготивным сообщением
            showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      })
    });
  }

//  оповещение пользователя
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
    <div data-close class="modal__close">&times;</div>
      <div class="modal__title">${message}</div>
    </div>`
    ;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }
fetch('db.json')
  .then(data => data.json())
  .then(res => console.log(res));
});
