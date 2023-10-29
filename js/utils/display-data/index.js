/**
 * Функция отображения данных в виде таблицы на странице.
 **/

// Принимает массив данных (dataArray), номер текущей страницы (currentPage) и количество строк на странице (rowsPerPage).
export const displayData = (dataArray, currentPage, rowsPerPage) => {
  // Получаем элемент таблицы, куда будем вставлять данные.
  let tableBody = document.querySelector("#table-body");
  // Очищаем содержимое таблицы перед отображением новых данных.
  tableBody.innerHTML = "";
  // Рассчитываем начальную и конечную позиции данных на текущей странице.
  let start = (currentPage - 1) * rowsPerPage;
  let end = start + rowsPerPage;
  // Создаем подмассив данных для текущей страницы.
  let paginatedData = dataArray.slice(start, end);
  // Создаем строки и ячейки данных и добавляем их в таблицу.
  paginatedData.forEach((item) => {
    let row = document.createElement("tr");
    for (let key in item) {
      let cell = document.createElement("td");
      cell.classList.add("table__td");
      cell.textContent = item[key];
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  });
};
