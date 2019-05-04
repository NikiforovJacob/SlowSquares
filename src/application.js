const values = [8, 3, 2, 9, 11, 15, 5, 1, 7, 6, 13, 4, 12, 10, 14];

const generatePlayingField = () => {
  const tableEl = document.createElement('table');

  tableEl.className = 'table-bordered';
  for (let i = 0; i < 4; i += 1) {
    const row = tableEl.insertRow();
    for (let j = 0; j < 4; j += 1) {
      const cell = row.insertCell();
      cell.className = 'p-3';
      if (i === 3 && j === 3) {
        cell.classList.add('table-active');
      } else {
        cell.textContent = values[i + (j * 4)];
      }
    }
  }
  return tableEl;
};

export default () => {
  document.querySelector('.gem-puzzle').append(generatePlayingField()); 
  const handle = ({ target }) => {
    const activeCell = document.querySelector('.table-active');
    const activeRow = activeCell.closest('tr');
    const activeCellNum = activeCell.cellIndex;
    const activeRowNum = activeRow.rowIndex;
    const targetRow = target.closest('tr');
    const targetCellNum = target.cellIndex;
    const targetRowNum = targetRow.rowIndex;
    const difCellNum = Math.abs(targetCellNum - activeCellNum);
    const difRowNum = Math.abs(targetRowNum - activeRowNum);
    if ((difCellNum === 1 || difRowNum === 1) && (difCellNum < 2 && difRowNum < 2) && difCellNum !== difRowNum) {
      activeCell.classList.remove('table-active');
      const num = target.textContent;
      activeCell.textContent = num;
      target.classList.add('table-active');
      target.textContent = '';
    };
  };
  document.querySelector('.table-bordered').addEventListener('click', handle);
};
