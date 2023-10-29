export const createPagination = (
  paginationElement,
  dataArray,
  rowsPerPage,
  displayFunction
) => {
  const totalPages = Math.ceil(dataArray.length / rowsPerPage);
  paginationElement.innerHTML = "";

  // Создаем кнопку для первой страницы и класс "active" к ней
  const firstPageButton = document.createElement("button");
  firstPageButton.classList.add("pagination__button", "active"); // Добавляем "active" здесь
  firstPageButton.textContent = 1;
  firstPageButton.addEventListener("click", function (e) {
    // Вызов функции отображения данных с учетом выбранной страницы
    displayFunction(dataArray, 1, rowsPerPage);
  });
  paginationElement.appendChild(firstPageButton);

  // Создаем кнопку для остальных страниц
  Array.from({ length: totalPages - 1 }, (_, i) => i + 2).forEach((i) => {
    let pageButton = document.createElement("button");
    pageButton.classList.add("pagination__button");
    pageButton.textContent = i;
    pageButton.addEventListener("click", function () {
      // Вызываем функцию отображения данных с учетом выбранной страницы
      displayFunction(dataArray, i, rowsPerPage);
    });
    paginationElement.appendChild(pageButton);
  });
  const activePagination = () => {
    let paginationButtons = document.querySelectorAll(".pagination__button");

    paginationButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Удалить класс "active" у всех элементов
        paginationButtons.forEach((el) => {
          el.classList.remove("active");
        });

        // Добавить класс "active" только элементу, на который было совершено нажатие
        e.target.classList.add("active");
      });
    });
  };

  activePagination();
};
