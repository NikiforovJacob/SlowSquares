const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const mixerValues = (numbers) => {
  const iter = (acc, numbers) => {
    if (numbers.length === 0) {
      return acc;
    };
    const randomNum = numbers[Math.floor(Math.random() * numbers.length)];
    return mixerValues([...acc, randomNum], numbers.filter(n => n !== randomNum)); 
  };
  return iter([], numbers);
};
const mixedValues = mixerValues(values);

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
        cell.textContent = mixedValues[i + (j * 4)];
      }
    }
  }
  return tableEl;
};

const app = () => {
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

app();
