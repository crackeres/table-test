/**
 * Функция фильтрации данных в таблице на странице.
 **/

export const applyFilter = (
  data,
  currentPage,
  rowsPerPage,
  displayFunction
) => {
  // Получаем значение фильтра из элемента ввода
  let filterInput = document.querySelector("#filterInput");
  let filterValue = filterInput.value.toLowerCase();

  // Фильтруем данные по значению фильтра
  let filteredData = data.filter(
    (item) =>
      item.id.toString().toLowerCase().includes(filterValue) ||
      item.name.toLowerCase().includes(filterValue) ||
      item.value.toString().toLowerCase().includes(filterValue)
  );

  // Сбрасываем номер текущей страницы на 1
  currentPage = 1;

  // Отображаем отфильтрованные данные, используя переданную функцию
  displayFunction(filteredData, currentPage, rowsPerPage);
};
