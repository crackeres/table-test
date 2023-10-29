export const initializeResizableColumns = (column) => {
  let isResizing = false; // Флаг, который показывает идет ли изменение столбца
  let startX, startWidth; // Начальная позиция мыши и начальная ширина столбца

  // Функция для изменения размера столбца
  const resizeColumn = (table, column, width) => {
    // Изменяем ширину таблицы и столбца в соответствии с новой шириной
    table.style.width = table.offsetWidth + (width - column.offsetWidth) + "px";
    column.style.width = width + "px";
  };

  // Слушатель события "mousedown" на столбце, срабатывает при нажатии кнопки мыши
  column.addEventListener("mousedown", (e) => {
    isResizing = true; // Флаг изменения размера
    startX = e.pageX; // Начальная позиция мыши
    startWidth = column.offsetWidth; // Запоминаем начальную ширину столбца

    // Слушатель события "mousemove", отслеживает движение мыши
    document.addEventListener("mousemove", (e) => {
      if (isResizing) {
        // Если идет изменение размера, вычисляем новую ширину
        let newWidth = startWidth + (e.pageX - startX);
        // Вызываем функцию изменения размера столбца
        resizeColumn(document.querySelector("#data-table"), column, newWidth);
      }
    });

    // Слушатель события "mouseup", срабатывает при отпускании кнопки мыши
    document.addEventListener("mouseup", () => {
      isResizing = false; // Сбрасываем флаг изменения размера
    });
  });
};
