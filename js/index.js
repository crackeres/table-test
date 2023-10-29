import { data } from "./data/data";
import { applyFilter } from "./utils/aply-filter";
import { displayData } from "./utils/display-data";
import { createPagination } from "./utils/create-pagination";
import { initializeResizableColumns } from "./utils/resize";
import { sortRowsFunct } from "./utils/sortTable";

document.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1;
  let rowsPerPage = 5;

  // Создание страниц
  displayData(data, currentPage, rowsPerPage);
  let buttons = document.querySelectorAll(".filter__button");

  // Фильтр
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(data, currentPage, rowsPerPage, displayData);
    });
  });

  // Пагинация
  let pagination = document.getElementById("pagination");
  createPagination(pagination, data, rowsPerPage, displayData);

  // Ресайз колонок
  // Найдите все колонки, которые вы хотите сделать изменяемыми
  let resizableColumns = document.querySelectorAll(".resizable");

  // Пройдитесь по каждой колонке и инициализируйте их для изменения размера
  resizableColumns.forEach((column) => {
    initializeResizableColumns(column);
  });

  // Сортировка
  // Вызов функции сортировки
  sortRowsFunct();
});
