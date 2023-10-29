// Определение функции для сортировки данных
export const sortRowsFunct = () => {
  // Получаем элементы заголовков таблицы
  let tableHeaders = document.querySelectorAll(".table__th");

  // Сотритровка данных в таблице
  const sortTable = (columnIndex) => {
    let table = document.querySelector("#data-table");
    let tbody = table.tBodies[0];
    let rows = Array.from(tbody.rows).slice(0); // Пропустить строку заголовка

    // Переключаем направление сортировки для столбца
    if (tableHeaders[columnIndex].classList.contains("sorted-asc")) {
      // Сортировка по убыванию
      rows.sort((rowA, rowB) => {
        let cellA = rowA.cells[columnIndex].textContent.trim();
        let cellB = rowB.cells[columnIndex].textContent.trim();
        return cellB.localeCompare(cellA);
      });

      tableHeaders[columnIndex].classList.remove("sorted-asc");
      tableHeaders[columnIndex].classList.add("sorted-desc");
    } else {
      // Сортировка по возрастанию
      rows.sort((rowA, rowB) => {
        let cellA = rowA.cells[columnIndex].textContent.trim();
        let cellB = rowB.cells[columnIndex].textContent.trim();
        return cellA.localeCompare(cellB);
      });

      tableHeaders[columnIndex].classList.remove("sorted-desc");
      tableHeaders[columnIndex].classList.add("sorted-asc");
    }

    tbody.innerHTML = ""; // Очистить тело таблицы

    rows.forEach((row) => {
      tbody.appendChild(row);
    });
  };

  // Добавляем обработчики событий для заголовков таблицы
  tableHeaders.forEach((header, index) => {
    header.addEventListener("click", () => {
      sortTable(index);
    });
  });
};
