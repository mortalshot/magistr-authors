// Подключение функционала 
import { isMobile, FLS } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Подключение из node_modules
import tippy from 'tippy.js';

// Подключение cтилей из src/scss/libs
import "../../scss/libs/tippy.scss";
// Подключение cтилей из node_modules
//import 'tippy.js/dist/tippy.css';

// Запускаем и добавляем в объект модулей
flsModules.tippy = tippy('[data-tippy-content]', {

});

tippy('.info-block__title', {
  content(reference) {
    const id = reference.getAttribute('data-template');
    console.log(reference);
    const template = document.getElementById(id);
    return template.innerHTML;
  },
  allowHTML: true,
  interactive: true,
});