// Подключение функционала 
import { isMobile, removeClasses } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

document.addEventListener('click', function (e) {
   const targetElement = e.target;

   // Клик по пунктам меню, у кого есть вложенный список
   if (targetElement.classList.contains('menu-item__link_has-children') || targetElement.closest('.menu-item__link_has-children')) {
      e.preventDefault();
      removeClasses(document.querySelectorAll('.menu-item_has-children._active'), "_active");
      targetElement.closest(".menu-item_has-children").classList.add('_active');
   }
   if (!targetElement.closest('.menu-item_has-children') && document.querySelectorAll('.menu-item_has-children._active').length > 0) {
      removeClasses(document.querySelectorAll('.menu-item_has-children._active'), "_active");
   }

   // В мобильной версии сайта возвращаемся на шаг назад, по клику на кнопку
   if (targetElement.classList.contains('sub-menu__back') || targetElement.closest('.sub-menu__back')) {
      removeClasses(document.querySelectorAll('.menu-item_has-children._active'), "_active");
   }

   // Показываем datepicker
   if (targetElement.classList.contains('range-datepicker') || targetElement.closest('.range-datepicker')) {
      targetElement.closest(".range-datepicker").classList.add('_active');
   }
   if (!targetElement.closest('.range-datepicker') && document.querySelectorAll('.range-datepicker._active').length > 0) {
      removeClasses(document.querySelectorAll('.range-datepicker'), "_active");
   }

   // В календаре показываем выпадающий список
   if (targetElement.classList.contains('calendar-item__toggler') || targetElement.closest('.calendar-item__toggler')) {
      targetElement.closest(".calendar-item__item_has-children").classList.toggle('_active');
   }
   if (!targetElement.closest('.calendar-item__toggler') && document.querySelectorAll('.calendar-item__item_has-children._active').length > 0) {
      removeClasses(document.querySelectorAll('.calendar-item__item_has-children'), "_active");
   }

   if (targetElement.classList.contains('notification-widget__close') || targetElement.closest('.notification-widget__close')) {
      targetElement.closest(".notification-widget").classList.remove('_active');
   }
})

// Меняем отступ прокрутки сверху в зависимости от размера экрана
const template4NavigationLinks = document.querySelectorAll('.template4__link');
if (template4NavigationLinks.length > 0) {
   if (window.innerWidth >= 767.98) {
      template4NavigationLinks.forEach(link => {
         link.dataset.gotoTop = 56;
      });
   }
   else {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const navigationHeight = document.querySelector('.template4__navigation').offsetHeight;

      template4NavigationLinks.forEach(link => {
         link.dataset.gotoTop = headerHeight + navigationHeight;
      });
   }
}

// Меняем активный пункт меню навигации при скролле по странице
const template4Sections = document.querySelectorAll('.template4__section');
const template4Links = document.querySelectorAll('.template4__link');

if (template4Sections.length > 0 && template4Links.length > 0) {
   if (window.innerWidth >= 767.98) {
      const template4CallBack = (entries) => {
         entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
               template4Links.forEach(link => link.classList.remove('template4__link_active'));

               const activeID = entry.target.id;
               const activeLink = document.querySelector(`.template4__link[data-goto="#${activeID}"]`);

               if (activeLink) {
                  activeLink.classList.add('template4__link_active');
               }
            }
         });
      };

      const template4SectionsObserver = new IntersectionObserver(template4CallBack, {
         threshold: [0.2, 0.5, 0.8],
      })

      template4Sections.forEach(section => template4SectionsObserver.observe(section));
   }
   else {
      const template4CallBack = (entries) => {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
               template4Links.forEach(link => link.classList.remove('template4__link_active'));

               const activeID = entry.target.id;
               const activeLink = document.querySelector(`.template4__link[data-goto="#${activeID}"]`);

               if (activeLink) {
                  activeLink.classList.add('template4__link_active');
               }
            }
         });
      };

      const template4SectionsObserver = new IntersectionObserver(template4CallBack, {
         threshold: [0.1, 0.5, 0.9],
      })

      template4Sections.forEach(section => template4SectionsObserver.observe(section));
   }
}

// Проверяем, есть ли вертикальный скролл у списка assessment__list
const listWidthScrollCheck = document.querySelectorAll('._can-be-vertical-scroll');
if (listWidthScrollCheck.length > 0) {
   listWidthScrollCheck.forEach(list => {
      if (list.scrollHeight > list.clientHeight) {
         list.classList.add('_has-vertical-scroll');
      }
   });
}

// Добавляем range datepicker
// Документация плагина: https://www.npmjs.com/package/js-datepicker
const datepickersWrapper = document.querySelectorAll('.range-datepicker');
if (datepickersWrapper.length > 0) {
   let key = 1;

   datepickersWrapper.forEach(element => {
      const datepickerReset = element.querySelector('.range-datepicker__reset');
      const datepickerStart = element.querySelector('.range-datepicker__start');
      const datepickerEnd = element.querySelector('.range-datepicker__end');

      let startDatePick, endDatePick, datepickerParent;

      const start = datepicker(datepickerStart, {
         customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
         customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
         overlayButton: 'Применить',
         overlayPlaceholder: 'Год (4 цифры)',
         startDay: 0,
         id: key,
         alwaysShow: true,

         formatter: (input, date, instance) => {
            const value = date.toLocaleDateString();
            input.value = value;

            // Выводим выбранные даты
            startDatePick = value;

            datepickerParent = input.closest('.range-datepicker');
            const datepickerText = datepickerParent.querySelector('.range-datepicker__text');

            if (startDatePick && endDatePick) {
               datepickerText.innerHTML = `${startDatePick} - ${endDatePick}`;
               datepickerParent.classList.add('_has-changed');
            }

         },

         onSelect: function (input, instance, date) {
         }
      })
      const end = datepicker(datepickerEnd, {
         customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
         customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
         overlayButton: 'Применить',
         overlayPlaceholder: 'Год (4 цифры)',
         startDay: 0,
         id: key,
         alwaysShow: true,

         formatter: (input, date, instance) => {
            const value = date.toLocaleDateString();
            input.value = value;

            // Выводим выбранные даты
            endDatePick = value;

            datepickerParent = input.closest('.range-datepicker');
            const datepickerText = datepickerParent.querySelector('.range-datepicker__text');

            if (startDatePick && endDatePick) {
               datepickerText.innerHTML = `${startDatePick} - ${endDatePick}`;
               datepickerParent.classList.add('_has-changed');
            }

         },

         onSelect: function (input, instance, date) {
         }
      })

      // Выделяем даты текущего месяца
      const currentMonth = new Date().getMonth() + 1;
      const currentMonthDays = new Date(new Date().getFullYear(), currentMonth, 0).getDate();

      start.setDate(new Date(2023, currentMonth - 1, 1));
      end.setDate(new Date(2023, currentMonth - 1, currentMonthDays));

      // Сбрасываем datepicker
      datepickerReset.addEventListener('click', function () {
         start.setDate(new Date(2023, currentMonth - 1, 1));
         end.setDate(new Date(2023, currentMonth - 1, currentMonthDays));
         datepickerParent.classList.remove('_has-changed');
      })

      key++;
   });
}

// datepicker__input
const datepickerInputs = document.querySelectorAll('.datepicker__input');
if (datepickerInputs.length > 0) {
   datepickerInputs.forEach(datepickerInput => {
      const inputValue = datepickerInput.value;
      console.log(inputValue);

      const input = datepicker(datepickerInput, {
         customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
         customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
         overlayButton: 'Применить',
         overlayPlaceholder: 'Год (4 цифры)',
         startDay: 0,

         formatter: (input, date, instance) => {
            const value = date.toLocaleDateString();
            input.value = value;
         },

         onSelect: function (input, instance, date) {
         }
      })

      if (inputValue != '') {
         const dateParts = inputValue.split(".");
         // год, месяц-1, день
         input.setDate(new Date(dateParts[2], parseInt(dateParts[1]) - 1, dateParts[0]), true);
      }
   });

}
